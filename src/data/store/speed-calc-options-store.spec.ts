import { provideZonelessChangeDetection, signal } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SETDEX_CHAMPIONS } from "@data/movesets-champions"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"

describe("Speed Calc Options Store", () => {
  let store: SpeedCalcOptionsStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        SpeedCalcOptionsStore,
        {
          provide: CalculatorStore,
          useValue: {
            game: signal("champions"),
            activeSetdex: SETDEX_CHAMPIONS,
            isChampions: true
          }
        }
      ]
    })

    store = TestBed.inject(SpeedCalcOptionsStore)
  })

  describe("Computed", () => {
    it("should return options", () => {
      store.toggleIcyWind(true)
      store.toggleParalyze(true)
      store.updateTargetName("Pikachu")

      const options = store.options()

      expect(options.regulation).toBe("MA")
      expect(options.targetName).toBe("Pikachu")
      expect(options.speedModifier).toBe(-1)
      expect(options.speedDropActive).toBe(true)
      expect(options.paralyzedActive).toBe(true)
    })

    it("should return Pokémon by Regulation", () => {
      store.updateRegulation("MA")

      const pokemonList = store.pokemonNamesByReg()

      expect(pokemonList.includes("Kommo-o")).toBe(true)
    })

    it("should order Pokémon of Regulation", () => {
      store.updateRegulation("MA")

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

      expect(store.speedDropActive()).toBe(true)
    })

    it("should change Speed Drop Active to false when Icy Wind is disabled", () => {
      store.toggleIcyWind(true)
      store.toggleIcyWind(false)

      expect(store.speedDropActive()).toBe(false)
    })

    it("should change Paralyzed Active to true when Paralyze is enabled", () => {
      store.toggleParalyze(true)

      expect(store.paralyzedActive()).toBe(true)
    })

    it("should change Paralyzed Active to false when Paralyze is disabled", () => {
      store.toggleParalyze(true)
      store.toggleParalyze(false)

      expect(store.paralyzedActive()).toBe(false)
    })

    it("should update Speed Modifier when it is changed", () => {
      store.updateSpeedModifier(5)

      expect(store.speedModifier()).toBe(5)
    })

    it("should update Regulation when it is changed", () => {
      store.updateRegulation("MA")

      expect(store.regulation()).toBe("MA")
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
      store.updateRegulation("MA")

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
