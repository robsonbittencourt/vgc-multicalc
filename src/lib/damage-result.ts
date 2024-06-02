export class DamageResult {
  readonly result: string
  readonly koChance: string
  readonly damage: number
  readonly description: string
  readonly rolls: number[] | undefined

  constructor(result: string, koChance: string, damage: number, description: string, rolls: number[] | undefined = undefined) {
    this.result = result
    this.koChance = koChance
    this.damage = damage
    this.description = description
    this.rolls = rolls
  }
}