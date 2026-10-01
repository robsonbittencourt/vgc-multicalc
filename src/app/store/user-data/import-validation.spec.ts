import { importWarningMessage, normalizeName, validateImport } from "@store/user-data/import-validation"
import { Move, MoveSet, Pokemon } from "@multicalc/model"

describe("normalizeName", () => {
  it("should lowercase the name", () => {
    expect(normalizeName("Fake Out")).toBe("fakeout")
  })

  it("should remove hyphens and apostrophes", () => {
    expect(normalizeName("Will-O-Wisp")).toBe("willowisp")
    expect(normalizeName("Forest's Curse")).toBe("forestscurse")
  })
})

describe("validateImport", () => {
  function incineroar(moves: string[]): Pokemon {
    return new Pokemon("Incineroar", {
      moveSet: new MoveSet(new Move(moves[0] ?? ""), new Move(moves[1] ?? ""), new Move(moves[2] ?? ""), new Move(moves[3] ?? "")),
      sps: { hp: 32, atk: 0, def: 1, spa: 0, spd: 32, spe: 0 }
    } as never)
  }

  it("should keep a Pokémon whose moves are all in its learnset", () => {
    const result = validateImport([incineroar(["Fake Out", "Darkest Lariat", "Flare Blitz", "Parting Shot"])])

    expect(result.pokemon.length).toBe(1)
    expect(result.hadInvalidMoves).toBe(false)
  })

  it("should blank out a move that is not in the learnset", () => {
    const result = validateImport([incineroar(["Fake Out", "Knock Off", "Flare Blitz", "Parting Shot"])])

    expect(result.hadInvalidMoves).toBe(true)
    expect(result.pokemon[0].moveSet.move1.name).toBe("Fake Out")
    expect(result.pokemon[0].moveSet.move2.name).toBe("")
  })

  it("should keep empty move slots without flagging them as invalid", () => {
    const result = validateImport([incineroar(["Fake Out", "", "", ""])])

    expect(result.hadInvalidMoves).toBe(false)
  })

  it("should keep a Pokémon and an item outside the current mode", () => {
    const miraidon = new Pokemon("Miraidon", { item: "Master Ball", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")) } as never)

    const result = validateImport([miraidon])

    expect(result.pokemon[0].name).toBe("Miraidon")
    expect(result.pokemon[0].item).toBe("Master Ball")
    expect(result.hadInvalidMoves).toBe(false)
  })
})

describe("importWarningMessage", () => {
  it("should have no message for a clean import", () => {
    expect(importWarningMessage({ pokemon: [], hadInvalidMoves: false })).toBeNull()
  })

  it("should tell that moves the Pokémon does not learn were removed", () => {
    expect(importWarningMessage({ pokemon: [], hadInvalidMoves: true })).toBe("Some moves are not learned by the Pokémon and were removed")
  })
})
