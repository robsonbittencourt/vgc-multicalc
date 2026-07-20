const BOOST_TABLE: readonly (readonly [number, number])[] = [
  [2, 8],
  [2, 7],
  [2, 6],
  [2, 5],
  [2, 4],
  [2, 3],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [8, 2]
]

export const MOD_SCALE = 4096

export const MOD_2X = 8192
export const MOD_1_5X = 6144
export const MOD_4_3X = 5461
export const MOD_1_3X = 5325
export const MOD_1_25X = 5120
export const MOD_1_2X = 4915
export const MOD_1_1X = 4506
export const MOD_0_75X = 3072
export const MOD_0_5X = 2048
export const MOD_0_25X = 1024

const UNSIGNED_16_BIT_MODULO = 65536
const UNSIGNED_16_BIT_MAX_VALUE = UNSIGNED_16_BIT_MODULO - 1
const UNSIGNED_32_BIT_MODULO = 4294967296
const UNSIGNED_32_BIT_MAX_VALUE = UNSIGNED_32_BIT_MODULO - 1

export function clampBoost(value: number): number {
  return Math.max(-6, Math.min(6, value))
}

export function pokeRound(value: number): number {
  return value % 1 > 0.5 ? Math.ceil(value) : Math.floor(value)
}

export function overflow16(value: number): number {
  return value > UNSIGNED_16_BIT_MAX_VALUE ? value % UNSIGNED_16_BIT_MODULO : value
}

export function overflow32(value: number): number {
  return value > UNSIGNED_32_BIT_MAX_VALUE ? value % UNSIGNED_32_BIT_MODULO : value
}

export function chainMods(modifiers: number[], lowerBound: number, upperBound: number): number {
  let chained = 4096

  for (const modifier of modifiers) {
    if (modifier !== 4096) {
      chained = (chained * modifier + 2048) >> 12
    }
  }

  const clampedToUpperBound = Math.min(chained, upperBound)

  return Math.max(clampedToUpperBound, lowerBound)
}

export function applyMod(value: number, mod: number): number {
  return pokeRound(overflow32(value * mod) / MOD_SCALE)
}

export function getModifiedStat(stat: number, boost: number): number {
  const [numerator, denominator] = BOOST_TABLE[6 + boost]

  return Math.floor(overflow16(stat * numerator) / denominator)
}

export function getBaseDamage(level: number, basePower: number, attack: number, defense: number): number {
  const levelFactor = Math.floor((2 * level) / 5 + 2)
  const attackDamage = overflow32(overflow32(levelFactor * basePower) * attack)
  const damagePerDefense = Math.floor(attackDamage / defense)
  const baseDamage = overflow32(damagePerDefense / 50 + 2)

  return Math.floor(baseDamage)
}

export function getFinalDamage(baseAmount: number, roll: number, effectiveness: number, isBurned: boolean, stabModifier: number, finalModifier: number, protect?: boolean): number {
  let damage = Math.floor(overflow32(baseAmount * (85 + roll)) / 100)

  if (stabModifier !== 4096) {
    damage = overflow32(damage * stabModifier) / 4096
  }

  damage = Math.floor(overflow32(pokeRound(damage) * effectiveness))

  if (isBurned) {
    damage = Math.floor(damage / 2)
  }

  if (protect) {
    damage = pokeRound(overflow32(damage * 1024) / 4096)
  }

  const modifiedDamage = Math.max(1, overflow32(damage * finalModifier) / 4096)

  return overflow16(pokeRound(modifiedDamage))
}
