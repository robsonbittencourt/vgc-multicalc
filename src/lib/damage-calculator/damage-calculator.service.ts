import { inject, Injectable } from "@angular/core"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { FieldMapper } from "@lib/field-mapper"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { SmogonPokemonBuilder } from "@lib/smogon/smogon-pokemon-builder"
import { calculate, Generations, Move as MoveSmogon, Result } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class DamageCalculatorService {
  ZERO_RESULT_DAMAGE = Array(16).fill(0)

  adjusters = inject(CALC_ADJUSTERS)
  fieldMapper = inject(FieldMapper)
  builder = inject(SmogonPokemonBuilder)

  calcDamage(attacker: Pokemon, target: Pokemon, field: Field): DamageResult {
    const result = this.calculateResult(attacker, target, attacker.move, field, field.isCriticalHit)
    return new DamageResult(attacker, target, attacker.move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage as number[])
  }

  calcDamageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field): DamageResult[] {
    return attacker.moveSet.moves.map(move => {
      const result = this.calculateResult(attacker, target, move, field, field.isCriticalHit)
      return new DamageResult(attacker, target, move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage as number[])
    })
  }

  calcDamageForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field): [DamageResult, DamageResult] {
    const result = this.calculateResult(attacker, target, attacker.move, field, field.isCriticalHit, secondAttacker)
    const secondResult = this.calculateResult(secondAttacker, target, secondAttacker.move, field, field.isCriticalHit, attacker)
    result.damage = this.sumDamageResult(result, secondResult)

    return [
      new DamageResult(attacker, target, attacker.move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescriptionWithTwo(result, secondResult), undefined, secondAttacker),
      new DamageResult(secondAttacker, target, secondAttacker.move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescriptionWithTwo(result, secondResult), undefined, attacker)
    ]
  }

  private calculateResult(attacker: Pokemon, target: Pokemon, move: Move, field: Field, criticalHit: boolean, secondAttacker?: Pokemon): Result {
    const gen = Generations.get(9)
    const smogonField = this.fieldMapper.toSmogon(field)

    const moveSmogon = new MoveSmogon(gen, move.name)
    moveSmogon.isCrit = criticalHit
    moveSmogon.isStellarFirstUse = true
    moveSmogon.hits = +move.hits

    this.adjusters.forEach(a => a.adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker))

    const smogonAttacker = this.builder.fromExisting(attacker)
    const smogonTarget = this.builder.fromExisting(target)

    const result = calculate(gen, smogonAttacker, smogonTarget, moveSmogon, smogonField)

    if (!result.damage) {
      result.damage = this.ZERO_RESULT_DAMAGE
    }

    return result
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

  private damageDescriptionWithTwo(resultOne: Result, resultTwo: Result): string {
    try {
      const descriptionOne = resultOne.desc()
      const descriptionTwo = resultTwo.desc()
      const descriptionAttackerTwo = descriptionTwo.substring(0, descriptionTwo.indexOf(" vs."))

      const finalDescription = descriptionOne.substring(0, descriptionOne.indexOf(" vs.")) + " AND " + descriptionAttackerTwo + descriptionTwo.substring(descriptionTwo.indexOf(" vs."))

      return finalDescription
    } catch (error) {
      return `${resultOne.attacker.name} ${resultOne.move.name} AND ${resultTwo.attacker.name} ${resultTwo.move.name} vs. ${resultOne.defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`
    }
  }
}
