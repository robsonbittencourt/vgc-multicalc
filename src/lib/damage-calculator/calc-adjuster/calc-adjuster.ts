import { InjectionToken } from "@angular/core"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

export interface CalcAdjuster {
  adjust(attacker: SmogonPokemon, target: SmogonPokemon, move: Move, moveSmogon: MoveSmogon, field: FieldSmogon, secondAttacker?: Pokemon): void
}

export const CALC_ADJUSTERS = new InjectionToken<CalcAdjuster[]>("CALC_ADJUSTERS")
