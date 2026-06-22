import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Move } from "@lib/model/move"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@calc"

@Injectable({
  providedIn: "root"
})
export class SupremeOverlordAdjuster implements CalcAdjuster {
  adjust(attacker: SmogonPokemon, _target: SmogonPokemon, move: Move, _moveSmogon: MoveSmogon, _smogonField: FieldSmogon, _secondAttacker?: Pokemon, _field?: Field) {
    if (attacker.ability === "Supreme Overlord") {
      attacker.alliesFainted = +move.alliesFainted
    }
  }
}
