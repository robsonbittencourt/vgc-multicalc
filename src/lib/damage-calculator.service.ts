import { Injectable } from '@angular/core';
import { calculate, Field, Generations, Move, Result } from '@smogon/calc';
import { StatIDExceptHP } from '@smogon/calc/dist/data/interface';
import { DamageResult } from './damage-result';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class DamageCalculatorService {

  ZERO_RESULT_DAMAGE = Array(16).fill(0)

  calcDamage(attacker: Pokemon, target: Pokemon, field: Field, criticalHit: boolean = false): DamageResult {
    const result = this.calculateResult(attacker, target, field, criticalHit)
    return new DamageResult(result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage as number[]) 
  }

  calcDamageForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, criticalHit: boolean = false): DamageResult {
    const adjustedField = this.adjustFieldToRuins(field, attacker, secondAttacker)
    
    const result = this.calculateResult(attacker, target, adjustedField, criticalHit)
    const secondResult = this.calculateResult(secondAttacker, target, adjustedField, criticalHit)
    result.damage = this.sumDamageResult(result, secondResult)

    return new DamageResult(result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result))
  }

  private calculateResult(attacker: Pokemon, target: Pokemon, field: Field, criticalHit: boolean) {
    const gen = Generations.get(9)
    const moveSmogon = new Move(gen, attacker.move.name)
    moveSmogon.isCrit = criticalHit
    moveSmogon.isStellarFirstUse = true
    moveSmogon.hits = +attacker.move.hits
    
    if (attacker.move.name == "Rage Fist") {
      const adjustedBasePower = 50 + (50 * +attacker.move.hits)
      moveSmogon.overrides = { basePower: adjustedBasePower}
    }

    if ((attacker.move.name == "Tera Starstorm" || attacker.move.name == "Tera Blast") && attacker.teraType == "Stellar" && attacker.teraTypeActive) {
      moveSmogon.overrides = { type: "Stellar" }
    }
    
    attacker = this.adjustCommander(attacker)
    target = this.adjustCommander(target)

    this.adjustParadoxAbility(attacker)
    this.adjustParadoxAbility(target)

    const result = calculate(gen, attacker.pokemonSmogon, target.pokemonSmogon, moveSmogon, field)

    if(!result.damage) {
      result.damage = this.ZERO_RESULT_DAMAGE
      return result
    }

    return calculate(gen, attacker.pokemonSmogon, target.pokemonSmogon, moveSmogon, field)
  }

  private sumDamageResult(result: Result, secondResult: Result): number[] {
    const firstDamage = result.damage as number[]
    const secondDamage = secondResult.damage as number[]

    return firstDamage.map((num, idx) => num + secondDamage[idx])
  }

  private koChance(result: Result): string {
    try {
      return result.kochance().text
    } catch (ex) {
      return "Does not cause any damage"
    }
  }

  private maxPercentageDamage(result: Result): number {
    return +result.moveDesc().substring(result.moveDesc().indexOf("- ") + 1, result.moveDesc().indexOf("%"))
  }

  private damageDescription(result: Result): string {
    try {
      return result.desc()  
    } catch (error) {
      
      return `${result.attacker.name} ${result.move.name} vs. ${result.defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`
    }    
  }

  private adjustCommander(pokemon: Pokemon): Pokemon {
    let adjustedPokemon = pokemon
    
    if(pokemon.commanderActivated) {
      adjustedPokemon = pokemon.clone()
      adjustedPokemon.incrementBoostsPlusTwo()
    }

    return adjustedPokemon
  }

  private adjustParadoxAbility(pokemon: Pokemon) {
    if (pokemon.paradoxAbilityActivated) {
      pokemon.pokemonSmogon.boostedStat = this.higherStat(pokemon)
    } else {
      pokemon.pokemonSmogon.boostedStat = undefined
    }
  }

  private adjustFieldToRuins(field: Field, attacker: Pokemon, secondAttacker: Pokemon): Field {
    const adjustedField = field.clone()
    
    if(attacker.ability == "Tablets Of Ruin" || attacker.ability == "Tablets Of Ruin") {
      adjustedField.isTabletsOfRuin = true
    }

    if(attacker.ability == "Sword Of Ruin" || attacker.ability == "Sword Of Ruin") {
      adjustedField.isSwordOfRuin = true
    }

    if(attacker.ability == "Vessel Of Ruin" || attacker.ability == "Vessel Of Ruin") {
      adjustedField.isVesselOfRuin = true
    }

    if(attacker.ability == "Beads of Ruin" || attacker.ability == "Beads of Ruin") {
      adjustedField.isBeadsOfRuin = true
    }

    return adjustedField
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
    return this.getModifiedStatFromBoosters(pokemon.pokemonSmogon.rawStats[stat], pokemon.pokemonSmogon.boosts[stat])
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
