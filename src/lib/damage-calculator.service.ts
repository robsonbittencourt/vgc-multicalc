import { Injectable } from '@angular/core';
import { calculate, Field, Generations, Move, Result } from '@smogon/calc';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class DamageCalculatorService {

  calcDamage(attacker: Pokemon, target: Pokemon, move: string, field: Field) {
    const gen = Generations.get(9);
    const moveSmogon = new Move(gen, move)
    const result = calculate(gen, attacker.pokemonSmogon, target.pokemonSmogon, moveSmogon, field)

    target.result = result.moveDesc()
    target.koChance = this.koChance(result)
    target.damage = this.maxPercentageDamage(result)
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
