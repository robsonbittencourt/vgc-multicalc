import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class SteelySpiritAdjuster implements CalcAdjuster {
  adjust(_attacker: CalcPokemon, _target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, _field?: Field): void {
    if (secondAttacker?.hasAbility("Steely Spirit")) {
      calcField.attackerSide.isSteelySpirit = true
    }
  }
}
