import { computed, effect, Injectable } from "@angular/core"
import { SETDEX_SV } from "@data/movesets"
import { initialCalculatorState } from "@data/store/utils/initial-calculator-state"
import { pokemonToState, stateToPokemon, stateToTargets, stateToTeam, stateToTeams, targetToState, teamToState } from "@data/store/utils/state-mapper"
import { buildUserData } from "@data/store/utils/user-data-mapper"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Team } from "@lib/model/team"
import { MovePosition, Stats } from "@lib/types"
import { patchState, signalStore, withHooks, withState } from "@ngrx/signals"

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
  boosts: Partial<Stats>
  bonusBoosts: Partial<Stats>
  evs: Partial<Stats>
  ivs: Partial<Stats>
  hpPercentage: number
  automaticAbilityOn: boolean
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
  pokemon: PokemonState
  secondPokemon?: PokemonState
}

export type CalculatorState = {
  updateLocalStorage: boolean
  speedCalcPokemonState: PokemonState
  leftPokemonState: PokemonState
  rightPokemonState: PokemonState
  secondAttackerId: string
  teamsState: TeamState[]
  targetsState: TargetState[]
}

@Injectable({ providedIn: "root" })
export class CalculatorStore extends signalStore(
  { protectedState: false },
  withState(initialCalculatorState),
  withHooks(store => ({
    onInit() {
      effect(() => {
        if (store.updateLocalStorage()) {
          const userData = buildUserData(store.speedCalcPokemonState(), store.leftPokemonState(), store.rightPokemonState(), store.teamsState(), store.targetsState())
          const actualStorage = JSON.parse(localStorage.getItem("userData")!)

          const mergedUserData = { ...actualStorage, ...userData }
          localStorage.setItem("userData", JSON.stringify(mergedUserData))
        }
      })
    }
  }))
) {
  readonly speedCalcPokemon = computed(() => stateToPokemon(this.speedCalcPokemonState()))
  readonly leftPokemon = computed(() => stateToPokemon(this.leftPokemonState()))
  readonly rightPokemon = computed(() => stateToPokemon(this.rightPokemonState()))
  readonly team = computed(() => stateToTeam(this.teamsState().find(t => t.active)!))
  readonly teams = computed(() => stateToTeams(this.teamsState()))
  readonly targets = computed(() => stateToTargets(this.targetsState()))
  readonly attackerId = computed(() => this.team().teamMembers.find(t => t.active && t.pokemon.id != this.secondAttackerId())!.pokemon.id)

  updateStateLockingLocalStorage(state: CalculatorState) {
    patchState(this, () => ({ ...state, updateLocalStorage: false }))
  }

  name(pokemonId: string, name: string) {
    this.updatePokemonById(pokemonId, () => ({ name }))
  }

  status(pokemonId: string, status: string) {
    this.updatePokemonById(pokemonId, () => ({ status }))
  }

  item(pokemonId: string, item: string) {
    this.updatePokemonById(pokemonId, () => ({ item }))
  }

  nature(pokemonId: string, nature: string) {
    this.updatePokemonById(pokemonId, () => ({ nature }))
  }

  ability(pokemonId: string, ability: string) {
    this.updatePokemonById(pokemonId, () => ({ ability }))
  }

  abilityOn(pokemonId: string, abilityOn: boolean) {
    this.updatePokemonById(pokemonId, () => ({ abilityOn }))
  }

  toogleProtosynthesis(enabled: boolean) {
    this.enableAllByAbility("Protosynthesis", enabled)
  }

  toogleQuarkDrive(enabled: boolean) {
    this.enableAllByAbility("Quark Drive", enabled)
  }

  private enableAllByAbility(abilityName: string, enabled: boolean) {
    const hasAbility = this.allPokemon()
      .filter(pokemon => pokemon.ability === abilityName)
      .map(pokemon => pokemon.id)

    hasAbility.forEach(id => {
      this.updatePokemonById(id, () => ({ automaticAbilityOn: enabled }))
    })
  }

  private allPokemon(): PokemonState[] {
    const fromTeams = this.teamsState()
      .flatMap(team => team.teamMembers)
      .map(member => member.pokemon)

    const fromTarget = this.targetsState().map(target => target.pokemon)

    let allPokemon = [this.leftPokemonState(), this.rightPokemonState(), this.speedCalcPokemonState()]
    allPokemon = allPokemon.concat(fromTeams)
    allPokemon = allPokemon.concat(fromTarget)

    return allPokemon
  }

  commander(pokemonId: string, commanderActive: boolean) {
    this.updatePokemonById(pokemonId, () => ({ commanderActive }))
  }

  toogleCommanderActive(pokemonId: string) {
    const pokemon = this.findPokemonById(pokemonId)
    if (pokemon.name != "Dondozo") return

    const commanderActive = !pokemon.commanderActive
    const boosts = commanderActive ? { atk: 2, def: 2, spa: 2, spd: 2, spe: 2 } : { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    this.updatePokemonById(pokemonId, () => ({ commanderActive, boosts }))
  }

  teraType(pokemonId: string, teraType: string) {
    this.updatePokemonById(pokemonId, () => ({ teraType }))
  }

  teraTypeActive(pokemonId: string, teraTypeActive: boolean) {
    this.updatePokemonById(pokemonId, () => ({ teraTypeActive }))
  }

  hpPercentage(pokemonId: string, hpPercentage: number) {
    this.updatePokemonById(pokemonId, () => ({ hpPercentage }))
  }

  evs(pokemonId: string, evs: Partial<Stats>) {
    this.updatePokemonById(pokemonId, () => ({ evs }))
  }

  ivs(pokemonId: string, ivs: Partial<Stats>) {
    this.updatePokemonById(pokemonId, () => ({ ivs }))
  }

  boosts(pokemonId: string, boosts: Partial<Stats>) {
    this.updatePokemonById(pokemonId, () => ({ boosts }))
  }

  bonusBoost(pokemonId: string, stat: keyof Stats, value: number) {
    const pokemon = this.findPokemonById(pokemonId)
    let actual = pokemon.boosts[stat]!
    const bonusBoosts: Partial<Stats> = { [stat]: value }
    const hasBonusBoost = pokemon.bonusBoosts[stat] != 0

    if (value > 0 && actual <= 5) {
      actual++
      this.updatePokemonById(pokemonId, () => ({ bonusBoosts }))
    }

    if (value < 0 && actual >= -5 && hasBonusBoost) {
      actual--
      this.updatePokemonById(pokemonId, () => ({ bonusBoosts }))
    }

    this.boosts(pokemonId, { [stat]: actual })
  }

  moveOne(pokemonId: string, moveOne: string) {
    this.updateMove(pokemonId, moveOne, 0)
  }

  moveTwo(pokemonId: string, moveTwo: string) {
    this.updateMove(pokemonId, moveTwo, 1)
  }

  moveThree(pokemonId: string, moveThree: string) {
    this.updateMove(pokemonId, moveThree, 2)
  }

  moveFour(pokemonId: string, moveFour: string) {
    this.updateMove(pokemonId, moveFour, 3)
  }

  activateMove(pokemonId: string, move: Move) {
    this.updatePokemonById(pokemonId, state => {
      if (!state.moveSet.find(m => m.name == move.name)) {
        throw Error(`Move ${move.name} does not exist in actual Moveset`)
      }

      return { activeMove: move.name }
    })
  }

  activateMoveByPosition(pokemonId: string, position: number) {
    const adjustedPosition = Math.min(--position, 3)
    this.updatePokemonById(pokemonId, state => ({ activeMove: state.moveSet[adjustedPosition].name }))
  }

  alliesFainted(pokemonId: string, alliesFainted: string, position: MovePosition) {
    this.updatePokemonById(pokemonId, state => {
      const moveSet = [...state.moveSet]
      const arrayPosition = position - 1
      moveSet.splice(arrayPosition, 1, { ...moveSet[arrayPosition], alliesFainted: alliesFainted })
      return { moveSet: moveSet }
    })
  }

  hits(pokemonId: string, hits: string, position: MovePosition) {
    this.updatePokemonById(pokemonId, state => {
      const moveSet = [...state.moveSet]
      const arrayPosition = position - 1
      moveSet.splice(arrayPosition, 1, { ...moveSet[arrayPosition], hits: hits })
      return { moveSet: moveSet }
    })
  }

  updateTeamMembersActive(active1: boolean, active2: boolean, active3: boolean, active4: boolean, active5: boolean, active6: boolean) {
    const activeTeamIndex = this.activeTeamIndex()
    const activeStates = [active1, active2, active3, active4, active5, active6]

    patchState(this, state => {
      const updatedTeams = [...state.teamsState]
      const updatedTeamMembers = updatedTeams[activeTeamIndex].teamMembers.map((member, index) => ({
        ...member,
        active: activeStates[index]
      }))

      updatedTeams[activeTeamIndex] = { ...updatedTeams[activeTeamIndex], teamMembers: updatedTeamMembers }

      return { teamsState: updatedTeams }
    })
  }

  activateTeamMember(activatedIndex: number) {
    const activeTeamIndex = this.activeTeamIndex()

    patchState(this, state => {
      const updatedTeams = [...state.teamsState]
      const currentTeam = updatedTeams[activeTeamIndex]

      if (activatedIndex < 0 || activatedIndex >= currentTeam.teamMembers.length) {
        activatedIndex = 0
      }

      const updatedTeamMembers = currentTeam.teamMembers.map((member, index) => ({
        ...member,
        active: index === activatedIndex
      }))

      updatedTeams[activeTeamIndex] = { ...currentTeam, teamMembers: updatedTeamMembers }

      return { teamsState: updatedTeams }
    })
  }

  addTeam(newTeam: Team) {
    patchState(this, state => {
      const updatedTeams = [...state.teamsState]
      updatedTeams.push(teamToState(newTeam))

      return { teamsState: updatedTeams }
    })
  }

  replaceTeam(newTeam: Team, teamId: string) {
    const teamIndex = this.teamIndexWithId(teamId)

    patchState(this, state => {
      const updatedTeams = [...state.teamsState]
      updatedTeams[teamIndex] = teamToState(newTeam)

      return { teamsState: updatedTeams }
    })
  }

  replaceActiveTeam(newTeam: Team) {
    const activeTeamIndex = this.activeTeamIndex()

    patchState(this, state => {
      const updatedTeams = [...state.teamsState]
      updatedTeams[activeTeamIndex] = teamToState(newTeam)

      return { teamsState: updatedTeams }
    })
  }

  updateActiveTeamName(teamName: string) {
    const activeTeamIndex = this.activeTeamIndex()

    patchState(this, state => {
      const updatedTeams = [...state.teamsState]

      const updatedTeam = { ...state.teamsState[activeTeamIndex], name: teamName }
      updatedTeams[activeTeamIndex] = updatedTeam

      return { teamsState: updatedTeams }
    })
  }

  updateTeams(teams: Team[]) {
    const teamsState = teams.map(team => teamToState(team))
    patchState(this, () => ({ teamsState: teamsState }))
  }

  activateTeam(teamId: string) {
    patchState(this, state => {
      const updatedTeams = state.teamsState.map(t => ({ id: t.id, active: t.id == teamId, name: t.name, teamMembers: t.teamMembers }))
      return { teamsState: updatedTeams }
    })
  }

  updateSecondAttacker(pokemonId: string) {
    patchState(this, () => ({ secondAttackerId: pokemonId }))
  }

  removeAllTargets() {
    patchState(this, () => ({ targetsState: [] }))
  }

  updateTargets(targets: Target[]) {
    const targetsState = targets.map(target => targetToState(target))
    patchState(this, () => ({ targetsState: targetsState }))
  }

  changeLeftPokemon(pokemon: Pokemon) {
    patchState(this, () => ({ leftPokemonState: pokemonToState(pokemon) }))
  }

  changeRightPokemon(pokemon: Pokemon) {
    patchState(this, () => ({ rightPokemonState: pokemonToState(pokemon) }))
  }

  findPokemonById(pokemonId: string): Pokemon {
    return this.findNullablePokemonById(pokemonId)!
  }

  findNullablePokemonById(pokemonId: string): Pokemon | undefined {
    if (this.speedCalcPokemonState().id == pokemonId) return stateToPokemon(this.speedCalcPokemonState())

    if (this.leftPokemonState().id == pokemonId) return stateToPokemon(this.leftPokemonState())

    if (this.rightPokemonState().id == pokemonId) return stateToPokemon(this.rightPokemonState())

    const pokemonFromTeam = this.teamsState()
      .find(team => team.teamMembers.some(member => member.pokemon.id === pokemonId))
      ?.teamMembers.find(member => member.pokemon.id === pokemonId)?.pokemon

    if (pokemonFromTeam) return stateToPokemon(pokemonFromTeam)

    const pokemonFromTargets = this.targetsState().find(target => target.pokemon.id == pokemonId)

    if (pokemonFromTargets) return stateToPokemon(pokemonFromTargets.pokemon)

    const secondPokemonFromTargets = this.targetsState().find(target => target.secondPokemon?.id == pokemonId)

    return secondPokemonFromTargets ? stateToPokemon(secondPokemonFromTargets.secondPokemon!) : undefined
  }

  buildUserData() {
    return buildUserData(this.speedCalcPokemonState(), this.leftPokemonState(), this.rightPokemonState(), this.teamsState(), this.targetsState())
  }

  updateMove(pokemonId: string, move: string, index: number) {
    this.updatePokemonById(pokemonId, state => {
      const moveSet = [...state.moveSet]
      moveSet.splice(index, 1, { name: move })
      return { activeMove: move, moveSet: moveSet }
    })
  }

  loadPokemonInfo(pokemonId: string, pokemonName: string) {
    const poke = SETDEX_SV[pokemonName]

    if (poke) {
      this.name(pokemonId, pokemonName)
      this.nature(pokemonId, poke?.nature)
      this.item(pokemonId, poke.items[0])
      this.ability(pokemonId, poke.ability)
      this.teraType(pokemonId, poke.teraType)
      this.teraTypeActive(pokemonId, false)
      this.evs(pokemonId, poke.evs)
      this.moveOne(pokemonId, poke.moves[0])
      this.moveTwo(pokemonId, poke.moves[1])
      this.moveThree(pokemonId, poke.moves[2])
      this.moveFour(pokemonId, poke.moves[3])
      this.activateMoveByPosition(pokemonId, 1)
    }

    this.commander(pokemonId, false)
    this.hpPercentage(pokemonId, 100)
    this.adjustBoosts(pokemonId, pokemonName)
  }

  private adjustBoosts(pokemonId: string, pokemonName: string) {
    if (pokemonName.startsWith("Zacian")) {
      this.boosts(pokemonId, { atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
      return
    }

    if (pokemonName.startsWith("Zamazenta")) {
      this.boosts(pokemonId, { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
      return
    }

    this.boosts(pokemonId, { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }

  private activeTeamIndex(): number {
    return this.teamsState().findIndex(team => team.active)
  }

  private teamIndexWithId(teamId: string): number {
    return this.teamsState().findIndex(team => team.id == teamId)
  }

  private teamIndexWithPokemon(pokemonId: string): number {
    return this.teamsState().findIndex(team => team.teamMembers.some(member => member.pokemon.id == pokemonId))
  }

  private teamMemberIndexWithPokemon(pokemonId: string, index: number): number {
    const activeTeam = this.teamsState()[index]
    return activeTeam.teamMembers.findIndex(member => member.pokemon.id == pokemonId)
  }

  private activeTargetIndex(pokemonId: string) {
    return this.targets().findIndex(target => target.pokemon.id == pokemonId || target.secondPokemon?.id == pokemonId)
  }

  private updatePokemonById(pokemonId: string, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
    const activeTeamIndex = this.teamIndexWithPokemon(pokemonId)

    if (this.speedCalcPokemonState().id == pokemonId) {
      this.updateSpeedCalcPokemon(updateFn)
    } else if (this.leftPokemonState().id == pokemonId) {
      this.updateLeftPokemon(updateFn)
    } else if (this.rightPokemonState().id == pokemonId) {
      this.updateRightPokemon(updateFn)
    } else if (activeTeamIndex != -1) {
      this.updateTeamMember(pokemonId, activeTeamIndex, updateFn)
    } else {
      this.updateTarget(pokemonId, updateFn)
    }
  }

  private updateSpeedCalcPokemon(updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
    patchState(this, state => {
      const updatedPokemon = { ...state.speedCalcPokemonState, ...updateFn(state.speedCalcPokemonState) }
      return { speedCalcPokemonState: updatedPokemon }
    })
  }

  private updateLeftPokemon(updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
    patchState(this, state => {
      const updatedPokemon = { ...state.leftPokemonState, ...updateFn(state.leftPokemonState) }
      return { leftPokemonState: updatedPokemon }
    })
  }

  private updateRightPokemon(updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
    patchState(this, state => {
      const updatedPokemon = { ...state.rightPokemonState, ...updateFn(state.rightPokemonState) }
      return { rightPokemonState: updatedPokemon }
    })
  }

  private updateTeamMember(pokemonId: string, activeTeamIndex: number, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
    patchState(this, state => {
      const activeTeamMemberIndex = this.teamMemberIndexWithPokemon(pokemonId, activeTeamIndex)
      const updatedTeams = [...state.teamsState]

      const updatedTeamMembers = [...updatedTeams[activeTeamIndex].teamMembers]
      const currentPokemon = updatedTeamMembers[activeTeamMemberIndex].pokemon
      const updatedPokemon = { ...currentPokemon, ...updateFn(currentPokemon) }

      updatedTeamMembers[activeTeamMemberIndex] = { ...updatedTeamMembers[activeTeamMemberIndex], pokemon: updatedPokemon }
      updatedTeams[activeTeamIndex] = { ...updatedTeams[activeTeamIndex], teamMembers: updatedTeamMembers }

      return { teamsState: updatedTeams }
    })
  }

  private updateTarget(pokemonId: string, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) {
    patchState(this, state => {
      const activeTargetIndex = this.activeTargetIndex(pokemonId)
      const updatedTargets = [...state.targetsState]
      const target = this.targets()[activeTargetIndex]

      const key = target.pokemon.id === pokemonId ? "pokemon" : "secondPokemon"
      const currentPokemon = pokemonToState(target[key]!)

      const updatedPokemon = { ...currentPokemon, ...updateFn(currentPokemon) }
      updatedTargets[activeTargetIndex] = { ...updatedTargets[activeTargetIndex], [key]: updatedPokemon }

      return { targetsState: updatedTargets }
    })
  }
}
