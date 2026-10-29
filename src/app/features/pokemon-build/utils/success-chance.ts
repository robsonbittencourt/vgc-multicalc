export const GUARANTEED_SUCCESS = "100%"

export const SUCCESS_CHANCE_OPTIONS = [GUARANTEED_SUCCESS, "90%", "85%", "80%", "75%", "50%"]

const MIN_SUCCESS_PERCENTAGE = 0.1

export function parseSuccessChance(text: string): number {
  const percentage = Number(text.replace("%", "").replace(",", ".").trim())

  if (!Number.isFinite(percentage) || percentage <= 0) return 1

  return Math.min(Math.max(percentage, MIN_SUCCESS_PERCENTAGE), 100) / 100
}

export function acceptsRisk(text: string): boolean {
  return parseSuccessChance(text) < 1
}

export function formatSuccessChance(chance: number): string {
  if (chance >= 1) return GUARANTEED_SUCCESS

  return `${Math.min(Math.round(chance * 1000), 999) / 10}%`
}

export function formatSurvivalChance(chance: number): string {
  if (chance >= 1) return GUARANTEED_SUCCESS

  const koChance = Math.max(Math.round((1 - chance) * 1000), 1)

  return `${(1000 - koChance) / 10}%`
}
