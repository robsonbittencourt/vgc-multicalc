import { computed, effect } from "@angular/core"
import { initialCalculatorState } from "@data/store/utils/initial-calculator-state"
import { pokemonToState, stateToPokemon, stateToTargets, stateToTeam, stateToTeams, targetToState, teamToState } from "@data/store/utils/state-mapper"
import { buildUserData } from "@data/store/utils/user-data-mapper"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Team } from "@lib/model/team"
import { MovePosition, Stats } from "@lib/types"
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"

export type MoveState = {
  name: string
  alliesFainted?: string
  hits?: string
}

export type PokemonState = {
  id: string
  name: string
  nature: string
  item: string
  status: string
  ability: string
  abilityOn: boolean
  commanderActive: boolean
  teraType: string
  teraTypeActive: boolean
  activeMove: string
  moveSet: MoveState[]
  boosts: Stats
  evs: Partial<Stats>
  ivs: Partial<Stats>
  hpPercentage: number
}

export type TeamMemberState = {
  active: boolean
  pokemon: PokemonState
}

export type TeamState = {
  id: string
  active: boolean
  name: string
  teamMembers: TeamMemberState[]
}

export type TargetState = {
  active: boolean
  pokemon: PokemonState
}

export type CalculatorState = {
  _updateLocalStorage: boolean
  _speedCalcPokemonState: PokemonState
  _leftPokemonState: PokemonState
  _rightPokemonState: PokemonState
  secondAttackerId: string
  _teamsState: TeamState[]
  _targetsState: TargetState[]
}

export const CalculatorStore = signalStore(
  { providedIn: "root" },
  withState(initialCalculatorState),

  withComputed(state => ({
    speedCalcPokemon: computed(() => stateToPokemon(state._speedCalcPokemonState())),
    leftPokemon: computed(() => stateToPokemon(state._leftPokemonState())),
    rightPokemon: computed(() => stateToPokemon(state._rightPokemonState())),
    team: computed(() => stateToTeam(state._teamsState().find(t => t.active)!)),
    teams: computed(() => stateToTeams(state._teamsState())),
    targets: computed(() => stateToTargets(state._targetsState()))
  })),

  withComputed(state => ({
    attackerId: computed(() => state.team().teamMembers.find(t => t.active && t.pokemon.id != state.secondAttackerId())!.pokemon.id)
  })),

  withMethods(store => ({
    updateStateLockingLocalStorage(state: CalculatorState) {
      patchState(store, () => ({ ...state, _updateLocalStorage: false }))
    },

    name(pokemonId: string, name: string) {
      this._updatePokemonById(pokemonId, () => ({ name }))
    },

    status(pokemonId: string, status: string) {
      this._updatePokemonById(pokemonId, () => ({ status }))
    },

    item(pokemonId: string, item: string) {
      this._updatePokemonById(pokemonId, () => ({ item }))
    },

    nature(pokemonId: string, nature: string) {
      this._updatePokemonById(pokemonId, () => ({ nature }))
    },

    ability(pokemonId: string, ability: string) {
      this._updatePokemonById(pokemonId, () => ({ ability }))
    },

    abilityOn(pokemonId: string, abilityOn: boolean) {
      this._updatePokemonById(pokemonId, () => ({ abilityOn }))
    },

    commanderActive(pokemonId: string, commanderActive: boolean) {
      this._updatePokemonById(pokemonId, () => ({ commanderActive }))
    },

    teraType(pokemonId: string, teraType: string) {
      this._updatePokemonById(pokemonId, () => ({ teraType }))
    },

    teraTypeActive(pokemonId: string, teraTypeActive: boolean) {
      const pokemon = this.findPokemonById(pokemonId)

      if (pokemon.isTerapagos) return

      if (pokemon.isOgerpon) return this._updateOgerponTeraAndAbility(pokemon, teraTypeActive)

      this._updatePokemonById(pokemonId, () => ({ teraTypeActive }))
    },

    _updateOgerponTeraAndAbility(pokemon: Pokemon, teraTypeActive: boolean) {
      const ability = this._getOgerponAbility(pokemon.name, teraTypeActive)
      this._updatePokemonById(pokemon.id, () => ({ teraTypeActive, ability }))
    },

    _getOgerponAbility(name: string, teraTypeActive: boolean): string {
      const abilitiesMap: Record<string, { active: string; inactive: string }> = {
        "Ogerpon-Wellspring": { active: "Embody Aspect (Wellspring)", inactive: "Water Absorb" },
        "Ogerpon-Hearthflame": { active: "Embody Aspect (Hearthflame)", inactive: "Mold Breaker" },
        "Ogerpon-Cornerstone": { active: "Embody Aspect (Cornerstone)", inactive: "Sturdy" },
        Ogerpon: { active: "Embody Aspect (Teal)", inactive: "Defiant" }
      }

      const { active, inactive } = abilitiesMap[name]
      return teraTypeActive ? active : inactive
    },

    toogleTeraTypeActive(pokemonId: string) {
      const pokemon = this.findPokemonById(pokemonId)
      const teraTypeActive = !pokemon.teraTypeActive

      this.teraTypeActive(pokemonId, teraTypeActive)
    },

    hpPercentage(pokemonId: string, hpPercentage: number) {
      this._updatePokemonById(pokemonId, () => ({ hpPercentage }))
    },

    evs(pokemonId: string, evs: Partial<Stats>) {
      this._updatePokemonById(pokemonId, () => ({ evs }))
    },

    ivs(pokemonId: string, ivs: Partial<Stats>) {
      this._updatePokemonById(pokemonId, () => ({ ivs }))
    },

    boosts(pokemonId: string, boosts: Stats) {
      this._updatePokemonById(pokemonId, () => ({ boosts }))
    },

    moveOne(pokemonId: string, moveOne: string) {
      this._updateMove(pokemonId, moveOne, 0)
    },
    moveTwo(pokemonId: string, moveTwo: string) {
      this._updateMove(pokemonId, moveTwo, 1)
    },
    moveThree(pokemonId: string, moveThree: string) {
      this._updateMove(pokemonId, moveThree, 2)
    },
    moveFour(pokemonId: string, moveFour: string) {
      this._updateMove(pokemonId, moveFour, 3)
    },

    activateMove(pokemonId: string, move: Move) {
      this._updatePokemonById(pokemonId, state => {
        if (!state.moveSet.find(m => m.name == move.name)) {
          throw Error(`Move ${move.name} does not exist in actual Moveset`)
        }

        return { activeMove: move.name }
      })
    },

    activateMoveByPosition(pokemonId: string, position: number) {
      this._updatePokemonById(pokemonId, state => ({ activeMove: state.moveSet[--position].name }))
    },

    alliesFainted(pokemonId: string, alliesFainted: string, position: MovePosition) {
      this._updatePokemonById(pokemonId, state => {
        const moveSet = [...state.moveSet]
        const arrayPosition = position - 1
        moveSet.splice(arrayPosition, 1, { ...moveSet[arrayPosition], alliesFainted: alliesFainted })
        return { moveSet: moveSet }
      })
    },

    hits(pokemonId: string, hits: string, position: MovePosition) {
      this._updatePokemonById(pokemonId, state => {
        const moveSet = [...state.moveSet]
        const arrayPosition = position - 1
        moveSet.splice(arrayPosition, 1, { ...moveSet[arrayPosition], hits: hits })
        return { moveSet: moveSet }
      })
    },

    updateTeamMembersActive(active1: boolean, active2: boolean, active3: boolean, active4: boolean, active5: boolean, active6: boolean) {
      const activeTeamIndex = this._activeTeamIndex()
      const activeStates = [active1, active2, active3, active4, active5, active6]

      patchState(store, state => {
        const updatedTeams = [...state._teamsState]
        const updatedTeamMembers = updatedTeams[activeTeamIndex].teamMembers.map((member, index) => ({
          ...member,
          active: activeStates[index]
        }))

        updatedTeams[activeTeamIndex] = { ...updatedTeams[activeTeamIndex], teamMembers: updatedTeamMembers }

        return { _teamsState: updatedTeams }
      })
    },

    replaceTeam(newTeam: Team, teamId: string) {
      const teamIndex = this._teamIndexWithId(teamId)

      patchState(store, state => {
        const updatedTeams = [...state._teamsState]
        updatedTeams[teamIndex] = teamToState(newTeam)

        return { _teamsState: updatedTeams }
      })
    },

    replaceActiveTeam(newTeam: Team) {
      const activeTeamIndex = this._activeTeamIndex()

      patchState(store, state => {
        const updatedTeams = [...state._teamsState]
        updatedTeams[activeTeamIndex] = teamToState(newTeam)

        return { _teamsState: updatedTeams }
      })
    },

    updateActiveTeamName(teamName: string) {
      const activeTeamIndex = this._activeTeamIndex()

      patchState(store, state => {
        const updatedTeams = [...state._teamsState]

        const updatedTeam = { ...state._teamsState[activeTeamIndex], name: teamName }
        updatedTeams[activeTeamIndex] = updatedTeam

        return { _teamsState: updatedTeams }
      })
    },

    updateTeams(teams: Team[]) {
      const teamsState = teams.map(team => teamToState(team))
      patchState(store, () => ({ _teamsState: teamsState }))
    },

    activateTeam(teamId: string) {
      patchState(store, state => {
        const updatedTeams = state._teamsState.map(t => ({ id: t.id, active: t.id == teamId, name: t.name, teamMembers: t.teamMembers }))
        return { _teamsState: updatedTeams }
      })
    },

    updateSecondAttacker(pokemonId: string) {
      patchState(store, () => ({ secondAttackerId: pokemonId }))
    },

    removeAllTargets() {
      patchState(store, () => ({ _targetsState: [] }))
    },

    updateTargets(targets: Target[]) {
      const targetsState = targets.map(target => targetToState(target))
      patchState(store, () => ({ _targetsState: targetsState }))
    },

    toogleTargetCommander(target: Target) {
      this._updatePokemonById(target.pokemon.id, () => ({ commanderActive: !target.pokemon.commanderActivated }))
    },

    updateTargetAbility(target: Target) {
      this._updatePokemonById(target.pokemon.id, () => ({ ability: target.pokemon.ability }))
    },

    deactivateTargets() {
      patchState(store, () => {
        const deactivatedTargets = store._targetsState().map(target => ({ ...target, active: false }))
        return { _targetsState: deactivatedTargets }
      })
    },

    updateLeftPokemon(pokemon: Pokemon) {
      patchState(store, () => ({ _leftPokemonState: pokemonToState(pokemon) }))
    },

    updateRightPokemon(pokemon: Pokemon) {
      patchState(store, () => ({ _rightPokemonState: pokemonToState(pokemon) }))
    },

    findPokemonById(pokemonId: string): Pokemon {
      return this.findNullablePokemonById(pokemonId)!
    },

    findNullablePokemonById(pokemonId: string): Pokemon | undefined {
      if (store._speedCalcPokemonState().id == pokemonId) return stateToPokemon(store._speedCalcPokemonState())

      if (store._leftPokemonState().id == pokemonId) return stateToPokemon(store._leftPokemonState())

      if (store._rightPokemonState().id == pokemonId) return stateToPokemon(store._rightPokemonState())

      const pokemonFromTeam = store
        ._teamsState()
        .find(team => team.teamMembers.some(member => member.pokemon.id === pokemonId))
        ?.teamMembers.find(member => member.pokemon.id === pokemonId)?.pokemon

      if (pokemonFromTeam) return stateToPokemon(pokemonFromTeam)

      const pokemonFromTargets = store._targetsState().find(target => target.pokemon.id == pokemonId)

      return pokemonFromTargets ? stateToPokemon(pokemonFromTargets.pokemon) : undefined
    },

    buildUserData() {
      return buildUserData(store._speedCalcPokemonState(), store._leftPokemonState(), store._rightPokemonState(), store._teamsState(), store._targetsState())
    },

    _updateMove(pokemonId: string, move: string, index: number) {
      this._updatePokemonById(pokemonId, state => {
        const moveSet = [...state.moveSet]
        moveSet.splice(index, 1, { name: move, alliesFainted: "0", hits: "0" })
        return { activeMove: move, moveSet: moveSet }
      })
    },

    _activeTeamIndex(): number {
      return store._teamsState().findIndex(team => team.active)
    },

    _teamIndexWithId(teamId: string): number {
      return store._teamsState().findIndex(team => team.id == teamId)
    },

    _teamIndexWithPokemon(pokemonId: string): number {
      return store._teamsState().findIndex(team => team.teamMembers.some(member => member.pokemon.id == pokemonId))
    },

    _teamMemberIndexWithPokemon(pokemonId: string, index: number): number {
      const activeTeam = store._teamsState()[index]
      return activeTeam.teamMembers.findIndex(member => member.pokemon.id == pokemonId)
    },

    _activeTargetIndex(pokemonId: string) {
      return store.targets().findIndex(target => target.pokemon.id == pokemonId)
    },

    _updatePokemonById(pokemonId: string, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
      const activeTeamIndex = this._teamIndexWithPokemon(pokemonId)

      if (store._speedCalcPokemonState().id == pokemonId) {
        this._updateSpeedCalcPokemon(updateFn)
      } else if (store._leftPokemonState().id == pokemonId) {
        this._updateLeftPokemon(updateFn)
      } else if (store._rightPokemonState().id == pokemonId) {
        this._updateRightPokemon(updateFn)
      } else if (activeTeamIndex != -1) {
        this._updateTeamMember(pokemonId, activeTeamIndex, updateFn)
      } else {
        this._updateTarget(pokemonId, updateFn)
      }
    },

    _updateSpeedCalcPokemon(updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
      patchState(store, state => {
        const updatedPokemon = { ...state._speedCalcPokemonState, ...updateFn(state._speedCalcPokemonState) }
        return { _speedCalcPokemonState: updatedPokemon }
      })
    },

    _updateLeftPokemon(updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
      patchState(store, state => {
        const updatedPokemon = { ...state._leftPokemonState, ...updateFn(state._leftPokemonState) }
        return { _leftPokemonState: updatedPokemon }
      })
    },

    _updateRightPokemon(updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
      patchState(store, state => {
        const updatedPokemon = { ...state._rightPokemonState, ...updateFn(state._rightPokemonState) }
        return { _rightPokemonState: updatedPokemon }
      })
    },

    _updateTeamMember(pokemonId: string, activeTeamIndex: number, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
      patchState(store, state => {
        const activeTeamMemberIndex = this._teamMemberIndexWithPokemon(pokemonId, activeTeamIndex)
        const updatedTeams = [...state._teamsState]

        const updatedTeamMembers = [...updatedTeams[activeTeamIndex].teamMembers]
        const currentPokemon = updatedTeamMembers[activeTeamMemberIndex].pokemon
        const updatedPokemon = { ...currentPokemon, ...updateFn(currentPokemon) }

        updatedTeamMembers[activeTeamMemberIndex] = { ...updatedTeamMembers[activeTeamMemberIndex], pokemon: updatedPokemon }
        updatedTeams[activeTeamIndex] = { ...updatedTeams[activeTeamIndex], teamMembers: updatedTeamMembers }

        return { _teamsState: updatedTeams }
      })
    },

    _updateTarget(pokemonId: string, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
      patchState(store, state => {
        const activeTargetIndex = this._activeTargetIndex(pokemonId)
        const updatedTargets = [...state._targetsState]
        const currentPokemon = pokemonToState(store.targets()[activeTargetIndex].pokemon)
        const updatedPokemon = { ...currentPokemon, ...updateFn(currentPokemon) }

        updatedTargets[activeTargetIndex] = { ...updatedTargets[activeTargetIndex], pokemon: updatedPokemon }

        return { _targetsState: updatedTargets }
      })
    }
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        if (store._updateLocalStorage()) {
          const userData = store.buildUserData()
          const actualStorage = JSON.parse(localStorage.getItem("userData")!)

          const mergedUserData = { ...actualStorage, ...userData }
          localStorage.setItem("userData", JSON.stringify(mergedUserData))
        }
      })
    }
  })
)
