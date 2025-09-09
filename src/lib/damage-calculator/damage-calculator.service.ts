import { inject, Injectable } from "@angular/core"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { FieldMapper } from "@lib/field-mapper"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { fromExisting } from "@lib/smogon/smogon-pokemon-builder"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { calculate, Generations, Move as MoveSmogon, Result, StatID } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class DamageCalculatorService {
  ZERO_RESULT_DAMAGE = Array(16).fill(0)

  adjusters = inject(CALC_ADJUSTERS)
  fieldMapper = inject(FieldMapper)
  speedCalculator = inject(SpeedCalculatorService)

  calcDamage(attacker: Pokemon, target: Pokemon, field: Field): DamageResult {
    const result = this.calculateResult(attacker, target, attacker.move, field, true)
    return new DamageResult(attacker, target, attacker.move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage)
  }

  calcDamageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender: boolean): DamageResult[] {
    return attacker.moveSet.moves.map(move => {
      const result = this.calculateResult(attacker, target, move, field, rightIsDefender)
      return new DamageResult(attacker, target, move.name, result.moveDesc(), this.koChance(result), this.maxPercentageDamage(result), this.damageDescription(result), result.damage)
    })
  }

  calcDamageForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field): DamageResult {
    const [firstBySpeed, secondBySpeed] = this.speedCalculator.orderPairBySpeed(attacker, secondAttacker, field)

    const firstResult = this.calculateResult(firstBySpeed, target, firstBySpeed.move, field, true, secondBySpeed)

    const targetWithTakedDamage = this.applyDamageInTarget(firstResult, target)

    const secondResult = this.calculateResult(secondBySpeed, targetWithTakedDamage, secondBySpeed.move, field, true, firstBySpeed)

    const firstRolls = firstResult.damage
    const secondRolls = secondResult.damage
    this.combineDamageRolls(firstResult, secondResult)

    const koChance = this.koChance(firstResult)
    const maxPercentageDamage = this.maxPercentageDamage(firstResult)
    const damageDescription = this.damageDescriptionWithTwo(firstResult, secondResult, target)

    return new DamageResult(firstBySpeed, target, firstBySpeed.move.name, firstResult.moveDesc(), koChance, maxPercentageDamage, damageDescription, firstRolls, secondBySpeed, secondRolls)
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

    const result = calculate(gen, smogonAttacker, smogonTarget, moveSmogon, smogonField)

    if (!result.damage) {
      result.damage = this.ZERO_RESULT_DAMAGE
    }

    if (typeof result.damage === "number") {
      result.damage = Array(16).fill(result.damage)
    }

    return result
  }

  combineDamageRolls(resultOne: Result, resultTwo: Result) {
    const extractedDamageOne = this.extractDamageSubArrays(resultOne.damage as number[] | number[][])
    const extractedDamageTwo = this.extractDamageSubArrays(resultTwo.damage as number[] | number[][])

    const combinedDamage: number[][] = [...extractedDamageOne, ...extractedDamageTwo]

    resultOne.damage = combinedDamage
    resultTwo.damage = combinedDamage
  }

  private extractDamageSubArrays(inputDamage: number[] | number[][]): number[][] {
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

  private damageDescriptionWithTwo(resultOne: Result, resultTwo: Result, defender: Pokemon): string {
    try {
      const attackerDescription = resultOne.desc().substring(0, resultOne.desc().indexOf(" vs."))
      const secondAttackerDescritption = resultTwo.desc().substring(0, resultTwo.desc().indexOf(" vs."))
      const defenderDescription = resultOne.desc().substring(resultOne.desc().indexOf(" vs.") + 5)

      const defenderBulk = this.mergeBulkStats(resultOne, resultTwo, defender)
      const tera = resultOne.defender.teraType ? `Tera ${resultOne.defender.teraType} ` : ""
      const defenderNameAndDamage = defenderDescription.substring(defenderDescription.indexOf(resultOne.defender.name))

      return `${attackerDescription} AND ${secondAttackerDescritption} vs. ${defenderBulk} ${tera}${defenderNameAndDamage}`
    } catch (error) {
      return `${resultOne.attacker.name} ${resultOne.move.name} AND ${resultTwo.attacker.name} ${resultTwo.move.name} vs. ${resultOne.defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`
    }
  }

  private mergeBulkStats(resultOne: Result, resultTwo: Result, defender: Pokemon): string {
    const resultOneDefenderDesc = resultOne.desc().substring(resultOne.desc().indexOf(" vs.") + 5)
    const resultTwoDefenderDesc = resultTwo.desc().substring(resultTwo.desc().indexOf(" vs.") + 5)

    let output = `${resultOne.defender.evs.hp} HP`

    output += this.modifyStat(defender, resultOneDefenderDesc, resultTwoDefenderDesc, "def", "Def")
    output += this.modifyStat(defender, resultOneDefenderDesc, resultTwoDefenderDesc, "spd", "SpD")

    if (resultOneDefenderDesc.includes(resultOne.defender.item!) || resultTwoDefenderDesc.includes(resultTwo.defender.item!)) {
      output += ` ${resultOne.defender.item}`
    }

    return output
  }

  private modifyStat(defender: Pokemon, resultOneDefenderDesc: string, resultTwoDefenderDesc: string, stat: StatID, statText: string) {
    let output = ""

    if (resultOneDefenderDesc.includes(statText) || resultTwoDefenderDesc.includes(statText)) {
      output += ` /`
      output += this.boostByStat(defender, stat)
      output += ` ${defender.evs[stat]}`
      output += this.natureModifier(defender, stat)
      output += ` ${statText}`
    }

    return output
  }

  private boostByStat(pokemon: Pokemon, stat: StatID): string {
    if (pokemon.boosts[stat] && pokemon.boosts[stat] > 0) {
      return ` +${pokemon.boosts[stat]}`
    }

    if (pokemon.boosts[stat] && pokemon.boosts[stat] < 0) {
      return ` ${pokemon.boosts[stat]}`
    }

    return ""
  }

  private natureModifier(pokemon: Pokemon, stat: StatID) {
    if (stat == "def" && ["Bold", "Impish", "Lax", "Relaxed"].includes(pokemon.nature)) return "+"
    if (stat == "def" && ["Lonely", "Mild", "Gentle", "Hasty"].includes(pokemon.nature)) return "-"

    if (stat == "spd" && ["Calm", "Gentle", "Careful", "Sassy"].includes(pokemon.nature)) return "+"
    if (stat == "spd" && ["Naughty", "Lax", "Rash", "Naive"].includes(pokemon.nature)) return "-"

    return ""
  }
}
