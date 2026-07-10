import { TypeCoverageInsights } from "@multicalc/type-calc/type-coverage-insights"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { TeamMember } from "@multicalc/model/team-member"
import { MoveSet } from "@multicalc/model/moveset"
import { Move } from "@multicalc/model/move"

describe("TypeCoverageInsights — members without coverage", () => {
  let service: TypeCoverageInsights

  beforeEach(() => {
    service = new TypeCoverageInsights()
  })

  it("should omit a status-only member from single-team offensive super-effective results", () => {
    const team = new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Rock Slide")) })),
      new TeamMember(new Pokemon("Blissey", { moveSet: new MoveSet(new Move("Soft-Boiled"), new Move("Protect"), new Move("Calm Mind"), new Move("Toxic")) }))
    ])

    const result = service.getTopOffensiveSuperEffective(team, null)

    expect(result.map(i => i.pokemon.name)).toEqual(["Charizard"])
  })

  it("should omit a status-only member from single-team not-very-effective results", () => {
    const team = new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Blissey", { moveSet: new MoveSet(new Move("Soft-Boiled"), new Move("Protect"), new Move("Calm Mind"), new Move("Toxic")) }))
    ])

    const result = service.getTopOffensiveNotVeryEffective(team, null)

    expect(result.map(i => i.pokemon.name)).toEqual(["Charizard"])
  })

  it("should add a not-very-effective-only member to selectOffensivePokemon", () => {
    const team = new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Fire Fang"), new Move("Rock Slide")) })),
      new TeamMember(new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move("Return"), new Move("Facade"), new Move("Frustration")) }))
    ])

    const result = service.selectOffensivePokemon(team, null)

    expect(result.map(i => i.pokemon.name).sort()).toEqual(["Garchomp", "Snorlax"])
  })

  it("should omit a member with no weaknesses to a narrow opponent moveset", () => {
    const team = new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Protect"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Gastrodon", { moveSet: new MoveSet(new Move("Earth Power"), new Move("Muddy Water"), new Move("Recover"), new Move("Protect")) }))
    ])

    const opponent = new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Volt Switch"), new Move("Nuzzle")) }))])

    const result = service.getTopDefensiveWeak(team, opponent)

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([{ name: "Charizard", value: 1 }])
  })

  it("should omit a member with no resistances to a narrow opponent moveset", () => {
    const team = new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Protect"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Sableye", { moveSet: new MoveSet(new Move("Foul Play"), new Move("Will-O-Wisp"), new Move("Recover"), new Move("Protect")) }))
    ])

    const opponent = new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Wood Hammer"), new Move("Grassy Glide"), new Move("Grass Pledge"), new Move("Bullet Seed")) }))])

    const result = service.getTopDefensivePositive(team, opponent)

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([{ name: "Charizard", value: 1 }])
  })

  const mixedTeam = () =>
    new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move("Return"), new Move("Facade"), new Move("Frustration")) })),
      new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Fire Fang"), new Move("Rock Slide")) })),
      new TeamMember(new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Spore"), new Move("Protect"), new Move("Rage Powder"), new Move("Pollen Puff")) })),
      new TeamMember(new Pokemon("Gastrodon", { moveSet: new MoveSet(new Move("Earth Power"), new Move("Muddy Water"), new Move("Recover"), new Move("Protect")) }))
    ])

  const insightOpponent = () =>
    new Team("2", false, "Team 2", [
      new TeamMember(new Pokemon("Corviknight", { moveSet: new MoveSet(new Move("Brave Bird"), new Move("Iron Head"), new Move("Bulk Up"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Heatran", { moveSet: new MoveSet(new Move("Heat Wave"), new Move("Earth Power"), new Move("Flash Cannon"), new Move("Protect")) }))
    ])

  it("should keep a member already selected as super-effective out of the not-very-effective merge", () => {
    const result = service.selectOffensivePokemon(mixedTeam(), null)

    expect(result.map(i => i.pokemon.name)).toEqual(["Garchomp", "Gastrodon", "Amoonguss", "Snorlax"])
  })

  it("should omit an offensively useless member from the super-effective count against a team", () => {
    const result = service.getTopOffensiveSuperEffective(mixedTeam(), insightOpponent())

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([
      { name: "Garchomp", value: 2 },
      { name: "Gastrodon", value: 1 }
    ])
  })

  it("should omit a member with no resistances from single-team resist insights", () => {
    const result = service.getTopDefensiveResist(mixedTeam(), null)

    expect(result.map(i => ({ name: i.pokemon.name, value: i.value }))).toEqual([
      { name: "Amoonguss", value: 5 },
      { name: "Gastrodon", value: 4 },
      { name: "Garchomp", value: 3 }
    ])
  })

  it("should omit a Normal-only member from single-team super-effective counts", () => {
    const result = service.getTopOffensiveSuperEffective(mixedTeam(), null)

    expect(result.map(i => i.pokemon.name)).not.toContain("Snorlax")
    expect(result.map(i => i.pokemon.name)).toContain("Garchomp")
  })
})
