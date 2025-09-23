import { Pokemon } from "@lib/model/pokemon"
import { ChoiceScarf } from "./choice-scarf"
import { LowerSpeedItems } from "./lower-speed-item"
import { QuickPowder } from "./quick-powder"

export interface SpeedItemStrategy {
  shouldApply(pokemon: Pokemon): boolean
  getModifier(): number
}

export const itemStrategies: SpeedItemStrategy[] = [new ChoiceScarf(), new LowerSpeedItems(), new QuickPowder()]
