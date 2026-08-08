import { AbilityName, ItemName, MoveName, NatureName, StatsTable, TypeName } from "@data/types"

export interface Moveset {
  ability: AbilityName
  nature: NatureName
  teraType: TypeName | ""
  evs: StatsTable
  moves: readonly [MoveName, ...MoveName[]]
  items: readonly ItemName[]
}

export const MOVESETS = {
  Bulbasaur: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Giga Drain", "Weather Ball", "Growth"],
    items: ["Eviolite"]
  },
  Ivysaur: {
    ability: "Overgrow",
    nature: "Sassy",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Giga Drain", "Knock Off", "Synthesis", "Toxic"],
    items: ["Black Sludge", "Eviolite"]
  },
  Venusaur: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Sludge Bomb", "Earth Power", "Protect", "Sleep Powder"],
    items: ["Life Orb", "Focus Sash"]
  },
  "Venusaur-Mega": {
    ability: "Thick Fat",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 28,
      atk: 0,
      def: 0,
      spa: 20,
      spd: 0,
      spe: 18
    },
    moves: ["Sludge Bomb", "Earth Power", "Giga Drain", "Protect"],
    items: ["Venusaurite"]
  },
  Charmander: {
    ability: "Solar Power",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Overheat", "Focus Blast", "Fire Blast", "Weather Ball"],
    items: ["Choice Scarf"]
  },
  Charmeleon: {
    ability: "Blaze",
    nature: "Lonely",
    teraType: "Dragon",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Flare Blitz", "Dragon Claw", "Tera Blast", "Dragon Dance"],
    items: ["Life Orb", "Salac Berry"]
  },
  Charizard: {
    ability: "Solar Power",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 20,
      atk: 0,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 13
    },
    moves: ["Solar Beam", "Heat Wave", "Weather Ball", "Protect"],
    items: ["Charizardite Y"]
  },
  "Charizard-Mega-X": {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 16,
      def: 3,
      spa: 0,
      spd: 1,
      spe: 14
    },
    moves: ["Flare Blitz", "Dragon Claw", "Protect", "Dragon Dance"],
    items: ["Charizardite X"]
  },
  "Charizard-Mega-Y": {
    ability: "Drought",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 20,
      atk: 0,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 13
    },
    moves: ["Solar Beam", "Heat Wave", "Weather Ball", "Protect"],
    items: ["Charizardite Y"]
  },
  Squirtle: {
    ability: "Torrent",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hydro Pump", "Ice Beam", "Rapid Spin", "Shell Smash"],
    items: ["Eviolite"]
  },
  Wartortle: {
    ability: "Torrent",
    nature: "Modest",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Rapid Spin", "Surf", "Shell Smash", "Ice Beam"],
    items: ["Eviolite"]
  },
  Blastoise: {
    ability: "Rain Dish",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Water Spout", "Dark Pulse", "Protect", "Shell Smash"],
    items: ["Blastoisinite"]
  },
  "Blastoise-Mega": {
    ability: "Mega Launcher",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Water Spout", "Dark Pulse", "Protect", "Shell Smash"],
    items: ["Blastoisinite"]
  },
  Caterpie: {
    ability: "Shield Dust",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Tackle", "Aerial Ace", "Protect"],
    items: ["Eviolite"]
  },
  Metapod: {
    ability: "Shed Skin",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Electroweb", "Belch", "Blizzard", "Protect"],
    items: ["Eviolite"]
  },
  Butterfree: {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Bug Buzz", "Confusion", "Protect"],
    items: ["Leftovers"]
  },
  Weedle: {
    ability: "Shield Dust",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Poison Sting", "Bug Bite", "Protect"],
    items: ["Eviolite"]
  },
  Kakuna: {
    ability: "Shed Skin",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Electroweb", "Acid Spray", "Bug Buzz", "Protect"],
    items: ["Eviolite"]
  },
  Beedrill: {
    ability: "Swarm",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Poison Jab", "U-turn", "Knock Off", "Protect"],
    items: ["Beedrillite"]
  },
  "Beedrill-Mega": {
    ability: "Adaptability",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Poison Jab", "U-turn", "Knock Off", "Protect"],
    items: ["Beedrillite"]
  },
  Pidgey: {
    ability: "Keen Eye",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brave Bird", "Facade", "Protect"],
    items: ["Eviolite"]
  },
  Pidgeotto: {
    ability: "Keen Eye",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Facade", "Fly", "Protect"],
    items: ["Eviolite"]
  },
  Pidgeot: {
    ability: "Keen Eye",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Brave Bird", "Fly", "Close Combat", "Protect"],
    items: ["Pidgeotite"]
  },
  "Pidgeot-Mega": {
    ability: "No Guard",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Brave Bird", "Fly", "Close Combat", "Protect"],
    items: ["Pidgeotite"]
  },
  Rattata: {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bite", "Counter", "Protect"],
    items: ["Eviolite"]
  },
  "Rattata-Alola": {
    ability: "Gluttony",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bite", "Counter", "Protect"],
    items: ["Eviolite"]
  },
  Raticate: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Facade", "Super Fang", "Sucker Punch", "Protect"],
    items: ["Toxic Orb", "Life Orb"]
  },
  "Raticate-Alola": {
    ability: "Gluttony",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bite", "Counter", "Protect"],
    items: ["Leftovers"]
  },
  Spearow: {
    ability: "Keen Eye",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Astonish", "Protect"],
    items: ["Eviolite"]
  },
  Fearow: {
    ability: "Keen Eye",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Drill Peck", "Protect"],
    items: ["Leftovers"]
  },
  Ekans: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Earthquake", "Knock Off", "Glare"],
    items: ["Eviolite"]
  },
  Arbok: {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Earthquake", "Crunch", "Glare", "Poison Jab"],
    items: ["Leftovers"]
  },
  Pikachu: {
    ability: "Lightning Rod",
    nature: "Hasty",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Thunder", "Surf", "Upper Hand", "Fake Out"],
    items: ["Light Ball"]
  },
  Raichu: {
    ability: "Lightning Rod",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 30,
      atk: 0,
      def: 13,
      spa: 0,
      spd: 0,
      spe: 23
    },
    moves: ["Focus Blast", "Zap Cannon", "Fake Out", "Protect"],
    items: ["Raichunite Y"]
  },
  "Raichu-Alola": {
    ability: "Surge Surfer",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 30
    },
    moves: ["Thunderbolt", "Surf", "Volt Switch", "Helping Hand"],
    items: ["Sitrus Berry"]
  },
  "Raichu-Mega-X": {
    ability: "Electric Surge",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Volt Tackle", "Volt Switch", "Fake Out", "Protect"],
    items: ["Raichunite X"]
  },
  "Raichu-Mega-Y": {
    ability: "No Guard",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 30,
      atk: 0,
      def: 13,
      spa: 0,
      spd: 0,
      spe: 23
    },
    moves: ["Focus Blast", "Zap Cannon", "Fake Out", "Protect"],
    items: ["Raichunite Y"]
  },
  Sandshrew: {
    ability: "Sand Rush",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Leech Life", "Knock Off", "Rapid Spin"],
    items: ["Eviolite"]
  },
  "Sandshrew-Alola": {
    ability: "Slush Rush",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 6,
      atk: 30,
      def: 5,
      spa: 0,
      spd: 0,
      spe: 25
    },
    moves: ["Earthquake", "Rapid Spin", "Triple Axel", "Swords Dance"],
    items: ["Eviolite", "Loaded Dice"]
  },
  Sandslash: {
    ability: "Sand Rush",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Earthquake", "Knock Off", "Leech Life"],
    items: ["Life Orb"]
  },
  "Sandslash-Alola": {
    ability: "Slush Rush",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 31,
      spe: 2
    },
    moves: ["Spikes", "Icicle Crash", "Knock Off", "Rapid Spin"],
    items: ["Leftovers"]
  },
  "Nidoran-F": {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Beat Up", "Bite", "Protect"],
    items: ["Eviolite"]
  },
  Nidorina: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Beat Up", "Bite", "Protect"],
    items: ["Eviolite"]
  },
  Nidoqueen: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Tail", "Avalanche", "Protect"],
    items: ["Leftovers"]
  },
  "Nidoran-M": {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Beat Up", "Body Slam", "Chip Away", "Protect"],
    items: ["Eviolite"]
  },
  Nidorino: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Beat Up", "Body Slam", "Dig", "Protect"],
    items: ["Eviolite"]
  },
  Nidoking: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Avalanche", "Beat Up", "Protect"],
    items: ["Leftovers"]
  },
  Clefairy: {
    ability: "Friend Guard",
    nature: "Bold",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 22,
      spa: 0,
      spd: 11,
      spe: 0
    },
    moves: ["Follow Me", "Protect", "Helping Hand", "Encore"],
    items: ["Eviolite"]
  },
  Clefable: {
    ability: "Unaware",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Moonblast", "Follow Me", "Protect", "Helping Hand"],
    items: ["Sitrus Berry", "Babiri Berry", "Leftovers", "Bright Powder"]
  },
  "Clefable-Mega": {
    ability: "Magic Bounce",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 30,
      atk: 0,
      def: 27,
      spa: 1,
      spd: 7,
      spe: 1
    },
    moves: ["Follow Me", "Helping Hand", "Moonblast", "Protect"],
    items: ["Clefablite"]
  },
  Vulpix: {
    ability: "Drought",
    nature: "Calm",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 32,
      spe: 0
    },
    moves: ["Weather Ball", "Will-O-Wisp", "Healing Wish", "Roar"],
    items: ["Heat Rock"]
  },
  "Vulpix-Alola": {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Foul Play", "Freeze-Dry", "Aurora Veil", "Encore"],
    items: ["Icy Rock", "Focus Sash", "Choice Scarf"]
  },
  Ninetales: {
    ability: "Drought",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 0,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Overheat", "Solar Beam", "Heat Wave", "Fake Tears"],
    items: ["Choice Scarf", "Charcoal"]
  },
  "Ninetales-Alola": {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Freeze-Dry", "Protect", "Encore"],
    items: ["Never-Melt Ice", "Focus Sash", "Choice Scarf", "Light Clay"]
  },
  Jigglypuff: {
    ability: "Friend Guard",
    nature: "Relaxed",
    teraType: "Ghost",
    evs: {
      hp: 4,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Knock Off", "Protect", "Perish Song", "Heal Pulse"],
    items: ["Eviolite"]
  },
  Wigglytuff: {
    ability: "Competitive",
    nature: "Modest",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Wish", "Protect", "Stealth Rock"],
    items: ["Life Orb", "Leftovers", "Heavy-Duty Boots", "Heat Rock"]
  },
  Zubat: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Assurance", "Protect"],
    items: ["Eviolite"]
  },
  Golbat: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Assurance", "Protect"],
    items: ["Eviolite"]
  },
  Oddish: {
    ability: "Chlorophyll",
    nature: "Sassy",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 2,
      def: 15,
      spa: 2,
      spd: 15,
      spe: 0
    },
    moves: ["Sludge Bomb", "Strength Sap", "Leech Seed", "Toxic"],
    items: ["Eviolite"]
  },
  Gloom: {
    ability: "Stench",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 2,
      def: 23,
      spa: 2,
      spd: 7,
      spe: 0
    },
    moves: ["Strength Sap", "Sludge Bomb", "Leech Seed", "Toxic"],
    items: ["Eviolite"]
  },
  Vileplume: {
    ability: "Chlorophyll",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Wave", "Giga Drain", "Strength Sap", "Leech Seed"],
    items: ["Leftovers"]
  },
  Paras: {
    ability: "Effect Spore",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brick Break", "Bug Bite", "Protect"],
    items: ["Eviolite"]
  },
  Parasect: {
    ability: "Effect Spore",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brick Break", "Bug Bite", "Protect"],
    items: ["Leftovers"]
  },
  Venonat: {
    ability: "Compound Eyes",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 23,
      spa: 0,
      spd: 10,
      spe: 0
    },
    moves: ["Sleep Powder", "Rage Powder", "Toxic", "Disable"],
    items: ["Eviolite"]
  },
  Venomoth: {
    ability: "Tinted Lens",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Quiver Dance", "Bug Buzz", "Sludge Wave", "Psychic"],
    items: ["Heavy-Duty Boots"]
  },
  Diglett: {
    ability: "Arena Trap",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Earthquake", "Foul Play", "Sucker Punch", "Endeavor"],
    items: ["Focus Sash"]
  },
  "Diglett-Alola": {
    ability: "Tangling Hair",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 6,
      atk: 30,
      def: 5,
      spa: 0,
      spd: 0,
      spe: 25
    },
    moves: ["Earthquake", "Rock Blast", "Stealth Rock", "Memento"],
    items: ["Life Orb", "Focus Sash", "Heat Rock"]
  },
  Dugtrio: {
    ability: "Arena Trap",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Endeavor", "Protect", "Stomping Tantrum", "Helping Hand"],
    items: ["Focus Sash"]
  },
  "Dugtrio-Alola": {
    ability: "Tangling Hair",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stealth Rock", "Earthquake", "Iron Head", "Stone Edge"],
    items: ["Life Orb"]
  },
  Meowth: {
    ability: "Technician",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 30,
      def: 10,
      spa: 0,
      spd: 0,
      spe: 25
    },
    moves: ["U-turn", "Aerial Ace", "Fake Out", "Feint"],
    items: ["Life Orb", "Loaded Dice", "Eviolite"]
  },
  "Meowth-Alola": {
    ability: "Technician",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 25,
      spd: 15,
      spe: 25
    },
    moves: ["Thunderbolt", "Dark Pulse", "Icy Wind", "Nasty Plot"],
    items: ["Life Orb", "Eviolite"]
  },
  "Meowth-Galar": {
    ability: "Tough Claws",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 6,
      atk: 20,
      def: 30,
      spa: 0,
      spd: 5,
      spe: 5
    },
    moves: ["Iron Head", "U-turn", "Fake Out", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Persian: {
    ability: "Technician",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Last Resort", "U-turn", "Fake Out"],
    items: ["Silk Scarf", "Heavy-Duty Boots", "Choice Band", "Scope Lens"]
  },
  "Persian-Alola": {
    ability: "Fur Coat",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Parting Shot", "Foul Play", "Knock Off", "Taunt"],
    items: ["Heavy-Duty Boots"]
  },
  Psyduck: {
    ability: "Swift Swim",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 30,
      spd: 5,
      spe: 30
    },
    moves: ["Ice Beam", "Surf", "Psychic", "Nasty Plot"],
    items: ["Eviolite"]
  },
  Golduck: {
    ability: "Cloud Nine",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Psyshock", "Hydro Pump", "Encore"],
    items: ["Life Orb"]
  },
  Mankey: {
    ability: "Defiant",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Close Combat", "Earthquake", "Ice Punch", "U-turn"],
    items: ["Choice Scarf", "Eviolite"]
  },
  Primeape: {
    ability: "Defiant",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stealth Rock", "Close Combat", "Rage Fist", "U-turn"],
    items: ["Eviolite"]
  },
  Growlithe: {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Flamethrower", "Wild Charge", "Psychic Fangs"],
    items: ["Choice Scarf", "Eviolite", "Choice Band", "Assault Vest", "Heavy-Duty Boots", "Leftovers", "Heat Rock", "Expert Belt"]
  },
  "Growlithe-Hisui": {
    ability: "Rock Head",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 6,
      atk: 30,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 30
    },
    moves: ["Head Smash", "Flare Blitz", "Psychic Fangs", "Sleep Talk"],
    items: ["Choice Scarf", "Eviolite"]
  },
  Arcanine: {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 17,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 16
    },
    moves: ["Flare Blitz", "Close Combat", "Extreme Speed", "Protect"],
    items: ["Black Belt"]
  },
  "Arcanine-Hisui": {
    ability: "Rock Head",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Head Smash", "Flare Blitz", "Extreme Speed", "Protect"],
    items: ["Focus Sash", "Sitrus Berry"]
  },
  Poliwag: {
    ability: "Water Absorb",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 15,
      spa: 25,
      spd: 0,
      spe: 25
    },
    moves: ["Hydro Pump", "Psychic", "Hypnosis", "Protect"],
    items: ["Life Orb"]
  },
  Poliwhirl: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Icy Wind", "Encore", "Protect", "Haze"],
    items: ["Focus Sash", "Eviolite"]
  },
  Poliwrath: {
    ability: "Water Absorb",
    nature: "Careful",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 1
    },
    moves: ["Bulk Up", "Substitute", "Drain Punch", "Knock Off"],
    items: ["Leftovers"]
  },
  Abra: {
    ability: "Magic Guard",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Psychic", "Shadow Ball", "Grass Knot", "Protect"],
    items: ["Eviolite"]
  },
  Kadabra: {
    ability: "Synchronize",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dazzling Gleam", "Protect"],
    items: ["Eviolite"]
  },
  Alakazam: {
    ability: "Inner Focus",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Light Screen", "Reflect", "Speed Swap", "Psychic"],
    items: ["Alakazite"]
  },
  "Alakazam-Mega": {
    ability: "Trace",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Light Screen", "Reflect", "Speed Swap", "Psychic"],
    items: ["Alakazite"]
  },
  Machop: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Body Slam", "Brick Break", "Protect"],
    items: ["Eviolite"]
  },
  Machoke: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Body Slam", "Brick Break", "Protect"],
    items: ["Eviolite"]
  },
  Machamp: {
    ability: "No Guard",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Dynamic Punch", "Stone Edge", "Ice Punch", "Bullet Punch"],
    items: ["Lum Berry"]
  },
  Bellsprout: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Solar Beam", "Sludge Bomb", "Weather Ball", "Sleep Powder"],
    items: ["Life Orb"]
  },
  Weepinbell: {
    ability: "Chlorophyll",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 32,
      def: 14,
      spa: 0,
      spd: 19,
      spe: 0
    },
    moves: ["Seed Bomb", "Power Whip", "Swords Dance", "Protect"],
    items: ["Eviolite"]
  },
  Victreebel: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 25,
      atk: 0,
      def: 9,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Strength Sap", "Sludge Bomb", "Protect", "Energy Ball"],
    items: ["Victreebelite"]
  },
  "Victreebel-Mega": {
    ability: "Innards Out",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 25,
      atk: 0,
      def: 9,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Strength Sap", "Sludge Bomb", "Protect", "Energy Ball"],
    items: ["Victreebelite"]
  },
  Tentacool: {
    ability: "Clear Body",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Knock Off", "Flip Turn", "Rapid Spin"],
    items: ["Eviolite"]
  },
  Tentacruel: {
    ability: "Clear Body",
    nature: "Modest",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Sludge Bomb", "Muddy Water", "Tera Blast", "Ice Beam"],
    items: ["Choice Specs"]
  },
  Geodude: {
    ability: "Sturdy",
    nature: "Adamant",
    teraType: "Rock",
    evs: {
      hp: 1,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Explosion", "Earthquake", "Rock Blast", "Stealth Rock"],
    items: ["Custap Berry", "Eviolite", "Oran Berry", "Heavy-Duty Boots", "Leftovers", "Stone Plate", "Rocky Helmet", "Choice Band", "Heat Rock", "Focus Sash", "Loaded Dice"]
  },
  "Geodude-Alola": {
    ability: "Galvanize",
    nature: "Impish",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 2,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Explosion", "Earthquake", "Body Slam", "Protect"],
    items: ["Eviolite", "Salac Berry", "Focus Sash"]
  },
  Graveler: {
    ability: "Sturdy",
    nature: "Impish",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Rock Slide", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  "Graveler-Alola": {
    ability: "Galvanize",
    nature: "Impish",
    teraType: "Electric",
    evs: {
      hp: 17,
      atk: 23,
      def: 11,
      spa: 0,
      spd: 15,
      spe: 0
    },
    moves: ["Body Slam", "Rock Slide", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  Golem: {
    ability: "Sturdy",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Explosion", "Earthquake", "Rock Blast", "Stealth Rock"],
    items: ["Custap Berry", "Focus Sash", "Loaded Dice"]
  },
  "Golem-Alola": {
    ability: "Magnet Pull",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Wild Charge", "Brick Break", "Earthquake", "Fire Punch"],
    items: ["Choice Band"]
  },
  Ponyta: {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Bounce", "Double Kick", "Protect"],
    items: ["Eviolite"]
  },
  "Ponyta-Galar": {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Bounce", "Double Kick", "Protect"],
    items: ["Eviolite"]
  },
  Rapidash: {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Bounce", "Double Kick", "Protect"],
    items: ["Leftovers"]
  },
  "Rapidash-Galar": {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Bounce", "Drill Run", "Protect"],
    items: ["Leftovers"]
  },
  Slowpoke: {
    ability: "Regenerator",
    nature: "Modest",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Surf", "Psychic", "Slack Off", "Thunder Wave"],
    items: ["Eviolite"]
  },
  "Slowpoke-Galar": {
    ability: "Gluttony",
    nature: "Brave",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Liquidation", "Zen Headbutt", "Trick Room", "Belly Drum"],
    items: ["Aguav Berry", "Sitrus Berry"]
  },
  Slowbro: {
    ability: "Oblivious",
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 3,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Ice Beam", "Body Press", "Skill Swap", "Trick Room"],
    items: ["Slowbronite"]
  },
  "Slowbro-Galar": {
    ability: "Quick Draw",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Psychic", "Scald", "Shadow Ball", "Focus Blast"],
    items: ["Choice Scarf"]
  },
  "Slowbro-Mega": {
    ability: "Shell Armor",
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 3,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Ice Beam", "Body Press", "Skill Swap", "Trick Room"],
    items: ["Slowbronite"]
  },
  Magnemite: {
    ability: "Sturdy",
    nature: "Modest",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 0,
      def: 5,
      spa: 30,
      spd: 0,
      spe: 30
    },
    moves: ["Thunderbolt", "Flash Cannon", "Tera Blast", "Volt Switch"],
    items: ["Choice Scarf", "Eviolite"]
  },
  Magneton: {
    ability: "Analytic",
    nature: "Modest",
    teraType: "Grass",
    evs: {
      hp: 23,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 11
    },
    moves: ["Thunderbolt", "Flash Cannon", "Volt Switch", "Tera Blast"],
    items: ["Eviolite"]
  },
  "Farfetch’d": {
    ability: "Keen Eye",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  "Farfetch’d-Galar": {
    ability: "Steadfast",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Body Slam", "Brave Bird", "Protect"],
    items: ["Eviolite"]
  },
  Doduo: {
    ability: "Early Bird",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Tera Blast", "Quick Attack", "Protect"],
    items: ["Life Orb", "Heavy-Duty Boots", "Eviolite", "Oran Berry"]
  },
  Dodrio: {
    ability: "Tangled Feet",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Brave Bird", "Low Kick", "Quick Attack"],
    items: ["Heavy-Duty Boots"]
  },
  Seel: {
    ability: "Thick Fat",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flip Turn", "Aqua Jet", "Fake Out", "Triple Axel"],
    items: ["Eviolite"]
  },
  Dewgong: {
    ability: "Thick Fat",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 4,
      spd: 2,
      spe: 27
    },
    moves: ["Flip Turn", "Knock Off", "Encore", "Blizzard"],
    items: ["Heavy-Duty Boots"]
  },
  Grimer: {
    ability: "Sticky Hold",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Fire Punch", "Shadow Sneak", "Memento"],
    items: ["Eviolite", "Eject Button"]
  },
  "Grimer-Alola": {
    ability: "Poison Touch",
    nature: "Brave",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 25,
      def: 25,
      spa: 0,
      spd: 15,
      spe: 0
    },
    moves: ["Gunk Shot", "Drain Punch", "Knock Off", "Shadow Sneak"],
    items: ["Eviolite"]
  },
  Muk: {
    ability: "Sticky Hold",
    nature: "Impish",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Poison Jab", "Knock Off", "Rest", "Sleep Talk"],
    items: ["Heavy-Duty Boots"]
  },
  "Muk-Alola": {
    ability: "Power of Alchemy",
    nature: "Impish",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 25,
      spa: 0,
      spd: 8,
      spe: 0
    },
    moves: ["Knock Off", "Protect", "Minimize", "Toxic"],
    items: ["Leftovers"]
  },
  Shellder: {
    ability: "Skill Link",
    nature: "Adamant",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Liquidation", "Rock Blast", "Icicle Spear", "Shell Smash"],
    items: ["Eviolite"]
  },
  Cloyster: {
    ability: "Skill Link",
    nature: "Adamant",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Shell Smash", "Icicle Spear", "Drill Run", "Tera Blast"],
    items: ["White Herb"]
  },
  Gastly: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Shadow Ball", "Dark Pulse", "Haze", "Destiny Bond"],
    items: ["Focus Sash"]
  },
  Haunter: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Shadow Ball", "Sludge Bomb", "Psychic", "Trick"],
    items: ["Choice Scarf"]
  },
  Gengar: {
    ability: "Cursed Body",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 30,
      atk: 0,
      def: 11,
      spa: 1,
      spd: 10,
      spe: 14
    },
    moves: ["Sludge Bomb", "Shadow Ball", "Protect", "Perish Song"],
    items: ["Gengarite"]
  },
  "Gengar-Mega": {
    ability: "Shadow Tag",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 30,
      atk: 0,
      def: 11,
      spa: 1,
      spd: 10,
      spe: 14
    },
    moves: ["Sludge Bomb", "Shadow Ball", "Protect", "Perish Song"],
    items: ["Gengarite"]
  },
  Onix: {
    ability: "Rock Head",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Body Press", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Drowzee: {
    ability: "Insomnia",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 10,
      spa: 32,
      spd: 0,
      spe: 23
    },
    moves: ["Psychic", "Draining Kiss", "Trailblaze", "Nasty Plot"],
    items: ["Eviolite"]
  },
  Hypno: {
    ability: "Inner Focus",
    nature: "Bold",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Foul Play", "Trick Room", "Endeavor", "Disable"],
    items: ["Mental Herb", "Focus Sash", "Iapapa Berry", "Sitrus Berry", "Colbur Berry", "Aguav Berry", "Flame Orb"]
  },
  Krabby: {
    ability: "Hyper Cutter",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Body Slam", "Brick Break", "Protect"],
    items: ["Eviolite"]
  },
  Kingler: {
    ability: "Hyper Cutter",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Brick Break", "Brutal Swing", "Protect"],
    items: ["Leftovers"]
  },
  Voltorb: {
    ability: "Static",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Thunderbolt", "Tera Blast", "Volt Switch", "Taunt"],
    items: ["Life Orb", "Wise Glasses", "Eviolite"]
  },
  "Voltorb-Hisui": {
    ability: "Static",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 6,
      atk: 0,
      def: 5,
      spa: 30,
      spd: 0,
      spe: 25
    },
    moves: ["Thunderbolt", "Tera Blast", "Giga Drain", "Volt Switch"],
    items: ["Eviolite"]
  },
  Electrode: {
    ability: "Soundproof",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Explosion", "Thunderbolt", "Tera Blast", "Volt Switch"],
    items: ["Heavy-Duty Boots", "Choice Scarf", "Choice Specs"]
  },
  "Electrode-Hisui": {
    ability: "Static",
    nature: "Modest",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 0,
      def: 8,
      spa: 30,
      spd: 1,
      spe: 26
    },
    moves: ["Taunt", "Electroweb", "Protect", "Leaf Storm"],
    items: ["Magnet"]
  },
  Exeggcute: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Solar Beam", "Psychic", "Tera Blast", "Sleep Powder"],
    items: ["Life Orb"]
  },
  Exeggutor: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Expanding Force", "Sleep Powder", "Trick Room", "Energy Ball"],
    items: ["Focus Sash"]
  },
  "Exeggutor-Alola": {
    ability: "Harvest",
    nature: "Quiet",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 13,
      spa: 5,
      spd: 15,
      spe: 0
    },
    moves: ["Trick Room", "Draco Meteor", "Sleep Powder", "Leaf Storm"],
    items: ["Sitrus Berry"]
  },
  Cubone: {
    ability: "Rock Head",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Slam", "Bone Club", "Protect"],
    items: ["Eviolite"]
  },
  Marowak: {
    ability: "Rock Head",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Slam", "Bone Club", "Protect"],
    items: ["Leftovers"]
  },
  "Marowak-Alola": {
    ability: "Cursed Body",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Slam", "Bone Club", "Protect"],
    items: ["Leftovers"]
  },
  Hitmonlee: {
    ability: "Unburden",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Close Combat", "Knock Off", "Poison Jab"],
    items: ["Grassy Seed"]
  },
  Hitmonchan: {
    ability: "Iron Fist",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 3,
      def: 0,
      spa: 0,
      spd: 31,
      spe: 0
    },
    moves: ["Drain Punch", "Knock Off", "Mach Punch", "Rapid Spin"],
    items: ["Heavy-Duty Boots"]
  },
  Lickitung: {
    ability: "Own Tempo",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Belch", "Blizzard", "Protect"],
    items: ["Eviolite"]
  },
  Koffing: {
    ability: "Neutralizing Gas",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Thunderbolt", "Will-O-Wisp", "Pain Split"],
    items: ["Eviolite"]
  },
  Weezing: {
    ability: "Neutralizing Gas",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 1,
      spd: 30,
      spe: 1
    },
    moves: ["Sludge Bomb", "Protect", "Taunt", "Will-O-Wisp"],
    items: ["Covert Cloak", "Mental Herb", "Sitrus Berry", "Choice Scarf"]
  },
  "Weezing-Galar": {
    ability: "Neutralizing Gas",
    nature: "Bold",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 1,
      spd: 29,
      spe: 2
    },
    moves: ["Protect", "Poison Gas", "Toxic Spikes", "Taunt"],
    items: ["Sitrus Berry", "Covert Cloak", "Wide Lens", "Safety Goggles"]
  },
  Rhyhorn: {
    ability: "Lightning Rod",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 30,
      def: 0,
      spa: 0,
      spd: 15,
      spe: 20
    },
    moves: ["Earthquake", "Rock Blast", "Rock Polish", "Swords Dance"],
    items: ["Eviolite"]
  },
  Rhydon: {
    ability: "Lightning Rod",
    nature: "Adamant",
    teraType: "Fairy",
    evs: {
      hp: 31,
      atk: 1,
      def: 2,
      spa: 0,
      spd: 31,
      spe: 1
    },
    moves: ["High Horsepower", "Rock Slide", "Protect", "Swords Dance"],
    items: ["Eviolite"]
  },
  Chansey: {
    ability: "Natural Cure",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Seismic Toss", "Soft-Boiled", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Tangela: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Ancient Power", "Confusion", "Protect"],
    items: ["Eviolite"]
  },
  Kangaskhan: {
    ability: "Scrappy",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 31,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Double-Edge", "Hammer Arm", "Ice Punch", "Fake Out"],
    items: ["Kangaskhanite"]
  },
  "Kangaskhan-Mega": {
    ability: "Parental Bond",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 31,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Double-Edge", "Hammer Arm", "Ice Punch", "Fake Out"],
    items: ["Kangaskhanite"]
  },
  Horsea: {
    ability: "Swift Swim",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Ice Beam", "Surf", "Dragon Pulse", "Flash Cannon"],
    items: ["Scope Lens", "Choice Specs", "Eviolite", "Focus Sash", "Life Orb", "Mystic Water"]
  },
  Seadra: {
    ability: "Sniper",
    nature: "Modest",
    teraType: "Dragon",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Ice Beam", "Surf", "Focus Energy", "Agility"],
    items: ["Scope Lens", "Eviolite"]
  },
  Goldeen: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Body Slam", "Bounce", "Protect"],
    items: ["Eviolite"]
  },
  Seaking: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Body Slam", "Bounce", "Protect"],
    items: ["Leftovers"]
  },
  Staryu: {
    ability: "Illuminate",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Brine", "Bubble Beam", "Protect"],
    items: ["Eviolite"]
  },
  Starmie: {
    ability: "Natural Cure",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Liquidation", "Zen Headbutt", "Aqua Jet", "Protect"],
    items: ["Starminite"]
  },
  "Starmie-Mega": {
    ability: "Huge Power",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Liquidation", "Zen Headbutt", "Aqua Jet", "Protect"],
    items: ["Starminite"]
  },
  "Mr. Mime": {
    ability: "Soundproof",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dazzling Gleam", "Protect"],
    items: ["Leftovers"]
  },
  "Mr. Mime-Galar": {
    ability: "Vital Spirit",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Confusion", "Dazzling Gleam", "Protect"],
    items: ["Eviolite"]
  },
  Scyther: {
    ability: "Technician",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 16,
      atk: 12,
      def: 2,
      spa: 0,
      spd: 4,
      spe: 32
    },
    moves: ["Close Combat", "U-turn", "Dual Wingbeat", "Protect"],
    items: ["Eviolite"]
  },
  Jynx: {
    ability: "Oblivious",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Confusion", "Draining Kiss", "Protect"],
    items: ["Leftovers"]
  },
  Electabuzz: {
    ability: "Vital Spirit",
    nature: "Bold",
    teraType: "Ghost",
    evs: {
      hp: 31,
      atk: 0,
      def: 25,
      spa: 1,
      spd: 1,
      spe: 8
    },
    moves: ["Electroweb", "Follow Me", "Protect", "Taunt"],
    items: ["Eviolite"]
  },
  Magmar: {
    ability: "Vital Spirit",
    nature: "Bold",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 0,
      def: 31,
      spa: 0,
      spd: 3,
      spe: 0
    },
    moves: ["Burning Jealousy", "Clear Smog", "Follow Me", "Protect"],
    items: ["Eviolite"]
  },
  Pinsir: {
    ability: "Hyper Cutter",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Close Combat", "Feint", "Protect"],
    items: ["Pinsirite"]
  },
  "Pinsir-Mega": {
    ability: "Aerilate",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Close Combat", "Feint", "Protect"],
    items: ["Pinsirite"]
  },
  Tauros: {
    ability: "Sheer Force",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Body Slam", "Close Combat", "Throat Chop", "Substitute"],
    items: ["Leftovers"]
  },
  "Tauros-Paldea-Aqua": {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Close Combat", "Wave Crash", "Aqua Jet", "Protect"],
    items: ["Mystic Water", "Sitrus Berry", "Black Belt", "White Herb"]
  },
  "Tauros-Paldea-Blaze": {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Raging Bull", "Close Combat", "Lash Out", "Protect"],
    items: ["White Herb"]
  },
  "Tauros-Paldea-Combat": {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Raging Bull", "Stone Edge", "Throat Chop"],
    items: ["Sitrus Berry"]
  },
  Magikarp: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Tackle", "Splash", "Flail"],
    items: ["Eviolite", "Assault Vest", "Choice Scarf", "Focus Sash", "Heavy-Duty Boots"]
  },
  Gyarados: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 4,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 30
    },
    moves: ["Waterfall", "Crunch", "Protect", "Dragon Dance"],
    items: ["Gyaradosite"]
  },
  "Gyarados-Mega": {
    ability: "Mold Breaker",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 4,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 30
    },
    moves: ["Waterfall", "Crunch", "Protect", "Dragon Dance"],
    items: ["Gyaradosite"]
  },
  Lapras: {
    ability: "Water Absorb",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 32,
      spe: 0
    },
    moves: ["Muddy Water", "Freeze-Dry", "Protect", "Perish Song"],
    items: [
      "Leftovers",
      "Safety Goggles",
      "Sitrus Berry",
      "Expert Belt",
      "Assault Vest",
      "Throat Spray",
      "Rocky Helmet",
      "Covert Cloak",
      "Utility Umbrella",
      "Aguav Berry",
      "Wide Lens",
      "Mental Herb",
      "Mago Berry",
      "Weakness Policy",
      "Light Clay",
      "Chesto Berry"
    ]
  },
  Ditto: {
    ability: "Imposter",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Transform"],
    items: ["Focus Sash"]
  },
  Eevee: {
    ability: "Adaptability",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Double-Edge", "Bite", "Quick Attack", "Double Kick"],
    items: ["Choice Band", "Eviolite"]
  },
  Vaporeon: {
    ability: "Water Absorb",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Scald", "Haze", "Wish", "Protect"],
    items: ["Leftovers"]
  },
  Jolteon: {
    ability: "Volt Absorb",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Calm Mind", "Thunderbolt", "Volt Switch", "Alluring Voice"],
    items: ["Leftovers"]
  },
  Flareon: {
    teraType: "",
    ability: "Guts",
    items: ["Sitrus Berry"],
    nature: "Serious",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Flare Blitz", "Facade", "Protect", "Copycat"]
  },
  Porygon: {
    ability: "Trace",
    nature: "Brave",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Double-Edge", "Shadow Ball", "Recover", "Agility"],
    items: ["Eviolite", "Lum Berry"]
  },
  Omanyte: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Aurora Beam", "Blizzard", "Protect"],
    items: ["Eviolite"]
  },
  Omastar: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  Kabuto: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Jet", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Kabutops: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Jet", "Aqua Tail", "Protect"],
    items: ["Leftovers"]
  },
  Aerodactyl: {
    ability: "Unnerve",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Rock Slide", "Tailwind", "Protect", "Wide Guard"],
    items: ["Focus Sash"]
  },
  "Aerodactyl-Mega": {
    ability: "Tough Claws",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 22,
      atk: 12,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Rock Slide", "Ice Fang", "Dual Wingbeat", "Tailwind"],
    items: ["Aerodactylite"]
  },
  Snorlax: {
    ability: "Thick Fat",
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Double-Edge", "Protect", "Yawn", "Fissure"],
    items: ["Leftovers", "Sitrus Berry"]
  },
  Articuno: {
    ability: "Snow Cloak",
    nature: "Modest",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 0,
      def: 6,
      spa: 25,
      spd: 1,
      spe: 2
    },
    moves: ["Blizzard", "Ice Beam", "Freeze-Dry", "Sheer Cold"],
    items: ["Choice Specs"]
  },
  "Articuno-Galar": {
    ability: "Competitive",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Calm Mind", "Recover", "Hurricane", "Freezing Glare"],
    items: ["Leftovers"]
  },
  Zapdos: {
    ability: "Static",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 31,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Hurricane", "Volt Switch", "Thunder Wave", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  "Zapdos-Galar": {
    ability: "Defiant",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 8,
      atk: 26,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 30
    },
    moves: ["Brave Bird", "Close Combat", "Dual Wingbeat", "Coaching"],
    items: ["Choice Scarf", "Safety Goggles"]
  },
  Moltres: {
    ability: "Flame Body",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 31,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Flamethrower", "Will-O-Wisp", "Roar", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  "Moltres-Galar": {
    ability: "Berserk",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 31,
      atk: 0,
      def: 20,
      spa: 11,
      spd: 1,
      spe: 3
    },
    moves: ["Fiery Wrath", "Air Slash", "Snarl", "Protect"],
    items: ["Sitrus Berry", "Choice Specs", "Covert Cloak", "Leftovers"]
  },
  Dratini: {
    ability: "Shed Skin",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 4,
      atk: 31,
      def: 10,
      spa: 0,
      spd: 5,
      spe: 16
    },
    moves: ["Outrage", "Extreme Speed", "Waterfall", "Dragon Dance"],
    items: ["Eviolite"]
  },
  Dragonair: {
    ability: "Shed Skin",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 20,
      atk: 32,
      def: 10,
      spa: 0,
      spd: 4,
      spe: 0
    },
    moves: ["Outrage", "Extreme Speed", "Iron Head", "Dragon Dance"],
    items: ["Eviolite"]
  },
  Dragonite: {
    ability: "Inner Focus",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 31,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 3
    },
    moves: ["Extreme Speed", "Dragon Claw", "Protect", "Low Kick"],
    items: ["Life Orb", "Dragon Fang", "Lum Berry"]
  },
  "Dragonite-Mega": {
    ability: "Multiscale",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Heat Wave", "Dragon Pulse", "Protect", "Tailwind"],
    items: ["Dragoninite"]
  },
  Mewtwo: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Psystrike", "Grass Knot", "Taunt"],
    items: ["Heavy-Duty Boots"]
  },
  "Mewtwo-Mega-X": {
    ability: "Steadfast",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Zen Headbutt", "Ice Punch", "Bulk Up", "Protect"],
    items: ["Mewtwonite X"]
  },
  "Mewtwo-Mega-Y": {
    ability: "Insomnia",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Psystrike", "Grass Knot", "Taunt"],
    items: ["Mewtwonite Y"]
  },
  Mew: {
    ability: "Synchronize",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 2,
      def: 12,
      spa: 0,
      spd: 0,
      spe: 20
    },
    moves: ["Spikes", "Stealth Rock", "Will-O-Wisp", "Taunt"],
    items: ["Red Card"]
  },
  Chikorita: {
    ability: "Overgrow",
    nature: "Modest",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Leaf Storm", "Encore", "Light Screen", "Counter"],
    items: ["Focus Sash"]
  },
  Bayleef: {
    ability: "Overgrow",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Body Slam", "Substitute", "Leech Seed", "Swords Dance"],
    items: ["Eviolite"]
  },
  Meganium: {
    ability: "Overgrow",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 22,
      atk: 0,
      def: 0,
      spa: 27,
      spd: 0,
      spe: 17
    },
    moves: ["Solar Beam", "Dazzling Gleam", "Weather Ball", "Protect"],
    items: ["Meganiumite"]
  },
  "Meganium-Mega": {
    ability: "Mega Sol",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 22,
      atk: 0,
      def: 0,
      spa: 27,
      spd: 0,
      spe: 17
    },
    moves: ["Solar Beam", "Dazzling Gleam", "Weather Ball", "Protect"],
    items: ["Meganiumite"]
  },
  Cyndaquil: {
    ability: "Flash Fire",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 11,
      atk: 0,
      def: 0,
      spa: 25,
      spd: 0,
      spe: 30
    },
    moves: ["Eruption", "Fire Blast", "Extrasensory", "Tera Blast"],
    items: ["Choice Scarf", "Choice Specs"]
  },
  Quilava: {
    ability: "Blaze",
    nature: "Modest",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 0,
      def: 12,
      spa: 32,
      spd: 5,
      spe: 16
    },
    moves: ["Flamethrower", "Heat Wave", "Overheat", "Protect"],
    items: ["Eviolite"]
  },
  Typhlosion: {
    ability: "Flash Fire",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Eruption", "Rock Tomb", "Flamethrower", "Protect"],
    items: ["Charcoal"]
  },
  "Typhlosion-Hisui": {
    ability: "Blaze",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Eruption", "Overheat", "Heat Wave", "Shadow Ball"],
    items: ["Choice Scarf", "Charcoal"]
  },
  Totodile: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Liquidation", "Ice Punch", "Dragon Dance", "Protect"],
    items: ["Life Orb"]
  },
  Croconaw: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Liquidation", "Crunch", "Rock Slide", "Dragon Dance"],
    items: ["Life Orb", "Eviolite"]
  },
  Feraligatr: {
    ability: "Torrent",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Double-Edge", "Liquidation", "Protect", "Dragon Dance"],
    items: ["Feraligite"]
  },
  "Feraligatr-Mega": {
    ability: "Dragonize",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Double-Edge", "Liquidation", "Protect", "Dragon Dance"],
    items: ["Feraligite"]
  },
  Sentret: {
    ability: "Frisk",
    nature: "Quiet",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Endeavor", "Follow Me", "Endure", "Knock Off"],
    items: ["Focus Sash"]
  },
  Furret: {
    ability: "Frisk",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Body Slam", "Knock Off", "Tidy Up", "Endeavor"],
    items: ["Heavy-Duty Boots", "Focus Sash"]
  },
  Hoothoot: {
    ability: "Tinted Lens",
    nature: "Modest",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hyper Voice", "Psychic", "Air Slash", "Defog"],
    items: ["Eviolite", "Heavy-Duty Boots", "Assault Vest", "Throat Spray", "Aguav Berry"]
  },
  Noctowl: {
    ability: "Tinted Lens",
    nature: "Modest",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Hurricane", "Moonblast", "Heat Wave", "Hyper Voice"],
    items: ["Choice Specs", "Leftovers"]
  },
  Ledyba: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Bug Buzz", "Giga Drain", "Protect"],
    items: ["Eviolite"]
  },
  Ledian: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Bug Buzz", "Focus Blast", "Protect"],
    items: ["Leftovers"]
  },
  Spinarak: {
    ability: "Insomnia",
    nature: "Careful",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Foul Play", "Leech Life", "Knock Off", "Shadow Sneak"],
    items: ["Eviolite", "Focus Sash"]
  },
  Ariados: {
    ability: "Insomnia",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Shadow Sneak", "Rage Powder", "First Impression", "Poison Jab"],
    items: ["Silver Powder"]
  },
  Crobat: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  Chinchou: {
    ability: "Volt Absorb",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hydro Pump", "Ice Beam", "Thunderbolt", "Volt Switch"],
    items: ["Eviolite", "Choice Scarf"]
  },
  Lanturn: {
    ability: "Volt Absorb",
    nature: "Calm",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Volt Switch", "Scald", "Rest", "Sleep Talk"],
    items: ["Heavy-Duty Boots"]
  },
  Pichu: {
    ability: "Lightning Rod",
    nature: "Hardy",
    teraType: "Electric",
    evs: {
      hp: 6,
      atk: 0,
      def: 30,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Surf", "Thunderbolt", "Play Rough", "Fake Out"],
    items: ["Eviolite", "Leftovers", "Life Orb", "Light Ball", "Focus Sash", "Heavy-Duty Boots", "Choice Specs", "Quick Claw", "Choice Band", "Rocky Helmet"]
  },
  Cleffa: {
    ability: "Magic Guard",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Alluring Voice", "Draining Kiss", "Calm Mind", "Sunny Day"],
    items: ["Eviolite", "Leftovers", "Life Orb", "Light Clay", "Choice Specs", "Heavy-Duty Boots", "Focus Sash"]
  },
  Igglybuff: {
    ability: "Cute Charm",
    nature: "Calm",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Draining Kiss", "Wish", "Thunder Wave", "Protect"],
    items: ["Eviolite", "Life Orb", "Leftovers", "Focus Sash", "Heat Rock", "Heavy-Duty Boots"]
  },
  Togepi: {
    ability: "Hustle",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Dazzling Gleam", "Draining Kiss", "Protect"],
    items: ["Eviolite"]
  },
  Togetic: {
    ability: "Hustle",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Dazzling Gleam", "Draining Kiss", "Protect"],
    items: ["Eviolite"]
  },
  Natu: {
    ability: "Synchronize",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Dazzling Gleam", "Dream Eater", "Protect"],
    items: ["Eviolite"]
  },
  Xatu: {
    ability: "Synchronize",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Dazzling Gleam", "Dream Eater", "Protect"],
    items: ["Leftovers"]
  },
  Mareep: {
    ability: "Illuminate",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 31,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 25,
      spe: 10
    },
    moves: ["Body Press", "Discharge", "Slack Off", "Cotton Guard"],
    items: ["Eviolite"]
  },
  Flaaffy: {
    ability: "Static",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 32,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Thunderbolt", "Dazzling Gleam", "Cotton Guard", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Ampharos: {
    ability: "Static",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Thunderbolt", "Protect", "Meteor Beam", "Dazzling Gleam"],
    items: ["Ampharosite"]
  },
  "Ampharos-Mega": {
    ability: "Mold Breaker",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Thunderbolt", "Protect", "Meteor Beam", "Dazzling Gleam"],
    items: ["Ampharosite"]
  },
  Bellossom: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Quiver Dance", "Strength Sap", "Giga Drain", "Sludge Bomb"],
    items: ["Heavy-Duty Boots"]
  },
  Marill: {
    ability: "Sap Sipper",
    nature: "Calm",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 5,
      spa: 0,
      spd: 28,
      spe: 0
    },
    moves: ["Whirlpool", "Perish Song", "Protect", "Charm"],
    items: ["Eviolite"]
  },
  Azumarill: {
    ability: "Huge Power",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 29,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 5
    },
    moves: ["Play Rough", "Aqua Jet", "Belly Drum", "Protect"],
    items: ["Sitrus Berry"]
  },
  Sudowoodo: {
    ability: "Sturdy",
    nature: "Impish",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Head Smash", "Earthquake", "Stealth Rock", "Spikes"],
    items: ["Custap Berry", "Assault Vest"]
  },
  Politoed: {
    ability: "Drizzle",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 24,
      spa: 0,
      spd: 7,
      spe: 3
    },
    moves: ["Weather Ball", "Protect", "Perish Song", "Encore"],
    items: ["Sitrus Berry", "Mystic Water", "Leftovers"]
  },
  Hoppip: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 14,
      atk: 0,
      def: 13,
      spa: 0,
      spd: 13,
      spe: 26
    },
    moves: ["Leech Seed", "Strength Sap", "Sleep Powder", "Cotton Guard"],
    items: ["Yache Berry", "Eviolite", "Leftovers", "Clear Amulet", "Choice Specs", "Black Sludge", "Loaded Dice"]
  },
  Skiploom: {
    ability: "Chlorophyll",
    nature: "Calm",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Seed Bomb", "Leech Seed", "Sleep Powder", "Protect"],
    items: ["Eviolite"]
  },
  Jumpluff: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 26,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 26,
      spe: 14
    },
    moves: ["Pollen Puff", "Tailwind", "Sleep Powder", "Encore"],
    items: ["Covert Cloak"]
  },
  Aipom: {
    ability: "Skill Link",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Fake Out", "U-turn", "Knock Off", "Foul Play"],
    items: ["Eviolite"]
  },
  Sunkern: {
    ability: "Solar Power",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 25,
      spd: 15,
      spe: 25
    },
    moves: ["Solar Beam", "Earth Power", "Giga Drain", "Weather Ball"],
    items: ["Choice Scarf", "Focus Sash", "Red Card", "Eviolite"]
  },
  Sunflora: {
    ability: "Solar Power",
    nature: "Quiet",
    teraType: "Fire",
    evs: {
      hp: 20,
      atk: 0,
      def: 15,
      spa: 31,
      spd: 0,
      spe: 0
    },
    moves: ["Earth Power", "Energy Ball", "Dazzling Gleam", "Weather Ball"],
    items: ["Choice Specs", "Life Orb", "Iron Ball", "Miracle Seed"]
  },
  Yanma: {
    ability: "Speed Boost",
    nature: "Modest",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Bug Buzz", "Tera Blast", "Air Slash", "Protect"],
    items: ["Throat Spray", "Heavy-Duty Boots"]
  },
  Wooper: {
    ability: "Unaware",
    nature: "Calm",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Ice Beam", "Recover", "Yawn", "Spikes"],
    items: ["Eviolite"]
  },
  "Wooper-Paldea": {
    ability: "Water Absorb",
    nature: "Careful",
    teraType: "Steel",
    evs: {
      hp: 6,
      atk: 0,
      def: 30,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Earthquake", "Recover", "Spikes", "Toxic"],
    items: ["Eviolite"]
  },
  Quagsire: {
    ability: "Unaware",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 2,
      def: 29,
      spa: 0,
      spd: 3,
      spe: 0
    },
    moves: ["Stealth Rock", "Earthquake", "Recover", "Toxic"],
    items: ["Heavy-Duty Boots"]
  },
  Espeon: {
    ability: "Magic Bounce",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Expanding Force", "Protect", "Shadow Ball", "Power Gem"],
    items: ["Leftovers"]
  },
  Umbreon: {
    ability: "Inner Focus",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 29,
      spa: 0,
      spd: 5,
      spe: 0
    },
    moves: ["Foul Play", "Taunt", "Yawn", "Helping Hand"],
    items: ["Leftovers"]
  },
  Murkrow: {
    ability: "Prankster",
    nature: "Bold",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 18,
      spa: 0,
      spd: 15,
      spe: 0
    },
    moves: ["Foul Play", "Tailwind", "Haze", "Sunny Day"],
    items: ["Eviolite"]
  },
  Slowking: {
    ability: "Regenerator",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 23,
      spa: 1,
      spd: 10,
      spe: 0
    },
    moves: ["Scald", "Psychic Noise", "Trick Room", "Chilly Reception"],
    items: ["Colbur Berry"]
  },
  "Slowking-Galar": {
    ability: "Regenerator",
    nature: "Sassy",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 17,
      spa: 2,
      spd: 15,
      spe: 0
    },
    moves: ["Sludge Bomb", "Psychic", "Yawn", "Chilly Reception"],
    items: ["Sitrus Berry"]
  },
  Misdreavus: {
    ability: "Levitate",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Hex", "Will-O-Wisp", "Trick Room", "Memento"],
    items: ["Eviolite"]
  },
  Unown: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hidden Power", "Blizzard", "Flash Cannon", "Protect"],
    items: ["Leftovers"]
  },
  Wobbuffet: {
    ability: "Shadow Tag",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Mirror Coat", "Air Cutter", "Air Slash", "Protect"],
    items: ["Leftovers"]
  },
  Girafarig: {
    ability: "Inner Focus",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Hyper Voice", "Thunderbolt", "Twin Beam", "Nasty Plot"],
    items: ["Eviolite"]
  },
  Pineco: {
    ability: "Sturdy",
    nature: "Impish",
    teraType: "Rock",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Explosion", "Rapid Spin", "Spikes", "Counter"],
    items: ["Eviolite", "Custap Berry", "Iapapa Berry", "Loaded Dice", "Heavy-Duty Boots"]
  },
  Forretress: {
    ability: "Sturdy",
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Spikes", "Body Press", "Rapid Spin", "Gyro Ball"],
    items: ["Leftovers"]
  },
  Dunsparce: {
    ability: "Serene Grace",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 28,
      spa: 0,
      spd: 4,
      spe: 1
    },
    moves: ["Body Slam", "Poison Jab", "Roost", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Gligar: {
    ability: "Immunity",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Knock Off", "Stealth Rock", "Toxic"],
    items: ["Eviolite"]
  },
  Steelix: {
    ability: "Rock Head",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Earthquake", "Heavy Slam", "Stone Edge", "Iron Head"],
    items: ["Steelixite"]
  },
  "Steelix-Mega": {
    ability: "Sand Force",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Earthquake", "Heavy Slam", "Stone Edge", "Iron Head"],
    items: ["Steelixite"]
  },
  Snubbull: {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Play Rough", "Psychic Fangs", "Thief", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Granbull: {
    ability: "Intimidate",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 27,
      spa: 0,
      spd: 6,
      spe: 0
    },
    moves: ["Earthquake", "Play Rough", "Thunder Wave", "Roar"],
    items: ["Leftovers", "Expert Belt", "Choice Band", "Rocky Helmet", "Assault Vest"]
  },
  Qwilfish: {
    ability: "Poison Point",
    nature: "Impish",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 2,
      def: 30,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Spikes", "Barb Barrage", "Flip Turn", "Pain Split"],
    items: ["Leftovers", "Sitrus Berry"]
  },
  "Qwilfish-Hisui": {
    ability: "Swift Swim",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Crunch", "Gunk Shot", "Liquidation"],
    items: ["Eviolite"]
  },
  Scizor: {
    ability: "Technician",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Bug Bite", "Bullet Punch", "Protect", "Swords Dance"],
    items: ["Scizorite"]
  },
  "Scizor-Mega": {
    ability: "Technician",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Bug Bite", "Bullet Punch", "Protect", "Swords Dance"],
    items: ["Scizorite"]
  },
  Shuckle: {
    ability: "Sturdy",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Earth Power", "Final Gambit", "Protect"],
    items: ["Leftovers"]
  },
  Heracross: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Facade", "Knock Off", "Megahorn"],
    items: ["Heracronite"]
  },
  "Heracross-Mega": {
    ability: "Skill Link",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Facade", "Knock Off", "Megahorn"],
    items: ["Heracronite"]
  },
  Sneasel: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Ice Shard", "Knock Off", "Icicle Crash"],
    items: ["Heavy-Duty Boots"]
  },
  "Sneasel-Hisui": {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Close Combat", "Gunk Shot", "Throat Chop"],
    items: ["Eviolite"]
  },
  Teddiursa: {
    ability: "Quick Feet",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 6,
      atk: 25,
      def: 5,
      spa: 0,
      spd: 5,
      spe: 25
    },
    moves: ["Earthquake", "Crunch", "Facade", "Swords Dance"],
    items: ["Toxic Orb"]
  },
  Ursaring: {
    ability: "Guts",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 20,
      def: 12,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Earthquake", "Body Slam", "Ice Punch", "Swords Dance"],
    items: ["Eviolite"]
  },
  Slugma: {
    ability: "Weak Armor",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Mud Shot", "Stealth Rock", "Memento", "Protect"],
    items: ["Focus Sash", "Eviolite"]
  },
  Magcargo: {
    ability: "Flame Body",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Power Gem", "Lava Plume", "Recover", "Stealth Rock"],
    items: ["Heavy-Duty Boots", "Focus Sash", "Air Balloon"]
  },
  Swinub: {
    ability: "Oblivious",
    nature: "Adamant",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Earthquake", "Icicle Crash", "Ice Shard", "Stealth Rock"],
    items: ["Eviolite", "Focus Sash", "Choice Band", "Leftovers"]
  },
  Piloswine: {
    ability: "Thick Fat",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Earthquake", "Stealth Rock", "Rock Slide", "Toxic"],
    items: ["Eviolite"]
  },
  Corsola: {
    ability: "Hustle",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  "Corsola-Galar": {
    ability: "Weak Armor",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Blizzard", "Brine", "Protect"],
    items: ["Eviolite"]
  },
  Remoraid: {
    ability: "Hustle",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid Spray", "Aurora Beam", "Blizzard", "Protect"],
    items: ["Eviolite"]
  },
  Octillery: {
    ability: "Suction Cups",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Aurora Beam", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  Delibird: {
    ability: "Vital Spirit",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Icy Wind", "Fake Out", "Endeavor", "Tailwind"],
    items: ["Focus Sash", "Choice Scarf", "Eject Button"]
  },
  Mantine: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  Skarmory: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Brave Bird", "Iron Head", "Rock Tomb", "Protect"],
    items: ["Skarmorite"]
  },
  "Skarmory-Mega": {
    ability: "Stalwart",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Brave Bird", "Iron Head", "Rock Tomb", "Protect"],
    items: ["Skarmorite"]
  },
  Houndour: {
    ability: "Flash Fire",
    nature: "Naive",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Fire Blast", "Dark Pulse", "Sucker Punch", "Flame Charge"],
    items: ["Life Orb", "Eviolite"]
  },
  Houndoom: {
    ability: "Flash Fire",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Dark Pulse", "Fire Blast", "Sludge Bomb"],
    items: ["Houndoominite"]
  },
  "Houndoom-Mega": {
    ability: "Solar Power",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Dark Pulse", "Fire Blast", "Sludge Bomb"],
    items: ["Houndoominite"]
  },
  Kingdra: {
    ability: "Swift Swim",
    nature: "Modest",
    teraType: "Stellar",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Draco Meteor", "Muddy Water", "Weather Ball", "Protect"],
    items: ["Life Orb"]
  },
  Phanpy: {
    ability: "Pickup",
    nature: "Adamant",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Knock Off", "Ice Shard", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Donphan: {
    ability: "Sturdy",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 13,
      def: 18,
      spa: 0,
      spd: 0,
      spe: 3
    },
    moves: ["Earthquake", "Knock Off", "Rapid Spin", "Ice Spinner"],
    items: ["Heavy-Duty Boots"]
  },
  Porygon2: {
    ability: "Download",
    nature: "Quiet",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 16,
      spa: 12,
      spd: 5,
      spe: 0
    },
    moves: ["Ice Beam", "Tera Blast", "Trick Room", "Recover"],
    items: ["Eviolite"]
  },
  Stantler: {
    ability: "Sap Sipper",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 24,
      spa: 0,
      spd: 9,
      spe: 0
    },
    moves: ["Shadow Ball", "Stored Power", "Role Play", "Psych Up"],
    items: ["Eviolite"]
  },
  Smeargle: {
    ability: "Moody",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 10,
      atk: 0,
      def: 25,
      spa: 0,
      spd: 0,
      spe: 31
    },
    moves: ["Fake Out", "Follow Me", "Spore", "Spiky Shield"],
    items: ["Focus Sash"]
  },
  Tyrogue: {
    ability: "Guts",
    nature: "Adamant",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Facade", "Fake Out", "Bullet Punch", "Mach Punch"],
    items: ["Flame Orb", "Toxic Orb", "Eviolite"]
  },
  Hitmontop: {
    ability: "Intimidate",
    nature: "Careful",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Close Combat", "Fake Out", "Wide Guard", "Protect"],
    items: ["Leftovers"]
  },
  Smoochum: {
    ability: "Oblivious",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Confusion", "Draining Kiss", "Protect"],
    items: ["Eviolite"]
  },
  Elekid: {
    ability: "Vital Spirit",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Psychic", "Thunderbolt", "Ice Punch", "Volt Switch"],
    items: ["Eviolite", "Life Orb"]
  },
  Magby: {
    ability: "Vital Spirit",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 1,
      atk: 0,
      def: 8,
      spa: 25,
      spd: 0,
      spe: 32
    },
    moves: ["Fire Blast", "Psychic", "Protect", "Substitute"],
    items: ["Life Orb", "Oran Berry", "Eviolite"]
  },
  Miltank: {
    ability: "Thick Fat",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Body Press", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Blissey: {
    ability: "Natural Cure",
    nature: "Calm",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Seismic Toss", "Soft-Boiled", "Calm Mind", "Stealth Rock"],
    items: ["Heavy-Duty Boots"]
  },
  Raikou: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Calm Mind", "Thunderbolt", "Scald", "Aura Sphere"],
    items: ["Leftovers"]
  },
  Entei: {
    ability: "Inner Focus",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 3,
      atk: 31,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Sacred Fire", "Extreme Speed", "Stomping Tantrum", "Protect"],
    items: ["Life Orb", "Choice Scarf"]
  },
  Suicune: {
    ability: "Pressure",
    nature: "Bold",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Calm Mind", "Scald", "Rest", "Sleep Talk"],
    items: ["Leftovers"]
  },
  Larvitar: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 6,
      atk: 31,
      def: 5,
      spa: 0,
      spd: 0,
      spe: 24
    },
    moves: ["Earthquake", "Stone Edge", "Facade", "Dragon Dance"],
    items: ["Flame Orb"]
  },
  Pupitar: {
    ability: "Shed Skin",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stone Edge", "Earthquake", "Dragon Dance", "Rest"],
    items: ["Eviolite"]
  },
  Tyranitar: {
    ability: "Sand Stream",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Rock Slide", "Ice Punch", "Knock Off", "Low Kick"],
    items: ["Choice Scarf", "Focus Sash", "Chople Berry"]
  },
  "Tyranitar-Mega": {
    ability: "Sand Stream",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 17,
      atk: 18,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 31
    },
    moves: ["Rock Slide", "Knock Off", "Protect", "Low Kick"],
    items: ["Tyranitarite"]
  },
  Lugia: {
    ability: "Multiscale",
    nature: "Calm",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Recover", "Whirlwind", "Aeroblast", "Whirlpool"],
    items: ["Heavy-Duty Boots"]
  },
  "Ho-Oh": {
    ability: "Regenerator",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 27,
      atk: 5,
      def: 24,
      spa: 0,
      spd: 1,
      spe: 9
    },
    moves: ["Brave Bird", "Sacred Fire", "Protect", "Tailwind"],
    items: ["Clear Amulet", "Leftovers", "Rocky Helmet"]
  },
  Celebi: {
    ability: "Natural Cure",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Aura Sphere", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  Treecko: {
    ability: "Unburden",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Upper Hand", "Acrobatics", "Bullet Seed", "Swords Dance"],
    items: ["Grassy Seed"]
  },
  Grovyle: {
    ability: "Unburden",
    nature: "Naive",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Grass Pledge", "Quick Attack", "Endeavor", "Protect"],
    items: ["Focus Sash"]
  },
  Sceptile: {
    ability: "Overgrow",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 19,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 15
    },
    moves: ["Swords Dance", "Leaf Blade", "Acrobatics", "Earthquake"],
    items: ["Sceptilite", "Focus Sash"]
  },
  "Sceptile-Mega": {
    ability: "Lightning Rod",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Leaf Storm", "Dragon Pulse", "Energy Ball", "Protect"],
    items: ["Sceptilite"]
  },
  Torchic: {
    ability: "Speed Boost",
    nature: "Modest",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Fire Blast", "Tera Blast", "Protect", "Will-O-Wisp"],
    items: ["Life Orb"]
  },
  Combusken: {
    ability: "Speed Boost",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 16,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 18
    },
    moves: ["Protect", "Swords Dance", "Close Combat", "Blaze Kick"],
    items: ["Eviolite"]
  },
  Blaziken: {
    ability: "Blaze",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Flare Blitz", "Rock Slide", "Protect"],
    items: ["Blazikenite"]
  },
  "Blaziken-Mega": {
    ability: "Speed Boost",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Flare Blitz", "Rock Slide", "Protect"],
    items: ["Blazikenite"]
  },
  Mudkip: {
    ability: "Torrent",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Liquidation", "Waterfall", "Rock Slide", "Avalanche"],
    items: ["Choice Band", "Eviolite", "Leftovers", "Focus Sash", "Quick Claw", "Expert Belt", "Iapapa Berry"]
  },
  Marshtomp: {
    ability: "Damp",
    nature: "Careful",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 2,
      def: 22,
      spa: 0,
      spd: 10,
      spe: 0
    },
    moves: ["Earthquake", "Liquidation", "Stealth Rock", "Roar"],
    items: ["Eviolite"]
  },
  Swampert: {
    ability: "Torrent",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Wave Crash", "Earthquake", "Ice Punch", "Protect"],
    items: ["Swampertite"]
  },
  "Swampert-Mega": {
    ability: "Swift Swim",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Wave Crash", "Earthquake", "Ice Punch", "Protect"],
    items: ["Swampertite"]
  },
  Poochyena: {
    ability: "Rattled",
    nature: "Hardy",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Foul Play", "Crunch", "Dark Pulse", "Protect"],
    items: ["Quick Claw", "Assault Vest", "Eviolite"]
  },
  Mightyena: {
    ability: "Moxie",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Play Rough", "Sucker Punch", "Ice Fang", "Howl"],
    items: ["Life Orb", "Black Glasses"]
  },
  Zigzagoon: {
    ability: "Pickup",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Charge Beam", "Echoed Voice", "Protect"],
    items: ["Eviolite"]
  },
  "Zigzagoon-Galar": {
    ability: "Pickup",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Grass Knot", "Hyper Voice", "Protect"],
    items: ["Eviolite"]
  },
  Linoone: {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Covet", "Dig", "Protect"],
    items: ["Leftovers"]
  },
  "Linoone-Galar": {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Body Press", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Wurmple: {
    ability: "Shield Dust",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Poison Sting", "Tackle", "Protect"],
    items: ["Eviolite"]
  },
  Silcoon: {
    ability: "Shed Skin",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Aerial Ace", "Bite", "Protect"],
    items: ["Eviolite"]
  },
  Beautifly: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Air Cutter", "Bug Buzz", "Protect"],
    items: ["Leftovers"]
  },
  Cascoon: {
    ability: "Shed Skin",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Bug Bite", "Tackle", "Protect"],
    items: ["Eviolite"]
  },
  Dustox: {
    ability: "Shield Dust",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Buzz", "Confusion", "Electroweb", "Protect"],
    items: ["Leftovers"]
  },
  Lotad: {
    ability: "Rain Dish",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 15,
      spa: 27,
      spd: 14,
      spe: 9
    },
    moves: ["Ice Beam", "Energy Ball", "Chilling Water", "Rain Dance"],
    items: ["Damp Rock", "Eviolite", "Leftovers", "Life Orb", "Quick Claw", "Ability Shield"]
  },
  Lombre: {
    ability: "Rain Dish",
    nature: "Relaxed",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Knock Off", "Rain Dance", "Leech Seed", "Encore"],
    items: ["Eviolite"]
  },
  Ludicolo: {
    ability: "Swift Swim",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 8,
      atk: 0,
      def: 0,
      spa: 30,
      spd: 0,
      spe: 28
    },
    moves: ["Hydro Pump", "Muddy Water", "Tera Blast", "Grass Knot"],
    items: ["Choice Specs"]
  },
  Seedot: {
    ability: "Chlorophyll",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 15,
      def: 0,
      spa: 0,
      spd: 25,
      spe: 25
    },
    moves: ["Bullet Seed", "Leech Seed", "Nasty Plot", "Synthesis"],
    items: ["Loaded Dice", "Eviolite"]
  },
  Nuzleaf: {
    ability: "Chlorophyll",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Solar Blade", "Seed Bomb", "Knock Off", "Protect"],
    items: ["Eviolite"]
  },
  Shiftry: {
    ability: "Chlorophyll",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Solar Blade", "Knock Off", "Low Kick"],
    items: ["Life Orb"]
  },
  Taillow: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brave Bird", "Endeavor", "Protect"],
    items: ["Eviolite"]
  },
  Swellow: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brave Bird", "Endeavor", "Protect"],
    items: ["Leftovers"]
  },
  Wingull: {
    ability: "Hydration",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 0,
      def: 5,
      spa: 30,
      spd: 0,
      spe: 30
    },
    moves: ["Hurricane", "Surf", "Knock Off", "Protect"],
    items: ["Life Orb", "Eviolite"]
  },
  Pelipper: {
    ability: "Drizzle",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 1,
      spa: 5,
      spd: 18,
      spe: 11
    },
    moves: ["Hurricane", "Weather Ball", "Tailwind", "Wide Guard"],
    items: ["Sitrus Berry", "Focus Sash", "Damp Rock", "Life Orb"]
  },
  Ralts: {
    ability: "Trace",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 30,
      spa: 0,
      spd: 20,
      spe: 15
    },
    moves: ["Psychic", "Dazzling Gleam", "Teleport", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Kirlia: {
    ability: "Trace",
    nature: "Sassy",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Trick Room", "Teleport", "Pain Split", "Memento"],
    items: ["Eviolite", "Focus Sash"]
  },
  Gardevoir: {
    ability: "Telepathy",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hyper Voice", "Psychic", "Thunderbolt", "Protect"],
    items: ["Gardevoirite"]
  },
  "Gardevoir-Mega": {
    ability: "Pixilate",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hyper Voice", "Psychic", "Thunderbolt", "Protect"],
    items: ["Gardevoirite"]
  },
  Surskit: {
    ability: "Swift Swim",
    nature: "Hardy",
    teraType: "Bug",
    evs: {
      hp: 4,
      atk: 0,
      def: 31,
      spa: 0,
      spd: 0,
      spe: 31
    },
    moves: ["Bug Bite", "Chilling Water", "Aqua Jet", "Sticky Web"],
    items: ["Focus Sash"]
  },
  Masquerain: {
    ability: "Intimidate",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Protect", "Tailwind", "Soak"],
    items: ["Focus Sash", "Covert Cloak", "Safety Goggles", "Sitrus Berry", "Rocky Helmet", "Eject Button", "Red Card", "Heavy-Duty Boots", "Choice Specs", "Aguav Berry", "Leftovers"]
  },
  Shroomish: {
    ability: "Poison Heal",
    nature: "Bold",
    teraType: "Grass",
    evs: {
      hp: 26,
      atk: 0,
      def: 25,
      spa: 15,
      spd: 0,
      spe: 0
    },
    moves: ["Giga Drain", "Spore", "Protect", "Leech Seed"],
    items: ["Toxic Orb", "Flame Orb", "Eviolite", "Big Root", "Focus Sash", "Quick Claw"]
  },
  Breloom: {
    ability: "Technician",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Spore", "Protect", "Bullet Seed", "Close Combat"],
    items: ["Focus Sash"]
  },
  Slakoth: {
    ability: "Truant",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Body Slam", "Brick Break", "Fire Punch", "Ice Punch"],
    items: ["Choice Band"]
  },
  Vigoroth: {
    ability: "Vital Spirit",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Earthquake", "Body Slam", "Bulk Up", "Slack Off"],
    items: ["Eviolite", "Life Orb"]
  },
  Slaking: {
    ability: "Truant",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 4,
      atk: 31,
      def: 1,
      spa: 0,
      spd: 2,
      spe: 28
    },
    moves: ["Double-Edge", "High Horsepower", "Protect", "Sucker Punch"],
    items: ["Life Orb"]
  },
  Nincada: {
    ability: "Compound Eyes",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bide", "Bug Bite", "Protect"],
    items: ["Eviolite"]
  },
  Ninjask: {
    ability: "Speed Boost",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Bug Bite", "Protect"],
    items: ["Leftovers"]
  },
  Shedinja: {
    ability: "Wonder Guard",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bug Bite", "Dig", "Protect"],
    items: ["Leftovers"]
  },
  Whismur: {
    ability: "Soundproof",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Disarming Voice", "Echoed Voice", "Protect"],
    items: ["Eviolite"]
  },
  Loudred: {
    ability: "Soundproof",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Echoed Voice", "Fire Blast", "Protect"],
    items: ["Eviolite"]
  },
  Exploud: {
    ability: "Soundproof",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Boomburst", "Echoed Voice", "Protect"],
    items: ["Leftovers"]
  },
  Makuhita: {
    ability: "Guts",
    nature: "Brave",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Drain Punch", "Knock Off", "Bullet Punch", "Belly Drum"],
    items: ["Eviolite"]
  },
  Hariyama: {
    ability: "Guts",
    nature: "Brave",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 12,
      spa: 0,
      spd: 21,
      spe: 0
    },
    moves: ["Fake Out", "Close Combat", "Knock Off", "Wide Guard"],
    items: ["Flame Orb"]
  },
  Azurill: {
    ability: "Huge Power",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Body Slam", "Waterfall", "Aqua Jet", "Belly Drum"],
    items: ["Oran Berry", "Choice Band", "Sitrus Berry"]
  },
  Nosepass: {
    ability: "Sturdy",
    nature: "Careful",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "Body Press", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Skitty: {
    ability: "Cute Charm",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Covet", "Double Slap", "Double-Edge", "Protect"],
    items: ["Eviolite"]
  },
  Delcatty: {
    ability: "Cute Charm",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Covet", "Double Slap", "Facade", "Protect"],
    items: ["Leftovers"]
  },
  Sableye: {
    ability: "Prankster",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 9,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Rain Dance", "Light Screen", "Reflect", "Encore"],
    items: ["Roseli Berry", "Light Clay"]
  },
  "Sableye-Mega": {
    ability: "Magic Bounce",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 8,
      spa: 0,
      spd: 26,
      spe: 0
    },
    moves: ["Encore", "Disable", "Rain Dance", "Taunt"],
    items: ["Sablenite"]
  },
  Mawile: {
    ability: "Hyper Cutter",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Play Rough", "Iron Head", "Sucker Punch", "Protect"],
    items: ["Mawilite"]
  },
  "Mawile-Mega": {
    ability: "Huge Power",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Play Rough", "Iron Head", "Sucker Punch", "Protect"],
    items: ["Mawilite"]
  },
  Aron: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Press", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Lairon: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Press", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Aggron: {
    ability: "Sturdy",
    nature: "Impish",
    teraType: "",
    evs: {
      hp: 32,
      atk: 14,
      def: 20,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Protect", "Heavy Slam", "Body Press", "Iron Defense"],
    items: ["Aggronite"]
  },
  "Aggron-Mega": {
    ability: "Filter",
    nature: "Impish",
    teraType: "",
    evs: {
      hp: 32,
      atk: 14,
      def: 20,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Protect", "Heavy Slam", "Body Press", "Iron Defense"],
    items: ["Aggronite"]
  },
  Meditite: {
    ability: "Pure Power",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Close Combat", "Zen Headbutt", "Trailblaze", "Skill Swap"],
    items: ["Focus Sash"]
  },
  Medicham: {
    ability: "Pure Power",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Zen Headbutt", "Fake Out", "Ice Punch"],
    items: ["Medichamite"]
  },
  "Medicham-Mega": {
    ability: "Pure Power",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Zen Headbutt", "Fake Out", "Ice Punch"],
    items: ["Medichamite"]
  },
  Electrike: {
    ability: "Static",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Discharge", "Electro Ball", "Protect"],
    items: ["Eviolite"]
  },
  Manectric: {
    ability: "Lightning Rod",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Overheat", "Volt Switch", "Snarl", "Protect"],
    items: ["Manectite"]
  },
  "Manectric-Mega": {
    ability: "Intimidate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Overheat", "Volt Switch", "Snarl", "Protect"],
    items: ["Manectite"]
  },
  Plusle: {
    ability: "Lightning Rod",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 0,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Thunderbolt", "Alluring Voice", "Nasty Plot", "Encore"],
    items: ["Focus Sash", "Life Orb"]
  },
  Minun: {
    ability: "Volt Absorb",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Thunderbolt", "Encore", "Nasty Plot"],
    items: ["Heavy-Duty Boots", "Focus Sash", "Leftovers"]
  },
  Volbeat: {
    ability: "Prankster",
    nature: "Sassy",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Sunny Day", "Encore", "Moonlight", "U-turn"],
    items: ["Heat Rock"]
  },
  Illumise: {
    ability: "Prankster",
    nature: "Calm",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 7,
      spa: 0,
      spd: 26,
      spe: 0
    },
    moves: ["Tailwind", "Encore", "Rain Dance", "Sunny Day"],
    items: ["Covert Cloak"]
  },
  Roselia: {
    ability: "Natural Cure",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Dazzling Gleam", "Energy Ball", "Protect"],
    items: ["Eviolite"]
  },
  Gulpin: {
    ability: "Sticky Hold",
    nature: "Sassy",
    teraType: "Poison",
    evs: {
      hp: 16,
      atk: 0,
      def: 22,
      spa: 6,
      spd: 22,
      spe: 0
    },
    moves: ["Belch", "Thief", "Pain Split", "Stuff Cheeks"],
    items: ["Apicot Berry", "Eviolite", "Black Sludge", "Leftovers", "Petaya Berry"]
  },
  Swalot: {
    ability: "Sticky Hold",
    nature: "Impish",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Body Press", "Knock Off", "Acid Armor", "Encore"],
    items: ["Black Sludge", "Leftovers", "Petaya Berry", "Assault Vest"]
  },
  Carvanha: {
    ability: "Rough Skin",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Assurance", "Bite", "Protect"],
    items: ["Eviolite"]
  },
  Sharpedo: {
    ability: "Rough Skin",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Crunch", "Earthquake", "Waterfall", "Protect"],
    items: ["Sharpedonite"]
  },
  "Sharpedo-Mega": {
    ability: "Strong Jaw",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Crunch", "Earthquake", "Waterfall", "Protect"],
    items: ["Sharpedonite"]
  },
  Wailmer: {
    ability: "Water Veil",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Brine", "Clear Smog", "Protect"],
    items: ["Eviolite"]
  },
  Wailord: {
    ability: "Water Veil",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Brine", "Echoed Voice", "Protect"],
    items: ["Leftovers"]
  },
  Numel: {
    ability: "Simple",
    nature: "Impish",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Flame Charge", "Will-O-Wisp", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Camerupt: {
    ability: "Solid Rock",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Heat Wave", "Earth Power", "Ancient Power", "Protect"],
    items: ["Cameruptite"]
  },
  "Camerupt-Mega": {
    ability: "Sheer Force",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Heat Wave", "Earth Power", "Ancient Power", "Protect"],
    items: ["Cameruptite"]
  },
  Torkoal: {
    ability: "Drought",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 2,
      spe: 0
    },
    moves: ["Eruption", "Heat Wave", "Weather Ball", "Protect"],
    items: ["Charcoal", "Leftovers"]
  },
  Spoink: {
    ability: "Illuminate",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Meteor Beam", "Psychic", "Power Gem", "Trailblaze"],
    items: ["Power Herb"]
  },
  Grumpig: {
    ability: "Thick Fat",
    nature: "Calm",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Psychic Noise", "Rest", "Sleep Talk", "Whirlwind"],
    items: ["Leftovers"]
  },
  Spinda: {
    ability: "Own Tempo",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dream Eater", "Hidden Power", "Hyper Voice", "Protect"],
    items: ["Leftovers"]
  },
  Trapinch: {
    ability: "Arena Trap",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "First Impression", "Feint"],
    items: ["Eviolite"]
  },
  Vibrava: {
    ability: "Levitate",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Dragon Claw", "Outrage", "Protect"],
    items: ["Eviolite"]
  },
  Flygon: {
    ability: "Levitate",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stealth Rock", "Earthquake", "Scale Shot", "U-turn"],
    items: ["Loaded Dice"]
  },
  Cacnea: {
    ability: "Water Absorb",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 30,
      def: 15,
      spa: 0,
      spd: 0,
      spe: 20
    },
    moves: ["Seed Bomb", "Drain Punch", "Trailblaze", "Swords Dance"],
    items: ["Eviolite"]
  },
  Cacturne: {
    ability: "Water Absorb",
    nature: "Naughty",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Knock Off", "Sucker Punch", "Leaf Storm", "Spikes"],
    items: ["Life Orb"]
  },
  Swablu: {
    ability: "Scrappy",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Moonblast", "Body Press", "Roost", "Cotton Guard"],
    items: ["Eviolite"]
  },
  Altaria: {
    ability: "Cloud Nine",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Tailwind", "Draco Meteor", "Protect", "Hurricane"],
    items: ["Altarianite"]
  },
  "Altaria-Mega": {
    ability: "Pixilate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Tailwind", "Draco Meteor", "Protect", "Hurricane"],
    items: ["Altarianite"]
  },
  Zangoose: {
    ability: "Toxic Boost",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Facade", "Knock Off", "Quick Attack", "Swords Dance"],
    items: ["Toxic Orb"]
  },
  Seviper: {
    ability: "Infiltrator",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Flamethrower", "Sludge Bomb", "Dark Pulse", "Switcheroo"],
    items: ["Choice Scarf"]
  },
  Lunatone: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Charge Beam", "Confusion", "Protect"],
    items: ["Leftovers"]
  },
  Solrock: {
    ability: "Levitate",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Body Slam", "Bulldoze", "Protect"],
    items: ["Leftovers"]
  },
  Barboach: {
    ability: "Oblivious",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Ice Beam", "Earth Power", "Surf", "Stealth Rock"],
    items: ["Life Orb", "Eviolite"]
  },
  Whiscash: {
    ability: "Oblivious",
    nature: "Sassy",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Stealth Rock", "Earth Power", "Stone Edge", "Surf"],
    items: ["Heavy-Duty Boots"]
  },
  Corphish: {
    ability: "Adaptability",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 25,
      def: 10,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Liquidation", "Knock Off", "Aqua Jet", "Swords Dance"],
    items: ["Eviolite"]
  },
  Crawdaunt: {
    ability: "Adaptability",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Crabhammer", "Knock Off", "Aqua Jet"],
    items: ["Life Orb"]
  },
  Baltoy: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Charge Beam", "Confusion", "Protect"],
    items: ["Eviolite"]
  },
  Claydol: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Charge Beam", "Confusion", "Protect"],
    items: ["Leftovers"]
  },
  Lileep: {
    ability: "Suction Cups",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Ancient Power", "Brine", "Protect"],
    items: ["Eviolite"]
  },
  Cradily: {
    ability: "Suction Cups",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Ancient Power", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  Anorith: {
    ability: "Battle Armor",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Jet", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Armaldo: {
    ability: "Battle Armor",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Tail", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Feebas: {
    ability: "Adaptability",
    nature: "Hardy",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Blizzard", "Surf", "Muddy Water", "Tera Blast"],
    items: ["Choice Specs", "Loaded Dice", "Eject Pack", "Choice Band"]
  },
  Milotic: {
    ability: "Competitive",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 20,
      atk: 0,
      def: 20,
      spa: 4,
      spd: 8,
      spe: 14
    },
    moves: ["Ice Beam", "Scald", "Icy Wind", "Protect"],
    items: ["Leftovers", "Sitrus Berry"]
  },
  Castform: {
    ability: "Forecast",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Weather Ball", "Thunderbolt", "Protect", "Power Whip"],
    items: ["Sitrus Berry"]
  },
  "Castform-Rainy": {
    ability: "Forecast",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Weather Ball", "Thunderbolt", "Protect", "Power Whip"],
    items: ["Sitrus Berry"]
  },
  "Castform-Snowy": {
    ability: "Forecast",
    nature: "Adamant",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Weather Ball", "Thunderbolt", "Protect", "Power Whip"],
    items: ["Sitrus Berry"]
  },
  "Castform-Sunny": {
    ability: "Forecast",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Weather Ball", "Thunderbolt", "Protect", "Power Whip"],
    items: ["Sitrus Berry"]
  },
  Kecleon: {
    ability: "Color Change",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Tail", "Astonish", "Protect"],
    items: ["Leftovers"]
  },
  Shuppet: {
    ability: "Cursed Body",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sucker Punch", "Shadow Sneak", "Thunder Wave", "Trick"],
    items: ["Choice Band", "Life Orb", "Focus Sash", "Leftovers"]
  },
  Banette: {
    ability: "Frisk",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Poltergeist", "Encore", "Destiny Bond", "Will-O-Wisp"],
    items: ["Banettite"]
  },
  "Banette-Mega": {
    ability: "Prankster",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Poltergeist", "Encore", "Destiny Bond", "Will-O-Wisp"],
    items: ["Banettite"]
  },
  Duskull: {
    ability: "Levitate",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Icy Wind", "Will-O-Wisp", "Sleep Talk", "Rest"],
    items: ["Eviolite"]
  },
  Dusclops: {
    ability: "Pressure",
    nature: "Sassy",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 23,
      spa: 0,
      spd: 10,
      spe: 0
    },
    moves: ["Trick Room", "Night Shade", "Haze", "Will-O-Wisp"],
    items: ["Eviolite"]
  },
  Tropius: {
    ability: "Harvest",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Hurricane", "Wide Guard", "Leech Seed", "Substitute"],
    items: ["Sitrus Berry", "Covert Cloak", "Mental Herb"]
  },
  Chimecho: {
    ability: "Levitate",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Recover", "Stored Power", "Cosmic Power", "Charge Beam"],
    items: ["Chimechite"]
  },
  "Chimecho-Mega": {
    ability: "Levitate",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Recover", "Stored Power", "Cosmic Power", "Charge Beam"],
    items: ["Chimechite"]
  },
  Absol: {
    ability: "Pressure",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Psycho Cut", "Close Combat", "Sucker Punch", "Knock Off"],
    items: ["Absolite"]
  },
  "Absol-Mega": {
    ability: "Magic Bounce",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Psycho Cut", "Close Combat", "Sucker Punch", "Knock Off"],
    items: ["Absolite"]
  },
  Wynaut: {
    ability: "Shadow Tag",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Mirror Coat", "Air Slash", "Dazzling Gleam", "Protect"],
    items: ["Eviolite"]
  },
  Snorunt: {
    ability: "Ice Body",
    nature: "Jolly",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 25,
      def: 0,
      spa: 0,
      spd: 15,
      spe: 25
    },
    moves: ["Shadow Ball", "Crunch", "Facade", "Trailblaze"],
    items: ["Eviolite", "Choice Scarf", "Leftovers", "Icy Rock", "Babiri Berry"]
  },
  Glalie: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Earthquake", "Spikes", "Explosion", "Protect"],
    items: ["Glalitite"]
  },
  "Glalie-Mega": {
    ability: "Refrigerate",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Earthquake", "Spikes", "Explosion", "Protect"],
    items: ["Glalitite"]
  },
  Spheal: {
    ability: "Thick Fat",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Aurora Beam", "Blizzard", "Brine", "Protect"],
    items: ["Eviolite"]
  },
  Sealeo: {
    ability: "Thick Fat",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Aurora Beam", "Blizzard", "Brine", "Protect"],
    items: ["Eviolite"]
  },
  Walrein: {
    ability: "Thick Fat",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Aurora Beam", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  Clamperl: {
    ability: "Shell Armor",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Brine", "Hidden Power", "Protect"],
    items: ["Eviolite"]
  },
  Huntail: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Bind", "Bite", "Protect"],
    items: ["Leftovers"]
  },
  Gorebyss: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Confusion", "Draining Kiss", "Protect"],
    items: ["Leftovers"]
  },
  Relicanth: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Body Press", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Luvdisc: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Hydro Pump", "Flip Turn", "Wish", "Protect"],
    items: ["Heavy-Duty Boots", "Choice Specs", "Expert Belt", "Leftovers"]
  },
  Bagon: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dragon Rush", "Iron Head", "Fire Fang", "Dragon Dance"],
    items: ["Life Orb", "Eviolite"]
  },
  Shelgon: {
    ability: "Overcoat",
    nature: "Impish",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Outrage", "Dragon Dance", "Rest", "Sleep Talk"],
    items: ["Eviolite"]
  },
  Salamence: {
    ability: "Intimidate",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Air Slash", "Tailwind", "Protect"],
    items: ["Mirror Herb", "Eject Pack", "Life Orb", "Covert Cloak", "Choice Specs"]
  },
  "Salamence-Mega": {
    ability: "Aerilate",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Air Slash", "Tailwind", "Protect"],
    items: ["Salamencite"]
  },
  Beldum: {
    ability: "Clear Body",
    nature: "Brave",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 30,
      def: 0,
      spa: 10,
      spd: 25,
      spe: 0
    },
    moves: ["Zen Headbutt", "Iron Head", "Tera Blast", "Iron Defense"],
    items: ["Eviolite", "Choice Band", "Rocky Helmet", "Leftovers", "Sitrus Berry", "Assault Vest", "Life Orb", "Metal Coat", "Aguav Berry", "Air Balloon", "Enigma Berry", "Heavy-Duty Boots"]
  },
  Metang: {
    ability: "Clear Body",
    nature: "Impish",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Zen Headbutt", "Bullet Punch", "Rest"],
    items: ["Eviolite", "Chesto Berry"]
  },
  Metagross: {
    ability: "Clear Body",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Psychic Fangs", "Iron Head", "Body Press", "Protect"],
    items: ["Metagrossite"]
  },
  "Metagross-Mega": {
    ability: "Tough Claws",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Psychic Fangs", "Iron Head", "Body Press", "Protect"],
    items: ["Metagrossite"]
  },
  Regirock: {
    ability: "Clear Body",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Stone Edge", "Body Press", "Thunder Wave"],
    items: ["Leftovers"]
  },
  Regice: {
    ability: "Clear Body",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 1
    },
    moves: ["Ice Beam", "Thunderbolt", "Tera Blast", "Protect"],
    items: ["Life Orb", "Assault Vest", "Leftovers", "Choice Specs", "Weakness Policy", "Sitrus Berry", "Rocky Helmet"]
  },
  Registeel: {
    ability: "Clear Body",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 29,
      atk: 2,
      def: 20,
      spa: 0,
      spd: 10,
      spe: 5
    },
    moves: ["Body Press", "Iron Defense", "Heavy Slam", "Protect"],
    items: ["Leftovers"]
  },
  Latias: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 2,
      def: 29,
      spa: 0,
      spd: 0,
      spe: 3
    },
    moves: ["Calm Mind", "Agility", "Stored Power", "Aura Sphere"],
    items: ["Weakness Policy"]
  },
  "Latias-Mega": {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 2,
      def: 29,
      spa: 0,
      spd: 0,
      spe: 3
    },
    moves: ["Calm Mind", "Agility", "Stored Power", "Aura Sphere"],
    items: ["Latiasite"]
  },
  Latios: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Luster Purge", "Protect", "Tailwind"],
    items: ["Life Orb", "Soul Dew"]
  },
  "Latios-Mega": {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Luster Purge", "Protect", "Tailwind"],
    items: ["Latiosite"]
  },
  Kyogre: {
    ability: "Drizzle",
    nature: "Modest",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 1,
      spa: 30,
      spd: 1,
      spe: 32
    },
    moves: ["Water Spout", "Origin Pulse", "Hydro Pump", "Protect"],
    items: ["Mystic Water", "Splash Plate", "Assault Vest"]
  },
  Groudon: {
    ability: "Drought",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 26,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 6
    },
    moves: ["Precipice Blades", "High Horsepower", "Heat Crash", "Protect"],
    items: ["Clear Amulet", "Assault Vest", "Choice Band"]
  },
  Rayquaza: {
    ability: "Air Lock",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 6,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 26
    },
    moves: ["Dragon Ascent", "Extreme Speed", "Protect", "Swords Dance"],
    items: ["Life Orb", "Clear Amulet"]
  },
  "Rayquaza-Mega": {
    ability: "Delta Stream",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 6,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 26
    },
    moves: ["Dragon Ascent", "Extreme Speed", "Protect", "Swords Dance"],
    items: ["Life Orb", "Clear Amulet"]
  },
  Jirachi: {
    ability: "Serene Grace",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Iron Head", "Wish", "Protect", "Fire Punch"],
    items: ["Leftovers"]
  },
  Deoxys: {
    ability: "Sheer Force",
    nature: "Naive",
    teraType: "",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Luster Purge", "Blue Flare", "Bolt Strike", "Mountain Gale"],
    items: ["Life Orb"]
  },
  "Deoxys-Attack": {
    ability: "Pressure",
    nature: "Naive",
    teraType: "Stellar",
    evs: {
      hp: 1,
      atk: 25,
      def: 0,
      spa: 8,
      spd: 0,
      spe: 32
    },
    moves: ["Psycho Boost", "Superpower", "Knock Off", "Protect"],
    items: ["Focus Sash", "Power Herb"]
  },
  "Deoxys-Defense": {
    ability: "Pressure",
    nature: "Relaxed",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Night Shade", "Trick Room", "Teleport", "Recover"],
    items: ["Heavy-Duty Boots"]
  },
  "Deoxys-Speed": {
    ability: "Pressure",
    nature: "Naive",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Psycho Boost", "Superpower", "Knock Off", "Ice Beam"],
    items: ["Life Orb"]
  },
  Turtwig: {
    ability: "Shell Armor",
    nature: "Naughty",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Body Slam", "Zen Headbutt", "Giga Drain", "Shell Smash"],
    items: ["Eviolite", "White Herb", "Loaded Dice"]
  },
  Grotle: {
    ability: "Shell Armor",
    nature: "Relaxed",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Seed Bomb", "Bulldoze", "Shell Smash", "Roar"],
    items: ["Eject Pack", "Eviolite"]
  },
  Torterra: {
    ability: "Overgrow",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Shell Smash", "Bullet Seed", "Headlong Rush", "Rock Blast"],
    items: ["Leftovers"]
  },
  Chimchar: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Fire Punch", "U-turn", "Knock Off", "Stealth Rock"],
    items: ["Eviolite", "Focus Sash"]
  },
  Monferno: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Drain Punch", "Fire Punch", "Knock Off", "Swords Dance"],
    items: ["Eviolite", "Choice Band", "Choice Scarf"]
  },
  Infernape: {
    ability: "Blaze",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Flare Blitz", "U-turn", "Switcheroo"],
    items: ["Choice Scarf"]
  },
  Piplup: {
    ability: "Competitive",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Ice Beam", "Surf", "Flip Turn", "Roost"],
    items: ["Eviolite", "Choice Scarf", "Leftovers", "Quick Claw", "Adrenaline Orb", "Choice Specs"]
  },
  Prinplup: {
    ability: "Competitive",
    nature: "Quiet",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Hydro Pump", "Ice Beam", "Surf", "Grass Knot"],
    items: ["Life Orb", "Eviolite"]
  },
  Empoleon: {
    ability: "Competitive",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 19,
      spd: 0,
      spe: 15
    },
    moves: ["Water Pulse", "Flash Cannon", "Roar", "Protect"],
    items: ["Leftovers"]
  },
  Starly: {
    ability: "Reckless",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Double-Edge", "U-turn", "Thief"],
    items: ["Choice Scarf", "Focus Sash", "Choice Band", "Life Orb"]
  },
  Staravia: {
    ability: "Reckless",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Double-Edge", "Brave Bird", "U-turn", "Final Gambit"],
    items: ["Choice Scarf", "Choice Band", "Focus Sash"]
  },
  Staraptor: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 29,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 4,
      spe: 32
    },
    moves: ["Close Combat", "Brave Bird", "Protect", "Tailwind"],
    items: ["Staraptite"]
  },
  "Staraptor-Mega": {
    ability: "Contrary",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 29,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 4,
      spe: 32
    },
    moves: ["Close Combat", "Brave Bird", "Protect", "Tailwind"],
    items: ["Staraptite"]
  },
  Bidoof: {
    ability: "Simple",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Covet", "Crunch", "Protect"],
    items: ["Eviolite"]
  },
  Bibarel: {
    ability: "Simple",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Aqua Tail", "Bulldoze", "Protect"],
    items: ["Leftovers"]
  },
  Kricketot: {
    ability: "Shed Skin",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Lunge", "Skitter Smack", "Bug Bite", "Endeavor"],
    items: ["Focus Sash"]
  },
  Kricketune: {
    ability: "Technician",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Fell Stinger", "Trailblaze", "Sticky Web", "Taunt"],
    items: ["Focus Sash", "Heavy-Duty Boots", "Life Orb", "Muscle Band", "Sitrus Berry", "Leftovers"]
  },
  Shinx: {
    ability: "Guts",
    nature: "Adamant",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Wild Charge", "Crunch", "Facade", "Ice Fang"],
    items: ["Flame Orb", "Eviolite", "Leftovers", "Choice Scarf", "Expert Belt", "Choice Band", "Zap Plate"]
  },
  Luxio: {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Wild Charge", "Crunch", "Quick Attack", "Protect"],
    items: ["Eviolite"]
  },
  Luxray: {
    teraType: "",
    ability: "Intimidate",
    items: ["Sitrus Berry"],
    nature: "Timid",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Wild Charge", "Volt Switch", "Snarl", "Protect"]
  },
  Budew: {
    ability: "Natural Cure",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Dazzling Gleam", "Energy Ball", "Protect"],
    items: ["Eviolite"]
  },
  Roserade: {
    ability: "Natural Cure",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Sludge Bomb", "Leaf Storm", "Focus Blast", "Protect"],
    items: ["Sitrus Berry"]
  },
  Cranidos: {
    ability: "Mold Breaker",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "Zen Headbutt", "Trailblaze"],
    items: ["Life Orb", "Choice Scarf"]
  },
  Rampardos: {
    teraType: "",
    ability: "Sheer Force",
    items: ["Sitrus Berry"],
    nature: "Adamant",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Crunch", "Rock Slide", "Protect"]
  },
  Shieldon: {
    ability: "Stall",
    nature: "Careful",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Body Press", "Iron Head", "Iron Defense", "Slack Off"],
    items: ["Eviolite"]
  },
  Bastiodon: {
    ability: "Soundproof",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 1,
      spa: 0,
      spd: 11,
      spe: 22
    },
    moves: ["Body Press", "Iron Defense", "Foul Play", "Rest"],
    items: ["Leftovers"]
  },
  Burmy: {
    ability: "Shed Skin",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Electroweb", "Hidden Power", "Snore", "Protect"],
    items: ["Eviolite"]
  },
  Wormadam: {
    ability: "Anticipation",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Buzz", "Confusion", "Dream Eater", "Protect"],
    items: ["Leftovers"]
  },
  "Wormadam-Sandy": {
    ability: "Anticipation",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Bulldoze", "Earthquake", "Protect"],
    items: ["Leftovers"]
  },
  "Wormadam-Trash": {
    ability: "Anticipation",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Buzz", "Confusion", "Dream Eater", "Protect"],
    items: ["Leftovers"]
  },
  Mothim: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Bug Buzz", "Confusion", "Protect"],
    items: ["Leftovers"]
  },
  Combee: {
    ability: "Hustle",
    nature: "Hasty",
    teraType: "Bug",
    evs: {
      hp: 1,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Buzz", "Lunge", "Gust", "Sweet Scent"],
    items: ["Eviolite"]
  },
  Vespiquen: {
    ability: "Pressure",
    nature: "Sassy",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["U-turn", "Roost", "Spikes", "Toxic Spikes"],
    items: ["Heavy-Duty Boots"]
  },
  Pachirisu: {
    ability: "Volt Absorb",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Nuzzle", "Follow Me", "Super Fang", "Protect"],
    items: ["Sitrus Berry", "Rocky Helmet", "Safety Goggles", "Focus Sash", "Electric Seed", "Covert Cloak", "Leftovers", "Mental Herb", "Aguav Berry"]
  },
  Buizel: {
    ability: "Water Veil",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 30,
      def: 0,
      spa: 0,
      spd: 5,
      spe: 30
    },
    moves: ["Wave Crash", "Ice Spinner", "Flip Turn", "Aqua Jet"],
    items: ["Choice Band", "Eviolite", "Choice Scarf"]
  },
  Floatzel: {
    ability: "Swift Swim",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Wave Crash", "Liquidation", "Aqua Jet", "Ice Spinner"],
    items: ["Heavy-Duty Boots"]
  },
  Cherubi: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dazzling Gleam", "Draining Kiss", "Energy Ball", "Protect"],
    items: ["Eviolite"]
  },
  Cherrim: {
    ability: "Flower Gift",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dazzling Gleam", "Draining Kiss", "Energy Ball", "Protect"],
    items: ["Leftovers"]
  },
  "Cherrim-Sunshine": {
    ability: "Flower Gift",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dazzling Gleam", "Draining Kiss", "Energy Ball", "Protect"],
    items: ["Leftovers"]
  },
  Shellos: {
    ability: "Sticky Hold",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earth Power", "Ice Beam", "Recover", "Stealth Rock"],
    items: ["Eviolite", "Custap Berry"]
  },
  Gastrodon: {
    ability: "Storm Drain",
    nature: "Quiet",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Hydro Pump", "Earth Power", "Ice Beam", "Tera Blast"],
    items: ["Choice Specs"]
  },
  Ambipom: {
    ability: "Technician",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Fake Out", "U-turn", "Knock Off", "Double Hit"],
    items: ["Life Orb"]
  },
  Drifloon: {
    ability: "Unburden",
    nature: "Lax",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Thunderbolt", "Tera Blast", "Shadow Ball", "Will-O-Wisp"],
    items: ["Grassy Seed", "Weakness Policy", "Oran Berry", "Flame Orb", "Choice Scarf"]
  },
  Drifblim: {
    ability: "Unburden",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 1,
      def: 30,
      spa: 0,
      spd: 7,
      spe: 26
    },
    moves: ["Acrobatics", "Tailwind", "Destiny Bond", "Will-O-Wisp"],
    items: ["Electric Seed"]
  },
  Buneary: {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bounce", "Circle Throw", "Protect"],
    items: ["Eviolite"]
  },
  Lopunny: {
    ability: "Limber",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Fake Out", "Triple Axel", "Encore"],
    items: ["Lopunnite"]
  },
  "Lopunny-Mega": {
    ability: "Scrappy",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Fake Out", "Triple Axel", "Encore"],
    items: ["Lopunnite"]
  },
  Mismagius: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Shadow Ball", "Trick", "Dazzling Gleam", "Destiny Bond"],
    items: ["Choice Scarf"]
  },
  Honchkrow: {
    ability: "Moxie",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Sucker Punch", "Brave Bird", "U-turn", "Night Slash"],
    items: ["Mirror Herb"]
  },
  Glameow: {
    ability: "Limber",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Bite", "Protect"],
    items: ["Eviolite"]
  },
  Purugly: {
    ability: "Thick Fat",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Slam", "Bulldoze", "Protect"],
    items: ["Leftovers"]
  },
  Chingling: {
    ability: "Levitate",
    nature: "Bold",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Charge Beam", "Stored Power", "Cosmic Power", "Recover"],
    items: ["Eviolite"]
  },
  Stunky: {
    ability: "Aftermath",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 3,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 31
    },
    moves: ["Gunk Shot", "Temper Flare", "Sucker Punch", "Knock Off"],
    items: ["Eviolite", "Life Orb"]
  },
  Skuntank: {
    ability: "Aftermath",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Gunk Shot", "Knock Off", "Sucker Punch", "Taunt"],
    items: ["Rocky Helmet"]
  },
  Bronzor: {
    ability: "Levitate",
    nature: "Relaxed",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Trick Room", "Reflect", "Gyro Ball"],
    items: ["Eviolite"]
  },
  Bronzong: {
    ability: "Levitate",
    nature: "Sassy",
    teraType: "Water",
    evs: {
      hp: 19,
      atk: 0,
      def: 15,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Trick Room", "Body Press", "Iron Defense", "Hypnosis"],
    items: ["Sitrus Berry"]
  },
  Bonsly: {
    ability: "Sturdy",
    nature: "Adamant",
    teraType: "Rock",
    evs: {
      hp: 1,
      atk: 25,
      def: 10,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Earthquake", "Sucker Punch", "Stealth Rock", "Spikes"],
    items: ["Eviolite", "Custap Berry", "Leftovers", "Focus Sash", "Loaded Dice", "Heat Rock", "Heavy-Duty Boots", "Covert Cloak", "Stone Plate", "Assault Vest", "Weakness Policy"]
  },
  "Mime Jr.": {
    ability: "Soundproof",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dazzling Gleam", "Protect"],
    items: ["Eviolite"]
  },
  Happiny: {
    ability: "Serene Grace",
    nature: "Careful",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Zen Headbutt", "Thunder Wave", "Rest", "Sleep Talk"],
    items: ["Eviolite", "King's Rock", "Leftovers", "Oran Berry", "Shell Bell"]
  },
  Chatot: {
    ability: "Keen Eye",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Cutter", "Boomburst", "Chatter", "Protect"],
    items: ["Leftovers"]
  },
  Spiritomb: {
    ability: "Infiltrator",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Trick Room", "Nasty Plot", "Dark Pulse", "Psyshock"],
    items: ["Leftovers"]
  },
  Gible: {
    ability: "Rough Skin",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Scale Shot", "Swords Dance", "Protect"],
    items: ["Eviolite"]
  },
  Gabite: {
    ability: "Rough Skin",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Earthquake", "Iron Head", "Scale Shot", "Swords Dance"],
    items: ["Eviolite", "Loaded Dice", "Focus Sash"]
  },
  Garchomp: {
    ability: "Rough Skin",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"],
    items: ["Life Orb", "Choice Scarf", "Sitrus Berry", "Roseli Berry"]
  },
  "Garchomp-Mega": {
    ability: "Sand Force",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 17,
      atk: 30,
      def: 1,
      spa: 0,
      spd: 15,
      spe: 3
    },
    moves: ["Earthquake", "Rock Slide", "Stomping Tantrum", "Protect"],
    items: ["Garchompite"]
  },
  Munchlax: {
    ability: "Thick Fat",
    nature: "Impish",
    teraType: "Dragon",
    evs: {
      hp: 11,
      atk: 0,
      def: 25,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Body Slam", "Curse", "Rest", "Sleep Talk"],
    items: ["Eviolite"]
  },
  Riolu: {
    ability: "Prankster",
    nature: "Impish",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["High Jump Kick", "Copycat", "Sunny Day", "Final Gambit"],
    items: ["Heat Rock", "Damp Rock", "Eviolite"]
  },
  Lucario: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Bullet Punch", "Ice Punch", "Protect"],
    items: ["Lucarionite"]
  },
  "Lucario-Mega": {
    ability: "Adaptability",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Bullet Punch", "Ice Punch", "Protect"],
    items: ["Lucarionite"]
  },
  Hippopotas: {
    ability: "Sand Stream",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Ice Fang", "Slack Off", "Stealth Rock"],
    items: ["Smooth Rock", "Eviolite"]
  },
  Hippowdon: {
    ability: "Sand Stream",
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Yawn", "Slack Off", "Protect", "Sand Tomb"],
    items: ["Leftovers"]
  },
  Skorupi: {
    ability: "Battle Armor",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Tail", "Assurance", "Protect"],
    items: ["Eviolite"]
  },
  Drapion: {
    ability: "Battle Armor",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Tail", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  Croagunk: {
    ability: "Dry Skin",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 7,
      atk: 24,
      def: 15,
      spa: 0,
      spd: 15,
      spe: 5
    },
    moves: ["Earthquake", "Drain Punch", "Knock Off", "Vacuum Wave"],
    items: ["Eviolite"]
  },
  Toxicroak: {
    ability: "Dry Skin",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Gunk Shot", "Close Combat", "Sucker Punch"],
    items: ["Leftovers"]
  },
  Carnivine: {
    ability: "Levitate",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Bite", "Bug Bite", "Protect"],
    items: ["Leftovers"]
  },
  Finneon: {
    ability: "Swift Swim",
    nature: "Hardy",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hydro Pump", "Blizzard", "Aqua Tail", "Chilling Water"],
    items: ["Quick Claw", "Eject Button", "Eviolite", "Fairy Feather", "Life Orb", "Choice Specs", "Damp Rock"]
  },
  Lumineon: {
    ability: "Storm Drain",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Ice Beam", "Surf", "Flip Turn", "Encore"],
    items: ["Heavy-Duty Boots", "Leftovers", "Rocky Helmet", "Assault Vest", "Electric Seed"]
  },
  Mantyke: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Blizzard", "Bubble", "Protect"],
    items: ["Eviolite"]
  },
  Snover: {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Leaf Storm", "Blizzard", "Giga Drain", "Ice Shard"],
    items: ["Choice Scarf", "Icy Rock"]
  },
  Abomasnow: {
    ability: "Snow Warning",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 3,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Blizzard", "Energy Ball", "Earth Power", "Leaf Storm"],
    items: ["Abomasite"]
  },
  "Abomasnow-Mega": {
    ability: "Snow Warning",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 3,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Blizzard", "Energy Ball", "Earth Power", "Leaf Storm"],
    items: ["Abomasite"]
  },
  Weavile: {
    ability: "Pressure",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Knock Off", "Fake Out", "Triple Axel", "Rain Dance"],
    items: ["Focus Sash", "Wide Lens", "Life Orb"]
  },
  Magnezone: {
    ability: "Sturdy",
    nature: "Hardy",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Thunderbolt", "Flash Cannon", "Tera Blast", "Volt Switch"],
    items: ["Choice Specs"]
  },
  Lickilicky: {
    ability: "Own Tempo",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Bind", "Body Press", "Protect"],
    items: ["Leftovers"]
  },
  Rhyperior: {
    ability: "Solid Rock",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 20,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 14,
      spe: 0
    },
    moves: ["Rock Slide", "High Horsepower", "Earthquake", "Protect"],
    items: ["White Herb"]
  },
  Tangrowth: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Ancient Power", "Energy Ball", "Protect"],
    items: ["Leftovers"]
  },
  Electivire: {
    ability: "Motor Drive",
    nature: "Calm",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 32,
      spe: 0
    },
    moves: ["Follow Me", "Protect", "Thunder Wave", "Electroweb"],
    items: ["Leftovers"]
  },
  Magmortar: {
    ability: "Vital Spirit",
    nature: "Bold",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 25,
      spa: 0,
      spd: 8,
      spe: 0
    },
    moves: ["Burning Jealousy", "Follow Me", "Protect", "Helping Hand"],
    items: ["Sitrus Berry"]
  },
  Togekiss: {
    ability: "Hustle",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Ancient Power", "Aura Sphere", "Protect"],
    items: ["Leftovers"]
  },
  Yanmega: {
    ability: "Speed Boost",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 5,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 29
    },
    moves: ["Air Slash", "Tailwind", "Bug Buzz", "Detect"],
    items: ["Focus Sash"]
  },
  Leafeon: {
    ability: "Chlorophyll",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Solar Blade", "Double-Edge", "Protect"],
    items: ["Leftovers"]
  },
  Glaceon: {
    ability: "Snow Cloak",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 2,
      spe: 0
    },
    moves: ["Blizzard", "Freeze-Dry", "Icy Wind", "Protect"],
    items: ["Bright Powder"]
  },
  Gliscor: {
    ability: "Poison Heal",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 5,
      def: 1,
      spa: 0,
      spd: 22,
      spe: 6
    },
    moves: ["Dual Wingbeat", "High Horsepower", "Protect", "Swords Dance"],
    items: ["Leftovers"]
  },
  Mamoswine: {
    ability: "Oblivious",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["High Horsepower", "Icicle Crash", "Ice Shard", "Protect"],
    items: ["Focus Sash", "Life Orb"]
  },
  "Porygon-Z": {
    ability: "Download",
    nature: "Modest",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Agility", "Tera Blast", "Ice Beam", "Thunderbolt"],
    items: ["Heavy-Duty Boots"]
  },
  Gallade: {
    ability: "Sharpness",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Sacred Sword", "Psycho Cut", "Trick Room", "Protect"],
    items: ["Galladite"]
  },
  "Gallade-Mega": {
    ability: "Inner Focus",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Sacred Sword", "Psycho Cut", "Trick Room", "Protect"],
    items: ["Galladite"]
  },
  Probopass: {
    ability: "Sand Force",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Earth Power", "Meteor Beam", "Flash Cannon", "Dazzling Gleam"],
    items: ["Power Herb"]
  },
  Dusknoir: {
    ability: "Frisk",
    nature: "Brave",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 15,
      spa: 0,
      spd: 18,
      spe: 0
    },
    moves: ["Phantom Force", "Trick Room", "Will-O-Wisp", "Taunt"],
    items: ["Mental Herb", "Leftovers", "Rocky Helmet", "Safety Goggles", "Sitrus Berry"]
  },
  Froslass: {
    ability: "Snow Cloak",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 24,
      atk: 0,
      def: 12,
      spa: 5,
      spd: 0,
      spe: 25
    },
    moves: ["Blizzard", "Shadow Ball", "Protect", "Aurora Veil"],
    items: ["Froslassite"]
  },
  "Froslass-Mega": {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 24,
      atk: 0,
      def: 12,
      spa: 5,
      spd: 0,
      spe: 25
    },
    moves: ["Blizzard", "Shadow Ball", "Protect", "Aurora Veil"],
    items: ["Froslassite"]
  },
  Rotom: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Thunderbolt", "Shadow Ball", "Volt Switch", "Trick"],
    items: ["Choice Scarf"]
  },
  "Rotom-Fan": {
    ability: "Levitate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Air Slash", "Thunderbolt", "Volt Switch", "Trick"],
    items: ["Choice Scarf"]
  },
  "Rotom-Frost": {
    ability: "Levitate",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 9,
      spa: 25,
      spd: 0,
      spe: 0
    },
    moves: ["Blizzard", "Thunderbolt", "Protect", "Helping Hand"],
    items: ["Never-Melt Ice"]
  },
  "Rotom-Heat": {
    ability: "Levitate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 4,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 30
    },
    moves: ["Overheat", "Thunderbolt", "Volt Switch", "Electroweb"],
    items: ["Choice Scarf", "Sitrus Berry", "Leftovers", "Passho Berry"]
  },
  "Rotom-Mow": {
    ability: "Levitate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Leaf Storm", "Thunderbolt", "Volt Switch", "Electroweb"],
    items: ["Choice Scarf", "Sitrus Berry", "Leftovers", "Miracle Seed", "Occa Berry"]
  },
  "Rotom-Wash": {
    ability: "Levitate",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 9,
      spa: 16,
      spd: 10,
      spe: 0
    },
    moves: ["Hydro Pump", "Thunderbolt", "Volt Switch", "Will-O-Wisp"],
    items: ["Sitrus Berry", "Leftovers", "Choice Scarf", "Magnet"]
  },
  Uxie: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Nasty Plot", "Psychic Noise", "Draining Kiss", "Encore"],
    items: ["Leftovers"]
  },
  Mesprit: {
    ability: "Levitate",
    nature: "Bold",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Psychic Noise", "U-turn", "Healing Wish"],
    items: ["Colbur Berry"]
  },
  Azelf: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Psychic", "Flamethrower", "Dazzling Gleam", "Trick"],
    items: ["Choice Scarf"]
  },
  Dialga: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Dragon",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Draco Meteor", "Fire Blast", "Dragon Pulse", "Thunder"],
    items: ["Choice Scarf"]
  },
  "Dialga-Origin": {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Steel Beam", "Stealth Rock", "Dragon Tail"],
    items: ["Adamant Crystal"]
  },
  Palkia: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Substitute", "Spacial Rend", "Earth Power", "Dragon Tail"],
    items: ["Leftovers"]
  },
  "Palkia-Origin": {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Hydro Pump", "Fire Blast", "Draco Meteor", "Substitute"],
    items: ["Lustrous Globe"]
  },
  Heatran: {
    ability: "Flash Fire",
    nature: "Modest",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
      def: 12,
      spa: 10,
      spd: 11,
      spe: 1
    },
    moves: ["Magma Storm", "Earth Power", "Protect", "Will-O-Wisp"],
    items: ["Zoom Lens"]
  },
  "Heatran-Mega": {
    ability: "Flash Fire",
    nature: "Modest",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
      def: 12,
      spa: 10,
      spd: 11,
      spe: 1
    },
    moves: ["Magma Storm", "Earth Power", "Protect", "Will-O-Wisp"],
    items: ["Heatranite"]
  },
  Regigigas: {
    ability: "Slow Start",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Protect", "Wide Guard", "Knock Off", "Crush Grip"],
    items: ["Life Orb"]
  },
  Giratina: {
    ability: "Pressure",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dragon Tail", "Will-O-Wisp", "Defog", "Rest"],
    items: ["Heavy-Duty Boots"]
  },
  "Giratina-Origin": {
    ability: "Levitate",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 14,
      def: 14,
      spa: 0,
      spd: 0,
      spe: 6
    },
    moves: ["Poltergeist", "Dragon Tail", "Will-O-Wisp", "Defog"],
    items: ["Griseous Core"]
  },
  Cresselia: {
    ability: "Levitate",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 31,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Moonblast", "Lunar Blessing", "Trick Room", "Helping Hand"],
    items: ["Safety Goggles", "Rocky Helmet", "Mental Herb"]
  },
  Phione: {
    ability: "Hydration",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 31,
      spa: 1,
      spd: 1,
      spe: 0
    },
    moves: ["Scald", "Whirlpool", "Rest", "Sleep Talk"],
    items: ["Eviolite", "Chesto Berry"]
  },
  Manaphy: {
    ability: "Hydration",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Tail Glow", "Surf", "Energy Ball", "Alluring Voice"],
    items: ["Leftovers"]
  },
  Darkrai: {
    ability: "Bad Dreams",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Icy Wind", "Dark Void", "Protect"],
    items: ["Focus Sash", "Covert Cloak", "Wide Lens", "Choice Scarf", "Blunder Policy"]
  },
  "Darkrai-Mega": {
    ability: "Bad Dreams",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Icy Wind", "Dark Void", "Protect"],
    items: ["Darkranite"]
  },
  Shaymin: {
    ability: "Natural Cure",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Seed Flare", "Earth Power", "Air Slash", "Synthesis"],
    items: ["Heavy-Duty Boots"]
  },
  "Shaymin-Sky": {
    ability: "Serene Grace",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Seed Flare", "Air Slash", "Earth Power", "Healing Wish"],
    items: ["Choice Scarf"]
  },
  Arceus: {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Bug": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Bug",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Dark": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Dragon": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Dragon",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Electric": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Electric",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Fairy": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Fairy",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Fighting": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Fighting",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Fire": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Flying": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Ghost": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Grass": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Ground": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Ice": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Ice",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Poison": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Poison",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Psychic": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Psychic",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Rock": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Rock",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Steel": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  "Arceus-Water": {
    ability: "Multitype",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 25,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 7
    },
    moves: ["Extreme Speed", "Shadow Claw", "Protect", "Swords Dance"],
    items: ["Clear Amulet", "Choice Band", "Life Orb", "Silk Scarf", "Covert Cloak", "Leftovers"]
  },
  Victini: {
    ability: "Victory Star",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dazzling Gleam", "Protect"],
    items: ["Leftovers"]
  },
  Snivy: {
    ability: "Overgrow",
    nature: "Modest",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Leaf Storm", "Giga Drain", "Helping Hand", "Protect"],
    items: ["Eviolite"]
  },
  Servine: {
    ability: "Contrary",
    nature: "Timid",
    teraType: "Stellar",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Leaf Storm", "Tera Blast", "Synthesis", "Substitute"],
    items: ["Eviolite"]
  },
  Serperior: {
    ability: "Contrary",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 1,
      spa: 2,
      spd: 1,
      spe: 31
    },
    moves: ["Leaf Storm", "Protect", "Glare", "Taunt"],
    items: ["Leftovers"]
  },
  Tepig: {
    ability: "Sap Sipper",
    nature: "Careful",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flare Blitz", "Earthquake", "Stealth Rock", "Slack Off"],
    items: ["Eviolite"]
  },
  Pignite: {
    ability: "Blaze",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Close Combat", "Flare Blitz", "Knock Off", "Protect"],
    items: ["Eviolite"]
  },
  Emboar: {
    ability: "Reckless",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Flare Blitz", "Close Combat", "Knock Off", "Sucker Punch"],
    items: ["Emboarite"]
  },
  "Emboar-Mega": {
    ability: "Mold Breaker",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Flare Blitz", "Close Combat", "Knock Off", "Sucker Punch"],
    items: ["Emboarite"]
  },
  Oshawott: {
    ability: "Torrent",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 5,
      spa: 28,
      spd: 0,
      spe: 0
    },
    moves: ["Hydro Pump", "Blizzard", "Surf", "Fury Cutter"],
    items: ["Focus Sash"]
  },
  Dewott: {
    ability: "Torrent",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Chilling Water", "Hydro Pump", "Icy Wind", "Protect"],
    items: ["Eviolite"]
  },
  Samurott: {
    ability: "Torrent",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 6,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 27
    },
    moves: ["Aqua Jet", "Liquidation", "Swords Dance", "Flip Turn"],
    items: ["Mystic Water"]
  },
  "Samurott-Hisui": {
    ability: "Sharpness",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 6,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 27
    },
    moves: ["Ceaseless Edge", "Liquidation", "Swords Dance", "Flip Turn"],
    items: ["Mystic Water"]
  },
  Patrat: {
    ability: "Run Away",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Tail", "Assurance", "Bide", "Protect"],
    items: ["Eviolite"]
  },
  Watchog: {
    ability: "Keen Eye",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Crunch", "Close Combat", "Protect", "Knock Off"],
    items: ["Sitrus Berry"]
  },
  Lillipup: {
    ability: "Vital Spirit",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bite", "Covet", "Protect"],
    items: ["Eviolite"]
  },
  Herdier: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bite", "Covet", "Protect"],
    items: ["Eviolite"]
  },
  Stoutland: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bite", "Covet", "Protect"],
    items: ["Leftovers"]
  },
  Purrloin: {
    ability: "Limber",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Dream Eater", "Echoed Voice", "Protect"],
    items: ["Eviolite"]
  },
  Liepard: {
    ability: "Limber",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Crunch", "Sucker Punch", "Knock Off", "Protect"],
    items: ["Choice Scarf"]
  },
  Pansage: {
    ability: "Gluttony",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Disarming Voice", "Energy Ball", "Giga Drain", "Protect"],
    items: ["Eviolite"]
  },
  Simisage: {
    ability: "Overgrow",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Solar Blade", "Fake Out", "Taunt", "Bullet Seed"],
    items: ["King's Rock"]
  },
  Pansear: {
    ability: "Gluttony",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Belch", "Disarming Voice", "Fire Blast", "Protect"],
    items: ["Eviolite"]
  },
  Simisear: {
    ability: "Blaze",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Flamethrower", "Focus Blast", "Protect", "Psychic"],
    items: ["Choice Scarf"]
  },
  Panpour: {
    ability: "Gluttony",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Brine", "Disarming Voice", "Protect"],
    items: ["Eviolite"]
  },
  Simipour: {
    ability: "Torrent",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 2,
      spe: 32
    },
    moves: ["Scald", "Flip Turn", "Icy Wind", "Fake Out"],
    items: ["Mystic Water"]
  },
  Munna: {
    ability: "Forewarn",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Dazzling Gleam", "Dream Eater", "Protect"],
    items: ["Eviolite"]
  },
  Musharna: {
    ability: "Forewarn",
    nature: "Sassy",
    teraType: "",
    evs: {
      hp: 32,
      atk: 2,
      def: 16,
      spa: 0,
      spd: 16,
      spe: 0
    },
    moves: ["Trick Room", "Psychic", "Moonblast", "Helping Hand"],
    items: ["Sitrus Berry", "Leftovers"]
  },
  Pidove: {
    ability: "Big Pecks",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Dual Wingbeat", "Facade", "Protect"],
    items: ["Eviolite"]
  },
  Tranquill: {
    ability: "Big Pecks",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Dual Wingbeat", "Facade", "Protect"],
    items: ["Eviolite"]
  },
  Unfezant: {
    ability: "Big Pecks",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brave Bird", "Dual Wingbeat", "Protect"],
    items: ["Leftovers"]
  },
  Blitzle: {
    ability: "Sap Sipper",
    nature: "Hasty",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Supercell Slam", "Thunderbolt", "Trailblaze", "Endeavor"],
    items: ["Wide Lens"]
  },
  Zebstrika: {
    ability: "Lightning Rod",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 25,
      atk: 0,
      def: 6,
      spa: 1,
      spd: 2,
      spe: 32
    },
    moves: ["Electroweb", "Protect", "Taunt", "Eerie Impulse"],
    items: ["Focus Sash", "Choice Band", "Assault Vest", "Shuca Berry", "Air Balloon", "Life Orb", "Covert Cloak"]
  },
  Roggenrola: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Press", "Bulldoze", "Earthquake", "Protect"],
    items: ["Eviolite"]
  },
  Boldore: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Press", "Bulldoze", "Earthquake", "Protect"],
    items: ["Eviolite"]
  },
  Gigalith: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Press", "Bulldoze", "Earthquake", "Protect"],
    items: ["Leftovers"]
  },
  Woobat: {
    ability: "Unaware",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Cutter", "Air Slash", "Charge Beam", "Protect"],
    items: ["Eviolite"]
  },
  Swoobat: {
    ability: "Unaware",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Cutter", "Air Slash", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  Drilbur: {
    ability: "Mold Breaker",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Rock Slide", "Rapid Spin", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Excadrill: {
    ability: "Sand Rush",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["High Horsepower", "Iron Head", "Rock Slide", "Protect"],
    items: ["Focus Sash"]
  },
  "Excadrill-Mega": {
    ability: "Piercing Drill",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["High Horsepower", "Iron Head", "Rock Slide", "Protect"],
    items: ["Excadrite"]
  },
  Audino: {
    ability: "Healer",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Dazzling Gleam", "Moonblast", "Protect", "Healing Wish"],
    items: ["Audinite"]
  },
  "Audino-Mega": {
    ability: "Healer",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Dazzling Gleam", "Moonblast", "Protect", "Healing Wish"],
    items: ["Audinite"]
  },
  Timburr: {
    ability: "Iron Fist",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 25,
      def: 20,
      spa: 0,
      spd: 20,
      spe: 0
    },
    moves: ["Drain Punch", "Knock Off", "Mach Punch", "Bulk Up"],
    items: ["Eviolite"]
  },
  Gurdurr: {
    ability: "Guts",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 3,
      def: 31,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Drain Punch", "Knock Off", "Mach Punch", "Defog"],
    items: ["Eviolite"]
  },
  Conkeldurr: {
    ability: "Iron Fist",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Mach Punch", "Drain Punch", "Ice Punch", "Thunder Punch"],
    items: ["Black Belt"]
  },
  Tympole: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Bubble", "Bubble Beam", "Protect"],
    items: ["Eviolite"]
  },
  Palpitoad: {
    ability: "Swift Swim",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Bubble", "Bubble Beam", "Protect"],
    items: ["Eviolite"]
  },
  Seismitoad: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bounce", "Brick Break", "Bulldoze", "Protect"],
    items: ["Leftovers"]
  },
  Throh: {
    ability: "Guts",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Bind", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Sawk: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Brick Break", "Bulldoze", "Protect"],
    items: ["Leftovers"]
  },
  Sewaddle: {
    ability: "Overcoat",
    nature: "Hardy",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Seed Bomb", "Switcheroo", "Worry Seed", "Screech"],
    items: ["Choice Scarf", "Focus Sash", "Life Orb", "Weakness Policy"]
  },
  Swadloon: {
    ability: "Overcoat",
    nature: "Bold",
    teraType: "Bug",
    evs: {
      hp: 30,
      atk: 0,
      def: 16,
      spa: 0,
      spd: 20,
      spe: 0
    },
    moves: ["Giga Drain", "Iron Defense", "Light Screen", "Baton Pass"],
    items: ["Eviolite"]
  },
  Leavanny: {
    ability: "Overcoat",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Sticky Web", "Knock Off", "Pounce", "Leaf Blade"],
    items: ["Focus Sash"]
  },
  Venipede: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Bug Bite", "Double-Edge", "Protect"],
    items: ["Eviolite"]
  },
  Whirlipede: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Bite", "Double-Edge", "Endeavor", "Protect"],
    items: ["Eviolite"]
  },
  Scolipede: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Megahorn", "Poison Jab", "Swords Dance", "Protect"],
    items: ["Focus Sash", "Leftovers"]
  },
  "Scolipede-Mega": {
    ability: "Shell Armor",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Megahorn", "Poison Jab", "Swords Dance", "Protect"],
    items: ["Scolipite"]
  },
  Cottonee: {
    ability: "Prankster",
    nature: "Bold",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Encore", "Memento", "Sunny Day"],
    items: ["Eviolite", "Heat Rock"]
  },
  Whimsicott: {
    ability: "Prankster",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Moonblast", "Tailwind", "Encore", "Protect"],
    items: ["Focus Sash", "Fairy Feather", "Occa Berry"]
  },
  Petilil: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 25,
      spd: 15,
      spe: 25
    },
    moves: ["Energy Ball", "Tera Blast", "Giga Drain", "Sleep Powder"],
    items: ["Eviolite", "Life Orb", "Choice Specs"]
  },
  Lilligant: {
    ability: "Own Tempo",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Quiver Dance", "Giga Drain", "Tera Blast", "Pollen Puff"],
    items: ["Life Orb"]
  },
  "Lilligant-Hisui": {
    ability: "Chlorophyll",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 7,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 27
    },
    moves: ["Solar Blade", "Ice Spinner", "After You", "Healing Wish"],
    items: ["Focus Sash"]
  },
  Basculin: {
    ability: "Adaptability",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Flip Turn", "Aqua Jet", "Wave Crash", "Ice Beam"],
    items: ["Choice Specs"]
  },
  "Basculin-Blue-Striped": {
    ability: "Rock Head",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Aqua Tail", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  "Basculin-White-Striped": {
    ability: "Rattled",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Bite", "Crunch", "Protect"],
    items: ["Eviolite"]
  },
  Sandile: {
    ability: "Moxie",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "Crunch", "Stealth Rock"],
    items: ["Eviolite", "Life Orb", "Choice Scarf"]
  },
  Krokorok: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Earthquake", "Stone Edge", "Knock Off", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Krookodile: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stealth Rock", "Knock Off", "Earthquake", "Gunk Shot"],
    items: ["Leftovers"]
  },
  Darumaka: {
    ability: "Hustle",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Brick Break", "Dig", "Protect"],
    items: ["Eviolite"]
  },
  "Darumaka-Galar": {
    ability: "Hustle",
    nature: "Jolly",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Avalanche", "Bite", "Brick Break", "Protect"],
    items: ["Eviolite"]
  },
  Darmanitan: {
    ability: "Sheer Force",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Body Press", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  "Darmanitan-Galar": {
    ability: "Gorilla Tactics",
    nature: "Jolly",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Avalanche", "Bite", "Body Press", "Protect"],
    items: ["Leftovers"]
  },
  "Darmanitan-Galar-Zen": {
    ability: "Zen Mode",
    nature: "Jolly",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Body Press", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  "Darmanitan-Zen": {
    ability: "Zen Mode",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Burning Jealousy", "Ember", "Expanding Force", "Protect"],
    items: ["Leftovers"]
  },
  Maractus: {
    ability: "Water Absorb",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Energy Ball", "Giga Drain", "Protect"],
    items: ["Leftovers"]
  },
  Dwebble: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bug Bite", "Bulldoze", "Protect"],
    items: ["Eviolite"]
  },
  Crustle: {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Press", "Bug Bite", "Protect"],
    items: ["Leftovers"]
  },
  Scraggy: {
    ability: "Intimidate",
    nature: "Sassy",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 12,
      spa: 0,
      spd: 21,
      spe: 0
    },
    moves: ["Foul Play", "Fake Out", "Coaching", "Endeavor"],
    items: ["Eviolite"]
  },
  Scrafty: {
    ability: "Shed Skin",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 20,
      def: 0,
      spa: 0,
      spd: 7,
      spe: 7
    },
    moves: ["Drain Punch", "Ice Punch", "Knock Off", "Fake Out"],
    items: ["Scraftinite"]
  },
  "Scrafty-Mega": {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 20,
      def: 0,
      spa: 0,
      spd: 7,
      spe: 7
    },
    moves: ["Drain Punch", "Ice Punch", "Knock Off", "Fake Out"],
    items: ["Scraftinite"]
  },
  Sigilyph: {
    ability: "Wonder Skin",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Cutter", "Air Slash", "Ancient Power", "Protect"],
    items: ["Leftovers"]
  },
  Yamask: {
    ability: "Mummy",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Dream Eater", "Energy Ball", "Protect"],
    items: ["Eviolite"]
  },
  "Yamask-Galar": {
    ability: "Wandering Spirit",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Astonish", "Brutal Swing", "Earthquake", "Protect"],
    items: ["Eviolite"]
  },
  Cofagrigus: {
    ability: "Mummy",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Shadow Ball", "Focus Blast", "Protect", "Will-O-Wisp"],
    items: ["Sitrus Berry"]
  },
  Tirtouga: {
    ability: "Solid Rock",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Aqua Tail", "Bide", "Protect"],
    items: ["Eviolite"]
  },
  Carracosta: {
    ability: "Solid Rock",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Aqua Tail", "Bide", "Protect"],
    items: ["Leftovers"]
  },
  Archen: {
    ability: "Defeatist",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Aqua Tail", "Protect"],
    items: ["Eviolite"]
  },
  Archeops: {
    ability: "Defeatist",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Aqua Tail", "Protect"],
    items: ["Leftovers"]
  },
  Trubbish: {
    ability: "Stench",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Double Slap", "Drain Punch", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  Garbodor: {
    ability: "Stench",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Sludge Bomb", "Focus Blast", "Protect", "Gunk Shot"],
    items: ["Sitrus Berry"]
  },
  Zorua: {
    ability: "Illusion",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Extrasensory", "Dark Pulse", "Grass Knot"],
    items: ["Choice Specs", "Eviolite", "Life Orb"]
  },
  "Zorua-Hisui": {
    ability: "Illusion",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 0,
      def: 15,
      spa: 20,
      spd: 5,
      spe: 25
    },
    moves: ["Tera Blast", "U-turn", "Hex", "Will-O-Wisp"],
    items: ["Eviolite", "Choice Scarf", "Choice Specs"]
  },
  Zoroark: {
    ability: "Illusion",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Sludge Bomb", "Trick", "Focus Blast"],
    items: ["Leftovers"]
  },
  "Zoroark-Hisui": {
    ability: "Illusion",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hyper Voice", "Psychic", "Shadow Ball", "Icy Wind"],
    items: ["Choice Scarf", "Focus Sash", "Spell Tag"]
  },
  Minccino: {
    ability: "Skill Link",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 11,
      atk: 25,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 30
    },
    moves: ["Tail Slap", "Triple Axel", "Tidy Up", "Encore"],
    items: ["Eviolite", "Life Orb"]
  },
  Cinccino: {
    ability: "Technician",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Tidy Up", "Tail Slap", "Knock Off", "Encore"],
    items: ["Loaded Dice"]
  },
  Gothita: {
    ability: "Shadow Tag",
    nature: "Modest",
    teraType: "Psychic",
    evs: {
      hp: 1,
      atk: 0,
      def: 5,
      spa: 30,
      spd: 0,
      spe: 30
    },
    moves: ["Psychic", "Thunderbolt", "Energy Ball", "Trick"],
    items: ["Choice Scarf"]
  },
  Gothorita: {
    ability: "Shadow Tag",
    nature: "Sassy",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Psychic", "Fake Out", "Trick Room", "Imprison"],
    items: ["Eviolite"]
  },
  Gothitelle: {
    ability: "Shadow Tag",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 26,
      spa: 0,
      spd: 0,
      spe: 7
    },
    moves: ["Psychic", "Fake Out", "Protect", "Taunt"],
    items: ["Leftovers"]
  },
  Solosis: {
    ability: "Regenerator",
    nature: "Modest",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Psychic", "Energy Ball", "Shadow Ball", "Recover"],
    items: ["Eviolite", "Leftovers"]
  },
  Duosion: {
    ability: "Magic Guard",
    nature: "Bold",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 1
    },
    moves: ["Stored Power", "Recover", "Calm Mind", "Acid Armor"],
    items: ["Eviolite"]
  },
  Reuniclus: {
    ability: "Overcoat",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 21,
      atk: 0,
      def: 18,
      spa: 25,
      spd: 2,
      spe: 0
    },
    moves: ["Psychic Noise", "Focus Blast", "Trick Room", "Ally Switch"],
    items: ["Mental Herb"]
  },
  Ducklett: {
    ability: "Keen Eye",
    nature: "Gentle",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Surf", "Defog", "Roost"],
    items: ["Eviolite", "Heavy-Duty Boots", "Assault Vest", "Mystic Water", "Damp Rock", "Wide Lens", "Quick Claw"]
  },
  Swanna: {
    ability: "Big Pecks",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 9,
      spe: 24
    },
    moves: ["Surf", "Knock Off", "Defog", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  Vanillite: {
    ability: "Ice Body",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Flash Cannon", "Frost Breath", "Protect"],
    items: ["Eviolite"]
  },
  Vanillish: {
    ability: "Ice Body",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Flash Cannon", "Frost Breath", "Protect"],
    items: ["Eviolite"]
  },
  Vanilluxe: {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Ice Beam", "Icy Wind", "Freeze-Dry"],
    items: ["Choice Scarf"]
  },
  Deerling: {
    ability: "Serene Grace",
    nature: "Jolly",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Zen Headbutt", "Headbutt", "Bulldoze", "Bullet Seed"],
    items: ["Eviolite"]
  },
  Sawsbuck: {
    ability: "Chlorophyll",
    nature: "Adamant",
    teraType: "Stellar",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Double-Edge", "High Horsepower", "Throat Chop", "Horn Leech"],
    items: ["Choice Band", "Focus Sash", "Life Orb", "Choice Scarf", "Bright Powder", "Clear Amulet"]
  },
  Emolga: {
    ability: "Static",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Volt Switch", "Thunderbolt", "Protect", "Air Slash"],
    items: ["Choice Scarf"]
  },
  Karrablast: {
    ability: "Swarm",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bug Bite", "Counter", "Protect"],
    items: ["Eviolite"]
  },
  Escavalier: {
    ability: "Swarm",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brutal Swing", "Bug Bite", "Protect"],
    items: ["Leftovers"]
  },
  Foongus: {
    ability: "Regenerator",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Giga Drain", "Spore", "Synthesis"],
    items: ["Eviolite"]
  },
  Amoonguss: {
    ability: "Regenerator",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 31,
      atk: 0,
      def: 25,
      spa: 0,
      spd: 10,
      spe: 0
    },
    moves: ["Sludge Bomb", "Spore", "Rage Powder", "Protect"],
    items: ["Rocky Helmet", "Sitrus Berry"]
  },
  Frillish: {
    ability: "Water Absorb",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Blizzard", "Brine", "Protect"],
    items: ["Eviolite"]
  },
  Jellicent: {
    ability: "Water Absorb",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  Alomomola: {
    ability: "Regenerator",
    nature: "Sassy",
    teraType: "Water",
    evs: {
      hp: 4,
      atk: 0,
      def: 30,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Flip Turn", "Mirror Coat", "Play Rough", "Aqua Jet"],
    items: ["Assault Vest"]
  },
  Joltik: {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Thunder", "Bug Buzz", "Giga Drain", "Volt Switch"],
    items: ["Choice Scarf"]
  },
  Galvantula: {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Sticky Web", "Thunder", "Bug Buzz", "Thunder Wave"],
    items: ["Focus Sash"]
  },
  Ferroseed: {
    ability: "Iron Barbs",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bullet Seed", "Endeavor", "Protect"],
    items: ["Eviolite"]
  },
  Ferrothorn: {
    ability: "Iron Barbs",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Body Press", "Protect"],
    items: ["Leftovers"]
  },
  Klink: {
    ability: "Plus",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bind", "Facade", "Protect"],
    items: ["Eviolite"]
  },
  Klang: {
    ability: "Plus",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bind", "Facade", "Protect"],
    items: ["Eviolite"]
  },
  Klinklang: {
    ability: "Plus",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bind", "Facade", "Protect"],
    items: ["Leftovers"]
  },
  Tynamo: {
    ability: "Levitate",
    nature: "Adamant",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Knock Off", "Spark", "Thunder Wave", "Charge"],
    items: ["Eviolite", "Leftovers", "Zap Plate", "Wiki Berry", "Magnet"]
  },
  Eelektrik: {
    ability: "Levitate",
    nature: "Relaxed",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Giga Drain", "U-turn", "Knock Off", "Super Fang"],
    items: ["Eviolite"]
  },
  Eelektross: {
    ability: "Levitate",
    nature: "Sassy",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Knock Off", "U-turn", "Discharge", "Dragon Tail"],
    items: ["Eelektrossite", "Leftovers"]
  },
  "Eelektross-Mega": {
    ability: "Eelevate",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Close Combat", "Wild Charge", "Crunch", "Protect"],
    items: ["Eelektrossite"]
  },
  Elgyem: {
    ability: "Telepathy",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dark Pulse", "Protect"],
    items: ["Eviolite"]
  },
  Beheeyem: {
    ability: "Telepathy",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dark Pulse", "Protect"],
    items: ["Leftovers"]
  },
  Litwick: {
    ability: "Flash Fire",
    nature: "Quiet",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Overheat", "Shadow Ball", "Trick Room", "Memento"],
    items: ["Air Balloon"]
  },
  Lampent: {
    ability: "Infiltrator",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Overheat", "Energy Ball", "Shadow Ball", "Trick"],
    items: ["Choice Specs"]
  },
  Chandelure: {
    ability: "Flash Fire",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 25,
      spd: 1,
      spe: 8
    },
    moves: ["Shadow Ball", "Trick Room", "Heat Wave", "Protect"],
    items: ["Chandelurite"]
  },
  "Chandelure-Mega": {
    ability: "Infiltrator",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 25,
      spd: 1,
      spe: 8
    },
    moves: ["Shadow Ball", "Trick Room", "Heat Wave", "Protect"],
    items: ["Chandelurite"]
  },
  Axew: {
    ability: "Mold Breaker",
    nature: "Adamant",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Outrage", "Stomping Tantrum", "Dragon Dance", "Substitute"],
    items: ["Eviolite"]
  },
  Fraxure: {
    ability: "Mold Breaker",
    nature: "Adamant",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Outrage", "First Impression", "Poison Jab", "Low Kick"],
    items: ["Choice Band"]
  },
  Haxorus: {
    ability: "Mold Breaker",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["First Impression", "Outrage", "Earthquake", "Poison Jab"],
    items: ["Choice Band"]
  },
  Cubchoo: {
    ability: "Slush Rush",
    nature: "Adamant",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 0,
      spe: 25
    },
    moves: ["Liquidation", "Crunch", "Body Press", "Icicle Spear"],
    items: ["Choice Band", "Eviolite", "Life Orb", "Loaded Dice", "Choice Specs"]
  },
  Beartic: {
    ability: "Swift Swim",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Protect", "Icicle Spear", "Close Combat", "Encore"],
    items: ["Leftovers"]
  },
  Cryogonal: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Rapid Spin", "Freeze-Dry", "Recover", "Haze"],
    items: ["Heavy-Duty Boots"]
  },
  Shelmet: {
    ability: "Hydration",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Acid", "Bug Buzz", "Protect"],
    items: ["Eviolite"]
  },
  Accelgor: {
    ability: "Hydration",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Acid", "Acid Spray", "Protect"],
    items: ["Leftovers"]
  },
  Stunfisk: {
    ability: "Static",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Earthquake", "Discharge", "Rock Slide", "Protect"],
    items: ["Sitrus Berry"]
  },
  "Stunfisk-Galar": {
    ability: "Static",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 25,
      spa: 0,
      spd: 9,
      spe: 0
    },
    moves: ["Earthquake", "Steel Beam", "Rock Slide", "Protect"],
    items: ["Sitrus Berry"]
  },
  Mienfoo: {
    ability: "Regenerator",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["High Jump Kick", "U-turn", "Knock Off", "Fake Out"],
    items: ["Eviolite", "Choice Scarf"]
  },
  Mienshao: {
    ability: "Inner Focus",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Fake Out", "Feint", "Wide Guard"],
    items: ["Focus Sash"]
  },
  Druddigon: {
    ability: "Rough Skin",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Aqua Tail", "Bite", "Protect"],
    items: ["Leftovers"]
  },
  Golett: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Poltergeist", "Earthquake", "Thunder Punch", "Ice Punch"],
    items: ["Choice Scarf", "Assault Vest"]
  },
  Golurk: {
    ability: "Iron Fist",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Poltergeist", "Headlong Rush", "Ice Punch", "Protect"],
    items: ["Golurkite"]
  },
  "Golurk-Mega": {
    ability: "Unseen Fist",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Poltergeist", "Headlong Rush", "Ice Punch", "Protect"],
    items: ["Golurkite"]
  },
  Pawniard: {
    ability: "Defiant",
    nature: "Jolly",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Iron Head", "Tera Blast", "Sucker Punch", "Swords Dance"],
    items: ["Eviolite", "Life Orb"]
  },
  Bisharp: {
    ability: "Defiant",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 27,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 7
    },
    moves: ["Swords Dance", "Sucker Punch", "Iron Head", "Throat Chop"],
    items: ["Eviolite"]
  },
  Bouffalant: {
    ability: "Reckless",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Rufflet: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Close Combat", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Braviary: {
    ability: "Defiant",
    nature: "Adamant",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Tailwind", "Brave Bird", "Protect"],
    items: ["Covert Cloak"]
  },
  "Braviary-Hisui": {
    ability: "Sheer Force",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Psychic", "Hurricane", "Heat Wave", "Agility"],
    items: ["Life Orb"]
  },
  Vullaby: {
    ability: "Weak Armor",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 30,
      def: 10,
      spa: 0,
      spd: 0,
      spe: 25
    },
    moves: ["Brave Bird", "U-turn", "Knock Off", "Roost"],
    items: ["Eviolite", "Choice Scarf"]
  },
  Mandibuzz: {
    ability: "Overcoat",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 23,
      atk: 0,
      def: 5,
      spa: 1,
      spd: 29,
      spe: 8
    },
    moves: ["Foul Play", "Tailwind", "Snarl", "Roost"],
    items: ["Rocky Helmet"]
  },
  Heatmor: {
    ability: "Gluttony",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Belch", "Burning Jealousy", "Fire Blast", "Protect"],
    items: ["Leftovers"]
  },
  Durant: {
    ability: "Swarm",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Beat Up", "Bite", "Protect"],
    items: ["Leftovers"]
  },
  Deino: {
    ability: "Hustle",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Outrage", "Crunch", "Ice Fang", "Fire Fang"],
    items: ["Choice Band", "Eviolite", "Choice Specs", "Heavy-Duty Boots", "Dragon Fang", "Wide Lens", "Zoom Lens", "Choice Scarf", "Life Orb", "Silk Scarf", "Blunder Policy"]
  },
  Zweilous: {
    ability: "Hustle",
    nature: "Brave",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Outrage", "Crunch", "Zen Headbutt", "Stomping Tantrum"],
    items: ["Choice Band"]
  },
  Hydreigon: {
    ability: "Levitate",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Earth Power", "Dark Pulse", "Snarl"],
    items: ["Choice Scarf", "Life Orb", "Chople Berry"]
  },
  Larvesta: {
    ability: "Flame Body",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flare Blitz", "U-turn", "Will-O-Wisp", "Morning Sun"],
    items: ["Eviolite", "Heavy-Duty Boots"]
  },
  Volcarona: {
    ability: "Flame Body",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 16,
      spd: 0,
      spe: 18
    },
    moves: ["Heat Wave", "Struggle Bug", "Rage Powder", "Tailwind"],
    items: ["Sitrus Berry", "Charcoal", "Focus Sash", "Leftovers", "Charti Berry"]
  },
  Cobalion: {
    ability: "Justified",
    nature: "Bold",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 0,
      def: 20,
      spa: 1,
      spd: 1,
      spe: 12
    },
    moves: ["Protect", "Body Press", "Quick Guard", "Taunt"],
    items: ["Grassy Seed"]
  },
  Terrakion: {
    ability: "Justified",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stone Edge", "Close Combat", "Earthquake", "Quick Attack"],
    items: ["Choice Band"]
  },
  Virizion: {
    ability: "Justified",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Close Combat", "Stone Edge", "Synthesis"],
    items: ["Lum Berry"]
  },
  Tornadus: {
    ability: "Prankster",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 31,
      atk: 0,
      def: 4,
      spa: 20,
      spd: 1,
      spe: 10
    },
    moves: ["Bleakwind Storm", "Tailwind", "Protect", "Taunt"],
    items: ["Sky Plate", "Covert Cloak", "Sharp Beak", "Focus Sash", "Rocky Helmet"]
  },
  "Tornadus-Therian": {
    ability: "Regenerator",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 2,
      spd: 9,
      spe: 21
    },
    moves: ["Bleakwind Storm", "U-turn", "Knock Off", "Heat Wave"],
    items: ["Heavy-Duty Boots"]
  },
  Thundurus: {
    ability: "Prankster",
    nature: "Bold",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 20,
      spa: 0,
      spd: 13,
      spe: 0
    },
    moves: ["Wildbolt Storm", "Thunder Wave", "Eerie Impulse", "Rain Dance"],
    items: ["Covert Cloak", "Sitrus Berry", "Safety Goggles", "Ability Shield"]
  },
  "Thundurus-Therian": {
    ability: "Volt Absorb",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Thunderbolt", "Tera Blast", "Agility"],
    items: ["Heavy-Duty Boots"]
  },
  Reshiram: {
    ability: "Turboblaze",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Blue Flare", "Draco Meteor", "Earth Power", "Shadow Ball"],
    items: ["Choice Specs"]
  },
  Zekrom: {
    ability: "Teravolt",
    nature: "Jolly",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Dragon Dance", "Bolt Strike", "Dragon Claw", "Substitute"],
    items: ["Leftovers"]
  },
  Landorus: {
    ability: "Sheer Force",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 24,
      atk: 0,
      def: 3,
      spa: 30,
      spd: 1,
      spe: 8
    },
    moves: ["Sandsear Storm", "Sludge Bomb", "Earth Power", "Protect"],
    items: ["Life Orb"]
  },
  "Landorus-Therian": {
    ability: "Intimidate",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 19,
      atk: 15,
      def: 1,
      spa: 0,
      spd: 16,
      spe: 15
    },
    moves: ["Earthquake", "Stomping Tantrum", "Rock Slide", "U-turn"],
    items: ["Choice Band", "Choice Scarf", "Clear Amulet"]
  },
  Kyurem: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Draco Meteor", "Ice Beam", "Freeze-Dry", "Focus Blast"],
    items: ["Choice Specs"]
  },
  "Kyurem-Black": {
    ability: "Teravolt",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Dragon Dance", "Fusion Bolt", "Icicle Spear", "Scale Shot"],
    items: ["Loaded Dice"]
  },
  "Kyurem-White": {
    ability: "Turboblaze",
    nature: "Modest",
    teraType: "Ice",
    evs: {
      hp: 17,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 1,
      spe: 14
    },
    moves: ["Blizzard", "Freeze-Dry", "Draco Meteor", "Earth Power"],
    items: ["Choice Specs"]
  },
  Keldeo: {
    ability: "Justified",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Surf", "Aura Sphere", "Vacuum Wave", "Flip Turn"],
    items: ["Heavy-Duty Boots"]
  },
  "Keldeo-Resolute": {
    ability: "Justified",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Aura Sphere", "Bubble Beam", "Protect"],
    items: ["Leftovers"]
  },
  Meloetta: {
    ability: "Serene Grace",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Hyper Voice", "Psychic", "Shadow Ball", "Trick"],
    items: ["Choice Specs"]
  },
  "Meloetta-Pirouette": {
    ability: "Serene Grace",
    nature: "Adamant",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 3,
      def: 0,
      spa: 0,
      spd: 30,
      spe: 1
    },
    moves: ["Relic Song", "Close Combat", "U-turn", "Dream Eater"],
    items: ["Focus Sash"]
  },
  Genesect: {
    ability: "Download",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bug Buzz", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  "Genesect-Burn": {
    ability: "Download",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bug Buzz", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  "Genesect-Chill": {
    ability: "Download",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bug Buzz", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  "Genesect-Douse": {
    ability: "Download",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bug Buzz", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  "Genesect-Shock": {
    ability: "Download",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bug Buzz", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  Chespin: {
    ability: "Bulletproof",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Bullet Seed", "Spikes", "Synthesis", "Roar"],
    items: ["Eviolite", "Oran Berry"]
  },
  Quilladin: {
    ability: "Overgrow",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Drain Punch", "Rock Slide", "Grassy Glide", "Belly Drum"],
    items: ["Eviolite"]
  },
  Chesnaught: {
    ability: "Bulletproof",
    nature: "Impish",
    teraType: "",
    evs: {
      hp: 31,
      atk: 1,
      def: 28,
      spa: 0,
      spd: 5,
      spe: 1
    },
    moves: ["Body Press", "Iron Defense", "Wood Hammer", "Spiky Shield"],
    items: ["Chesnaughtite"]
  },
  "Chesnaught-Mega": {
    ability: "Bulletproof",
    nature: "Impish",
    teraType: "",
    evs: {
      hp: 31,
      atk: 1,
      def: 28,
      spa: 0,
      spd: 5,
      spe: 1
    },
    moves: ["Body Press", "Iron Defense", "Wood Hammer", "Spiky Shield"],
    items: ["Chesnaughtite"]
  },
  Fennekin: {
    ability: "Magician",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flamethrower", "Psychic", "Calm Mind", "Wish"],
    items: ["Eviolite", "Aguav Berry", "Quick Claw", "Focus Sash", "Life Orb", "Choice Specs", "White Herb", "Chesto Berry", "Charcoal", "Leftovers", "Oran Berry", "Figy Berry"]
  },
  Braixen: {
    ability: "Blaze",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 11,
      atk: 0,
      def: 10,
      spa: 24,
      spd: 20,
      spe: 1
    },
    moves: ["Flamethrower", "Psychic", "Foul Play", "Protect"],
    items: ["Eviolite"]
  },
  Delphox: {
    ability: "Blaze",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 11,
      atk: 0,
      def: 4,
      spa: 19,
      spd: 0,
      spe: 32
    },
    moves: ["Heat Wave", "Psychic", "Protect", "Nasty Plot"],
    items: ["Delphoxite"]
  },
  "Delphox-Mega": {
    ability: "Levitate",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 11,
      atk: 0,
      def: 4,
      spa: 19,
      spd: 0,
      spe: 32
    },
    moves: ["Heat Wave", "Psychic", "Protect", "Nasty Plot"],
    items: ["Delphoxite"]
  },
  Froakie: {
    ability: "Torrent",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hydro Pump", "Ice Beam", "Tera Blast", "Spikes"],
    items: ["Eviolite", "Choice Scarf"]
  },
  Frogadier: {
    ability: "Protean",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Ice Beam", "Surf", "U-turn", "Spikes"],
    items: ["Choice Specs", "Heavy-Duty Boots", "Choice Scarf"]
  },
  Greninja: {
    ability: "Protean",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 0,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Blizzard", "Flip Turn", "Protect"],
    items: ["Greninjite"]
  },
  "Greninja-Ash": {
    ability: "Battle Bond",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bubble", "Chilling Water", "Protect"],
    items: ["Leftovers"]
  },
  "Greninja-Mega": {
    ability: "Protean",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 0,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Blizzard", "Flip Turn", "Protect"],
    items: ["Greninjite"]
  },
  Bunnelby: {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bounce", "Brick Break", "Bulldoze", "Protect"],
    items: ["Eviolite"]
  },
  Diggersby: {
    ability: "Huge Power",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Earthquake", "Stone Edge", "Close Combat", "Protect"],
    items: ["Choice Scarf"]
  },
  Fletchling: {
    ability: "Gale Wings",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 25,
      def: 0,
      spa: 0,
      spd: 8,
      spe: 32
    },
    moves: ["U-turn", "Flame Charge", "Dual Wingbeat", "Roost"],
    items: ["Focus Sash", "Choice Band", "Heavy-Duty Boots", "Sharp Beak", "Leftovers", "Eviolite", "Iapapa Berry", "Oran Berry", "Eject Button", "Sitrus Berry", "Choice Specs", "Covert Cloak"]
  },
  Fletchinder: {
    ability: "Gale Wings",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Flare Blitz", "U-turn", "Roost", "Defog"],
    items: ["Heavy-Duty Boots", "Eviolite"]
  },
  Talonflame: {
    ability: "Gale Wings",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Flare Blitz", "Dual Wingbeat", "Tailwind", "Protect"],
    items: ["Sharp Beak", "Life Orb", "Charcoal", "Focus Sash"]
  },
  Scatterbug: {
    ability: "Compound Eyes",
    nature: "Naughty",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Bug Bite", "Pounce", "Stun Spore", "Poison Powder"],
    items: ["Eviolite", "Leftovers"]
  },
  Spewpa: {
    ability: "Friend Guard",
    nature: "Docile",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Struggle Bug", "Stun Spore", "Rage Powder", "Protect"],
    items: ["Eviolite"]
  },
  Vivillon: {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Fancy": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Pokeball": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  Litleo: {
    ability: "Moxie",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 25,
      def: 17,
      spa: 0,
      spd: 0,
      spe: 23
    },
    moves: ["Flare Blitz", "Hyper Voice", "Wild Charge", "Flame Charge"],
    items: ["Eviolite", "Throat Spray", "Choice Specs"]
  },
  Pyroar: {
    ability: "Rivalry",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Overheat", "Solar Beam", "Heat Wave", "Protect"],
    items: ["Pyroarite"]
  },
  "Pyroar-Mega": {
    ability: "Fire Mane",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Overheat", "Solar Beam", "Heat Wave", "Protect"],
    items: ["Pyroarite"]
  },
  Flabébé: {
    ability: "Flower Veil",
    nature: "Calm",
    teraType: "Fairy",
    evs: {
      hp: 24,
      atk: 0,
      def: 21,
      spa: 0,
      spd: 21,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Stored Power", "Calm Mind", "Baton Pass"],
    items: ["Eviolite"]
  },
  Floette: {
    ability: "Flower Veil",
    nature: "Calm",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Stored Power", "Calm Mind", "Baton Pass"],
    items: ["Eviolite"]
  },
  "Floette-Eternal": {
    ability: "Flower Veil",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Light of Ruin", "Moonblast", "Dazzling Gleam", "Protect"],
    items: ["Floettite"]
  },
  "Floette-Mega": {
    ability: "Fairy Aura",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Light of Ruin", "Moonblast", "Dazzling Gleam", "Protect"],
    items: ["Floettite"]
  },
  Florges: {
    ability: "Flower Veil",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Moonblast", "Psychic", "Trick", "Protect"],
    items: ["Leftovers"]
  },
  Skiddo: {
    ability: "Sap Sipper",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Horn Leech", "Facade", "Bulk Up", "Milk Drink"],
    items: ["Eviolite"]
  },
  Gogoat: {
    ability: "Sap Sipper",
    nature: "Careful",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Earthquake", "Horn Leech", "Bulk Up", "Milk Drink"],
    items: ["Leftovers", "Assault Vest", "Grassy Seed", "Heavy-Duty Boots", "Rocky Helmet", "Life Orb", "Lum Berry"]
  },
  Pancham: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Arm Thrust", "Body Slam", "Protect"],
    items: ["Eviolite"]
  },
  Pangoro: {
    ability: "Iron Fist",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Close Combat", "Earthquake", "Crunch", "Protect"],
    items: ["Choice Scarf"]
  },
  Furfrou: {
    ability: "Fur Coat",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Bite", "Close Combat", "Protect", "Knock Off"],
    items: ["Choice Scarf"]
  },
  Espurr: {
    ability: "Infiltrator",
    nature: "Modest",
    teraType: "Psychic",
    evs: {
      hp: 1,
      atk: 0,
      def: 6,
      spa: 32,
      spd: 0,
      spe: 27
    },
    moves: ["Psychic", "Thunderbolt", "Energy Ball", "Dark Pulse"],
    items: ["Eviolite", "Choice Specs", "Leftovers", "Light Clay", "Choice Scarf", "Assault Vest", "King's Rock", "Heavy-Duty Boots", "Life Orb"]
  },
  Meowstic: {
    ability: "Prankster",
    nature: "Calm",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 23,
      spa: 1,
      spd: 9,
      spe: 1
    },
    moves: ["Stored Power", "Charge Beam", "Psych Up", "Rest"],
    items: ["Meowsticite"]
  },
  "Meowstic-F": {
    ability: "Competitive",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 23,
      spa: 1,
      spd: 9,
      spe: 1
    },
    moves: ["Expanding Force", "Imprison", "Trick Room", "Charge Beam"],
    items: ["Meowsticite"]
  },
  "Meowstic-F-Mega": {
    ability: "Trace",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 16,
      spa: 18,
      spd: 0,
      spe: 0
    },
    moves: ["Expanding Force", "Imprison", "Trick Room", "Charge Beam"],
    items: ["Meowsticite"]
  },
  "Meowstic-M-Mega": {
    ability: "Trace",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 23,
      spa: 1,
      spd: 9,
      spe: 1
    },
    moves: ["Stored Power", "Charge Beam", "Psych Up", "Rest"],
    items: ["Meowsticite"]
  },
  Honedge: {
    ability: "No Guard",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brick Break", "Brutal Swing", "Protect"],
    items: ["Eviolite"]
  },
  Doublade: {
    ability: "No Guard",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brick Break", "Brutal Swing", "Protect"],
    items: ["Eviolite"]
  },
  Aegislash: {
    teraType: "",
    ability: "Stance Change",
    items: ["Spell Tag", "Focus Sash", "Leftovers", "Colbur Berry"],
    nature: "Adamant",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Poltergeist", "Shadow Sneak", "King's Shield"]
  },
  "Aegislash-Blade": {
    ability: "Stance Change",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Iron Head", "Shadow Claw", "Sacred Sword", "Protect"],
    items: ["Sitrus Berry"]
  },
  "Aegislash-Shield": {
    ability: "Stance Change",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Iron Head", "Shadow Claw", "Protect", "Flash Cannon"],
    items: ["Sitrus Berry"]
  },
  Spritzee: {
    ability: "Healer",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Dazzling Gleam", "Disarming Voice", "Protect"],
    items: ["Eviolite"]
  },
  Aromatisse: {
    ability: "Healer",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Dazzling Gleam", "Moonblast", "Protect", "Ally Switch"],
    items: ["Sitrus Berry"]
  },
  Swirlix: {
    ability: "Sweet Veil",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dazzling Gleam", "Draining Kiss", "Dream Eater", "Protect"],
    items: ["Eviolite"]
  },
  Slurpuff: {
    ability: "Sweet Veil",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Dazzling Gleam", "Play Rough", "Protect", "Calm Mind"],
    items: ["Sitrus Berry"]
  },
  Inkay: {
    ability: "Contrary",
    nature: "Brave",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Superpower", "Psycho Cut", "Knock Off", "Trick Room"],
    items: ["Eviolite"]
  },
  Malamar: {
    ability: "Contrary",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 10,
      def: 24,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Superpower", "Knock Off", "Topsy-Turvy", "Trick Room"],
    items: ["Malamarite", "Sitrus Berry"]
  },
  "Malamar-Mega": {
    ability: "Contrary",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Dark Pulse", "Psychic", "Thunderbolt", "Protect"],
    items: ["Malamarite"]
  },
  Binacle: {
    ability: "Tough Claws",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Beat Up", "Protect"],
    items: ["Eviolite"]
  },
  Barbaracle: {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 30,
      atk: 31,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 5
    },
    moves: ["Close Combat", "Rock Slide", "Protect", "Shell Smash"],
    items: ["Barbaracite"]
  },
  "Barbaracle-Mega": {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 30,
      atk: 31,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 5
    },
    moves: ["Close Combat", "Rock Slide", "Protect", "Shell Smash"],
    items: ["Barbaracite"]
  },
  Skrelp: {
    ability: "Adaptability",
    nature: "Adamant",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Liquidation", "Flip Turn", "Thief"],
    items: ["Eviolite"]
  },
  Dragalge: {
    ability: "Poison Point",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 2,
      def: 25,
      spa: 0,
      spd: 0,
      spe: 7
    },
    moves: ["Sludge Bomb", "Draco Meteor", "Toxic Spikes", "Flip Turn"],
    items: ["Dragalgite", "Leftovers"]
  },
  "Dragalge-Mega": {
    ability: "Regenerator",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Dragon Pulse", "Sludge Bomb", "Hydro Pump", "Protect"],
    items: ["Dragalgite"]
  },
  Clauncher: {
    ability: "Mega Launcher",
    nature: "Modest",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dragon Pulse", "Dark Pulse", "Aura Sphere", "Water Pulse"],
    items: ["Assault Vest", "Choice Specs", "Life Orb"]
  },
  Clawitzer: {
    ability: "Mega Launcher",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Dragon Pulse", "Water Pulse", "Aura Sphere", "U-turn"],
    items: ["Leftovers"]
  },
  Helioptile: {
    ability: "Dry Skin",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Dark Pulse", "Electro Ball", "Protect"],
    items: ["Eviolite"]
  },
  Heliolisk: {
    ability: "Solar Power",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Thunderbolt", "Focus Blast", "Volt Switch", "Protect"],
    items: ["Choice Scarf"]
  },
  Tyrunt: {
    ability: "Strong Jaw",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Bide", "Protect"],
    items: ["Eviolite"]
  },
  Tyrantrum: {
    ability: "Strong Jaw",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Stone Edge", "Close Combat", "Earthquake", "Protect"],
    items: ["Choice Scarf"]
  },
  Amaura: {
    ability: "Refrigerate",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Aurora Beam", "Blizzard", "Protect"],
    items: ["Eviolite"]
  },
  Aurorus: {
    ability: "Refrigerate",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Blizzard", "Psychic", "Protect", "Power Gem"],
    items: ["Choice Scarf"]
  },
  Sylveon: {
    ability: "Pixilate",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 9,
      atk: 0,
      def: 22,
      spa: 20,
      spd: 0,
      spe: 15
    },
    moves: ["Hyper Beam", "Hyper Voice", "Quick Attack", "Detect"],
    items: ["Fairy Feather"]
  },
  Hawlucha: {
    ability: "Limber",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 3,
      atk: 31,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Cross Chop", "Detect", "Dual Wingbeat"],
    items: ["Hawluchanite"]
  },
  "Hawlucha-Mega": {
    ability: "No Guard",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 3,
      atk: 31,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Cross Chop", "Detect", "Dual Wingbeat"],
    items: ["Hawluchanite"]
  },
  Dedenne: {
    teraType: "",
    ability: "Pickup",
    items: ["Sitrus Berry"],
    nature: "Timid",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Dazzling Gleam", "Volt Switch", "Super Fang", "Grass Knot"]
  },
  Carbink: {
    ability: "Clear Body",
    nature: "Quiet",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Trick Room", "Power Gem", "Meteor Beam", "Moonblast"],
    items: ["Power Herb"]
  },
  Goomy: {
    ability: "Sap Sipper",
    nature: "Modest",
    teraType: "Dragon",
    evs: {
      hp: 6,
      atk: 0,
      def: 0,
      spa: 30,
      spd: 30,
      spe: 0
    },
    moves: ["Thunderbolt", "Sludge Bomb", "Dragon Pulse", "Chilling Water"],
    items: ["Eviolite", "Leftovers", "Life Orb", "Focus Sash", "Assault Vest"]
  },
  Sliggoo: {
    ability: "Sap Sipper",
    nature: "Calm",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Draco Meteor", "Acid Armor", "Toxic", "Rest"],
    items: ["Eviolite"]
  },
  "Sliggoo-Hisui": {
    ability: "Sap Sipper",
    nature: "Calm",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Sludge Bomb", "Flash Cannon", "Rest", "Sleep Talk"],
    items: ["Eviolite"]
  },
  Goodra: {
    ability: "Sap Sipper",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Draco Meteor", "Fire Blast", "Sludge Wave", "Hydro Pump"],
    items: ["Leftovers"]
  },
  "Goodra-Hisui": {
    ability: "Shell Armor",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Body Press", "Muddy Water", "Shelter", "Protect"],
    items: ["Leftovers"]
  },
  Klefki: {
    ability: "Prankster",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 20,
      spa: 0,
      spd: 14,
      spe: 0
    },
    moves: ["Reflect", "Light Screen", "Thunder Wave", "Dazzling Gleam"],
    items: ["Shuca Berry"]
  },
  Phantump: {
    ability: "Natural Cure",
    nature: "Careful",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 5,
      def: 27,
      spa: 0,
      spd: 25,
      spe: 7
    },
    moves: ["Poltergeist", "Horn Leech", "Sucker Punch", "Will-O-Wisp"],
    items: ["Eviolite", "Oran Berry"]
  },
  Trevenant: {
    ability: "Harvest",
    nature: "Sassy",
    teraType: "",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Sucker Punch", "Horn Leech", "Trick Room", "Forest's Curse"],
    items: ["Sitrus Berry"]
  },
  Pumpkaboo: {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Astonish", "Bullet Seed", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  "Pumpkaboo-Large": {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Astonish", "Bullet Seed", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  "Pumpkaboo-Small": {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Astonish", "Bullet Seed", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  "Pumpkaboo-Super": {
    ability: "Pickup",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Astonish", "Bullet Seed", "Explosion", "Protect"],
    items: ["Eviolite"]
  },
  Gourgeist: {
    ability: "Frisk",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Shadow Ball", "Seed Bomb", "Protect", "Trick-or-Treat"],
    items: ["Sitrus Berry"]
  },
  "Gourgeist-Large": {
    ability: "Frisk",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Shadow Ball", "Seed Bomb", "Protect", "Trick-or-Treat"],
    items: ["Sitrus Berry"]
  },
  "Gourgeist-Small": {
    ability: "Frisk",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Shadow Ball", "Seed Bomb", "Protect", "Trick-or-Treat"],
    items: ["Sitrus Berry"]
  },
  "Gourgeist-Super": {
    ability: "Frisk",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 2
    },
    moves: ["Shadow Ball", "Seed Bomb", "Protect", "Trick-or-Treat"],
    items: ["Sitrus Berry"]
  },
  Bergmite: {
    ability: "Sturdy",
    nature: "Impish",
    teraType: "Steel",
    evs: {
      hp: 10,
      atk: 26,
      def: 30,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Stone Edge", "Avalanche", "Rapid Spin", "Recover"],
    items: ["Eviolite", "Heavy-Duty Boots", "Quick Claw", "Leftovers", "Light Clay"]
  },
  Avalugg: {
    ability: "Sturdy",
    nature: "Impish",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Iron Defense", "Body Press", "Recover", "Icicle Crash"],
    items: ["Leftovers"]
  },
  "Avalugg-Hisui": {
    ability: "Strong Jaw",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Mountain Gale", "Stone Edge", "Earthquake", "Heavy Slam"],
    items: ["Leftovers"]
  },
  Noibat: {
    ability: "Infiltrator",
    nature: "Modest",
    teraType: "Flying",
    evs: {
      hp: 6,
      atk: 0,
      def: 0,
      spa: 30,
      spd: 0,
      spe: 30
    },
    moves: ["Draco Meteor", "Heat Wave", "Air Slash", "U-turn"],
    items: ["Choice Scarf", "Heavy-Duty Boots", "Eviolite", "Focus Sash", "Choice Specs", "Throat Spray", "Petaya Berry", "Shell Bell", "Life Orb", "Liechi Berry"]
  },
  Noivern: {
    ability: "Telepathy",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Air Slash", "Tailwind", "Protect"],
    items: ["Focus Sash"]
  },
  Xerneas: {
    ability: "Fairy Aura",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Aurora Beam", "Dazzling Gleam", "Draining Kiss", "Protect"],
    items: ["Leftovers"]
  },
  Yveltal: {
    ability: "Dark Aura",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Dark Pulse", "Dream Eater", "Protect"],
    items: ["Leftovers"]
  },
  Zygarde: {
    ability: "Aura Break",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Bite", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  "Zygarde-10%": {
    ability: "Aura Break",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Dig", "Extreme Speed", "Protect"],
    items: ["Leftovers"]
  },
  "Zygarde-Complete": {
    ability: "Power Construct",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Bite", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Diancie: {
    ability: "Clear Body",
    nature: "Careful",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Stealth Rock", "Encore", "Diamond Storm", "Body Press"],
    items: ["Leftovers"]
  },
  "Diancie-Mega": {
    ability: "Magic Bounce",
    nature: "Careful",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Stealth Rock", "Encore", "Diamond Storm", "Body Press"],
    items: ["Diancite"]
  },
  Hoopa: {
    ability: "Magician",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Psyshock", "Shadow Ball", "Focus Blast", "Trick"],
    items: ["Choice Specs"]
  },
  "Hoopa-Unbound": {
    ability: "Magician",
    nature: "Quiet",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 20,
      spa: 13,
      spd: 0,
      spe: 0
    },
    moves: ["Knock Off", "Psychic Noise", "Drain Punch", "Thunderbolt"],
    items: ["Assault Vest"]
  },
  Volcanion: {
    ability: "Water Absorb",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Steam Eruption", "Flamethrower", "Earth Power", "Tera Blast"],
    items: ["Choice Specs"]
  },
  Rowlet: {
    ability: "Overgrow",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Leaf Blade", "Sucker Punch", "Swords Dance"],
    items: ["Life Orb"]
  },
  Dartrix: {
    ability: "Overgrow",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Knock Off", "Seed Bomb", "Sucker Punch"],
    items: ["Eviolite"]
  },
  Decidueye: {
    ability: "Long Reach",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Spirit Shackle", "Leaf Blade", "Shadow Sneak"],
    items: ["Spell Tag"]
  },
  "Decidueye-Hisui": {
    ability: "Scrappy",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 28,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 4
    },
    moves: ["Triple Arrows", "Leaf Blade", "Protect", "Brave Bird"],
    items: ["Scope Lens"]
  },
  Litten: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flare Blitz", "Leech Life", "Trailblaze", "Swords Dance"],
    items: ["Eviolite"]
  },
  Torracat: {
    ability: "Intimidate",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 30,
      atk: 0,
      def: 8,
      spa: 1,
      spd: 16,
      spe: 11
    },
    moves: ["Fake Out", "Will-O-Wisp", "Parting Shot", "Overheat"],
    items: ["Eviolite"]
  },
  Incineroar: {
    ability: "Intimidate",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 10,
      spe: 24
    },
    moves: ["Flare Blitz", "Throat Chop", "Fake Out", "Parting Shot"],
    items: ["Sitrus Berry", "Passho Berry", "Charcoal", "Leftovers", "Chople Berry"]
  },
  Popplio: {
    ability: "Liquid Voice",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Moonblast", "Ice Beam", "Hyper Voice", "Draining Kiss"],
    items: ["Eviolite", "Salac Berry", "Choice Specs", "Throat Spray", "Leftovers"]
  },
  Brionne: {
    ability: "Liquid Voice",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Draining Kiss", "Whirlpool", "Perish Song", "Protect"],
    items: ["Eviolite"]
  },
  Primarina: {
    ability: "Liquid Voice",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 21,
      atk: 0,
      def: 28,
      spa: 7,
      spd: 0,
      spe: 10
    },
    moves: ["Moonblast", "Hyper Voice", "Protect", "Calm Mind"],
    items: ["Leftovers", "Mystic Water", "Sitrus Berry", "Kebia Berry"]
  },
  Pikipek: {
    ability: "Skill Link",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["U-turn", "Acrobatics", "Bullet Seed", "Swords Dance"],
    items: ["Focus Sash", "Eviolite", "Muscle Band", "Life Orb", "Charti Berry", "King's Rock"]
  },
  Trumbeak: {
    ability: "Skill Link",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "Boomburst", "Bullet Seed", "Protect"],
    items: ["Eviolite"]
  },
  Toucannon: {
    teraType: "",
    ability: "Keen Eye",
    items: ["Choice Scarf"],
    nature: "Adamant",
    evs: {
      hp: 32,
      atk: 2,
      def: 5,
      spa: 0,
      spd: 26,
      spe: 1
    },
    moves: ["Beak Blast", "U-turn", "Protect", "Tailwind"]
  },
  Yungoos: {
    ability: "Adaptability",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Psychic Fangs", "Trailblaze", "Protect"],
    items: ["Eviolite", "Silk Scarf", "Black Glasses", "Choice Scarf", "Focus Sash"]
  },
  Gumshoos: {
    ability: "Stakeout",
    nature: "Brave",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Double-Edge", "Earthquake", "U-turn", "Knock Off"],
    items: ["Choice Band", "Silk Scarf"]
  },
  Grubbin: {
    ability: "Swarm",
    nature: "Adamant",
    teraType: "Bug",
    evs: {
      hp: 17,
      atk: 18,
      def: 15,
      spa: 0,
      spd: 15,
      spe: 1
    },
    moves: ["Facade", "X-Scissor", "Lunge", "Protect"],
    items: ["Eviolite"]
  },
  Charjabug: {
    ability: "Battery",
    nature: "Modest",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 2,
      spe: 0
    },
    moves: ["Electroweb", "Struggle Bug", "Protect", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Vikavolt: {
    ability: "Levitate",
    nature: "Quiet",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Bug Buzz", "Thunderbolt", "Discharge", "Protect"],
    items: ["Life Orb"]
  },
  Crabrawler: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Drain Punch", "Ice Punch", "Knock Off"],
    items: ["Eviolite"]
  },
  Crabominable: {
    ability: "Hyper Cutter",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Close Combat", "Ice Hammer", "Mach Punch", "Protect"],
    items: ["Crabominite"]
  },
  "Crabominable-Mega": {
    ability: "Iron Fist",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Close Combat", "Ice Hammer", "Mach Punch", "Protect"],
    items: ["Crabominite"]
  },
  Oricorio: {
    ability: "Dancer",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 4,
      spa: 0,
      spd: 0,
      spe: 29
    },
    moves: ["Quiver Dance", "Hurricane", "Revelation Dance", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  "Oricorio-Pa'u": {
    ability: "Dancer",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Quiver Dance", "Hurricane", "Revelation Dance", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  "Oricorio-Pom-Pom": {
    ability: "Dancer",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Quiver Dance", "Revelation Dance", "Hurricane", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  "Oricorio-Sensu": {
    ability: "Dancer",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 2,
      def: 3,
      spa: 0,
      spd: 0,
      spe: 29
    },
    moves: ["Quiver Dance", "Air Slash", "Taunt", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  Cutiefly: {
    ability: "Shield Dust",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Moonblast", "U-turn", "Sticky Web", "Stun Spore"],
    items: ["Focus Sash"]
  },
  Ribombee: {
    ability: "Shield Dust",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Moonblast", "Tailwind", "Fake Tears", "Protect"],
    items: ["Focus Sash"]
  },
  Rockruff: {
    ability: "Keen Eye",
    nature: "Hardy",
    teraType: "Rock",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stone Edge", "Rock Slide", "Rock Tomb", "Stealth Rock"],
    items: ["Quick Claw", "Choice Scarf", "Eviolite", "Life Orb", "Focus Sash", "Leftovers", "Heavy-Duty Boots", "Choice Band"]
  },
  "Rockruff-Dusk": {
    ability: "Own Tempo",
    nature: "Hardy",
    teraType: "Rock",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stone Edge", "Rock Slide", "Rock Tomb", "Stealth Rock"],
    items: ["Quick Claw", "Choice Scarf", "Eviolite", "Life Orb", "Focus Sash", "Leftovers", "Heavy-Duty Boots", "Choice Band"]
  },
  Lycanroc: {
    ability: "Sand Rush",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Psychic Fangs", "Rock Slide", "Protect"],
    items: ["Focus Sash"]
  },
  "Lycanroc-Dusk": {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Rock Slide", "Accelerock", "Protect"],
    items: ["Focus Sash"]
  },
  "Lycanroc-Midnight": {
    ability: "No Guard",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Stone Edge", "Close Combat", "Sucker Punch", "Outrage"],
    items: ["Choice Scarf"]
  },
  Wishiwashi: {
    ability: "Schooling",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Brine", "Hidden Power", "Hydro Pump", "Protect"],
    items: ["Leftovers"]
  },
  "Wishiwashi-School": {
    ability: "Schooling",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Brine", "Hidden Power", "Hydro Pump", "Protect"],
    items: ["Leftovers"]
  },
  Mareanie: {
    ability: "Regenerator",
    nature: "Bold",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Surf", "Ice Beam", "Recover"],
    items: ["Eviolite", "Eject Button"]
  },
  Toxapex: {
    ability: "Regenerator",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 18,
      spa: 0,
      spd: 16,
      spe: 0
    },
    moves: ["Infestation", "Toxic", "Baneful Bunker", "Wide Guard"],
    items: ["Leftovers"]
  },
  Mudbray: {
    ability: "Stamina",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "Stealth Rock", "Roar"],
    items: ["Eviolite", "Choice Scarf"]
  },
  Mudsdale: {
    ability: "Inner Focus",
    nature: "Brave",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["High Horsepower", "Close Combat", "Heavy Slam", "Rock Slide"],
    items: ["Soft Sand"]
  },
  Dewpider: {
    ability: "Water Bubble",
    nature: "Quiet",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hydro Pump", "Ice Beam", "Surf", "Bug Buzz"],
    items: ["Life Orb", "Choice Scarf"]
  },
  Araquanid: {
    ability: "Water Bubble",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 8,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 26
    },
    moves: ["Ice Beam", "Hydro Pump", "Sticky Web", "Wide Guard"],
    items: ["Never-Melt Ice"]
  },
  Fomantis: {
    ability: "Contrary",
    nature: "Hardy",
    teraType: "Grass",
    evs: {
      hp: 15,
      atk: 20,
      def: 20,
      spa: 5,
      spd: 6,
      spe: 0
    },
    moves: ["Leaf Storm", "Superpower", "Leech Life", "Synthesis"],
    items: ["Eviolite", "Leftovers", "Choice Scarf", "Heavy-Duty Boots", "Focus Sash", "Loaded Dice", "Chesto Berry", "Shell Bell", "Blunder Policy", "Life Orb", "Power Herb", "White Herb"]
  },
  Lurantis: {
    ability: "Contrary",
    nature: "Sassy",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Leaf Storm", "Superpower", "Synthesis", "Defog"],
    items: ["Heavy-Duty Boots"]
  },
  Morelull: {
    ability: "Illuminate",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Dazzling Gleam", "Draining Kiss", "Protect"],
    items: ["Eviolite"]
  },
  Shiinotic: {
    ability: "Illuminate",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Charge Beam", "Dazzling Gleam", "Protect"],
    items: ["Leftovers"]
  },
  Salandit: {
    ability: "Corrosion",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Fire Blast", "Sludge Wave", "Flamethrower", "Nasty Plot"],
    items: ["Air Balloon", "Oran Berry", "Eject Pack"]
  },
  Salazzle: {
    ability: "Oblivious",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Overheat", "Sludge Bomb", "Fake Out", "Fling"],
    items: ["King's Rock"]
  },
  Stufful: {
    ability: "Fluffy",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bide", "Bind", "Protect"],
    items: ["Eviolite"]
  },
  Bewear: {
    ability: "Fluffy",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Bide", "Bind", "Protect"],
    items: ["Leftovers"]
  },
  Bounsweet: {
    ability: "Leaf Guard",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Leaf Storm", "Play Rough", "Seed Bomb", "Rapid Spin"],
    items: ["Eviolite", "Choice Scarf", "Heat Rock", "Leftovers", "Ability Shield"]
  },
  Steenee: {
    ability: "Oblivious",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 21,
      def: 22,
      spa: 0,
      spd: 22,
      spe: 0
    },
    moves: ["Petal Blizzard", "Seed Bomb", "Triple Axel", "Protect"],
    items: ["Eviolite"]
  },
  Tsareena: {
    ability: "Queenly Majesty",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 30,
      atk: 3,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Power Whip", "Triple Axel", "Protect", "Low Kick"],
    items: ["Wide Lens", "Choice Scarf", "Expert Belt", "Sitrus Berry", "Occa Berry", "Life Orb", "Coba Berry"]
  },
  Comfey: {
    ability: "Triage",
    nature: "Bold",
    teraType: "Poison",
    evs: {
      hp: 30,
      atk: 0,
      def: 20,
      spa: 5,
      spd: 8,
      spe: 3
    },
    moves: ["Floral Healing", "Draining Kiss", "Trick Room", "Protect"],
    items: ["Leftovers"]
  },
  Oranguru: {
    ability: "Inner Focus",
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 20,
      spa: 0,
      spd: 12,
      spe: 2
    },
    moves: ["Psychic", "Instruct", "Trick Room", "Protect"],
    items: ["Sitrus Berry"]
  },
  Passimian: {
    ability: "Defiant",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Knock Off", "U-turn", "Earthquake"],
    items: ["Choice Scarf"]
  },
  Wimpod: {
    ability: "Wimp Out",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aqua Jet", "Assurance", "Facade", "Protect"],
    items: ["Eviolite"]
  },
  Golisopod: {
    ability: "Emergency Exit",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Brick Break", "Protect"],
    items: ["Leftovers"]
  },
  "Golisopod-Mega": {
    ability: "Emergency Exit",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Assurance", "Brick Break", "Protect"],
    items: ["Golisopite"]
  },
  Sandygast: {
    ability: "Water Compaction",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Shadow Ball", "Scorching Sands", "Shore Up", "Stealth Rock"],
    items: ["Eviolite"]
  },
  Palossand: {
    ability: "Water Compaction",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Scorching Sands", "Shadow Ball", "Shore Up"],
    items: ["Heavy-Duty Boots"]
  },
  Pyukumuku: {
    ability: "Innards Out",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Counter", "Mirror Coat", "Protect"],
    items: ["Leftovers"]
  },
  "Type: Null": {
    ability: "Battle Armor",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Hidden Power", "Hyper Beam", "Protect"],
    items: ["Eviolite"]
  },
  Silvally: {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Bug": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Dark": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Dragon": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Dragon",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Electric": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Fairy": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Fighting": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Fire": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Flying": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Ghost": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Grass": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Ground": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Ice": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Poison": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Psychic": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Rock": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Steel": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  "Silvally-Water": {
    ability: "RKS System",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Air Slash", "Draco Meteor", "Flamethrower", "Protect"],
    items: ["Leftovers"]
  },
  Minior: {
    ability: "Shields Down",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Shell Smash", "Acrobatics", "Earthquake", "Stone Edge"],
    items: ["White Herb"]
  },
  "Minior-Meteor": {
    ability: "Shields Down",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Charge Beam", "Dazzling Gleam", "Protect"],
    items: ["Leftovers"]
  },
  Komala: {
    ability: "Comatose",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Rapid Spin", "Knock Off", "U-turn", "Body Slam"],
    items: ["Assault Vest"]
  },
  Turtonator: {
    ability: "Shell Armor",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Burning Jealousy", "Charge Beam", "Draco Meteor", "Protect"],
    items: ["Leftovers"]
  },
  Togedemaru: {
    ability: "Iron Barbs",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Bounce", "Covet", "Protect"],
    items: ["Leftovers"]
  },
  Mimikyu: {
    ability: "Disguise",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 2,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Play Rough", "Shadow Claw", "Shadow Sneak", "Protect"],
    items: ["White Herb", "Spell Tag", "Mental Herb", "Lum Berry"]
  },
  "Mimikyu-Busted": {
    ability: "Disguise",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Astonish", "Beat Up", "Covet", "Protect"],
    items: ["Leftovers"]
  },
  Bruxish: {
    ability: "Dazzling",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Wave Crash", "Ice Fang", "Poison Fang", "Aqua Jet"],
    items: ["Covert Cloak", "Eject Button"]
  },
  Drampa: {
    ability: "Cloud Nine",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Hyper Voice", "Flamethrower", "Earth Power", "Protect"],
    items: ["Drampanite"]
  },
  "Drampa-Mega": {
    ability: "Berserk",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Hyper Voice", "Flamethrower", "Earth Power", "Protect"],
    items: ["Drampanite"]
  },
  Dhelmise: {
    ability: "Steelworker",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Anchor Shot", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  "Jangmo-o": {
    ability: "Marvel Scale",
    nature: "Modest",
    teraType: "Steel",
    evs: {
      hp: 6,
      atk: 0,
      def: 0,
      spa: 30,
      spd: 30,
      spe: 0
    },
    moves: ["Draco Meteor", "Tera Blast", "Draining Kiss", "Slack Off"],
    items: ["Eviolite"]
  },
  "Hakamo-o": {
    ability: "Bulletproof",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Drain Punch", "Scale Shot", "Swords Dance", "Substitute"],
    items: ["Eviolite"]
  },
  "Kommo-o": {
    ability: "Soundproof",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Clanging Scales", "Aura Sphere", "Protect", "Clangorous Soul"],
    items: ["Life Orb", "Leftovers", "Sitrus Berry"]
  },
  "Tapu Koko": {
    ability: "Electric Surge",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  "Tapu Lele": {
    ability: "Psychic Surge",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Confusion", "Dazzling Gleam", "Protect"],
    items: ["Leftovers"]
  },
  "Tapu Bulu": {
    ability: "Grassy Surge",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Brick Break", "Brutal Swing", "Bullet Seed", "Protect"],
    items: ["Leftovers"]
  },
  "Tapu Fini": {
    ability: "Misty Surge",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Brine", "Dazzling Gleam", "Protect"],
    items: ["Leftovers"]
  },
  Cosmog: {
    ability: "Unaware",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Splash", "Teleport"],
    items: ["Focus Sash", "Leftovers"]
  },
  Cosmoem: {
    ability: "Sturdy",
    nature: "Calm",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 24,
      spa: 0,
      spd: 9,
      spe: 0
    },
    moves: ["Cosmic Power", "Splash", "Teleport"],
    items: ["Eviolite", "Rocky Helmet", "Leftovers"]
  },
  Solgaleo: {
    ability: "Regenerator",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["U-turn", "Gigaton Hammer", "Final Gambit", "Trick"],
    items: ["Choice Scarf"]
  },
  Lunala: {
    ability: "Shadow Shield",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 30,
      atk: 0,
      def: 5,
      spa: 29,
      spd: 2,
      spe: 0
    },
    moves: ["Moongeist Beam", "Moonblast", "Trick Room", "Wide Guard"],
    items: ["Electric Seed", "Power Herb", "Leftovers"]
  },
  Nihilego: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Acid Spray", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  Buzzwole: {
    ability: "Beast Boost",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Slam", "Bounce", "Brick Break", "Protect"],
    items: ["Leftovers"]
  },
  Pheromosa: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Bug Buzz", "Echoed Voice", "Protect"],
    items: ["Leftovers"]
  },
  Xurkitree: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Charge Beam", "Dazzling Gleam", "Discharge", "Protect"],
    items: ["Leftovers"]
  },
  Celesteela: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Air Slash", "Energy Ball", "Protect"],
    items: ["Leftovers"]
  },
  Kartana: {
    ability: "Beast Boost",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Brick Break", "Cut", "Protect"],
    items: ["Leftovers"]
  },
  Guzzlord: {
    ability: "Beast Boost",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Body Press", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Necrozma: {
    ability: "Prism Armor",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Dragon Dance", "Photon Geyser", "Earthquake", "X-Scissor"],
    items: ["Lum Berry"]
  },
  "Necrozma-Dawn-Wings": {
    ability: "Prism Armor",
    nature: "Quiet",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Moongeist Beam", "Expanding Force", "Meteor Beam", "Trick Room"],
    items: ["Power Herb"]
  },
  "Necrozma-Dusk-Mane": {
    ability: "Prism Armor",
    nature: "Impish",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 26,
      spa: 0,
      spd: 0,
      spe: 7
    },
    moves: ["Dragon Dance", "Sunsteel Strike", "Knock Off", "Morning Sun"],
    items: ["Heavy-Duty Boots"]
  },
  "Necrozma-Ultra": {
    ability: "Neuroforce",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Moongeist Beam", "Mud Shot", "Round", "Protect"],
    items: ["Leftovers"]
  },
  Magearna: {
    ability: "Soul-Heart",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Flash Cannon", "Trick Room", "Protect"],
    items: ["Safety Goggles", "Covert Cloak", "Mental Herb", "Fairy Feather", "Life Orb", "Leftovers", "Assault Vest", "Sitrus Berry", "Pixie Plate"]
  },
  "Magearna-Original": {
    ability: "Soul-Heart",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Aura Sphere", "Aurora Beam", "Charge Beam", "Protect"],
    items: ["Leftovers"]
  },
  Marshadow: {
    ability: "Technician",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Assurance", "Blaze Kick", "Protect"],
    items: ["Leftovers"]
  },
  Poipole: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Dragon Pulse", "Echoed Voice", "Protect"],
    items: ["Eviolite"]
  },
  Naganadel: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Acid", "Air Cutter", "Air Slash", "Protect"],
    items: ["Leftovers"]
  },
  Stakataka: {
    ability: "Beast Boost",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bide", "Bind", "Body Press", "Protect"],
    items: ["Leftovers"]
  },
  Blacephalon: {
    ability: "Beast Boost",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Ember", "Expanding Force", "Protect"],
    items: ["Leftovers"]
  },
  Zeraora: {
    ability: "Volt Absorb",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  Meltan: {
    ability: "Magnet Pull",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Facade", "Gyro Ball", "Headbutt", "Protect"],
    items: ["Leftovers"]
  },
  Melmetal: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Press", "Body Slam", "Brick Break", "Protect"],
    items: ["Leftovers"]
  },
  Grookey: {
    ability: "Grassy Surge",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 30,
      def: 5,
      spa: 0,
      spd: 0,
      spe: 30
    },
    moves: ["Wood Hammer", "U-turn", "Knock Off", "Grassy Glide"],
    items: ["Eviolite", "Grassy Seed", "Life Orb"]
  },
  Thwackey: {
    ability: "Grassy Surge",
    nature: "Adamant",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 1
    },
    moves: ["Wood Hammer", "Grassy Glide", "U-turn", "Knock Off"],
    items: ["Terrain Extender"]
  },
  Rillaboom: {
    ability: "Grassy Surge",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 15,
      def: 1,
      spa: 0,
      spd: 14,
      spe: 4
    },
    moves: ["Wood Hammer", "U-turn", "Grassy Glide", "Fake Out"],
    items: ["Assault Vest"]
  },
  Scorbunny: {
    ability: "Blaze",
    nature: "Hardy",
    teraType: "Fire",
    evs: {
      hp: 17,
      atk: 9,
      def: 9,
      spa: 16,
      spd: 2,
      spe: 13
    },
    moves: ["High Jump Kick", "Gunk Shot", "Fire Blast", "Quick Attack"],
    items: ["Power Herb"]
  },
  Raboot: {
    ability: "Libero",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["High Jump Kick", "Flare Blitz", "Gunk Shot", "U-turn"],
    items: ["Choice Band", "Heavy-Duty Boots"]
  },
  Cinderace: {
    ability: "Blaze",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 30,
      atk: 4,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Pyro Ball", "U-turn", "Court Change", "Will-O-Wisp"],
    items: ["Heavy-Duty Boots"]
  },
  Sobble: {
    ability: "Sniper",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 0,
      def: 15,
      spa: 25,
      spd: 25,
      spe: 0
    },
    moves: ["Hydro Pump", "Surf", "Tera Blast", "U-turn"],
    items: ["Eviolite", "Choice Band"]
  },
  Drizzile: {
    ability: "Torrent",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Chilling Water", "Hydro Pump", "Water Pledge", "Protect"],
    items: ["Eviolite"]
  },
  Inteleon: {
    ability: "Torrent",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Hydro Pump", "Ice Beam", "Dark Pulse", "U-turn"],
    items: ["Choice Specs"]
  },
  Skwovet: {
    ability: "Cheek Pouch",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 6,
      atk: 30,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 30
    },
    moves: ["Body Slam", "Seed Bomb", "Thief", "Belly Drum"],
    items: ["Salac Berry", "Oran Berry", "Aguav Berry"]
  },
  Greedent: {
    ability: "Cheek Pouch",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 1
    },
    moves: ["Earthquake", "Body Slam", "Crunch", "Belly Drum"],
    items: ["Sitrus Berry"]
  },
  Rookidee: {
    ability: "Unnerve",
    nature: "Careful",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Brave Bird", "U-turn", "Roost", "Tailwind"],
    items: ["Eviolite", "Leftovers", "Heavy-Duty Boots"]
  },
  Corvisquire: {
    ability: "Big Pecks",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Power Trip", "Roost", "Agility", "Hone Claws"],
    items: ["Eviolite"]
  },
  Corviknight: {
    ability: "Mirror Armor",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 27,
      atk: 23,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 16
    },
    moves: ["Brave Bird", "Iron Head", "Tailwind", "Protect"],
    items: ["Leftovers", "Occa Berry", "Sitrus Berry"]
  },
  Blipbug: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Infestation", "Struggle Bug", "Earth Power", "Protect"],
    items: ["Eviolite"]
  },
  Dottler: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Buzz", "Confusion", "Energy Ball", "Protect"],
    items: ["Eviolite"]
  },
  Orbeetle: {
    ability: "Swarm",
    nature: "Timid",
    teraType: "Bug",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Bug Buzz", "Confusion", "Energy Ball", "Protect"],
    items: ["Leftovers"]
  },
  Nickit: {
    ability: "Run Away",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Mud Shot", "Round", "Snarl", "Protect"],
    items: ["Eviolite"]
  },
  Thievul: {
    ability: "Run Away",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Burning Jealousy", "Dark Pulse", "Grass Knot", "Protect"],
    items: ["Leftovers"]
  },
  Gossifleur: {
    ability: "Cotton Down",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Energy Ball", "Giga Drain", "Grass Knot", "Protect"],
    items: ["Eviolite"]
  },
  Eldegoss: {
    ability: "Cotton Down",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Energy Ball", "Giga Drain", "Grass Knot", "Protect"],
    items: ["Leftovers"]
  },
  Wooloo: {
    ability: "Fluffy",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Electro Ball", "Round", "Snore", "Protect"],
    items: ["Eviolite"]
  },
  Dubwool: {
    ability: "Fluffy",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Body Press", "Body Slam", "Bounce", "Protect"],
    items: ["Leftovers"]
  },
  Chewtle: {
    ability: "Strong Jaw",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Shell Smash", "Liquidation", "Crunch", "Ice Fang"],
    items: ["Eviolite"]
  },
  Drednaw: {
    ability: "Strong Jaw",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Shell Smash", "Liquidation", "Stone Edge", "Crunch"],
    items: ["White Herb"]
  },
  Yamper: {
    ability: "Ball Fetch",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Crunch", "Dig", "Protect"],
    items: ["Eviolite"]
  },
  Boltund: {
    ability: "Strong Jaw",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Electro Ball", "Hyper Beam", "Hyper Voice", "Protect"],
    items: ["Leftovers"]
  },
  Rolycoly: {
    ability: "Steam Engine",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Explosion", "Temper Flare", "Rock Blast", "Will-O-Wisp"],
    items: ["Focus Sash"]
  },
  Carkol: {
    ability: "Flame Body",
    nature: "Relaxed",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 2,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Flamethrower", "Rapid Spin", "Rock Blast", "Spikes"],
    items: ["Heavy-Duty Boots", "Power Herb", "Eviolite"]
  },
  Coalossal: {
    ability: "Flame Body",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flamethrower", "Power Gem", "Rapid Spin", "Stealth Rock"],
    items: ["Heavy-Duty Boots"]
  },
  Applin: {
    ability: "Ripen",
    nature: "Sassy",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Astonish", "Sucker Punch", "Tera Blast", "Pounce"],
    items: ["Eviolite"]
  },
  Flapple: {
    teraType: "",
    ability: "Hustle",
    items: ["Sitrus Berry"],
    nature: "Adamant",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Dragon Rush", "Grav Apple", "Aerial Ace", "Sucker Punch"]
  },
  Appletun: {
    ability: "Thick Fat",
    nature: "Sassy",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Apple Acid", "Dragon Pulse", "Dragon Tail", "Recover"],
    items: ["Leftovers"]
  },
  Silicobra: {
    ability: "Shed Skin",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Rock Blast", "Glare", "Rest", "Stealth Rock"],
    items: ["Eviolite", "Eject Button"]
  },
  Sandaconda: {
    ability: "Sand Spit",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 32
    },
    moves: ["Endeavor", "High Horsepower", "Glare", "Endure"],
    items: ["Focus Sash"]
  },
  Cramorant: {
    ability: "Gulp Missile",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 24,
      spa: 0,
      spd: 7,
      spe: 2
    },
    moves: ["Defog", "Roost", "Surf", "Brave Bird"],
    items: ["Heavy-Duty Boots"]
  },
  Arrokuda: {
    ability: "Swift Swim",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Close Combat", "Psychic Fangs", "Liquidation", "Flip Turn"],
    items: ["Life Orb", "Choice Band", "Choice Scarf"]
  },
  Barraskewda: {
    ability: "Swift Swim",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Liquidation", "Flip Turn", "Aqua Jet", "Close Combat"],
    items: ["Choice Band"]
  },
  Toxel: {
    ability: "Pickpocket",
    nature: "Relaxed",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Volt Switch", "Nuzzle", "Slack Off"],
    items: ["Eviolite"]
  },
  Toxtricity: {
    ability: "Punk Rock",
    nature: "Modest",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 31
    },
    moves: ["Overdrive", "Sludge Bomb", "Boomburst", "Volt Switch"],
    items: ["Choice Specs"]
  },
  "Toxtricity-Low-Key": {
    ability: "Punk Rock",
    nature: "Modest",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 1,
      spe: 31
    },
    moves: ["Overdrive", "Sludge Bomb", "Boomburst", "Volt Switch"],
    items: ["Choice Specs"]
  },
  Sizzlipede: {
    ability: "Flash Fire",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Brutal Swing", "Bug Bite", "Protect"],
    items: ["Eviolite"]
  },
  Centiskorch: {
    ability: "Flash Fire",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Brutal Swing", "Bug Bite", "Protect"],
    items: ["Leftovers"]
  },
  Clobbopus: {
    ability: "Limber",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Body Slam", "Brick Break", "Protect"],
    items: ["Eviolite"]
  },
  Grapploct: {
    ability: "Limber",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bind", "Body Slam", "Brick Break", "Protect"],
    items: ["Leftovers"]
  },
  Sinistea: {
    ability: "Weak Armor",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Tera Blast", "Stored Power", "Nasty Plot", "Endure"],
    items: ["Weakness Policy", "Eviolite"]
  },
  "Sinistea-Antique": {
    ability: "Weak Armor",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Tera Blast", "Stored Power", "Nasty Plot", "Endure"],
    items: ["Weakness Policy", "Eviolite"]
  },
  Polteageist: {
    ability: "Weak Armor",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Shell Smash", "Shadow Ball", "Stored Power", "Protect"],
    items: ["Focus Sash"]
  },
  "Polteageist-Antique": {
    ability: "Weak Armor",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Shell Smash", "Shadow Ball", "Stored Power", "Protect"],
    items: ["Focus Sash"]
  },
  Hatenna: {
    ability: "Magic Bounce",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 4,
      atk: 0,
      def: 30,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Psychic", "Mystical Fire", "Healing Wish", "Trick Room"],
    items: ["Eviolite", "Choice Scarf"]
  },
  Hattrem: {
    ability: "Magic Bounce",
    nature: "Quiet",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Healing Wish", "Psychic", "Mystical Fire", "Nuzzle"],
    items: ["Eviolite"]
  },
  Hatterene: {
    ability: "Magic Bounce",
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 28,
      atk: 0,
      def: 5,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Psychic", "Dazzling Gleam", "Trick Room", "Protect"],
    items: ["Fairy Feather", "Focus Sash"]
  },
  Impidimp: {
    ability: "Prankster",
    nature: "Careful",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Reflect", "Light Screen", "Parting Shot"],
    items: ["Light Clay"]
  },
  Morgrem: {
    ability: "Prankster",
    nature: "Calm",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Reflect", "Light Screen", "Parting Shot", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Grimmsnarl: {
    ability: "Prankster",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 19,
      spa: 0,
      spd: 15,
      spe: 0
    },
    moves: ["Spirit Break", "Parting Shot", "Reflect", "Light Screen"],
    items: ["Light Clay"]
  },
  Obstagoon: {
    ability: "Reckless",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Body Press", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Perrserker: {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Iron Head", "Knock Off", "U-turn"],
    items: ["Heavy-Duty Boots"]
  },
  Cursola: {
    ability: "Weak Armor",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Ancient Power", "Blizzard", "Brine", "Protect"],
    items: ["Leftovers"]
  },
  "Sirfetch’d": {
    ability: "Steadfast",
    nature: "Jolly",
    teraType: "Fighting",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Assurance", "Body Slam", "Brave Bird", "Protect"],
    items: ["Leftovers"]
  },
  "Mr. Rime": {
    ability: "Screen Cleaner",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Psychic", "Focus Blast", "Blizzard", "Protect"],
    items: ["Choice Scarf"]
  },
  Runerigus: {
    ability: "Wandering Spirit",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 2
    },
    moves: ["Shadow Ball", "Focus Blast", "Protect", "Dark Pulse"],
    items: ["Sitrus Berry"]
  },
  Milcery: {
    ability: "Aroma Veil",
    nature: "Calm",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Draining Kiss", "Stored Power", "Recover"],
    items: ["Eviolite", "Heavy-Duty Boots"]
  },
  Alcremie: {
    ability: "Aroma Veil",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 1,
      spd: 1,
      spe: 0
    },
    moves: ["Decorate", "Dazzling Gleam", "Helping Hand", "Protect"],
    items: ["Sitrus Berry"]
  },
  Falinks: {
    ability: "Battle Armor",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Knock Off", "No Retreat", "Iron Head"],
    items: ["Falinksite", "Life Orb"]
  },
  "Falinks-Mega": {
    ability: "Defiant",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Coaching", "Iron Head", "Protect"],
    items: ["Falinksite"]
  },
  Pincurchin: {
    ability: "Electric Surge",
    nature: "Bold",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Discharge", "Scald", "Spikes", "Memento"],
    items: ["Terrain Extender"]
  },
  Snom: {
    ability: "Ice Scales",
    nature: "Quiet",
    teraType: "Ice",
    evs: {
      hp: 1,
      atk: 0,
      def: 20,
      spa: 30,
      spd: 15,
      spe: 0
    },
    moves: ["Bug Buzz", "Lunge", "Icy Wind", "Icicle Spear"],
    items: ["Eviolite", "Focus Sash", "Occa Berry", "Loaded Dice"]
  },
  Frosmoth: {
    ability: "Ice Scales",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 15,
      atk: 0,
      def: 29,
      spa: 6,
      spd: 1,
      spe: 15
    },
    moves: ["Tera Blast", "Protect", "Quiver Dance", "Blizzard"],
    items: ["Grassy Seed"]
  },
  Stonjourner: {
    ability: "Power Spot",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Body Press", "Rock Slide", "Protect", "Wide Guard"],
    items: ["Figy Berry"]
  },
  Eiscue: {
    ability: "Ice Face",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Liquidation", "Ice Spinner", "Icicle Spear", "Belly Drum"],
    items: ["Loaded Dice", "Sitrus Berry", "Salac Berry", "Leftovers"]
  },
  "Eiscue-Noice": {
    ability: "Ice Face",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Liquidation", "Ice Spinner", "Icicle Spear", "Belly Drum"],
    items: ["Loaded Dice", "Sitrus Berry", "Salac Berry", "Leftovers"]
  },
  Indeedee: {
    ability: "Psychic Surge",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Expanding Force", "Tera Blast", "Protect", "Helping Hand"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Indeedee-F": {
    ability: "Psychic Surge",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 2,
      def: 31,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Psychic", "Follow Me", "Trick Room", "Helping Hand"],
    items: ["Safety Goggles", "Psychic Seed", "Rocky Helmet", "Mental Herb"]
  },
  Morpeko: {
    ability: "Hunger Switch",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Aura Wheel", "Knock Off", "Rapid Spin", "Parting Shot"],
    items: ["Leftovers"]
  },
  "Morpeko-Hangry": {
    ability: "Hunger Switch",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Aura Wheel", "Knock Off", "Rapid Spin", "Parting Shot"],
    items: ["Leftovers"]
  },
  Cufant: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Play Rough", "Iron Head", "Heavy Slam"],
    items: ["Eviolite", "Life Orb", "Choice Band", "Assault Vest", "Chesto Berry", "Leftovers", "Rocky Helmet", "Metal Coat"]
  },
  Copperajah: {
    ability: "Sheer Force",
    nature: "Careful",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 29,
      spe: 4
    },
    moves: ["Stealth Rock", "Iron Head", "Knock Off", "Whirlwind"],
    items: ["Leftovers"]
  },
  Dracozolt: {
    ability: "Volt Absorb",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Aerial Ace", "Body Slam", "Bolt Beak", "Protect"],
    items: ["Leftovers"]
  },
  Arctozolt: {
    ability: "Volt Absorb",
    nature: "Jolly",
    teraType: "Electric",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Avalanche", "Body Slam", "Bolt Beak", "Protect"],
    items: ["Leftovers"]
  },
  Dracovish: {
    ability: "Water Absorb",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Bite", "Body Slam", "Brutal Swing", "Protect"],
    items: ["Leftovers"]
  },
  Arctovish: {
    ability: "Water Absorb",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Avalanche", "Bite", "Body Slam", "Protect"],
    items: ["Leftovers"]
  },
  Duraludon: {
    ability: "Light Metal",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Flash Cannon", "Body Press", "Thunderbolt"],
    items: ["Expert Belt"]
  },
  Dreepy: {
    ability: "Cursed Body",
    nature: "Timid",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Draco Meteor", "U-turn", "Hex", "Will-O-Wisp"],
    items: ["Eviolite"]
  },
  Drakloak: {
    ability: "Infiltrator",
    nature: "Timid",
    teraType: "Dragon",
    evs: {
      hp: 2,
      atk: 0,
      def: 19,
      spa: 0,
      spd: 19,
      spe: 26
    },
    moves: ["Will-O-Wisp", "Reflect", "Light Screen", "Curse"],
    items: ["Eviolite", "Choice Scarf", "Leftovers", "Heavy-Duty Boots"]
  },
  Dragapult: {
    ability: "Cursed Body",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Hex", "Will-O-Wisp", "Protect"],
    items: ["Focus Sash", "Life Orb", "Dragon Fang"]
  },
  Zacian: {
    ability: "Intrepid Sword",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Play Rough", "Crunch", "Wild Charge", "Close Combat"],
    items: ["Choice Band"]
  },
  "Zacian-Crowned": {
    ability: "Intrepid Sword",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 9,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 23
    },
    moves: ["Behemoth Blade", "Play Rough", "Protect", "Swords Dance"],
    items: ["Rusted Sword"]
  },
  Zamazenta: {
    ability: "Dauntless Shield",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 2,
      def: 11,
      spa: 0,
      spd: 0,
      spe: 21
    },
    moves: ["Iron Defense", "Body Press", "Crunch", "Roar"],
    items: ["Leftovers"]
  },
  "Zamazenta-Crowned": {
    ability: "Dauntless Shield",
    nature: "Impish",
    teraType: "Dragon",
    evs: {
      hp: 30,
      atk: 1,
      def: 20,
      spa: 0,
      spd: 13,
      spe: 2
    },
    moves: ["Body Press", "Wide Guard", "Protect", "Heavy Slam"],
    items: ["Rusted Shield"]
  },
  Eternatus: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 14,
      atk: 0,
      def: 10,
      spa: 11,
      spd: 3,
      spe: 28
    },
    moves: ["Dynamax Cannon", "Sludge Bomb", "Shadow Ball", "Toxic Spikes"],
    items: ["Covert Cloak", "Power Herb", "Life Orb", "Leftovers"]
  },
  "Eternatus-Eternamax": {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Poison",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Dragon Pulse", "Dynamax Cannon", "Protect"],
    items: ["Leftovers"]
  },
  Kubfu: {
    ability: "Inner Focus",
    nature: "Adamant",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Close Combat", "Swords Dance", "Iron Head", "Protect"],
    items: ["Eviolite"]
  },
  Urshifu: {
    ability: "Unseen Fist",
    nature: "Adamant",
    teraType: "Stellar",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Wicked Blow", "Sucker Punch", "Detect"],
    items: ["Focus Sash", "Choice Band", "Covert Cloak", "Dread Plate", "Power Band"]
  },
  "Urshifu-Rapid-Strike": {
    ability: "Unseen Fist",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "U-turn", "Aqua Jet", "Surging Strikes"],
    items: ["Choice Band", "Choice Scarf", "Mystic Water", "Focus Sash"]
  },
  Zarude: {
    ability: "Leaf Guard",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Knock Off", "Power Whip", "Jungle Healing"],
    items: ["Leftovers"]
  },
  "Zarude-Dada": {
    ability: "Leaf Guard",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Acrobatics", "Aerial Ace", "Assurance", "Protect"],
    items: ["Leftovers"]
  },
  Regieleki: {
    ability: "Transistor",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Thunderbolt", "Volt Switch", "Electroweb", "Protect"],
    items: ["Focus Sash"]
  },
  Regidrago: {
    ability: "Dragon's Maw",
    nature: "Modest",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dragon Energy", "Draco Meteor", "Earth Power", "Protect"],
    items: ["Dragon Fang", "Life Orb"]
  },
  Glastrier: {
    ability: "Chilling Neigh",
    nature: "Impish",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Icicle Crash", "Body Press", "Protect", "Iron Defense"],
    items: ["Leftovers", "Clear Amulet"]
  },
  Spectrier: {
    ability: "Grim Neigh",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 31,
      atk: 0,
      def: 2,
      spa: 1,
      spd: 8,
      spe: 24
    },
    moves: ["Hex", "Snarl", "Protect", "Will-O-Wisp"],
    items: ["Sitrus Berry", "Covert Cloak", "Wide Lens", "Clear Amulet", "Life Orb"]
  },
  Calyrex: {
    ability: "Unnerve",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 11,
      spa: 0,
      spd: 0,
      spe: 22
    },
    moves: ["Calm Mind", "Agility", "Stored Power", "Giga Drain"],
    items: ["Weakness Policy"]
  },
  "Calyrex-Ice": {
    ability: "As One (Glastrier)",
    nature: "Adamant",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 7,
      def: 0,
      spa: 0,
      spd: 27,
      spe: 0
    },
    moves: ["Glacial Lance", "Trick Room", "Protect", "Leech Seed"],
    items: ["Leftovers", "Clear Amulet"]
  },
  "Calyrex-Shadow": {
    ability: "As One (Spectrier)",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Astral Barrage", "Psychic", "Protect", "Encore"],
    items: ["Focus Sash", "Life Orb", "Spooky Plate"]
  },
  Wyrdeer: {
    teraType: "",
    ability: "Intimidate",
    items: ["Mental Herb"],
    nature: "Relaxed",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Psyshield Bash", "Trick Room", "Hypnosis", "Gravity"]
  },
  Kleavor: {
    ability: "Sharpness",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "X-Scissor", "Stone Axe", "Protect"],
    items: ["Focus Sash", "Choice Scarf", "Life Orb"]
  },
  Ursaluna: {
    ability: "Guts",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 28,
      atk: 30,
      def: 5,
      spa: 0,
      spd: 2,
      spe: 1
    },
    moves: ["Headlong Rush", "Earthquake", "Facade", "Protect"],
    items: ["Flame Orb"]
  },
  "Ursaluna-Bloodmoon": {
    ability: "Mind's Eye",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Blood Moon", "Earth Power", "Hyper Voice", "Protect"],
    items: ["Life Orb", "Silk Scarf", "Assault Vest"]
  },
  Basculegion: {
    ability: "Adaptability",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Wave Crash", "Last Respects", "Aqua Jet", "Protect"],
    items: ["Mystic Water", "Choice Scarf", "Life Orb", "Sitrus Berry"]
  },
  "Basculegion-F": {
    ability: "Adaptability",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 0,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Shadow Ball", "Muddy Water", "Hydro Pump", "Ice Beam"],
    items: ["Choice Scarf"]
  },
  Sneasler: {
    ability: "Poison Touch",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Dire Claw", "Fake Out", "Protect"],
    items: ["Focus Sash", "White Herb"]
  },
  Overqwil: {
    ability: "Poison Point",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Throat Chop", "Icy Wind", "Acid Spray"],
    items: ["Leftovers", "Sitrus Berry"]
  },
  Enamorus: {
    ability: "Contrary",
    nature: "Timid",
    teraType: "Stellar",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Moonblast", "Earth Power", "Tera Blast", "Healing Wish"],
    items: ["Choice Scarf"]
  },
  "Enamorus-Therian": {
    ability: "Overcoat",
    nature: "Modest",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Calm Mind", "Draining Kiss", "Earth Power", "Mystical Fire"],
    items: ["Heavy-Duty Boots"]
  },
  Sprigatito: {
    ability: "Protean",
    nature: "Serious",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Petal Blizzard", "Play Rough", "U-turn", "Shadow Claw"],
    items: ["Choice Scarf"]
  },
  Floragato: {
    ability: "Protean",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Petal Blizzard", "Play Rough", "U-turn", "Sucker Punch"],
    items: ["Eviolite", "Choice Scarf", "Choice Band"]
  },
  Meowscarada: {
    ability: "Protean",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 4,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 28
    },
    moves: ["Flower Trick", "Knock Off", "Triple Axel", "Low Kick"],
    items: ["Choice Scarf", "Focus Sash", "Life Orb"]
  },
  Fuecoco: {
    ability: "Unaware",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flamethrower", "Will-O-Wisp", "Slack Off", "Roar"],
    items: ["Eviolite"]
  },
  Crocalor: {
    ability: "Unaware",
    nature: "Sassy",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
      def: 5,
      spa: 0,
      spd: 29,
      spe: 0
    },
    moves: ["Slack Off", "Flamethrower", "Will-O-Wisp", "Roar"],
    items: ["Eviolite"]
  },
  Skeledirge: {
    ability: "Unaware",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 29,
      atk: 0,
      def: 8,
      spa: 20,
      spd: 5,
      spe: 4
    },
    moves: ["Torch Song", "Protect", "Slack Off", "Heat Wave"],
    items: ["Leftovers"]
  },
  Quaxly: {
    ability: "Moxie",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 30,
      def: 10,
      spa: 0,
      spd: 0,
      spe: 25
    },
    moves: ["Brave Bird", "Liquidation", "Rapid Spin", "Aqua Jet"],
    items: ["Eviolite"]
  },
  Quaxwell: {
    ability: "Torrent",
    nature: "Careful",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 2,
      def: 10,
      spa: 0,
      spd: 22,
      spe: 0
    },
    moves: ["Rapid Spin", "Roost", "Flip Turn", "Encore"],
    items: ["Eviolite"]
  },
  Quaquaval: {
    ability: "Moxie",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Protect", "Aqua Step", "Coaching"],
    items: ["Focus Sash"]
  },
  Lechonk: {
    ability: "Gluttony",
    nature: "Careful",
    teraType: "Flying",
    evs: {
      hp: 2,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Body Slam", "Zen Headbutt", "Rest", "Protect"],
    items: ["Shell Bell", "Eviolite", "Liechi Berry"]
  },
  Oinkologne: {
    ability: "Lingering Aroma",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Double-Edge", "High Horsepower", "Body Press", "Facade"],
    items: ["Eject Button", "Assault Vest", "Aguav Berry", "Apicot Berry", "Ganlon Berry", "Salac Berry"]
  },
  "Oinkologne-F": {
    ability: "Aroma Veil",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 1,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Play Rough", "Body Press", "Facade", "Curse"],
    items: ["Leftovers"]
  },
  Tarountula: {
    ability: "Insomnia",
    nature: "Impish",
    teraType: "Ghost",
    evs: {
      hp: 10,
      atk: 6,
      def: 20,
      spa: 0,
      spd: 25,
      spe: 5
    },
    moves: ["First Impression", "Circle Throw", "Toxic Spikes", "Spikes"],
    items: ["Focus Sash", "Eviolite", "Leftovers", "Heavy-Duty Boots"]
  },
  Spidops: {
    ability: "Prankster",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 1,
      def: 14,
      spa: 0,
      spd: 19,
      spe: 0
    },
    moves: ["Sticky Web", "Spikes", "Taunt", "Memento"],
    items: ["Focus Sash"]
  },
  Nymble: {
    ability: "Tinted Lens",
    nature: "Adamant",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["First Impression", "Leech Life", "U-turn", "Sucker Punch"],
    items: ["Life Orb"]
  },
  Lokix: {
    ability: "Tinted Lens",
    nature: "Adamant",
    teraType: "Bug",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["First Impression", "U-turn", "Knock Off", "Leech Life"],
    items: ["Choice Band"]
  },
  Pawmi: {
    ability: "Natural Cure",
    nature: "Bold",
    teraType: "Electric",
    evs: {
      hp: 11,
      atk: 0,
      def: 25,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Volt Switch", "Nuzzle", "Encore", "Wish"],
    items: ["Eviolite", "Focus Sash", "Choice Band"]
  },
  Pawmo: {
    ability: "Volt Absorb",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Wild Charge", "Low Kick", "Fake Out", "Protect"],
    items: ["Focus Sash"]
  },
  Pawmot: {
    ability: "Natural Cure",
    nature: "Jolly",
    teraType: "Stellar",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Double Shock", "Close Combat", "Fake Out", "Revival Blessing"],
    items: ["Focus Sash"]
  },
  Tandemaus: {
    ability: "Own Tempo",
    nature: "Hardy",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Double-Edge", "U-turn", "Thunder Wave", "Encore"],
    items: ["Eviolite", "Heat Rock", "Life Orb", "Ring Target", "Leftovers", "Choice Band", "Choice Scarf", "Loaded Dice"]
  },
  Maushold: {
    ability: "Friend Guard",
    nature: "Impish",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 12,
      spa: 0,
      spd: 22,
      spe: 0
    },
    moves: ["Feint", "Follow Me", "Protect", "Super Fang"],
    items: ["Focus Sash", "Chople Berry", "Wide Lens"]
  },
  "Maushold-Four": {
    ability: "Friend Guard",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Feint", "Follow Me", "Protect", "Super Fang"],
    items: ["Focus Sash", "Wide Lens", "Chople Berry"]
  },
  Fidough: {
    ability: "Own Tempo",
    nature: "Careful",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Play Rough", "Protect", "Yawn", "Wish"],
    items: ["Eviolite"]
  },
  Dachsbun: {
    ability: "Well-Baked Body",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 25,
      spa: 0,
      spd: 8,
      spe: 0
    },
    moves: ["Body Press", "Snarl", "Protect", "Helping Hand"],
    items: ["Leftovers"]
  },
  Smoliv: {
    ability: "Early Bird",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earth Power", "Tera Blast", "Giga Drain", "Strength Sap"],
    items: ["Eviolite"]
  },
  Dolliv: {
    ability: "Harvest",
    nature: "Modest",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Giga Drain", "Strength Sap", "Substitute", "Protect"],
    items: ["Sitrus Berry"]
  },
  Arboliva: {
    ability: "Seed Sower",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 30,
      atk: 0,
      def: 1,
      spa: 18,
      spd: 16,
      spe: 1
    },
    moves: ["Giga Drain", "Earth Power", "Dazzling Gleam", "Tera Blast"],
    items: ["Assault Vest"]
  },
  Squawkabilly: {
    ability: "Hustle",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Brave Bird", "Double-Edge", "U-turn", "Quick Attack"],
    items: ["Choice Band", "Flame Orb"]
  },
  "Squawkabilly-Blue": {
    ability: "Hustle",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Brave Bird", "Double-Edge", "U-turn", "Quick Attack"],
    items: ["Choice Band", "Flame Orb"]
  },
  "Squawkabilly-White": {
    ability: "Hustle",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Brave Bird", "Double-Edge", "U-turn", "Quick Attack"],
    items: ["Choice Band", "Flame Orb"]
  },
  "Squawkabilly-Yellow": {
    ability: "Hustle",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Brave Bird", "Double-Edge", "U-turn", "Quick Attack"],
    items: ["Choice Band", "Flame Orb"]
  },
  Nacli: {
    ability: "Purifying Salt",
    nature: "Impish",
    teraType: "Rock",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "Recover", "Stealth Rock"],
    items: ["Eviolite", "Damp Rock", "Leftovers", "Power Herb", "Aguav Berry", "Shell Bell", "Smooth Rock"]
  },
  Naclstack: {
    ability: "Purifying Salt",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Salt Cure", "Protect", "Recover", "Curse"],
    items: ["Eviolite"]
  },
  Garganacl: {
    ability: "Purifying Salt",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Salt Cure", "Recover", "Protect", "Stealth Rock"],
    items: ["Leftovers"]
  },
  Charcadet: {
    ability: "Flash Fire",
    nature: "Hasty",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flamethrower", "Flame Charge", "Will-O-Wisp", "Destiny Bond"],
    items: ["Eviolite", "Focus Sash", "Flame Plate", "Leftovers", "Charcoal", "Aguav Berry", "Safety Goggles", "Choice Scarf", "Expert Belt", "Choice Specs", "Heavy-Duty Boots", "White Herb", "Life Orb", "Eject Pack", "Rocky Helmet", "Choice Band"]
  },
  Armarouge: {
    ability: "Weak Armor",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 16,
      spa: 17,
      spd: 1,
      spe: 31
    },
    moves: ["Heat Wave", "Expanding Force", "Stored Power", "Endure"],
    items: ["Leftovers"]
  },
  Ceruledge: {
    ability: "Flash Fire",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 31,
      atk: 25,
      def: 10,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Bitter Blade", "Shadow Sneak", "Protect", "Bulk Up"],
    items: ["Colbur Berry", "Sitrus Berry", "Leftovers"]
  },
  Tadbulb: {
    ability: "Own Tempo",
    nature: "Hardy",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Thunder", "Thunderbolt", "Discharge", "Volt Switch"],
    items: ["Quick Claw", "Eviolite", "Leftovers"]
  },
  Bellibolt: {
    ability: "Electromorphosis",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 23,
      atk: 0,
      def: 14,
      spa: 27,
      spd: 1,
      spe: 1
    },
    moves: ["Thunderbolt", "Parabolic Charge", "Volt Switch", "Weather Ball"],
    items: ["Leftovers"]
  },
  Wattrel: {
    ability: "Volt Absorb",
    nature: "Modest",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Hurricane", "Thunderbolt", "Volt Switch", "Weather Ball"],
    items: ["Eviolite", "Choice Scarf", "Life Orb"]
  },
  Kilowattrel: {
    ability: "Competitive",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Thunderbolt", "Air Slash", "Tailwind", "Protect"],
    items: ["Focus Sash"]
  },
  Maschiff: {
    ability: "Stakeout",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 27,
      def: 0,
      spa: 0,
      spd: 14,
      spe: 24
    },
    moves: ["Crunch", "Play Rough", "Fire Fang", "Psychic Fangs"],
    items: ["Choice Scarf"]
  },
  Mabosstiff: {
    ability: "Stakeout",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Crunch", "Play Rough", "Psychic Fangs", "Destiny Bond"],
    items: ["Choice Scarf"]
  },
  Shroodle: {
    ability: "Prankster",
    nature: "Relaxed",
    teraType: "Flying",
    evs: {
      hp: 16,
      atk: 0,
      def: 30,
      spa: 0,
      spd: 20,
      spe: 0
    },
    moves: ["U-turn", "Encore", "Parting Shot", "Sunny Day"],
    items: ["Heat Rock", "Damp Rock", "Grassy Seed"]
  },
  Grafaiai: {
    ability: "Unburden",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Acrobatics", "Low Kick", "Encore"],
    items: ["Grassy Seed"]
  },
  Bramblin: {
    ability: "Wind Rider",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Rapid Spin", "Shadow Sneak", "Strength Sap", "Spikes"],
    items: ["Eviolite"]
  },
  Brambleghast: {
    ability: "Wind Rider",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Poltergeist", "Power Whip", "Rapid Spin", "Strength Sap"],
    items: ["Heavy-Duty Boots"]
  },
  Toedscool: {
    ability: "Mycelium Might",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earth Power", "Giga Drain", "Knock Off", "Rapid Spin"],
    items: ["Eviolite"]
  },
  Toedscruel: {
    ability: "Mycelium Might",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 16,
      atk: 0,
      def: 23,
      spa: 1,
      spd: 2,
      spe: 24
    },
    moves: ["Earth Power", "Acid Spray", "Spore", "Rage Powder"],
    items: ["Covert Cloak"]
  },
  Klawf: {
    ability: "Regenerator",
    nature: "Impish",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 2,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["High Horsepower", "Rock Blast", "Stealth Rock", "Swords Dance"],
    items: ["Leftovers", "Heat Rock", "Rocky Helmet", "Life Orb", "Assault Vest", "Focus Sash"]
  },
  Capsakid: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Solar Beam", "Tera Blast", "Giga Drain", "Sunny Day"],
    items: ["Heat Rock", "Lum Berry", "Choice Scarf", "Miracle Seed", "Eviolite", "Choice Specs", "Shell Bell", "Leftovers", "Focus Sash"]
  },
  Scovillain: {
    ability: "Moody",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 15,
      spa: 0,
      spd: 15,
      spe: 4
    },
    moves: ["Overheat", "Giga Drain", "Rage Powder", "Protect"],
    items: ["Scovillainite"]
  },
  "Scovillain-Mega": {
    ability: "Spicy Spray",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 15,
      spa: 0,
      spd: 15,
      spe: 4
    },
    moves: ["Overheat", "Giga Drain", "Rage Powder", "Protect"],
    items: ["Scovillainite"]
  },
  Rellor: {
    ability: "Shed Skin",
    nature: "Adamant",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Recover", "Cosmic Power"],
    items: ["Eviolite", "Focus Sash", "Leftovers", "Metronome"]
  },
  Rabsca: {
    ability: "Synchronize",
    nature: "Quiet",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Trick Room", "Bug Buzz", "Psychic", "Revival Blessing"],
    items: ["Heavy-Duty Boots"]
  },
  Flittle: {
    ability: "Speed Boost",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Tera Blast", "Stored Power", "Calm Mind", "Protect"],
    items: ["Focus Sash", "Weakness Policy", "Eviolite"]
  },
  Espathra: {
    ability: "Speed Boost",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 16,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 18
    },
    moves: ["Lumina Crash", "Protect", "Baton Pass", "Calm Mind"],
    items: ["Sitrus Berry", "Focus Sash", "Mental Herb", "Colbur Berry", "Kasib Berry"]
  },
  Tinkatink: {
    ability: "Pickpocket",
    nature: "Calm",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Knock Off", "Draining Kiss", "Stealth Rock", "Thunder Wave"],
    items: ["Eviolite", "Air Balloon", "Oran Berry"]
  },
  Tinkatuff: {
    ability: "Mold Breaker",
    nature: "Impish",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Knock Off", "Stealth Rock", "Thunder Wave", "Encore"],
    items: ["Eviolite"]
  },
  Tinkaton: {
    ability: "Mold Breaker",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 23,
      atk: 8,
      def: 7,
      spa: 0,
      spd: 0,
      spe: 28
    },
    moves: ["Gigaton Hammer", "Fake Out", "Encore", "Protect"],
    items: ["Shuca Berry", "Focus Sash", "Sitrus Berry", "King's Rock"]
  },
  Wiglett: {
    ability: "Gooey",
    nature: "Jolly",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Liquidation", "Throat Chop", "Memento", "Protect"],
    items: ["Focus Sash", "Eviolite", "Smooth Rock", "Liechi Berry", "Toxic Orb", "Life Orb"]
  },
  Wugtrio: {
    ability: "Gooey",
    nature: "Jolly",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Liquidation", "Tera Blast", "Sucker Punch", "Aqua Jet"],
    items: ["Choice Band", "Weakness Policy"]
  },
  Bombirdier: {
    ability: "Big Pecks",
    nature: "Careful",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 23,
      spe: 10
    },
    moves: ["Knock Off", "Stealth Rock", "U-turn", "Roost"],
    items: ["Heavy-Duty Boots"]
  },
  Finizen: {
    ability: "Water Veil",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 6,
      atk: 0,
      def: 0,
      spa: 30,
      spd: 0,
      spe: 30
    },
    moves: ["Boomburst", "Ice Beam", "Surf", "Protect"],
    items: ["Life Orb"]
  },
  Palafin: {
    ability: "Zero to Hero",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 31,
      def: 1,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Wave Crash", "Jet Punch", "Protect", "Bulk Up"],
    items: ["Leftovers", "Mystic Water"]
  },
  "Palafin-Hero": {
    ability: "Zero to Hero",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 32,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Jet Punch", "Wave Crash", "Protect", "Haze"],
    items: ["Mystic Water"]
  },
  Varoom: {
    ability: "Overcoat",
    nature: "Brave",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Spin Out", "Parting Shot", "Protect"],
    items: ["Eviolite"]
  },
  Revavroom: {
    ability: "Filter",
    nature: "Adamant",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Shift Gear", "Iron Head", "Gunk Shot", "High Horsepower"],
    items: ["Air Balloon"]
  },
  Cyclizar: {
    ability: "Regenerator",
    nature: "Timid",
    teraType: "Dragon",
    evs: {
      hp: 15,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 19,
      spe: 32
    },
    moves: ["Shed Tail", "Draco Meteor", "Protect", "Endeavor"],
    items: ["Covert Cloak"]
  },
  Orthworm: {
    ability: "Earth Eater",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 3
    },
    moves: ["Heavy Slam", "Helping Hand", "Body Press", "Smack Down"],
    items: ["Occa Berry"]
  },
  Glimmet: {
    ability: "Toxic Debris",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Bomb", "Power Gem", "Mud Shot", "Stealth Rock"],
    items: ["Eviolite", "Focus Sash", "Power Herb"]
  },
  Glimmora: {
    ability: "Toxic Debris",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Sludge Bomb", "Earth Power", "Power Gem", "Spiky Shield"],
    items: ["Focus Sash", "Sitrus Berry"]
  },
  "Glimmora-Mega": {
    ability: "Adaptability",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Sludge Bomb", "Earth Power", "Power Gem", "Spiky Shield"],
    items: ["Glimmoranite"]
  },
  Greavard: {
    ability: "Fluffy",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 1,
      atk: 20,
      def: 25,
      spa: 0,
      spd: 20,
      spe: 0
    },
    moves: ["Stomping Tantrum", "Ice Fang", "Shadow Sneak", "Pain Split"],
    items: ["Eviolite", "Weakness Policy"]
  },
  Houndstone: {
    ability: "Sand Rush",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Last Respects", "Protect", "Shadow Sneak", "Psychic Fangs"],
    items: ["Focus Sash"]
  },
  Flamigo: {
    ability: "Scrappy",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Dual Wingbeat", "Wide Guard", "Protect"],
    items: ["Focus Sash"]
  },
  Cetoddle: {
    ability: "Thick Fat",
    nature: "Adamant",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Icicle Crash", "Knock Off", "Ice Shard"],
    items: ["Eviolite", "Salac Berry"]
  },
  Cetitan: {
    ability: "Slush Rush",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Belly Drum", "Ice Spinner", "Earthquake", "Knock Off"],
    items: ["Sitrus Berry"]
  },
  Veluza: {
    ability: "Sharpness",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Fillet Away", "Aqua Cutter", "Psycho Cut", "Substitute"],
    items: ["Sitrus Berry"]
  },
  Dondozo: {
    ability: "Unaware",
    nature: "Impish",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 1,
      def: 25,
      spa: 0,
      spd: 32,
      spe: 7
    },
    moves: ["Earthquake", "Body Press", "Order Up", "Protect"],
    items: ["Leftovers"]
  },
  Tatsugiri: {
    ability: "Commander",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 7,
      atk: 0,
      def: 5,
      spa: 28,
      spd: 1,
      spe: 25
    },
    moves: ["Draco Meteor", "Muddy Water", "Protect", "Helping Hand"],
    items: ["Safety Goggles", "Focus Sash", "Choice Scarf", "Assault Vest"]
  },
  "Tatsugiri-Droopy": {
    ability: "Commander",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 7,
      atk: 0,
      def: 5,
      spa: 28,
      spd: 1,
      spe: 25
    },
    moves: ["Draco Meteor", "Muddy Water", "Protect", "Helping Hand"],
    items: ["Safety Goggles", "Focus Sash", "Choice Scarf", "Assault Vest"]
  },
  "Tatsugiri-Stretchy": {
    ability: "Commander",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 7,
      atk: 0,
      def: 5,
      spa: 28,
      spd: 1,
      spe: 25
    },
    moves: ["Draco Meteor", "Muddy Water", "Protect", "Helping Hand"],
    items: ["Safety Goggles", "Focus Sash", "Choice Scarf", "Assault Vest"]
  },
  Annihilape: {
    teraType: "",
    ability: "Defiant",
    items: ["Focus Sash", "Choice Scarf", "Leftovers", "Sitrus Berry"],
    nature: "Jolly",
    evs: {
      hp: 0,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Close Combat", "Phantom Force", "Rock Tomb", "Protect"]
  },
  Clodsire: {
    ability: "Unaware",
    nature: "Careful",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 1,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Earthquake", "Recover", "Toxic", "Amnesia"],
    items: ["Heavy-Duty Boots"]
  },
  Farigiraf: {
    ability: "Armor Tail",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 25,
      atk: 0,
      def: 26,
      spa: 0,
      spd: 15,
      spe: 0
    },
    moves: ["Psychic", "Thunderbolt", "Trick Room", "Helping Hand"],
    items: ["Sitrus Berry", "Colbur Berry"]
  },
  Dudunsparce: {
    ability: "Serene Grace",
    nature: "Careful",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Body Slam", "Dragon Tail", "Coil", "Roost"],
    items: ["Leftovers"]
  },
  Kingambit: {
    ability: "Defiant",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Kowtow Cleave", "Iron Head", "Sucker Punch", "Protect"],
    items: ["Black Glasses", "Chople Berry", "Life Orb", "Focus Sash", "Occa Berry"]
  },
  "Great Tusk": {
    ability: "Protosynthesis",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Headlong Rush", "Ice Spinner", "Rapid Spin", "Knock Off"],
    items: ["Rocky Helmet"]
  },
  "Scream Tail": {
    ability: "Protosynthesis",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
      def: 23,
      spa: 1,
      spd: 1,
      spe: 9
    },
    moves: ["Dazzling Gleam", "Disable", "Encore", "Protect"],
    items: ["Booster Energy"]
  },
  "Brute Bonnet": {
    ability: "Protosynthesis",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 31,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Seed Bomb", "Sucker Punch", "Spore", "Rage Powder"],
    items: ["Sitrus Berry", "Covert Cloak"]
  },
  "Flutter Mane": {
    ability: "Protosynthesis",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 3,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 31
    },
    moves: ["Moonblast", "Shadow Ball", "Icy Wind", "Protect"],
    items: ["Focus Sash", "Booster Energy"]
  },
  "Slither Wing": {
    ability: "Protosynthesis",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["First Impression", "Close Combat", "U-turn", "Earthquake"],
    items: ["Assault Vest"]
  },
  "Sandy Shocks": {
    ability: "Protosynthesis",
    nature: "Timid",
    teraType: "Stellar",
    evs: {
      hp: 6,
      atk: 0,
      def: 1,
      spa: 26,
      spd: 1,
      spe: 32
    },
    moves: ["Protect", "Earth Power", "Thunderbolt", "Electroweb"],
    items: ["Booster Energy"]
  },
  "Iron Treads": {
    ability: "Quark Drive",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 31
    },
    moves: ["Steel Roller", "High Horsepower", "Iron Head", "Protect"],
    items: ["Life Orb", "Choice Band"]
  },
  "Iron Bundle": {
    ability: "Quark Drive",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 3,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 31
    },
    moves: ["Freeze-Dry", "Icy Wind", "Protect", "Encore"],
    items: ["Focus Sash", "Safety Goggles"]
  },
  "Iron Hands": {
    ability: "Quark Drive",
    nature: "Brave",
    teraType: "Bug",
    evs: {
      hp: 11,
      atk: 23,
      def: 2,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Wild Charge", "Drain Punch", "Fake Out", "Low Kick"],
    items: ["Assault Vest"]
  },
  "Iron Jugulis": {
    ability: "Quark Drive",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 30,
      atk: 0,
      def: 9,
      spa: 6,
      spd: 9,
      spe: 12
    },
    moves: ["Hurricane", "Snarl", "Tailwind", "Protect"],
    items: ["Booster Energy"]
  },
  "Iron Moth": {
    ability: "Quark Drive",
    nature: "Timid",
    teraType: "Dark",
    evs: {
      hp: 22,
      atk: 0,
      def: 5,
      spa: 6,
      spd: 1,
      spe: 32
    },
    moves: ["Flamethrower", "Pounce", "Protect", "Toxic Spikes"],
    items: ["Booster Energy", "Expert Belt"]
  },
  "Iron Thorns": {
    ability: "Quark Drive",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Dragon Dance", "Supercell Slam", "Ice Punch", "Protect"],
    items: ["Booster Energy"]
  },
  Frigibax: {
    ability: "Thermal Exchange",
    nature: "Adamant",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Aqua Tail", "Icicle Crash", "Dragon Claw", "Crunch"],
    items: ["Eviolite", "Leftovers", "Life Orb", "Choice Scarf", "Shell Bell", "Choice Band", "Assault Vest", "Blunder Policy", "Expert Belt", "Icy Rock", "Draco Plate"]
  },
  Arctibax: {
    ability: "Thermal Exchange",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Avalanche", "Dragon Claw", "Brick Break", "Crunch"],
    items: ["Eviolite"]
  },
  Baxcalibur: {
    ability: "Thermal Exchange",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 30
    },
    moves: ["Glaive Rush", "Icicle Crash", "Ice Shard", "Protect"],
    items: ["Clear Amulet", "Loaded Dice"]
  },
  "Baxcalibur-Mega": {
    ability: "Thermal Exchange",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 2,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 30
    },
    moves: ["Glaive Rush", "Icicle Crash", "Ice Shard", "Protect"],
    items: ["Baxcalibrite"]
  },
  Gimmighoul: {
    ability: "Rattled",
    nature: "Quiet",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Shadow Ball", "Power Gem", "Tera Blast", "Nasty Plot"],
    items: ["Life Orb"]
  },
  "Gimmighoul-Roaming": {
    ability: "Run Away",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 1,
      atk: 0,
      def: 10,
      spa: 30,
      spd: 0,
      spe: 25
    },
    moves: ["Power Gem", "Shadow Ball", "Tera Blast", "Nasty Plot"],
    items: ["Life Orb", "Oran Berry"]
  },
  Gholdengo: {
    ability: "Good as Gold",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 7,
      atk: 0,
      def: 0,
      spa: 27,
      spd: 0,
      spe: 32
    },
    moves: ["Make It Rain", "Shadow Ball", "Protect", "Nasty Plot"],
    items: ["Life Orb", "Metal Coat", "Spell Tag", "Choice Scarf", "Focus Sash"]
  },
  "Wo-Chien": {
    ability: "Tablets of Ruin",
    nature: "Bold",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 0,
      def: 6,
      spa: 1,
      spd: 3,
      spe: 24
    },
    moves: ["Protect", "Leech Seed", "Pollen Puff", "Ruination"],
    items: ["Leftovers"]
  },
  "Chien-Pao": {
    ability: "Sword of Ruin",
    nature: "Jolly",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 31
    },
    moves: ["Ice Spinner", "Sucker Punch", "Protect", "Ruination"],
    items: ["Focus Sash", "Assault Vest", "Life Orb"]
  },
  "Ting-Lu": {
    ability: "Vessel of Ruin",
    nature: "Impish",
    teraType: "Fairy",
    evs: {
      hp: 27,
      atk: 0,
      def: 17,
      spa: 0,
      spd: 22,
      spe: 0
    },
    moves: ["Throat Chop", "Sand Tomb", "Ruination", "Protect"],
    items: ["Leftovers", "Assault Vest", "Choice Band", "Rocky Helmet", "Safety Goggles", "Sitrus Berry"]
  },
  "Chi-Yu": {
    ability: "Beads of Ruin",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 7,
      atk: 0,
      def: 1,
      spa: 25,
      spd: 1,
      spe: 32
    },
    moves: ["Overheat", "Heat Wave", "Dark Pulse", "Snarl"],
    items: ["Choice Scarf"]
  },
  "Roaring Moon": {
    ability: "Protosynthesis",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 9,
      atk: 20,
      def: 1,
      spa: 0,
      spd: 4,
      spe: 32
    },
    moves: ["Knock Off", "Acrobatics", "Tailwind", "Protect"],
    items: ["Booster Energy"]
  },
  "Iron Valiant": {
    ability: "Quark Drive",
    nature: "Naive",
    teraType: "Ghost",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 31
    },
    moves: ["Spirit Break", "Icy Wind", "Wide Guard", "Coaching"],
    items: ["Focus Sash", "Booster Energy"]
  },
  Koraidon: {
    ability: "Orichalcum Pulse",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 3,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 31
    },
    moves: ["Flare Blitz", "Flame Charge", "Protect", "Low Kick"],
    items: ["Clear Amulet", "Life Orb", "Ability Shield"]
  },
  Miraidon: {
    ability: "Hadron Engine",
    nature: "Modest",
    teraType: "Electric",
    evs: {
      hp: 4,
      atk: 0,
      def: 4,
      spa: 25,
      spd: 1,
      spe: 32
    },
    moves: ["Draco Meteor", "Electro Drift", "Volt Switch", "Snarl"],
    items: ["Choice Scarf", "Life Orb", "Choice Specs"]
  },
  "Walking Wake": {
    ability: "Protosynthesis",
    nature: "Timid",
    teraType: "Water",
    evs: {
      hp: 1,
      atk: 0,
      def: 1,
      spa: 31,
      spd: 1,
      spe: 32
    },
    moves: ["Draco Meteor", "Hydro Steam", "Snarl", "Protect"],
    items: ["Assault Vest", "Life Orb", "Focus Sash", "Choice Specs", "Covert Cloak"]
  },
  "Iron Leaves": {
    ability: "Quark Drive",
    nature: "Jolly",
    teraType: "Normal",
    evs: {
      hp: 12,
      atk: 20,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Megahorn", "Leaf Blade", "Psyblade", "Protect"],
    items: ["Life Orb", "Choice Band"]
  },
  Dipplin: {
    ability: "Sticky Hold",
    nature: "Relaxed",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Growth", "Recover", "Dragon Tail", "Giga Drain"],
    items: ["Eviolite"]
  },
  Poltchageist: {
    ability: "Heatproof",
    nature: "Modest",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 1,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Leaf Storm", "Scald", "Shadow Ball", "Giga Drain"],
    items: ["Choice Scarf", "Eviolite"]
  },
  "Poltchageist-Artisan": {
    ability: "Hospitality",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Absorb", "Energy Ball", "Giga Drain", "Protect"],
    items: ["Eviolite"]
  },
  Sinistcha: {
    ability: "Hospitality",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 4,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Matcha Gotcha", "Rage Powder", "Protect", "Trick Room"],
    items: ["Colbur Berry", "Occa Berry", "Kasib Berry", "Sitrus Berry", "Coba Berry", "Focus Sash"]
  },
  "Sinistcha-Masterpiece": {
    ability: "Hospitality",
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 14,
      spa: 0,
      spd: 20,
      spe: 0
    },
    moves: ["Matcha Gotcha", "Rage Powder", "Protect", "Trick Room"],
    items: ["Kasib Berry", "Sitrus Berry", "Occa Berry", "Coba Berry", "Colbur Berry", "Focus Sash"]
  },
  Okidogi: {
    ability: "Guard Dog",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 29,
      atk: 15,
      def: 1,
      spa: 0,
      spd: 3,
      spe: 18
    },
    moves: ["Gunk Shot", "Drain Punch", "Upper Hand", "Knock Off"],
    items: ["Assault Vest", "Leftovers"]
  },
  Munkidori: {
    ability: "Toxic Chain",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Sludge Wave", "Psyshock", "Grass Knot", "U-turn"],
    items: ["Heavy-Duty Boots"]
  },
  Fezandipiti: {
    ability: "Toxic Chain",
    nature: "Careful",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 20,
      def: 0,
      spa: 0,
      spd: 6,
      spe: 8
    },
    moves: ["Play Rough", "U-turn", "Roost", "Beat Up"],
    items: ["Heavy-Duty Boots"]
  },
  Ogerpon: {
    ability: "Defiant",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 6,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 3,
      spe: 24
    },
    moves: ["Wood Hammer", "Knock Off", "Follow Me", "Taunt"],
    items: ["Focus Sash", "Loaded Dice", "Covert Cloak"]
  },
  "Ogerpon-Cornerstone": {
    ability: "Sturdy",
    nature: "Jolly",
    teraType: "Rock",
    evs: {
      hp: 15,
      atk: 0,
      def: 24,
      spa: 0,
      spd: 0,
      spe: 27
    },
    moves: ["Ivy Cudgel", "Knock Off", "Spiky Shield", "Follow Me"],
    items: ["Cornerstone Mask"]
  },
  "Ogerpon-Hearthflame": {
    ability: "Mold Breaker",
    nature: "Adamant",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 11,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 21
    },
    moves: ["Ivy Cudgel", "Grassy Glide", "Spiky Shield", "Follow Me"],
    items: ["Hearthflame Mask"]
  },
  "Ogerpon-Wellspring": {
    ability: "Water Absorb",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 26,
      spa: 0,
      spd: 7,
      spe: 0
    },
    moves: ["Ivy Cudgel", "Spiky Shield", "Follow Me", "Taunt"],
    items: ["Wellspring Mask"]
  },
  Archaludon: {
    ability: "Stamina",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 27,
      atk: 0,
      def: 5,
      spa: 5,
      spd: 15,
      spe: 14
    },
    moves: ["Electro Shot", "Dragon Pulse", "Flash Cannon", "Protect"],
    items: ["Leftovers"]
  },
  Hydrapple: {
    ability: "Regenerator",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 2,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Fickle Beam", "Protect", "Syrup Bomb", "Earth Power"],
    items: ["Coba Berry"]
  },
  "Gouging Fire": {
    ability: "Protosynthesis",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 17,
      atk: 18,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 29
    },
    moves: ["Flare Blitz", "Breaking Swipe", "Burning Bulwark", "Howl"],
    items: ["Booster Energy"]
  },
  "Raging Bolt": {
    ability: "Protosynthesis",
    nature: "Modest",
    teraType: "Electric",
    evs: {
      hp: 13,
      atk: 0,
      def: 9,
      spa: 25,
      spd: 1,
      spe: 18
    },
    moves: ["Thunderbolt", "Dragon Pulse", "Thunderclap", "Protect"],
    items: ["Booster Energy", "Assault Vest", "Life Orb"]
  },
  "Iron Boulder": {
    ability: "Quark Drive",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 1,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Mighty Cleave", "Zen Headbutt", "Protect"],
    items: ["Clear Amulet", "Choice Band"]
  },
  "Iron Crown": {
    ability: "Quark Drive",
    nature: "Timid",
    teraType: "Fire",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Psyshock", "Tera Blast", "Volt Switch", "Tachyon Cutter"],
    items: ["Assault Vest"]
  },
  Terapagos: {
    ability: "Tera Shift",
    nature: "Bold",
    teraType: "Stellar",
    evs: {
      hp: 22,
      atk: 0,
      def: 20,
      spa: 12,
      spd: 1,
      spe: 11
    },
    moves: ["Tera Starstorm", "Earth Power", "Protect", "Calm Mind"],
    items: ["Leftovers", "Electric Seed", "Choice Specs"]
  },
  "Terapagos-Stellar": {
    ability: "Teraform Zero",
    nature: "Modest",
    teraType: "Stellar",
    evs: {
      hp: 32,
      atk: 1,
      def: 23,
      spa: 10,
      spd: 0,
      spe: 0
    },
    moves: ["Tera Starstorm", "Earth Power", "Calm Mind", "Protect"],
    items: ["Leftovers"]
  },
  "Terapagos-Terastal": {
    ability: "Tera Shell",
    nature: "Modest",
    teraType: "Stellar",
    evs: {
      hp: 32,
      atk: 1,
      def: 23,
      spa: 10,
      spd: 0,
      spe: 0
    },
    moves: ["Tera Starstorm", "Earth Power", "Calm Mind", "Protect"],
    items: ["Leftovers"]
  },
  Pecharunt: {
    ability: "Poison Puppeteer",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 29,
      atk: 0,
      def: 1,
      spa: 10,
      spd: 20,
      spe: 6
    },
    moves: ["Malignant Chain", "Shadow Ball", "Protect", "Poison Gas"],
    items: ["Leftovers", "Rocky Helmet", "Black Sludge", "Sitrus Berry", "Wide Lens"]
  },
  "Vivillon-Archipelago": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Continental": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Elegant": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Garden": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-High-Plains": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Icy-Snow": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Jungle": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Marine": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Modern": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Monsoon": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Ocean": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Polar": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-River": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Sandstorm": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Savanna": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Sun": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  },
  "Vivillon-Tundra": {
    ability: "Compound Eyes",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Sleep Powder", "Rage Powder", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
  }
} as const satisfies Record<string, Moveset>

export function getMoveset(name: string): Moveset | undefined {
  return (MOVESETS as Record<string, Moveset>)[name]
}
