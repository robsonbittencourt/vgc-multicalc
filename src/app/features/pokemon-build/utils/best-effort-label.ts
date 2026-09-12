export function formatBestEffortLabel(koChance: number, survivalThreshold: number): string {
  const hko = survivalThreshold === 2 ? "OHKO" : `${survivalThreshold - 1}HKO`

  if (koChance === 1) {
    return `Can't avoid a guaranteed ${hko}`
  }

  const percentage = Math.max(Math.min(Math.round(koChance * 1000), 999), 1) / 10

  return `Best effort: ${percentage}% chance to ${hko}`
}
