import { CalcAdjuster } from "@multicalc/calc-adjuster/calc-adjuster"
import { Pokemon as CalcPokemon } from "@calc"
import { AbilityName } from "@data/types"

export class ZacianZamazentaAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon) {
    if (attacker.name.startsWith("Zacian") || attacker.name.startsWith("Zamazenta")) {
      attacker.ability = "Intimidate" as AbilityName
    }

    if (target.name.startsWith("Zacian") || target.name.startsWith("Zamazenta")) {
      target.ability = "Intimidate" as AbilityName
    }
  }
}
