export function remainingHp(actualHp: number, damageTaken: number): number {
  return Math.max(actualHp - damageTaken, 0)
}

export function remainingHpPercentage(hpBase: number, actualHp: number, damageTaken: number): number {
  const totalDamage = hpBase - actualHp + damageTaken
  const percentage = 100 - (totalDamage / hpBase) * 100

  return Math.max(percentage, 0)
}
