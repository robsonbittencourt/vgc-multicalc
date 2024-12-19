import { CalculatorState } from "@data/store/calculator-store"
import { pokemonToState } from "@data/store/utils/state-mapper"
import { buildState } from "@data/store/utils/user-data-mapper"
import { defaultPokemon } from "@lib/default-pokemon"
import { v4 as uuidv4 } from "uuid"

const initialId = "0dc51a43-1de8-4213-9686-fb07f2507b06"

export function initialCalculatorState(): CalculatorState {
  const userData = JSON.parse(localStorage.getItem("userData")!)
  return userData?.leftPokemon ? { ...defaultState(), ...buildState(userData) } : defaultState()
}

function defaultState() {
  return {
    _updateLocalStorage: true,

    _speedCalcPokemonState: {
      id: uuidv4(),
      name: "Sneasler",
      nature: "Jolly",
      item: "Focus Sash",
      status: "Healthy",
      ability: "Poison Touch",
      abilityOn: false,
      commanderActive: false,
      teraType: "Stellar",
      teraTypeActive: false,
      activeMove: "Close Combat",
      moveSet: [{ name: "Close Combat" }, { name: "Dire Claw" }, { name: "Fake Out" }, { name: "Protect" }],
      boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100
    },

    _leftPokemonState: {
      id: uuidv4(),
      name: "Gholdengo",
      nature: "Timid",
      item: "Choice Specs",
      status: "Healthy",
      ability: "Good as Gold",
      abilityOn: false,
      commanderActive: false,
      teraType: "Steel",
      teraTypeActive: false,
      activeMove: "Make It Rain",
      moveSet: [{ name: "Make It Rain" }, { name: "Shadow Ball" }, { name: "Protect" }, { name: "Nasty Plot" }],
      boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100
    },

    _rightPokemonState: {
      id: uuidv4(),
      name: "Rillaboom",
      nature: "Adamant",
      item: "Assault Vest",
      status: "Healthy",
      ability: "Grassy Surge",
      abilityOn: false,
      commanderActive: false,
      teraType: "Fire",
      teraTypeActive: false,
      activeMove: "Wood Hammer",
      moveSet: [{ name: "Wood Hammer" }, { name: "Grassy Glide" }, { name: "U-turn" }, { name: "Fake Out" }],
      boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 252, atk: 116, def: 4, spa: 0, spd: 60, spe: 76 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hpPercentage: 100
    },

    secondAttackerId: "",

    _teamsState: [
      {
        id: uuidv4(),
        active: true,
        name: "Team 1",
        teamMembers: [
          {
            active: true,
            pokemon: {
              id: initialId,
              name: "Gholdengo",
              nature: "Timid",
              item: "Choice Specs",
              status: "Healthy",
              ability: "Good as Gold",
              abilityOn: false,
              commanderActive: false,
              teraType: "Steel",
              teraTypeActive: false,
              activeMove: "Make It Rain",
              moveSet: [{ name: "Make It Rain" }, { name: "Shadow Ball" }, { name: "Protect" }, { name: "Nasty Plot" }],
              boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100
            }
          },
          {
            active: false,
            pokemon: {
              id: uuidv4(),
              name: "Rillaboom",
              nature: "Adamant",
              item: "Assault Vest",
              status: "Healthy",
              ability: "Grassy Surge",
              abilityOn: false,
              commanderActive: false,
              teraType: "Fire",
              teraTypeActive: false,
              activeMove: "Wood Hammer",
              moveSet: [{ name: "Wood Hammer" }, { name: "Grassy Glide" }, { name: "U-turn" }, { name: "Fake Out" }],
              boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 252, atk: 116, def: 4, spa: 0, spd: 60, spe: 76 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100
            }
          },
          {
            active: false,
            pokemon: {
              id: uuidv4(),
              name: "Kingambit",
              nature: "Adamant",
              item: "Black Glasses",
              status: "Healthy",
              ability: "Defiant",
              abilityOn: false,
              commanderActive: false,
              teraType: "Dark",
              teraTypeActive: false,
              activeMove: "Kowtow Cleave",
              moveSet: [{ name: "Kowtow Cleave" }, { name: "Sucker Punch" }, { name: "Swords Dance" }, { name: "Protect" }],
              boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 4, spe: 0 },
              ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
              hpPercentage: 100
            }
          },
          {
            active: false,
            pokemon: {
              id: uuidv4(),
              name: "Sneasler",
              nature: "Jolly",
              item: "Focus Sash",
              status: "Healthy",
              ability: "Poison Touch",
              abilityOn: false,
              commanderActive: false,
              teraType: "Stellar",
              teraTypeActive: false,
              activeMove: "Close Combat",
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

    _targetsState: [
      {
        active: false,
        pokemon: {
          id: uuidv4(),
          name: "Primarina",
          nature: "Modest",
          item: "Throat Spray",
          status: "Healthy",
          ability: "Liquid Voice",
          abilityOn: false,
          commanderActive: false,
          teraType: "Poison",
          teraTypeActive: false,
          activeMove: "Moonblast",
          moveSet: [{ name: "Moonblast" }, { name: "Hyper Voice" }, { name: "Haze" }, { name: "Protect" }],
          boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 172, atk: 0, def: 252, spa: 20, spd: 4, spe: 60 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100
        }
      },
      {
        active: false,
        pokemon: {
          id: uuidv4(),
          name: "Amoonguss",
          nature: "Calm",
          item: "Sitrus Berry",
          status: "Healthy",
          ability: "Regenerator",
          abilityOn: false,
          commanderActive: false,
          teraType: "Water",
          teraTypeActive: false,
          activeMove: "Spore",
          moveSet: [{ name: "Spore" }, { name: "Rage Powder" }, { name: "Pollen Puff" }, { name: "Protect" }],
          boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 236, atk: 0, def: 36, spa: 0, spd: 236, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100
        }
      },
      {
        active: false,
        pokemon: {
          id: uuidv4(),
          name: "Dragonite",
          nature: "Adamant",
          item: "Choice Band",
          status: "Healthy",
          ability: "Inner Focus",
          abilityOn: false,
          commanderActive: false,
          teraType: "Flying",
          teraTypeActive: false,
          activeMove: "Extreme Speed",
          moveSet: [{ name: "Extreme Speed" }, { name: "Tera Blast" }, { name: "Stomping Tantrum" }, { name: "Ice Spinner" }],
          boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100
        }
      },
      {
        active: false,
        pokemon: {
          id: uuidv4(),
          name: "Garchomp",
          nature: "Jolly",
          item: "Life Orb",
          status: "Healthy",
          ability: "Rough Skin",
          abilityOn: false,
          commanderActive: false,
          teraType: "Steel",
          teraTypeActive: false,
          activeMove: "Dragon Claw",
          moveSet: [{ name: "Dragon Claw" }, { name: "Earthquake" }, { name: "Stomping Tantrum" }, { name: "Protect" }],
          boosts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          hpPercentage: 100
        }
      }
    ]
  }
}
