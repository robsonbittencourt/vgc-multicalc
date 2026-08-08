import { initialCalcState } from "./initial-calc-state"

describe("initialCalcState", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should default to SPs mode when there is no stored user data", () => {
    const state = initialCalcState()

    expect(state.useSpsMode).toBe(true)
  })

  it("should keep the stored SPs mode preference", () => {
    localStorage.setItem("userData", JSON.stringify({ useSpsMode: false }))

    const state = initialCalcState()

    expect(state.useSpsMode).toBe(false)
  })

  it("should start from the defaults when no Pokémon was ever saved", () => {
    const state = initialCalcState()

    expect(state.leftPokemonState.name).toBe("Charizard")
    expect(state.activeSetId).toBeNull()
  })

  it("should rebuild the saved state when a left Pokémon was stored", () => {
    const leftPokemon = {
      name: "Incineroar",
      nature: "Careful",
      item: "Safety Goggles",
      status: "Healthy",
      ability: "Intimidate",
      abilityOn: false,
      commanderActive: false,
      teraType: "",
      teraTypeActive: false,
      moveSet: ["Fake Out", "Knock Off", "Flare Blitz", "Parting Shot"],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
    }
    const rightPokemon = { ...leftPokemon, name: "Rillaboom", ability: "Grassy Surge" }
    localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon, rightPokemon, teams: [], targets: [] } }))

    const state = initialCalcState()

    expect(state.leftPokemonState.name).toBe("Incineroar")
  })
})
