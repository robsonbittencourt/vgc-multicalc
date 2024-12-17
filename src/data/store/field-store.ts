import { computed, effect } from "@angular/core"
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { Field, FieldAttackerSide, FieldDefenderSide, GameType, Terrain, Weather } from "src/lib/field"
import { initialFieldState } from "./utils/initial-field-state"

export type FieldState = {
  _updateLocalStorage: boolean
  gameType: GameType
  weather: Weather
  terrain: Terrain
  isBeadsOfRuin: boolean
  isSwordOfRuin: boolean
  isTabletsOfRuin: boolean
  isVesselOfRuin: boolean
  isMagicRoom: boolean
  isWonderRoom: boolean
  isGravity: boolean
  isTrickRoom: boolean
  isCriticalHit: boolean
  attackerSide: FieldAttackerSide
  defenderSide: FieldDefenderSide
}

export const FieldStore = signalStore(
  { providedIn: 'root' },
  withState(initialFieldState),

  withComputed(({ gameType, weather, terrain, isBeadsOfRuin, isSwordOfRuin, isTabletsOfRuin, isVesselOfRuin, isMagicRoom, isWonderRoom, isGravity, isTrickRoom, isCriticalHit, attackerSide, defenderSide }) => ({
    field: computed(() => new Field({ 
      gameType: gameType(), weather: weather(), terrain: terrain(), isBeadsOfRuin: isBeadsOfRuin(), isSwordOfRuin: isSwordOfRuin(), isTabletsOfRuin: isTabletsOfRuin(), isVesselOfRuin: isVesselOfRuin(),
      isMagicRoom: isMagicRoom(), isWonderRoom: isWonderRoom(), isGravity: isGravity(), isTrickRoom: isTrickRoom(), isCriticalHit: isCriticalHit(), attackerSide: attackerSide(), defenderSide: defenderSide()
    })),
    isWeatherSun: computed(() => weather() == "Sun"),
    isWeatherRain: computed(() => weather() == "Rain"),
    isWeatherSand: computed(() => weather() == "Sand"),
    isWeatherSnow: computed(() => weather() == "Snow"),
    isTerrainElectric: computed(() => terrain() == "Electric"),
    isTerrainGrassy: computed(() => terrain() == "Grassy"),
    isTerrainPsychic: computed(() => terrain() == "Psychic"),
    isTerrainMisty: computed(() => terrain() == "Misty"),
  })),

  withMethods((store) => ({
    updateStateLockingLocalStorage(field: Field) { patchState(store, { ...field, _updateLocalStorage: false }) },

    toggleGameType() { patchState(store, (state) => ({ gameType: state.gameType == "Doubles" ? "Singles" : "Doubles" as GameType }))},
    toggleSunWeather() { patchState(store, (state) => ({ weather: state.weather != "Sun" ? "Sun" : null as Weather }))},
    toggleRainWeather() { patchState(store, (state) => ({ weather: state.weather != "Rain" ? "Rain" : null as Weather }))},
    toggleSandWeather() { patchState(store, (state) => ({ weather: state.weather != "Sand" ? "Sand" : null as Weather }))},
    toggleSnowWeather() { patchState(store, (state) => ({ weather: state.weather != "Snow" ? "Snow" : null as Weather }))},

    toggleElectricTerrain() { patchState(store, (state) => ({ terrain: state.terrain != "Electric" ? "Electric" : null as Terrain }))},
    toggleGrassyTerrain() { patchState(store, (state) => ({ terrain: state.terrain != "Grassy" ? "Grassy" : null as Terrain }))},
    togglePsychicTerrain() { patchState(store, (state) => ({ terrain: state.terrain != "Psychic" ? "Psychic" : null as Terrain }))},
    toggleMistyTerrain() { patchState(store, (state) => ({ terrain: state.terrain != "Misty" ? "Misty" : null as Terrain }))},

    toggleBeadsOfRuin() { patchState(store, (state) => ({ isBeadsOfRuin: !state.isBeadsOfRuin }))},
    toggleSwordOfRuin() { patchState(store, (state) => ({ isSwordOfRuin: !state.isSwordOfRuin }))},
    toggleTabletsOfRuin() { patchState(store, (state) => ({ isTabletsOfRuin: !state.isTabletsOfRuin }))},
    toggleVesselOfRuin() { patchState(store, (state) => ({ isVesselOfRuin: !state.isVesselOfRuin }))},
    
    toggleMagicRoom() { patchState(store, (state) => ({ isMagicRoom: !state.isMagicRoom }))},
    toggleWonderRoom() { patchState(store, (state) => ({ isWonderRoom: !state.isWonderRoom }))},
    toggleGravity() { patchState(store, (state) => ({ isGravity: !state.isGravity }))},
    toggleTrickRoom() { patchState(store, (state) => ({ isTrickRoom: !state.isTrickRoom }))},
    toggleCriticalHit() { patchState(store, (state) => ({ isCriticalHit: !state.isCriticalHit }))},

    toggleAttackerHelpingHand() { patchState(store, (state) => ({ attackerSide: { ...state.attackerSide, isHelpingHand: !state.attackerSide.isHelpingHand }}))},
    toggleAttackerBattery() { patchState(store, (state) => ({ attackerSide: { ...state.attackerSide, isBattery: !state.attackerSide.isBattery }}))},
    toggleAttackerPowerSpot() { patchState(store, (state) => ({ attackerSide: { ...state.attackerSide, isPowerSpot: !state.attackerSide.isPowerSpot }}))},
    toggleAttackerTailwind() { patchState(store, (state) => ({ attackerSide: { ...state.attackerSide, isTailwind: !state.attackerSide.isTailwind }}))},

    toggleDefenderTailwind() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isTailwind: !state.defenderSide.isTailwind }}))},
    toggleDefenderReflect() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isReflect: !state.defenderSide.isReflect }}))},
    toggleDefenderLightScreen() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isLightScreen: !state.defenderSide.isLightScreen }}))},
    toggleDefenderAuroraVeil() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isAuroraVeil: !state.defenderSide.isAuroraVeil }}))},
    toggleDefenderFriendGuard() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isFriendGuard: !state.defenderSide.isFriendGuard }}))},

    toggleDefenderSpikes0() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, spikes: 0 }}))},
    toggleDefenderSpikes1() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, spikes: 1 }}))},
    toggleDefenderSpikes2() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, spikes: 2 }}))},
    toggleDefenderSpikes3() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, spikes: 3 }}))},
    toggleDefenderSeeded() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isSeeded: !state.defenderSide.isSeeded }}))},
    toggleDefenderStealthRock() { patchState(store, (state) => ({ defenderSide: { ...state.defenderSide, isSR: !state.defenderSide.isSR }}))},
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        if (store._updateLocalStorage()) {
          const userData = JSON.parse(localStorage.getItem('userData')!)
          localStorage.setItem('userData', JSON.stringify({ ...userData, field: store.field() }))
        }
        
      })
    }
  })
)