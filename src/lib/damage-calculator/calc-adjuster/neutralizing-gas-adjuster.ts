import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Move } from "@lib/model/move"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { AbilityName, ItemName } from "@robsonbittencourt/calc/dist/data/interface"

@Injectable({
  providedIn: "root"
})
export class NeutralizingGasAdjuster implements CalcAdjuster {
  adjust(attacker: SmogonPokemon, target: SmogonPokemon, move: Move, moveSmogon: MoveSmogon, smogonField: FieldSmogon, secondAttacker?: Pokemon, field?: Field): void {
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
