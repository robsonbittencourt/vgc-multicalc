import { provideZonelessChangeDetection } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CalcStore } from "@store/calc-store"
import { TypeComboBoxComponent } from "./type-combo-box.component"

describe("Type Combo Box Component", () => {
  let store: CalcStore
  let fixture: ComponentFixture<TypeComboBoxComponent>
  let component: TypeComboBoxComponent
  let pokemonId: string

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({ providers: [CalcStore, provideZonelessChangeDetection()] })

    store = TestBed.inject(CalcStore)
    pokemonId = store.leftPokemonState().id

    fixture = TestBed.createComponent(TypeComboBoxComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput("editable", true)
    fixture.componentRef.setInput("pokemonId", pokemonId)
    syncTypes()
  })

  function syncTypes() {
    fixture.componentRef.setInput("type1", store.leftPokemon().type1)
    fixture.componentRef.setInput("type2", store.leftPokemon().type2)
    fixture.detectChanges()
  }

  it("should start with the species types and no override", () => {
    expect(store.leftPokemon().name).toBe("Charizard")
    expect(component.type1()).toBe("Fire")
    expect(component.type2()).toBe("Flying")
    expect(component.hasOverride()).toBe(false)
  })

  it("should replace only the primary type", () => {
    component.selectType1("Water")
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Water")
    expect(store.leftPokemon().type2).toBe("Flying")
    expect(component.hasOverride()).toBe(true)
  })

  it("should replace only the secondary type", () => {
    component.selectType2("Steel")
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Fire")
    expect(store.leftPokemon().type2).toBe("Steel")
  })

  it("should turn the Pokémon into a single type when the secondary type is removed", () => {
    component.selectType1("Water")
    syncTypes()

    component.removeType2()
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Water")
    expect(store.leftPokemon().type2).toBeUndefined()
  })

  it("should promote the secondary type when the primary type is removed", () => {
    component.removeType1()
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Flying")
    expect(store.leftPokemon().type2).toBeUndefined()
  })

  it("should keep at least one type when removing from a single type Pokémon", () => {
    component.removeType1()
    syncTypes()

    component.removeType1()
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Flying")
    expect(store.leftPokemon().type2).toBeUndefined()
  })

  it("should restore the species types when the override is cleared", () => {
    component.selectType1("Water")
    syncTypes()

    component.restoreTypes()
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Fire")
    expect(store.leftPokemon().type2).toBe("Flying")
    expect(component.hasOverride()).toBe(false)
  })

  it("should discard the override when another Pokémon is selected", () => {
    component.selectType1("Water")
    syncTypes()

    store.loadPokemonInfo(pokemonId, "Flutter Mane")
    syncTypes()

    expect(store.leftPokemon().name).toBe("Flutter Mane")
    expect(store.leftPokemon().type1).toBe("Ghost")
    expect(store.leftPokemon().type2).toBe("Fairy")
    expect(component.hasOverride()).toBe(false)
  })

  it("should set the unknown type as the primary type", () => {
    component.selectType1("???")
    syncTypes()

    expect(store.leftPokemon().type1).toBe("???")
    expect(store.leftPokemon().type2).toBe("Flying")
    expect(component.hasOverride()).toBe(true)
  })

  it("should turn the Pokémon into a pure unknown type", () => {
    component.selectType1("???")
    syncTypes()

    component.removeType2()
    syncTypes()

    expect(store.leftPokemon().type1).toBe("???")
    expect(store.leftPokemon().type2).toBeUndefined()
  })

  it("should set the unknown type as the secondary type", () => {
    component.selectType2("???")
    syncTypes()

    expect(store.leftPokemon().type1).toBe("Fire")
    expect(store.leftPokemon().type2).toBe("???")
  })

  it("should report Tera as active when the Pokémon is terastallized", () => {
    store.teraTypeActive(pokemonId, true)
    syncTypes()

    expect(component.isTeraActive()).toBe(true)
  })

  it("should not dim the species types when Tera is active without an override", () => {
    store.teraTypeActive(pokemonId, true)
    syncTypes()

    expect(component.isOverrideDimmed()).toBe(false)
  })

  it("should dim the types when Tera is active and the types are overridden", () => {
    component.selectType1("Water")
    syncTypes()

    store.teraTypeActive(pokemonId, true)
    syncTypes()

    expect(component.isOverrideDimmed()).toBe(true)
  })

  it("should not dim overridden types while Tera is inactive", () => {
    component.selectType1("Water")
    syncTypes()

    expect(component.isOverrideDimmed()).toBe(false)
  })
})
