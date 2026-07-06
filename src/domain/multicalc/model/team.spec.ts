import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { TeamMember } from "@multicalc/model/team-member"

describe("Team", () => {
  it("should return active Pokémon", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), false), new TeamMember(new Pokemon("Tyranitar"), true), new TeamMember(new Pokemon("Mewtwo"), false)])

    const result = team.activePokemon()!

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

    expect(result).toBe(true)
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

    expect(result).toBe(false)
  })

  it("should return that Team is empty when it has no members", () => {
    const team = new Team("123", true, "Team 1", [])

    const result = team.isEmpty()

    expect(result).toBe(true)
  })

  it("should return that Team is not empty when it has a member", () => {
    const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true)])

    const result = team.isEmpty()

    expect(result).toBe(false)
  })

  it("should return active team member index", () => {
    const team = new Team("123", true, "Team 1", [
      new TeamMember(new Pokemon("Pikachu"), false),
      new TeamMember(new Pokemon("Tyranitar"), true),
      new TeamMember(new Pokemon("Mewtwo"), false),
      new TeamMember(new Pokemon("Gholdengo"), false),
      new TeamMember(new Pokemon("Archaludon"), false)
    ])

    const result = team.activePokemonIndex()

    expect(result).toBe(1)
  })

  describe("addMember", () => {
    it("should add a new member as active when Team is empty", () => {
      const team = new Team("123", true, "Team 1", [])

      const result = team.addMember(new Pokemon("Pikachu"))

      expect(result.teamMembers).toHaveLength(1)
      expect(result.teamMembers[0].pokemon.name).toBe("Pikachu")
      expect(result.teamMembers[0].active).toBe(true)
    })

    it("should add a new member as inactive when Team already has members", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true)])

      const result = team.addMember(new Pokemon("Tyranitar"))

      expect(result.teamMembers).toHaveLength(2)
      expect(result.teamMembers[1].pokemon.name).toBe("Tyranitar")
      expect(result.teamMembers[1].active).toBe(false)
    })

    it("should activate the new member when no member is active", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), false)])

      const result = team.addMember(new Pokemon("Chi-Yu"))

      expect(result.teamMembers).toHaveLength(2)
      expect(result.teamMembers[0].pokemon.name).toBe("Pikachu")
      expect(result.teamMembers[0].active).toBe(false)
      expect(result.teamMembers[1].pokemon.name).toBe("Chi-Yu")
      expect(result.teamMembers[1].active).toBe(true)
    })

    it("should throw when Team already has 6 real members", () => {
      const team = new Team(
        "123",
        true,
        "Team 1",
        ["Pikachu", "Tyranitar", "Mewtwo", "Gholdengo", "Archaludon", "Pelipper"].map((name, index) => new TeamMember(new Pokemon(name), index === 0))
      )

      expect(() => team.addMember(new Pokemon("Charizard"))).toThrow()
    })
  })

  describe("removeMember", () => {
    it("should remove the given member", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Tyranitar"), false)])

      const pikachuId = team.teamMembers[0].pokemon.id
      const result = team.removeMember(pikachuId)

      expect(result.teamMembers).toHaveLength(1)
      expect(result.teamMembers[0].pokemon.name).toBe("Tyranitar")
    })

    it("should activate the first remaining member when the active member is removed", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Tyranitar"), false), new TeamMember(new Pokemon("Mewtwo"), false)])

      const pikachuId = team.teamMembers[0].pokemon.id
      const result = team.removeMember(pikachuId)

      expect(result.teamMembers[0].pokemon.name).toBe("Tyranitar")
      expect(result.teamMembers[0].active).toBe(true)
    })

    it("should not mutate the original Team when removing a member", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Tyranitar"), false)])

      const pikachuId = team.teamMembers[0].pokemon.id
      team.removeMember(pikachuId)

      expect(team.teamMembers).toHaveLength(2)
      expect(team.teamMembers[0].active).toBe(true)
    })

    it("should always activate the first remaining member, even when removing a non-active member", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true), new TeamMember(new Pokemon("Tyranitar"), false)])

      const tyranitarId = team.teamMembers[1].pokemon.id
      const result = team.removeMember(tyranitarId)

      expect(result.teamMembers).toHaveLength(1)
      expect(result.teamMembers[0].pokemon.name).toBe("Pikachu")
      expect(result.teamMembers[0].active).toBe(true)
    })
  })

  describe("duplicateMember", () => {
    it("should duplicate the given member as inactive", () => {
      const team = new Team("123", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"), true)])

      const pikachuId = team.teamMembers[0].pokemon.id
      const result = team.duplicateMember(pikachuId)

      expect(result.teamMembers).toHaveLength(2)
      expect(result.teamMembers[1].pokemon.name).toBe("Pikachu")
      expect(result.teamMembers[1].active).toBe(false)
      expect(result.teamMembers[1].pokemon.id).not.toBe(pikachuId)
    })

    it("should throw when Team already has 6 real members", () => {
      const team = new Team(
        "123",
        true,
        "Team 1",
        ["Pikachu", "Tyranitar", "Mewtwo", "Gholdengo", "Archaludon", "Pelipper"].map((name, index) => new TeamMember(new Pokemon(name), index === 0))
      )

      const pikachuId = team.teamMembers[0].pokemon.id

      expect(() => team.duplicateMember(pikachuId)).toThrow()
    })
  })
})
