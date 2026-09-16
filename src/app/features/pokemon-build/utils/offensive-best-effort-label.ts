export function formatOffensiveBestEffortLabel(koChance: number, koThreshold: number, covered = 0, total = 1, bestTargetName: string | null = null): string {
  const hko = koThreshold === 1 ? "OHKO" : `${koThreshold}HKO`

  if (covered > 0) {
    return `Knocks out ${covered} of ${total} targets`
  }

  if (koChance === 0) {
    return `No spread reaches the ${hko}`
  }

  const percentage = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  if (total > 1 && bestTargetName) {
    return `Best effort: ${percentage}% chance to ${hko} ${bestTargetName}`
  }

  return `Best effort: ${percentage}% chance to ${hko}`
}

export function formatOutOfReachLabel(outOfReach: number, total: number): string {
  if (outOfReach === 0 || total < 2) {
    return ""
  }

  return `${outOfReach} of ${total} targets out of reach`
}

export function formatPendingTargetLabel(koChance: number, koThreshold: number, bestTargetName: string | null): string {
  if (!bestTargetName || koChance === 0) {
    return ""
  }

  const hko = koThreshold === 1 ? "OHKO" : `${koThreshold}HKO`
  const percentage = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  return `Best result: ${bestTargetName} — ${percentage}% chance to ${hko}`
}

export function formatPendingTargetParts(koChance: number, koThreshold: number, bestTargetName: string | null): { target: string; chance: string } | null {
  if (!bestTargetName || koChance === 0) {
    return null
  }

  const hko = koThreshold === 1 ? "OHKO" : `${koThreshold}HKO`
  const percentage = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  return { target: `Best result: ${bestTargetName}`, chance: `${percentage}% chance to ${hko}` }
}
