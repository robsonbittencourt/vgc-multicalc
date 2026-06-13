import { CalculatorState } from "@data/store/calculator-store"
import { pokemonToState } from "@data/store/utils/state-mapper"
import { buildState } from "@data/store/utils/user-data-mapper"
import { readCustomSets, readGameData, readUserData, writeTopLevel } from "@data/store/utils/user-data-storage"
import { fixInvalidPokemon } from "@data/store/utils/migrate-user-data"
import { defaultPokemon } from "@lib/default-pokemon"
import { Status } from "@lib/model/status"
import { uuid } from "@lib/utils/uuid"

const initialId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

export function initialCalculatorState(): CalculatorState {
  fixInvalidPokemon()

  if (readUserData()?.game === "sv") {
    writeTopLevel({ game: "champions" })
  }

  const gameData = readGameData()
  const defaults = defaultStateChampions()
  const useSpsMode = readUserData()?.useSpsMode ?? true
  const customSetsState = readCustomSets()
  const base = gameData?.leftPokemon ? { ...defaults, ...buildState(gameData), game: "champions" as const, useSpsMode } : { ...defaults, game: "champions" as const, useSpsMode }
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
