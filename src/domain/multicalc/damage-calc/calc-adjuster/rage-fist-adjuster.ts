import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class RageFistAdjuster implements CalcAdjuster {
  adjust(_attacker: CalcPokemon, _target: CalcPokemon, move: Move, moveCalc: MoveCalc) {
    if (move.name == "Rage Fist") {
      const adjustedBasePower = 50 + 50 * +move.hits
      moveCalc.overrides = { basePower: adjustedBasePower }
    }
  }
}
