import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class UnnerveAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, _target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, _field?: Field): void {
    const hasUnnerve = attacker.hasAbility("Unnerve", "As One (Glastrier)", "As One (Spectrier)") || ["Unnerve", "As One (Glastrier)", "As One (Spectrier)"].some(ability => secondAttacker?.hasAbility(ability))

    if (hasUnnerve) {
      calcField.isUnnerve = true
    }
  }
}
