import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'
import { formatBigNumber } from '../../engine/numberFormat'
import { ownedCount } from '../../systems/economy/upgrades'
import { upgradeEarned } from '../../systems/economy/upgradeEarnings'
import { UpgradeCard } from './UpgradeCard'
import { UpgradeIcon } from './UpgradeIcon'

interface UpgradeSceneProps {
  regionDef: RegionDefinition
  region: RegionSave
}

// Quantas cópias cabem visíveis numa faixa antes dela contar como "cheia"
// (decisão 0030) — não é um teto de verdade (comprar além disso continua
// valendo economicamente), é só o alvo visual: encher a faixa é a
// recompensa estética que a pesquisa sobre Cookie Clicker mostrou ser um
// objetivo de jogo à parte da eficiência (CVGS, "function vs aesthetic").
const LANE_CAPACITY = 18

// "Fundo personalizado" por faixa (decisão 0034/0035) — banner de verdade,
// não um padrão CSS: reaproveita os fundos por localização que já existem
// (decisão 0024) em vez de pedir arte nova. Cada upgrade pega um banner
// diferente, na ordem, ciclando se tiver mais upgrades que fundos.
const LANE_BACKGROUNDS = [
  'forest.jpg',
  'beach.png',
  'cave.png',
  'mountain.png',
  'lake.png',
  'tall-grass.png',
  'desert.png',
  'snow.png',
  'ocean.png',
  'path.png',
]

function seededRandom(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  return (Math.abs(hash) % 1000) / 1000
}

// "Cena" dos geradores de CPS possuídos (decisão 0029/0030/0034/0035) —
// coluna do meio do game-area, uma faixa larga por upgrade (não mais
// quadradinho pequeno), cada uma com seu próprio banner de fundo, que
// enche conforme você compra mais cópias (até LANE_CAPACITY, aí ganha o
// brilho de "completo"). Ícone reaproveita o mesmo da decisão 0028.
export function UpgradeScene({ regionDef, region }: UpgradeSceneProps) {
  const owned = regionDef.upgrades.filter((def) => def.kind === 'cps' && ownedCount(region, def.id) > 0)
  if (owned.length === 0) return null

  return (
    <div className="upgrade-scene">
      {owned.map((def, laneIndex) => {
        const count = ownedCount(region, def.id)
        const filled = Math.min(count, LANE_CAPACITY)
        const isFull = count >= LANE_CAPACITY
        const background = LANE_BACKGROUNDS[laneIndex % LANE_BACKGROUNDS.length]

        const effectLabel =
          def.scalesWith === 'rosterSize'
            ? `+${def.effect} doces/s por Pokémon capturado`
            : `+${def.effect} doces/s`
        const laneStatus = isFull ? 'Completo!' : `${formatBigNumber(LANE_CAPACITY - count)} pra completar`

        return (
          <UpgradeCard
            key={def.id}
            name={`${def.name} (${count})`}
            effectLabel={`${effectLabel} — ${laneStatus}`}
            flavor={def.flavor}
            earnedLabel={`Já rendeu ${formatBigNumber(upgradeEarned(region, def.id))} doces`}
            className="upgrade-hover-wrap--lane"
          >
            <div
              className={`scene-lane${isFull ? ' scene-lane--full' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.45), rgba(10, 10, 20, 0.45)), url(/backgrounds/${background})` }}
            >
              {Array.from({ length: filled }, (_, i) => {
                const seed = `${def.id}-${i}`
                // Posição em grade (6 colunas x 3 linhas = 18) garante
                // espalhamento de verdade dentro da área útil da faixa — o
                // hash do seed sozinho não bastava (índices sequenciais tipo
                // "id-0".."id-7" geram valores quase iguais, ícones ficavam
                // praticamente empilhados uns sobre os outros). Faixa de
                // 10%-90% / 20%-80% garante que nenhum ícone, mesmo com o
                // jitter, encoste ou passe da borda da caixa.
                const col = i % 6
                const row = Math.floor(i / 6)
                const left = 10 + col * 16 + (seededRandom(seed) - 0.5) * 8
                const top = 20 + row * 30 + (seededRandom(seed + 'y') - 0.5) * 8
                return (
                  <UpgradeIcon
                    key={seed}
                    id={def.id}
                    alt=""
                    className="scene-lane-sprite"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  />
                )
              })}
            </div>
          </UpgradeCard>
        )
      })}
    </div>
  )
}
