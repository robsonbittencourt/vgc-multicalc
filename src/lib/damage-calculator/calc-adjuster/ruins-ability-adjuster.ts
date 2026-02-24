import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class RuinsAbilityAdjuster implements CalcAdjuster {
  adjust(attacker: SmogonPokemon, target: SmogonPokemon, move: Move, moveSmogon: MoveSmogon, smogonField: FieldSmogon, secondAttacker?: Pokemon, field?: Field) {
    const isGasActive = field?.isNeutralizingGas || attacker.ability === "Neutralizing Gas" || target.ability === "Neutralizing Gas" || secondAttacker?.hasAbility("Neutralizing Gas")

    if (isGasActive) {
      smogonField.isTabletsOfRuin = false
      smogonField.isSwordOfRuin = false
      smogonField.isVesselOfRuin = false
      smogonField.isBeadsOfRuin = false

      return
    }

    if (!secondAttacker) {
      return
    }

    if (attacker.ability == "Tablets of Ruin" || secondAttacker?.ability.is("Tablets of Ruin")) {
      smogonField.isTabletsOfRuin = true
    }

    if (attacker.ability == "Sword of Ruin" || secondAttacker?.ability.is("Sword of Ruin")) {
      smogonField.isSwordOfRuin = true
    }

    if (attacker.ability == "Vessel of Ruin" || secondAttacker?.ability.is("Vessel of Ruin")) {
      smogonField.isVesselOfRuin = true
    }

    if (attacker.ability == "Beads of Ruin" || secondAttacker?.ability.is("Beads of Ruin")) {
      smogonField.isBeadsOfRuin = true
    }
  }
}
