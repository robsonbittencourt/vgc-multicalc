import { CalculatorState } from "@data/store/calculator-store"
import { pokemonToState } from "@data/store/utils/state-mapper"
import { buildState } from "@data/store/utils/user-data-mapper"
import { readCustomSets, readGameData, readGameOverride, readUserData } from "@data/store/utils/user-data-storage"
import { fixInvalidPokemon } from "@data/store/utils/migrate-user-data"
import { defaultPokemon } from "@lib/default-pokemon"
import { Status } from "@lib/model/status"
import { uuid } from "@lib/utils/uuid"

const initialId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

export function initialCalculatorState(): CalculatorState {
  fixInvalidPokemon()
  const game = readGameOverride() ?? "champions"
  const gameData = readGameData(game)
  const defaults = game === "champions" ? defaultStateChampions() : defaultStateSV()
  const useSpsMode = readUserData()?.useSpsMode ?? true
  const customSetsState = game === "champions" ? readCustomSets() : []
  const base = gameData?.leftPokemon ? { ...defaults, ...buildState(gameData), game, useSpsMode } : { ...defaults, game, useSpsMode }
  return { ...base, customSetsState, activeSetId: null, activeSetPokemonId: null, activeSetDirty: false, isEditingCustomSet: false }
}

export function defaultState() {
  return defaultStateChampions()
}

export function defaultStateChampions() {
  return {
    updateLocalStorage: true,
    game: "champions" as const,

    speedCalcPokemonState: {
      id: uuid(),
      name: "Charizard",
      nature: "Timid",
      item: "Charizardite Y",
      status: Status.HEALTHY.description,
      ability: "Solar Power",
      abilityOn: false,
      commanderActive: false,
      teraType: "",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    leftPokemonState: {
      id: uuid(),
      name: "Charizard",
      nature: "Timid",
      item: "Charizardite Y",
      status: Status.HEALTHY.description,
      ability: "Solar Power",
      abilityOn: false,
      commanderActive: false,
      teraType: "",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    rightPokemonState: {
      id: uuid(),
      name: "Dragonite",
      nature: "Modest",
      item: "Dragoninite",
      status: Status.HEALTHY.description,
      ability: "Multiscale",
      abilityOn: false,
      commanderActive: false,
      teraType: "",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Hurricane" }, { name: "Dragon Pulse" }, { name: "Protect" }, { name: "Tailwind" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    secondAttackerId: "",

    teamsState: [
      {
        id: uuid(),
        active: true,
        name: "Team 1",
        teamMembers: [
          {
            active: true,
            pokemon: {
              id: initialId,
              name: "Charizard",
              nature: "Timid",
              item: "Charizardite Y",
              status: Status.HEALTHY.description,
              ability: "Solar Power",
              abilityOn: false,
              commanderActive: false,
              teraType: "",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          },
          {
            active: false,
            pokemon: {
              id: uuid(),
              name: "Dragonite",
              nature: "Modest",
              item: "Dragoninite",
              status: Status.HEALTHY.description,
              ability: "Multiscale",
              abilityOn: false,
              commanderActive: false,
              teraType: "",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Hurricane" }, { name: "Dragon Pulse" }, { name: "Protect" }, { name: "Tailwind" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          },
          {
            active: false,
            pokemon: {
              id: uuid(),
              name: "Venusaur",
              nature: "Modest",
              item: "Focus Sash",
              status: Status.HEALTHY.description,
              ability: "Chlorophyll",
              abilityOn: false,
              commanderActive: false,
              teraType: "",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Sludge Bomb" }, { name: "Energy Ball" }, { name: "Sleep Powder" }, { name: "Protect" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          },
          {
            active: false,
            pokemon: {
              id: uuid(),
              name: "Incineroar",
              nature: "Careful",
              item: "Sitrus Berry",
              status: Status.HEALTHY.description,
              ability: "Intimidate",
              abilityOn: false,
              commanderActive: false,
              teraType: "",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Flare Blitz" }, { name: "Throat Chop" }, { name: "Fake Out" }, { name: "Parting Shot" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 32, atk: 0, def: 12, spa: 0, spd: 22, spe: 0 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          }
        ]
      },
      {
        id: uuid(),
        active: false,
        name: "Team 2",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      },
      {
        id: uuid(),
        active: false,
        name: "Team 3",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      },
      {
        id: uuid(),
        active: false,
        name: "Team 4",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      }
    ],

    targetsState: [
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Blastoise",
          nature: "Quiet",
          item: "Blastoisinite",
          status: Status.HEALTHY.description,
          ability: "Rain Dish",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Water Spout" }, { name: "Dark Pulse" }, { name: "Aura Sphere" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 32, atk: 0, def: 0, spa: 32, spd: 2, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Arcanine",
          nature: "Adamant",
          item: "Black Belt",
          status: Status.HEALTHY.description,
          ability: "Intimidate",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Flare Blitz" }, { name: "Close Combat" }, { name: "Extreme Speed" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 32, atk: 17, def: 0, spa: 0, spd: 1, spe: 16 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Machamp",
          nature: "Adamant",
          item: "Lum Berry",
          status: Status.HEALTHY.description,
          ability: "No Guard",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Dynamic Punch" }, { name: "Stone Edge" }, { name: "Ice Punch" }, { name: "Bullet Punch" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 32, atk: 32, def: 0, spa: 0, spd: 0, spe: 2 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Alakazam",
          nature: "Timid",
          item: "Alakazite",
          status: Status.HEALTHY.description,
          ability: "Inner Focus",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Light Screen" }, { name: "Reflect" }, { name: "Speed Swap" }, { name: "Psychic" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 32, atk: 0, def: 2, spa: 0, spd: 0, spe: 32 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Venusaur",
          nature: "Modest",
          item: "Focus Sash",
          status: Status.HEALTHY.description,
          ability: "Chlorophyll",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Sludge Bomb" }, { name: "Energy Ball" }, { name: "Sleep Powder" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Aerodactyl",
          nature: "Jolly",
          item: "Focus Sash",
          status: Status.HEALTHY.description,
          ability: "Unnerve",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Rock Slide" }, { name: "Dual Wingbeat" }, { name: "Tailwind" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Snorlax",
          nature: "Adamant",
          item: "Leftovers",
          status: Status.HEALTHY.description,
          ability: "Thick Fat",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Body Slam" }, { name: "Rock Slide" }, { name: "Belly Drum" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 22, atk: 20, def: 23, spa: 0, spd: 1, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Incineroar",
          nature: "Careful",
          item: "Sitrus Berry",
          status: Status.HEALTHY.description,
          ability: "Intimidate",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Flare Blitz" }, { name: "Throat Chop" }, { name: "Fake Out" }, { name: "Parting Shot" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 32, atk: 0, def: 12, spa: 0, spd: 22, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Charizard",
          nature: "Timid",
          item: "Charizardite Y",
          status: Status.HEALTHY.description,
          ability: "Solar Power",
          abilityOn: false,
          commanderActive: false,
          teraType: "",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      }
    ],
    targetMetaRegulation: undefined,
    simpleCalcLeftRollLevel: "high",
    simpleCalcRightRollLevel: "high",
    multiCalcRollLevel: "high",
    manyVsTeamRollLevel: "high",
    useSpsMode: true,
    customSetsState: [],
    activeSetId: null,
    activeSetPokemonId: null,
    activeSetDirty: false,
    isEditingCustomSet: false
  }
}

export function defaultStateSV() {
  return {
    updateLocalStorage: true,
    game: "sv" as const,

    speedCalcPokemonState: {
      id: uuid(),
      name: "Miraidon",
      nature: "Modest",
      item: "Choice Specs",
      status: Status.HEALTHY.description,
      ability: "Hadron Engine",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fairy",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Draco Meteor" }, { name: "Electro Drift" }, { name: "Dazzling Gleam" }, { name: "Volt Switch" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 44, atk: 0, def: 4, spa: 244, spd: 12, spe: 204 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    leftPokemonState: {
      id: uuid(),
      name: "Miraidon",
      nature: "Modest",
      item: "Choice Specs",
      status: Status.HEALTHY.description,
      ability: "Hadron Engine",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fairy",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Draco Meteor" }, { name: "Electro Drift" }, { name: "Dazzling Gleam" }, { name: "Volt Switch" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 44, atk: 0, def: 4, spa: 244, spd: 12, spe: 204 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    rightPokemonState: {
      id: uuid(),
      name: "Koraidon",
      nature: "Adamant",
      item: "Clear Amulet",
      status: Status.HEALTHY.description,
      ability: "Orichalcum Pulse",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fire",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Flare Blitz" }, { name: "Collision Course" }, { name: "Flame Charge" }, { name: "Protect" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 236, atk: 196, def: 4, spa: 0, spd: 4, spe: 68 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    secondAttackerId: "",

    teamsState: [
      {
        id: uuid(),
        active: true,
        name: "Team 1",
        teamMembers: [
          {
            active: true,
            pokemon: {
              id: initialId,
              name: "Miraidon",
              nature: "Modest",
              item: "Choice Specs",
              status: Status.HEALTHY.description,
              ability: "Hadron Engine",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fairy",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Draco Meteor" }, { name: "Electro Drift" }, { name: "Dazzling Gleam" }, { name: "Volt Switch" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 44, atk: 0, def: 4, spa: 244, spd: 12, spe: 204 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          },
          {
            active: false,
            pokemon: {
              id: uuid(),
              name: "Koraidon",
              nature: "Adamant",
              item: "Clear Amulet",
              status: Status.HEALTHY.description,
              ability: "Orichalcum Pulse",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Flare Blitz" }, { name: "Collision Course" }, { name: "Flame Charge" }, { name: "Protect" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 236, atk: 196, def: 4, spa: 0, spd: 4, spe: 68 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          },
          {
            active: false,
            pokemon: {
              id: uuid(),
              name: "Rillaboom",
              nature: "Adamant",
              item: "Assault Vest",
              status: Status.HEALTHY.description,
              ability: "Grassy Surge",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Wood Hammer" }, { name: "U-turn" }, { name: "Grassy Glide" }, { name: "Fake Out" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 236, atk: 116, def: 4, spa: 0, spd: 76, spe: 76 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          },
          {
            active: false,
            pokemon: {
              id: uuid(),
              name: "Incineroar",
              nature: "Impish",
              item: "Rocky Helmet",
              status: Status.HEALTHY.description,
              ability: "Intimidate",
              abilityOn: false,
              commanderActive: false,
              teraType: "Ghost",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Knock Off" }, { name: "Fake Out" }, { name: "Parting Shot" }, { name: "Will-O-Wisp" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 244, atk: 0, def: 188, spa: 0, spd: 76, spe: 0 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100,
              automaticAbilityOn: false
            }
          }
        ]
      },
      {
        id: uuid(),
        active: false,
        name: "Team 2",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      },
      {
        id: uuid(),
        active: false,
        name: "Team 3",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      },
      {
        id: uuid(),
        active: false,
        name: "Team 4",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      }
    ],

    targetsState: [
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Urshifu-Rapid-Strike",
          nature: "Adamant",
          item: "Focus Sash",
          status: Status.HEALTHY.description,
          ability: "Unseen Fist",
          abilityOn: false,
          commanderActive: false,
          teraType: "Water",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Close Combat" }, { name: "Aqua Jet" }, { name: "Surging Strikes" }, { name: "Detect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Incineroar",
          nature: "Impish",
          item: "Rocky Helmet",
          status: Status.HEALTHY.description,
          ability: "Intimidate",
          abilityOn: false,
          commanderActive: false,
          teraType: "Ghost",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Knock Off" }, { name: "Fake Out" }, { name: "Parting Shot" }, { name: "Will-O-Wisp" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 244, atk: 0, def: 188, spa: 0, spd: 76, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Rillaboom",
          nature: "Adamant",
          item: "Assault Vest",
          status: Status.HEALTHY.description,
          ability: "Grassy Surge",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fire",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Wood Hammer" }, { name: "U-turn" }, { name: "Grassy Glide" }, { name: "Fake Out" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 236, atk: 116, def: 4, spa: 0, spd: 76, spe: 76 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Amoonguss",
          nature: "Bold",
          item: "Rocky Helmet",
          status: Status.HEALTHY.description,
          ability: "Regenerator",
          abilityOn: false,
          commanderActive: false,
          teraType: "Water",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Pollen Puff" }, { name: "Spore" }, { name: "Rage Powder" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 236, atk: 0, def: 236, spa: 0, spd: 36, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Flutter Mane",
          nature: "Timid",
          item: "Booster Energy",
          status: Status.HEALTHY.description,
          ability: "Protosynthesis",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fairy",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Moonblast" }, { name: "Shadow Ball" }, { name: "Icy Wind" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 212, atk: 0, def: 132, spa: 4, spd: 4, spe: 156 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Calyrex-Shadow",
          nature: "Timid",
          item: "Life Orb",
          status: Status.HEALTHY.description,
          ability: "As One (Spectrier)",
          abilityOn: false,
          commanderActive: false,
          teraType: "Normal",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Astral Barrage" }, { name: "Psychic" }, { name: "Protect" }, { name: "Nasty Plot" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 84, atk: 0, def: 12, spa: 156, spd: 4, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Calyrex-Ice",
          nature: "Adamant",
          item: "Clear Amulet",
          status: Status.HEALTHY.description,
          ability: "As One (Glastrier)",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fairy",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Glacial Lance" }, { name: "High Horsepower" }, { name: "Trick Room" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 116, def: 4, spa: 0, spd: 20, spe: 116 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Miraidon",
          nature: "Modest",
          item: "Choice Specs",
          status: Status.HEALTHY.description,
          ability: "Hadron Engine",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fairy",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Draco Meteor" }, { name: "Electro Drift" }, { name: "Dazzling Gleam" }, { name: "Volt Switch" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 44, atk: 0, def: 4, spa: 244, spd: 12, spe: 204 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Zamazenta-Crowned",
          nature: "Impish",
          item: "Rusted Shield",
          status: Status.HEALTHY.description,
          ability: "Dauntless Shield",
          abilityOn: false,
          commanderActive: false,
          teraType: "Dragon",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Body Press" }, { name: "Protect" }, { name: "Heavy Slam" }, { name: "Wide Guard" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 92, atk: 4, def: 244, spa: 0, spd: 4, spe: 164 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      },
      {
        active: false,
        pokemon: {
          id: uuid(),
          name: "Terapagos-Terastal",
          nature: "Modest",
          item: "Leftovers",
          status: Status.HEALTHY.description,
          ability: "Tera Shell",
          abilityOn: false,
          commanderActive: false,
          teraType: "Stellar",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Tera Starstorm" }, { name: "Earth Power" }, { name: "Calm Mind" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 0, def: 172, spa: 84, spd: 0, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100,
          automaticAbilityOn: false
        }
      }
    ],
    targetMetaRegulation: undefined,
    simpleCalcLeftRollLevel: "high",
    simpleCalcRightRollLevel: "high",
    multiCalcRollLevel: "high",
    manyVsTeamRollLevel: "high",
    useSpsMode: true,
    customSetsState: [],
    activeSetId: null,
    activeSetPokemonId: null,
    activeSetDirty: false,
    isEditingCustomSet: false
  }
}
