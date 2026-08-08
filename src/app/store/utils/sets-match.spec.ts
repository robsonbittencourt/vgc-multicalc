import { PokemonState } from "@store/calc-store"
import { setsMatch } from "@store/utils/sets-match"

describe("setsMatch", () => {
  function incineroar(overrides: Partial<PokemonState> = {}): PokemonState {
    return {
      id: "1",
      name: "Incineroar",
      nature: "Careful",
      item: "Sitrus Berry",
      status: "",
      ability: "Intimidate",
      abilityOn: true,
      commanderActive: false,
      teraType: "Grass",
      teraTypeActive: false,
      activeMove: 1,
      moveSet: [{ name: "Fake Out" }, { name: "Knock Off" }, { name: "Flare Blitz" }, { name: "Parting Shot" }],
      boosts: {},
      bonusBoosts: {},
      evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false,
      ...overrides
    } as PokemonState
  }

  it("should match two identical sets", () => {
    expect(setsMatch(incineroar(), incineroar())).toBe(true)
  })

  it("should not match when the nature differs", () => {
    expect(setsMatch(incineroar(), incineroar({ nature: "Adamant" }))).toBe(false)
  })

  it("should not match when the item differs", () => {
    expect(setsMatch(incineroar(), incineroar({ item: "Assault Vest" }))).toBe(false)
  })

  it("should not match when the ability differs", () => {
    expect(setsMatch(incineroar(), incineroar({ ability: "Blaze" }))).toBe(false)
  })

  it("should not match when the tera type differs", () => {
    expect(setsMatch(incineroar(), incineroar({ teraType: "Water" }))).toBe(false)
  })

  it("should not match when a single EV differs", () => {
    expect(setsMatch(incineroar(), incineroar({ evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 252, spe: 4 } }))).toBe(false)
  })

  it("should not match when a single IV differs", () => {
    expect(setsMatch(incineroar(), incineroar({ ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31 } }))).toBe(false)
  })

  it("should treat a missing EV as zero", () => {
    const saved = incineroar({ evs: { hp: 252, def: 4, spd: 252 } })
    const current = incineroar({ evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 } })

    expect(setsMatch(saved, current)).toBe(true)
  })

  it("should treat a missing IV as thirty one", () => {
    const saved = incineroar({ ivs: {} })
    const current = incineroar({ ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 } })

    expect(setsMatch(saved, current)).toBe(true)
  })

  it("should treat a missing EV as zero on the current set", () => {
    const saved = incineroar({ evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 } })
    const current = incineroar({ evs: { hp: 252, def: 4, spd: 252 } })

    expect(setsMatch(saved, current)).toBe(true)
  })

  it("should treat a missing IV as thirty one on the current set", () => {
    const saved = incineroar({ ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 } })
    const current = incineroar({ ivs: {} })

    expect(setsMatch(saved, current)).toBe(true)
  })

  it("should treat a missing move slot as an empty move on the current set", () => {
    const saved = incineroar({ moveSet: [{ name: "Fake Out" }, { name: "" }, { name: "" }, { name: "" }] } as Partial<PokemonState>)
    const current = incineroar({ moveSet: [{ name: "Fake Out" }] } as Partial<PokemonState>)

    expect(setsMatch(saved, current)).toBe(true)
  })

  it("should not match when a move differs", () => {
    const current = incineroar({ moveSet: [{ name: "Fake Out" }, { name: "Knock Off" }, { name: "Flare Blitz" }, { name: "U-turn" }] } as Partial<PokemonState>)

    expect(setsMatch(incineroar(), current)).toBe(false)
  })

  it("should treat a missing move slot as an empty move", () => {
    const saved = incineroar({ moveSet: [{ name: "Fake Out" }] } as Partial<PokemonState>)
    const current = incineroar({ moveSet: [{ name: "Fake Out" }, { name: "" }, { name: "" }, { name: "" }] } as Partial<PokemonState>)

    expect(setsMatch(saved, current)).toBe(true)
  })
})
