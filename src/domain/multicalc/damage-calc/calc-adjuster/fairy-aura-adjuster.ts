import { CalcAdjuster } from "./calc-adjuster"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

export class FairyAuraAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, field?: Field) {
    const hasFairyAura = attacker.ability === "Fairy Aura" || target.ability === "Fairy Aura" || secondAttacker?.hasAbility("Fairy Aura")

    if (hasFairyAura || field?.isFairyAura) {
      calcField.isFairyAura = true
    }
  }
}
