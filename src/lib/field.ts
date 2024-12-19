import { GameType, Terrain, Weather } from "./types"

export class Field {
  readonly gameType: GameType
  readonly weather: Weather
  readonly terrain: Terrain
  readonly isBeadsOfRuin: boolean
  readonly isSwordOfRuin: boolean
  readonly isTabletsOfRuin: boolean
  readonly isVesselOfRuin: boolean
  readonly isMagicRoom: boolean
  readonly isWonderRoom: boolean
  readonly isGravity: boolean
  readonly isTrickRoom: boolean
  readonly isCriticalHit: boolean
  readonly attackerSide: FieldAttackerSide
  readonly defenderSide: FieldDefenderSide

  constructor(options: {
    gameType?: GameType, weather?: Weather, terrain?: Terrain, isBeadsOfRuin?: boolean, isSwordOfRuin?: boolean, isTabletsOfRuin?: boolean, isVesselOfRuin?: boolean, isMagicRoom?: boolean
    isWonderRoom?: boolean, isGravity?: boolean, isTrickRoom?: boolean, isCriticalHit?: boolean, attackerSide?: FieldAttackerSide, defenderSide?: FieldDefenderSide
  } = {}
  ) {
    this.gameType = options.gameType ?? "Doubles"
    this.weather = options.weather ?? null
    this.terrain = options.terrain ?? null
    this.isBeadsOfRuin = options.isBeadsOfRuin ?? false
    this.isSwordOfRuin = options.isSwordOfRuin ?? false
    this.isTabletsOfRuin = options.isTabletsOfRuin ?? false
    this.isVesselOfRuin = options.isVesselOfRuin ?? false
    this.isMagicRoom = options.isMagicRoom ?? false
    this.isWonderRoom = options.isWonderRoom ?? false
    this.isGravity = options.isGravity ?? false
    this.isTrickRoom = options.isTrickRoom ?? false
    this.isCriticalHit = options.isCriticalHit ?? false
    this.attackerSide = options.attackerSide ?? new FieldAttackerSide()
    this.defenderSide = options.defenderSide ?? new FieldDefenderSide()
  }
}

export class FieldAttackerSide {
  readonly isHelpingHand: boolean
  readonly isBattery: boolean
  readonly isPowerSpot: boolean
  readonly isTailwind: boolean

  constructor(options: { isHelpingHand?: boolean, isBattery?: boolean, isPowerSpot?: boolean, isTailwind?: boolean } = {}) {
    this.isHelpingHand = options.isHelpingHand ?? false
    this.isBattery = options.isBattery ?? false
    this.isPowerSpot = options.isPowerSpot ?? false
    this.isTailwind = options.isTailwind ?? false
  }
}

export class FieldDefenderSide {
  readonly isTailwind: boolean
  readonly isReflect: boolean
  readonly isLightScreen: boolean
  readonly isAuroraVeil: boolean
  readonly isFriendGuard: boolean
  readonly spikes: number
  readonly isSR: boolean
  readonly isSeeded: boolean

  constructor(options: { isTailwind?: boolean, isReflect?: boolean, isLightScreen?: boolean, isAuroraVeil?: boolean, isFriendGuard?: boolean, spikes?: number, isSR?: boolean, isSeeded?: boolean } = {}) {
    this.isTailwind = options.isTailwind ?? false
    this.isReflect = options.isReflect ?? false
    this.isLightScreen = options.isLightScreen ?? false
    this.isAuroraVeil = options.isAuroraVeil ?? false
    this.isFriendGuard = options.isFriendGuard ?? false
    this.spikes = options.spikes ?? 0
    this.isSR = options.isSR ?? false
    this.isSeeded = options.isSeeded ?? false
  }
}