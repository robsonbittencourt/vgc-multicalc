export class DamageResult {
  readonly result: string
  readonly koChance: string
  readonly damage: number

  constructor(result: string, koChance: string, damage: number) {
    this.result = result
    this.koChance = koChance
    this.damage = damage
  }
}