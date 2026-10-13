import { CommunityTeamsRegulation } from "@data/community-teams/community-team-data"

export const COMMUNITY_TEAM_REGULATIONS: CommunityTeamsRegulation[] = [
  {
    id: "M-C",
    teams: () => import("@data/community-teams/m-c/community-teams-m-c").then(m => m.COMMUNITY_TEAMS),
    setsBlocks: [() => import("@data/community-teams/m-c/community-team-sets-m-c-001").then(m => m.COMMUNITY_TEAM_SETS)]
  }
]
