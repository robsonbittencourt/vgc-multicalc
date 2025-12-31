import { Injectable } from "@angular/core"
import { SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { Move as MoveSmogon, Pokemon as PokemonSmogon, Result } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class RuinationCalculator implements SpecificDamageCalculator {
  isApplicable(moveModel: MoveSmogon): boolean {
    return moveModel.name === "Ruination"
  }

  calculate(target: PokemonSmogon, baseResult: Result): Result {
    const halfHp = Math.floor(target.originalCurHP / 2)
    const damage = Math.max(halfHp, 1)

    baseResult.damage = damage

    if (this.koChance(baseResult) !== "guaranteed OHKO") {
      const originalDesc = baseResult.desc.bind(baseResult)
      baseResult.desc = () => {
        const desc = originalDesc()
        const ohkoIndex = desc.indexOf("-- guaranteed OHKO")
        if (ohkoIndex === -1) {
          const koIndex = desc.indexOf("--")
          if (koIndex !== -1) {
            return desc.substring(0, koIndex).trim()
          }
        }
        return desc
      }
    }

    return baseResult
  }

  private koChance(result: Result): string {
    try {
      return result.kochance().text
    } catch (ex) {
      return "Does not cause any damage"
    }
  }
}
