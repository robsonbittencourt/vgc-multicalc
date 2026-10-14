import { CommunityTeamListState, communityTeamListParams, communityTeamListState } from "@multicalc/community-teams"

const REGULATIONS = ["M-C", "M-B", "M-A"]

function state(overrides: Partial<CommunityTeamListState> = {}): CommunityTeamListState {
  return {
    regulation: "M-C",
    team: "",
    creator: "",
    search: "",
    origin: "all",
    event: "",
    placement: "all",
    withReplicaCode: false,
    withSps: false,
    pokemon: [""],
    ...overrides
  }
}

describe("communityTeamListParams", () => {
  it("should leave every param out when the list shows everything of the current regulation", () => {
    expect(communityTeamListParams(state(), "M-C")).toEqual({ reg: null, team: null, creator: null, q: null, source: null, event: null, placement: null, replica: null, sps: null, pokemon: null })
  })

  it("should write every active filter", () => {
    const filtered = state({
      regulation: "M-B",
      team: " Rain ",
      creator: "JoeUX9",
      search: "louisville",
      origin: "community",
      event: "Louisville Regional 2027",
      placement: "top8",
      withReplicaCode: true,
      withSps: true,
      pokemon: ["Garchomp", "", "Incineroar"]
    })

    expect(communityTeamListParams(filtered, "M-C")).toEqual({
      reg: "M-B",
      team: "Rain",
      creator: "JoeUX9",
      q: "louisville",
      source: "community",
      event: "Louisville Regional 2027",
      placement: "top8",
      replica: "1",
      sps: "1",
      pokemon: "Garchomp,Incineroar"
    })
  })
})

describe("communityTeamListState", () => {
  it("should start from the current regulation without filters when the link has no params", () => {
    expect(communityTeamListState({}, REGULATIONS)).toEqual(state())
  })

  it("should read every filter of the link", () => {
    const params = {
      reg: "M-A",
      team: "Rain",
      creator: "JoeUX9",
      q: "louisville",
      source: "vgcpastes",
      event: "Louisville Regional 2027",
      placement: "winners",
      replica: "1",
      sps: "1",
      pokemon: "Garchomp, Incineroar,"
    }

    expect(communityTeamListState(params, REGULATIONS)).toEqual(
      state({
        regulation: "M-A",
        team: "Rain",
        creator: "JoeUX9",
        search: "louisville",
        origin: "vgcpastes",
        event: "Louisville Regional 2027",
        placement: "winners",
        withReplicaCode: true,
        withSps: true,
        pokemon: ["Garchomp", "Incineroar"]
      })
    )
  })

  it("should ignore the values the list does not know", () => {
    const params = { reg: "Z-Z", source: "smogon", placement: "top4", replica: "yes", sps: "true" }

    expect(communityTeamListState(params, REGULATIONS)).toEqual(state())
  })

  it("should keep up to six Pokémon", () => {
    const params = { pokemon: "Garchomp,Incineroar,Sneasler,Pelipper,Archaludon,Basculegion,Kingambit" }

    expect(communityTeamListState(params, REGULATIONS).pokemon).toEqual(["Garchomp", "Incineroar", "Sneasler", "Pelipper", "Archaludon", "Basculegion"])
  })
})
