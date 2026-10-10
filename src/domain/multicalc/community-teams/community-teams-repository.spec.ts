import { CommunityTeamSet, CommunityTeamSets, CommunityTeamsRegulation, CommunityTeamSummary } from "@data/community-teams/community-team-data"
import { CommunityTeamsRepository } from "@multicalc/community-teams"

const INCINEROAR_SET: CommunityTeamSet = { ability: "Intimidate", nature: "Careful", moves: ["Fake Out", "Knock Off", "Parting Shot", "Protect"] }

function team(id: string, setsBlock: number): CommunityTeamSummary {
  return { id, description: `${id} Team`, player: id, handle: id, regulation: "M-B", date: "2026-08-31", pasteId: "paste", hasSps: true, setsBlock, members: [{ name: "Incineroar" }] }
}

function fakeRegulation() {
  const teams = [team("A", 0), team("B", 0), team("C", 1), team("D", 2)]
  const blocks: CommunityTeamSets[] = [{ A: [INCINEROAR_SET], B: [INCINEROAR_SET] }, { C: [INCINEROAR_SET] }, { D: [INCINEROAR_SET] }]
  const setsBlocks = blocks.map(block => vi.fn(() => Promise.resolve(block)))
  const regulation: CommunityTeamsRegulation = { id: "M-B", teams: vi.fn(() => Promise.resolve(teams)), setsBlocks }

  return { teams, setsBlocks, repository: new CommunityTeamsRepository([regulation]) }
}

describe("CommunityTeamsRepository", () => {
  it("should read the bundled teams by default", async () => {
    const repository = new CommunityTeamsRepository()

    const teams = await repository.teams("M-B")

    expect(repository.regulationIds()).toEqual(["M-C", "M-B", "M-A"])
    expect(teams.length).toBe(861)
    expect(teams.map(t => t.id).slice(0, 3)).toEqual(["MB861", "MB860", "MB859"])
  })

  it("should list the regulations it has teams for", () => {
    const { repository } = fakeRegulation()

    expect(repository.regulationIds()).toEqual(["M-B"])
  })

  it("should return every team of the regulation", async () => {
    const { repository } = fakeRegulation()

    const teams = await repository.teams("M-B")

    expect(teams.map(t => t.id)).toEqual(["A", "B", "C", "D"])
  })

  it("should reject a regulation it has no teams for", () => {
    const { repository } = fakeRegulation()

    expect(() => repository.teams("M-A")).toThrowError("Unknown regulation: M-A")
  })

  describe("sets", () => {
    it("should load each sets block the teams need only once", async () => {
      const { teams, setsBlocks, repository } = fakeRegulation()

      const sets = await repository.sets("M-B", [teams[0], teams[1], teams[2]])

      expect(Object.keys(sets)).toEqual(["A", "B", "C"])
      expect(sets["C"]).toEqual([INCINEROAR_SET])
      expect(setsBlocks.map(block => block.mock.calls.length)).toEqual([1, 1, 0])
    })

    it("should return only the sets of the requested teams", async () => {
      const { teams, setsBlocks, repository } = fakeRegulation()

      const sets = await repository.sets("M-B", [teams[1]])

      expect(Object.keys(sets)).toEqual(["B"])
      expect(setsBlocks.map(block => block.mock.calls.length)).toEqual([1, 0, 0])
    })

    it("should load nothing when no teams are requested", async () => {
      const { setsBlocks, repository } = fakeRegulation()

      const sets = await repository.sets("M-B", [])

      expect(sets).toEqual({})
      expect(setsBlocks.map(block => block.mock.calls.length)).toEqual([0, 0, 0])
    })
  })
})
