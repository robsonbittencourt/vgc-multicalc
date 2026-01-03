import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { TypeCoverageInsightsService } from "./type-coverage-insights.service"
import { TypeCoverageService } from "./type-coverage.service"
import { TypeEffectivenessService } from "./type-effectiveness.service"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { MoveSet } from "@lib/model/moveset"
import { Move } from "@lib/model/move"

describe("TypeCoverageInsightsService", () => {
  let service: TypeCoverageInsightsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeCoverageInsightsService, TypeCoverageService, TypeEffectivenessService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(TypeCoverageInsightsService)
  })

  describe("with one team", () => {
    describe("offensive coverage", () => {
      it("should return the correct number of super effective pokemon", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Brick Break")) }))
        ])

        const result = service.getTopOffensiveSuperEffective(team, null)

        expect(result[0].pokemon.name).toBe("Pikachu")
        expect(result[0].value).toBe(8)

        expect(result[1].pokemon.name).toBe("Charizard")
        expect(result[1].value).toBe(6)
      })

      it("should return empty array when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getTopOffensiveSuperEffective(team, null)

        expect(result).toEqual([])
      })

      it("should return the correct number of not very effective pokemon", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Light Screen")) }))
        ])

        const result = service.getTopOffensiveNotVeryEffective(team, null)

        expect(result[0].pokemon.name).toBe("Charizard")
        expect(result[0].value).toBe(4)

        expect(result[1].pokemon.name).toBe("Pikachu")
        expect(result[1].value).toBe(3)
      })

      it("should return empty array when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getTopOffensiveNotVeryEffective(team, null)

        expect(result).toEqual([])
      })
    })

    describe("defensive coverage", () => {
      it("should return the correct number of resist pokemon", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Swampert", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Surf"), new Move("Protect"), new Move("Muddy Water")) }))
        ])

        const result = service.getTopDefensiveResist(team, null)

        expect(result[0].pokemon.name).toBe("Steelix")
        expect(result[0].value).toBe(8)

        expect(result[1].pokemon.name).toBe("Swampert")
        expect(result[1].value).toBe(4)
      })

      it("should return empty array when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getTopDefensiveResist(team, null)

        expect(result).toEqual([])
      })

      it("should return the correct number of immune pokemon", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Gengar", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Sludge Bomb"), new Move("Protect"), new Move("Taunt")) })),
          new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect"), new Move("Roost")) }))
        ])

        const result = service.getTopDefensiveImmune(team, null)

        expect(result[0].pokemon.name).toBe("Gengar")
        expect(result[0].value).toBe(2)

        expect(result[1].pokemon.name).toBe("Garchomp")
        expect(result[1].value).toBe(1)
      })

      it("should return the correct number of weak pokemon", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getTopDefensiveWeak(team, null)

        expect(result[0].pokemon.name).toBe("Garchomp")
        expect(result[0].value).toBe(3)

        expect(result[1].pokemon.name).toBe("Pikachu")
        expect(result[1].value).toBe(1)
      })

      it("should return empty array when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getTopDefensiveWeak(team, null)

        expect(result).toEqual([])
      })

      it("should return the correct number of positive defensive pokemon", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getTopDefensivePositive(team, null)

        expect(result[0].pokemon.name).toBe("Steelix")
        expect(result[0].value).toBe(10)

        expect(result[1].pokemon.name).toBe("Pikachu")
        expect(result[1].value).toBe(3)
      })

      it("should return empty array when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getTopDefensivePositive(team, null)

        expect(result).toEqual([])
      })

      it("should return the most weakness type", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Dragonite", { moveSet: new MoveSet(new Move("Dragon Claw"), new Move("Dragon Pulse"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Dratini", { moveSet: new MoveSet(new Move("Dragon Claw"), new Move("Dragon Pulse"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getMostWeaknessType(team)

        expect(result?.type).toBe("Ice")
        expect(result?.count).toBe(3)
      })

      it("should return the null to most weakness type when does not have more then two weakness", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Sableye", { moveSet: new MoveSet(new Move("Light Screen"), new Move("Reflect"), new Move("Protect"), new Move("Rest")) }))])

        const result = service.getMostWeaknessType(team)

        expect(result).toBeNull()
      })

      it("should return null when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getMostWeaknessType(team)

        expect(result).toBeNull()
      })

      it("should return the most resistance type", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Corviknight", { moveSet: new MoveSet(new Move("Iron Head"), new Move("Brave Bird"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Cufant", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Play Rough"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getMostResistanceType(team)

        expect(result?.type).toBe("Normal")
        expect(result?.count).toBe(3)
      })

      it("should return the null to most resistance type when does not have more then two resistance", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) }))])

        const result = service.getMostResistanceType(team)

        expect(result).toBeNull()
      })

      it("should return null when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getMostResistanceType(team)

        expect(result).toBeNull()
      })

      it("should return the most super effective type", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Raichu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Jolteon", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getMostSuperEffectiveType(team)

        expect(result?.type).toBe("Water")
        expect(result?.count).toBe(3)
      })

      it("should return the null to most super effective type when does not have more then two super effective", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) }))])

        const result = service.getMostSuperEffectiveType(team)

        expect(result).toBeNull()
      })

      it("should return null when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const result = service.getMostSuperEffectiveType(team)

        expect(result).toBeNull()
      })

      it("should return the most not very effective type", () => {
        const team = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Arcanine", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Ninetales", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getMostNotVeryEffectiveType(team)

        expect(result?.type).toBe("Fire")
        expect(result?.count).toBe(3)
      })

      it("should return the null to most not very effective type when does not have more then two not very effective", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) }))])

        const result = service.getMostNotVeryEffectiveType(team)

        expect(result).toBeNull()
      })

      it("should return the correct weak count for a pokemon", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Dratini", { moveSet: new MoveSet(new Move("Dragon Claw"), new Move("Dragon Pulse"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = new Pokemon("Dratini", { moveSet: new MoveSet(new Move("Dragon Claw"), new Move("Dragon Pulse"), new Move("Protect"), new Move("Rest")) })
        const result = service.getPokemonWeakCount(pokemon, team, null)

        expect(result).toBe(3)
      })

      it("should return the correct weak count 2x for a pokemon", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) })
        const result = service.getPokemonWeakCount2x(pokemon, team, null)

        expect(result).toBe(2)
      })

      it("should return the correct weak count 4x for a pokemon", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) })
        const result = service.getPokemonWeakCount4x(pokemon, team, null)

        expect(result).toBe(1)
      })

      it("should return 0 when pokemon does not have tera type", () => {
        const pokemon = new Pokemon("Pikachu", {
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")),
          teraType: ""
        })
        const result = service.getPokemonWeaknessesCoveredByTera(pokemon)

        expect(result).toBe(0)
      })

      it("should handle pokemon without type2 when calculating weaknesses covered by tera type", () => {
        const pokemon = new Pokemon("Pikachu", {
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")),
          teraType: "Ground"
        })
        const result = service.getPokemonWeaknessesCoveredByTera(pokemon)

        expect(result).toBe(1)
      })

      it("should return the correct number of weaknesses covered by tera type", () => {
        const pokemon = new Pokemon("Garchomp", {
          moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")),
          teraType: "Steel"
        })
        const result = service.getPokemonWeaknessesCoveredByTera(pokemon)

        expect(result).toBe(3)
      })

      it("should return 0 when tera type does not cover any weaknesses", () => {
        const pokemon = new Pokemon("Garchomp", {
          moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")),
          teraType: "Dragon"
        })

        const result = service.getPokemonWeaknessesCoveredByTera(pokemon)

        expect(result).toBe(0)
      })

      it("should return the correct super effective count 2x for a pokemon", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = team.teamMembers[0].pokemon
        const result = service.getPokemonSuperEffectiveCount2x(pokemon, team, null)

        expect(result).toBe(2)
      })

      it("should return 0 when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) })

        const result = service.getPokemonSuperEffectiveCount2x(pokemon, team, null)

        expect(result).toBe(0)
      })
    })
  })

  describe("with two teams", () => {
    describe("offensive coverage", () => {
      it("should return the correct number of super effective pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Brick Break")) })),
          new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Thunderbolt"), new Move("Protect")) }))
        ])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Blizzard"), new Move("Energy Ball"), new Move("Earth Power"), new Move("Leaf Storm")) })),
          new TeamMember(new Pokemon("Blastoise", { moveSet: new MoveSet(new Move("Water Spout"), new Move("Protect"), new Move("Ice Beam"), new Move("Water Pledge")) }))
        ])

        const result = service.getTopOffensiveSuperEffective(team1, team2)

        expect(result[0].pokemon.name).toBe("Charizard")
        expect(result[0].value).toBe(1)

        expect(result[1].pokemon.name).toBe("Pikachu")
        expect(result[1].value).toBe(2)

        expect(result[2].pokemon.name).toBe("Flutter Mane")
        expect(result[2].value).toBe(1)
      })

      it("should return empty array when secondTeam has no pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost")) }))])

        const team2 = new Team("2", true, "Team 2", [])

        const result = service.getTopOffensiveSuperEffective(team1, team2)

        expect(result).toEqual([])
      })

      it("should return the correct number of not very effective pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Light Screen")) })),
          new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Icy Wind"), new Move("Perish Song"), new Move("Taunt"), new Move("Protect")) }))
        ])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Blizzard"), new Move("Energy Ball"), new Move("Earth Power"), new Move("Leaf Storm")) })),
          new TeamMember(new Pokemon("Blastoise", { moveSet: new MoveSet(new Move("Water Spout"), new Move("Protect"), new Move("Ice Beam"), new Move("Water Pledge")) }))
        ])

        const result = service.getTopOffensiveNotVeryEffective(team1, team2)

        expect(result[0].pokemon.name).toBe("Charizard")
        expect(result[0].value).toBe(1)

        expect(result[1].pokemon.name).toBe("Pikachu")
        expect(result[1].value).toBe(1)

        expect(result[2].pokemon.name).toBe("Flutter Mane")
        expect(result[2].value).toBe(1)
      })

      it("should return empty array when secondTeam has no pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) }))])

        const team2 = new Team("2", true, "Team 2", [])

        const result = service.getTopOffensiveNotVeryEffective(team1, team2)

        expect(result).toEqual([])
      })
    })

    describe("defensive coverage", () => {
      it("should return the correct number of resist pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Chi-Yu", { moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Protect"), new Move("Taunt")) })),
          new TeamMember(new Pokemon("Swampert", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Surf"), new Move("Protect"), new Move("Muddy Water")) })),
          new TeamMember(new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Protect"), new Move("Calm Mind")) }))
        ])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Light Screen")) }))
        ])

        const result = service.getTopDefensiveResist(team1, team2)

        expect(result[0].pokemon.name).toBe("Raging Bolt")
        expect(result[0].value).toBe(2)

        expect(result[1].pokemon.name).toBe("Chi-Yu")
        expect(result[1].value).toBe(1)

        expect(result[2].pokemon.name).toBe("Swampert")
        expect(result[2].value).toBe(1)
      })

      it("should return empty array when secondTeam has no pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Roost")) }))])

        const team2 = new Team("2", true, "Team 2", [])

        const result = service.getTopDefensiveResist(team1, team2)

        expect(result).toEqual([])
      })

      it("should return the correct number of immune pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Protect"), new Move("Taunt")) })),
          new TeamMember(new Pokemon("Zacian-Crowned", { moveSet: new MoveSet(new Move("Behemoth Blade"), new Move("Play Rough"), new Move("Protect"), new Move("Swords Dance")) })),
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Roost")) }))
        ])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Ursaluna", { moveSet: new MoveSet(new Move("Facade"), new Move("Sleep Talk"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Breaking Swipe"), new Move("Dragon Claw"), new Move("Protect"), new Move("Sleep Talk")) })),
          new TeamMember(new Pokemon("Flamigo", { moveSet: new MoveSet(new Move("Close Combat"), new Move("Taunt"), new Move("Protect"), new Move("Roost")) })),
          new TeamMember(new Pokemon("Landorus", { moveSet: new MoveSet(new Move("Earth Power"), new Move("Substitute"), new Move("Protect"), new Move("Block")) }))
        ])

        const result = service.getTopDefensiveImmune(team1, team2)

        expect(result[0].pokemon.name).toBe("Flutter Mane")
        expect(result[0].value).toBe(3)

        expect(result[1].pokemon.name).toBe("Zacian-Crowned")
        expect(result[1].value).toBe(1)

        expect(result[2].pokemon.name).toBe("Charizard")
        expect(result[2].value).toBe(1)
      })

      it("should return the correct number of weak pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move("Wicked Blow"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Politoed", { moveSet: new MoveSet(new Move("Surf"), new Move("Ice Beam"), new Move("Protect"), new Move("Rest")) }))
        ])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Dazzling Gleam"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Blastoise", { moveSet: new MoveSet(new Move("Water Spout"), new Move("Surf"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getTopDefensiveWeak(team1, team2)

        expect(result[0].pokemon.name).toBe("Urshifu")
        expect(result[0].value).toBe(1)

        expect(result[1].pokemon.name).toBe("Charizard")
        expect(result[1].value).toBe(2)

        expect(result[2].pokemon.name).toBe("Politoed")
        expect(result[2].value).toBe(1)
      })

      it("should return empty array when secondTeam has no pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [])

        const result = service.getTopDefensiveWeak(team1, team2)

        expect(result).toEqual([])
      })

      it("should return the correct number of positive defensive pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [
          new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Gengar", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Sludge Bomb"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Swampert", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Surf"), new Move("Protect"), new Move("Rest")) }))
        ])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Charizard", { moveSet: new MoveSet(new Move("Flamethrower"), new Move("Fire Blast"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) }))
        ])

        const result = service.getTopDefensivePositive(team1, team2)

        expect(result[0].pokemon.name).toBe("Swampert")
        expect(result[0].value).toBe(2)

        expect(result[1].pokemon.name).toBe("Steelix")
        expect(result[1].value).toBe(1)
      })

      it("should return empty array when secondTeam has no pokemon", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [])

        const result = service.getTopDefensivePositive(team1, team2)

        expect(result).toEqual([])
      })

      it("should return the correct weak count for a pokemon against a team", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Dazzling Gleam"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Blizzard"), new Move("Ice Beam"), new Move("Protect"), new Move("Rest")) }))
        ])

        const pokemon = team1.teamMembers[0].pokemon
        const result = service.getPokemonWeakCount(pokemon, team1, team2)

        expect(result).toBe(2)
      })

      it("should return the correct weak count 2x for a pokemon against a team", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Dazzling Gleam"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Dragonite", { moveSet: new MoveSet(new Move("Dragon Claw"), new Move("Dragon Pulse"), new Move("Protect"), new Move("Rest")) }))
        ])

        const pokemon = team1.teamMembers[0].pokemon
        const result = service.getPokemonWeakCount2x(pokemon, team1, team2)

        expect(result).toBe(2)
      })

      it("should return the correct weak count 4x for a pokemon against a team", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Blizzard"), new Move("Ice Beam"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = team1.teamMembers[0].pokemon
        const result = service.getPokemonWeakCount4x(pokemon, team1, team2)

        expect(result).toBe(1)
      })

      it("should return the correct super effective count 2x for a pokemon against a team", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunder"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Blastoise", { moveSet: new MoveSet(new Move("Water Spout"), new Move("Surf"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Gyarados", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Surf"), new Move("Protect"), new Move("Rest")) }))
        ])

        const pokemon = team1.teamMembers[0].pokemon
        const result = service.getPokemonSuperEffectiveCount2x(pokemon, team1, team2)

        expect(result).toBe(1)
      })

      it("should return the correct super effective count 4x for a pokemon", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = team.teamMembers[0].pokemon
        const result = service.getPokemonSuperEffectiveCount4x(pokemon, team, null)

        expect(result).toBe(0)
      })

      it("should return the correct super effective count 4x for a pokemon against a team", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Earthquake"), new Move("Earth Power"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [new TeamMember(new Pokemon("Coalossal", { moveSet: new MoveSet(new Move("Flame Charge"), new Move("Heat Crash"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = team1.teamMembers[0].pokemon
        const result = service.getPokemonSuperEffectiveCount4x(pokemon, team1, team2)

        expect(result).toBe(1)
      })

      it("should return the correct resist count for a pokemon", () => {
        const team = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) }))])

        const pokemon = team.teamMembers[0].pokemon
        const result = service.getPokemonResistCount(pokemon, team, null)

        expect(result).toBeGreaterThan(0)
      })

      it("should return 0 when team has no pokemon", () => {
        const team = new Team("1", true, "Team 1", [])
        const pokemon = new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) })
        const result = service.getPokemonResistCount(pokemon, team, null)

        expect(result).toBe(0)
      })

      it("should return the correct resist count for a pokemon against a team", () => {
        const team1 = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Steelix", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Iron Head"), new Move("Protect"), new Move("Rest")) }))])

        const team2 = new Team("2", true, "Team 2", [
          new TeamMember(new Pokemon("Dragonite", { moveSet: new MoveSet(new Move("Dragon Claw"), new Move("Dragon Pulse"), new Move("Protect"), new Move("Rest")) })),
          new TeamMember(new Pokemon("Abomasnow", { moveSet: new MoveSet(new Move("Ice Beam"), new Move("Blizzard"), new Move("Protect"), new Move("Rest")) }))
        ])

        const pokemon = team1.teamMembers[0].pokemon
        const result = service.getPokemonResistCount(pokemon, team1, team2)

        expect(result).toBe(1)
      })
    })
  })
})
