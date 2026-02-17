import { Pokemon } from "@lib/model/pokemon"
import { RollLevelConfig } from "./roll-level-config"

export class DamageResult {
  readonly id: string
  readonly attacker: Pokemon
  readonly secondAttacker?: Pokemon
  readonly defender: Pokemon
  readonly move: string
  readonly result: string
  readonly koChance: string
  readonly damage: number
  readonly description: string
  readonly attackerRolls: number[][]
  readonly secondAttackerRolls?: number[][]
  readonly berryHP?: number

  private totalRolls: number[]

  private RESIDUAL_RESULT_IDENTIFIER = "("

  constructor(
    attacker: Pokemon,
    defender: Pokemon,
    move: string,
    result: string,
    koChance: string,
    damage: number,
    description: string,
    attackerRolls: number | number[] | number[][],
    secondAttacker?: Pokemon,
    secondAttackerRolls?: number | number[] | number[][],
    berryHP?: number
  ) {
    this.id = attacker.id + defender.id
    this.attacker = attacker
    this.secondAttacker = secondAttacker
    this.defender = defender
    this.move = move
    this.result = this.adjustResult(result)
    this.koChance = koChance
    this.damage = damage
    this.description = this.adjustDescription(result, description)
    this.attackerRolls = this.normalizeTo2DArray(attackerRolls)!
    this.secondAttackerRolls = this.normalizeTo2DArray(secondAttackerRolls)
    this.totalRolls = this.sumRolls(this.attackerRolls, this.secondAttackerRolls)
    this.berryHP = berryHP
  }

  damageByRollConfig(config: RollLevelConfig): number {
    const berryHP = this.berryHP ?? 0

    if (config.high) {
      return this.totalRolls[15] - berryHP
    }

    if (config.medium) {
      return this.totalRolls[7] - berryHP
    }

    return this.totalRolls[0] - berryHP
  }

  private adjustResult(result: string): string {
    if (this.containsResidualResult(result)) {
      return result.substring(0, result.indexOf(this.RESIDUAL_RESULT_IDENTIFIER))
    }

    return result
  }

  private adjustDescription(result: string, description: string): string {
    const isCombinedDamage = !description.includes(" AND ")

    if (this.containsResidualResult(result) && isCombinedDamage) {
      return description.concat(` - ${result.substring(result.indexOf(this.RESIDUAL_RESULT_IDENTIFIER))}`)
    }

    return description
  }

  private containsResidualResult(result: string): boolean {
    return result.includes(this.RESIDUAL_RESULT_IDENTIFIER)
  }

  private sumRolls(rollsOne: number[][], rollsTwo?: number[][]): number[] {
    const columnsLength = rollsOne[0].length

    const sumColumns = (rolls: number[][]): number[] => rolls.reduce((acc, line) => acc.map((value, index) => value + line[index]), new Array(columnsLength).fill(0))

    const sumOne = sumColumns(rollsOne)
    const sumTwo = rollsTwo ? sumColumns(rollsTwo) : new Array(columnsLength).fill(0)

    return sumOne.map((value, index) => value + sumTwo[index])
  }

  private normalizeTo2DArray(input?: number | number[] | number[][]): number[][] | undefined {
    if (!input || typeof input === "number") return undefined

    if (Array.isArray(input[0])) {
      return (input as number[][]).map(innerArray => [...innerArray])
    } else {
      return [[...(input as number[])]]
    }
  }
}
