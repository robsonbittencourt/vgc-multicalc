import { CalcAdjuster } from "@multicalc/calc-adjuster/calc-adjuster"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class RuinsAbilityAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, field?: Field) {
    const isGasActive = field?.isNeutralizingGas || attacker.ability === "Neutralizing Gas" || target.ability === "Neutralizing Gas" || secondAttacker?.hasAbility("Neutralizing Gas")

    if (isGasActive) {
      calcField.isTabletsOfRuin = false
      calcField.isSwordOfRuin = false
      calcField.isVesselOfRuin = false
      calcField.isBeadsOfRuin = false

      return
    }

    if (!secondAttacker) {
      return
    }

    if (attacker.ability == "Tablets of Ruin" || secondAttacker?.ability.is("Tablets of Ruin")) {
      calcField.isTabletsOfRuin = true
    }

    if (attacker.ability == "Sword of Ruin" || secondAttacker?.ability.is("Sword of Ruin")) {
      calcField.isSwordOfRuin = true
    }

    if (attacker.ability == "Vessel of Ruin" || secondAttacker?.ability.is("Vessel of Ruin")) {
      calcField.isVesselOfRuin = true
    }

    if (attacker.ability == "Beads of Ruin" || secondAttacker?.ability.is("Beads of Ruin")) {
      calcField.isBeadsOfRuin = true
    }
  }
}
