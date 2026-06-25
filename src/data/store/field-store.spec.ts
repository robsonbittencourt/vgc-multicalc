import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ActiveFieldService } from "@data/store/active-field.service"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { FieldSide } from "@lib/model/field"
import { GameType } from "@lib/types"
import { CalculatorStore } from "@data/store/calculator-store"

describe("Field Store", () => {
  let store: FieldStore

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        FieldStore,
        ActiveFieldService,
        {
          provide: CalculatorStore,
          useValue: {
            toggleProtosynthesis: () => void 0,
            toggleQuarkDrive: () => void 0
          }
        },
        { provide: FIELD_CONTEXT, useValue: "simple" }
      ]
    })

    store = TestBed.inject(FieldStore)
  })

  describe("Computed", () => {
    it("should return Field", () => {
      store.toggleSunWeather()
      store.toggleTabletsOfRuin()

      const field = store.field()

      expect(field.isGravity).toBe(false)
      expect(field.weather).toBe("Sun")
      expect(field.isTabletsOfRuin).toBe(true)
    })

    it("should return if is Weather Sun", () => {
      store.toggleSunWeather()

      expect(store.isWeatherSun()).toBe(true)
    })

    it("should return if is automatic Weather Sun", () => {
      store.toggleAutomaticSunWeather()

      expect(store.isWeatherSun()).toBe(true)
    })

    it("should return if is Weather Rain", () => {
      store.toggleRainWeather()

      expect(store.isWeatherRain()).toBe(true)
    })

    it("should return if is automatic Weather Rain", () => {
      store.toggleAutomaticRainWeather()

      expect(store.isWeatherRain()).toBe(true)
    })

    it("should return if is Weather Sand", () => {
      store.toggleSandWeather()

      expect(store.isWeatherSand()).toBe(true)
    })

    it("should return if is automatic Weather Sand", () => {
      store.toggleAutomaticSandWeather()

      expect(store.isWeatherSand()).toBe(true)
    })

    it("should return if is Weather Snow", () => {
      store.toggleSnowWeather()

      expect(store.isWeatherSnow()).toBe(true)
    })

    it("should return if is automatic Weather Snow", () => {
      store.toggleAutomaticSnowWeather()

      expect(store.isWeatherSnow()).toBe(true)
    })

    it("should return if is Weather Sun when come back from automatic to the same previous weather", () => {
      store.toggleSunWeather()

      store.toggleAutomaticSunWeather()

      store.toggleSunWeather()

      expect(store.isWeatherSun()).toBe(true)
    })

    it("should return if is Weather Sun when come back from automatic to the Sun previous weather", () => {
      store.toggleSunWeather()

      store.toggleAutomaticRainWeather()

      store.toggleSunWeather()

      expect(store.isWeatherSun()).toBe(true)
      expect(store.isWeatherRain()).toBe(false)
    })

    it("should return if is Electric Terrain", () => {
      store.toggleElectricTerrain()

      expect(store.isTerrainElectric()).toBe(true)
    })

    it("should return if is automatic Electric Terrain", () => {
      store.toggleAutomaticElectricTerrain()

      expect(store.isTerrainElectric()).toBe(true)
    })

    it("should return if is Grassy Terrain", () => {
      store.toggleGrassyTerrain()

      expect(store.isTerrainGrassy()).toBe(true)
    })

    it("should return if is automatic Grassy Terrain", () => {
      store.toggleAutomaticGrassyTerrain()

      expect(store.isTerrainGrassy()).toBe(true)
    })

    it("should return if is Psychic Terrain", () => {
      store.togglePsychicTerrain()

      expect(store.isTerrainPsychic()).toBe(true)
    })

    it("should return if is automatic Psychic Terrain", () => {
      store.toggleAutomaticPsychicTerrain()

      expect(store.isTerrainPsychic()).toBe(true)
    })

    it("should return if is Misty Terrain", () => {
      store.toggleMistyTerrain()

      expect(store.isTerrainMisty()).toBe(true)
    })

    it("should return if is automatic Misty Terrain", () => {
      store.toggleAutomaticMistyTerrain()

      expect(store.isTerrainMisty()).toBe(true)
    })

    it("should return if is Terrain Electric when come back from automatic to the same previous weather", () => {
      store.toggleElectricTerrain()

      store.toggleAutomaticElectricTerrain()

      store.toggleElectricTerrain()

      expect(store.isTerrainElectric()).toBe(true)
    })

    it("should return if is Terrain Electric when come back from automatic to the Electric previous weather", () => {
      store.toggleElectricTerrain()

      store.toggleAutomaticGrassyTerrain()

      store.toggleElectricTerrain()

      expect(store.isTerrainElectric()).toBe(true)
      expect(store.isTerrainGrassy()).toBe(false)
    })
  })

  describe("Methods", () => {
    it("should change attacker Game Type to Singles when actual Game Type is Doubles", () => {
      store.toggleAttackerGameType()

      expect(store.field().attackerSide.gameType).toBe("Singles")
    })

    it("should change attacker Game Type to Doubles when actual Game Type is Singles", () => {
      store.toggleAttackerGameType()
      store.toggleAttackerGameType()

      expect(store.field().attackerSide.gameType).toBe("Doubles")
    })

    it("should change defender Game Type to Singles when actual Game Type is Doubles", () => {
      store.toggleDefenderGameType()

      expect(store.field().defenderSide.gameType).toBe("Singles")
    })

    it("should change defender Game Type to Doubles when actual Game Type is Singles", () => {
      store.toggleDefenderGameType()
      store.toggleDefenderGameType()

      expect(store.field().defenderSide.gameType).toBe("Doubles")
    })

    it("should change weather to Sun when weather is null", () => {
      store.toggleSunWeather()

      expect(store.field().weather).toBe("Sun")
    })

    it("should change weather to Sun when weather is Rain", () => {
      store.toggleRainWeather()
      store.toggleSunWeather()

      expect(store.field().weather).toBe("Sun")
    })

    it("should change weather to null when weather is Sun", () => {
      store.toggleSunWeather()
      store.toggleSunWeather()

      expect(store.field().weather).toBeNull()
    })

    it("should change weather to Rain when weather is null", () => {
      store.toggleRainWeather()

      expect(store.field().weather).toBe("Rain")
    })

    it("should change weather to Rain when weather is Sun", () => {
      store.toggleSunWeather()
      store.toggleRainWeather()

      expect(store.field().weather).toBe("Rain")
    })

    it("should change weather to null when weather is Rain", () => {
      store.toggleRainWeather()
      store.toggleRainWeather()

      expect(store.field().weather).toBeNull()
    })

    it("should change weather to Sand when weather is null", () => {
      store.toggleSandWeather()

      expect(store.field().weather).toBe("Sand")
    })

    it("should change weather to Sand when weather is Snow", () => {
      store.toggleSnowWeather()
      store.toggleSandWeather()

      expect(store.field().weather).toBe("Sand")
    })

    it("should change weather to null when weather is Sand", () => {
      store.toggleSandWeather()
      store.toggleSandWeather()

      expect(store.field().weather).toBeNull()
    })

    it("should change weather to Snow when weather is null", () => {
      store.toggleSnowWeather()

      expect(store.field().weather).toBe("Snow")
    })

    it("should change weather to Snow when weather is Sand", () => {
      store.toggleSandWeather()
      store.toggleSnowWeather()

      expect(store.field().weather).toBe("Snow")
    })

    it("should change weather to null when weather is Snow", () => {
      store.toggleSnowWeather()
      store.toggleSnowWeather()

      expect(store.field().weather).toBeNull()
    })

    it("should change terrain to Electric when terrain is null", () => {
      store.toggleElectricTerrain()

      expect(store.field().terrain).toBe("Electric")
    })

    it("should change terrain to Electric when terrain is Grassy", () => {
      store.toggleGrassyTerrain()
      store.toggleElectricTerrain()

      expect(store.field().terrain).toBe("Electric")
    })

    it("should change terrain to null when terrain is Electric", () => {
      store.toggleElectricTerrain()
      store.toggleElectricTerrain()

      expect(store.field().terrain).toBeNull()
    })

    it("should change terrain to Grassy when terrain is null", () => {
      store.toggleGrassyTerrain()

      expect(store.field().terrain).toBe("Grassy")
    })

    it("should change terrain to Grassy when terrain is Psychic", () => {
      store.togglePsychicTerrain()
      store.toggleGrassyTerrain()

      expect(store.field().terrain).toBe("Grassy")
    })

    it("should change terrain to null when terrain is Grassy", () => {
      store.toggleGrassyTerrain()
      store.toggleGrassyTerrain()

      expect(store.field().terrain).toBeNull()
    })

    it("should change terrain to Psychic when terrain is null", () => {
      store.togglePsychicTerrain()

      expect(store.field().terrain).toBe("Psychic")
    })

    it("should change terrain to Psychic when terrain is Misty", () => {
      store.toggleMistyTerrain()
      store.togglePsychicTerrain()

      expect(store.field().terrain).toBe("Psychic")
    })

    it("should change terrain to null when terrain is Psychic", () => {
      store.togglePsychicTerrain()
      store.togglePsychicTerrain()

      expect(store.field().terrain).toBeNull()
    })

    it("should change terrain to Misty when terrain is null", () => {
      store.toggleMistyTerrain()

      expect(store.field().terrain).toBe("Misty")
    })

    it("should change terrain to Misty when terrain is Electric", () => {
      store.toggleElectricTerrain()
      store.toggleMistyTerrain()

      expect(store.field().terrain).toBe("Misty")
    })

    it("should change terrain to null when terrain is Misty", () => {
      store.toggleMistyTerrain()
      store.toggleMistyTerrain()

      expect(store.field().terrain).toBeNull()
    })

    it("should change Beads Of Ruin to true when it is false", () => {
      store.toggleBeadsOfRuin()

      expect(store.field().isBeadsOfRuin).toBe(true)
    })

    it("should change Beads Of Ruin to false when it is true", () => {
      store.toggleBeadsOfRuin()
      store.toggleBeadsOfRuin()

      expect(store.field().isBeadsOfRuin).toBe(false)
    })

    it("should change automatic Beads Of Ruin to true when it is false", () => {
      store.toggleAutomaticBeadsOfRuin()

      expect(store.field().isBeadsOfRuin).toBe(true)
    })

    it("should change Beads Of Ruin to false when it is true in automatic and normal value", () => {
      store.toggleBeadsOfRuin()

      store.toggleAutomaticBeadsOfRuin()

      store.toggleBeadsOfRuin()

      expect(store.field().isBeadsOfRuin).toBe(false)
    })

    it("should change Sword Of Ruin to true when it is false", () => {
      store.toggleSwordOfRuin()

      expect(store.field().isSwordOfRuin).toBe(true)
    })

    it("should change Sword Of Ruin to false when it is true", () => {
      store.toggleSwordOfRuin()
      store.toggleSwordOfRuin()

      expect(store.field().isSwordOfRuin).toBe(false)
    })

    it("should change automatic Sword Of Ruin to true when it is false", () => {
      store.toggleAutomaticSwordOfRuin()

      expect(store.field().isSwordOfRuin).toBe(true)
    })

    it("should change Sword Of Ruin to false when it is true in automatic and normal value", () => {
      store.toggleSwordOfRuin()

      store.toggleAutomaticSwordOfRuin()

      store.toggleSwordOfRuin()

      expect(store.field().isSwordOfRuin).toBe(false)
    })

    it("should change Tablets Of Ruin to true when it is false", () => {
      store.toggleTabletsOfRuin()

      expect(store.field().isTabletsOfRuin).toBe(true)
    })

    it("should change Tablets Of Ruin to false when it is true", () => {
      store.toggleTabletsOfRuin()
      store.toggleTabletsOfRuin()

      expect(store.field().isTabletsOfRuin).toBe(false)
    })

    it("should change automatic Tablets Of Ruin to true when it is false", () => {
      store.toggleAutomaticTabletsOfRuin()

      expect(store.field().isTabletsOfRuin).toBe(true)
    })

    it("should change Tablets Of Ruin to false when it is true in automatic and normal value", () => {
      store.toggleTabletsOfRuin()

      store.toggleAutomaticTabletsOfRuin()

      store.toggleTabletsOfRuin()

      expect(store.field().isTabletsOfRuin).toBe(false)
    })

    it("should change Vessel Of Ruin to true when it is false", () => {
      store.toggleVesselOfRuin()

      expect(store.field().isVesselOfRuin).toBe(true)
    })

    it("should change Vessel Of Ruin to false when it is true", () => {
      store.toggleVesselOfRuin()
      store.toggleVesselOfRuin()

      expect(store.field().isVesselOfRuin).toBe(false)
    })

    it("should change automatic Vessel Of Ruin to true when it is false", () => {
      store.toggleAutomaticVesselOfRuin()

      expect(store.field().isVesselOfRuin).toBe(true)
    })

    it("should change Vessel Of Ruin to false when it is true in automatic and normal value", () => {
      store.toggleVesselOfRuin()

      store.toggleAutomaticVesselOfRuin()

      store.toggleVesselOfRuin()

      expect(store.field().isVesselOfRuin).toBe(false)
    })

    it("should change Magic Room to true when it is false", () => {
      store.toggleMagicRoom()

      expect(store.field().isMagicRoom).toBe(true)
    })

    it("should change Magic Room to false when it is true", () => {
      store.toggleMagicRoom()
      store.toggleMagicRoom()

      expect(store.field().isMagicRoom).toBe(false)
    })

    it("should change Wonder Room to true when it is false", () => {
      store.toggleWonderRoom()

      expect(store.field().isWonderRoom).toBe(true)
    })

    it("should change Wonder Room to false when it is true", () => {
      store.toggleWonderRoom()
      store.toggleWonderRoom()

      expect(store.field().isWonderRoom).toBe(false)
    })

    it("should change Gravity to true when it is false", () => {
      store.toggleGravity()

      expect(store.field().isGravity).toBe(true)
    })

    it("should change Gravity to false when it is true", () => {
      store.toggleGravity()
      store.toggleGravity()

      expect(store.field().isGravity).toBe(false)
    })

    it("should change Trick Room to true when it is false", () => {
      store.toggleTrickRoom()

      expect(store.field().isTrickRoom).toBe(true)
    })

    it("should change Trick Room to false when it is true", () => {
      store.toggleTrickRoom()
      store.toggleTrickRoom()

      expect(store.field().isTrickRoom).toBe(false)
    })

    it("should change attacker Critical Hit to true when it is false", () => {
      store.toggleAttackerCriticalHit()

      expect(store.field().attackerSide.isCriticalHit).toBe(true)
    })

    it("should change attacker Critical Hit to false when it is true", () => {
      store.toggleAttackerCriticalHit()
      store.toggleAttackerCriticalHit()

      expect(store.field().attackerSide.isCriticalHit).toBe(false)
    })

    it("should change defender Critical Hit to true when it is false", () => {
      store.toggleDefenderCriticalHit()

      expect(store.field().defenderSide.isCriticalHit).toBe(true)
    })

    it("should change defender Critical Hit to false when it is true", () => {
      store.toggleDefenderCriticalHit()
      store.toggleDefenderCriticalHit()

      expect(store.field().defenderSide.isCriticalHit).toBe(false)
    })

    it("should change Neutralizing Gas to true when it is false", () => {
      store.toggleNeutralizingGas()

      expect(store.field().isNeutralizingGas).toBe(true)
    })

    it("should change Neutralizing Gas to false when it is true", () => {
      store.toggleNeutralizingGas()
      store.toggleNeutralizingGas()

      expect(store.field().isNeutralizingGas).toBe(false)
    })

    it("should change Automatic Neutralizing Gas to true when it is false", () => {
      store.toggleAutomaticNeutralizingGas()

      expect(store.field().isNeutralizingGas).toBe(true)
    })

    it("should change Neutralizing Gas to false when it is true in automatic and normal value", () => {
      store.toggleNeutralizingGas()

      store.toggleAutomaticNeutralizingGas()

      store.toggleNeutralizingGas()

      expect(store.field().isNeutralizingGas).toBe(false)
    })

    it("should change Unnerve to true when it is false", () => {
      store.toggleUnnerve()

      expect(store.field().isUnnerve).toBe(true)
    })

    it("should change Unnerve to false when it is true", () => {
      store.toggleUnnerve()
      store.toggleUnnerve()

      expect(store.field().isUnnerve).toBe(false)
    })

    it("should change Fairy Aura to true when it is false", () => {
      store.toggleFairyAura()

      expect(store.field().isFairyAura).toBe(true)
    })

    it("should change Fairy Aura to false when it is true", () => {
      store.toggleFairyAura()
      store.toggleFairyAura()

      expect(store.field().isFairyAura).toBe(false)
    })

    it("should change attacker Helping Hand to true when it is false", () => {
      store.toggleAttackerHelpingHand()

      expect(store.field().attackerSide.isHelpingHand).toBe(true)
    })

    it("should change attacker Helping Hand to false when it is true", () => {
      store.toggleAttackerHelpingHand()
      store.toggleAttackerHelpingHand()

      expect(store.field().attackerSide.isHelpingHand).toBe(false)
    })

    it("should change defender Helping Hand to true when it is false", () => {
      store.toggleDefenderHelpingHand()

      expect(store.field().defenderSide.isHelpingHand).toBe(true)
    })

    it("should change defender Helping Hand to false when it is true", () => {
      store.toggleDefenderHelpingHand()
      store.toggleDefenderHelpingHand()

      expect(store.field().defenderSide.isHelpingHand).toBe(false)
    })

    it("should change attacker Battery to true when it is false", () => {
      store.toggleAttackerBattery()

      expect(store.field().attackerSide.isBattery).toBe(true)
    })

    it("should change attacker Battery to false when it is true", () => {
      store.toggleAttackerBattery()
      store.toggleAttackerBattery()

      expect(store.field().attackerSide.isBattery).toBe(false)
    })

    it("should change defender Battery to true when it is false", () => {
      store.toggleDefenderBattery()

      expect(store.field().defenderSide.isBattery).toBe(true)
    })

    it("should change defender Battery to false when it is true", () => {
      store.toggleDefenderBattery()
      store.toggleDefenderBattery()

      expect(store.field().defenderSide.isBattery).toBe(false)
    })

    it("should change attacker Power Spot to true when it is false", () => {
      store.toggleAttackerPowerSpot()

      expect(store.field().attackerSide.isPowerSpot).toBe(true)
    })

    it("should change attacker Power Spot to false when it is true", () => {
      store.toggleAttackerPowerSpot()
      store.toggleAttackerPowerSpot()

      expect(store.field().attackerSide.isPowerSpot).toBe(false)
    })

    it("should change defender Power Spot to true when it is false", () => {
      store.toggleDefenderPowerSpot()

      expect(store.field().defenderSide.isPowerSpot).toBe(true)
    })

    it("should change defender Power Spot to false when it is true", () => {
      store.toggleDefenderPowerSpot()
      store.toggleDefenderPowerSpot()

      expect(store.field().defenderSide.isPowerSpot).toBe(false)
    })

    it("should change Attacker Tailwind to true when it is false", () => {
      store.toggleAttackerTailwind()

      expect(store.field().attackerSide.isTailwind).toBe(true)
    })

    it("should change Attacker Tailwind to false when it is true", () => {
      store.toggleAttackerTailwind()
      store.toggleAttackerTailwind()

      expect(store.field().attackerSide.isTailwind).toBe(false)
    })

    it("should change Defender Tailwind to true when it is false", () => {
      store.toggleDefenderTailwind()

      expect(store.field().defenderSide.isTailwind).toBe(true)
    })

    it("should change Defender Tailwind to false when it is true", () => {
      store.toggleDefenderTailwind()
      store.toggleDefenderTailwind()

      expect(store.field().defenderSide.isTailwind).toBe(false)
    })

    it("should change attacker Reflect to true when it is false", () => {
      store.toggleAttackerReflect()

      expect(store.field().attackerSide.isReflect).toBe(true)
    })

    it("should change attacker Reflect to false when it is true", () => {
      store.toggleAttackerReflect()
      store.toggleAttackerReflect()

      expect(store.field().attackerSide.isReflect).toBe(false)
    })

    it("should change defender Reflect to true when it is false", () => {
      store.toggleDefenderReflect()

      expect(store.field().defenderSide.isReflect).toBe(true)
    })

    it("should change defender Reflect to false when it is true", () => {
      store.toggleDefenderReflect()
      store.toggleDefenderReflect()

      expect(store.field().defenderSide.isReflect).toBe(false)
    })

    it("should change attacker Light Screen to true when it is false", () => {
      store.toggleAttackerLightScreen()

      expect(store.field().attackerSide.isLightScreen).toBe(true)
    })

    it("should change attacker Light Screen to false when it is true", () => {
      store.toggleAttackerLightScreen()
      store.toggleAttackerLightScreen()

      expect(store.field().attackerSide.isLightScreen).toBe(false)
    })

    it("should change defender Light Screen to true when it is false", () => {
      store.toggleDefenderLightScreen()

      expect(store.field().defenderSide.isLightScreen).toBe(true)
    })

    it("should change defender Light Screen to false when it is true", () => {
      store.toggleDefenderLightScreen()
      store.toggleDefenderLightScreen()

      expect(store.field().defenderSide.isLightScreen).toBe(false)
    })

    it("should change attacker Aurora Veil to true when it is false", () => {
      store.toggleAttackerAuroraVeil()

      expect(store.field().attackerSide.isAuroraVeil).toBe(true)
    })

    it("should change attacker Aurora Veil to false when it is true", () => {
      store.toggleAttackerAuroraVeil()
      store.toggleAttackerAuroraVeil()

      expect(store.field().attackerSide.isAuroraVeil).toBe(false)
    })

    it("should change defender Aurora Veil to true when it is false", () => {
      store.toggleDefenderAuroraVeil()

      expect(store.field().defenderSide.isAuroraVeil).toBe(true)
    })

    it("should change defender Aurora Veil to false when it is true", () => {
      store.toggleDefenderAuroraVeil()
      store.toggleDefenderAuroraVeil()

      expect(store.field().defenderSide.isAuroraVeil).toBe(false)
    })

    it("should change attacker Friend Guard to true when it is false", () => {
      store.toggleAttackerFriendGuard()

      expect(store.field().attackerSide.isFriendGuard).toBe(true)
    })

    it("should change attacker Friend Guard to false when it is true", () => {
      store.toggleAttackerFriendGuard()
      store.toggleAttackerFriendGuard()

      expect(store.field().attackerSide.isFriendGuard).toBe(false)
    })

    it("should change Defender Friend Guard to true when it is false", () => {
      store.toggleDefenderFriendGuard()

      expect(store.field().defenderSide.isFriendGuard).toBe(true)
    })

    it("should change Defender Friend Guard to false when it is true", () => {
      store.toggleDefenderFriendGuard()
      store.toggleDefenderFriendGuard()

      expect(store.field().defenderSide.isFriendGuard).toBe(false)
    })

    it("should change attacker Spikes to 0", () => {
      store.toggleAttackerSpikes0()

      expect(store.field().attackerSide.spikes).toBe(0)
    })

    it("should change attacker Spikes to 1", () => {
      store.toggleAttackerSpikes1()

      expect(store.field().attackerSide.spikes).toBe(1)
    })

    it("should change attacker Spikes to 2", () => {
      store.toggleAttackerSpikes2()

      expect(store.field().attackerSide.spikes).toBe(2)
    })

    it("should change attacker Spikes to 3", () => {
      store.toggleAttackerSpikes3()

      expect(store.field().attackerSide.spikes).toBe(3)
    })

    it("should change defender Spikes to 0", () => {
      store.toggleDefenderSpikes0()

      expect(store.field().defenderSide.spikes).toBe(0)
    })

    it("should change defender Spikes to 1", () => {
      store.toggleDefenderSpikes1()

      expect(store.field().defenderSide.spikes).toBe(1)
    })

    it("should change defender Spikes to 2", () => {
      store.toggleDefenderSpikes2()

      expect(store.field().defenderSide.spikes).toBe(2)
    })

    it("should change defender Spikes to 3", () => {
      store.toggleDefenderSpikes3()

      expect(store.field().defenderSide.spikes).toBe(3)
    })

    it("should change attacker Seeded to true when it is false", () => {
      store.toggleAttackerSeeded()

      expect(store.field().attackerSide.isSeeded).toBe(true)
    })

    it("should change attacker Seeded to false when it is true", () => {
      store.toggleAttackerSeeded()
      store.toggleAttackerSeeded()

      expect(store.field().attackerSide.isSeeded).toBe(false)
    })

    it("should change defender Seeded to true when it is false", () => {
      store.toggleDefenderSeeded()

      expect(store.field().defenderSide.isSeeded).toBe(true)
    })

    it("should change defender Seeded to false when it is true", () => {
      store.toggleDefenderSeeded()
      store.toggleDefenderSeeded()

      expect(store.field().defenderSide.isSeeded).toBe(false)
    })

    it("should change attacker Stealth Rock to true when it is false", () => {
      store.toggleAttackerStealthRock()

      expect(store.field().attackerSide.isSR).toBe(true)
    })

    it("should change attacker Stealth Rock to false when it is true", () => {
      store.toggleAttackerStealthRock()
      store.toggleAttackerStealthRock()

      expect(store.field().attackerSide.isSR).toBe(false)
    })

    it("should change defender Stealth Rock to true when it is false", () => {
      store.toggleDefenderStealthRock()

      expect(store.field().defenderSide.isSR).toBe(true)
    })

    it("should change defender Stealth Rock to false when it is true", () => {
      store.toggleDefenderStealthRock()
      store.toggleDefenderStealthRock()

      expect(store.field().defenderSide.isSR).toBe(false)
    })

    it("should clean automatic options", () => {
      store.toggleAutomaticSunWeather()
      store.toggleAutomaticElectricTerrain()
      store.toggleAutomaticBeadsOfRuin()
      store.toggleAutomaticSwordOfRuin()
      store.toggleAutomaticTabletsOfRuin()
      store.toggleAutomaticVesselOfRuin()
      store.toggleAutomaticNeutralizingGas()

      store.cleanAutomaticOptions()

      expect(store.field().weather == "Sun").toBe(false)
      expect(store.field().terrain == "Electric").toBe(false)
      expect(store.field().isBeadsOfRuin).toBe(false)
      expect(store.field().isSwordOfRuin).toBe(false)
      expect(store.field().isTabletsOfRuin).toBe(false)
      expect(store.field().isVesselOfRuin).toBe(false)
      expect(store.field().isNeutralizingGas).toBe(false)
    })

    it("should not clean automatic options with exceptions", () => {
      store.toggleAutomaticSunWeather()
      store.toggleAutomaticElectricTerrain()
      store.toggleAutomaticBeadsOfRuin()
      store.toggleAutomaticSwordOfRuin()
      store.toggleAutomaticTabletsOfRuin()
      store.toggleAutomaticVesselOfRuin()
      store.toggleAutomaticNeutralizingGas()

      store.cleanAutomaticOptions(["automaticWeather", "automaticTerrain", "automaticBeadsOfRuinActivated", "automaticSwordOfRuinActivated", "automaticTabletsOfRuinActivated", "automaticVesselOfRuinActivated", "automaticNeutralizingGasActivated"])

      expect(store.field().weather == "Sun").toBe(true)
      expect(store.field().terrain == "Electric").toBe(true)
      expect(store.field().isBeadsOfRuin).toBe(true)
      expect(store.field().isSwordOfRuin).toBe(true)
      expect(store.field().isTabletsOfRuin).toBe(true)
      expect(store.field().isVesselOfRuin).toBe(true)
      expect(store.field().isNeutralizingGas).toBe(true)
    })
  })

  describe("User Data", () => {
    beforeEach(() => {
      const store: Record<string, string | null> = {}

      vi.spyOn(localStorage, "getItem").mockImplementation((key: string): string | null => {
        return store[key] || null
      })

      vi.spyOn(localStorage, "setItem").mockImplementation((key: string, value: string): void => {
        store[key] = value
      })
    })

    it("should update state locking local storage", () => {
      const state = {
        updateLocalStorage: true,
        weather: null,
        terrain: null,
        isBeadsOfRuin: true,
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
        attackerSide: new FieldSide({ gameType: "Doubles" as GameType, isHelpingHand: false, isBattery: false, isPowerSpot: false, isTailwind: false, isCriticalHit: false }),
        defenderSide: new FieldSide({ gameType: "Singles" as GameType, isTailwind: false, isReflect: false, isLightScreen: false, isAuroraVeil: false, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: false, isCriticalHit: true })
      }

      store.updateStateLockingLocalStorage(state)

      expect(store.field().isBeadsOfRuin).toBe(true)
      expect(store.updateLocalStorage()).toBe(false)
    })

    it("should update local storage when state changes", () => {
      store.toggleSunWeather()

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("userData")!)
      expect(actualStorage.champions.fields.simple.weather).toBe("Sun")
    })

    it("should update local storage when state changes mantaining existent data", () => {
      store.toggleSunWeather()

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("userData")!)
      expect(actualStorage.champions.fields.simple.isBeadsOfRuin).toBe(false)
    })
  })
})
