import { InjectionToken } from "@angular/core"
import { Move as MoveSmogon, Pokemon as PokemonSmogon, Result } from "@robsonbittencourt/calc"

export interface SpecificDamageCalculator {
  isApplicable(moveModel: MoveSmogon): boolean
  calculate(target: PokemonSmogon, baseResult: Result): Result
}

export const SPECIFIC_DAMAGE_CALCULATORS = new InjectionToken<SpecificDamageCalculator[]>("SPECIFIC_DAMAGE_CALCULATORS")
