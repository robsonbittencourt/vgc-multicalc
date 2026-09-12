import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class SteelySpiritAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, field?: Field): void {
    const isGasActive = field?.isNeutralizingGas || attacker.ability === "Neutralizing Gas" || target.ability === "Neutralizing Gas" || secondAttacker?.hasAbility("Neutralizing Gas")

    if (isGasActive) {
      calcField.attackerSide.isSteelySpirit = false

      return
    }

    if (secondAttacker?.hasAbility("Steely Spirit")) {
      calcField.attackerSide.isSteelySpirit = true
    }
  }
}
