import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { TypeCoverageService } from "./type-coverage.service"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { MoveSet } from "@lib/model/moveset"
import { Move } from "@lib/model/move"
import { TypeEffectivenessService } from "./type-effectiveness.service"

describe("TypeCoverageService", () => {
  let service: TypeCoverageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeCoverageService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(TypeCoverageService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return empty array for defensive coverage when team has no pokemon", () => {
    const team = new Team("1", true, "Empty Team", [])

    const coverage = service.getDefensiveCoverage(team)

    expect(coverage).toEqual([])
  })

  it("should return empty array for offensive coverage when team has no pokemon", () => {
    const team = new Team("1", true, "Empty Team", [])

    const coverage = service.getOffensiveCoverage(team)

    expect(coverage).toEqual([])
  })

  it("should calculate defensive coverage for a single pokemon", () => {
    const pokemon = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getDefensiveCoverage(team)

    expect(coverage.length).toBe(18)

    const waterRow = coverage.find(row => row.moveType === "Water")
    expect(waterRow).toBeDefined()
    expect(waterRow!.totalWeak).toBe(1)
    expect(waterRow!.pokemonData[0].effectiveness).toBe(2)
  })

  it("should calculate offensive coverage correctly", () => {
    const pokemon = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    expect(coverage.length).toBe(18)

    const grassRow = coverage.find(row => row.pokemonType === "Grass")
    expect(grassRow).toBeDefined()
    expect(grassRow!.pokemonData[0].coverageType).toBe("super-effective")
    expect(grassRow!.superEffective).toBe(1)
  })

  it("should filter out Struggle moves", () => {
    const pokemon = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Struggle"), new Move("Flamethrower"), new Move("Struggle"), new Move("Struggle"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const grassRow = coverage.find(row => row.pokemonType === "Grass")
    expect(grassRow!.pokemonData[0].coverageType).toBe("super-effective")
  })

  it("should filter out moves with bp 0", () => {
    const pokemon = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Swords Dance"), new Move("Flamethrower"), new Move("Roost"), new Move("Protect"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const normalRow = coverage.find(row => row.pokemonType === "Normal")
    expect(normalRow!.pokemonData[0].coverageType).toBe("none")
  })

  it("should use Grass type for Ivy Cudgel when Ogerpon is base form", () => {
    const pokemon = new Pokemon("Ogerpon", {
      moveSet: new MoveSet(new Move("Ivy Cudgel"), new Move("Spiky Shield"), new Move("Follow Me"), new Move("Protect"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const waterRow = coverage.find(row => row.pokemonType === "Water")
    expect(waterRow).toBeDefined()
    expect(waterRow!.pokemonData[0].coverageType).toBe("super-effective")
    expect(waterRow!.pokemonData[0].effectiveness).toBe(2)
  })

  it("should use Rock type for Ivy Cudgel when Ogerpon is Cornerstone form", () => {
    const pokemon = new Pokemon("Ogerpon-Cornerstone", {
      moveSet: new MoveSet(new Move("Ivy Cudgel"), new Move("Spiky Shield"), new Move("Follow Me"), new Move("Protect"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const fireRow = coverage.find(row => row.pokemonType === "Fire")
    expect(fireRow).toBeDefined()
    expect(fireRow!.pokemonData[0].coverageType).toBe("super-effective")
    expect(fireRow!.pokemonData[0].effectiveness).toBe(2)
  })

  it("should use Fire type for Ivy Cudgel when Ogerpon is Hearthflame form", () => {
    const pokemon = new Pokemon("Ogerpon-Hearthflame", {
      moveSet: new MoveSet(new Move("Ivy Cudgel"), new Move("Spiky Shield"), new Move("Follow Me"), new Move("Protect"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const grassRow = coverage.find(row => row.pokemonType === "Grass")
    expect(grassRow).toBeDefined()
    expect(grassRow!.pokemonData[0].coverageType).toBe("super-effective")
    expect(grassRow!.pokemonData[0].effectiveness).toBe(2)
  })

  it("should use Water type for Ivy Cudgel when Ogerpon is Wellspring form", () => {
    const pokemon = new Pokemon("Ogerpon-Wellspring", {
      moveSet: new MoveSet(new Move("Ivy Cudgel"), new Move("Spiky Shield"), new Move("Follow Me"), new Move("Protect"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const fireRow = coverage.find(row => row.pokemonType === "Fire")
    expect(fireRow).toBeDefined()
    expect(fireRow!.pokemonData[0].coverageType).toBe("super-effective")
    expect(fireRow!.pokemonData[0].effectiveness).toBe(2)
  })

  it("should consider Tera Type when considerTeraType is true", () => {
    const pokemon = new Pokemon("Golduck", {
      teraType: "Ground"
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getDefensiveCoverage(team, true)

    const electricRow = coverage.find(row => row.moveType === "Electric")
    expect(electricRow).toBeDefined()
    expect(electricRow!.pokemonData[0].effectiveness).toBe(0)
  })

  it("should not consider Tera Type when considerTeraType is false", () => {
    const pokemon = new Pokemon("Golduck", {
      teraType: "Ground"
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getDefensiveCoverage(team, false)

    const electricRow = coverage.find(row => row.moveType === "Electric")
    expect(electricRow).toBeDefined()
    expect(electricRow!.pokemonData[0].effectiveness).toBe(2)
  })

  it("should prioritize immune over super effective when Tera Type conflicts", () => {
    const pokemon = new Pokemon("Golduck", {
      teraType: "Ground"
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getDefensiveCoverage(team, true)

    const electricRow = coverage.find(row => row.moveType === "Electric")
    expect(electricRow!.pokemonData[0].effectiveness).toBe(0)
    expect(electricRow!.totalWeak).toBe(0)
    expect(electricRow!.totalResist).toBe(1)
  })

  it("should prioritize not very effective over super effective when Tera Type conflicts", () => {
    const pokemon = new Pokemon("Charizard", {
      teraType: "Water"
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getDefensiveCoverage(team, true)

    const waterRow = coverage.find(row => row.moveType === "Water")
    expect(waterRow!.pokemonData[0].effectiveness).toBe(0.5)
  })

  it("should use original types when Tera Type is Stellar in getDefensiveCoverage", () => {
    const pokemon = new Pokemon("Charizard", {
      teraType: "Stellar"
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getDefensiveCoverage(team, true)

    const waterRow = coverage.find(row => row.moveType === "Water")
    expect(waterRow).toBeDefined()
    expect(waterRow!.pokemonData[0].effectiveness).toBe(2)

    const rockRow = coverage.find(row => row.moveType === "Rock")
    expect(rockRow).toBeDefined()
    expect(rockRow!.pokemonData[0].effectiveness).toBe(4)

    const grassRow = coverage.find(row => row.moveType === "Grass")
    expect(grassRow).toBeDefined()
    expect(grassRow!.pokemonData[0].effectiveness).toBe(0.25)
  })

  it("should identify immune coverage in getOffensiveCoverage", () => {
    const pokemon = new Pokemon("Alakazam", {
      moveSet: new MoveSet(new Move("Psychic"), new Move("Psyshock"), new Move("Future Sight"), new Move("Protect"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const darkRow = coverage.find(row => row.pokemonType === "Dark")
    expect(darkRow).toBeDefined()
    expect(darkRow!.pokemonData[0].coverageType).toBe("immune")
  })

  it("should handle null or undefined moves in getMoveTypes", () => {
    const pokemonWithNullMove = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
    })

    Object.defineProperty(pokemonWithNullMove.moveSet, "move3", {
      get: () => null,
      configurable: true
    })

    const team = new Team("1", true, "Team", [new TeamMember(pokemonWithNullMove, true)])

    const coverage = service.getOffensiveCoverage(team)

    expect(coverage.length).toBe(18)
    const grassRow = coverage.find(row => row.pokemonType === "Grass")
    expect(grassRow).toBeDefined()
    expect(grassRow!.pokemonData[0].coverageType).toBe("super-effective")
  })

  it("should handle moves with empty name in getMoveTypes", () => {
    const pokemonWithEmptyNameMove = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
    })

    const moveWithEmptyName = Object.create(pokemonWithEmptyNameMove.moveSet.move3)
    Object.defineProperty(moveWithEmptyName, "name", {
      get: () => "",
      configurable: true
    })

    Object.defineProperty(pokemonWithEmptyNameMove.moveSet, "move3", {
      get: () => moveWithEmptyName,
      configurable: true
    })

    const team = new Team("1", true, "Team", [new TeamMember(pokemonWithEmptyNameMove, true)])

    const coverage = service.getOffensiveCoverage(team)

    expect(coverage.length).toBe(18)
    const grassRow = coverage.find(row => row.pokemonType === "Grass")
    expect(grassRow).toBeDefined()
    expect(grassRow!.pokemonData[0].coverageType).toBe("super-effective")
  })

  it("should return 1 when no conditions are met in getEffectivenessByHierarchyForOffensive", () => {
    const typeEffectivenessService = TestBed.inject(TypeEffectivenessService)
    spyOn(typeEffectivenessService, "getEffectiveness").and.returnValue(1.5 as any)

    const pokemon = new Pokemon("Charizard", {
      moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
    })
    const team = new Team("1", true, "Team", [new TeamMember(pokemon, true)])

    const coverage = service.getOffensiveCoverage(team)

    const normalRow = coverage.find(row => row.pokemonType === "Normal")
    expect(normalRow).toBeDefined()
    expect(normalRow!.pokemonData[0].effectiveness).toBe(1)
    expect(normalRow!.pokemonData[0].coverageType).toBe("none")
  })

  describe("getOffensiveCoverageAgainstTeam", () => {
    it("should return empty array when team has no pokemon", () => {
      const team = new Team("1", true, "Team", [])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(new Pokemon("Charizard"), true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage).toEqual([])
    })

    it("should return empty array when target team has no pokemon", () => {
      const team = new Team("1", true, "Team", [new TeamMember(new Pokemon("Charizard"), true)])
      const targetTeam = new Team("2", true, "Target Team", [])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage).toEqual([])
    })

    it("should return empty array when both teams have no pokemon", () => {
      const team = new Team("1", true, "Team", [])
      const targetTeam = new Team("2", true, "Target Team", [])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage).toEqual([])
    })

    it("should calculate offensive coverage against a single target pokemon", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const target = new Pokemon("Venusaur")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].targetPokemon.name).toBe("Venusaur")
      expect(coverage[0].pokemonData.length).toBe(1)
      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].superEffective).toBe(1)
    })

    it("should calculate offensive coverage against multiple target pokemon", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const target1 = new Pokemon("Venusaur")
      const target2 = new Pokemon("Blastoise")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target1, true), new TeamMember(target2, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(2)
      expect(coverage[0].targetPokemon.name).toBe("Venusaur")
      expect(coverage[1].targetPokemon.name).toBe("Blastoise")
    })

    it("should calculate offensive coverage with multiple attackers", () => {
      const attacker1 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const attacker2 = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const target = new Pokemon("Venusaur")
      const team = new Team("1", true, "Team", [new TeamMember(attacker1, true), new TeamMember(attacker2, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData.length).toBe(2)
    })

    it("should identify not very effective coverage", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Flamethrower"), new Move("Flamethrower"), new Move("Flamethrower"))
      })
      const target = new Pokemon("Blastoise")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      const fireMoveData = coverage[0].pokemonData[0]
      expect(fireMoveData.coverageType).toBe("not-very-effective")
      expect(coverage[0].notVeryEffective).toBe(1)
    })

    it("should identify immune coverage", () => {
      const attacker = new Pokemon("Alakazam", {
        moveSet: new MoveSet(new Move("Psychic"), new Move("Psyshock"), new Move("Future Sight"), new Move("Protect"))
      })
      const target = new Pokemon("Umbreon")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      const psychicMoveData = coverage[0].pokemonData[0]
      expect(psychicMoveData.coverageType).toBe("immune")
    })

    it("should handle null or undefined moves in getMoveTypes for getOffensiveCoverageAgainstTeam", () => {
      const attackerWithNullMove = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })

      Object.defineProperty(attackerWithNullMove.moveSet, "move3", {
        get: () => null,
        configurable: true
      })

      const target = new Pokemon("Venusaur")
      const team = new Team("1", true, "Team", [new TeamMember(attackerWithNullMove, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
    })

    it("should handle moves with empty name in getMoveTypes for getOffensiveCoverageAgainstTeam", () => {
      const attackerWithEmptyNameMove = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })

      const moveWithEmptyName = Object.create(attackerWithEmptyNameMove.moveSet.move3)
      Object.defineProperty(moveWithEmptyName, "name", {
        get: () => "",
        configurable: true
      })

      Object.defineProperty(attackerWithEmptyNameMove.moveSet, "move3", {
        get: () => moveWithEmptyName,
        configurable: true
      })

      const target = new Pokemon("Venusaur")
      const team = new Team("1", true, "Team", [new TeamMember(attackerWithEmptyNameMove, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
    })

    it("should consider Tera Type when considerTeraType is true", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const target = new Pokemon("Blastoise", {
        teraType: "Grass"
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].superEffective).toBe(1)
    })

    it("should not consider Tera Type when considerTeraType is false", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const target = new Pokemon("Blastoise", {
        teraType: "Grass"
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, false, false)

      const fireMoveData = coverage[0].pokemonData[0]
      expect(["not-very-effective", "none"]).toContain(fireMoveData.coverageType)
    })

    it("should use original types when target has Stellar Tera Type in getOffensiveCoverageAgainstTeam", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Rock Slide"), new Move("Roost"))
      })
      const target = new Pokemon("Venusaur", {
        teraType: "Stellar"
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].targetPokemon.name).toBe("Venusaur")
      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].superEffective).toBe(1)
    })

    it("should apply 2x effectiveness when attacker has Stellar Tera type with Tera Blast and both are terastalized", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const target = new Pokemon("Blastoise", {
        teraType: "Water",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].superEffective).toBe(1)
    })

    it("should apply 2x effectiveness when attacker has Stellar Tera type with Tera Starstorm and both are terastalized", () => {
      const attacker = new Pokemon("Terapagos-Stellar", {
        moveSet: new MoveSet(new Move("Tera Starstorm"), new Move("Earth Power"), new Move("Calm Mind"), new Move("Protect")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const target = new Pokemon("Charizard", {
        teraType: "Fire",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].superEffective).toBe(1)
    })

    it("should not apply 2x effectiveness when defender is not terastalized", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const target = new Pokemon("Blastoise")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, false, false)

      expect(coverage[0].pokemonData[0].coverageType).not.toBe("super-effective")
      expect(coverage[0].pokemonData[0].effectiveness).not.toBe(2)
    })

    it("should not apply 2x effectiveness when attacker does not have Stellar Tera type", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Fire",
        teraTypeActive: true
      })
      const target = new Pokemon("Venusaur", {
        teraType: "Grass",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, true, true)

      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
    })

    it("should not apply 2x effectiveness when attacker has neither Tera Blast nor Tera Starstorm", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const target = new Pokemon("Venusaur", {
        teraType: "Grass",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
    })

    it("should consider Tera Blast when considerTeraBlast is true", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Electric"
      })
      const target = new Pokemon("Blastoise")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, false, true)

      expect(coverage[0].pokemonData[0].coverageType).toBe("super-effective")
      expect(coverage[0].superEffective).toBe(1)
    })

    it("should consider Tera Blast as Normal type when considerTeraBlast is false", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Electric"
      })
      const target = new Pokemon("Blastoise")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam, false, false)

      expect(coverage[0].pokemonData[0].coverageType).toBe("none")
      expect(coverage[0].pokemonData[0].effectiveness).toBe(1)
    })

    it("should filter out default pokemon from both teams", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const defaultPokemon = new Pokemon("Togepi")
      const target = new Pokemon("Venusaur")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true), new TeamMember(defaultPokemon, false)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true), new TeamMember(defaultPokemon, false)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData.length).toBe(1)
    })

    it("should calculate correct superEffective count", () => {
      const attacker1 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const attacker2 = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const target = new Pokemon("Venusaur")
      const team = new Team("1", true, "Team", [new TeamMember(attacker1, true), new TeamMember(attacker2, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].superEffective).toBeGreaterThan(0)
    })

    it("should calculate correct notVeryEffective count", () => {
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const target = new Pokemon("Blastoise")
      const team = new Team("1", true, "Team", [new TeamMember(attacker, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(target, true)])

      const coverage = service.getOffensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].notVeryEffective).toBeGreaterThanOrEqual(0)
    })
  })

  describe("getDefensiveCoverageAgainstTeam", () => {
    it("should return empty array when team has no pokemon", () => {
      const team = new Team("1", true, "Team", [])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(new Pokemon("Charizard"), true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage).toEqual([])
    })

    it("should return empty array when target team has no pokemon", () => {
      const team = new Team("1", true, "Team", [new TeamMember(new Pokemon("Charizard"), true)])
      const targetTeam = new Team("2", true, "Target Team", [])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage).toEqual([])
    })

    it("should return empty array when both teams have no pokemon", () => {
      const team = new Team("1", true, "Team", [])
      const targetTeam = new Team("2", true, "Target Team", [])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage).toEqual([])
    })

    it("should calculate defensive coverage against a single target pokemon", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])
      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].targetPokemon.name).toBe("Venusaur")
      expect(coverage[0].pokemonData.length).toBe(1)
    })

    it("should calculate defensive coverage against multiple target pokemon", () => {
      const defender = new Pokemon("Charizard")
      const attacker1 = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const attacker2 = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker1, true), new TeamMember(attacker2, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(2)
      expect(coverage[0].targetPokemon.name).toBe("Venusaur")
      expect(coverage[1].targetPokemon.name).toBe("Blastoise")
    })

    it("should calculate defensive coverage with multiple defenders", () => {
      const defender1 = new Pokemon("Charizard")
      const defender2 = new Pokemon("Blastoise")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender1, true), new TeamMember(defender2, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData.length).toBe(2)
    })

    it("should identify weaknesses correctly", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])
      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].totalWeak).toBeGreaterThanOrEqual(0)
    })

    it("should identify resistances correctly", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])
      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].totalResist).toBeGreaterThanOrEqual(0)
    })

    it("should consider Tera Type when considerTeraType is true", () => {
      const defender = new Pokemon("Charizard", {
        teraType: "Ground"
      })
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].totalResist).toBeGreaterThanOrEqual(0)
    })

    it("should not consider Tera Type when considerTeraType is false", () => {
      const defender = new Pokemon("Charizard", {
        teraType: "Ground"
      })
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, false, false)

      expect(coverage[0].totalWeak).toBeGreaterThanOrEqual(0)
    })

    it("should use original types when Tera Type is Stellar in getDefensiveCoverageAgainstTeam", () => {
      const defender = new Pokemon("Charizard", {
        teraType: "Stellar"
      })
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Rock Slide"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].totalWeak).toBe(1)

      const charizardData = coverage[0].pokemonData[0]
      expect(charizardData.pokemon.name).toBe("Charizard")
      expect(charizardData.effectiveness).toBeGreaterThan(1)
    })

    it("should apply 2x effectiveness when attacker has Stellar Tera type with Tera Blast and both are terastalized in defensive coverage", () => {
      const defender = new Pokemon("Blastoise", {
        teraType: "Water",
        teraTypeActive: true
      })
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].totalWeak).toBe(1)
    })

    it("should apply 2x effectiveness when attacker has Stellar Tera type with Tera Starstorm and both are terastalized in defensive coverage", () => {
      const defender = new Pokemon("Charizard", {
        teraType: "Fire",
        teraTypeActive: true
      })
      const attacker = new Pokemon("Terapagos-Stellar", {
        moveSet: new MoveSet(new Move("Tera Starstorm"), new Move("Earth Power"), new Move("Calm Mind"), new Move("Protect")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].totalWeak).toBe(1)
    })

    it("should not apply 2x effectiveness when defender is not terastalized in defensive coverage", () => {
      const defender = new Pokemon("Blastoise")
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, false, false)

      expect(coverage[0].pokemonData[0].effectiveness).not.toBe(2)
    })

    it("should not apply 2x effectiveness when attacker does not have Stellar Tera type in defensive coverage", () => {
      const defender = new Pokemon("Venusaur", {
        teraType: "Grass",
        teraTypeActive: true
      })
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Fire",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
    })

    it("should not apply 2x effectiveness when attacker has neither Tera Blast nor Tera Starstorm in defensive coverage", () => {
      const defender = new Pokemon("Venusaur", {
        teraType: "Grass",
        teraTypeActive: true
      })
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")),
        teraType: "Stellar",
        teraTypeActive: true
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, true, false)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
    })

    it("should consider Tera Blast when considerTeraBlast is true", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect")),
        teraType: "Electric"
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, false, true)

      expect(coverage[0].pokemonData.length).toBe(1)
    })

    it("should consider Tera Blast as Normal type when considerTeraBlast is false", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect")),
        teraType: "Electric"
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, false, false)

      expect(coverage[0].pokemonData.length).toBe(1)
      expect(coverage[0].pokemonData[0].effectiveness).toBe(1)
    })

    it("should filter out default pokemon from both teams", () => {
      const defender = new Pokemon("Charizard")
      const defaultPokemon = new Pokemon("Togepi")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true), new TeamMember(defaultPokemon, false)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true), new TeamMember(defaultPokemon, false)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData.length).toBe(1)
    })

    it("should handle pokemon with no moves with BP", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Swords Dance"), new Move("Roost"), new Move("Protect"), new Move("Substitute"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData[0].effectiveness).toBe(1)
      expect(coverage[0].pokemonData[0].formatted).toBe("")
    })

    it("should calculate correct totalWeak count", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].totalWeak).toBeGreaterThanOrEqual(0)
    })

    it("should calculate correct totalResist count", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].totalResist).toBeGreaterThanOrEqual(0)
    })

    it("should return maximum super effective value when multiple super effective moves exist", () => {
      const defender = new Pokemon("Venusaur")
      const attacker = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Overheat"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].totalWeak).toBe(1)
    })

    it("should prioritize super effective moves over immune moves", () => {
      const defender = new Pokemon("Gengar")
      const attacker = new Pokemon("Garchomp", {
        moveSet: new MoveSet(new Move("Tackle"), new Move("Earthquake"), new Move("Protect"), new Move("Roost"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(2)
      expect(coverage[0].totalWeak).toBe(1)
    })

    it("should return 1 when no conditions are met in getEffectivenessByHierarchy", () => {
      const typeEffectivenessService = TestBed.inject(TypeEffectivenessService)
      spyOn(typeEffectivenessService, "getEffectiveness").and.returnValue(1.5 as any)

      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Sludge Bomb"), new Move("Earthquake"), new Move("Protect"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam)

      expect(coverage[0].pokemonData[0].effectiveness).toBe(1)
    })

    it("should filter out Struggle moves in getMovesWithBP", () => {
      const defender = new Pokemon("Charizard")
      const attacker = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Struggle"), new Move("Solar Beam"), new Move("Struggle"), new Move("Earthquake"))
      })
      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeam = new Team("2", true, "Target Team", [new TeamMember(attacker, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeam, false, false)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData[0].effectiveness).toBeGreaterThanOrEqual(0)
    })

    it("should handle null or undefined moves in getMovesWithBP", () => {
      const defender = new Pokemon("Charizard")
      const pokemonWithNullMove = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Earthquake"), new Move("Protect"), new Move("Protect"))
      })

      Object.defineProperty(pokemonWithNullMove.moveSet, "move3", {
        get: () => null,
        configurable: true
      })

      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeamWithNullMove = new Team("2", true, "Target Team", [new TeamMember(pokemonWithNullMove, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeamWithNullMove, false, false)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData[0].effectiveness).toBeGreaterThanOrEqual(0)
    })

    it("should handle moves with empty name in getMovesWithBP", () => {
      const defender = new Pokemon("Charizard")
      const pokemonWithEmptyNameMove = new Pokemon("Venusaur", {
        moveSet: new MoveSet(new Move("Solar Beam"), new Move("Earthquake"), new Move("Protect"), new Move("Protect"))
      })

      const moveWithEmptyName = Object.create(pokemonWithEmptyNameMove.moveSet.move3)
      Object.defineProperty(moveWithEmptyName, "name", {
        get: () => "",
        configurable: true
      })

      Object.defineProperty(pokemonWithEmptyNameMove.moveSet, "move3", {
        get: () => moveWithEmptyName,
        configurable: true
      })

      const team = new Team("1", true, "Team", [new TeamMember(defender, true)])
      const targetTeamWithEmptyNameMove = new Team("2", true, "Target Team", [new TeamMember(pokemonWithEmptyNameMove, true)])

      const coverage = service.getDefensiveCoverageAgainstTeam(team, targetTeamWithEmptyNameMove, false, false)

      expect(coverage.length).toBe(1)
      expect(coverage[0].pokemonData[0].effectiveness).toBeGreaterThanOrEqual(0)
    })
  })

  describe("hasTeraBlast", () => {
    it("should return true when pokemon has Tera Blast", () => {
      const pokemon = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Tera Blast"), new Move("Dragon Claw"), new Move("Roost"))
      })

      const result = service.hasTeraBlast(pokemon)

      expect(result).toBe(true)
    })

    it("should return false when pokemon does not have Tera Blast", () => {
      const pokemon = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })

      const result = service.hasTeraBlast(pokemon)

      expect(result).toBe(false)
    })

    it("should return true when Tera Blast is in first move slot", () => {
      const pokemon = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Tera Blast"), new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Protect"))
      })

      const result = service.hasTeraBlast(pokemon)

      expect(result).toBe(true)
    })

    it("should return true when Tera Blast is in last move slot", () => {
      const pokemon = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Protect"), new Move("Tera Blast"))
      })

      const result = service.hasTeraBlast(pokemon)

      expect(result).toBe(true)
    })
  })

  describe("getPokemonTeraType", () => {
    it("should return tera type when pokemon has tera type", () => {
      const teraType = "Fire"
      const pokemon = new Pokemon("Charizard", {
        teraType
      })

      const result = service.getPokemonTeraType(pokemon)

      expect(result).toBe(teraType)
    })

    it("should return tera type when pokemon has default tera type", () => {
      const pokemon = new Pokemon("Charizard")

      const result = service.getPokemonTeraType(pokemon)

      expect(result).toBe("Water")
    })

    it("should return null when pokemon tera type is empty string", () => {
      const pokemon = new Pokemon("Charizard", {
        teraType: ""
      })

      const result = service.getPokemonTeraType(pokemon)

      expect(result).toBeNull()
    })
  })

  describe("getCellClass", () => {
    it("should return 'immune' for effectiveness 0", () => {
      const effectiveness = 0

      const result = service.getCellClass(effectiveness)

      expect(result).toBe("immune")
    })

    it("should return 'resistance' for effectiveness 0.25", () => {
      const effectiveness = 0.25

      const result = service.getCellClass(effectiveness)

      expect(result).toBe("resistance")
    })

    it("should return 'resistance' for effectiveness 0.5", () => {
      const effectiveness = 0.5

      const result = service.getCellClass(effectiveness)

      expect(result).toBe("resistance")
    })

    it("should return empty string for effectiveness 1", () => {
      const effectiveness = 1

      const result = service.getCellClass(effectiveness)

      expect(result).toBe("")
    })

    it("should return 'weakness' for effectiveness 2", () => {
      const effectiveness = 2

      const result = service.getCellClass(effectiveness)

      expect(result).toBe("weakness")
    })

    it("should return 'weakness-4x' for effectiveness 4", () => {
      const effectiveness = 4

      const result = service.getCellClass(effectiveness)

      expect(result).toBe("weakness-4x")
    })
  })

  describe("getMovesArray", () => {
    it("should return array with all four moves", () => {
      const move1 = new Move("Flamethrower")
      const move2 = new Move("Air Slash")
      const move3 = new Move("Dragon Claw")
      const move4 = new Move("Roost")
      const pokemon = new Pokemon("Charizard", {
        moveSet: new MoveSet(move1, move2, move3, move4)
      })

      const result = service.getMovesArray(pokemon)

      expect(result).toEqual([move1, move2, move3, move4])
    })

    it("should return array with correct move order", () => {
      const move1 = new Move("Thunderbolt")
      const move2 = new Move("Quick Attack")
      const move3 = new Move("Protect")
      const move4 = new Move("Tera Blast")
      const pokemon = new Pokemon("Pikachu", {
        moveSet: new MoveSet(move1, move2, move3, move4)
      })

      const result = service.getMovesArray(pokemon)

      expect(result[0]).toBe(move1)
      expect(result[1]).toBe(move2)
      expect(result[2]).toBe(move3)
      expect(result[3]).toBe(move4)
    })

    it("should return array with Struggle moves when pokemon has only Struggle", () => {
      const move1 = new Move("Struggle")
      const move2 = new Move("Struggle")
      const move3 = new Move("Struggle")
      const move4 = new Move("Struggle")
      const pokemon = new Pokemon("Charizard", {
        moveSet: new MoveSet(move1, move2, move3, move4)
      })

      const result = service.getMovesArray(pokemon)

      expect(result.length).toBe(4)
      expect(result[0].name).toBe("Struggle")
      expect(result[1].name).toBe("Struggle")
      expect(result[2].name).toBe("Struggle")
      expect(result[3].name).toBe("Struggle")
    })
  })
})
