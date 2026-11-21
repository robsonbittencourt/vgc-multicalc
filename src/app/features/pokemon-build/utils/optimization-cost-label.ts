import { OPTIMIZABLE_STATS } from "@multicalc/sp-optimizer"
import { Stats } from "@multicalc/types"
import { spToEv } from "@multicalc/utils"
import { ENGLISH, Translate } from "@app/i18n/ui-text"

const STAT_NAMES: Record<string, string> = {
  hp: "HP",
  atk: "Atk",
  def: "Def",
  spa: "SpA",
  spd: "SpD",
  spe: "Spe"
}

export function formatCostOf(optimized: Stats, original: Stats, spLabel: string, useSpsMode: boolean, keepMode: boolean, translate: Translate = ENGLISH): string {
  if (keepMode) return formatKeepCost(optimized, original, spLabel, useSpsMode, translate)

  return formatFullSpreadCost(optimized, spLabel, useSpsMode, translate)
}

function formatKeepCost(optimized: Stats, original: Stats, spLabel: string, useSpsMode: boolean, translate: Translate): string {
  const changed = OPTIMIZABLE_STATS.filter(stat => optimized[stat] !== original[stat])

  if (changed.length === 0) return ""

  const changes = changed.map(stat => {
    const delta = optimized[stat] - original[stat]

    return `${translate(STAT_NAMES[stat])} ${delta > 0 ? "+" : "−"}${pointsOf(Math.abs(delta), useSpsMode)}`
  })

  const points = changed.reduce((sum, stat) => {
    const delta = optimized[stat] - original[stat]

    return sum + (delta > 0 ? pointsOf(delta, useSpsMode) : -pointsOf(-delta, useSpsMode))
  }, 0)

  return `${points} ${spLabel} — ${changes.join(", ")}`
}

function pointsOf(amount: number, useSpsMode: boolean): number {
  return useSpsMode ? amount : spToEv(amount)
}

function formatFullSpreadCost(optimized: Stats, spLabel: string, useSpsMode: boolean, translate: Translate): string {
  const invested = OPTIMIZABLE_STATS.filter(stat => optimized[stat] > 0)

  if (invested.length === 0) return ""

  const changes = invested.map(stat => `${translate(STAT_NAMES[stat])} ${pointsOf(optimized[stat], useSpsMode)}`)
  const points = invested.reduce((sum, stat) => sum + pointsOf(optimized[stat], useSpsMode), 0)

  return `${points} ${spLabel} — ${changes.join(", ")}`
}

export function formatKeptStatsLabel(original: Stats, optimized: Stats, translate: Translate = ENGLISH): string {
  const kept = OPTIMIZABLE_STATS.filter(stat => original[stat] > 0 && optimized[stat] === original[stat]).map(stat => `${translate(STAT_NAMES[stat])} ${original[stat]}`)

  return kept.join(", ")
}
