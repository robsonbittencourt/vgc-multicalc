import { CalcAdjuster } from "./calc-adjuster/calc-adjuster"
import { RuinsAbilityAdjuster } from "./calc-adjuster/ruins-ability-adjuster"
import { FairyAuraAdjuster } from "./calc-adjuster/fairy-aura-adjuster"
import { LastRespectsAdjuster } from "./calc-adjuster/last-respects-adjuster"
import { RageFistAdjuster } from "./calc-adjuster/rage-fist-adjuster"
import { StompingTantrumAdjuster } from "./calc-adjuster/stomping-tantrum-adjuster"
import { ZacianZamazentaAdjuster } from "./calc-adjuster/zacian-zamazenta-adjuster"
import { NeutralizingGasAdjuster } from "./calc-adjuster/neutralizing-gas-adjuster"
import { OgerponAdjuster } from "./calc-adjuster/ogerpon-adjuster"
import { SupremeOverlordAdjuster } from "./calc-adjuster/supreme-overlord-adjuster"
import { UnnerveAdjuster } from "./calc-adjuster/unnerve-adjuster"
import { FlowerGiftAdjuster } from "./calc-adjuster/flower-gift-adjuster"
import { SteelySpiritAdjuster } from "./calc-adjuster/steely-spirit-adjuster"
import { DamageResult } from "@multicalc/damage-calc/damage-result"
import { FieldMapper, fromExisting } from "@adapters"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { SpeedCalc } from "@multicalc/speed-calc"
import { calculate, calculateMulti, Move as MoveCalc, Result, MultiResult } from "@calc"
import { evToSp } from "@multicalc/utils/ev-sp-converter"
import { RollLevelConfig } from "./roll-level-config"

export class DamageCalc {
  ZERO_RESULT_DAMAGE = Array(RollLevelConfig.ROLLS_NUMBER).fill(0)

  adjusters: CalcAdjuster[] = [
    new RuinsAbilityAdjuster(),
    new FairyAuraAdjuster(),
    new LastRespectsAdjuster(),
    new RageFistAdjuster(),
    new StompingTantrumAdjuster(),
    new ZacianZamazentaAdjuster(),
    new NeutralizingGasAdjuster(),
    new OgerponAdjuster(),
    new SupremeOverlordAdjuster(),
    new UnnerveAdjuster(),
    new FlowerGiftAdjuster(),
    new SteelySpiritAdjuster()
  ]
  fieldMapper = new FieldMapper()
  speedCalc = new SpeedCalc()

  calcDamage(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true, useSpsMode = false): DamageResult {
    const result = this.calculateResult(attacker, target, attacker.move, field, rightIsDefender)

    return new DamageResult(
      attacker,
      target,
      attacker.move.name,
      result.moveDesc(),
      this.koChance(result),
      this.maxPercentageDamage(result),
      this.damageDescription(result, useSpsMode),
      result.damage,
      undefined,
      undefined,
      result.afterTurn().residualHpInTurn(1) ?? 0
    )
  }

  calcDamageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender: boolean, useSpsMode = false): DamageResult[] {
    return attacker.moveSet.moves.map(move => {
      const result = this.calculateResult(attacker, target, move, field, rightIsDefender)

      return new DamageResult(
        attacker,
        target,
        move.name,
        result.moveDesc(),
        this.koChance(result),
        this.maxPercentageDamage(result),
        this.damageDescription(result, useSpsMode),
        result.damage,
        undefined,
        undefined,
        result.afterTurn().residualHpInTurn(1) ?? 0
      )
    })
  }

  calcDamageForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true, useSpsMode = false): DamageResult {
    const [firstAttacker, secondAttackerOrdered] = this.speedCalc.orderPairBySpeed(attacker, secondAttacker, field)

    const prepOne = this.prepareCalculation(firstAttacker, target, firstAttacker.move, field, rightIsDefender, secondAttackerOrdered)
    const prepTwo = this.prepareCalculation(secondAttackerOrdered, target, secondAttackerOrdered.move, field, rightIsDefender, firstAttacker)

    const multiResult = calculateMulti(prepOne.calcAttacker, prepTwo.calcAttacker, prepOne.moveCalc, prepTwo.moveCalc, prepOne.calcTarget, prepOne.calcField)

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
      this.injectAdjustedBp(this.injectAdjustedBp(this.formatDescription(multiResult.description(), useSpsMode), prepOne.moveCalc), prepTwo.moveCalc),
      firstResult.damage,
      secondAttackerOrdered,
      secondResult.damage,
      firstResult.afterTurn().residualHpInTurn(1) ?? 0
    )
  }

  protected prepareCalculation(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon) {
    const calcField = this.fieldMapper.toCalc(field, rightIsDefender)

    const moveCalc = new MoveCalc(move.name)
    moveCalc.isCrit = rightIsDefender ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit
    moveCalc.isStellarFirstUse = true
    moveCalc.hits = +move.hits

    const calcAttacker = fromExisting(attacker, true)
    const calcTarget = fromExisting(target, true)

    this.adjusters.forEach(a => a.adjust(calcAttacker, calcTarget, move, moveCalc, calcField, secondAttacker, field))

    return { calcAttacker, calcTarget, moveCalc, calcField }
  }

  koChanceForOneAttacker(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): string {
    const result = this.calculateResult(attacker, target, attacker.move, field, rightIsDefender)
    return this.koChance(result)
  }

  koChanceForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): string {
    return this.calcDamageForTwoAttackers(attacker, secondAttacker, target, field, rightIsDefender, false).koChance
  }

  calcDamageValueForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): MultiResult {
    const [firstAttacker, secondAttackerOrdered] = this.speedCalc.orderPairBySpeed(attacker, secondAttacker, field)

    const prepOne = this.prepareCalculation(firstAttacker, target, firstAttacker.move, field, rightIsDefender, secondAttackerOrdered)
    const prepTwo = this.prepareCalculation(secondAttackerOrdered, target, secondAttackerOrdered.move, field, rightIsDefender, firstAttacker)

    const multiResult = calculateMulti(prepOne.calcAttacker, prepTwo.calcAttacker, prepOne.moveCalc, prepTwo.moveCalc, prepOne.calcTarget, prepOne.calcField)

    return multiResult
  }

  calculateResult(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon): Result {
    const calcField = this.fieldMapper.toCalc(field, rightIsDefender)

    const moveCalc = new MoveCalc(move.name)
    moveCalc.isCrit = rightIsDefender ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit
    moveCalc.isStellarFirstUse = true
    moveCalc.hits = +move.hits

    const calcAttacker = fromExisting(attacker, true)
    const calcTarget = fromExisting(target, true)

    this.adjusters.forEach(a => a.adjust(calcAttacker, calcTarget, move, moveCalc, calcField, secondAttacker, field))

    const result = calculate(calcAttacker, calcTarget, moveCalc, calcField)

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

  private damageDescription(result: Result, useSpsMode: boolean): string {
    try {
      return this.injectAdjustedBp(this.formatDescription(result.description(), useSpsMode), result.move)
    } catch (error) {
      return this.formatDescription(`${result.attacker.name} ${result.move.name} vs. ${result.defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`, useSpsMode)
    }
  }

  private injectAdjustedBp(description: string, move: { name: string; overrides?: { basePower?: number } }): string {
    const adjustedBp = move.overrides?.basePower

    if (adjustedBp === undefined) return description

    const replacement = `${move.name} (${adjustedBp} BP)`

    if (description.includes(replacement)) return description

    return description.replaceAll(move.name, replacement)
  }

  private formatDescription(description: string, useSpsMode: boolean): string {
    if (useSpsMode) {
      return description.replace(/\b(\d+)([+-]?)\s+(HP|Atk|Def|SpA|SpD|Spe)\b/g, (_match, ev, nature, stat) => {
        return `${evToSp(+ev)}${nature} ${stat}`
      })
    }

    return description
  }
}
