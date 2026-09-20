import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { SurvivalThreshold } from "@multicalc/sp-optimizer/internal/sp-optimizer-types"
import { SurvivalMemo } from "@multicalc/sp-optimizer/internal/survival-memo"

export type DefensiveStat = "def" | "spd"

export type SurvivalContext = {
  field: Field
  threshold: SurvivalThreshold
  rollIndex: number
  rightIsDefender: boolean
}

export class Threat {
  constructor(
    private readonly damageCalc: DamageCalc,
    readonly attacker: Pokemon,
    readonly partner: Pokemon | null,
    private readonly memo: SurvivalMemo
  ) {}

  survivedBy(defender: Pokemon, ctx: SurvivalContext): boolean {
    return this.memo.resolve(this.attacker, this.partner, defender, ctx, () => this.computeSurvivedBy(defender, ctx))
  }

  private computeSurvivedBy(defender: Pokemon, ctx: SurvivalContext): boolean {
    if (this.partner) {
      const multiResult = this.damageCalc.calcDamageValueForTwoAttackers(this.attacker, this.partner, defender, ctx.field, ctx.rightIsDefender)

      return multiResult.survivesHits(ctx.threshold - 1, ctx.rollIndex)
    }

    const result = this.damageCalc.calculateResult(this.attacker, defender, this.attacker.move, ctx.field, ctx.rightIsDefender)
    const margin = defender.hp - result.damageWithRemainingUntilTurn(ctx.threshold - 1, ctx.rollIndex)

    if (!result.damageAfterFirstHit && margin > result.maxDamage()) {
      return true
    }

    return result.survivesHits(ctx.threshold - 1, ctx.rollIndex)
  }

  koChanceAgainst(defender: Pokemon, ctx: SurvivalContext): number {
    if (this.partner) {
      return this.damageCalc.calcDamageValueForTwoAttackers(this.attacker, this.partner, defender, ctx.field, ctx.rightIsDefender).koChanceWithin(ctx.threshold - 1, ctx.rollIndex)
    }

    return this.damageCalc.calculateResult(this.attacker, defender, this.attacker.move, ctx.field, ctx.rightIsDefender).koChanceWithin(ctx.threshold - 1, ctx.rollIndex)
  }

  koChanceLowerBoundAgainst(defender: Pokemon, ctx: SurvivalContext): number {
    return this.damageCalc.calcDamageValueForTwoAttackers(this.attacker, this.partner!, defender, ctx.field, ctx.rightIsDefender).koChanceLowerBound(ctx.threshold - 1, ctx.rollIndex)
  }

  certainlyKOs(defender: Pokemon, ctx: SurvivalContext): boolean {
    return this.damageCalc.calcDamageValueForTwoAttackers(this.attacker, this.partner!, defender, ctx.field, ctx.rightIsDefender).certainlyKOs(ctx.threshold - 1, ctx.rollIndex)
  }

  get name(): string {
    return this.partner ? `${this.attacker.name} + ${this.partner.name}` : this.attacker.name
  }

  get defensiveStats(): DefensiveStat[] {
    const categories = this.partner ? [this.attacker.moveSet.activeMove.category, this.partner.moveSet.activeMove.category] : [this.attacker.moveSet.activeMove.category]
    const stats: DefensiveStat[] = []

    if (categories.includes("Physical")) stats.push("def")
    if (categories.includes("Special")) stats.push("spd")

    return stats
  }

  dependsOn(stat: DefensiveStat): boolean {
    return this.defensiveStats.includes(stat)
  }

  get isCoupled(): boolean {
    return this.defensiveStats.length === 2
  }
}
