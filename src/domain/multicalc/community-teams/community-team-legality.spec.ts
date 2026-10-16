import { CommunityTeamSet, teamLegalityError } from "@multicalc/community-teams"

const MAWILE: CommunityTeamSet = { species: "Mawile", item: "Mawilite", ability: "Hyper Cutter", nature: "Adamant", moves: ["Play Rough", "Rock Slide", "Sucker Punch", "Protect"] }
const CAMERUPT: CommunityTeamSet = { species: "Camerupt", item: "Cameruptite", ability: "Solid Rock", nature: "Quiet", moves: ["Heat Wave", "Earth Power", "Ancient Power", "Protect"] }
const FARIGIRAF: CommunityTeamSet = { species: "Farigiraf", item: "Colbur Berry", ability: "Armor Tail", nature: "Calm", moves: ["Sunny Day", "Protect", "Psychic", "Trick Room"] }
const INCINEROAR: CommunityTeamSet = { species: "Incineroar", item: "Sitrus Berry", ability: "Intimidate", nature: "Brave", moves: ["Flare Blitz", "Parting Shot", "Darkest Lariat", "Fake Out"] }
const RILLABOOM: CommunityTeamSet = { species: "Rillaboom", item: "Miracle Seed", ability: "Grassy Surge", nature: "Adamant", moves: ["Wood Hammer", "Fake Out", "U-turn", "Grassy Glide"] }
const PRIMARINA: CommunityTeamSet = { species: "Primarina", item: "Leftovers", ability: "Liquid Voice", nature: "Quiet", moves: ["Hyper Voice", "Protect", "Calm Mind", "Moonblast"] }

const TEAM = [MAWILE, CAMERUPT, FARIGIRAF, INCINEROAR, RILLABOOM, PRIMARINA]

function teamWith(...sets: CommunityTeamSet[]): CommunityTeamSet[] {
  return [...sets, ...TEAM.slice(sets.length)]
}

describe("teamLegalityError", () => {
  it("should accept a complete team", () => {
    expect(teamLegalityError(TEAM)).toBeUndefined()
  })

  it("should require 6 Pokémon", () => {
    expect(teamLegalityError(TEAM.slice(0, 5))).toBe("A team has 6 Pokémon.")
    expect(teamLegalityError([...TEAM, { ...INCINEROAR, species: "Garchomp" }])).toBe("A team has 6 Pokémon.")
  })

  it("should refuse two forms of the same Pokémon", () => {
    const rotomWash = { species: "Rotom-Wash", nature: "Bold", moves: ["Hydro Pump", "Thunderbolt", "Protect", "Will-O-Wisp"] }

    const team = teamWith(rotomWash, { ...rotomWash, species: "Rotom-Heat", moves: ["Overheat", "Thunderbolt", "Protect", "Will-O-Wisp"] })

    expect(teamLegalityError(team)).toBe("Rotom is repeated. A team has one of each Pokémon.")
  })

  it("should count a Mega as its base form", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, species: "Mawile-Mega" }, { ...MAWILE, item: undefined }))).toBe("Mawile is repeated. A team has one of each Pokémon.")
  })

  it("should accept Porygon and Porygon-Z together", () => {
    const porygon = { species: "Porygon", nature: "Modest", moves: ["Tri Attack", "Recover", "Protect", "Thunderbolt"] }

    expect(teamLegalityError(teamWith(porygon, { ...porygon, species: "porygon-z" }))).toBeUndefined()
  })

  it("should refuse a repeated item", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, item: "Sitrus Berry" }))).toBe("Sitrus Berry is repeated. A team has one of each item.")
  })

  it("should accept Pokémon without item", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, item: undefined }, { ...CAMERUPT, item: "(none)" }, { ...FARIGIRAF, item: "(none)" }))).toBeUndefined()
  })

  it("should require the nature", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, nature: undefined }))).toBe("Mawile: add the nature.")
  })

  it("should refuse an ability the Pokémon does not have", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, item: undefined, ability: "Levitate" }))).toBe("Mawile: Levitate is not one of its abilities.")
  })

  it("should accept the ability of the Mega the Pokémon holds the stone of", () => {
    const garchomp = { species: "Garchomp", item: "Garchompite Z", ability: "Levitate", nature: "Modest", moves: ["Dragon Pulse", "Earth Power", "Power Gem", "Protect"] }

    expect(teamLegalityError(teamWith(garchomp))).toBeUndefined()
    expect(teamLegalityError(teamWith({ ...garchomp, item: "Life Orb" }))).toBe("Garchomp: Levitate is not one of its abilities.")
  })

  it("should accept a Pokémon without declared ability", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, ability: undefined }))).toBeUndefined()
  })

  it("should require 4 moves", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, moves: ["Play Rough", "", "Protect"] }))).toBe("Mawile: add 4 moves.")
  })

  it("should require only the moves the Pokémon can learn when it learns less than 4", () => {
    expect(teamLegalityError(teamWith({ species: "Ditto", item: "Choice Scarf", ability: "Imposter", nature: "Relaxed", moves: ["Transform"] }))).toBeUndefined()
  })

  it("should refuse a repeated move", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, moves: ["Play Rough", "Protect", "Sucker Punch", "protect"] }))).toBe("Mawile: protect is repeated.")
  })

  it("should refuse a move the Pokémon does not learn", () => {
    expect(teamLegalityError(teamWith({ ...MAWILE, moves: ["Play Rough", "Surf", "Sucker Punch", "Protect"] }))).toBe("Mawile: Surf is not learned.")
  })

  it("should validate Aegislash by its Shield form", () => {
    const aegislash = { species: "Aegislash", item: "Weakness Policy", ability: "Stance Change", nature: "Quiet", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"] }

    expect(teamLegalityError(teamWith(aegislash))).toBeUndefined()
    expect(teamLegalityError(teamWith({ ...aegislash, moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Surf"] }))).toBe("Aegislash-Shield: Surf is not learned.")
  })
})
