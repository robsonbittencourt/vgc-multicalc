import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

let chiyuData: string
let pokepasteData: string
let pokepasteDataVivillon: string

before(() => {
  cy.fixture("chi-yu-data").then((data) => { chiyuData = data })
  cy.fixture("pokepaste-data").then((data) => { pokepasteData = data })
  cy.fixture("pokepaste-data-vivillon").then((data) => { pokepasteDataVivillon = data })
})

describe('Import Pokémon', () => {
  it('to team', () => {
    const team = new Team()

    team.importPokemon(chiyuData)
    
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Dark Pulse", "Snarl", "Heat Wave")
    team.pokemonOnEditEvsIs(44, 252, 12, 32, 124, 40)
    team.pokemonOnEditIvsIs(31, 30, 29, 28, 27, 0)
  })

  it('to opponent', () => {
    const team = new Team()
    const opponent = new Opponent()

    opponent.importPokemon(chiyuData)
    
    opponent.selectPokemon("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Dark Pulse", "Snarl", "Heat Wave")
    team.pokemonOnEditEvsIs(44, 252, 12, 32, 124, 40)
    team.pokemonOnEditIvsIs(31, 30, 29, 28, 27, 0)
  })
})

describe('Import Pokepaste', () => {
  it('to team', () => {
    const team = new Team()

    team.importPokepaste(pokepasteData)
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Tatsugiri", "Commander", "Grass", "Toxic Orb", "Modest")
    team.pokemonOnEditAttacksIs("Endure", "Muddy Water", "Taunt", "Draco Meteor")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Dondozo")
    team.pokemonOnEditIs("Dondozo", "Unaware", "Grass", "Sitrus Berry", "Adamant")
    team.pokemonOnEditAttacksIs("Protect", "Substitute", "Wave Crash", "Order Up")
    team.pokemonOnEditEvsIs(12, 156, 60, 0, 116, 164)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Smeargle")
    team.pokemonOnEditIs("Smeargle", "Moody", "Ghost", "Focus Sash", "Jolly")
    team.pokemonOnEditAttacksIs("Wide Guard", "Follow Me", "Spore", "Fake Out")
    team.pokemonOnEditEvsIs(252, 0, 4, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Flutter Mane")
    team.pokemonOnEditIs("Flutter Mane", "Protosynthesis", "Fairy", "Booster Energy", "Modest")
    team.pokemonOnEditAttacksIs("Moonblast", "Dazzling Gleam", "Icy Wind", "Protect")
    team.pokemonOnEditEvsIs(116, 0, 116, 68, 4, 204)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Dark Pulse", "Snarl", "Heat Wave")
    team.pokemonOnEditEvsIs(132, 0, 252, 0, 0, 124)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Whimsicott")
    team.pokemonOnEditIs("Whimsicott", "Prankster", "Steel", "Covert Cloak", "Bold")
    team.pokemonOnEditAttacksIs("Beat Up", "Tailwind", "Fake Tears", "Moonblast")
    team.pokemonOnEditEvsIs(252, 0, 180, 0, 76, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it('with Vivillon', () => {
    const team = new Team()

    team.importPokepaste(pokepasteDataVivillon)
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Sleep Powder", "Hurricane", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)
    
    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Sleep Powder", "Hurricane", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Sleep Powder", "Hurricane", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Sleep Powder", "Hurricane", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Sleep Powder", "Hurricane", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Sleep Powder", "Hurricane", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)    
  })

  it('to opponent', () => {
    const team = new Team()
    const opponent = new Opponent()

    opponent.importPokemon(pokepasteData)

    opponent.selectPokemon("Tatsugiri")
    team.pokemonOnEditIs("Tatsugiri", "Commander", "Grass", "Toxic Orb", "Modest")
    team.pokemonOnEditAttacksIs("Endure", "Muddy Water", "Taunt", "Draco Meteor")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    opponent.selectPokemon("Dondozo")
    team.pokemonOnEditIs("Dondozo", "Unaware", "Grass", "Sitrus Berry", "Adamant")
    team.pokemonOnEditAttacksIs("Protect", "Substitute", "Wave Crash", "Order Up")
    team.pokemonOnEditEvsIs(12, 156, 60, 0, 116, 164)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    opponent.selectPokemon("Smeargle")
    team.pokemonOnEditIs("Smeargle", "Moody", "Ghost", "Focus Sash", "Jolly")
    team.pokemonOnEditAttacksIs("Wide Guard", "Follow Me", "Spore", "Fake Out")
    team.pokemonOnEditEvsIs(252, 0, 4, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    opponent.selectPokemon("Flutter Mane")
    team.pokemonOnEditIs("Flutter Mane", "Protosynthesis", "Fairy", "Booster Energy", "Modest")
    team.pokemonOnEditAttacksIs("Moonblast", "Dazzling Gleam", "Icy Wind", "Protect")
    team.pokemonOnEditEvsIs(116, 0, 116, 68, 4, 204)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    opponent.selectPokemon("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Dark Pulse", "Snarl", "Heat Wave")
    team.pokemonOnEditEvsIs(132, 0, 252, 0, 0, 124)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    opponent.selectPokemon("Whimsicott")
    team.pokemonOnEditIs("Whimsicott", "Prankster", "Steel", "Covert Cloak", "Bold")
    team.pokemonOnEditAttacksIs("Beat Up", "Tailwind", "Fake Tears", "Moonblast")
    team.pokemonOnEditEvsIs(252, 0, 180, 0, 76, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it('when have a new Pokémon on edit', () => {
    const team = new Team()
    const opponent = new Opponent()

    opponent.clickOnAdd()
    opponent.importPokemon(pokepasteData)

    team.pokemonOnEditNameIs("Miraidon")
    opponent.addIsVisible()
  })
})