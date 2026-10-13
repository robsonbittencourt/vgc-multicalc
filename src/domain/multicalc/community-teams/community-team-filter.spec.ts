import { SubmittedTeam, VgcPastesTeam } from "@data/community-teams/community-team-data"
import { CommunityTeamFilter, communityTeamEvents, communityTeamPokemon, filterCommunityTeams, isSubmittedTeam, matchesSearch, mergeCommunityTeams, mostUsedTeams, placementRank } from "@multicalc/community-teams"

function submitted(id: string, overrides: Partial<SubmittedTeam> = {}): SubmittedTeam {
  return {
    id,
    description: `${id} Team`,
    player: "Community Player",
    regulation: "M-C",
    date: "2026-10-12T10:00:00.000Z",
    pasteId: id,
    hasSps: false,
    members: [{ name: "Pelipper" }],
    source: "community",
    ...overrides
  }
}

function team(id: string, overrides: Partial<VgcPastesTeam> = {}): VgcPastesTeam {
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

const NO_FILTER: CommunityTeamFilter = { team: "", creator: "", origin: "all", placement: "all", withReplicaCode: false, withSps: false, pokemon: [] }

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
  team("MC555", { description: "Bo's Ladder Team", player: "Bo", handle: "bo_ladder", placement: "Peak 1st", members: [{ name: "Garchomp" }] }),
  submitted("CommRain01", { player: "Rain Fan", event: "  baltimore   REGIONAL 2027 ", members: [{ name: "Pelipper" }, { name: "Garchomp" }] })
]

function ids(filter: Partial<CommunityTeamFilter>): string[] {
  return filterCommunityTeams(TEAMS, { ...NO_FILTER, ...filter }).map(t => t.id)
}

describe("filterCommunityTeams", () => {
  it("should keep every team without filters", () => {
    expect(ids({})).toEqual(["MC558", "MC557", "MC556", "MC555", "CommRain01"])
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

  it("should keep only the teams of the chosen event, ignoring case and extra spaces", () => {
    expect(ids({ event: "Baltimore Regional 2027" })).toEqual(["MC557", "MC556", "CommRain01"])
  })

  it("should keep only the teams of the chosen origin", () => {
    expect(ids({ origin: "vgcpastes" })).toEqual(["MC558", "MC557", "MC556", "MC555"])
    expect(ids({ origin: "community" })).toEqual(["CommRain01"])
  })

  it("should find a submitted team without a Twitter handle by the name of the creator", () => {
    expect(ids({ creator: "rain" })).toEqual(["CommRain01"])
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
    expect(ids({ pokemon: ["Garchomp"] })).toEqual(["MC558", "MC556", "MC555", "CommRain01"])
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
  it("should list each event once in the order the teams have them, joining spellings that differ only in case and spaces", () => {
    expect(communityTeamEvents([...TEAMS, submitted("CommSun01", { event: " Sun Cup " })])).toEqual(["Recife Regional 2027", "Baltimore Regional 2027", "Sun Cup"])
  })
})

describe("mergeCommunityTeams", () => {
  it("should list the teams of the major events before the other teams, whatever their source", () => {
    const local = team("MC010", { event: "Alpensee Tour #75", date: "2026-10-12" })
    const worlds = submitted("CommWorld1", { event: "2027 World Championships", date: "2026-08-01T10:00:00.000Z" })
    const international = team("MC011", { event: "North America International Championships 2027", date: "2026-06-01" })
    const globalChallenge = team("MC012", { event: "2027 Global Challenge I", date: "2026-05-01" })
    const regionalChallenge = team("MC013", { event: "Baltimore Regional Challenge", date: "2026-04-01" })
    const noEvent = team("MC014", { date: "2026-10-12" })

    expect(mergeCommunityTeams([local, international, globalChallenge, regionalChallenge, noEvent], [worlds]).map(t => t.id)).toEqual(["CommWorld1", "MC011", "MC012", "MC013", "MC010", "MC014"])
  })

  it("should mix the sources of the same event by placement", () => {
    const vgcPastesChampion = team("MC020", { event: "Louisville Regional 2027", placement: "Champion", date: "2026-10-12" })
    const vgcPastesTwentyFourth = team("MC021", { event: "Louisville Regional 2027", placement: "24th", date: "2026-10-12" })
    const communityTwentyFirst = submitted("CommVR0021", { event: "Louisville Regional 2027", placement: "21st", date: "2026-10-13T10:00:00.000Z" })
    const olderEvent = team("MC022", { event: "2027 Global Challenge I", date: "2026-09-01" })

    expect(mergeCommunityTeams([olderEvent, vgcPastesTwentyFourth, vgcPastesChampion], [communityTwentyFirst]).map(t => t.id)).toEqual(["MC020", "CommVR0021", "MC021", "MC022"])
  })

  it("should list the VGCPastes team before the community team of the same event and placement", () => {
    const community = submitted("CommRain01", { event: "Louisville Regional 2027", placement: "Champion", date: "2026-10-13T10:00:00.000Z" })
    const vgcPastes = team("MC020", { event: "Louisville Regional 2027", placement: "Champion", date: "2026-10-12" })

    expect(mergeCommunityTeams([vgcPastes], [community]).map(t => t.id)).toEqual(["MC020", "CommRain01"])
  })

  it("should list the events from the newest, dated by their newest team", () => {
    const recife = team("MC030", { event: "Recife Regional 2027", date: "2026-09-20" })
    const baltimoreFirst = team("MC031", { event: "Baltimore Regional 2027", placement: "Champion", date: "2026-09-10" })
    const baltimoreLast = team("MC032", { event: "Baltimore Regional 2027", placement: "Top 8", date: "2026-09-30" })

    expect(mergeCommunityTeams([recife, baltimoreLast, baltimoreFirst], []).map(t => t.id)).toEqual(["MC031", "MC032", "MC030"])
  })

  it("should keep each event together when two events share the newest date", () => {
    const recife = team("MC040", { event: "Recife Regional 2027", placement: "Champion" })
    const baltimoreTop8 = team("MC041", { event: "Baltimore Regional 2027", placement: "Top 8" })
    const baltimoreChampion = team("MC042", { event: "Baltimore Regional 2027", placement: "Champion" })

    expect(mergeCommunityTeams([recife, baltimoreTop8, baltimoreChampion], []).map(t => t.id)).toEqual(["MC042", "MC041", "MC040"])
  })

  it("should list Masters, then Seniors, then Juniors within an event, each by placement", () => {
    const junior = submitted("CommJunior", { event: "Louisville Regional 2027 (Juniors)", placement: "Champion" })
    const seniorTop4 = submitted("CommSenio4", { event: "Louisville Regional 2027 (Seniors)", placement: "Top 4" })
    const seniorChampion = submitted("CommSenio1", { event: "Louisville Regional 2027", placement: "Champion (Seniors)" })
    const mastersTop8 = submitted("CommMaste8", { event: "Louisville Regional 2027", placement: "Top 8" })
    const mastersSecond = submitted("CommMaste2", { event: "louisville regional 2027", placement: "2nd" })
    const unplaced = submitted("CommNoRank", { event: "Louisville Regional 2027" })

    expect(mergeCommunityTeams([], [junior, seniorTop4, unplaced, seniorChampion, mastersTop8, mastersSecond]).map(t => t.id)).toEqual(["CommMaste2", "CommMaste8", "CommNoRank", "CommSenio1", "CommSenio4", "CommJunior"])
  })

  it("should list the teams of the same placement from the newest", () => {
    const older = submitted("CommOld001", { event: "Local Tour", placement: "Top 4", date: "2026-10-10T10:00:00.000Z" })
    const newer = submitted("CommNew001", { event: "Local Tour", placement: "Top 4", date: "2026-10-10T12:00:00.000Z" })
    const submittedTeams = [older, newer]

    expect(mergeCommunityTeams([], submittedTeams).map(t => t.id)).toEqual(["CommNew001", "CommOld001"])
    expect(submittedTeams).toEqual([older, newer])
  })
})

describe("isSubmittedTeam", () => {
  it("should tell the submitted teams from the VGCPastes teams", () => {
    expect(isSubmittedTeam(submitted("CommRain01"))).toBe(true)
    expect(isSubmittedTeam(team("MC558"))).toBe(false)
  })
})

describe("communityTeamPokemon", () => {
  it("should list the Pokémon of the teams from the most used to the least used", () => {
    expect(communityTeamPokemon(TEAMS)).toEqual(["Garchomp", "Incineroar", "Sneasler", "Charizard-Mega-Y", "Pelipper"])
  })

  it("should count a Pokémon once per team", () => {
    const teams = [team("A", { members: [{ name: "Sneasler" }, { name: "Sneasler" }] }), team("B", { members: [{ name: "Incineroar" }] }), team("C", { members: [{ name: "Incineroar" }] })]

    expect(communityTeamPokemon(teams)).toEqual(["Incineroar", "Sneasler"])
  })
})

describe("mostUsedTeams", () => {
  it("should keep the order of the uses, skip pastes of unknown teams and stop at the limit", () => {
    const teams = [team("MC558", { pasteId: "pasteMC558" }), team("MC557", { pasteId: "pasteMC557" }), submitted("CommRain01")]
    const uses = [
      { pasteId: "CommRain01", uses: 9 },
      { pasteId: "goneTeam01", uses: 7 },
      { pasteId: "pasteMC557", uses: 5 },
      { pasteId: "pasteMC558", uses: 2 }
    ]

    expect(mostUsedTeams(uses, teams, 2).map(t => t.id)).toEqual(["CommRain01", "MC557"])
  })
})

describe("matchesSearch", () => {
  const juanfi = TEAMS[0]
  const rain = submitted("CommRain01", { description: "Rain Archaludon", player: "Rain Fan", event: "Louisville Regional 2027" })

  it("should find a team by any part of its name, creator, handle or event, ignoring case and accents", () => {
    expect(matchesSearch(juanfi, "regional 2027 champ")).toBe(true)
    expect(matchesSearch(juanfi, "fiallos")).toBe(true)
    expect(matchesSearch(juanfi, "fi_vg")).toBe(true)
    expect(matchesSearch(juanfi, "RECIFE")).toBe(true)
    expect(matchesSearch(TEAMS[1], "hector")).toBe(true)
    expect(matchesSearch(rain, "ouisville")).toBe(true)
    expect(matchesSearch(TEAMS[3], "ladder")).toBe(true)
  })

  it("should not find a team when no field has the text", () => {
    expect(matchesSearch(juanfi, "sneasler")).toBe(false)
    expect(matchesSearch(rain, "juanfi")).toBe(false)
  })
})
