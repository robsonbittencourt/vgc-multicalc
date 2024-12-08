import { FieldAttackerSide, FieldDefenderSide, GameType } from "src/lib/field"
import { FieldState } from "../field-store"

export function initialFieldState(): FieldState {
  const fieldUserData = JSON.parse(localStorage.getItem('userData')!)?.field
  return fieldUserData ? { ...defaultFieldState(), ...fieldUserData } : defaultFieldState() 
}

function defaultFieldState(): FieldState {
  return {
    gameType: "Doubles" as GameType,
    weather: null,
    terrain: null,
    isBeadsOfRuin: false,
    isSwordOfRuin: false,
    isTabletsOfRuin: false,
    isVesselOfRuin: false,
    isMagicRoom: false,
    isWonderRoom: false,
    isGravity: false,
    isTrickRoom: false,
    isCriticalHit: false,
    attackerSide: new FieldAttackerSide({ isHelpingHand: false, isBattery: false, isPowerSpot: false, isTailwind: false }),
    defenderSide: new FieldDefenderSide({ isTailwind: false, isReflect: false, isLightScreen: false, isAuroraVeil: false, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: false })    
  }
}