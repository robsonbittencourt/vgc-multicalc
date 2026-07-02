export const MOVESETS: Record<string, any> = {
  Bulbasaur: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 1,
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
    moves: ["Leaf Storm", "Sludge Bomb", "Protect", "Sleep Powder"],
    items: ["Focus Sash", "Life Orb"]
  },
  "Venusaur-Mega": {
    ability: "Thick Fat",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 30,
      atk: 0,
      def: 0,
      spa: 18,
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
      atk: 0,
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
      hp: 0,
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
      hp: 30,
      atk: 0,
      def: 30,
      spa: 1,
      spd: 0,
      spe: 5
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
      hp: 30,
      atk: 0,
      def: 30,
      spa: 1,
      spd: 0,
      spe: 5
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
      atk: 0,
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
      hp: 0,
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
  Ekans: {
    ability: "Intimidate",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 0,
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
    moves: ["Zap Cannon", "Focus Blast", "Fake Out", "Protect"],
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
    ability: "No Ability",
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
    ability: "No Ability",
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
    moves: ["Zap Cannon", "Focus Blast", "Fake Out", "Protect"],
    items: ["Raichunite Y"]
  },
  Sandshrew: {
    ability: "Sand Rush",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 5,
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
      hp: 0,
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
      hp: 31,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 31,
      spe: 2
    },
    moves: ["Spikes", "Icicle Crash", "Knock Off", "Rapid Spin"],
    items: ["Leftovers"]
  },
  Clefairy: {
    ability: "Friend Guard",
    nature: "Bold",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      atk: 0,
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
      hp: 13,
      atk: 0,
      def: 0,
      spa: 21,
      spd: 0,
      spe: 32
    },
    moves: ["Blizzard", "Freeze-Dry", "Protect", "Encore"],
    items: ["Never-Melt Ice", "Focus Sash", "Light Clay", "Life Orb"]
  },
  Jigglypuff: {
    ability: "Friend Guard",
    nature: "Relaxed",
    teraType: "Ghost",
    evs: {
      hp: 3,
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
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Wish", "Protect", "Stealth Rock"],
    items: ["Life Orb", "Leftovers", "Heavy-Duty Boots", "Heat Rock"]
  },
  Oddish: {
    ability: "Chlorophyll",
    nature: "Sassy",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Sludge Wave", "Giga Drain", "Strength Sap", "Leech Seed"],
    items: ["Leftovers"]
  },
  Venonat: {
    ability: "Compound Eyes",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 1,
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
      hp: 5,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 5,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Last Resort", "U-turn", "Fake Out", ""],
    items: ["Silk Scarf", "Heavy-Duty Boots", "Choice Band", "Scope Lens"]
  },
  "Persian-Alola": {
    ability: "Fur Coat",
    nature: "Jolly",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 1,
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
      hp: 5,
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
    items: ["Focus Sash", "Charcoal", "White Herb", "Life Orb", "Choice Scarf"]
  },
  Poliwag: {
    ability: "Water Absorb",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 0,
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
      atk: 0,
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
      atk: 0,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 1
    },
    moves: ["Bulk Up", "Substitute", "Drain Punch", "Knock Off"],
    items: ["Leftovers"]
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
      hp: 0,
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
      atk: 1,
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
      atk: 0,
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
      hp: 16,
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
      hp: 0,
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
      hp: 0,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Wild Charge", "Brick Break", "Earthquake", "Fire Punch"],
    items: ["Choice Band"]
  },
  Slowpoke: {
    ability: "Regenerator",
    nature: "Modest",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 0,
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
      def: 0,
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
      hp: 0,
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
      hp: 22,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 11
    },
    moves: ["Thunderbolt", "Flash Cannon", "Volt Switch", "Tera Blast"],
    items: ["Eviolite"]
  },
  Doduo: {
    ability: "Early Bird",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 1,
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
      hp: 0,
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
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 14,
      spa: 1,
      spd: 14,
      spe: 5
    },
    moves: ["Shadow Ball", "Protect", "Perish Song", "Disable"],
    items: ["Gengarite"]
  },
  "Gengar-Mega": {
    ability: "Shadow Tag",
    nature: "Modest",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 14,
      spa: 1,
      spd: 14,
      spe: 5
    },
    moves: ["Shadow Ball", "Protect", "Perish Song", "Disable"],
    items: ["Gengarite"]
  },
  Drowzee: {
    ability: "Insomnia",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 0,
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
      hp: 31,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Foul Play", "Trick Room", "Endeavor", "Disable"],
    items: ["Mental Herb", "Focus Sash", "Iapapa Berry", "Sitrus Berry", "Colbur Berry", "Aguav Berry", "Flame Orb"]
  },
  Voltorb: {
    ability: "Static",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
      atk: 0,
      def: 13,
      spa: 5,
      spd: 15,
      spe: 0
    },
    moves: ["Trick Room", "Draco Meteor", "Sleep Powder", "Leaf Storm"],
    items: ["Sitrus Berry"]
  },
  Hitmonlee: {
    ability: "Unburden",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 0,
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
      hp: 31,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 31,
      spe: 0
    },
    moves: ["Drain Punch", "Knock Off", "Mach Punch", "Rapid Spin"],
    items: ["Heavy-Duty Boots"]
  },
  Koffing: {
    ability: "Neutralizing Gas",
    nature: "Bold",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Seismic Toss", "Soft-Boiled", "Thunder Wave"],
    items: ["Eviolite"]
  },
  Kangaskhan: {
    ability: "Scrappy",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 21,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 11
    },
    moves: ["Double-Edge", "Ice Punch", "Fake Out", "Low Kick"],
    items: ["Kangaskhanite"]
  },
  "Kangaskhan-Mega": {
    ability: "Parental Bond",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 21,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 1,
      spe: 11
    },
    moves: ["Double-Edge", "Ice Punch", "Fake Out", "Low Kick"],
    items: ["Kangaskhanite"]
  },
  Horsea: {
    ability: "Swift Swim",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Ice Beam", "Surf", "Focus Energy", "Agility"],
    items: ["Scope Lens", "Eviolite"]
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
      hp: 31,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Tackle", "Splash", "Flail", ""],
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
      atk: 0,
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
      hp: 0,
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
      def: 0,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Double-Edge", "Shadow Ball", "Recover", "Agility"],
    items: ["Eviolite", "Lum Berry"]
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
    moves: ["Rock Slide", "Dual Wingbeat", "Tailwind", "Protect"],
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
      hp: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 18,
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
    ability: "Multiscale",
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
    moves: ["Extreme Speed", "Dragon Claw", "Fire Punch", "Protect"],
    items: ["Lum Berry", "Dragon Fang", "Life Orb", "Mental Herb", "Iron Ball"]
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
    moves: ["Hurricane", "Dragon Pulse", "Protect", "Tailwind"],
    items: ["Dragoninite"]
  },
  Mewtwo: {
    ability: "Pressure",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Nasty Plot", "Psystrike", "Grass Knot", "Taunt"],
    items: ["Heavy-Duty Boots"]
  },
  Mew: {
    ability: "Synchronize",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 1,
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
      hp: 10,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Hurricane", "Moonblast", "Heat Wave", "Hyper Voice"],
    items: ["Choice Specs", "Leftovers"]
  },
  Spinarak: {
    ability: "Insomnia",
    nature: "Careful",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
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
  Chinchou: {
    ability: "Volt Absorb",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 5,
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
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Draining Kiss", "Wish", "Thunder Wave", "Protect"],
    items: ["Eviolite", "Life Orb", "Leftovers", "Focus Sash", "Heat Rock", "Heavy-Duty Boots"]
  },
  Mareep: {
    ability: "Illuminate",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 30,
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
      hp: 1,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 1,
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
      spd: 10,
      spe: 0
    },
    moves: ["Weather Ball", "Protect", "Perish Song", "Encore"],
    items: ["Sitrus Berry", "Mystic Water", "Leftovers", "Damp Rock"]
  },
  Hoppip: {
    ability: "Chlorophyll",
    nature: "Timid",
    teraType: "Grass",
    evs: {
      hp: 13,
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
      atk: 0,
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
      hp: 25,
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
      hp: 0,
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
      hp: 0,
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
      hp: 19,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 1,
      spd: 0,
      spe: 0
    },
    moves: ["Hex", "Will-O-Wisp", "Trick Room", "Memento"],
    items: ["Eviolite"]
  },
  Girafarig: {
    ability: "Inner Focus",
    nature: "Timid",
    teraType: "Normal",
    evs: {
      hp: 0,
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
      atk: 0,
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
      hp: 30,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 19,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 2,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Earthquake", "Stealth Rock", "Rock Slide", "Toxic"],
    items: ["Eviolite"]
  },
  Delibird: {
    ability: "Vital Spirit",
    nature: "Timid",
    teraType: "Ghost",
    evs: {
      hp: 0,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Icy Wind", "Fake Out", "Endeavor", "Tailwind"],
    items: ["Focus Sash", "Choice Scarf", "Eject Button"]
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 12,
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
      atk: 0,
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
      hp: 8,
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
      atk: 0,
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
      atk: 1,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Close Combat", "Fake Out", "Wide Guard", "Protect"],
    items: ["Leftovers"]
  },
  Elekid: {
    ability: "Vital Spirit",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
      atk: 0,
      def: 8,
      spa: 25,
      spd: 0,
      spe: 32
    },
    moves: ["Fire Blast", "Psychic", "Protect", "Substitute"],
    items: ["Life Orb", "Oran Berry", "Eviolite"]
  },
  Blissey: {
    ability: "Natural Cure",
    nature: "Calm",
    teraType: "Dark",
    evs: {
      hp: 1,
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
      hp: 0,
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
      hp: 1,
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
      atk: 0,
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
      hp: 5,
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
      hp: 0,
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
      hp: 28,
      atk: 9,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 29
    },
    moves: ["Rock Slide", "Knock Off", "Protect", "Dragon Dance"],
    items: ["Tyranitarite"]
  },
  "Tyranitar-Mega": {
    ability: "Sand Stream",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 28,
      atk: 9,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 29
    },
    moves: ["Rock Slide", "Knock Off", "Protect", "Dragon Dance"],
    items: ["Tyranitarite"]
  },
  Lugia: {
    ability: "Multiscale",
    nature: "Calm",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 26,
      atk: 5,
      def: 24,
      spa: 0,
      spd: 1,
      spe: 9
    },
    moves: ["Brave Bird", "Sacred Fire", "Protect", "Tailwind"],
    items: ["Clear Amulet", "Leftovers", "Rocky Helmet"]
  },
  Treecko: {
    ability: "Unburden",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 17,
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
      hp: 0,
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
      atk: 0,
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
      hp: 15,
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
    moves: ["Flare Blitz", "Close Combat", "Rock Slide", "Detect"],
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
    moves: ["Flare Blitz", "Close Combat", "Rock Slide", "Detect"],
    items: ["Blazikenite"]
  },
  Mudkip: {
    ability: "Torrent",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 0,
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
      hp: 31,
      atk: 1,
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
      atk: 0,
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
      hp: 1,
      atk: 32,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 0
    },
    moves: ["Play Rough", "Sucker Punch", "Ice Fang", "Howl"],
    items: ["Life Orb", "Black Glasses"]
  },
  Lotad: {
    ability: "Rain Dish",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 7,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Solar Blade", "Knock Off", "Low Kick"],
    items: ["Life Orb"]
  },
  Wingull: {
    ability: "Hydration",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 0,
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
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Hurricane", "Weather Ball", "Tailwind", "Wide Guard"],
    items: ["Sitrus Berry", "Focus Sash", "Life Orb", "Damp Rock"]
  },
  Ralts: {
    ability: "Trace",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 0,
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
      hp: 31,
      atk: 0,
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
    moves: ["Hyper Voice", "Psyshock", "Protect", "Trick Room"],
    items: ["Gardevoirite"]
  },
  "Gardevoir-Mega": {
    ability: "Pixilate",
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
    moves: ["Hyper Voice", "Psyshock", "Protect", "Trick Room"],
    items: ["Gardevoirite"]
  },
  Surskit: {
    ability: "Swift Swim",
    nature: "Hardy",
    teraType: "Bug",
    evs: {
      hp: 2,
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
      hp: 1,
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
      hp: 25,
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
      hp: 1,
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
      def: 1,
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
      hp: 0,
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
  Makuhita: {
    ability: "Guts",
    nature: "Brave",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Earthquake", "Stone Edge", "Body Press", "Thunder Wave"],
    items: ["Eviolite"]
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
    moves: ["Play Rough", "Iron Head", "Sucker Punch", "Protect"],
    items: ["Mawilite"]
  },
  "Mawile-Mega": {
    ability: "Huge Power",
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
    moves: ["Play Rough", "Iron Head", "Sucker Punch", "Protect"],
    items: ["Mawilite"]
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Thunderbolt", "Encore", "Nasty Plot", ""],
    items: ["Heavy-Duty Boots", "Focus Sash", "Leftovers"]
  },
  Volbeat: {
    ability: "Prankster",
    nature: "Sassy",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
      def: 7,
      spa: 0,
      spd: 26,
      spe: 0
    },
    moves: ["Tailwind", "Encore", "Rain Dance", "Sunny Day"],
    items: ["Covert Cloak"]
  },
  Gulpin: {
    ability: "Sticky Hold",
    nature: "Sassy",
    teraType: "Poison",
    evs: {
      hp: 15,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Body Press", "Knock Off", "Acid Armor", "Encore"],
    items: ["Black Sludge", "Leftovers", "Petaya Berry", "Assault Vest"]
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
  Numel: {
    ability: "Simple",
    nature: "Impish",
    teraType: "Grass",
    evs: {
      hp: 32,
      atk: 0,
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
    nature: "Quiet",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 2,
      spe: 0
    },
    moves: ["Eruption", "Weather Ball", "Protect", "Helping Hand"],
    items: ["Charcoal", "Heat Rock", "Leftovers"]
  },
  Spoink: {
    ability: "Illuminate",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Psychic Noise", "Rest", "Sleep Talk", "Whirlwind"],
    items: ["Leftovers"]
  },
  Trapinch: {
    ability: "Arena Trap",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Flamethrower", "Sludge Bomb", "Dark Pulse", "Switcheroo"],
    items: ["Choice Scarf"]
  },
  Barboach: {
    ability: "Oblivious",
    nature: "Timid",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Swords Dance", "Crabhammer", "Knock Off", "Aqua Jet"],
    items: ["Life Orb"]
  },
  Feebas: {
    ability: "Adaptability",
    nature: "Hardy",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 32,
      atk: 0,
      def: 27,
      spa: 0,
      spd: 5,
      spe: 2
    },
    moves: ["Muddy Water", "Hypnosis", "Coil", "Protect"],
    items: ["Leftovers", "Sitrus Berry", "Life Orb"]
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
  Shuppet: {
    ability: "Cursed Body",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
  Snorunt: {
    ability: "Ice Body",
    nature: "Jolly",
    teraType: "Ice",
    evs: {
      hp: 0,
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
  Luvdisc: {
    ability: "Swift Swim",
    nature: "Jolly",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Air Slash", "Tailwind", "Protect"],
    items: ["Mirror Herb", "Eject Pack", "Life Orb", "Covert Cloak", "Choice Specs"]
  },
  Beldum: {
    ability: "Clear Body",
    nature: "Brave",
    teraType: "Steel",
    evs: {
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
      def: 29,
      spa: 0,
      spd: 0,
      spe: 3
    },
    moves: ["Calm Mind", "Agility", "Stored Power", "Aura Sphere"],
    items: ["Weakness Policy"]
  },
  Latios: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Steel",
    evs: {
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Draco Meteor", "Luster Purge", "Protect", "Tailwind"],
    items: ["Life Orb", "Soul Dew"]
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
  Jirachi: {
    ability: "Serene Grace",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Brave Bird", "Protect", "Roost"],
    items: ["Staraptite"]
  },
  "Staraptor-Mega": {
    ability: "No Ability",
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
    moves: ["Close Combat", "Brave Bird", "Protect", "Roost"],
    items: ["Staraptite"]
  },
  Kricketot: {
    ability: "Shed Skin",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
  Combee: {
    ability: "Hustle",
    nature: "Hasty",
    teraType: "Bug",
    evs: {
      hp: 0,
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
      atk: 0,
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
      atk: 1,
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
      hp: 0,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Wave Crash", "Liquidation", "Aqua Jet", "Ice Spinner"],
    items: ["Heavy-Duty Boots"]
  },
  Shellos: {
    ability: "Sticky Hold",
    nature: "Impish",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Sucker Punch", "Brave Bird", "U-turn", "Night Slash"],
    items: ["Mirror Herb"]
  },
  Chingling: {
    ability: "Levitate",
    nature: "Bold",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 2,
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
      hp: 0,
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
      atk: 0,
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
      hp: 18,
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
      hp: 0,
      atk: 25,
      def: 10,
      spa: 0,
      spd: 30,
      spe: 0
    },
    moves: ["Earthquake", "Sucker Punch", "Stealth Rock", "Spikes"],
    items: ["Eviolite", "Custap Berry", "Leftovers", "Focus Sash", "Loaded Dice", "Heat Rock", "Heavy-Duty Boots", "Covert Cloak", "Stone Plate", "Assault Vest", "Weakness Policy"]
  },
  Happiny: {
    ability: "Serene Grace",
    nature: "Careful",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Zen Headbutt", "Thunder Wave", "Rest", "Sleep Talk"],
    items: ["Eviolite", "King's Rock", "Leftovers", "Oran Berry", "Shell Bell"]
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
      atk: 0,
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
      hp: 0,
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
    items: ["Life Orb", "Roseli Berry", "Choice Scarf", "Sitrus Berry"]
  },
  "Garchomp-Mega": {
    ability: "Sand Force",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 26,
      atk: 21,
      def: 0,
      spa: 0,
      spd: 15,
      spe: 4
    },
    moves: ["Earthquake", "Rock Slide", "Stomping Tantrum", "Protect"],
    items: ["Garchompite"]
  },
  Munchlax: {
    ability: "Thick Fat",
    nature: "Impish",
    teraType: "Dragon",
    evs: {
      hp: 10,
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
      atk: 0,
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
      atk: 0,
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
  Finneon: {
    ability: "Swift Swim",
    nature: "Hardy",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Ice Beam", "Surf", "Flip Turn", "Encore"],
    items: ["Heavy-Duty Boots", "Leftovers", "Rocky Helmet", "Assault Vest", "Electric Seed"]
  },
  Snover: {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "Ice",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
      def: 1,
      spa: 32,
      spd: 0,
      spe: 0
    },
    moves: ["Thunderbolt", "Flash Cannon", "Tera Blast", "Volt Switch"],
    items: ["Choice Specs"]
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
  Electivire: {
    ability: "Motor Drive",
    nature: "Calm",
    teraType: "Flying",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
      def: 25,
      spa: 0,
      spd: 8,
      spe: 0
    },
    moves: ["Burning Jealousy", "Follow Me", "Protect", "Helping Hand"],
    items: ["Sitrus Berry"]
  },
  Yanmega: {
    ability: "Speed Boost",
    nature: "Modest",
    teraType: "Ghost",
    evs: {
      hp: 4,
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
    items: ["Focus Sash", "Life Orb", "Choice Scarf", "Expert Belt"]
  },
  "Porygon-Z": {
    ability: "Download",
    nature: "Modest",
    teraType: "Ground",
    evs: {
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 18,
      atk: 0,
      def: 2,
      spa: 21,
      spd: 1,
      spe: 24
    },
    moves: ["Blizzard", "Shadow Ball", "Protect", "Aurora Veil"],
    items: ["Froslassite"]
  },
  "Froslass-Mega": {
    ability: "Snow Warning",
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 18,
      atk: 0,
      def: 2,
      spa: 21,
      spd: 1,
      spe: 24
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
    nature: "Bold",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 13,
      spa: 11,
      spd: 9,
      spe: 0
    },
    moves: ["Hydro Pump", "Thunderbolt", "Will-O-Wisp", "Protect"],
    items: ["Sitrus Berry", "Leftovers", "Choice Scarf", "Magnet", "Zoom Lens"]
  },
  Uxie: {
    ability: "Levitate",
    nature: "Timid",
    teraType: "Fairy",
    evs: {
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
  Regigigas: {
    ability: "Slow Start",
    nature: "Adamant",
    teraType: "Ghost",
    evs: {
      hp: 1,
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
      atk: 0,
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
      hp: 31,
      atk: 13,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 1,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Dark Pulse", "Icy Wind", "Dark Void", "Protect"],
    items: ["Focus Sash", "Covert Cloak", "Wide Lens", "Choice Scarf", "Blunder Policy"]
  },
  Shaymin: {
    ability: "Natural Cure",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 0,
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
      hp: 0,
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
  Snivy: {
    ability: "Overgrow",
    nature: "Modest",
    teraType: "Normal",
    evs: {
      hp: 1,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
  Musharna: {
    ability: "Forewarn",
    nature: "Sassy",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
      def: 16,
      spa: 0,
      spd: 16,
      spe: 0
    },
    moves: ["Trick Room", "Psychic", "Moonblast", "Helping Hand"],
    items: ["Sitrus Berry", "Leftovers"]
  },
  Blitzle: {
    ability: "Sap Sipper",
    nature: "Hasty",
    teraType: "Electric",
    evs: {
      hp: 0,
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
  Drilbur: {
    ability: "Mold Breaker",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 0,
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
    moves: ["Earthquake", "Iron Head", "Rock Slide", "Protect"],
    items: ["Focus Sash", "Life Orb"]
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
      hp: 0,
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
      hp: 31,
      atk: 2,
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
  Sewaddle: {
    ability: "Overcoat",
    nature: "Hardy",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 29,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Sticky Web", "Knock Off", "Pounce", "Leaf Blade"],
    items: ["Focus Sash"]
  },
  Scolipede: {
    ability: "Poison Point",
    nature: "Jolly",
    teraType: "",
    evs: {
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
    moves: ["Moonblast", "Tailwind", "Protect", "Encore"],
    items: ["Focus Sash", "Fairy Feather"]
  },
  Petilil: {
    ability: "Chlorophyll",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 0,
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
      hp: 1,
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
      hp: 5,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Flip Turn", "Aqua Jet", "Wave Crash", "Ice Beam"],
    items: ["Choice Specs"]
  },
  Sandile: {
    ability: "Moxie",
    nature: "Jolly",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
  Scraggy: {
    ability: "Intimidate",
    nature: "Sassy",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 0,
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
    ability: "No Ability",
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
    moves: ["Shadow Ball", "Focus Blast", "Protect", "Will O Wisp"],
    items: ["Sitrus Berry"]
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
      atk: 0,
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
      hp: 0,
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
      hp: 10,
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
      hp: 0,
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
      hp: 0,
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
      atk: 1,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 9,
      spe: 24
    },
    moves: ["Surf", "Knock Off", "Defog", "Roost"],
    items: ["Heavy-Duty Boots"]
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
      atk: 0,
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
      hp: 1,
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
  Foongus: {
    ability: "Regenerator",
    nature: "Bold",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 30,
      atk: 0,
      def: 25,
      spa: 0,
      spd: 10,
      spe: 0
    },
    moves: ["Sludge Bomb", "Spore", "Rage Powder", "Protect"],
    items: ["Rocky Helmet", "Sitrus Berry"]
  },
  Alomomola: {
    ability: "Regenerator",
    nature: "Sassy",
    teraType: "Water",
    evs: {
      hp: 3,
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
      atk: 0,
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
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Sticky Web", "Thunder", "Bug Buzz", "Thunder Wave"],
    items: ["Focus Sash"]
  },
  Tynamo: {
    ability: "Levitate",
    nature: "Adamant",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
  Litwick: {
    ability: "Flash Fire",
    nature: "Quiet",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 1,
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
      atk: 0,
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
      hp: 31,
      atk: 32,
      def: 0,
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
      def: 0,
      spa: 1,
      spd: 0,
      spe: 32
    },
    moves: ["Rapid Spin", "Freeze-Dry", "Recover", "Haze"],
    items: ["Heavy-Duty Boots"]
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
      atk: 0,
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
      hp: 0,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Close Combat", "Fake Out", "Feint", "Wide Guard"],
    items: ["Focus Sash"]
  },
  Golett: {
    ability: "Iron Fist",
    nature: "Jolly",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 25,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 7
    },
    moves: ["Swords Dance", "Sucker Punch", "Iron Head", "Throat Chop"],
    items: ["Eviolite"]
  },
  Rufflet: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 1,
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
      hp: 0,
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
      hp: 0,
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
  Deino: {
    ability: "Hustle",
    nature: "Adamant",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 31,
      atk: 32,
      def: 0,
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
    items: ["Choice Scarf", "Life Orb", "Haban Berry"]
  },
  Larvesta: {
    ability: "Flame Body",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 29,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 0,
      spe: 5
    },
    moves: ["Struggle Bug", "Rage Powder", "Tailwind", "Protect"],
    items: ["Sitrus Berry", "Mental Herb", "Leftovers", "Charti Berry", "Charcoal", "Passho Berry", "Focus Sash"]
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 23,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 32
    },
    moves: ["Surf", "Aura Sphere", "Vacuum Wave", "Flip Turn"],
    items: ["Heavy-Duty Boots"]
  },
  Meloetta: {
    ability: "Serene Grace",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 0,
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
      atk: 0,
      def: 0,
      spa: 0,
      spd: 30,
      spe: 1
    },
    moves: ["Relic Song", "Close Combat", "U-Turn", "Dream Eater"],
    items: ["Focus Sash"]
  },
  Chespin: {
    ability: "Bulletproof",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 31,
      atk: 32,
      def: 0,
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
      atk: 0,
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
    moves: ["Heat Wave", "Psyshock", "Protect", "Nasty Plot"],
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
    moves: ["Heat Wave", "Psyshock", "Protect", "Nasty Plot"],
    items: ["Delphoxite"]
  },
  Froakie: {
    ability: "Torrent",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
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
    items: ["Sharp Beak", "Nothing", "Life Orb", "Focus Sash", "Charcoal"]
  },
  Scatterbug: {
    ability: "Compound Eyes",
    nature: "Naughty",
    teraType: "Bug",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
  Litleo: {
    ability: "Moxie",
    nature: "Jolly",
    teraType: "Fire",
    evs: {
      hp: 0,
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
    ability: "No Ability",
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
      hp: 23,
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
      atk: 0,
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
      atk: 0,
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
      atk: 1,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Earthquake", "Horn Leech", "Bulk Up", "Milk Drink"],
    items: ["Leftovers", "Assault Vest", "Grassy Seed", "Heavy-Duty Boots", "Rocky Helmet", "Life Orb", "Lum Berry"]
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
      hp: 0,
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
      atk: 0,
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
      atk: 9,
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
  Barbaracle: {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Shell Smash", "Stone Edge", "Liquidation", "Protect"],
    items: ["Barbaracite", "White Herb", "Focus Sash"]
  },
  "Barbaracle-Mega": {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Shell Smash", "Stone Edge", "Liquidation", "Protect"],
    items: ["Barbaracite"]
  },
  Skrelp: {
    ability: "Adaptability",
    nature: "Adamant",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      spa: 30,
      spd: 0,
      spe: 5
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
      atk: 0,
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
      hp: 5,
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
      atk: 0,
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
      atk: 0,
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
      hp: 9,
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
      hp: 5,
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
  Diancie: {
    ability: "Clear Body",
    nature: "Careful",
    teraType: "Ghost",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Stealth Rock", "Encore", "Diamond Storm", "Body Press"],
    items: ["Leftovers"]
  },
  Hoopa: {
    ability: "Magician",
    nature: "Timid",
    teraType: "Fighting",
    evs: {
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
    nature: "Relaxed",
    teraType: "",
    evs: {
      hp: 31,
      atk: 0,
      def: 21,
      spa: 0,
      spd: 14,
      spe: 0
    },
    moves: ["Flare Blitz", "Throat Chop", "Fake Out", "Parting Shot"],
    items: ["Sitrus Berry", "Passho Berry", "Chople Berry", "Charcoal", "Shuca Berry", "Leftovers"]
  },
  Popplio: {
    ability: "Liquid Voice",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 1,
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
      atk: 0,
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
    moves: ["Beak Blast", "U Turn", "Protect", "Tailwind"]
  },
  Yungoos: {
    ability: "Adaptability",
    nature: "Adamant",
    teraType: "Normal",
    evs: {
      hp: 0,
      atk: 25,
      def: 15,
      spa: 0,
      spd: 25,
      spe: 0
    },
    moves: ["Psychic Fangs", "Trailblaze", "Protect", ""],
    items: ["Eviolite", "Silk Scarf", "Black Glasses", "Choice Scarf", "Focus Sash"]
  },
  Gumshoos: {
    ability: "Stakeout",
    nature: "Brave",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 32,
      def: 0,
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
      hp: 31,
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
      atk: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
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
  Mareanie: {
    ability: "Regenerator",
    nature: "Bold",
    teraType: "Dragon",
    evs: {
      hp: 32,
      atk: 0,
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
    moves: ["Infestation", "Baneful Bunker", "Toxic", "Wide Guard"],
    items: ["Leftovers"]
  },
  Mudbray: {
    ability: "Stamina",
    nature: "Impish",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
      def: 1,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Leaf Storm", "Superpower", "Synthesis", "Defog"],
    items: ["Heavy-Duty Boots"]
  },
  Salandit: {
    ability: "Corrosion",
    nature: "Timid",
    teraType: "Ground",
    evs: {
      hp: 32,
      atk: 0,
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
  Bounsweet: {
    ability: "Leaf Guard",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 0,
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
      hp: 0,
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
      hp: 28,
      atk: 10,
      def: 8,
      spa: 0,
      spd: 0,
      spe: 20
    },
    moves: ["Power Whip", "Triple Axel", "Protect", "Low Kick"],
    items: ["Wide Lens", "Sitrus Berry", "Choice Scarf", "Focus Sash", "Kebia Berry", "Life Orb"]
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
  Sandygast: {
    ability: "Water Compaction",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Scorching Sands", "Shadow Ball", "Shore Up"],
    items: ["Heavy-Duty Boots"]
  },
  Minior: {
    ability: "Shields Down",
    nature: "Adamant",
    teraType: "Flying",
    evs: {
      hp: 1,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Shell Smash", "Acrobatics", "Earthquake", "Stone Edge"],
    items: ["White Herb"]
  },
  Komala: {
    ability: "Comatose",
    nature: "Careful",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 1,
      def: 0,
      spa: 0,
      spd: 32,
      spe: 0
    },
    moves: ["Rapid Spin", "Knock Off", "U-turn", "Body Slam"],
    items: ["Assault Vest"]
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
  Bruxish: {
    ability: "Dazzling",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 0,
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
  "Jangmo-o": {
    ability: "Marvel Scale",
    nature: "Modest",
    teraType: "Steel",
    evs: {
      hp: 0,
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
      hp: 0,
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
    nature: "Timid",
    teraType: "",
    evs: {
      hp: 7,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 26
    },
    moves: ["Clanging Scales", "Aura Sphere", "Protect", "Clangorous Soul"],
    items: ["Sitrus Berry", "Leftovers", "Haban Berry"]
  },
  Cosmog: {
    ability: "Unaware",
    nature: "Timid",
    teraType: "Psychic",
    evs: {
      hp: 32,
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Splash", "Teleport", "", ""],
    items: ["Focus Sash", "Leftovers"]
  },
  Cosmoem: {
    ability: "Sturdy",
    nature: "Calm",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
      def: 24,
      spa: 0,
      spd: 9,
      spe: 0
    },
    moves: ["Cosmic Power", "Splash", "Teleport", ""],
    items: ["Eviolite", "Master Ball", "Rocky Helmet", "Leftovers"]
  },
  Solgaleo: {
    ability: "Regenerator",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 28,
      atk: 0,
      def: 5,
      spa: 29,
      spd: 2,
      spe: 0
    },
    moves: ["Moongeist Beam", "Moonblast", "Trick Room", "Wide Guard"],
    items: ["Electric Seed", "Power Herb", "Leftovers"]
  },
  Necrozma: {
    ability: "Prism Armor",
    nature: "Jolly",
    teraType: "Fairy",
    evs: {
      hp: 0,
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
      atk: 0,
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
      atk: 0,
      def: 26,
      spa: 0,
      spd: 0,
      spe: 7
    },
    moves: ["Dragon Dance", "Sunsteel Strike", "Knock Off", "Morning Sun"],
    items: ["Heavy-Duty Boots"]
  },
  Magearna: {
    ability: "Soul-Heart",
    nature: "Modest",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 1,
      spe: 0
    },
    moves: ["Dazzling Gleam", "Flash Cannon", "Trick Room", "Protect"],
    items: ["Safety Goggles", "Covert Cloak", "Mental Herb", "Fairy Feather", "Life Orb", "Leftovers", "Assault Vest", "Sitrus Berry", "Pixie Plate"]
  },
  Grookey: {
    ability: "Grassy Surge",
    nature: "Jolly",
    teraType: "Grass",
    evs: {
      hp: 0,
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
      def: 0,
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
      hp: 16,
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
      hp: 0,
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
      hp: 28,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 5,
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
      def: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Power Trip", "Roost", "Agility", "Hone Claws"],
    items: ["Eviolite"]
  },
  Corviknight: {
    ability: "Mirror Armor",
    nature: "Careful",
    teraType: "",
    evs: {
      hp: 32,
      atk: 3,
      def: 0,
      spa: 0,
      spd: 15,
      spe: 16
    },
    moves: ["Brave Bird", "Roost", "Tailwind", "Bulk Up"],
    items: ["Leftovers", "Occa Berry", "Sitrus Berry"]
  },
  Chewtle: {
    ability: "Strong Jaw",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 32
    },
    moves: ["Shell Smash", "Liquidation", "Stone Edge", "Crunch"],
    items: ["White Herb"]
  },
  Rolycoly: {
    ability: "Steam Engine",
    nature: "Adamant",
    teraType: "Water",
    evs: {
      hp: 0,
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
      hp: 31,
      atk: 1,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
  Sinistea: {
    ability: "Weak Armor",
    nature: "Modest",
    teraType: "Fire",
    evs: {
      hp: 32,
      atk: 0,
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
  Hatenna: {
    ability: "Magic Bounce",
    nature: "Bold",
    teraType: "Fairy",
    evs: {
      hp: 3,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
    moves: ["Spirit Break", "Reflect", "Light Screen", "Parting Shot"],
    items: ["Light Clay", "Roseli Berry"]
  },
  Perrserker: {
    ability: "Tough Claws",
    nature: "Adamant",
    teraType: "Fairy",
    evs: {
      hp: 31,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Stealth Rock", "Iron Head", "Knock Off", "U-turn"],
    items: ["Heavy-Duty Boots"]
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
      hp: 1,
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
      hp: 1,
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
      atk: 0,
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
  Cufant: {
    ability: "Sheer Force",
    nature: "Adamant",
    teraType: "Steel",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
      def: 0,
      spa: 0,
      spd: 29,
      spe: 4
    },
    moves: ["Stealth Rock", "Iron Head", "Knock Off", "Whirlwind"],
    items: ["Leftovers"]
  },
  Duraludon: {
    ability: "Light Metal",
    nature: "Modest",
    teraType: "Fairy",
    evs: {
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
    moves: ["Phantom Force", "Dragon Darts", "Protect", "Will-O-Wisp"],
    items: ["Focus Sash", "Dragon Fang", "Lum Berry", "Colbur Berry", "White Herb", "Spell Tag", "Haban Berry", "Choice Scarf", "Sitrus Berry"]
  },
  Zacian: {
    ability: "Intrepid Sword",
    nature: "Jolly",
    teraType: "Dark",
    evs: {
      hp: 0,
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
      atk: 0,
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
  Kubfu: {
    ability: "Inner Focus",
    nature: "Adamant",
    teraType: "Fighting",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 0,
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
      hp: 1,
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
      hp: 0,
      atk: 32,
      def: 1,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Swords Dance", "Knock Off", "Power Whip", "Jungle Healing"],
    items: ["Leftovers"]
  },
  Regieleki: {
    ability: "Transistor",
    nature: "Timid",
    teraType: "Electric",
    evs: {
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      atk: 6,
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
      hp: 1,
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
    moves: ["Close Combat", "U-turn", "Stone Axe", "Protect"],
    items: ["Focus Sash", "Choice Scarf"]
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
      hp: 0,
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
    moves: ["Wave Crash", "Last Respects", "Aqua Jet", "Protect"],
    items: ["Choice Scarf", "Mystic Water", "Life Orb", "Focus Sash"]
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
    ability: "Unburden",
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
      atk: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
    moves: ["Flower Trick", "Knock Off", "Triple Axel", "Low Kick"],
    items: ["Choice Scarf", "Focus Sash"]
  },
  Fuecoco: {
    ability: "Unaware",
    nature: "Calm",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      hp: 30,
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
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
      hp: 31,
      atk: 32,
      def: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 10,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Flamethrower", "Flame Charge", "Will-O-Wisp", "Destiny Bond"],
    items: [
      "Eviolite",
      "Focus Sash",
      "Flame Plate",
      "Leftovers",
      "Charcoal",
      "Aguav Berry",
      "Safety Goggles",
      "Choice Scarf",
      "Expert Belt",
      "Choice Specs",
      "Heavy-Duty Boots",
      "White Herb",
      "Life Orb",
      "Eject Pack",
      "Rocky Helmet",
      "Choice Band",
      "Auspicious Armor"
    ]
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
    items: ["Colbur Berry", "Life Orb", "Kasib Berry", "Charcoal", "Sitrus Berry", "Focus Sash"]
  },
  Tadbulb: {
    ability: "Own Tempo",
    nature: "Hardy",
    teraType: "Electric",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 0,
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
      hp: 15,
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
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 31,
      atk: 1,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Solar Beam", "Tera Blast", "Giga Drain", "Sunny Day"],
    items: ["Heat Rock", "Lum Berry", "Choice Scarf", "Miracle Seed", "Eviolite", "Choice Specs", "Shell Bell", "Leftovers", "Leaf Stone", "Focus Sash"]
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Gunk Shot", "Recover", "Cosmic Power", ""],
    items: ["Eviolite", "Focus Sash", "Leftovers", "Metronome"]
  },
  Rabsca: {
    ability: "Synchronize",
    nature: "Quiet",
    teraType: "Water",
    evs: {
      hp: 32,
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      atk: 0,
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
      hp: 0,
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
      hp: 31,
      atk: 0,
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
      hp: 5,
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
      atk: 0,
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
      hp: 0,
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
      hp: 14,
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
      atk: 0,
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
    moves: ["Earth Power", "Sludge Bomb", "Power Gem", "Spiky Shield"],
    items: ["Glimmoranite"]
  },
  "Glimmora-Mega": {
    ability: "Adaptability",
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
    moves: ["Earth Power", "Sludge Bomb", "Power Gem", "Spiky Shield"],
    items: ["Glimmoranite"]
  },
  Greavard: {
    ability: "Fluffy",
    nature: "Impish",
    teraType: "Bug",
    evs: {
      hp: 0,
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
      atk: 0,
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
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
      hp: 1,
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
      hp: 6,
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
    items: ["Leftovers", "Sitrus Berry", "Choice Scarf", "Focus Sash", "Roseli Berry", "Spell Tag"],
    nature: "Jolly",
    evs: {
      hp: 2,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 32
    },
    moves: ["Drain Punch", "Rage Fist", "Protect", "Bulk Up"]
  },
  Clodsire: {
    ability: "Unaware",
    nature: "Careful",
    teraType: "Steel",
    evs: {
      hp: 31,
      atk: 0,
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
    items: ["Sitrus Berry", "Colbur Berry", "Twisted Spoon"]
  },
  Dudunsparce: {
    ability: "Serene Grace",
    nature: "Careful",
    teraType: "Poison",
    evs: {
      hp: 32,
      atk: 1,
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
      hp: 32,
      atk: 32,
      def: 0,
      spa: 0,
      spd: 2,
      spe: 0
    },
    moves: ["Kowtow Cleave", "Iron Head", "Sucker Punch", "Protect"],
    items: ["Black Glasses", "Chople Berry", "Focus Sash", "Life Orb", "Occa Berry"]
  },
  "Great Tusk": {
    ability: "Protosynthesis",
    nature: "Jolly",
    teraType: "Steel",
    evs: {
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
      hp: 0,
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
      hp: 0,
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
      hp: 1,
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
      hp: 10,
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
      hp: 0,
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
      atk: 0,
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
      hp: 1,
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
  Gimmighoul: {
    ability: "Rattled",
    nature: "Quiet",
    teraType: "Fighting",
    evs: {
      hp: 31,
      atk: 0,
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
      hp: 0,
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
      hp: 2,
      atk: 0,
      def: 0,
      spa: 32,
      spd: 0,
      spe: 32
    },
    moves: ["Make It Rain", "Shadow Ball", "Protect", "Nasty Plot"],
    items: ["Life Orb", "Metal Coat", "Leftovers", "Choice Scarf", "Spell Tag", "Sitrus Berry"]
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
      hp: 0,
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
      hp: 26,
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
      hp: 0,
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
      hp: 1,
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
      atk: 0,
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
      atk: 0,
      def: 32,
      spa: 0,
      spd: 1,
      spe: 0
    },
    moves: ["Leaf Storm", "Scald", "Shadow Ball", "Giga Drain"],
    items: ["Choice Scarf", "Eviolite"]
  },
  Sinistcha: {
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
      hp: 0,
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
      hp: 31,
      atk: 19,
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
      hp: 13,
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
      atk: 0,
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
      hp: 32,
      atk: 0,
      def: 0,
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
      hp: 0,
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
      hp: 0,
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
      atk: 0,
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
      atk: 0,
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
  }
}
