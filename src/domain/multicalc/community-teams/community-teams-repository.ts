import { CommunityTeamSets, CommunityTeamsRegulation, CommunityTeamSummary } from "@data/community-teams/community-team-data"
import { COMMUNITY_TEAM_REGULATIONS } from "@data/community-teams/community-teams-index"

export class CommunityTeamsRepository {
  constructor(private readonly regulations: CommunityTeamsRegulation[] = COMMUNITY_TEAM_REGULATIONS) {}

  regulationIds(): string[] {
    return this.regulations.map(regulation => regulation.id)
  }

  teams(regulation: string): Promise<CommunityTeamSummary[]> {
    return this.regulation(regulation).teams()
  }

  private regulation(id: string): CommunityTeamsRegulation {
    const regulation = this.regulations.find(regulation => regulation.id === id)

    if (!regulation) throw new Error(`Unknown regulation: ${id}`)

    return regulation
  }

  async sets(regulation: string, teams: CommunityTeamSummary[]): Promise<CommunityTeamSets> {
    const { setsBlocks } = this.regulation(regulation)
    const blocks = [...new Set(teams.map(team => team.setsBlock))]
    const loaded: CommunityTeamSets = Object.assign({}, ...(await Promise.all(blocks.map(block => setsBlocks[block]()))))

    return Object.fromEntries(teams.map(team => [team.id, loaded[team.id]]))
  }
}
