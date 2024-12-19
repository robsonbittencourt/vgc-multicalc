import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"

describe("Team", () => {
  it("should return active Pokémon", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), false), new TeamMember(new Pokemon("Tyranitar"), true), new TeamMember(new Pokemon("Mewtwo"), false)])

    const result = team.activePokemon()

    expect(result.name).toBe("Tyranitar")
  })

  it("should return that Team is full when have six Team Members", () => {
    const team = new Team("123", true, "Team 1", [
      new TeamMember(new Pokemon("Pikachu"), false),
      new TeamMember(new Pokemon("Tyranitar"), true),
      new TeamMember(new Pokemon("Mewtwo"), false),
      new TeamMember(new Pokemon("Gholdengo"), false),
      new TeamMember(new Pokemon("Archaludon"), false),
      new TeamMember(new Pokemon("Pelipper"), false)
    ])

    const result = team.isFull()

    expect(result).toBeTrue()
  })

  it("should return that Team is not full when has less than six Team Members", () => {
    const team = new Team("123", true, "Team 1", [
      new TeamMember(new Pokemon("Pikachu"), false),
      new TeamMember(new Pokemon("Tyranitar"), true),
      new TeamMember(new Pokemon("Mewtwo"), false),
      new TeamMember(new Pokemon("Gholdengo"), false),
      new TeamMember(new Pokemon("Archaludon"), false)
    ])

    const result = team.isFull()

    expect(result).toBeFalse()
  })

  it("should return true when Team has a default Pokémon", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Togepi"), false), new TeamMember(new Pokemon("Mewtwo"), false)])

    const result = team.hasDefaultPokemon()

    expect(result).toBeTrue()
  })

  it("should return false when Team has a default Pokémon", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Tyranitar"), false), new TeamMember(new Pokemon("Mewtwo"), false)])

    const result = team.hasDefaultPokemon()

    expect(result).toBeFalse()
  })

  it("should return true when Team has only a default Pokémon", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Togepi"), true)])

    const result = team.onlyHasDefaultPokemon()

    expect(result).toBeTrue()
  })

  it("should return false when Team has another Pokémon beside the default one", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Togepi"), false)])

    const result = team.onlyHasDefaultPokemon()

    expect(result).toBeFalse()
  })

  it("should return text with exported Pokémon in Showdown format", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Tyranitar"), false)])

    const result = team.exportToShowdownFormat()

    expect(result.includes("Pikachu")).toBeTrue()
    expect(result.includes("\nTyranitar")).toBeTrue()
  })
})
