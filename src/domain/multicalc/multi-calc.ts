import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { DamageResult } from "@multicalc/damage-calc/damage-result"
import { Field } from "@multicalc/model/field"
import { MovePosition } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"

export interface AttackConfig {
  bestMove: boolean
  useSpsMode: boolean
}

export class MultiCalc {
  private readonly damageCalc = new DamageCalc()

  private constructor(
    readonly opponents: Target[],
    readonly field: Field
  ) {}

  static withOpponents(opponents: Target[], field: Field): MultiCalc {
    return new MultiCalc(opponents, field)
  }

  damageAttacking(attacker: Pokemon, config: AttackConfig, secondAttacker?: Pokemon): DamageResult[] {
    return this.opponents.map(opponent => this.damageAgainst(attacker, opponent, config, secondAttacker))
  }

  damageDefending(defender: Pokemon, useSpsMode: boolean): DamageResult[] {
    return this.opponents.map(opponent => this.damageFrom(opponent, defender, useSpsMode))
  }

  private damageFrom(opponent: Target, defender: Pokemon, useSpsMode: boolean): DamageResult {
    if (opponent.secondPokemon) {
      return this.damageCalc.calcDamageForTwoAttackers(opponent.pokemon, opponent.secondPokemon, defender, this.field, true, useSpsMode)
    }

    return this.damageCalc.calcDamage(opponent.pokemon, defender, this.field, true, useSpsMode)
  }

  private damageAgainst(attacker: Pokemon, opponent: Target, config: AttackConfig, secondAttacker?: Pokemon): DamageResult {
    if (secondAttacker && attacker != secondAttacker) {
      const firstAttacker = config.bestMove ? this.withBestMove(attacker, opponent.pokemon) : attacker
      const secondAttackerWithMove = config.bestMove ? this.withBestMove(secondAttacker, opponent.pokemon) : secondAttacker

      return this.damageCalc.calcDamageForTwoAttackers(firstAttacker, secondAttackerWithMove, opponent.pokemon, this.field, true, config.useSpsMode)
    }

    const finalAttacker = config.bestMove ? this.withBestMove(attacker, opponent.pokemon) : attacker

    return this.damageCalc.calcDamage(finalAttacker, opponent.pokemon, this.field, true, config.useSpsMode)
  }

  private withBestMove(attacker: Pokemon, target: Pokemon): Pokemon {
    const bestIndex = this.bestMoveIndex(attacker, target)

    return attacker.clone({ id: attacker.id, moveSet: attacker.moveSet.cloneActivating((bestIndex + 1) as MovePosition) })
  }

  bestMoveIndex(attacker: Pokemon, defender: Pokemon): number {
    const allResults = this.damageCalc.calcDamageAllAttacks(attacker, defender, this.field, true)

    return allResults.reduce((bestIdx: number, current: DamageResult, idx: number, arr: DamageResult[]) => (current.damage > arr[bestIdx].damage ? idx : bestIdx), 0)
  }

  bestMoveIndexForTargets(attacker: Pokemon): { targetId: string; moveIndex: number }[] {
    return this.opponents.filter(target => !target.secondPokemon).map(target => ({ targetId: target.pokemon.id, moveIndex: this.bestMoveIndex(target.pokemon, attacker) }))
  }
}
