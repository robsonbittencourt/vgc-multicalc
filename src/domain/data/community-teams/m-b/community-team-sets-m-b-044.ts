import { CommunityTeamSets } from "@data/community-teams/community-team-data"

export const COMMUNITY_TEAM_SETS: CommunityTeamSets = {
  MB1: [
    {
      ability: "Intimidate",
      nature: "Jolly",
      sps: {
        hp: 32,
        atk: 4,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 30
      },
      moves: ["Brave Bird", "Close Combat", "Tailwind", "Protect"]
    },
    {
      ability: "Sand Stream",
      nature: "Adamant",
      sps: {
        hp: 27,
        atk: 26,
        def: 1,
        spa: 0,
        spd: 0,
        spe: 12
      },
      moves: ["Rock Slide", "Knock Off", "Low Kick", "Protect"]
    },
    {
      ability: "Adaptability",
      nature: "Adamant",
      sps: {
        hp: 1,
        atk: 18,
        def: 14,
        spa: 0,
        spd: 1,
        spe: 32
      },
      moves: ["Wave Crash", "Last Respects", "Flip Turn", "Aqua Jet"]
    },
    {
      ability: "Lightning Rod",
      nature: "Timid",
      sps: {
        hp: 17,
        atk: 0,
        def: 17,
        spa: 0,
        spd: 0,
        spe: 32
      },
      moves: ["Fake Out", "Encore", "Charm", "Volt Switch"]
    },
    {
      ability: "Sand Rush",
      nature: "Adamant",
      sps: {
        hp: 1,
        atk: 32,
        def: 1,
        spa: 0,
        spd: 0,
        spe: 32
      },
      moves: ["Earthquake", "Iron Head", "Rock Slide", "Protect"]
    },
    {
      ability: "Hospitality",
      nature: "Calm",
      sps: {
        hp: 32,
        atk: 0,
        def: 4,
        spa: 0,
        spd: 30,
        spe: 0
      },
      moves: ["Matcha Gotcha", "Rage Powder", "Life Dew", "Trick Room"]
    }
  ]
}
