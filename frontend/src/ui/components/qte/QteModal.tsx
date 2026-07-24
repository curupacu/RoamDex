import type { TypeName } from '../../../content/types'
import type { QteResult } from '../../../systems/battle/qte/grading'
import { ElectricQte } from './ElectricQte'
import { FightingQte } from './FightingQte'
import { FireQte } from './FireQte'
import { FlyingQte } from './FlyingQte'
import { GrassQte } from './GrassQte'
import { GroundQte } from './GroundQte'
import { IceQte } from './IceQte'
import { NormalQte } from './NormalQte'
import { PoisonQte } from './PoisonQte'
import { PsychicQte } from './PsychicQte'
import { RockQte } from './RockQte'
import { WaterQte } from './WaterQte'

interface QteModalProps {
  type: TypeName
  onComplete: (result: QteResult) => void
}

// Adding a new type's QTE means adding one case here + its component —
// the battle engine only needs a content/moves.ts entry (see hasQte()).
export function QteModal({ type, onComplete }: QteModalProps) {
  switch (type) {
    case 'grass':
      return <GrassQte onComplete={onComplete} />
    case 'fire':
      return <FireQte onComplete={onComplete} />
    case 'water':
      return <WaterQte onComplete={onComplete} />
    case 'electric':
      return <ElectricQte onComplete={onComplete} />
    case 'normal':
      return <NormalQte onComplete={onComplete} />
    case 'fighting':
      return <FightingQte onComplete={onComplete} />
    case 'ice':
      return <IceQte onComplete={onComplete} />
    case 'poison':
      return <PoisonQte onComplete={onComplete} />
    case 'ground':
      return <GroundQte onComplete={onComplete} />
    case 'flying':
      return <FlyingQte onComplete={onComplete} />
    case 'psychic':
      return <PsychicQte onComplete={onComplete} />
    case 'rock':
      return <RockQte onComplete={onComplete} />
    default:
      return null
  }
}
