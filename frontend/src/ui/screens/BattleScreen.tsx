import { useEffect, useRef, useState } from 'react'
import { ENEMY_ATTACK_INTERVAL_MS, TELEGRAPH_WINDOW_MS, TEST_OPPONENT_LEVEL, TEST_OPPONENT_SPECIES_ID } from '../../content/battle'
import { ELITE_FOUR } from '../../content/gen1/eliteFour'
import type { GymDefinition, GymTeamMember } from '../../content/gen1/gyms'
import type { Gen1Entry } from '../../content/gen1/types'
import { moveNameForStage } from '../../content/moves'
import { GameLoop } from '../../engine/gameLoop'
import type { SaveData } from '../../engine/save'
import { eliteFourSequence } from '../../systems/gyms/champion'
import {
  applyEnemyAttack,
  applyPlayerTap,
  createBattle,
  currentTrainerProgress,
  ENERGY_MAX,
  resolveQteAttack,
  switchActive,
  type BattleState,
  type EnemyRosterEntry,
} from '../../systems/battle/engine'
import { moveStage } from '../../systems/battle/moveStage'
import { HpBar } from '../components/HpBar'
import { QteModal } from '../components/qte/QteModal'

// A real wild encounter (Sprint 18), a gym leader (Sprint 20), or the Elite
// Four + Champion sequence (Sprint 21) — all three come with an opponent
// roster; 'dummy' is the fixed Sprint 13 test fight, only reachable from
// the Admin screen now that the "Batalha" nav tab is gone.
export type BattleEncounter =
  | { kind: 'wild'; speciesId: number; level: number }
  | { kind: 'gym'; gym: GymDefinition }
  | { kind: 'elite-four' }
  | { kind: 'dummy' }

interface BattleScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
  encounter: BattleEncounter
  onVictory: (activeSpeciesId: number) => void
  // Only called for encounter.kind === 'wild' — roll capture or loot, apply
  // it to the save, and return the result text to show.
  onCapture?: () => string
  onLoot?: () => string
  // Only called for encounter.kind === 'gym' — awards the badge.
  onGymVictory?: (gymId: string) => void
  onExit: () => void
}

function rosterFromTeam(team: GymTeamMember[], gen1: Gen1Entry[], trainerName?: string): EnemyRosterEntry[] {
  return team
    .map(({ speciesId, level }, index): EnemyRosterEntry | null => {
      const entry = gen1.find((candidate) => candidate.id === speciesId)
      return entry ? { entry, level, trainerName: index === 0 ? trainerName : undefined } : null
    })
    .filter((member): member is EnemyRosterEntry => member !== null)
}

function buildEnemyRoster(encounter: BattleEncounter, gen1: Gen1Entry[], dummyLevel: number, save: SaveData): EnemyRosterEntry[] {
  if (encounter.kind === 'wild') {
    const entry = gen1.find((candidate) => candidate.id === encounter.speciesId)
    return entry ? [{ entry, level: encounter.level }] : []
  }
  if (encounter.kind === 'gym') {
    return rosterFromTeam(encounter.gym.team, gen1)
  }
  if (encounter.kind === 'elite-four') {
    return eliteFourSequence(ELITE_FOUR, save, gen1).flatMap(({ name, team }) => rosterFromTeam(team, gen1, name))
  }
  const entry = gen1.find((candidate) => candidate.id === TEST_OPPONENT_SPECIES_ID)
  return entry ? [{ entry, level: dummyLevel }] : []
}

export function BattleScreen({ gen1, save, encounter, onVictory, onCapture, onLoot, onGymVictory, onExit }: BattleScreenProps) {
  // Frozen at mount: if the parent's state changed for any reason while
  // this screen is still up, the fight in progress must not suddenly show
  // a different opponent than the one createBattle() built stats for below.
  const [frozenEncounter] = useState(encounter)
  // The fixed test dummy matches the player's own level (see git history)
  // so it's actually testable instead of an instant one-shot.
  const dummyLevel = save.roster.find((member) => member.speciesId === save.activeTeamIds[0])?.level ?? TEST_OPPONENT_LEVEL
  const [enemyRoster] = useState(() => buildEnemyRoster(frozenEncounter, gen1, dummyLevel, save))
  const [battle, setBattle] = useState<BattleState>(() => createBattle(gen1, save.roster, save.activeTeamIds, enemyRoster))
  const battleRef = useRef(battle)
  battleRef.current = battle
  const [telegraph, setTelegraph] = useState(false)
  const [hitMessage, setHitMessage] = useState<string | null>(null)
  const [postVictoryMessage, setPostVictoryMessage] = useState<string | null>(null)
  const victoryHandledRef = useRef(false)
  const onVictoryRef = useRef(onVictory)
  onVictoryRef.current = onVictory
  const onGymVictoryRef = useRef(onGymVictory)
  onGymVictoryRef.current = onGymVictory

  // Grants XP exactly once, right when the battle is won — independent of
  // whatever the player picks next (capture, loot, or just "Continuar").
  // Gym battles also award the badge here, once.
  useEffect(() => {
    if (battle.outcome !== 'victory' || victoryHandledRef.current) return
    victoryHandledRef.current = true
    const current = battleRef.current
    const winner = current.playerTeam[current.activeIndex] ?? current.playerTeam[0]
    onVictoryRef.current(winner.speciesId)
    if (frozenEncounter.kind === 'gym') onGymVictoryRef.current?.(frozenEncounter.gym.id)
  }, [battle.outcome, frozenEncounter])

  // A fresh `lastHit` object is produced on every hit (even repeats of the
  // same tier), so this effect naturally re-fires each time — no need to
  // compare against the previous value. Leads with the QTE quality message
  // (if any) so "Golpe cheio!" vs "Golpe fraco..." is actually visible,
  // not just a slightly different number.
  useEffect(() => {
    if (!battle.lastHit) return

    const parts: string[] = []
    if (battle.lastHit.qteResult) {
      parts.push(
        { full: 'Golpe cheio!', partial: 'Golpe parcial!', weak: 'Golpe fraco...' }[battle.lastHit.qteResult],
      )
    }
    if (battle.lastHit.tier === 'super') parts.push('Super efetivo!')
    if (battle.lastHit.tier === 'weak') parts.push('Não muito efetivo...')
    if (parts.length === 0) return

    setHitMessage(parts.join(' '))
    const id = setTimeout(() => setHitMessage(null), 900)
    return () => clearTimeout(id)
  }, [battle.lastHit])

  useEffect(() => {
    const loop = new GameLoop()
    let msUntilAttack = ENEMY_ATTACK_INTERVAL_MS
    let wasAwaitingQte = false

    const unsubscribe = loop.subscribe((deltaMs) => {
      const current = battleRef.current
      if (current.outcome !== 'ongoing') return

      if (current.awaitingQte) {
        if (!wasAwaitingQte) setTelegraph(false)
        wasAwaitingQte = true
        return
      }

      if (wasAwaitingQte) {
        // Just finished a QTE — guarantee at least a telegraph window's
        // worth of reaction time instead of attacking immediately with
        // whatever little time was left when it opened (was landing as
        // "got hit right after the minigame"). A full reset here was
        // exploitable: chaining QTEs back-to-back kept the enemy from ever
        // attacking. Only top up the remainder, never restart it.
        wasAwaitingQte = false
        msUntilAttack = Math.max(msUntilAttack, TELEGRAPH_WINDOW_MS)
      }

      msUntilAttack -= deltaMs
      setTelegraph(msUntilAttack <= TELEGRAPH_WINDOW_MS)

      if (msUntilAttack <= 0) {
        setBattle((state) => applyEnemyAttack(state))
        msUntilAttack = ENEMY_ATTACK_INTERVAL_MS
      }
    })
    loop.start()

    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  const activeEnemyUnit = battle.enemyTeam[battle.enemyIndex]
  const activeEnemyEntry = activeEnemyUnit ? gen1.find((entry) => entry.id === activeEnemyUnit.speciesId) : null
  if (!activeEnemyUnit || !activeEnemyEntry) return null

  const active = battle.playerTeam[battle.activeIndex]
  const activeEntry = active ? gen1.find((entry) => entry.id === active.speciesId) : null
  const activeMoveName =
    active && activeEntry ? moveNameForStage(active.type, moveStage(activeEntry, active.level)) : null

  // "3/5 do Bruno" instead of the raw "9/26" for multi-trainer sequences
  // (Elite Four) — null (and the plain counter below) for wild/gym fights.
  const trainerProgress = currentTrainerProgress(battle)

  return (
    <div className="battle-screen">
      {/* Always mounted (min-height reserved in CSS) — unmounting this when
          hitMessage clears would shift everything below it up, including a
          QTE hold button, right out from under the player's finger. */}
      <p className="battle-hit-message">{hitMessage}</p>
      <div className={`battle-enemy${telegraph ? ' battle-enemy--telegraph' : ''}`}>
        <img src={activeEnemyEntry.sprite.local} alt={activeEnemyEntry.name} />
        <p>
          {activeEnemyEntry.name} Nv.{activeEnemyUnit.level}
          {trainerProgress
            ? ` (${trainerProgress.name} ${trainerProgress.position}/${trainerProgress.size})`
            : battle.enemyTeam.length > 1 && ` (${battle.enemyIndex + 1}/${battle.enemyTeam.length})`}
        </p>
        <HpBar current={activeEnemyUnit.currentHp} max={activeEnemyUnit.maxHp} />
      </div>

      {battle.outcome === 'ongoing' && active && activeEntry && battle.awaitingQte && (
        <div className="pokemon-detail">
          <QteModal type={battle.awaitingQte} onComplete={(result) => setBattle((current) => resolveQteAttack(current, result))} />
        </div>
      )}

      {battle.outcome === 'ongoing' && active && activeEntry && !battle.awaitingQte && (
        <>
          <button className="battle-tap-area" onClick={() => setBattle((current) => applyPlayerTap(current))}>
            <img src={activeEntry.sprite.local} alt={active.name} />
          </button>
          <p>
            {active.name} Nv.{active.level}
            {activeMoveName && <> — {activeMoveName}</>}
          </p>
          <HpBar current={active.currentHp} max={active.maxHp} />
          <div className="energy-bar">
            <div className="energy-bar-fill" style={{ width: `${(battle.energy / ENERGY_MAX) * 100}%` }} />
          </div>

          <div className="battle-team-row">
            {battle.playerTeam.map((unit, index) => {
              const entry = gen1.find((candidate) => candidate.id === unit.speciesId)
              return (
                <button
                  key={unit.speciesId}
                  onClick={() => setBattle((current) => switchActive(current, index))}
                  disabled={unit.currentHp <= 0 || index === battle.activeIndex}
                >
                  {entry && <img src={entry.sprite.local} alt={unit.name} />}
                  <span>
                    {unit.currentHp}/{unit.maxHp}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {battle.outcome === 'victory' && (
        <div className="pokemon-detail">
          {frozenEncounter.kind === 'dummy' && (
            <>
              <p>Vitória!</p>
              <button onClick={onExit}>Continuar</button>
            </>
          )}

          {frozenEncounter.kind === 'gym' && (
            <>
              <p>Vitória! Você conquistou a {frozenEncounter.gym.badgeName}!</p>
              <button onClick={onExit}>Continuar</button>
            </>
          )}

          {/* No save mutation here on purpose — the victory cutscene, Victory
              Road registration and rebirth button are Sprint 22 (roadmap
              section 8). This sprint only needs the sequence itself:
              lose-and-retry or win-and-see-a-screen. */}
          {frozenEncounter.kind === 'elite-four' && (
            <>
              <p>Vitória! Você derrotou a Elite Four e o Campeão!</p>
              <button onClick={onExit}>Continuar</button>
            </>
          )}

          {frozenEncounter.kind === 'wild' && postVictoryMessage === null && (
            <>
              <p>Vitória! Capturar ou pegar o loot?</p>
              <button onClick={() => setPostVictoryMessage(onCapture?.() ?? null)}>Jogar Pokébola</button>
              <button onClick={() => setPostVictoryMessage(onLoot?.() ?? null)}>Pegar Loot</button>
            </>
          )}

          {frozenEncounter.kind === 'wild' && postVictoryMessage !== null && (
            <>
              <p>{postVictoryMessage}</p>
              <button onClick={onExit}>Continuar</button>
            </>
          )}
        </div>
      )}

      {battle.outcome === 'defeat' && (
        <div className="pokemon-detail">
          <p>Seu time caiu... mas você não perdeu nada além da oportunidade.</p>
          <button onClick={onExit}>Continuar</button>
        </div>
      )}
    </div>
  )
}
