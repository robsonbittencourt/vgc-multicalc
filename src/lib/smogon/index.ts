import { Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import SpeedStatCalculator from "./stat-calculator/spe/modified-spe"

@Injectable({ providedIn: "root" })
export class SmogonFunctions {
  private speedCalc = new SpeedStatCalculator()

  getFinalSpeed(pokemon: Pokemon, field: Field, isTailwind: boolean): number {
    return this.speedCalc.getFinalSpeed(pokemon, field, isTailwind)
  }
}
