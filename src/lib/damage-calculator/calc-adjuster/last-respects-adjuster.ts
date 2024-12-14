import { Injectable } from "@angular/core"
import { Move as MoveSmogon } from "@robsonbittencourt/calc"
import { Move } from "src/lib/move"
import { Pokemon } from "src/lib/pokemon"
import { CalcAdjuster } from "./calc-adjuster"

@Injectable({
  providedIn: 'root'
})
export class LastRespectsAdjuster implements CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon, move: Move, moveSmogon: MoveSmogon) {
    if (move.name == "Last Respects") {
      const adjustedBasePower = 50 + (50 * +move.alliesFainted)
      moveSmogon.overrides = { basePower: adjustedBasePower}
    }
  }
}

