import { provideZonelessChangeDetection } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { getAllAbilities } from "@data/ability-data"
import { CalcStore } from "@store/calc-store"
import { AbilitiesTableComponent } from "./abilities-table.component"
import { AbilitiesToggleService } from "./abilities-toggle.service"

describe("AbilitiesTableComponent", () => {
  let fixture: ComponentFixture<AbilitiesTableComponent>
  let component: AbilitiesTableComponent
  let toggle: AbilitiesToggleService
  let store: { findPokemonById: ReturnType<typeof vi.fn> }

  const venusaur = {
    ability: { name: "Overgrow" },
    availableAbilities: [
      { name: "Overgrow", description: "" },
      { name: "Chlorophyll", description: "" }
    ]
  }

  const venusaurWithNonNativeAbility = {
    ability: { name: "Aerilate" },
    availableAbilities: venusaur.availableAbilities
  }

  const createComponent = (pokemon: unknown) => {
    store.findPokemonById.mockReturnValue(pokemon)

    fixture = TestBed.createComponent(AbilitiesTableComponent)
    component = fixture.componentInstance

    fixture.componentRef.setInput("pokemonId", "venusaur-id")
    fixture.componentRef.setInput("dataFilter", "")
    fixture.componentRef.setInput("haveFocus", false)
    fixture.detectChanges()
  }

  beforeEach(() => {
    store = { findPokemonById: vi.fn() }

    TestBed.configureTestingModule({
      imports: [AbilitiesTableComponent],
      providers: [provideZonelessChangeDetection(), { provide: CalcStore, useValue: store }]
    })

    toggle = TestBed.inject(AbilitiesToggleService)
  })

  it("should show only the pokemon abilities without a group title when the toggle is off", () => {
    createComponent(venusaur)

    const data = component.abilitiesData()

    expect(data).toHaveLength(1)
    expect(data[0].group).toBe("")
    expect(data[0].data.map(ability => ability.name)).toEqual(["Overgrow", "Chlorophyll"])
  })

  it("should split pokemon and remaining abilities in two groups when the toggle is on", () => {
    createComponent(venusaur)

    toggle.toggleShowAllAbilities()
    const data = component.abilitiesData()

    expect(data.map(group => group.group)).toEqual(["This Pokémon", "All Abilities"])
    expect(data[0].data.map(ability => ability.name)).toEqual(["Overgrow", "Chlorophyll"])
    expect(data[1].data).toHaveLength(getAllAbilities().length - 2)
  })

  it("should not repeat the pokemon abilities inside the all abilities group", () => {
    createComponent(venusaur)

    toggle.toggleShowAllAbilities()
    const allAbilitiesGroup = component.abilitiesData()[1]

    expect(allAbilitiesGroup.data.map(ability => ability.name)).not.toContain("Overgrow")
    expect(allAbilitiesGroup.data.map(ability => ability.name)).not.toContain("Chlorophyll")
  })

  it("should show both groups when the selected ability is not native even with the toggle off", () => {
    createComponent(venusaurWithNonNativeAbility)

    const data = component.abilitiesData()

    expect(component.hasNonNativeAbility()).toBe(true)
    expect(toggle.showAllAbilities()).toBe(false)
    expect(data.map(group => group.group)).toEqual(["This Pokémon", "All Abilities"])
    expect(data[1].data.map(ability => ability.name)).toContain("Aerilate")
  })

  it("should mark the current ability as selected", () => {
    createComponent(venusaurWithNonNativeAbility)

    expect(component.actualAbility()).toEqual(["Aerilate"])
  })
})
