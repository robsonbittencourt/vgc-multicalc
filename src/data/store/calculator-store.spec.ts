import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CalculatorStore, PokemonState, TargetState, TeamState } from "@data/store/calculator-store"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Target } from "@lib/model/target"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"

describe("Calculator Store", () => {
  let store: CalculatorStore
  const defaultId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })

    store = TestBed.inject(CalculatorStore)
  })

  describe("computed", () => {
    it("should load default Pokémon to Speed Calc", () => {
      expect(store.speedCalcPokemon().name).toBe("Miraidon")
    })

    it("should load default left Pokémon", () => {
      expect(store.leftPokemon().name).toBe("Miraidon")
    })

    it("should load default right Pokémon", () => {
      expect(store.rightPokemon().name).toBe("Koraidon")
    })

    it("should load Team 1 as default", () => {
      expect(store.team().name).toBe("Team 1")
      expect(store.team().teamMembers.length).toBe(4)
      expect(store.team().teamMembers[0].pokemon.name).toBe("Miraidon")
      expect(store.team().teamMembers[1].pokemon.name).toBe("Koraidon")
      expect(store.team().teamMembers[2].pokemon.name).toBe("Rillaboom")
      expect(store.team().teamMembers[3].pokemon.name).toBe("Incineroar")
    })

    it("should load Team 1 and another 3 Teams with only default Pokémon", () => {
      expect(store.teams().length).toBe(4)

      expect(store.teams()[0].name).toBe("Team 1")
      expect(store.teams()[0].teamMembers.length).toBe(4)

      expect(store.teams()[1].name).toBe("Team 2")
      expect(store.teams()[1].teamMembers.length).toBe(1)
      expect(store.teams()[1].teamMembers[0].pokemon.isDefault).toBeTrue()

      expect(store.teams()[2].name).toBe("Team 3")
      expect(store.teams()[2].teamMembers.length).toBe(1)
      expect(store.teams()[2].teamMembers[0].pokemon.isDefault).toBeTrue()

      expect(store.teams()[3].name).toBe("Team 4")
      expect(store.teams()[3].teamMembers.length).toBe(1)
      expect(store.teams()[3].teamMembers[0].pokemon.isDefault).toBeTrue()
    })

    it("should load some Targets as default", () => {
      expect(store.targets().length).toBe(10)
      expect(store.targets()[0].pokemon.name).toBe("Urshifu-Rapid-Strike")
      expect(store.targets()[1].pokemon.name).toBe("Incineroar")
      expect(store.targets()[2].pokemon.name).toBe("Rillaboom")
      expect(store.targets()[3].pokemon.name).toBe("Amoonguss")
    })

    it("should load active Pokémon from active Team as attacker", () => {
      expect(store.attackerId()).toBe(store.team().activePokemon().id)
    })

    it("should load active Pokémon that is not second attacker from active Team as attacker", () => {
      const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu", { id: "123" }), true), new TeamMember(new Pokemon("Raichu", { id: "456" }), true)])

      store.updateTeams([teamX])
      store.updateSecondAttacker("123")

      expect(store.attackerId()).toBe("456")
    })
  })

  describe("methods", () => {
    describe("Update Pokémon", () => {
      it("should update Pokémon name", () => {
        store.name(defaultId, "Pikachu")

        expect(store.team().activePokemon().name).toBe("Pikachu")
      })

      it("should update Pokémon status", () => {
        store.status(defaultId, "Burn")

        expect(store.team().activePokemon().status).toBe(Status.BURN)
      })

      it("should update Pokémon item", () => {
        store.item(defaultId, "Leftovers")

        expect(store.team().activePokemon().item).toBe("Leftovers")
      })

      it("should update Pokémon nature", () => {
        store.nature(defaultId, "Modest")

        expect(store.team().activePokemon().nature).toBe("Modest")
      })

      it("should update Pokémon ability", () => {
        store.ability(defaultId, "Intimidade")

        expect(store.team().activePokemon().ability.name).toBe("Intimidade")
      })

      it("should update Pokémon ability on", () => {
        store.abilityOn(defaultId, true)

        expect(store.team().activePokemon().ability.on).toBeTrue()
      })

      it("should update Commander Active to true", () => {
        store.commander(defaultId, false)
        store.commander(defaultId, true)

        expect(store.team().activePokemon().commanderActive).toBe(true)
      })

      it("should update Commander Active to false", () => {
        store.commander(defaultId, true)
        store.commander(defaultId, false)

        expect(store.team().activePokemon().commanderActive).toBe(false)
      })

      it("should do nothing when try to apply Commander but Pokémon it is not Dondozo", () => {
        store.name(defaultId, "Pikachu")

        store.toogleCommanderActive(defaultId)

        expect(store.team().activePokemon().commanderActive).toBeFalse()
        expect(store.team().activePokemon().boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should turn Pokémon Commander to true when it is false and apply +2 boosts", () => {
        store.name(defaultId, "Dondozo")

        store.toogleCommanderActive(defaultId)

        expect(store.team().activePokemon().commanderActive).toBeTrue()
        expect(store.team().activePokemon().boosts).toEqual({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2 })
      })

      it("should turn Pokémon Commander to false when it is true and remove any boosts", () => {
        store.name(defaultId, "Dondozo")
        store.toogleCommanderActive(defaultId)
        expect(store.team().activePokemon().commanderActive).toBeTrue()

        store.toogleCommanderActive(defaultId)
        expect(store.team().activePokemon().commanderActive).toBeFalse()
        expect(store.team().activePokemon().boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should update Pokémon Tera Type", () => {
        store.teraType(defaultId, "Fire")

        expect(store.team().activePokemon().teraType).toBe("Fire")
      })

      it("should update Pokémon Tera Type active to true", () => {
        store.teraTypeActive(defaultId, false)

        store.teraTypeActive(defaultId, true)

        expect(store.team().activePokemon().teraTypeActive).toBeTrue()
      })

      it("should update Pokémon Tera Type active to false", () => {
        store.teraTypeActive(defaultId, true)

        store.teraTypeActive(defaultId, false)

        expect(store.team().activePokemon().teraTypeActive).toBeFalse()
      })

      it("should activate Tera Type and change ability when Ogerpon terastalyze", () => {
        store.name(defaultId, "Ogerpon")

        store.teraTypeActive(defaultId, true)

        expect(store.team().activePokemon().teraTypeActive).toBeTrue()
        expect(store.team().activePokemon().ability.name).toBe("Embody Aspect (Teal)")
      })

      it("should activate Tera Type and change ability when Ogerpon-Wellspring terastalyze", () => {
        store.name(defaultId, "Ogerpon-Wellspring")

        store.teraTypeActive(defaultId, true)

        expect(store.team().activePokemon().teraTypeActive).toBeTrue()
        expect(store.team().activePokemon().ability.name).toBe("Embody Aspect (Wellspring)")
      })

      it("should activate Tera Type and change ability when Ogerpon-Hearthflame terastalyze", () => {
        store.name(defaultId, "Ogerpon-Hearthflame")

        store.teraTypeActive(defaultId, true)

        expect(store.team().activePokemon().teraTypeActive).toBeTrue()
        expect(store.team().activePokemon().ability.name).toBe("Embody Aspect (Hearthflame)")
      })

      it("should activate Tera Type and change ability when Ogerpon-Cornerstone terastalyze", () => {
        store.name(defaultId, "Ogerpon-Cornerstone")

        store.teraTypeActive(defaultId, true)

        expect(store.team().activePokemon().teraTypeActive).toBeTrue()
        expect(store.team().activePokemon().ability.name).toBe("Embody Aspect (Cornerstone)")
      })

      it("should deactivate Tera Type and change ability when Ogerpon deactivate tera", () => {
        store.name(defaultId, "Ogerpon")

        store.teraTypeActive(defaultId, false)

        expect(store.team().activePokemon().teraTypeActive).toBeFalse()
        expect(store.team().activePokemon().ability.name).toBe("Defiant")
      })

      it("should deactivate Tera Type and change ability when Ogerpon-Wellspring deactivate tera", () => {
        store.name(defaultId, "Ogerpon-Wellspring")

        store.teraTypeActive(defaultId, false)

        expect(store.team().activePokemon().teraTypeActive).toBeFalse()
        expect(store.team().activePokemon().ability.name).toBe("Water Absorb")
      })

      it("should deactivate Tera Type and change ability when Ogerpon-Hearthflame deactivate tera", () => {
        store.name(defaultId, "Ogerpon-Hearthflame")

        store.teraTypeActive(defaultId, false)

        expect(store.team().activePokemon().teraTypeActive).toBeFalse()
        expect(store.team().activePokemon().ability.name).toBe("Mold Breaker")
      })

      it("should deactivate Tera Type and change ability when Ogerpon-Cornerstone deactivate tera", () => {
        store.name(defaultId, "Ogerpon-Cornerstone")

        store.teraTypeActive(defaultId, false)

        expect(store.team().activePokemon().teraTypeActive).toBeFalse()
        expect(store.team().activePokemon().ability.name).toBe("Sturdy")
      })

      it("should Tera Type active change to false when Tera Type is activated and it is toggled", () => {
        store.teraTypeActive(defaultId, true)

        store.toogleTeraTypeActive(defaultId)

        expect(store.team().activePokemon().teraTypeActive).toBeFalse()
      })

      it("should Tera Type active change to true when Tera Type is deactivated and it is toggled", () => {
        store.teraTypeActive(defaultId, false)

        store.toogleTeraTypeActive(defaultId)

        expect(store.team().activePokemon().teraTypeActive).toBeTrue()
      })

      it("should update Pokémon Hp Percentage", () => {
        store.hpPercentage(defaultId, 55)

        expect(store.team().activePokemon().hpPercentage).toBe(55)
      })

      it("should update Pokémon Evs", () => {
        store.evs(defaultId, { hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 })

        expect(store.team().activePokemon().evs).toEqual({ hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 })
      })

      it("should update Pokémon Ivs", () => {
        store.ivs(defaultId, { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })

        expect(store.team().activePokemon().ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
      })

      it("should update Pokémon Boosts", () => {
        store.boosts(defaultId, { atk: 1, def: 2, spa: -1, spd: -2, spe: -3 })

        expect(store.team().activePokemon().boosts).toEqual({ atk: 1, def: 2, spa: -1, spd: -2, spe: -3 })
      })

      it("should update Pokémon Move one", () => {
        store.moveOne(defaultId, "Earthquake")

        expect(store.team().activePokemon().move1Name).toBe("Earthquake")
      })

      it("should update Pokémon Move two", () => {
        store.moveTwo(defaultId, "Earthquake")

        expect(store.team().activePokemon().move2Name).toBe("Earthquake")
      })

      it("should update Pokémon Move three", () => {
        store.moveThree(defaultId, "Earthquake")

        expect(store.team().activePokemon().move3Name).toBe("Earthquake")
      })

      it("should update Pokémon Move four", () => {
        store.moveFour(defaultId, "Earthquake")

        expect(store.team().activePokemon().move4Name).toBe("Earthquake")
      })

      it("should activate Move", () => {
        store.moveOne(defaultId, "Earthquake")
        store.activateMove(defaultId, new Move("Earthquake"))

        expect(store.team().activePokemon().activeMoveName).toBe("Earthquake")
      })

      it("should throw error when try activate Move that does not exist", () => {
        expect(() => store.activateMove(defaultId, new Move("Earthquake"))).toThrow(new Error("Move Earthquake does not exist in actual Moveset"))
      })

      it("should activate first Move by position", () => {
        store.moveOne(defaultId, "Earthquake")
        store.moveTwo(defaultId, "Rock Slide")
        store.activateMoveByPosition(defaultId, 1)

        expect(store.team().activePokemon().activeMoveName).toBe("Earthquake")
      })

      it("should activate second Move by position", () => {
        store.moveOne(defaultId, "Earthquake")
        store.moveTwo(defaultId, "Rock Slide")
        store.activateMoveByPosition(defaultId, 2)

        expect(store.team().activePokemon().activeMoveName).toBe("Rock Slide")
      })

      it("should update Allies Fainted", () => {
        store.moveOne(defaultId, "Last Respects")
        store.alliesFainted(defaultId, "3", 1)

        expect(store.team().activePokemon().moveSet.move1.alliesFainted).toBe("3")
      })

      it("should update Move Hits", () => {
        store.moveOne(defaultId, "Rage Fist")
        store.hits(defaultId, "2", 1)

        expect(store.team().activePokemon().moveSet.move1.hits).toBe("2")
      })
    })

    describe("Update Teams", () => {
      it("should update active Team Members", () => {
        store.updateTeamMembersActive(true, false, true, false, true, false)

        expect(store.team().teamMembers[0].active).toBeTrue()
        expect(store.team().teamMembers[1].active).toBeFalse()
        expect(store.team().teamMembers[2].active).toBeTrue()
        expect(store.team().teamMembers[3].active).toBeFalse()
      })

      it("should activate Team Member", () => {
        store.updateTeamMembersActive(true, true, false, false, false, false)

        store.activateTeamMember(2)

        expect(store.team().teamMembers[0].active).toBeFalse()
        expect(store.team().teamMembers[1].active).toBeFalse()
        expect(store.team().teamMembers[2].active).toBeTrue()
        expect(store.team().teamMembers[3].active).toBeFalse()
      })

      it("should activate first Team Member if index is negative", () => {
        store.updateTeamMembersActive(true, true, false, false, false, false)

        store.activateTeamMember(-2)

        expect(store.team().teamMembers[0].active).toBeTrue()
        expect(store.team().teamMembers[1].active).toBeFalse()
        expect(store.team().teamMembers[2].active).toBeFalse()
        expect(store.team().teamMembers[3].active).toBeFalse()
      })

      it("should activate first Team Member if index is out of bounds", () => {
        store.updateTeamMembersActive(true, true, false, false, false, false)

        store.activateTeamMember(5)

        expect(store.team().teamMembers[0].active).toBeTrue()
        expect(store.team().teamMembers[1].active).toBeFalse()
        expect(store.team().teamMembers[2].active).toBeFalse()
        expect(store.team().teamMembers[3].active).toBeFalse()
      })

      it("should replace Team", () => {
        const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu")), new TeamMember(new Pokemon("Raichu"))])

        const teamY = new Team("456", true, "Team Y", [new TeamMember(new Pokemon("Clefairy")), new TeamMember(new Pokemon("Clefable"))])

        store.updateTeams([teamX])

        store.replaceTeam(teamY, "123")

        expect(store.teams().length).toBe(1)
        expect(store.team().id).toBe("456")
      })

      it("should replace active Team", () => {
        const newTeam = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu")), new TeamMember(new Pokemon("Raichu"))])

        store.replaceActiveTeam(newTeam)

        expect(store.team().name).toBe("Team X")
        expect(store.team().teamMembers[0].pokemon.name).toBe("Pikachu")
        expect(store.team().teamMembers[1].pokemon.name).toBe("Raichu")
      })

      it("should replace active Team", () => {
        const teamName = "New Team With Cool Name"

        store.updateActiveTeamName(teamName)

        expect(store.team().name).toBe(teamName)
      })

      it("should update Teams", () => {
        const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu")), new TeamMember(new Pokemon("Raichu"))])
        const teamY = new Team("456", false, "Team Y", [new TeamMember(new Pokemon("Clefairy")), new TeamMember(new Pokemon("Clefable"))])

        store.updateTeams([teamX, teamY])

        expect(store.teams()[0].name).toBe("Team X")
        expect(store.teams()[0].teamMembers[0].pokemon.name).toBe("Pikachu")
        expect(store.teams()[0].teamMembers[1].pokemon.name).toBe("Raichu")

        expect(store.teams()[1].name).toBe("Team Y")
        expect(store.teams()[1].teamMembers[0].pokemon.name).toBe("Clefairy")
        expect(store.teams()[1].teamMembers[1].pokemon.name).toBe("Clefable")
      })

      it("should activate Team with informed id and deactivate anothers", () => {
        const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu")), new TeamMember(new Pokemon("Raichu"))])
        const teamY = new Team("456", false, "Team Y", [new TeamMember(new Pokemon("Clefairy")), new TeamMember(new Pokemon("Clefable"))])

        store.updateTeams([teamX, teamY])

        store.activateTeam("456")

        expect(store.teams()[0].active).toBeFalse()
        expect(store.teams()[1].active).toBeTrue()
      })
    })

    describe("Update Targets", () => {
      it("should remove all Targets", () => {
        store.removeAllTargets()

        expect(store.targets().length).toBe(0)
      })

      it("should update Targets", () => {
        const targets = [new Target(new Pokemon("Pikachu")), new Target(new Pokemon("Raichu"))]

        store.updateTargets(targets)

        expect(store.targets().length).toBe(2)
        expect(store.targets()[0].pokemon.name).toBe("Pikachu")
        expect(store.targets()[1].pokemon.name).toBe("Raichu")
      })
    })

    describe("Update another Pokémon", () => {
      it("should update second Attacker", () => {
        const pokemonId = "123"

        store.updateSecondAttacker(pokemonId)

        expect(store.secondAttackerId()).toBe(pokemonId)
      })

      it("should update left Pokémon", () => {
        const leftPokemon = new Pokemon("Pikachu")

        store.changeLeftPokemon(leftPokemon)

        expect(store.leftPokemon().name).toBe("Pikachu")
      })

      it("should update right Pokémon", () => {
        const rightPokemon = new Pokemon("Raichu")

        store.changeRightPokemon(rightPokemon)

        expect(store.rightPokemon().name).toBe("Raichu")
      })

      it("should update Speed Calc Pokémon by id", () => {
        const id = store.speedCalcPokemon().id

        store.name(id, "Pikachu")

        expect(store.speedCalcPokemon().name).toBe("Pikachu")
      })

      it("should update left Pokémon by id", () => {
        const id = store.leftPokemon().id

        store.name(id, "Pikachu")

        expect(store.leftPokemon().name).toBe("Pikachu")
      })

      it("should update right Pokémon by id", () => {
        const id = store.rightPokemon().id

        store.name(id, "Pikachu")

        expect(store.rightPokemon().name).toBe("Pikachu")
      })

      it("should update Pokémon in target by id", () => {
        const pokemon = new Pokemon("Pikachu", { ability: new Ability("Lightning Rod") })
        const targets = [new Target(pokemon, new Pokemon("Raichu"))]
        store.updateTargets(targets)

        store.ability(pokemon.id, "Static")

        expect(store.targets()[0].pokemon.ability.name).toBe("Static")
      })

      it("should update second Pokémon in target by id", () => {
        const secondPokemon = new Pokemon("Raichu", { ability: new Ability("Lightning Rod") })
        const targets = [new Target(new Pokemon("Pikachu"), secondPokemon)]
        store.updateTargets(targets)

        store.ability(secondPokemon.id, "Static")

        expect(store.targets()[0].secondPokemon?.ability.name).toBe("Static")
      })
    })

    describe("Find Pokémon by id", () => {
      it("should find Pokémon by id when searched Pokémon is Speed Calc Pokémon", () => {
        const speedCalcPokemonId = store.speedCalcPokemon().id
        const speedCalcPokemonName = store.speedCalcPokemon().name

        const result = store.findPokemonById(speedCalcPokemonId)

        expect(result.name).toBe(speedCalcPokemonName)
      })

      it("should find Pokémon by id when searched Pokémon is left Pokémon", () => {
        const leftPokemonId = store.leftPokemon().id
        const leftPokemonName = store.leftPokemon().name

        const result = store.findPokemonById(leftPokemonId)

        expect(result.name).toBe(leftPokemonName)
      })

      it("should find Pokémon by id when searched Pokémon is right Pokémon", () => {
        const rightPokemonId = store.rightPokemon().id
        const rightPokemonName = store.rightPokemon().name

        const result = store.findPokemonById(rightPokemonId)

        expect(result.name).toBe(rightPokemonName)
      })

      it("should find Pokémon by id when searched Pokémon is in Team 1", () => {
        const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu", { id: "123" })), new TeamMember(new Pokemon("Raichu", { id: "456" }))])

        const teamY = new Team("456", false, "Team Y", [new TeamMember(new Pokemon("Clefairy", { id: "789" })), new TeamMember(new Pokemon("Clefable", { id: "012" }))])

        store.updateTeams([teamX, teamY])

        const result = store.findPokemonById("456")

        expect(result.name).toBe("Raichu")
      })

      it("should find Pokémon by id when searched Pokémon is in Team 2", () => {
        const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu", { id: "123" })), new TeamMember(new Pokemon("Raichu", { id: "456" }))])

        const teamY = new Team("456", false, "Team Y", [new TeamMember(new Pokemon("Clefairy", { id: "789" })), new TeamMember(new Pokemon("Clefable", { id: "012" }))])

        store.updateTeams([teamX, teamY])

        const result = store.findPokemonById("012")

        expect(result.name).toBe("Clefable")
      })

      it("should find Pokémon by id when searched Pokémon is in Targets", () => {
        const targets = [new Target(new Pokemon("Pikachu", { id: "123" })), new Target(new Pokemon("Raichu", { id: "456" }))]
        store.updateTargets(targets)

        const result = store.findPokemonById("456")

        expect(result.name).toBe("Raichu")
      })

      it("should find Pokémon by id when searched Pokémon is in Targets as second attacker", () => {
        const targets = [new Target(new Pokemon("Pikachu", { id: "123" }), new Pokemon("Tyranitar", { id: "789" })), new Target(new Pokemon("Raichu", { id: "456" }))]
        store.updateTargets(targets)

        const result = store.findPokemonById("789")

        expect(result.name).toBe("Tyranitar")
      })

      it("should update Target by id", () => {
        const targets = [new Target(new Pokemon("Pikachu", { id: "123" })), new Target(new Pokemon("Raichu", { id: "456" }))]
        store.updateTargets(targets)

        store.name("456", "Tyranitar")

        const pokemon = store.findPokemonById("456")
        expect(pokemon.name).toBe("Tyranitar")
      })

      it("should return undefind when do not find Pokémon by id", () => {
        const result = store.findNullablePokemonById("123456")

        expect(result).toBeUndefined()
      })
    })

    describe("User data", () => {
      beforeEach(() => {
        const store: Record<string, string | null> = {}

        spyOn(localStorage, "getItem").and.callFake((key: string): string | null => {
          return store[key] || null
        })

        spyOn(localStorage, "setItem").and.callFake((key: string, value: string): void => {
          store[key] = value
        })
      })

      it("should update state locking local storage", () => {
        const state = {
          updateLocalStorage: true,
          speedCalcPokemonState: pikachuState,
          leftPokemonState: pikachuState,
          rightPokemonState: pikachuState,
          secondAttackerId: "123",
          teamsState: teamsState,
          targetsState: targetsState
        }

        store.updateStateLockingLocalStorage(state)

        expect(store.secondAttackerId()).toBe("123")
        expect(store.updateLocalStorage()).toBeFalse()
      })

      it("should build user data using state", () => {
        const result = store.buildUserData()

        expect(result.speedCalcPokemon.name).toBe("Miraidon")
        expect(result.leftPokemon.name).toBe("Miraidon")
        expect(result.rightPokemon.name).toBe("Koraidon")

        expect(result.teams.length).toBe(4)
        expect(result.teams[0].active).toBeTrue()
        expect(result.teams[0].name).toBe("Team 1")
        expect(result.teams[0].teamMembers[0].active).toBeTrue()
        expect(result.teams[0].teamMembers[0].pokemon.name).toBe("Miraidon")
        expect(result.teams[0].teamMembers[1].active).toBeFalse()
        expect(result.teams[0].teamMembers[1].pokemon.name).toBe("Koraidon")

        expect(result.targets.length).toBe(10)
        expect(result.targets[0].pokemon.name).toBe("Urshifu-Rapid-Strike")
        expect(result.targets[1].pokemon.name).toBe("Incineroar")
      })

      it("should update local storage when state changes", () => {
        store.name(defaultId, "Pikachu")

        TestBed.flushEffects()

        const actualStorage = JSON.parse(localStorage.getItem("userData")!)
        expect(actualStorage.teams[0].teamMembers[0].pokemon.name).toBe("Pikachu")
      })

      it("should update local storage when state changes mantaining existent data", () => {
        store.name(defaultId, "Pikachu")

        TestBed.flushEffects()

        const actualStorage = JSON.parse(localStorage.getItem("userData")!)
        expect(actualStorage.leftPokemon.name).toBe("Miraidon")
      })
    })
  })
})

const pikachuState: PokemonState = {
  id: "123",
  name: "Pikachu",
  nature: "Timid",
  item: "Light Ball",
  status: Status.HEALTHY.description,
  ability: "Static",
  abilityOn: false,
  commanderActive: false,
  teraType: "Electric",
  teraTypeActive: true,
  activeMove: "Thunderbolt",
  moveSet: [{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }],
  boosts: { hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100
}

const raichuState: PokemonState = {
  id: "456",
  name: "Raichu",
  nature: "Timid",
  item: "Choice Specs",
  status: Status.HEALTHY.description,
  ability: "Lightning Rod",
  abilityOn: false,
  commanderActive: false,
  teraType: "Electric",
  teraTypeActive: true,
  activeMove: "Thunderbolt",
  moveSet: [{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }],
  boosts: { hp: 0, atk: 0, def: 0, spa: 1, spd: 2, spe: 3 },
  evs: { hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100
}

const teamsState: TeamState[] = [
  {
    id: "123",
    active: true,
    name: "Team 1",
    teamMembers: [{ active: true, pokemon: pikachuState }]
  }
]

const targetsState: TargetState[] = [
  {
    pokemon: pikachuState,
    secondPokemon: raichuState
  }
]
