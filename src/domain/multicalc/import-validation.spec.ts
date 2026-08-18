import { normalizeName, validateImport } from "@multicalc/import-validation"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"

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
  const validItems = ["(none)", "sitrusberry", "assaultvest"]

  function incineroar(moves: string[], item = "Sitrus Berry"): Pokemon {
    return new Pokemon("Incineroar", {
      item,
      moveSet: new MoveSet(new Move(moves[0] ?? ""), new Move(moves[1] ?? ""), new Move(moves[2] ?? ""), new Move(moves[3] ?? "")),
      evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 }
    } as never)
  }

  it("should keep a Pokémon whose moves are all in its learnset", () => {
    const result = validateImport([incineroar(["Fake Out", "Darkest Lariat", "Flare Blitz", "Parting Shot"])], validItems)

    expect(result.pokemon.length).toBe(1)
    expect(result.removedCount).toBe(0)
    expect(result.hadInvalidMoves).toBe(false)
    expect(result.hadInvalidItems).toBe(false)
  })

  it("should blank out a move that is not in the learnset", () => {
    const result = validateImport([incineroar(["Fake Out", "Knock Off", "Flare Blitz", "Parting Shot"])], validItems)

    expect(result.hadInvalidMoves).toBe(true)
    expect(result.pokemon[0].moveSet.move1.name).toBe("Fake Out")
    expect(result.pokemon[0].moveSet.move2.name).toBe("")
  })

  it("should keep empty move slots without flagging them as invalid", () => {
    const result = validateImport([incineroar(["Fake Out", "", "", ""])], validItems)

    expect(result.hadInvalidMoves).toBe(false)
  })

  it("should remove a Pokémon that is not part of the current movesets", () => {
    const unknown = new Pokemon("Incineroar", { evs: { hp: 4, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } } as never)
    Object.defineProperty(unknown, "name", { value: "Missingno", configurable: true })

    const result = validateImport([unknown], validItems)

    expect(result.pokemon.length).toBe(0)
    expect(result.removedCount).toBe(1)
  })

  it("should clear an item that is not allowed", () => {
    const result = validateImport([incineroar(["Fake Out", "Darkest Lariat", "Flare Blitz", "Parting Shot"], "Master Ball")], validItems)

    expect(result.hadInvalidItems).toBe(true)
    expect(result.pokemon[0].item).toBe("(none)")
  })

  it("should keep an item that is allowed", () => {
    const result = validateImport([incineroar(["Fake Out", "Darkest Lariat", "Flare Blitz", "Parting Shot"], "Assault Vest")], validItems)

    expect(result.hadInvalidItems).toBe(false)
    expect(result.pokemon[0].item).toBe("Assault Vest")
  })

  it("should not flag a Pokémon imported without an item as invalid", () => {
    const result = validateImport([incineroar(["Fake Out", "Darkest Lariat", "Flare Blitz", "Parting Shot"], "")], validItems)

    expect(result.pokemon[0].item).toBe("(none)")
    expect(result.hadInvalidItems).toBe(false)
  })

  it("should apply the default set when the imported Pokémon has no EVs at all", () => {
    const noEvs = new Pokemon("Incineroar", {
      item: "Sitrus Berry",
      moveSet: new MoveSet(new Move("Fake Out"), new Move(""), new Move(""), new Move("")),
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    } as never)

    const result = validateImport([noEvs], validItems)

    const totalEvs = Object.values(result.pokemon[0].evs).reduce((sum, ev) => sum + ev, 0)

    expect(totalEvs).toBeGreaterThan(0)
  })
})
