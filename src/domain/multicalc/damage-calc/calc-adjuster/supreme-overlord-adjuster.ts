import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class SupremeOverlordAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, _target: CalcPokemon, move: Move, _moveCalc: MoveCalc, _calcField: FieldCalc, _secondAttacker?: Pokemon, _field?: Field) {
    if (attacker.ability === "Supreme Overlord") {
      attacker.alliesFainted = +move.alliesFainted
    }
  }
}
