import { AbilityName } from "@data/ability-data"
import type { MoveName } from "@data/move-data"
import type { ItemName } from "@data/item-data"

export type { AbilityName }
export type { MoveName }
export type { ItemName }

export type ID = string
export type Gender = "M" | "F" | "N"
export type StatID = "hp" | StatIDExceptHP
export type StatIDExceptHP = "atk" | "def" | "spa" | "spd" | "spe"
export type StatsTable<T = number> = Record<StatID, T>
export type PokemonName = string
export type StatusName = "slp" | "psn" | "brn" | "frz" | "par" | "tox"
export type GameType = "Singles" | "Doubles"
export type Terrain = "Electric" | "Grassy" | "Psychic" | "Misty"
export type Weather = "Sand" | "Sun" | "Rain" | "Hail" | "Snow" | "Harsh Sunshine" | "Heavy Rain" | "Strong Winds"
export type NatureName =
  | "Adamant"
  | "Bashful"
  | "Bold"
  | "Brave"
  | "Calm"
  | "Careful"
  | "Docile"
  | "Gentle"
  | "Hardy"
  | "Hasty"
  | "Impish"
  | "Jolly"
  | "Lax"
  | "Lonely"
  | "Mild"
  | "Modest"
  | "Naive"
  | "Naughty"
  | "Quiet"
  | "Quirky"
  | "Rash"
  | "Relaxed"
  | "Sassy"
  | "Serious"
  | "Timid"
export type TypeName = "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy" | "Stellar" | "???"
export type MoveCategory = "Physical" | "Special" | "Status"
export type MoveTarget = "adjacentAlly" | "adjacentAllyOrSelf" | "adjacentFoe" | "all" | "allAdjacent" | "allAdjacentFoes" | "allies" | "allySide" | "allyTeam" | "any" | "foeSide" | "normal" | "randomNormal" | "scripted" | "self"
export type TypeEffectiveness = 0 | 0.5 | 1 | 2

export interface MoveFlags {
  contact?: 1 | 0
  bite?: 1 | 0
  sound?: 1 | 0
  punch?: 1 | 0
  bullet?: 1 | 0
  pulse?: 1 | 0
  slicing?: 1 | 0
  wind?: 1 | 0
}

export interface SelfOrSecondaryEffect {
  boosts?: Partial<StatsTable>
}

export interface MoveSecondaryEffect {
  readonly chance: number
  readonly status?: string
  readonly volatileStatus?: string
  readonly boosts?: Partial<Record<StatID | "accuracy", number>>
}

export interface MoveData {
  readonly name: string
  readonly basePower: number
  readonly type: TypeName
  readonly category?: MoveCategory
  readonly flags: MoveFlags
  readonly secondaries?: unknown
  readonly target?: MoveTarget
  readonly recoil?: [number, number]
  readonly hasCrashDamage?: boolean
  readonly mindBlownRecoil?: boolean
  readonly struggleRecoil?: boolean
  readonly willCrit?: boolean
  readonly drain?: [number, number]
  readonly priority?: number
  readonly self?: SelfOrSecondaryEffect | null
  readonly ignoreDefensive?: boolean
  readonly overrideDefensiveStat?: StatIDExceptHP
  readonly breaksProtect?: boolean
  readonly multihit?: number | number[]
  readonly multiaccuracy?: boolean
  readonly accuracy?: number | true
  readonly pp?: number
  readonly description?: string
  readonly secondary?: MoveSecondaryEffect | null
}

export interface PokemonDataCore {
  readonly name: PokemonName
  readonly types: [TypeName] | [TypeName, TypeName]
  readonly baseStats: Readonly<StatsTable>
  readonly weightKg: number
  readonly gender?: Gender
  readonly notFullyEvolved?: boolean
  readonly abilities?: readonly AbilityName[]
  readonly group?: "Meta" | "Low usage" | "Regular"
}

export interface PokemonMoveset {
  readonly learnset?: readonly MoveName[]
  readonly metaMoves?: readonly MoveName[]
  readonly metaItems?: readonly ItemName[]
}

export interface PokemonData extends PokemonDataCore, PokemonMoveset {}

export interface Type {
  readonly effectiveness: Readonly<Partial<Record<TypeName, TypeEffectiveness>>>
}

export interface RawDesc {
  hpEVs?: string
  attackBoost?: number
  attackEVs?: string
  attackerAbility?: string
  attackerItem?: string
  attackerName: string
  attackerTera?: string
  defenderAbility?: string
  isFairyAura?: boolean
  defenderItem?: string
  defenderName: string
  defenderTera?: string
  defenseBoost?: number
  defenseEVs?: string
  hits?: number
  alliesFainted?: number
  isStellarFirstUse?: boolean
  isBeadsOfRuin?: boolean
  isSwordOfRuin?: boolean
  isTabletsOfRuin?: boolean
  isVesselOfRuin?: boolean
  isAuroraVeil?: boolean
  isFlowerGiftAttacker?: boolean
  isFlowerGiftDefender?: boolean
  isPowerTrickAttacker?: boolean
  isPowerTrickDefender?: boolean
  isSteelySpiritAttacker?: boolean
  isFriendGuard?: boolean
  isHelpingHand?: boolean
  isCritical?: boolean
  isLightScreen?: boolean
  isBurned?: boolean
  isProtected?: boolean
  isReflect?: boolean
  isBattery?: boolean
  isPowerSpot?: boolean
  isWonderRoom?: boolean
  isSwitching?: "out" | "in"
  moveBP?: number
  moveName: string
  moveTurns?: string
  moveType?: TypeName
  rivalry?: "buffed" | "nerfed"
  terrain?: Terrain
  weather?: Weather
}

export interface StatePokemon {
  name: PokemonName
  ability?: AbilityName
  abilityOn?: boolean
  alliesFainted?: number
  boostedStat?: StatIDExceptHP | "auto"
  item?: ItemName
  gender?: Gender
  nature?: NatureName
  evs?: Partial<StatsTable>
  boosts?: Partial<StatsTable>
  originalCurrrentHp?: number
  status?: StatusName | ""
  teraType?: TypeName
  toxicCounter?: number
  moves?: MoveName[]
  overrides?: Partial<PokemonData>
}

export interface StateMove {
  name: MoveName
  isCrit?: boolean
  isStellarFirstUse?: boolean
  hits?: number
  timesUsed?: number
  timesUsedWithMetronome?: number
  overrides?: Partial<MoveData>
}

export interface StateField {
  gameType: GameType
  weather?: Weather
  terrain?: Terrain
  isMagicRoom?: boolean
  isWonderRoom?: boolean
  isGravity?: boolean
  isAuraBreak?: boolean
  isFairyAura?: boolean
  isDarkAura?: boolean
  isBeadsOfRuin?: boolean
  isSwordOfRuin?: boolean
  isTabletsOfRuin?: boolean
  isVesselOfRuin?: boolean
  isUnnerve?: boolean
  attackerSide: StateSide
  defenderSide: StateSide
}

export interface StateSide {
  spikes?: number
  isSR?: boolean
  isReflect?: boolean
  isLightScreen?: boolean
  isProtected?: boolean
  isSeeded?: boolean
  isSaltCured?: boolean
  isForesight?: boolean
  isTailwind?: boolean
  isHelpingHand?: boolean
  isPowerTrick?: boolean
  isFriendGuard?: boolean
  isAuroraVeil?: boolean
  isBattery?: boolean
  isPowerSpot?: boolean
  isSwitching?: "out" | "in"
}
