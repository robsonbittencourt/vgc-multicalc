import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export interface CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon, move: Move, moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, field?: Field): void
}
