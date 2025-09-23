import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Chlorophyll } from "./chlorophyll"
import { Paradox } from "./paradox"
import { QuickFeet } from "./quick-feet"
import { SandRush } from "./sand-rush"
import { SlowStart } from "./slow-start"
import { SlushRush } from "./slush-rush"
import { SurgeSurfer } from "./surge-surfer"
import { SwiftSwim } from "./swift-swim"
import { Unburden } from "./unburden"

export interface SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean
  getModifier(): number
}

export const abilityStrategies: SpeedAbilityStrategy[] = [new Chlorophyll(), new Paradox(), new QuickFeet(), new SandRush(), new SlowStart(), new SlushRush(), new SurgeSurfer(), new SwiftSwim(), new Unburden()]
