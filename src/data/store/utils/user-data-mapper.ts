import { CalculatorState, PokemonState, TargetState, TeamMemberState, TeamState } from "@data/store/calculator-store"
import { SELECT_POKEMON_LABEL } from "@lib/constants"
import { defaultPokemon } from "@lib/default-pokemon"
import { Regulation } from "@lib/types"
import { v4 as uuidv4 } from "uuid"

export function buildUserData(
  speedCalcPokemon: PokemonState,
  leftPokemon: PokemonState,
  rightPokemon: PokemonState,
  teams: TeamState[],
  targets: TargetState[],
  targetMetaRegulation: Regulation | undefined,
  simpleCalcLeftRollLevel: string,
  simpleCalcRightRollLevel: string,
  multiCalcRollLevel: string
) {
  return {
    speedCalcPokemon: buildPokemonToUserData(speedCalcPokemon),
    leftPokemon: buildPokemonToUserData(leftPokemon),
    rightPokemon: buildPokemonToUserData(rightPokemon),
    teams: teams.map(team => {
      return {
        active: team.active,
        name: team.name,
        teamMembers: team.teamMembers
          .filter(t => !isDefaultPokemon(t.pokemon))
          .map(t => {
            const pokemon = buildPokemonToUserData(t.pokemon)

            return {
              pokemon: pokemon,
              active: t.active
            }
          })
      }
    }),
    targets: targets
      .filter(t => !isDefaultPokemon(t.pokemon))
      .map(t => {
        return {
          pokemon: buildPokemonToUserData(t.pokemon),
          secondPokemon: t.secondPokemon && buildPokemonToUserData(t.secondPokemon)
        }
      }),
    targetMetaRegulation: targetMetaRegulation,
    simpleCalcLeftRollLevel: simpleCalcLeftRollLevel,
    simpleCalcRightRollLevel: simpleCalcRightRollLevel,
    multiCalcRollLevel: multiCalcRollLevel
  }
}

export function buildState(userData: any): CalculatorState {
  return {
    updateLocalStorage: true,
    speedCalcPokemonState: userData.speedCalcPokemon ? buildPokemonState(userData.speedCalcPokemon) : buildPokemonState(userData.leftPokemon),
    leftPokemonState: buildPokemonState(userData.leftPokemon),
    rightPokemonState: buildPokemonState(userData.rightPokemon),
    secondAttackerId: "",
    teamsState: buildTeamState(userData.teams),
    targetsState: buildTargetsState(userData.targets),
    targetMetaRegulation: userData.targetMetaRegulation as Regulation,
    simpleCalcLeftRollLevel: userData.simpleCalcLeftRollLevel ?? "high",
    simpleCalcRightRollLevel: userData.simpleCalcRightRollLevel ?? "high",
    multiCalcRollLevel: userData.multiCalcRollLevel ?? "high"
  }
}

function buildPokemonToUserData(pokemon: PokemonState) {
  return {
    name: pokemon.name,
    nature: pokemon.nature,
    item: pokemon.item,
    ability: pokemon.ability,
    abilityOn: pokemon.abilityOn,
    commanderActive: pokemon.commanderActive,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    evs: pokemon.evs,
    status: pokemon.status,
    boosts: pokemon.boosts,
    bonusBoosts: pokemon.bonusBoosts,
    activeMove: pokemon.activeMove,
    ivs: pokemon.ivs,
    moveSet: [pokemon.moveSet[0].name, pokemon.moveSet[1].name, pokemon.moveSet[2].name, pokemon.moveSet[3].name]
  }
}

function buildPokemonState(pokemon: any): PokemonState {
  const isDefault = pokemon.name == SELECT_POKEMON_LABEL
  const ability = isDefault ? pokemon.ability.name : pokemon.ability
  const abilityOn = isDefault ? pokemon.ability.on : pokemon.abilityOn

  return {
    id: uuidv4(),
    name: pokemon.name,
    nature: pokemon.nature,
    item: pokemon.item,
    status: pokemon.status,
    ability: ability,
    abilityOn: abilityOn,
    commanderActive: pokemon.commanderActive,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    activeMove: pokemon.moveSet[0],
    moveSet: [{ name: pokemon.moveSet[0] }, { name: pokemon.moveSet[1] }, { name: pokemon.moveSet[2] }, { name: pokemon.moveSet[3] }],
    boosts: pokemon.boosts,
    bonusBoosts: pokemon.bonusBoosts,
    evs: pokemon.evs,
    ivs: pokemon.ivs,
    hpPercentage: pokemon.hpPercentage,
    automaticAbilityOn: false
  }
}

function buildTeamState(teams: any): TeamState[] {
  return teams.map((team: any, index: number) => {
    return {
      id: uuidv4(),
      active: index == 0,
      name: team.name,
      teamMembers: buildTeamMemberState(team.teamMembers)
    }
  })
}

function buildTeamMemberState(teamMembers: any): TeamMemberState[] {
  if (teamMembers.length == 0) {
    return [
      {
        active: true,
        pokemon: buildPokemonState(defaultPokemon())
      }
    ]
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
      pokemon: buildPokemonState(target.pokemon),
      secondPokemon: target.secondPokemon && buildPokemonState(target.secondPokemon)
    }
  })
}

function isDefaultPokemon(pokemonState: PokemonState) {
  return pokemonState.name == "Select a Pokémon"
}
