import { computed } from "@angular/core"
import { patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { defaultPokemon } from "src/lib/default-pokemon"
import { Move } from "src/lib/move"
import { MoveSet } from "src/lib/moveset"
import { Pokemon } from "src/lib/pokemon"
import { Target } from "src/lib/target"
import { Team } from "src/lib/team"
import { TeamMember } from "src/lib/team-member"
import { MovePosition, Stats } from "src/lib/types"
import { v4 as uuidv4 } from 'uuid'

export type MenuState = {
  oneVsOneActivated: boolean
  oneVsManyActivated: boolean
  manyVsOneActivated: boolean
  speedCalculatorActivated: boolean
}

export type MoveState = {
  name: string,
  alliesFainted?: string
  hits?: string
}

export type PokemonState = {
  id: string,
  name: string,
  nature: string,
  item: string,
  status: string,
  ability: string,
  abilityOn: boolean,
  commanderActive: boolean,
  teraType: string,
  teraTypeActive: boolean,
  activeMove: string,
  moveSet: MoveState[],
  boosts: Stats,
  evs: Partial<Stats>,
  ivs: Partial<Stats>,
  hpPercentage: number
}

export type TeamMemberState = {
  active: boolean,
  pokemon: PokemonState
}

export type TeamState = {
  active: boolean,
  name: string,
  teamMembers: TeamMemberState[]
}

export type TargetState = {
  active: boolean,
  pokemon: PokemonState
}

type DataState = {
  _menuState: MenuState,
  _leftPokemonState: PokemonState,
  _rightPokemonState: PokemonState,
  attackerId: string,
  secondAttackerId: string,
  _teamsState: TeamState[],
  _targetsState: TargetState[]
}

const initialId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

const initialState: DataState = {
  _menuState: {
    oneVsOneActivated: true,
    oneVsManyActivated: false,
    manyVsOneActivated: false,
    speedCalculatorActivated: false
  },

  _leftPokemonState: { id: uuidv4(), name: "Gholdengo", nature: "Timid", item: "Choice Specs", status: "Healthy", ability: "Good as Gold", abilityOn: false, commanderActive: false, teraType: "Steel", teraTypeActive: false, activeMove: "Make It Rain",
    moveSet: [{ name: "Make It Rain" }, { name: "Shadow Ball" }, { name: "Protect" }, { name: "Nasty Plot" }],
    boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    hpPercentage: 100
  },

  _rightPokemonState: { id: uuidv4(), name: "Rillaboom", nature: "Adamant", item: "Assault Vest", status: "Healthy", ability: "Grassy Surge", abilityOn: false, commanderActive: false, teraType: "Fire", teraTypeActive: false, activeMove: "Wood Hammer",
    moveSet: [{ name: "Wood Hammer" }, { name: "Grassy Glide" }, { name: "U-turn" }, { name: "Fake Out" }],
    boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    evs: { hp: 252, atk: 116, def: 4, spa: 0, spd: 60, spe: 76 },
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    hpPercentage: 100
  },

  attackerId: initialId,
  secondAttackerId: "",
  
  _teamsState: [
    {
      active: true,
      name: "Team 1",
      teamMembers: [
        {
          active: true,
          pokemon: { id: initialId, name: "Gholdengo", nature: "Timid", item: "Choice Specs", status: "Healthy", ability: "Good as Gold", abilityOn: false, commanderActive: false, teraType: "Steel", teraTypeActive: false, activeMove: "Make It Rain",
            moveSet: [{ name: "Make It Rain" }, { name: "Shadow Ball" }, { name: "Protect" }, { name: "Nasty Plot" }],
            boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            hpPercentage: 100
          }
        },
        {
          active: false,
          pokemon: { id: uuidv4(), name: "Rillaboom", nature: "Adamant", item: "Assault Vest", status: "Healthy", ability: "Grassy Surge", abilityOn: false, commanderActive: false, teraType: "Fire", teraTypeActive: false, activeMove: "Wood Hammer",
            moveSet: [{ name: "Wood Hammer" }, { name: "Grassy Glide" }, { name: "U-turn" }, { name: "Fake Out" }],
            boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            evs: { hp: 252, atk: 116, def: 4, spa: 0, spd: 60, spe: 76 },
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            hpPercentage: 100
          }
        },        
        {
          active: false,
          pokemon: { id: uuidv4(), name: "Kingambit", nature: "Adamant", item: "Black Glasses", status: "Healthy", ability: "Defiant", abilityOn: false, commanderActive: false, teraType: "Dark", teraTypeActive: false, activeMove: "Kowtow Cleave",
            moveSet: [{ name: "Kowtow Cleave" }, { name: "Sucker Punch" }, { name: "Swords Dance" }, { name: "Protect" }],
            boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 4, spe: 0 },
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            hpPercentage: 100
          }
        },        
        {
          active: false,
          pokemon: { id: uuidv4(), name: "Sneasler", nature: "Jolly", item: "Focus Sash", status: "Healthy", ability: "Poison Touch", abilityOn: false, commanderActive: false, teraType: "Stellar", teraTypeActive: false, activeMove: "Close Combat",
            moveSet: [{ name: "Close Combat" }, { name: "Dire Claw" }, { name: "Fake Out" }, { name: "Protect" }],
            boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            hpPercentage: 100
          }
        }
      ]
    },
    {
      active: false,
      name: "Team 2",
      teamMembers: [{ active: true, pokemon: defaultPokemon().toState() }]
    },
    {
      active: false,
      name: "Team 3",
      teamMembers: [{ active: true, pokemon: defaultPokemon().toState() }]
    },
    {
      active: false,
      name: "Team 4",
      teamMembers: [{ active: true, pokemon: defaultPokemon().toState() }]
    }
  ],

  _targetsState: [
    {
      active: false,
      pokemon: { id: uuidv4(), name: "Primarina", nature: "Modest", item: "Throat Spray", status: "Healthy", ability: "Liquid Voice", abilityOn: false, commanderActive: false, teraType: "Poison", teraTypeActive: false, activeMove: "Moonblast",
        moveSet: [{ name: "Moonblast" }, { name: "Hyper Voice" }, { name: "Haze" }, { name: "Protect" }],
        boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        evs: { hp: 172, atk: 0, def: 252, spa: 20, spd: 4, spe: 60 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        hpPercentage: 100
      }
    },
    {
      active: false,
      pokemon: { id: uuidv4(), name: "Amoonguss", nature: "Calm", item: "Sitrus Berry", status: "Healthy", ability: "Regenerator", abilityOn: false, commanderActive: false, teraType: "Water", teraTypeActive: false, activeMove: "Spore",
        moveSet: [{ name: "Spore" }, { name: "Rage Powder" }, { name: "Pollen Puff" }, { name: "Protect" }],
        boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        evs: { hp: 236, atk: 0, def: 36, spa: 0, spd: 236, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        hpPercentage: 100
      }
    },        
    {
      active: false,
      pokemon: { id: uuidv4(), name: "Dragonite", nature: "Adamant", item: "Choice Band", status: "Healthy", ability: "Inner Focus", abilityOn: false, commanderActive: false, teraType: "Flying", teraTypeActive: false, activeMove: "Extreme Speed",
        moveSet: [{ name: "Extreme Speed" }, { name: "Tera Blast" }, { name: "Stomping Tantrum" }, { name: "Ice Spinner" }],
        boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        hpPercentage: 100
      }
    },        
    {
      active: false,
      pokemon: { id: uuidv4(), name: "Garchomp", nature: "Jolly", item: "Life Orb", status: "Healthy", ability: "Rough Skin", abilityOn: false, commanderActive: false, teraType: "Steel", teraTypeActive: false, activeMove: "Dragon Claw",
        moveSet: [{ name: "Dragon Claw" }, { name: "Earthquake" }, { name: "Stomping Tantrum" }, { name: "Protect" }],
        boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        hpPercentage: 100
      }
    }
  ]
}


export const DataStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  
  withComputed(({ _teamsState: teams }) => ({ activeTeam: computed(() => teams().find(t => t.active)!) })),
  withComputed((store) => ({ activeTeamMember: computed(() => store.activeTeam().teamMembers.find(t => t.active)!) })),
  withComputed((store) => ({ activePokemon: computed(() => store.activeTeamMember().pokemon) })),
  withComputed((store) => ({ activeMovePosition: computed(() => (store.activePokemon().moveSet.findIndex(move => move.name == store.activePokemon().activeMove) + 1) as MovePosition) })),

  withComputed((store) => {

    const stateToPokemon = (pokemon: PokemonState) => {
      const moveOne = new Move(pokemon.moveSet[0].name, { alliesFainted: pokemon.moveSet[0].alliesFainted, hits: pokemon.moveSet[0].hits })
      const moveTwo = new Move(pokemon.moveSet[1].name, { alliesFainted: pokemon.moveSet[1].alliesFainted, hits: pokemon.moveSet[1].hits })
      const moveThree = new Move(pokemon.moveSet[2].name, { alliesFainted: pokemon.moveSet[2].alliesFainted, hits: pokemon.moveSet[2].hits })
      const moveFour = new Move(pokemon.moveSet[3].name, { alliesFainted: pokemon.moveSet[3].alliesFainted, hits: pokemon.moveSet[3].hits })
      const activeMovePosition = [moveOne, moveTwo, moveThree, moveFour].findIndex(move => move.name == pokemon.activeMove) + 1 as MovePosition
      
      return new Pokemon(pokemon.name, {
        id: pokemon.id,
        nature: pokemon.nature,
        item: pokemon.item,
        status: pokemon.status,
        ability: pokemon.ability,
        abilityOn: pokemon.abilityOn,
        commanderActive: pokemon.commanderActive,
        teraType: pokemon.teraType,
        teraTypeActive: pokemon.teraTypeActive,
        moveSet: new MoveSet(moveOne, moveTwo, moveThree, moveFour, activeMovePosition), 
        boosts: pokemon.boosts,
        evs: pokemon.evs,
        ivs: pokemon.ivs,
        hpPercentage: pokemon.hpPercentage
      })
    }

    const findPokemonById = (pokemonId: string) => {
      if (store._leftPokemonState().id == pokemonId) return stateToPokemon(store._leftPokemonState())

      if (store._rightPokemonState().id == pokemonId) return stateToPokemon(store._rightPokemonState())

      const pokemonFromTeam = store._teamsState()
          .find(team => team.teamMembers.some(member => member.pokemon.id === pokemonId))
          ?.teamMembers.find(member => member.pokemon.id === pokemonId)
          ?.pokemon
        
      if (pokemonFromTeam) return stateToPokemon(pokemonFromTeam)

      const pokemonFromTargets = store._targetsState().find(target => target.pokemon.id == pokemonId)

      if (pokemonFromTargets) return stateToPokemon(pokemonFromTargets.pokemon)
      
      return defaultPokemon()
    }

    return {
      oneVsOneActivated: computed(() => store._menuState.oneVsOneActivated()),
      oneVsManyActivated: computed(() => store._menuState.oneVsManyActivated()),
      manyVsOneActivated: computed(() => store._menuState.manyVsOneActivated()),
      speedCalculatorActivated: computed(() => store._menuState.speedCalculatorActivated()),

      leftPokemon: computed(() => {
        return stateToPokemon(store._leftPokemonState())
      }),

      rightPokemon: computed(() => {
        return stateToPokemon(store._rightPokemonState())
      }),

      team: computed(() => {
        const teamMembers = store.activeTeam().teamMembers.map(t => new TeamMember(stateToPokemon(t.pokemon), t.active))
        return new Team(store.activeTeam().active, store.activeTeam().name, teamMembers)
      }),

      teams: computed(() => {
        return store._teamsState().map(team => {
          const teamMembers = team.teamMembers.map(member => new TeamMember(stateToPokemon(member.pokemon), member.active))
          return new Team(team.active, team.name, teamMembers)
        })
      }),

      activeAttacker: computed(() => findPokemonById(store.attackerId())),

      activeSecondAttacker: computed(() => findPokemonById(store.secondAttackerId())),

      targets: computed(() => store._targetsState().map(target => {
        return new Target(stateToPokemon(target.pokemon), target.active)
      }))
    }
  }),

  withMethods((store) => {
    const getActiveTeamIndex = () => store._teamsState().findIndex(team => team.active)

    const teamWithPokemonOnEditIndex = (pokemonId: string) => {
      return store._teamsState().findIndex(team => team.teamMembers.some(member => member.pokemon.id == pokemonId))
    }
  
    const teamMemberWithPokemonOnEditIndex = (pokemonId: string, index: number) => {
      const activeTeam = store._teamsState()[index]
      return activeTeam.teamMembers.findIndex(member => member.pokemon.id == pokemonId)
    }

    const getActiveTargetIndex = (pokemonId: string) => {
      return store.targets().findIndex(target => target.pokemon.id == pokemonId)
    }

    const updateActivePokemon = (pokemonId: string, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) => {
      if (store._leftPokemonState().id == pokemonId) {
        patchState(store, (state) => {
          const updatedPokemon = { ...state._leftPokemonState, ...updateFn(state._leftPokemonState) }
          return { _leftPokemonState: updatedPokemon }
        })

        return
      }

      if (store._rightPokemonState().id == pokemonId) {
        patchState(store, (state) => {
          const updatedPokemon = { ...state._rightPokemonState, ...updateFn(state._rightPokemonState) }
          return { _rightPokemonState: updatedPokemon }
        })

        return
      }

      const activeTeamIndex = teamWithPokemonOnEditIndex(pokemonId)

      if(activeTeamIndex != -1) {
        patchState(store, (state) => {
          const activeTeamMemberIndex = teamMemberWithPokemonOnEditIndex(pokemonId, activeTeamIndex)
          const updatedTeams = [...state._teamsState]

          const updatedTeamMembers = [...updatedTeams[activeTeamIndex].teamMembers]
          const currentPokemon = updatedTeamMembers[activeTeamMemberIndex].pokemon
    
          const updatedPokemon = { ...currentPokemon, ...updateFn(currentPokemon) }
    
          updatedTeamMembers[activeTeamMemberIndex] = { ...updatedTeamMembers[activeTeamMemberIndex], pokemon: updatedPokemon }
    
          updatedTeams[activeTeamIndex] = { ...updatedTeams[activeTeamIndex], teamMembers: updatedTeamMembers }

          return { _teamsState: updatedTeams }
        })
      } else {
        patchState(store, (state) => {
          const activeTargetIndex = getActiveTargetIndex(pokemonId)
          const updatedTargets = [...state._targetsState]
          const currentPokemon = store.targets()[activeTargetIndex].pokemon.toState()
          const updatedPokemon = { ...currentPokemon, ...updateFn(currentPokemon) }

          updatedTargets[activeTargetIndex] = { ...updatedTargets[activeTargetIndex], pokemon: updatedPokemon }

          return { _targetsState: updatedTargets }
        })        
      }
    }

    const updatePokemonOnTarget = (target: Target, updateFn: (pokemon: PokemonState) => Partial<PokemonState>) => {
      const targetIndex = store._targetsState().findIndex(t => t.pokemon.id === target.pokemon.id)
      const targetToUpdate = store._targetsState()[targetIndex]

      patchState(store, () => {
        return {
          _targetsState: [
            ...store._targetsState().slice(0, targetIndex),
            {
              ...targetToUpdate,
              pokemon: { ...targetToUpdate.pokemon, ...updateFn(targetToUpdate.pokemon) },
            },
            ...store._targetsState().slice(targetIndex + 1),
          ]
        }
      })
    }

    const stateToPokemon = (pokemon: PokemonState) => {
      const moveOne = new Move(pokemon.moveSet[0].name, { alliesFainted: pokemon.moveSet[0].alliesFainted, hits: pokemon.moveSet[0].hits })
      const moveTwo = new Move(pokemon.moveSet[1].name, { alliesFainted: pokemon.moveSet[1].alliesFainted, hits: pokemon.moveSet[1].hits })
      const moveThree = new Move(pokemon.moveSet[2].name, { alliesFainted: pokemon.moveSet[2].alliesFainted, hits: pokemon.moveSet[2].hits })
      const moveFour = new Move(pokemon.moveSet[3].name, { alliesFainted: pokemon.moveSet[3].alliesFainted, hits: pokemon.moveSet[3].hits })
      const activeMovePosition = [moveOne, moveTwo, moveThree, moveFour].findIndex(move => move.name == pokemon.activeMove) + 1 as MovePosition
      
      return new Pokemon(pokemon.name, {
        id: pokemon.id,
        nature: pokemon.nature,
        item: pokemon.item,
        status: pokemon.status,
        ability: pokemon.ability,
        abilityOn: pokemon.abilityOn,
        commanderActive: pokemon.commanderActive,
        teraType: pokemon.teraType,
        teraTypeActive: pokemon.teraTypeActive,
        moveSet: new MoveSet(moveOne, moveTwo, moveThree, moveFour, activeMovePosition), 
        boosts: pokemon.boosts,
        evs: pokemon.evs,
        ivs: pokemon.ivs
      })
    }

    return {
      name(pokemonId: string, name: string) { updateActivePokemon(pokemonId, () => ({ name })) },
      status(pokemonId: string, status: string) { updateActivePokemon(pokemonId, () => ({ status })) },
      item(pokemonId: string, item: string) { updateActivePokemon(pokemonId, () => ({ item })) },
      nature(pokemonId: string, nature: string) { updateActivePokemon(pokemonId, () => ({ nature })) },
      ability(pokemonId: string, ability: string) { updateActivePokemon(pokemonId, () => ({ ability })) },
      abilityOn(pokemonId: string, abilityOn: boolean) { updateActivePokemon(pokemonId, () => ({ abilityOn })) },
      commanderActive(pokemonId: string, commanderActive: boolean) { updateActivePokemon(pokemonId, () => ({ commanderActive })) },
      teraType(pokemonId: string, teraType: string) { updateActivePokemon(pokemonId, () => ({ teraType })) },
      teraTypeActive(pokemonId: string, teraTypeActive: boolean) { updateActivePokemon(pokemonId, () => ({ teraTypeActive })) },
      hpPercentage(pokemonId: string, hpPercentage: number) { updateActivePokemon(pokemonId, () => ({ hpPercentage })) },
      evs(pokemonId: string, evs: Partial<Stats>) { updateActivePokemon(pokemonId, () => ({ evs })) },
      ivs(pokemonId: string, ivs: Partial<Stats>) { updateActivePokemon(pokemonId, () => ({ ivs })) },
      boosts(pokemonId: string, boosts: Stats) { updateActivePokemon(pokemonId, () => ({ boosts })) },

      moveSet(pokemonId: string, moveSet: string[], activeMove: string) { updateActivePokemon(pokemonId, () => (
        { 
          moveSet: [
            { name: moveSet[0] },
            { name: moveSet[1] },
            { name: moveSet[2] },
            { name: moveSet[3] },
          ],
          activeMove: activeMove
        }
      ))},

      moveOne(pokemonId: string, moveOne: string) { updateActivePokemon(pokemonId, (state) => {
        const moveSet = [...state.moveSet]
        moveSet.splice(0, 1, { name: moveOne, alliesFainted: "0", hits: "0" })
        return { activeMove: moveOne, moveSet: moveSet }
      })},

      moveTwo(pokemonId: string, moveTwo: string) { updateActivePokemon(pokemonId, (state) => {
        const moveSet = [...state.moveSet]
        moveSet.splice(1, 1, { name: moveTwo, alliesFainted: "0", hits: "0" })
        return { activeMove: moveTwo, moveSet: moveSet }
      })},

      moveThree(pokemonId: string, moveThree: string) { updateActivePokemon(pokemonId, (state) => {
        const moveSet = [...state.moveSet]
        moveSet.splice(2, 1, { name: moveThree, alliesFainted: "0", hits: "0" })
        return { activeMove: moveThree, moveSet: moveSet }
      })},

      moveFour(pokemonId: string, moveFour: string) { updateActivePokemon(pokemonId, (state) => {
        const moveSet = [...state.moveSet]
        moveSet.splice(3, 1, { name: moveFour, alliesFainted: "0", hits: "0" })
        return { activeMove: moveFour, moveSet: moveSet }
      })},

      activateMove(pokemonId: string, move: Move) { updateActivePokemon(pokemonId, (state) => {
        if(!state.moveSet.find(m => m.name == move.name)) {
          throw Error(`Move ${move.name} does not exist in actual Moveset`) 
        }

        return { activeMove: move.name }
      })},

      activeMoveByPosition(pokemonId: string, position: number) { updateActivePokemon(pokemonId, (state) => ({ activeMove: state.moveSet[--position].name })) },

      alliesFainted(pokemonId: string, alliesFainted: string, position: MovePosition) {
        updateActivePokemon(pokemonId, (state) => {
          const moveSet = [...state.moveSet]
          const arrayPosition = position - 1
          moveSet.splice(arrayPosition, 1, { ...moveSet[arrayPosition], alliesFainted: alliesFainted })
          return { moveSet: moveSet }
        })
      },

      hits(pokemonId: string, hits: string, position: MovePosition) {
        updateActivePokemon(pokemonId, (state) => {
          const moveSet = [...state.moveSet]
          const arrayPosition = position - 1
          moveSet.splice(arrayPosition, 1, { ...moveSet[arrayPosition], hits: hits })
          return { moveSet: moveSet }
        })
      },

      updateTeamMembersActive(active1: boolean, active2: boolean, active3: boolean, active4: boolean, active5: boolean, active6: boolean) {
        const activeTeamIndex = getActiveTeamIndex()
        const activeStates = [active1, active2, active3, active4, active5, active6]
  
        patchState(store, (state) => {
          const updatedTeams = [...state._teamsState]
          const updatedTeamMembers = updatedTeams[activeTeamIndex].teamMembers.map((member, index) => ({
            ...member, active: activeStates[index] ?? member.active,
          }));
  
          updatedTeams[activeTeamIndex] = { ...updatedTeams[activeTeamIndex], teamMembers: updatedTeamMembers }
  
          return { _teamsState: updatedTeams }
        })
      },

      replaceActiveTeam(newTeam: TeamState) {
        const activeTeamIndex = getActiveTeamIndex()
    
        patchState(store, (state) => {
          const updatedTeams = [...state._teamsState]
          updatedTeams[activeTeamIndex] = newTeam
    
          return { _teamsState: updatedTeams }
        })
      },

      updateTeams(teams: Team[]) {
        const teamsState = teams.map(t => t.toState())
        patchState(store, () => ({ _teamsState: teamsState }) )
      },

      updateSecondAttacker(pokemonId: string) {
        patchState(store, () => ({ secondAttackerId: pokemonId }) )
      },

      removeAllTargets() {
        patchState(store, () => ({ _targetsState: [] }))
      },

      updateTargets(targets: Target[]) {
        const targetsState = targets.map(t => t.toState())
        patchState(store, () => ({ _targetsState: targetsState }))
      },

      toogleActiveTargetCommander(target: Target) {
        updatePokemonOnTarget(target, () => ({ commanderActive: !target.pokemon.commanderActivated }))
      },

      toogleActiveTargetTerastal(target: Target) {
        updatePokemonOnTarget(target, () => ({ teraTypeActive: !target.pokemon.teraTypeActive }))
      },

      updateTargetAbility(target: Target) {
        updatePokemonOnTarget(target, () => ({ ability: target.pokemon.ability }))
      },

      deactivateTargets() {
        patchState(store, () => {
          const deactivatedTargets = store._targetsState().map(target => ({ ...target, active: false }))
          return { _targetsState: deactivatedTargets }
        })
      },

      updateAttacker(pokemonId: string) {
        patchState(store, () => ({ attackerId: pokemonId }))
      },

      findPokemonById(pokemonId: string): Pokemon {
        if (store._leftPokemonState().id == pokemonId) return stateToPokemon(store._leftPokemonState())

        if (store._rightPokemonState().id == pokemonId) return stateToPokemon(store._rightPokemonState())

        const pokemonFromTeam = store._teamsState()
            .find(team => team.teamMembers.some(member => member.pokemon.id === pokemonId))
            ?.teamMembers.find(member => member.pokemon.id === pokemonId)
            ?.pokemon
          
        if (pokemonFromTeam) return stateToPokemon(pokemonFromTeam)
  
        const pokemonFromTargets = store._targetsState().find(target => target.pokemon.id == pokemonId)!
  
        return stateToPokemon(pokemonFromTargets.pokemon)
      },

      updateLeftPokemon(pokemon: Pokemon) {
        patchState(store, () => ({ _leftPokemonState: pokemon.toState() }))
      },

      updateRightPokemon(pokemon: Pokemon) {
        patchState(store, () => ({ _rightPokemonState: pokemon.toState() }))
      },

      enableOneVsOne() {
        patchState(store, () => ({ 
          _menuState: {
            oneVsOneActivated: true,
            oneVsManyActivated: false,
            manyVsOneActivated: false,
            speedCalculatorActivated: false
          }
        }))
      },

      enableOneVsMany() {
        patchState(store, () => ({ 
          _menuState: {
            oneVsOneActivated: false,
            oneVsManyActivated: true,
            manyVsOneActivated: false,
            speedCalculatorActivated: false
          }
        }))
      },

      enableManyVsOne() {
        patchState(store, () => ({ 
          _menuState: {
            oneVsOneActivated: false,
            oneVsManyActivated: false,
            manyVsOneActivated: true,
            speedCalculatorActivated: false
          }
        }))
      },

      enableSpeedCalculator() {
        patchState(store, () => ({ 
          _menuState: {
            oneVsOneActivated: false,
            oneVsManyActivated: false,
            manyVsOneActivated: false,
            speedCalculatorActivated: true
          }
        }))
      },
      
    }
  }),

  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[watchState]', state)
      });
    }
  })
)
