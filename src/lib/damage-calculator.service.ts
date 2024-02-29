import { Injectable } from '@angular/core';
import { calculate, Field, Generations, Move, Result } from '@smogon/calc';
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
}
