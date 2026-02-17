import { inject, Injectable } from "@angular/core"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { FieldMapper } from "@lib/field-mapper"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { fromExisting } from "@lib/smogon/smogon-pokemon-builder"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { calculate, calculateMulti, Generations, Move as MoveSmogon, Result, MultiResult, StatID, Pokemon as PokemonSmogon, Field as FieldSmogon, getBerryRecovery } from "@robsonbittencourt/calc"
import { Generation } from "@robsonbittencourt/calc/dist/data/interface"

@Injectable({
  providedIn: "root"
})
export class DamageCalculatorService {
  ZERO_RESULT_DAMAGE = Array(16).fill(0)

  adjusters = inject(CALC_ADJUSTERS)
  specificDamageCalculators = inject(SPECIFIC_DAMAGE_CALCULATORS)
  fieldMapper = inject(FieldMapper)
  speedCalculator = inject(SpeedCalculatorService)

  calcDamage(attacker: Pokemon, target: Pokemon, field: Field): DamageResult {
    const result = this.calculateResult(attacker, target, attacker.move, field, true)

    return new DamageResult(attacker, target, attacker.move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage, undefined, undefined, result.berryHP)
  }

  calcDamageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender: boolean): DamageResult[] {
    return attacker.moveSet.moves.map(move => {
      const result = this.calculateResult(attacker, target, move, field, rightIsDefender)

      return new DamageResult(attacker, target, move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage, undefined, undefined, result.berryHP)
    })
  }

  calcDamageForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field): DamageResult {
    const [firstAttacker, secondAttackerOrdered] = this.speedCalculator.orderPairBySpeed(attacker, secondAttacker, field)

    const prepOne = this.prepareCalculation(firstAttacker, target, firstAttacker.move, field, true, secondAttackerOrdered)
    const prepTwo = this.prepareCalculation(secondAttackerOrdered, target, secondAttackerOrdered.move, field, true, firstAttacker)

    const multiResult = calculateMulti(
      Generations.get(9),
      [prepOne.smogonAttacker, prepTwo.smogonAttacker],
      prepOne.smogonTarget,
      [prepOne.moveSmogon, prepTwo.moveSmogon],
      prepOne.smogonField
    )

    const firstResult = multiResult.results[0]
    const secondResult = multiResult.results[1]

    if (!firstResult.damage) firstResult.damage = this.ZERO_RESULT_DAMAGE
    if (!secondResult.damage) secondResult.damage = this.ZERO_RESULT_DAMAGE

    return new DamageResult(
      firstAttacker,
      target,
      firstAttacker.move.name,
      multiResult.resultString(),
      multiResult.getHKO(),
      multiResult.rangePercentage().max,
      multiResult.desc(),
      firstResult.damage,
      secondAttackerOrdered,
      secondResult.damage,
      firstResult.berryHP
    )
  }

  private prepareCalculation(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon) {
    const gen = Generations.get(9)
    const smogonField = this.fieldMapper.toSmogon(field, rightIsDefender)

    const moveSmogon = new MoveSmogon(gen, move.name)
    moveSmogon.isCrit = rightIsDefender ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit
    moveSmogon.isStellarFirstUse = true
    moveSmogon.hits = +move.hits

    const smogonAttacker = fromExisting(attacker)
    const smogonTarget = fromExisting(target)

    this.adjusters.forEach(a => a.adjust(smogonAttacker, smogonTarget, move, moveSmogon, smogonField, secondAttacker, field))

    return { gen, smogonAttacker, smogonTarget, moveSmogon, smogonField }
  }

  koChanceForOneAttacker(attacker: Pokemon, target: Pokemon, field: Field): string {
    const result = this.calculateResult(attacker, target, attacker.move, field, true)
    return this.koChance(result)
  }

  koChanceForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field): string {
    return this.calcDamageForTwoAttackers(attacker, secondAttacker, target, field).koChance
  }

  calcDamageValue(attacker: Pokemon, target: Pokemon, field: Field): number {
    const result = this.calculateResult(attacker, target, attacker.move, field, true)
    const damageArrays = this.extractDamageSubArrays(result.damage as number[] | number[][])
    const maxDamage = damageArrays.length > 1 ? damageArrays.map(rolls => rolls[15]).reduce((sum, roll) => sum + roll, 0) : damageArrays[0][15]

    return maxDamage
  }

  calcDamageValueForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field): number {
    const firstResult = this.calculateResult(attacker, target, attacker.move, field, true, secondAttacker)
    const firstDamageArrays = this.extractDamageSubArrays(firstResult.damage as number[] | number[][])
    const firstMaxDamage = firstDamageArrays.length > 1 ? firstDamageArrays.map(rolls => rolls[15]).reduce((sum, roll) => sum + roll, 0) : firstDamageArrays[0][15]

    const targetWithTakedDamage = this.applyDamageInTarget(firstResult, target)

    const secondResult = this.calculateResult(secondAttacker, targetWithTakedDamage, secondAttacker.move, field, true, attacker)
    const secondDamageArrays = this.extractDamageSubArrays(secondResult.damage as number[] | number[][])
    const secondMaxDamage = secondDamageArrays.length > 1 ? secondDamageArrays.map(rolls => rolls[15]).reduce((sum, roll) => sum + roll, 0) : secondDamageArrays[0][15]

    return firstMaxDamage + secondMaxDamage
  }

  private calculateResult(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon): Result {
    const gen = Generations.get(9)
    const smogonField = this.fieldMapper.toSmogon(field, rightIsDefender)

    const moveSmogon = new MoveSmogon(gen, move.name)
    moveSmogon.isCrit = rightIsDefender ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit
    moveSmogon.isStellarFirstUse = true
    moveSmogon.hits = +move.hits

    const smogonAttacker = fromExisting(attacker)
    const smogonTarget = fromExisting(target)

    this.adjusters.forEach(a => a.adjust(smogonAttacker, smogonTarget, move, moveSmogon, smogonField, secondAttacker, field))

    const result = this.calculateDamage(gen, smogonAttacker, smogonTarget, moveSmogon, smogonField, moveSmogon)

    if (!result.damage) {
      result.damage = this.ZERO_RESULT_DAMAGE
    }

    if (typeof result.damage === "number") {
      result.damage = Array(16).fill(result.damage)
    }

    result.berryHP = this.calculateBerryRecovery(smogonAttacker, smogonTarget, gen, moveSmogon, result.damage as number[] | number[][])

    return result
  }

  private calculateBerryRecovery(attacker: PokemonSmogon, target: PokemonSmogon, gen: Generation, move: MoveSmogon, damage: number[] | number[][]): number | undefined {
    const { recovery, threshold } = getBerryRecovery(attacker, target, gen, move)

    if (recovery <= 0) return undefined

    const damageArrays = this.extractDamageSubArrays(damage)
    const maxDamage = damageArrays.length > 1 ? damageArrays.map(rolls => rolls[15]).reduce((sum, roll) => sum + roll, 0) : damageArrays[0][15]

    if (target.originalCurHP - maxDamage <= threshold) {
      return recovery
    }

    return undefined
  }

  private calculateDamage(gen: Generation, attacker: PokemonSmogon, target: PokemonSmogon, move: MoveSmogon, field: FieldSmogon, moveModel: MoveSmogon): Result {
    const applicableCalculator = this.specificDamageCalculators.find(calculator => calculator.isApplicable(moveModel))

    if (applicableCalculator) {
      const baseResult = calculate(gen, attacker, target, move, field)
      return applicableCalculator.calculate(target, baseResult)
    }

    return calculate(gen, attacker, target, move, field)
  }

  combineDamageRolls(resultOne: Result, resultTwo: Result) {
    const extractedDamageOne = this.extractDamageSubArrays(resultOne.damage as number[] | number[][])
    const extractedDamageTwo = this.extractDamageSubArrays(resultTwo.damage as number[] | number[][])

    const combinedDamage: number[][] = [...extractedDamageOne, ...extractedDamageTwo]

    resultOne.damage = combinedDamage
    resultTwo.damage = combinedDamage
  }

  private extractDamageSubArrays(inputDamage: number | number[] | number[][]): number[][] {
    if (typeof inputDamage === "number") {
      return [[inputDamage]]
    }

    if (Array.isArray(inputDamage) && inputDamage.length > 0 && Array.isArray(inputDamage[0])) {
      return inputDamage as number[][]
    } else {
      return [inputDamage as number[]]
    }
  }

  private applyDamageInTarget(result: Result, target: Pokemon): Pokemon {
    const maxDamage = (result.damage as number[])[15]
    const percentualDamage = 100 - (maxDamage / target.hp) * 100
    const targetHpPercentage = Math.max(percentualDamage, 0)

    return target.clone({ hpPercentage: targetHpPercentage })
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


}
