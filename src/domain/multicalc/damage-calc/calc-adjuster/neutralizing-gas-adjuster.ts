import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"
import { AbilityName, ItemName } from "@data/types"

export class NeutralizingGasAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, _calcField: FieldCalc, secondAttacker?: Pokemon, field?: Field): void {
    const isGasActive = field?.isNeutralizingGas || attacker.ability === "Neutralizing Gas" || target.ability === "Neutralizing Gas" || secondAttacker?.hasAbility("Neutralizing Gas")

    if (!isGasActive) {
      return
    }

    if (this.isAffectedByNeutralizingGas(attacker.item, attacker.ability)) {
      attacker.ability = "Imposter" as AbilityName
      attacker.abilityOn = false
      attacker.boostedStat = undefined
    }

    if (this.isAffectedByNeutralizingGas(target.item, target.ability)) {
      target.ability = "Imposter" as AbilityName
      target.abilityOn = false
      target.boostedStat = undefined
    }
  }

  isAffectedByNeutralizingGas(item?: ItemName, ability?: AbilityName): boolean {
    if (item == "Ability Shield") {
      return false
    }

    const notAffectedAbilities = ["Neutralizing Gas", "Multitype", "Power Construct", "Disguise", "Ice Face", "As One (Spectrier)", "Tera Shift"]

    return !notAffectedAbilities.includes(ability!)
  }
}
