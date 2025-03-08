import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"

describe("Speed Calc Options Store", () => {
  let store: SpeedCalcOptionsStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()]
    })

    store = TestBed.inject(SpeedCalcOptionsStore)
  })

  describe("Computed", () => {
    it("should return options", () => {
      store.toogleIceWind(true)
      store.toogleParalyze(true)
      store.updateTargetName("Pikachu")

      const options = store.options()

      expect(options.regulation).toBe("G")
      expect(options.targetName).toBe("Pikachu")
      expect(options.speedModifier).toBe(-1)
      expect(options.speedDropActive).toBeTrue()
      expect(options.paralyzedActive).toBeTrue()
      expect(options.choiceScarfActive).toBeFalse()
    })

    it("should return Pokémon by Regulation", () => {
      store.updateRegulation("G")

      const pokemonList = store.pokemonNamesByReg()

      expect(pokemonList.includes("Kyogre")).toBeTrue()
    })

    it("should order Pokémon of Regulation", () => {
      store.updateRegulation("G")

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
    it("should change Speed Modifier to -1 when Ice Wind is enabled", () => {
      store.toogleIceWind(true)

      expect(store.speedModifier()).toBe(-1)
    })

    it("should change Speed Modifier to 0 when Ice Wind is disabled", () => {
      store.toogleIceWind(true)
      store.toogleIceWind(false)

      expect(store.speedModifier()).toBe(0)
    })

    it("should change Speed Drop Active to true when Ice Wind is enabled", () => {
      store.toogleIceWind(true)

      expect(store.speedDropActive()).toBeTrue()
    })

    it("should change Speed Drop Active to false when Ice Wind is disabled", () => {
      store.toogleIceWind(true)
      store.toogleIceWind(false)

      expect(store.speedDropActive()).toBeFalse()
    })

    it("should change Paralyzed Active to true when Paralyze is enabled", () => {
      store.toogleParalyze(true)

      expect(store.paralyzedActive()).toBeTrue()
    })

    it("should change Paralyzed Active to false when Paralyze is disabled", () => {
      store.toogleParalyze(true)
      store.toogleParalyze(false)

      expect(store.paralyzedActive()).toBeFalse()
    })

    it("should change Choice Scarf Active to true when enabled", () => {
      store.toogleChoiceScarf(true)

      expect(store.choiceScarfActive()).toBeTrue()
    })

    it("should change Choice Scarf Active to false when disabled", () => {
      store.toogleChoiceScarf(true)
      store.toogleChoiceScarf(false)

      expect(store.choiceScarfActive()).toBeFalse()
    })

    it("should update Speed Modifier when it is changed", () => {
      store.updateSpeedModifier(5)

      expect(store.speedModifier()).toBe(5)
    })

    it("should update Regulation when it is changed", () => {
      store.updateRegulation("G")

      expect(store.regulation()).toBe("G")
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
      store.updateRegulation("H")

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
