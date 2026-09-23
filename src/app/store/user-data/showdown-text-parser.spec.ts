import { parseShowdownText } from "@store/user-data/showdown-text-parser"

describe("parseShowdownText", () => {
  it("should read every supported field of a set", () => {
    const text = "Pikachu @ Light Ball\nAbility: Static\nTera Type: Electric\nEVs: 4 HP / 252 SpA / 252 Spe\nTimid Nature\n- Thunderbolt\n- Protect"

    const team = parseShowdownText(text)

    expect(team).toEqual({
      name: "",
      pokemon: [{ species: "Pikachu", item: "Light Ball", ability: "Static", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, nature: "Timid", moves: ["Thunderbolt", "Protect"] }]
    })
  })

  it("should read the species from a header with nickname and gender", () => {
    const text = "Smogon (Koffing) (F) @ Eviolite\n- Sludge Bomb"

    const [set] = parseShowdownText(text).pokemon

    expect(set.species).toBe("Koffing")
    expect(set.item).toBe("Eviolite")
  })

  it("should read the species from a header with nickname only", () => {
    const text = "Smogon (Koffing) @ Eviolite\n- Sludge Bomb"

    const [set] = parseShowdownText(text).pokemon

    expect(set.species).toBe("Koffing")
  })

  it("should drop the gender and keep hyphenated forms as the species", () => {
    const text = "Alcremie-Lemon-Cream (M) @ Leftovers\n- Draining Kiss\n\nChi-Yu @ Choice Specs\n- Overheat"

    const species = parseShowdownText(text).pokemon.map(p => p.species)

    expect(species).toEqual(["Alcremie-Lemon-Cream", "Chi-Yu"])
  })

  it("should leave the item empty when the header has no item or declares No Item", () => {
    const text = "Pikachu\n- Thunderbolt\n\nRaichu @ No Item\n- Thunder"

    const items = parseShowdownText(text).pokemon.map(p => p.item)

    expect(items).toEqual([undefined, undefined])
  })

  it("should read the team name from the header without the format and folder", () => {
    const text = "=== [gen9vgc2024] Folder/My Team ===\n\nPikachu @ Light Ball\n- Thunderbolt"

    const team = parseShowdownText(text)

    expect(team.name).toBe("My Team")
    expect(team.pokemon.length).toBe(1)
  })

  it("should read the team name from a header without format", () => {
    const text = "=== My Team ===\n\nPikachu @ Light Ball\n- Thunderbolt"

    const team = parseShowdownText(text)

    expect(team.name).toBe("My Team")
  })

  it("should read only the first team of a backup", () => {
    const text = "=== [gen9] A ===\n\nPikachu @ Light Ball\n- Thunderbolt\n\n=== [gen9] B ===\n\nRaichu @ Focus Sash\n- Thunder"

    const team = parseShowdownText(text)

    expect(team.name).toBe("A")
    expect(team.pokemon.map(p => p.species)).toEqual(["Pikachu"])
  })

  it("should stop at a team header that follows headerless sets", () => {
    const text = "Pikachu @ Light Ball\n- Thunderbolt\n\n=== [gen9] B ===\n\nRaichu @ Focus Sash\n- Thunder"

    const team = parseShowdownText(text)

    expect(team.name).toBe("")
    expect(team.pokemon.map(p => p.species)).toEqual(["Pikachu"])
  })

  it("should split sets by dash separators and by CRLF, CR and tab formatted lines", () => {
    const text = "Pikachu @ Light Ball\r\n- Thunderbolt\r\n---\rRaichu\t@ Focus Sash\n\tAbility:\tStatic\n- Thunder"

    const team = parseShowdownText(text)

    expect(team.pokemon).toEqual([
      { species: "Pikachu", item: "Light Ball", moves: ["Thunderbolt"] },
      { species: "Raichu", item: "Focus Sash", ability: "Static", moves: ["Thunder"] }
    ])
  })

  it("should accept the Trait alias, tilde moves and case insensitive keys", () => {
    const text = "Pikachu @ Light Ball\nTrait: Static\ntera type: Electric\nevs: 4 hp\n~ Thunderbolt\n-Protect"

    const [set] = parseShowdownText(text).pokemon

    expect(set).toEqual({ species: "Pikachu", item: "Light Ball", ability: "Static", teraType: "Electric", evs: { hp: 4 }, moves: ["Thunderbolt", "Protect"] })
  })

  it("should keep only the first four moves", () => {
    const text = "Pikachu @ Light Ball\n- Thunderbolt\n- Protect\n- Fake Out\n- Volt Switch\n- Surf"

    const [set] = parseShowdownText(text).pokemon

    expect(set.moves).toEqual(["Thunderbolt", "Protect", "Fake Out", "Volt Switch"])
  })

  it("should skip invalid EV entries and keep values above 255 untouched", () => {
    const text = "Miraidon @ Choice Specs\nEVs: 999 HP / abc / 4 Foo / 12 Spe\n- Draco Meteor"

    const [set] = parseShowdownText(text).pokemon

    expect(set.evs).toEqual({ hp: 999, spe: 12 })
  })

  it("should ignore fields the calc does not use and unknown lines", () => {
    const text = "Pikachu @ Light Ball\nLevel: 50\nShiny: Yes\nIVs: 0 Atk\nSomething weird\n- Thunderbolt"

    const [set] = parseShowdownText(text).pokemon

    expect(set).toEqual({ species: "Pikachu", item: "Light Ball", moves: ["Thunderbolt"] })
  })

  it("should return an empty team for an empty text", () => {
    const team = parseShowdownText("  \n\n")

    expect(team).toEqual({ name: "", pokemon: [] })
  })
})
