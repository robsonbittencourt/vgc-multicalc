import { ENGLISH, Translate } from "@app/i18n/ui-text"

export function formatOffensiveBestEffortLabel(koChance: number, koThreshold: number, covered = 0, total = 1, bestTargetName: string | null = null, translate: Translate = ENGLISH): string {
  const hko = translate(koThreshold === 1 ? "OHKO" : `${koThreshold}HKO`)

  if (covered > 0) {
    return translate("Knocks out {covered} of {total} targets", { covered, total })
  }

  if (koChance === 0) {
    return translate("No spread reaches the {hko}", { hko })
  }

  const chance = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  if (total > 1 && bestTargetName) {
    return translate("Best effort: {chance}% chance to {hko} {name}", { chance, hko, name: bestTargetName })
  }

  return translate("Best effort: {chance}% chance to {hko}", { chance, hko })
}

export function formatOutOfReachLabel(outOfReach: number, total: number, translate: Translate = ENGLISH): string {
  if (outOfReach === 0 || total < 2) {
    return ""
  }

  return translate("{outOfReach} of {total} targets out of reach", { outOfReach, total })
}

export function formatPendingTargetLabel(koChance: number, koThreshold: number, bestTargetName: string | null, translate: Translate = ENGLISH): string {
  if (!bestTargetName || koChance === 0) {
    return ""
  }

  const hko = translate(koThreshold === 1 ? "OHKO" : `${koThreshold}HKO`)
  const chance = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  return translate("Best result: {name} — {chance}% chance to {hko}", { name: bestTargetName, chance, hko })
}

export function formatPendingTargetParts(koChance: number, koThreshold: number, bestTargetName: string | null, translate: Translate = ENGLISH): { target: string; chance: string } | null {
  if (!bestTargetName || koChance === 0) {
    return null
  }

  const hko = translate(koThreshold === 1 ? "OHKO" : `${koThreshold}HKO`)
  const chance = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  return { target: translate("Best result: {name}", { name: bestTargetName }), chance: translate("{chance}% chance to {hko}", { chance, hko }) }
}
