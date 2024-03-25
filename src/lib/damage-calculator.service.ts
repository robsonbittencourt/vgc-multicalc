import { Injectable } from '@angular/core';
import { calculate, Field, Generations, Move, Result } from '@smogon/calc';
import { StatIDExceptHP } from '@smogon/calc/dist/data/interface';
import { DamageResult } from './damage-result';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class DamageCalculatorService {

  calcDamage(attacker: Pokemon, target: Pokemon, move: string, field: Field, criticalHit: boolean = false): DamageResult {
    const gen = Generations.get(9)
    const moveSmogon = new Move(gen, move)
    moveSmogon.isCrit = criticalHit

    attacker = this.adjustCommander(attacker)
    target = this.adjustCommander(target)

    this.adjustParadoxAbility(attacker)

    const result = calculate(gen, attacker.pokemonSmogon, target.pokemonSmogon, moveSmogon, field)

    return new DamageResult(result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result))
  }

  private koChance(result: Result): string {
    try {
      return result.kochance().text
    } catch (ex) {
      return "Does not cause any damage"
    }
  }

  private maxPercentageDamage(result: Result): number {
    return +result.moveDesc().substring(result.moveDesc().indexOf("- ") + 1, result.moveDesc().lastIndexOf("%"))
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

  private higherStat(pokemon: Pokemon): StatIDExceptHP {
    let bestStat = pokemon.atk
    let bestStatDescription: StatIDExceptHP = "atk"
    
    if (pokemon.def > bestStat) {
      bestStat = pokemon.def
      bestStatDescription = "def"
    }

    if (pokemon.spa > bestStat) {
      bestStat = pokemon.spa
      bestStatDescription = "spa"
    }

    if (pokemon.spd > bestStat) {
      bestStat = pokemon.spd
      bestStatDescription = "spd"
    }

    if (pokemon.spe > bestStat) {
      bestStat = pokemon.spe
      bestStatDescription = "spe"
    }

    return bestStatDescription
  }

}
