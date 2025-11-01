import { CalculatorState } from "@data/store/calculator-store"
import { pokemonToState } from "@data/store/utils/state-mapper"
import { buildState } from "@data/store/utils/user-data-mapper"
import { defaultPokemon } from "@lib/default-pokemon"
import { Status } from "@lib/model/status"
import { v4 as uuidv4 } from "uuid"

const initialId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

export function initialCalculatorState(): CalculatorState {
  const userData = JSON.parse(localStorage.getItem("userData")!)
  return userData?.leftPokemon ? { ...defaultState(), ...buildState(userData) } : defaultState()
}

function defaultState() {
  return {
    updateLocalStorage: true,

    speedCalcPokemonState: {
      id: uuidv4(),
      name: "Miraidon",
      nature: "Modest",
      item: "Choice Specs",
      status: Status.HEALTHY.description,
      ability: "Hadron Engine",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fairy",
      teraTypeActive: false,
      activeMove: "Draco Meteor",
      moveSet: [{ name: "Draco Meteor" }, { name: "Electro Drift" }, { name: "Dazzling Gleam" }, { name: "Volt Switch" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 44, atk: 0, def: 4, spa: 244, spd: 12, spe: 204 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    leftPokemonState: {
      id: uuidv4(),
      name: "Miraidon",
      nature: "Modest",
      item: "Choice Specs",
      status: Status.HEALTHY.description,
      ability: "Hadron Engine",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fairy",
      teraTypeActive: false,
      activeMove: "Draco Meteor",
      moveSet: [{ name: "Draco Meteor" }, { name: "Electro Drift" }, { name: "Dazzling Gleam" }, { name: "Volt Switch" }],
      boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 44, atk: 0, def: 4, spa: 244, spd: 12, spe: 204 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100,
      automaticAbilityOn: false
    },

    rightPokemonState: {
      id: uuidv4(),
      name: "Koraidon",
      nature: "Adamant",
      item: "Clear Amulet",
      status: Status.HEALTHY.description,
      ability: "Orichalcum Pulse",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fire",
      teraTypeActive: false,
      activeMove: "Flare Blitz",
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
        id: uuidv4(),
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
              activeMove: "Draco Meteor",
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
              id: uuidv4(),
              name: "Koraidon",
              nature: "Adamant",
              item: "Clear Amulet",
              status: Status.HEALTHY.description,
              ability: "Orichalcum Pulse",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: "Flare Blitz",
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
              id: uuidv4(),
              name: "Rillaboom",
              nature: "Adamant",
              item: "Assault Vest",
              status: Status.HEALTHY.description,
              ability: "Grassy Surge",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: "Wood Hammer",
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
              id: uuidv4(),
              name: "Incineroar",
              nature: "Impish",
              item: "Rocky Helmet",
              status: Status.HEALTHY.description,
              ability: "Intimidate",
              abilityOn: false,
              commanderActive: false,
              teraType: "Ghost",
              teraTypeActive: false,
              activeMove: "Knock Off",
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
        id: uuidv4(),
        active: false,
        name: "Team 2",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      },
      {
        id: uuidv4(),
        active: false,
        name: "Team 3",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      },
      {
        id: uuidv4(),
        active: false,
        name: "Team 4",
        teamMembers: [{ active: true, pokemon: pokemonToState(defaultPokemon()) }]
      }
    ],

    targetsState: [
      {
        active: false,
        pokemon: {
          id: uuidv4(),
          name: "Urshifu-Rapid-Strike",
          nature: "Adamant",
          item: "Focus Sash",
          status: Status.HEALTHY.description,
          ability: "Unseen Fist",
          abilityOn: false,
          commanderActive: false,
          teraType: "Water",
          teraTypeActive: false,
          activeMove: "Close Combat",
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
          id: uuidv4(),
          name: "Incineroar",
          nature: "Impish",
          item: "Rocky Helmet",
          status: Status.HEALTHY.description,
          ability: "Intimidate",
          abilityOn: false,
          commanderActive: false,
          teraType: "Ghost",
          teraTypeActive: false,
          activeMove: "Knock Off",
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
          id: uuidv4(),
          name: "Rillaboom",
          nature: "Adamant",
          item: "Assault Vest",
          status: Status.HEALTHY.description,
          ability: "Grassy Surge",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fire",
          teraTypeActive: false,
          activeMove: "Wood Hammer",
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
          id: uuidv4(),
          name: "Amoonguss",
          nature: "Bold",
          item: "Rocky Helmet",
          status: Status.HEALTHY.description,
          ability: "Regenerator",
          abilityOn: false,
          commanderActive: false,
          teraType: "Water",
          teraTypeActive: false,
          activeMove: "Pollen Puff",
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
          id: uuidv4(),
          name: "Flutter Mane",
          nature: "Timid",
          item: "Booster Energy",
          status: Status.HEALTHY.description,
          ability: "Protosynthesis",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fairy",
          teraTypeActive: false,
          activeMove: "Moonblast",
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
          id: uuidv4(),
          name: "Calyrex-Shadow",
          nature: "Timid",
          item: "Life Orb",
          status: Status.HEALTHY.description,
          ability: "As One (Spectrier)",
          abilityOn: false,
          commanderActive: false,
          teraType: "Normal",
          teraTypeActive: false,
          activeMove: "Astral Barrage",
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
          id: uuidv4(),
          name: "Calyrex-Ice",
          nature: "Adamant",
          item: "Clear Amulet",
          status: Status.HEALTHY.description,
          ability: "As One (Glastrier)",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fairy",
          teraTypeActive: false,
          activeMove: "Glacial Lance",
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
          id: uuidv4(),
          name: "Miraidon",
          nature: "Modest",
          item: "Choice Specs",
          status: Status.HEALTHY.description,
          ability: "Hadron Engine",
          abilityOn: false,
          commanderActive: false,
          teraType: "Fairy",
          teraTypeActive: false,
          activeMove: "Draco Meteor",
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
          id: uuidv4(),
          name: "Zamazenta-Crowned",
          nature: "Impish",
          item: "Rusted Shield",
          status: Status.HEALTHY.description,
          ability: "Dauntless Shield",
          abilityOn: false,
          commanderActive: false,
          teraType: "Dragon",
          teraTypeActive: false,
          activeMove: "Body Press",
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
          id: uuidv4(),
          name: "Terapagos-Terastal",
          nature: "Modest",
          item: "Leftovers",
          status: Status.HEALTHY.description,
          ability: "Tera Shell",
          abilityOn: false,
          commanderActive: false,
          teraType: "Stellar",
          teraTypeActive: false,
          activeMove: "Tera Starstorm",
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
    targetMetaRegulation: undefined
  }
}
