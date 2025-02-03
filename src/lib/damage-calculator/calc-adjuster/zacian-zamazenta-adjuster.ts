import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { AbilityName } from "@robsonbittencourt/calc/dist/data/interface"

@Injectable({
  providedIn: "root"
})
export class ZacianZamazentaAdjuster implements CalcAdjuster {
  adjust(attacker: SmogonPokemon, target: SmogonPokemon) {
    if (attacker.name.startsWith("Zacian") || attacker.name.startsWith("Zamazenta")) {
      attacker.ability = "Intimidate" as AbilityName
    }

    if (target.name.startsWith("Zacian") || target.name.startsWith("Zamazenta")) {
      target.ability = "Intimidate" as AbilityName
    }
  }
}
