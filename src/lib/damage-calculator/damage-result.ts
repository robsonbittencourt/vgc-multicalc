import { Pokemon } from "@lib/model/pokemon"

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
  readonly rolls: number[] | undefined

  private RESIDUAL_RESULT_IDENTIFIER = "("

  constructor(attacker: Pokemon, defender: Pokemon, move: string, result: string, koChance: string, damage: number, description: string, rolls: number[] | undefined = undefined, secondAttacker?: Pokemon) {
    this.id = attacker.id + defender.id
    this.attacker = attacker
    this.secondAttacker = secondAttacker
    this.defender = defender
    this.move = move
    this.result = this.adjustResult(result)
    this.koChance = koChance
    this.damage = damage
    this.description = this.adjustDescription(result, description)
    this.rolls = rolls
  }

  private adjustResult(result: string): string {
    if (this.containsResidualResult(result)) {
      return result.substring(0, result.indexOf(this.RESIDUAL_RESULT_IDENTIFIER))
    }

    return result
  }

  private adjustDescription(result: string, description: string): string {
    if (this.containsResidualResult(result)) {
      return description.concat(` - ${result.substring(result.indexOf(this.RESIDUAL_RESULT_IDENTIFIER))}`)
    }

    return description
  }

  private containsResidualResult(result: string): boolean {
    return result.includes(this.RESIDUAL_RESULT_IDENTIFIER)
  }
}
