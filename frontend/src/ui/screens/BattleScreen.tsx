import { useEffect, useRef, useState } from 'react'
import { ENEMY_ATTACK_INTERVAL_MS, TELEGRAPH_WINDOW_MS, TEST_OPPONENT_LEVEL, TEST_OPPONENT_SPECIES_ID } from '../../content/battle'
import type { Gen1Entry } from '../../content/gen1/types'
import { moveNameForStage } from '../../content/moves'
import { GameLoop } from '../../engine/gameLoop'
import type { SaveData } from '../../engine/save'
import {
  applyEnemyAttack,
  applyPlayerTap,
  createBattle,
  ENERGY_MAX,
  resolveQteAttack,
  switchActive,
  type BattleState,
} from '../../systems/battle/engine'
import { moveStage } from '../../systems/battle/moveStage'
import { HpBar } from '../components/HpBar'
import { QteModal } from '../components/qte/QteModal'

interface BattleScreenProps {
  gen1: Gen1Entry[]
  save: SaveData
  onVictory: (activeSpeciesId: number) => void
  onExit: () => void
}

export function BattleScreen({ gen1, save, onVictory, onExit }: BattleScreenProps) {
  const enemyEntry = gen1.find((entry) => entry.id === TEST_OPPONENT_SPECIES_ID)
  const [battle, setBattle] = useState<BattleState>(() =>
    createBattle(gen1, save.roster, save.activeTeamIds, enemyEntry ?? gen1[0], TEST_OPPONENT_LEVEL),
  )
  const battleRef = useRef(battle)
  battleRef.current = battle
  const [telegraph, setTelegraph] = useState(false)
  const [hitMessage, setHitMessage] = useState<string | null>(null)

  // A fresh `lastHit` object is produced on every hit (even repeats of the
  // same tier), so this effect naturally re-fires each time — no need to
  // compare against the previous value.
  useEffect(() => {
    if (!battle.lastHit || battle.lastHit.tier === 'normal') return

    setHitMessage(battle.lastHit.tier === 'super' ? 'Super efetivo!' : 'Não muito efetivo...')
    const id = setTimeout(() => setHitMessage(null), 900)
    return () => clearTimeout(id)
  }, [battle.lastHit])

  useEffect(() => {
    const loop = new GameLoop()
    let msUntilAttack = ENEMY_ATTACK_INTERVAL_MS

    const unsubscribe = loop.subscribe((deltaMs) => {
      if (battleRef.current.outcome !== 'ongoing' || battleRef.current.awaitingQte) return

      msUntilAttack -= deltaMs
      setTelegraph(msUntilAttack <= TELEGRAPH_WINDOW_MS)

      if (msUntilAttack <= 0) {
        setBattle((current) => applyEnemyAttack(current))
        msUntilAttack = ENEMY_ATTACK_INTERVAL_MS
      }
    })
    loop.start()

    return () => {
      unsubscribe()
      loop.stop()
    }
  }, [])

  if (!enemyEntry) return null

  const active = battle.playerTeam[battle.activeIndex]
  const activeEntry = active ? gen1.find((entry) => entry.id === active.speciesId) : null
  const activeMoveName =
    active && activeEntry ? moveNameForStage(active.type, moveStage(activeEntry, active.level)) : null

  return (
    <div className="battle-screen">
      {hitMessage && <p className="battle-hit-message">{hitMessage}</p>}
      <div className={`battle-enemy${telegraph ? ' battle-enemy--telegraph' : ''}`}>
        <img src={enemyEntry.sprite.local} alt={enemyEntry.name} />
        <p>
          {enemyEntry.name} Nv.{TEST_OPPONENT_LEVEL}
        </p>
        <HpBar current={battle.enemy.currentHp} max={battle.enemy.maxHp} />
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
          <p>Vitória!</p>
          <button onClick={() => onVictory(active?.speciesId ?? battle.playerTeam[0].speciesId)}>Continuar</button>
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
