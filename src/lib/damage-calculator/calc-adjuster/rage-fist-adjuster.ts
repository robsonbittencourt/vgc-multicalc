import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Move as MoveSmogon } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class RageFistAdjuster implements CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon, move: Move, moveSmogon: MoveSmogon) {
    if (move.name == "Rage Fist") {
      const adjustedBasePower = 50 + 50 * +move.hits
      moveSmogon.overrides = { basePower: adjustedBasePower }
    }
  }
}
