import { PokemonState, TargetState, TeamState } from "@data/store/calculator-store"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { MovePosition } from "@lib/types"

export function stateToPokemon(state: PokemonState) {
  const moveOne = new Move(state.moveSet[0].name, { alliesFainted: state.moveSet[0].alliesFainted, hits: state.moveSet[0].hits })
  const moveTwo = new Move(state.moveSet[1].name, { alliesFainted: state.moveSet[1].alliesFainted, hits: state.moveSet[1].hits })
  const moveThree = new Move(state.moveSet[2].name, { alliesFainted: state.moveSet[2].alliesFainted, hits: state.moveSet[2].hits })
  const moveFour = new Move(state.moveSet[3].name, { alliesFainted: state.moveSet[3].alliesFainted, hits: state.moveSet[3].hits })
  const activeMovePosition = ([moveOne, moveTwo, moveThree, moveFour].findIndex(move => move.name == state.activeMove) + 1) as MovePosition

  return new Pokemon(state.name, {
    id: state.id,
    nature: state.nature,
    item: state.item,
    status: state.status,
    ability: state.ability,
    abilityOn: state.abilityOn,
    commanderActive: state.commanderActive,
    teraType: state.teraType,
    teraTypeActive: state.teraTypeActive,
    moveSet: new MoveSet(moveOne, moveTwo, moveThree, moveFour, activeMovePosition),
    boosts: state.boosts,
    evs: state.evs,
    ivs: state.ivs,
    hpPercentage: state.hpPercentage
  })
}

export function pokemonToState(pokemon: Pokemon): PokemonState {
  return {
    id: pokemon.id,
    name: pokemon.name,
    nature: pokemon.nature,
    item: pokemon.item,
    status: pokemon.status,
    ability: pokemon.ability,
    abilityOn: pokemon.abilityOn,
    commanderActive: pokemon.commanderActivated,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    activeMove: pokemon.activeMoveName,
    moveSet: [
      { name: pokemon.move1Name, alliesFainted: pokemon.moveSet.move1.alliesFainted, hits: pokemon.moveSet.move1.hits },
      { name: pokemon.move2Name, alliesFainted: pokemon.moveSet.move2.alliesFainted, hits: pokemon.moveSet.move2.hits },
      { name: pokemon.move3Name, alliesFainted: pokemon.moveSet.move3.alliesFainted, hits: pokemon.moveSet.move3.hits },
      { name: pokemon.move4Name, alliesFainted: pokemon.moveSet.move4.alliesFainted, hits: pokemon.moveSet.move4.hits }
    ],
    boosts: pokemon.boosts,
    evs: { hp: pokemon.evs.hp!, atk: pokemon.evs.atk!, def: pokemon.evs.def!, spa: pokemon.evs.spa!, spd: pokemon.evs.spd!, spe: pokemon.evs.spe! },
    ivs: { hp: pokemon.ivs.hp!, atk: pokemon.ivs.atk!, def: pokemon.ivs.def!, spa: pokemon.ivs.spa!, spd: pokemon.ivs.spd!, spe: pokemon.ivs.spe! },
    hpPercentage: pokemon.hpPercentage
  }
}

export function stateToTeam(state: TeamState): Team {
  const teamMembers = state.teamMembers.map(t => new TeamMember(stateToPokemon(t.pokemon), t.active))
  return new Team(state.id, state.active, state.name, teamMembers)
}

export function stateToTeams(state: TeamState[]): Team[] {
  return state.map(team => stateToTeam(team))
}

export function teamToState(team: Team): TeamState {
  return {
    id: team.id,
    active: team.active,
    name: team.name,
    teamMembers: team.teamMembers.map(member => ({ active: member.active, pokemon: pokemonToState(member.pokemon) }))
  }
}

export function stateToTarget(state: TargetState): Target {
  return new Target(stateToPokemon(state.pokemon), state.active)
}

export function stateToTargets(state: TargetState[]): Target[] {
  return state.map(target => stateToTarget(target))
}

export function targetToState(target: Target): TargetState {
  return {
    active: target.active,
    pokemon: pokemonToState(target.pokemon)
  }
}
