const defaults = {
  teraType: false,
  battery: false,
  powerSpot: false,
  tabletsOfRuin: false,
  swordOfRuin: false,
  vesselOfRuin: false,
  beadsOfRuin: false,
  neutralizingGas: false,
  allowAllPokes: false,
  allItems: false
}

function loadFeatures(): typeof defaults {
  try {
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem("featureFlags") : null

    if (!stored) return defaults

    const parsed = JSON.parse(stored)

    return { ...defaults, ...parsed }
  } catch {
    return defaults
  }
}

export const FEATURES = loadFeatures()
