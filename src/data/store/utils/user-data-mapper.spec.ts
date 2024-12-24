import { CalculatorState, PokemonState, TargetState, TeamState } from "@data/store/calculator-store"
import { buildState, buildUserData } from "@data/store/utils/user-data-mapper"
import { Status } from "@lib/model/status"

describe("User Data Mapper", () => {
  describe("buildUserData", () => {
    it("should build user data for speedCalcPokemon", () => {
      const speedCalcPokemon = pikachuState

      const teams: TeamState[] = [
        {
          id: "123",
          active: true,
          name: "Team 1",
          teamMembers: [{ active: true, pokemon: speedCalcPokemon }]
        }
      ]

      const targets: TargetState[] = [
        {
          active: false,
          pokemon: speedCalcPokemon
        }
      ]

      const result = buildUserData(speedCalcPokemon, speedCalcPokemon, speedCalcPokemon, teams, targets)

      expect(result.speedCalcPokemon.name).toBe("Pikachu")
      expect(result.speedCalcPokemon.nature).toBe("Timid")
      expect(result.speedCalcPokemon.item).toBe("Light Ball")
      expect(result.speedCalcPokemon.status).toBe(Status.HEALTHY.description)
      expect(result.speedCalcPokemon.ability).toBe("Static")
      expect(result.speedCalcPokemon.abilityOn).toBe(false)
      expect(result.speedCalcPokemon.commanderActive).toBe(true)
      expect(result.speedCalcPokemon.teraType).toBe("Electric")
      expect(result.speedCalcPokemon.teraTypeActive).toBe(true)
      expect(result.speedCalcPokemon.activeMove).toBe("Thunderbolt")
      expect(result.speedCalcPokemon.moveSet).toEqual(["Thunderbolt", "Quick Attack", "Volt Tackle", "Iron Tail"])
      expect(result.speedCalcPokemon.boosts).toEqual({ hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.speedCalcPokemon.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.speedCalcPokemon.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })

    it("should build user data for leftPokemon", () => {
      const leftPokemon = pikachuState

      const teams: TeamState[] = [
        {
          id: "123",
          active: true,
          name: "Team 1",
          teamMembers: [{ active: true, pokemon: leftPokemon }]
        }
      ]

      const targets: TargetState[] = [
        {
          active: false,
          pokemon: leftPokemon
        }
      ]

      const result = buildUserData(leftPokemon, leftPokemon, leftPokemon, teams, targets)

      expect(result.leftPokemon.name).toBe("Pikachu")
      expect(result.leftPokemon.nature).toBe("Timid")
      expect(result.leftPokemon.item).toBe("Light Ball")
      expect(result.leftPokemon.status).toBe(Status.HEALTHY.description)
      expect(result.leftPokemon.ability).toBe("Static")
      expect(result.leftPokemon.abilityOn).toBe(false)
      expect(result.leftPokemon.commanderActive).toBe(true)
      expect(result.leftPokemon.teraType).toBe("Electric")
      expect(result.leftPokemon.teraTypeActive).toBe(true)
      expect(result.leftPokemon.activeMove).toBe("Thunderbolt")
      expect(result.leftPokemon.moveSet).toEqual(["Thunderbolt", "Quick Attack", "Volt Tackle", "Iron Tail"])
      expect(result.leftPokemon.boosts).toEqual({ hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.leftPokemon.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.leftPokemon.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })

    it("should build user data for rightPokemon", () => {
      const rightPokemon = pikachuState

      const teams: TeamState[] = [
        {
          id: "123",
          active: true,
          name: "Team 1",
          teamMembers: [{ active: true, pokemon: rightPokemon }]
        }
      ]

      const targets: TargetState[] = [
        {
          active: false,
          pokemon: rightPokemon
        }
      ]

      const result = buildUserData(rightPokemon, rightPokemon, rightPokemon, teams, targets)

      expect(result.rightPokemon.name).toBe("Pikachu")
      expect(result.rightPokemon.nature).toBe("Timid")
      expect(result.rightPokemon.item).toBe("Light Ball")
      expect(result.rightPokemon.status).toBe(Status.HEALTHY.description)
      expect(result.rightPokemon.ability).toBe("Static")
      expect(result.rightPokemon.abilityOn).toBe(false)
      expect(result.rightPokemon.commanderActive).toBe(true)
      expect(result.rightPokemon.teraType).toBe("Electric")
      expect(result.rightPokemon.teraTypeActive).toBe(true)
      expect(result.rightPokemon.activeMove).toBe("Thunderbolt")
      expect(result.rightPokemon.moveSet).toEqual(["Thunderbolt", "Quick Attack", "Volt Tackle", "Iron Tail"])
      expect(result.rightPokemon.boosts).toEqual({ hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.rightPokemon.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.rightPokemon.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })

    it("should build user data for teams", () => {
      const teamPokemonOne = pikachuState
      const teamPokemonTwo = bulbasaurState

      const teams: TeamState[] = [
        {
          id: "123",
          active: true,
          name: "Team 1",
          teamMembers: [
            { active: true, pokemon: teamPokemonOne },
            { active: false, pokemon: teamPokemonTwo }
          ]
        },
        {
          id: "123",
          active: false,
          name: "Team 2",
          teamMembers: [
            { active: true, pokemon: teamPokemonTwo },
            { active: false, pokemon: teamPokemonOne }
          ]
        }
      ]

      const targets: TargetState[] = [
        {
          active: false,
          pokemon: teamPokemonOne
        }
      ]

      const result = buildUserData(teamPokemonOne, teamPokemonOne, teamPokemonOne, teams, targets)

      expect(result.teams[0].active).toBeTrue()
      expect(result.teams[0].name).toBe("Team 1")
      expect(result.teams[0].teamMembers[0].pokemon.name).toBe("Pikachu")
      expect(result.teams[0].teamMembers[1].pokemon.name).toBe("Bulbasaur")

      expect(result.teams[1].active).toBeFalse()
      expect(result.teams[1].name).toBe("Team 2")
      expect(result.teams[1].teamMembers[0].pokemon.name).toBe("Bulbasaur")
      expect(result.teams[1].teamMembers[1].pokemon.name).toBe("Pikachu")
    })

    it("should build user data for targets", () => {
      const targetOne = pikachuState
      const targetTwo = bulbasaurState

      const teams: TeamState[] = [
        {
          id: "123",
          active: true,
          name: "Team 1",
          teamMembers: [{ active: true, pokemon: targetOne }]
        }
      ]

      const targets: TargetState[] = [
        {
          active: true,
          pokemon: targetOne
        },
        {
          active: false,
          pokemon: targetTwo
        }
      ]

      const result = buildUserData(targetOne, targetOne, targetOne, teams, targets)

      expect(result.targets.length).toBe(2)
      expect(result.targets[0].pokemon.name).toBe("Pikachu")
      expect(result.targets[1].pokemon.name).toBe("Bulbasaur")
    })
  })

  describe("buildState", () => {
    it("should build a speedCalcPokemonState in CalculatorState from user data", () => {
      const userData = {
        speedCalcPokemon: pikachuUserData,
        leftPokemon: bulbasaurUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.speedCalcPokemonState.name).toBe("Pikachu")
      expect(result.speedCalcPokemonState.nature).toBe("Timid")
      expect(result.speedCalcPokemonState.item).toBe("Light Ball")
      expect(result.speedCalcPokemonState.status).toBe(Status.HEALTHY.description)
      expect(result.speedCalcPokemonState.ability).toBe("Static")
      expect(result.speedCalcPokemonState.abilityOn).toBe(false)
      expect(result.speedCalcPokemonState.commanderActive).toBe(true)
      expect(result.speedCalcPokemonState.teraType).toBe("Electric")
      expect(result.speedCalcPokemonState.teraTypeActive).toBe(true)
      expect(result.speedCalcPokemonState.activeMove).toBe("Thunderbolt")
      expect(result.speedCalcPokemonState.moveSet).toEqual([{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }])
      expect(result.speedCalcPokemonState.boosts).toEqual({ hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.speedCalcPokemonState.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.speedCalcPokemonState.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })

    it("should build a speedCalcPokemonState in CalculatorState using left Pokémon when speedCalcPokemon is not present in the user data", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.speedCalcPokemonState.name).toBe("Pikachu")
      expect(result.speedCalcPokemonState.nature).toBe("Timid")
      expect(result.speedCalcPokemonState.item).toBe("Light Ball")
      expect(result.speedCalcPokemonState.status).toBe(Status.HEALTHY.description)
      expect(result.speedCalcPokemonState.ability).toBe("Static")
      expect(result.speedCalcPokemonState.abilityOn).toBe(false)
      expect(result.speedCalcPokemonState.commanderActive).toBe(true)
      expect(result.speedCalcPokemonState.teraType).toBe("Electric")
      expect(result.speedCalcPokemonState.teraTypeActive).toBe(true)
      expect(result.speedCalcPokemonState.activeMove).toBe("Thunderbolt")
      expect(result.speedCalcPokemonState.moveSet).toEqual([{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }])
      expect(result.speedCalcPokemonState.boosts).toEqual({ hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.speedCalcPokemonState.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.speedCalcPokemonState.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })

    it("should build a leftPokemonState in CalculatorState from user data", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.leftPokemonState.name).toBe("Pikachu")
      expect(result.leftPokemonState.nature).toBe("Timid")
      expect(result.leftPokemonState.item).toBe("Light Ball")
      expect(result.leftPokemonState.status).toBe(Status.HEALTHY.description)
      expect(result.leftPokemonState.ability).toBe("Static")
      expect(result.leftPokemonState.abilityOn).toBe(false)
      expect(result.leftPokemonState.commanderActive).toBe(true)
      expect(result.leftPokemonState.teraType).toBe("Electric")
      expect(result.leftPokemonState.teraTypeActive).toBe(true)
      expect(result.leftPokemonState.activeMove).toBe("Thunderbolt")
      expect(result.leftPokemonState.moveSet).toEqual([{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }])
      expect(result.leftPokemonState.boosts).toEqual({ hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.leftPokemonState.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.leftPokemonState.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })

    it("should build a rightPokemonState in CalculatorState from user data", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.rightPokemonState.name).toBe("Charmander")
      expect(result.rightPokemonState.nature).toBe("Adamant")
      expect(result.rightPokemonState.item).toBe("Charcoal")
      expect(result.rightPokemonState.status).toBe(Status.PARALYSIS.description)
      expect(result.rightPokemonState.ability).toBe("Blaze")
      expect(result.rightPokemonState.abilityOn).toBe(true)
      expect(result.rightPokemonState.commanderActive).toBe(false)
      expect(result.rightPokemonState.teraType).toBe("Fire")
      expect(result.rightPokemonState.teraTypeActive).toBe(true)
      expect(result.rightPokemonState.activeMove).toBe("Flamethrower")
      expect(result.rightPokemonState.moveSet).toEqual([{ name: "Flamethrower" }, { name: "Scratch" }, { name: "Growl" }, { name: "Ember" }])
      expect(result.rightPokemonState.boosts).toEqual({ hp: 0, atk: 2, def: 3, spa: 4, spd: 5, spe: -2 })
      expect(result.rightPokemonState.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.rightPokemonState.ivs).toEqual({ hp: 0, atk: 1, def: 2, spa: 3, spd: 4, spe: 5 })
    })

    it("should build secondAttackerId in CalculatorState from user data", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.secondAttackerId).toBe("")
    })

    it("should build a Team in CalculatorState from user data", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          },
          {
            name: "Team 2",
            active: false,
            teamMembers: [{ active: true, pokemon: charmanderUserData }]
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.teamsState[0].active).toBeTrue()
      expect(result.teamsState[0].name).toBe("Team 1")
      expect(result.teamsState[0].teamMembers[0].active).toBeTrue()
      expect(result.teamsState[0].teamMembers[0].pokemon.name).toBe("Bulbasaur")

      expect(result.teamsState[1].active).toBeFalse()
      expect(result.teamsState[1].name).toBe("Team 2")
      expect(result.teamsState[1].teamMembers[0].active).toBeTrue()
      expect(result.teamsState[1].teamMembers[0].pokemon.name).toBe("Charmander")
    })

    it("should add default Pokémon on Team when Team does not have any Pokémon", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: []
          }
        ],
        targets: [{ pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.teamsState[0].teamMembers.length).toBe(1)
      expect(result.teamsState[0].teamMembers[0].active).toBeTrue()
      expect(result.teamsState[0].teamMembers[0].pokemon.ability).toBe("Hustle")
    })

    it("should build Targets in CalculatorState from user data", () => {
      const userData = {
        leftPokemon: pikachuUserData,
        rightPokemon: charmanderUserData,
        teams: [
          {
            name: "Team 1",
            active: true,
            teamMembers: [{ active: true, pokemon: bulbasaurUserData }]
          },
          {
            name: "Team 2",
            active: false,
            teamMembers: [{ active: true, pokemon: charmanderUserData }]
          }
        ],
        targets: [{ pokemon: bulbasaurUserData }, { pokemon: charmanderUserData }]
      }

      const result: CalculatorState = buildState(userData)

      expect(result.targetsState.length).toBe(2)
      expect(result.targetsState[0].pokemon.name).toBe("Bulbasaur")
      expect(result.targetsState[1].pokemon.name).toBe("Charmander")
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
  commanderActive: true,
  teraType: "Electric",
  teraTypeActive: true,
  activeMove: "Thunderbolt",
  moveSet: [{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }],
  boosts: { hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100
}

const bulbasaurState: PokemonState = {
  id: "456",
  name: "Bulbasaur",
  nature: "Modest",
  item: "Leftovers",
  status: Status.HEALTHY.description,
  ability: "Overgrow",
  abilityOn: true,
  commanderActive: false,
  teraType: "Grass",
  teraTypeActive: false,
  activeMove: "Vine Whip",
  moveSet: [{ name: "Vine Whip" }, { name: "Razor Leaf" }, { name: "Tackle" }, { name: "Growl" }],
  boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
  hpPercentage: 100
}

const pikachuUserData = {
  name: "Pikachu",
  nature: "Timid",
  item: "Light Ball",
  status: Status.HEALTHY.description,
  ability: "Static",
  abilityOn: false,
  commanderActive: true,
  teraType: "Electric",
  teraTypeActive: true,
  activeMove: "Thunderbolt",
  moveSet: ["Thunderbolt", "Quick Attack", "Volt Tackle", "Iron Tail"],
  boosts: { hp: 0, atk: -1, def: -2, spa: 1, spd: 2, spe: 3 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 }
}

const bulbasaurUserData = {
  id: "456",
  name: "Bulbasaur",
  nature: "Modest",
  item: "Leftovers",
  status: Status.HEALTHY.description,
  ability: "Overgrow",
  abilityOn: true,
  commanderActive: false,
  teraType: "Grass",
  teraTypeActive: false,
  activeMove: "Vine Whip",
  moveSet: ["Vine Whip", "Razor Leaf", "Tackle", "Growl"],
  boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
}

const charmanderUserData = {
  id: "789",
  name: "Charmander",
  nature: "Adamant",
  item: "Charcoal",
  status: Status.PARALYSIS.description,
  ability: "Blaze",
  abilityOn: true,
  commanderActive: false,
  teraType: "Fire",
  teraTypeActive: true,
  activeMove: "Flamethrower",
  moveSet: ["Flamethrower", "Scratch", "Growl", "Ember"],
  boosts: { hp: 0, atk: 2, def: 3, spa: 4, spd: 5, spe: -2 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 0, atk: 1, def: 2, spa: 3, spd: 4, spe: 5 }
}
