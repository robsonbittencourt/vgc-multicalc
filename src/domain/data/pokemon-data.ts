import { PokemonDataCore } from "@data/types"
import { toID } from "@data/id"

export type PokemonId = keyof typeof POKEMON_DATA

export function getPokemonData(name: string): PokemonDataCore | undefined {
  return (POKEMON_DATA as Record<string, PokemonDataCore>)[toID(name)]
}

export const POKEMON_DATA = {
  bulbasaur: {
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 45,
      atk: 49,
      def: 49,
      spa: 65,
      spd: 65,
      spe: 45
    },
    weightKg: 6.9,
    abilities: ["Overgrow", "Chlorophyll"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ivysaur: {
    name: "Ivysaur",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 60,
      atk: 62,
      def: 63,
      spa: 80,
      spd: 80,
      spe: 60
    },
    weightKg: 13,
    abilities: ["Overgrow", "Chlorophyll"],
    notFullyEvolved: true,
    group: "Regular"
  },
  venusaur: {
    name: "Venusaur",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 80,
      atk: 82,
      def: 83,
      spa: 100,
      spd: 100,
      spe: 80
    },
    weightKg: 100,
    abilities: ["Overgrow", "Chlorophyll"],
    group: "Meta"
  },
  venusaurmega: {
    name: "Venusaur-Mega",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 123,
      spa: 122,
      spd: 120,
      spe: 80
    },
    weightKg: 155.5,
    abilities: ["Thick Fat"],
    group: "Meta"
  },
  charmander: {
    name: "Charmander",
    types: ["Fire"],
    baseStats: {
      hp: 39,
      atk: 52,
      def: 43,
      spa: 60,
      spd: 50,
      spe: 65
    },
    weightKg: 8.5,
    abilities: ["Blaze", "Solar Power"],
    notFullyEvolved: true,
    group: "Regular"
  },
  charmeleon: {
    name: "Charmeleon",
    types: ["Fire"],
    baseStats: {
      hp: 58,
      atk: 64,
      def: 58,
      spa: 80,
      spd: 65,
      spe: 80
    },
    weightKg: 19,
    abilities: ["Blaze", "Solar Power"],
    notFullyEvolved: true,
    group: "Regular"
  },
  charizard: {
    name: "Charizard",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 78,
      atk: 84,
      def: 78,
      spa: 109,
      spd: 85,
      spe: 100
    },
    weightKg: 90.5,
    abilities: ["Blaze", "Solar Power"],
    group: "Regular"
  },
  charizardmegax: {
    name: "Charizard-Mega-X",
    types: ["Fire", "Dragon"],
    baseStats: {
      hp: 78,
      atk: 130,
      def: 111,
      spa: 130,
      spd: 85,
      spe: 100
    },
    weightKg: 110.5,
    abilities: ["Tough Claws"],
    group: "Low usage"
  },
  charizardmegay: {
    name: "Charizard-Mega-Y",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 78,
      atk: 104,
      def: 78,
      spa: 159,
      spd: 115,
      spe: 100
    },
    weightKg: 100.5,
    abilities: ["Drought"],
    group: "Meta"
  },
  squirtle: {
    name: "Squirtle",
    types: ["Water"],
    baseStats: {
      hp: 44,
      atk: 48,
      def: 65,
      spa: 50,
      spd: 64,
      spe: 43
    },
    weightKg: 9,
    abilities: ["Torrent", "Rain Dish"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wartortle: {
    name: "Wartortle",
    types: ["Water"],
    baseStats: {
      hp: 59,
      atk: 63,
      def: 80,
      spa: 65,
      spd: 80,
      spe: 58
    },
    weightKg: 22.5,
    abilities: ["Torrent", "Rain Dish"],
    notFullyEvolved: true,
    group: "Regular"
  },
  blastoise: {
    name: "Blastoise",
    types: ["Water"],
    baseStats: {
      hp: 79,
      atk: 83,
      def: 100,
      spa: 85,
      spd: 105,
      spe: 78
    },
    weightKg: 85.5,
    abilities: ["Torrent", "Rain Dish"],
    group: "Regular"
  },
  blastoisemega: {
    name: "Blastoise-Mega",
    types: ["Water"],
    baseStats: {
      hp: 79,
      atk: 103,
      def: 120,
      spa: 135,
      spd: 115,
      spe: 78
    },
    weightKg: 101.1,
    abilities: ["Mega Launcher"],
    group: "Meta"
  },
  caterpie: {
    name: "Caterpie",
    types: ["Bug"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 35,
      spa: 20,
      spd: 20,
      spe: 45
    },
    weightKg: 2.9,
    abilities: ["Shield Dust", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  metapod: {
    name: "Metapod",
    types: ["Bug"],
    baseStats: {
      hp: 50,
      atk: 20,
      def: 55,
      spa: 25,
      spd: 25,
      spe: 30
    },
    weightKg: 9.9,
    abilities: ["Shed Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  butterfree: {
    name: "Butterfree",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 60,
      atk: 45,
      def: 50,
      spa: 90,
      spd: 80,
      spe: 70
    },
    weightKg: 32,
    abilities: ["Compound Eyes", "Tinted Lens"],
    group: "Regular"
  },
  weedle: {
    name: "Weedle",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 40,
      atk: 35,
      def: 30,
      spa: 20,
      spd: 20,
      spe: 50
    },
    weightKg: 3.2,
    abilities: ["Shield Dust", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kakuna: {
    name: "Kakuna",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 45,
      atk: 25,
      def: 50,
      spa: 25,
      spd: 25,
      spe: 35
    },
    weightKg: 10,
    abilities: ["Shed Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  beedrill: {
    name: "Beedrill",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 40,
      spa: 45,
      spd: 80,
      spe: 75
    },
    weightKg: 29.5,
    abilities: ["Swarm", "Sniper"],
    group: "Regular"
  },
  beedrillmega: {
    name: "Beedrill-Mega",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 65,
      atk: 150,
      def: 40,
      spa: 15,
      spd: 80,
      spe: 145
    },
    weightKg: 40.5,
    abilities: ["Adaptability"],
    group: "Regular"
  },
  pidgey: {
    name: "Pidgey",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 40,
      spa: 35,
      spd: 35,
      spe: 56
    },
    weightKg: 1.8,
    abilities: ["Keen Eye", "Tangled Feet", "Big Pecks"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pidgeotto: {
    name: "Pidgeotto",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 63,
      atk: 60,
      def: 55,
      spa: 50,
      spd: 50,
      spe: 71
    },
    weightKg: 30,
    abilities: ["Keen Eye", "Tangled Feet", "Big Pecks"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pidgeot: {
    name: "Pidgeot",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 83,
      atk: 80,
      def: 75,
      spa: 70,
      spd: 70,
      spe: 101
    },
    weightKg: 39.5,
    abilities: ["Keen Eye", "Tangled Feet", "Big Pecks"],
    group: "Regular"
  },
  pidgeotmega: {
    name: "Pidgeot-Mega",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 83,
      atk: 80,
      def: 80,
      spa: 135,
      spd: 80,
      spe: 121
    },
    weightKg: 50.5,
    abilities: ["No Guard"],
    group: "Regular"
  },
  rattata: {
    name: "Rattata",
    types: ["Normal"],
    baseStats: {
      hp: 30,
      atk: 56,
      def: 35,
      spa: 25,
      spd: 35,
      spe: 72
    },
    weightKg: 3.5,
    abilities: ["Run Away", "Guts", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rattataalola: {
    name: "Rattata-Alola",
    types: ["Dark", "Normal"],
    baseStats: {
      hp: 30,
      atk: 56,
      def: 35,
      spa: 25,
      spd: 35,
      spe: 72
    },
    weightKg: 3.8,
    abilities: ["Gluttony", "Hustle", "Thick Fat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  raticate: {
    name: "Raticate",
    types: ["Normal"],
    baseStats: {
      hp: 55,
      atk: 81,
      def: 60,
      spa: 50,
      spd: 70,
      spe: 97
    },
    weightKg: 18.5,
    abilities: ["Run Away", "Guts", "Hustle"],
    group: "Regular"
  },
  raticatealola: {
    name: "Raticate-Alola",
    types: ["Dark", "Normal"],
    baseStats: {
      hp: 75,
      atk: 71,
      def: 70,
      spa: 40,
      spd: 80,
      spe: 77
    },
    weightKg: 25.5,
    abilities: ["Gluttony", "Hustle", "Thick Fat"],
    group: "Regular"
  },
  spearow: {
    name: "Spearow",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 40,
      atk: 60,
      def: 30,
      spa: 31,
      spd: 31,
      spe: 70
    },
    weightKg: 2,
    abilities: ["Keen Eye", "Sniper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  fearow: {
    name: "Fearow",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 65,
      spa: 61,
      spd: 61,
      spe: 100
    },
    weightKg: 38,
    abilities: ["Keen Eye", "Sniper"],
    group: "Regular"
  },
  ekans: {
    name: "Ekans",
    types: ["Poison"],
    baseStats: {
      hp: 35,
      atk: 60,
      def: 44,
      spa: 40,
      spd: 54,
      spe: 55
    },
    weightKg: 6.9,
    abilities: ["Intimidate", "Shed Skin", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  arbok: {
    name: "Arbok",
    types: ["Poison"],
    baseStats: {
      hp: 60,
      atk: 95,
      def: 69,
      spa: 65,
      spd: 79,
      spe: 80
    },
    weightKg: 65,
    abilities: ["Intimidate", "Shed Skin", "Unnerve"],
    group: "Regular"
  },
  pikachu: {
    name: "Pikachu",
    types: ["Electric"],
    baseStats: {
      hp: 35,
      atk: 55,
      def: 40,
      spa: 50,
      spd: 50,
      spe: 90
    },
    weightKg: 6,
    abilities: ["Static", "Lightning Rod"],
    notFullyEvolved: true,
    group: "Regular"
  },
  raichu: {
    name: "Raichu",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 90,
      def: 55,
      spa: 90,
      spd: 80,
      spe: 110
    },
    weightKg: 30,
    abilities: ["Static", "Lightning Rod"],
    group: "Low usage"
  },
  raichualola: {
    name: "Raichu-Alola",
    types: ["Electric", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 50,
      spa: 95,
      spd: 85,
      spe: 110
    },
    weightKg: 21,
    abilities: ["Surge Surfer"],
    group: "Regular"
  },
  raichumegax: {
    name: "Raichu-Mega-X",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 135,
      def: 95,
      spa: 90,
      spd: 95,
      spe: 110
    },
    weightKg: 38,
    abilities: ["Electric Surge"],
    group: "Low usage"
  },
  raichumegay: {
    name: "Raichu-Mega-Y",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 100,
      def: 55,
      spa: 160,
      spd: 80,
      spe: 130
    },
    weightKg: 26,
    abilities: ["No Guard"],
    group: "Meta"
  },
  sandshrew: {
    name: "Sandshrew",
    types: ["Ground"],
    baseStats: {
      hp: 50,
      atk: 75,
      def: 85,
      spa: 20,
      spd: 30,
      spe: 40
    },
    weightKg: 12,
    abilities: ["Sand Veil", "Sand Rush"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sandshrewalola: {
    name: "Sandshrew-Alola",
    types: ["Ice", "Steel"],
    baseStats: {
      hp: 50,
      atk: 75,
      def: 90,
      spa: 10,
      spd: 35,
      spe: 40
    },
    weightKg: 40,
    abilities: ["Snow Cloak", "Slush Rush"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sandslash: {
    name: "Sandslash",
    types: ["Ground"],
    baseStats: {
      hp: 75,
      atk: 100,
      def: 110,
      spa: 45,
      spd: 55,
      spe: 65
    },
    weightKg: 29.5,
    abilities: ["Sand Veil", "Sand Rush"],
    group: "Regular"
  },
  sandslashalola: {
    name: "Sandslash-Alola",
    types: ["Ice", "Steel"],
    baseStats: {
      hp: 75,
      atk: 100,
      def: 120,
      spa: 25,
      spd: 65,
      spe: 65
    },
    weightKg: 55,
    abilities: ["Snow Cloak", "Slush Rush"],
    group: "Regular"
  },
  nidoranf: {
    name: "Nidoran-F",
    types: ["Poison"],
    baseStats: {
      hp: 55,
      atk: 47,
      def: 52,
      spa: 40,
      spd: 40,
      spe: 41
    },
    weightKg: 7,
    gender: "F",
    abilities: ["Poison Point", "Rivalry", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  nidorina: {
    name: "Nidorina",
    types: ["Poison"],
    baseStats: {
      hp: 70,
      atk: 62,
      def: 67,
      spa: 55,
      spd: 55,
      spe: 56
    },
    weightKg: 20,
    gender: "F",
    abilities: ["Poison Point", "Rivalry", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  nidoqueen: {
    name: "Nidoqueen",
    types: ["Poison", "Ground"],
    baseStats: {
      hp: 90,
      atk: 92,
      def: 87,
      spa: 75,
      spd: 85,
      spe: 76
    },
    weightKg: 60,
    gender: "F",
    abilities: ["Poison Point", "Rivalry", "Sheer Force"],
    group: "Regular"
  },
  nidoranm: {
    name: "Nidoran-M",
    types: ["Poison"],
    baseStats: {
      hp: 46,
      atk: 57,
      def: 40,
      spa: 40,
      spd: 40,
      spe: 50
    },
    weightKg: 9,
    gender: "M",
    abilities: ["Poison Point", "Rivalry", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  nidorino: {
    name: "Nidorino",
    types: ["Poison"],
    baseStats: {
      hp: 61,
      atk: 72,
      def: 57,
      spa: 55,
      spd: 55,
      spe: 65
    },
    weightKg: 19.5,
    gender: "M",
    abilities: ["Poison Point", "Rivalry", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  nidoking: {
    name: "Nidoking",
    types: ["Poison", "Ground"],
    baseStats: {
      hp: 81,
      atk: 102,
      def: 77,
      spa: 85,
      spd: 75,
      spe: 85
    },
    weightKg: 62,
    gender: "M",
    abilities: ["Poison Point", "Rivalry", "Sheer Force"],
    group: "Regular"
  },
  clefairy: {
    name: "Clefairy",
    types: ["Fairy"],
    baseStats: {
      hp: 70,
      atk: 45,
      def: 48,
      spa: 60,
      spd: 65,
      spe: 35
    },
    weightKg: 7.5,
    abilities: ["Cute Charm", "Magic Guard", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  clefable: {
    name: "Clefable",
    types: ["Fairy"],
    baseStats: {
      hp: 95,
      atk: 70,
      def: 73,
      spa: 95,
      spd: 90,
      spe: 60
    },
    weightKg: 40,
    abilities: ["Cute Charm", "Magic Guard", "Unaware"],
    group: "Low usage"
  },
  clefablemega: {
    name: "Clefable-Mega",
    types: ["Fairy", "Flying"],
    baseStats: {
      hp: 95,
      atk: 80,
      def: 93,
      spa: 135,
      spd: 110,
      spe: 70
    },
    weightKg: 42.3,
    abilities: ["Magic Bounce"],
    group: "Low usage"
  },
  vulpix: {
    name: "Vulpix",
    types: ["Fire"],
    baseStats: {
      hp: 38,
      atk: 41,
      def: 40,
      spa: 50,
      spd: 65,
      spe: 65
    },
    weightKg: 9.9,
    abilities: ["Flash Fire", "Drought"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vulpixalola: {
    name: "Vulpix-Alola",
    types: ["Ice"],
    baseStats: {
      hp: 38,
      atk: 41,
      def: 40,
      spa: 50,
      spd: 65,
      spe: 65
    },
    weightKg: 9.9,
    abilities: ["Snow Cloak", "Snow Warning"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ninetales: {
    name: "Ninetales",
    types: ["Fire"],
    baseStats: {
      hp: 73,
      atk: 76,
      def: 75,
      spa: 81,
      spd: 100,
      spe: 100
    },
    weightKg: 19.9,
    abilities: ["Flash Fire", "Drought"],
    group: "Regular"
  },
  ninetalesalola: {
    name: "Ninetales-Alola",
    types: ["Ice", "Fairy"],
    baseStats: {
      hp: 73,
      atk: 67,
      def: 75,
      spa: 81,
      spd: 100,
      spe: 109
    },
    weightKg: 19.9,
    abilities: ["Snow Cloak", "Snow Warning"],
    group: "Meta"
  },
  jigglypuff: {
    name: "Jigglypuff",
    types: ["Normal", "Fairy"],
    baseStats: {
      hp: 115,
      atk: 45,
      def: 20,
      spa: 45,
      spd: 25,
      spe: 20
    },
    weightKg: 5.5,
    abilities: ["Cute Charm", "Competitive", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wigglytuff: {
    name: "Wigglytuff",
    types: ["Normal", "Fairy"],
    baseStats: {
      hp: 140,
      atk: 70,
      def: 45,
      spa: 85,
      spd: 50,
      spe: 45
    },
    weightKg: 12,
    abilities: ["Cute Charm", "Competitive", "Frisk"],
    group: "Regular"
  },
  zubat: {
    name: "Zubat",
    types: ["Poison", "Flying"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 35,
      spa: 30,
      spd: 40,
      spe: 55
    },
    weightKg: 7.5,
    abilities: ["Inner Focus", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  golbat: {
    name: "Golbat",
    types: ["Poison", "Flying"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 70,
      spa: 65,
      spd: 75,
      spe: 90
    },
    weightKg: 55,
    abilities: ["Inner Focus", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  oddish: {
    name: "Oddish",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 45,
      atk: 50,
      def: 55,
      spa: 75,
      spd: 65,
      spe: 30
    },
    weightKg: 5.4,
    abilities: ["Chlorophyll", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gloom: {
    name: "Gloom",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 60,
      atk: 65,
      def: 70,
      spa: 85,
      spd: 75,
      spe: 40
    },
    weightKg: 8.6,
    abilities: ["Chlorophyll", "Stench"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vileplume: {
    name: "Vileplume",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 85,
      spa: 110,
      spd: 90,
      spe: 50
    },
    weightKg: 18.6,
    abilities: ["Chlorophyll", "Effect Spore"],
    group: "Low usage"
  },
  paras: {
    name: "Paras",
    types: ["Bug", "Grass"],
    baseStats: {
      hp: 35,
      atk: 70,
      def: 55,
      spa: 45,
      spd: 55,
      spe: 25
    },
    weightKg: 5.4,
    abilities: ["Effect Spore", "Dry Skin", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  parasect: {
    name: "Parasect",
    types: ["Bug", "Grass"],
    baseStats: {
      hp: 60,
      atk: 95,
      def: 80,
      spa: 60,
      spd: 80,
      spe: 30
    },
    weightKg: 29.5,
    abilities: ["Effect Spore", "Dry Skin", "Damp"],
    group: "Regular"
  },
  venonat: {
    name: "Venonat",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 60,
      atk: 55,
      def: 50,
      spa: 40,
      spd: 55,
      spe: 45
    },
    weightKg: 30,
    abilities: ["Compound Eyes", "Tinted Lens", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  venomoth: {
    name: "Venomoth",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 70,
      atk: 65,
      def: 60,
      spa: 90,
      spd: 75,
      spe: 90
    },
    weightKg: 12.5,
    abilities: ["Shield Dust", "Tinted Lens", "Wonder Skin"],
    group: "Regular"
  },
  diglett: {
    name: "Diglett",
    types: ["Ground"],
    baseStats: {
      hp: 10,
      atk: 55,
      def: 25,
      spa: 35,
      spd: 45,
      spe: 95
    },
    weightKg: 0.8,
    abilities: ["Sand Veil", "Arena Trap", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  diglettalola: {
    name: "Diglett-Alola",
    types: ["Ground", "Steel"],
    baseStats: {
      hp: 10,
      atk: 55,
      def: 30,
      spa: 35,
      spd: 45,
      spe: 90
    },
    weightKg: 1,
    abilities: ["Sand Veil", "Tangling Hair", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dugtrio: {
    name: "Dugtrio",
    types: ["Ground"],
    baseStats: {
      hp: 35,
      atk: 100,
      def: 50,
      spa: 50,
      spd: 70,
      spe: 120
    },
    weightKg: 33.3,
    abilities: ["Sand Veil", "Arena Trap", "Sand Force"],
    group: "Regular"
  },
  dugtrioalola: {
    name: "Dugtrio-Alola",
    types: ["Ground", "Steel"],
    baseStats: {
      hp: 35,
      atk: 100,
      def: 60,
      spa: 50,
      spd: 70,
      spe: 110
    },
    weightKg: 66.6,
    abilities: ["Sand Veil", "Tangling Hair", "Sand Force"],
    group: "Regular"
  },
  meowth: {
    name: "Meowth",
    types: ["Normal"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 35,
      spa: 40,
      spd: 40,
      spe: 90
    },
    weightKg: 4.2,
    abilities: ["Pickup", "Technician", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  meowthalola: {
    name: "Meowth-Alola",
    types: ["Dark"],
    baseStats: {
      hp: 40,
      atk: 35,
      def: 35,
      spa: 50,
      spd: 40,
      spe: 90
    },
    weightKg: 4.2,
    abilities: ["Pickup", "Technician", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  meowthgalar: {
    name: "Meowth-Galar",
    types: ["Steel"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 55,
      spa: 40,
      spd: 40,
      spe: 40
    },
    weightKg: 7.5,
    abilities: ["Pickup", "Tough Claws", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  persian: {
    name: "Persian",
    types: ["Normal"],
    baseStats: {
      hp: 65,
      atk: 70,
      def: 60,
      spa: 65,
      spd: 65,
      spe: 115
    },
    weightKg: 32,
    abilities: ["Limber", "Technician", "Unnerve"],
    group: "Regular"
  },
  persianalola: {
    name: "Persian-Alola",
    types: ["Dark"],
    baseStats: {
      hp: 65,
      atk: 60,
      def: 60,
      spa: 75,
      spd: 65,
      spe: 115
    },
    weightKg: 33,
    abilities: ["Fur Coat", "Technician", "Rattled"],
    group: "Regular"
  },
  psyduck: {
    name: "Psyduck",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 52,
      def: 48,
      spa: 65,
      spd: 50,
      spe: 55
    },
    weightKg: 19.6,
    abilities: ["Damp", "Cloud Nine", "Swift Swim"],
    notFullyEvolved: true,
    group: "Regular"
  },
  golduck: {
    name: "Golduck",
    types: ["Water"],
    baseStats: {
      hp: 80,
      atk: 82,
      def: 78,
      spa: 95,
      spd: 80,
      spe: 85
    },
    weightKg: 76.6,
    abilities: ["Damp", "Cloud Nine", "Swift Swim"],
    group: "Regular"
  },
  mankey: {
    name: "Mankey",
    types: ["Fighting"],
    baseStats: {
      hp: 40,
      atk: 80,
      def: 35,
      spa: 35,
      spd: 45,
      spe: 70
    },
    weightKg: 28,
    abilities: ["Vital Spirit", "Anger Point", "Defiant"],
    notFullyEvolved: true,
    group: "Regular"
  },
  primeape: {
    name: "Primeape",
    types: ["Fighting"],
    baseStats: {
      hp: 65,
      atk: 105,
      def: 60,
      spa: 60,
      spd: 70,
      spe: 95
    },
    weightKg: 32,
    abilities: ["Vital Spirit", "Anger Point", "Defiant"],
    notFullyEvolved: true,
    group: "Regular"
  },
  growlithe: {
    name: "Growlithe",
    types: ["Fire"],
    baseStats: {
      hp: 55,
      atk: 70,
      def: 45,
      spa: 70,
      spd: 50,
      spe: 60
    },
    weightKg: 19,
    abilities: ["Intimidate", "Flash Fire", "Justified"],
    notFullyEvolved: true,
    group: "Regular"
  },
  growlithehisui: {
    name: "Growlithe-Hisui",
    types: ["Fire", "Rock"],
    baseStats: {
      hp: 60,
      atk: 75,
      def: 45,
      spa: 65,
      spd: 50,
      spe: 55
    },
    weightKg: 22.7,
    abilities: ["Intimidate", "Flash Fire", "Rock Head"],
    notFullyEvolved: true,
    group: "Regular"
  },
  arcanine: {
    name: "Arcanine",
    types: ["Fire"],
    baseStats: {
      hp: 90,
      atk: 110,
      def: 80,
      spa: 100,
      spd: 80,
      spe: 95
    },
    weightKg: 155,
    abilities: ["Intimidate", "Flash Fire", "Justified"],
    group: "Regular"
  },
  arcaninehisui: {
    name: "Arcanine-Hisui",
    types: ["Fire", "Rock"],
    baseStats: {
      hp: 95,
      atk: 115,
      def: 80,
      spa: 95,
      spd: 80,
      spe: 90
    },
    weightKg: 168,
    abilities: ["Intimidate", "Flash Fire", "Rock Head"],
    group: "Meta"
  },
  poliwag: {
    name: "Poliwag",
    types: ["Water"],
    baseStats: {
      hp: 40,
      atk: 50,
      def: 40,
      spa: 40,
      spd: 40,
      spe: 90
    },
    weightKg: 12.4,
    abilities: ["Water Absorb", "Damp", "Swift Swim"],
    notFullyEvolved: true,
    group: "Regular"
  },
  poliwhirl: {
    name: "Poliwhirl",
    types: ["Water"],
    baseStats: {
      hp: 65,
      atk: 65,
      def: 65,
      spa: 50,
      spd: 50,
      spe: 90
    },
    weightKg: 20,
    abilities: ["Water Absorb", "Damp", "Swift Swim"],
    notFullyEvolved: true,
    group: "Regular"
  },
  poliwrath: {
    name: "Poliwrath",
    types: ["Water", "Fighting"],
    baseStats: {
      hp: 90,
      atk: 95,
      def: 95,
      spa: 70,
      spd: 90,
      spe: 70
    },
    weightKg: 54,
    abilities: ["Water Absorb", "Damp", "Swift Swim"],
    group: "Regular"
  },
  abra: {
    name: "Abra",
    types: ["Psychic"],
    baseStats: {
      hp: 25,
      atk: 20,
      def: 15,
      spa: 105,
      spd: 55,
      spe: 90
    },
    weightKg: 19.5,
    abilities: ["Synchronize", "Inner Focus", "Magic Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kadabra: {
    name: "Kadabra",
    types: ["Psychic"],
    baseStats: {
      hp: 40,
      atk: 35,
      def: 30,
      spa: 120,
      spd: 70,
      spe: 105
    },
    weightKg: 56.5,
    abilities: ["Synchronize", "Inner Focus", "Magic Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  alakazam: {
    name: "Alakazam",
    types: ["Psychic"],
    baseStats: {
      hp: 55,
      atk: 50,
      def: 45,
      spa: 135,
      spd: 95,
      spe: 120
    },
    weightKg: 48,
    abilities: ["Synchronize", "Inner Focus", "Magic Guard"],
    group: "Regular"
  },
  alakazammega: {
    name: "Alakazam-Mega",
    types: ["Psychic"],
    baseStats: {
      hp: 55,
      atk: 50,
      def: 65,
      spa: 175,
      spd: 105,
      spe: 150
    },
    weightKg: 48,
    abilities: ["Trace"],
    group: "Regular"
  },
  machop: {
    name: "Machop",
    types: ["Fighting"],
    baseStats: {
      hp: 70,
      atk: 80,
      def: 50,
      spa: 35,
      spd: 35,
      spe: 35
    },
    weightKg: 19.5,
    abilities: ["Guts", "No Guard", "Steadfast"],
    notFullyEvolved: true,
    group: "Regular"
  },
  machoke: {
    name: "Machoke",
    types: ["Fighting"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 70,
      spa: 50,
      spd: 60,
      spe: 45
    },
    weightKg: 70.5,
    abilities: ["Guts", "No Guard", "Steadfast"],
    notFullyEvolved: true,
    group: "Regular"
  },
  machamp: {
    name: "Machamp",
    types: ["Fighting"],
    baseStats: {
      hp: 90,
      atk: 130,
      def: 80,
      spa: 65,
      spd: 85,
      spe: 55
    },
    weightKg: 130,
    abilities: ["Guts", "No Guard", "Steadfast"],
    group: "Regular"
  },
  bellsprout: {
    name: "Bellsprout",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 50,
      atk: 75,
      def: 35,
      spa: 70,
      spd: 30,
      spe: 40
    },
    weightKg: 4,
    abilities: ["Chlorophyll", "Gluttony"],
    notFullyEvolved: true,
    group: "Regular"
  },
  weepinbell: {
    name: "Weepinbell",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 50,
      spa: 85,
      spd: 45,
      spe: 55
    },
    weightKg: 6.4,
    abilities: ["Chlorophyll", "Gluttony"],
    notFullyEvolved: true,
    group: "Regular"
  },
  victreebel: {
    name: "Victreebel",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 80,
      atk: 105,
      def: 65,
      spa: 100,
      spd: 70,
      spe: 70
    },
    weightKg: 15.5,
    abilities: ["Chlorophyll", "Gluttony"],
    group: "Regular"
  },
  victreebelmega: {
    name: "Victreebel-Mega",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 80,
      atk: 125,
      def: 85,
      spa: 135,
      spd: 95,
      spe: 70
    },
    weightKg: 125.5,
    abilities: ["Innards Out"],
    group: "Regular"
  },
  tentacool: {
    name: "Tentacool",
    types: ["Water", "Poison"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 35,
      spa: 50,
      spd: 100,
      spe: 70
    },
    weightKg: 45.5,
    abilities: ["Clear Body", "Liquid Ooze", "Rain Dish"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tentacruel: {
    name: "Tentacruel",
    types: ["Water", "Poison"],
    baseStats: {
      hp: 80,
      atk: 70,
      def: 65,
      spa: 80,
      spd: 120,
      spe: 100
    },
    weightKg: 55,
    abilities: ["Clear Body", "Liquid Ooze", "Rain Dish"],
    group: "Regular"
  },
  geodude: {
    name: "Geodude",
    types: ["Rock", "Ground"],
    baseStats: {
      hp: 40,
      atk: 80,
      def: 100,
      spa: 30,
      spd: 30,
      spe: 20
    },
    weightKg: 20,
    abilities: ["Rock Head", "Sturdy", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  geodudealola: {
    name: "Geodude-Alola",
    types: ["Rock", "Electric"],
    baseStats: {
      hp: 40,
      atk: 80,
      def: 100,
      spa: 30,
      spd: 30,
      spe: 20
    },
    weightKg: 20.3,
    abilities: ["Magnet Pull", "Sturdy", "Galvanize"],
    notFullyEvolved: true,
    group: "Regular"
  },
  graveler: {
    name: "Graveler",
    types: ["Rock", "Ground"],
    baseStats: {
      hp: 55,
      atk: 95,
      def: 115,
      spa: 45,
      spd: 45,
      spe: 35
    },
    weightKg: 105,
    abilities: ["Rock Head", "Sturdy", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  graveleralola: {
    name: "Graveler-Alola",
    types: ["Rock", "Electric"],
    baseStats: {
      hp: 55,
      atk: 95,
      def: 115,
      spa: 45,
      spd: 45,
      spe: 35
    },
    weightKg: 110,
    abilities: ["Magnet Pull", "Sturdy", "Galvanize"],
    notFullyEvolved: true,
    group: "Regular"
  },
  golem: {
    name: "Golem",
    types: ["Rock", "Ground"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 130,
      spa: 55,
      spd: 65,
      spe: 45
    },
    weightKg: 300,
    abilities: ["Rock Head", "Sturdy", "Sand Veil"],
    group: "Regular"
  },
  golemalola: {
    name: "Golem-Alola",
    types: ["Rock", "Electric"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 130,
      spa: 55,
      spd: 65,
      spe: 45
    },
    weightKg: 316,
    abilities: ["Magnet Pull", "Sturdy", "Galvanize"],
    group: "Regular"
  },
  ponyta: {
    name: "Ponyta",
    types: ["Fire"],
    baseStats: {
      hp: 50,
      atk: 85,
      def: 55,
      spa: 65,
      spd: 65,
      spe: 90
    },
    weightKg: 30,
    abilities: ["Run Away", "Flash Fire", "Flame Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ponytagalar: {
    name: "Ponyta-Galar",
    types: ["Psychic"],
    baseStats: {
      hp: 50,
      atk: 85,
      def: 55,
      spa: 65,
      spd: 65,
      spe: 90
    },
    weightKg: 24,
    abilities: ["Run Away", "Pastel Veil", "Anticipation"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rapidash: {
    name: "Rapidash",
    types: ["Fire"],
    baseStats: {
      hp: 65,
      atk: 100,
      def: 70,
      spa: 80,
      spd: 80,
      spe: 105
    },
    weightKg: 95,
    abilities: ["Run Away", "Flash Fire", "Flame Body"],
    group: "Regular"
  },
  rapidashgalar: {
    name: "Rapidash-Galar",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 65,
      atk: 100,
      def: 70,
      spa: 80,
      spd: 80,
      spe: 105
    },
    weightKg: 80,
    abilities: ["Run Away", "Pastel Veil", "Anticipation"],
    group: "Regular"
  },
  slowpoke: {
    name: "Slowpoke",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 65,
      def: 65,
      spa: 40,
      spd: 40,
      spe: 15
    },
    weightKg: 36,
    abilities: ["Oblivious", "Own Tempo", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  slowpokegalar: {
    name: "Slowpoke-Galar",
    types: ["Psychic"],
    baseStats: {
      hp: 90,
      atk: 65,
      def: 65,
      spa: 40,
      spd: 40,
      spe: 15
    },
    weightKg: 36,
    abilities: ["Gluttony", "Own Tempo", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  slowbro: {
    name: "Slowbro",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 95,
      atk: 75,
      def: 110,
      spa: 100,
      spd: 80,
      spe: 30
    },
    weightKg: 78.5,
    abilities: ["Oblivious", "Own Tempo", "Regenerator"],
    group: "Regular"
  },
  slowbrogalar: {
    name: "Slowbro-Galar",
    types: ["Poison", "Psychic"],
    baseStats: {
      hp: 95,
      atk: 100,
      def: 95,
      spa: 100,
      spd: 70,
      spe: 30
    },
    weightKg: 70.5,
    abilities: ["Quick Draw", "Own Tempo", "Regenerator"],
    group: "Regular"
  },
  slowbromega: {
    name: "Slowbro-Mega",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 95,
      atk: 75,
      def: 180,
      spa: 130,
      spd: 80,
      spe: 30
    },
    weightKg: 120,
    abilities: ["Shell Armor"],
    group: "Regular"
  },
  magnemite: {
    name: "Magnemite",
    types: ["Electric", "Steel"],
    baseStats: {
      hp: 25,
      atk: 35,
      def: 70,
      spa: 95,
      spd: 55,
      spe: 45
    },
    weightKg: 6,
    gender: "N",
    abilities: ["Magnet Pull", "Sturdy", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  magneton: {
    name: "Magneton",
    types: ["Electric", "Steel"],
    baseStats: {
      hp: 50,
      atk: 60,
      def: 95,
      spa: 120,
      spd: 70,
      spe: 70
    },
    weightKg: 60,
    gender: "N",
    abilities: ["Magnet Pull", "Sturdy", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  farfetchd: {
    name: "Farfetch’d",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 52,
      atk: 90,
      def: 55,
      spa: 58,
      spd: 62,
      spe: 60
    },
    weightKg: 15,
    abilities: ["Keen Eye", "Inner Focus", "Defiant"],
    group: "Regular"
  },
  farfetchdgalar: {
    name: "Farfetch’d-Galar",
    types: ["Fighting"],
    baseStats: {
      hp: 52,
      atk: 95,
      def: 55,
      spa: 58,
      spd: 62,
      spe: 55
    },
    weightKg: 42,
    abilities: ["Steadfast", "Scrappy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  doduo: {
    name: "Doduo",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 35,
      atk: 85,
      def: 45,
      spa: 35,
      spd: 35,
      spe: 75
    },
    weightKg: 39.2,
    abilities: ["Run Away", "Early Bird", "Tangled Feet"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dodrio: {
    name: "Dodrio",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 60,
      atk: 110,
      def: 70,
      spa: 60,
      spd: 60,
      spe: 110
    },
    weightKg: 85.2,
    abilities: ["Run Away", "Early Bird", "Tangled Feet"],
    group: "Regular"
  },
  seel: {
    name: "Seel",
    types: ["Water"],
    baseStats: {
      hp: 65,
      atk: 45,
      def: 55,
      spa: 45,
      spd: 70,
      spe: 45
    },
    weightKg: 90,
    abilities: ["Thick Fat", "Hydration", "Ice Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dewgong: {
    name: "Dewgong",
    types: ["Water", "Ice"],
    baseStats: {
      hp: 90,
      atk: 70,
      def: 80,
      spa: 70,
      spd: 95,
      spe: 70
    },
    weightKg: 120,
    abilities: ["Thick Fat", "Hydration", "Ice Body"],
    group: "Regular"
  },
  grimer: {
    name: "Grimer",
    types: ["Poison"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 25
    },
    weightKg: 30,
    abilities: ["Stench", "Sticky Hold", "Poison Touch"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grimeralola: {
    name: "Grimer-Alola",
    types: ["Poison", "Dark"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 25
    },
    weightKg: 42,
    abilities: ["Poison Touch", "Gluttony", "Power of Alchemy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  muk: {
    name: "Muk",
    types: ["Poison"],
    baseStats: {
      hp: 105,
      atk: 105,
      def: 75,
      spa: 65,
      spd: 100,
      spe: 50
    },
    weightKg: 30,
    abilities: ["Stench", "Sticky Hold", "Poison Touch"],
    group: "Regular"
  },
  mukalola: {
    name: "Muk-Alola",
    types: ["Poison", "Dark"],
    baseStats: {
      hp: 105,
      atk: 105,
      def: 75,
      spa: 65,
      spd: 100,
      spe: 50
    },
    weightKg: 52,
    abilities: ["Poison Touch", "Gluttony", "Power of Alchemy"],
    group: "Regular"
  },
  shellder: {
    name: "Shellder",
    types: ["Water"],
    baseStats: {
      hp: 30,
      atk: 65,
      def: 100,
      spa: 45,
      spd: 25,
      spe: 40
    },
    weightKg: 4,
    abilities: ["Shell Armor", "Skill Link", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cloyster: {
    name: "Cloyster",
    types: ["Water", "Ice"],
    baseStats: {
      hp: 50,
      atk: 95,
      def: 180,
      spa: 85,
      spd: 45,
      spe: 70
    },
    weightKg: 132.5,
    abilities: ["Shell Armor", "Skill Link", "Overcoat"],
    group: "Regular"
  },
  gastly: {
    name: "Gastly",
    types: ["Ghost", "Poison"],
    baseStats: {
      hp: 30,
      atk: 35,
      def: 30,
      spa: 100,
      spd: 35,
      spe: 80
    },
    weightKg: 0.1,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  haunter: {
    name: "Haunter",
    types: ["Ghost", "Poison"],
    baseStats: {
      hp: 45,
      atk: 50,
      def: 45,
      spa: 115,
      spd: 55,
      spe: 95
    },
    weightKg: 0.1,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gengar: {
    name: "Gengar",
    types: ["Ghost", "Poison"],
    baseStats: {
      hp: 60,
      atk: 65,
      def: 60,
      spa: 130,
      spd: 75,
      spe: 110
    },
    weightKg: 40.5,
    abilities: ["Cursed Body"],
    group: "Regular"
  },
  gengarmega: {
    name: "Gengar-Mega",
    types: ["Ghost", "Poison"],
    baseStats: {
      hp: 60,
      atk: 65,
      def: 80,
      spa: 170,
      spd: 95,
      spe: 130
    },
    weightKg: 40.5,
    abilities: ["Shadow Tag"],
    group: "Meta"
  },
  onix: {
    name: "Onix",
    types: ["Rock", "Ground"],
    baseStats: {
      hp: 35,
      atk: 45,
      def: 160,
      spa: 30,
      spd: 45,
      spe: 70
    },
    weightKg: 210,
    abilities: ["Rock Head", "Sturdy", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  drowzee: {
    name: "Drowzee",
    types: ["Psychic"],
    baseStats: {
      hp: 60,
      atk: 48,
      def: 45,
      spa: 43,
      spd: 90,
      spe: 42
    },
    weightKg: 32.4,
    abilities: ["Insomnia", "Forewarn", "Inner Focus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hypno: {
    name: "Hypno",
    types: ["Psychic"],
    baseStats: {
      hp: 85,
      atk: 73,
      def: 70,
      spa: 73,
      spd: 115,
      spe: 67
    },
    weightKg: 75.6,
    abilities: ["Insomnia", "Forewarn", "Inner Focus"],
    group: "Regular"
  },
  krabby: {
    name: "Krabby",
    types: ["Water"],
    baseStats: {
      hp: 30,
      atk: 105,
      def: 90,
      spa: 25,
      spd: 25,
      spe: 50
    },
    weightKg: 6.5,
    abilities: ["Hyper Cutter", "Shell Armor", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kingler: {
    name: "Kingler",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 130,
      def: 115,
      spa: 50,
      spd: 50,
      spe: 75
    },
    weightKg: 60,
    abilities: ["Hyper Cutter", "Shell Armor", "Sheer Force"],
    group: "Regular"
  },
  voltorb: {
    name: "Voltorb",
    types: ["Electric"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 50,
      spa: 55,
      spd: 55,
      spe: 100
    },
    weightKg: 10.4,
    gender: "N",
    abilities: ["Soundproof", "Static", "Aftermath"],
    notFullyEvolved: true,
    group: "Regular"
  },
  voltorbhisui: {
    name: "Voltorb-Hisui",
    types: ["Electric", "Grass"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 50,
      spa: 55,
      spd: 55,
      spe: 100
    },
    weightKg: 13,
    gender: "N",
    abilities: ["Soundproof", "Static", "Aftermath"],
    notFullyEvolved: true,
    group: "Regular"
  },
  electrode: {
    name: "Electrode",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 70,
      spa: 80,
      spd: 80,
      spe: 150
    },
    weightKg: 66.6,
    gender: "N",
    abilities: ["Soundproof", "Static", "Aftermath"],
    group: "Regular"
  },
  electrodehisui: {
    name: "Electrode-Hisui",
    types: ["Electric", "Grass"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 70,
      spa: 80,
      spd: 80,
      spe: 150
    },
    weightKg: 71,
    gender: "N",
    abilities: ["Soundproof", "Static", "Aftermath"],
    group: "Regular"
  },
  exeggcute: {
    name: "Exeggcute",
    types: ["Grass", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 40,
      def: 80,
      spa: 60,
      spd: 45,
      spe: 40
    },
    weightKg: 2.5,
    abilities: ["Chlorophyll", "Harvest"],
    notFullyEvolved: true,
    group: "Regular"
  },
  exeggutor: {
    name: "Exeggutor",
    types: ["Grass", "Psychic"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 85,
      spa: 125,
      spd: 75,
      spe: 55
    },
    weightKg: 120,
    abilities: ["Chlorophyll", "Harvest"],
    group: "Regular"
  },
  exeggutoralola: {
    name: "Exeggutor-Alola",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 95,
      atk: 105,
      def: 85,
      spa: 125,
      spd: 75,
      spe: 45
    },
    weightKg: 415.6,
    abilities: ["Frisk", "Harvest"],
    group: "Regular"
  },
  cubone: {
    name: "Cubone",
    types: ["Ground"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 95,
      spa: 40,
      spd: 50,
      spe: 35
    },
    weightKg: 6.5,
    abilities: ["Rock Head", "Lightning Rod", "Battle Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  marowak: {
    name: "Marowak",
    types: ["Ground"],
    baseStats: {
      hp: 60,
      atk: 80,
      def: 110,
      spa: 50,
      spd: 80,
      spe: 45
    },
    weightKg: 45,
    abilities: ["Rock Head", "Lightning Rod", "Battle Armor"],
    group: "Regular"
  },
  marowakalola: {
    name: "Marowak-Alola",
    types: ["Fire", "Ghost"],
    baseStats: {
      hp: 60,
      atk: 80,
      def: 110,
      spa: 50,
      spd: 80,
      spe: 45
    },
    weightKg: 34,
    abilities: ["Cursed Body", "Lightning Rod", "Rock Head"],
    group: "Regular"
  },
  hitmonlee: {
    name: "Hitmonlee",
    types: ["Fighting"],
    baseStats: {
      hp: 50,
      atk: 120,
      def: 53,
      spa: 35,
      spd: 110,
      spe: 87
    },
    weightKg: 49.8,
    gender: "M",
    abilities: ["Limber", "Reckless", "Unburden"],
    group: "Regular"
  },
  hitmonchan: {
    name: "Hitmonchan",
    types: ["Fighting"],
    baseStats: {
      hp: 50,
      atk: 105,
      def: 79,
      spa: 35,
      spd: 110,
      spe: 76
    },
    weightKg: 50.2,
    gender: "M",
    abilities: ["Keen Eye", "Iron Fist", "Inner Focus"],
    group: "Regular"
  },
  lickitung: {
    name: "Lickitung",
    types: ["Normal"],
    baseStats: {
      hp: 90,
      atk: 55,
      def: 75,
      spa: 60,
      spd: 75,
      spe: 30
    },
    weightKg: 65.5,
    abilities: ["Own Tempo", "Oblivious", "Cloud Nine"],
    notFullyEvolved: true,
    group: "Regular"
  },
  koffing: {
    name: "Koffing",
    types: ["Poison"],
    baseStats: {
      hp: 40,
      atk: 65,
      def: 95,
      spa: 60,
      spd: 45,
      spe: 35
    },
    weightKg: 1,
    abilities: ["Levitate", "Neutralizing Gas", "Stench"],
    notFullyEvolved: true,
    group: "Regular"
  },
  weezing: {
    name: "Weezing",
    types: ["Poison"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 120,
      spa: 85,
      spd: 70,
      spe: 60
    },
    weightKg: 9.5,
    abilities: ["Levitate", "Neutralizing Gas", "Stench"],
    group: "Regular"
  },
  weezinggalar: {
    name: "Weezing-Galar",
    types: ["Poison", "Fairy"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 120,
      spa: 85,
      spd: 70,
      spe: 60
    },
    weightKg: 16,
    abilities: ["Levitate", "Neutralizing Gas", "Misty Surge"],
    group: "Regular"
  },
  rhyhorn: {
    name: "Rhyhorn",
    types: ["Ground", "Rock"],
    baseStats: {
      hp: 80,
      atk: 85,
      def: 95,
      spa: 30,
      spd: 30,
      spe: 25
    },
    weightKg: 115,
    abilities: ["Lightning Rod", "Rock Head", "Reckless"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rhydon: {
    name: "Rhydon",
    types: ["Ground", "Rock"],
    baseStats: {
      hp: 105,
      atk: 130,
      def: 120,
      spa: 45,
      spd: 45,
      spe: 40
    },
    weightKg: 120,
    abilities: ["Lightning Rod", "Rock Head", "Reckless"],
    notFullyEvolved: true,
    group: "Regular"
  },
  chansey: {
    name: "Chansey",
    types: ["Normal"],
    baseStats: {
      hp: 250,
      atk: 5,
      def: 5,
      spa: 35,
      spd: 105,
      spe: 50
    },
    weightKg: 34.6,
    gender: "F",
    abilities: ["Natural Cure", "Serene Grace", "Healer"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tangela: {
    name: "Tangela",
    types: ["Grass"],
    baseStats: {
      hp: 65,
      atk: 55,
      def: 115,
      spa: 100,
      spd: 40,
      spe: 60
    },
    weightKg: 35,
    abilities: ["Chlorophyll", "Leaf Guard", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kangaskhan: {
    name: "Kangaskhan",
    types: ["Normal"],
    baseStats: {
      hp: 105,
      atk: 95,
      def: 80,
      spa: 40,
      spd: 80,
      spe: 90
    },
    weightKg: 80,
    gender: "F",
    abilities: ["Early Bird", "Scrappy", "Inner Focus"],
    group: "Low usage"
  },
  kangaskhanmega: {
    name: "Kangaskhan-Mega",
    types: ["Normal"],
    baseStats: {
      hp: 105,
      atk: 125,
      def: 100,
      spa: 60,
      spd: 100,
      spe: 100
    },
    weightKg: 100,
    gender: "F",
    abilities: ["Parental Bond"],
    group: "Low usage"
  },
  horsea: {
    name: "Horsea",
    types: ["Water"],
    baseStats: {
      hp: 30,
      atk: 40,
      def: 70,
      spa: 70,
      spd: 25,
      spe: 60
    },
    weightKg: 8,
    abilities: ["Swift Swim", "Sniper", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  seadra: {
    name: "Seadra",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 65,
      def: 95,
      spa: 95,
      spd: 45,
      spe: 85
    },
    weightKg: 25,
    abilities: ["Poison Point", "Sniper", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  goldeen: {
    name: "Goldeen",
    types: ["Water"],
    baseStats: {
      hp: 45,
      atk: 67,
      def: 60,
      spa: 35,
      spd: 50,
      spe: 63
    },
    weightKg: 15,
    abilities: ["Swift Swim", "Water Veil", "Lightning Rod"],
    notFullyEvolved: true,
    group: "Regular"
  },
  seaking: {
    name: "Seaking",
    types: ["Water"],
    baseStats: {
      hp: 80,
      atk: 92,
      def: 65,
      spa: 65,
      spd: 80,
      spe: 68
    },
    weightKg: 39,
    abilities: ["Swift Swim", "Water Veil", "Lightning Rod"],
    group: "Regular"
  },
  staryu: {
    name: "Staryu",
    types: ["Water"],
    baseStats: {
      hp: 30,
      atk: 45,
      def: 55,
      spa: 70,
      spd: 55,
      spe: 85
    },
    weightKg: 34.5,
    gender: "N",
    abilities: ["Illuminate", "Natural Cure", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  starmie: {
    name: "Starmie",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 75,
      def: 85,
      spa: 100,
      spd: 85,
      spe: 115
    },
    weightKg: 80,
    gender: "N",
    abilities: ["Illuminate", "Natural Cure", "Analytic"],
    group: "Regular"
  },
  starmiemega: {
    name: "Starmie-Mega",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 100,
      def: 105,
      spa: 130,
      spd: 105,
      spe: 120
    },
    weightKg: 80,
    gender: "N",
    abilities: ["Huge Power"],
    group: "Regular"
  },
  mrmime: {
    name: "Mr. Mime",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 65,
      spa: 100,
      spd: 120,
      spe: 90
    },
    weightKg: 54.5,
    abilities: ["Soundproof", "Filter", "Technician"],
    group: "Regular"
  },
  mrmimegalar: {
    name: "Mr. Mime-Galar",
    types: ["Ice", "Psychic"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 65,
      spa: 90,
      spd: 90,
      spe: 100
    },
    weightKg: 56.8,
    abilities: ["Vital Spirit", "Screen Cleaner", "Ice Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  scyther: {
    name: "Scyther",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 70,
      atk: 110,
      def: 80,
      spa: 55,
      spd: 80,
      spe: 105
    },
    weightKg: 56,
    abilities: ["Swarm", "Technician", "Steadfast"],
    notFullyEvolved: true,
    group: "Regular"
  },
  jynx: {
    name: "Jynx",
    types: ["Ice", "Psychic"],
    baseStats: {
      hp: 65,
      atk: 50,
      def: 35,
      spa: 115,
      spd: 95,
      spe: 95
    },
    weightKg: 40.6,
    gender: "F",
    abilities: ["Oblivious", "Forewarn", "Dry Skin"],
    group: "Regular"
  },
  electabuzz: {
    name: "Electabuzz",
    types: ["Electric"],
    baseStats: {
      hp: 65,
      atk: 83,
      def: 57,
      spa: 95,
      spd: 85,
      spe: 105
    },
    weightKg: 30,
    abilities: ["Static", "Vital Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  magmar: {
    name: "Magmar",
    types: ["Fire"],
    baseStats: {
      hp: 65,
      atk: 95,
      def: 57,
      spa: 100,
      spd: 85,
      spe: 93
    },
    weightKg: 44.5,
    abilities: ["Flame Body", "Vital Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pinsir: {
    name: "Pinsir",
    types: ["Bug"],
    baseStats: {
      hp: 65,
      atk: 125,
      def: 100,
      spa: 55,
      spd: 70,
      spe: 85
    },
    weightKg: 55,
    abilities: ["Hyper Cutter", "Mold Breaker", "Moxie"],
    group: "Regular"
  },
  pinsirmega: {
    name: "Pinsir-Mega",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 65,
      atk: 155,
      def: 120,
      spa: 65,
      spd: 90,
      spe: 105
    },
    weightKg: 59,
    abilities: ["Aerilate"],
    group: "Regular"
  },
  tauros: {
    name: "Tauros",
    types: ["Normal"],
    baseStats: {
      hp: 75,
      atk: 100,
      def: 95,
      spa: 40,
      spd: 70,
      spe: 110
    },
    weightKg: 88.4,
    gender: "M",
    abilities: ["Intimidate", "Anger Point", "Sheer Force"],
    group: "Regular"
  },
  taurospaldeaaqua: {
    name: "Tauros-Paldea-Aqua",
    types: ["Fighting", "Water"],
    baseStats: {
      hp: 75,
      atk: 110,
      def: 105,
      spa: 30,
      spd: 70,
      spe: 100
    },
    weightKg: 110,
    gender: "M",
    abilities: ["Intimidate", "Anger Point", "Cud Chew"],
    group: "Regular"
  },
  taurospaldeablaze: {
    name: "Tauros-Paldea-Blaze",
    types: ["Fighting", "Fire"],
    baseStats: {
      hp: 75,
      atk: 110,
      def: 105,
      spa: 30,
      spd: 70,
      spe: 100
    },
    weightKg: 85,
    gender: "M",
    abilities: ["Intimidate", "Anger Point", "Cud Chew"],
    group: "Regular"
  },
  taurospaldeacombat: {
    name: "Tauros-Paldea-Combat",
    types: ["Fighting"],
    baseStats: {
      hp: 75,
      atk: 110,
      def: 105,
      spa: 30,
      spd: 70,
      spe: 100
    },
    weightKg: 115,
    gender: "M",
    abilities: ["Intimidate", "Anger Point", "Cud Chew"],
    group: "Regular"
  },
  magikarp: {
    name: "Magikarp",
    types: ["Water"],
    baseStats: {
      hp: 20,
      atk: 10,
      def: 55,
      spa: 15,
      spd: 20,
      spe: 80
    },
    weightKg: 10,
    abilities: ["Swift Swim", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gyarados: {
    name: "Gyarados",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 95,
      atk: 125,
      def: 79,
      spa: 60,
      spd: 100,
      spe: 81
    },
    weightKg: 235,
    abilities: ["Intimidate", "Moxie"],
    group: "Low usage"
  },
  gyaradosmega: {
    name: "Gyarados-Mega",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 95,
      atk: 155,
      def: 109,
      spa: 70,
      spd: 130,
      spe: 81
    },
    weightKg: 305,
    abilities: ["Mold Breaker"],
    group: "Low usage"
  },
  lapras: {
    name: "Lapras",
    types: ["Water", "Ice"],
    baseStats: {
      hp: 130,
      atk: 85,
      def: 80,
      spa: 85,
      spd: 95,
      spe: 60
    },
    weightKg: 220,
    abilities: ["Water Absorb", "Shell Armor", "Hydration"],
    group: "Regular"
  },
  ditto: {
    name: "Ditto",
    types: ["Normal"],
    baseStats: {
      hp: 48,
      atk: 48,
      def: 48,
      spa: 48,
      spd: 48,
      spe: 48
    },
    weightKg: 4,
    gender: "N",
    abilities: ["Limber", "Imposter"],
    group: "Regular"
  },
  eevee: {
    name: "Eevee",
    types: ["Normal"],
    baseStats: {
      hp: 55,
      atk: 55,
      def: 50,
      spa: 45,
      spd: 65,
      spe: 55
    },
    weightKg: 6.5,
    abilities: ["Run Away", "Adaptability", "Anticipation"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vaporeon: {
    name: "Vaporeon",
    types: ["Water"],
    baseStats: {
      hp: 130,
      atk: 65,
      def: 60,
      spa: 110,
      spd: 95,
      spe: 65
    },
    weightKg: 29,
    abilities: ["Water Absorb", "Hydration"],
    group: "Low usage"
  },
  jolteon: {
    name: "Jolteon",
    types: ["Electric"],
    baseStats: {
      hp: 65,
      atk: 65,
      def: 60,
      spa: 110,
      spd: 95,
      spe: 130
    },
    weightKg: 24.5,
    abilities: ["Volt Absorb", "Quick Feet"],
    group: "Regular"
  },
  flareon: {
    name: "Flareon",
    types: ["Fire"],
    baseStats: {
      hp: 65,
      atk: 130,
      def: 60,
      spa: 95,
      spd: 110,
      spe: 65
    },
    weightKg: 25,
    abilities: ["Flash Fire", "Guts"],
    group: "Regular"
  },
  porygon: {
    name: "Porygon",
    types: ["Normal"],
    baseStats: {
      hp: 65,
      atk: 60,
      def: 70,
      spa: 85,
      spd: 75,
      spe: 40
    },
    weightKg: 36.5,
    gender: "N",
    abilities: ["Trace", "Download", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  omanyte: {
    name: "Omanyte",
    types: ["Rock", "Water"],
    baseStats: {
      hp: 35,
      atk: 40,
      def: 100,
      spa: 90,
      spd: 55,
      spe: 35
    },
    weightKg: 7.5,
    abilities: ["Swift Swim", "Shell Armor", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  omastar: {
    name: "Omastar",
    types: ["Rock", "Water"],
    baseStats: {
      hp: 70,
      atk: 60,
      def: 125,
      spa: 115,
      spd: 70,
      spe: 55
    },
    weightKg: 35,
    abilities: ["Swift Swim", "Shell Armor", "Weak Armor"],
    group: "Regular"
  },
  kabuto: {
    name: "Kabuto",
    types: ["Rock", "Water"],
    baseStats: {
      hp: 30,
      atk: 80,
      def: 90,
      spa: 55,
      spd: 45,
      spe: 55
    },
    weightKg: 11.5,
    abilities: ["Swift Swim", "Battle Armor", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kabutops: {
    name: "Kabutops",
    types: ["Rock", "Water"],
    baseStats: {
      hp: 60,
      atk: 115,
      def: 105,
      spa: 65,
      spd: 70,
      spe: 80
    },
    weightKg: 40.5,
    abilities: ["Swift Swim", "Battle Armor", "Weak Armor"],
    group: "Regular"
  },
  aerodactyl: {
    name: "Aerodactyl",
    types: ["Rock", "Flying"],
    baseStats: {
      hp: 80,
      atk: 105,
      def: 65,
      spa: 60,
      spd: 75,
      spe: 130
    },
    weightKg: 59,
    abilities: ["Rock Head", "Pressure", "Unnerve"],
    group: "Meta"
  },
  aerodactylmega: {
    name: "Aerodactyl-Mega",
    types: ["Rock", "Flying"],
    baseStats: {
      hp: 80,
      atk: 135,
      def: 85,
      spa: 70,
      spd: 95,
      spe: 150
    },
    weightKg: 79,
    abilities: ["Tough Claws"],
    group: "Meta"
  },
  snorlax: {
    name: "Snorlax",
    types: ["Normal"],
    baseStats: {
      hp: 160,
      atk: 110,
      def: 65,
      spa: 65,
      spd: 110,
      spe: 30
    },
    weightKg: 460,
    abilities: ["Immunity", "Thick Fat", "Gluttony"],
    group: "Low usage"
  },
  articuno: {
    name: "Articuno",
    types: ["Ice", "Flying"],
    baseStats: {
      hp: 90,
      atk: 85,
      def: 100,
      spa: 95,
      spd: 125,
      spe: 85
    },
    weightKg: 55.4,
    gender: "N",
    abilities: ["Pressure", "Snow Cloak"],
    group: "Regular"
  },
  articunogalar: {
    name: "Articuno-Galar",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 90,
      atk: 85,
      def: 85,
      spa: 125,
      spd: 100,
      spe: 95
    },
    weightKg: 50.9,
    gender: "N",
    abilities: ["Competitive"],
    group: "Regular"
  },
  zapdos: {
    name: "Zapdos",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 90,
      atk: 90,
      def: 85,
      spa: 125,
      spd: 90,
      spe: 100
    },
    weightKg: 52.6,
    gender: "N",
    abilities: ["Pressure", "Static"],
    group: "Regular"
  },
  zapdosgalar: {
    name: "Zapdos-Galar",
    types: ["Fighting", "Flying"],
    baseStats: {
      hp: 90,
      atk: 125,
      def: 90,
      spa: 85,
      spd: 90,
      spe: 100
    },
    weightKg: 58.2,
    gender: "N",
    abilities: ["Defiant"],
    group: "Regular"
  },
  moltres: {
    name: "Moltres",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 90,
      atk: 100,
      def: 90,
      spa: 125,
      spd: 85,
      spe: 90
    },
    weightKg: 60,
    gender: "N",
    abilities: ["Pressure", "Flame Body"],
    group: "Regular"
  },
  moltresgalar: {
    name: "Moltres-Galar",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 90,
      atk: 85,
      def: 90,
      spa: 100,
      spd: 125,
      spe: 90
    },
    weightKg: 66,
    gender: "N",
    abilities: ["Berserk"],
    group: "Regular"
  },
  dratini: {
    name: "Dratini",
    types: ["Dragon"],
    baseStats: {
      hp: 41,
      atk: 64,
      def: 45,
      spa: 50,
      spd: 50,
      spe: 50
    },
    weightKg: 3.3,
    abilities: ["Shed Skin", "Marvel Scale"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dragonair: {
    name: "Dragonair",
    types: ["Dragon"],
    baseStats: {
      hp: 61,
      atk: 84,
      def: 65,
      spa: 70,
      spd: 70,
      spe: 70
    },
    weightKg: 16.5,
    abilities: ["Shed Skin", "Marvel Scale"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dragonite: {
    name: "Dragonite",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 91,
      atk: 134,
      def: 95,
      spa: 100,
      spd: 100,
      spe: 80
    },
    weightKg: 210,
    abilities: ["Inner Focus", "Multiscale"],
    group: "Meta"
  },
  dragonitemega: {
    name: "Dragonite-Mega",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 91,
      atk: 124,
      def: 115,
      spa: 145,
      spd: 125,
      spe: 100
    },
    weightKg: 290,
    abilities: ["Multiscale"],
    group: "Meta"
  },
  mewtwo: {
    name: "Mewtwo",
    types: ["Psychic"],
    baseStats: {
      hp: 106,
      atk: 110,
      def: 90,
      spa: 154,
      spd: 90,
      spe: 130
    },
    weightKg: 122,
    gender: "N",
    abilities: ["Pressure", "Unnerve"],
    group: "Regular"
  },
  mewtwomegax: {
    name: "Mewtwo-Mega-X",
    types: ["Psychic", "Fighting"],
    baseStats: {
      hp: 106,
      atk: 190,
      def: 100,
      spa: 154,
      spd: 100,
      spe: 130
    },
    weightKg: 127,
    gender: "N",
    abilities: ["Steadfast"],
    group: "Regular"
  },
  mewtwomegay: {
    name: "Mewtwo-Mega-Y",
    types: ["Psychic"],
    baseStats: {
      hp: 106,
      atk: 150,
      def: 70,
      spa: 194,
      spd: 120,
      spe: 140
    },
    weightKg: 33,
    gender: "N",
    abilities: ["Insomnia"],
    group: "Regular"
  },
  mew: {
    name: "Mew",
    types: ["Psychic"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 100,
      spa: 100,
      spd: 100,
      spe: 100
    },
    weightKg: 4,
    gender: "N",
    abilities: ["Synchronize"],
    group: "Regular"
  },
  chikorita: {
    name: "Chikorita",
    types: ["Grass"],
    baseStats: {
      hp: 45,
      atk: 49,
      def: 65,
      spa: 49,
      spd: 65,
      spe: 45
    },
    weightKg: 6.4,
    abilities: ["Overgrow", "Leaf Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bayleef: {
    name: "Bayleef",
    types: ["Grass"],
    baseStats: {
      hp: 60,
      atk: 62,
      def: 80,
      spa: 63,
      spd: 80,
      spe: 60
    },
    weightKg: 15.8,
    abilities: ["Overgrow", "Leaf Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  meganium: {
    name: "Meganium",
    types: ["Grass"],
    baseStats: {
      hp: 80,
      atk: 82,
      def: 100,
      spa: 83,
      spd: 100,
      spe: 80
    },
    weightKg: 100.5,
    abilities: ["Overgrow", "Leaf Guard"],
    group: "Regular"
  },
  meganiummega: {
    name: "Meganium-Mega",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 92,
      def: 115,
      spa: 143,
      spd: 115,
      spe: 80
    },
    weightKg: 201,
    abilities: ["Mega Sol"],
    group: "Low usage"
  },
  cyndaquil: {
    name: "Cyndaquil",
    types: ["Fire"],
    baseStats: {
      hp: 39,
      atk: 52,
      def: 43,
      spa: 60,
      spd: 50,
      spe: 65
    },
    weightKg: 7.9,
    abilities: ["Blaze", "Flash Fire"],
    notFullyEvolved: true,
    group: "Regular"
  },
  quilava: {
    name: "Quilava",
    types: ["Fire"],
    baseStats: {
      hp: 58,
      atk: 64,
      def: 58,
      spa: 80,
      spd: 65,
      spe: 80
    },
    weightKg: 19,
    abilities: ["Blaze", "Flash Fire"],
    notFullyEvolved: true,
    group: "Regular"
  },
  typhlosion: {
    name: "Typhlosion",
    types: ["Fire"],
    baseStats: {
      hp: 78,
      atk: 84,
      def: 78,
      spa: 109,
      spd: 85,
      spe: 100
    },
    weightKg: 79.5,
    abilities: ["Blaze", "Flash Fire"],
    group: "Regular"
  },
  typhlosionhisui: {
    name: "Typhlosion-Hisui",
    types: ["Fire", "Ghost"],
    baseStats: {
      hp: 73,
      atk: 84,
      def: 78,
      spa: 119,
      spd: 85,
      spe: 95
    },
    weightKg: 69.8,
    abilities: ["Blaze", "Frisk"],
    group: "Low usage"
  },
  totodile: {
    name: "Totodile",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 64,
      spa: 44,
      spd: 48,
      spe: 43
    },
    weightKg: 9.5,
    abilities: ["Torrent", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  croconaw: {
    name: "Croconaw",
    types: ["Water"],
    baseStats: {
      hp: 65,
      atk: 80,
      def: 80,
      spa: 59,
      spd: 63,
      spe: 58
    },
    weightKg: 25,
    abilities: ["Torrent", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  feraligatr: {
    name: "Feraligatr",
    types: ["Water"],
    baseStats: {
      hp: 85,
      atk: 105,
      def: 100,
      spa: 79,
      spd: 83,
      spe: 78
    },
    weightKg: 88.8,
    abilities: ["Torrent", "Sheer Force"],
    group: "Regular"
  },
  feraligatrmega: {
    name: "Feraligatr-Mega",
    types: ["Water", "Dragon"],
    baseStats: {
      hp: 85,
      atk: 160,
      def: 125,
      spa: 89,
      spd: 93,
      spe: 78
    },
    weightKg: 108.8,
    abilities: ["Dragonize"],
    group: "Regular"
  },
  sentret: {
    name: "Sentret",
    types: ["Normal"],
    baseStats: {
      hp: 35,
      atk: 46,
      def: 34,
      spa: 35,
      spd: 45,
      spe: 20
    },
    weightKg: 6,
    abilities: ["Run Away", "Keen Eye", "Frisk"],
    notFullyEvolved: true,
    group: "Regular"
  },
  furret: {
    name: "Furret",
    types: ["Normal"],
    baseStats: {
      hp: 85,
      atk: 76,
      def: 64,
      spa: 45,
      spd: 55,
      spe: 90
    },
    weightKg: 32.5,
    abilities: ["Run Away", "Keen Eye", "Frisk"],
    group: "Regular"
  },
  hoothoot: {
    name: "Hoothoot",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 60,
      atk: 30,
      def: 30,
      spa: 36,
      spd: 56,
      spe: 50
    },
    weightKg: 21.2,
    abilities: ["Insomnia", "Keen Eye", "Tinted Lens"],
    notFullyEvolved: true,
    group: "Regular"
  },
  noctowl: {
    name: "Noctowl",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 100,
      atk: 50,
      def: 50,
      spa: 86,
      spd: 96,
      spe: 70
    },
    weightKg: 40.8,
    abilities: ["Insomnia", "Keen Eye", "Tinted Lens"],
    group: "Regular"
  },
  ledyba: {
    name: "Ledyba",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 40,
      atk: 20,
      def: 30,
      spa: 40,
      spd: 80,
      spe: 55
    },
    weightKg: 10.8,
    abilities: ["Swarm", "Early Bird", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ledian: {
    name: "Ledian",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 55,
      atk: 35,
      def: 50,
      spa: 55,
      spd: 110,
      spe: 85
    },
    weightKg: 35.6,
    abilities: ["Swarm", "Early Bird", "Iron Fist"],
    group: "Regular"
  },
  spinarak: {
    name: "Spinarak",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 40,
      atk: 60,
      def: 40,
      spa: 40,
      spd: 40,
      spe: 30
    },
    weightKg: 8.5,
    abilities: ["Swarm", "Insomnia", "Sniper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ariados: {
    name: "Ariados",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 70,
      atk: 90,
      def: 70,
      spa: 60,
      spd: 70,
      spe: 40
    },
    weightKg: 33.5,
    abilities: ["Swarm", "Insomnia", "Sniper"],
    group: "Regular"
  },
  crobat: {
    name: "Crobat",
    types: ["Poison", "Flying"],
    baseStats: {
      hp: 85,
      atk: 90,
      def: 80,
      spa: 70,
      spd: 80,
      spe: 130
    },
    weightKg: 75,
    abilities: ["Inner Focus", "Infiltrator"],
    group: "Regular"
  },
  chinchou: {
    name: "Chinchou",
    types: ["Water", "Electric"],
    baseStats: {
      hp: 75,
      atk: 38,
      def: 38,
      spa: 56,
      spd: 56,
      spe: 67
    },
    weightKg: 12,
    abilities: ["Volt Absorb", "Illuminate", "Water Absorb"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lanturn: {
    name: "Lanturn",
    types: ["Water", "Electric"],
    baseStats: {
      hp: 125,
      atk: 58,
      def: 58,
      spa: 76,
      spd: 76,
      spe: 67
    },
    weightKg: 22.5,
    abilities: ["Volt Absorb", "Illuminate", "Water Absorb"],
    group: "Regular"
  },
  pichu: {
    name: "Pichu",
    types: ["Electric"],
    baseStats: {
      hp: 20,
      atk: 40,
      def: 15,
      spa: 35,
      spd: 35,
      spe: 60
    },
    weightKg: 2,
    abilities: ["Static", "Lightning Rod"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cleffa: {
    name: "Cleffa",
    types: ["Fairy"],
    baseStats: {
      hp: 50,
      atk: 25,
      def: 28,
      spa: 45,
      spd: 55,
      spe: 15
    },
    weightKg: 3,
    abilities: ["Cute Charm", "Magic Guard", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  igglybuff: {
    name: "Igglybuff",
    types: ["Normal", "Fairy"],
    baseStats: {
      hp: 90,
      atk: 30,
      def: 15,
      spa: 40,
      spd: 20,
      spe: 15
    },
    weightKg: 1,
    abilities: ["Cute Charm", "Competitive", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  togepi: {
    name: "Togepi",
    types: ["Fairy"],
    baseStats: {
      hp: 35,
      atk: 20,
      def: 65,
      spa: 40,
      spd: 65,
      spe: 20
    },
    weightKg: 1.5,
    abilities: ["Hustle", "Serene Grace", "Super Luck"],
    notFullyEvolved: true,
    group: "Regular"
  },
  togetic: {
    name: "Togetic",
    types: ["Fairy", "Flying"],
    baseStats: {
      hp: 55,
      atk: 40,
      def: 85,
      spa: 80,
      spd: 105,
      spe: 40
    },
    weightKg: 3.2,
    abilities: ["Hustle", "Serene Grace", "Super Luck"],
    notFullyEvolved: true,
    group: "Regular"
  },
  natu: {
    name: "Natu",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 40,
      atk: 50,
      def: 45,
      spa: 70,
      spd: 45,
      spe: 70
    },
    weightKg: 2,
    abilities: ["Synchronize", "Early Bird", "Magic Bounce"],
    notFullyEvolved: true,
    group: "Regular"
  },
  xatu: {
    name: "Xatu",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 65,
      atk: 75,
      def: 70,
      spa: 95,
      spd: 70,
      spe: 95
    },
    weightKg: 15,
    abilities: ["Synchronize", "Early Bird", "Magic Bounce"],
    group: "Regular"
  },
  mareep: {
    name: "Mareep",
    types: ["Electric"],
    baseStats: {
      hp: 55,
      atk: 40,
      def: 40,
      spa: 65,
      spd: 45,
      spe: 35
    },
    weightKg: 7.8,
    abilities: ["Static", "Plus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  flaaffy: {
    name: "Flaaffy",
    types: ["Electric"],
    baseStats: {
      hp: 70,
      atk: 55,
      def: 55,
      spa: 80,
      spd: 60,
      spe: 45
    },
    weightKg: 13.3,
    abilities: ["Static", "Plus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ampharos: {
    name: "Ampharos",
    types: ["Electric"],
    baseStats: {
      hp: 90,
      atk: 75,
      def: 85,
      spa: 115,
      spd: 90,
      spe: 55
    },
    weightKg: 61.5,
    abilities: ["Static", "Plus"],
    group: "Low usage"
  },
  ampharosmega: {
    name: "Ampharos-Mega",
    types: ["Electric", "Dragon"],
    baseStats: {
      hp: 90,
      atk: 95,
      def: 105,
      spa: 165,
      spd: 110,
      spe: 45
    },
    weightKg: 61.5,
    abilities: ["Mold Breaker"],
    group: "Regular"
  },
  bellossom: {
    name: "Bellossom",
    types: ["Grass"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 95,
      spa: 90,
      spd: 100,
      spe: 50
    },
    weightKg: 5.8,
    abilities: ["Chlorophyll", "Healer"],
    group: "Regular"
  },
  marill: {
    name: "Marill",
    types: ["Water", "Fairy"],
    baseStats: {
      hp: 70,
      atk: 20,
      def: 50,
      spa: 20,
      spd: 50,
      spe: 40
    },
    weightKg: 8.5,
    abilities: ["Thick Fat", "Huge Power", "Sap Sipper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  azumarill: {
    name: "Azumarill",
    types: ["Water", "Fairy"],
    baseStats: {
      hp: 100,
      atk: 50,
      def: 80,
      spa: 60,
      spd: 80,
      spe: 50
    },
    weightKg: 28.5,
    abilities: ["Thick Fat", "Huge Power", "Sap Sipper"],
    group: "Low usage"
  },
  sudowoodo: {
    name: "Sudowoodo",
    types: ["Rock"],
    baseStats: {
      hp: 70,
      atk: 100,
      def: 115,
      spa: 30,
      spd: 65,
      spe: 30
    },
    weightKg: 38,
    abilities: ["Sturdy", "Rock Head", "Rattled"],
    group: "Regular"
  },
  politoed: {
    name: "Politoed",
    types: ["Water"],
    baseStats: {
      hp: 90,
      atk: 75,
      def: 75,
      spa: 90,
      spd: 100,
      spe: 70
    },
    weightKg: 33.9,
    abilities: ["Water Absorb", "Damp", "Drizzle"],
    group: "Meta"
  },
  hoppip: {
    name: "Hoppip",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 35,
      atk: 35,
      def: 40,
      spa: 35,
      spd: 55,
      spe: 50
    },
    weightKg: 0.5,
    abilities: ["Chlorophyll", "Leaf Guard", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  skiploom: {
    name: "Skiploom",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 55,
      atk: 45,
      def: 50,
      spa: 45,
      spd: 65,
      spe: 80
    },
    weightKg: 1,
    abilities: ["Chlorophyll", "Leaf Guard", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  jumpluff: {
    name: "Jumpluff",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 75,
      atk: 55,
      def: 70,
      spa: 55,
      spd: 95,
      spe: 110
    },
    weightKg: 3,
    abilities: ["Chlorophyll", "Leaf Guard", "Infiltrator"],
    group: "Regular"
  },
  aipom: {
    name: "Aipom",
    types: ["Normal"],
    baseStats: {
      hp: 55,
      atk: 70,
      def: 55,
      spa: 40,
      spd: 55,
      spe: 85
    },
    weightKg: 11.5,
    abilities: ["Run Away", "Pickup", "Skill Link"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sunkern: {
    name: "Sunkern",
    types: ["Grass"],
    baseStats: {
      hp: 30,
      atk: 30,
      def: 30,
      spa: 30,
      spd: 30,
      spe: 30
    },
    weightKg: 1.8,
    abilities: ["Chlorophyll", "Solar Power", "Early Bird"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sunflora: {
    name: "Sunflora",
    types: ["Grass"],
    baseStats: {
      hp: 75,
      atk: 75,
      def: 55,
      spa: 105,
      spd: 85,
      spe: 30
    },
    weightKg: 8.5,
    abilities: ["Chlorophyll", "Solar Power", "Early Bird"],
    group: "Regular"
  },
  yanma: {
    name: "Yanma",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 65,
      atk: 65,
      def: 45,
      spa: 75,
      spd: 45,
      spe: 95
    },
    weightKg: 38,
    abilities: ["Speed Boost", "Compound Eyes", "Frisk"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wooper: {
    name: "Wooper",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 55,
      atk: 45,
      def: 45,
      spa: 25,
      spd: 25,
      spe: 15
    },
    weightKg: 8.5,
    abilities: ["Damp", "Water Absorb", "Unaware"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wooperpaldea: {
    name: "Wooper-Paldea",
    types: ["Poison", "Ground"],
    baseStats: {
      hp: 55,
      atk: 45,
      def: 45,
      spa: 25,
      spd: 25,
      spe: 15
    },
    weightKg: 11,
    abilities: ["Poison Point", "Water Absorb", "Unaware"],
    notFullyEvolved: true,
    group: "Regular"
  },
  quagsire: {
    name: "Quagsire",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 95,
      atk: 85,
      def: 85,
      spa: 65,
      spd: 65,
      spe: 35
    },
    weightKg: 75,
    abilities: ["Damp", "Water Absorb", "Unaware"],
    group: "Regular"
  },
  espeon: {
    name: "Espeon",
    types: ["Psychic"],
    baseStats: {
      hp: 65,
      atk: 65,
      def: 60,
      spa: 130,
      spd: 95,
      spe: 110
    },
    weightKg: 26.5,
    abilities: ["Synchronize", "Magic Bounce"],
    group: "Regular"
  },
  umbreon: {
    name: "Umbreon",
    types: ["Dark"],
    baseStats: {
      hp: 95,
      atk: 65,
      def: 110,
      spa: 60,
      spd: 130,
      spe: 65
    },
    weightKg: 27,
    abilities: ["Synchronize", "Inner Focus"],
    group: "Regular"
  },
  murkrow: {
    name: "Murkrow",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 42,
      spa: 85,
      spd: 42,
      spe: 91
    },
    weightKg: 2.1,
    abilities: ["Insomnia", "Super Luck", "Prankster"],
    notFullyEvolved: true,
    group: "Regular"
  },
  slowking: {
    name: "Slowking",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 95,
      atk: 75,
      def: 80,
      spa: 100,
      spd: 110,
      spe: 30
    },
    weightKg: 79.5,
    abilities: ["Oblivious", "Own Tempo", "Regenerator"],
    group: "Regular"
  },
  slowkinggalar: {
    name: "Slowking-Galar",
    types: ["Poison", "Psychic"],
    baseStats: {
      hp: 95,
      atk: 65,
      def: 80,
      spa: 110,
      spd: 110,
      spe: 30
    },
    weightKg: 79.5,
    abilities: ["Curious Medicine", "Own Tempo", "Regenerator"],
    group: "Regular"
  },
  misdreavus: {
    name: "Misdreavus",
    types: ["Ghost"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 60,
      spa: 85,
      spd: 85,
      spe: 85
    },
    weightKg: 1,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  unown: {
    name: "Unown",
    types: ["Psychic"],
    baseStats: {
      hp: 48,
      atk: 72,
      def: 48,
      spa: 72,
      spd: 48,
      spe: 48
    },
    weightKg: 5,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  wobbuffet: {
    name: "Wobbuffet",
    types: ["Psychic"],
    baseStats: {
      hp: 190,
      atk: 33,
      def: 58,
      spa: 33,
      spd: 58,
      spe: 33
    },
    weightKg: 28.5,
    abilities: ["Shadow Tag", "Telepathy"],
    group: "Regular"
  },
  girafarig: {
    name: "Girafarig",
    types: ["Normal", "Psychic"],
    baseStats: {
      hp: 70,
      atk: 80,
      def: 65,
      spa: 90,
      spd: 65,
      spe: 85
    },
    weightKg: 41.5,
    abilities: ["Inner Focus", "Early Bird", "Sap Sipper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pineco: {
    name: "Pineco",
    types: ["Bug"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 90,
      spa: 35,
      spd: 35,
      spe: 15
    },
    weightKg: 7.2,
    abilities: ["Sturdy", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  forretress: {
    name: "Forretress",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 75,
      atk: 90,
      def: 140,
      spa: 60,
      spd: 60,
      spe: 40
    },
    weightKg: 125.8,
    abilities: ["Sturdy", "Overcoat"],
    group: "Regular"
  },
  dunsparce: {
    name: "Dunsparce",
    types: ["Normal"],
    baseStats: {
      hp: 100,
      atk: 70,
      def: 70,
      spa: 65,
      spd: 65,
      spe: 45
    },
    weightKg: 14,
    abilities: ["Serene Grace", "Run Away", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gligar: {
    name: "Gligar",
    types: ["Ground", "Flying"],
    baseStats: {
      hp: 65,
      atk: 75,
      def: 105,
      spa: 35,
      spd: 65,
      spe: 85
    },
    weightKg: 64.8,
    abilities: ["Hyper Cutter", "Sand Veil", "Immunity"],
    notFullyEvolved: true,
    group: "Regular"
  },
  steelix: {
    name: "Steelix",
    types: ["Steel", "Ground"],
    baseStats: {
      hp: 75,
      atk: 85,
      def: 200,
      spa: 55,
      spd: 65,
      spe: 30
    },
    weightKg: 400,
    abilities: ["Rock Head", "Sturdy", "Sheer Force"],
    group: "Regular"
  },
  steelixmega: {
    name: "Steelix-Mega",
    types: ["Steel", "Ground"],
    baseStats: {
      hp: 75,
      atk: 125,
      def: 230,
      spa: 55,
      spd: 95,
      spe: 30
    },
    weightKg: 740,
    abilities: ["Sand Force"],
    group: "Regular"
  },
  snubbull: {
    name: "Snubbull",
    types: ["Fairy"],
    baseStats: {
      hp: 60,
      atk: 80,
      def: 50,
      spa: 40,
      spd: 40,
      spe: 30
    },
    weightKg: 7.8,
    abilities: ["Intimidate", "Run Away", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  granbull: {
    name: "Granbull",
    types: ["Fairy"],
    baseStats: {
      hp: 90,
      atk: 120,
      def: 75,
      spa: 60,
      spd: 60,
      spe: 45
    },
    weightKg: 48.7,
    abilities: ["Intimidate", "Quick Feet", "Rattled"],
    group: "Regular"
  },
  qwilfish: {
    name: "Qwilfish",
    types: ["Water", "Poison"],
    baseStats: {
      hp: 65,
      atk: 95,
      def: 85,
      spa: 55,
      spd: 55,
      spe: 85
    },
    weightKg: 3.9,
    abilities: ["Poison Point", "Swift Swim", "Intimidate"],
    group: "Regular"
  },
  qwilfishhisui: {
    name: "Qwilfish-Hisui",
    types: ["Dark", "Poison"],
    baseStats: {
      hp: 65,
      atk: 95,
      def: 85,
      spa: 55,
      spd: 55,
      spe: 85
    },
    weightKg: 3.9,
    abilities: ["Poison Point", "Swift Swim", "Intimidate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  scizor: {
    name: "Scizor",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 70,
      atk: 130,
      def: 100,
      spa: 55,
      spd: 80,
      spe: 65
    },
    weightKg: 118,
    abilities: ["Swarm", "Technician", "Light Metal"],
    group: "Low usage"
  },
  scizormega: {
    name: "Scizor-Mega",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 70,
      atk: 150,
      def: 140,
      spa: 65,
      spd: 100,
      spe: 75
    },
    weightKg: 125,
    abilities: ["Technician"],
    group: "Low usage"
  },
  shuckle: {
    name: "Shuckle",
    types: ["Bug", "Rock"],
    baseStats: {
      hp: 20,
      atk: 10,
      def: 230,
      spa: 10,
      spd: 230,
      spe: 5
    },
    weightKg: 20.5,
    abilities: ["Sturdy", "Gluttony", "Contrary"],
    group: "Regular"
  },
  heracross: {
    name: "Heracross",
    types: ["Bug", "Fighting"],
    baseStats: {
      hp: 80,
      atk: 125,
      def: 75,
      spa: 40,
      spd: 95,
      spe: 85
    },
    weightKg: 54,
    abilities: ["Swarm", "Guts", "Moxie"],
    group: "Regular"
  },
  heracrossmega: {
    name: "Heracross-Mega",
    types: ["Bug", "Fighting"],
    baseStats: {
      hp: 80,
      atk: 185,
      def: 115,
      spa: 40,
      spd: 105,
      spe: 75
    },
    weightKg: 62.5,
    abilities: ["Skill Link"],
    group: "Regular"
  },
  sneasel: {
    name: "Sneasel",
    types: ["Dark", "Ice"],
    baseStats: {
      hp: 55,
      atk: 95,
      def: 55,
      spa: 35,
      spd: 75,
      spe: 115
    },
    weightKg: 28,
    abilities: ["Inner Focus", "Keen Eye", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sneaselhisui: {
    name: "Sneasel-Hisui",
    types: ["Fighting", "Poison"],
    baseStats: {
      hp: 55,
      atk: 95,
      def: 55,
      spa: 35,
      spd: 75,
      spe: 115
    },
    weightKg: 27,
    abilities: ["Inner Focus", "Keen Eye", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  teddiursa: {
    name: "Teddiursa",
    types: ["Normal"],
    baseStats: {
      hp: 60,
      atk: 80,
      def: 50,
      spa: 50,
      spd: 50,
      spe: 40
    },
    weightKg: 8.8,
    abilities: ["Pickup", "Quick Feet", "Honey Gather"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ursaring: {
    name: "Ursaring",
    types: ["Normal"],
    baseStats: {
      hp: 90,
      atk: 130,
      def: 75,
      spa: 75,
      spd: 75,
      spe: 55
    },
    weightKg: 125.8,
    abilities: ["Guts", "Quick Feet", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  slugma: {
    name: "Slugma",
    types: ["Fire"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 40,
      spa: 70,
      spd: 40,
      spe: 20
    },
    weightKg: 35,
    abilities: ["Magma Armor", "Flame Body", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  magcargo: {
    name: "Magcargo",
    types: ["Fire", "Rock"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 120,
      spa: 90,
      spd: 80,
      spe: 30
    },
    weightKg: 55,
    abilities: ["Magma Armor", "Flame Body", "Weak Armor"],
    group: "Regular"
  },
  swinub: {
    name: "Swinub",
    types: ["Ice", "Ground"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 40,
      spa: 30,
      spd: 30,
      spe: 50
    },
    weightKg: 6.5,
    abilities: ["Oblivious", "Snow Cloak", "Thick Fat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  piloswine: {
    name: "Piloswine",
    types: ["Ice", "Ground"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 80,
      spa: 60,
      spd: 60,
      spe: 50
    },
    weightKg: 55.8,
    abilities: ["Oblivious", "Snow Cloak", "Thick Fat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  corsola: {
    name: "Corsola",
    types: ["Water", "Rock"],
    baseStats: {
      hp: 65,
      atk: 55,
      def: 95,
      spa: 65,
      spd: 95,
      spe: 35
    },
    weightKg: 5,
    abilities: ["Hustle", "Natural Cure", "Regenerator"],
    group: "Regular"
  },
  corsolagalar: {
    name: "Corsola-Galar",
    types: ["Ghost"],
    baseStats: {
      hp: 60,
      atk: 55,
      def: 100,
      spa: 65,
      spd: 100,
      spe: 30
    },
    weightKg: 0.5,
    abilities: ["Weak Armor", "Cursed Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  remoraid: {
    name: "Remoraid",
    types: ["Water"],
    baseStats: {
      hp: 35,
      atk: 65,
      def: 35,
      spa: 65,
      spd: 35,
      spe: 65
    },
    weightKg: 12,
    abilities: ["Hustle", "Sniper", "Moody"],
    notFullyEvolved: true,
    group: "Regular"
  },
  octillery: {
    name: "Octillery",
    types: ["Water"],
    baseStats: {
      hp: 75,
      atk: 105,
      def: 75,
      spa: 105,
      spd: 75,
      spe: 45
    },
    weightKg: 28.5,
    abilities: ["Suction Cups", "Sniper", "Moody"],
    group: "Regular"
  },
  delibird: {
    name: "Delibird",
    types: ["Ice", "Flying"],
    baseStats: {
      hp: 45,
      atk: 55,
      def: 45,
      spa: 65,
      spd: 45,
      spe: 75
    },
    weightKg: 16,
    abilities: ["Vital Spirit", "Hustle", "Insomnia"],
    group: "Regular"
  },
  mantine: {
    name: "Mantine",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 85,
      atk: 40,
      def: 70,
      spa: 80,
      spd: 140,
      spe: 70
    },
    weightKg: 220,
    abilities: ["Swift Swim", "Water Absorb", "Water Veil"],
    group: "Regular"
  },
  skarmory: {
    name: "Skarmory",
    types: ["Steel", "Flying"],
    baseStats: {
      hp: 65,
      atk: 80,
      def: 140,
      spa: 40,
      spd: 70,
      spe: 70
    },
    weightKg: 50.5,
    abilities: ["Keen Eye", "Sturdy", "Weak Armor"],
    group: "Regular"
  },
  skarmorymega: {
    name: "Skarmory-Mega",
    types: ["Steel", "Flying"],
    baseStats: {
      hp: 65,
      atk: 140,
      def: 110,
      spa: 40,
      spd: 100,
      spe: 110
    },
    weightKg: 40.4,
    abilities: ["Stalwart"],
    group: "Low usage"
  },
  houndour: {
    name: "Houndour",
    types: ["Dark", "Fire"],
    baseStats: {
      hp: 45,
      atk: 60,
      def: 30,
      spa: 80,
      spd: 50,
      spe: 65
    },
    weightKg: 10.8,
    abilities: ["Early Bird", "Flash Fire", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  houndoom: {
    name: "Houndoom",
    types: ["Dark", "Fire"],
    baseStats: {
      hp: 75,
      atk: 90,
      def: 50,
      spa: 110,
      spd: 80,
      spe: 95
    },
    weightKg: 35,
    abilities: ["Early Bird", "Flash Fire", "Unnerve"],
    group: "Regular"
  },
  houndoommega: {
    name: "Houndoom-Mega",
    types: ["Dark", "Fire"],
    baseStats: {
      hp: 75,
      atk: 90,
      def: 90,
      spa: 140,
      spd: 90,
      spe: 115
    },
    weightKg: 49.5,
    abilities: ["Solar Power"],
    group: "Low usage"
  },
  kingdra: {
    name: "Kingdra",
    types: ["Water", "Dragon"],
    baseStats: {
      hp: 75,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 85
    },
    weightKg: 152,
    abilities: ["Swift Swim", "Sniper", "Damp"],
    group: "Regular"
  },
  phanpy: {
    name: "Phanpy",
    types: ["Ground"],
    baseStats: {
      hp: 90,
      atk: 60,
      def: 60,
      spa: 40,
      spd: 40,
      spe: 40
    },
    weightKg: 33.5,
    abilities: ["Pickup", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  donphan: {
    name: "Donphan",
    types: ["Ground"],
    baseStats: {
      hp: 90,
      atk: 120,
      def: 120,
      spa: 60,
      spd: 60,
      spe: 50
    },
    weightKg: 120,
    abilities: ["Sturdy", "Sand Veil"],
    group: "Regular"
  },
  porygon2: {
    name: "Porygon2",
    types: ["Normal"],
    baseStats: {
      hp: 85,
      atk: 80,
      def: 90,
      spa: 105,
      spd: 95,
      spe: 60
    },
    weightKg: 32.5,
    gender: "N",
    abilities: ["Trace", "Download", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  stantler: {
    name: "Stantler",
    types: ["Normal"],
    baseStats: {
      hp: 73,
      atk: 95,
      def: 62,
      spa: 85,
      spd: 65,
      spe: 85
    },
    weightKg: 71.2,
    abilities: ["Intimidate", "Frisk", "Sap Sipper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  smeargle: {
    name: "Smeargle",
    types: ["Normal"],
    baseStats: {
      hp: 55,
      atk: 20,
      def: 35,
      spa: 20,
      spd: 45,
      spe: 75
    },
    weightKg: 58,
    abilities: ["Own Tempo", "Technician", "Moody"],
    group: "Regular"
  },
  tyrogue: {
    name: "Tyrogue",
    types: ["Fighting"],
    baseStats: {
      hp: 35,
      atk: 35,
      def: 35,
      spa: 35,
      spd: 35,
      spe: 35
    },
    weightKg: 21,
    gender: "M",
    abilities: ["Guts", "Steadfast", "Vital Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hitmontop: {
    name: "Hitmontop",
    types: ["Fighting"],
    baseStats: {
      hp: 50,
      atk: 95,
      def: 95,
      spa: 35,
      spd: 110,
      spe: 70
    },
    weightKg: 48,
    gender: "M",
    abilities: ["Intimidate", "Technician", "Steadfast"],
    group: "Regular"
  },
  smoochum: {
    name: "Smoochum",
    types: ["Ice", "Psychic"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 15,
      spa: 85,
      spd: 65,
      spe: 65
    },
    weightKg: 6,
    gender: "F",
    abilities: ["Oblivious", "Forewarn", "Hydration"],
    notFullyEvolved: true,
    group: "Regular"
  },
  elekid: {
    name: "Elekid",
    types: ["Electric"],
    baseStats: {
      hp: 45,
      atk: 63,
      def: 37,
      spa: 65,
      spd: 55,
      spe: 95
    },
    weightKg: 23.5,
    abilities: ["Static", "Vital Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  magby: {
    name: "Magby",
    types: ["Fire"],
    baseStats: {
      hp: 45,
      atk: 75,
      def: 37,
      spa: 70,
      spd: 55,
      spe: 83
    },
    weightKg: 21.4,
    abilities: ["Flame Body", "Vital Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  miltank: {
    name: "Miltank",
    types: ["Normal"],
    baseStats: {
      hp: 95,
      atk: 80,
      def: 105,
      spa: 40,
      spd: 70,
      spe: 100
    },
    weightKg: 75.5,
    gender: "F",
    abilities: ["Thick Fat", "Scrappy", "Sap Sipper"],
    group: "Regular"
  },
  blissey: {
    name: "Blissey",
    types: ["Normal"],
    baseStats: {
      hp: 255,
      atk: 10,
      def: 10,
      spa: 75,
      spd: 135,
      spe: 55
    },
    weightKg: 46.8,
    gender: "F",
    abilities: ["Natural Cure", "Serene Grace", "Healer"],
    group: "Regular"
  },
  raikou: {
    name: "Raikou",
    types: ["Electric"],
    baseStats: {
      hp: 90,
      atk: 85,
      def: 75,
      spa: 115,
      spd: 100,
      spe: 115
    },
    weightKg: 178,
    gender: "N",
    abilities: ["Pressure", "Inner Focus"],
    group: "Regular"
  },
  entei: {
    name: "Entei",
    types: ["Fire"],
    baseStats: {
      hp: 115,
      atk: 115,
      def: 85,
      spa: 90,
      spd: 75,
      spe: 100
    },
    weightKg: 198,
    gender: "N",
    abilities: ["Pressure", "Inner Focus"],
    group: "Regular"
  },
  suicune: {
    name: "Suicune",
    types: ["Water"],
    baseStats: {
      hp: 100,
      atk: 75,
      def: 115,
      spa: 90,
      spd: 115,
      spe: 85
    },
    weightKg: 187,
    gender: "N",
    abilities: ["Pressure", "Inner Focus"],
    group: "Regular"
  },
  larvitar: {
    name: "Larvitar",
    types: ["Rock", "Ground"],
    baseStats: {
      hp: 50,
      atk: 64,
      def: 50,
      spa: 45,
      spd: 50,
      spe: 41
    },
    weightKg: 72,
    abilities: ["Guts", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pupitar: {
    name: "Pupitar",
    types: ["Rock", "Ground"],
    baseStats: {
      hp: 70,
      atk: 84,
      def: 70,
      spa: 65,
      spd: 70,
      spe: 51
    },
    weightKg: 152,
    abilities: ["Shed Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tyranitar: {
    name: "Tyranitar",
    types: ["Rock", "Dark"],
    baseStats: {
      hp: 100,
      atk: 134,
      def: 110,
      spa: 95,
      spd: 100,
      spe: 61
    },
    weightKg: 202,
    abilities: ["Sand Stream", "Unnerve"],
    group: "Meta"
  },
  tyranitarmega: {
    name: "Tyranitar-Mega",
    types: ["Rock", "Dark"],
    baseStats: {
      hp: 100,
      atk: 164,
      def: 150,
      spa: 95,
      spd: 120,
      spe: 71
    },
    weightKg: 255,
    abilities: ["Sand Stream"],
    group: "Meta"
  },
  lugia: {
    name: "Lugia",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 106,
      atk: 90,
      def: 130,
      spa: 90,
      spd: 154,
      spe: 110
    },
    weightKg: 216,
    gender: "N",
    abilities: ["Pressure", "Multiscale"],
    group: "Regular"
  },
  hooh: {
    name: "Ho-Oh",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 106,
      atk: 130,
      def: 90,
      spa: 110,
      spd: 154,
      spe: 90
    },
    weightKg: 199,
    gender: "N",
    abilities: ["Pressure", "Regenerator"],
    group: "Regular"
  },
  celebi: {
    name: "Celebi",
    types: ["Psychic", "Grass"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 100,
      spa: 100,
      spd: 100,
      spe: 100
    },
    weightKg: 5,
    gender: "N",
    abilities: ["Natural Cure"],
    group: "Regular"
  },
  treecko: {
    name: "Treecko",
    types: ["Grass"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 35,
      spa: 65,
      spd: 55,
      spe: 70
    },
    weightKg: 5,
    abilities: ["Overgrow", "Unburden"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grovyle: {
    name: "Grovyle",
    types: ["Grass"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 45,
      spa: 85,
      spd: 65,
      spe: 95
    },
    weightKg: 21.6,
    abilities: ["Overgrow", "Unburden"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sceptile: {
    name: "Sceptile",
    types: ["Grass"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 65,
      spa: 105,
      spd: 85,
      spe: 120
    },
    weightKg: 52.2,
    abilities: ["Overgrow", "Unburden"],
    group: "Regular"
  },
  sceptilemega: {
    name: "Sceptile-Mega",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 70,
      atk: 110,
      def: 75,
      spa: 145,
      spd: 85,
      spe: 145
    },
    weightKg: 55.2,
    abilities: ["Lightning Rod"],
    group: "Regular"
  },
  torchic: {
    name: "Torchic",
    types: ["Fire"],
    baseStats: {
      hp: 45,
      atk: 60,
      def: 40,
      spa: 70,
      spd: 50,
      spe: 45
    },
    weightKg: 2.5,
    abilities: ["Blaze", "Speed Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  combusken: {
    name: "Combusken",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 60,
      spa: 85,
      spd: 60,
      spe: 55
    },
    weightKg: 19.5,
    abilities: ["Blaze", "Speed Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  blaziken: {
    name: "Blaziken",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 70,
      spa: 110,
      spd: 70,
      spe: 80
    },
    weightKg: 52,
    abilities: ["Blaze", "Speed Boost"],
    group: "Low usage"
  },
  blazikenmega: {
    name: "Blaziken-Mega",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 80,
      atk: 160,
      def: 80,
      spa: 130,
      spd: 80,
      spe: 100
    },
    weightKg: 52,
    abilities: ["Speed Boost"],
    group: "Low usage"
  },
  mudkip: {
    name: "Mudkip",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 70,
      def: 50,
      spa: 50,
      spd: 50,
      spe: 40
    },
    weightKg: 7.6,
    abilities: ["Torrent", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  marshtomp: {
    name: "Marshtomp",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 70,
      spa: 60,
      spd: 70,
      spe: 50
    },
    weightKg: 28,
    abilities: ["Torrent", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  swampert: {
    name: "Swampert",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 100,
      atk: 110,
      def: 90,
      spa: 85,
      spd: 90,
      spe: 60
    },
    weightKg: 81.9,
    abilities: ["Torrent", "Damp"],
    group: "Meta"
  },
  swampertmega: {
    name: "Swampert-Mega",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 100,
      atk: 150,
      def: 110,
      spa: 95,
      spd: 110,
      spe: 70
    },
    weightKg: 102,
    abilities: ["Swift Swim"],
    group: "Meta"
  },
  poochyena: {
    name: "Poochyena",
    types: ["Dark"],
    baseStats: {
      hp: 35,
      atk: 55,
      def: 35,
      spa: 30,
      spd: 30,
      spe: 35
    },
    weightKg: 13.6,
    abilities: ["Run Away", "Quick Feet", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  mightyena: {
    name: "Mightyena",
    types: ["Dark"],
    baseStats: {
      hp: 70,
      atk: 90,
      def: 70,
      spa: 60,
      spd: 60,
      spe: 70
    },
    weightKg: 37,
    abilities: ["Intimidate", "Quick Feet", "Moxie"],
    group: "Regular"
  },
  zigzagoon: {
    name: "Zigzagoon",
    types: ["Normal"],
    baseStats: {
      hp: 38,
      atk: 30,
      def: 41,
      spa: 30,
      spd: 41,
      spe: 60
    },
    weightKg: 17.5,
    abilities: ["Pickup", "Gluttony", "Quick Feet"],
    notFullyEvolved: true,
    group: "Regular"
  },
  zigzagoongalar: {
    name: "Zigzagoon-Galar",
    types: ["Dark", "Normal"],
    baseStats: {
      hp: 38,
      atk: 30,
      def: 41,
      spa: 30,
      spd: 41,
      spe: 60
    },
    weightKg: 17.5,
    abilities: ["Pickup", "Gluttony", "Quick Feet"],
    notFullyEvolved: true,
    group: "Regular"
  },
  linoone: {
    name: "Linoone",
    types: ["Normal"],
    baseStats: {
      hp: 78,
      atk: 70,
      def: 61,
      spa: 50,
      spd: 61,
      spe: 100
    },
    weightKg: 32.5,
    abilities: ["Pickup", "Gluttony", "Quick Feet"],
    group: "Regular"
  },
  linoonegalar: {
    name: "Linoone-Galar",
    types: ["Dark", "Normal"],
    baseStats: {
      hp: 78,
      atk: 70,
      def: 61,
      spa: 50,
      spd: 61,
      spe: 100
    },
    weightKg: 32.5,
    abilities: ["Pickup", "Gluttony", "Quick Feet"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wurmple: {
    name: "Wurmple",
    types: ["Bug"],
    baseStats: {
      hp: 45,
      atk: 45,
      def: 35,
      spa: 20,
      spd: 30,
      spe: 20
    },
    weightKg: 3.6,
    abilities: ["Shield Dust", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  silcoon: {
    name: "Silcoon",
    types: ["Bug"],
    baseStats: {
      hp: 50,
      atk: 35,
      def: 55,
      spa: 25,
      spd: 25,
      spe: 15
    },
    weightKg: 10,
    abilities: ["Shed Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  beautifly: {
    name: "Beautifly",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 60,
      atk: 70,
      def: 50,
      spa: 100,
      spd: 50,
      spe: 65
    },
    weightKg: 28.4,
    abilities: ["Swarm", "Rivalry"],
    group: "Regular"
  },
  cascoon: {
    name: "Cascoon",
    types: ["Bug"],
    baseStats: {
      hp: 50,
      atk: 35,
      def: 55,
      spa: 25,
      spd: 25,
      spe: 15
    },
    weightKg: 11.5,
    abilities: ["Shed Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dustox: {
    name: "Dustox",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 70,
      spa: 50,
      spd: 90,
      spe: 65
    },
    weightKg: 31.6,
    abilities: ["Shield Dust", "Compound Eyes"],
    group: "Regular"
  },
  lotad: {
    name: "Lotad",
    types: ["Water", "Grass"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 30,
      spa: 40,
      spd: 50,
      spe: 30
    },
    weightKg: 2.6,
    abilities: ["Swift Swim", "Rain Dish", "Own Tempo"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lombre: {
    name: "Lombre",
    types: ["Water", "Grass"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 50,
      spa: 60,
      spd: 70,
      spe: 50
    },
    weightKg: 32.5,
    abilities: ["Swift Swim", "Rain Dish", "Own Tempo"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ludicolo: {
    name: "Ludicolo",
    types: ["Water", "Grass"],
    baseStats: {
      hp: 80,
      atk: 70,
      def: 70,
      spa: 90,
      spd: 100,
      spe: 70
    },
    weightKg: 55,
    abilities: ["Swift Swim", "Rain Dish", "Own Tempo"],
    group: "Regular"
  },
  seedot: {
    name: "Seedot",
    types: ["Grass"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 50,
      spa: 30,
      spd: 30,
      spe: 30
    },
    weightKg: 4,
    abilities: ["Chlorophyll", "Early Bird", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  nuzleaf: {
    name: "Nuzleaf",
    types: ["Grass", "Dark"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 40,
      spa: 60,
      spd: 40,
      spe: 60
    },
    weightKg: 28,
    abilities: ["Chlorophyll", "Early Bird", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  shiftry: {
    name: "Shiftry",
    types: ["Grass", "Dark"],
    baseStats: {
      hp: 90,
      atk: 100,
      def: 60,
      spa: 90,
      spd: 60,
      spe: 80
    },
    weightKg: 59.6,
    abilities: ["Chlorophyll", "Wind Rider", "Pickpocket"],
    group: "Regular"
  },
  taillow: {
    name: "Taillow",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 40,
      atk: 55,
      def: 30,
      spa: 30,
      spd: 30,
      spe: 85
    },
    weightKg: 2.3,
    abilities: ["Guts", "Scrappy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  swellow: {
    name: "Swellow",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 60,
      spa: 75,
      spd: 50,
      spe: 125
    },
    weightKg: 19.8,
    abilities: ["Guts", "Scrappy"],
    group: "Regular"
  },
  wingull: {
    name: "Wingull",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 30,
      spa: 55,
      spd: 30,
      spe: 85
    },
    weightKg: 9.5,
    abilities: ["Keen Eye", "Hydration", "Rain Dish"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pelipper: {
    name: "Pelipper",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 100,
      spa: 95,
      spd: 70,
      spe: 65
    },
    weightKg: 28,
    abilities: ["Keen Eye", "Drizzle", "Rain Dish"],
    group: "Meta"
  },
  ralts: {
    name: "Ralts",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 28,
      atk: 25,
      def: 25,
      spa: 45,
      spd: 35,
      spe: 40
    },
    weightKg: 6.6,
    abilities: ["Synchronize", "Trace", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kirlia: {
    name: "Kirlia",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 38,
      atk: 35,
      def: 35,
      spa: 65,
      spd: 55,
      spe: 50
    },
    weightKg: 20.2,
    abilities: ["Synchronize", "Trace", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gardevoir: {
    name: "Gardevoir",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 68,
      atk: 65,
      def: 65,
      spa: 125,
      spd: 115,
      spe: 80
    },
    weightKg: 48.4,
    abilities: ["Synchronize", "Trace", "Telepathy"],
    group: "Regular"
  },
  gardevoirmega: {
    name: "Gardevoir-Mega",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 68,
      atk: 85,
      def: 65,
      spa: 165,
      spd: 135,
      spe: 100
    },
    weightKg: 48.4,
    abilities: ["Pixilate"],
    group: "Low usage"
  },
  surskit: {
    name: "Surskit",
    types: ["Bug", "Water"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 32,
      spa: 50,
      spd: 52,
      spe: 65
    },
    weightKg: 1.7,
    abilities: ["Swift Swim", "Rain Dish"],
    notFullyEvolved: true,
    group: "Regular"
  },
  masquerain: {
    name: "Masquerain",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 70,
      atk: 60,
      def: 62,
      spa: 100,
      spd: 82,
      spe: 80
    },
    weightKg: 3.6,
    abilities: ["Intimidate", "Unnerve"],
    group: "Regular"
  },
  shroomish: {
    name: "Shroomish",
    types: ["Grass"],
    baseStats: {
      hp: 60,
      atk: 40,
      def: 60,
      spa: 40,
      spd: 60,
      spe: 35
    },
    weightKg: 4.5,
    abilities: ["Effect Spore", "Poison Heal", "Quick Feet"],
    notFullyEvolved: true,
    group: "Regular"
  },
  breloom: {
    name: "Breloom",
    types: ["Grass", "Fighting"],
    baseStats: {
      hp: 60,
      atk: 130,
      def: 80,
      spa: 60,
      spd: 60,
      spe: 70
    },
    weightKg: 39.2,
    abilities: ["Effect Spore", "Poison Heal", "Technician"],
    group: "Regular"
  },
  slakoth: {
    name: "Slakoth",
    types: ["Normal"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 60,
      spa: 35,
      spd: 35,
      spe: 30
    },
    weightKg: 24,
    abilities: ["Truant"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vigoroth: {
    name: "Vigoroth",
    types: ["Normal"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 80,
      spa: 55,
      spd: 55,
      spe: 90
    },
    weightKg: 46.5,
    abilities: ["Vital Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  slaking: {
    name: "Slaking",
    types: ["Normal"],
    baseStats: {
      hp: 150,
      atk: 160,
      def: 100,
      spa: 95,
      spd: 65,
      spe: 100
    },
    weightKg: 130.5,
    abilities: ["Truant"],
    group: "Regular"
  },
  nincada: {
    name: "Nincada",
    types: ["Bug", "Ground"],
    baseStats: {
      hp: 31,
      atk: 45,
      def: 90,
      spa: 30,
      spd: 30,
      spe: 40
    },
    weightKg: 5.5,
    abilities: ["Compound Eyes", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ninjask: {
    name: "Ninjask",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 61,
      atk: 90,
      def: 45,
      spa: 50,
      spd: 50,
      spe: 160
    },
    weightKg: 12,
    abilities: ["Speed Boost", "Infiltrator"],
    group: "Regular"
  },
  shedinja: {
    name: "Shedinja",
    types: ["Bug", "Ghost"],
    baseStats: {
      hp: 1,
      atk: 90,
      def: 45,
      spa: 30,
      spd: 30,
      spe: 40
    },
    weightKg: 1.2,
    gender: "N",
    abilities: ["Wonder Guard"],
    group: "Regular"
  },
  whismur: {
    name: "Whismur",
    types: ["Normal"],
    baseStats: {
      hp: 64,
      atk: 51,
      def: 23,
      spa: 51,
      spd: 23,
      spe: 28
    },
    weightKg: 16.3,
    abilities: ["Soundproof", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  loudred: {
    name: "Loudred",
    types: ["Normal"],
    baseStats: {
      hp: 84,
      atk: 71,
      def: 43,
      spa: 71,
      spd: 43,
      spe: 48
    },
    weightKg: 40.5,
    abilities: ["Soundproof", "Scrappy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  exploud: {
    name: "Exploud",
    types: ["Normal"],
    baseStats: {
      hp: 104,
      atk: 91,
      def: 63,
      spa: 91,
      spd: 73,
      spe: 68
    },
    weightKg: 84,
    abilities: ["Soundproof", "Scrappy"],
    group: "Regular"
  },
  makuhita: {
    name: "Makuhita",
    types: ["Fighting"],
    baseStats: {
      hp: 72,
      atk: 60,
      def: 30,
      spa: 20,
      spd: 30,
      spe: 25
    },
    weightKg: 86.4,
    abilities: ["Thick Fat", "Guts", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hariyama: {
    name: "Hariyama",
    types: ["Fighting"],
    baseStats: {
      hp: 144,
      atk: 120,
      def: 60,
      spa: 40,
      spd: 60,
      spe: 50
    },
    weightKg: 253.8,
    abilities: ["Thick Fat", "Guts", "Sheer Force"],
    group: "Regular"
  },
  azurill: {
    name: "Azurill",
    types: ["Normal", "Fairy"],
    baseStats: {
      hp: 50,
      atk: 20,
      def: 40,
      spa: 20,
      spd: 40,
      spe: 20
    },
    weightKg: 2,
    abilities: ["Thick Fat", "Huge Power", "Sap Sipper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  nosepass: {
    name: "Nosepass",
    types: ["Rock"],
    baseStats: {
      hp: 30,
      atk: 45,
      def: 135,
      spa: 45,
      spd: 90,
      spe: 30
    },
    weightKg: 97,
    abilities: ["Sturdy", "Magnet Pull", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  skitty: {
    name: "Skitty",
    types: ["Normal"],
    baseStats: {
      hp: 50,
      atk: 45,
      def: 45,
      spa: 35,
      spd: 35,
      spe: 50
    },
    weightKg: 11,
    abilities: ["Cute Charm", "Normalize", "Wonder Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  delcatty: {
    name: "Delcatty",
    types: ["Normal"],
    baseStats: {
      hp: 70,
      atk: 65,
      def: 65,
      spa: 55,
      spd: 55,
      spe: 90
    },
    weightKg: 32.6,
    abilities: ["Cute Charm", "Normalize", "Wonder Skin"],
    group: "Regular"
  },
  sableye: {
    name: "Sableye",
    types: ["Dark", "Ghost"],
    baseStats: {
      hp: 50,
      atk: 75,
      def: 75,
      spa: 65,
      spd: 65,
      spe: 50
    },
    weightKg: 11,
    abilities: ["Keen Eye", "Stall", "Prankster"],
    group: "Low usage"
  },
  sableyemega: {
    name: "Sableye-Mega",
    types: ["Dark", "Ghost"],
    baseStats: {
      hp: 50,
      atk: 85,
      def: 125,
      spa: 85,
      spd: 115,
      spe: 20
    },
    weightKg: 161,
    abilities: ["Magic Bounce"],
    group: "Regular"
  },
  mawile: {
    name: "Mawile",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 50,
      atk: 85,
      def: 85,
      spa: 55,
      spd: 55,
      spe: 50
    },
    weightKg: 11.5,
    abilities: ["Hyper Cutter", "Intimidate", "Sheer Force"],
    group: "Regular"
  },
  mawilemega: {
    name: "Mawile-Mega",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 50,
      atk: 105,
      def: 125,
      spa: 55,
      spd: 95,
      spe: 50
    },
    weightKg: 23.5,
    abilities: ["Huge Power"],
    group: "Low usage"
  },
  aron: {
    name: "Aron",
    types: ["Steel", "Rock"],
    baseStats: {
      hp: 50,
      atk: 70,
      def: 100,
      spa: 40,
      spd: 40,
      spe: 30
    },
    weightKg: 60,
    abilities: ["Sturdy", "Rock Head", "Heavy Metal"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lairon: {
    name: "Lairon",
    types: ["Steel", "Rock"],
    baseStats: {
      hp: 60,
      atk: 90,
      def: 140,
      spa: 50,
      spd: 50,
      spe: 40
    },
    weightKg: 120,
    abilities: ["Sturdy", "Rock Head", "Heavy Metal"],
    notFullyEvolved: true,
    group: "Regular"
  },
  aggron: {
    name: "Aggron",
    types: ["Steel", "Rock"],
    baseStats: {
      hp: 70,
      atk: 110,
      def: 180,
      spa: 60,
      spd: 60,
      spe: 50
    },
    weightKg: 360,
    abilities: ["Sturdy", "Rock Head", "Heavy Metal"],
    group: "Regular"
  },
  aggronmega: {
    name: "Aggron-Mega",
    types: ["Steel"],
    baseStats: {
      hp: 70,
      atk: 140,
      def: 230,
      spa: 60,
      spd: 80,
      spe: 50
    },
    weightKg: 395,
    abilities: ["Filter"],
    group: "Regular"
  },
  meditite: {
    name: "Meditite",
    types: ["Fighting", "Psychic"],
    baseStats: {
      hp: 30,
      atk: 40,
      def: 55,
      spa: 40,
      spd: 55,
      spe: 60
    },
    weightKg: 11.2,
    abilities: ["Pure Power", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  medicham: {
    name: "Medicham",
    types: ["Fighting", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 75,
      spa: 60,
      spd: 75,
      spe: 80
    },
    weightKg: 31.5,
    abilities: ["Pure Power", "Telepathy"],
    group: "Regular"
  },
  medichammega: {
    name: "Medicham-Mega",
    types: ["Fighting", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 100,
      def: 85,
      spa: 80,
      spd: 85,
      spe: 100
    },
    weightKg: 31.5,
    abilities: ["Pure Power"],
    group: "Regular"
  },
  electrike: {
    name: "Electrike",
    types: ["Electric"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 40,
      spa: 65,
      spd: 40,
      spe: 65
    },
    weightKg: 15.2,
    abilities: ["Static", "Lightning Rod", "Minus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  manectric: {
    name: "Manectric",
    types: ["Electric"],
    baseStats: {
      hp: 70,
      atk: 75,
      def: 60,
      spa: 105,
      spd: 60,
      spe: 105
    },
    weightKg: 40.2,
    abilities: ["Static", "Lightning Rod", "Minus"],
    group: "Regular"
  },
  manectricmega: {
    name: "Manectric-Mega",
    types: ["Electric"],
    baseStats: {
      hp: 70,
      atk: 75,
      def: 80,
      spa: 135,
      spd: 80,
      spe: 135
    },
    weightKg: 44,
    abilities: ["Intimidate"],
    group: "Regular"
  },
  plusle: {
    name: "Plusle",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 40,
      spa: 85,
      spd: 75,
      spe: 95
    },
    weightKg: 4.2,
    abilities: ["Plus", "Lightning Rod"],
    group: "Regular"
  },
  minun: {
    name: "Minun",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 40,
      def: 50,
      spa: 75,
      spd: 85,
      spe: 95
    },
    weightKg: 4.2,
    abilities: ["Minus", "Volt Absorb"],
    group: "Regular"
  },
  volbeat: {
    name: "Volbeat",
    types: ["Bug"],
    baseStats: {
      hp: 65,
      atk: 73,
      def: 75,
      spa: 47,
      spd: 85,
      spe: 85
    },
    weightKg: 17.7,
    gender: "M",
    abilities: ["Illuminate", "Swarm", "Prankster"],
    group: "Regular"
  },
  illumise: {
    name: "Illumise",
    types: ["Bug"],
    baseStats: {
      hp: 65,
      atk: 47,
      def: 75,
      spa: 73,
      spd: 85,
      spe: 85
    },
    weightKg: 17.7,
    gender: "F",
    abilities: ["Oblivious", "Tinted Lens", "Prankster"],
    group: "Regular"
  },
  roselia: {
    name: "Roselia",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 50,
      atk: 60,
      def: 45,
      spa: 100,
      spd: 80,
      spe: 65
    },
    weightKg: 2,
    abilities: ["Natural Cure", "Poison Point", "Leaf Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gulpin: {
    name: "Gulpin",
    types: ["Poison"],
    baseStats: {
      hp: 70,
      atk: 43,
      def: 53,
      spa: 43,
      spd: 53,
      spe: 40
    },
    weightKg: 10.3,
    abilities: ["Liquid Ooze", "Sticky Hold", "Gluttony"],
    notFullyEvolved: true,
    group: "Regular"
  },
  swalot: {
    name: "Swalot",
    types: ["Poison"],
    baseStats: {
      hp: 100,
      atk: 73,
      def: 83,
      spa: 73,
      spd: 83,
      spe: 55
    },
    weightKg: 80,
    abilities: ["Liquid Ooze", "Sticky Hold", "Gluttony"],
    group: "Regular"
  },
  carvanha: {
    name: "Carvanha",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 45,
      atk: 90,
      def: 20,
      spa: 65,
      spd: 20,
      spe: 65
    },
    weightKg: 20.8,
    abilities: ["Rough Skin", "Speed Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sharpedo: {
    name: "Sharpedo",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 70,
      atk: 120,
      def: 40,
      spa: 95,
      spd: 40,
      spe: 95
    },
    weightKg: 88.8,
    abilities: ["Rough Skin", "Speed Boost"],
    group: "Regular"
  },
  sharpedomega: {
    name: "Sharpedo-Mega",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 70,
      atk: 140,
      def: 70,
      spa: 110,
      spd: 65,
      spe: 105
    },
    weightKg: 130.3,
    abilities: ["Strong Jaw"],
    group: "Regular"
  },
  wailmer: {
    name: "Wailmer",
    types: ["Water"],
    baseStats: {
      hp: 130,
      atk: 70,
      def: 35,
      spa: 70,
      spd: 35,
      spe: 60
    },
    weightKg: 130,
    abilities: ["Water Veil", "Oblivious", "Pressure"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wailord: {
    name: "Wailord",
    types: ["Water"],
    baseStats: {
      hp: 170,
      atk: 90,
      def: 45,
      spa: 90,
      spd: 45,
      spe: 60
    },
    weightKg: 398,
    abilities: ["Water Veil", "Oblivious", "Pressure"],
    group: "Regular"
  },
  numel: {
    name: "Numel",
    types: ["Fire", "Ground"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 40,
      spa: 65,
      spd: 45,
      spe: 35
    },
    weightKg: 24,
    abilities: ["Oblivious", "Simple", "Own Tempo"],
    notFullyEvolved: true,
    group: "Regular"
  },
  camerupt: {
    name: "Camerupt",
    types: ["Fire", "Ground"],
    baseStats: {
      hp: 70,
      atk: 100,
      def: 70,
      spa: 105,
      spd: 75,
      spe: 40
    },
    weightKg: 220,
    abilities: ["Magma Armor", "Solid Rock", "Anger Point"],
    group: "Regular"
  },
  cameruptmega: {
    name: "Camerupt-Mega",
    types: ["Fire", "Ground"],
    baseStats: {
      hp: 70,
      atk: 120,
      def: 100,
      spa: 145,
      spd: 105,
      spe: 20
    },
    weightKg: 320.5,
    abilities: ["Sheer Force"],
    group: "Low usage"
  },
  torkoal: {
    name: "Torkoal",
    types: ["Fire"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 140,
      spa: 85,
      spd: 70,
      spe: 20
    },
    weightKg: 80.4,
    abilities: ["White Smoke", "Drought", "Shell Armor"],
    group: "Meta"
  },
  spoink: {
    name: "Spoink",
    types: ["Psychic"],
    baseStats: {
      hp: 60,
      atk: 25,
      def: 35,
      spa: 70,
      spd: 80,
      spe: 60
    },
    weightKg: 30.6,
    abilities: ["Thick Fat", "Own Tempo", "Gluttony"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grumpig: {
    name: "Grumpig",
    types: ["Psychic"],
    baseStats: {
      hp: 80,
      atk: 45,
      def: 65,
      spa: 90,
      spd: 110,
      spe: 80
    },
    weightKg: 71.5,
    abilities: ["Thick Fat", "Own Tempo", "Gluttony"],
    group: "Regular"
  },
  spinda: {
    name: "Spinda",
    types: ["Normal"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 60,
      spa: 60,
      spd: 60,
      spe: 60
    },
    weightKg: 5,
    abilities: ["Own Tempo", "Tangled Feet", "Contrary"],
    group: "Regular"
  },
  trapinch: {
    name: "Trapinch",
    types: ["Ground"],
    baseStats: {
      hp: 45,
      atk: 100,
      def: 45,
      spa: 45,
      spd: 45,
      spe: 10
    },
    weightKg: 15,
    abilities: ["Hyper Cutter", "Arena Trap", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vibrava: {
    name: "Vibrava",
    types: ["Ground", "Dragon"],
    baseStats: {
      hp: 50,
      atk: 70,
      def: 50,
      spa: 50,
      spd: 50,
      spe: 70
    },
    weightKg: 15.3,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  flygon: {
    name: "Flygon",
    types: ["Ground", "Dragon"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 80,
      spa: 80,
      spd: 80,
      spe: 100
    },
    weightKg: 82,
    abilities: ["Levitate"],
    group: "Regular"
  },
  cacnea: {
    name: "Cacnea",
    types: ["Grass"],
    baseStats: {
      hp: 50,
      atk: 85,
      def: 40,
      spa: 85,
      spd: 40,
      spe: 35
    },
    weightKg: 51.3,
    abilities: ["Sand Veil", "Water Absorb"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cacturne: {
    name: "Cacturne",
    types: ["Grass", "Dark"],
    baseStats: {
      hp: 70,
      atk: 115,
      def: 60,
      spa: 115,
      spd: 60,
      spe: 55
    },
    weightKg: 77.4,
    abilities: ["Sand Veil", "Water Absorb"],
    group: "Regular"
  },
  swablu: {
    name: "Swablu",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 45,
      atk: 40,
      def: 60,
      spa: 40,
      spd: 75,
      spe: 50
    },
    weightKg: 1.2,
    abilities: ["Natural Cure", "Cloud Nine"],
    notFullyEvolved: true,
    group: "Regular"
  },
  altaria: {
    name: "Altaria",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 75,
      atk: 70,
      def: 90,
      spa: 70,
      spd: 105,
      spe: 80
    },
    weightKg: 20.6,
    abilities: ["Natural Cure", "Cloud Nine"],
    group: "Low usage"
  },
  altariamega: {
    name: "Altaria-Mega",
    types: ["Dragon", "Fairy"],
    baseStats: {
      hp: 75,
      atk: 110,
      def: 110,
      spa: 110,
      spd: 105,
      spe: 80
    },
    weightKg: 20.6,
    abilities: ["Pixilate"],
    group: "Low usage"
  },
  zangoose: {
    name: "Zangoose",
    types: ["Normal"],
    baseStats: {
      hp: 73,
      atk: 115,
      def: 60,
      spa: 60,
      spd: 60,
      spe: 90
    },
    weightKg: 40.3,
    abilities: ["Immunity", "Toxic Boost"],
    group: "Regular"
  },
  seviper: {
    name: "Seviper",
    types: ["Poison"],
    baseStats: {
      hp: 73,
      atk: 100,
      def: 60,
      spa: 100,
      spd: 60,
      spe: 65
    },
    weightKg: 52.5,
    abilities: ["Shed Skin", "Infiltrator"],
    group: "Regular"
  },
  lunatone: {
    name: "Lunatone",
    types: ["Rock", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 55,
      def: 65,
      spa: 95,
      spd: 85,
      spe: 70
    },
    weightKg: 168,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  solrock: {
    name: "Solrock",
    types: ["Rock", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 95,
      def: 85,
      spa: 55,
      spd: 65,
      spe: 70
    },
    weightKg: 154,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  barboach: {
    name: "Barboach",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 50,
      atk: 48,
      def: 43,
      spa: 46,
      spd: 41,
      spe: 60
    },
    weightKg: 1.9,
    abilities: ["Oblivious", "Anticipation", "Hydration"],
    notFullyEvolved: true,
    group: "Regular"
  },
  whiscash: {
    name: "Whiscash",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 110,
      atk: 78,
      def: 73,
      spa: 76,
      spd: 71,
      spe: 60
    },
    weightKg: 23.6,
    abilities: ["Oblivious", "Anticipation", "Hydration"],
    group: "Regular"
  },
  corphish: {
    name: "Corphish",
    types: ["Water"],
    baseStats: {
      hp: 43,
      atk: 80,
      def: 65,
      spa: 50,
      spd: 35,
      spe: 35
    },
    weightKg: 11.5,
    abilities: ["Hyper Cutter", "Shell Armor", "Adaptability"],
    notFullyEvolved: true,
    group: "Regular"
  },
  crawdaunt: {
    name: "Crawdaunt",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 63,
      atk: 120,
      def: 85,
      spa: 90,
      spd: 55,
      spe: 55
    },
    weightKg: 32.8,
    abilities: ["Hyper Cutter", "Shell Armor", "Adaptability"],
    group: "Regular"
  },
  baltoy: {
    name: "Baltoy",
    types: ["Ground", "Psychic"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 55,
      spa: 40,
      spd: 70,
      spe: 55
    },
    weightKg: 21.5,
    gender: "N",
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  claydol: {
    name: "Claydol",
    types: ["Ground", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 70,
      def: 105,
      spa: 70,
      spd: 120,
      spe: 75
    },
    weightKg: 108,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  lileep: {
    name: "Lileep",
    types: ["Rock", "Grass"],
    baseStats: {
      hp: 66,
      atk: 41,
      def: 77,
      spa: 61,
      spd: 87,
      spe: 23
    },
    weightKg: 23.8,
    abilities: ["Suction Cups", "Storm Drain"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cradily: {
    name: "Cradily",
    types: ["Rock", "Grass"],
    baseStats: {
      hp: 86,
      atk: 81,
      def: 97,
      spa: 81,
      spd: 107,
      spe: 43
    },
    weightKg: 60.4,
    abilities: ["Suction Cups", "Storm Drain"],
    group: "Regular"
  },
  anorith: {
    name: "Anorith",
    types: ["Rock", "Bug"],
    baseStats: {
      hp: 45,
      atk: 95,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 75
    },
    weightKg: 12.5,
    abilities: ["Battle Armor", "Swift Swim"],
    notFullyEvolved: true,
    group: "Regular"
  },
  armaldo: {
    name: "Armaldo",
    types: ["Rock", "Bug"],
    baseStats: {
      hp: 75,
      atk: 125,
      def: 100,
      spa: 70,
      spd: 80,
      spe: 45
    },
    weightKg: 68.2,
    abilities: ["Battle Armor", "Swift Swim"],
    group: "Regular"
  },
  feebas: {
    name: "Feebas",
    types: ["Water"],
    baseStats: {
      hp: 20,
      atk: 15,
      def: 20,
      spa: 10,
      spd: 55,
      spe: 80
    },
    weightKg: 7.4,
    abilities: ["Swift Swim", "Oblivious", "Adaptability"],
    notFullyEvolved: true,
    group: "Regular"
  },
  milotic: {
    name: "Milotic",
    types: ["Water"],
    baseStats: {
      hp: 95,
      atk: 60,
      def: 79,
      spa: 100,
      spd: 125,
      spe: 81
    },
    weightKg: 162,
    abilities: ["Marvel Scale", "Competitive", "Cute Charm"],
    group: "Meta"
  },
  castform: {
    name: "Castform",
    types: ["Normal"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 70,
      spa: 70,
      spd: 70,
      spe: 70
    },
    weightKg: 0.8,
    abilities: ["Forecast"],
    group: "Regular"
  },
  castformrainy: {
    name: "Castform-Rainy",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 70,
      spa: 70,
      spd: 70,
      spe: 70
    },
    weightKg: 0.8,
    abilities: ["Forecast"],
    group: "Regular"
  },
  castformsnowy: {
    name: "Castform-Snowy",
    types: ["Ice"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 70,
      spa: 70,
      spd: 70,
      spe: 70
    },
    weightKg: 0.8,
    abilities: ["Forecast"],
    group: "Regular"
  },
  castformsunny: {
    name: "Castform-Sunny",
    types: ["Fire"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 70,
      spa: 70,
      spd: 70,
      spe: 70
    },
    weightKg: 0.8,
    abilities: ["Forecast"],
    group: "Regular"
  },
  kecleon: {
    name: "Kecleon",
    types: ["Normal"],
    baseStats: {
      hp: 60,
      atk: 90,
      def: 70,
      spa: 60,
      spd: 120,
      spe: 40
    },
    weightKg: 22,
    abilities: ["Color Change", "Protean"],
    group: "Regular"
  },
  shuppet: {
    name: "Shuppet",
    types: ["Ghost"],
    baseStats: {
      hp: 44,
      atk: 75,
      def: 35,
      spa: 63,
      spd: 33,
      spe: 45
    },
    weightKg: 2.3,
    abilities: ["Insomnia", "Frisk", "Cursed Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  banette: {
    name: "Banette",
    types: ["Ghost"],
    baseStats: {
      hp: 64,
      atk: 115,
      def: 65,
      spa: 83,
      spd: 63,
      spe: 65
    },
    weightKg: 12.5,
    abilities: ["Insomnia", "Frisk", "Cursed Body"],
    group: "Regular"
  },
  banettemega: {
    name: "Banette-Mega",
    types: ["Ghost"],
    baseStats: {
      hp: 64,
      atk: 165,
      def: 75,
      spa: 93,
      spd: 83,
      spe: 75
    },
    weightKg: 13,
    abilities: ["Prankster"],
    group: "Low usage"
  },
  duskull: {
    name: "Duskull",
    types: ["Ghost"],
    baseStats: {
      hp: 20,
      atk: 40,
      def: 90,
      spa: 30,
      spd: 90,
      spe: 25
    },
    weightKg: 15,
    abilities: ["Levitate", "Frisk"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dusclops: {
    name: "Dusclops",
    types: ["Ghost"],
    baseStats: {
      hp: 40,
      atk: 70,
      def: 130,
      spa: 60,
      spd: 130,
      spe: 25
    },
    weightKg: 30.6,
    abilities: ["Pressure", "Frisk"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tropius: {
    name: "Tropius",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 99,
      atk: 68,
      def: 83,
      spa: 72,
      spd: 87,
      spe: 51
    },
    weightKg: 100,
    abilities: ["Chlorophyll", "Solar Power", "Harvest"],
    group: "Regular"
  },
  chimecho: {
    name: "Chimecho",
    types: ["Psychic"],
    baseStats: {
      hp: 75,
      atk: 50,
      def: 80,
      spa: 95,
      spd: 90,
      spe: 65
    },
    weightKg: 1,
    abilities: ["Levitate"],
    group: "Regular"
  },
  chimechomega: {
    name: "Chimecho-Mega",
    types: ["Psychic", "Steel"],
    baseStats: {
      hp: 75,
      atk: 50,
      def: 110,
      spa: 135,
      spd: 120,
      spe: 65
    },
    weightKg: 8,
    abilities: ["Levitate"],
    group: "Regular"
  },
  absol: {
    name: "Absol",
    types: ["Dark"],
    baseStats: {
      hp: 65,
      atk: 130,
      def: 60,
      spa: 75,
      spd: 60,
      spe: 75
    },
    weightKg: 47,
    abilities: ["Pressure", "Super Luck", "Justified"],
    group: "Regular"
  },
  absolmega: {
    name: "Absol-Mega",
    types: ["Dark"],
    baseStats: {
      hp: 65,
      atk: 150,
      def: 60,
      spa: 115,
      spd: 60,
      spe: 115
    },
    weightKg: 49,
    abilities: ["Magic Bounce"],
    group: "Regular"
  },
  absolmegaz: {
    name: "Absol-Mega-Z",
    types: ["Dark", "Ghost"],
    baseStats: {
      hp: 65,
      atk: 154,
      def: 60,
      spa: 75,
      spd: 60,
      spe: 151
    },
    weightKg: 49,
    abilities: ["Sharpness"],
    group: "Regular",
    unreleased: true
  },
  wynaut: {
    name: "Wynaut",
    types: ["Psychic"],
    baseStats: {
      hp: 95,
      atk: 23,
      def: 48,
      spa: 23,
      spd: 48,
      spe: 23
    },
    weightKg: 14,
    abilities: ["Shadow Tag", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  snorunt: {
    name: "Snorunt",
    types: ["Ice"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 50,
      spa: 50,
      spd: 50,
      spe: 50
    },
    weightKg: 16.8,
    abilities: ["Inner Focus", "Ice Body", "Moody"],
    notFullyEvolved: true,
    group: "Regular"
  },
  glalie: {
    name: "Glalie",
    types: ["Ice"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 80,
      spa: 80,
      spd: 80,
      spe: 80
    },
    weightKg: 256.5,
    abilities: ["Inner Focus", "Ice Body", "Moody"],
    group: "Regular"
  },
  glaliemega: {
    name: "Glalie-Mega",
    types: ["Ice"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 80,
      spa: 120,
      spd: 80,
      spe: 100
    },
    weightKg: 350.2,
    abilities: ["Refrigerate"],
    group: "Regular"
  },
  spheal: {
    name: "Spheal",
    types: ["Ice", "Water"],
    baseStats: {
      hp: 70,
      atk: 40,
      def: 50,
      spa: 55,
      spd: 50,
      spe: 25
    },
    weightKg: 39.5,
    abilities: ["Thick Fat", "Ice Body", "Oblivious"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sealeo: {
    name: "Sealeo",
    types: ["Ice", "Water"],
    baseStats: {
      hp: 90,
      atk: 60,
      def: 70,
      spa: 75,
      spd: 70,
      spe: 45
    },
    weightKg: 87.6,
    abilities: ["Thick Fat", "Ice Body", "Oblivious"],
    notFullyEvolved: true,
    group: "Regular"
  },
  walrein: {
    name: "Walrein",
    types: ["Ice", "Water"],
    baseStats: {
      hp: 110,
      atk: 80,
      def: 90,
      spa: 95,
      spd: 90,
      spe: 65
    },
    weightKg: 150.6,
    abilities: ["Thick Fat", "Ice Body", "Oblivious"],
    group: "Regular"
  },
  clamperl: {
    name: "Clamperl",
    types: ["Water"],
    baseStats: {
      hp: 35,
      atk: 64,
      def: 85,
      spa: 74,
      spd: 55,
      spe: 32
    },
    weightKg: 52.5,
    abilities: ["Shell Armor", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  huntail: {
    name: "Huntail",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 104,
      def: 105,
      spa: 94,
      spd: 75,
      spe: 52
    },
    weightKg: 27,
    abilities: ["Swift Swim", "Water Veil"],
    group: "Regular"
  },
  gorebyss: {
    name: "Gorebyss",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 84,
      def: 105,
      spa: 114,
      spd: 75,
      spe: 52
    },
    weightKg: 22.6,
    abilities: ["Swift Swim", "Hydration"],
    group: "Regular"
  },
  relicanth: {
    name: "Relicanth",
    types: ["Water", "Rock"],
    baseStats: {
      hp: 100,
      atk: 90,
      def: 130,
      spa: 45,
      spd: 65,
      spe: 55
    },
    weightKg: 23.4,
    abilities: ["Swift Swim", "Rock Head", "Sturdy"],
    group: "Regular"
  },
  luvdisc: {
    name: "Luvdisc",
    types: ["Water"],
    baseStats: {
      hp: 43,
      atk: 30,
      def: 55,
      spa: 40,
      spd: 65,
      spe: 97
    },
    weightKg: 8.7,
    abilities: ["Swift Swim", "Hydration"],
    group: "Regular"
  },
  bagon: {
    name: "Bagon",
    types: ["Dragon"],
    baseStats: {
      hp: 45,
      atk: 75,
      def: 60,
      spa: 40,
      spd: 30,
      spe: 50
    },
    weightKg: 42.1,
    abilities: ["Rock Head", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  shelgon: {
    name: "Shelgon",
    types: ["Dragon"],
    baseStats: {
      hp: 65,
      atk: 95,
      def: 100,
      spa: 60,
      spd: 50,
      spe: 50
    },
    weightKg: 110.5,
    abilities: ["Rock Head", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  salamence: {
    name: "Salamence",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 95,
      atk: 135,
      def: 80,
      spa: 110,
      spd: 80,
      spe: 100
    },
    weightKg: 102.6,
    abilities: ["Intimidate", "Moxie"],
    group: "Regular"
  },
  salamencemega: {
    name: "Salamence-Mega",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 95,
      atk: 145,
      def: 130,
      spa: 120,
      spd: 90,
      spe: 120
    },
    weightKg: 112.6,
    abilities: ["Aerilate"],
    group: "Regular"
  },
  beldum: {
    name: "Beldum",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 40,
      atk: 55,
      def: 80,
      spa: 35,
      spd: 60,
      spe: 30
    },
    weightKg: 95.2,
    gender: "N",
    abilities: ["Clear Body", "Light Metal"],
    notFullyEvolved: true,
    group: "Regular"
  },
  metang: {
    name: "Metang",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 75,
      def: 100,
      spa: 55,
      spd: 80,
      spe: 50
    },
    weightKg: 202.5,
    gender: "N",
    abilities: ["Clear Body", "Light Metal"],
    notFullyEvolved: true,
    group: "Regular"
  },
  metagross: {
    name: "Metagross",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 135,
      def: 130,
      spa: 95,
      spd: 90,
      spe: 70
    },
    weightKg: 550,
    gender: "N",
    abilities: ["Clear Body", "Light Metal"],
    group: "Regular"
  },
  metagrossmega: {
    name: "Metagross-Mega",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 145,
      def: 150,
      spa: 105,
      spd: 110,
      spe: 110
    },
    weightKg: 942.9,
    gender: "N",
    abilities: ["Tough Claws"],
    group: "Meta"
  },
  regirock: {
    name: "Regirock",
    types: ["Rock"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 200,
      spa: 50,
      spd: 100,
      spe: 50
    },
    weightKg: 230,
    gender: "N",
    abilities: ["Clear Body", "Sturdy"],
    group: "Regular"
  },
  regice: {
    name: "Regice",
    types: ["Ice"],
    baseStats: {
      hp: 80,
      atk: 50,
      def: 100,
      spa: 100,
      spd: 200,
      spe: 50
    },
    weightKg: 175,
    gender: "N",
    abilities: ["Clear Body", "Ice Body"],
    group: "Regular"
  },
  registeel: {
    name: "Registeel",
    types: ["Steel"],
    baseStats: {
      hp: 80,
      atk: 75,
      def: 150,
      spa: 75,
      spd: 150,
      spe: 50
    },
    weightKg: 205,
    gender: "N",
    abilities: ["Clear Body", "Light Metal"],
    group: "Regular"
  },
  latias: {
    name: "Latias",
    types: ["Dragon", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 90,
      spa: 110,
      spd: 130,
      spe: 110
    },
    weightKg: 40,
    gender: "F",
    abilities: ["Levitate"],
    group: "Regular"
  },
  latiasmega: {
    name: "Latias-Mega",
    types: ["Dragon", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 120,
      spa: 140,
      spd: 150,
      spe: 110
    },
    weightKg: 52,
    gender: "F",
    abilities: ["Levitate"],
    group: "Regular"
  },
  latios: {
    name: "Latios",
    types: ["Dragon", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 90,
      def: 80,
      spa: 130,
      spd: 110,
      spe: 110
    },
    weightKg: 60,
    gender: "M",
    abilities: ["Levitate"],
    group: "Regular"
  },
  latiosmega: {
    name: "Latios-Mega",
    types: ["Dragon", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 130,
      def: 100,
      spa: 160,
      spd: 120,
      spe: 110
    },
    weightKg: 70,
    gender: "M",
    abilities: ["Levitate"],
    group: "Regular"
  },
  kyogre: {
    name: "Kyogre",
    types: ["Water"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 90,
      spa: 150,
      spd: 140,
      spe: 90
    },
    weightKg: 352,
    gender: "N",
    abilities: ["Drizzle"],
    group: "Regular"
  },
  groudon: {
    name: "Groudon",
    types: ["Ground"],
    baseStats: {
      hp: 100,
      atk: 150,
      def: 140,
      spa: 100,
      spd: 90,
      spe: 90
    },
    weightKg: 950,
    gender: "N",
    abilities: ["Drought"],
    group: "Regular"
  },
  rayquaza: {
    name: "Rayquaza",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 105,
      atk: 150,
      def: 90,
      spa: 150,
      spd: 90,
      spe: 95
    },
    weightKg: 206.5,
    gender: "N",
    abilities: ["Air Lock"],
    group: "Regular"
  },
  rayquazamega: {
    name: "Rayquaza-Mega",
    types: ["Dragon", "Flying"],
    baseStats: {
      hp: 105,
      atk: 180,
      def: 100,
      spa: 180,
      spd: 100,
      spe: 115
    },
    weightKg: 392,
    gender: "N",
    abilities: ["Delta Stream"],
    group: "Regular"
  },
  jirachi: {
    name: "Jirachi",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 100,
      spa: 100,
      spd: 100,
      spe: 100
    },
    weightKg: 1.1,
    gender: "N",
    abilities: ["Serene Grace"],
    group: "Regular"
  },
  deoxys: {
    name: "Deoxys",
    types: ["Psychic"],
    baseStats: {
      hp: 50,
      atk: 150,
      def: 50,
      spa: 150,
      spd: 50,
      spe: 150
    },
    weightKg: 60.8,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  deoxysattack: {
    name: "Deoxys-Attack",
    types: ["Psychic"],
    baseStats: {
      hp: 50,
      atk: 180,
      def: 20,
      spa: 180,
      spd: 20,
      spe: 150
    },
    weightKg: 60.8,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  deoxysdefense: {
    name: "Deoxys-Defense",
    types: ["Psychic"],
    baseStats: {
      hp: 50,
      atk: 70,
      def: 160,
      spa: 70,
      spd: 160,
      spe: 90
    },
    weightKg: 60.8,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  deoxysspeed: {
    name: "Deoxys-Speed",
    types: ["Psychic"],
    baseStats: {
      hp: 50,
      atk: 95,
      def: 90,
      spa: 95,
      spd: 90,
      spe: 180
    },
    weightKg: 60.8,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  turtwig: {
    name: "Turtwig",
    types: ["Grass"],
    baseStats: {
      hp: 55,
      atk: 68,
      def: 64,
      spa: 45,
      spd: 55,
      spe: 31
    },
    weightKg: 10.2,
    abilities: ["Overgrow", "Shell Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grotle: {
    name: "Grotle",
    types: ["Grass"],
    baseStats: {
      hp: 75,
      atk: 89,
      def: 85,
      spa: 55,
      spd: 65,
      spe: 36
    },
    weightKg: 97,
    abilities: ["Overgrow", "Shell Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  torterra: {
    name: "Torterra",
    types: ["Grass", "Ground"],
    baseStats: {
      hp: 95,
      atk: 109,
      def: 105,
      spa: 75,
      spd: 85,
      spe: 56
    },
    weightKg: 310,
    abilities: ["Overgrow", "Shell Armor"],
    group: "Regular"
  },
  chimchar: {
    name: "Chimchar",
    types: ["Fire"],
    baseStats: {
      hp: 44,
      atk: 58,
      def: 44,
      spa: 58,
      spd: 44,
      spe: 61
    },
    weightKg: 6.2,
    abilities: ["Blaze", "Iron Fist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  monferno: {
    name: "Monferno",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 64,
      atk: 78,
      def: 52,
      spa: 78,
      spd: 52,
      spe: 81
    },
    weightKg: 22,
    abilities: ["Blaze", "Iron Fist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  infernape: {
    name: "Infernape",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 76,
      atk: 104,
      def: 71,
      spa: 104,
      spd: 71,
      spe: 108
    },
    weightKg: 55,
    abilities: ["Blaze", "Iron Fist"],
    group: "Regular"
  },
  piplup: {
    name: "Piplup",
    types: ["Water"],
    baseStats: {
      hp: 53,
      atk: 51,
      def: 53,
      spa: 61,
      spd: 56,
      spe: 40
    },
    weightKg: 5.2,
    abilities: ["Torrent", "Competitive"],
    notFullyEvolved: true,
    group: "Regular"
  },
  prinplup: {
    name: "Prinplup",
    types: ["Water"],
    baseStats: {
      hp: 64,
      atk: 66,
      def: 68,
      spa: 81,
      spd: 76,
      spe: 50
    },
    weightKg: 23,
    abilities: ["Torrent", "Competitive"],
    notFullyEvolved: true,
    group: "Regular"
  },
  empoleon: {
    name: "Empoleon",
    types: ["Water", "Steel"],
    baseStats: {
      hp: 84,
      atk: 86,
      def: 88,
      spa: 111,
      spd: 101,
      spe: 60
    },
    weightKg: 84.5,
    abilities: ["Torrent", "Competitive"],
    group: "Regular"
  },
  starly: {
    name: "Starly",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 40,
      atk: 55,
      def: 30,
      spa: 30,
      spd: 30,
      spe: 60
    },
    weightKg: 2,
    abilities: ["Keen Eye", "Reckless"],
    notFullyEvolved: true,
    group: "Regular"
  },
  staravia: {
    name: "Staravia",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 55,
      atk: 75,
      def: 50,
      spa: 40,
      spd: 40,
      spe: 80
    },
    weightKg: 15.5,
    abilities: ["Intimidate", "Reckless"],
    notFullyEvolved: true,
    group: "Regular"
  },
  staraptor: {
    name: "Staraptor",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 85,
      atk: 120,
      def: 70,
      spa: 50,
      spd: 60,
      spe: 100
    },
    weightKg: 24.9,
    abilities: ["Intimidate", "Reckless"],
    group: "Low usage"
  },
  staraptormega: {
    name: "Staraptor-Mega",
    types: ["Fighting", "Flying"],
    baseStats: {
      hp: 85,
      atk: 140,
      def: 100,
      spa: 60,
      spd: 90,
      spe: 110
    },
    weightKg: 50,
    abilities: ["Contrary"],
    group: "Meta"
  },
  bidoof: {
    name: "Bidoof",
    types: ["Normal"],
    baseStats: {
      hp: 59,
      atk: 45,
      def: 40,
      spa: 35,
      spd: 40,
      spe: 31
    },
    weightKg: 20,
    abilities: ["Simple", "Unaware", "Moody"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bibarel: {
    name: "Bibarel",
    types: ["Normal", "Water"],
    baseStats: {
      hp: 79,
      atk: 85,
      def: 60,
      spa: 55,
      spd: 60,
      spe: 71
    },
    weightKg: 31.5,
    abilities: ["Simple", "Unaware", "Moody"],
    group: "Regular"
  },
  kricketot: {
    name: "Kricketot",
    types: ["Bug"],
    baseStats: {
      hp: 37,
      atk: 25,
      def: 41,
      spa: 25,
      spd: 41,
      spe: 25
    },
    weightKg: 2.2,
    abilities: ["Shed Skin", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kricketune: {
    name: "Kricketune",
    types: ["Bug"],
    baseStats: {
      hp: 77,
      atk: 85,
      def: 51,
      spa: 55,
      spd: 51,
      spe: 65
    },
    weightKg: 25.5,
    abilities: ["Swarm", "Technician"],
    group: "Regular"
  },
  shinx: {
    name: "Shinx",
    types: ["Electric"],
    baseStats: {
      hp: 45,
      atk: 65,
      def: 34,
      spa: 40,
      spd: 34,
      spe: 45
    },
    weightKg: 9.5,
    abilities: ["Rivalry", "Intimidate", "Guts"],
    notFullyEvolved: true,
    group: "Regular"
  },
  luxio: {
    name: "Luxio",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 49,
      spa: 60,
      spd: 49,
      spe: 60
    },
    weightKg: 30.5,
    abilities: ["Rivalry", "Intimidate", "Guts"],
    notFullyEvolved: true,
    group: "Regular"
  },
  luxray: {
    name: "Luxray",
    types: ["Electric"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 79,
      spa: 95,
      spd: 79,
      spe: 70
    },
    weightKg: 42,
    abilities: ["Rivalry", "Intimidate", "Guts"],
    group: "Regular"
  },
  budew: {
    name: "Budew",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 35,
      spa: 50,
      spd: 70,
      spe: 55
    },
    weightKg: 1.2,
    abilities: ["Natural Cure", "Poison Point", "Leaf Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  roserade: {
    name: "Roserade",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 60,
      atk: 70,
      def: 65,
      spa: 125,
      spd: 105,
      spe: 90
    },
    weightKg: 14.5,
    abilities: ["Natural Cure", "Poison Point", "Technician"],
    group: "Regular"
  },
  cranidos: {
    name: "Cranidos",
    types: ["Rock"],
    baseStats: {
      hp: 67,
      atk: 125,
      def: 40,
      spa: 30,
      spd: 30,
      spe: 58
    },
    weightKg: 31.5,
    abilities: ["Mold Breaker", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rampardos: {
    name: "Rampardos",
    types: ["Rock"],
    baseStats: {
      hp: 97,
      atk: 165,
      def: 60,
      spa: 65,
      spd: 50,
      spe: 58
    },
    weightKg: 102.5,
    abilities: ["Mold Breaker", "Sheer Force"],
    group: "Regular"
  },
  shieldon: {
    name: "Shieldon",
    types: ["Rock", "Steel"],
    baseStats: {
      hp: 30,
      atk: 42,
      def: 118,
      spa: 42,
      spd: 88,
      spe: 30
    },
    weightKg: 57,
    abilities: ["Sturdy", "Soundproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bastiodon: {
    name: "Bastiodon",
    types: ["Rock", "Steel"],
    baseStats: {
      hp: 60,
      atk: 52,
      def: 168,
      spa: 47,
      spd: 138,
      spe: 30
    },
    weightKg: 149.5,
    abilities: ["Sturdy", "Soundproof"],
    group: "Regular"
  },
  burmy: {
    name: "Burmy",
    types: ["Bug"],
    baseStats: {
      hp: 40,
      atk: 29,
      def: 45,
      spa: 29,
      spd: 45,
      spe: 36
    },
    weightKg: 3.4,
    abilities: ["Shed Skin", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wormadam: {
    name: "Wormadam",
    types: ["Bug", "Grass"],
    baseStats: {
      hp: 60,
      atk: 59,
      def: 85,
      spa: 79,
      spd: 105,
      spe: 36
    },
    weightKg: 6.5,
    gender: "F",
    abilities: ["Anticipation", "Overcoat"],
    group: "Regular"
  },
  wormadamsandy: {
    name: "Wormadam-Sandy",
    types: ["Bug", "Ground"],
    baseStats: {
      hp: 60,
      atk: 79,
      def: 105,
      spa: 59,
      spd: 85,
      spe: 36
    },
    weightKg: 6.5,
    gender: "F",
    abilities: ["Anticipation", "Overcoat"],
    group: "Regular"
  },
  wormadamtrash: {
    name: "Wormadam-Trash",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 60,
      atk: 69,
      def: 95,
      spa: 69,
      spd: 95,
      spe: 36
    },
    weightKg: 6.5,
    gender: "F",
    abilities: ["Anticipation", "Overcoat"],
    group: "Regular"
  },
  mothim: {
    name: "Mothim",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 70,
      atk: 94,
      def: 50,
      spa: 94,
      spd: 50,
      spe: 66
    },
    weightKg: 23.3,
    gender: "M",
    abilities: ["Swarm", "Tinted Lens"],
    group: "Regular"
  },
  combee: {
    name: "Combee",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 30,
      atk: 30,
      def: 42,
      spa: 30,
      spd: 42,
      spe: 70
    },
    weightKg: 5.5,
    abilities: ["Honey Gather", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vespiquen: {
    name: "Vespiquen",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 70,
      atk: 80,
      def: 102,
      spa: 80,
      spd: 102,
      spe: 40
    },
    weightKg: 38.5,
    gender: "F",
    abilities: ["Pressure", "Unnerve"],
    group: "Regular"
  },
  pachirisu: {
    name: "Pachirisu",
    types: ["Electric"],
    baseStats: {
      hp: 60,
      atk: 45,
      def: 70,
      spa: 45,
      spd: 90,
      spe: 95
    },
    weightKg: 3.9,
    abilities: ["Run Away", "Pickup", "Volt Absorb"],
    group: "Regular"
  },
  buizel: {
    name: "Buizel",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 65,
      def: 35,
      spa: 60,
      spd: 30,
      spe: 85
    },
    weightKg: 29.5,
    abilities: ["Swift Swim", "Water Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  floatzel: {
    name: "Floatzel",
    types: ["Water"],
    baseStats: {
      hp: 85,
      atk: 105,
      def: 55,
      spa: 85,
      spd: 50,
      spe: 115
    },
    weightKg: 33.5,
    abilities: ["Swift Swim", "Water Veil"],
    group: "Regular"
  },
  cherubi: {
    name: "Cherubi",
    types: ["Grass"],
    baseStats: {
      hp: 45,
      atk: 35,
      def: 45,
      spa: 62,
      spd: 53,
      spe: 35
    },
    weightKg: 3.3,
    abilities: ["Chlorophyll"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cherrim: {
    name: "Cherrim",
    types: ["Grass"],
    baseStats: {
      hp: 70,
      atk: 60,
      def: 70,
      spa: 87,
      spd: 78,
      spe: 85
    },
    weightKg: 9.3,
    abilities: ["Flower Gift"],
    group: "Regular"
  },
  cherrimsunshine: {
    name: "Cherrim-Sunshine",
    types: ["Grass"],
    baseStats: {
      hp: 70,
      atk: 60,
      def: 70,
      spa: 87,
      spd: 78,
      spe: 85
    },
    weightKg: 9.3,
    abilities: ["Flower Gift"],
    group: "Regular"
  },
  shellos: {
    name: "Shellos",
    types: ["Water"],
    baseStats: {
      hp: 76,
      atk: 48,
      def: 48,
      spa: 57,
      spd: 62,
      spe: 34
    },
    weightKg: 6.3,
    abilities: ["Sticky Hold", "Storm Drain", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gastrodon: {
    name: "Gastrodon",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 111,
      atk: 83,
      def: 68,
      spa: 92,
      spd: 82,
      spe: 39
    },
    weightKg: 29.9,
    abilities: ["Sticky Hold", "Storm Drain", "Sand Force"],
    group: "Regular"
  },
  ambipom: {
    name: "Ambipom",
    types: ["Normal"],
    baseStats: {
      hp: 75,
      atk: 100,
      def: 66,
      spa: 60,
      spd: 66,
      spe: 115
    },
    weightKg: 20.3,
    abilities: ["Technician", "Pickup", "Skill Link"],
    group: "Regular"
  },
  drifloon: {
    name: "Drifloon",
    types: ["Ghost", "Flying"],
    baseStats: {
      hp: 90,
      atk: 50,
      def: 34,
      spa: 60,
      spd: 44,
      spe: 70
    },
    weightKg: 1.2,
    abilities: ["Aftermath", "Unburden", "Flare Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  drifblim: {
    name: "Drifblim",
    types: ["Ghost", "Flying"],
    baseStats: {
      hp: 150,
      atk: 80,
      def: 44,
      spa: 90,
      spd: 54,
      spe: 80
    },
    weightKg: 15,
    abilities: ["Aftermath", "Unburden", "Flare Boost"],
    group: "Regular"
  },
  buneary: {
    name: "Buneary",
    types: ["Normal"],
    baseStats: {
      hp: 55,
      atk: 66,
      def: 44,
      spa: 44,
      spd: 56,
      spe: 85
    },
    weightKg: 5.5,
    abilities: ["Run Away", "Klutz", "Limber"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lopunny: {
    name: "Lopunny",
    types: ["Normal"],
    baseStats: {
      hp: 65,
      atk: 76,
      def: 84,
      spa: 54,
      spd: 96,
      spe: 105
    },
    weightKg: 33.3,
    abilities: ["Cute Charm", "Klutz", "Limber"],
    group: "Regular"
  },
  lopunnymega: {
    name: "Lopunny-Mega",
    types: ["Normal", "Fighting"],
    baseStats: {
      hp: 65,
      atk: 136,
      def: 94,
      spa: 54,
      spd: 96,
      spe: 135
    },
    weightKg: 28.3,
    abilities: ["Scrappy"],
    group: "Low usage"
  },
  mismagius: {
    name: "Mismagius",
    types: ["Ghost"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 60,
      spa: 105,
      spd: 105,
      spe: 105
    },
    weightKg: 4.4,
    abilities: ["Levitate"],
    group: "Regular"
  },
  honchkrow: {
    name: "Honchkrow",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 100,
      atk: 125,
      def: 52,
      spa: 105,
      spd: 52,
      spe: 71
    },
    weightKg: 27.3,
    abilities: ["Insomnia", "Super Luck", "Moxie"],
    group: "Regular"
  },
  glameow: {
    name: "Glameow",
    types: ["Normal"],
    baseStats: {
      hp: 49,
      atk: 55,
      def: 42,
      spa: 42,
      spd: 37,
      spe: 85
    },
    weightKg: 3.9,
    abilities: ["Limber", "Own Tempo", "Keen Eye"],
    notFullyEvolved: true,
    group: "Regular"
  },
  purugly: {
    name: "Purugly",
    types: ["Normal"],
    baseStats: {
      hp: 71,
      atk: 82,
      def: 64,
      spa: 64,
      spd: 59,
      spe: 112
    },
    weightKg: 43.8,
    abilities: ["Thick Fat", "Own Tempo", "Defiant"],
    group: "Regular"
  },
  chingling: {
    name: "Chingling",
    types: ["Psychic"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 50,
      spa: 65,
      spd: 50,
      spe: 45
    },
    weightKg: 0.6,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  stunky: {
    name: "Stunky",
    types: ["Poison", "Dark"],
    baseStats: {
      hp: 63,
      atk: 63,
      def: 47,
      spa: 41,
      spd: 41,
      spe: 74
    },
    weightKg: 19.2,
    abilities: ["Stench", "Aftermath", "Keen Eye"],
    notFullyEvolved: true,
    group: "Regular"
  },
  skuntank: {
    name: "Skuntank",
    types: ["Poison", "Dark"],
    baseStats: {
      hp: 103,
      atk: 93,
      def: 67,
      spa: 71,
      spd: 61,
      spe: 84
    },
    weightKg: 38,
    abilities: ["Stench", "Aftermath", "Keen Eye"],
    group: "Regular"
  },
  bronzor: {
    name: "Bronzor",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 57,
      atk: 24,
      def: 86,
      spa: 24,
      spd: 86,
      spe: 23
    },
    weightKg: 60.5,
    gender: "N",
    abilities: ["Levitate", "Heatproof", "Heavy Metal"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bronzong: {
    name: "Bronzong",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 67,
      atk: 89,
      def: 116,
      spa: 79,
      spd: 116,
      spe: 33
    },
    weightKg: 187,
    gender: "N",
    abilities: ["Levitate", "Heatproof", "Heavy Metal"],
    group: "Regular"
  },
  bonsly: {
    name: "Bonsly",
    types: ["Rock"],
    baseStats: {
      hp: 50,
      atk: 80,
      def: 95,
      spa: 10,
      spd: 45,
      spe: 10
    },
    weightKg: 15,
    abilities: ["Sturdy", "Rock Head", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  mimejr: {
    name: "Mime Jr.",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 20,
      atk: 25,
      def: 45,
      spa: 70,
      spd: 90,
      spe: 60
    },
    weightKg: 13,
    abilities: ["Soundproof", "Filter", "Technician"],
    notFullyEvolved: true,
    group: "Regular"
  },
  happiny: {
    name: "Happiny",
    types: ["Normal"],
    baseStats: {
      hp: 100,
      atk: 5,
      def: 5,
      spa: 15,
      spd: 65,
      spe: 30
    },
    weightKg: 24.4,
    gender: "F",
    abilities: ["Natural Cure", "Serene Grace", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  chatot: {
    name: "Chatot",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 76,
      atk: 65,
      def: 45,
      spa: 92,
      spd: 42,
      spe: 91
    },
    weightKg: 1.9,
    abilities: ["Keen Eye", "Tangled Feet", "Big Pecks"],
    group: "Regular"
  },
  spiritomb: {
    name: "Spiritomb",
    types: ["Ghost", "Dark"],
    baseStats: {
      hp: 50,
      atk: 92,
      def: 108,
      spa: 92,
      spd: 108,
      spe: 35
    },
    weightKg: 108,
    abilities: ["Pressure", "Infiltrator"],
    group: "Regular"
  },
  gible: {
    name: "Gible",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 58,
      atk: 70,
      def: 45,
      spa: 40,
      spd: 45,
      spe: 42
    },
    weightKg: 20.5,
    abilities: ["Sand Veil", "Rough Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gabite: {
    name: "Gabite",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 68,
      atk: 90,
      def: 65,
      spa: 50,
      spd: 55,
      spe: 82
    },
    weightKg: 56,
    abilities: ["Sand Veil", "Rough Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  garchomp: {
    name: "Garchomp",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 108,
      atk: 130,
      def: 95,
      spa: 80,
      spd: 85,
      spe: 102
    },
    weightKg: 95,
    abilities: ["Sand Veil", "Rough Skin"],
    group: "Meta"
  },
  garchompmega: {
    name: "Garchomp-Mega",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 108,
      atk: 170,
      def: 115,
      spa: 120,
      spd: 95,
      spe: 92
    },
    weightKg: 95,
    abilities: ["Sand Force"],
    group: "Meta"
  },
  garchompmegaz: {
    name: "Garchomp-Mega-Z",
    types: ["Dragon"],
    baseStats: {
      hp: 108,
      atk: 130,
      def: 85,
      spa: 141,
      spd: 85,
      spe: 151
    },
    weightKg: 99,
    abilities: ["Levitate"],
    group: "Regular",
    unreleased: true
  },
  munchlax: {
    name: "Munchlax",
    types: ["Normal"],
    baseStats: {
      hp: 135,
      atk: 85,
      def: 40,
      spa: 40,
      spd: 85,
      spe: 5
    },
    weightKg: 105,
    abilities: ["Pickup", "Thick Fat", "Gluttony"],
    notFullyEvolved: true,
    group: "Regular"
  },
  riolu: {
    name: "Riolu",
    types: ["Fighting"],
    baseStats: {
      hp: 40,
      atk: 70,
      def: 40,
      spa: 35,
      spd: 40,
      spe: 60
    },
    weightKg: 20.2,
    abilities: ["Steadfast", "Inner Focus", "Prankster"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lucario: {
    name: "Lucario",
    types: ["Fighting", "Steel"],
    baseStats: {
      hp: 70,
      atk: 110,
      def: 70,
      spa: 115,
      spd: 70,
      spe: 90
    },
    weightKg: 54,
    abilities: ["Steadfast", "Inner Focus", "Justified"],
    group: "Regular"
  },
  lucariomega: {
    name: "Lucario-Mega",
    types: ["Fighting", "Steel"],
    baseStats: {
      hp: 70,
      atk: 145,
      def: 88,
      spa: 140,
      spd: 70,
      spe: 112
    },
    weightKg: 57.5,
    abilities: ["Adaptability"],
    group: "Regular"
  },
  lucariomegaz: {
    name: "Lucario-Mega-Z",
    types: ["Fighting", "Steel"],
    baseStats: {
      hp: 70,
      atk: 100,
      def: 70,
      spa: 164,
      spd: 70,
      spe: 151
    },
    weightKg: 49.4,
    abilities: ["Aura Guard"],
    group: "Regular",
    unreleased: true
  },
  hippopotas: {
    name: "Hippopotas",
    types: ["Ground"],
    baseStats: {
      hp: 68,
      atk: 72,
      def: 78,
      spa: 38,
      spd: 42,
      spe: 32
    },
    weightKg: 49.5,
    abilities: ["Sand Stream", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hippowdon: {
    name: "Hippowdon",
    types: ["Ground"],
    baseStats: {
      hp: 108,
      atk: 112,
      def: 118,
      spa: 68,
      spd: 72,
      spe: 47
    },
    weightKg: 300,
    abilities: ["Sand Stream", "Sand Force"],
    group: "Regular"
  },
  skorupi: {
    name: "Skorupi",
    types: ["Poison", "Bug"],
    baseStats: {
      hp: 40,
      atk: 50,
      def: 90,
      spa: 30,
      spd: 55,
      spe: 65
    },
    weightKg: 12,
    abilities: ["Battle Armor", "Sniper", "Keen Eye"],
    notFullyEvolved: true,
    group: "Regular"
  },
  drapion: {
    name: "Drapion",
    types: ["Poison", "Dark"],
    baseStats: {
      hp: 70,
      atk: 90,
      def: 110,
      spa: 60,
      spd: 75,
      spe: 95
    },
    weightKg: 61.5,
    abilities: ["Battle Armor", "Sniper", "Keen Eye"],
    group: "Regular"
  },
  croagunk: {
    name: "Croagunk",
    types: ["Poison", "Fighting"],
    baseStats: {
      hp: 48,
      atk: 61,
      def: 40,
      spa: 61,
      spd: 40,
      spe: 50
    },
    weightKg: 23,
    abilities: ["Anticipation", "Dry Skin", "Poison Touch"],
    notFullyEvolved: true,
    group: "Regular"
  },
  toxicroak: {
    name: "Toxicroak",
    types: ["Poison", "Fighting"],
    baseStats: {
      hp: 83,
      atk: 106,
      def: 65,
      spa: 86,
      spd: 65,
      spe: 85
    },
    weightKg: 44.4,
    abilities: ["Anticipation", "Dry Skin", "Poison Touch"],
    group: "Regular"
  },
  carnivine: {
    name: "Carnivine",
    types: ["Grass"],
    baseStats: {
      hp: 74,
      atk: 100,
      def: 72,
      spa: 90,
      spd: 72,
      spe: 46
    },
    weightKg: 27,
    abilities: ["Levitate"],
    group: "Regular"
  },
  finneon: {
    name: "Finneon",
    types: ["Water"],
    baseStats: {
      hp: 49,
      atk: 49,
      def: 56,
      spa: 49,
      spd: 61,
      spe: 66
    },
    weightKg: 7,
    abilities: ["Swift Swim", "Storm Drain", "Water Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lumineon: {
    name: "Lumineon",
    types: ["Water"],
    baseStats: {
      hp: 69,
      atk: 69,
      def: 76,
      spa: 69,
      spd: 86,
      spe: 91
    },
    weightKg: 24,
    abilities: ["Swift Swim", "Storm Drain", "Water Veil"],
    group: "Regular"
  },
  mantyke: {
    name: "Mantyke",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 45,
      atk: 20,
      def: 50,
      spa: 60,
      spd: 120,
      spe: 50
    },
    weightKg: 65,
    abilities: ["Swift Swim", "Water Absorb", "Water Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  snover: {
    name: "Snover",
    types: ["Grass", "Ice"],
    baseStats: {
      hp: 60,
      atk: 62,
      def: 50,
      spa: 62,
      spd: 60,
      spe: 40
    },
    weightKg: 50.5,
    abilities: ["Snow Warning", "Soundproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  abomasnow: {
    name: "Abomasnow",
    types: ["Grass", "Ice"],
    baseStats: {
      hp: 90,
      atk: 92,
      def: 75,
      spa: 92,
      spd: 85,
      spe: 60
    },
    weightKg: 135.5,
    abilities: ["Snow Warning", "Soundproof"],
    group: "Regular"
  },
  abomasnowmega: {
    name: "Abomasnow-Mega",
    types: ["Grass", "Ice"],
    baseStats: {
      hp: 90,
      atk: 132,
      def: 105,
      spa: 132,
      spd: 105,
      spe: 30
    },
    weightKg: 185,
    abilities: ["Snow Warning"],
    group: "Regular"
  },
  weavile: {
    name: "Weavile",
    types: ["Dark", "Ice"],
    baseStats: {
      hp: 70,
      atk: 120,
      def: 65,
      spa: 45,
      spd: 85,
      spe: 125
    },
    weightKg: 34,
    abilities: ["Pressure", "Pickpocket"],
    group: "Low usage"
  },
  magnezone: {
    name: "Magnezone",
    types: ["Electric", "Steel"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 115,
      spa: 130,
      spd: 90,
      spe: 60
    },
    weightKg: 180,
    gender: "N",
    abilities: ["Magnet Pull", "Sturdy", "Analytic"],
    group: "Regular"
  },
  lickilicky: {
    name: "Lickilicky",
    types: ["Normal"],
    baseStats: {
      hp: 110,
      atk: 85,
      def: 95,
      spa: 80,
      spd: 95,
      spe: 50
    },
    weightKg: 140,
    abilities: ["Own Tempo", "Oblivious", "Cloud Nine"],
    group: "Regular"
  },
  rhyperior: {
    name: "Rhyperior",
    types: ["Ground", "Rock"],
    baseStats: {
      hp: 115,
      atk: 140,
      def: 130,
      spa: 55,
      spd: 55,
      spe: 40
    },
    weightKg: 282.8,
    abilities: ["Lightning Rod", "Solid Rock", "Reckless"],
    group: "Low usage"
  },
  tangrowth: {
    name: "Tangrowth",
    types: ["Grass"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 125,
      spa: 110,
      spd: 50,
      spe: 50
    },
    weightKg: 128.6,
    abilities: ["Chlorophyll", "Leaf Guard", "Regenerator"],
    group: "Regular"
  },
  electivire: {
    name: "Electivire",
    types: ["Electric"],
    baseStats: {
      hp: 75,
      atk: 123,
      def: 67,
      spa: 95,
      spd: 85,
      spe: 95
    },
    weightKg: 138.6,
    abilities: ["Motor Drive", "Vital Spirit"],
    group: "Regular"
  },
  magmortar: {
    name: "Magmortar",
    types: ["Fire"],
    baseStats: {
      hp: 75,
      atk: 95,
      def: 67,
      spa: 125,
      spd: 95,
      spe: 83
    },
    weightKg: 68,
    abilities: ["Flame Body", "Vital Spirit"],
    group: "Regular"
  },
  togekiss: {
    name: "Togekiss",
    types: ["Fairy", "Flying"],
    baseStats: {
      hp: 85,
      atk: 50,
      def: 95,
      spa: 120,
      spd: 115,
      spe: 80
    },
    weightKg: 38,
    abilities: ["Hustle", "Serene Grace", "Super Luck"],
    group: "Regular"
  },
  yanmega: {
    name: "Yanmega",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 86,
      atk: 76,
      def: 86,
      spa: 116,
      spd: 56,
      spe: 95
    },
    weightKg: 51.5,
    abilities: ["Speed Boost", "Tinted Lens", "Frisk"],
    group: "Regular"
  },
  leafeon: {
    name: "Leafeon",
    types: ["Grass"],
    baseStats: {
      hp: 65,
      atk: 110,
      def: 130,
      spa: 60,
      spd: 65,
      spe: 95
    },
    weightKg: 25.5,
    abilities: ["Leaf Guard", "Chlorophyll"],
    group: "Regular"
  },
  glaceon: {
    name: "Glaceon",
    types: ["Ice"],
    baseStats: {
      hp: 65,
      atk: 60,
      def: 110,
      spa: 130,
      spd: 95,
      spe: 65
    },
    weightKg: 25.9,
    abilities: ["Snow Cloak", "Ice Body"],
    group: "Regular"
  },
  gliscor: {
    name: "Gliscor",
    types: ["Ground", "Flying"],
    baseStats: {
      hp: 75,
      atk: 95,
      def: 125,
      spa: 45,
      spd: 75,
      spe: 95
    },
    weightKg: 42.5,
    abilities: ["Hyper Cutter", "Sand Veil", "Poison Heal"],
    group: "Regular"
  },
  mamoswine: {
    name: "Mamoswine",
    types: ["Ice", "Ground"],
    baseStats: {
      hp: 110,
      atk: 130,
      def: 80,
      spa: 70,
      spd: 60,
      spe: 80
    },
    weightKg: 291,
    abilities: ["Oblivious", "Snow Cloak", "Thick Fat"],
    group: "Low usage"
  },
  porygonz: {
    name: "Porygon-Z",
    types: ["Normal"],
    baseStats: {
      hp: 85,
      atk: 80,
      def: 70,
      spa: 135,
      spd: 75,
      spe: 90
    },
    weightKg: 34,
    gender: "N",
    abilities: ["Adaptability", "Download", "Analytic"],
    group: "Regular"
  },
  gallade: {
    name: "Gallade",
    types: ["Psychic", "Fighting"],
    baseStats: {
      hp: 68,
      atk: 125,
      def: 65,
      spa: 65,
      spd: 115,
      spe: 80
    },
    weightKg: 52,
    gender: "M",
    abilities: ["Steadfast", "Sharpness", "Justified"],
    group: "Low usage"
  },
  gallademega: {
    name: "Gallade-Mega",
    types: ["Psychic", "Fighting"],
    baseStats: {
      hp: 68,
      atk: 165,
      def: 95,
      spa: 65,
      spd: 115,
      spe: 110
    },
    weightKg: 56.4,
    gender: "M",
    abilities: ["Inner Focus"],
    group: "Regular"
  },
  probopass: {
    name: "Probopass",
    types: ["Rock", "Steel"],
    baseStats: {
      hp: 60,
      atk: 55,
      def: 145,
      spa: 75,
      spd: 150,
      spe: 40
    },
    weightKg: 340,
    abilities: ["Sturdy", "Magnet Pull", "Sand Force"],
    group: "Regular"
  },
  dusknoir: {
    name: "Dusknoir",
    types: ["Ghost"],
    baseStats: {
      hp: 45,
      atk: 100,
      def: 135,
      spa: 65,
      spd: 135,
      spe: 45
    },
    weightKg: 106.6,
    abilities: ["Pressure", "Frisk"],
    group: "Regular"
  },
  froslass: {
    name: "Froslass",
    types: ["Ice", "Ghost"],
    baseStats: {
      hp: 70,
      atk: 80,
      def: 70,
      spa: 80,
      spd: 70,
      spe: 110
    },
    weightKg: 26.6,
    gender: "F",
    abilities: ["Snow Cloak", "Cursed Body"],
    group: "Regular"
  },
  froslassmega: {
    name: "Froslass-Mega",
    types: ["Ice", "Ghost"],
    baseStats: {
      hp: 70,
      atk: 80,
      def: 70,
      spa: 140,
      spd: 100,
      spe: 120
    },
    weightKg: 29.6,
    gender: "F",
    abilities: ["Snow Warning"],
    group: "Meta"
  },
  rotom: {
    name: "Rotom",
    types: ["Electric", "Ghost"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 77,
      spa: 95,
      spd: 77,
      spe: 91
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  rotomfan: {
    name: "Rotom-Fan",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 107,
      spa: 105,
      spd: 107,
      spe: 86
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  rotomfrost: {
    name: "Rotom-Frost",
    types: ["Electric", "Ice"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 107,
      spa: 105,
      spd: 107,
      spe: 86
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  rotomheat: {
    name: "Rotom-Heat",
    types: ["Electric", "Fire"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 107,
      spa: 105,
      spd: 107,
      spe: 86
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Low usage"
  },
  rotommow: {
    name: "Rotom-Mow",
    types: ["Electric", "Grass"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 107,
      spa: 105,
      spd: 107,
      spe: 86
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  rotomwash: {
    name: "Rotom-Wash",
    types: ["Electric", "Water"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 107,
      spa: 105,
      spd: 107,
      spe: 86
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Low usage"
  },
  uxie: {
    name: "Uxie",
    types: ["Psychic"],
    baseStats: {
      hp: 75,
      atk: 75,
      def: 130,
      spa: 75,
      spd: 130,
      spe: 95
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  mesprit: {
    name: "Mesprit",
    types: ["Psychic"],
    baseStats: {
      hp: 80,
      atk: 105,
      def: 105,
      spa: 105,
      spd: 105,
      spe: 80
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  azelf: {
    name: "Azelf",
    types: ["Psychic"],
    baseStats: {
      hp: 75,
      atk: 125,
      def: 70,
      spa: 125,
      spd: 70,
      spe: 115
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  dialga: {
    name: "Dialga",
    types: ["Steel", "Dragon"],
    baseStats: {
      hp: 100,
      atk: 120,
      def: 120,
      spa: 150,
      spd: 100,
      spe: 90
    },
    weightKg: 683,
    gender: "N",
    abilities: ["Pressure", "Telepathy"],
    group: "Regular"
  },
  dialgaorigin: {
    name: "Dialga-Origin",
    types: ["Steel", "Dragon"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 120,
      spa: 150,
      spd: 120,
      spe: 90
    },
    weightKg: 850,
    gender: "N",
    abilities: ["Pressure", "Telepathy"],
    group: "Regular"
  },
  palkia: {
    name: "Palkia",
    types: ["Water", "Dragon"],
    baseStats: {
      hp: 90,
      atk: 120,
      def: 100,
      spa: 150,
      spd: 120,
      spe: 100
    },
    weightKg: 336,
    gender: "N",
    abilities: ["Pressure", "Telepathy"],
    group: "Regular"
  },
  palkiaorigin: {
    name: "Palkia-Origin",
    types: ["Water", "Dragon"],
    baseStats: {
      hp: 90,
      atk: 100,
      def: 100,
      spa: 150,
      spd: 120,
      spe: 120
    },
    weightKg: 660,
    gender: "N",
    abilities: ["Pressure", "Telepathy"],
    group: "Regular"
  },
  heatran: {
    name: "Heatran",
    types: ["Fire", "Steel"],
    baseStats: {
      hp: 91,
      atk: 90,
      def: 106,
      spa: 130,
      spd: 106,
      spe: 77
    },
    weightKg: 430,
    abilities: ["Flash Fire", "Flame Body"],
    group: "Regular"
  },
  heatranmega: {
    name: "Heatran-Mega",
    types: ["Fire", "Steel"],
    baseStats: {
      hp: 91,
      atk: 120,
      def: 106,
      spa: 175,
      spd: 141,
      spe: 67
    },
    weightKg: 570,
    abilities: ["Flash Fire"],
    group: "Regular",
    unreleased: true
  },
  regigigas: {
    name: "Regigigas",
    types: ["Normal"],
    baseStats: {
      hp: 110,
      atk: 160,
      def: 110,
      spa: 80,
      spd: 110,
      spe: 100
    },
    weightKg: 420,
    gender: "N",
    abilities: ["Slow Start"],
    group: "Regular"
  },
  giratina: {
    name: "Giratina",
    types: ["Ghost", "Dragon"],
    baseStats: {
      hp: 150,
      atk: 100,
      def: 120,
      spa: 100,
      spd: 120,
      spe: 90
    },
    weightKg: 750,
    gender: "N",
    abilities: ["Pressure", "Telepathy"],
    group: "Regular"
  },
  giratinaorigin: {
    name: "Giratina-Origin",
    types: ["Ghost", "Dragon"],
    baseStats: {
      hp: 150,
      atk: 120,
      def: 100,
      spa: 120,
      spd: 100,
      spe: 90
    },
    weightKg: 650,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  cresselia: {
    name: "Cresselia",
    types: ["Psychic"],
    baseStats: {
      hp: 120,
      atk: 70,
      def: 110,
      spa: 75,
      spd: 120,
      spe: 85
    },
    weightKg: 85.6,
    gender: "F",
    abilities: ["Levitate"],
    group: "Regular"
  },
  phione: {
    name: "Phione",
    types: ["Water"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 80,
      spa: 80,
      spd: 80,
      spe: 80
    },
    weightKg: 3.1,
    gender: "N",
    abilities: ["Hydration"],
    group: "Regular"
  },
  manaphy: {
    name: "Manaphy",
    types: ["Water"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 100,
      spa: 100,
      spd: 100,
      spe: 100
    },
    weightKg: 1.4,
    gender: "N",
    abilities: ["Hydration"],
    group: "Regular"
  },
  darkrai: {
    name: "Darkrai",
    types: ["Dark"],
    baseStats: {
      hp: 70,
      atk: 90,
      def: 90,
      spa: 135,
      spd: 90,
      spe: 125
    },
    weightKg: 50.5,
    gender: "N",
    abilities: ["Bad Dreams"],
    group: "Regular"
  },
  darkraimega: {
    name: "Darkrai-Mega",
    types: ["Dark"],
    baseStats: {
      hp: 70,
      atk: 120,
      def: 130,
      spa: 165,
      spd: 130,
      spe: 85
    },
    weightKg: 240,
    gender: "N",
    abilities: ["Bad Dreams"],
    group: "Regular",
    unreleased: true
  },
  shaymin: {
    name: "Shaymin",
    types: ["Grass"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 100,
      spa: 100,
      spd: 100,
      spe: 100
    },
    weightKg: 2.1,
    gender: "N",
    abilities: ["Natural Cure"],
    group: "Regular"
  },
  shayminsky: {
    name: "Shaymin-Sky",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 100,
      atk: 103,
      def: 75,
      spa: 120,
      spd: 75,
      spe: 127
    },
    weightKg: 5.2,
    gender: "N",
    abilities: ["Serene Grace"],
    group: "Regular"
  },
  arceus: {
    name: "Arceus",
    types: ["Normal"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusbug: {
    name: "Arceus-Bug",
    types: ["Bug"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusdark: {
    name: "Arceus-Dark",
    types: ["Dark"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusdragon: {
    name: "Arceus-Dragon",
    types: ["Dragon"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceuselectric: {
    name: "Arceus-Electric",
    types: ["Electric"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusfairy: {
    name: "Arceus-Fairy",
    types: ["Fairy"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusfighting: {
    name: "Arceus-Fighting",
    types: ["Fighting"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusfire: {
    name: "Arceus-Fire",
    types: ["Fire"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusflying: {
    name: "Arceus-Flying",
    types: ["Flying"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusghost: {
    name: "Arceus-Ghost",
    types: ["Ghost"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusgrass: {
    name: "Arceus-Grass",
    types: ["Grass"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusground: {
    name: "Arceus-Ground",
    types: ["Ground"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusice: {
    name: "Arceus-Ice",
    types: ["Ice"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceuspoison: {
    name: "Arceus-Poison",
    types: ["Poison"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceuspsychic: {
    name: "Arceus-Psychic",
    types: ["Psychic"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceusrock: {
    name: "Arceus-Rock",
    types: ["Rock"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceussteel: {
    name: "Arceus-Steel",
    types: ["Steel"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  arceuswater: {
    name: "Arceus-Water",
    types: ["Water"],
    baseStats: {
      hp: 120,
      atk: 120,
      def: 120,
      spa: 120,
      spd: 120,
      spe: 120
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Multitype"],
    group: "Regular"
  },
  victini: {
    name: "Victini",
    types: ["Psychic", "Fire"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 100,
      spa: 100,
      spd: 100,
      spe: 100
    },
    weightKg: 4,
    gender: "N",
    abilities: ["Victory Star"],
    group: "Regular"
  },
  snivy: {
    name: "Snivy",
    types: ["Grass"],
    baseStats: {
      hp: 45,
      atk: 45,
      def: 55,
      spa: 45,
      spd: 55,
      spe: 63
    },
    weightKg: 8.1,
    abilities: ["Overgrow", "Contrary"],
    notFullyEvolved: true,
    group: "Regular"
  },
  servine: {
    name: "Servine",
    types: ["Grass"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 75,
      spa: 60,
      spd: 75,
      spe: 83
    },
    weightKg: 16,
    abilities: ["Overgrow", "Contrary"],
    notFullyEvolved: true,
    group: "Regular"
  },
  serperior: {
    name: "Serperior",
    types: ["Grass"],
    baseStats: {
      hp: 75,
      atk: 75,
      def: 95,
      spa: 75,
      spd: 95,
      spe: 113
    },
    weightKg: 63,
    abilities: ["Overgrow", "Contrary"],
    group: "Regular"
  },
  tepig: {
    name: "Tepig",
    types: ["Fire"],
    baseStats: {
      hp: 65,
      atk: 63,
      def: 45,
      spa: 45,
      spd: 45,
      spe: 45
    },
    weightKg: 9.9,
    abilities: ["Blaze", "Thick Fat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pignite: {
    name: "Pignite",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 90,
      atk: 93,
      def: 55,
      spa: 70,
      spd: 55,
      spe: 55
    },
    weightKg: 55.5,
    abilities: ["Blaze", "Thick Fat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  emboar: {
    name: "Emboar",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 110,
      atk: 123,
      def: 65,
      spa: 100,
      spd: 65,
      spe: 65
    },
    weightKg: 150,
    abilities: ["Blaze", "Reckless"],
    group: "Regular"
  },
  emboarmega: {
    name: "Emboar-Mega",
    types: ["Fire", "Fighting"],
    baseStats: {
      hp: 110,
      atk: 148,
      def: 75,
      spa: 110,
      spd: 110,
      spe: 75
    },
    weightKg: 180.3,
    abilities: ["Mold Breaker"],
    group: "Regular"
  },
  oshawott: {
    name: "Oshawott",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 55,
      def: 45,
      spa: 63,
      spd: 45,
      spe: 45
    },
    weightKg: 5.9,
    abilities: ["Torrent", "Shell Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dewott: {
    name: "Dewott",
    types: ["Water"],
    baseStats: {
      hp: 75,
      atk: 75,
      def: 60,
      spa: 83,
      spd: 60,
      spe: 60
    },
    weightKg: 24.5,
    abilities: ["Torrent", "Shell Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  samurott: {
    name: "Samurott",
    types: ["Water"],
    baseStats: {
      hp: 95,
      atk: 100,
      def: 85,
      spa: 108,
      spd: 70,
      spe: 70
    },
    weightKg: 94.6,
    abilities: ["Torrent", "Shell Armor"],
    group: "Regular"
  },
  samurotthisui: {
    name: "Samurott-Hisui",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 90,
      atk: 108,
      def: 80,
      spa: 100,
      spd: 65,
      spe: 85
    },
    weightKg: 58.2,
    abilities: ["Torrent", "Sharpness"],
    group: "Low usage"
  },
  patrat: {
    name: "Patrat",
    types: ["Normal"],
    baseStats: {
      hp: 45,
      atk: 55,
      def: 39,
      spa: 35,
      spd: 39,
      spe: 42
    },
    weightKg: 11.6,
    abilities: ["Run Away", "Keen Eye", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  watchog: {
    name: "Watchog",
    types: ["Normal"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 69,
      spa: 60,
      spd: 69,
      spe: 77
    },
    weightKg: 27,
    abilities: ["Illuminate", "Keen Eye", "Analytic"],
    group: "Regular"
  },
  lillipup: {
    name: "Lillipup",
    types: ["Normal"],
    baseStats: {
      hp: 45,
      atk: 60,
      def: 45,
      spa: 25,
      spd: 45,
      spe: 55
    },
    weightKg: 4.1,
    abilities: ["Vital Spirit", "Pickup", "Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  herdier: {
    name: "Herdier",
    types: ["Normal"],
    baseStats: {
      hp: 65,
      atk: 80,
      def: 65,
      spa: 35,
      spd: 65,
      spe: 60
    },
    weightKg: 14.7,
    abilities: ["Intimidate", "Sand Rush", "Scrappy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  stoutland: {
    name: "Stoutland",
    types: ["Normal"],
    baseStats: {
      hp: 85,
      atk: 110,
      def: 90,
      spa: 45,
      spd: 90,
      spe: 80
    },
    weightKg: 61,
    abilities: ["Intimidate", "Sand Rush", "Scrappy"],
    group: "Regular"
  },
  purrloin: {
    name: "Purrloin",
    types: ["Dark"],
    baseStats: {
      hp: 41,
      atk: 50,
      def: 37,
      spa: 50,
      spd: 37,
      spe: 66
    },
    weightKg: 10.1,
    abilities: ["Limber", "Unburden", "Prankster"],
    notFullyEvolved: true,
    group: "Regular"
  },
  liepard: {
    name: "Liepard",
    types: ["Dark"],
    baseStats: {
      hp: 64,
      atk: 88,
      def: 50,
      spa: 88,
      spd: 50,
      spe: 106
    },
    weightKg: 37.5,
    abilities: ["Limber", "Unburden", "Prankster"],
    group: "Regular"
  },
  pansage: {
    name: "Pansage",
    types: ["Grass"],
    baseStats: {
      hp: 50,
      atk: 53,
      def: 48,
      spa: 53,
      spd: 48,
      spe: 64
    },
    weightKg: 10.5,
    abilities: ["Gluttony", "Overgrow"],
    notFullyEvolved: true,
    group: "Regular"
  },
  simisage: {
    name: "Simisage",
    types: ["Grass"],
    baseStats: {
      hp: 75,
      atk: 98,
      def: 63,
      spa: 98,
      spd: 63,
      spe: 101
    },
    weightKg: 30.5,
    abilities: ["Gluttony", "Overgrow"],
    group: "Regular"
  },
  pansear: {
    name: "Pansear",
    types: ["Fire"],
    baseStats: {
      hp: 50,
      atk: 53,
      def: 48,
      spa: 53,
      spd: 48,
      spe: 64
    },
    weightKg: 11,
    abilities: ["Gluttony", "Blaze"],
    notFullyEvolved: true,
    group: "Regular"
  },
  simisear: {
    name: "Simisear",
    types: ["Fire"],
    baseStats: {
      hp: 75,
      atk: 98,
      def: 63,
      spa: 98,
      spd: 63,
      spe: 101
    },
    weightKg: 28,
    abilities: ["Gluttony", "Blaze"],
    group: "Regular"
  },
  panpour: {
    name: "Panpour",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 53,
      def: 48,
      spa: 53,
      spd: 48,
      spe: 64
    },
    weightKg: 13.5,
    abilities: ["Gluttony", "Torrent"],
    notFullyEvolved: true,
    group: "Regular"
  },
  simipour: {
    name: "Simipour",
    types: ["Water"],
    baseStats: {
      hp: 75,
      atk: 98,
      def: 63,
      spa: 98,
      spd: 63,
      spe: 101
    },
    weightKg: 29,
    abilities: ["Gluttony", "Torrent"],
    group: "Regular"
  },
  munna: {
    name: "Munna",
    types: ["Psychic"],
    baseStats: {
      hp: 76,
      atk: 25,
      def: 45,
      spa: 67,
      spd: 55,
      spe: 24
    },
    weightKg: 23.3,
    abilities: ["Forewarn", "Synchronize", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  musharna: {
    name: "Musharna",
    types: ["Psychic"],
    baseStats: {
      hp: 116,
      atk: 55,
      def: 85,
      spa: 107,
      spd: 95,
      spe: 29
    },
    weightKg: 60.5,
    abilities: ["Forewarn", "Synchronize", "Telepathy"],
    group: "Regular"
  },
  pidove: {
    name: "Pidove",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 50,
      atk: 55,
      def: 50,
      spa: 36,
      spd: 30,
      spe: 43
    },
    weightKg: 2.1,
    abilities: ["Big Pecks", "Super Luck", "Rivalry"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tranquill: {
    name: "Tranquill",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 62,
      atk: 77,
      def: 62,
      spa: 50,
      spd: 42,
      spe: 65
    },
    weightKg: 15,
    abilities: ["Big Pecks", "Super Luck", "Rivalry"],
    notFullyEvolved: true,
    group: "Regular"
  },
  unfezant: {
    name: "Unfezant",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 80,
      atk: 115,
      def: 80,
      spa: 65,
      spd: 55,
      spe: 93
    },
    weightKg: 29,
    abilities: ["Big Pecks", "Super Luck", "Rivalry"],
    group: "Regular"
  },
  blitzle: {
    name: "Blitzle",
    types: ["Electric"],
    baseStats: {
      hp: 45,
      atk: 60,
      def: 32,
      spa: 50,
      spd: 32,
      spe: 76
    },
    weightKg: 29.8,
    abilities: ["Lightning Rod", "Motor Drive", "Sap Sipper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  zebstrika: {
    name: "Zebstrika",
    types: ["Electric"],
    baseStats: {
      hp: 75,
      atk: 100,
      def: 63,
      spa: 80,
      spd: 63,
      spe: 116
    },
    weightKg: 79.5,
    abilities: ["Lightning Rod", "Motor Drive", "Sap Sipper"],
    group: "Regular"
  },
  roggenrola: {
    name: "Roggenrola",
    types: ["Rock"],
    baseStats: {
      hp: 55,
      atk: 75,
      def: 85,
      spa: 25,
      spd: 25,
      spe: 15
    },
    weightKg: 18,
    abilities: ["Sturdy", "Weak Armor", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  boldore: {
    name: "Boldore",
    types: ["Rock"],
    baseStats: {
      hp: 70,
      atk: 105,
      def: 105,
      spa: 50,
      spd: 40,
      spe: 20
    },
    weightKg: 102,
    abilities: ["Sturdy", "Weak Armor", "Sand Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gigalith: {
    name: "Gigalith",
    types: ["Rock"],
    baseStats: {
      hp: 85,
      atk: 135,
      def: 130,
      spa: 60,
      spd: 80,
      spe: 25
    },
    weightKg: 260,
    abilities: ["Sturdy", "Sand Stream", "Sand Force"],
    group: "Regular"
  },
  woobat: {
    name: "Woobat",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 65,
      atk: 45,
      def: 43,
      spa: 55,
      spd: 43,
      spe: 72
    },
    weightKg: 2.1,
    abilities: ["Unaware", "Klutz", "Simple"],
    notFullyEvolved: true,
    group: "Regular"
  },
  swoobat: {
    name: "Swoobat",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 67,
      atk: 57,
      def: 55,
      spa: 77,
      spd: 55,
      spe: 114
    },
    weightKg: 10.5,
    abilities: ["Unaware", "Klutz", "Simple"],
    group: "Regular"
  },
  drilbur: {
    name: "Drilbur",
    types: ["Ground"],
    baseStats: {
      hp: 60,
      atk: 85,
      def: 40,
      spa: 30,
      spd: 45,
      spe: 68
    },
    weightKg: 8.5,
    abilities: ["Sand Rush", "Sand Force", "Mold Breaker"],
    notFullyEvolved: true,
    group: "Regular"
  },
  excadrill: {
    name: "Excadrill",
    types: ["Ground", "Steel"],
    baseStats: {
      hp: 110,
      atk: 135,
      def: 60,
      spa: 50,
      spd: 65,
      spe: 88
    },
    weightKg: 40.4,
    abilities: ["Sand Rush", "Sand Force", "Mold Breaker"],
    group: "Meta"
  },
  excadrillmega: {
    name: "Excadrill-Mega",
    types: ["Ground", "Steel"],
    baseStats: {
      hp: 110,
      atk: 165,
      def: 100,
      spa: 65,
      spd: 65,
      spe: 103
    },
    weightKg: 60,
    abilities: ["Piercing Drill"],
    group: "Regular"
  },
  audino: {
    name: "Audino",
    types: ["Normal"],
    baseStats: {
      hp: 103,
      atk: 60,
      def: 86,
      spa: 60,
      spd: 86,
      spe: 50
    },
    weightKg: 31,
    abilities: ["Healer", "Regenerator", "Klutz"],
    group: "Low usage"
  },
  audinomega: {
    name: "Audino-Mega",
    types: ["Normal", "Fairy"],
    baseStats: {
      hp: 103,
      atk: 60,
      def: 126,
      spa: 80,
      spd: 126,
      spe: 50
    },
    weightKg: 32,
    abilities: ["Healer"],
    group: "Regular"
  },
  timburr: {
    name: "Timburr",
    types: ["Fighting"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 55,
      spa: 25,
      spd: 35,
      spe: 35
    },
    weightKg: 12.5,
    abilities: ["Guts", "Sheer Force", "Iron Fist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gurdurr: {
    name: "Gurdurr",
    types: ["Fighting"],
    baseStats: {
      hp: 85,
      atk: 105,
      def: 85,
      spa: 40,
      spd: 50,
      spe: 40
    },
    weightKg: 40,
    abilities: ["Guts", "Sheer Force", "Iron Fist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  conkeldurr: {
    name: "Conkeldurr",
    types: ["Fighting"],
    baseStats: {
      hp: 105,
      atk: 140,
      def: 95,
      spa: 55,
      spd: 65,
      spe: 45
    },
    weightKg: 87,
    abilities: ["Guts", "Sheer Force", "Iron Fist"],
    group: "Regular"
  },
  tympole: {
    name: "Tympole",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 40,
      spa: 50,
      spd: 40,
      spe: 64
    },
    weightKg: 4.5,
    abilities: ["Swift Swim", "Hydration", "Water Absorb"],
    notFullyEvolved: true,
    group: "Regular"
  },
  palpitoad: {
    name: "Palpitoad",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 75,
      atk: 65,
      def: 55,
      spa: 65,
      spd: 55,
      spe: 69
    },
    weightKg: 17,
    abilities: ["Swift Swim", "Hydration", "Water Absorb"],
    notFullyEvolved: true,
    group: "Regular"
  },
  seismitoad: {
    name: "Seismitoad",
    types: ["Water", "Ground"],
    baseStats: {
      hp: 105,
      atk: 95,
      def: 75,
      spa: 85,
      spd: 75,
      spe: 74
    },
    weightKg: 62,
    abilities: ["Swift Swim", "Poison Touch", "Water Absorb"],
    group: "Regular"
  },
  throh: {
    name: "Throh",
    types: ["Fighting"],
    baseStats: {
      hp: 120,
      atk: 100,
      def: 85,
      spa: 30,
      spd: 85,
      spe: 45
    },
    weightKg: 55.5,
    gender: "M",
    abilities: ["Guts", "Inner Focus", "Mold Breaker"],
    group: "Regular"
  },
  sawk: {
    name: "Sawk",
    types: ["Fighting"],
    baseStats: {
      hp: 75,
      atk: 125,
      def: 75,
      spa: 30,
      spd: 75,
      spe: 85
    },
    weightKg: 51,
    gender: "M",
    abilities: ["Sturdy", "Inner Focus", "Mold Breaker"],
    group: "Regular"
  },
  sewaddle: {
    name: "Sewaddle",
    types: ["Bug", "Grass"],
    baseStats: {
      hp: 45,
      atk: 53,
      def: 70,
      spa: 40,
      spd: 60,
      spe: 42
    },
    weightKg: 2.5,
    abilities: ["Swarm", "Chlorophyll", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  swadloon: {
    name: "Swadloon",
    types: ["Bug", "Grass"],
    baseStats: {
      hp: 55,
      atk: 63,
      def: 90,
      spa: 50,
      spd: 80,
      spe: 42
    },
    weightKg: 7.3,
    abilities: ["Leaf Guard", "Chlorophyll", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  leavanny: {
    name: "Leavanny",
    types: ["Bug", "Grass"],
    baseStats: {
      hp: 75,
      atk: 103,
      def: 80,
      spa: 70,
      spd: 80,
      spe: 92
    },
    weightKg: 20.5,
    abilities: ["Swarm", "Chlorophyll", "Overcoat"],
    group: "Regular"
  },
  venipede: {
    name: "Venipede",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 30,
      atk: 45,
      def: 59,
      spa: 30,
      spd: 39,
      spe: 57
    },
    weightKg: 5.3,
    abilities: ["Poison Point", "Swarm", "Speed Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  whirlipede: {
    name: "Whirlipede",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 40,
      atk: 55,
      def: 99,
      spa: 40,
      spd: 79,
      spe: 47
    },
    weightKg: 58.5,
    abilities: ["Poison Point", "Swarm", "Speed Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  scolipede: {
    name: "Scolipede",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 60,
      atk: 100,
      def: 89,
      spa: 55,
      spd: 69,
      spe: 112
    },
    weightKg: 200.5,
    abilities: ["Poison Point", "Swarm", "Speed Boost"],
    group: "Regular"
  },
  scolipedemega: {
    name: "Scolipede-Mega",
    types: ["Bug", "Poison"],
    baseStats: {
      hp: 60,
      atk: 140,
      def: 149,
      spa: 75,
      spd: 99,
      spe: 62
    },
    weightKg: 230.5,
    abilities: ["Shell Armor"],
    group: "Regular"
  },
  cottonee: {
    name: "Cottonee",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 40,
      atk: 27,
      def: 60,
      spa: 37,
      spd: 50,
      spe: 66
    },
    weightKg: 0.6,
    abilities: ["Prankster", "Infiltrator", "Chlorophyll"],
    notFullyEvolved: true,
    group: "Regular"
  },
  whimsicott: {
    name: "Whimsicott",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 60,
      atk: 67,
      def: 85,
      spa: 77,
      spd: 75,
      spe: 116
    },
    weightKg: 6.6,
    abilities: ["Prankster", "Infiltrator", "Chlorophyll"],
    group: "Meta"
  },
  petilil: {
    name: "Petilil",
    types: ["Grass"],
    baseStats: {
      hp: 45,
      atk: 35,
      def: 50,
      spa: 70,
      spd: 50,
      spe: 30
    },
    weightKg: 6.6,
    gender: "F",
    abilities: ["Chlorophyll", "Own Tempo", "Leaf Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lilligant: {
    name: "Lilligant",
    types: ["Grass"],
    baseStats: {
      hp: 70,
      atk: 60,
      def: 75,
      spa: 110,
      spd: 75,
      spe: 90
    },
    weightKg: 16.3,
    gender: "F",
    abilities: ["Chlorophyll", "Own Tempo", "Leaf Guard"],
    group: "Regular"
  },
  lilliganthisui: {
    name: "Lilligant-Hisui",
    types: ["Grass", "Fighting"],
    baseStats: {
      hp: 70,
      atk: 105,
      def: 75,
      spa: 50,
      spd: 75,
      spe: 105
    },
    weightKg: 19.2,
    gender: "F",
    abilities: ["Chlorophyll", "Hustle", "Leaf Guard"],
    group: "Regular"
  },
  basculin: {
    name: "Basculin",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 92,
      def: 65,
      spa: 80,
      spd: 55,
      spe: 98
    },
    weightKg: 18,
    abilities: ["Reckless", "Adaptability", "Mold Breaker"],
    group: "Regular"
  },
  basculinbluestriped: {
    name: "Basculin-Blue-Striped",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 92,
      def: 65,
      spa: 80,
      spd: 55,
      spe: 98
    },
    weightKg: 18,
    abilities: ["Rock Head", "Adaptability", "Mold Breaker"],
    group: "Regular"
  },
  basculinwhitestriped: {
    name: "Basculin-White-Striped",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 92,
      def: 65,
      spa: 80,
      spd: 55,
      spe: 98
    },
    weightKg: 18,
    abilities: ["Rattled", "Adaptability", "Mold Breaker"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sandile: {
    name: "Sandile",
    types: ["Ground", "Dark"],
    baseStats: {
      hp: 50,
      atk: 72,
      def: 35,
      spa: 35,
      spd: 35,
      spe: 65
    },
    weightKg: 15.2,
    abilities: ["Intimidate", "Moxie", "Anger Point"],
    notFullyEvolved: true,
    group: "Regular"
  },
  krokorok: {
    name: "Krokorok",
    types: ["Ground", "Dark"],
    baseStats: {
      hp: 60,
      atk: 82,
      def: 45,
      spa: 45,
      spd: 45,
      spe: 74
    },
    weightKg: 33.4,
    abilities: ["Intimidate", "Moxie", "Anger Point"],
    notFullyEvolved: true,
    group: "Regular"
  },
  krookodile: {
    name: "Krookodile",
    types: ["Ground", "Dark"],
    baseStats: {
      hp: 95,
      atk: 117,
      def: 80,
      spa: 65,
      spd: 70,
      spe: 92
    },
    weightKg: 96.3,
    abilities: ["Intimidate", "Moxie", "Anger Point"],
    group: "Regular"
  },
  darumaka: {
    name: "Darumaka",
    types: ["Fire"],
    baseStats: {
      hp: 70,
      atk: 90,
      def: 45,
      spa: 15,
      spd: 45,
      spe: 50
    },
    weightKg: 37.5,
    abilities: ["Hustle", "Inner Focus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  darumakagalar: {
    name: "Darumaka-Galar",
    types: ["Ice"],
    baseStats: {
      hp: 70,
      atk: 90,
      def: 45,
      spa: 15,
      spd: 45,
      spe: 50
    },
    weightKg: 40,
    abilities: ["Hustle", "Inner Focus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  darmanitan: {
    name: "Darmanitan",
    types: ["Fire"],
    baseStats: {
      hp: 105,
      atk: 140,
      def: 55,
      spa: 30,
      spd: 55,
      spe: 95
    },
    weightKg: 92.9,
    abilities: ["Sheer Force", "Zen Mode"],
    group: "Regular"
  },
  darmanitangalar: {
    name: "Darmanitan-Galar",
    types: ["Ice"],
    baseStats: {
      hp: 105,
      atk: 140,
      def: 55,
      spa: 30,
      spd: 55,
      spe: 95
    },
    weightKg: 120,
    abilities: ["Gorilla Tactics", "Zen Mode"],
    group: "Regular"
  },
  darmanitangalarzen: {
    name: "Darmanitan-Galar-Zen",
    types: ["Ice", "Fire"],
    baseStats: {
      hp: 105,
      atk: 160,
      def: 55,
      spa: 30,
      spd: 55,
      spe: 135
    },
    weightKg: 120,
    abilities: ["Zen Mode"],
    group: "Regular"
  },
  darmanitanzen: {
    name: "Darmanitan-Zen",
    types: ["Fire", "Psychic"],
    baseStats: {
      hp: 105,
      atk: 30,
      def: 105,
      spa: 140,
      spd: 105,
      spe: 55
    },
    weightKg: 92.9,
    abilities: ["Zen Mode"],
    group: "Regular"
  },
  maractus: {
    name: "Maractus",
    types: ["Grass"],
    baseStats: {
      hp: 75,
      atk: 86,
      def: 67,
      spa: 106,
      spd: 67,
      spe: 60
    },
    weightKg: 28,
    abilities: ["Water Absorb", "Chlorophyll", "Storm Drain"],
    group: "Regular"
  },
  dwebble: {
    name: "Dwebble",
    types: ["Bug", "Rock"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 85,
      spa: 35,
      spd: 35,
      spe: 55
    },
    weightKg: 14.5,
    abilities: ["Sturdy", "Shell Armor", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  crustle: {
    name: "Crustle",
    types: ["Bug", "Rock"],
    baseStats: {
      hp: 70,
      atk: 105,
      def: 125,
      spa: 65,
      spd: 75,
      spe: 45
    },
    weightKg: 200,
    abilities: ["Sturdy", "Shell Armor", "Weak Armor"],
    group: "Regular"
  },
  scraggy: {
    name: "Scraggy",
    types: ["Dark", "Fighting"],
    baseStats: {
      hp: 50,
      atk: 75,
      def: 70,
      spa: 35,
      spd: 70,
      spe: 48
    },
    weightKg: 11.8,
    abilities: ["Shed Skin", "Moxie", "Intimidate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  scrafty: {
    name: "Scrafty",
    types: ["Dark", "Fighting"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 115,
      spa: 45,
      spd: 115,
      spe: 58
    },
    weightKg: 30,
    abilities: ["Shed Skin", "Moxie", "Intimidate"],
    group: "Low usage"
  },
  scraftymega: {
    name: "Scrafty-Mega",
    types: ["Dark", "Fighting"],
    baseStats: {
      hp: 65,
      atk: 130,
      def: 135,
      spa: 55,
      spd: 135,
      spe: 68
    },
    weightKg: 31,
    abilities: ["Intimidate"],
    group: "Low usage"
  },
  sigilyph: {
    name: "Sigilyph",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 72,
      atk: 58,
      def: 80,
      spa: 103,
      spd: 80,
      spe: 97
    },
    weightKg: 14,
    abilities: ["Wonder Skin", "Magic Guard", "Tinted Lens"],
    group: "Regular"
  },
  yamask: {
    name: "Yamask",
    types: ["Ghost"],
    baseStats: {
      hp: 38,
      atk: 30,
      def: 85,
      spa: 55,
      spd: 65,
      spe: 30
    },
    weightKg: 1.5,
    abilities: ["Mummy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  yamaskgalar: {
    name: "Yamask-Galar",
    types: ["Ground", "Ghost"],
    baseStats: {
      hp: 38,
      atk: 55,
      def: 85,
      spa: 30,
      spd: 65,
      spe: 30
    },
    weightKg: 1.5,
    abilities: ["Wandering Spirit"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cofagrigus: {
    name: "Cofagrigus",
    types: ["Ghost"],
    baseStats: {
      hp: 58,
      atk: 50,
      def: 145,
      spa: 95,
      spd: 105,
      spe: 30
    },
    weightKg: 76.5,
    abilities: ["Mummy"],
    group: "Regular"
  },
  tirtouga: {
    name: "Tirtouga",
    types: ["Water", "Rock"],
    baseStats: {
      hp: 54,
      atk: 78,
      def: 103,
      spa: 53,
      spd: 45,
      spe: 22
    },
    weightKg: 16.5,
    abilities: ["Solid Rock", "Sturdy", "Swift Swim"],
    notFullyEvolved: true,
    group: "Regular"
  },
  carracosta: {
    name: "Carracosta",
    types: ["Water", "Rock"],
    baseStats: {
      hp: 74,
      atk: 108,
      def: 133,
      spa: 83,
      spd: 65,
      spe: 32
    },
    weightKg: 81,
    abilities: ["Solid Rock", "Sturdy", "Swift Swim"],
    group: "Regular"
  },
  archen: {
    name: "Archen",
    types: ["Rock", "Flying"],
    baseStats: {
      hp: 55,
      atk: 112,
      def: 45,
      spa: 74,
      spd: 45,
      spe: 70
    },
    weightKg: 9.5,
    abilities: ["Defeatist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  archeops: {
    name: "Archeops",
    types: ["Rock", "Flying"],
    baseStats: {
      hp: 75,
      atk: 140,
      def: 65,
      spa: 112,
      spd: 65,
      spe: 110
    },
    weightKg: 32,
    abilities: ["Defeatist"],
    group: "Regular"
  },
  trubbish: {
    name: "Trubbish",
    types: ["Poison"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 62,
      spa: 40,
      spd: 62,
      spe: 65
    },
    weightKg: 31,
    abilities: ["Stench", "Sticky Hold", "Aftermath"],
    notFullyEvolved: true,
    group: "Regular"
  },
  garbodor: {
    name: "Garbodor",
    types: ["Poison"],
    baseStats: {
      hp: 80,
      atk: 95,
      def: 82,
      spa: 60,
      spd: 82,
      spe: 75
    },
    weightKg: 107.3,
    abilities: ["Stench", "Weak Armor", "Aftermath"],
    group: "Regular"
  },
  zorua: {
    name: "Zorua",
    types: ["Dark"],
    baseStats: {
      hp: 40,
      atk: 65,
      def: 40,
      spa: 80,
      spd: 40,
      spe: 65
    },
    weightKg: 12.5,
    abilities: ["Illusion"],
    notFullyEvolved: true,
    group: "Regular"
  },
  zoruahisui: {
    name: "Zorua-Hisui",
    types: ["Normal", "Ghost"],
    baseStats: {
      hp: 35,
      atk: 60,
      def: 40,
      spa: 85,
      spd: 40,
      spe: 70
    },
    weightKg: 12.5,
    abilities: ["Illusion"],
    notFullyEvolved: true,
    group: "Regular"
  },
  zoroark: {
    name: "Zoroark",
    types: ["Dark"],
    baseStats: {
      hp: 60,
      atk: 105,
      def: 60,
      spa: 120,
      spd: 60,
      spe: 105
    },
    weightKg: 81.1,
    abilities: ["Illusion"],
    group: "Regular"
  },
  zoroarkhisui: {
    name: "Zoroark-Hisui",
    types: ["Normal", "Ghost"],
    baseStats: {
      hp: 55,
      atk: 100,
      def: 60,
      spa: 125,
      spd: 60,
      spe: 110
    },
    weightKg: 73,
    abilities: ["Illusion"],
    group: "Low usage"
  },
  minccino: {
    name: "Minccino",
    types: ["Normal"],
    baseStats: {
      hp: 55,
      atk: 50,
      def: 40,
      spa: 40,
      spd: 40,
      spe: 75
    },
    weightKg: 5.8,
    abilities: ["Cute Charm", "Technician", "Skill Link"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cinccino: {
    name: "Cinccino",
    types: ["Normal"],
    baseStats: {
      hp: 75,
      atk: 95,
      def: 60,
      spa: 65,
      spd: 60,
      spe: 115
    },
    weightKg: 7.5,
    abilities: ["Cute Charm", "Technician", "Skill Link"],
    group: "Regular"
  },
  gothita: {
    name: "Gothita",
    types: ["Psychic"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 50,
      spa: 55,
      spd: 65,
      spe: 45
    },
    weightKg: 5.8,
    abilities: ["Frisk", "Competitive", "Shadow Tag"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gothorita: {
    name: "Gothorita",
    types: ["Psychic"],
    baseStats: {
      hp: 60,
      atk: 45,
      def: 70,
      spa: 75,
      spd: 85,
      spe: 55
    },
    weightKg: 18,
    abilities: ["Frisk", "Competitive", "Shadow Tag"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gothitelle: {
    name: "Gothitelle",
    types: ["Psychic"],
    baseStats: {
      hp: 70,
      atk: 55,
      def: 95,
      spa: 95,
      spd: 110,
      spe: 65
    },
    weightKg: 44,
    abilities: ["Frisk", "Competitive", "Shadow Tag"],
    group: "Regular"
  },
  solosis: {
    name: "Solosis",
    types: ["Psychic"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 40,
      spa: 105,
      spd: 50,
      spe: 20
    },
    weightKg: 1,
    abilities: ["Overcoat", "Magic Guard", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  duosion: {
    name: "Duosion",
    types: ["Psychic"],
    baseStats: {
      hp: 65,
      atk: 40,
      def: 50,
      spa: 125,
      spd: 60,
      spe: 30
    },
    weightKg: 8,
    abilities: ["Overcoat", "Magic Guard", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  reuniclus: {
    name: "Reuniclus",
    types: ["Psychic"],
    baseStats: {
      hp: 110,
      atk: 65,
      def: 75,
      spa: 125,
      spd: 85,
      spe: 30
    },
    weightKg: 20.1,
    abilities: ["Overcoat", "Magic Guard", "Regenerator"],
    group: "Regular"
  },
  ducklett: {
    name: "Ducklett",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 62,
      atk: 44,
      def: 50,
      spa: 44,
      spd: 50,
      spe: 55
    },
    weightKg: 5.5,
    abilities: ["Keen Eye", "Big Pecks", "Hydration"],
    notFullyEvolved: true,
    group: "Regular"
  },
  swanna: {
    name: "Swanna",
    types: ["Water", "Flying"],
    baseStats: {
      hp: 75,
      atk: 87,
      def: 63,
      spa: 87,
      spd: 63,
      spe: 98
    },
    weightKg: 24.2,
    abilities: ["Keen Eye", "Big Pecks", "Hydration"],
    group: "Regular"
  },
  vanillite: {
    name: "Vanillite",
    types: ["Ice"],
    baseStats: {
      hp: 36,
      atk: 50,
      def: 50,
      spa: 65,
      spd: 60,
      spe: 44
    },
    weightKg: 5.7,
    abilities: ["Ice Body", "Snow Cloak", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vanillish: {
    name: "Vanillish",
    types: ["Ice"],
    baseStats: {
      hp: 51,
      atk: 65,
      def: 65,
      spa: 80,
      spd: 75,
      spe: 59
    },
    weightKg: 41,
    abilities: ["Ice Body", "Snow Cloak", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vanilluxe: {
    name: "Vanilluxe",
    types: ["Ice"],
    baseStats: {
      hp: 71,
      atk: 95,
      def: 85,
      spa: 110,
      spd: 95,
      spe: 79
    },
    weightKg: 57.5,
    abilities: ["Ice Body", "Snow Warning", "Weak Armor"],
    group: "Low usage"
  },
  deerling: {
    name: "Deerling",
    types: ["Normal", "Grass"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 75
    },
    weightKg: 19.5,
    abilities: ["Chlorophyll", "Sap Sipper", "Serene Grace"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sawsbuck: {
    name: "Sawsbuck",
    types: ["Normal", "Grass"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 70,
      spa: 60,
      spd: 70,
      spe: 95
    },
    weightKg: 92.5,
    abilities: ["Chlorophyll", "Sap Sipper", "Serene Grace"],
    group: "Regular"
  },
  emolga: {
    name: "Emolga",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 55,
      atk: 75,
      def: 60,
      spa: 75,
      spd: 60,
      spe: 103
    },
    weightKg: 5,
    abilities: ["Static", "Motor Drive"],
    group: "Regular"
  },
  karrablast: {
    name: "Karrablast",
    types: ["Bug"],
    baseStats: {
      hp: 50,
      atk: 75,
      def: 45,
      spa: 40,
      spd: 45,
      spe: 60
    },
    weightKg: 5.9,
    abilities: ["Swarm", "Shed Skin", "No Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  escavalier: {
    name: "Escavalier",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 70,
      atk: 135,
      def: 105,
      spa: 60,
      spd: 105,
      spe: 20
    },
    weightKg: 33,
    abilities: ["Swarm", "Shell Armor", "Overcoat"],
    group: "Regular"
  },
  foongus: {
    name: "Foongus",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 69,
      atk: 55,
      def: 45,
      spa: 55,
      spd: 55,
      spe: 15
    },
    weightKg: 1,
    abilities: ["Effect Spore", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  amoonguss: {
    name: "Amoonguss",
    types: ["Grass", "Poison"],
    baseStats: {
      hp: 114,
      atk: 85,
      def: 70,
      spa: 85,
      spd: 80,
      spe: 30
    },
    weightKg: 10.5,
    abilities: ["Effect Spore", "Regenerator"],
    group: "Regular"
  },
  frillish: {
    name: "Frillish",
    types: ["Water", "Ghost"],
    baseStats: {
      hp: 55,
      atk: 40,
      def: 50,
      spa: 65,
      spd: 85,
      spe: 40
    },
    weightKg: 33,
    abilities: ["Water Absorb", "Cursed Body", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  jellicent: {
    name: "Jellicent",
    types: ["Water", "Ghost"],
    baseStats: {
      hp: 100,
      atk: 60,
      def: 70,
      spa: 85,
      spd: 105,
      spe: 60
    },
    weightKg: 135,
    abilities: ["Water Absorb", "Cursed Body", "Damp"],
    group: "Regular"
  },
  alomomola: {
    name: "Alomomola",
    types: ["Water"],
    baseStats: {
      hp: 165,
      atk: 75,
      def: 80,
      spa: 40,
      spd: 45,
      spe: 65
    },
    weightKg: 31.6,
    abilities: ["Healer", "Hydration", "Regenerator"],
    group: "Regular"
  },
  joltik: {
    name: "Joltik",
    types: ["Bug", "Electric"],
    baseStats: {
      hp: 50,
      atk: 47,
      def: 50,
      spa: 57,
      spd: 50,
      spe: 65
    },
    weightKg: 0.6,
    abilities: ["Compound Eyes", "Unnerve", "Swarm"],
    notFullyEvolved: true,
    group: "Regular"
  },
  galvantula: {
    name: "Galvantula",
    types: ["Bug", "Electric"],
    baseStats: {
      hp: 70,
      atk: 77,
      def: 60,
      spa: 97,
      spd: 60,
      spe: 108
    },
    weightKg: 14.3,
    abilities: ["Compound Eyes", "Unnerve", "Swarm"],
    group: "Regular"
  },
  ferroseed: {
    name: "Ferroseed",
    types: ["Grass", "Steel"],
    baseStats: {
      hp: 44,
      atk: 50,
      def: 91,
      spa: 24,
      spd: 86,
      spe: 10
    },
    weightKg: 18.8,
    abilities: ["Iron Barbs"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ferrothorn: {
    name: "Ferrothorn",
    types: ["Grass", "Steel"],
    baseStats: {
      hp: 74,
      atk: 94,
      def: 131,
      spa: 54,
      spd: 116,
      spe: 20
    },
    weightKg: 110,
    abilities: ["Iron Barbs", "Anticipation"],
    group: "Regular"
  },
  klink: {
    name: "Klink",
    types: ["Steel"],
    baseStats: {
      hp: 40,
      atk: 55,
      def: 70,
      spa: 45,
      spd: 60,
      spe: 30
    },
    weightKg: 21,
    gender: "N",
    abilities: ["Plus", "Minus", "Clear Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  klang: {
    name: "Klang",
    types: ["Steel"],
    baseStats: {
      hp: 60,
      atk: 80,
      def: 95,
      spa: 70,
      spd: 85,
      spe: 50
    },
    weightKg: 51,
    gender: "N",
    abilities: ["Plus", "Minus", "Clear Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  klinklang: {
    name: "Klinklang",
    types: ["Steel"],
    baseStats: {
      hp: 60,
      atk: 100,
      def: 115,
      spa: 70,
      spd: 85,
      spe: 90
    },
    weightKg: 81,
    gender: "N",
    abilities: ["Plus", "Minus", "Clear Body"],
    group: "Regular"
  },
  tynamo: {
    name: "Tynamo",
    types: ["Electric"],
    baseStats: {
      hp: 35,
      atk: 55,
      def: 40,
      spa: 45,
      spd: 40,
      spe: 60
    },
    weightKg: 0.3,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  eelektrik: {
    name: "Eelektrik",
    types: ["Electric"],
    baseStats: {
      hp: 65,
      atk: 85,
      def: 70,
      spa: 75,
      spd: 70,
      spe: 40
    },
    weightKg: 22,
    abilities: ["Levitate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  eelektross: {
    name: "Eelektross",
    types: ["Electric"],
    baseStats: {
      hp: 85,
      atk: 115,
      def: 80,
      spa: 105,
      spd: 80,
      spe: 50
    },
    weightKg: 80.5,
    abilities: ["Levitate"],
    group: "Regular"
  },
  eelektrossmega: {
    name: "Eelektross-Mega",
    types: ["Electric"],
    baseStats: {
      hp: 85,
      atk: 145,
      def: 80,
      spa: 135,
      spd: 90,
      spe: 80
    },
    weightKg: 180,
    abilities: ["Eelevate"],
    group: "Low usage"
  },
  elgyem: {
    name: "Elgyem",
    types: ["Psychic"],
    baseStats: {
      hp: 55,
      atk: 55,
      def: 55,
      spa: 85,
      spd: 55,
      spe: 30
    },
    weightKg: 9,
    abilities: ["Telepathy", "Synchronize", "Analytic"],
    notFullyEvolved: true,
    group: "Regular"
  },
  beheeyem: {
    name: "Beheeyem",
    types: ["Psychic"],
    baseStats: {
      hp: 75,
      atk: 75,
      def: 75,
      spa: 125,
      spd: 95,
      spe: 40
    },
    weightKg: 34.5,
    abilities: ["Telepathy", "Synchronize", "Analytic"],
    group: "Regular"
  },
  litwick: {
    name: "Litwick",
    types: ["Ghost", "Fire"],
    baseStats: {
      hp: 50,
      atk: 30,
      def: 55,
      spa: 65,
      spd: 55,
      spe: 20
    },
    weightKg: 3.1,
    abilities: ["Flash Fire", "Flame Body", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lampent: {
    name: "Lampent",
    types: ["Ghost", "Fire"],
    baseStats: {
      hp: 60,
      atk: 40,
      def: 60,
      spa: 95,
      spd: 60,
      spe: 55
    },
    weightKg: 13,
    abilities: ["Flash Fire", "Flame Body", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  chandelure: {
    name: "Chandelure",
    types: ["Ghost", "Fire"],
    baseStats: {
      hp: 60,
      atk: 55,
      def: 90,
      spa: 145,
      spd: 90,
      spe: 80
    },
    weightKg: 34.3,
    abilities: ["Flash Fire", "Flame Body", "Infiltrator"],
    group: "Low usage"
  },
  chandeluremega: {
    name: "Chandelure-Mega",
    types: ["Ghost", "Fire"],
    baseStats: {
      hp: 60,
      atk: 75,
      def: 110,
      spa: 175,
      spd: 110,
      spe: 90
    },
    weightKg: 69.6,
    abilities: ["Infiltrator"],
    group: "Low usage"
  },
  axew: {
    name: "Axew",
    types: ["Dragon"],
    baseStats: {
      hp: 46,
      atk: 87,
      def: 60,
      spa: 30,
      spd: 40,
      spe: 57
    },
    weightKg: 18,
    abilities: ["Rivalry", "Mold Breaker", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  fraxure: {
    name: "Fraxure",
    types: ["Dragon"],
    baseStats: {
      hp: 66,
      atk: 117,
      def: 70,
      spa: 40,
      spd: 50,
      spe: 67
    },
    weightKg: 36,
    abilities: ["Rivalry", "Mold Breaker", "Unnerve"],
    notFullyEvolved: true,
    group: "Regular"
  },
  haxorus: {
    name: "Haxorus",
    types: ["Dragon"],
    baseStats: {
      hp: 76,
      atk: 147,
      def: 90,
      spa: 60,
      spd: 70,
      spe: 97
    },
    weightKg: 105.5,
    abilities: ["Rivalry", "Mold Breaker", "Unnerve"],
    group: "Regular"
  },
  cubchoo: {
    name: "Cubchoo",
    types: ["Ice"],
    baseStats: {
      hp: 55,
      atk: 70,
      def: 40,
      spa: 60,
      spd: 40,
      spe: 40
    },
    weightKg: 8.5,
    abilities: ["Snow Cloak", "Slush Rush", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  beartic: {
    name: "Beartic",
    types: ["Ice"],
    baseStats: {
      hp: 95,
      atk: 130,
      def: 80,
      spa: 70,
      spd: 80,
      spe: 50
    },
    weightKg: 260,
    abilities: ["Snow Cloak", "Slush Rush", "Swift Swim"],
    group: "Regular"
  },
  cryogonal: {
    name: "Cryogonal",
    types: ["Ice"],
    baseStats: {
      hp: 80,
      atk: 50,
      def: 50,
      spa: 95,
      spd: 135,
      spe: 105
    },
    weightKg: 148,
    gender: "N",
    abilities: ["Levitate"],
    group: "Regular"
  },
  shelmet: {
    name: "Shelmet",
    types: ["Bug"],
    baseStats: {
      hp: 50,
      atk: 40,
      def: 85,
      spa: 40,
      spd: 65,
      spe: 25
    },
    weightKg: 7.7,
    abilities: ["Hydration", "Shell Armor", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  accelgor: {
    name: "Accelgor",
    types: ["Bug"],
    baseStats: {
      hp: 80,
      atk: 70,
      def: 40,
      spa: 100,
      spd: 60,
      spe: 145
    },
    weightKg: 25.3,
    abilities: ["Hydration", "Sticky Hold", "Unburden"],
    group: "Regular"
  },
  stunfisk: {
    name: "Stunfisk",
    types: ["Ground", "Electric"],
    baseStats: {
      hp: 109,
      atk: 66,
      def: 84,
      spa: 81,
      spd: 99,
      spe: 32
    },
    weightKg: 11,
    abilities: ["Static", "Limber", "Sand Veil"],
    group: "Regular"
  },
  stunfiskgalar: {
    name: "Stunfisk-Galar",
    types: ["Ground", "Steel"],
    baseStats: {
      hp: 109,
      atk: 81,
      def: 99,
      spa: 66,
      spd: 84,
      spe: 32
    },
    weightKg: 20.5,
    abilities: ["Mimicry"],
    group: "Regular"
  },
  mienfoo: {
    name: "Mienfoo",
    types: ["Fighting"],
    baseStats: {
      hp: 45,
      atk: 85,
      def: 50,
      spa: 55,
      spd: 50,
      spe: 65
    },
    weightKg: 20,
    abilities: ["Inner Focus", "Regenerator", "Reckless"],
    notFullyEvolved: true,
    group: "Regular"
  },
  mienshao: {
    name: "Mienshao",
    types: ["Fighting"],
    baseStats: {
      hp: 65,
      atk: 125,
      def: 60,
      spa: 95,
      spd: 60,
      spe: 105
    },
    weightKg: 35.5,
    abilities: ["Inner Focus", "Regenerator", "Reckless"],
    group: "Regular"
  },
  druddigon: {
    name: "Druddigon",
    types: ["Dragon"],
    baseStats: {
      hp: 77,
      atk: 120,
      def: 90,
      spa: 60,
      spd: 90,
      spe: 48
    },
    weightKg: 139,
    abilities: ["Rough Skin", "Sheer Force", "Mold Breaker"],
    group: "Regular"
  },
  golett: {
    name: "Golett",
    types: ["Ground", "Ghost"],
    baseStats: {
      hp: 59,
      atk: 74,
      def: 50,
      spa: 35,
      spd: 50,
      spe: 35
    },
    weightKg: 92,
    gender: "N",
    abilities: ["Iron Fist", "Klutz", "No Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  golurk: {
    name: "Golurk",
    types: ["Ground", "Ghost"],
    baseStats: {
      hp: 89,
      atk: 124,
      def: 80,
      spa: 55,
      spd: 80,
      spe: 55
    },
    weightKg: 330,
    gender: "N",
    abilities: ["Iron Fist", "Klutz", "No Guard"],
    group: "Low usage"
  },
  golurkmega: {
    name: "Golurk-Mega",
    types: ["Ground", "Ghost"],
    baseStats: {
      hp: 89,
      atk: 159,
      def: 105,
      spa: 70,
      spd: 105,
      spe: 55
    },
    weightKg: 330,
    gender: "N",
    abilities: ["Unseen Fist"],
    group: "Regular"
  },
  pawniard: {
    name: "Pawniard",
    types: ["Dark", "Steel"],
    baseStats: {
      hp: 45,
      atk: 85,
      def: 70,
      spa: 40,
      spd: 40,
      spe: 60
    },
    weightKg: 10.2,
    abilities: ["Defiant", "Inner Focus", "Pressure"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bisharp: {
    name: "Bisharp",
    types: ["Dark", "Steel"],
    baseStats: {
      hp: 65,
      atk: 125,
      def: 100,
      spa: 60,
      spd: 70,
      spe: 70
    },
    weightKg: 70,
    abilities: ["Defiant", "Inner Focus", "Pressure"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bouffalant: {
    name: "Bouffalant",
    types: ["Normal"],
    baseStats: {
      hp: 95,
      atk: 110,
      def: 95,
      spa: 40,
      spd: 95,
      spe: 55
    },
    weightKg: 94.6,
    abilities: ["Reckless", "Sap Sipper", "Soundproof"],
    group: "Regular"
  },
  rufflet: {
    name: "Rufflet",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 70,
      atk: 83,
      def: 50,
      spa: 37,
      spd: 50,
      spe: 60
    },
    weightKg: 10.5,
    gender: "M",
    abilities: ["Keen Eye", "Sheer Force", "Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  braviary: {
    name: "Braviary",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 100,
      atk: 123,
      def: 75,
      spa: 57,
      spd: 75,
      spe: 80
    },
    weightKg: 41,
    gender: "M",
    abilities: ["Keen Eye", "Sheer Force", "Defiant"],
    group: "Regular"
  },
  braviaryhisui: {
    name: "Braviary-Hisui",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 110,
      atk: 83,
      def: 70,
      spa: 112,
      spd: 70,
      spe: 65
    },
    weightKg: 43.4,
    gender: "M",
    abilities: ["Keen Eye", "Sheer Force", "Tinted Lens"],
    group: "Regular"
  },
  vullaby: {
    name: "Vullaby",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 70,
      atk: 55,
      def: 75,
      spa: 45,
      spd: 65,
      spe: 60
    },
    weightKg: 9,
    gender: "F",
    abilities: ["Big Pecks", "Overcoat", "Weak Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  mandibuzz: {
    name: "Mandibuzz",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 110,
      atk: 65,
      def: 105,
      spa: 55,
      spd: 95,
      spe: 80
    },
    weightKg: 39.5,
    gender: "F",
    abilities: ["Big Pecks", "Overcoat", "Weak Armor"],
    group: "Regular"
  },
  heatmor: {
    name: "Heatmor",
    types: ["Fire"],
    baseStats: {
      hp: 85,
      atk: 97,
      def: 66,
      spa: 105,
      spd: 66,
      spe: 65
    },
    weightKg: 58,
    abilities: ["Gluttony", "Flash Fire", "White Smoke"],
    group: "Regular"
  },
  durant: {
    name: "Durant",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 58,
      atk: 109,
      def: 112,
      spa: 48,
      spd: 48,
      spe: 109
    },
    weightKg: 33,
    abilities: ["Swarm", "Hustle", "Truant"],
    group: "Regular"
  },
  deino: {
    name: "Deino",
    types: ["Dark", "Dragon"],
    baseStats: {
      hp: 52,
      atk: 65,
      def: 50,
      spa: 45,
      spd: 50,
      spe: 38
    },
    weightKg: 17.3,
    abilities: ["Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  zweilous: {
    name: "Zweilous",
    types: ["Dark", "Dragon"],
    baseStats: {
      hp: 72,
      atk: 85,
      def: 70,
      spa: 65,
      spd: 70,
      spe: 58
    },
    weightKg: 50,
    abilities: ["Hustle"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hydreigon: {
    name: "Hydreigon",
    types: ["Dark", "Dragon"],
    baseStats: {
      hp: 92,
      atk: 105,
      def: 90,
      spa: 125,
      spd: 90,
      spe: 98
    },
    weightKg: 160,
    abilities: ["Levitate"],
    group: "Meta"
  },
  larvesta: {
    name: "Larvesta",
    types: ["Bug", "Fire"],
    baseStats: {
      hp: 55,
      atk: 85,
      def: 55,
      spa: 50,
      spd: 55,
      spe: 60
    },
    weightKg: 28.8,
    abilities: ["Flame Body", "Swarm"],
    notFullyEvolved: true,
    group: "Regular"
  },
  volcarona: {
    name: "Volcarona",
    types: ["Bug", "Fire"],
    baseStats: {
      hp: 85,
      atk: 60,
      def: 65,
      spa: 135,
      spd: 105,
      spe: 100
    },
    weightKg: 46,
    abilities: ["Flame Body", "Swarm"],
    group: "Low usage"
  },
  cobalion: {
    name: "Cobalion",
    types: ["Steel", "Fighting"],
    baseStats: {
      hp: 91,
      atk: 90,
      def: 129,
      spa: 90,
      spd: 72,
      spe: 108
    },
    weightKg: 250,
    gender: "N",
    abilities: ["Justified"],
    group: "Regular"
  },
  terrakion: {
    name: "Terrakion",
    types: ["Rock", "Fighting"],
    baseStats: {
      hp: 91,
      atk: 129,
      def: 90,
      spa: 72,
      spd: 90,
      spe: 108
    },
    weightKg: 260,
    gender: "N",
    abilities: ["Justified"],
    group: "Regular"
  },
  virizion: {
    name: "Virizion",
    types: ["Grass", "Fighting"],
    baseStats: {
      hp: 91,
      atk: 90,
      def: 72,
      spa: 90,
      spd: 129,
      spe: 108
    },
    weightKg: 200,
    gender: "N",
    abilities: ["Justified"],
    group: "Regular"
  },
  tornadus: {
    name: "Tornadus",
    types: ["Flying"],
    baseStats: {
      hp: 79,
      atk: 115,
      def: 70,
      spa: 125,
      spd: 80,
      spe: 111
    },
    weightKg: 63,
    gender: "M",
    abilities: ["Prankster", "Defiant"],
    group: "Regular"
  },
  tornadustherian: {
    name: "Tornadus-Therian",
    types: ["Flying"],
    baseStats: {
      hp: 79,
      atk: 100,
      def: 80,
      spa: 110,
      spd: 90,
      spe: 121
    },
    weightKg: 63,
    gender: "M",
    abilities: ["Regenerator"],
    group: "Regular"
  },
  thundurus: {
    name: "Thundurus",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 79,
      atk: 115,
      def: 70,
      spa: 125,
      spd: 80,
      spe: 111
    },
    weightKg: 61,
    gender: "M",
    abilities: ["Prankster", "Defiant"],
    group: "Regular"
  },
  thundurustherian: {
    name: "Thundurus-Therian",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 79,
      atk: 105,
      def: 70,
      spa: 145,
      spd: 80,
      spe: 101
    },
    weightKg: 61,
    gender: "M",
    abilities: ["Volt Absorb"],
    group: "Regular"
  },
  reshiram: {
    name: "Reshiram",
    types: ["Dragon", "Fire"],
    baseStats: {
      hp: 100,
      atk: 120,
      def: 100,
      spa: 150,
      spd: 120,
      spe: 90
    },
    weightKg: 330,
    gender: "N",
    abilities: ["Turboblaze"],
    group: "Regular"
  },
  zekrom: {
    name: "Zekrom",
    types: ["Dragon", "Electric"],
    baseStats: {
      hp: 100,
      atk: 150,
      def: 120,
      spa: 120,
      spd: 100,
      spe: 90
    },
    weightKg: 345,
    gender: "N",
    abilities: ["Teravolt"],
    group: "Regular"
  },
  landorus: {
    name: "Landorus",
    types: ["Ground", "Flying"],
    baseStats: {
      hp: 89,
      atk: 125,
      def: 90,
      spa: 115,
      spd: 80,
      spe: 101
    },
    weightKg: 68,
    gender: "M",
    abilities: ["Sand Force", "Sheer Force"],
    group: "Regular"
  },
  landorustherian: {
    name: "Landorus-Therian",
    types: ["Ground", "Flying"],
    baseStats: {
      hp: 89,
      atk: 145,
      def: 90,
      spa: 105,
      spd: 80,
      spe: 91
    },
    weightKg: 68,
    gender: "M",
    abilities: ["Intimidate"],
    group: "Regular"
  },
  kyurem: {
    name: "Kyurem",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 125,
      atk: 130,
      def: 90,
      spa: 130,
      spd: 90,
      spe: 95
    },
    weightKg: 325,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  kyuremblack: {
    name: "Kyurem-Black",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 125,
      atk: 170,
      def: 100,
      spa: 120,
      spd: 90,
      spe: 95
    },
    weightKg: 325,
    gender: "N",
    abilities: ["Teravolt"],
    group: "Regular"
  },
  kyuremwhite: {
    name: "Kyurem-White",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 125,
      atk: 120,
      def: 90,
      spa: 170,
      spd: 100,
      spe: 95
    },
    weightKg: 325,
    gender: "N",
    abilities: ["Turboblaze"],
    group: "Regular"
  },
  keldeo: {
    name: "Keldeo",
    types: ["Water", "Fighting"],
    baseStats: {
      hp: 91,
      atk: 72,
      def: 90,
      spa: 129,
      spd: 90,
      spe: 108
    },
    weightKg: 48.5,
    gender: "N",
    abilities: ["Justified"],
    group: "Regular"
  },
  keldeoresolute: {
    name: "Keldeo-Resolute",
    types: ["Water", "Fighting"],
    baseStats: {
      hp: 91,
      atk: 72,
      def: 90,
      spa: 129,
      spd: 90,
      spe: 108
    },
    weightKg: 48.5,
    gender: "N",
    abilities: ["Justified"],
    group: "Regular"
  },
  meloetta: {
    name: "Meloetta",
    types: ["Normal", "Psychic"],
    baseStats: {
      hp: 100,
      atk: 77,
      def: 77,
      spa: 128,
      spd: 128,
      spe: 90
    },
    weightKg: 6.5,
    gender: "N",
    abilities: ["Serene Grace"],
    group: "Regular"
  },
  meloettapirouette: {
    name: "Meloetta-Pirouette",
    types: ["Normal", "Fighting"],
    baseStats: {
      hp: 100,
      atk: 128,
      def: 90,
      spa: 77,
      spd: 77,
      spe: 128
    },
    weightKg: 6.5,
    gender: "N",
    abilities: ["Serene Grace"],
    group: "Regular"
  },
  genesect: {
    name: "Genesect",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 71,
      atk: 120,
      def: 95,
      spa: 120,
      spd: 95,
      spe: 99
    },
    weightKg: 82.5,
    gender: "N",
    abilities: ["Download"],
    group: "Regular"
  },
  genesectburn: {
    name: "Genesect-Burn",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 71,
      atk: 120,
      def: 95,
      spa: 120,
      spd: 95,
      spe: 99
    },
    weightKg: 82.5,
    gender: "N",
    abilities: ["Download"],
    group: "Regular"
  },
  genesectchill: {
    name: "Genesect-Chill",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 71,
      atk: 120,
      def: 95,
      spa: 120,
      spd: 95,
      spe: 99
    },
    weightKg: 82.5,
    gender: "N",
    abilities: ["Download"],
    group: "Regular"
  },
  genesectdouse: {
    name: "Genesect-Douse",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 71,
      atk: 120,
      def: 95,
      spa: 120,
      spd: 95,
      spe: 99
    },
    weightKg: 82.5,
    gender: "N",
    abilities: ["Download"],
    group: "Regular"
  },
  genesectshock: {
    name: "Genesect-Shock",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 71,
      atk: 120,
      def: 95,
      spa: 120,
      spd: 95,
      spe: 99
    },
    weightKg: 82.5,
    gender: "N",
    abilities: ["Download"],
    group: "Regular"
  },
  chespin: {
    name: "Chespin",
    types: ["Grass"],
    baseStats: {
      hp: 56,
      atk: 61,
      def: 65,
      spa: 48,
      spd: 45,
      spe: 38
    },
    weightKg: 9,
    abilities: ["Overgrow", "Bulletproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  quilladin: {
    name: "Quilladin",
    types: ["Grass"],
    baseStats: {
      hp: 61,
      atk: 78,
      def: 95,
      spa: 56,
      spd: 58,
      spe: 57
    },
    weightKg: 29,
    abilities: ["Overgrow", "Bulletproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  chesnaught: {
    name: "Chesnaught",
    types: ["Grass", "Fighting"],
    baseStats: {
      hp: 88,
      atk: 107,
      def: 122,
      spa: 74,
      spd: 75,
      spe: 64
    },
    weightKg: 90,
    abilities: ["Overgrow", "Bulletproof"],
    group: "Regular"
  },
  chesnaughtmega: {
    name: "Chesnaught-Mega",
    types: ["Grass", "Fighting"],
    baseStats: {
      hp: 88,
      atk: 137,
      def: 172,
      spa: 74,
      spd: 115,
      spe: 44
    },
    weightKg: 90,
    abilities: ["Bulletproof"],
    group: "Low usage"
  },
  fennekin: {
    name: "Fennekin",
    types: ["Fire"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 40,
      spa: 62,
      spd: 60,
      spe: 60
    },
    weightKg: 9.4,
    abilities: ["Blaze", "Magician"],
    notFullyEvolved: true,
    group: "Regular"
  },
  braixen: {
    name: "Braixen",
    types: ["Fire"],
    baseStats: {
      hp: 59,
      atk: 59,
      def: 58,
      spa: 90,
      spd: 70,
      spe: 73
    },
    weightKg: 14.5,
    abilities: ["Blaze", "Magician"],
    notFullyEvolved: true,
    group: "Regular"
  },
  delphox: {
    name: "Delphox",
    types: ["Fire", "Psychic"],
    baseStats: {
      hp: 75,
      atk: 69,
      def: 72,
      spa: 114,
      spd: 100,
      spe: 104
    },
    weightKg: 39,
    abilities: ["Blaze", "Magician"],
    group: "Regular"
  },
  delphoxmega: {
    name: "Delphox-Mega",
    types: ["Fire", "Psychic"],
    baseStats: {
      hp: 75,
      atk: 69,
      def: 72,
      spa: 159,
      spd: 125,
      spe: 134
    },
    weightKg: 39,
    abilities: ["Levitate"],
    group: "Meta"
  },
  froakie: {
    name: "Froakie",
    types: ["Water"],
    baseStats: {
      hp: 41,
      atk: 56,
      def: 40,
      spa: 62,
      spd: 44,
      spe: 71
    },
    weightKg: 7,
    abilities: ["Torrent", "Protean"],
    notFullyEvolved: true,
    group: "Regular"
  },
  frogadier: {
    name: "Frogadier",
    types: ["Water"],
    baseStats: {
      hp: 54,
      atk: 63,
      def: 52,
      spa: 83,
      spd: 56,
      spe: 97
    },
    weightKg: 10.9,
    abilities: ["Torrent", "Protean"],
    notFullyEvolved: true,
    group: "Regular"
  },
  greninja: {
    name: "Greninja",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 72,
      atk: 95,
      def: 67,
      spa: 103,
      spd: 71,
      spe: 122
    },
    weightKg: 40,
    abilities: ["Torrent", "Protean"],
    group: "Regular"
  },
  greninjaash: {
    name: "Greninja-Ash",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 72,
      atk: 145,
      def: 67,
      spa: 153,
      spd: 71,
      spe: 132
    },
    weightKg: 40,
    gender: "M",
    abilities: ["Battle Bond"],
    group: "Regular"
  },
  greninjamega: {
    name: "Greninja-Mega",
    types: ["Water", "Dark"],
    baseStats: {
      hp: 72,
      atk: 125,
      def: 77,
      spa: 133,
      spd: 81,
      spe: 142
    },
    weightKg: 40,
    abilities: ["Protean"],
    group: "Regular"
  },
  bunnelby: {
    name: "Bunnelby",
    types: ["Normal"],
    baseStats: {
      hp: 38,
      atk: 36,
      def: 38,
      spa: 32,
      spd: 36,
      spe: 57
    },
    weightKg: 5,
    abilities: ["Pickup", "Cheek Pouch", "Huge Power"],
    notFullyEvolved: true,
    group: "Regular"
  },
  diggersby: {
    name: "Diggersby",
    types: ["Normal", "Ground"],
    baseStats: {
      hp: 85,
      atk: 56,
      def: 77,
      spa: 50,
      spd: 77,
      spe: 78
    },
    weightKg: 42.4,
    abilities: ["Pickup", "Cheek Pouch", "Huge Power"],
    group: "Regular"
  },
  fletchling: {
    name: "Fletchling",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 45,
      atk: 50,
      def: 43,
      spa: 40,
      spd: 38,
      spe: 62
    },
    weightKg: 1.7,
    abilities: ["Big Pecks", "Gale Wings"],
    notFullyEvolved: true,
    group: "Regular"
  },
  fletchinder: {
    name: "Fletchinder",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 62,
      atk: 73,
      def: 55,
      spa: 56,
      spd: 52,
      spe: 84
    },
    weightKg: 16,
    abilities: ["Flame Body", "Gale Wings"],
    notFullyEvolved: true,
    group: "Regular"
  },
  talonflame: {
    name: "Talonflame",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 78,
      atk: 81,
      def: 71,
      spa: 74,
      spd: 69,
      spe: 126
    },
    weightKg: 24.5,
    abilities: ["Flame Body", "Gale Wings"],
    group: "Low usage"
  },
  scatterbug: {
    name: "Scatterbug",
    types: ["Bug"],
    baseStats: {
      hp: 38,
      atk: 35,
      def: 40,
      spa: 27,
      spd: 25,
      spe: 35
    },
    weightKg: 2.5,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  spewpa: {
    name: "Spewpa",
    types: ["Bug"],
    baseStats: {
      hp: 45,
      atk: 22,
      def: 60,
      spa: 27,
      spd: 30,
      spe: 29
    },
    weightKg: 8.4,
    abilities: ["Shed Skin", "Friend Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vivillon: {
    name: "Vivillon",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Meta"
  },
  vivillonarchipelago: {
    name: "Vivillon-Archipelago",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivilloncontinental: {
    name: "Vivillon-Continental",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonelegant: {
    name: "Vivillon-Elegant",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonfancy: {
    name: "Vivillon-Fancy",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillongarden: {
    name: "Vivillon-Garden",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonhighplains: {
    name: "Vivillon-High-Plains",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonicysnow: {
    name: "Vivillon-Icy-Snow",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonjungle: {
    name: "Vivillon-Jungle",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonmarine: {
    name: "Vivillon-Marine",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonmodern: {
    name: "Vivillon-Modern",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonmonsoon: {
    name: "Vivillon-Monsoon",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonocean: {
    name: "Vivillon-Ocean",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonpokeball: {
    name: "Vivillon-Pokeball",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonpolar: {
    name: "Vivillon-Polar",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonriver: {
    name: "Vivillon-River",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonsandstorm: {
    name: "Vivillon-Sandstorm",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonsavanna: {
    name: "Vivillon-Savanna",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillonsun: {
    name: "Vivillon-Sun",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  vivillontundra: {
    name: "Vivillon-Tundra",
    types: ["Bug", "Flying"],
    baseStats: {
      hp: 80,
      atk: 52,
      def: 50,
      spa: 90,
      spd: 50,
      spe: 89
    },
    weightKg: 17,
    abilities: ["Shield Dust", "Compound Eyes", "Friend Guard"],
    group: "Regular"
  },
  litleo: {
    name: "Litleo",
    types: ["Fire", "Normal"],
    baseStats: {
      hp: 62,
      atk: 50,
      def: 58,
      spa: 73,
      spd: 54,
      spe: 72
    },
    weightKg: 13.5,
    abilities: ["Rivalry", "Unnerve", "Moxie"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pyroar: {
    name: "Pyroar",
    types: ["Fire", "Normal"],
    baseStats: {
      hp: 86,
      atk: 68,
      def: 72,
      spa: 109,
      spd: 66,
      spe: 106
    },
    weightKg: 81.5,
    abilities: ["Rivalry", "Unnerve", "Moxie"],
    group: "Regular"
  },
  pyroarmega: {
    name: "Pyroar-Mega",
    types: ["Fire", "Normal"],
    baseStats: {
      hp: 86,
      atk: 88,
      def: 92,
      spa: 129,
      spd: 86,
      spe: 126
    },
    weightKg: 93.3,
    abilities: ["Fire Mane"],
    group: "Low usage"
  },
  flabebe: {
    name: "Flabébé",
    types: ["Fairy"],
    baseStats: {
      hp: 44,
      atk: 38,
      def: 39,
      spa: 61,
      spd: 79,
      spe: 42
    },
    weightKg: 0.1,
    gender: "F",
    abilities: ["Flower Veil", "Symbiosis"],
    notFullyEvolved: true,
    group: "Regular"
  },
  floette: {
    name: "Floette",
    types: ["Fairy"],
    baseStats: {
      hp: 54,
      atk: 45,
      def: 47,
      spa: 75,
      spd: 98,
      spe: 52
    },
    weightKg: 0.9,
    gender: "F",
    abilities: ["Flower Veil", "Symbiosis"],
    notFullyEvolved: true,
    group: "Regular"
  },
  floetteeternal: {
    name: "Floette-Eternal",
    types: ["Fairy"],
    baseStats: {
      hp: 74,
      atk: 65,
      def: 67,
      spa: 125,
      spd: 128,
      spe: 92
    },
    weightKg: 0.9,
    gender: "F",
    abilities: ["Flower Veil", "Symbiosis"],
    group: "Regular"
  },
  floettemega: {
    name: "Floette-Mega",
    types: ["Fairy"],
    baseStats: {
      hp: 74,
      atk: 85,
      def: 87,
      spa: 155,
      spd: 148,
      spe: 102
    },
    weightKg: 100.8,
    gender: "F",
    abilities: ["Fairy Aura"],
    group: "Meta"
  },
  florges: {
    name: "Florges",
    types: ["Fairy"],
    baseStats: {
      hp: 78,
      atk: 65,
      def: 68,
      spa: 112,
      spd: 154,
      spe: 75
    },
    weightKg: 10,
    gender: "F",
    abilities: ["Flower Veil", "Symbiosis"],
    group: "Regular"
  },
  skiddo: {
    name: "Skiddo",
    types: ["Grass"],
    baseStats: {
      hp: 66,
      atk: 65,
      def: 48,
      spa: 62,
      spd: 57,
      spe: 52
    },
    weightKg: 31,
    abilities: ["Sap Sipper", "Grass Pelt"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gogoat: {
    name: "Gogoat",
    types: ["Grass"],
    baseStats: {
      hp: 123,
      atk: 100,
      def: 62,
      spa: 97,
      spd: 81,
      spe: 68
    },
    weightKg: 91,
    abilities: ["Sap Sipper", "Grass Pelt"],
    group: "Regular"
  },
  pancham: {
    name: "Pancham",
    types: ["Fighting"],
    baseStats: {
      hp: 67,
      atk: 82,
      def: 62,
      spa: 46,
      spd: 48,
      spe: 43
    },
    weightKg: 8,
    abilities: ["Iron Fist", "Mold Breaker", "Scrappy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pangoro: {
    name: "Pangoro",
    types: ["Fighting", "Dark"],
    baseStats: {
      hp: 95,
      atk: 124,
      def: 78,
      spa: 69,
      spd: 71,
      spe: 58
    },
    weightKg: 136,
    abilities: ["Iron Fist", "Mold Breaker", "Scrappy"],
    group: "Regular"
  },
  furfrou: {
    name: "Furfrou",
    types: ["Normal"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 60,
      spa: 65,
      spd: 90,
      spe: 102
    },
    weightKg: 28,
    abilities: ["Fur Coat"],
    group: "Regular"
  },
  espurr: {
    name: "Espurr",
    types: ["Psychic"],
    baseStats: {
      hp: 62,
      atk: 48,
      def: 54,
      spa: 63,
      spd: 60,
      spe: 68
    },
    weightKg: 3.5,
    abilities: ["Keen Eye", "Infiltrator", "Own Tempo"],
    notFullyEvolved: true,
    group: "Regular"
  },
  meowstic: {
    name: "Meowstic",
    types: ["Psychic"],
    baseStats: {
      hp: 74,
      atk: 48,
      def: 76,
      spa: 83,
      spd: 81,
      spe: 104
    },
    weightKg: 8.5,
    gender: "M",
    abilities: ["Keen Eye", "Infiltrator", "Prankster"],
    group: "Regular"
  },
  meowsticf: {
    name: "Meowstic-F",
    types: ["Psychic"],
    baseStats: {
      hp: 74,
      atk: 48,
      def: 76,
      spa: 83,
      spd: 81,
      spe: 104
    },
    weightKg: 8.5,
    gender: "F",
    abilities: ["Keen Eye", "Infiltrator", "Competitive"],
    group: "Regular"
  },
  meowsticfmega: {
    name: "Meowstic-F-Mega",
    types: ["Psychic"],
    baseStats: {
      hp: 74,
      atk: 48,
      def: 76,
      spa: 143,
      spd: 101,
      spe: 124
    },
    weightKg: 10.1,
    gender: "F",
    abilities: ["Trace"],
    group: "Regular"
  },
  meowsticmmega: {
    name: "Meowstic-M-Mega",
    types: ["Psychic"],
    baseStats: {
      hp: 74,
      atk: 48,
      def: 76,
      spa: 143,
      spd: 101,
      spe: 124
    },
    weightKg: 10.1,
    gender: "M",
    abilities: ["Trace"],
    group: "Regular"
  },
  honedge: {
    name: "Honedge",
    types: ["Steel", "Ghost"],
    baseStats: {
      hp: 45,
      atk: 80,
      def: 100,
      spa: 35,
      spd: 37,
      spe: 28
    },
    weightKg: 2,
    abilities: ["No Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  doublade: {
    name: "Doublade",
    types: ["Steel", "Ghost"],
    baseStats: {
      hp: 59,
      atk: 110,
      def: 150,
      spa: 45,
      spd: 49,
      spe: 35
    },
    weightKg: 4.5,
    abilities: ["No Guard"],
    notFullyEvolved: true,
    group: "Regular"
  },
  aegislashblade: {
    name: "Aegislash-Blade",
    types: ["Steel", "Ghost"],
    baseStats: {
      hp: 60,
      atk: 140,
      def: 50,
      spa: 140,
      spd: 50,
      spe: 60
    },
    weightKg: 53,
    abilities: ["Stance Change"],
    group: "Regular"
  },
  aegislashshield: {
    name: "Aegislash-Shield",
    types: ["Steel", "Ghost"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 140,
      spa: 50,
      spd: 140,
      spe: 60
    },
    weightKg: 53,
    abilities: ["Stance Change"],
    group: "Meta"
  },
  spritzee: {
    name: "Spritzee",
    types: ["Fairy"],
    baseStats: {
      hp: 78,
      atk: 52,
      def: 60,
      spa: 63,
      spd: 65,
      spe: 23
    },
    weightKg: 0.5,
    abilities: ["Healer", "Aroma Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  aromatisse: {
    name: "Aromatisse",
    types: ["Fairy"],
    baseStats: {
      hp: 101,
      atk: 72,
      def: 72,
      spa: 99,
      spd: 89,
      spe: 29
    },
    weightKg: 15.5,
    abilities: ["Healer", "Aroma Veil"],
    group: "Low usage"
  },
  swirlix: {
    name: "Swirlix",
    types: ["Fairy"],
    baseStats: {
      hp: 62,
      atk: 48,
      def: 66,
      spa: 59,
      spd: 57,
      spe: 49
    },
    weightKg: 3.5,
    abilities: ["Sweet Veil", "Unburden"],
    notFullyEvolved: true,
    group: "Regular"
  },
  slurpuff: {
    name: "Slurpuff",
    types: ["Fairy"],
    baseStats: {
      hp: 82,
      atk: 80,
      def: 86,
      spa: 85,
      spd: 75,
      spe: 72
    },
    weightKg: 5,
    abilities: ["Sweet Veil", "Unburden"],
    group: "Regular"
  },
  inkay: {
    name: "Inkay",
    types: ["Dark", "Psychic"],
    baseStats: {
      hp: 53,
      atk: 54,
      def: 53,
      spa: 37,
      spd: 46,
      spe: 45
    },
    weightKg: 3.5,
    abilities: ["Contrary", "Suction Cups", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  malamar: {
    name: "Malamar",
    types: ["Dark", "Psychic"],
    baseStats: {
      hp: 86,
      atk: 92,
      def: 88,
      spa: 68,
      spd: 75,
      spe: 73
    },
    weightKg: 47,
    abilities: ["Contrary", "Suction Cups", "Infiltrator"],
    group: "Low usage"
  },
  malamarmega: {
    name: "Malamar-Mega",
    types: ["Dark", "Psychic"],
    baseStats: {
      hp: 86,
      atk: 102,
      def: 88,
      spa: 98,
      spd: 120,
      spe: 88
    },
    weightKg: 69.8,
    abilities: ["Contrary"],
    group: "Regular"
  },
  binacle: {
    name: "Binacle",
    types: ["Rock", "Water"],
    baseStats: {
      hp: 42,
      atk: 52,
      def: 67,
      spa: 39,
      spd: 56,
      spe: 50
    },
    weightKg: 31,
    abilities: ["Tough Claws", "Sniper", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  barbaracle: {
    name: "Barbaracle",
    types: ["Rock", "Water"],
    baseStats: {
      hp: 72,
      atk: 105,
      def: 115,
      spa: 54,
      spd: 86,
      spe: 68
    },
    weightKg: 96,
    abilities: ["Tough Claws", "Sniper", "Pickpocket"],
    group: "Regular"
  },
  barbaraclemega: {
    name: "Barbaracle-Mega",
    types: ["Rock", "Fighting"],
    baseStats: {
      hp: 72,
      atk: 140,
      def: 130,
      spa: 64,
      spd: 106,
      spe: 88
    },
    weightKg: 100,
    abilities: ["Tough Claws"],
    group: "Low usage"
  },
  skrelp: {
    name: "Skrelp",
    types: ["Poison", "Water"],
    baseStats: {
      hp: 50,
      atk: 60,
      def: 60,
      spa: 60,
      spd: 60,
      spe: 30
    },
    weightKg: 7.3,
    abilities: ["Poison Point", "Poison Touch", "Adaptability"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dragalge: {
    name: "Dragalge",
    types: ["Poison", "Dragon"],
    baseStats: {
      hp: 65,
      atk: 75,
      def: 90,
      spa: 97,
      spd: 123,
      spe: 44
    },
    weightKg: 81.5,
    abilities: ["Poison Point", "Poison Touch", "Adaptability"],
    group: "Regular"
  },
  dragalgemega: {
    name: "Dragalge-Mega",
    types: ["Poison", "Dragon"],
    baseStats: {
      hp: 65,
      atk: 85,
      def: 105,
      spa: 132,
      spd: 163,
      spe: 44
    },
    weightKg: 100.3,
    abilities: ["Regenerator"],
    group: "Regular"
  },
  clauncher: {
    name: "Clauncher",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 53,
      def: 62,
      spa: 58,
      spd: 63,
      spe: 44
    },
    weightKg: 8.3,
    abilities: ["Mega Launcher"],
    notFullyEvolved: true,
    group: "Regular"
  },
  clawitzer: {
    name: "Clawitzer",
    types: ["Water"],
    baseStats: {
      hp: 71,
      atk: 73,
      def: 88,
      spa: 120,
      spd: 89,
      spe: 59
    },
    weightKg: 35.3,
    abilities: ["Mega Launcher"],
    group: "Regular"
  },
  helioptile: {
    name: "Helioptile",
    types: ["Electric", "Normal"],
    baseStats: {
      hp: 44,
      atk: 38,
      def: 33,
      spa: 61,
      spd: 43,
      spe: 70
    },
    weightKg: 6,
    abilities: ["Dry Skin", "Sand Veil", "Solar Power"],
    notFullyEvolved: true,
    group: "Regular"
  },
  heliolisk: {
    name: "Heliolisk",
    types: ["Electric", "Normal"],
    baseStats: {
      hp: 62,
      atk: 55,
      def: 52,
      spa: 109,
      spd: 94,
      spe: 109
    },
    weightKg: 21,
    abilities: ["Dry Skin", "Sand Veil", "Solar Power"],
    group: "Regular"
  },
  tyrunt: {
    name: "Tyrunt",
    types: ["Rock", "Dragon"],
    baseStats: {
      hp: 58,
      atk: 89,
      def: 77,
      spa: 45,
      spd: 45,
      spe: 48
    },
    weightKg: 26,
    abilities: ["Strong Jaw", "Sturdy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tyrantrum: {
    name: "Tyrantrum",
    types: ["Rock", "Dragon"],
    baseStats: {
      hp: 82,
      atk: 121,
      def: 119,
      spa: 69,
      spd: 59,
      spe: 71
    },
    weightKg: 270,
    abilities: ["Strong Jaw", "Rock Head"],
    group: "Regular"
  },
  amaura: {
    name: "Amaura",
    types: ["Rock", "Ice"],
    baseStats: {
      hp: 77,
      atk: 59,
      def: 50,
      spa: 67,
      spd: 63,
      spe: 46
    },
    weightKg: 25.2,
    abilities: ["Refrigerate", "Snow Warning"],
    notFullyEvolved: true,
    group: "Regular"
  },
  aurorus: {
    name: "Aurorus",
    types: ["Rock", "Ice"],
    baseStats: {
      hp: 123,
      atk: 77,
      def: 72,
      spa: 99,
      spd: 92,
      spe: 58
    },
    weightKg: 225,
    abilities: ["Refrigerate", "Snow Warning"],
    group: "Regular"
  },
  sylveon: {
    name: "Sylveon",
    types: ["Fairy"],
    baseStats: {
      hp: 95,
      atk: 65,
      def: 65,
      spa: 110,
      spd: 130,
      spe: 60
    },
    weightKg: 23.5,
    abilities: ["Cute Charm", "Pixilate"],
    group: "Meta"
  },
  hawlucha: {
    name: "Hawlucha",
    types: ["Fighting", "Flying"],
    baseStats: {
      hp: 78,
      atk: 92,
      def: 75,
      spa: 74,
      spd: 63,
      spe: 118
    },
    weightKg: 21.5,
    abilities: ["Limber", "Unburden", "Mold Breaker"],
    group: "Regular"
  },
  hawluchamega: {
    name: "Hawlucha-Mega",
    types: ["Fighting", "Flying"],
    baseStats: {
      hp: 78,
      atk: 137,
      def: 100,
      spa: 74,
      spd: 93,
      spe: 118
    },
    weightKg: 25,
    abilities: ["No Guard"],
    group: "Low usage"
  },
  dedenne: {
    name: "Dedenne",
    types: ["Electric", "Fairy"],
    baseStats: {
      hp: 67,
      atk: 58,
      def: 57,
      spa: 81,
      spd: 67,
      spe: 101
    },
    weightKg: 2.2,
    abilities: ["Cheek Pouch", "Pickup", "Plus"],
    group: "Regular"
  },
  carbink: {
    name: "Carbink",
    types: ["Rock", "Fairy"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 150,
      spa: 50,
      spd: 150,
      spe: 50
    },
    weightKg: 5.7,
    gender: "N",
    abilities: ["Clear Body", "Sturdy"],
    group: "Regular"
  },
  goomy: {
    name: "Goomy",
    types: ["Dragon"],
    baseStats: {
      hp: 45,
      atk: 50,
      def: 35,
      spa: 55,
      spd: 75,
      spe: 40
    },
    weightKg: 2.8,
    abilities: ["Sap Sipper", "Hydration", "Gooey"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sliggoo: {
    name: "Sliggoo",
    types: ["Dragon"],
    baseStats: {
      hp: 68,
      atk: 75,
      def: 53,
      spa: 83,
      spd: 113,
      spe: 60
    },
    weightKg: 17.5,
    abilities: ["Sap Sipper", "Hydration", "Gooey"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sliggoohisui: {
    name: "Sliggoo-Hisui",
    types: ["Steel", "Dragon"],
    baseStats: {
      hp: 58,
      atk: 75,
      def: 83,
      spa: 83,
      spd: 113,
      spe: 40
    },
    weightKg: 68.5,
    abilities: ["Sap Sipper", "Shell Armor", "Gooey"],
    notFullyEvolved: true,
    group: "Regular"
  },
  goodra: {
    name: "Goodra",
    types: ["Dragon"],
    baseStats: {
      hp: 90,
      atk: 100,
      def: 70,
      spa: 110,
      spd: 150,
      spe: 80
    },
    weightKg: 150.5,
    abilities: ["Sap Sipper", "Hydration", "Gooey"],
    group: "Regular"
  },
  goodrahisui: {
    name: "Goodra-Hisui",
    types: ["Steel", "Dragon"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 100,
      spa: 110,
      spd: 150,
      spe: 60
    },
    weightKg: 334.1,
    abilities: ["Sap Sipper", "Shell Armor", "Gooey"],
    group: "Regular"
  },
  klefki: {
    name: "Klefki",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 57,
      atk: 80,
      def: 91,
      spa: 80,
      spd: 87,
      spe: 75
    },
    weightKg: 3,
    abilities: ["Prankster", "Magician"],
    group: "Regular"
  },
  phantump: {
    name: "Phantump",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 43,
      atk: 70,
      def: 48,
      spa: 50,
      spd: 60,
      spe: 38
    },
    weightKg: 7,
    abilities: ["Natural Cure", "Frisk", "Harvest"],
    notFullyEvolved: true,
    group: "Regular"
  },
  trevenant: {
    name: "Trevenant",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 85,
      atk: 110,
      def: 76,
      spa: 65,
      spd: 82,
      spe: 56
    },
    weightKg: 71,
    abilities: ["Natural Cure", "Frisk", "Harvest"],
    group: "Regular"
  },
  pumpkaboo: {
    name: "Pumpkaboo",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 49,
      atk: 66,
      def: 70,
      spa: 44,
      spd: 55,
      spe: 51
    },
    weightKg: 5,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pumpkaboolarge: {
    name: "Pumpkaboo-Large",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 54,
      atk: 66,
      def: 70,
      spa: 44,
      spd: 55,
      spe: 46
    },
    weightKg: 7.5,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pumpkaboosmall: {
    name: "Pumpkaboo-Small",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 44,
      atk: 66,
      def: 70,
      spa: 44,
      spd: 55,
      spe: 56
    },
    weightKg: 3.5,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pumpkaboosuper: {
    name: "Pumpkaboo-Super",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 59,
      atk: 66,
      def: 70,
      spa: 44,
      spd: 55,
      spe: 41
    },
    weightKg: 15,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gourgeist: {
    name: "Gourgeist",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 65,
      atk: 90,
      def: 122,
      spa: 58,
      spd: 75,
      spe: 84
    },
    weightKg: 12.5,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    group: "Regular"
  },
  gourgeistlarge: {
    name: "Gourgeist-Large",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 75,
      atk: 95,
      def: 122,
      spa: 58,
      spd: 75,
      spe: 69
    },
    weightKg: 14,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    group: "Regular"
  },
  gourgeistsmall: {
    name: "Gourgeist-Small",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 55,
      atk: 85,
      def: 122,
      spa: 58,
      spd: 75,
      spe: 99
    },
    weightKg: 9.5,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    group: "Regular"
  },
  gourgeistsuper: {
    name: "Gourgeist-Super",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 85,
      atk: 100,
      def: 122,
      spa: 58,
      spd: 75,
      spe: 54
    },
    weightKg: 39,
    abilities: ["Pickup", "Frisk", "Insomnia"],
    group: "Regular"
  },
  bergmite: {
    name: "Bergmite",
    types: ["Ice"],
    baseStats: {
      hp: 55,
      atk: 69,
      def: 85,
      spa: 32,
      spd: 35,
      spe: 28
    },
    weightKg: 99.5,
    abilities: ["Own Tempo", "Ice Body", "Sturdy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  avalugg: {
    name: "Avalugg",
    types: ["Ice"],
    baseStats: {
      hp: 95,
      atk: 117,
      def: 184,
      spa: 44,
      spd: 46,
      spe: 28
    },
    weightKg: 505,
    abilities: ["Own Tempo", "Ice Body", "Sturdy"],
    group: "Regular"
  },
  avalugghisui: {
    name: "Avalugg-Hisui",
    types: ["Ice", "Rock"],
    baseStats: {
      hp: 95,
      atk: 127,
      def: 184,
      spa: 34,
      spd: 36,
      spe: 38
    },
    weightKg: 262.4,
    abilities: ["Strong Jaw", "Ice Body", "Sturdy"],
    group: "Regular"
  },
  noibat: {
    name: "Noibat",
    types: ["Flying", "Dragon"],
    baseStats: {
      hp: 40,
      atk: 30,
      def: 35,
      spa: 45,
      spd: 40,
      spe: 55
    },
    weightKg: 8,
    abilities: ["Frisk", "Infiltrator", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  noivern: {
    name: "Noivern",
    types: ["Flying", "Dragon"],
    baseStats: {
      hp: 85,
      atk: 70,
      def: 80,
      spa: 97,
      spd: 80,
      spe: 123
    },
    weightKg: 85,
    abilities: ["Frisk", "Infiltrator", "Telepathy"],
    group: "Regular"
  },
  xerneas: {
    name: "Xerneas",
    types: ["Fairy"],
    baseStats: {
      hp: 126,
      atk: 131,
      def: 95,
      spa: 131,
      spd: 98,
      spe: 99
    },
    weightKg: 215,
    gender: "N",
    abilities: ["Fairy Aura"],
    group: "Regular"
  },
  yveltal: {
    name: "Yveltal",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 126,
      atk: 131,
      def: 95,
      spa: 131,
      spd: 98,
      spe: 99
    },
    weightKg: 203,
    gender: "N",
    abilities: ["Dark Aura"],
    group: "Regular"
  },
  zygarde: {
    name: "Zygarde",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 108,
      atk: 100,
      def: 121,
      spa: 81,
      spd: 95,
      spe: 95
    },
    weightKg: 305,
    gender: "N",
    abilities: ["Aura Break", "Power Construct"],
    group: "Regular"
  },
  zygarde10: {
    name: "Zygarde-10%",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 54,
      atk: 100,
      def: 71,
      spa: 61,
      spd: 85,
      spe: 115
    },
    weightKg: 33.5,
    gender: "N",
    abilities: ["Aura Break", "Power Construct"],
    group: "Regular"
  },
  zygardecomplete: {
    name: "Zygarde-Complete",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 216,
      atk: 100,
      def: 121,
      spa: 91,
      spd: 95,
      spe: 85
    },
    weightKg: 610,
    gender: "N",
    abilities: ["Power Construct"],
    group: "Regular"
  },
  diancie: {
    name: "Diancie",
    types: ["Rock", "Fairy"],
    baseStats: {
      hp: 50,
      atk: 100,
      def: 150,
      spa: 100,
      spd: 150,
      spe: 50
    },
    weightKg: 8.8,
    gender: "N",
    abilities: ["Clear Body"],
    group: "Regular"
  },
  dianciemega: {
    name: "Diancie-Mega",
    types: ["Rock", "Fairy"],
    baseStats: {
      hp: 50,
      atk: 160,
      def: 110,
      spa: 160,
      spd: 110,
      spe: 110
    },
    weightKg: 27.8,
    gender: "N",
    abilities: ["Magic Bounce"],
    group: "Regular"
  },
  hoopa: {
    name: "Hoopa",
    types: ["Psychic", "Ghost"],
    baseStats: {
      hp: 80,
      atk: 110,
      def: 60,
      spa: 150,
      spd: 130,
      spe: 70
    },
    weightKg: 9,
    gender: "N",
    abilities: ["Magician"],
    group: "Regular"
  },
  hoopaunbound: {
    name: "Hoopa-Unbound",
    types: ["Psychic", "Dark"],
    baseStats: {
      hp: 80,
      atk: 160,
      def: 60,
      spa: 170,
      spd: 130,
      spe: 80
    },
    weightKg: 490,
    gender: "N",
    abilities: ["Magician"],
    group: "Regular"
  },
  volcanion: {
    name: "Volcanion",
    types: ["Fire", "Water"],
    baseStats: {
      hp: 80,
      atk: 110,
      def: 120,
      spa: 130,
      spd: 90,
      spe: 70
    },
    weightKg: 195,
    gender: "N",
    abilities: ["Water Absorb"],
    group: "Regular"
  },
  rowlet: {
    name: "Rowlet",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 68,
      atk: 55,
      def: 55,
      spa: 50,
      spd: 50,
      spe: 42
    },
    weightKg: 1.5,
    abilities: ["Overgrow", "Long Reach"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dartrix: {
    name: "Dartrix",
    types: ["Grass", "Flying"],
    baseStats: {
      hp: 78,
      atk: 75,
      def: 75,
      spa: 70,
      spd: 70,
      spe: 52
    },
    weightKg: 16,
    abilities: ["Overgrow", "Long Reach"],
    notFullyEvolved: true,
    group: "Regular"
  },
  decidueye: {
    name: "Decidueye",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 78,
      atk: 107,
      def: 75,
      spa: 100,
      spd: 100,
      spe: 70
    },
    weightKg: 36.6,
    abilities: ["Overgrow", "Long Reach"],
    group: "Regular"
  },
  decidueyehisui: {
    name: "Decidueye-Hisui",
    types: ["Grass", "Fighting"],
    baseStats: {
      hp: 88,
      atk: 112,
      def: 80,
      spa: 95,
      spd: 95,
      spe: 60
    },
    weightKg: 37,
    abilities: ["Overgrow", "Scrappy"],
    group: "Low usage"
  },
  litten: {
    name: "Litten",
    types: ["Fire"],
    baseStats: {
      hp: 45,
      atk: 65,
      def: 40,
      spa: 60,
      spd: 40,
      spe: 70
    },
    weightKg: 4.3,
    abilities: ["Blaze", "Intimidate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  torracat: {
    name: "Torracat",
    types: ["Fire"],
    baseStats: {
      hp: 65,
      atk: 85,
      def: 50,
      spa: 80,
      spd: 50,
      spe: 90
    },
    weightKg: 25,
    abilities: ["Blaze", "Intimidate"],
    notFullyEvolved: true,
    group: "Regular"
  },
  incineroar: {
    name: "Incineroar",
    types: ["Fire", "Dark"],
    baseStats: {
      hp: 95,
      atk: 115,
      def: 90,
      spa: 80,
      spd: 90,
      spe: 60
    },
    weightKg: 83,
    abilities: ["Blaze", "Intimidate"],
    group: "Meta"
  },
  popplio: {
    name: "Popplio",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 54,
      def: 54,
      spa: 66,
      spd: 56,
      spe: 40
    },
    weightKg: 7.5,
    abilities: ["Torrent", "Liquid Voice"],
    notFullyEvolved: true,
    group: "Regular"
  },
  brionne: {
    name: "Brionne",
    types: ["Water"],
    baseStats: {
      hp: 60,
      atk: 69,
      def: 69,
      spa: 91,
      spd: 81,
      spe: 50
    },
    weightKg: 17.5,
    abilities: ["Torrent", "Liquid Voice"],
    notFullyEvolved: true,
    group: "Regular"
  },
  primarina: {
    name: "Primarina",
    types: ["Water", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 74,
      def: 74,
      spa: 126,
      spd: 116,
      spe: 60
    },
    weightKg: 44,
    abilities: ["Torrent", "Liquid Voice"],
    group: "Low usage"
  },
  pikipek: {
    name: "Pikipek",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 35,
      atk: 75,
      def: 30,
      spa: 30,
      spd: 30,
      spe: 65
    },
    weightKg: 1.2,
    abilities: ["Keen Eye", "Skill Link", "Pickup"],
    notFullyEvolved: true,
    group: "Regular"
  },
  trumbeak: {
    name: "Trumbeak",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 55,
      atk: 85,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 75
    },
    weightKg: 14.8,
    abilities: ["Keen Eye", "Skill Link", "Pickup"],
    notFullyEvolved: true,
    group: "Regular"
  },
  toucannon: {
    name: "Toucannon",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 75,
      spa: 75,
      spd: 75,
      spe: 60
    },
    weightKg: 26,
    abilities: ["Keen Eye", "Skill Link", "Sheer Force"],
    group: "Regular"
  },
  yungoos: {
    name: "Yungoos",
    types: ["Normal"],
    baseStats: {
      hp: 48,
      atk: 70,
      def: 30,
      spa: 30,
      spd: 30,
      spe: 45
    },
    weightKg: 6,
    abilities: ["Stakeout", "Strong Jaw", "Adaptability"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gumshoos: {
    name: "Gumshoos",
    types: ["Normal"],
    baseStats: {
      hp: 88,
      atk: 110,
      def: 60,
      spa: 55,
      spd: 60,
      spe: 45
    },
    weightKg: 14.2,
    abilities: ["Stakeout", "Strong Jaw", "Adaptability"],
    group: "Regular"
  },
  grubbin: {
    name: "Grubbin",
    types: ["Bug"],
    baseStats: {
      hp: 47,
      atk: 62,
      def: 45,
      spa: 55,
      spd: 45,
      spe: 46
    },
    weightKg: 4.4,
    abilities: ["Swarm"],
    notFullyEvolved: true,
    group: "Regular"
  },
  charjabug: {
    name: "Charjabug",
    types: ["Bug", "Electric"],
    baseStats: {
      hp: 57,
      atk: 82,
      def: 95,
      spa: 55,
      spd: 75,
      spe: 36
    },
    weightKg: 10.5,
    abilities: ["Battery"],
    notFullyEvolved: true,
    group: "Regular"
  },
  vikavolt: {
    name: "Vikavolt",
    types: ["Bug", "Electric"],
    baseStats: {
      hp: 77,
      atk: 70,
      def: 90,
      spa: 145,
      spd: 75,
      spe: 43
    },
    weightKg: 45,
    abilities: ["Levitate"],
    group: "Regular"
  },
  crabrawler: {
    name: "Crabrawler",
    types: ["Fighting"],
    baseStats: {
      hp: 47,
      atk: 82,
      def: 57,
      spa: 42,
      spd: 47,
      spe: 63
    },
    weightKg: 7,
    abilities: ["Hyper Cutter", "Iron Fist", "Anger Point"],
    notFullyEvolved: true,
    group: "Regular"
  },
  crabominable: {
    name: "Crabominable",
    types: ["Fighting", "Ice"],
    baseStats: {
      hp: 97,
      atk: 132,
      def: 77,
      spa: 62,
      spd: 67,
      spe: 43
    },
    weightKg: 180,
    abilities: ["Hyper Cutter", "Iron Fist", "Anger Point"],
    group: "Regular"
  },
  crabominablemega: {
    name: "Crabominable-Mega",
    types: ["Fighting", "Ice"],
    baseStats: {
      hp: 97,
      atk: 157,
      def: 122,
      spa: 62,
      spd: 107,
      spe: 33
    },
    weightKg: 252.8,
    abilities: ["Iron Fist"],
    group: "Regular"
  },
  oricorio: {
    name: "Oricorio",
    types: ["Fire", "Flying"],
    baseStats: {
      hp: 75,
      atk: 70,
      def: 70,
      spa: 98,
      spd: 70,
      spe: 93
    },
    weightKg: 3.4,
    abilities: ["Dancer"],
    group: "Regular"
  },
  oricoriopau: {
    name: "Oricorio-Pa'u",
    types: ["Psychic", "Flying"],
    baseStats: {
      hp: 75,
      atk: 70,
      def: 70,
      spa: 98,
      spd: 70,
      spe: 93
    },
    weightKg: 3.4,
    abilities: ["Dancer"],
    group: "Regular"
  },
  oricoriopompom: {
    name: "Oricorio-Pom-Pom",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 75,
      atk: 70,
      def: 70,
      spa: 98,
      spd: 70,
      spe: 93
    },
    weightKg: 3.4,
    abilities: ["Dancer"],
    group: "Regular"
  },
  oricoriosensu: {
    name: "Oricorio-Sensu",
    types: ["Ghost", "Flying"],
    baseStats: {
      hp: 75,
      atk: 70,
      def: 70,
      spa: 98,
      spd: 70,
      spe: 93
    },
    weightKg: 3.4,
    abilities: ["Dancer"],
    group: "Regular"
  },
  cutiefly: {
    name: "Cutiefly",
    types: ["Bug", "Fairy"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 40,
      spa: 55,
      spd: 40,
      spe: 84
    },
    weightKg: 0.2,
    abilities: ["Honey Gather", "Shield Dust", "Sweet Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  ribombee: {
    name: "Ribombee",
    types: ["Bug", "Fairy"],
    baseStats: {
      hp: 60,
      atk: 55,
      def: 60,
      spa: 95,
      spd: 70,
      spe: 124
    },
    weightKg: 0.5,
    abilities: ["Honey Gather", "Shield Dust", "Sweet Veil"],
    group: "Regular"
  },
  rockruff: {
    name: "Rockruff",
    types: ["Rock"],
    baseStats: {
      hp: 45,
      atk: 65,
      def: 40,
      spa: 30,
      spd: 40,
      spe: 60
    },
    weightKg: 9.2,
    abilities: ["Keen Eye", "Vital Spirit", "Steadfast"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rockruffdusk: {
    name: "Rockruff-Dusk",
    types: ["Rock"],
    baseStats: {
      hp: 45,
      atk: 65,
      def: 40,
      spa: 30,
      spd: 40,
      spe: 60
    },
    weightKg: 9.2,
    abilities: ["Own Tempo"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lycanroc: {
    name: "Lycanroc",
    types: ["Rock"],
    baseStats: {
      hp: 75,
      atk: 115,
      def: 65,
      spa: 55,
      spd: 65,
      spe: 112
    },
    weightKg: 25,
    abilities: ["Keen Eye", "Sand Rush", "Steadfast"],
    group: "Regular"
  },
  lycanrocdusk: {
    name: "Lycanroc-Dusk",
    types: ["Rock"],
    baseStats: {
      hp: 75,
      atk: 117,
      def: 65,
      spa: 55,
      spd: 65,
      spe: 110
    },
    weightKg: 25,
    abilities: ["Tough Claws"],
    group: "Meta"
  },
  lycanrocmidnight: {
    name: "Lycanroc-Midnight",
    types: ["Rock"],
    baseStats: {
      hp: 85,
      atk: 115,
      def: 75,
      spa: 55,
      spd: 75,
      spe: 82
    },
    weightKg: 25,
    abilities: ["Keen Eye", "Vital Spirit", "No Guard"],
    group: "Regular"
  },
  wishiwashi: {
    name: "Wishiwashi",
    types: ["Water"],
    baseStats: {
      hp: 45,
      atk: 20,
      def: 20,
      spa: 25,
      spd: 25,
      spe: 40
    },
    weightKg: 0.3,
    abilities: ["Schooling"],
    group: "Regular"
  },
  wishiwashischool: {
    name: "Wishiwashi-School",
    types: ["Water"],
    baseStats: {
      hp: 45,
      atk: 140,
      def: 130,
      spa: 140,
      spd: 135,
      spe: 30
    },
    weightKg: 78.6,
    abilities: ["Schooling"],
    group: "Regular"
  },
  mareanie: {
    name: "Mareanie",
    types: ["Poison", "Water"],
    baseStats: {
      hp: 50,
      atk: 53,
      def: 62,
      spa: 43,
      spd: 52,
      spe: 45
    },
    weightKg: 8,
    abilities: ["Merciless", "Limber", "Regenerator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  toxapex: {
    name: "Toxapex",
    types: ["Poison", "Water"],
    baseStats: {
      hp: 50,
      atk: 63,
      def: 152,
      spa: 53,
      spd: 142,
      spe: 35
    },
    weightKg: 14.5,
    abilities: ["Merciless", "Limber", "Regenerator"],
    group: "Meta"
  },
  mudbray: {
    name: "Mudbray",
    types: ["Ground"],
    baseStats: {
      hp: 70,
      atk: 100,
      def: 70,
      spa: 45,
      spd: 55,
      spe: 45
    },
    weightKg: 110,
    abilities: ["Own Tempo", "Stamina", "Inner Focus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  mudsdale: {
    name: "Mudsdale",
    types: ["Ground"],
    baseStats: {
      hp: 100,
      atk: 125,
      def: 100,
      spa: 55,
      spd: 85,
      spe: 35
    },
    weightKg: 920,
    abilities: ["Own Tempo", "Stamina", "Inner Focus"],
    group: "Low usage"
  },
  dewpider: {
    name: "Dewpider",
    types: ["Water", "Bug"],
    baseStats: {
      hp: 38,
      atk: 40,
      def: 52,
      spa: 40,
      spd: 72,
      spe: 27
    },
    weightKg: 4,
    abilities: ["Water Bubble", "Water Absorb"],
    notFullyEvolved: true,
    group: "Regular"
  },
  araquanid: {
    name: "Araquanid",
    types: ["Water", "Bug"],
    baseStats: {
      hp: 68,
      atk: 70,
      def: 92,
      spa: 50,
      spd: 132,
      spe: 42
    },
    weightKg: 82,
    abilities: ["Water Bubble", "Water Absorb"],
    group: "Low usage"
  },
  fomantis: {
    name: "Fomantis",
    types: ["Grass"],
    baseStats: {
      hp: 40,
      atk: 55,
      def: 35,
      spa: 50,
      spd: 35,
      spe: 35
    },
    weightKg: 1.5,
    abilities: ["Leaf Guard", "Contrary"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lurantis: {
    name: "Lurantis",
    types: ["Grass"],
    baseStats: {
      hp: 70,
      atk: 105,
      def: 90,
      spa: 80,
      spd: 90,
      spe: 45
    },
    weightKg: 18.5,
    abilities: ["Leaf Guard", "Contrary"],
    group: "Regular"
  },
  morelull: {
    name: "Morelull",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 40,
      atk: 35,
      def: 55,
      spa: 65,
      spd: 75,
      spe: 15
    },
    weightKg: 1.5,
    abilities: ["Illuminate", "Effect Spore", "Rain Dish"],
    notFullyEvolved: true,
    group: "Regular"
  },
  shiinotic: {
    name: "Shiinotic",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 60,
      atk: 45,
      def: 80,
      spa: 90,
      spd: 100,
      spe: 30
    },
    weightKg: 11.5,
    abilities: ["Illuminate", "Effect Spore", "Rain Dish"],
    group: "Regular"
  },
  salandit: {
    name: "Salandit",
    types: ["Poison", "Fire"],
    baseStats: {
      hp: 48,
      atk: 44,
      def: 40,
      spa: 71,
      spd: 40,
      spe: 77
    },
    weightKg: 4.8,
    abilities: ["Corrosion", "Oblivious"],
    notFullyEvolved: true,
    group: "Regular"
  },
  salazzle: {
    name: "Salazzle",
    types: ["Poison", "Fire"],
    baseStats: {
      hp: 68,
      atk: 64,
      def: 60,
      spa: 111,
      spd: 60,
      spe: 117
    },
    weightKg: 22.2,
    gender: "F",
    abilities: ["Corrosion", "Oblivious"],
    group: "Regular"
  },
  stufful: {
    name: "Stufful",
    types: ["Normal", "Fighting"],
    baseStats: {
      hp: 70,
      atk: 75,
      def: 50,
      spa: 45,
      spd: 50,
      spe: 50
    },
    weightKg: 6.8,
    abilities: ["Fluffy", "Klutz", "Cute Charm"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bewear: {
    name: "Bewear",
    types: ["Normal", "Fighting"],
    baseStats: {
      hp: 120,
      atk: 125,
      def: 80,
      spa: 55,
      spd: 60,
      spe: 60
    },
    weightKg: 135,
    abilities: ["Fluffy", "Klutz", "Unnerve"],
    group: "Regular"
  },
  bounsweet: {
    name: "Bounsweet",
    types: ["Grass"],
    baseStats: {
      hp: 42,
      atk: 30,
      def: 38,
      spa: 30,
      spd: 38,
      spe: 32
    },
    weightKg: 3.2,
    gender: "F",
    abilities: ["Leaf Guard", "Oblivious", "Sweet Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  steenee: {
    name: "Steenee",
    types: ["Grass"],
    baseStats: {
      hp: 52,
      atk: 40,
      def: 48,
      spa: 40,
      spd: 48,
      spe: 62
    },
    weightKg: 8.2,
    gender: "F",
    abilities: ["Leaf Guard", "Oblivious", "Sweet Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tsareena: {
    name: "Tsareena",
    types: ["Grass"],
    baseStats: {
      hp: 72,
      atk: 120,
      def: 98,
      spa: 50,
      spd: 98,
      spe: 72
    },
    weightKg: 21.4,
    gender: "F",
    abilities: ["Leaf Guard", "Queenly Majesty", "Sweet Veil"],
    group: "Low usage"
  },
  comfey: {
    name: "Comfey",
    types: ["Fairy"],
    baseStats: {
      hp: 51,
      atk: 52,
      def: 90,
      spa: 82,
      spd: 110,
      spe: 100
    },
    weightKg: 0.3,
    abilities: ["Flower Veil", "Triage", "Natural Cure"],
    group: "Regular"
  },
  oranguru: {
    name: "Oranguru",
    types: ["Normal", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 60,
      def: 80,
      spa: 90,
      spd: 110,
      spe: 60
    },
    weightKg: 76,
    abilities: ["Inner Focus", "Telepathy", "Symbiosis"],
    group: "Regular"
  },
  passimian: {
    name: "Passimian",
    types: ["Fighting"],
    baseStats: {
      hp: 100,
      atk: 120,
      def: 90,
      spa: 40,
      spd: 60,
      spe: 80
    },
    weightKg: 82.8,
    abilities: ["Receiver", "Defiant"],
    group: "Regular"
  },
  wimpod: {
    name: "Wimpod",
    types: ["Bug", "Water"],
    baseStats: {
      hp: 25,
      atk: 35,
      def: 40,
      spa: 20,
      spd: 30,
      spe: 80
    },
    weightKg: 12,
    abilities: ["Wimp Out"],
    notFullyEvolved: true,
    group: "Regular"
  },
  golisopod: {
    name: "Golisopod",
    types: ["Bug", "Water"],
    baseStats: {
      hp: 75,
      atk: 125,
      def: 140,
      spa: 60,
      spd: 90,
      spe: 40
    },
    weightKg: 108,
    abilities: ["Emergency Exit"],
    group: "Regular"
  },
  golisopodmega: {
    name: "Golisopod-Mega",
    types: ["Bug", "Steel"],
    baseStats: {
      hp: 75,
      atk: 150,
      def: 175,
      spa: 70,
      spd: 120,
      spe: 40
    },
    weightKg: 148,
    abilities: ["Emergency Exit"],
    group: "Regular",
    unreleased: true
  },
  sandygast: {
    name: "Sandygast",
    types: ["Ghost", "Ground"],
    baseStats: {
      hp: 55,
      atk: 55,
      def: 80,
      spa: 70,
      spd: 45,
      spe: 15
    },
    weightKg: 70,
    abilities: ["Water Compaction", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  palossand: {
    name: "Palossand",
    types: ["Ghost", "Ground"],
    baseStats: {
      hp: 85,
      atk: 75,
      def: 110,
      spa: 100,
      spd: 75,
      spe: 35
    },
    weightKg: 250,
    abilities: ["Water Compaction", "Sand Veil"],
    group: "Regular"
  },
  pyukumuku: {
    name: "Pyukumuku",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 60,
      def: 130,
      spa: 30,
      spd: 130,
      spe: 5
    },
    weightKg: 1.2,
    abilities: ["Innards Out", "Unaware"],
    group: "Regular"
  },
  typenull: {
    name: "Type: Null",
    types: ["Normal"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 59
    },
    weightKg: 120.5,
    gender: "N",
    abilities: ["Battle Armor"],
    notFullyEvolved: true,
    group: "Regular"
  },
  silvally: {
    name: "Silvally",
    types: ["Normal"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallybug: {
    name: "Silvally-Bug",
    types: ["Bug"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallydark: {
    name: "Silvally-Dark",
    types: ["Dark"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallydragon: {
    name: "Silvally-Dragon",
    types: ["Dragon"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyelectric: {
    name: "Silvally-Electric",
    types: ["Electric"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyfairy: {
    name: "Silvally-Fairy",
    types: ["Fairy"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyfighting: {
    name: "Silvally-Fighting",
    types: ["Fighting"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyfire: {
    name: "Silvally-Fire",
    types: ["Fire"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyflying: {
    name: "Silvally-Flying",
    types: ["Flying"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyghost: {
    name: "Silvally-Ghost",
    types: ["Ghost"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallygrass: {
    name: "Silvally-Grass",
    types: ["Grass"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyground: {
    name: "Silvally-Ground",
    types: ["Ground"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyice: {
    name: "Silvally-Ice",
    types: ["Ice"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallypoison: {
    name: "Silvally-Poison",
    types: ["Poison"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallypsychic: {
    name: "Silvally-Psychic",
    types: ["Psychic"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallyrock: {
    name: "Silvally-Rock",
    types: ["Rock"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallysteel: {
    name: "Silvally-Steel",
    types: ["Steel"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  silvallywater: {
    name: "Silvally-Water",
    types: ["Water"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 95,
      spa: 95,
      spd: 95,
      spe: 95
    },
    weightKg: 100.5,
    gender: "N",
    abilities: ["RKS System"],
    group: "Regular"
  },
  minior: {
    name: "Minior",
    types: ["Rock", "Flying"],
    baseStats: {
      hp: 60,
      atk: 100,
      def: 60,
      spa: 100,
      spd: 60,
      spe: 120
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Shields Down"],
    group: "Regular"
  },
  miniormeteor: {
    name: "Minior-Meteor",
    types: ["Rock", "Flying"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 100,
      spa: 60,
      spd: 100,
      spe: 60
    },
    weightKg: 40,
    gender: "N",
    abilities: ["Shields Down"],
    group: "Regular"
  },
  komala: {
    name: "Komala",
    types: ["Normal"],
    baseStats: {
      hp: 65,
      atk: 115,
      def: 65,
      spa: 75,
      spd: 95,
      spe: 65
    },
    weightKg: 19.9,
    abilities: ["Comatose"],
    group: "Regular"
  },
  turtonator: {
    name: "Turtonator",
    types: ["Fire", "Dragon"],
    baseStats: {
      hp: 60,
      atk: 78,
      def: 135,
      spa: 91,
      spd: 85,
      spe: 36
    },
    weightKg: 212,
    abilities: ["Shell Armor"],
    group: "Regular"
  },
  togedemaru: {
    name: "Togedemaru",
    types: ["Electric", "Steel"],
    baseStats: {
      hp: 65,
      atk: 98,
      def: 63,
      spa: 40,
      spd: 73,
      spe: 96
    },
    weightKg: 3.3,
    abilities: ["Iron Barbs", "Lightning Rod", "Sturdy"],
    group: "Regular"
  },
  mimikyu: {
    name: "Mimikyu",
    types: ["Ghost", "Fairy"],
    baseStats: {
      hp: 55,
      atk: 90,
      def: 80,
      spa: 50,
      spd: 105,
      spe: 96
    },
    weightKg: 0.7,
    abilities: ["Disguise"],
    group: "Low usage"
  },
  mimikyubusted: {
    name: "Mimikyu-Busted",
    types: ["Ghost", "Fairy"],
    baseStats: {
      hp: 55,
      atk: 90,
      def: 80,
      spa: 50,
      spd: 105,
      spe: 96
    },
    weightKg: 0.7,
    abilities: ["Disguise"],
    group: "Regular"
  },
  bruxish: {
    name: "Bruxish",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 68,
      atk: 105,
      def: 70,
      spa: 70,
      spd: 70,
      spe: 92
    },
    weightKg: 19,
    abilities: ["Dazzling", "Strong Jaw", "Wonder Skin"],
    group: "Regular"
  },
  drampa: {
    name: "Drampa",
    types: ["Normal", "Dragon"],
    baseStats: {
      hp: 78,
      atk: 60,
      def: 85,
      spa: 135,
      spd: 91,
      spe: 36
    },
    weightKg: 185,
    abilities: ["Berserk", "Sap Sipper", "Cloud Nine"],
    group: "Regular"
  },
  drampamega: {
    name: "Drampa-Mega",
    types: ["Normal", "Dragon"],
    baseStats: {
      hp: 78,
      atk: 85,
      def: 110,
      spa: 160,
      spd: 116,
      spe: 36
    },
    weightKg: 240.5,
    abilities: ["Berserk"],
    group: "Regular"
  },
  dhelmise: {
    name: "Dhelmise",
    types: ["Ghost", "Grass"],
    baseStats: {
      hp: 70,
      atk: 131,
      def: 100,
      spa: 86,
      spd: 90,
      spe: 40
    },
    weightKg: 210,
    gender: "N",
    abilities: ["Steelworker"],
    group: "Regular"
  },
  jangmoo: {
    name: "Jangmo-o",
    types: ["Dragon"],
    baseStats: {
      hp: 45,
      atk: 55,
      def: 65,
      spa: 45,
      spd: 45,
      spe: 45
    },
    weightKg: 29.7,
    abilities: ["Bulletproof", "Soundproof", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hakamoo: {
    name: "Hakamo-o",
    types: ["Dragon", "Fighting"],
    baseStats: {
      hp: 55,
      atk: 75,
      def: 90,
      spa: 65,
      spd: 70,
      spe: 65
    },
    weightKg: 47,
    abilities: ["Bulletproof", "Soundproof", "Overcoat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kommoo: {
    name: "Kommo-o",
    types: ["Dragon", "Fighting"],
    baseStats: {
      hp: 75,
      atk: 110,
      def: 125,
      spa: 100,
      spd: 105,
      spe: 85
    },
    weightKg: 78.2,
    abilities: ["Bulletproof", "Soundproof", "Overcoat"],
    group: "Meta"
  },
  tapukoko: {
    name: "Tapu Koko",
    types: ["Electric", "Fairy"],
    baseStats: {
      hp: 70,
      atk: 115,
      def: 85,
      spa: 95,
      spd: 75,
      spe: 130
    },
    weightKg: 20.5,
    gender: "N",
    abilities: ["Electric Surge", "Telepathy"],
    group: "Regular"
  },
  tapulele: {
    name: "Tapu Lele",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 75,
      spa: 130,
      spd: 115,
      spe: 95
    },
    weightKg: 18.6,
    gender: "N",
    abilities: ["Psychic Surge", "Telepathy"],
    group: "Regular"
  },
  tapubulu: {
    name: "Tapu Bulu",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 70,
      atk: 130,
      def: 115,
      spa: 85,
      spd: 95,
      spe: 75
    },
    weightKg: 45.5,
    gender: "N",
    abilities: ["Grassy Surge", "Telepathy"],
    group: "Regular"
  },
  tapufini: {
    name: "Tapu Fini",
    types: ["Water", "Fairy"],
    baseStats: {
      hp: 70,
      atk: 75,
      def: 115,
      spa: 95,
      spd: 130,
      spe: 85
    },
    weightKg: 21.2,
    gender: "N",
    abilities: ["Misty Surge", "Telepathy"],
    group: "Regular"
  },
  cosmog: {
    name: "Cosmog",
    types: ["Psychic"],
    baseStats: {
      hp: 43,
      atk: 29,
      def: 31,
      spa: 29,
      spd: 31,
      spe: 37
    },
    weightKg: 0.1,
    gender: "N",
    abilities: ["Unaware"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cosmoem: {
    name: "Cosmoem",
    types: ["Psychic"],
    baseStats: {
      hp: 43,
      atk: 29,
      def: 131,
      spa: 29,
      spd: 131,
      spe: 37
    },
    weightKg: 999.9,
    gender: "N",
    abilities: ["Sturdy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  solgaleo: {
    name: "Solgaleo",
    types: ["Psychic", "Steel"],
    baseStats: {
      hp: 137,
      atk: 137,
      def: 107,
      spa: 113,
      spd: 89,
      spe: 97
    },
    weightKg: 230,
    gender: "N",
    abilities: ["Full Metal Body"],
    group: "Regular"
  },
  lunala: {
    name: "Lunala",
    types: ["Psychic", "Ghost"],
    baseStats: {
      hp: 137,
      atk: 113,
      def: 89,
      spa: 137,
      spd: 107,
      spe: 97
    },
    weightKg: 120,
    gender: "N",
    abilities: ["Shadow Shield"],
    group: "Regular"
  },
  nihilego: {
    name: "Nihilego",
    types: ["Rock", "Poison"],
    baseStats: {
      hp: 109,
      atk: 53,
      def: 47,
      spa: 127,
      spd: 131,
      spe: 103
    },
    weightKg: 55.5,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  buzzwole: {
    name: "Buzzwole",
    types: ["Bug", "Fighting"],
    baseStats: {
      hp: 107,
      atk: 139,
      def: 139,
      spa: 53,
      spd: 53,
      spe: 79
    },
    weightKg: 333.6,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  pheromosa: {
    name: "Pheromosa",
    types: ["Bug", "Fighting"],
    baseStats: {
      hp: 71,
      atk: 137,
      def: 37,
      spa: 137,
      spd: 37,
      spe: 151
    },
    weightKg: 25,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  xurkitree: {
    name: "Xurkitree",
    types: ["Electric"],
    baseStats: {
      hp: 83,
      atk: 89,
      def: 71,
      spa: 173,
      spd: 71,
      spe: 83
    },
    weightKg: 100,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  celesteela: {
    name: "Celesteela",
    types: ["Steel", "Flying"],
    baseStats: {
      hp: 97,
      atk: 101,
      def: 103,
      spa: 107,
      spd: 101,
      spe: 61
    },
    weightKg: 999.9,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  kartana: {
    name: "Kartana",
    types: ["Grass", "Steel"],
    baseStats: {
      hp: 59,
      atk: 181,
      def: 131,
      spa: 59,
      spd: 31,
      spe: 109
    },
    weightKg: 0.1,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  guzzlord: {
    name: "Guzzlord",
    types: ["Dark", "Dragon"],
    baseStats: {
      hp: 223,
      atk: 101,
      def: 53,
      spa: 97,
      spd: 53,
      spe: 43
    },
    weightKg: 888,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  necrozma: {
    name: "Necrozma",
    types: ["Psychic"],
    baseStats: {
      hp: 97,
      atk: 107,
      def: 101,
      spa: 127,
      spd: 89,
      spe: 79
    },
    weightKg: 230,
    gender: "N",
    abilities: ["Prism Armor"],
    group: "Regular"
  },
  necrozmadawnwings: {
    name: "Necrozma-Dawn-Wings",
    types: ["Psychic", "Ghost"],
    baseStats: {
      hp: 97,
      atk: 113,
      def: 109,
      spa: 157,
      spd: 127,
      spe: 77
    },
    weightKg: 350,
    gender: "N",
    abilities: ["Prism Armor"],
    group: "Regular"
  },
  necrozmaduskmane: {
    name: "Necrozma-Dusk-Mane",
    types: ["Psychic", "Steel"],
    baseStats: {
      hp: 97,
      atk: 157,
      def: 127,
      spa: 113,
      spd: 109,
      spe: 77
    },
    weightKg: 460,
    gender: "N",
    abilities: ["Prism Armor"],
    group: "Regular"
  },
  necrozmaultra: {
    name: "Necrozma-Ultra",
    types: ["Psychic", "Dragon"],
    baseStats: {
      hp: 97,
      atk: 167,
      def: 97,
      spa: 167,
      spd: 97,
      spe: 129
    },
    weightKg: 230,
    gender: "N",
    abilities: ["Neuroforce"],
    group: "Regular"
  },
  magearna: {
    name: "Magearna",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 95,
      def: 115,
      spa: 130,
      spd: 115,
      spe: 65
    },
    weightKg: 80.5,
    gender: "N",
    abilities: ["Soul-Heart"],
    group: "Regular"
  },
  magearnamega: {
    name: "Magearna-Mega",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 125,
      def: 115,
      spa: 170,
      spd: 115,
      spe: 95
    },
    weightKg: 248.1,
    gender: "N",
    abilities: ["Soul-Heart"],
    group: "Regular",
    unreleased: true
  },
  magearnaoriginal: {
    name: "Magearna-Original",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 95,
      def: 115,
      spa: 130,
      spd: 115,
      spe: 65
    },
    weightKg: 80.5,
    gender: "N",
    abilities: ["Soul-Heart"],
    group: "Regular"
  },
  magearnaoriginalmega: {
    name: "Magearna-Original-Mega",
    types: ["Steel", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 125,
      def: 115,
      spa: 170,
      spd: 115,
      spe: 95
    },
    weightKg: 248.1,
    gender: "N",
    abilities: ["Soul-Heart"],
    group: "Regular",
    unreleased: true
  },
  marshadow: {
    name: "Marshadow",
    types: ["Fighting", "Ghost"],
    baseStats: {
      hp: 90,
      atk: 125,
      def: 80,
      spa: 90,
      spd: 90,
      spe: 125
    },
    weightKg: 22.2,
    gender: "N",
    abilities: ["Technician"],
    group: "Regular"
  },
  poipole: {
    name: "Poipole",
    types: ["Poison"],
    baseStats: {
      hp: 67,
      atk: 73,
      def: 67,
      spa: 73,
      spd: 67,
      spe: 73
    },
    weightKg: 1.8,
    gender: "N",
    abilities: ["Beast Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  naganadel: {
    name: "Naganadel",
    types: ["Poison", "Dragon"],
    baseStats: {
      hp: 73,
      atk: 73,
      def: 73,
      spa: 127,
      spd: 73,
      spe: 121
    },
    weightKg: 150,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  stakataka: {
    name: "Stakataka",
    types: ["Rock", "Steel"],
    baseStats: {
      hp: 61,
      atk: 131,
      def: 211,
      spa: 53,
      spd: 101,
      spe: 13
    },
    weightKg: 820,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  blacephalon: {
    name: "Blacephalon",
    types: ["Fire", "Ghost"],
    baseStats: {
      hp: 53,
      atk: 127,
      def: 53,
      spa: 151,
      spd: 79,
      spe: 107
    },
    weightKg: 13,
    gender: "N",
    abilities: ["Beast Boost"],
    group: "Regular"
  },
  zeraora: {
    name: "Zeraora",
    types: ["Electric"],
    baseStats: {
      hp: 88,
      atk: 112,
      def: 75,
      spa: 102,
      spd: 80,
      spe: 143
    },
    weightKg: 44.5,
    gender: "N",
    abilities: ["Volt Absorb"],
    group: "Regular"
  },
  meltan: {
    name: "Meltan",
    types: ["Steel"],
    baseStats: {
      hp: 46,
      atk: 65,
      def: 65,
      spa: 55,
      spd: 35,
      spe: 34
    },
    weightKg: 8,
    gender: "N",
    abilities: ["Magnet Pull"],
    group: "Regular"
  },
  melmetal: {
    name: "Melmetal",
    types: ["Steel"],
    baseStats: {
      hp: 135,
      atk: 143,
      def: 143,
      spa: 80,
      spd: 65,
      spe: 34
    },
    weightKg: 800,
    gender: "N",
    abilities: ["Iron Fist"],
    group: "Regular"
  },
  grookey: {
    name: "Grookey",
    types: ["Grass"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 50,
      spa: 40,
      spd: 40,
      spe: 65
    },
    weightKg: 5,
    abilities: ["Overgrow", "Grassy Surge"],
    notFullyEvolved: true,
    group: "Regular"
  },
  thwackey: {
    name: "Thwackey",
    types: ["Grass"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 70,
      spa: 55,
      spd: 60,
      spe: 80
    },
    weightKg: 14,
    abilities: ["Overgrow", "Grassy Surge"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rillaboom: {
    name: "Rillaboom",
    types: ["Grass"],
    baseStats: {
      hp: 100,
      atk: 125,
      def: 90,
      spa: 60,
      spd: 70,
      spe: 85
    },
    weightKg: 90,
    abilities: ["Overgrow", "Grassy Surge"],
    group: "Regular"
  },
  scorbunny: {
    name: "Scorbunny",
    types: ["Fire"],
    baseStats: {
      hp: 50,
      atk: 71,
      def: 40,
      spa: 40,
      spd: 40,
      spe: 69
    },
    weightKg: 4.5,
    abilities: ["Blaze", "Libero"],
    notFullyEvolved: true,
    group: "Regular"
  },
  raboot: {
    name: "Raboot",
    types: ["Fire"],
    baseStats: {
      hp: 65,
      atk: 86,
      def: 60,
      spa: 55,
      spd: 60,
      spe: 94
    },
    weightKg: 9,
    abilities: ["Blaze", "Libero"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cinderace: {
    name: "Cinderace",
    types: ["Fire"],
    baseStats: {
      hp: 80,
      atk: 116,
      def: 75,
      spa: 65,
      spd: 75,
      spe: 119
    },
    weightKg: 33,
    abilities: ["Blaze", "Libero"],
    group: "Regular"
  },
  sobble: {
    name: "Sobble",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 40,
      def: 40,
      spa: 70,
      spd: 40,
      spe: 70
    },
    weightKg: 4,
    abilities: ["Torrent", "Sniper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  drizzile: {
    name: "Drizzile",
    types: ["Water"],
    baseStats: {
      hp: 65,
      atk: 60,
      def: 55,
      spa: 95,
      spd: 55,
      spe: 90
    },
    weightKg: 11.5,
    abilities: ["Torrent", "Sniper"],
    notFullyEvolved: true,
    group: "Regular"
  },
  inteleon: {
    name: "Inteleon",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 65,
      spa: 125,
      spd: 65,
      spe: 120
    },
    weightKg: 45.2,
    abilities: ["Torrent", "Sniper"],
    group: "Regular"
  },
  skwovet: {
    name: "Skwovet",
    types: ["Normal"],
    baseStats: {
      hp: 70,
      atk: 55,
      def: 55,
      spa: 35,
      spd: 35,
      spe: 25
    },
    weightKg: 2.5,
    abilities: ["Cheek Pouch", "Gluttony"],
    notFullyEvolved: true,
    group: "Regular"
  },
  greedent: {
    name: "Greedent",
    types: ["Normal"],
    baseStats: {
      hp: 120,
      atk: 95,
      def: 95,
      spa: 55,
      spd: 75,
      spe: 20
    },
    weightKg: 6,
    abilities: ["Cheek Pouch", "Gluttony"],
    group: "Regular"
  },
  rookidee: {
    name: "Rookidee",
    types: ["Flying"],
    baseStats: {
      hp: 38,
      atk: 47,
      def: 35,
      spa: 33,
      spd: 35,
      spe: 57
    },
    weightKg: 1.8,
    abilities: ["Keen Eye", "Unnerve", "Big Pecks"],
    notFullyEvolved: true,
    group: "Regular"
  },
  corvisquire: {
    name: "Corvisquire",
    types: ["Flying"],
    baseStats: {
      hp: 68,
      atk: 67,
      def: 55,
      spa: 43,
      spd: 55,
      spe: 77
    },
    weightKg: 16,
    abilities: ["Keen Eye", "Unnerve", "Big Pecks"],
    notFullyEvolved: true,
    group: "Regular"
  },
  corviknight: {
    name: "Corviknight",
    types: ["Flying", "Steel"],
    baseStats: {
      hp: 98,
      atk: 87,
      def: 105,
      spa: 53,
      spd: 85,
      spe: 67
    },
    weightKg: 75,
    abilities: ["Pressure", "Unnerve", "Mirror Armor"],
    group: "Low usage"
  },
  blipbug: {
    name: "Blipbug",
    types: ["Bug"],
    baseStats: {
      hp: 25,
      atk: 20,
      def: 20,
      spa: 25,
      spd: 45,
      spe: 45
    },
    weightKg: 8,
    abilities: ["Swarm", "Compound Eyes", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dottler: {
    name: "Dottler",
    types: ["Bug", "Psychic"],
    baseStats: {
      hp: 50,
      atk: 35,
      def: 80,
      spa: 50,
      spd: 90,
      spe: 30
    },
    weightKg: 19.5,
    abilities: ["Swarm", "Compound Eyes", "Telepathy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  orbeetle: {
    name: "Orbeetle",
    types: ["Bug", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 45,
      def: 110,
      spa: 80,
      spd: 120,
      spe: 90
    },
    weightKg: 40.8,
    abilities: ["Swarm", "Frisk", "Telepathy"],
    group: "Regular"
  },
  nickit: {
    name: "Nickit",
    types: ["Dark"],
    baseStats: {
      hp: 40,
      atk: 28,
      def: 28,
      spa: 47,
      spd: 52,
      spe: 50
    },
    weightKg: 8.9,
    abilities: ["Run Away", "Unburden", "Stakeout"],
    notFullyEvolved: true,
    group: "Regular"
  },
  thievul: {
    name: "Thievul",
    types: ["Dark"],
    baseStats: {
      hp: 70,
      atk: 58,
      def: 58,
      spa: 87,
      spd: 92,
      spe: 90
    },
    weightKg: 19.9,
    abilities: ["Run Away", "Unburden", "Stakeout"],
    group: "Regular"
  },
  gossifleur: {
    name: "Gossifleur",
    types: ["Grass"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 60,
      spa: 40,
      spd: 60,
      spe: 10
    },
    weightKg: 2.2,
    abilities: ["Cotton Down", "Regenerator", "Effect Spore"],
    notFullyEvolved: true,
    group: "Regular"
  },
  eldegoss: {
    name: "Eldegoss",
    types: ["Grass"],
    baseStats: {
      hp: 60,
      atk: 50,
      def: 90,
      spa: 80,
      spd: 120,
      spe: 60
    },
    weightKg: 2.5,
    abilities: ["Cotton Down", "Regenerator", "Effect Spore"],
    group: "Regular"
  },
  wooloo: {
    name: "Wooloo",
    types: ["Normal"],
    baseStats: {
      hp: 42,
      atk: 40,
      def: 55,
      spa: 40,
      spd: 45,
      spe: 48
    },
    weightKg: 6,
    abilities: ["Fluffy", "Run Away", "Bulletproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dubwool: {
    name: "Dubwool",
    types: ["Normal"],
    baseStats: {
      hp: 72,
      atk: 80,
      def: 100,
      spa: 60,
      spd: 90,
      spe: 88
    },
    weightKg: 43,
    abilities: ["Fluffy", "Steadfast", "Bulletproof"],
    group: "Regular"
  },
  chewtle: {
    name: "Chewtle",
    types: ["Water"],
    baseStats: {
      hp: 50,
      atk: 64,
      def: 50,
      spa: 38,
      spd: 38,
      spe: 44
    },
    weightKg: 8.5,
    abilities: ["Strong Jaw", "Shell Armor", "Swift Swim"],
    notFullyEvolved: true,
    group: "Regular"
  },
  drednaw: {
    name: "Drednaw",
    types: ["Water", "Rock"],
    baseStats: {
      hp: 90,
      atk: 115,
      def: 90,
      spa: 48,
      spd: 68,
      spe: 74
    },
    weightKg: 115.5,
    abilities: ["Strong Jaw", "Shell Armor", "Swift Swim"],
    group: "Regular"
  },
  yamper: {
    name: "Yamper",
    types: ["Electric"],
    baseStats: {
      hp: 59,
      atk: 45,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 26
    },
    weightKg: 13.5,
    abilities: ["Ball Fetch", "Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  boltund: {
    name: "Boltund",
    types: ["Electric"],
    baseStats: {
      hp: 69,
      atk: 90,
      def: 60,
      spa: 90,
      spd: 60,
      spe: 121
    },
    weightKg: 34,
    abilities: ["Strong Jaw", "Competitive"],
    group: "Regular"
  },
  rolycoly: {
    name: "Rolycoly",
    types: ["Rock"],
    baseStats: {
      hp: 30,
      atk: 40,
      def: 50,
      spa: 40,
      spd: 50,
      spe: 30
    },
    weightKg: 12,
    abilities: ["Steam Engine", "Heatproof", "Flash Fire"],
    notFullyEvolved: true,
    group: "Regular"
  },
  carkol: {
    name: "Carkol",
    types: ["Rock", "Fire"],
    baseStats: {
      hp: 80,
      atk: 60,
      def: 90,
      spa: 60,
      spd: 70,
      spe: 50
    },
    weightKg: 78,
    abilities: ["Steam Engine", "Flame Body", "Flash Fire"],
    notFullyEvolved: true,
    group: "Regular"
  },
  coalossal: {
    name: "Coalossal",
    types: ["Rock", "Fire"],
    baseStats: {
      hp: 110,
      atk: 80,
      def: 120,
      spa: 80,
      spd: 90,
      spe: 30
    },
    weightKg: 310.5,
    abilities: ["Steam Engine", "Flame Body", "Flash Fire"],
    group: "Regular"
  },
  applin: {
    name: "Applin",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 80,
      spa: 40,
      spd: 40,
      spe: 20
    },
    weightKg: 0.5,
    abilities: ["Ripen", "Gluttony", "Bulletproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  flapple: {
    name: "Flapple",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 70,
      atk: 110,
      def: 80,
      spa: 95,
      spd: 60,
      spe: 70
    },
    weightKg: 1,
    abilities: ["Ripen", "Gluttony", "Hustle"],
    group: "Regular"
  },
  appletun: {
    name: "Appletun",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 110,
      atk: 85,
      def: 80,
      spa: 100,
      spd: 80,
      spe: 30
    },
    weightKg: 13,
    abilities: ["Ripen", "Gluttony", "Thick Fat"],
    group: "Regular"
  },
  silicobra: {
    name: "Silicobra",
    types: ["Ground"],
    baseStats: {
      hp: 52,
      atk: 57,
      def: 75,
      spa: 35,
      spd: 50,
      spe: 46
    },
    weightKg: 7.6,
    abilities: ["Sand Spit", "Shed Skin", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sandaconda: {
    name: "Sandaconda",
    types: ["Ground"],
    baseStats: {
      hp: 72,
      atk: 107,
      def: 125,
      spa: 65,
      spd: 70,
      spe: 71
    },
    weightKg: 65.5,
    abilities: ["Sand Spit", "Shed Skin", "Sand Veil"],
    group: "Regular"
  },
  cramorant: {
    name: "Cramorant",
    types: ["Flying", "Water"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 55,
      spa: 85,
      spd: 95,
      spe: 85
    },
    weightKg: 18,
    abilities: ["Gulp Missile"],
    group: "Regular"
  },
  arrokuda: {
    name: "Arrokuda",
    types: ["Water"],
    baseStats: {
      hp: 41,
      atk: 63,
      def: 40,
      spa: 40,
      spd: 30,
      spe: 66
    },
    weightKg: 1,
    abilities: ["Swift Swim", "Propeller Tail"],
    notFullyEvolved: true,
    group: "Regular"
  },
  barraskewda: {
    name: "Barraskewda",
    types: ["Water"],
    baseStats: {
      hp: 61,
      atk: 123,
      def: 60,
      spa: 60,
      spd: 50,
      spe: 136
    },
    weightKg: 30,
    abilities: ["Swift Swim", "Propeller Tail"],
    group: "Regular"
  },
  toxel: {
    name: "Toxel",
    types: ["Electric", "Poison"],
    baseStats: {
      hp: 40,
      atk: 38,
      def: 35,
      spa: 54,
      spd: 35,
      spe: 40
    },
    weightKg: 11,
    abilities: ["Rattled", "Static", "Klutz"],
    notFullyEvolved: true,
    group: "Regular"
  },
  toxtricity: {
    name: "Toxtricity",
    types: ["Electric", "Poison"],
    baseStats: {
      hp: 75,
      atk: 98,
      def: 70,
      spa: 114,
      spd: 70,
      spe: 75
    },
    weightKg: 40,
    abilities: ["Punk Rock", "Plus", "Technician"],
    group: "Regular"
  },
  toxtricitylowkey: {
    name: "Toxtricity-Low-Key",
    types: ["Electric", "Poison"],
    baseStats: {
      hp: 75,
      atk: 98,
      def: 70,
      spa: 114,
      spd: 70,
      spe: 75
    },
    weightKg: 40,
    abilities: ["Punk Rock", "Minus", "Technician"],
    group: "Regular"
  },
  sizzlipede: {
    name: "Sizzlipede",
    types: ["Fire", "Bug"],
    baseStats: {
      hp: 50,
      atk: 65,
      def: 45,
      spa: 50,
      spd: 50,
      spe: 45
    },
    weightKg: 1,
    abilities: ["Flash Fire", "White Smoke", "Flame Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  centiskorch: {
    name: "Centiskorch",
    types: ["Fire", "Bug"],
    baseStats: {
      hp: 100,
      atk: 115,
      def: 65,
      spa: 90,
      spd: 90,
      spe: 65
    },
    weightKg: 120,
    abilities: ["Flash Fire", "White Smoke", "Flame Body"],
    group: "Regular"
  },
  clobbopus: {
    name: "Clobbopus",
    types: ["Fighting"],
    baseStats: {
      hp: 50,
      atk: 68,
      def: 60,
      spa: 50,
      spd: 50,
      spe: 32
    },
    weightKg: 4,
    abilities: ["Limber", "Technician"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grapploct: {
    name: "Grapploct",
    types: ["Fighting"],
    baseStats: {
      hp: 80,
      atk: 118,
      def: 90,
      spa: 70,
      spd: 80,
      spe: 42
    },
    weightKg: 39,
    abilities: ["Limber", "Technician"],
    group: "Regular"
  },
  sinistea: {
    name: "Sinistea",
    types: ["Ghost"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 45,
      spa: 74,
      spd: 54,
      spe: 50
    },
    weightKg: 0.2,
    gender: "N",
    abilities: ["Weak Armor", "Cursed Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sinisteaantique: {
    name: "Sinistea-Antique",
    types: ["Ghost"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 45,
      spa: 74,
      spd: 54,
      spe: 50
    },
    weightKg: 0.2,
    gender: "N",
    abilities: ["Weak Armor", "Cursed Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  polteageist: {
    name: "Polteageist",
    types: ["Ghost"],
    baseStats: {
      hp: 60,
      atk: 65,
      def: 65,
      spa: 134,
      spd: 114,
      spe: 70
    },
    weightKg: 0.4,
    gender: "N",
    abilities: ["Weak Armor", "Cursed Body"],
    group: "Regular"
  },
  polteageistantique: {
    name: "Polteageist-Antique",
    types: ["Ghost"],
    baseStats: {
      hp: 60,
      atk: 65,
      def: 65,
      spa: 134,
      spd: 114,
      spe: 70
    },
    weightKg: 0.4,
    gender: "N",
    abilities: ["Weak Armor", "Cursed Body"],
    group: "Regular"
  },
  hatenna: {
    name: "Hatenna",
    types: ["Psychic"],
    baseStats: {
      hp: 42,
      atk: 30,
      def: 45,
      spa: 56,
      spd: 53,
      spe: 39
    },
    weightKg: 3.4,
    gender: "F",
    abilities: ["Healer", "Anticipation", "Magic Bounce"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hattrem: {
    name: "Hattrem",
    types: ["Psychic"],
    baseStats: {
      hp: 57,
      atk: 40,
      def: 65,
      spa: 86,
      spd: 73,
      spe: 49
    },
    weightKg: 4.8,
    gender: "F",
    abilities: ["Healer", "Anticipation", "Magic Bounce"],
    notFullyEvolved: true,
    group: "Regular"
  },
  hatterene: {
    name: "Hatterene",
    types: ["Psychic", "Fairy"],
    baseStats: {
      hp: 57,
      atk: 90,
      def: 95,
      spa: 136,
      spd: 103,
      spe: 29
    },
    weightKg: 5.1,
    gender: "F",
    abilities: ["Healer", "Anticipation", "Magic Bounce"],
    group: "Low usage"
  },
  impidimp: {
    name: "Impidimp",
    types: ["Dark", "Fairy"],
    baseStats: {
      hp: 45,
      atk: 45,
      def: 30,
      spa: 55,
      spd: 40,
      spe: 50
    },
    weightKg: 5.5,
    gender: "M",
    abilities: ["Prankster", "Frisk", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  morgrem: {
    name: "Morgrem",
    types: ["Dark", "Fairy"],
    baseStats: {
      hp: 65,
      atk: 60,
      def: 45,
      spa: 75,
      spd: 55,
      spe: 70
    },
    weightKg: 12.5,
    gender: "M",
    abilities: ["Prankster", "Frisk", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grimmsnarl: {
    name: "Grimmsnarl",
    types: ["Dark", "Fairy"],
    baseStats: {
      hp: 95,
      atk: 120,
      def: 65,
      spa: 95,
      spd: 75,
      spe: 60
    },
    weightKg: 61,
    gender: "M",
    abilities: ["Prankster", "Frisk", "Pickpocket"],
    group: "Meta"
  },
  obstagoon: {
    name: "Obstagoon",
    types: ["Dark", "Normal"],
    baseStats: {
      hp: 93,
      atk: 90,
      def: 101,
      spa: 60,
      spd: 81,
      spe: 95
    },
    weightKg: 46,
    abilities: ["Reckless", "Guts", "Defiant"],
    group: "Regular"
  },
  perrserker: {
    name: "Perrserker",
    types: ["Steel"],
    baseStats: {
      hp: 70,
      atk: 110,
      def: 100,
      spa: 50,
      spd: 60,
      spe: 50
    },
    weightKg: 28,
    abilities: ["Battle Armor", "Tough Claws", "Steely Spirit"],
    group: "Regular"
  },
  cursola: {
    name: "Cursola",
    types: ["Ghost"],
    baseStats: {
      hp: 60,
      atk: 95,
      def: 50,
      spa: 145,
      spd: 130,
      spe: 30
    },
    weightKg: 0.4,
    abilities: ["Weak Armor", "Perish Body"],
    group: "Regular"
  },
  sirfetchd: {
    name: "Sirfetch’d",
    types: ["Fighting"],
    baseStats: {
      hp: 62,
      atk: 135,
      def: 95,
      spa: 68,
      spd: 82,
      spe: 65
    },
    weightKg: 117,
    abilities: ["Steadfast", "Scrappy"],
    group: "Regular"
  },
  mrrime: {
    name: "Mr. Rime",
    types: ["Ice", "Psychic"],
    baseStats: {
      hp: 80,
      atk: 85,
      def: 75,
      spa: 110,
      spd: 100,
      spe: 70
    },
    weightKg: 58.2,
    abilities: ["Tangled Feet", "Screen Cleaner", "Ice Body"],
    group: "Regular"
  },
  runerigus: {
    name: "Runerigus",
    types: ["Ground", "Ghost"],
    baseStats: {
      hp: 58,
      atk: 95,
      def: 145,
      spa: 50,
      spd: 105,
      spe: 30
    },
    weightKg: 66.6,
    abilities: ["Wandering Spirit"],
    group: "Regular"
  },
  milcery: {
    name: "Milcery",
    types: ["Fairy"],
    baseStats: {
      hp: 45,
      atk: 40,
      def: 40,
      spa: 50,
      spd: 61,
      spe: 34
    },
    weightKg: 0.3,
    gender: "F",
    abilities: ["Sweet Veil", "Aroma Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  alcremie: {
    name: "Alcremie",
    types: ["Fairy"],
    baseStats: {
      hp: 65,
      atk: 60,
      def: 75,
      spa: 110,
      spd: 121,
      spe: 64
    },
    weightKg: 0.5,
    gender: "F",
    abilities: ["Sweet Veil", "Aroma Veil"],
    group: "Regular"
  },
  falinks: {
    name: "Falinks",
    types: ["Fighting"],
    baseStats: {
      hp: 65,
      atk: 100,
      def: 100,
      spa: 70,
      spd: 60,
      spe: 75
    },
    weightKg: 62,
    gender: "N",
    abilities: ["Battle Armor", "Defiant"],
    group: "Regular"
  },
  falinksmega: {
    name: "Falinks-Mega",
    types: ["Fighting"],
    baseStats: {
      hp: 65,
      atk: 135,
      def: 135,
      spa: 70,
      spd: 65,
      spe: 100
    },
    weightKg: 99,
    gender: "N",
    abilities: ["Defiant"],
    group: "Regular"
  },
  pincurchin: {
    name: "Pincurchin",
    types: ["Electric"],
    baseStats: {
      hp: 48,
      atk: 101,
      def: 95,
      spa: 91,
      spd: 85,
      spe: 15
    },
    weightKg: 1,
    abilities: ["Lightning Rod", "Electric Surge"],
    group: "Regular"
  },
  snom: {
    name: "Snom",
    types: ["Ice", "Bug"],
    baseStats: {
      hp: 30,
      atk: 25,
      def: 35,
      spa: 45,
      spd: 30,
      spe: 20
    },
    weightKg: 3.8,
    abilities: ["Shield Dust", "Ice Scales"],
    notFullyEvolved: true,
    group: "Regular"
  },
  frosmoth: {
    name: "Frosmoth",
    types: ["Ice", "Bug"],
    baseStats: {
      hp: 70,
      atk: 65,
      def: 60,
      spa: 125,
      spd: 90,
      spe: 65
    },
    weightKg: 42,
    abilities: ["Shield Dust", "Ice Scales"],
    group: "Regular"
  },
  stonjourner: {
    name: "Stonjourner",
    types: ["Rock"],
    baseStats: {
      hp: 100,
      atk: 125,
      def: 135,
      spa: 20,
      spd: 20,
      spe: 70
    },
    weightKg: 520,
    abilities: ["Power Spot"],
    group: "Regular"
  },
  eiscue: {
    name: "Eiscue",
    types: ["Ice"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 110,
      spa: 65,
      spd: 90,
      spe: 50
    },
    weightKg: 89,
    abilities: ["Ice Face"],
    group: "Regular"
  },
  eiscuenoice: {
    name: "Eiscue-Noice",
    types: ["Ice"],
    baseStats: {
      hp: 75,
      atk: 80,
      def: 70,
      spa: 65,
      spd: 50,
      spe: 130
    },
    weightKg: 89,
    abilities: ["Ice Face"],
    group: "Regular"
  },
  indeedee: {
    name: "Indeedee",
    types: ["Psychic", "Normal"],
    baseStats: {
      hp: 60,
      atk: 65,
      def: 55,
      spa: 105,
      spd: 95,
      spe: 95
    },
    weightKg: 28,
    gender: "M",
    abilities: ["Inner Focus", "Synchronize", "Psychic Surge"],
    group: "Regular"
  },
  indeedeef: {
    name: "Indeedee-F",
    types: ["Psychic", "Normal"],
    baseStats: {
      hp: 70,
      atk: 55,
      def: 65,
      spa: 95,
      spd: 105,
      spe: 85
    },
    weightKg: 28,
    gender: "F",
    abilities: ["Own Tempo", "Synchronize", "Psychic Surge"],
    group: "Regular"
  },
  morpeko: {
    name: "Morpeko",
    types: ["Electric", "Dark"],
    baseStats: {
      hp: 58,
      atk: 95,
      def: 58,
      spa: 70,
      spd: 58,
      spe: 97
    },
    weightKg: 3,
    abilities: ["Hunger Switch"],
    group: "Regular"
  },
  morpekohangry: {
    name: "Morpeko-Hangry",
    types: ["Electric", "Dark"],
    baseStats: {
      hp: 58,
      atk: 95,
      def: 58,
      spa: 70,
      spd: 58,
      spe: 97
    },
    weightKg: 3,
    abilities: ["Hunger Switch"],
    group: "Regular"
  },
  cufant: {
    name: "Cufant",
    types: ["Steel"],
    baseStats: {
      hp: 72,
      atk: 80,
      def: 49,
      spa: 40,
      spd: 49,
      spe: 40
    },
    weightKg: 100,
    abilities: ["Sheer Force", "Heavy Metal"],
    notFullyEvolved: true,
    group: "Regular"
  },
  copperajah: {
    name: "Copperajah",
    types: ["Steel"],
    baseStats: {
      hp: 122,
      atk: 130,
      def: 69,
      spa: 80,
      spd: 69,
      spe: 30
    },
    weightKg: 650,
    abilities: ["Sheer Force", "Heavy Metal"],
    group: "Regular"
  },
  dracozolt: {
    name: "Dracozolt",
    types: ["Electric", "Dragon"],
    baseStats: {
      hp: 90,
      atk: 100,
      def: 90,
      spa: 80,
      spd: 70,
      spe: 75
    },
    weightKg: 190,
    gender: "N",
    abilities: ["Volt Absorb", "Hustle", "Sand Rush"],
    group: "Regular"
  },
  arctozolt: {
    name: "Arctozolt",
    types: ["Electric", "Ice"],
    baseStats: {
      hp: 90,
      atk: 100,
      def: 90,
      spa: 90,
      spd: 80,
      spe: 55
    },
    weightKg: 150,
    gender: "N",
    abilities: ["Volt Absorb", "Static", "Slush Rush"],
    group: "Regular"
  },
  dracovish: {
    name: "Dracovish",
    types: ["Water", "Dragon"],
    baseStats: {
      hp: 90,
      atk: 90,
      def: 100,
      spa: 70,
      spd: 80,
      spe: 75
    },
    weightKg: 215,
    gender: "N",
    abilities: ["Water Absorb", "Strong Jaw", "Sand Rush"],
    group: "Regular"
  },
  arctovish: {
    name: "Arctovish",
    types: ["Water", "Ice"],
    baseStats: {
      hp: 90,
      atk: 90,
      def: 100,
      spa: 80,
      spd: 90,
      spe: 55
    },
    weightKg: 175,
    gender: "N",
    abilities: ["Water Absorb", "Ice Body", "Slush Rush"],
    group: "Regular"
  },
  duraludon: {
    name: "Duraludon",
    types: ["Steel", "Dragon"],
    baseStats: {
      hp: 70,
      atk: 95,
      def: 115,
      spa: 120,
      spd: 50,
      spe: 85
    },
    weightKg: 40,
    abilities: ["Light Metal", "Heavy Metal", "Stalwart"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dreepy: {
    name: "Dreepy",
    types: ["Dragon", "Ghost"],
    baseStats: {
      hp: 28,
      atk: 60,
      def: 30,
      spa: 40,
      spd: 30,
      spe: 82
    },
    weightKg: 2,
    abilities: ["Clear Body", "Infiltrator", "Cursed Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  drakloak: {
    name: "Drakloak",
    types: ["Dragon", "Ghost"],
    baseStats: {
      hp: 68,
      atk: 80,
      def: 50,
      spa: 60,
      spd: 50,
      spe: 102
    },
    weightKg: 11,
    abilities: ["Clear Body", "Infiltrator", "Cursed Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dragapult: {
    name: "Dragapult",
    types: ["Dragon", "Ghost"],
    baseStats: {
      hp: 88,
      atk: 120,
      def: 75,
      spa: 100,
      spd: 75,
      spe: 142
    },
    weightKg: 50,
    abilities: ["Clear Body", "Infiltrator", "Cursed Body"],
    group: "Low usage"
  },
  zacian: {
    name: "Zacian",
    types: ["Fairy"],
    baseStats: {
      hp: 92,
      atk: 120,
      def: 115,
      spa: 80,
      spd: 115,
      spe: 138
    },
    weightKg: 110,
    gender: "N",
    abilities: ["Intrepid Sword"],
    group: "Regular"
  },
  zaciancrowned: {
    name: "Zacian-Crowned",
    types: ["Fairy", "Steel"],
    baseStats: {
      hp: 92,
      atk: 150,
      def: 115,
      spa: 80,
      spd: 115,
      spe: 148
    },
    weightKg: 355,
    gender: "N",
    abilities: ["Intrepid Sword"],
    group: "Regular"
  },
  zamazenta: {
    name: "Zamazenta",
    types: ["Fighting"],
    baseStats: {
      hp: 92,
      atk: 120,
      def: 115,
      spa: 80,
      spd: 115,
      spe: 138
    },
    weightKg: 210,
    gender: "N",
    abilities: ["Dauntless Shield"],
    group: "Regular"
  },
  zamazentacrowned: {
    name: "Zamazenta-Crowned",
    types: ["Fighting", "Steel"],
    baseStats: {
      hp: 92,
      atk: 120,
      def: 140,
      spa: 80,
      spd: 140,
      spe: 128
    },
    weightKg: 785,
    gender: "N",
    abilities: ["Dauntless Shield"],
    group: "Regular"
  },
  eternatus: {
    name: "Eternatus",
    types: ["Poison", "Dragon"],
    baseStats: {
      hp: 140,
      atk: 85,
      def: 95,
      spa: 145,
      spd: 95,
      spe: 130
    },
    weightKg: 950,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  eternatuseternamax: {
    name: "Eternatus-Eternamax",
    types: ["Poison", "Dragon"],
    baseStats: {
      hp: 255,
      atk: 115,
      def: 250,
      spa: 125,
      spd: 250,
      spe: 130
    },
    weightKg: 0,
    gender: "N",
    abilities: ["Pressure"],
    group: "Regular"
  },
  kubfu: {
    name: "Kubfu",
    types: ["Fighting"],
    baseStats: {
      hp: 60,
      atk: 90,
      def: 60,
      spa: 53,
      spd: 50,
      spe: 72
    },
    weightKg: 12,
    abilities: ["Inner Focus"],
    notFullyEvolved: true,
    group: "Regular"
  },
  urshifu: {
    name: "Urshifu",
    types: ["Fighting", "Dark"],
    baseStats: {
      hp: 100,
      atk: 130,
      def: 100,
      spa: 63,
      spd: 60,
      spe: 97
    },
    weightKg: 105,
    abilities: ["Unseen Fist"],
    group: "Regular"
  },
  urshifurapidstrike: {
    name: "Urshifu-Rapid-Strike",
    types: ["Fighting", "Water"],
    baseStats: {
      hp: 100,
      atk: 130,
      def: 100,
      spa: 63,
      spd: 60,
      spe: 97
    },
    weightKg: 105,
    abilities: ["Unseen Fist"],
    group: "Regular"
  },
  zarude: {
    name: "Zarude",
    types: ["Dark", "Grass"],
    baseStats: {
      hp: 105,
      atk: 120,
      def: 105,
      spa: 70,
      spd: 95,
      spe: 105
    },
    weightKg: 70,
    gender: "N",
    abilities: ["Leaf Guard"],
    group: "Regular"
  },
  zarudedada: {
    name: "Zarude-Dada",
    types: ["Dark", "Grass"],
    baseStats: {
      hp: 105,
      atk: 120,
      def: 105,
      spa: 70,
      spd: 95,
      spe: 105
    },
    weightKg: 70,
    gender: "N",
    abilities: ["Leaf Guard"],
    group: "Regular"
  },
  regieleki: {
    name: "Regieleki",
    types: ["Electric"],
    baseStats: {
      hp: 80,
      atk: 100,
      def: 50,
      spa: 100,
      spd: 50,
      spe: 200
    },
    weightKg: 145,
    gender: "N",
    abilities: ["Transistor"],
    group: "Regular"
  },
  regidrago: {
    name: "Regidrago",
    types: ["Dragon"],
    baseStats: {
      hp: 200,
      atk: 100,
      def: 50,
      spa: 100,
      spd: 50,
      spe: 80
    },
    weightKg: 200,
    gender: "N",
    abilities: ["Dragon's Maw"],
    group: "Regular"
  },
  glastrier: {
    name: "Glastrier",
    types: ["Ice"],
    baseStats: {
      hp: 100,
      atk: 145,
      def: 130,
      spa: 65,
      spd: 110,
      spe: 30
    },
    weightKg: 800,
    gender: "N",
    abilities: ["Chilling Neigh"],
    group: "Regular"
  },
  spectrier: {
    name: "Spectrier",
    types: ["Ghost"],
    baseStats: {
      hp: 100,
      atk: 65,
      def: 60,
      spa: 145,
      spd: 80,
      spe: 130
    },
    weightKg: 44.5,
    gender: "N",
    abilities: ["Grim Neigh"],
    group: "Regular"
  },
  calyrex: {
    name: "Calyrex",
    types: ["Psychic", "Grass"],
    baseStats: {
      hp: 100,
      atk: 80,
      def: 80,
      spa: 80,
      spd: 80,
      spe: 80
    },
    weightKg: 7.7,
    gender: "N",
    abilities: ["Unnerve"],
    group: "Regular"
  },
  calyrexice: {
    name: "Calyrex-Ice",
    types: ["Psychic", "Ice"],
    baseStats: {
      hp: 100,
      atk: 165,
      def: 150,
      spa: 85,
      spd: 130,
      spe: 50
    },
    weightKg: 809.1,
    gender: "N",
    abilities: ["As One (Glastrier)"],
    group: "Regular"
  },
  calyrexshadow: {
    name: "Calyrex-Shadow",
    types: ["Psychic", "Ghost"],
    baseStats: {
      hp: 100,
      atk: 85,
      def: 80,
      spa: 165,
      spd: 100,
      spe: 150
    },
    weightKg: 53.6,
    gender: "N",
    abilities: ["As One (Spectrier)"],
    group: "Regular"
  },
  wyrdeer: {
    name: "Wyrdeer",
    types: ["Normal", "Psychic"],
    baseStats: {
      hp: 103,
      atk: 105,
      def: 72,
      spa: 105,
      spd: 75,
      spe: 65
    },
    weightKg: 95.1,
    abilities: ["Intimidate", "Frisk", "Sap Sipper"],
    group: "Low usage"
  },
  kleavor: {
    name: "Kleavor",
    types: ["Bug", "Rock"],
    baseStats: {
      hp: 70,
      atk: 135,
      def: 95,
      spa: 45,
      spd: 70,
      spe: 85
    },
    weightKg: 89,
    abilities: ["Swarm", "Sheer Force", "Sharpness"],
    group: "Low usage"
  },
  ursaluna: {
    name: "Ursaluna",
    types: ["Ground", "Normal"],
    baseStats: {
      hp: 130,
      atk: 140,
      def: 105,
      spa: 45,
      spd: 80,
      spe: 50
    },
    weightKg: 290,
    abilities: ["Guts", "Bulletproof", "Unnerve"],
    group: "Regular"
  },
  ursalunabloodmoon: {
    name: "Ursaluna-Bloodmoon",
    types: ["Ground", "Normal"],
    baseStats: {
      hp: 113,
      atk: 70,
      def: 120,
      spa: 135,
      spd: 65,
      spe: 52
    },
    weightKg: 333,
    gender: "M",
    abilities: ["Mind's Eye"],
    group: "Regular"
  },
  basculegion: {
    name: "Basculegion",
    types: ["Water", "Ghost"],
    baseStats: {
      hp: 120,
      atk: 112,
      def: 65,
      spa: 80,
      spd: 75,
      spe: 78
    },
    weightKg: 110,
    gender: "M",
    abilities: ["Swift Swim", "Adaptability", "Mold Breaker"],
    group: "Meta"
  },
  basculegionf: {
    name: "Basculegion-F",
    types: ["Water", "Ghost"],
    baseStats: {
      hp: 120,
      atk: 92,
      def: 65,
      spa: 100,
      spd: 75,
      spe: 78
    },
    weightKg: 110,
    gender: "F",
    abilities: ["Swift Swim", "Adaptability", "Mold Breaker"],
    group: "Regular"
  },
  sneasler: {
    name: "Sneasler",
    types: ["Fighting", "Poison"],
    baseStats: {
      hp: 80,
      atk: 130,
      def: 60,
      spa: 40,
      spd: 80,
      spe: 120
    },
    weightKg: 43,
    abilities: ["Pressure", "Unburden", "Poison Touch"],
    group: "Meta"
  },
  overqwil: {
    name: "Overqwil",
    types: ["Dark", "Poison"],
    baseStats: {
      hp: 85,
      atk: 115,
      def: 95,
      spa: 65,
      spd: 65,
      spe: 85
    },
    weightKg: 60.5,
    abilities: ["Poison Point", "Swift Swim", "Intimidate"],
    group: "Low usage"
  },
  enamorus: {
    name: "Enamorus",
    types: ["Fairy", "Flying"],
    baseStats: {
      hp: 74,
      atk: 115,
      def: 70,
      spa: 135,
      spd: 80,
      spe: 106
    },
    weightKg: 48,
    gender: "F",
    abilities: ["Cute Charm", "Contrary"],
    group: "Regular"
  },
  enamorustherian: {
    name: "Enamorus-Therian",
    types: ["Fairy", "Flying"],
    baseStats: {
      hp: 74,
      atk: 115,
      def: 110,
      spa: 135,
      spd: 100,
      spe: 46
    },
    weightKg: 48,
    gender: "F",
    abilities: ["Overcoat"],
    group: "Regular"
  },
  sprigatito: {
    name: "Sprigatito",
    types: ["Grass"],
    baseStats: {
      hp: 40,
      atk: 61,
      def: 54,
      spa: 45,
      spd: 45,
      spe: 65
    },
    weightKg: 4.1,
    abilities: ["Overgrow", "Protean"],
    notFullyEvolved: true,
    group: "Regular"
  },
  floragato: {
    name: "Floragato",
    types: ["Grass"],
    baseStats: {
      hp: 61,
      atk: 80,
      def: 63,
      spa: 60,
      spd: 63,
      spe: 83
    },
    weightKg: 12.2,
    abilities: ["Overgrow", "Protean"],
    notFullyEvolved: true,
    group: "Regular"
  },
  meowscarada: {
    name: "Meowscarada",
    types: ["Grass", "Dark"],
    baseStats: {
      hp: 76,
      atk: 110,
      def: 70,
      spa: 81,
      spd: 70,
      spe: 123
    },
    weightKg: 31.2,
    abilities: ["Overgrow", "Protean"],
    group: "Low usage"
  },
  fuecoco: {
    name: "Fuecoco",
    types: ["Fire"],
    baseStats: {
      hp: 67,
      atk: 45,
      def: 59,
      spa: 63,
      spd: 40,
      spe: 36
    },
    weightKg: 9.8,
    abilities: ["Blaze", "Unaware"],
    notFullyEvolved: true,
    group: "Regular"
  },
  crocalor: {
    name: "Crocalor",
    types: ["Fire"],
    baseStats: {
      hp: 81,
      atk: 55,
      def: 78,
      spa: 90,
      spd: 58,
      spe: 49
    },
    weightKg: 30.7,
    abilities: ["Blaze", "Unaware"],
    notFullyEvolved: true,
    group: "Regular"
  },
  skeledirge: {
    name: "Skeledirge",
    types: ["Fire", "Ghost"],
    baseStats: {
      hp: 104,
      atk: 75,
      def: 100,
      spa: 110,
      spd: 75,
      spe: 66
    },
    weightKg: 326.5,
    abilities: ["Blaze", "Unaware"],
    group: "Regular"
  },
  quaxly: {
    name: "Quaxly",
    types: ["Water"],
    baseStats: {
      hp: 55,
      atk: 65,
      def: 45,
      spa: 50,
      spd: 45,
      spe: 50
    },
    weightKg: 6.1,
    abilities: ["Torrent", "Moxie"],
    notFullyEvolved: true,
    group: "Regular"
  },
  quaxwell: {
    name: "Quaxwell",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 65,
      spa: 65,
      spd: 60,
      spe: 65
    },
    weightKg: 21.5,
    abilities: ["Torrent", "Moxie"],
    notFullyEvolved: true,
    group: "Regular"
  },
  quaquaval: {
    name: "Quaquaval",
    types: ["Water", "Fighting"],
    baseStats: {
      hp: 85,
      atk: 120,
      def: 80,
      spa: 85,
      spd: 75,
      spe: 85
    },
    weightKg: 61.9,
    abilities: ["Torrent", "Moxie"],
    group: "Regular"
  },
  lechonk: {
    name: "Lechonk",
    types: ["Normal"],
    baseStats: {
      hp: 54,
      atk: 45,
      def: 40,
      spa: 35,
      spd: 45,
      spe: 35
    },
    weightKg: 10.2,
    abilities: ["Aroma Veil", "Gluttony", "Thick Fat"],
    notFullyEvolved: true,
    group: "Regular"
  },
  oinkologne: {
    name: "Oinkologne",
    types: ["Normal"],
    baseStats: {
      hp: 110,
      atk: 100,
      def: 75,
      spa: 59,
      spd: 80,
      spe: 65
    },
    weightKg: 120,
    gender: "M",
    abilities: ["Lingering Aroma", "Gluttony", "Thick Fat"],
    group: "Regular"
  },
  oinkolognef: {
    name: "Oinkologne-F",
    types: ["Normal"],
    baseStats: {
      hp: 115,
      atk: 90,
      def: 70,
      spa: 59,
      spd: 90,
      spe: 65
    },
    weightKg: 120,
    gender: "F",
    abilities: ["Aroma Veil", "Gluttony", "Thick Fat"],
    group: "Regular"
  },
  tarountula: {
    name: "Tarountula",
    types: ["Bug"],
    baseStats: {
      hp: 35,
      atk: 41,
      def: 45,
      spa: 29,
      spd: 40,
      spe: 20
    },
    weightKg: 4,
    abilities: ["Insomnia", "Stakeout"],
    notFullyEvolved: true,
    group: "Regular"
  },
  spidops: {
    name: "Spidops",
    types: ["Bug"],
    baseStats: {
      hp: 60,
      atk: 79,
      def: 92,
      spa: 52,
      spd: 86,
      spe: 35
    },
    weightKg: 16.5,
    abilities: ["Insomnia", "Stakeout"],
    group: "Regular"
  },
  nymble: {
    name: "Nymble",
    types: ["Bug"],
    baseStats: {
      hp: 33,
      atk: 46,
      def: 40,
      spa: 21,
      spd: 25,
      spe: 45
    },
    weightKg: 1,
    abilities: ["Swarm", "Tinted Lens"],
    notFullyEvolved: true,
    group: "Regular"
  },
  lokix: {
    name: "Lokix",
    types: ["Bug", "Dark"],
    baseStats: {
      hp: 71,
      atk: 102,
      def: 78,
      spa: 52,
      spd: 55,
      spe: 92
    },
    weightKg: 17.5,
    abilities: ["Swarm", "Tinted Lens"],
    group: "Regular"
  },
  pawmi: {
    name: "Pawmi",
    types: ["Electric"],
    baseStats: {
      hp: 45,
      atk: 50,
      def: 20,
      spa: 40,
      spd: 25,
      spe: 60
    },
    weightKg: 2.5,
    abilities: ["Static", "Natural Cure", "Iron Fist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pawmo: {
    name: "Pawmo",
    types: ["Electric", "Fighting"],
    baseStats: {
      hp: 60,
      atk: 75,
      def: 40,
      spa: 50,
      spd: 40,
      spe: 85
    },
    weightKg: 6.5,
    abilities: ["Volt Absorb", "Natural Cure", "Iron Fist"],
    notFullyEvolved: true,
    group: "Regular"
  },
  pawmot: {
    name: "Pawmot",
    types: ["Electric", "Fighting"],
    baseStats: {
      hp: 70,
      atk: 115,
      def: 70,
      spa: 70,
      spd: 60,
      spe: 105
    },
    weightKg: 41,
    abilities: ["Volt Absorb", "Natural Cure", "Iron Fist"],
    group: "Regular"
  },
  tandemaus: {
    name: "Tandemaus",
    types: ["Normal"],
    baseStats: {
      hp: 50,
      atk: 50,
      def: 45,
      spa: 40,
      spd: 45,
      spe: 75
    },
    weightKg: 1.8,
    gender: "N",
    abilities: ["Run Away", "Pickup", "Own Tempo"],
    notFullyEvolved: true,
    group: "Regular"
  },
  maushold: {
    name: "Maushold",
    types: ["Normal"],
    baseStats: {
      hp: 74,
      atk: 75,
      def: 70,
      spa: 65,
      spd: 75,
      spe: 111
    },
    weightKg: 2.3,
    gender: "N",
    abilities: ["Friend Guard", "Cheek Pouch", "Technician"],
    group: "Meta"
  },
  mausholdfour: {
    name: "Maushold-Four",
    types: ["Normal"],
    baseStats: {
      hp: 74,
      atk: 75,
      def: 70,
      spa: 65,
      spd: 75,
      spe: 111
    },
    weightKg: 2.8,
    gender: "N",
    abilities: ["Friend Guard", "Cheek Pouch", "Technician"],
    group: "Regular"
  },
  fidough: {
    name: "Fidough",
    types: ["Fairy"],
    baseStats: {
      hp: 37,
      atk: 55,
      def: 70,
      spa: 30,
      spd: 55,
      spe: 65
    },
    weightKg: 10.9,
    abilities: ["Own Tempo", "Klutz"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dachsbun: {
    name: "Dachsbun",
    types: ["Fairy"],
    baseStats: {
      hp: 57,
      atk: 80,
      def: 115,
      spa: 50,
      spd: 80,
      spe: 95
    },
    weightKg: 14.9,
    abilities: ["Well-Baked Body", "Aroma Veil"],
    group: "Regular"
  },
  smoliv: {
    name: "Smoliv",
    types: ["Grass", "Normal"],
    baseStats: {
      hp: 41,
      atk: 35,
      def: 45,
      spa: 58,
      spd: 51,
      spe: 30
    },
    weightKg: 6.5,
    abilities: ["Early Bird", "Harvest"],
    notFullyEvolved: true,
    group: "Regular"
  },
  dolliv: {
    name: "Dolliv",
    types: ["Grass", "Normal"],
    baseStats: {
      hp: 52,
      atk: 53,
      def: 60,
      spa: 78,
      spd: 78,
      spe: 33
    },
    weightKg: 11.9,
    abilities: ["Early Bird", "Harvest"],
    notFullyEvolved: true,
    group: "Regular"
  },
  arboliva: {
    name: "Arboliva",
    types: ["Grass", "Normal"],
    baseStats: {
      hp: 78,
      atk: 69,
      def: 90,
      spa: 125,
      spd: 109,
      spe: 39
    },
    weightKg: 48.2,
    abilities: ["Seed Sower", "Harvest"],
    group: "Regular"
  },
  squawkabilly: {
    name: "Squawkabilly",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 82,
      atk: 96,
      def: 51,
      spa: 45,
      spd: 51,
      spe: 92
    },
    weightKg: 2.4,
    abilities: ["Intimidate", "Hustle", "Guts"],
    group: "Regular"
  },
  squawkabillyblue: {
    name: "Squawkabilly-Blue",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 82,
      atk: 96,
      def: 51,
      spa: 45,
      spd: 51,
      spe: 92
    },
    weightKg: 2.4,
    abilities: ["Intimidate", "Hustle", "Guts"],
    group: "Regular"
  },
  squawkabillywhite: {
    name: "Squawkabilly-White",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 82,
      atk: 96,
      def: 51,
      spa: 45,
      spd: 51,
      spe: 92
    },
    weightKg: 2.4,
    abilities: ["Intimidate", "Hustle", "Sheer Force"],
    group: "Regular"
  },
  squawkabillyyellow: {
    name: "Squawkabilly-Yellow",
    types: ["Normal", "Flying"],
    baseStats: {
      hp: 82,
      atk: 96,
      def: 51,
      spa: 45,
      spd: 51,
      spe: 92
    },
    weightKg: 2.4,
    abilities: ["Intimidate", "Hustle", "Sheer Force"],
    group: "Regular"
  },
  nacli: {
    name: "Nacli",
    types: ["Rock"],
    baseStats: {
      hp: 55,
      atk: 55,
      def: 75,
      spa: 35,
      spd: 35,
      spe: 25
    },
    weightKg: 16,
    abilities: ["Purifying Salt", "Sturdy", "Clear Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  naclstack: {
    name: "Naclstack",
    types: ["Rock"],
    baseStats: {
      hp: 60,
      atk: 60,
      def: 100,
      spa: 35,
      spd: 65,
      spe: 35
    },
    weightKg: 105,
    abilities: ["Purifying Salt", "Sturdy", "Clear Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  garganacl: {
    name: "Garganacl",
    types: ["Rock"],
    baseStats: {
      hp: 100,
      atk: 100,
      def: 130,
      spa: 45,
      spd: 90,
      spe: 35
    },
    weightKg: 240,
    abilities: ["Purifying Salt", "Sturdy", "Clear Body"],
    group: "Regular"
  },
  charcadet: {
    name: "Charcadet",
    types: ["Fire"],
    baseStats: {
      hp: 40,
      atk: 50,
      def: 40,
      spa: 50,
      spd: 40,
      spe: 35
    },
    weightKg: 10.5,
    abilities: ["Flash Fire", "Flame Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  armarouge: {
    name: "Armarouge",
    types: ["Fire", "Psychic"],
    baseStats: {
      hp: 85,
      atk: 60,
      def: 100,
      spa: 125,
      spd: 80,
      spe: 75
    },
    weightKg: 85,
    abilities: ["Flash Fire", "Weak Armor"],
    group: "Low usage"
  },
  ceruledge: {
    name: "Ceruledge",
    types: ["Fire", "Ghost"],
    baseStats: {
      hp: 75,
      atk: 125,
      def: 80,
      spa: 60,
      spd: 100,
      spe: 85
    },
    weightKg: 62,
    abilities: ["Flash Fire", "Weak Armor"],
    group: "Low usage"
  },
  tadbulb: {
    name: "Tadbulb",
    types: ["Electric"],
    baseStats: {
      hp: 61,
      atk: 31,
      def: 41,
      spa: 59,
      spd: 35,
      spe: 45
    },
    weightKg: 0.4,
    abilities: ["Own Tempo", "Static", "Damp"],
    notFullyEvolved: true,
    group: "Regular"
  },
  bellibolt: {
    name: "Bellibolt",
    types: ["Electric"],
    baseStats: {
      hp: 109,
      atk: 64,
      def: 91,
      spa: 103,
      spd: 83,
      spe: 45
    },
    weightKg: 113,
    abilities: ["Electromorphosis", "Static", "Damp"],
    group: "Regular"
  },
  wattrel: {
    name: "Wattrel",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 35,
      spa: 55,
      spd: 40,
      spe: 70
    },
    weightKg: 3.6,
    abilities: ["Wind Power", "Volt Absorb", "Competitive"],
    notFullyEvolved: true,
    group: "Regular"
  },
  kilowattrel: {
    name: "Kilowattrel",
    types: ["Electric", "Flying"],
    baseStats: {
      hp: 70,
      atk: 70,
      def: 60,
      spa: 105,
      spd: 60,
      spe: 125
    },
    weightKg: 38.6,
    abilities: ["Wind Power", "Volt Absorb", "Competitive"],
    group: "Regular"
  },
  maschiff: {
    name: "Maschiff",
    types: ["Dark"],
    baseStats: {
      hp: 60,
      atk: 78,
      def: 60,
      spa: 40,
      spd: 51,
      spe: 51
    },
    weightKg: 16,
    abilities: ["Intimidate", "Run Away", "Stakeout"],
    notFullyEvolved: true,
    group: "Regular"
  },
  mabosstiff: {
    name: "Mabosstiff",
    types: ["Dark"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 90,
      spa: 60,
      spd: 70,
      spe: 85
    },
    weightKg: 61,
    abilities: ["Intimidate", "Guard Dog", "Stakeout"],
    group: "Regular"
  },
  shroodle: {
    name: "Shroodle",
    types: ["Poison", "Normal"],
    baseStats: {
      hp: 40,
      atk: 65,
      def: 35,
      spa: 40,
      spd: 35,
      spe: 75
    },
    weightKg: 0.7,
    abilities: ["Unburden", "Pickpocket", "Prankster"],
    notFullyEvolved: true,
    group: "Regular"
  },
  grafaiai: {
    name: "Grafaiai",
    types: ["Poison", "Normal"],
    baseStats: {
      hp: 63,
      atk: 95,
      def: 65,
      spa: 80,
      spd: 72,
      spe: 110
    },
    weightKg: 27.2,
    abilities: ["Unburden", "Poison Touch", "Prankster"],
    group: "Regular"
  },
  bramblin: {
    name: "Bramblin",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 40,
      atk: 65,
      def: 30,
      spa: 45,
      spd: 35,
      spe: 60
    },
    weightKg: 0.6,
    abilities: ["Wind Rider", "Infiltrator"],
    notFullyEvolved: true,
    group: "Regular"
  },
  brambleghast: {
    name: "Brambleghast",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 55,
      atk: 115,
      def: 70,
      spa: 80,
      spd: 70,
      spe: 90
    },
    weightKg: 6,
    abilities: ["Wind Rider", "Infiltrator"],
    group: "Regular"
  },
  toedscool: {
    name: "Toedscool",
    types: ["Ground", "Grass"],
    baseStats: {
      hp: 40,
      atk: 40,
      def: 35,
      spa: 50,
      spd: 100,
      spe: 70
    },
    weightKg: 33,
    abilities: ["Mycelium Might"],
    notFullyEvolved: true,
    group: "Regular"
  },
  toedscruel: {
    name: "Toedscruel",
    types: ["Ground", "Grass"],
    baseStats: {
      hp: 80,
      atk: 70,
      def: 65,
      spa: 80,
      spd: 120,
      spe: 100
    },
    weightKg: 58,
    abilities: ["Mycelium Might"],
    group: "Regular"
  },
  klawf: {
    name: "Klawf",
    types: ["Rock"],
    baseStats: {
      hp: 70,
      atk: 100,
      def: 115,
      spa: 35,
      spd: 55,
      spe: 75
    },
    weightKg: 79,
    abilities: ["Anger Shell", "Shell Armor", "Regenerator"],
    group: "Regular"
  },
  capsakid: {
    name: "Capsakid",
    types: ["Grass"],
    baseStats: {
      hp: 50,
      atk: 62,
      def: 40,
      spa: 62,
      spd: 40,
      spe: 50
    },
    weightKg: 3,
    abilities: ["Chlorophyll", "Insomnia", "Klutz"],
    notFullyEvolved: true,
    group: "Regular"
  },
  scovillain: {
    name: "Scovillain",
    types: ["Grass", "Fire"],
    baseStats: {
      hp: 65,
      atk: 108,
      def: 65,
      spa: 108,
      spd: 65,
      spe: 75
    },
    weightKg: 15,
    abilities: ["Chlorophyll", "Insomnia", "Moody"],
    group: "Regular"
  },
  scovillainmega: {
    name: "Scovillain-Mega",
    types: ["Grass", "Fire"],
    baseStats: {
      hp: 65,
      atk: 138,
      def: 85,
      spa: 138,
      spd: 85,
      spe: 75
    },
    weightKg: 22,
    abilities: ["Spicy Spray"],
    group: "Meta"
  },
  rellor: {
    name: "Rellor",
    types: ["Bug"],
    baseStats: {
      hp: 41,
      atk: 50,
      def: 60,
      spa: 31,
      spd: 58,
      spe: 30
    },
    weightKg: 1,
    abilities: ["Compound Eyes", "Shed Skin"],
    notFullyEvolved: true,
    group: "Regular"
  },
  rabsca: {
    name: "Rabsca",
    types: ["Bug", "Psychic"],
    baseStats: {
      hp: 75,
      atk: 50,
      def: 85,
      spa: 115,
      spd: 100,
      spe: 45
    },
    weightKg: 3.5,
    abilities: ["Synchronize", "Telepathy"],
    group: "Regular"
  },
  flittle: {
    name: "Flittle",
    types: ["Psychic"],
    baseStats: {
      hp: 30,
      atk: 35,
      def: 30,
      spa: 55,
      spd: 30,
      spe: 75
    },
    weightKg: 1.5,
    abilities: ["Anticipation", "Frisk", "Speed Boost"],
    notFullyEvolved: true,
    group: "Regular"
  },
  espathra: {
    name: "Espathra",
    types: ["Psychic"],
    baseStats: {
      hp: 95,
      atk: 60,
      def: 60,
      spa: 101,
      spd: 60,
      spe: 105
    },
    weightKg: 90,
    abilities: ["Opportunist", "Frisk", "Speed Boost"],
    group: "Low usage"
  },
  tinkatink: {
    name: "Tinkatink",
    types: ["Fairy", "Steel"],
    baseStats: {
      hp: 50,
      atk: 45,
      def: 45,
      spa: 35,
      spd: 64,
      spe: 58
    },
    weightKg: 8.9,
    gender: "F",
    abilities: ["Mold Breaker", "Own Tempo", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tinkatuff: {
    name: "Tinkatuff",
    types: ["Fairy", "Steel"],
    baseStats: {
      hp: 65,
      atk: 55,
      def: 55,
      spa: 45,
      spd: 82,
      spe: 78
    },
    weightKg: 59.1,
    gender: "F",
    abilities: ["Mold Breaker", "Own Tempo", "Pickpocket"],
    notFullyEvolved: true,
    group: "Regular"
  },
  tinkaton: {
    name: "Tinkaton",
    types: ["Fairy", "Steel"],
    baseStats: {
      hp: 85,
      atk: 75,
      def: 77,
      spa: 70,
      spd: 105,
      spe: 94
    },
    weightKg: 112.8,
    gender: "F",
    abilities: ["Mold Breaker", "Own Tempo", "Pickpocket"],
    group: "Low usage"
  },
  wiglett: {
    name: "Wiglett",
    types: ["Water"],
    baseStats: {
      hp: 10,
      atk: 55,
      def: 25,
      spa: 35,
      spd: 25,
      spe: 95
    },
    weightKg: 1.8,
    abilities: ["Gooey", "Rattled", "Sand Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  wugtrio: {
    name: "Wugtrio",
    types: ["Water"],
    baseStats: {
      hp: 35,
      atk: 100,
      def: 50,
      spa: 50,
      spd: 70,
      spe: 120
    },
    weightKg: 5.4,
    abilities: ["Gooey", "Rattled", "Sand Veil"],
    group: "Regular"
  },
  bombirdier: {
    name: "Bombirdier",
    types: ["Flying", "Dark"],
    baseStats: {
      hp: 70,
      atk: 103,
      def: 85,
      spa: 60,
      spd: 85,
      spe: 82
    },
    weightKg: 42.9,
    abilities: ["Big Pecks", "Keen Eye", "Rocky Payload"],
    group: "Regular"
  },
  finizen: {
    name: "Finizen",
    types: ["Water"],
    baseStats: {
      hp: 70,
      atk: 45,
      def: 40,
      spa: 45,
      spd: 40,
      spe: 75
    },
    weightKg: 60.2,
    abilities: ["Water Veil"],
    notFullyEvolved: true,
    group: "Regular"
  },
  palafin: {
    name: "Palafin",
    types: ["Water"],
    baseStats: {
      hp: 100,
      atk: 70,
      def: 72,
      spa: 53,
      spd: 62,
      spe: 100
    },
    weightKg: 60.2,
    abilities: ["Zero to Hero"],
    group: "Low usage"
  },
  palafinhero: {
    name: "Palafin-Hero",
    types: ["Water"],
    baseStats: {
      hp: 100,
      atk: 160,
      def: 97,
      spa: 106,
      spd: 87,
      spe: 100
    },
    weightKg: 97.4,
    abilities: ["Zero to Hero"],
    group: "Regular"
  },
  varoom: {
    name: "Varoom",
    types: ["Steel", "Poison"],
    baseStats: {
      hp: 45,
      atk: 70,
      def: 63,
      spa: 30,
      spd: 45,
      spe: 47
    },
    weightKg: 35,
    abilities: ["Overcoat", "Slow Start"],
    notFullyEvolved: true,
    group: "Regular"
  },
  revavroom: {
    name: "Revavroom",
    types: ["Steel", "Poison"],
    baseStats: {
      hp: 80,
      atk: 119,
      def: 90,
      spa: 54,
      spd: 67,
      spe: 90
    },
    weightKg: 120,
    abilities: ["Overcoat", "Filter"],
    group: "Regular"
  },
  cyclizar: {
    name: "Cyclizar",
    types: ["Dragon", "Normal"],
    baseStats: {
      hp: 70,
      atk: 95,
      def: 65,
      spa: 85,
      spd: 65,
      spe: 121
    },
    weightKg: 63,
    abilities: ["Shed Skin", "Regenerator"],
    group: "Regular"
  },
  orthworm: {
    name: "Orthworm",
    types: ["Steel"],
    baseStats: {
      hp: 70,
      atk: 85,
      def: 145,
      spa: 60,
      spd: 55,
      spe: 65
    },
    weightKg: 310,
    abilities: ["Earth Eater", "Sand Veil"],
    group: "Regular"
  },
  glimmet: {
    name: "Glimmet",
    types: ["Rock", "Poison"],
    baseStats: {
      hp: 48,
      atk: 35,
      def: 42,
      spa: 105,
      spd: 60,
      spe: 60
    },
    weightKg: 8,
    abilities: ["Toxic Debris", "Corrosion"],
    notFullyEvolved: true,
    group: "Regular"
  },
  glimmora: {
    name: "Glimmora",
    types: ["Rock", "Poison"],
    baseStats: {
      hp: 83,
      atk: 55,
      def: 90,
      spa: 130,
      spd: 81,
      spe: 86
    },
    weightKg: 45,
    abilities: ["Toxic Debris", "Corrosion"],
    group: "Meta"
  },
  glimmoramega: {
    name: "Glimmora-Mega",
    types: ["Rock", "Poison"],
    baseStats: {
      hp: 83,
      atk: 90,
      def: 105,
      spa: 150,
      spd: 96,
      spe: 101
    },
    weightKg: 77,
    abilities: ["Adaptability"],
    group: "Meta"
  },
  greavard: {
    name: "Greavard",
    types: ["Ghost"],
    baseStats: {
      hp: 50,
      atk: 61,
      def: 60,
      spa: 30,
      spd: 55,
      spe: 34
    },
    weightKg: 35,
    abilities: ["Pickup", "Fluffy"],
    notFullyEvolved: true,
    group: "Regular"
  },
  houndstone: {
    name: "Houndstone",
    types: ["Ghost"],
    baseStats: {
      hp: 72,
      atk: 101,
      def: 100,
      spa: 50,
      spd: 97,
      spe: 68
    },
    weightKg: 15,
    abilities: ["Sand Rush", "Fluffy"],
    group: "Low usage"
  },
  flamigo: {
    name: "Flamigo",
    types: ["Flying", "Fighting"],
    baseStats: {
      hp: 82,
      atk: 115,
      def: 74,
      spa: 75,
      spd: 64,
      spe: 90
    },
    weightKg: 37,
    abilities: ["Scrappy", "Tangled Feet", "Costar"],
    group: "Regular"
  },
  cetoddle: {
    name: "Cetoddle",
    types: ["Ice"],
    baseStats: {
      hp: 108,
      atk: 68,
      def: 45,
      spa: 30,
      spd: 40,
      spe: 43
    },
    weightKg: 45,
    abilities: ["Thick Fat", "Snow Cloak", "Sheer Force"],
    notFullyEvolved: true,
    group: "Regular"
  },
  cetitan: {
    name: "Cetitan",
    types: ["Ice"],
    baseStats: {
      hp: 170,
      atk: 113,
      def: 65,
      spa: 45,
      spd: 55,
      spe: 73
    },
    weightKg: 700,
    abilities: ["Thick Fat", "Slush Rush", "Sheer Force"],
    group: "Regular"
  },
  veluza: {
    name: "Veluza",
    types: ["Water", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 102,
      def: 73,
      spa: 78,
      spd: 65,
      spe: 70
    },
    weightKg: 90,
    abilities: ["Mold Breaker", "Sharpness"],
    group: "Regular"
  },
  dondozo: {
    name: "Dondozo",
    types: ["Water"],
    baseStats: {
      hp: 150,
      atk: 100,
      def: 115,
      spa: 65,
      spd: 65,
      spe: 35
    },
    weightKg: 220,
    abilities: ["Unaware", "Oblivious", "Water Veil"],
    group: "Regular"
  },
  tatsugiri: {
    name: "Tatsugiri",
    types: ["Dragon", "Water"],
    baseStats: {
      hp: 68,
      atk: 50,
      def: 60,
      spa: 120,
      spd: 95,
      spe: 82
    },
    weightKg: 8,
    abilities: ["Commander", "Storm Drain"],
    group: "Regular"
  },
  tatsugirimega: {
    name: "Tatsugiri-Mega",
    types: ["Dragon", "Water"],
    baseStats: {
      hp: 68,
      atk: 65,
      def: 90,
      spa: 135,
      spd: 125,
      spe: 92
    },
    weightKg: 24,
    abilities: ["Commander", "Storm Drain"],
    group: "Regular",
    unreleased: true
  },
  tatsugiridroopy: {
    name: "Tatsugiri-Droopy",
    types: ["Dragon", "Water"],
    baseStats: {
      hp: 68,
      atk: 50,
      def: 60,
      spa: 120,
      spd: 95,
      spe: 82
    },
    weightKg: 8,
    abilities: ["Commander", "Storm Drain"],
    group: "Regular"
  },
  tatsugiridroopymega: {
    name: "Tatsugiri-Droopy-Mega",
    types: ["Dragon", "Water"],
    baseStats: {
      hp: 68,
      atk: 65,
      def: 90,
      spa: 135,
      spd: 125,
      spe: 92
    },
    weightKg: 24,
    abilities: ["Commander", "Storm Drain"],
    group: "Regular",
    unreleased: true
  },
  tatsugiristretchy: {
    name: "Tatsugiri-Stretchy",
    types: ["Dragon", "Water"],
    baseStats: {
      hp: 68,
      atk: 50,
      def: 60,
      spa: 120,
      spd: 95,
      spe: 82
    },
    weightKg: 8,
    abilities: ["Commander", "Storm Drain"],
    group: "Regular"
  },
  tatsugiristretchymega: {
    name: "Tatsugiri-Stretchy-Mega",
    types: ["Dragon", "Water"],
    baseStats: {
      hp: 68,
      atk: 65,
      def: 90,
      spa: 135,
      spd: 125,
      spe: 92
    },
    weightKg: 24,
    abilities: ["Commander", "Storm Drain"],
    group: "Regular",
    unreleased: true
  },
  annihilape: {
    name: "Annihilape",
    types: ["Fighting", "Ghost"],
    baseStats: {
      hp: 110,
      atk: 115,
      def: 80,
      spa: 50,
      spd: 90,
      spe: 90
    },
    weightKg: 56,
    abilities: ["Vital Spirit", "Inner Focus", "Defiant"],
    group: "Meta"
  },
  clodsire: {
    name: "Clodsire",
    types: ["Poison", "Ground"],
    baseStats: {
      hp: 130,
      atk: 75,
      def: 60,
      spa: 45,
      spd: 100,
      spe: 20
    },
    weightKg: 223,
    abilities: ["Poison Point", "Water Absorb", "Unaware"],
    group: "Regular"
  },
  farigiraf: {
    name: "Farigiraf",
    types: ["Normal", "Psychic"],
    baseStats: {
      hp: 120,
      atk: 90,
      def: 70,
      spa: 110,
      spd: 70,
      spe: 60
    },
    weightKg: 160,
    abilities: ["Cud Chew", "Armor Tail", "Sap Sipper"],
    group: "Meta"
  },
  dudunsparce: {
    name: "Dudunsparce",
    types: ["Normal"],
    baseStats: {
      hp: 125,
      atk: 100,
      def: 80,
      spa: 85,
      spd: 75,
      spe: 55
    },
    weightKg: 39.2,
    abilities: ["Serene Grace", "Run Away", "Rattled"],
    group: "Regular"
  },
  kingambit: {
    name: "Kingambit",
    types: ["Dark", "Steel"],
    baseStats: {
      hp: 100,
      atk: 135,
      def: 120,
      spa: 60,
      spd: 85,
      spe: 50
    },
    weightKg: 120,
    abilities: ["Defiant", "Supreme Overlord", "Pressure"],
    group: "Meta"
  },
  greattusk: {
    name: "Great Tusk",
    types: ["Ground", "Fighting"],
    baseStats: {
      hp: 115,
      atk: 131,
      def: 131,
      spa: 53,
      spd: 53,
      spe: 87
    },
    weightKg: 320,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  screamtail: {
    name: "Scream Tail",
    types: ["Fairy", "Psychic"],
    baseStats: {
      hp: 115,
      atk: 65,
      def: 99,
      spa: 65,
      spd: 115,
      spe: 111
    },
    weightKg: 8,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  brutebonnet: {
    name: "Brute Bonnet",
    types: ["Grass", "Dark"],
    baseStats: {
      hp: 111,
      atk: 127,
      def: 99,
      spa: 79,
      spd: 99,
      spe: 55
    },
    weightKg: 21,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  fluttermane: {
    name: "Flutter Mane",
    types: ["Ghost", "Fairy"],
    baseStats: {
      hp: 55,
      atk: 55,
      def: 55,
      spa: 135,
      spd: 135,
      spe: 135
    },
    weightKg: 4,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  slitherwing: {
    name: "Slither Wing",
    types: ["Bug", "Fighting"],
    baseStats: {
      hp: 85,
      atk: 135,
      def: 79,
      spa: 85,
      spd: 105,
      spe: 81
    },
    weightKg: 92,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  sandyshocks: {
    name: "Sandy Shocks",
    types: ["Electric", "Ground"],
    baseStats: {
      hp: 85,
      atk: 81,
      def: 97,
      spa: 121,
      spd: 85,
      spe: 101
    },
    weightKg: 60,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  irontreads: {
    name: "Iron Treads",
    types: ["Ground", "Steel"],
    baseStats: {
      hp: 90,
      atk: 112,
      def: 120,
      spa: 72,
      spd: 70,
      spe: 106
    },
    weightKg: 240,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  ironbundle: {
    name: "Iron Bundle",
    types: ["Ice", "Water"],
    baseStats: {
      hp: 56,
      atk: 80,
      def: 114,
      spa: 124,
      spd: 60,
      spe: 136
    },
    weightKg: 11,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  ironhands: {
    name: "Iron Hands",
    types: ["Fighting", "Electric"],
    baseStats: {
      hp: 154,
      atk: 140,
      def: 108,
      spa: 50,
      spd: 68,
      spe: 50
    },
    weightKg: 380.7,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  ironjugulis: {
    name: "Iron Jugulis",
    types: ["Dark", "Flying"],
    baseStats: {
      hp: 94,
      atk: 80,
      def: 86,
      spa: 122,
      spd: 80,
      spe: 108
    },
    weightKg: 111,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  ironmoth: {
    name: "Iron Moth",
    types: ["Fire", "Poison"],
    baseStats: {
      hp: 80,
      atk: 70,
      def: 60,
      spa: 140,
      spd: 110,
      spe: 110
    },
    weightKg: 36,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  ironthorns: {
    name: "Iron Thorns",
    types: ["Rock", "Electric"],
    baseStats: {
      hp: 100,
      atk: 134,
      def: 110,
      spa: 70,
      spd: 84,
      spe: 72
    },
    weightKg: 303,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  frigibax: {
    name: "Frigibax",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 65,
      atk: 75,
      def: 45,
      spa: 35,
      spd: 45,
      spe: 55
    },
    weightKg: 17,
    abilities: ["Thermal Exchange", "Ice Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  arctibax: {
    name: "Arctibax",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 90,
      atk: 95,
      def: 66,
      spa: 45,
      spd: 65,
      spe: 62
    },
    weightKg: 30,
    abilities: ["Thermal Exchange", "Ice Body"],
    notFullyEvolved: true,
    group: "Regular"
  },
  baxcalibur: {
    name: "Baxcalibur",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 115,
      atk: 145,
      def: 92,
      spa: 75,
      spd: 86,
      spe: 87
    },
    weightKg: 210,
    abilities: ["Thermal Exchange", "Ice Body"],
    group: "Regular"
  },
  baxcaliburmega: {
    name: "Baxcalibur-Mega",
    types: ["Dragon", "Ice"],
    baseStats: {
      hp: 115,
      atk: 175,
      def: 117,
      spa: 105,
      spd: 101,
      spe: 87
    },
    weightKg: 315,
    abilities: ["Thermal Exchange"],
    group: "Regular",
    unreleased: true
  },
  gimmighoul: {
    name: "Gimmighoul",
    types: ["Ghost"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 70,
      spa: 75,
      spd: 70,
      spe: 10
    },
    weightKg: 5,
    gender: "N",
    abilities: ["Rattled"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gimmighoulroaming: {
    name: "Gimmighoul-Roaming",
    types: ["Ghost"],
    baseStats: {
      hp: 45,
      atk: 30,
      def: 25,
      spa: 75,
      spd: 45,
      spe: 80
    },
    weightKg: 0.1,
    gender: "N",
    abilities: ["Run Away"],
    notFullyEvolved: true,
    group: "Regular"
  },
  gholdengo: {
    name: "Gholdengo",
    types: ["Steel", "Ghost"],
    baseStats: {
      hp: 87,
      atk: 60,
      def: 95,
      spa: 133,
      spd: 91,
      spe: 84
    },
    weightKg: 30,
    gender: "N",
    abilities: ["Good as Gold"],
    group: "Meta"
  },
  wochien: {
    name: "Wo-Chien",
    types: ["Dark", "Grass"],
    baseStats: {
      hp: 85,
      atk: 85,
      def: 100,
      spa: 95,
      spd: 135,
      spe: 70
    },
    weightKg: 74.2,
    gender: "N",
    abilities: ["Tablets of Ruin"],
    group: "Regular"
  },
  chienpao: {
    name: "Chien-Pao",
    types: ["Dark", "Ice"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 80,
      spa: 90,
      spd: 65,
      spe: 135
    },
    weightKg: 152.2,
    gender: "N",
    abilities: ["Sword of Ruin"],
    group: "Regular"
  },
  tinglu: {
    name: "Ting-Lu",
    types: ["Dark", "Ground"],
    baseStats: {
      hp: 155,
      atk: 110,
      def: 125,
      spa: 55,
      spd: 80,
      spe: 45
    },
    weightKg: 699.7,
    gender: "N",
    abilities: ["Vessel of Ruin"],
    group: "Regular"
  },
  chiyu: {
    name: "Chi-Yu",
    types: ["Dark", "Fire"],
    baseStats: {
      hp: 55,
      atk: 80,
      def: 80,
      spa: 135,
      spd: 120,
      spe: 100
    },
    weightKg: 4.9,
    gender: "N",
    abilities: ["Beads of Ruin"],
    group: "Regular"
  },
  roaringmoon: {
    name: "Roaring Moon",
    types: ["Dragon", "Dark"],
    baseStats: {
      hp: 105,
      atk: 139,
      def: 71,
      spa: 55,
      spd: 101,
      spe: 119
    },
    weightKg: 380,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  ironvaliant: {
    name: "Iron Valiant",
    types: ["Fairy", "Fighting"],
    baseStats: {
      hp: 74,
      atk: 130,
      def: 90,
      spa: 120,
      spd: 60,
      spe: 116
    },
    weightKg: 35,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  koraidon: {
    name: "Koraidon",
    types: ["Fighting", "Dragon"],
    baseStats: {
      hp: 100,
      atk: 135,
      def: 115,
      spa: 85,
      spd: 100,
      spe: 135
    },
    weightKg: 303,
    gender: "N",
    abilities: ["Orichalcum Pulse"],
    group: "Regular"
  },
  miraidon: {
    name: "Miraidon",
    types: ["Electric", "Dragon"],
    baseStats: {
      hp: 100,
      atk: 85,
      def: 100,
      spa: 135,
      spd: 115,
      spe: 135
    },
    weightKg: 240,
    gender: "N",
    abilities: ["Hadron Engine"],
    group: "Regular"
  },
  walkingwake: {
    name: "Walking Wake",
    types: ["Water", "Dragon"],
    baseStats: {
      hp: 99,
      atk: 83,
      def: 91,
      spa: 125,
      spd: 83,
      spe: 109
    },
    weightKg: 280,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  ironleaves: {
    name: "Iron Leaves",
    types: ["Grass", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 130,
      def: 88,
      spa: 70,
      spd: 108,
      spe: 104
    },
    weightKg: 125,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  dipplin: {
    name: "Dipplin",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 80,
      atk: 80,
      def: 110,
      spa: 95,
      spd: 80,
      spe: 40
    },
    weightKg: 4.4,
    abilities: ["Supersweet Syrup", "Gluttony", "Sticky Hold"],
    notFullyEvolved: true,
    group: "Regular"
  },
  poltchageist: {
    name: "Poltchageist",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 45,
      spa: 74,
      spd: 54,
      spe: 50
    },
    weightKg: 1.1,
    gender: "N",
    abilities: ["Hospitality", "Heatproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  poltchageistartisan: {
    name: "Poltchageist-Artisan",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 40,
      atk: 45,
      def: 45,
      spa: 74,
      spd: 54,
      spe: 50
    },
    weightKg: 1.1,
    gender: "N",
    abilities: ["Hospitality", "Heatproof"],
    notFullyEvolved: true,
    group: "Regular"
  },
  sinistcha: {
    name: "Sinistcha",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 71,
      atk: 60,
      def: 106,
      spa: 121,
      spd: 80,
      spe: 70
    },
    weightKg: 2.2,
    gender: "N",
    abilities: ["Hospitality", "Heatproof"],
    group: "Meta"
  },
  sinistchamasterpiece: {
    name: "Sinistcha-Masterpiece",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 71,
      atk: 60,
      def: 106,
      spa: 121,
      spd: 80,
      spe: 70
    },
    weightKg: 2.2,
    gender: "N",
    abilities: ["Hospitality", "Heatproof"],
    group: "Regular"
  },
  okidogi: {
    name: "Okidogi",
    types: ["Poison", "Fighting"],
    baseStats: {
      hp: 88,
      atk: 128,
      def: 115,
      spa: 58,
      spd: 86,
      spe: 80
    },
    weightKg: 92,
    gender: "M",
    abilities: ["Toxic Chain", "Guard Dog"],
    group: "Regular"
  },
  munkidori: {
    name: "Munkidori",
    types: ["Poison", "Psychic"],
    baseStats: {
      hp: 88,
      atk: 75,
      def: 66,
      spa: 130,
      spd: 90,
      spe: 106
    },
    weightKg: 12.2,
    gender: "M",
    abilities: ["Toxic Chain", "Frisk"],
    group: "Regular"
  },
  fezandipiti: {
    name: "Fezandipiti",
    types: ["Poison", "Fairy"],
    baseStats: {
      hp: 88,
      atk: 91,
      def: 82,
      spa: 70,
      spd: 125,
      spe: 99
    },
    weightKg: 30.1,
    gender: "M",
    abilities: ["Toxic Chain", "Technician"],
    group: "Regular"
  },
  ogerpon: {
    name: "Ogerpon",
    types: ["Grass"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 84,
      spa: 60,
      spd: 96,
      spe: 110
    },
    weightKg: 39.8,
    gender: "F",
    abilities: ["Defiant"],
    group: "Regular"
  },
  ogerponcornerstone: {
    name: "Ogerpon-Cornerstone",
    types: ["Grass", "Rock"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 84,
      spa: 60,
      spd: 96,
      spe: 110
    },
    weightKg: 39.8,
    gender: "F",
    abilities: ["Sturdy"],
    group: "Regular"
  },
  ogerponhearthflame: {
    name: "Ogerpon-Hearthflame",
    types: ["Grass", "Fire"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 84,
      spa: 60,
      spd: 96,
      spe: 110
    },
    weightKg: 39.8,
    gender: "F",
    abilities: ["Mold Breaker"],
    group: "Regular"
  },
  ogerponwellspring: {
    name: "Ogerpon-Wellspring",
    types: ["Grass", "Water"],
    baseStats: {
      hp: 80,
      atk: 120,
      def: 84,
      spa: 60,
      spd: 96,
      spe: 110
    },
    weightKg: 39.8,
    gender: "F",
    abilities: ["Water Absorb"],
    group: "Regular"
  },
  archaludon: {
    name: "Archaludon",
    types: ["Steel", "Dragon"],
    baseStats: {
      hp: 90,
      atk: 105,
      def: 130,
      spa: 125,
      spd: 65,
      spe: 85
    },
    weightKg: 60,
    abilities: ["Stamina", "Sturdy", "Stalwart"],
    group: "Meta"
  },
  hydrapple: {
    name: "Hydrapple",
    types: ["Grass", "Dragon"],
    baseStats: {
      hp: 106,
      atk: 80,
      def: 110,
      spa: 120,
      spd: 80,
      spe: 44
    },
    weightKg: 93,
    abilities: ["Supersweet Syrup", "Regenerator", "Sticky Hold"],
    group: "Low usage"
  },
  gougingfire: {
    name: "Gouging Fire",
    types: ["Fire", "Dragon"],
    baseStats: {
      hp: 105,
      atk: 115,
      def: 121,
      spa: 65,
      spd: 93,
      spe: 91
    },
    weightKg: 590,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  ragingbolt: {
    name: "Raging Bolt",
    types: ["Electric", "Dragon"],
    baseStats: {
      hp: 125,
      atk: 73,
      def: 91,
      spa: 137,
      spd: 89,
      spe: 75
    },
    weightKg: 480,
    gender: "N",
    abilities: ["Protosynthesis"],
    group: "Regular"
  },
  ironboulder: {
    name: "Iron Boulder",
    types: ["Rock", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 120,
      def: 80,
      spa: 68,
      spd: 108,
      spe: 124
    },
    weightKg: 162.5,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  ironcrown: {
    name: "Iron Crown",
    types: ["Steel", "Psychic"],
    baseStats: {
      hp: 90,
      atk: 72,
      def: 100,
      spa: 122,
      spd: 108,
      spe: 98
    },
    weightKg: 156,
    gender: "N",
    abilities: ["Quark Drive"],
    group: "Regular"
  },
  terapagos: {
    name: "Terapagos",
    types: ["Normal"],
    baseStats: {
      hp: 90,
      atk: 65,
      def: 85,
      spa: 65,
      spd: 85,
      spe: 60
    },
    weightKg: 6.5,
    abilities: ["Tera Shift"],
    group: "Regular"
  },
  terapagosstellar: {
    name: "Terapagos-Stellar",
    types: ["Normal"],
    baseStats: {
      hp: 160,
      atk: 105,
      def: 110,
      spa: 130,
      spd: 110,
      spe: 85
    },
    weightKg: 77,
    abilities: ["Teraform Zero"],
    group: "Regular"
  },
  terapagosterastal: {
    name: "Terapagos-Terastal",
    types: ["Normal"],
    baseStats: {
      hp: 95,
      atk: 95,
      def: 110,
      spa: 105,
      spd: 110,
      spe: 85
    },
    weightKg: 16,
    abilities: ["Tera Shell"],
    group: "Regular"
  },
  pecharunt: {
    name: "Pecharunt",
    types: ["Poison", "Ghost"],
    baseStats: {
      hp: 88,
      atk: 88,
      def: 160,
      spa: 88,
      spd: 88,
      spe: 88
    },
    weightKg: 0.3,
    gender: "N",
    abilities: ["Poison Puppeteer"],
    group: "Regular"
  }
} satisfies Record<string, PokemonDataCore>
