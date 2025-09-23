import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { FieldState, FieldStore } from "@data/store/field-store"
import { AutomaticFieldService } from "./automatic-field-service"
import { Ability } from "./model/ability"
import { Pokemon } from "./model/pokemon"

class MockFieldStore {
  state: Partial<FieldState> = {}

  cleanAutomaticOptions = jasmine.createSpy("cleanAutomaticOptions")
  neutralizingGasActivated = jasmine.createSpy("neutralizingGasActivated").and.returnValue(false)

  toggleAutomaticSunWeather = jasmine.createSpy("toggleAutomaticSunWeather")
  toggleAutomaticRainWeather = jasmine.createSpy("toggleAutomaticRainWeather")
  toggleAutomaticSnowWeather = jasmine.createSpy("toggleAutomaticSnowWeather")
  toggleAutomaticSandWeather = jasmine.createSpy("toggleAutomaticSandWeather")

  toggleAutomaticElectricTerrain = jasmine.createSpy("toggleAutomaticElectricTerrain")
  toggleAutomaticGrassyTerrain = jasmine.createSpy("toggleAutomaticGrassyTerrain")
  toggleAutomaticPsychicTerrain = jasmine.createSpy("toggleAutomaticPsychicTerrain")
  toggleAutomaticMistyTerrain = jasmine.createSpy("toggleAutomaticMistyTerrain")

  toggleAutomaticBeadsOfRuin = jasmine.createSpy("toggleAutomaticBeadsOfRuin")
  toggleAutomaticSwordOfRuin = jasmine.createSpy("toggleAutomaticSwordOfRuin")
  toggleAutomaticTabletsOfRuin = jasmine.createSpy("toggleAutomaticTabletsOfRuin")
  toggleAutomaticVesselOfRuin = jasmine.createSpy("toggleAutomaticVesselOfRuin")

  toggleAutomaticNeutralizingGas = jasmine.createSpy("toggleAutomaticNeutralizingGas")
}

describe("AutomaticFieldService", () => {
  let service: AutomaticFieldService
  let store: MockFieldStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), AutomaticFieldService, { provide: FieldStore, useClass: MockFieldStore }]
    })
    service = TestBed.inject(AutomaticFieldService)
    store = TestBed.inject(FieldStore) as unknown as MockFieldStore
  })

  it("should activate Drought and preserve automaticWeather", () => {
    const pokemon = new Pokemon("Torkoal", { ability: new Ability("Drought") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticSunWeather).toHaveBeenCalled()
  })

  it("should activate Orichalcum Pulse and preserve automaticWeather", () => {
    const pokemon = new Pokemon("Koraidon", { ability: new Ability("Orichalcum Pulse") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticSunWeather).toHaveBeenCalled()
  })

  it("should activate Drizzle and preserve automaticWeather", () => {
    const pokemon = new Pokemon("Politoed", { ability: new Ability("Drizzle") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticRainWeather).toHaveBeenCalled()
  })

  it("should activate Snow Warning and preserve automaticWeather", () => {
    const pokemon = new Pokemon("Ninetales", { ability: new Ability("Snow Warning") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticSnowWeather).toHaveBeenCalled()
  })

  it("should activate Sand Stream and preserve automaticWeather", () => {
    const pokemon = new Pokemon("Tyranitar", { ability: new Ability("Sand Stream") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticSandWeather).toHaveBeenCalled()
  })

  it("should activate Hadron Engine and preserve automaticTerrain", () => {
    const pokemon = new Pokemon("Miraidon", { ability: new Ability("Hadron Engine") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain"])
    expect(store.toggleAutomaticElectricTerrain).toHaveBeenCalled()
  })

  it("should activate Electric Surge and preserve automaticTerrain", () => {
    const pokemon = new Pokemon("Pincurchin", { ability: new Ability("Electric Surge") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain"])
    expect(store.toggleAutomaticElectricTerrain).toHaveBeenCalled()
  })

  it("should activate Grassy Surge and preserve automaticTerrain", () => {
    const pokemon = new Pokemon("Rillaboom", { ability: new Ability("Grassy Surge") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain"])
    expect(store.toggleAutomaticGrassyTerrain).toHaveBeenCalled()
  })

  it("should activate Psychic Surge and preserve automaticTerrain", () => {
    const pokemon = new Pokemon("Indeedee-F", { ability: new Ability("Psychic Surge") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain"])
    expect(store.toggleAutomaticPsychicTerrain).toHaveBeenCalled()
  })

  it("should activate Misty Surge and preserve automaticTerrain", () => {
    const pokemon = new Pokemon("Weezing-Galar", { ability: new Ability("Misty Surge") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain"])
    expect(store.toggleAutomaticMistyTerrain).toHaveBeenCalled()
  })

  it("should activate Beads of Ruin and preserve automaticBeadsOfRuinActivated", () => {
    const pokemon = new Pokemon("Chi-yu", { ability: new Ability("Beads of Ruin") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticBeadsOfRuinActivated"])
    expect(store.toggleAutomaticBeadsOfRuin).toHaveBeenCalled()
  })

  it("should activate Sword of Ruin and preserve automaticSwordOfRuinActivated", () => {
    const pokemon = new Pokemon("Chien-Pao", { ability: new Ability("Sword of Ruin") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticSwordOfRuinActivated"])
    expect(store.toggleAutomaticSwordOfRuin).toHaveBeenCalled()
  })

  it("should activate Tablets of Ruin and preserve automaticTabletsOfRuinActivated", () => {
    const pokemon = new Pokemon("Wo-Chien", { ability: new Ability("Tablets of Ruin") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTabletsOfRuinActivated"])
    expect(store.toggleAutomaticTabletsOfRuin).toHaveBeenCalled()
  })

  it("should activate Vessel of Ruin and preserve automaticVesselOfRuinActivated", () => {
    const pokemon = new Pokemon("Ting-Lu", { ability: new Ability("Vessel of Ruin") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticVesselOfRuinActivated"])
    expect(store.toggleAutomaticVesselOfRuin).toHaveBeenCalled()
  })

  it("should activate Neutralizing Gas and preserve automaticNeutralizingGasActivated", () => {
    const pokemon = new Pokemon("Weezing-Galar", { ability: new Ability("Neutralizing Gas") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticNeutralizingGasActivated"])
    expect(store.toggleAutomaticNeutralizingGas).toHaveBeenCalled()
  })

  it("should not activate ability if Neutralizing Gas is active", () => {
    store.neutralizingGasActivated.and.returnValue(true)

    const pokemon = new Pokemon("Torkoal", { ability: new Ability("Drought") })

    service.checkAutomaticField(pokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticSunWeather).not.toHaveBeenCalled()
  })

  it("should execute first Pokemon ability and skip second if second is affected by Neutralizing Gas", () => {
    store.neutralizingGasActivated.and.returnValue(true)

    const firstPokemon = new Pokemon("Torkoal", { item: "Ability Shield", ability: new Ability("Drought") })
    const secondPokemon = new Pokemon("Pincurchin", { ability: new Ability("Electric Surge") })

    service.checkAutomaticField(firstPokemon, true, secondPokemon, true)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain", "automaticWeather"])
    expect(store.toggleAutomaticSunWeather).toHaveBeenCalled()
    expect(store.toggleAutomaticElectricTerrain).not.toHaveBeenCalled()
  })

  it("should activate ability after Neutralizing Gas was previously active and then left", () => {
    const gasPokemon = new Pokemon("Weezing-Galar", { ability: new Ability("Neutralizing Gas") })
    const droughtPokemon = new Pokemon("Torkoal", { ability: new Ability("Drought") })

    service.checkAutomaticField(gasPokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticNeutralizingGasActivated"])
    expect(store.toggleAutomaticNeutralizingGas).toHaveBeenCalled()

    store.neutralizingGasActivated.and.returnValue(false)

    service.checkAutomaticField(droughtPokemon)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather"])
    expect(store.toggleAutomaticSunWeather).toHaveBeenCalled()
  })

  it("should execute abilities of two pokémons together and preserve both fields", () => {
    const firstPokemon = new Pokemon("Torkoal", { ability: new Ability("Drought") })
    const secondPokemon = new Pokemon("Miraidon", { ability: new Ability("Hadron Engine") })

    service.checkAutomaticField(firstPokemon, true, secondPokemon, true)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticTerrain", "automaticWeather"])
    expect(store.toggleAutomaticSunWeather).toHaveBeenCalled()
    expect(store.toggleAutomaticElectricTerrain).toHaveBeenCalled()
  })

  it("should only activate ability of secondPokemon when first did not change and second did", () => {
    const firstPokemon = new Pokemon("Torkoal", { ability: new Ability("Drought") })
    const secondPokemon = new Pokemon("Miraidon", { ability: new Ability("Hadron Engine") })

    service.checkAutomaticField(firstPokemon, false, secondPokemon, true)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith(["automaticWeather", "automaticTerrain"])
    expect(store.toggleAutomaticSunWeather).not.toHaveBeenCalled()

    expect(store.toggleAutomaticElectricTerrain).toHaveBeenCalled()
  })

  it("should handle null parameters for first/second", () => {
    service.checkAutomaticField(null as any, false, null as any, false)

    expect(store.cleanAutomaticOptions).toHaveBeenCalledWith([])
    expect(store.toggleAutomaticSunWeather).not.toHaveBeenCalled()
    expect(store.toggleAutomaticNeutralizingGas).not.toHaveBeenCalled()
  })
})
