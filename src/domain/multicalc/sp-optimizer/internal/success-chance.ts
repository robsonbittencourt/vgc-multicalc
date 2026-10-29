const SUCCESS_CHANCE_EPSILON = 1e-9

export function meetsSuccessChance(chance: number, required: number): boolean {
  return chance >= required - SUCCESS_CHANCE_EPSILON
}
