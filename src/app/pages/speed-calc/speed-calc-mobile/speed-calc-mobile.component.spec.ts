import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { provideRouter } from "@angular/router"
import { SpeedCalcMobileComponent } from "@pages/speed-calc/speed-calc-mobile/speed-calc-mobile.component"
import { MobileCreationFlowService } from "@features/team/creation-flow/mobile-creation-flow.service"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { Pokemon } from "@multicalc/model"

describe("SpeedCalcMobileComponent", () => {
  let store: CalcStore

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [CalcStore, FieldStore, AutomaticFieldService, MobileTableOverlayService, MobileCreationFlowService, { provide: FIELD_CONTEXT, useValue: "speed" }, provideRouter([]), provideZonelessChangeDetection()]
    })

    store = TestBed.inject(CalcStore)
  })

  function createComponent(): SpeedCalcMobileComponent {
    return TestBed.runInInjectionContext(() => new SpeedCalcMobileComponent())
  }

  it("should start with no selected Pokémon", () => {
    const component = createComponent()

    expect(component.selectedPokemon()).toBeUndefined()
  })

  it("should keep the Pokémon selected on the scale", () => {
    const component = createComponent()
    const chosen = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })

    component.onSpeedTierSelected(chosen)

    expect(component.selectedPokemon()!.id).toBe(chosen.id)
  })

  it("should show the edited Pokémon on insights while nothing is selected on the scale", () => {
    const component = createComponent()

    expect(component.insightsPokemon()!.id).toBe(component.pokemon().id)
  })

  it("should show the scale selection on insights when there is one", () => {
    const component = createComponent()
    const chosen = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })

    component.onSpeedTierSelected(chosen)

    expect(component.insightsPokemon()!.id).toBe(chosen.id)
  })

  it("should clear the selection when the Pokémon on edit changes", () => {
    const component = createComponent()
    component.onSpeedTierSelected(new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" }))

    component.onPokemonOnEditIdChange(store.team().teamMembers[1].pokemon.id)

    expect(component.selectedPokemon()).toBeUndefined()
  })

  it("should clear the selection when a team Pokémon is used", () => {
    const component = createComponent()
    component.onSpeedTierSelected(new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" }))

    component.onTeamSelected(store.team().teamMembers[1].pokemon.id)

    expect(component.selectedPokemon()).toBeUndefined()
  })

  it("should clear the selection when the edited Pokémon species changes", () => {
    const component = createComponent()
    component.onSpeedTierSelected(new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" }))

    component.onPokemonSelected("Rillaboom")

    expect(component.selectedPokemon()).toBeUndefined()
  })
})
