import { calculate, calculateMulti, MultiResult, Result, Move as MoveCalc, Pokemon as PokemonCalc, Field as FieldCalc } from "@calc"
import { fromExisting } from "@adapters"
import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"

type PreparedAttack = {
  calcAttacker: PokemonCalc
  moveCalc: MoveCalc
  calcField: FieldCalc
}

type CachedSingle = PreparedAttack & {
  damage: Result["damage"]
  rawDesc: Result["rawDesc"]
}

type CachedDouble = {
  prepOne: PreparedAttack
  prepTwo: PreparedAttack
  first: { damage: Result["damage"]; rawDesc: Result["rawDesc"] }
  second: { damage: Result["damage"]; rawDesc: Result["rawDesc"] }
  eot: MultiResult["eot"]
}

export class CachedDamageCalc extends DamageCalc {
  private singleCache = new Map<string, CachedSingle>()
  private doubleCache = new Map<string, CachedDouble>()
  private pokemonIds = new WeakMap<Pokemon, number>()
  private nextPokemonId = 1

  clear(): void {
    this.singleCache.clear()
    this.doubleCache.clear()
  }

  override calculateResult(attacker: Pokemon, target: Pokemon, move: Move, field: Field, rightIsDefender: boolean, secondAttacker?: Pokemon): Result {
    const key = `${this.idOf(attacker)}|${move.name}|${secondAttacker ? this.idOf(secondAttacker) : 0}|${rightIsDefender}|${target.def}|${target.spd}`
    const cached = this.singleCache.get(key)

    if (cached) {
      return new Result(cached.calcAttacker, fromExisting(target, true), cached.moveCalc, cached.calcField, cached.damage, cached.rawDesc)
    }

    const prep = this.prepareCalculation(attacker, target, move, field, rightIsDefender, secondAttacker)
    const result = calculate(prep.calcAttacker, prep.calcTarget, prep.moveCalc, prep.calcField)

    if (!result.damage) {
      result.damage = this.ZERO_RESULT_DAMAGE
    }

    if (typeof result.damage === "number") {
      result.damage = Array(RollLevelConfig.ROLLS_NUMBER).fill(result.damage)
    }

    this.singleCache.set(key, { calcAttacker: prep.calcAttacker, moveCalc: prep.moveCalc, calcField: prep.calcField, damage: result.damage, rawDesc: result.rawDesc })

    return result
  }

  override calcDamageValueForTwoAttackers(attacker: Pokemon, secondAttacker: Pokemon, target: Pokemon, field: Field, rightIsDefender = true): MultiResult {
    const berryPart = target.item?.includes("Berry") ? `|${target.hp}` : ""
    const key = `${this.idOf(attacker)}|${this.idOf(secondAttacker)}|${rightIsDefender}|${target.def}|${target.spd}${berryPart}`
    const cached = this.doubleCache.get(key)

    if (cached) {
      const calcTarget = fromExisting(target, true)
      const firstResult = new Result(cached.prepOne.calcAttacker, calcTarget, cached.prepOne.moveCalc, cached.prepOne.calcField, cached.first.damage, cached.first.rawDesc)
      const secondResult = new Result(cached.prepTwo.calcAttacker, calcTarget, cached.prepTwo.moveCalc, cached.prepTwo.calcField, cached.second.damage, cached.second.rawDesc)

      return new MultiResult(calcTarget, [firstResult, secondResult], cached.eot)
    }

    const [firstAttacker, secondAttackerOrdered] = this.speedCalc.orderPairBySpeed(attacker, secondAttacker, field)

    const prepOne = this.prepareCalculation(firstAttacker, target, firstAttacker.move, field, rightIsDefender, secondAttackerOrdered)
    const prepTwo = this.prepareCalculation(secondAttackerOrdered, target, secondAttackerOrdered.move, field, rightIsDefender, firstAttacker)

    const multiResult = calculateMulti(prepOne.calcAttacker, prepTwo.calcAttacker, prepOne.moveCalc, prepTwo.moveCalc, prepOne.calcTarget, prepOne.calcField)

    const [firstResult, secondResult] = multiResult.results
    this.doubleCache.set(key, {
      prepOne: { calcAttacker: prepOne.calcAttacker, moveCalc: prepOne.moveCalc, calcField: prepOne.calcField },
      prepTwo: { calcAttacker: prepTwo.calcAttacker, moveCalc: prepTwo.moveCalc, calcField: prepTwo.calcField },
      first: { damage: firstResult.damage, rawDesc: firstResult.rawDesc },
      second: { damage: secondResult.damage, rawDesc: secondResult.rawDesc },
      eot: multiResult.eot
    })

    return multiResult
  }

  private idOf(pokemon: Pokemon): number {
    let id = this.pokemonIds.get(pokemon)

    if (id === undefined) {
      id = this.nextPokemonId++
      this.pokemonIds.set(pokemon, id)
    }

    return id
  }
}
