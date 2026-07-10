import { TypeCoverageInsights } from "@multicalc/type-calc/type-coverage-insights"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { TeamMember } from "@multicalc/model/team-member"
import { MoveSet } from "@multicalc/model/moveset"
import { Move } from "@multicalc/model/move"

describe("TypeCoverageInsights — against a second team", () => {
  let service: TypeCoverageInsights

  beforeEach(() => {
    service = new TypeCoverageInsights()
  })

  const team = () =>
    new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Brick Break")) }))
    ])

  const opponent = () =>
    new Team("2", false, "Team 2", [
      new TeamMember(new Pokemon("Gyarados", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Dragon Dance")) })),
      new TeamMember(new Pokemon("Venusaur", { moveSet: new MoveSet(new Move("Giga Drain"), new Move("Sludge Bomb"), new Move("Sleep Powder"), new Move("Protect")) }))
    ])

  it("computes offensive super-effective coverage against the opponent team", () => {
    const result = service.getTopOffensiveSuperEffective(team(), opponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([
      { name: "Pikachu", value: 1 },
      { name: "Charizard", value: 1 }
    ])
  })

  it("computes offensive not-very-effective coverage against the opponent team", () => {
    const result = service.getTopOffensiveNotVeryEffective(team(), opponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([])
  })

  it("computes defensive resist coverage against the opponent team", () => {
    const result = service.getTopDefensiveResist(team(), opponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([])
  })

  it("computes defensive weak coverage against the opponent team", () => {
    const result = service.getTopDefensiveWeak(team(), opponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([
      { name: "Charizard", value: 1 },
      { name: "Pikachu", value: 1 }
    ])
  })

  it("computes defensive positive coverage against the opponent team", () => {
    const result = service.getTopDefensivePositive(team(), opponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([])
  })

  it("selects offensive pokemon against the opponent team", () => {
    const result = service.selectOffensivePokemon(team(), opponent())

    expect(result.map(i => i.pokemon.name)).toEqual(["Pikachu", "Charizard"])
  })

  const resistantTeam = () =>
    new Team("3", true, "Team 3", [
      new TeamMember(new Pokemon("Corviknight", { moveSet: new MoveSet(new Move("Brave Bird"), new Move("Iron Head"), new Move("Bulk Up"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Heatran", { moveSet: new MoveSet(new Move("Heat Wave"), new Move("Earth Power"), new Move("Flash Cannon"), new Move("Protect")) }))
    ])

  const grassFairyOpponent = () =>
    new Team("4", false, "Team 4", [
      new TeamMember(new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("U-turn"), new Move("Fake Out")) })),
      new TeamMember(new Pokemon("Clefairy", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Follow Me"), new Move("Helping Hand"), new Move("Protect")) }))
    ])

  it("counts defensive resist coverage for a resistant team", () => {
    const result = service.getTopDefensiveResist(resistantTeam(), grassFairyOpponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([
      { name: "Corviknight", value: 2 },
      { name: "Heatran", value: 2 }
    ])
  })

  it("counts defensive positive coverage for a resistant team", () => {
    const result = service.getTopDefensivePositive(resistantTeam(), grassFairyOpponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([
      { name: "Corviknight", value: 2 },
      { name: "Heatran", value: 2 }
    ])
  })
})
