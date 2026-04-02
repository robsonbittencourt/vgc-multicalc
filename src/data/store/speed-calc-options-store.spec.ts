import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"

describe("Speed Calc Options Store", () => {
  let store: SpeedCalcOptionsStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })

    store = TestBed.inject(SpeedCalcOptionsStore)
  })

  describe("Computed", () => {
    it("should return options", () => {
      store.toggleIcyWind(true)
      store.toggleParalyze(true)
      store.updateTargetName("Pikachu")

      const options = store.options()

      expect(options.regulation).toBe("I")
      expect(options.targetName).toBe("Pikachu")
      expect(options.speedModifier).toBe(-1)
      expect(options.speedDropActive).toBeTrue()
      expect(options.paralyzedActive).toBeTrue()
      expect(options.choiceScarfActive).toBeFalse()
    })

    it("should return Pokémon by Regulation", () => {
      store.updateRegulation("I")

      const pokemonList = store.pokemonNamesByReg()

      expect(pokemonList.includes("Kyogre")).toBeTrue()
    })

    it("should order Pokémon of Regulation", () => {
      store.updateRegulation("I")

      const pokemonList = store.pokemonNamesByReg()

      for (let index = 0; index < pokemonList.length; index++) {
        const actual = pokemonList[index]
        const next = pokemonList[index + 1]

        if (next) {
          expect(next >= actual).toBeTruthy()
        }
      }
    })
  })

  describe("Methods", () => {
    it("should change Speed Modifier to -1 when Icy Wind is enabled", () => {
      store.toggleIcyWind(true)

      expect(store.speedModifier()).toBe(-1)
    })

    it("should change Speed Modifier to 0 when Icy Wind is disabled", () => {
      store.toggleIcyWind(true)
      store.toggleIcyWind(false)

      expect(store.speedModifier()).toBe(0)
    })

    it("should change Speed Drop Active to true when Icy Wind is enabled", () => {
      store.toggleIcyWind(true)

      expect(store.speedDropActive()).toBeTrue()
    })

    it("should change Speed Drop Active to false when Icy Wind is disabled", () => {
      store.toggleIcyWind(true)
      store.toggleIcyWind(false)

      expect(store.speedDropActive()).toBeFalse()
    })

    it("should change Paralyzed Active to true when Paralyze is enabled", () => {
      store.toggleParalyze(true)

      expect(store.paralyzedActive()).toBeTrue()
    })

    it("should change Paralyzed Active to false when Paralyze is disabled", () => {
      store.toggleParalyze(true)
      store.toggleParalyze(false)

      expect(store.paralyzedActive()).toBeFalse()
    })

    it("should change Choice Scarf Active to true when enabled", () => {
      store.toggleChoiceScarf(true)

      expect(store.choiceScarfActive()).toBeTrue()
    })

    it("should change Choice Scarf Active to false when disabled", () => {
      store.toggleChoiceScarf(true)
      store.toggleChoiceScarf(false)

      expect(store.choiceScarfActive()).toBeFalse()
    })

    it("should update Speed Modifier when it is changed", () => {
      store.updateSpeedModifier(5)

      expect(store.speedModifier()).toBe(5)
    })

    it("should update Regulation when it is changed", () => {
      store.updateRegulation("I")

      expect(store.regulation()).toBe("I")
    })

    it("should update Top Usage when it is changed", () => {
      store.updateTopUsage("100")

      expect(store.topUsage()).toBe("100")
    })

    it("should update Mode when it is changed", () => {
      store.updateMode(SpeedCalculatorMode.Base)

      expect(store.mode()).toBe("Base")
    })

    it("should clear Target Name when Regulation is updated", () => {
      store.updateTargetName("Kyogre")
      store.updateRegulation("I")

      expect(store.targetName()).toBe("")
    })

    it("should update Target Name when it is changed", () => {
      store.updateTargetName("Kyogre")

      expect(store.targetName()).toBe("Kyogre")
    })

    it("should clear Target Name when it is reset", () => {
      store.updateTargetName("Kyogre")
      store.clearTargetName()

      expect(store.targetName()).toBe("")
    })
  })
})
