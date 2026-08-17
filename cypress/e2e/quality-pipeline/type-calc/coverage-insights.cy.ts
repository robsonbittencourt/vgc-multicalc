import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { Team } from "@page-object/team"
import { TypeCoverageInsights } from "@page-object/type-coverage-insights"

const header = new Header()
const team = new Team()
const insights = new TypeCoverageInsights()

describe("Offensive and defensive sections", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
  })

  it("Should ask for a team while there is no Pokémon", () => {
    insights.emptyMessageIsVisible()
  })

  it("Should show the offensive and defensive sections once the team has a Pokémon", () => {
    team.importPokemon(poke["tyranitar"])

    insights.insightsContainerIsVisible()
    insights.offensiveSectionIsVisible()
    insights.defensiveSectionIsVisible()
  })

  it("Should explain the defensive profile with the real counts of the Rock Dark typing", () => {
    team.importPokemon(poke["tyranitar"])

    insights.defensiveResistCountIs(0, "Tyranitar", 6)
    insights.defensiveImmuneCountIs(0, "Tyranitar", 1)
    insights.defensiveWeakCount2xIs(0, "Tyranitar", 6)
  })

  it("Should count the 4x weakness separately from the 2x ones", () => {
    team.importPokemon(poke["tyranitar"])

    insights.defensiveWeakCount4xIs(0, "Tyranitar", 1)
  })

  it("Should explain the offensive profile with the real counts of the Tyranitar moves", () => {
    team.importPokemon(poke["tyranitar"])

    insights.offensiveSuperEffectiveCount2xIs(0, "Tyranitar", 13)
  })

  it("Should show an icon and an explanation for every Pokémon listed in the sections", () => {
    team.importPokemon(poke["tyranitar"])

    insights.pokemonIconsCountIsAtLeast(3)
    insights.explanationsCountIsAtLeast(4)
  })

  it("Should rank the two best attackers of the team in the offensive section", () => {
    team.importPokepaste(poke["pokepaste"])

    insights.offensiveSuperEffectiveCount2xIs(0, "Chi-Yu", 6)
    insights.offensiveSuperEffectiveCount2xIs(1, "Flutter Mane", 6)
  })

  it("Should list the weakest attacker of the team in the not very effective section", () => {
    team.importPokepaste(poke["pokepaste"])

    insights.offensiveNotVeryEffectiveCountIs(0, "Smeargle", 2)
  })

  it("Should update the explanation when the Pokémon changes", () => {
    team.importPokemon(poke["tyranitar"])

    insights.defensiveResistCountIs(0, "Tyranitar", 6)

    team.selectPokemon("Tyranitar").selectPokemon("Archaludon")

    insights.defensiveResistCountIs(0, "Archaludon", 9)
    insights.defensiveImmuneCountIs(0, "Archaludon", 1)
    insights.defensiveWeakCount2xIs(0, "Archaludon", 2)
  })
})

describe("Weaknesses fully covered by the tera type", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
  })

  it("Should mark the card when the tera type covers every weakness", () => {
    team.importPokemon(poke["incineroar"])

    team.selectPokemon("Incineroar").selectTeraType("Water")

    insights.defensiveWeakCount2xIs(0, "Incineroar", 4)
    insights.defensiveWeaknessesCoveredByTeraIs(0, "Incineroar", 4)
    insights.defensiveWeakCardIsAllCovered(0)
  })

  it("Should not mark the card when the tera type covers only part of them", () => {
    team.importPokemon(poke["incineroar"])

    team.selectPokemon("Incineroar").selectTeraType("Steel")

    insights.defensiveWeaknessesCoveredByTeraIs(0, "Incineroar", 2)
    insights.defensiveWeakCardIsNotAllCovered(0)
  })

  it("Should stop marking the card when the tera type stops covering everything", () => {
    team.importPokemon(poke["incineroar"])

    team.selectPokemon("Incineroar").selectTeraType("Water")

    insights.defensiveWeakCardIsAllCovered(0)

    team.selectPokemon("Incineroar").selectTeraType("Flying")

    insights.defensiveWeaknessesCoveredByTeraIs(0, "Incineroar", 3)
    insights.defensiveWeakCardIsNotAllCovered(0)
  })
})

describe("Type summaries outside the against team mode", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
  })

  it("Should not summarize a type shared by fewer than three members", () => {
    team.importPokemon(poke["tyranitar"])

    insights.summaryWeaknessIsHidden()
    insights.summaryResistanceIsHidden()
  })

  it("Should summarize the resistance shared by three members of the team", () => {
    team.importPokepaste(poke["pokepaste"])

    insights.summaryResistanceCountIs(3)

    insights.summaryWeaknessIsHidden()
  })

  it("Should summarize the type the team hits super effectively the most", () => {
    team.importPokepaste(poke["pokepaste"])

    insights.summarySuperEffectiveCountIs(4, "Dragon")

    insights.summaryNotVeryEffectiveIsHidden()
  })

  it("Should hide the type summaries when a second team is selected", () => {
    team.importPokepaste(poke["pokepaste"])

    insights.summaryResistanceIsVisible()

    team.selectTeam("Team 2")
    team.importPokemon(poke["hatterene"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    insights.typeSummariesAreHidden()
  })
})
