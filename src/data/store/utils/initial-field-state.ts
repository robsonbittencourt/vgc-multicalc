import { FieldState } from "@data/store/field-store"
import { FieldSide } from "@lib/model/field"

export function initialFieldState(): FieldState {
  const fieldUserData = JSON.parse(localStorage.getItem("userData")!)?.field

  if (fieldUserData && !fieldUserData.attackerSide.gameType) {
    fieldUserData.attackerSide.gameType = "Doubles"
  }

  if (fieldUserData && !fieldUserData.defenderSide.gameType) {
    fieldUserData.defenderSide.gameType = "Doubles"
  }

  return fieldUserData ? { ...defaultFieldState(), ...fieldUserData } : defaultFieldState()
}

function defaultFieldState(): FieldState {
  return {
    updateLocalStorage: true,
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
    isNeutralizingGas: false,
    attackerSide: new FieldSide(),
    defenderSide: new FieldSide()
  }
}
