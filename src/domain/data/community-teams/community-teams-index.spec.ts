import { COMMUNITY_TEAM_REGULATIONS } from "@data/community-teams/community-teams-index"

describe("community teams data", () => {
  it.each(COMMUNITY_TEAM_REGULATIONS.map(regulation => [regulation.id, regulation]))("should give every %s team a unique id", async (_id, regulation) => {
    const teams = await regulation.teams()

    expect(new Set(teams.map(team => team.id)).size).toBe(teams.length)
  })

  it.each(COMMUNITY_TEAM_REGULATIONS.map(regulation => [regulation.id, regulation]))("should keep the sets of every %s team in the block its summary points to", async (_id, regulation) => {
    const teams = await regulation.teams()
    const blocks = await Promise.all(regulation.setsBlocks.map(load => load()))

    const misplaced = teams.filter(team => blocks[team.setsBlock]?.[team.id]?.length !== team.members.length)

    expect(misplaced.map(team => team.id)).toEqual([])
    expect(blocks.reduce((sum, block) => sum + Object.keys(block).length, 0)).toBe(teams.length)
  })

  it.each([
    ["M-C", 558, 28],
    ["M-B", 861, 44],
    ["M-A", 1104, 56]
  ])("should have every %s team of the VGCPastes sheet", async (id, total, blocks) => {
    const regulation = COMMUNITY_TEAM_REGULATIONS.find(regulation => regulation.id === id)!

    const teams = await regulation.teams()

    expect(teams.length).toBe(total)
    expect(regulation.setsBlocks.length).toBe(blocks)
  })

  it("should list the newest regulation first", () => {
    expect(COMMUNITY_TEAM_REGULATIONS.map(regulation => regulation.id)).toEqual(["M-C", "M-B", "M-A"])
  })
})
