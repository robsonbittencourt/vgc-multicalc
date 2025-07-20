import { computed, effect, Injectable } from "@angular/core"
import { initialFieldState } from "@data/store/utils/initial-field-state"
import { Field, FieldSide } from "@lib/model/field"
import { GameType, Terrain, Weather } from "@lib/types"
import { patchState, signalStore, withHooks, withState } from "@ngrx/signals"

export type FieldState = {
  updateLocalStorage: boolean
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
  isNeutralizingGas: boolean
  attackerSide: FieldSide
  defenderSide: FieldSide
}

@Injectable({ providedIn: "root" })
export class FieldStore extends signalStore(
  { protectedState: false },
  withState(initialFieldState),
  withHooks({
    onInit(store) {
      effect(() => {
        if (store.updateLocalStorage()) {
          const userData = JSON.parse(localStorage.getItem("userData")!)
          const field = {
            updateLocalStorage: store.updateLocalStorage(),
            weather: store.weather(),
            terrain: store.terrain(),
            isBeadsOfRuin: store.isBeadsOfRuin(),
            isSwordOfRuin: store.isSwordOfRuin(),
            isTabletsOfRuin: store.isTabletsOfRuin(),
            isVesselOfRuin: store.isVesselOfRuin(),
            isMagicRoom: store.isMagicRoom(),
            isWonderRoom: store.isWonderRoom(),
            isGravity: store.isGravity(),
            isTrickRoom: store.isTrickRoom(),
            isNeutralizingGas: store.isNeutralizingGas(),
            attackerSide: store.attackerSide(),
            defenderSide: store.defenderSide()
          }

          localStorage.setItem("userData", JSON.stringify({ ...userData, field }))
        }
      })
    }
  })
) {
  readonly field = computed(
    () =>
      new Field({
        weather: this.weather(),
        terrain: this.terrain(),
        isBeadsOfRuin: this.isBeadsOfRuin(),
        isSwordOfRuin: this.isSwordOfRuin(),
        isTabletsOfRuin: this.isTabletsOfRuin(),
        isVesselOfRuin: this.isVesselOfRuin(),
        isMagicRoom: this.isMagicRoom(),
        isWonderRoom: this.isWonderRoom(),
        isGravity: this.isGravity(),
        isTrickRoom: this.isTrickRoom(),
        isNeutralizingGas: this.isNeutralizingGas(),
        attackerSide: this.attackerSide(),
        defenderSide: this.defenderSide()
      })
  )

  readonly isWeatherSun = computed(() => this.weather() == "Sun")
  readonly isWeatherRain = computed(() => this.weather() == "Rain")
  readonly isWeatherSand = computed(() => this.weather() == "Sand")
  readonly isWeatherSnow = computed(() => this.weather() == "Snow")
  readonly isTerrainElectric = computed(() => this.terrain() == "Electric")
  readonly isTerrainGrassy = computed(() => this.terrain() == "Grassy")
  readonly isTerrainPsychic = computed(() => this.terrain() == "Psychic")
  readonly isTerrainMisty = computed(() => this.terrain() == "Misty")

  updateStateLockingLocalStorage(field: Field) {
    patchState(this, { ...field, updateLocalStorage: false })
  }

  toggleSunWeather() {
    patchState(this, state => ({ weather: state.weather != "Sun" ? "Sun" : (null as Weather) }))
  }

  toggleRainWeather() {
    patchState(this, state => ({ weather: state.weather != "Rain" ? "Rain" : (null as Weather) }))
  }

  toggleSandWeather() {
    patchState(this, state => ({ weather: state.weather != "Sand" ? "Sand" : (null as Weather) }))
  }

  toggleSnowWeather() {
    patchState(this, state => ({ weather: state.weather != "Snow" ? "Snow" : (null as Weather) }))
  }

  toggleElectricTerrain() {
    patchState(this, state => ({ terrain: state.terrain != "Electric" ? "Electric" : (null as Terrain) }))
  }

  toggleGrassyTerrain() {
    patchState(this, state => ({ terrain: state.terrain != "Grassy" ? "Grassy" : (null as Terrain) }))
  }

  togglePsychicTerrain() {
    patchState(this, state => ({ terrain: state.terrain != "Psychic" ? "Psychic" : (null as Terrain) }))
  }

  toggleMistyTerrain() {
    patchState(this, state => ({ terrain: state.terrain != "Misty" ? "Misty" : (null as Terrain) }))
  }

  toggleBeadsOfRuin() {
    patchState(this, state => ({ isBeadsOfRuin: !state.isBeadsOfRuin }))
  }

  toggleSwordOfRuin() {
    patchState(this, state => ({ isSwordOfRuin: !state.isSwordOfRuin }))
  }

  toggleTabletsOfRuin() {
    patchState(this, state => ({ isTabletsOfRuin: !state.isTabletsOfRuin }))
  }

  toggleVesselOfRuin() {
    patchState(this, state => ({ isVesselOfRuin: !state.isVesselOfRuin }))
  }

  toggleMagicRoom() {
    patchState(this, state => ({ isMagicRoom: !state.isMagicRoom }))
  }

  toggleWonderRoom() {
    patchState(this, state => ({ isWonderRoom: !state.isWonderRoom }))
  }

  toggleGravity() {
    patchState(this, state => ({ isGravity: !state.isGravity }))
  }

  toggleTrickRoom() {
    patchState(this, state => ({ isTrickRoom: !state.isTrickRoom }))
  }

  toggleAttackerCriticalHit() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isCriticalHit: !state.attackerSide.isCriticalHit } }))
  }

  toggleDefenderCriticalHit() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isCriticalHit: !state.defenderSide.isCriticalHit } }))
  }

  toggleNeutralizingGas() {
    patchState(this, state => ({ isNeutralizingGas: !state.isNeutralizingGas }))
  }

  toggleAttackerGameType() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, gameType: state.attackerSide.gameType == "Doubles" ? "Singles" : ("Doubles" as GameType) } }))
  }

  toggleDefenderGameType() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, gameType: state.defenderSide.gameType == "Doubles" ? "Singles" : ("Doubles" as GameType) } }))
  }

  toggleAttackerHelpingHand() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isHelpingHand: !state.attackerSide.isHelpingHand } }))
  }

  toggleDefenderHelpingHand() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isHelpingHand: !state.defenderSide.isHelpingHand } }))
  }

  toggleAttackerBattery() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isBattery: !state.attackerSide.isBattery } }))
  }

  toggleDefenderBattery() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isBattery: !state.defenderSide.isBattery } }))
  }

  toggleAttackerPowerSpot() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isPowerSpot: !state.attackerSide.isPowerSpot } }))
  }

  toggleDefenderPowerSpot() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isPowerSpot: !state.defenderSide.isPowerSpot } }))
  }

  toggleAttackerTailwind() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isTailwind: !state.attackerSide.isTailwind } }))
  }

  toggleDefenderTailwind() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isTailwind: !state.defenderSide.isTailwind } }))
  }

  toggleAttackerReflect() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isReflect: !state.attackerSide.isReflect } }))
  }

  toggleDefenderReflect() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isReflect: !state.defenderSide.isReflect } }))
  }

  toggleAttackerLightScreen() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isLightScreen: !state.attackerSide.isLightScreen } }))
  }

  toggleDefenderLightScreen() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isLightScreen: !state.defenderSide.isLightScreen } }))
  }

  toggleAttackerAuroraVeil() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isAuroraVeil: !state.attackerSide.isAuroraVeil } }))
  }

  toggleDefenderAuroraVeil() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isAuroraVeil: !state.defenderSide.isAuroraVeil } }))
  }

  toggleAttackerFriendGuard() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isFriendGuard: !state.attackerSide.isFriendGuard } }))
  }

  toggleDefenderFriendGuard() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isFriendGuard: !state.defenderSide.isFriendGuard } }))
  }

  toggleAttackerSpikes0() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, spikes: 0 } }))
  }

  toggleAttackerSpikes1() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, spikes: 1 } }))
  }

  toggleAttackerSpikes2() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, spikes: 2 } }))
  }

  toggleAttackerSpikes3() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, spikes: 3 } }))
  }

  toggleDefenderSpikes0() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, spikes: 0 } }))
  }

  toggleDefenderSpikes1() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, spikes: 1 } }))
  }

  toggleDefenderSpikes2() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, spikes: 2 } }))
  }

  toggleDefenderSpikes3() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, spikes: 3 } }))
  }

  toggleAttackerSeeded() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isSeeded: !state.attackerSide.isSeeded } }))
  }

  toggleDefenderSeeded() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isSeeded: !state.defenderSide.isSeeded } }))
  }

  toggleAttackerStealthRock() {
    patchState(this, state => ({ attackerSide: { ...state.attackerSide, isSR: !state.attackerSide.isSR } }))
  }

  toggleDefenderStealthRock() {
    patchState(this, state => ({ defenderSide: { ...state.defenderSide, isSR: !state.defenderSide.isSR } }))
  }
}
