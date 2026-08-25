import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { Pokemon } from "@multicalc/model"
import { SpeedDefinition } from "@multicalc/speed-calc"

describe("SpeedScaleComponent", () => {
  let store: CalcStore

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [CalcStore, FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "speed" }, provideZonelessChangeDetection()]
    })

    store = TestBed.inject(CalcStore)
  })

  function createComponent(): SpeedScaleComponent {
    const component = TestBed.runInInjectionContext(() => new SpeedScaleComponent())

    TestBed.runInInjectionContext(() => {
      component.pokemonId = (() => store.team().activePokemon()!.id) as any
      component.pokemonEachSide = (() => 12) as any
      component.opponentsNoPaddingThreshold = (() => 0) as any
    })

    return component
  }

  it("should start with no selected Pokémon", () => {
    const component = createComponent()

    expect(component.selectedPokemon()).toBeUndefined()
  })

  it("should select the clicked Pokémon", () => {
    const component = createComponent()
    const chosen = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })

    component.setPokemonSelected(chosen)

    expect(component.selectedPokemon()!.id).toBe(chosen.id)
  })

  it("should not select the Pokémon being edited on the scale", () => {
    const component = createComponent()
    const active = store.team().activePokemon()!

    component.setPokemonSelected(active)

    expect(component.selectedPokemon()).toBeUndefined()
  })

  it("should clear the selection when the scale is recalculated", () => {
    const component = createComponent()
    component.setPokemonSelected(new Pokemon("Raging Bolt", { evs: { spe: 100 } }))

    component.clearSelection()

    expect(component.selectedPokemon()).toBeUndefined()
  })

  it("should mark as selected only the box holding the selected Pokémon", () => {
    const component = createComponent()
    const chosen = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })
    const other = new Pokemon("Raging Bolt", { evs: { spe: 100 } })

    component.setPokemonSelected(chosen)

    expect(component.isSelected(new SpeedDefinition(chosen, 205, "Actual"))).toBe(true)
    expect(component.isSelected(new SpeedDefinition(other, 108, "Actual"))).toBe(false)
    expect(component.isSelected(SpeedDefinition.padding())).toBe(false)
  })

  it("should not mark any box as selected while there is no selection", () => {
    const component = createComponent()
    const pokemon = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })

    expect(component.isSelected(new SpeedDefinition(pokemon, 205, "Actual"))).toBe(false)
    expect(component.isSelected(SpeedDefinition.padding())).toBe(false)
  })

  it("should request the outspeed of the selected Pokémon", () => {
    const component = createComponent()
    const chosen = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })
    const requested: Pokemon[] = []

    component.outspeedRequested.subscribe(pokemon => requested.push(pokemon))
    component.setPokemonSelected(chosen)

    component.requestOutspeed()

    expect(requested.map(pokemon => pokemon.id)).toEqual([chosen.id])
  })

  it("should not request any outspeed while there is no selection", () => {
    const component = createComponent()
    const requested: Pokemon[] = []

    component.outspeedRequested.subscribe(pokemon => requested.push(pokemon))

    component.requestOutspeed()

    expect(requested).toEqual([])
  })
})
