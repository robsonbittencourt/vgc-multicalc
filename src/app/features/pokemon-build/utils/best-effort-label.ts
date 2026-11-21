import { ENGLISH, Translate } from "@app/i18n/ui-text"

export function formatBestEffortLabel(koChance: number, survivalThreshold: number, covered = 0, total = 1, bestTargetName: string | null = null, translate: Translate = ENGLISH): string {
  const hko = hkoLabel(survivalThreshold)

  if (covered > 0) {
    return translate("Survives {covered} of {total} attackers", { covered, total })
  }

  if (koChance === 1) {
    return total > 1 && bestTargetName ? translate("Can't avoid a guaranteed {hko} from {name}", { hko, name: bestTargetName }) : translate("Can't avoid a guaranteed {hko}", { hko })
  }

  const chance = percentageOf(koChance)

  if (total > 1 && bestTargetName) {
    return translate("Best effort: {chance}% chance to {hko} from {name}", { chance, hko, name: bestTargetName })
  }

  return translate("Best effort: {chance}% chance to {hko}", { chance, hko })
}

function hkoLabel(survivalThreshold: number): string {
  return survivalThreshold === 2 ? "OHKO" : `${survivalThreshold - 1}HKO`
}

function percentageOf(koChance: number): number {
  return Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10
}

export function formatUnprotectedLabel(outOfReach: number, total: number, translate: Translate = ENGLISH): string {
  if (outOfReach === 0 || total < 2) {
    return ""
  }

  return translate("{outOfReach} of {total} attackers can't be survived", { outOfReach, total })
}

export function formatPendingAttackerLabel(koChance: number, survivalThreshold: number, bestTargetName: string | null, translate: Translate = ENGLISH): string {
  if (!bestTargetName || koChance === 0) {
    return ""
  }

  return translate("Worst case: {name} — {chance}% chance to {hko}", { name: bestTargetName, chance: percentageOf(koChance), hko: hkoLabel(survivalThreshold) })
}

export function formatPendingAttackerParts(koChance: number, survivalThreshold: number, bestTargetName: string | null, translate: Translate = ENGLISH): { target: string; chance: string } | null {
  if (!bestTargetName || koChance === 0) {
    return null
  }

  return {
    target: translate("Worst case: {name}", { name: bestTargetName }),
    chance: translate("{chance}% chance to {hko}", { chance: percentageOf(koChance), hko: hkoLabel(survivalThreshold) })
  }
}
