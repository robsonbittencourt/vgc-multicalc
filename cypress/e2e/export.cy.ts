import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

let chiyuData: string
let pokepasteData: string
let defaultTeamData: string
let defaultOpponentsData: string

before(() => {
  cy.fixture("chi-yu-data").then(data => {
    chiyuData = data
  })
  cy.fixture("pokepaste-data").then(data => {
    pokepasteData = data
  })
  cy.fixture("default-team-data").then(data => {
    defaultTeamData = data
  })
  cy.fixture("default-opponents-data").then(data => {
    defaultOpponentsData = data
  })
})

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  opponents.deleteAll()
  opponents.importPokemon(defaultOpponentsData)
})

describe("Export", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })
  })

  it("Pokémon from team", () => {
    team.importPokemon(chiyuData)

    const exportModal = team.exportPokemon("Chi-Yu")

    exportModal.contentIs(exportedPokemon)
  })

  it("team", () => {
    team.importPokepaste(pokepasteData)

    const exportModal = team.export("Team 2")

    exportModal.contentIs(exportedTeam)
  })

  it("opponent Pokémon", () => {
    team.delete("Team 1")
    team.importPokepaste(defaultTeamData)

    const exportModal = opponents.export()

    exportModal.contentIs(exportedOpponentPokemon)
  })
})

const exportedPokemon = `Chi-Yu @ Choice Specs
Ability: Beads of Ruin
Level: 50
Tera Type: Water
EVs: 44 HP / 252 Atk / 12 Def / 32 SpA / 124 SpD / 40 Spe
Timid Nature
IVs: 30 Atk / 29 Def / 28 SpA / 27 SpD / 0 Spe
- Overheat
- Heat Wave
- Dark Pulse
- Snarl`

const exportedTeam = `Tatsugiri @ Toxic Orb
Ability: Commander
Level: 50
Tera Type: Grass
EVs: 252 SpA / 4 SpD / 252 Spe
Modest Nature
IVs: 0 Atk
- Draco Meteor
- Muddy Water
- Endure
- Taunt

Dondozo @ Sitrus Berry
Ability: Unaware
Level: 50
Tera Type: Grass
EVs: 12 HP / 156 Atk / 60 Def / 116 SpD / 164 Spe
Adamant Nature
- Wave Crash
- Order Up
- Protect
- Substitute

Smeargle @ Focus Sash
Ability: Moody
Level: 50
Tera Type: Ghost
EVs: 252 HP / 4 Def / 252 Spe
Jolly Nature
- Fake Out
- Wide Guard
- Follow Me
- Spore

Chi-Yu @ Choice Specs
Ability: Beads of Ruin
Level: 50
Tera Type: Water
EVs: 132 HP / 252 Def / 124 Spe
Timid Nature
IVs: 0 Atk
- Overheat
- Heat Wave
- Dark Pulse
- Snarl

Whimsicott @ Covert Cloak
Ability: Prankster
Level: 50
Tera Type: Steel
EVs: 252 HP / 180 Def / 76 SpD
Bold Nature
- Moonblast
- Beat Up
- Tailwind
- Fake Tears

Flutter Mane @ Booster Energy
Ability: Protosynthesis
Level: 50
Tera Type: Fairy
EVs: 116 HP / 116 Def / 68 SpA / 4 SpD / 204 Spe
Modest Nature
IVs: 0 Atk
- Moonblast
- Dazzling Gleam
- Icy Wind
- Protect`

const exportedOpponentPokemon = `Urshifu-Rapid-Strike @ Choice Scarf
Ability: Unseen Fist
Level: 50
Tera Type: Water
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Close Combat
- Ice Spinner
- U-turn
- Surging Strikes

Calyrex-Shadow @ Focus Sash
Ability: As One (Spectrier)
Level: 50
Tera Type: Fighting
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
- Astral Barrage
- Expanding Force
- Tera Blast
- Protect

Ogerpon-Wellspring @ Wellspring Mask
Ability: Water Absorb
Level: 50
Tera Type: Water
EVs: 252 HP / 76 Atk / 148 Def / 28 SpD / 4 Spe
Adamant Nature
- Ivy Cudgel
- Horn Leech
- Spiky Shield
- Follow Me

Amoonguss @ Rocky Helmet
Ability: Regenerator
Level: 50
Tera Type: Water
EVs: 236 HP / 236 Def / 36 SpD
Relaxed Nature
- Pollen Puff
- Spore
- Rage Powder
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
Tera Type: Grass
EVs: 244 HP / 12 Atk / 76 Def / 100 SpD / 76 Spe
Impish Nature
- Knock Off
- Fake Out
- Parting Shot
- Will-O-Wisp

Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
Tera Type: Water
EVs: 172 HP / 252 Atk / 4 Def / 4 SpD / 76 Spe
Adamant Nature
- Wood Hammer
- U-turn
- Grassy Glide
- Fake Out

Calyrex-Ice @ Clear Amulet
Ability: As One (Glastrier)
Level: 50
Tera Type: Fire
EVs: 252 HP / 252 Atk / 4 SpD
Brave Nature
- Glacial Lance
- High Horsepower
- Protect
- Trick Room

Terapagos-Terastal @ Leftovers
Ability: Tera Shell
Level: 50
Tera Type: Stellar
EVs: 252 HP / 180 Def / 76 SpA
Modest Nature
- Tera Starstorm
- Earth Power
- Calm Mind
- Protect

Zamazenta-Crowned @ Rusted Shield
Ability: Dauntless Shield
Level: 50
Tera Type: Water
EVs: 196 HP / 156 Def / 156 Spe
Impish Nature
- Body Press
- Heavy Slam
- Substitute
- Protect

Raging Bolt @ Booster Energy
Ability: Protosynthesis
Level: 50
Tera Type: Fairy
EVs: 244 HP / 252 SpA / 12 SpD
Modest Nature
- Dragon Pulse
- Thunderclap
- Calm Mind
- Protect`
