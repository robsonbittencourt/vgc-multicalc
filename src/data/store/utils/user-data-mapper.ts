import { CalculatorState, PokemonState, TargetState, TeamMemberState, TeamState } from "src/data/store/calculator-store"
import { defaultPokemon } from "src/lib/default-pokemon"
import { v4 as uuidv4 } from 'uuid'
import { stateToPokemon } from "./state-mapper"

export function buildUserData(speedCalcPokemon: PokemonState, leftPokemon: PokemonState, rightPokemon: PokemonState, teams: TeamState[], targets: TargetState[]) {
  return {
    speedCalcPokemon: buildPokemonToUserData(speedCalcPokemon),
    leftPokemon: buildPokemonToUserData(leftPokemon),
    rightPokemon: buildPokemonToUserData(rightPokemon),
    teams: teams.map(team => {
      return {
        "active": team.active,
        "name": team.name,
        "teamMembers": team.teamMembers
          .filter(t => !stateToPokemon(t.pokemon).isDefault())
          .map(t => {
            const pokemon = buildPokemonToUserData(t.pokemon)
            
            return {
              "pokemon": pokemon,
              "active": t.active
            }
          })          
      }    
    }),
    targets: targets
      .filter(t => !stateToPokemon(t.pokemon).isDefault())  
      .map(t => {
        const pokemon = buildPokemonToUserData(t.pokemon)

        return {
          "pokemon": pokemon
        }
      }
    )
  }
}

export function buildState(userData: any): CalculatorState {
  const teams = buildTeamState(userData.teams)
  const attackerId = teams[0].teamMembers[0].pokemon.id

  return {
    _updateLocalStorage: true,
    _speedCalcPokemonState: userData.speedCalcPokemon ? buildPokemonState(userData.speedCalcPokemon) : buildPokemonState(userData.leftPokemon),
    _leftPokemonState: buildPokemonState(userData.leftPokemon),
    _rightPokemonState: buildPokemonState(userData.rightPokemon),
    attackerId: attackerId,
    secondAttackerId: "",
    _teamsState: teams,
    _targetsState: buildTargetsState(userData.targets)
  }
}

function buildPokemonToUserData(pokemon: PokemonState) {
  return {
    "name": pokemon.name,
    "nature": pokemon.nature,
    "item": pokemon.item,
    "ability": pokemon.ability,
    "teraType": pokemon.teraType,
    "teraTypeActive": pokemon.teraTypeActive,
    "evs": pokemon.evs,
    "status": pokemon.status,
    "boosts": pokemon.boosts,
    "activeMove": pokemon.activeMove,
    "abilityOn": pokemon.abilityOn,
    "ivs": pokemon.ivs,
    "moveSet": [
      pokemon.moveSet[0].name,
      pokemon.moveSet[1].name,
      pokemon.moveSet[2].name,
      pokemon.moveSet[3].name
    ]      
  }
}

function buildPokemonState(pokemon: any): PokemonState {
  return {
    id: uuidv4(),
    name: pokemon.name,
    nature: pokemon.nature,
    item: pokemon.item,
    status: pokemon.status,
    ability: pokemon.ability,
    abilityOn: pokemon.abilityOn,
    commanderActive: pokemon.commanderActive,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    activeMove: pokemon.moveSet[0],
    moveSet: [{ name: pokemon.moveSet[0] }, { name: pokemon.moveSet[1] }, { name: pokemon.moveSet[2] }, { name: pokemon.moveSet[3] }],
    boosts: pokemon.boosts,
    evs: pokemon.evs,
    ivs: pokemon.ivs,
    hpPercentage: pokemon.hpPercentage
  }
}

function buildTeamState(teams: any): TeamState[] {
  return teams.map((team: any, index: Number) => {
    return {
      active: index == 0,
      name: team.name,
      teamMembers: buildTeamMemberState(team.teamMembers)
    }
  })
}

function buildTeamMemberState(teamMembers: any): TeamMemberState[] {
  if (teamMembers.length == 0) {
    return [{
      active: true,
      pokemon: buildPokemonState(defaultPokemon())
    }]
  }

  return teamMembers.map((member: any, index: number) => {
    return {
      active: index == 0,
      pokemon: buildPokemonState(member.pokemon)
    }
  })
}

function buildTargetsState(targets: any): TargetState[] {
  return targets.map((target: any) => {
    return {
      active: false,
      pokemon: buildPokemonState(target.pokemon)
    }
  })
}