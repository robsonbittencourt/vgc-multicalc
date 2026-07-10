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
