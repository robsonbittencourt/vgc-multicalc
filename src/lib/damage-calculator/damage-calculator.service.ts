import { inject, Injectable } from "@angular/core"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { FieldMapper } from "@lib/field-mapper"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { fromExisting } from "@lib/smogon/smogon-pokemon-builder"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { calculate, calculateMulti, Move as MoveSmogon, Result, MultiResult } from "@calc"
import { CalculatorStore } from "@store/calculator-store"
import { evToSp } from "@lib/utils/ev-sp-converter"
import { RollLevelConfig } from "./roll-level-config"

@Injectable({
  providedIn: "root"
})
export class DamageCalculatorService {
  ZERO_RESULT_DAMAGE = Array(RollLevelConfig.ROLLS_NUMBER).fill(0)

  adjusters = inject(CALC_ADJUSTERS)
  fieldMapper = inject(FieldMapper)
  speedCalculator = inject(SpeedCalculatorService)
  calculatorStore = inject(CalculatorStore)

  calcDamage(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): DamageResult {
    const result = this.calculateResult(attacker, target, attacker.move, field, rightIsDefender)

    return new DamageResult(
      attacker,
      target,
      attacker.move.name,
      result.moveDesc(),
      this.koChance(result),
      this.maxPercentageDamage(result),
      this.damageDescription(result),
      result.damage,
      undefined,
      undefined,
      result.afterTurn().residualHpInTurn(1) ?? 0
    )
  }

  calcDamageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender: boolean): DamageResult[] {
    return attacker.moveSet.moves.map(move => {
      const result = this.calculateResult(attacker, target, move, field, rightIsDefender)

      return new DamageResult(attacker, target, move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage, undefined, undefined, result.afterTurn().residualHpInTurn(1) ?? 0)
    })
  }

  calcDamageForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): DamageResult {
    const [firstAttacker, secondAttackerOrdered] = this.speedCalculator.orderPairBySpeed(attacker, secondAttacker, field)

    const prepOne = this.prepareCalculation(firstAttacker, target, firstAttacker.move, field, rightIsDefender, secondAttackerOrdered)
    const prepTwo = this.prepareCalculation(secondAttackerOrdered, target, secondAttackerOrdered.move, field, rightIsDefender, firstAttacker)

    const multiResult = calculateMulti([prepOne.smogonAttacker, prepTwo.smogonAttacker], prepOne.smogonTarget, [prepOne.moveSmogon, prepTwo.moveSmogon], prepOne.smogonField)

    const firstResult = multiResult.results[0]
    const secondResult = multiResult.results[1]

    if (!firstResult.damage) firstResult.damage = this.ZERO_RESULT_DAMAGE
    if (!secondResult.damage) secondResult.damage = this.ZERO_RESULT_DAMAGE

    if (typeof firstResult.damage === "number") firstResult.damage = Array(RollLevelConfig.ROLLS_NUMBER).fill(firstResult.damage)
    if (typeof secondResult.damage === "number") secondResult.damage = Array(RollLevelConfig.ROLLS_NUMBER).fill(secondResult.damage)

    return new DamageResult(
      firstAttacker,
      target,
      firstAttacker.move.name,
      multiResult.resultString(),
      multiResult.getHKO(),
      multiResult.rangePercentage().max,
      this.injectAdjustedBp(this.injectAdjustedBp(this.formatDescription(multiResult.description()), prepOne.moveSmogon), prepTwo.moveSmogon),
      firstResult.damage,
      secondAttackerOrdered,
      secondResult.damage,
      firstResult.afterTurn().residualHpInTurn(1) ?? 0
    )
  }

  private prepareCalculation(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon) {
    const smogonField = this.fieldMapper.toSmogon(field, rightIsDefender)

    const moveSmogon = new MoveSmogon(move.name)
    moveSmogon.isCrit = rightIsDefender ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit
    moveSmogon.isStellarFirstUse = true
    moveSmogon.hits = +move.hits

    const smogonAttacker = fromExisting(attacker, true)
    const smogonTarget = fromExisting(target, true)

    this.adjusters.forEach(a => a.adjust(smogonAttacker, smogonTarget, move, moveSmogon, smogonField, secondAttacker, field))

    return { smogonAttacker, smogonTarget, moveSmogon, smogonField }
  }

  koChanceForOneAttacker(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): string {
    const result = this.calculateResult(attacker, target, attacker.move, field, rightIsDefender)
    return this.koChance(result)
  }

  koChanceForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): string {
    return this.calcDamageForTwoAttackers(attacker, secondAttacker, target, field, rightIsDefender).koChance
  }

  calcDamageValueForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): MultiResult {
    const [firstAttacker, secondAttackerOrdered] = this.speedCalculator.orderPairBySpeed(attacker, secondAttacker, field)

    const prepOne = this.prepareCalculation(firstAttacker, target, firstAttacker.move, field, rightIsDefender, secondAttackerOrdered)
    const prepTwo = this.prepareCalculation(secondAttackerOrdered, target, secondAttackerOrdered.move, field, rightIsDefender, firstAttacker)

    const multiResult = calculateMulti([prepOne.smogonAttacker, prepTwo.smogonAttacker], prepOne.smogonTarget, [prepOne.moveSmogon, prepTwo.moveSmogon], prepOne.smogonField)

    return multiResult
  }

  calculateResult(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon): Result {
    const smogonField = this.fieldMapper.toSmogon(field, rightIsDefender)

    const moveSmogon = new MoveSmogon(move.name)
    moveSmogon.isCrit = rightIsDefender ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit
    moveSmogon.isStellarFirstUse = true
    moveSmogon.hits = +move.hits

    const smogonAttacker = fromExisting(attacker, true)
    const smogonTarget = fromExisting(target, true)

    this.adjusters.forEach(a => a.adjust(smogonAttacker, smogonTarget, move, moveSmogon, smogonField, secondAttacker, field))

    const result = calculate(smogonAttacker, smogonTarget, moveSmogon, smogonField)

    if (!result.damage) {
      result.damage = this.ZERO_RESULT_DAMAGE
    }

    if (typeof result.damage === "number") {
      result.damage = Array(RollLevelConfig.ROLLS_NUMBER).fill(result.damage)
    }

    return result
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
      return this.injectAdjustedBp(this.formatDescription(result.description()), result.move)
    } catch (error) {
      return this.formatDescription(`${result.attacker.name} ${result.move.name} vs. ${result.defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`)
    }
  }

  private injectAdjustedBp(description: string, move: { name: string; overrides?: { basePower?: number } }): string {
    const adjustedBp = move.overrides?.basePower

    if (adjustedBp === undefined) return description

    const replacement = `${move.name} (${adjustedBp} BP)`

    if (description.includes(replacement)) return description

    return description.replaceAll(move.name, replacement)
  }

  private formatDescription(description: string): string {
    if (this.calculatorStore.useSpsMode()) {
      return description.replace(/\b(\d+)([+-]?)\s+(HP|Atk|Def|SpA|SpD|Spe)\b/g, (_match, ev, nature, stat) => {
        return `${evToSp(+ev)}${nature} ${stat}`
      })
    }

    return description
  }
}
