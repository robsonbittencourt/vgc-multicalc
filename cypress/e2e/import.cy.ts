import { poke } from "@cy-support/e2e"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponent = new Opponent()

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })
})

describe("Import Pokémon", () => {
  it("to team", () => {
    team.importPokemon(poke["chi-yu"])

    team.selectPokemon("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Heat Wave", "Dark Pulse", "Snarl")
    team.pokemonOnEditEvsIs(44, 252, 12, 32, 124, 40)
    team.pokemonOnEditIvsIs(31, 30, 29, 28, 27, 0)
  })

  it("to opponent", () => {
    opponent.importPokemon(poke["chi-yu"])

    opponent.selectDefender("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Heat Wave", "Dark Pulse", "Snarl")
    team.pokemonOnEditEvsIs(44, 252, 12, 32, 124, 40)
    team.pokemonOnEditIvsIs(31, 30, 29, 28, 27, 0)
  })
})

describe("Import Pokepaste", () => {
  it("to team", () => {
    const team = new Team()

    team.importPokepaste(poke["pokepaste"])
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Tatsugiri", "Commander", "Grass", "Toxic Orb", "Modest")
    team.pokemonOnEditAttacksIs("Draco Meteor", "Muddy Water", "Endure", "Taunt")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Dondozo")
    team.pokemonOnEditIs("Dondozo", "Unaware", "Grass", "Sitrus Berry", "Adamant")
    team.pokemonOnEditAttacksIs("Wave Crash", "Order Up", "Protect", "Substitute")
    team.pokemonOnEditEvsIs(12, 156, 60, 0, 116, 164)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Smeargle")
    team.pokemonOnEditIs("Smeargle", "Moody", "Ghost", "Focus Sash", "Jolly")
    team.pokemonOnEditAttacksIs("Fake Out", "Wide Guard", "Follow Me", "Spore")
    team.pokemonOnEditEvsIs(252, 0, 4, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Heat Wave", "Dark Pulse", "Snarl")
    team.pokemonOnEditEvsIs(132, 0, 252, 0, 0, 124)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Whimsicott")
    team.pokemonOnEditIs("Whimsicott", "Prankster", "Steel", "Covert Cloak", "Bold")
    team.pokemonOnEditAttacksIs("Moonblast", "Beat Up", "Tailwind", "Fake Tears")
    team.pokemonOnEditEvsIs(252, 0, 180, 0, 76, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Flutter Mane")
    team.pokemonOnEditIs("Flutter Mane", "Protosynthesis", "Fairy", "Booster Energy", "Modest")
    team.pokemonOnEditAttacksIs("Moonblast", "Dazzling Gleam", "Icy Wind", "Protect")
    team.pokemonOnEditEvsIs(116, 0, 116, 68, 4, 204)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)
  })

  it("with Vivillon, Alcremie, Squawkabilly, Dudunsparce, Maushold and Pikachu in normal form", () => {
    team.importPokepaste(poke["pokepaste-forms-1"])
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Hurricane", "Sleep Powder", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Alcremie")
    team.pokemonOnEditIs("Alcremie", "Aroma Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Draining Kiss", "Calm Mind", "Encore")
    team.pokemonOnEditEvsIs(252, 0, 4, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Squawkabilly")
    team.pokemonOnEditIs("Squawkabilly", "Intimidate", "Normal", "Leftovers", "Adamant")
    team.pokemonOnEditAttacksIs("Brave Bird", "Double-Edge", "Air Slash", "Dual Wingbeat")
    team.pokemonOnEditEvsIs(4, 252, 0, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Dudunsparce")
    team.pokemonOnEditIs("Dudunsparce", "Serene Grace", "Normal", "Leftovers", "Careful")
    team.pokemonOnEditAttacksIs("Body Slam", "Dragon Tail", "Roost", "Coil")
    team.pokemonOnEditEvsIs(252, 0, 4, 0, 252, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Maushold")
    team.pokemonOnEditIs("Maushold", "Friend Guard", "Normal", "Wide Lens", "Adamant")
    team.pokemonOnEditAttacksIs("Crunch", "Chilling Water", "Agility", "Baton Pass")
    team.pokemonOnEditEvsIs(0, 252, 0, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Pikachu")
    team.pokemonOnEditIs("Pikachu", "Static", "Electric", "Light Ball", "Modest")
    team.pokemonOnEditAttacksIs("Thunderbolt", "Volt Switch", "Agility", "Thunder Wave")
    team.pokemonOnEditEvsIs(0, 0, 4, 252, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it("with Vivillon, Alcremie, Squawkabilly, Dudunsparce, Maushold and Pikachu in alternative form", () => {
    team.importPokepaste(poke["pokepaste-forms-2"])
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Vivillon", "Compound Eyes", "Ghost", "Focus Sash", "Timid")
    team.pokemonOnEditAttacksIs("Hurricane", "Sleep Powder", "Rage Powder", "Tailwind")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Alcremie")
    team.pokemonOnEditIs("Alcremie", "Aroma Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Draining Kiss", "Calm Mind", "Encore")
    team.pokemonOnEditEvsIs(252, 0, 4, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Squawkabilly")
    team.pokemonOnEditIs("Squawkabilly", "Intimidate", "Normal", "Leftovers", "Adamant")
    team.pokemonOnEditAttacksIs("Brave Bird", "Double-Edge", "Air Slash", "Dual Wingbeat")
    team.pokemonOnEditEvsIs(4, 252, 0, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Dudunsparce")
    team.pokemonOnEditIs("Dudunsparce", "Serene Grace", "Normal", "Leftovers", "Careful")
    team.pokemonOnEditAttacksIs("Body Slam", "Dragon Tail", "Roost", "Coil")
    team.pokemonOnEditEvsIs(252, 0, 4, 0, 252, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Maushold")
    team.pokemonOnEditIs("Maushold", "Friend Guard", "Normal", "Wide Lens", "Adamant")
    team.pokemonOnEditAttacksIs("Crunch", "Chilling Water", "Agility", "Baton Pass")
    team.pokemonOnEditEvsIs(0, 252, 0, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Pikachu")
    team.pokemonOnEditIs("Pikachu", "Static", "Electric", "Light Ball", "Modest")
    team.pokemonOnEditAttacksIs("Thunderbolt", "Volt Switch", "Agility", "Thunder Wave")
    team.pokemonOnEditEvsIs(0, 0, 4, 252, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it("with Flabébé, Floette, Florges, Gastrodon and Tatsugiri in normal form", () => {
    team.importPokepaste(poke["pokepaste-forms-3"])
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Flabébé", "Flower Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Chilling Water", "Baton Pass", "Calm Mind")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Floette")
    team.pokemonOnEditIs("Floette", "Flower Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Chilling Water", "Baton Pass", "Calm Mind")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Florges")
    team.pokemonOnEditIs("Florges", "Flower Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Chilling Water", "Baton Pass", "Calm Mind")
    team.pokemonOnEditEvsIs(252, 4, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Gastrodon")
    team.pokemonOnEditIs("Gastrodon", "Storm Drain", "Grass", "Leftovers", "Relaxed")
    team.pokemonOnEditAttacksIs("Muddy Water", "Earth Power", "Icy Wind", "Protect")
    team.pokemonOnEditEvsIs(252, 0, 180, 0, 76, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 10)

    team.selectPokemon("Tatsugiri")
    team.pokemonOnEditIs("Tatsugiri", "Commander", "Dragon", "Choice Scarf", "Modest")
    team.pokemonOnEditAttacksIs("Draco Meteor", "Chilling Water", "Baton Pass", "Counter")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it("with Flabébé, Floette, Florges, Gastrodon and Tatsugiri in alternative form", () => {
    team.importPokepaste(poke["pokepaste-forms-4"])
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Flabébé", "Flower Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Chilling Water", "Baton Pass", "Calm Mind")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Floette")
    team.pokemonOnEditIs("Floette", "Flower Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Chilling Water", "Baton Pass", "Calm Mind")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Florges")
    team.pokemonOnEditIs("Florges", "Flower Veil", "Fairy", "Leftovers", "Modest")
    team.pokemonOnEditAttacksIs("Alluring Voice", "Chilling Water", "Baton Pass", "Calm Mind")
    team.pokemonOnEditEvsIs(252, 4, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    team.selectPokemon("Gastrodon")
    team.pokemonOnEditIs("Gastrodon", "Storm Drain", "Grass", "Leftovers", "Relaxed")
    team.pokemonOnEditAttacksIs("Muddy Water", "Earth Power", "Icy Wind", "Protect")
    team.pokemonOnEditEvsIs(252, 0, 180, 0, 76, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 10)

    team.selectPokemon("Tatsugiri")
    team.pokemonOnEditIs("Tatsugiri", "Commander", "Dragon", "Choice Scarf", "Modest")
    team.pokemonOnEditAttacksIs("Draco Meteor", "Chilling Water", "Baton Pass", "Counter")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it("with Polteageist, Sinistcha, Sinistea, Rockruff in alternative form", () => {
    team.importPokepaste(poke["pokepaste-forms-6"])
    team.selectTeam("Team 2")

    team.pokemonOnEditIs("Polteageist", "Weak Armor", "Ghost", "Clear Amulet", "Modest")
    team.pokemonOnEditAttacksIs("Dark Pulse", "Calm Mind", "Giga Drain", "Hex")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Sinistcha")
    team.pokemonOnEditIs("Sinistcha", "Hospitality", "Grass", "Assault Vest", "Modest")
    team.pokemonOnEditAttacksIs("Giga Drain", "Calm Mind", "Matcha Gotcha", "Leaf Storm")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Sinistea")
    team.pokemonOnEditIs("Sinistea", "Weak Armor", "Ghost", "Choice Specs", "Modest")
    team.pokemonOnEditAttacksIs("Dark Pulse", "Giga Drain", "Hex", "Psychic")
    team.pokemonOnEditEvsIs(252, 0, 0, 252, 0, 0)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    team.selectPokemon("Rockruff")
    team.pokemonOnEditIs("Rockruff", "Own Tempo", "Rock", "Choice Band", "Jolly")
    team.pokemonOnEditAttacksIs("Body Slam", "Crunch", "Double-Edge", "Play Rough")
    team.pokemonOnEditEvsIs(0, 252, 0, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it("to opponent", () => {
    opponent.deleteAll()
    opponent.importPokemon(poke["pokepaste"])

    opponent.selectDefender("Tatsugiri")
    team.pokemonOnEditIs("Tatsugiri", "Commander", "Grass", "Toxic Orb", "Modest")
    team.pokemonOnEditAttacksIs("Draco Meteor", "Muddy Water", "Endure", "Taunt")
    team.pokemonOnEditEvsIs(0, 0, 0, 252, 4, 252)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    opponent.selectDefender("Dondozo")
    team.pokemonOnEditIs("Dondozo", "Unaware", "Grass", "Sitrus Berry", "Adamant")
    team.pokemonOnEditAttacksIs("Wave Crash", "Order Up", "Protect", "Substitute")
    team.pokemonOnEditEvsIs(12, 156, 60, 0, 116, 164)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    opponent.selectDefender("Smeargle")
    team.pokemonOnEditIs("Smeargle", "Moody", "Ghost", "Focus Sash", "Jolly")
    team.pokemonOnEditAttacksIs("Fake Out", "Wide Guard", "Follow Me", "Spore")
    team.pokemonOnEditEvsIs(252, 0, 4, 0, 0, 252)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)

    opponent.selectDefender("Flutter Mane")
    team.pokemonOnEditIs("Flutter Mane", "Protosynthesis", "Fairy", "Booster Energy", "Modest")
    team.pokemonOnEditAttacksIs("Moonblast", "Dazzling Gleam", "Icy Wind", "Protect")
    team.pokemonOnEditEvsIs(116, 0, 116, 68, 4, 204)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    opponent.selectDefender("Chi-Yu")
    team.pokemonOnEditIs("Chi-Yu", "Beads of Ruin", "Water", "Choice Specs", "Timid")
    team.pokemonOnEditAttacksIs("Overheat", "Heat Wave", "Dark Pulse", "Snarl")
    team.pokemonOnEditEvsIs(132, 0, 252, 0, 0, 124)
    team.pokemonOnEditIvsIs(31, 0, 31, 31, 31, 31)

    opponent.selectDefender("Whimsicott")
    team.pokemonOnEditIs("Whimsicott", "Prankster", "Steel", "Covert Cloak", "Bold")
    team.pokemonOnEditAttacksIs("Moonblast", "Beat Up", "Tailwind", "Fake Tears")
    team.pokemonOnEditEvsIs(252, 0, 180, 0, 76, 0)
    team.pokemonOnEditIvsIs(31, 31, 31, 31, 31, 31)
  })

  it("when have a new Pokémon on edit", () => {
    team.delete("Team 1")
    team.importPokepaste(poke["default-team"])

    opponent.clickOnAdd()
    opponent.importPokemon(poke["pokepaste"])

    team.pokemonOnEditNameIs("Miraidon")
    opponent.addIsVisible()
  })

  it("should show add Pokémon button when the paste have less then 6 Pokémon", () => {
    const team = new Team()

    team.importPokepaste(poke["pokepaste-forms-4"])
    team.selectTeam("Team 2")

    team.addPokemonAvailable()
  })

  it("should not show add Pokémon button when the paste have 6 Pokémon", () => {
    const team = new Team()

    team.importPokepaste(poke["pokepaste"])
    team.selectTeam("Team 2")

    team.addPokemonUnavailable()
  })

  it("should import individual Pokémon when already have another 5", () => {
    const team = new Team()
    team.importPokepaste(poke["pokepaste-forms-5"])
    team.selectTeam("Team 2")

    team.clickOnAdd()
    team.importPokemon(poke["chi-yu"])

    team.addPokemonUnavailable()
    team.selectPokemon("Chi-Yu")
  })
})

describe("Import from Meta", () => {
  it.only("should import most usage Pokémon from Meta", () => {
    opponent.lengthIs(10)

    opponent.addMeta()

    opponent.lengthIs(60)
  })

  it.only("should delete Pokémon from Meta and keep the previously existing one", () => {
    opponent.lengthIs(10)

    opponent.addMeta()
    opponent.addMeta()

    opponent.lengthIs(10)
  })
})
