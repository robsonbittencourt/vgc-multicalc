import { InjectionToken } from "@angular/core"
import { Field as FieldSmogon, Move as MoveSmogon } from "@robsonbittencourt/calc"
import { Move } from "src/lib/model/move"
import { Pokemon } from "src/lib/model/pokemon"

export interface CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon, move: Move, moveSmogon: MoveSmogon, field: FieldSmogon, secondAttacker?: Pokemon): void
}

export const CALC_ADJUSTERS = new InjectionToken<CalcAdjuster[]>('CALC_ADJUSTERS')
