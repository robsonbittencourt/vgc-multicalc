import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpeedCalcComponent } from "@pages/speed-calc/speed-calc/speed-calc.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"

describe("SpeedCalcComponent", () => {
  let store: CalcStore

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [CalcStore, FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "speed" }, provideZonelessChangeDetection()]
    })

    store = TestBed.inject(CalcStore)
  })

  function emptyActiveTeam() {
    store
      .team()
      .teamMembers.map(member => member.pokemon.id)
      .forEach(id => store.removeTeamMember(id))
  }

  it("should expose no selected Pokémon while the active team is empty", () => {
    emptyActiveTeam()

    const component = TestBed.runInInjectionContext(() => new SpeedCalcComponent())

    expect(component.selectedPokemon()).toBeUndefined()
    expect(component.isPokemonDefault()).toBe(true)
  })

  it("should select the Pokémon added to an empty team while the screen is open", () => {
    emptyActiveTeam()
    const component = TestBed.runInInjectionContext(() => new SpeedCalcComponent())

    store.addPokemonToTeam("Incineroar")

    expect(component.isPokemonDefault()).toBe(false)
    expect(component.selectedPokemon()).toBeDefined()
    expect(component.selectedPokemon()!.name).toBe("Incineroar")
  })

  it("should keep the Pokémon chosen by the user when the team changes", () => {
    const component = TestBed.runInInjectionContext(() => new SpeedCalcComponent())
    const chosen = store.team().activePokemon()!

    component.selectedPokemon.set(chosen)
    store.addPokemonToTeam("Rillaboom")

    expect(component.selectedPokemon()!.id).toBe(chosen.id)
  })
})
