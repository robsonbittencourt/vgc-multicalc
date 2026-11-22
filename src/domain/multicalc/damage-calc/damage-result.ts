import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonType } from "@multicalc/types"
import { RollLevelConfig } from "./roll-level-config"
import { Language } from "@data/i18n/localized-names"
import { attackersJoiner, koAfterSeparator } from "@calc"

export type LocalizedDescription = { result: string; description: string }

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
  readonly moveType?: PokemonType

  private totalRolls: number[]
  private describer?: (language: Language) => LocalizedDescription
  private readonly descriptions = new Map<Language, string>()

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
    berryHP?: number,
    moveType?: PokemonType
  ) {
    this.id = attacker.id + defender.id
    this.attacker = attacker
    this.secondAttacker = secondAttacker
    this.defender = defender
    this.move = move
    this.result = this.adjustResult(result)
    this.koChance = koChance
    this.damage = damage
    this.description = this.adjustDescription(result, description, "en")
    this.attackerRolls = this.normalizeTo2DArray(attackerRolls)!
    this.secondAttackerRolls = this.normalizeTo2DArray(secondAttackerRolls)
    this.totalRolls = this.sumRolls(this.attackerRolls, this.secondAttackerRolls)
    this.berryHP = berryHP
    this.moveType = moveType
  }

  withDescriber(describer: (language: Language) => LocalizedDescription): DamageResult {
    this.describer = describer

    return this
  }

  describe(language: Language): string {
    if (language === "en" || !this.describer) return this.description

    if (!this.descriptions.has(language)) {
      const localized = this.describer(language)

      this.descriptions.set(language, this.adjustDescription(localized.result, localized.description, language))
    }

    return this.descriptions.get(language)!
  }

  cardDescription(language: Language): string {
    const description = this.describe(language)
    const colonIndex = description.indexOf(": ")

    if (colonIndex === -1) return description

    const simplified = description.substring(colonIndex + 2)
    const koIndex = simplified.indexOf("--")

    if (koIndex === -1) return simplified

    const cuts = [simplified.indexOf(" - ", koIndex + 2), simplified.indexOf(koAfterSeparator(language), koIndex + 2)].filter(index => index !== -1)

    return cuts.length ? simplified.substring(0, Math.min(...cuts)) : simplified
  }

  damageByRollConfig(config: RollLevelConfig): number {
    const berryHP = this.berryHP ?? 0
    return this.totalRolls[config.toRollIndex()] - berryHP
  }

  damagePercentage(config: RollLevelConfig): number {
    return (this.damageByRollConfig(config) / this.defender.hp) * 100
  }

  hitsToKo(config: RollLevelConfig): number {
    const damage = this.damageByRollConfig(config)

    if (damage <= 0) return Infinity

    return Math.ceil(this.defender.actualHp / damage)
  }

  private adjustResult(result: string): string {
    if (this.containsResidualResult(result)) {
      return result.substring(0, result.indexOf(this.RESIDUAL_RESULT_IDENTIFIER))
    }

    return result
  }

  private adjustDescription(result: string, description: string, language: Language): string {
    const isCombinedDamage = !description.includes(attackersJoiner(language))

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
