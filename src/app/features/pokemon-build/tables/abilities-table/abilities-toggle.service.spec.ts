import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CalcStore } from "@store/calc-store"
import { AbilitiesToggleService } from "./abilities-toggle.service"

describe("AbilitiesToggleService", () => {
  let service: AbilitiesToggleService
  let store: { findPokemonById: ReturnType<typeof vi.fn> }

  const pokemonWith = (abilityName: string, availableAbilities: string[]) => ({
    ability: { name: abilityName },
    availableAbilities: availableAbilities.map(name => ({ name }))
  })

  beforeEach(() => {
    store = { findPokemonById: vi.fn() }

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), AbilitiesToggleService, { provide: CalcStore, useValue: store }]
    })

    service = TestBed.inject(AbilitiesToggleService)
  })

  it("should start with all abilities hidden", () => {
    expect(service.showAllAbilities()).toBe(false)
  })

  it("should toggle the all abilities flag", () => {
    service.toggleShowAllAbilities()

    expect(service.showAllAbilities()).toBe(true)

    service.toggleShowAllAbilities()

    expect(service.showAllAbilities()).toBe(false)
  })

  it("should not consider a native ability as non native", () => {
    store.findPokemonById.mockReturnValue(pokemonWith("Overgrow", ["Overgrow", "Chlorophyll"]))

    expect(service.hasNonNativeAbility("venusaur-id")).toBe(false)
  })

  it("should consider an ability outside the pokemon list as non native", () => {
    store.findPokemonById.mockReturnValue(pokemonWith("Aerilate", ["Overgrow", "Chlorophyll"]))

    expect(service.hasNonNativeAbility("venusaur-id")).toBe(true)
  })

  it("should not consider an empty pokemon id as non native", () => {
    expect(service.hasNonNativeAbility("")).toBe(false)
    expect(store.findPokemonById).not.toHaveBeenCalled()
  })

  it("should reset the all abilities flag when the pokemon changes", () => {
    service.resetForPokemon("venusaur-id")
    service.toggleShowAllAbilities()

    service.resetForPokemon("incineroar-id")

    expect(service.showAllAbilities()).toBe(false)
  })

  it("should keep the all abilities flag when the same pokemon is reopened", () => {
    service.resetForPokemon("venusaur-id")
    service.toggleShowAllAbilities()

    service.resetForPokemon("venusaur-id")

    expect(service.showAllAbilities()).toBe(true)
  })
})
