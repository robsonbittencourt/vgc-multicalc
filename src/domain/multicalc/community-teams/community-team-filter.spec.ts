import { CommunityTeamSummary } from "@data/community-teams/community-team-data"
import { CommunityTeamFilter, communityTeamEvents, communityTeamPokemon, filterCommunityTeams, placementRank } from "@multicalc/community-teams"

function team(id: string, overrides: Partial<CommunityTeamSummary> = {}): CommunityTeamSummary {
  return {
    id,
    description: `${id} Team`,
    player: "Someone",
    handle: "someone",
    regulation: "M-C",
    date: "2026-10-04",
    pasteId: "paste",
    hasSps: true,
    setsBlock: 0,
    members: [{ name: "Incineroar" }],
    ...overrides
  }
}

const NO_FILTER: CommunityTeamFilter = { team: "", creator: "", placement: "all", withReplicaCode: false, withSps: false, pokemon: [] }

const TEAMS = [
  team("MC558", {
    description: "Juanfi's Recife Regional 2027 Champion Team",
    player: "Juan Fiallos",
    handle: "Juanfi_VGC",
    event: "Recife Regional 2027",
    placement: "Champion",
    replicaCode: "A4RBRNN9YE",
    members: [{ name: "Charizard-Mega-Y" }, { name: "Incineroar" }, { name: "Garchomp" }]
  }),
  team("MC557", {
    description: "Héctor's Baltimore Regional 2027 Top 8 Team",
    player: "Héctor Pérez",
    handle: "hectorvgc",
    event: "Baltimore Regional 2027",
    placement: "7th",
    replicaCode: "MFAK51W5U1",
    hasSps: false,
    members: [{ name: "Sneasler" }, { name: "Incineroar" }]
  }),
  team("MC556", {
    description: "Lia's Baltimore Regional 2027 Top 32 Team",
    player: "Lia Santos",
    handle: "liasantos",
    event: "Baltimore Regional 2027",
    placement: "Top 32 (Seniors)",
    members: [{ name: "Garchomp" }, { name: "Sneasler" }]
  }),
  team("MC555", { description: "Bo's Ladder Team", player: "Bo", handle: "bo_ladder", placement: "Peak 1st", members: [{ name: "Garchomp" }] })
]

function ids(filter: Partial<CommunityTeamFilter>): string[] {
  return filterCommunityTeams(TEAMS, { ...NO_FILTER, ...filter }).map(t => t.id)
}

describe("filterCommunityTeams", () => {
  it("should keep every team without filters", () => {
    expect(ids({})).toEqual(["MC558", "MC557", "MC556", "MC555"])
  })

  it("should find teams by the team name ignoring case and accents", () => {
    expect(ids({ team: "hector's BALTIMORE" })).toEqual(["MC557"])
  })

  it("should find teams by the start of any word in the name of the creator", () => {
    expect(ids({ creator: "perez" })).toEqual(["MC557"])
    expect(ids({ creator: "hector p" })).toEqual(["MC557"])
  })

  it("should not find teams by the middle of a word in the name of the creator", () => {
    expect(ids({ creator: "erez" })).toEqual([])
  })

  it("should find teams by a word after a separator in the Twitter handle", () => {
    expect(ids({ creator: "vgc" })).toEqual(["MC558"])
    expect(ids({ creator: "ladder" })).toEqual(["MC555"])
  })

  it("should find teams by the Twitter handle of the creator with or without the at sign", () => {
    expect(ids({ creator: "@juanfi" })).toEqual(["MC558"])
    expect(ids({ creator: "liasan" })).toEqual(["MC556"])
  })

  it("should keep only the teams of the chosen event", () => {
    expect(ids({ event: "Baltimore Regional 2027" })).toEqual(["MC557", "MC556"])
  })

  it("should keep only the top 8 placements", () => {
    expect(ids({ placement: "top8" })).toEqual(["MC558", "MC557"])
  })

  it("should keep only the champions as winners", () => {
    expect(ids({ placement: "winners" })).toEqual(["MC558"])
  })

  it("should keep only the teams with a replica code", () => {
    expect(ids({ withReplicaCode: true })).toEqual(["MC558", "MC557"])
  })

  it("should keep only the teams with Stat Points", () => {
    expect(ids({ withSps: true })).toEqual(["MC558", "MC556", "MC555"])
  })

  it("should keep only the teams with every chosen Pokémon", () => {
    expect(ids({ pokemon: ["Garchomp"] })).toEqual(["MC558", "MC556", "MC555"])
    expect(ids({ pokemon: ["Garchomp", "Sneasler"] })).toEqual(["MC556"])
  })

  it("should find the Mega Evolutions of a Pokémon by its base form", () => {
    expect(ids({ pokemon: ["Charizard"] })).toEqual(["MC558"])
    expect(ids({ pokemon: ["Charizard-Mega-Y"] })).toEqual(["MC558"])
  })

  it("should combine every filter", () => {
    expect(ids({ event: "Baltimore Regional 2027", placement: "top8", pokemon: ["Incineroar"], creator: "hector" })).toEqual(["MC557"])
  })
})

describe("placementRank", () => {
  it.each([
    ["Champion", 1],
    ["Runner Up", 2],
    ["3rd", 3],
    ["21st", 21],
    ["52nd", 52],
    ["Top 8", 8],
    ["Top 32 (Seniors)", 32],
    ["Champion (Seniors)", 1]
  ])("should read %s as rank %i", (placement, rank) => {
    expect(placementRank(placement)).toBe(rank)
  })

  it.each([["Peak 4th"], ["Top Cut"], [undefined]])("should not rank %s", placement => {
    expect(placementRank(placement)).toBeUndefined()
  })
})

describe("communityTeamEvents", () => {
  it("should list each event once in the order the teams have them", () => {
    expect(communityTeamEvents(TEAMS)).toEqual(["Recife Regional 2027", "Baltimore Regional 2027"])
  })
})

describe("communityTeamPokemon", () => {
  it("should list the Pokémon of the teams from the most used to the least used", () => {
    expect(communityTeamPokemon(TEAMS)).toEqual(["Garchomp", "Incineroar", "Sneasler", "Charizard-Mega-Y"])
  })

  it("should count a Pokémon once per team", () => {
    const teams = [team("A", { members: [{ name: "Sneasler" }, { name: "Sneasler" }] }), team("B", { members: [{ name: "Incineroar" }] }), team("C", { members: [{ name: "Incineroar" }] })]

    expect(communityTeamPokemon(teams)).toEqual(["Incineroar", "Sneasler"])
  })
})
