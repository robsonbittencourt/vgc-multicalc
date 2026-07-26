import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { toPokepasteText } from "@multicalc/serialization"

describe("toPokepasteText", () => {
  it("should export a Pokémon in EV notation", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    const text = await toPokepasteText(pokemon, false, false)

    expect(text).toBe(pasteWithOnePokemon)
  })

  it("should export a Pokémon with less than 4 moves without undefined lines", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move("")),
      ivs: { hp: 31, atk: 30, def: 31, spa: 31, spd: 31, spe: 31 }
    })

    const text = await toPokepasteText(pokemon, false, false)

    expect(text).toBe(pasteWithOneMove)
  })

  it("should export a Pokémon in SP notation", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    const text = await toPokepasteText(pokemon, true, false)

    expect(text).toBe(pasteWithOnePokemonSps)
  })

  it("should omit the EVs line entirely when a Pokémon has no invested EVs", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move(""))
    })

    const text = await toPokepasteText(pokemon, false, false)

    expect(text).toBe(pasteWithNoEvs)
  })

  it("should omit the SPs line entirely when a Pokémon has no invested EVs in SP mode", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move(""))
    })

    const text = await toPokepasteText(pokemon, true, false)

    expect(text).toBe(pasteWithNoEvs)
  })

  it("should omit only the HP entry from the SPs line when HP has no invested EVs", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 0, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    const text = await toPokepasteText(pokemon, true, false)

    expect(text).toBe(pasteWithNoHpSps)
  })

  it("should omit only the SpD entry from the SPs line when SpD has no invested EVs", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 0, spe: 164 }
    })

    const text = await toPokepasteText(pokemon, true, false)

    expect(text).toBe(pasteWithNoSpdSps)
  })

  it("should include the SpA entry in the SPs line when SpA has invested EVs", async () => {
    const pokemon = new Pokemon("Incineroar", {
      ability: new Ability("Intimidate"),
      nature: "Quiet",
      item: "Safety Goggles",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")),
      evs: { hp: 244, atk: 0, def: 4, spa: 100, spd: 4, spe: 4 }
    })

    const text = await toPokepasteText(pokemon, true, false)

    expect(text).toBe(pasteWithSpaSps)
  })

  it("should include the Tera Type line when includeTeraType is true", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      teraType: "Fire",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    const text = await toPokepasteText(pokemon, false, true)

    expect(text).toBe(pasteWithTeraType)
  })
})

const pasteWithOneMove = `Ditto @ Assault Vest
Ability: Limber
Level: 50
Hardy Nature
- Transform
`

const pasteWithOnePokemon = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 140 HP / 116 Atk / 4 Def / 84 SpD / 164 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower
`

const pasteWithOnePokemonSps = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 18 HP / 15 Atk / 1 Def / 11 SpD / 21 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower
`

const pasteWithNoEvs = `Ditto @ Assault Vest
Ability: Limber
Level: 50
Hardy Nature
- Transform
`

const pasteWithNoHpSps = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 15 Atk / 1 Def / 11 SpD / 21 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower
`

const pasteWithNoSpdSps = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 18 HP / 15 Atk / 1 Def / 21 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower
`

const pasteWithSpaSps = `Incineroar @ Safety Goggles
Ability: Intimidate
Level: 50
EVs: 31 HP / 1 Def / 13 SpA / 1 SpD / 1 Spe
Quiet Nature
- Fake Out
- Knock Off
- Flare Blitz
- Parting Shot
`

const pasteWithTeraType = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
Tera Type: Fire
EVs: 140 HP / 116 Atk / 4 Def / 84 SpD / 164 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower
`
