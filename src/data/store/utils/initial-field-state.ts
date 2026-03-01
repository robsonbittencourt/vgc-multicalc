import { FieldState } from "@data/store/field-store"
import { FieldSide } from "@lib/model/field"

export function initialFieldState(context: string): FieldState {
  const userData = JSON.parse(localStorage.getItem("userData")!)
  let fieldUserData = userData?.fields?.[context]

  if (context === "simple" && !fieldUserData && userData?.field) {
    fieldUserData = userData.field
  }

  if (fieldUserData && !fieldUserData.attackerSide?.gameType) {
    fieldUserData.attackerSide = { ...fieldUserData.attackerSide, gameType: "Doubles" }
  }

  if (fieldUserData && !fieldUserData.defenderSide?.gameType) {
    fieldUserData.defenderSide = { ...fieldUserData.defenderSide, gameType: "Doubles" }
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
    defenderSide: new FieldSide(),
    automaticWeather: null,
    automaticTerrain: null,
    automaticBeadsOfRuinActivated: false,
    automaticSwordOfRuinActivated: false,
    automaticTabletsOfRuinActivated: false,
    automaticVesselOfRuinActivated: false,
    automaticNeutralizingGasActivated: false
  }
}
