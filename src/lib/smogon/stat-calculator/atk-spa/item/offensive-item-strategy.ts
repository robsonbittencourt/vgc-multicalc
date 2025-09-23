import { Pokemon } from "@lib/model/pokemon"
import { ChoiceBand } from "./choice-band"
import { ChoiceSpecs } from "./choice-specs"
import { LightBall } from "./lightball"

export interface OffensiveItemStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon): boolean
  getModifier(): number
}

export const itemStrategies: OffensiveItemStrategy[] = [new LightBall(), new ChoiceBand(), new ChoiceSpecs()]
