import { CalcState } from "@store/calc-store"
import { buildState } from "./user-data-mapper"
import { readCustomSets, readGameData, readUserData } from "./user-data-storage"
import { fixInvalidPokemon } from "./migrate-user-data"
import { Status } from "@multicalc/model"
import { uuid } from "@multicalc/utils"

const initialId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

export function initialCalcState(): CalcState {
  fixInvalidPokemon()

  const gameData = readGameData()
  const defaults = defaultState()
  const useSpsMode = readUserData()?.useSpsMode ?? true
  const customSetsState = readCustomSets()
  const base = gameData?.leftPokemon ? { ...defaults, ...buildState(gameData), useSpsMode } : { ...defaults, useSpsMode }
  return { ...base, customSetsState, activeSetId: null, activeSetPokemonId: null, activeSetDirty: false, isEditingCustomSet: false }
}

export function defaultState() {
  return {
    updateLocalStorage: true,

    leftPokemonState: {
      id: uuid(),
      name: "Charizard",
      nature: "Timid",
      item: "Charizardite Y",
      status: Status.HEALTHY.description,
      toxicCounter: 1,
      ability: "Solar Power",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fire",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
      toxicCounter: 1,
      ability: "Multiscale",
      abilityOn: false,
      commanderActive: false,
      teraType: "Dragon",
      teraTypeActive: false,
      activeMove: 0,
      moveSet: [{ name: "Hurricane" }, { name: "Dragon Pulse" }, { name: "Protect" }, { name: "Tailwind" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
              toxicCounter: 1,
              ability: "Solar Power",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
              toxicCounter: 1,
              ability: "Multiscale",
              abilityOn: false,
              commanderActive: false,
              teraType: "Dragon",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Hurricane" }, { name: "Dragon Pulse" }, { name: "Protect" }, { name: "Tailwind" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
              toxicCounter: 1,
              ability: "Chlorophyll",
              abilityOn: false,
              commanderActive: false,
              teraType: "Grass",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Sludge Bomb" }, { name: "Energy Ball" }, { name: "Sleep Powder" }, { name: "Protect" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
              toxicCounter: 1,
              ability: "Intimidate",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: 0,
              moveSet: [{ name: "Flare Blitz" }, { name: "Throat Chop" }, { name: "Fake Out" }, { name: "Parting Shot" }],
              boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 252, atk: 0, def: 92, spa: 0, spd: 172, spe: 0 },
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
        teamMembers: []
      },
      {
        id: uuid(),
        active: false,
        name: "Team 3",
        teamMembers: []
      },
      {
        id: uuid(),
        active: false,
        name: "Team 4",
        teamMembers: []
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
          toxicCounter: 1,
          ability: "Rain Dish",
          abilityOn: false,
          commanderActive: false,
          teraType: "Water",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Water Spout" }, { name: "Dark Pulse" }, { name: "Aura Sphere" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 12, spe: 0 },
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
          item: "Focus Sash",
          status: Status.HEALTHY.description,
          toxicCounter: 1,
          ability: "Intimidate",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fire",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Flare Blitz" }, { name: "Close Combat" }, { name: "Extreme Speed" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 132, def: 0, spa: 0, spd: 4, spe: 124 },
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
          item: "Black Belt",
          status: Status.HEALTHY.description,
          toxicCounter: 1,
          ability: "No Guard",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fighting",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Dynamic Punch" }, { name: "Stone Edge" }, { name: "Ice Punch" }, { name: "Bullet Punch" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 12 },
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
          item: "Focus Sash",
          status: Status.HEALTHY.description,
          toxicCounter: 1,
          ability: "Inner Focus",
          abilityOn: false,
          commanderActive: false,
          teraType: "Psychic",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Light Screen" }, { name: "Reflect" }, { name: "Speed Swap" }, { name: "Psychic" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 0, def: 12, spa: 0, spd: 0, spe: 252 },
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
          toxicCounter: 1,
          ability: "Chlorophyll",
          abilityOn: false,
          commanderActive: false,
          teraType: "Grass",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Sludge Bomb" }, { name: "Energy Ball" }, { name: "Sleep Powder" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
          toxicCounter: 1,
          ability: "Unnerve",
          abilityOn: false,
          commanderActive: false,
          teraType: "Rock",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Rock Slide" }, { name: "Dual Wingbeat" }, { name: "Tailwind" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 12, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
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
          toxicCounter: 1,
          ability: "Thick Fat",
          abilityOn: false,
          commanderActive: false,
          teraType: "Normal",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Body Slam" }, { name: "Rock Slide" }, { name: "Belly Drum" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 172, atk: 156, def: 180, spa: 0, spd: 4, spe: 0 },
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
          toxicCounter: 1,
          ability: "Intimidate",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fire",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Flare Blitz" }, { name: "Throat Chop" }, { name: "Fake Out" }, { name: "Parting Shot" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 252, atk: 0, def: 92, spa: 0, spd: 172, spe: 0 },
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
          toxicCounter: 1,
          ability: "Solar Power",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fire",
          teraTypeActive: false,
          activeMove: 0,
          moveSet: [{ name: "Solar Beam" }, { name: "Heat Wave" }, { name: "Weather Ball" }, { name: "Protect" }],
          boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 12, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
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
