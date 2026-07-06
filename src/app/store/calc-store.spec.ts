import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CalcStore, PokemonState, TargetState, TeamState } from "./calc-store"
import { Ability, Pokemon, Status, Target, Team, TeamMember } from "@multicalc/model"
import { Regulation } from "@multicalc/types"

describe("Calc Store", () => {
  let store: CalcStore
  const defaultId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [CalcStore, provideZonelessChangeDetection()]
    })

    store = TestBed.inject(CalcStore)
  })

  describe("computed", () => {
    it("should load default left Pokémon", () => {
      expect(store.leftPokemon().name).toBe("Charizard")
    })

    it("should load default right Pokémon", () => {
      expect(store.rightPokemon().name).toBe("Dragonite")
    })

    it("should load Team 1 as default", () => {
      expect(store.team().name).toBe("Team 1")
      expect(store.team().teamMembers.length).toBe(4)
      expect(store.team().teamMembers[0].pokemon.name).toBe("Charizard")
      expect(store.team().teamMembers[1].pokemon.name).toBe("Dragonite")
      expect(store.team().teamMembers[2].pokemon.name).toBe("Venusaur")
      expect(store.team().teamMembers[3].pokemon.name).toBe("Incineroar")
    })

    it("should load Team 1 populated and another 3 empty Teams", () => {
      expect(store.teams().length).toBe(4)

      expect(store.teams()[0].name).toBe("Team 1")
      expect(store.teams()[0].teamMembers.length).toBe(4)

      expect(store.teams()[1].name).toBe("Team 2")
      expect(store.teams()[1].teamMembers.length).toBe(0)

      expect(store.teams()[2].name).toBe("Team 3")
      expect(store.teams()[2].teamMembers.length).toBe(0)

      expect(store.teams()[3].name).toBe("Team 4")
      expect(store.teams()[3].teamMembers.length).toBe(0)
    })

    it("should load some Targets as default", () => {
      expect(store.targets().length).toBe(9)
      expect(store.targets()[0].pokemon.name).toBe("Blastoise")
      expect(store.targets()[1].pokemon.name).toBe("Arcanine")
      expect(store.targets()[2].pokemon.name).toBe("Machamp")
      expect(store.targets()[3].pokemon.name).toBe("Alakazam")
    })

    it("should load active Pokémon from active Team as attacker", () => {
      expect(store.attackerId()).toBe(store.team().activePokemon()!.id)
    })

    it("should load active Pokémon that is not second attacker from active Team as attacker", () => {
      const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu", { id: "123" }), true), new TeamMember(new Pokemon("Raichu", { id: "456" }), true)])

      store.updateTeams([teamX])
      store.updateSecondAttacker("123")

      expect(store.attackerId()).toBe("456")
    })

    it("should load team member at index 0", () => {
      expect(store.teamMember0()?.name).toBe("Charizard")
    })

    it("should load team member at index 1", () => {
      expect(store.teamMember1()?.name).toBe("Dragonite")
    })

    it("should load team member at index 2", () => {
      expect(store.teamMember2()?.name).toBe("Venusaur")
    })

    it("should load team member at index 3", () => {
      expect(store.teamMember3()?.name).toBe("Incineroar")
    })

    it("should return null for team member at index 4 when team has less than 5 members", () => {
      expect(store.teamMember4()).toBeNull()
    })

    it("should return null for team member at index 5 when team has less than 6 members", () => {
      expect(store.teamMember5()).toBeNull()
    })

    it("should load team member at index 4 when team has 5 members", () => {
      const teamX = new Team("123", true, "Team X", [
        new TeamMember(new Pokemon("Pikachu", { id: "1" }), true),
        new TeamMember(new Pokemon("Raichu", { id: "2" }), false),
        new TeamMember(new Pokemon("Clefairy", { id: "3" }), false),
        new TeamMember(new Pokemon("Clefable", { id: "4" }), false),
        new TeamMember(new Pokemon("Jigglypuff", { id: "5" }), false)
      ])

      store.updateTeams([teamX])

      expect(store.teamMember4()?.name).toBe("Jigglypuff")
    })

    it("should load team member at index 5 when team has 6 members", () => {
      const teamX = new Team("123", true, "Team X", [
        new TeamMember(new Pokemon("Pikachu", { id: "1" }), true),
        new TeamMember(new Pokemon("Raichu", { id: "2" }), false),
        new TeamMember(new Pokemon("Clefairy", { id: "3" }), false),
        new TeamMember(new Pokemon("Clefable", { id: "4" }), false),
        new TeamMember(new Pokemon("Jigglypuff", { id: "5" }), false),
        new TeamMember(new Pokemon("Wigglytuff", { id: "6" }), false)
      ])

      store.updateTeams([teamX])

      expect(store.teamMember5()?.name).toBe("Wigglytuff")
    })

    describe("duplicateItemPokemonIds", () => {
      it("should return empty Set when default team has no duplicate items", () => {
        const duplicates = store.duplicateItemPokemonIds()

        expect(duplicates.size).toBe(0)
      })

      it("should mark both Pokémon ids when two team members share the same item", () => {
        const id0 = store.team().teamMembers[0].pokemon.id
        const id1 = store.team().teamMembers[1].pokemon.id

        store.item(id0, "Leftovers")
        store.item(id1, "Leftovers")

        const duplicates = store.duplicateItemPokemonIds()

        expect(duplicates.size).toBe(2)
        expect(duplicates.has(id0)).toBe(true)
        expect(duplicates.has(id1)).toBe(true)
      })

      it("should mark all three Pokémon ids when three team members share the same item", () => {
        const id0 = store.team().teamMembers[0].pokemon.id
        const id1 = store.team().teamMembers[1].pokemon.id
        const id2 = store.team().teamMembers[2].pokemon.id

        store.item(id0, "Leftovers")
        store.item(id1, "Leftovers")
        store.item(id2, "Leftovers")

        const duplicates = store.duplicateItemPokemonIds()

        expect(duplicates.size).toBe(3)
        expect(duplicates.has(id0)).toBe(true)
        expect(duplicates.has(id1)).toBe(true)
        expect(duplicates.has(id2)).toBe(true)
      })

      it("should ignore Pokémon without item even when multiple team members share '(none)'", () => {
        const id0 = store.team().teamMembers[0].pokemon.id
        const id1 = store.team().teamMembers[1].pokemon.id

        store.item(id0, "(none)")
        store.item(id1, "(none)")

        const duplicates = store.duplicateItemPokemonIds()

        expect(duplicates.size).toBe(0)
      })

      it("should compute no duplicates for a team with a single Pokémon", () => {
        store.activateTeam(store.teams()[1].id)
        const addedId = store.addPokemonToTeam("Pikachu")

        store.item(addedId, "Leftovers")

        const duplicates = store.duplicateItemPokemonIds()

        expect(duplicates.size).toBe(0)
      })

      it("should recompute when an item changes and resolves a previous duplicate", () => {
        const id0 = store.team().teamMembers[0].pokemon.id
        const id1 = store.team().teamMembers[1].pokemon.id

        store.item(id0, "Leftovers")
        store.item(id1, "Leftovers")
        expect(store.duplicateItemPokemonIds().size).toBe(2)

        store.item(id1, "Life Orb")

        expect(store.duplicateItemPokemonIds().size).toBe(0)
      })

      it("should not consider Pokémon from inactive teams when computing duplicates", () => {
        const activeId = store.team().teamMembers[0].pokemon.id
        const inactiveTeamId = store.teams()[1].id

        store.item(activeId, "Leftovers")
        store.activateTeam(inactiveTeamId)
        const inactiveMemberId = store.addPokemonToTeam("Pikachu")
        store.item(inactiveMemberId, "Leftovers")
        store.activateTeam(store.teams()[0].id)

        const duplicates = store.duplicateItemPokemonIds()

        expect(duplicates.size).toBe(0)
      })
    })
  })

  describe("methods", () => {
    describe("Update Pokémon", () => {
      it("should update Pokémon name", () => {
        store.name(defaultId, "Pikachu")

        expect(store.team().activePokemon()!.name).toBe("Pikachu")
      })

      it("should update Pokémon status", () => {
        store.status(defaultId, "Burn")

        expect(store.team().activePokemon()!.status).toBe(Status.BURN)
      })

      it("should update Pokémon item", () => {
        store.item(defaultId, "Leftovers")

        expect(store.team().activePokemon()!.item).toBe("Leftovers")
      })

      it("should update Pokémon nature", () => {
        store.nature(defaultId, "Modest")

        expect(store.team().activePokemon()!.nature).toBe("Modest")
      })

      it("should update Pokémon ability", () => {
        store.ability(defaultId, "Intimidade")

        expect(store.team().activePokemon()!.ability.name).toBe("Intimidade")
      })

      it("should update Pokémon ability on", () => {
        store.abilityOn(defaultId, true)

        expect(store.team().activePokemon()!.ability.on).toBe(true)
      })

      it("should update Commander Active to true", () => {
        store.commander(defaultId, false)
        store.commander(defaultId, true)

        expect(store.team().activePokemon()!.commanderActive).toBe(true)
      })

      it("should update Commander Active to false", () => {
        store.commander(defaultId, true)
        store.commander(defaultId, false)

        expect(store.team().activePokemon()!.commanderActive).toBe(false)
      })

      it("should do nothing when try to apply Commander but Pokémon it is not Dondozo", () => {
        store.name(defaultId, "Pikachu")

        store.toggleCommanderActive(defaultId)

        expect(store.team().activePokemon()!.commanderActive).toBe(false)
        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should turn Pokémon Commander to true when it is false and apply +2 boosts", () => {
        store.name(defaultId, "Dondozo")

        store.toggleCommanderActive(defaultId)

        expect(store.team().activePokemon()!.commanderActive).toBe(true)
        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2 })
      })

      it("should turn Pokémon Commander to false when it is true and remove any boosts", () => {
        store.name(defaultId, "Dondozo")
        store.toggleCommanderActive(defaultId)
        expect(store.team().activePokemon()!.commanderActive).toBe(true)

        store.toggleCommanderActive(defaultId)
        expect(store.team().activePokemon()!.commanderActive).toBe(false)
        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should update Pokémon Tera Type", () => {
        store.teraType(defaultId, "Fire")

        expect(store.team().activePokemon()!.teraType).toBe("Fire")
      })

      it("should update Pokémon Tera Type active to true", () => {
        store.teraTypeActive(defaultId, false)

        store.teraTypeActive(defaultId, true)

        expect(store.team().activePokemon()!.teraTypeActive).toBe(true)
      })

      it("should update Pokémon Tera Type active to false", () => {
        store.teraTypeActive(defaultId, true)

        store.teraTypeActive(defaultId, false)

        expect(store.team().activePokemon()!.teraTypeActive).toBe(false)
      })

      it("should update Pokémon Hp Percentage", () => {
        store.hpPercentage(defaultId, 55)

        expect(store.team().activePokemon()!.hpPercentage).toBe(55)
      })

      it("should update Pokémon Evs", () => {
        store.evs(defaultId, { hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 })

        expect(store.team().activePokemon()!.evs).toEqual({ hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 })
      })

      it("should update Pokémon Ivs", () => {
        store.ivs(defaultId, { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })

        expect(store.team().activePokemon()!.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
      })

      it("should update Pokémon Boosts", () => {
        store.boosts(defaultId, { atk: 1, def: 2, spa: -1, spd: -2, spe: -3 })

        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 1, def: 2, spa: -1, spd: -2, spe: -3 })
      })

      it("should increase Pokémon Bonus Boosts", () => {
        store.bonusBoost(defaultId, "atk", +1)

        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
        expect(store.team().activePokemon()!.bonusBoosts).toEqual({ atk: 1 })
      })

      it("should decrease Pokémon Boosts and Bonus only if have a previous bonus", () => {
        store.boosts(defaultId, { atk: 0 })
        store.bonusBoost(defaultId, "atk", 1)

        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
        expect(store.team().activePokemon()!.bonusBoosts).toEqual({ atk: 1 })

        store.bonusBoost(defaultId, "atk", -1)

        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
        expect(store.team().activePokemon()!.bonusBoosts).toEqual({ atk: -1 })
      })

      it("should not increase Pokémon Boosts and Bonus if already maximized", () => {
        store.boosts(defaultId, { atk: 6 })

        store.bonusBoost(defaultId, "atk", +1)

        expect(store.team().activePokemon()!.boosts).toEqual({ atk: 6, def: 0, spa: 0, spd: 0, spe: 0 })
        expect(store.team().activePokemon()!.bonusBoosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should not decrease Pokémon Boosts and Bonus if already minimized", () => {
        store.boosts(defaultId, { atk: -6 })

        store.bonusBoost(defaultId, "atk", -1)

        expect(store.team().activePokemon()!.boosts).toEqual({ atk: -6, def: 0, spa: 0, spd: 0, spe: 0 })
        expect(store.team().activePokemon()!.bonusBoosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should update Pokémon Move one", () => {
        store.moveOne(defaultId, "Earthquake")

        expect(store.team().activePokemon()!.move1Name).toBe("Earthquake")
      })

      it("should update Pokémon Move two", () => {
        store.moveTwo(defaultId, "Earthquake")

        expect(store.team().activePokemon()!.move2Name).toBe("Earthquake")
      })

      it("should update Pokémon Move three", () => {
        store.moveThree(defaultId, "Earthquake")

        expect(store.team().activePokemon()!.move3Name).toBe("Earthquake")
      })

      it("should update Pokémon Move four", () => {
        store.moveFour(defaultId, "Earthquake")

        expect(store.team().activePokemon()!.move4Name).toBe("Earthquake")
      })

      it("should activate Move", () => {
        store.moveOne(defaultId, "Earthquake")
        store.activateMove(defaultId, 0)

        expect(store.team().activePokemon()!.activeMoveName).toBe("Earthquake")
        expect(store.team().activePokemon()!.activeMoveIndex).toBe(0)
      })

      it("should activate moves independently even if they have the same name", () => {
        store.moveOne(defaultId, "Thunderbolt")
        store.moveTwo(defaultId, "Thunderbolt")

        store.activateMove(defaultId, 0)
        expect(store.team().activePokemon()!.activeMoveIndex).toBe(0)
        expect(store.team().activePokemon()!.activeMovePosition).toBe(1)

        store.activateMove(defaultId, 1)
        expect(store.team().activePokemon()!.activeMoveIndex).toBe(1)
        expect(store.team().activePokemon()!.activeMovePosition).toBe(2)
      })

      it("should activate first Move by position", () => {
        store.moveOne(defaultId, "Earthquake")
        store.moveTwo(defaultId, "Rock Slide")
        store.activateMoveByPosition(defaultId, 1)

        expect(store.team().activePokemon()!.activeMoveName).toBe("Earthquake")
      })

      it("should activate second Move by position", () => {
        store.moveOne(defaultId, "Earthquake")
        store.moveTwo(defaultId, "Rock Slide")
        store.activateMoveByPosition(defaultId, 2)

        expect(store.team().activePokemon()!.activeMoveName).toBe("Rock Slide")
      })

      it("should update Allies Fainted", () => {
        store.moveOne(defaultId, "Last Respects")
        store.alliesFainted(defaultId, "3", 1)

        expect(store.team().activePokemon()!.moveSet.move1.alliesFainted).toBe("3")
      })

      it("should update Move Hits", () => {
        store.moveOne(defaultId, "Rage Fist")
        store.hits(defaultId, "2", 1)

        expect(store.team().activePokemon()!.moveSet.move1.hits).toBe("2")
      })
    })

    describe("Update Teams", () => {
      it("should update active Team Members", () => {
        store.updateTeamMembersActive(true, false, true, false, true, false)

        expect(store.team().teamMembers[0].active).toBe(true)
        expect(store.team().teamMembers[1].active).toBe(false)
        expect(store.team().teamMembers[2].active).toBe(true)
        expect(store.team().teamMembers[3].active).toBe(false)
      })

      it("should activate Team Member", () => {
        store.updateTeamMembersActive(true, true, false, false, false, false)

        store.activateTeamMember(2)

        expect(store.team().teamMembers[0].active).toBe(false)
        expect(store.team().teamMembers[1].active).toBe(false)
        expect(store.team().teamMembers[2].active).toBe(true)
        expect(store.team().teamMembers[3].active).toBe(false)
      })

      it("should activate first Team Member if index is negative", () => {
        store.updateTeamMembersActive(true, true, false, false, false, false)

        store.activateTeamMember(-2)

        expect(store.team().teamMembers[0].active).toBe(true)
        expect(store.team().teamMembers[1].active).toBe(false)
        expect(store.team().teamMembers[2].active).toBe(false)
        expect(store.team().teamMembers[3].active).toBe(false)
      })

      it("should activate first Team Member if index is out of bounds", () => {
        store.updateTeamMembersActive(true, true, false, false, false, false)

        store.activateTeamMember(5)

        expect(store.team().teamMembers[0].active).toBe(true)
        expect(store.team().teamMembers[1].active).toBe(false)
        expect(store.team().teamMembers[2].active).toBe(false)
        expect(store.team().teamMembers[3].active).toBe(false)
      })

      it("should add Team", () => {
        const teamX = new Team("123", true, "Team X", [new TeamMember(new Pokemon("Pikachu")), new TeamMember(new Pokemon("Raichu"))])
        const teamY = new Team("456", true, "Team Y", [new TeamMember(new Pokemon("Clefairy")), new TeamMember(new Pokemon("Clefable"))])

        store.updateTeams([teamX])

        store.addTeam(teamY)

        expect(store.teams().length).toBe(2)
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

        expect(store.teams()[0].active).toBe(false)
        expect(store.teams()[1].active).toBe(true)
      })
    })

    describe("Add Pokémon by name", () => {
      it("should add a real Pokémon to the active team with its moveset loaded", () => {
        const initialCount = store.team().teamMembers.length

        const id = store.addPokemonToTeam("Kangaskhan-Mega")

        const result = store.findPokemonById(id)
        expect(store.team().teamMembers.length).toBe(initialCount + 1)
        expect(result.name).toBe("Kangaskhan-Mega")
        expect(result.item).toBe("Kangaskhanite")
        expect(result.ability.name).toBe("Parental Bond")
      })

      it("should activate the added Pokémon when the team has no active member", () => {
        store.updateTeams([new Team("123", true, "Team X", [])])

        const id = store.addPokemonToTeam("Incineroar")

        expect(store.team().activePokemon()!.id).toBe(id)
      })

      it("should keep the current active member when one already exists", () => {
        const previousActiveId = store.team().activePokemon()!.id

        const id = store.addPokemonToTeam("Incineroar")

        expect(store.team().activePokemon()!.id).toBe(previousActiveId)
        expect(store.team().activePokemon()!.id).not.toBe(id)
      })

      it("should add a real Pokémon to the targets with its moveset loaded", () => {
        const initialCount = store.targets().length

        const id = store.addPokemonToTargets("Kangaskhan-Mega")

        const added = store.targets().find(t => t.pokemon.id === id)!
        expect(store.targets().length).toBe(initialCount + 1)
        expect(added.pokemon.name).toBe("Kangaskhan-Mega")
        expect(added.pokemon.item).toBe("Kangaskhanite")
      })
    })

    describe("Update Targets", () => {
      it("should update target meta regulation", () => {
        store.updateTargetMetaRegulation("MB")

        expect(store.targetMetaRegulation()).toBe("MB")
      })

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

    describe("Load Pokémon Info", () => {
      it("should load Pokémon information using it name", () => {
        store.loadPokemonInfo(defaultId, "Kangaskhan-Mega")
        const result = store.findPokemonById(defaultId)

        expect(result.name).toBe("Kangaskhan-Mega")
        expect(result.nature).toBe("Adamant")
        expect(result.item).toBe("Kangaskhanite")
        expect(result.ability.name).toBe("Parental Bond")
        expect(result.teraType).toBe("")
        expect(result.teraTypeActive).toBe(false)
        expect(result.evs).toEqual({ hp: 164, atk: 252, def: 4, spa: 0, spd: 4, spe: 84 })
        expect(result.move1Name).toBe("Double-Edge")
        expect(result.move2Name).toBe("Ice Punch")
        expect(result.move3Name).toBe("Fake Out")
        expect(result.move4Name).toBe("Low Kick")
        expect(result.activeMoveName).toBe("Double-Edge")
      })

      it("should reset previous commander state", () => {
        store.commander(defaultId, true)

        store.loadPokemonInfo(defaultId, "Incineroar")
        const result = store.findPokemonById(defaultId)

        expect(result.commanderActive).toBe(false)
      })

      it("should reset previous hp percentage state", () => {
        store.hpPercentage(defaultId, 50)

        store.loadPokemonInfo(defaultId, "Incineroar")
        const result = store.findPokemonById(defaultId)

        expect(result.hpPercentage).toBe(100)
      })

      it("should set +1 atk when Pokémon is Zacian", () => {
        store.loadPokemonInfo(defaultId, "Zacian")
        const result = store.findPokemonById(defaultId)

        expect(result.boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should set +1 atk when Pokémon is Zacian-Crowned", () => {
        store.loadPokemonInfo(defaultId, "Zacian-Crowned")
        const result = store.findPokemonById(defaultId)

        expect(result.boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should set +1 def when Pokémon is Zamazenta", () => {
        store.loadPokemonInfo(defaultId, "Zamazenta")
        const result = store.findPokemonById(defaultId)

        expect(result.boosts).toEqual({ atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
      })

      it("should set +1 def when Pokémon is Zamazenta-Crowned", () => {
        store.loadPokemonInfo(defaultId, "Zamazenta-Crowned")
        const result = store.findPokemonById(defaultId)

        expect(result.boosts).toEqual({ atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
      })

      it("should reset previous stats boosts state", () => {
        store.boosts(defaultId, { atk: 1, def: 2, spa: 3, spd: 4, spe: 5 })

        store.loadPokemonInfo(defaultId, "Incineroar")
        const result = store.findPokemonById(defaultId)

        expect(result.boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should reset previous higher stat state", () => {
        store.higherStat(defaultId, "atk")

        store.loadPokemonInfo(defaultId, "Flutter Mane")
        const result = store.findPokemonById(defaultId)

        expect(result.higherStat).toBe("spe")
      })

      it("should reset previous custom higher stat state when ability changes", () => {
        store.loadPokemonInfo(defaultId, "Flutter Mane")
        store.higherStat(defaultId, "atk")

        store.ability(defaultId, "Intimidate")
        const result = store.findPokemonById(defaultId)

        expect(result.higherStat).toBe("spe")
      })
    })

    describe("User data", () => {
      beforeEach(() => {
        const mockStorage: Record<string, string | null> = {}

        vi.spyOn(localStorage, "getItem").mockImplementation((key: string): string | null => {
          return mockStorage[key] || null
        })

        vi.spyOn(localStorage, "setItem").mockImplementation((key: string, value: string): void => {
          mockStorage[key] = value
        })
      })

      it("should update state locking local storage", () => {
        const state = {
          updateLocalStorage: true,
          leftPokemonState: pikachuState,
          rightPokemonState: pikachuState,
          secondAttackerId: "123",
          teamsState: teamsState,
          targetsState: targetsState,
          targetMetaRegulation: "H" as Regulation,
          simpleCalcLeftRollLevel: "low",
          simpleCalcRightRollLevel: "medium",
          multiCalcRollLevel: "high",
          manyVsTeamRollLevel: "low",
          useSpsMode: false,
          customSetsState: [],
          activeSetId: null,
          activeSetPokemonId: null,
          activeSetDirty: false,
          isEditingCustomSet: false
        }

        store.updateStateLockingLocalStorage(state)

        expect(store.secondAttackerId()).toBe("123")
        expect(store.updateLocalStorage()).toBe(false)
      })

      it("should build user data using state", () => {
        const result = store.buildUserData()

        expect(result.leftPokemon.name).toBe("Charizard")
        expect(result.rightPokemon.name).toBe("Dragonite")

        expect(result.teams.length).toBe(4)
        expect(result.teams[0].active).toBe(true)
        expect(result.teams[0].name).toBe("Team 1")
        expect(result.teams[0].teamMembers[0].active).toBe(true)
        expect(result.teams[0].teamMembers[0].pokemon.name).toBe("Charizard")
        expect(result.teams[0].teamMembers[1].active).toBe(false)
        expect(result.teams[0].teamMembers[1].pokemon.name).toBe("Dragonite")

        expect(result.targets.length).toBe(9)
        expect(result.targets[0].pokemon.name).toBe("Blastoise")
        expect(result.targets[1].pokemon.name).toBe("Arcanine")
      })

      it("should update local storage when state changes", () => {
        store.name(defaultId, "Pikachu")

        TestBed.tick()

        const actualStorage = JSON.parse(localStorage.getItem("userData")!)
        expect(actualStorage.champions.teams[0].teamMembers[0].pokemon.name).toBe("Pikachu")
      })

      it("should update local storage when state changes mantaining existent data", () => {
        store.name(defaultId, "Pikachu")

        TestBed.tick()

        const actualStorage = JSON.parse(localStorage.getItem("userData")!)
        expect(actualStorage.champions.leftPokemon.name).toBe("Charizard")
      })

      it("should update simpleCalcLeftRollLevel", () => {
        store.updateSimpleCalcLeftRollLevel("low")

        expect(store.simpleCalcLeftRollLevel()).toBe("low")
      })

      it("should update simpleCalcRightRollLevel", () => {
        store.updateSimpleCalcRightRollLevel("medium")

        expect(store.simpleCalcRightRollLevel()).toBe("medium")
      })

      it("should update multiCalcRollLevel", () => {
        store.updateMultiCalcRollLevel("low")

        expect(store.multiCalcRollLevel()).toBe("low")
      })

      it("should update manyVsTeamRollLevel", () => {
        store.updateManyVsTeamRollLevel("medium")

        expect(store.manyVsTeamRollLevel()).toBe("medium")
      })
    })
  })

  describe("custom sets", () => {
    it("should start with no custom sets", () => {
      expect(store.customSetsState().length).toBe(0)
    })

    it("should add a custom set from a slot", () => {
      const pokemonId = store.leftPokemonState().id

      store.addCustomSet(pokemonId, "Sun Sweeper")

      expect(store.customSetsState().length).toBe(1)
      expect(store.customSetsState()[0].setName).toBe("Sun Sweeper")
      expect(store.customSetsState()[0].basePokemonName).toBe(store.leftPokemonState().name)
    })

    it("should not add a set when pokemonId is invalid", () => {
      store.addCustomSet("invalid-id", "Test")

      expect(store.customSetsState().length).toBe(0)
    })

    it("should remove a custom set by id", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "Set A")
      store.addCustomSet(pokemonId, "Set B")
      const idToRemove = store.customSetsState()[0].id

      store.removeCustomSet(idToRemove)

      expect(store.customSetsState().length).toBe(1)
      expect(store.customSetsState()[0].setName).toBe("Set B")
    })

    it("should duplicate a custom set", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "Original")
      const originalId = store.customSetsState()[0].id

      store.duplicateCustomSet(originalId)

      expect(store.customSetsState().length).toBe(2)
      expect(store.customSetsState()[1].setName).toBe("Original (copy)")
      expect(store.customSetsState()[1].id).not.toBe(originalId)
    })

    it("should group custom sets by pokemon name in customSetsByPokemon", () => {
      const leftId = store.leftPokemonState().id
      const rightId = store.rightPokemonState().id
      store.addCustomSet(leftId, "Set 1")
      store.addCustomSet(leftId, "Set 2")
      store.addCustomSet(rightId, "Set 3")

      const map = store.customSetsByPokemon()
      const leftName = store.leftPokemonState().name
      const rightName = store.rightPokemonState().name

      expect(map.get(leftName)?.length).toBe(2)
      expect(map.get(rightName)?.length).toBe(1)
    })

    it("should persist custom sets to localStorage", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "Persisted Set")

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("userData")!)
      expect(actualStorage.champions.customSets.length).toBe(1)
      expect(actualStorage.champions.customSets[0].setName).toBe("Persisted Set")
    })

    it("should clear activeSetId when removing the active set", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "Active Set")
      const setId = store.customSetsState()[0].id
      store.selectCustomSet(pokemonId, setId)

      store.removeCustomSet(setId)

      expect(store.activeSetId()).toBeNull()
    })

    it("should set activeSetId and activeSetPokemonId when selecting a set", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "My Set")
      const setId = store.customSetsState()[0].id

      store.enterCustomSetEditMode(pokemonId, setId)

      expect(store.activeSetId()).toBe(setId)
      expect(store.activeSetPokemonId()).toBe(pokemonId)
    })

    it("should load the set state into the slot when selecting a set", () => {
      const pokemonId = store.leftPokemonState().id
      store.name(pokemonId, "Koraidon")
      store.addCustomSet(pokemonId, "My Set")
      const setId = store.customSetsState()[0].id
      store.name(pokemonId, "Miraidon")

      store.selectCustomSet(pokemonId, setId)

      expect(store.leftPokemonState().name).toBe("Koraidon")
    })

    it("should clear the active set binding via clearActiveSet", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "My Set")
      const setId = store.customSetsState()[0].id
      store.selectCustomSet(pokemonId, setId)

      store.clearActiveSet()

      expect(store.activeSetId()).toBeNull()
      expect(store.activeSetPokemonId()).toBeNull()
    })

    it("should not auto-save edits into any set after clearActiveSet", () => {
      const pokemonId = store.leftPokemonState().id
      store.name(pokemonId, "Koraidon")
      store.addCustomSet(pokemonId, "My Set")
      const setId = store.customSetsState()[0].id
      store.selectCustomSet(pokemonId, setId)
      store.clearActiveSet()

      store.item(pokemonId, "Choice Band")

      TestBed.tick()

      const savedSet = store.customSetsState().find(s => s.id === setId)!
      expect(savedSet.state.item).not.toBe("Choice Band")
    })

    it("should rename the active set via updateActiveSetName", () => {
      const pokemonId = store.leftPokemonState().id
      store.addCustomSet(pokemonId, "My Set")
      const setId = store.customSetsState()[0].id
      store.enterCustomSetEditMode(pokemonId, setId)

      store.updateActiveSetName("Sun Sweeper")

      expect(store.customSetsState().find(s => s.id === setId)!.setName).toBe("Sun Sweeper")
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
  activeMove: 0,
  moveSet: [{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }],
  boosts: { atk: -1, def: -2, spa: 1, spd: 2, spe: 3 },
  bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100,
  automaticAbilityOn: false
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
  activeMove: 0,
  moveSet: [{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }],
  boosts: { atk: 0, def: 0, spa: 1, spd: 2, spe: 3 },
  bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100,
  automaticAbilityOn: false
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
