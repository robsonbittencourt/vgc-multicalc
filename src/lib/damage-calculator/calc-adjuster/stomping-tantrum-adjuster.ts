import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Move } from "@lib/model/move"
import { Move as MoveSmogon, Pokemon as SmogonPokemon } from "@calc"

@Injectable({
  providedIn: "root"
})
export class StompingTantrumAdjuster implements CalcAdjuster {
  adjust(_attacker: SmogonPokemon, _target: SmogonPokemon, move: Move, moveSmogon: MoveSmogon) {
    if (move.name == "Stomping Tantrum" && move.lastMoveFailed) {
      moveSmogon.bp = 150
      moveSmogon.overrides = { basePower: 150 }
    }
  }
}
