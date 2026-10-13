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

  it.each(COMMUNITY_TEAM_REGULATIONS.map(regulation => [regulation.id, regulation]))("should have %s teams in blocks of up to 20", async (_id, regulation) => {
    const teams = await regulation.teams()
    const blocks = await Promise.all(regulation.setsBlocks.map(load => load()))

    expect(teams.length).toBeGreaterThan(0)
    expect(blocks.every(block => Object.keys(block).length > 0 && Object.keys(block).length <= 20)).toBe(true)
  })

  it("should list the newest regulation first", () => {
    const ids = COMMUNITY_TEAM_REGULATIONS.map(regulation => regulation.id)

    expect(ids).toEqual([...ids].sort().reverse())
  })
})
