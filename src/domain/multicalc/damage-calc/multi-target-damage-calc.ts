import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { DamageResult } from "@multicalc/damage-calc/damage-result"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { MovePosition } from "@multicalc/model/moveset"

export interface MultiCalcMode {
  oneVsManyActivated: boolean
  manyVsOneActivated: boolean
  oneVsManyBestMoveActivated: boolean
}

export class MultiTargetDamageCalc {
  damageCalc = new DamageCalc()

  calculateDamageForAll(attacker: Pokemon, targets: Target[], field: Field, mode: MultiCalcMode, secondAttacker?: Pokemon, useSpsMode = false): DamageResult[] {
    return targets.flatMap(target => {
      if (mode.oneVsManyActivated) {
        return this.calculateDamageOneVsMany(attacker, target, field, mode, secondAttacker, useSpsMode)
      } else {
        return this.calculateDamageManyVsOne(attacker, target, field, useSpsMode)
      }
    })
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, field: Field, mode: MultiCalcMode, secondAttacker: Pokemon | undefined, useSpsMode: boolean): DamageResult {
    const bestMove = mode.oneVsManyBestMoveActivated

    if (secondAttacker && attacker != secondAttacker) {
      const firstAttacker = bestMove ? this.withBestMove(attacker, target.pokemon, field) : attacker
      const secondAttackerWithMove = bestMove ? this.withBestMove(secondAttacker, target.pokemon, field) : secondAttacker

      return this.damageCalc.calcDamageForTwoAttackers(firstAttacker, secondAttackerWithMove, target.pokemon, field, true, useSpsMode)
    } else {
      const finalAttacker = bestMove ? this.withBestMove(attacker, target.pokemon, field) : attacker

      return this.damageCalc.calcDamage(finalAttacker, target.pokemon, field, true, useSpsMode)
    }
  }

  private withBestMove(attacker: Pokemon, target: Pokemon, field: Field): Pokemon {
    const bestIndex = this.bestMoveIndex(attacker, target, field)

    return attacker.clone({ id: attacker.id, moveSet: attacker.moveSet.cloneActivating((bestIndex + 1) as MovePosition) })
  }

  bestMoveIndex(attacker: Pokemon, defender: Pokemon, field: Field): number {
    const allResults = this.damageCalc.calcDamageAllAttacks(attacker, defender, field, true)

    return allResults.reduce((bestIdx: number, current: DamageResult, idx: number, arr: DamageResult[]) => (current.damage > arr[bestIdx].damage ? idx : bestIdx), 0)
  }

  bestMoveIndexForTargets(targets: Target[], attacker: Pokemon, field: Field): { targetId: string; moveIndex: number }[] {
    return targets.filter(target => !target.secondPokemon).map(target => ({ targetId: target.pokemon.id, moveIndex: this.bestMoveIndex(target.pokemon, attacker, field) }))
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, field: Field, useSpsMode: boolean): DamageResult {
    if (target.secondPokemon) {
      return this.damageCalc.calcDamageForTwoAttackers(target.pokemon, target.secondPokemon, activeTeamMember, field, true, useSpsMode)
    } else {
      return this.damageCalc.calcDamage(target.pokemon, activeTeamMember, field, true, useSpsMode)
    }
  }
}
