import { SpeciesData } from "@lib/calc/model/types"

export const SPECIES: Record<string, SpeciesData> = {
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
    abilities: {
      "0": "Synchronize"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rock Head"
    }
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    }
  },
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Compound Eyes"
    }
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
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Cute Charm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shell Armor"
    }
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
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Sand Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Veil"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Soundproof"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cursed Body"
    }
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
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Damp"
    }
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
    abilities: {
      "0": "Rock Head"
    }
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
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Stench"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cute Charm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Oblivious"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Synchronize"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Early Bird"
    }
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
    abilities: {
      "0": "Hyper Cutter"
    }
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hyper Cutter"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Own Tempo"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Guts"
    }
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flame Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Magnet Pull"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Magnet Pull"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Vital Spirit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rock Head"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Soundproof"
    }
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
    abilities: {
      "0": "Stench"
    }
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
    abilities: {
      "0": "Poison Point"
    }
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
    abilities: {
      "0": "Poison Point"
    }
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Effect Spore"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Effect Spore"
    }
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hyper Cutter"
    }
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
    abilities: {
      "0": "Water Absorb"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Trace"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Vital Spirit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Damp"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Lightning Rod"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Lightning Rod"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Veil"
    }
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shell Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Oblivious"
    }
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
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Immunity"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Illuminate"
    }
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
    abilities: {
      "0": "Illuminate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Clear Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Compound Eyes"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Soundproof"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Volt Absorb"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cute Charm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hustle"
    }
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Vital Spirit"
    }
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Serene Grace"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hyper Cutter"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Insomnia"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Early Bird"
    }
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
    abilities: {
      "0": "Early Bird"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cute Charm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Flame Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Magma Armor"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Synchronize"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    }
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
    abilities: {
      "0": "Suction Cups"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Trace"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Damp"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Oblivious"
    }
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
    abilities: {
      "0": "Magma Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Own Tempo"
    }
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
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rock Head"
    }
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Sand Stream"
    }
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shadow Tag"
    }
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
    abilities: {
      "0": "Damp"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Speed Boost"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Battle Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Battle Armor"
    }
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    }
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
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Clear Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Effect Spore"
    }
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
    abilities: {
      "0": "Sand Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Veil"
    }
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
    abilities: {
      "0": "Magma Armor"
    }
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
    abilities: {
      "0": "Rough Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Forecast"
    }
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
    abilities: {
      "0": "Forecast"
    }
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
    abilities: {
      "0": "Forecast"
    }
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
    abilities: {
      "0": "Forecast"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Shell Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hyper Cutter"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Suction Cups"
    }
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
    abilities: {
      "0": "Hyper Cutter"
    }
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Pressure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Soundproof"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Drought"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Liquid Ooze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Oblivious"
    }
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
    abilities: {
      "0": "Serene Grace"
    }
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
    abilities: {
      "0": "Color Change"
    }
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
    abilities: {
      "0": "Synchronize"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Drizzle"
    }
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Suction Cups"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Soundproof"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Hyper Cutter"
    }
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
    abilities: {
      "0": "Pure Power"
    }
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
    abilities: {
      "0": "Pure Power"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Clear Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Marvel Scale"
    }
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
    abilities: {
      "0": "Minus"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Compound Eyes"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Speed Boost"
    }
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Plus"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Synchronize"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Air Lock"
    }
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    }
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
    abilities: {
      "0": "Rough Skin"
    }
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
    abilities: {
      "0": "Wonder Guard"
    }
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
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Effect Spore"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cute Charm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Truant"
    }
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
    abilities: {
      "0": "Truant"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Own Tempo"
    }
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Liquid Ooze"
    }
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Guts"
    }
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "White Smoke"
    }
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
    abilities: {
      "0": "Hyper Cutter"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Vital Spirit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Illuminate"
    }
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
    abilities: {
      "0": "Water Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Veil"
    }
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Oblivious"
    }
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
    abilities: {
      "0": "Soundproof"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shadow Tag"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Immunity"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Snow Warning"
    }
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
    abilities: {
      "0": "Technician"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Multitype"
    }
  },
  arghonaut: {
    name: "Arghonaut",
    types: ["Water", "Fighting"],
    baseStats: {
      hp: 105,
      atk: 110,
      def: 95,
      spa: 70,
      spd: 100,
      spe: 75
    },
    weightKg: 151,
    abilities: {
      "0": "Unaware"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Simple"
    }
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
    abilities: {
      "0": "Simple"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
  },
  breezi: {
    name: "Breezi",
    types: ["Poison", "Flying"],
    baseStats: {
      hp: 50,
      atk: 46,
      def: 69,
      spa: 60,
      spd: 50,
      spe: 75
    },
    weightKg: 0.6,
    abilities: {
      "0": "Unburden"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Flower Gift"
    }
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
    abilities: {
      "0": "Flower Gift"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
  },
  colossoil: {
    name: "Colossoil",
    types: ["Ground", "Dark"],
    baseStats: {
      hp: 133,
      atk: 122,
      def: 72,
      spa: 71,
      spd: 72,
      spe: 95
    },
    weightKg: 683.6,
    abilities: {
      "0": "Rebound"
    }
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
    abilities: {
      "0": "Honey Gather"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mold Breaker"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Anticipation"
    },
    notFullyEvolved: true
  },
  cyclohm: {
    name: "Cyclohm",
    types: ["Electric", "Dragon"],
    baseStats: {
      hp: 108,
      atk: 60,
      def: 118,
      spa: 112,
      spd: 70,
      spe: 80
    },
    weightKg: 59,
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Bad Dreams"
    }
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
    abilities: {
      "0": "Pressure"
    }
  },
  dorsoil: {
    name: "Dorsoil",
    types: ["Ground"],
    baseStats: {
      hp: 103,
      atk: 72,
      def: 52,
      spa: 61,
      spd: 52,
      spe: 65
    },
    weightKg: 145,
    abilities: {
      "0": "Oblivious"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Battle Armor"
    }
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
    abilities: {
      "0": "Aftermath"
    }
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
    abilities: {
      "0": "Aftermath"
    },
    notFullyEvolved: true
  },
  duohm: {
    name: "Duohm",
    types: ["Electric", "Dragon"],
    baseStats: {
      hp: 88,
      atk: 40,
      def: 103,
      spa: 77,
      spd: 60,
      spe: 60
    },
    weightKg: 19.2,
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Motor Drive"
    }
  },
  embirch: {
    name: "Embirch",
    types: ["Fire", "Grass"],
    baseStats: {
      hp: 60,
      atk: 40,
      def: 55,
      spa: 65,
      spd: 40,
      spe: 60
    },
    weightKg: 15,
    abilities: {
      "0": "Reckless"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    }
  },
  fidgit: {
    name: "Fidgit",
    types: ["Poison", "Ground"],
    baseStats: {
      hp: 95,
      atk: 76,
      def: 109,
      spa: 90,
      spd: 80,
      spe: 105
    },
    weightKg: 53,
    abilities: {
      "0": "Persistent"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
  },
  flarelm: {
    name: "Flarelm",
    types: ["Fire", "Grass"],
    baseStats: {
      hp: 90,
      atk: 50,
      def: 95,
      spa: 75,
      spd: 70,
      spe: 40
    },
    weightKg: 73,
    abilities: {
      "0": "Rock Head"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Snow Cloak"
    }
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
    abilities: {
      "0": "Sand Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Steadfast"
    }
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
    abilities: {
      "0": "Sand Veil"
    }
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
    abilities: {
      "0": "Sticky Hold"
    }
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
    abilities: {
      "0": "Sand Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Snow Cloak"
    }
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
    abilities: {
      "0": "Limber"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hyper Cutter"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Sand Stream"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Stream"
    }
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
    abilities: {
      "0": "Insomnia"
    }
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
    abilities: {
      "0": "Blaze"
    }
  },
  kitsunoh: {
    name: "Kitsunoh",
    types: ["Ghost", "Steel"],
    baseStats: {
      hp: 80,
      atk: 103,
      def: 85,
      spa: 55,
      spd: 80,
      spe: 120
    },
    weightKg: 51,
    abilities: {
      "0": "Frisk"
    }
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
  },
  krilowatt: {
    name: "Krilowatt",
    types: ["Electric", "Water"],
    baseStats: {
      hp: 151,
      atk: 84,
      def: 73,
      spa: 83,
      spd: 74,
      spe: 105
    },
    weightKg: 10.6,
    abilities: {
      "0": "Trace"
    }
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
    abilities: {
      "0": "Leaf Guard"
    }
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
    abilities: {
      "0": "Own Tempo"
    }
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Steadfast"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Rivalry"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rivalry"
    }
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
    abilities: {
      "0": "Flame Body"
    }
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
    abilities: {
      "0": "Magnet Pull"
    }
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
    abilities: {
      "0": "Oblivious"
    }
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
    abilities: {
      "0": "Hydration"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Soundproof"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
  },
  monohm: {
    name: "Monohm",
    types: ["Electric"],
    baseStats: {
      hp: 53,
      atk: 40,
      def: 58,
      spa: 67,
      spd: 55,
      spe: 55
    },
    weightKg: 4.1,
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
  },
  nohface: {
    name: "Nohface",
    types: ["Ghost"],
    baseStats: {
      hp: 50,
      atk: 73,
      def: 50,
      spa: 30,
      spd: 50,
      spe: 80
    },
    weightKg: 5.9,
    abilities: {
      "0": "Frisk"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Hydration"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Adaptability"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
  },
  privatyke: {
    name: "Privatyke",
    types: ["Water", "Fighting"],
    baseStats: {
      hp: 65,
      atk: 75,
      def: 65,
      spa: 40,
      spd: 60,
      spe: 45
    },
    weightKg: 35,
    abilities: {
      "0": "Unaware"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    }
  },
  protowatt: {
    name: "Protowatt",
    types: ["Electric", "Water"],
    baseStats: {
      hp: 51,
      atk: 44,
      def: 33,
      spa: 43,
      spd: 34,
      spe: 65
    },
    weightKg: 0.1,
    abilities: {
      "0": "Trace"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Thick Fat"
    }
  },
  pyroak: {
    name: "Pyroak",
    types: ["Fire", "Grass"],
    baseStats: {
      hp: 120,
      atk: 70,
      def: 105,
      spa: 70,
      spd: 65,
      spe: 60
    },
    weightKg: 168,
    abilities: {
      "0": "Rock Head"
    }
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
    abilities: {
      "0": "Mold Breaker"
    }
  },
  rebble: {
    name: "Rebble",
    types: ["Rock"],
    baseStats: {
      hp: 45,
      atk: 25,
      def: 65,
      spa: 75,
      spd: 55,
      spe: 80
    },
    weightKg: 7,
    gender: "N",
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Slow Start"
    }
  },
  revenankh: {
    name: "Revenankh",
    types: ["Ghost", "Fighting"],
    baseStats: {
      hp: 90,
      atk: 105,
      def: 90,
      spa: 65,
      spd: 110,
      spe: 65
    },
    weightKg: 44,
    abilities: {
      "0": "Air Lock"
    }
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
    abilities: {
      "0": "Lightning Rod"
    }
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
    abilities: {
      "0": "Steadfast"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Serene Grace"
    }
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
    abilities: {
      "0": "Sticky Hold"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rivalry"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Battle Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Stench"
    }
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
    abilities: {
      "0": "Snow Warning"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
  },
  stratagem: {
    name: "Stratagem",
    types: ["Rock"],
    baseStats: {
      hp: 90,
      atk: 60,
      def: 65,
      spa: 120,
      spd: 70,
      spe: 130
    },
    weightKg: 45,
    gender: "N",
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Stench"
    },
    notFullyEvolved: true
  },
  syclant: {
    name: "Syclant",
    types: ["Ice", "Bug"],
    baseStats: {
      hp: 70,
      atk: 116,
      def: 70,
      spa: 114,
      spd: 64,
      spe: 121
    },
    weightKg: 52,
    abilities: {
      "0": "Compound Eyes"
    }
  },
  syclar: {
    name: "Syclar",
    types: ["Ice", "Bug"],
    baseStats: {
      hp: 40,
      atk: 76,
      def: 45,
      spa: 74,
      spd: 39,
      spe: 91
    },
    weightKg: 4,
    abilities: {
      "0": "Compound Eyes"
    },
    notFullyEvolved: true
  },
  tactite: {
    name: "Tactite",
    types: ["Rock"],
    baseStats: {
      hp: 70,
      atk: 40,
      def: 65,
      spa: 100,
      spd: 65,
      spe: 95
    },
    weightKg: 16,
    gender: "N",
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Hustle"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Anticipation"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Pressure"
    }
  },
  voodoll: {
    name: "Voodoll",
    types: ["Normal", "Dark"],
    baseStats: {
      hp: 55,
      atk: 40,
      def: 55,
      spa: 75,
      spd: 50,
      spe: 70
    },
    weightKg: 25,
    abilities: {
      "0": "Volt Absorb"
    },
    notFullyEvolved: true
  },
  voodoom: {
    name: "Voodoom",
    types: ["Fighting", "Dark"],
    baseStats: {
      hp: 90,
      atk: 85,
      def: 80,
      spa: 130,
      spd: 80,
      spe: 110
    },
    weightKg: 75.5,
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Anticipation"
    }
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
    abilities: {
      "0": "Anticipation"
    }
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
    abilities: {
      "0": "Anticipation"
    }
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
    abilities: {
      "0": "Speed Boost"
    }
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
    abilities: {
      "0": "Hydration"
    }
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
    abilities: {
      "0": "Healer"
    }
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
    abilities: {
      "0": "Effect Spore"
    }
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
    abilities: {
      "0": "Defeatist"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Defeatist"
    }
  },
  argalis: {
    name: "Argalis",
    types: ["Bug", "Psychic"],
    baseStats: {
      hp: 60,
      atk: 90,
      def: 89,
      spa: 87,
      spd: 40,
      spe: 54
    },
    weightKg: 341.4,
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Healer"
    }
  },
  aurumoth: {
    name: "Aurumoth",
    types: ["Bug", "Psychic"],
    baseStats: {
      hp: 110,
      atk: 120,
      def: 99,
      spa: 117,
      spd: 60,
      spe: 94
    },
    weightKg: 193,
    abilities: {
      "0": "Weak Armor"
    }
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
    abilities: {
      "0": "Rivalry"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Reckless"
    }
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
    abilities: {
      "0": "Rock Head"
    }
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
    abilities: {
      "0": "Snow Cloak"
    }
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
    abilities: {
      "0": "Telepathy"
    }
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
    abilities: {
      "0": "Defiant"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Lightning Rod"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Reckless"
    }
  },
  brattler: {
    name: "Brattler",
    types: ["Dark", "Grass"],
    baseStats: {
      hp: 80,
      atk: 70,
      def: 40,
      spa: 20,
      spd: 90,
      spe: 30
    },
    weightKg: 11.5,
    abilities: {
      "0": "Harvest"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Solid Rock"
    }
  },
  cawdet: {
    name: "Cawdet",
    types: ["Steel", "Flying"],
    baseStats: {
      hp: 35,
      atk: 72,
      def: 85,
      spa: 40,
      spd: 55,
      spe: 88
    },
    weightKg: 25,
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
  },
  cawmodore: {
    name: "Cawmodore",
    types: ["Steel", "Flying"],
    baseStats: {
      hp: 50,
      atk: 92,
      def: 130,
      spa: 65,
      spd: 75,
      spe: 118
    },
    weightKg: 37,
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Justified"
    }
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
    abilities: {
      "0": "Mummy"
    }
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
    abilities: {
      "0": "Guts"
    }
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
    abilities: {
      "0": "Prankster"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Snow Cloak"
    },
    notFullyEvolved: true
  },
  cupra: {
    name: "Cupra",
    types: ["Bug", "Psychic"],
    baseStats: {
      hp: 50,
      atk: 60,
      def: 49,
      spa: 67,
      spd: 30,
      spe: 44
    },
    weightKg: 4.8,
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sheer Force"
    }
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
    abilities: {
      "0": "Zen Mode"
    }
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Rush"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rough Skin"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overcoat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Telepathy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Sand Rush"
    }
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
    abilities: {
      "0": "Iron Barbs"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Iron Barbs"
    }
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
    abilities: {
      "0": "Effect Spore"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rivalry"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Compound Eyes"
    }
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
    abilities: {
      "0": "Stench"
    }
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
    abilities: {
      "0": "Download"
    }
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
    abilities: {
      "0": "Download"
    }
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
    abilities: {
      "0": "Download"
    }
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
    abilities: {
      "0": "Download"
    }
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
    abilities: {
      "0": "Download"
    }
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Iron Fist"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Iron Fist"
    }
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
    abilities: {
      "0": "Frisk"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Frisk"
    }
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
    abilities: {
      "0": "Frisk"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rivalry"
    }
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
    abilities: {
      "0": "Gluttony"
    }
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Compound Eyes"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Justified"
    }
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
    abilities: {
      "0": "Justified"
    }
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
    abilities: {
      "0": "Plus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Plus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Plus"
    }
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Teravolt"
    }
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
    abilities: {
      "0": "Turboblaze"
    }
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
    abilities: {
      "0": "Flash Fire"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Force"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Flame Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Vital Spirit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    },
    notFullyEvolved: true
  },
  malaconda: {
    name: "Malaconda",
    types: ["Dark", "Grass"],
    baseStats: {
      hp: 115,
      atk: 100,
      def: 60,
      spa: 40,
      spd: 130,
      spe: 55
    },
    weightKg: 108.8,
    abilities: {
      "0": "Harvest"
    }
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
    abilities: {
      "0": "Big Pecks"
    }
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Serene Grace"
    }
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
    abilities: {
      "0": "Serene Grace"
    }
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Cute Charm"
    },
    notFullyEvolved: true
  },
  mollux: {
    name: "Mollux",
    types: ["Fire", "Poison"],
    baseStats: {
      hp: 95,
      atk: 45,
      def: 83,
      spa: 131,
      spd: 105,
      spe: 76
    },
    weightKg: 41,
    abilities: {
      "0": "Dry Skin"
    }
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
    abilities: {
      "0": "Forewarn"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Forewarn"
    }
  },
  necturine: {
    name: "Necturine",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 49,
      atk: 55,
      def: 60,
      spa: 50,
      spd: 75,
      spe: 51
    },
    weightKg: 1.8,
    gender: "F",
    abilities: {
      "0": "Anticipation"
    },
    notFullyEvolved: true
  },
  necturna: {
    name: "Necturna",
    types: ["Grass", "Ghost"],
    baseStats: {
      hp: 64,
      atk: 120,
      def: 100,
      spa: 85,
      spd: 120,
      spe: 58
    },
    weightKg: 49.6,
    gender: "F",
    abilities: {
      "0": "Forewarn"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Gluttony"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Gluttony"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Gluttony"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Defiant"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Big Pecks"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Limber"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Turboblaze"
    }
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
    abilities: {
      "0": "Overcoat"
    }
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sturdy"
    }
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Poison Point"
    }
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
    abilities: {
      "0": "Shed Skin"
    }
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
  },
  scratchet: {
    name: "Scratchet",
    types: ["Normal", "Fighting"],
    baseStats: {
      hp: 55,
      atk: 85,
      def: 80,
      spa: 20,
      spd: 70,
      spe: 40
    },
    weightKg: 20,
    abilities: {
      "0": "Scrappy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hydration"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Wonder Skin"
    }
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
    abilities: {
      "0": "Gluttony"
    }
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
    abilities: {
      "0": "Gluttony"
    }
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
    abilities: {
      "0": "Gluttony"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overcoat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Leaf Guard"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Unaware"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Justified"
    }
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
    abilities: {
      "0": "Guts"
    }
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
    abilities: {
      "0": "Prankster"
    }
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Guts"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Solid Rock"
    },
    notFullyEvolved: true
  },
  tomohawk: {
    name: "Tomohawk",
    types: ["Flying", "Fighting"],
    baseStats: {
      hp: 105,
      atk: 60,
      def: 90,
      spa: 115,
      spd: 80,
      spe: 85
    },
    weightKg: 37.2,
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Prankster"
    }
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
    abilities: {
      "0": "Regenerator"
    }
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
    abilities: {
      "0": "Big Pecks"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Stench"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Big Pecks"
    }
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
    abilities: {
      "0": "Ice Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Ice Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Ice Body"
    }
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Victory Star"
    }
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
    abilities: {
      "0": "Justified"
    }
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
    abilities: {
      "0": "Flame Body"
    }
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
    abilities: {
      "0": "Big Pecks"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Illuminate"
    }
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
    abilities: {
      "0": "Prankster"
    }
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Unaware"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mummy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Lightning Rod"
    }
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
    abilities: {
      "0": "Teravolt"
    }
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
    abilities: {
      "0": "Illusion"
    }
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
    abilities: {
      "0": "Illusion"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Stance Change"
    }
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
    abilities: {
      "0": "Stance Change"
    }
  },
  aegislashboth: {
    name: "Aegislash-Both",
    types: ["Steel", "Ghost"],
    baseStats: {
      hp: 60,
      atk: 140,
      def: 140,
      spa: 140,
      spd: 140,
      spe: 60
    },
    weightKg: 53,
    abilities: {
      "0": "Stance Change"
    }
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
    abilities: {
      "0": "Refrigerate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Multitype"
    }
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
    abilities: {
      "0": "Healer"
    }
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
    abilities: {
      "0": "Refrigerate"
    }
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
    abilities: {
      "0": "Own Tempo"
    }
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
    abilities: {
      "0": "Tough Claws"
    }
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
    abilities: {
      "0": "Own Tempo"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Tough Claws"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
  },
  caimanoe: {
    name: "Caimanoe",
    types: ["Water", "Steel"],
    baseStats: {
      hp: 73,
      atk: 85,
      def: 65,
      spa: 80,
      spd: 40,
      spe: 87
    },
    weightKg: 72.5,
    abilities: {
      "0": "Water Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mega Launcher"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mega Launcher"
    }
  },
  crucibelle: {
    name: "Crucibelle",
    types: ["Rock", "Poison"],
    baseStats: {
      hp: 106,
      atk: 105,
      def: 65,
      spa: 75,
      spd: 85,
      spe: 104
    },
    weightKg: 23.6,
    abilities: {
      "0": "Regenerator"
    }
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
    abilities: {
      "0": "Cheek Pouch"
    }
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Pickup"
    }
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
    abilities: {
      "0": "No Guard"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flower Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flame Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Big Pecks"
    },
    notFullyEvolved: true
  },
  floatoy: {
    name: "Floatoy",
    types: ["Water"],
    baseStats: {
      hp: 48,
      atk: 70,
      def: 40,
      spa: 70,
      spd: 30,
      spe: 77
    },
    weightKg: 1.9,
    abilities: {
      "0": "Water Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flower Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flower Veil"
    }
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
    abilities: {
      "0": "Flower Veil"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Fur Coat"
    }
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
    abilities: {
      "0": "Sap Sipper"
    }
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
    abilities: {
      "0": "Sap Sipper"
    }
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
    abilities: {
      "0": "Sap Sipper"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    }
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
    abilities: {
      "0": "Pickup"
    }
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
    abilities: {
      "0": "Pickup"
    }
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
    abilities: {
      "0": "Pickup"
    }
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
    abilities: {
      "0": "Torrent"
    }
  },
  groudonprimal: {
    name: "Groudon-Primal",
    types: ["Ground", "Fire"],
    baseStats: {
      hp: 100,
      atk: 180,
      def: 160,
      spa: 150,
      spd: 90,
      spe: 90
    },
    weightKg: 999.7,
    gender: "N",
    abilities: {
      "0": "Desolate Land"
    }
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Dry Skin"
    }
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
    abilities: {
      "0": "Dry Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "No Guard"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Magician"
    }
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
    abilities: {
      "0": "Magician"
    }
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
    abilities: {
      "0": "Contrary"
    },
    notFullyEvolved: true
  },
  kerfluffle: {
    name: "Kerfluffle",
    types: ["Fairy", "Fighting"],
    baseStats: {
      hp: 84,
      atk: 78,
      def: 86,
      spa: 115,
      spd: 88,
      spe: 119
    },
    weightKg: 24.2,
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Prankster"
    }
  },
  kyogreprimal: {
    name: "Kyogre-Primal",
    types: ["Water"],
    baseStats: {
      hp: 100,
      atk: 150,
      def: 90,
      spa: 180,
      spd: 160,
      spe: 90
    },
    weightKg: 430,
    gender: "N",
    abilities: {
      "0": "Primordial Sea"
    }
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
    abilities: {
      "0": "Rivalry"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Contrary"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
  },
  naviathan: {
    name: "Naviathan",
    types: ["Water", "Steel"],
    baseStats: {
      hp: 103,
      atk: 110,
      def: 90,
      spa: 95,
      spd: 65,
      spe: 97
    },
    weightKg: 510,
    abilities: {
      "0": "Guts"
    }
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
    abilities: {
      "0": "Frisk"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Frisk"
    }
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
    abilities: {
      "0": "Iron Fist"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Iron Fist"
    }
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
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
  },
  plasmanta: {
    name: "Plasmanta",
    types: ["Electric", "Poison"],
    baseStats: {
      hp: 60,
      atk: 57,
      def: 119,
      spa: 131,
      spd: 98,
      spe: 100
    },
    weightKg: 460,
    abilities: {
      "0": "Storm Drain"
    }
  },
  pluffle: {
    name: "Pluffle",
    types: ["Fairy"],
    baseStats: {
      hp: 74,
      atk: 38,
      def: 51,
      spa: 65,
      spd: 78,
      spe: 49
    },
    weightKg: 1.8,
    abilities: {
      "0": "Natural Cure"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rivalry"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sap Sipper"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sap Sipper"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sweet Veil"
    }
  },
  snugglow: {
    name: "Snugglow",
    types: ["Electric", "Poison"],
    baseStats: {
      hp: 40,
      atk: 37,
      def: 79,
      spa: 91,
      spd: 68,
      spe: 70
    },
    weightKg: 6,
    abilities: {
      "0": "Storm Drain"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Healer"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sweet Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Flame Body"
    }
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
    abilities: {
      "0": "Natural Cure"
    }
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
    abilities: {
      "0": "Strong Jaw"
    }
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
    abilities: {
      "0": "Strong Jaw"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Water Absorb"
    }
  },
  volkraken: {
    name: "Volkraken",
    types: ["Water", "Fire"],
    baseStats: {
      hp: 100,
      atk: 45,
      def: 80,
      spa: 135,
      spd: 100,
      spe: 95
    },
    weightKg: 44.5,
    abilities: {
      "0": "Analytic"
    }
  },
  volkritter: {
    name: "Volkritter",
    types: ["Water", "Fire"],
    baseStats: {
      hp: 60,
      atk: 30,
      def: 50,
      spa: 80,
      spd: 60,
      spe: 70
    },
    weightKg: 15,
    abilities: {
      "0": "Anticipation"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Fairy Aura"
    }
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
    abilities: {
      "0": "Dark Aura"
    }
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
    abilities: {
      "0": "Aura Break"
    }
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
    abilities: {
      "0": "Snow Warning"
    }
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
    abilities: {
      "0": "Magic Bounce"
    }
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
    abilities: {
      "0": "Tough Claws"
    }
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
    abilities: {
      "0": "Filter"
    }
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
    abilities: {
      "0": "Trace"
    }
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
    abilities: {
      "0": "Pixilate"
    }
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
    abilities: {
      "0": "Mold Breaker"
    }
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
    abilities: {
      "0": "Healer"
    }
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
    abilities: {
      "0": "Prankster"
    }
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
    abilities: {
      "0": "Adaptability"
    }
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
    abilities: {
      "0": "Mega Launcher"
    }
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
    abilities: {
      "0": "Speed Boost"
    }
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
    abilities: {
      "0": "Sheer Force"
    }
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
    abilities: {
      "0": "Tough Claws"
    }
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
    abilities: {
      "0": "Drought"
    }
  },
  crucibellemega: {
    name: "Crucibelle-Mega",
    types: ["Rock", "Poison"],
    baseStats: {
      hp: 106,
      atk: 135,
      def: 75,
      spa: 91,
      spd: 125,
      spe: 108
    },
    weightKg: 22.5,
    abilities: {
      "0": "Magic Guard"
    }
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
    abilities: {
      "0": "Magic Bounce"
    }
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Sand Force"
    }
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
    abilities: {
      "0": "Pixilate"
    }
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
    abilities: {
      "0": "Shadow Tag"
    }
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
    abilities: {
      "0": "Refrigerate"
    }
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
    abilities: {
      "0": "Mold Breaker"
    }
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
    abilities: {
      "0": "Skill Link"
    }
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
    abilities: {
      "0": "Solar Power"
    }
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
    abilities: {
      "0": "Parental Bond"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Scrappy"
    }
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
    abilities: {
      "0": "Adaptability"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Huge Power"
    }
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
    abilities: {
      "0": "Pure Power"
    }
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
    abilities: {
      "0": "Tough Claws"
    }
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
    abilities: {
      "0": "Steadfast"
    }
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
    abilities: {
      "0": "Insomnia"
    }
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
    abilities: {
      "0": "No Guard"
    }
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
    abilities: {
      "0": "Aerilate"
    }
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
    abilities: {
      "0": "Delta Stream"
    }
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
    abilities: {
      "0": "Magic Bounce"
    }
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
    abilities: {
      "0": "Aerilate"
    }
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
    abilities: {
      "0": "Lightning Rod"
    }
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
    abilities: {
      "0": "Technician"
    }
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
    abilities: {
      "0": "Strong Jaw"
    }
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
    abilities: {
      "0": "Shell Armor"
    }
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
    abilities: {
      "0": "Sand Force"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Sand Stream"
    }
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Water Bubble"
    }
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
    abilities: {
      "0": "Fluffy"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Leaf Guard"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Dazzling"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
  },
  caribolt: {
    name: "Caribolt",
    types: ["Grass", "Electric"],
    baseStats: {
      hp: 84,
      atk: 106,
      def: 82,
      spa: 77,
      spd: 80,
      spe: 106
    },
    weightKg: 140,
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Battery"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flower Veil"
    }
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
    abilities: {
      "0": "Sturdy"
    },
    notFullyEvolved: true
  },
  coribalis: {
    name: "Coribalis",
    types: ["Water", "Bug"],
    baseStats: {
      hp: 76,
      atk: 69,
      def: 90,
      spa: 65,
      spd: 77,
      spe: 43
    },
    weightKg: 24.5,
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Unaware"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hyper Cutter"
    }
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
    abilities: {
      "0": "Hyper Cutter"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Honey Gather"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Water Bubble"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Steelworker"
    }
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
    abilities: {
      "0": "Berserk"
    }
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
    abilities: {
      "0": "Sand Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Veil"
    }
  },
  electrelk: {
    name: "Electrelk",
    types: ["Grass", "Electric"],
    baseStats: {
      hp: 59,
      atk: 81,
      def: 67,
      spa: 57,
      spd: 55,
      spe: 101
    },
    weightKg: 41.5,
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
  },
  equilibra: {
    name: "Equilibra",
    types: ["Steel", "Ground"],
    baseStats: {
      hp: 102,
      atk: 50,
      def: 96,
      spa: 133,
      spd: 118,
      spe: 60
    },
    weightKg: 51.3,
    gender: "N",
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Frisk"
    }
  },
  fawnifer: {
    name: "Fawnifer",
    types: ["Grass"],
    baseStats: {
      hp: 49,
      atk: 61,
      def: 42,
      spa: 52,
      spd: 40,
      spe: 76
    },
    weightKg: 6.9,
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Leaf Guard"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Magnet Pull"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Magnet Pull"
    }
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
    abilities: {
      "0": "Emergency Exit"
    }
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
    abilities: {
      "0": "Magnet Pull"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Poison Touch"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Battle Bond"
    }
  },
  greninjabond: {
    name: "Greninja-Bond",
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
    gender: "M",
    abilities: {
      "0": "Battle Bond"
    }
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Stakeout"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Bulletproof"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Bulletproof"
    },
    notFullyEvolved: true
  },
  justyke: {
    name: "Justyke",
    types: ["Steel", "Ground"],
    baseStats: {
      hp: 72,
      atk: 70,
      def: 56,
      spa: 83,
      spd: 68,
      spe: 30
    },
    weightKg: 36.5,
    gender: "N",
    abilities: {
      "0": "Levitate"
    },
    notFullyEvolved: true
  },
  jumbao: {
    name: "Jumbao",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 92,
      atk: 63,
      def: 97,
      spa: 124,
      spd: 104,
      spe: 96
    },
    weightKg: 200,
    abilities: {
      "0": "Trace"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Comatose"
    }
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
    abilities: {
      "0": "Bulletproof"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shadow Shield"
    }
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
    abilities: {
      "0": "Leaf Guard"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Tough Claws"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Soul-Heart"
    }
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
    abilities: {
      "0": "Merciless"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cursed Body"
    }
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
    abilities: {
      "0": "Technician"
    }
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
    abilities: {
      "0": "Iron Fist"
    }
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
    abilities: {
      "0": "Magnet Pull"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Disguise"
    }
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
    abilities: {
      "0": "Disguise"
    }
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
    abilities: {
      "0": "Shields Down"
    }
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
    abilities: {
      "0": "Shields Down"
    }
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
    abilities: {
      "0": "Illuminate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Own Tempo"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Own Tempo"
    }
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
    abilities: {
      "0": "Poison Touch"
    }
  },
  mumbao: {
    name: "Mumbao",
    types: ["Grass", "Fairy"],
    baseStats: {
      hp: 55,
      atk: 30,
      def: 64,
      spa: 87,
      spd: 73,
      spe: 66
    },
    weightKg: 83,
    abilities: {
      "0": "Trace"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Prism Armor"
    }
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
    abilities: {
      "0": "Prism Armor"
    }
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
    abilities: {
      "0": "Prism Armor"
    }
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
    abilities: {
      "0": "Neuroforce"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Snow Cloak"
    }
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Dancer"
    }
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
    abilities: {
      "0": "Dancer"
    }
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
    abilities: {
      "0": "Dancer"
    }
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
    abilities: {
      "0": "Dancer"
    }
  },
  pajantom: {
    name: "Pajantom",
    types: ["Dragon", "Ghost"],
    baseStats: {
      hp: 84,
      atk: 133,
      def: 71,
      spa: 51,
      spd: 111,
      spe: 101
    },
    weightKg: 3.1,
    abilities: {
      "0": "Comatose"
    }
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
    abilities: {
      "0": "Water Compaction"
    }
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
    abilities: {
      "0": "Receiver"
    }
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
    abilities: {
      "0": "Fur Coat"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
  },
  pikachualola: {
    name: "Pikachu-Alola",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
  },
  pikachuhoenn: {
    name: "Pikachu-Hoenn",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
  },
  pikachukalos: {
    name: "Pikachu-Kalos",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
  },
  pikachuoriginal: {
    name: "Pikachu-Original",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
  },
  pikachupartner: {
    name: "Pikachu-Partner",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
  },
  pikachusinnoh: {
    name: "Pikachu-Sinnoh",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
  },
  pikachuunova: {
    name: "Pikachu-Unova",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Beast Boost"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Innards Out"
    }
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
    abilities: {
      "0": "Surge Surfer"
    }
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
    abilities: {
      "0": "Gluttony"
    }
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
    abilities: {
      "0": "Gluttony"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Honey Gather"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Own Tempo"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Corrosion"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Corrosion"
    }
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
    abilities: {
      "0": "Snow Cloak"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Snow Cloak"
    }
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
    abilities: {
      "0": "Water Compaction"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Illuminate"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
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
    abilities: {
      "0": "RKS System"
    }
  },
  smogecko: {
    name: "Smogecko",
    types: ["Fire"],
    baseStats: {
      hp: 48,
      atk: 66,
      def: 43,
      spa: 58,
      spd: 48,
      spe: 56
    },
    weightKg: 8.5,
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
  },
  smoguana: {
    name: "Smoguana",
    types: ["Fire", "Ground"],
    baseStats: {
      hp: 68,
      atk: 86,
      def: 53,
      spa: 68,
      spd: 68,
      spe: 76
    },
    weightKg: 22.2,
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
  },
  smokomodo: {
    name: "Smokomodo",
    types: ["Fire", "Ground"],
    baseStats: {
      hp: 88,
      atk: 116,
      def: 67,
      spa: 88,
      spd: 78,
      spe: 97
    },
    weightKg: 205,
    abilities: {
      "0": "Blaze"
    }
  },
  snaelstrom: {
    name: "Snaelstrom",
    types: ["Water", "Bug"],
    baseStats: {
      hp: 91,
      atk: 94,
      def: 110,
      spa: 80,
      spd: 97,
      spe: 63
    },
    weightKg: 120,
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Full Metal Body"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Leaf Guard"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Fluffy"
    },
    notFullyEvolved: true
  },
  swirlpool: {
    name: "Swirlpool",
    types: ["Water"],
    baseStats: {
      hp: 61,
      atk: 49,
      def: 70,
      spa: 50,
      spd: 62,
      spe: 28
    },
    weightKg: 7,
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Grassy Surge"
    }
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
    abilities: {
      "0": "Misty Surge"
    }
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
    abilities: {
      "0": "Electric Surge"
    }
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
    abilities: {
      "0": "Psychic Surge"
    }
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
    abilities: {
      "0": "Iron Barbs"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Merciless"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Leaf Guard"
    }
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
    abilities: {
      "0": "Shell Armor"
    }
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
    abilities: {
      "0": "Battle Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Snow Cloak"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Wimp Out"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Schooling"
    }
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
    abilities: {
      "0": "Schooling"
    }
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
    abilities: {
      "0": "Beast Boost"
    }
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
    abilities: {
      "0": "Stakeout"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Aura Break"
    }
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
    abilities: {
      "0": "Power Construct"
    }
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
    abilities: {
      "0": "Sweet Veil"
    }
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
    abilities: {
      "0": "Ripen"
    }
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
    abilities: {
      "0": "Ripen"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Swift Swim"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Competitive"
    }
  },
  astrolotl: {
    name: "Astrolotl",
    types: ["Fire", "Dragon"],
    baseStats: {
      hp: 108,
      atk: 108,
      def: 74,
      spa: 92,
      spd: 64,
      spe: 114
    },
    weightKg: 50,
    abilities: {
      "0": "Regenerator"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Strong Jaw"
    }
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
    abilities: {
      "0": "Unnerve"
    }
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
    abilities: {
      "0": "As One (Glastrier)"
    }
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
    abilities: {
      "0": "As One (Spectrier)"
    }
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
    abilities: {
      "0": "Steam Engine"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Strong Jaw"
    },
    notFullyEvolved: true
  },
  chromera: {
    name: "Chromera",
    types: ["Dark", "Normal"],
    baseStats: {
      hp: 85,
      atk: 85,
      def: 115,
      spa: 115,
      spd: 100,
      spe: 100
    },
    weightKg: 215,
    gender: "N",
    abilities: {
      "0": "Color Change"
    }
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Limber"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Steam Engine"
    }
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
    abilities: {
      "0": "Sheer Force"
    }
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
    abilities: {
      "0": "Weak Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Gulp Missile"
    }
  },
  cramorantgorging: {
    name: "Cramorant-Gorging",
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
    abilities: {
      "0": "Gulp Missile"
    }
  },
  cramorantgulping: {
    name: "Cramorant-Gulping",
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
    abilities: {
      "0": "Gulp Missile"
    }
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
    abilities: {
      "0": "Sheer Force"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Weak Armor"
    }
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
    abilities: {
      "0": "Gorilla Tactics"
    }
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
    abilities: {
      "0": "Zen Mode"
    }
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
    abilities: {
      "0": "Hustle"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Absorb"
    }
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Clear Body"
    }
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
    abilities: {
      "0": "Clear Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Strong Jaw"
    }
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
    abilities: {
      "0": "Clear Body"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Fluffy"
    }
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
    abilities: {
      "0": "Light Metal"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Ice Face"
    }
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
    abilities: {
      "0": "Ice Face"
    }
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
    abilities: {
      "0": "Cotton Down"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    weightKg: 950,
    gender: "N",
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Battle Armor"
    }
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
    abilities: {
      "0": "Steadfast"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Ripen"
    }
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
    abilities: {
      "0": "Shield Dust"
    }
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
    abilities: {
      "0": "Chilling Neigh"
    }
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
    abilities: {
      "0": "Cotton Down"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Cheek Pouch"
    }
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
    abilities: {
      "0": "Prankster"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Healer"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Healer"
    }
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
    abilities: {
      "0": "Healer"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Prankster"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    }
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
    abilities: {
      "0": "Own Tempo"
    }
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Soul-Heart"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
  },
  miasmaw: {
    name: "Miasmaw",
    types: ["Bug", "Dragon"],
    baseStats: {
      hp: 85,
      atk: 135,
      def: 60,
      spa: 88,
      spd: 105,
      spe: 99
    },
    weightKg: 57,
    abilities: {
      "0": "Neutralizing Gas"
    }
  },
  miasmite: {
    name: "Miasmite",
    types: ["Bug", "Dragon"],
    baseStats: {
      hp: 40,
      atk: 85,
      def: 60,
      spa: 52,
      spd: 52,
      spe: 44
    },
    weightKg: 10.1,
    abilities: {
      "0": "Neutralizing Gas"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sweet Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Berserk"
    }
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
    abilities: {
      "0": "Prankster"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hunger Switch"
    }
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
    abilities: {
      "0": "Hunger Switch"
    }
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
    abilities: {
      "0": "Vital Spirit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Tangled Feet"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Reckless"
    }
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Battle Armor"
    }
  },
  pikachuworld: {
    name: "Pikachu-World",
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
    gender: "M",
    abilities: {
      "0": "Static"
    }
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
    abilities: {
      "0": "Lightning Rod"
    }
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
    abilities: {
      "0": "Weak Armor"
    }
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
    abilities: {
      "0": "Weak Armor"
    }
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Dragon's Maw"
    }
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
    abilities: {
      "0": "Transistor"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Steam Engine"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Wandering Spirit"
    }
  },
  saharaja: {
    name: "Saharaja",
    types: ["Ground"],
    baseStats: {
      hp: 70,
      atk: 112,
      def: 105,
      spa: 65,
      spd: 123,
      spe: 78
    },
    weightKg: 303.9,
    abilities: {
      "0": "Water Absorb"
    }
  },
  saharascal: {
    name: "Saharascal",
    types: ["Ground"],
    baseStats: {
      hp: 50,
      atk: 80,
      def: 65,
      spa: 45,
      spd: 90,
      spe: 70
    },
    weightKg: 48,
    abilities: {
      "0": "Water Absorb"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Spit"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Sand Spit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Weak Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Weak Armor"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Steadfast"
    }
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
    abilities: {
      "0": "Flash Fire"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Cheek Pouch"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Quick Draw"
    }
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
    abilities: {
      "0": "Curious Medicine"
    }
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
    abilities: {
      "0": "Gluttony"
    },
    notFullyEvolved: true
  },
  solotl: {
    name: "Solotl",
    types: ["Fire", "Dragon"],
    baseStats: {
      hp: 68,
      atk: 48,
      def: 34,
      spa: 72,
      spd: 24,
      spe: 84
    },
    weightKg: 11.8,
    abilities: {
      "0": "Regenerator"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shield Dust"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Grim Neigh"
    }
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
    abilities: {
      "0": "Power Spot"
    }
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
    abilities: {
      "0": "Mimicry"
    }
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
    abilities: {
      "0": "Run Away"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Rattled"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Punk Rock"
    }
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
    abilities: {
      "0": "Punk Rock"
    }
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
    abilities: {
      "0": "Unseen Fist"
    }
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
    abilities: {
      "0": "Unseen Fist"
    }
  },
  venomicon: {
    name: "Venomicon",
    types: ["Poison", "Flying"],
    baseStats: {
      hp: 85,
      atk: 50,
      def: 113,
      spa: 118,
      spd: 90,
      spe: 64
    },
    weightKg: 11.5,
    gender: "N",
    abilities: {
      "0": "Stamina"
    }
  },
  venomiconepilogue: {
    name: "Venomicon-Epilogue",
    types: ["Poison", "Flying"],
    baseStats: {
      hp: 85,
      atk: 102,
      def: 85,
      spa: 62,
      spd: 85,
      spe: 101
    },
    weightKg: 12.4,
    gender: "N",
    abilities: {
      "0": "Tinted Lens"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Fluffy"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Wandering Spirit"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Ball Fetch"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intrepid Sword"
    }
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
    abilities: {
      "0": "Intrepid Sword"
    }
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
    abilities: {
      "0": "Dauntless Shield"
    }
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
    abilities: {
      "0": "Dauntless Shield"
    }
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
    abilities: {
      "0": "Defiant"
    }
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
    abilities: {
      "0": "Leaf Guard"
    }
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
    abilities: {
      "0": "Leaf Guard"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Strong Jaw"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Swift Swim"
    }
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
    abilities: {
      "0": "Rattled"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Soundproof"
    }
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
    abilities: {
      "0": "Cute Charm"
    }
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
    abilities: {
      "0": "Overcoat"
    }
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
    abilities: {
      "0": "Sap Sipper"
    }
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Poison Point"
    }
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Sap Sipper"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Inner Focus"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Pressure"
    }
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Guts"
    }
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
    abilities: {
      "0": "Soundproof"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Illusion"
    }
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
    abilities: {
      "0": "Illusion"
    },
    notFullyEvolved: true
  },
  ababo: {
    name: "Ababo",
    types: ["Fairy"],
    baseStats: {
      hp: 42,
      atk: 35,
      def: 27,
      spa: 35,
      spd: 35,
      spe: 38
    },
    weightKg: 3.5,
    abilities: {
      "0": "Pixilate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Vital Spirit"
    }
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
    abilities: {
      "0": "Seed Sower"
    }
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
    abilities: {
      "0": "Stamina"
    }
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
    abilities: {
      "0": "Thermal Exchange"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Thermal Exchange"
    }
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
    abilities: {
      "0": "Electromorphosis"
    }
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
    abilities: {
      "0": "Big Pecks"
    }
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
    abilities: {
      "0": "Wind Rider"
    }
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
    abilities: {
      "0": "Wind Rider"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Chlorophyll"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Thick Fat"
    }
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
    abilities: {
      "0": "Thick Fat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Flash Fire"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Beads of Ruin"
    }
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
    abilities: {
      "0": "Sword of Ruin"
    }
  },
  chuggon: {
    name: "Chuggon",
    types: ["Dragon", "Poison"],
    baseStats: {
      hp: 30,
      atk: 23,
      def: 77,
      spa: 55,
      spd: 65,
      spe: 30
    },
    weightKg: 50,
    abilities: {
      "0": "Shell Armor"
    },
    notFullyEvolved: true
  },
  chuggalong: {
    name: "Chuggalong",
    types: ["Dragon", "Poison"],
    baseStats: {
      hp: 45,
      atk: 43,
      def: 117,
      spa: 120,
      spd: 110,
      spe: 108
    },
    weightKg: 201.6,
    abilities: {
      "0": "Armor Tail"
    }
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
    abilities: {
      "0": "Poison Point"
    }
  },
  cresceidon: {
    name: "Cresceidon",
    types: ["Water", "Fairy"],
    baseStats: {
      hp: 80,
      atk: 32,
      def: 111,
      spa: 88,
      spd: 99,
      spe: 124
    },
    weightKg: 999.9,
    abilities: {
      "0": "Multiscale"
    }
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Shed Skin"
    }
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
    abilities: {
      "0": "Well-Baked Body"
    }
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
    abilities: {
      "0": "Supersweet Syrup"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Early Bird"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Unaware"
    }
  },
  draggalong: {
    name: "Draggalong",
    types: ["Dragon", "Poison"],
    baseStats: {
      hp: 40,
      atk: 33,
      def: 92,
      spa: 95,
      spd: 80,
      spe: 85
    },
    weightKg: 110,
    abilities: {
      "0": "Armor Tail"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Serene Grace"
    }
  },
  dudunsparcethreesegment: {
    name: "Dudunsparce-Three-Segment",
    types: ["Normal"],
    baseStats: {
      hp: 125,
      atk: 100,
      def: 80,
      spa: 85,
      spd: 75,
      spe: 55
    },
    weightKg: 47.4,
    abilities: {
      "0": "Serene Grace"
    }
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
    abilities: {
      "0": "Opportunist"
    }
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
    abilities: {
      "0": "Cud Chew"
    }
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
    abilities: {
      "0": "Toxic Chain"
    }
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
    abilities: {
      "0": "Own Tempo"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Water Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Scrappy"
    }
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
    abilities: {
      "0": "Anticipation"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Thermal Exchange"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Blaze"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Purifying Salt"
    }
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
    abilities: {
      "0": "Good as Gold"
    }
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
    abilities: {
      "0": "Rattled"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Toxic Debris"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Toxic Debris"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Unburden"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Pickup"
    },
    notFullyEvolved: true
  },
  hemogoblin: {
    name: "Hemogoblin",
    types: ["Fairy", "Fire"],
    baseStats: {
      hp: 90,
      atk: 96,
      def: 87,
      spa: 96,
      spd: 89,
      spe: 55
    },
    weightKg: 85,
    abilities: {
      "0": "Pixilate"
    }
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
    abilities: {
      "0": "Sand Rush"
    }
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
    abilities: {
      "0": "Supersweet Syrup"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Quark Drive"
    }
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
    abilities: {
      "0": "Wind Power"
    }
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
    abilities: {
      "0": "Defiant"
    }
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
    abilities: {
      "0": "Anger Shell"
    }
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
    abilities: {
      "0": "Orichalcum Pulse"
    }
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
    abilities: {
      "0": "Aroma Veil"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Friend Guard"
    }
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
    abilities: {
      "0": "Friend Guard"
    }
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
    abilities: {
      "0": "Overgrow"
    }
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
    abilities: {
      "0": "Hadron Engine"
    }
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
    abilities: {
      "0": "Toxic Chain"
    }
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
    abilities: {
      "0": "Purifying Salt"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Purifying Salt"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Swarm"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Defiant"
    }
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
    abilities: {
      "0": "Sturdy"
    }
  },
  ogerponcornerstonetera: {
    name: "Ogerpon-Cornerstone-Tera",
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
    abilities: {
      "0": "Embody Aspect (Cornerstone)"
    }
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
    abilities: {
      "0": "Mold Breaker"
    }
  },
  ogerponhearthflametera: {
    name: "Ogerpon-Hearthflame-Tera",
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
    abilities: {
      "0": "Embody Aspect (Hearthflame)"
    }
  },
  ogerpontealtera: {
    name: "Ogerpon-Teal-Tera",
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
    abilities: {
      "0": "Embody Aspect (Teal)"
    }
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
    abilities: {
      "0": "Water Absorb"
    }
  },
  ogerponwellspringtera: {
    name: "Ogerpon-Wellspring-Tera",
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
    abilities: {
      "0": "Embody Aspect (Wellspring)"
    }
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
    abilities: {
      "0": "Lingering Aroma"
    }
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
    abilities: {
      "0": "Aroma Veil"
    }
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
    abilities: {
      "0": "Toxic Chain"
    }
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
    abilities: {
      "0": "Earth Eater"
    }
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
    abilities: {
      "0": "Zero to Hero"
    }
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
    abilities: {
      "0": "Zero to Hero"
    }
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
    abilities: {
      "0": "Static"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Volt Absorb"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Volt Absorb"
    }
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
    abilities: {
      "0": "Poison Puppeteer"
    }
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
    abilities: {
      "0": "Hospitality"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hospitality"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    }
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Torrent"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Synchronize"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
  },
  ramnarok: {
    name: "Ramnarok",
    types: ["Fire", "Steel"],
    baseStats: {
      hp: 110,
      atk: 56,
      def: 104,
      spa: 111,
      spd: 134,
      spe: 85
    },
    weightKg: 250,
    gender: "N",
    abilities: {
      "0": "No Guard"
    }
  },
  ramnarokradiant: {
    name: "Ramnarok-Radiant",
    types: ["Fire", "Ice"],
    baseStats: {
      hp: 110,
      atk: 56,
      def: 85,
      spa: 141,
      spd: 54,
      spe: 154
    },
    weightKg: 182,
    gender: "N",
    abilities: {
      "0": "No Guard"
    }
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
    abilities: {
      "0": "Compound Eyes"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Overcoat"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
  },
  scattervein: {
    name: "Scattervein",
    types: ["Fairy"],
    baseStats: {
      hp: 75,
      atk: 74,
      def: 87,
      spa: 62,
      spd: 89,
      spe: 63
    },
    weightKg: 25,
    abilities: {
      "0": "Pixilate"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Chlorophyll"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
  },
  shox: {
    name: "Shox",
    types: ["Electric", "Normal"],
    baseStats: {
      hp: 136,
      atk: 55,
      def: 87,
      spa: 108,
      spd: 108,
      spe: 56
    },
    weightKg: 99.9,
    abilities: {
      "0": "Electromorphosis"
    }
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
    abilities: {
      "0": "Unburden"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Hospitality"
    }
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
    abilities: {
      "0": "Hospitality"
    }
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
    abilities: {
      "0": "Blaze"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Early Bird"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    }
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
    abilities: {
      "0": "Overgrow"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Own Tempo"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Run Away"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Insomnia"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Commander"
    }
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
    abilities: {
      "0": "Commander"
    }
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
    abilities: {
      "0": "Commander"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Tera Shift"
    }
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
    abilities: {
      "0": "Teraform Zero"
    }
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
    abilities: {
      "0": "Tera Shell"
    }
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
    abilities: {
      "0": "Vessel of Ruin"
    }
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
    abilities: {
      "0": "Mold Breaker"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mold Breaker"
    }
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
    abilities: {
      "0": "Mold Breaker"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mycelium Might"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mycelium Might"
    }
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
    abilities: {
      "0": "Mind's Eye"
    }
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
    abilities: {
      "0": "Overcoat"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Mold Breaker"
    }
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
    abilities: {
      "0": "Protosynthesis"
    }
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
    abilities: {
      "0": "Wind Power"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Gooey"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Tablets of Ruin"
    }
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
    abilities: {
      "0": "Poison Point"
    },
    notFullyEvolved: true
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
    abilities: {
      "0": "Gooey"
    }
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
    abilities: {
      "0": "Magic Bounce"
    }
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
    abilities: {
      "0": "Tough Claws"
    }
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
    abilities: {
      "0": "Thermal Exchange"
    }
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
    abilities: {
      "0": "Infiltrator"
    }
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
    abilities: {
      "0": "Bulletproof"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Magic Bounce"
    }
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
    abilities: {
      "0": "Iron Fist"
    }
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
    abilities: {
      "0": "Bad Dreams"
    }
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
    abilities: {
      "0": "Levitate"
    }
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
    abilities: {
      "0": "Regenerator"
    }
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
    abilities: {
      "0": "Multiscale"
    }
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
    abilities: {
      "0": "Berserk"
    }
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
    abilities: {
      "0": "Eelevate"
    }
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
    abilities: {
      "0": "Mold Breaker"
    }
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
    abilities: {
      "0": "Piercing Drill"
    }
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
    abilities: {
      "0": "Defiant"
    }
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
    abilities: {
      "0": "Dragonize"
    }
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
    abilities: {
      "0": "Fairy Aura"
    }
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
    abilities: {
      "0": "Snow Warning"
    }
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
    abilities: {
      "0": "Sand Force"
    }
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
    abilities: {
      "0": "Adaptability"
    }
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
    abilities: {
      "0": "Emergency Exit"
    }
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
    abilities: {
      "0": "Unseen Fist"
    }
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
    abilities: {
      "0": "Protean"
    }
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
    abilities: {
      "0": "Limber"
    }
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
    abilities: {
      "0": "Flash Fire"
    }
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
    abilities: {
      "0": "Adaptability"
    }
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
    abilities: {
      "0": "Soul-Heart"
    }
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
    abilities: {
      "0": "Soul-Heart"
    }
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
    abilities: {
      "0": "Contrary"
    }
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
    abilities: {
      "0": "Mega Sol"
    }
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
    abilities: {
      "0": "Trace"
    }
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
    abilities: {
      "0": "Trace"
    }
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
    abilities: {
      "0": "Fire Mane"
    }
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
    abilities: {
      "0": "Electric Surge"
    }
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
    abilities: {
      "0": "No Guard"
    }
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
    abilities: {
      "0": "Shell Armor"
    }
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
    abilities: {
      "0": "Spicy Spray"
    }
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
    abilities: {
      "0": "Intimidate"
    }
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
    abilities: {
      "0": "Keen Eye"
    }
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
    abilities: {
      "0": "Contrary"
    }
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
    abilities: {
      "0": "Huge Power"
    }
  },
  tatsugiricurlymega: {
    name: "Tatsugiri-Curly-Mega",
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
    abilities: {
      "0": "Commander"
    }
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
    abilities: {
      "0": "Commander"
    }
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
    abilities: {
      "0": "Commander"
    }
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
    abilities: {
      "0": "Innards Out"
    }
  },
  zeraoramega: {
    name: "Zeraora-Mega",
    types: ["Electric"],
    baseStats: {
      hp: 88,
      atk: 157,
      def: 75,
      spa: 147,
      spd: 80,
      spe: 153
    },
    weightKg: 44.5,
    gender: "N",
    abilities: {
      "0": "Volt Absorb"
    }
  },
  zygardemega: {
    name: "Zygarde-Mega",
    types: ["Dragon", "Ground"],
    baseStats: {
      hp: 216,
      atk: 70,
      def: 91,
      spa: 216,
      spd: 85,
      spe: 100
    },
    weightKg: 610,
    gender: "N",
    abilities: {
      "0": "Aura Break"
    }
  }
}
