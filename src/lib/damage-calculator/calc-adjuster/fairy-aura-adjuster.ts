import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@calc"

@Injectable({
  providedIn: "root"
})
export class FairyAuraAdjuster implements CalcAdjuster {
  adjust(attacker: SmogonPokemon, target: SmogonPokemon, _move: Move, _moveSmogon: MoveSmogon, smogonField: FieldSmogon, secondAttacker?: Pokemon, field?: Field) {
    const hasFairyAura = attacker.ability === "Fairy Aura" || target.ability === "Fairy Aura" || secondAttacker?.hasAbility("Fairy Aura")

    if (hasFairyAura || field?.isFairyAura) {
      smogonField.isFairyAura = true
    }
  }
}
