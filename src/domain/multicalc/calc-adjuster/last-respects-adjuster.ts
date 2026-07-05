import { CalcAdjuster } from "@multicalc/calc-adjuster/calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class LastRespectsAdjuster implements CalcAdjuster {
  adjust(_attacker: CalcPokemon, _target: CalcPokemon, move: Move, moveCalc: MoveCalc) {
    if (move.name == "Last Respects") {
      const adjustedBasePower = 50 + 50 * +move.alliesFainted
      moveCalc.overrides = { basePower: adjustedBasePower }
    }
  }
}
