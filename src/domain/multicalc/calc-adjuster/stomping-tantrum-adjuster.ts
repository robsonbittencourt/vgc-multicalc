import { CalcAdjuster } from "@multicalc/calc-adjuster/calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class StompingTantrumAdjuster implements CalcAdjuster {
  adjust(_attacker: CalcPokemon, _target: CalcPokemon, move: Move, moveCalc: MoveCalc) {
    if (move.name == "Stomping Tantrum" && move.lastMoveFailed) {
      moveCalc.bp = 150
      moveCalc.overrides = { basePower: 150 }
    }
  }
}
