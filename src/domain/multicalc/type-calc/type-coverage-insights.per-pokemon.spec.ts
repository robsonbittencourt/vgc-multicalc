import { TypeCoverageInsights } from "@multicalc/type-calc/type-coverage-insights"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { TeamMember } from "@multicalc/model/team-member"
import { MoveSet } from "@multicalc/model/moveset"
import { Move } from "@multicalc/model/move"

describe("TypeCoverageInsights — per-Pokémon counters", () => {
  let service: TypeCoverageInsights

  beforeEach(() => {
    service = new TypeCoverageInsights()
  })

  const charizardInTeam = new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) })
  const pikachuInTeam = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Light Screen")) })

  const charizard = () => charizardInTeam

  const team = () => new Team("1", true, "Team 1", [new TeamMember(charizardInTeam), new TeamMember(pikachuInTeam)])

  const opponents = () =>
    new Team("2", true, "Team 2", [
      new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Blizzard"), new Move("Energy Ball"), new Move("Earth Power"), new Move("Leaf Storm")) })),
      new TeamMember(new Pokemon("Blastoise", { moveSet: new MoveSet(new Move("Water Spout"), new Move("Protect"), new Move("Ice Beam"), new Move("Water Pledge")) }))
    ])

  describe("defensive counters", () => {
    it("counts the types Charizard resists across the whole chart", () => {
      expect(service.getPokemonResistCount(charizard(), team(), null)).toBe(6)
    })

    it("counts the resisted types against a specific opposing team", () => {
      expect(service.getPokemonResistCount(charizard(), team(), opponents())).toBe(0)
    })

    it("counts the types Charizard is immune to", () => {
      expect(service.getPokemonImmuneCount(charizard(), team(), null)).toBe(1)
    })

    it("counts every weakness across the chart", () => {
      expect(service.getPokemonWeakCount(charizard(), team(), null)).toBe(3)
    })

    it("counts the weaknesses actually covered by the opposing team", () => {
      expect(service.getPokemonWeakCount(charizard(), team(), opponents())).toBe(1)
    })

    it("counts only the 2x weaknesses across the chart", () => {
      expect(service.getPokemonWeakCount2x(charizard(), team(), null)).toBe(2)
    })

    it("counts only the 2x weaknesses against the opposing team", () => {
      expect(service.getPokemonWeakCount2x(charizard(), team(), opponents())).toBe(1)
    })

    it("counts the 4x weaknesses across the chart", () => {
      expect(service.getPokemonWeakCount4x(charizard(), team(), null)).toBe(1)
    })

    it("counts no 4x weakness against an opposing team that cannot exploit it", () => {
      expect(service.getPokemonWeakCount4x(charizard(), team(), opponents())).toBe(0)
    })
  })

  describe("offensive counters", () => {
    it("counts the 2x super effective matchups across the chart", () => {
      expect(service.getPokemonSuperEffectiveCount2x(charizard(), team(), null)).toBe(4)
    })

    it("counts the 4x super effective matchups against the opposing team", () => {
      expect(service.getPokemonSuperEffectiveCount4x(charizard(), team(), opponents())).toBe(1)
    })
  })

  describe("getPokemonWeaknessesCoveredByTera", () => {
    it("counts the weaknesses a Water Tera Type removes from Charizard", () => {
      const tera = new Pokemon("Charizard", { teraType: "Water", moveSet: new MoveSet(new Move("Flamethrower"), new Move(""), new Move(""), new Move("")) })

      expect(service.getPokemonWeaknessesCoveredByTera(tera)).toBe(2)
    })

    it("counts the weaknesses the default Tera Type removes from Garchomp", () => {
      const garchomp = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })

      expect(service.getPokemonWeaknessesCoveredByTera(garchomp)).toBe(0)
    })
  })

  describe("top defensive lists", () => {
    it("ranks the members by how many types they resist", () => {
      const result = service.getTopDefensiveResist(team(), null)

      expect(result.map(i => `${i.pokemon.name}:${i.value}`)).toEqual(["Charizard:6", "Pikachu:3"])
    })

    it("ranks the members by how many types they are immune to", () => {
      const result = service.getTopDefensiveImmune(team(), null)

      expect(result.map(i => `${i.pokemon.name}:${i.value}`)).toEqual(["Charizard:1"])
    })
  })
})

describe("TypeCoverageInsights — most relevant types", () => {
  let service: TypeCoverageInsights

  beforeEach(() => {
    service = new TypeCoverageInsights()
  })

  const member = (name: string, moves: string[]) => new TeamMember(new Pokemon(name, { moveSet: new MoveSet(new Move(moves[0] ?? ""), new Move(moves[1] ?? ""), new Move(moves[2] ?? ""), new Move(moves[3] ?? "")) }))

  const steelTeam = () =>
    new Team("1", true, "Steel", [
      member("Ferrothorn", ["Power Whip", "Gyro Ball", "Leech Seed", "Protect"]),
      member("Scizor", ["Bullet Punch", "U-turn", "Swords Dance", "Protect"]),
      member("Metagross", ["Meteor Mash", "Bullet Punch", "Earthquake", "Protect"]),
      member("Skarmory", ["Brave Bird", "Body Press", "Roost", "Protect"])
    ])

  it("reports the type most of the team is weak to", () => {
    expect(service.getMostWeaknessType(steelTeam())).toEqual({ type: "Fire", count: 4 })
  })

  it("reports the type most of the team resists", () => {
    expect(service.getMostResistanceType(steelTeam())).toEqual({ type: "Normal", count: 4 })
  })

  it("returns null for a team with no members", () => {
    expect(service.getMostWeaknessType(new Team("2", true, "Empty", []))).toBeNull()
  })

  it("reports the type the team hits hardest", () => {
    const waterTeam = new Team("3", true, "Water", [
      member("Blastoise", ["Water Spout", "Surf", "Ice Beam", "Protect"]),
      member("Pelipper", ["Hurricane", "Surf", "Tailwind", "Protect"]),
      member("Dondozo", ["Wave Crash", "Body Press", "Earthquake", "Rest"])
    ])

    expect(service.getMostSuperEffectiveType(waterTeam)).toEqual({ type: "Fire", count: 3 })
  })

  it("reports the type the team struggles to break through", () => {
    const psychicTeam = new Team("4", true, "Psychic", [member("Indeedee", ["Psychic", "Psyshock", "Protect", ""]), member("Hatterene", ["Psychic", "Psyshock", "Protect", ""]), member("Espeon", ["Psychic", "Psyshock", "Protect", ""])])

    expect(service.getMostNotVeryEffectiveType(psychicTeam)).toEqual({ type: "Psychic", count: 3 })
  })

  it("returns null when no type reaches the relevance threshold", () => {
    const normalTeam = new Team("5", true, "Normal", [member("Snorlax", ["Body Slam", "Double-Edge", "Rest", ""]), member("Blissey", ["Seismic Toss", "Body Slam", "Soft-Boiled", ""]), member("Ursaluna", ["Facade", "Body Slam", "Protect", ""])])

    expect(service.getMostNotVeryEffectiveType(normalTeam)).toBeNull()
  })
})
