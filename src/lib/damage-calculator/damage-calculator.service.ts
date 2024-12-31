import { inject, Injectable } from "@angular/core"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { FieldMapper } from "@lib/field-mapper"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { SmogonPokemonBuilder } from "@lib/smogon/smogon-pokemon-builder"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { calculate, Generations, Move as MoveSmogon, Result } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class DamageCalculatorService {
  ZERO_RESULT_DAMAGE = Array(16).fill(0)

  adjusters = inject(CALC_ADJUSTERS)
  fieldMapper = inject(FieldMapper)
  builder = inject(SmogonPokemonBuilder)
  speedCalculator = inject(SpeedCalculatorService)

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
    const [firstBySpeed, secondBySpeed] = this.speedCalculator.orderPairBySpeed(attacker, secondAttacker, field)

    const firstResult = this.calculateResult(firstBySpeed, target, firstBySpeed.move, field, field.isCriticalHit, secondBySpeed)

    const targetWithTakedDamage = this.applyDamageInTarget(firstResult, target)

    const secondResult = this.calculateResult(secondBySpeed, targetWithTakedDamage, secondBySpeed.move, field, field.isCriticalHit, attacker)

    this.applyTotalDamage(firstResult, secondResult)

    return [
      new DamageResult(firstBySpeed, target, firstBySpeed.move.name, firstResult.moveDesc(), this.koChance(firstResult), this.maxPercentageDamage(firstResult), this.damageDescriptionWithTwo(firstResult, secondResult), undefined, secondBySpeed),
      new DamageResult(secondBySpeed, target, secondBySpeed.move.name, secondResult.moveDesc(), this.koChance(firstResult), this.maxPercentageDamage(secondResult), this.damageDescriptionWithTwo(firstResult, secondResult), undefined, firstBySpeed)
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

  private applyDamageInTarget(result: Result, target: Pokemon): Pokemon {
    const maxDamage = (result.damage as number[])[15]
    const percentualDamage = 100 - (maxDamage / target.hp) * 100
    const targetHpPercentage = Math.max(percentualDamage, 0)

    return target.clone({ hpPercentage: targetHpPercentage })
  }

  private applyTotalDamage(result: Result, secondResult: Result) {
    const firstDamage = result.damage as number[]
    const secondDamage = secondResult.damage as number[]
    const totalDamage = firstDamage.map((num, idx) => num + secondDamage[idx])

    result.damage = totalDamage
    secondResult.damage = totalDamage
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
      const attackerDescription = resultOne.desc().substring(0, resultOne.desc().indexOf(" vs."))
      const secondAttackerDescritption = resultTwo.desc().substring(0, resultTwo.desc().indexOf(" vs."))
      const defenderBulk = this.mergeBulkStats(resultOne, resultTwo)
      const defenderNameAndDamage = resultOne.desc().substring(resultOne.desc().indexOf(resultOne.defender.name))

      return `${attackerDescription} AND ${secondAttackerDescritption} vs. ${defenderBulk} ${defenderNameAndDamage}`
    } catch (error) {
      return `${resultOne.attacker.name} ${resultOne.move.name} AND ${resultTwo.attacker.name} ${resultTwo.move.name} vs. ${resultOne.defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`
    }
  }

  mergeBulkStats(resultOne: Result, resultTwo: Result): string {
    const defenderBulkFirtSide = resultOne.desc().substring(resultOne.desc().indexOf(" vs.") + 5, resultOne.desc().indexOf(resultOne.defender.name) - 1)
    const defenderBulkSecondSide = resultTwo.desc().substring(resultTwo.desc().indexOf(" vs.") + 5, resultTwo.desc().indexOf(resultTwo.defender.name) - 1)

    const data1 = this.parseStats(defenderBulkFirtSide)
    const data2 = this.parseStats(defenderBulkSecondSide)

    const mergedStats: Record<string, number> = { ...data1.stats }

    for (const stat in data2.stats) {
      mergedStats[stat] = Math.max(data2.stats[stat] || 0, mergedStats[stat] || 0)
    }

    const item = data1.item || data2.item

    const statsString = Object.entries(mergedStats)
      .map(([stat, value]) => `${value} ${stat}`)
      .join(" / ")

    return item ? `${statsString} / ${item}` : statsString
  }

  parseStats(input: string) {
    const stats: Record<string, number> = {}
    let item = ""

    const parts = input.split("/").map(part => part.trim())

    parts.forEach((part, index) => {
      const match = part.match(/^(\d+)\s+(\w+)$/)

      if (match) {
        const [, value, stat] = match
        stats[stat] = parseInt(value, 10)
      } else if (index === parts.length - 1) {
        item = part
      }
    })

    return { stats, item }
  }
}
