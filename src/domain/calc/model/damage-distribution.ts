import { Damage, damageRange, extractDamageSubArrays, multiDamageRange, rollsAtIndex } from "@calc/model/result"

export class DamageDistribution {
  private readonly value: Damage

  constructor(value: Damage) {
    this.value = value
  }

  subArrays(): number[][] {
    return extractDamageSubArrays(this.value)
  }

  rollsAt(rollIndex: number): number[] {
    return rollsAtIndex(this.value, rollIndex)
  }

  totalAt(rollIndex: number): number {
    return this.rollsAt(rollIndex).reduce((sum, roll) => sum + roll, 0)
  }

  range(): [number, number] {
    return damageRange(this.value)
  }

  multiRange(): [number, number] | [number[], number[]] {
    return multiDamageRange(this.value)
  }

  min(): number {
    return this.range()[0]
  }

  max(): number {
    return this.range()[1]
  }
}
