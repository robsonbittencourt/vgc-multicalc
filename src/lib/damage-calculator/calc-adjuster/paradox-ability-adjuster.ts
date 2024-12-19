import { Injectable } from "@angular/core"
import { StatIDExceptHP } from "@robsonbittencourt/calc/dist/data/interface"
import { Pokemon } from "src/lib/model/pokemon"
import { CalcAdjuster } from "./calc-adjuster"

@Injectable({
  providedIn: 'root'
})
export class ParadoxAbilityAdjuster implements CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon) {
    this.applyStatBoost(attacker)
    this.applyStatBoost(target)
  }

  private applyStatBoost(pokemon: Pokemon) {
    if (pokemon.isParadoxAbility() && pokemon.abilityOn) {
      pokemon.pokemonSmogon.boostedStat = this.higherStat(pokemon)
    } else {
      pokemon.pokemonSmogon.boostedStat = undefined
    }
  }

  private higherStat(pokemon: Pokemon): StatIDExceptHP {
    let bestStat = this.getModifiedStat(pokemon, "atk")
    let bestStatDescription: StatIDExceptHP = "atk"

    const def = this.getModifiedStat(pokemon, "def")
    if (def > bestStat) {
      bestStat = def
      bestStatDescription = "def"
    }

    const spa = this.getModifiedStat(pokemon, "spa")
    if (spa > bestStat) {
      bestStat = spa
      bestStatDescription = "spa"
    }

    const spd = this.getModifiedStat(pokemon, "spd")
    if (spd > bestStat) {
      bestStat = spd
      bestStatDescription = "spd"
    }

    const spe = this.getModifiedStat(pokemon, "spe")
    if (spe > bestStat) {
      bestStat = spe
      bestStatDescription = "spe"
    }

    return bestStatDescription
  }

  private getModifiedStat(pokemon: Pokemon, stat: StatIDExceptHP): number {
    return this.getModifiedStatFromBoosters(pokemon.pokemonSmogon.rawStats[stat], pokemon.boosts[stat])
  }

  //smogon/damage-calc/calc/src/mechanics/util.ts
  private getModifiedStatFromBoosters(stat: number, mod: number): number {
    const numerator = 0
    const denominator = 1
    const modernGenBoostTable = [
      [2, 8],
      [2, 7],
      [2, 6],
      [2, 5],
      [2, 4],
      [2, 3],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
      [8, 2],
    ];
    stat = this.OF16(stat * modernGenBoostTable[6 + mod][numerator])
    stat = Math.floor(stat / modernGenBoostTable[6 + mod][denominator])

    return stat;
  }

  private OF16(n: number) {
    return n > 65535 ? n % 65536 : n;
  }
}