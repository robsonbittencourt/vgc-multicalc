import { Injectable } from "@angular/core"
import { Field as FieldSmogon, Move as MoveSmogon } from '@robsonbittencourt/calc'
import { Move } from "src/lib/move"
import { Pokemon } from "src/lib/pokemon"
import { CalcAdjuster } from "./calc-adjuster"

@Injectable({
  providedIn: 'root'
})
export class RuinsAbilityAdjuster implements CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon, move: Move, moveSmogon: MoveSmogon, field: FieldSmogon, secondAttacker?: Pokemon) {
    if(!secondAttacker) {
      return
    }

    if(attacker.ability == "Tablets of Ruin" || secondAttacker?.ability == "Tablets of Ruin") {
      field.isTabletsOfRuin = true
    }

    if(attacker.ability == "Sword of Ruin" || secondAttacker?.ability == "Sword of Ruin") {
      field.isSwordOfRuin = true
    }

    if(attacker.ability == "Vessel of Ruin" || secondAttacker?.ability == "Vessel of Ruin") {
      field.isVesselOfRuin = true
    }

    if(attacker.ability == "Beads of Ruin" || secondAttacker?.ability == "Beads of Ruin") {
      field.isBeadsOfRuin = true
    }
  }
}

