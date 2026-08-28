import { MoveState, PokemonState, TargetState, TeamState } from "@store/calc-store"
import { Ability, Move, MovePosition, MoveSet, Pokemon, Status, Target, Team, TeamMember } from "@multicalc/model"
import { StatIDExceptHP } from "@data/types"

const MOVE_SLOTS = [0, 1, 2, 3]

export function stateToPokemon(state: PokemonState, isAttacker = false): Pokemon {
  const [moveOne, moveTwo, moveThree, moveFour] = MOVE_SLOTS.map(slot => stateToMove(state.moveSet[slot]))
  const activeMovePosition = (state.activeMove + 1) as MovePosition

  return new Pokemon(state.name, {
    id: state.id,
    nature: state.nature,
    item: state.item,
    status: Status.byDescription(state.status),
    ability: new Ability(state.ability, state.automaticAbilityOn || state.abilityOn),
    commanderActive: state.commanderActive,
    teraType: state.teraType,
    teraTypeActive: state.teraTypeActive,
    moveSet: new MoveSet(moveOne, moveTwo, moveThree, moveFour, activeMovePosition),
    boosts: state.boosts,
    bonusBoosts: state.bonusBoosts,
    evs: state.evs,
    ivs: state.ivs,
    hpPercentage: state.hpPercentage,
    isAttacker: isAttacker,
    higherStat: state.higherStat as StatIDExceptHP
  })
}

function stateToMove(move: MoveState | undefined): Move {
  if (!move) return new Move("")

  return new Move(move.name, { alliesFainted: move.alliesFainted, hits: move.hits, hitsTaken: move.hitsTaken, lastMoveFailed: move.lastMoveFailed, targetDamaged: move.targetDamaged })
}

export function pokemonToState(pokemon: Pokemon): PokemonState {
  return {
    id: pokemon.id,
    name: pokemon.name,
    nature: pokemon.nature,
    item: pokemon.item,
    status: pokemon.status.description,
    ability: pokemon.ability.name,
    abilityOn: pokemon.ability.on,
    commanderActive: pokemon.commanderActive,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    activeMove: pokemon.moveSet.activeMovePosition - 1,
    moveSet: pokemon.moveSet.moves.map(moveToState),
    boosts: pokemon.boosts,
    bonusBoosts: pokemon.bonusBoosts,
    evs: { hp: pokemon.evs.hp!, atk: pokemon.evs.atk!, def: pokemon.evs.def!, spa: pokemon.evs.spa!, spd: pokemon.evs.spd!, spe: pokemon.evs.spe! },
    ivs: { hp: pokemon.ivs.hp!, atk: pokemon.ivs.atk!, def: pokemon.ivs.def!, spa: pokemon.ivs.spa!, spd: pokemon.ivs.spd!, spe: pokemon.ivs.spe! },
    hpPercentage: pokemon.hpPercentage,
    automaticAbilityOn: false,
    higherStat: pokemon.higherStat
  }
}

function moveToState(move: Move): MoveState {
  return { name: move.name, alliesFainted: move.alliesFainted, hits: move.hits, hitsTaken: move.hitsTaken, lastMoveFailed: move.lastMoveFailed, targetDamaged: move.targetDamaged }
}

export function stateToTeam(state: TeamState, isAttacker: boolean): Team {
  const teamMembers = state.teamMembers.map(t => new TeamMember(stateToPokemon(t.pokemon, isAttacker), t.active))
  return new Team(state.id, state.active, state.name, teamMembers)
}

export function stateToTeams(state: TeamState[], isAttacker: boolean): Team[] {
  return state.map(team => stateToTeam(team, isAttacker))
}

export function teamToState(team: Team): TeamState {
  return {
    id: team.id,
    active: team.active,
    name: team.name,
    teamMembers: team.teamMembers.map(member => ({ active: member.active, pokemon: pokemonToState(member.pokemon) }))
  }
}

export function stateToTarget(state: TargetState, isAttacker: boolean): Target {
  const secondPokemon = state.secondPokemon && stateToPokemon(state.secondPokemon, isAttacker)

  return new Target(stateToPokemon(state.pokemon, isAttacker), secondPokemon)
}

export function stateToTargets(state: TargetState[], isAttacker: boolean): Target[] {
  return state.map(target => stateToTarget(target, isAttacker))
}

export function targetToState(target: Target): TargetState {
  const secondPokemon = target.secondPokemon && pokemonToState(target.secondPokemon)

  return {
    pokemon: pokemonToState(target.pokemon),
    secondPokemon: secondPokemon
  }
}
