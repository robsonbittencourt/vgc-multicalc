export class DamageResult {
  readonly move: string
  readonly result: string
  readonly koChance: string
  readonly damage: number
  readonly description: string
  readonly rolls: number[] | undefined

  constructor(move: string, result: string, koChance: string, damage: number, description: string, rolls: number[] | undefined = undefined) {
    this.move = move
    this.result = result
    this.koChance = koChance
    this.damage = damage
    this.description = description
    this.rolls = rolls
  }
}