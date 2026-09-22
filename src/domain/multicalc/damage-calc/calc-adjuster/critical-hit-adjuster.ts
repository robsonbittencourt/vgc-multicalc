import { CalcAdjuster } from "./calc-adjuster"
import { Move } from "@multicalc/model/move"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"
import { getMoveData } from "@data/move-data"

const GUARANTEED_CRIT_STAGE = 3

const LEEK_HOLDERS = ["Farfetch’d", "Farfetch’d-Galar", "Sirfetch’d"]

export class CriticalHitAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, _target: CalcPokemon, move: Move, moveCalc: MoveCalc, _calcField: FieldCalc, _secondAttacker?: Pokemon, _field?: Field): void {
    if (moveCalc.isCrit) return

    const stage = this.moveStage(move) + this.itemStage(attacker) + this.abilityStage(attacker)

    if (stage >= GUARANTEED_CRIT_STAGE) {
      moveCalc.isCrit = true
    }
  }

  private moveStage(move: Move): number {
    return getMoveData(move.name)?.critRatio ?? 0
  }

  private itemStage(attacker: CalcPokemon): number {
    if (attacker.hasItem("Leek")) return LEEK_HOLDERS.includes(attacker.name) ? 2 : 0

    if (attacker.hasItem("Scope Lens")) return 1

    return 0
  }

  private abilityStage(attacker: CalcPokemon): number {
    return attacker.hasAbility("Super Luck") ? 1 : 0
  }
}
