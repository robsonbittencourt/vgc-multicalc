import { CalcAdjuster } from "@multicalc/calc-adjuster/calc-adjuster"
import { Pokemon as CalcPokemon } from "@calc"
import { AbilityName } from "@data/types"

export class OgerponAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon) {
    if (attacker.name.startsWith("Ogerpon") && attacker.teraType) {
      attacker.ability = "Intimidate" as AbilityName
    }

    if (target.name.startsWith("Ogerpon") && target.teraType) {
      target.ability = "Intimidate" as AbilityName
    }
  }
}
