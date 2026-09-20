export function formatBestEffortLabel(koChance: number, survivalThreshold: number, covered = 0, total = 1, bestTargetName: string | null = null): string {
  const hko = hkoLabel(survivalThreshold)

  if (covered > 0) {
    return `Survives ${covered} of ${total} attackers`
  }

  if (koChance === 1) {
    return total > 1 && bestTargetName ? `Can't avoid a guaranteed ${hko} from ${bestTargetName}` : `Can't avoid a guaranteed ${hko}`
  }

  const chance = percentageOf(koChance)

  if (total > 1 && bestTargetName) {
    return `Best effort: ${chance}% chance to ${hko} from ${bestTargetName}`
  }

  return `Best effort: ${chance}% chance to ${hko}`
}

function hkoLabel(survivalThreshold: number): string {
  return survivalThreshold === 2 ? "OHKO" : `${survivalThreshold - 1}HKO`
}

function percentageOf(koChance: number): number {
  return Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10
}

export function formatUnprotectedLabel(outOfReach: number, total: number): string {
  if (outOfReach === 0 || total < 2) {
    return ""
  }

  return `${outOfReach} of ${total} attackers can't be survived`
}

export function formatPendingAttackerLabel(koChance: number, survivalThreshold: number, bestTargetName: string | null): string {
  if (!bestTargetName || koChance === 0) {
    return ""
  }

  return `Worst case: ${bestTargetName} — ${percentageOf(koChance)}% chance to ${hkoLabel(survivalThreshold)}`
}

export function formatPendingAttackerParts(koChance: number, survivalThreshold: number, bestTargetName: string | null): { target: string; chance: string } | null {
  if (!bestTargetName || koChance === 0) {
    return null
  }

  return { target: `Worst case: ${bestTargetName}`, chance: `${percentageOf(koChance)}% chance to ${hkoLabel(survivalThreshold)}` }
}
