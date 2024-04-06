export class DamageResult {
  readonly result: string
  readonly koChance: string
  readonly damage: number
  readonly description: string

  constructor(result: string, koChance: string, damage: number, description: string) {
    this.result = result
    this.koChance = koChance
    this.damage = damage
    this.description = description
  }
}