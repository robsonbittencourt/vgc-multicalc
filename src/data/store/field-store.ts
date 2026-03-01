import { computed, effect, inject, Injectable } from "@angular/core"
import { initialFieldState } from "@data/store/utils/initial-field-state"
import { Field, FieldSide } from "@lib/model/field"
import { GameType, Terrain, Weather } from "@lib/types"
import { patchState, signalStore, withHooks, withState } from "@ngrx/signals"
import { ActiveFieldService } from "./active-field.service"
import { CalculatorStore } from "./calculator-store"
import { FIELD_CONTEXT } from "./tokens/field-context.token"

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
  automaticWeather: Weather
  automaticTerrain: Terrain
  automaticBeadsOfRuinActivated: boolean
  automaticSwordOfRuinActivated: boolean
  automaticTabletsOfRuinActivated: boolean
  automaticVesselOfRuinActivated: boolean
  automaticNeutralizingGasActivated: boolean
}

@Injectable()
export class FieldStore extends signalStore(
  { protectedState: false },
  withState(() => initialFieldState(inject(FIELD_CONTEXT))),
  withHooks({
    onInit(store) {
      const activeFieldService = inject(ActiveFieldService)
      const context = inject(FIELD_CONTEXT)

      activeFieldService.activeStore.set(store)

      const initialData = activeFieldService.initialFieldData()
      if (initialData) {
        patchState(store, { ...initialData, updateLocalStorage: false })
      }

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

          const fields = userData?.fields ?? {}
          fields[context] = field

          localStorage.setItem("userData", JSON.stringify({ ...userData, fields }))
        }
      })
    }
  })
) {
  calculatorStore = inject(CalculatorStore)

  readonly field = computed(
    () =>
      new Field({
        weather: this.automaticWeather() ?? this.weather(),
        terrain: this.automaticTerrain() ?? this.terrain(),
        isBeadsOfRuin: this.beadsOfRuinActivated(),
        isSwordOfRuin: this.swordOfRuinActivated(),
        isTabletsOfRuin: this.tabletsOfRuinActivated(),
        isVesselOfRuin: this.vesselOfRuinActivated(),
        isMagicRoom: this.isMagicRoom(),
        isWonderRoom: this.isWonderRoom(),
        isGravity: this.isGravity(),
        isTrickRoom: this.isTrickRoom(),
        isNeutralizingGas: this.neutralizingGasActivated(),
        attackerSide: this.attackerSide(),
        defenderSide: this.defenderSide()
      })
  )

  readonly isWeatherSun = computed(() => (this.automaticWeather() ?? this.weather()) === "Sun")
  readonly isWeatherRain = computed(() => (this.automaticWeather() ?? this.weather()) === "Rain")
  readonly isWeatherSand = computed(() => (this.automaticWeather() ?? this.weather()) === "Sand")
  readonly isWeatherSnow = computed(() => (this.automaticWeather() ?? this.weather()) === "Snow")

  readonly isTerrainElectric = computed(() => (this.automaticTerrain() ?? this.terrain()) == "Electric")
  readonly isTerrainGrassy = computed(() => (this.automaticTerrain() ?? this.terrain()) == "Grassy")
  readonly isTerrainPsychic = computed(() => (this.automaticTerrain() ?? this.terrain()) == "Psychic")
  readonly isTerrainMisty = computed(() => (this.automaticTerrain() ?? this.terrain()) == "Misty")

  readonly beadsOfRuinActivated = computed(() => this.automaticBeadsOfRuinActivated() || this.isBeadsOfRuin())
  readonly swordOfRuinActivated = computed(() => this.automaticSwordOfRuinActivated() || this.isSwordOfRuin())
  readonly tabletsOfRuinActivated = computed(() => this.automaticTabletsOfRuinActivated() || this.isTabletsOfRuin())
  readonly vesselOfRuinActivated = computed(() => this.automaticVesselOfRuinActivated() || this.isVesselOfRuin())

  readonly neutralizingGasActivated = computed(() => this.automaticNeutralizingGasActivated() || this.isNeutralizingGas())

  updateStateLockingLocalStorage(field: Field) {
    patchState(this, { ...field, updateLocalStorage: false })
  }

  cleanAutomaticOptions(except: (keyof FieldState)[] = []) {
    patchState(this, state => ({
      automaticWeather: except.includes("automaticWeather") ? state.automaticWeather : null,
      automaticTerrain: except.includes("automaticTerrain") ? state.automaticTerrain : null,
      automaticBeadsOfRuinActivated: except.includes("automaticBeadsOfRuinActivated") ? state.automaticBeadsOfRuinActivated : false,
      automaticSwordOfRuinActivated: except.includes("automaticSwordOfRuinActivated") ? state.automaticSwordOfRuinActivated : false,
      automaticTabletsOfRuinActivated: except.includes("automaticTabletsOfRuinActivated") ? state.automaticTabletsOfRuinActivated : false,
      automaticVesselOfRuinActivated: except.includes("automaticVesselOfRuinActivated") ? state.automaticVesselOfRuinActivated : false,
      automaticNeutralizingGasActivated: except.includes("automaticNeutralizingGasActivated") ? state.automaticNeutralizingGasActivated : false
    }))
  }

  toggleSunWeather() {
    this.toggleWeather("Sun")
    this.calculatorStore.toogleProtosynthesis(this.isWeatherSun())
  }

  toggleAutomaticSunWeather() {
    patchState(this, _state => ({ automaticWeather: "Sun" as Weather }))
  }

  toggleRainWeather() {
    this.toggleWeather("Rain")
  }

  toggleAutomaticRainWeather() {
    patchState(this, _state => ({ automaticWeather: "Rain" as Weather }))
  }

  toggleSandWeather() {
    this.toggleWeather("Sand")
  }

  toggleAutomaticSandWeather() {
    patchState(this, _state => ({ automaticWeather: "Sand" as Weather }))
  }

  toggleSnowWeather() {
    this.toggleWeather("Snow")
  }

  toggleAutomaticSnowWeather() {
    patchState(this, _state => ({ automaticWeather: "Snow" as Weather }))
  }

  private toggleWeather(newWeather: Weather) {
    patchState(this, state => {
      let weather: Weather | null = state.weather
      const automaticWeather: Weather | null = null

      if (state.automaticWeather) {
        if (state.automaticWeather === newWeather) {
          weather = state.weather
        } else {
          weather = newWeather
        }
      } else {
        weather = state.weather === newWeather ? null : newWeather
      }

      return { weather, automaticWeather }
    })
  }

  toggleElectricTerrain() {
    this.toggleTerrain("Electric")
    this.calculatorStore.toogleQuarkDrive(this.isTerrainElectric())
  }

  toggleAutomaticElectricTerrain() {
    patchState(this, _state => ({ automaticTerrain: "Electric" as Terrain }))
  }

  toggleGrassyTerrain() {
    this.toggleTerrain("Grassy")
  }

  toggleAutomaticGrassyTerrain() {
    patchState(this, _state => ({ automaticTerrain: "Grassy" as Terrain }))
  }

  togglePsychicTerrain() {
    this.toggleTerrain("Psychic")
  }

  toggleAutomaticPsychicTerrain() {
    patchState(this, _state => ({ automaticTerrain: "Psychic" as Terrain }))
  }

  toggleMistyTerrain() {
    this.toggleTerrain("Misty")
  }

  toggleAutomaticMistyTerrain() {
    patchState(this, _state => ({ automaticTerrain: "Misty" as Terrain }))
  }

  private toggleTerrain(newTerrain: Terrain) {
    patchState(this, state => {
      let terrain: Terrain | null = state.terrain
      const automaticTerrain: Terrain | null = null

      if (state.automaticTerrain) {
        if (state.automaticTerrain === newTerrain) {
          terrain = state.terrain
        } else {
          terrain = newTerrain
        }
      } else {
        terrain = state.terrain === newTerrain ? null : newTerrain
      }

      return { terrain, automaticTerrain }
    })
  }

  toggleBeadsOfRuin() {
    if (this.automaticBeadsOfRuinActivated()) {
      patchState(this, _state => ({ automaticBeadsOfRuinActivated: false }))

      if (this.isBeadsOfRuin()) {
        patchState(this, state => ({ isBeadsOfRuin: !state.isBeadsOfRuin }))
      }
    } else {
      patchState(this, state => ({ isBeadsOfRuin: !state.isBeadsOfRuin }))
    }
  }

  toggleAutomaticBeadsOfRuin() {
    patchState(this, _state => ({ automaticBeadsOfRuinActivated: true }))
  }

  toggleSwordOfRuin() {
    if (this.automaticSwordOfRuinActivated()) {
      patchState(this, _state => ({ automaticSwordOfRuinActivated: false }))

      if (this.isSwordOfRuin()) {
        patchState(this, state => ({ isSwordOfRuin: !state.isSwordOfRuin }))
      }
    } else {
      patchState(this, state => ({ isSwordOfRuin: !state.isSwordOfRuin }))
    }
  }

  toggleAutomaticSwordOfRuin() {
    patchState(this, _state => ({ automaticSwordOfRuinActivated: true }))
  }

  toggleTabletsOfRuin() {
    if (this.automaticTabletsOfRuinActivated()) {
      patchState(this, _state => ({ automaticTabletsOfRuinActivated: false }))

      if (this.isTabletsOfRuin()) {
        patchState(this, state => ({ isTabletsOfRuin: !state.isTabletsOfRuin }))
      }
    } else {
      patchState(this, state => ({ isTabletsOfRuin: !state.isTabletsOfRuin }))
    }
  }

  toggleAutomaticTabletsOfRuin() {
    patchState(this, _state => ({ automaticTabletsOfRuinActivated: true }))
  }

  toggleVesselOfRuin() {
    if (this.automaticVesselOfRuinActivated()) {
      patchState(this, _state => ({ automaticVesselOfRuinActivated: false }))

      if (this.isVesselOfRuin()) {
        patchState(this, state => ({ isVesselOfRuin: !state.isVesselOfRuin }))
      }
    } else {
      patchState(this, state => ({ isVesselOfRuin: !state.isVesselOfRuin }))
    }
  }

  toggleAutomaticVesselOfRuin() {
    patchState(this, _state => ({ automaticVesselOfRuinActivated: true }))
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
    if (this.automaticNeutralizingGasActivated()) {
      patchState(this, _state => ({ automaticNeutralizingGasActivated: false }))

      if (this.isNeutralizingGas()) {
        patchState(this, state => ({ isNeutralizingGas: !state.isNeutralizingGas }))
      }
    } else {
      patchState(this, state => ({ isNeutralizingGas: !state.isNeutralizingGas }))
    }
  }

  toggleAutomaticNeutralizingGas() {
    patchState(this, _state => ({ automaticNeutralizingGasActivated: true }))
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
