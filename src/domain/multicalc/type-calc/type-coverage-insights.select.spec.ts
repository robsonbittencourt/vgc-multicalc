import { TypeCoverageInsights } from "@multicalc/type-calc/type-coverage-insights"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { TeamMember } from "@multicalc/model/team-member"
import { MoveSet } from "@multicalc/model/moveset"
import { Move } from "@multicalc/model/move"

describe("TypeCoverageInsights — selection helpers", () => {
  let service: TypeCoverageInsights

  beforeEach(() => {
    service = new TypeCoverageInsights()
  })

  const team = () =>
    new Team("1", true, "Team 1", [
      new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")) })),
      new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Brick Break")) })),
      new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Fire Fang"), new Move("Rock Slide")) }))
    ])

  const emptyTeam = () => new Team("2", true, "Team 2", [])

  it("selectOffensivePokemon returns the offensive insights with positive value", () => {
    const result = service.selectOffensivePokemon(team(), null)

    expect(result.map(i => i.pokemon.name)).toEqual(["Garchomp", "Pikachu", "Charizard"])
  })

  it("selectOffensivePokemon returns empty for an empty team", () => {
    const result = service.selectOffensivePokemon(emptyTeam(), null)

    expect(result).toEqual([])
  })

  describe("against a second team", () => {
    const team1 = () =>
      new Team("1", true, "Team 1", [
        new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) })),
        new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Light Screen")) })),
        new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Icy Wind"), new Move("Perish Song"), new Move("Taunt"), new Move("Protect")) }))
      ])

    const team2 = () =>
      new Team("2", true, "Team 2", [
        new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Blizzard"), new Move("Energy Ball"), new Move("Earth Power"), new Move("Leaf Storm")) })),
        new TeamMember(new Pokemon("Blastoise", { moveSet: new MoveSet(new Move("Water Spout"), new Move("Protect"), new Move("Ice Beam"), new Move("Water Pledge")) }))
      ])

    it("selectOffensiveSuperEffective returns up to two super effective members", () => {
      const result = service.selectOffensiveSuperEffective(team1(), team2())

      expect(result.map(i => `${i.pokemon.name}:${i.value}`)).toEqual(["Charizard:1", "Pikachu:1"])
    })

    it("selectOffensiveNotVeryEffective skips members already picked as super effective", () => {
      const result = service.selectOffensiveNotVeryEffective(team1(), team2())

      expect(result.map(i => `${i.pokemon.name}:${i.value}`)).toEqual(["Flutter Mane:1"])
    })

    it("selectDefensivePokemon combines the positive members with the weak ones", () => {
      const result = service.selectDefensivePokemon(team1(), team2())

      expect(result.map(i => `${i.pokemon.name}:${i.value}`)).toEqual(["Charizard:1", "Pikachu:1"])
    })

    it("selectDefensivePokemon excludes a member already picked as positive from the weak list", () => {
      const fireAndGrassTeam = new Team("2", true, "Team 2", [
        new TeamMember(new Pokemon("Arcanine", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Flare Blitz"), new Move("Protect")) })),
        new TeamMember(new Pokemon("Venusaur", { moveSet: new MoveSet(new Move("Giga Drain"), new Move("Energy Ball"), new Move("Petal Blizzard"), new Move("Protect")) }))
      ])

      const result = service.selectDefensivePokemon(team1(), fireAndGrassTeam)

      expect(result.map(i => `${i.pokemon.name}:${i.value}`)).toEqual(["Charizard:2"])
    })

    it("selectOffensiveSuperEffective returns empty for an empty team", () => {
      expect(service.selectOffensiveSuperEffective(emptyTeam(), team2())).toEqual([])
    })

    it("selectOffensiveNotVeryEffective returns empty for an empty team", () => {
      expect(service.selectOffensiveNotVeryEffective(emptyTeam(), team2())).toEqual([])
    })

    it("selectDefensivePokemon returns empty for an empty team", () => {
      expect(service.selectDefensivePokemon(emptyTeam(), team2())).toEqual([])
    })
  })

  it("selectDefensivePositive returns up to two positive-defense members", () => {
    const result = service.selectDefensivePositive(team(), null)

    expect(result.length).toBeLessThanOrEqual(2)
    expect(result.map(i => i.pokemon.name)).toEqual(["Charizard", "Garchomp"])
  })

  it("selectDefensiveWeak returns up to two most-weak members", () => {
    const result = service.selectDefensiveWeak(team(), null)

    expect(result.length).toBeLessThanOrEqual(2)
    expect(result.map(i => i.pokemon.name)).toEqual(["Charizard", "Garchomp"])
  })
})
