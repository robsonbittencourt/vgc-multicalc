import { provideZonelessChangeDetection, signal } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CalcStore } from "./calc-store"
import { SpeedCalcOptionsStore } from "./speed-calc-options-store"
import { Pokemon, Target, Team, TeamMember } from "@multicalc/model"
import { SpeedCalcMode } from "@multicalc/speed-calc"

describe("Speed Calc Options Store", () => {
  let store: SpeedCalcOptionsStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        SpeedCalcOptionsStore,
        {
          provide: CalcStore,
          useValue: (() => {
            const targets = [new Target(new Pokemon("Chi-Yu")), new Target(new Pokemon("Urshifu"))]

            return {
              teams: signal([
                new Team("team-1", false, "My Team", [new TeamMember(new Pokemon("Incineroar"), true), new TeamMember(new Pokemon("Rillaboom"), false)]),
                new Team("team-2", false, "Single Team", [new TeamMember(new Pokemon("Incineroar"), true)]),
                new Team("team-3", false, "Empty Team", [])
              ]),
              targets: signal(targets)
            }
          })()
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

      expect(options.regulation).toBe("MB")
      expect(options.targetName).toBe("Pikachu")
      expect(options.speedModifier).toBe(-1)
      expect(options.speedDropActive).toBe(true)
      expect(options.paralyzedActive).toBe(true)
    })

    it("should return Pokémon by Regulation", () => {
      store.updateRegulation("MB")

      const pokemonList = store.pokemonNamesByReg()

      expect(pokemonList.includes("Kommo-o")).toBe(true)
    })

    it("should order Pokémon of Regulation", () => {
      store.updateRegulation("MB")

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
      store.updateRegulation("MB")

      expect(store.regulation()).toBe("MB")
    })

    it("should update Top Usage when it is changed", () => {
      store.updateTopUsage("100")

      expect(store.topUsage()).toBe("100")
    })

    it("should update Mode when it is changed", () => {
      store.updateMode(SpeedCalcMode.Base)

      expect(store.mode()).toBe("Base")
    })

    it("should clear Target Name when Regulation is updated", () => {
      store.updateTargetName("Kyogre")
      store.updateRegulation("MB")

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

  describe("Filter", () => {
    it("should list regulations, opponents and teams with at least one Pokémon as filter options", () => {
      const options = store.filterOptions()

      expect(options).toEqual(["Reg M-B", "Opponents", "My Team", "Single Team"])
    })

    it("should not list teams without any non-default Pokémon", () => {
      const options = store.filterOptions()

      expect(options).not.toContain("Empty Team")
    })

    it("should set opponents filter when Opponents is selected", () => {
      store.updateFilter("Opponents")

      expect(store.filterType()).toBe("opponents")
      expect(store.selectedFilter()).toBe("Opponents")
    })

    it("should set team filter when a team is selected", () => {
      store.updateFilter("My Team")

      expect(store.filterType()).toBe("team")
      expect(store.teamId()).toBe("team-1")
      expect(store.selectedFilter()).toBe("My Team")
    })

    it("should set regulation filter when a regulation is selected", () => {
      store.updateFilter("Reg M-B")

      expect(store.filterType()).toBe("regulation")
      expect(store.regulation()).toBe("MB")
      expect(store.selectedFilter()).toBe("Reg M-B")
    })

    it("should show Top Usage only for regulation filter", () => {
      store.updateFilter("Reg M-B")
      expect(store.showTopUsage()).toBe(true)

      store.updateFilter("Opponents")
      expect(store.showTopUsage()).toBe(false)
    })

    it("should have My Team option active by default", () => {
      expect(store.showMyTeam()).toBe(true)
    })

    it("should toggle My Team option", () => {
      store.toggleShowMyTeam(false)
      expect(store.showMyTeam()).toBe(false)

      store.toggleShowMyTeam(true)
      expect(store.showMyTeam()).toBe(true)
    })

    it("should clear Target Name when filter is changed", () => {
      store.updateTargetName("Kyogre")
      store.updateFilter("Opponents")

      expect(store.targetName()).toBe("")
    })

    it("should list opponent Pokémon names when Opponents filter is selected", () => {
      store.updateFilter("Opponents")

      expect(store.pokemonNamesByReg()).toEqual(["Chi-Yu", "Urshifu"])
    })

    it("should list team Pokémon names when a team is selected", () => {
      store.updateFilter("My Team")

      expect(store.pokemonNamesByReg()).toEqual(["Incineroar", "Rillaboom"])
    })
  })
})
