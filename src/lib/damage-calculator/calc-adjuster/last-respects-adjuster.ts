import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Move as MoveSmogon } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: 'root'
})
export class LastRespectsAdjuster implements CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon, move: Move, moveSmogon: MoveSmogon) {
    if (move.name == "Last Respects") {
      const adjustedBasePower = 50 + (50 * +move.alliesFainted)
      moveSmogon.overrides = { basePower: adjustedBasePower }
    }
  }
}

