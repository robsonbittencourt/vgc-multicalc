import { Component, signal } from "@angular/core"
import { CopyButtonComponent } from "@shared/copy-button/copy-button.component"

type MockPokemon = {
  name: string
  sprite: string
  item: string
  itemSprite: string
  ability: string
  nature: string
  moves: string[]
  evs: string
}

type MockTeam = {
  id: string
  description: string
  author: string
  handle: string
  event: string
  rank: string
  date: string
  pokepaste: string
  vrpaste: string
  replicaCode: string
  pokemons: MockPokemon[]
}

const MOCK_MOVES = [
  ["Dragon Dance", "Tera Blast", "Extreme Speed", "Protect"],
  ["Moonblast", "Dazzling Gleam", "Tailwind", "Protect"],
  ["Wave Crash", "Last Respects", "Aqua Jet", "Protect"],
  ["Close Combat", "Dire Claw", "Fake Out", "Protect"],
  ["Sucker Punch", "Kowtow Cleave", "Swords Dance", "Protect"],
  ["Earthquake", "Scale Shot", "Stealth Rock", "Protect"]
]

const MOCK_EVS = ["252 Atk / 4 Def / 252 Spe", "252 HP / 156 Def / 100 SpD", "252 SpA / 4 SpD / 252 Spe", "244 HP / 12 Atk / 252 Spe", "252 Atk / 252 HP / 4 SpD", "148 HP / 108 Atk / 252 Spe"]

const MOCK_ABILITIES = ["Multiscale", "Flower Veil", "Adaptability", "Poison Touch", "Supreme Overlord", "Rough Skin"]

const MOCK_NATURES = ["Adamant", "Timid", "Modest", "Jolly", "Careful", "Impish"]

function buildTeam(id: string, description: string, author: string, handle: string, rank: string, event: string, date: string, replicaCode: string, mons: [string, string, string][]): MockTeam {
  return {
    id,
    description,
    author,
    handle,
    event,
    rank,
    date,
    pokepaste: `https://pokepast.es/${id.toLowerCase()}`,
    vrpaste: `https://victoryroad.pro/paste/${id.toLowerCase()}`,
    replicaCode,
    pokemons: mons.map(([name, sprite, item], index) => ({
      name,
      sprite,
      item,
      itemSprite: item.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ability: MOCK_ABILITIES[index],
      nature: MOCK_NATURES[index],
      moves: MOCK_MOVES[index],
      evs: MOCK_EVS[index]
    }))
  }
}

@Component({
  selector: "app-community-teams",
  imports: [CopyButtonComponent],
  templateUrl: "./community-teams.component.html",
  styleUrl: "./community-teams.component.scss"
})
export class CommunityTeamsComponent {
  readonly totalTeams = 861

  readonly regulations = [
    { id: "MB", label: "Regulation M-B (current)" },
    { id: "MA", label: "Regulation M-A" },
    { id: "M", label: "Regulation M" },
    { id: "all", label: "All regulations" }
  ]

  readonly popularPokemon = [
    { name: "Basculegion", uses: 292 },
    { name: "Incineroar", uses: 251 },
    { name: "Whimsicott", uses: 156 },
    { name: "Sneasler", uses: 147 },
    { name: "Floette-Mega", uses: 145 },
    { name: "Charizard", uses: 128 },
    { name: "Staraptor-Mega", uses: 125 },
    { name: "Pelipper", uses: 113 },
    { name: "Kingambit", uses: 56 },
    { name: "Garchomp", uses: 52 }
  ]

  readonly teams: MockTeam[] = [
    buildTeam("MB861", "Takuma Yamazaki's Worlds 2026 Champion Team", "Takuma Yamazaki", "natsumewato", "Champion", "Worlds 2026 San Francisco", "31 Aug 2026", "A4RBRNN9YE", [
      ["Dragonite-Mega", "Dragonite-Mega", "Dragoninite"],
      ["Floette-Eternal-Mega", "Floette-Mega", "Floettite"],
      ["Basculegion", "Basculegion", "Life Orb"],
      ["Sneasler", "Sneasler", "Focus Sash"],
      ["Kingambit", "Kingambit", "Chople Berry"],
      ["Garchomp", "Garchomp", "Choice Scarf"]
    ]),
    buildTeam("MB860", "cona's Worlds 2026 Runner Up Team", "Hiroshi Onishi", "cona_5757", "Runner Up", "Worlds 2026 San Francisco", "31 Aug 2026", "MFAK51W5U1", [
      ["Charizard-Mega-Y", "Charizard-Mega-Y", "Charizardite Y"],
      ["Floette-Eternal-Mega", "Floette-Mega", "Floettite"],
      ["Basculegion", "Basculegion", "Life Orb"],
      ["Whimsicott", "Whimsicott", "Focus Sash"],
      ["Kingambit", "Kingambit", "Occa Berry"],
      ["Garchomp", "Garchomp", "Sitrus Berry"]
    ]),
    buildTeam("MB859", "WhimVGC's Worlds 2026 Top 4 Team", "Zachary Weed", "WhimsicottVG", "3rd", "Worlds 2026 San Francisco", "31 Aug 2026", "", [
      ["Froslass-Mega", "Froslass-Mega", "Froslassite"],
      ["Scovillain-Mega", "Scovillain-Mega", "Scovillainite"],
      ["Basculegion", "Basculegion", "Life Orb"],
      ["Lycanroc-Dusk", "Lycanroc-Dusk", "Focus Sash"],
      ["Sneasler", "Sneasler", "White Herb"],
      ["Kingambit", "Kingambit", "Black Glasses"]
    ]),
    buildTeam("MB857", "Rahxen's Worlds 2026 Top 8 Team", "Antonio Sánchez", "Rahxen_", "5th", "Worlds 2026 San Francisco", "31 Aug 2026", "8KJ2WQ4RTX", [
      ["Charizard-Mega-Y", "Charizard-Mega-Y", "Charizardite Y"],
      ["Incineroar", "Incineroar", "Sitrus Berry"],
      ["Toxapex", "Toxapex", "Leftovers"],
      ["Venusaur", "Venusaur", "Focus Sash"],
      ["Sylveon", "Sylveon", "Fairy Feather"],
      ["Garchomp", "Garchomp", "Choice Scarf"]
    ])
  ]

  readonly selectedTeamId = signal(this.teams[0].id)

  selectTeam(id: string) {
    this.selectedTeamId.set(id)
  }
}
