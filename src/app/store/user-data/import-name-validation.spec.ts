import { canonicalNames, InvalidNamesError, invalidNames, NamedFields } from "@store/user-data/import-name-validation"

describe("invalidNames", () => {
  const exact: NamedFields = { item: "Lucarionite Z", ability: "Inner Focus", nature: "Jolly", teraType: "Fighting", moves: ["Close Combat", "Extreme Speed", "Meteor Mash", "Protect"] }

  it("should accept a set whose names match the data exactly", () => {
    expect(invalidNames("Lucario", "Lucario", exact)).toEqual([])
  })

  it("should accept names with apostrophes, hyphens and the Stellar Tera type", () => {
    const fields: NamedFields = { item: "King's Rock", ability: "Mind's Eye", teraType: "Stellar", moves: ["King's Shield", "U-turn", "Will-O-Wisp", "Double-Edge"] }

    expect(invalidNames("Aegislash", "Aegislash", fields)).toEqual([])
  })

  it("should accept a species name that only differs from the data by the apostrophe", () => {
    expect(invalidNames("Farfetch'd", "Farfetch'd", { moves: [] })).toEqual([])
    expect(invalidNames("Sirfetch’d", "Sirfetch’d", { moves: [] })).toEqual([])
  })

  it("should accept an accented species written with a precomposed or a combining accent", () => {
    expect(invalidNames("Flabébé", "Flab\u00e9b\u00e9", { moves: [] })).toEqual([])
    expect(invalidNames("Flabébé", "Flabe\u0301be\u0301", { moves: [] })).toEqual([])
  })

  it("should ignore fields the set does not declare", () => {
    expect(invalidNames("Lucario", "Lucario", { item: "", ability: null, nature: undefined, teraType: "", moves: ["", null, "Protect"] })).toEqual([])
  })

  it("should report the item written without the space", () => {
    expect(invalidNames("Lucario", "Lucario", { ...exact, item: "LucarioniteZ" })).toEqual([{ pokemon: "Lucario", field: "item", value: "LucarioniteZ" }])
  })

  it("should accept every field written in another case", () => {
    const fields: NamedFields = { item: "lucarionite z", ability: "inner focus", nature: "jolly", teraType: "FIGHTING", moves: ["close combat", "EXTREME SPEED", "meteor mash", "protect"] }

    expect(invalidNames("lucario", "lucario", fields)).toEqual([])
  })

  it("should report names that only differ from the data by spaces or hyphens", () => {
    const fields: NamedFields = { item: "ChoiceScarf", ability: "Rough-Skin", moves: ["Earth quake", "U turn"] }

    expect(invalidNames("Garchomp", "Garchomp", fields)).toEqual([
      { pokemon: "Garchomp", field: "item", value: "ChoiceScarf" },
      { pokemon: "Garchomp", field: "ability", value: "Rough-Skin" },
      { pokemon: "Garchomp", field: "move", value: "Earth quake" },
      { pokemon: "Garchomp", field: "move", value: "U turn" }
    ])
  })

  it("should report names that do not exist in any spelling", () => {
    const fields: NamedFields = { item: "Baya Lum", ability: "Intrigante", nature: "Suave", teraType: "Light", moves: ["Terremoto"] }

    expect(invalidNames("Garchomp", "Garchomp", fields)).toEqual([
      { pokemon: "Garchomp", field: "item", value: "Baya Lum" },
      { pokemon: "Garchomp", field: "ability", value: "Intrigante" },
      { pokemon: "Garchomp", field: "nature", value: "Suave" },
      { pokemon: "Garchomp", field: "Tera type", value: "Light" },
      { pokemon: "Garchomp", field: "move", value: "Terremoto" }
    ])
  })

  it("should report a species that only differs from the data by the hyphen", () => {
    expect(invalidNames("Chi Yu", "Chi Yu", { moves: [] })).toEqual([{ pokemon: "Chi Yu", field: "name", value: "Chi Yu" }])
  })
})

describe("canonicalNames", () => {
  it("should rewrite every name as it is written in the data", () => {
    const fields: NamedFields = { item: "lucarionite z", ability: "inner focus", nature: "jolly", teraType: "fighting", moves: ["close combat", "EXTREME SPEED", "u-turn", "protect"] }

    expect(canonicalNames("lucario", fields)).toEqual({
      name: "Lucario",
      fields: { item: "Lucarionite Z", ability: "Inner Focus", nature: "Jolly", teraType: "Fighting", moves: ["Close Combat", "Extreme Speed", "U-turn", "Protect"] }
    })
  })

  it("should keep the fields the set does not declare and the other fields of the set", () => {
    const fields = { species: "sirfetch'd", item: "", ability: null, nature: undefined, teraType: "", moves: ["", null], evs: { hp: 32 } }

    expect(canonicalNames("sirfetch'd", fields)).toEqual({ name: "Sirfetch’d", fields: { species: "sirfetch'd", item: "", ability: null, nature: undefined, teraType: "", moves: ["", null], evs: { hp: 32 } } })
  })
})

describe("InvalidNamesError", () => {
  it("should group the invalid names by Pokémon in the message", () => {
    const error = new InvalidNamesError([
      { pokemon: "Lucario", field: "item", value: "LucarioniteZ" },
      { pokemon: "garchomp", field: "name", value: "garchomp" },
      { pokemon: "Lucario", field: "ability", value: "inner focus" }
    ])

    expect(error.message).toBe('Unknown names — Lucario: item "LucarioniteZ", ability "inner focus"; garchomp: name "garchomp"')
    expect(error.name).toBe("InvalidNamesError")
    expect(error.invalid.length).toBe(3)
  })
})
