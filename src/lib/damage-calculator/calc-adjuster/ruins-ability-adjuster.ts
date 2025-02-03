import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class RuinsAbilityAdjuster implements CalcAdjuster {
  adjust(attacker: SmogonPokemon, target: SmogonPokemon, move: Move, moveSmogon: MoveSmogon, field: FieldSmogon, secondAttacker?: Pokemon) {
    if (!secondAttacker) {
      return
    }

    if (attacker.ability == "Tablets of Ruin" || secondAttacker?.ability.is("Tablets of Ruin")) {
      field.isTabletsOfRuin = true
    }

    if (attacker.ability == "Sword of Ruin" || secondAttacker?.ability.is("Sword of Ruin")) {
      field.isSwordOfRuin = true
    }

    if (attacker.ability == "Vessel of Ruin" || secondAttacker?.ability.is("Vessel of Ruin")) {
      field.isVesselOfRuin = true
    }

    if (attacker.ability == "Beads of Ruin" || secondAttacker?.ability.is("Beads of Ruin")) {
      field.isBeadsOfRuin = true
    }
  }
}
