import { useEffect, useRef, useState } from 'react'
import { ENEMY_ATTACK_INTERVAL_MS, TELEGRAPH_WINDOW_MS, TEST_OPPONENT_LEVEL, TEST_OPPONENT_SPECIES_ID } from '../../content/battle'
import type { GymDefinition, GymTeamMember } from '../../content/gen1/gyms'
import type { SpeciesEntry } from '../../content/gen1/types'
import type { RegionDefinition } from '../../content/regions'
import { moveNameForStage } from '../../content/moves'
import { GameLoop } from '../../engine/gameLoop'
import type { RegionSave } from '../../engine/save'
import { eliteFourSequence } from '../../systems/gyms/champion'
import {
  applyEnemyAttack,
  applyPlayerTap,
  createBattle,
  currentTrainerBalls,
  currentTrainerProgress,
  ENERGY_MAX,
  resolveQteAttack,
  switchActive,
  type BattleState,
  type EnemyRosterEntry,
} from '../../systems/battle/engine'
import { moveStage } from '../../systems/battle/moveStage'
import type { CaptureOption } from '../../systems/capture/pokeballs'
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
  gen1: SpeciesEntry[]
  regionDef: RegionDefinition
  region: RegionSave
  encounter: BattleEncounter
  // enemyLevel = nível médio de todo o time inimigo que caiu (content/
  // battle.ts's battleXpForVictory escala o XP concedido por isso).
  onVictory: (activeSpeciesId: number, enemyLevel: number) => void
  // Only meaningful for encounter.kind === 'wild' — one row per ball (name,
  // owned count or null for infinite, catch chance for THIS species) to
  // show in the ball-choice HUD before the player commits to a throw.
  captureOptions?: CaptureOption[]
  // Only called for encounter.kind === 'wild' — rolls capture with the
  // chosen ball, applies it to the save, and returns the result text to show.
  onCapture?: (ballId: string) => string
  onLoot?: () => string
  // Only called for encounter.kind === 'gym' — awards the badge.
  onGymVictory?: (gymId: string) => void
  // Only called for encounter.kind === 'elite-four' — registers the Victory
  // Road snapshot and flips championBeaten (Sprint 22).
  onEliteFourVictory?: () => void
  onExit: () => void
}

function rosterFromTeam(team: GymTeamMember[], gen1: SpeciesEntry[], trainerName?: string): EnemyRosterEntry[] {
  return team
    .map(({ speciesId, level }, index): EnemyRosterEntry | null => {
      const entry = gen1.find((candidate) => candidate.id === speciesId)
      return entry ? { entry, level, trainerName: index === 0 ? trainerName : undefined } : null
    })
    .filter((member): member is EnemyRosterEntry => member !== null)
}

// Sistema de Pokébolas — animação de captura. O resultado (sucesso/falha)
// já foi decidido e aplicado ao save no momento em que o jogador escolhe a
// bola (onCapture roda na hora); isso aqui só atrasa QUANDO o texto de
// resultado aparece pro jogador, pra dar tempo da bola voar e balançar
// antes de revelar. Puro CSS, sem asset novo (ver .capture-pokeball).
type CapturePhase = 'idle' | 'throwing' | 'shaking'
const CAPTURE_THROW_MS = 500
const CAPTURE_SHAKE_MS = 1500

// Animação de início de batalha (decisão 0037) — um flash rápido na tela +
// os dois lados entrando deslizados (inimigo da direita, seu ativo da
// esquerda), só pra dar impacto no corte instantâneo clicker->batalha.
// Curta de propósito: uma luta acontece o tempo todo num idle clicker, uma
// intro longa toda vez viraria irritação em vez de graça.
const BATTLE_INTRO_MS = 550

function buildEnemyRoster(
  encounter: BattleEncounter,
  gen1: SpeciesEntry[],
  dummyLevel: number,
  regionDef: RegionDefinition,
  region: RegionSave,
): EnemyRosterEntry[] {
  if (encounter.kind === 'wild') {
    const entry = gen1.find((candidate) => candidate.id === encounter.speciesId)
    return entry ? [{ entry, level: encounter.level }] : []
  }
  if (encounter.kind === 'gym') {
    return rosterFromTeam(encounter.gym.team, gen1)
  }
  if (encounter.kind === 'elite-four') {
    return eliteFourSequence(regionDef, region, gen1).flatMap(({ name, team }) => rosterFromTeam(team, gen1, name))
  }
  const entry = gen1.find((candidate) => candidate.id === TEST_OPPONENT_SPECIES_ID)
  return entry ? [{ entry, level: dummyLevel }] : []
}

export function BattleScreen({
  gen1,
  regionDef,
  region,
  encounter,
  captureOptions = [],
  onVictory,
  onCapture,
  onLoot,
  onGymVictory,
  onEliteFourVictory,
  onExit,
}: BattleScreenProps) {
  // Frozen at mount: if the parent's state changed for any reason while
  // this screen is still up, the fight in progress must not suddenly show
  // a different opponent than the one createBattle() built stats for below.
  const [frozenEncounter] = useState(encounter)
  // The fixed test dummy matches the player's own level (see git history)
  // so it's actually testable instead of an instant one-shot.
  const dummyLevel = region.roster.find((member) => member.speciesId === region.activeTeamIds[0])?.level ?? TEST_OPPONENT_LEVEL
  const [enemyRoster] = useState(() => buildEnemyRoster(frozenEncounter, gen1, dummyLevel, regionDef, region))
  const [battle, setBattle] = useState<BattleState>(() => createBattle(gen1, region.roster, region.activeTeamIds, enemyRoster))
  const battleRef = useRef(battle)
  battleRef.current = battle
  const [telegraph, setTelegraph] = useState(false)
  const [hitMessage, setHitMessage] = useState<string | null>(null)
  const [postVictoryMessage, setPostVictoryMessage] = useState<string | null>(null)
  const [showBallMenu, setShowBallMenu] = useState(false)
  const [capturePhase, setCapturePhase] = useState<CapturePhase>('idle')
  const [introPlaying, setIntroPlaying] = useState(true)
  const captureTimeoutsRef = useRef<number[]>([])
  const victoryHandledRef = useRef(false)
  const onVictoryRef = useRef(onVictory)
  onVictoryRef.current = onVictory
  const onGymVictoryRef = useRef(onGymVictory)
  onGymVictoryRef.current = onGymVictory
  const onEliteFourVictoryRef = useRef(onEliteFourVictory)
  onEliteFourVictoryRef.current = onEliteFourVictory

  // Grants XP exactly once, right when the battle is won — independent of
  // whatever the player picks next (capture, loot, or just "Continuar").
  // Gym battles also award the badge here, once.
  useEffect(() => {
    if (battle.outcome !== 'victory' || victoryHandledRef.current) return
    victoryHandledRef.current = true
    const current = battleRef.current
    const winner = current.playerTeam[current.activeIndex] ?? current.playerTeam[0]
    const enemyLevel = Math.round(
      current.enemyTeam.reduce((sum, unit) => sum + unit.level, 0) / current.enemyTeam.length,
    )
    onVictoryRef.current(winner.speciesId, enemyLevel)
    if (frozenEncounter.kind === 'gym') onGymVictoryRef.current?.(frozenEncounter.gym.id)
    if (frozenEncounter.kind === 'elite-four') onEliteFourVictoryRef.current?.()
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

  useEffect(() => {
    const id = window.setTimeout(() => setIntroPlaying(false), BATTLE_INTRO_MS)
    return () => window.clearTimeout(id)
  }, [])

  // Clears any pending capture-animation timers if the screen unmounts
  // mid-sequence (e.g. the player somehow navigates away before it finishes).
  // `timeouts` below is the SAME array object captureTimeoutsRef.current
  // points to (arrays are reference types) — later pushes to it from
  // startCaptureAnimation are still visible here at cleanup time.
  useEffect(() => {
    const timeouts = captureTimeoutsRef.current
    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  // Rolls the capture right away (onCapture already mutated the save and
  // knows the outcome) but holds the result text back until the throw +
  // shake animation plays out, so the player watches the ball before
  // finding out whether it worked.
  function startCaptureAnimation(ballId: string) {
    const message = onCapture?.(ballId) ?? null
    setShowBallMenu(false)
    setCapturePhase('throwing')
    captureTimeoutsRef.current.push(
      window.setTimeout(() => setCapturePhase('shaking'), CAPTURE_THROW_MS),
      window.setTimeout(() => {
        setCapturePhase('idle')
        setPostVictoryMessage(message)
      }, CAPTURE_THROW_MS + CAPTURE_SHAKE_MS),
    )
  }

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
  // Pokeball row (official-games style) for whichever trainer's team is
  // currently up — only worth rendering for actual multi-Pokémon trainer
  // fights (gym, Elite Four member), never a 1-Pokémon wild encounter.
  const trainerBalls = currentTrainerBalls(battle)

  return (
    <div className="battle-screen">
      {/* Always mounted (min-height reserved in CSS) — unmounting this when
          hitMessage clears would shift everything below it up, including a
          QTE hold button, right out from under the player's finger. */}
      {introPlaying && <div className="battle-start-flash" />}
      <p className="battle-hit-message">{hitMessage}</p>
      <div
        className={`battle-enemy${introPlaying ? ' battle-enemy--intro' : ''}${telegraph ? ' battle-enemy--telegraph' : ''}${capturePhase === 'shaking' ? ' battle-enemy--capturing' : ''}`}
      >
        <img src={activeEnemyEntry.sprite.local} alt={activeEnemyEntry.name} />
        <p>
          {activeEnemyEntry.name} Nv.{activeEnemyUnit.level}
          {trainerProgress
            ? ` (${trainerProgress.name} ${trainerProgress.position}/${trainerProgress.size})`
            : battle.enemyTeam.length > 1 && ` (${battle.enemyIndex + 1}/${battle.enemyTeam.length})`}
        </p>
        {trainerBalls.length > 1 && (
          <div className="trainer-balls">
            {trainerBalls.map((ball, index) => (
              <span
                key={index}
                className={`trainer-ball${ball.fainted ? ' trainer-ball--fainted' : ''}${ball.current ? ' trainer-ball--current' : ''}`}
              />
            ))}
          </div>
        )}
        <HpBar current={activeEnemyUnit.currentHp} max={activeEnemyUnit.maxHp} />
        {capturePhase !== 'idle' && (
          <div className={`capture-animation capture-animation--${capturePhase}`}>
            <div className="capture-pokeball" />
          </div>
        )}
      </div>

      {battle.outcome === 'ongoing' && active && activeEntry && battle.awaitingQte && (
        <div className="pokemon-detail">
          <QteModal type={battle.awaitingQte} onComplete={(result) => setBattle((current) => resolveQteAttack(current, result))} />
        </div>
      )}

      {battle.outcome === 'ongoing' && active && activeEntry && !battle.awaitingQte && (
        <>
          <button
            className={`battle-tap-area${introPlaying ? ' battle-tap-area--intro' : ''}`}
            onClick={() => setBattle((current) => applyPlayerTap(current))}
            disabled={introPlaying}
          >
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

          {frozenEncounter.kind === 'elite-four' && (
            <>
              <p>Vitória! Você derrotou a Elite Four e o Campeão!</p>
              <p>Seu time entrou pra Victory Road. Quando quiser, dá pra fazer rebirth na tela do clicker.</p>
              <button onClick={onExit}>Continuar</button>
            </>
          )}

          {frozenEncounter.kind === 'wild' && postVictoryMessage === null && capturePhase === 'idle' && !showBallMenu && (
            <>
              <p>Vitória! Capturar ou pegar o loot?</p>
              <button onClick={() => setShowBallMenu(true)}>Capturar</button>
              <button onClick={() => setPostVictoryMessage(onLoot?.() ?? null)}>Pegar Loot</button>
            </>
          )}

          {frozenEncounter.kind === 'wild' && postVictoryMessage === null && capturePhase === 'idle' && showBallMenu && (
            <>
              <p>Qual bola?</p>
              <div className="ball-choice-menu">
                {captureOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => startCaptureAnimation(option.id)}
                    disabled={option.count !== null && option.count <= 0}
                  >
                    {option.name} ({option.count === null ? '∞' : option.count}) — {Math.round(option.chance * 100)}%
                  </button>
                ))}
              </div>
              <button onClick={() => setShowBallMenu(false)}>Voltar</button>
            </>
          )}

          {frozenEncounter.kind === 'wild' && postVictoryMessage === null && capturePhase !== 'idle' && (
            <p>Capturando...</p>
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
