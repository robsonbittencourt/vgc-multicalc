import { FEATURES } from "@configuration/feature-flags"
import { allItemNames, championsItemNames } from "@multicalc/available-items"

export function availableItemNames(): string[] {
  if (FEATURES.allItems) return allItemNames()

  return championsItemNames()
}
