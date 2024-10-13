export class DamageResult {
  readonly move: string
  readonly result: string
  readonly koChance: string
  readonly damage: number
  readonly description: string
  readonly rolls: number[] | undefined

  private RESIDUAL_RESULT_IDENTIFIER: string = "("

  constructor(move: string, result: string, koChance: string, damage: number, description: string, rolls: number[] | undefined = undefined) {
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