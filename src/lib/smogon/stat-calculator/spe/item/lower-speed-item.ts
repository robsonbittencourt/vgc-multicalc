import { Pokemon } from "@lib/model/pokemon"
import { SpeedItemStrategy } from "./speed-item-strategy"

export class LowerSpeedItems implements SpeedItemStrategy {
  LOWER_SPEED_ITEMS = ["Macho Brace", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight", "Iron Ball"]

  shouldApply(pokemon: Pokemon): boolean {
    return this.LOWER_SPEED_ITEMS.includes(pokemon.item)
  }

  getModifier(): number {
    return 2048
  }
}
