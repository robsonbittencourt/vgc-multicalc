import { FieldState } from "@data/store/field-store"
import { readGameData } from "@data/store/utils/user-data-storage"
import { FieldSide } from "@lib/model/field"

export function initialFieldState(context: string): FieldState {
  const gameData = readGameData()
  let fieldUserData = gameData?.fields?.[context]

  if (context === "simple" && !fieldUserData && gameData?.field) {
    fieldUserData = gameData.field
  }

  if (fieldUserData && !fieldUserData.attackerSide?.gameType) {
    fieldUserData.attackerSide = { ...fieldUserData.attackerSide, gameType: "Doubles" }
  }

  if (fieldUserData && !fieldUserData.defenderSide?.gameType) {
    fieldUserData.defenderSide = { ...fieldUserData.defenderSide, gameType: "Doubles" }
  }

  return fieldUserData ? { ...defaultFieldState(), ...fieldUserData } : defaultFieldState()
}

export function defaultFieldState(): FieldState {
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
    isUnnerve: false,
    isFairyAura: false,
    isAttackerProtected: false,
    isDefenderProtected: false,
    attackerSide: new FieldSide(),
    defenderSide: new FieldSide(),
    automaticWeather: null,
    automaticTerrain: null,
    automaticBeadsOfRuinActivated: false,
    automaticSwordOfRuinActivated: false,
    automaticTabletsOfRuinActivated: false,
    automaticVesselOfRuinActivated: false,
    automaticNeutralizingGasActivated: false,
    automaticFairyAuraActivated: false
  }
}
