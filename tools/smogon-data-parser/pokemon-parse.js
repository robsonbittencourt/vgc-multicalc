const input = `[
  {
    "Kingambit": {
    "ability": "Defiant",
    "item": "Black Glasses",
    "nature": "Adamant",
    "teraType": "Dark",
    "evs": {
      "hp": 252,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 4,
      "spe": 0
    },
    "moves": [
      "Sucker Punch",
      "Kowtow Cleave",
      "Protect",
      "Swords Dance"
    ]
}},
  {
    "Gholdengo": {
    "ability": "Good as Gold",
    "item": "Choice Specs",
    "nature": "Timid",
    "teraType": "Steel",
    "evs": {
      "hp": 4,
      "atk": 0,
      "def": 0,
      "spa": 252,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Make It Rain",
      "Shadow Ball",
      "Protect",
      "Nasty Plot"
    ]
}},
  {
    "Rillaboom": {
    "ability": "Grassy Surge",
    "item": "Assault Vest",
    "nature": "Adamant",
    "teraType": "Fire",
    "evs": {
      "hp": 252,
      "atk": 116,
      "def": 4,
      "spa": 0,
      "spd": 60,
      "spe": 76
    },
    "moves": [
      "Fake Out",
      "Grassy Glide",
      "Wood Hammer",
      "U-turn"
    ]
}},
  {
    "Incineroar": {
    "ability": "Intimidate",
    "item": "Safety Goggles",
    "nature": "Adamant",
    "teraType": "Ghost",
    "evs": {
      "hp": 228,
      "atk": 36,
      "def": 4,
      "spa": 0,
      "spd": 36,
      "spe": 204
    },
    "moves": [
      "Fake Out",
      "Knock Off",
      "Flare Blitz",
      "Parting Shot"
    ]
}},
  {
    "Primarina": {
    "ability": "Liquid Voice",
    "item": "Throat Spray",
    "nature": "Modest",
    "teraType": "Poison",
    "evs": {
      "hp": 172,
      "atk": 0,
      "def": 252,
      "spa": 20,
      "spd": 4,
      "spe": 60
    },
    "moves": [
      "Moonblast",
      "Hyper Voice",
      "Haze",
      "Protect"
    ]
}},
  {
    "Amoonguss": {
    "ability": "Regenerator",
    "item": "Sitrus Berry",
    "nature": "Calm",
    "teraType": "Water",
    "evs": {
      "hp": 236,
      "atk": 0,
      "def": 36,
      "spa": 0,
      "spd": 236,
      "spe": 0
    },
    "moves": [
      "Spore",
      "Rage Powder",
      "Pollen Puff",
      "Protect"
    ]
}},
  {
    "Sneasler": {
    "ability": "Poison Touch",
    "item": "Focus Sash",
    "nature": "Jolly",
    "teraType": "Stellar",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Close Combat",
      "Dire Claw",
      "Protect",
      "Fake Out"
    ]
}},
  {
    "Dragonite": {
    "ability": "Inner Focus",
    "item": "Choice Band",
    "nature": "Adamant",
    "teraType": "Flying",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Extreme Speed",
      "Tera Blast",
      "Stomping Tantrum",
      "Ice Spinner"
    ]
}},
  {
    "Garchomp": {
    "ability": "Rough Skin",
    "item": "Life Orb",
    "nature": "Jolly",
    "teraType": "Steel",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Protect",
      "Dragon Claw",
      "Earthquake",
      "Stomping Tantrum"
    ]
}},
  {
    "Archaludon": {
    "ability": "Stamina",
    "item": "Assault Vest",
    "nature": "Timid",
    "teraType": "Grass",
    "evs": {
      "hp": 0,
      "atk": 0,
      "def": 0,
      "spa": 252,
      "spd": 4,
      "spe": 252
    },
    "moves": [
      "Electro Shot",
      "Flash Cannon",
      "Draco Meteor",
      "Body Press"
    ]
}},
  {
    "Porygon2": {
    "ability": "Download",
    "item": "Eviolite",
    "nature": "Quiet",
    "teraType": "Fighting",
    "evs": {
      "hp": 252,
      "atk": 4,
      "def": 124,
      "spa": 92,
      "spd": 36,
      "spe": 0
    },
    "moves": [
      "Trick Room",
      "Recover",
      "Ice Beam",
      "Tera Blast"
    ]
}},
  {
    "Electabuzz": {
    "ability": "Vital Spirit",
    "item": "Eviolite",
    "nature": "Bold",
    "teraType": "Ghost",
    "evs": {
      "hp": 228,
      "atk": 0,
      "def": 244,
      "spa": 4,
      "spd": 4,
      "spe": 28
    },
    "moves": [
      "Follow Me",
      "Protect",
      "Electroweb",
      "Taunt"
    ]
}},
  {
    "Volcarona": {
    "ability": "Flame Body",
    "item": "Leftovers",
    "nature": "Timid",
    "teraType": "Grass",
    "evs": {
      "hp": 188,
      "atk": 0,
      "def": 52,
      "spa": 12,
      "spd": 4,
      "spe": 252
    },
    "moves": [
      "Protect",
      "Quiver Dance",
      "Giga Drain",
      "Heat Wave"
    ]
}},
  {
    "Dondozo": {
    "ability": "Unaware",
    "item": "Leftovers",
    "nature": "Jolly",
    "teraType": "Grass",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 4,
      "spa": 0,
      "spd": 36,
      "spe": 212
    },
    "moves": [
      "Protect",
      "Wave Crash",
      "Order Up",
      "Earthquake"
    ]
}},
  {
    "Basculegion": {
    "ability": "Swift Swim",
    "item": "Choice Scarf",
    "nature": "Adamant",
    "teraType": "Water",
    "evs": {
      "hp": 148,
      "atk": 252,
      "def": 4,
      "spa": 0,
      "spd": 4,
      "spe": 100
    },
    "moves": [
      "Last Respects",
      "Wave Crash",
      "Aqua Jet",
      "Flip Turn"
    ]
}},
  {
    "Pelipper": {
    "ability": "Drizzle",
    "item": "Focus Sash",
    "nature": "Modest",
    "teraType": "Stellar",
    "evs": {
      "hp": 4,
      "atk": 0,
      "def": 0,
      "spa": 252,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Hurricane",
      "Weather Ball",
      "Protect",
      "Tailwind"
    ]
}},
  {
    "Dragapult": {
    "ability": "Clear Body",
    "item": "Choice Band",
    "nature": "Adamant",
    "teraType": "Dragon",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "U-turn",
      "Dragon Darts",
      "Phantom Force",
      "Outrage"
    ]
}},
  {
    "Ursaluna": {
    "ability": "Guts",
    "item": "Flame Orb",
    "nature": "Brave",
    "teraType": "Ghost",
    "evs": {
      "hp": 252,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 4,
      "spe": 0
    },
    "moves": [
      "Facade",
      "Headlong Rush",
      "Protect",
      "Earthquake"
    ]
}},
  {
    "Tyranitar": {
    "ability": "Sand Stream",
    "item": "Assault Vest",
    "nature": "Jolly",
    "teraType": "Flying",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Rock Slide",
      "Knock Off",
      "Low Kick",
      "Tera Blast"
    ]
}},
  {
    "Talonflame": {
    "ability": "Gale Wings",
    "item": "Covert Cloak",
    "nature": "Jolly",
    "teraType": "Ghost",
    "evs": {
      "hp": 4,
      "atk": 252,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Tailwind",
      "Brave Bird",
      "Will-O-Wisp",
      "Taunt"
    ]
}},
  {
    "Glimmora": {
    "ability": "Toxic Debris",
    "item": "Power Herb",
    "nature": "Timid",
    "teraType": "Grass",
    "evs": {
      "hp": 4,
      "atk": 0,
      "def": 0,
      "spa": 252,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Earth Power",
      "Sludge Bomb",
      "Spiky Shield",
      "Meteor Beam"
    ]
}},
  {
    "Tatsugiri": {
    "ability": "Commander",
    "item": "Choice Scarf",
    "nature": "Timid",
    "teraType": "Steel",
    "evs": {
      "hp": 0,
      "atk": 0,
      "def": 0,
      "spa": 252,
      "spd": 4,
      "spe": 252
    },
    "moves": [
      "Draco Meteor",
      "Muddy Water",
      "Icy Wind",
      "Dragon Pulse"
    ]
}},
  {
    "Annihilape": {
    "ability": "Defiant",
    "item": "Choice Scarf",
    "nature": "Jolly",
    "teraType": "Fire",
    "evs": {
      "hp": 252,
      "atk": 4,
      "def": 0,
      "spa": 0,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Rage Fist",
      "Drain Punch",
      "Protect",
      "Bulk Up"
    ]
}},
  {
    "Ursaluna-Bloodmoon": {
    "ability": "Mind's Eye",
    "item": "Life Orb",
    "nature": "Modest",
    "teraType": "Normal",
    "evs": {
      "hp": 4,
      "atk": 0,
      "def": 0,
      "spa": 252,
      "spd": 0,
      "spe": 252
    },
    "moves": [
      "Blood Moon",
      "Earth Power",
      "Hyper Voice",
      "Protect"
    ]
}}
]`

console.log(transformPokemonData(input))

function transformPokemonData(input) {
  const data = JSON.parse(input);
  console.log(data)

  const convertPokemon = ([name, properties]) => {
    const filteredEvs = Object.entries(properties.evs)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    return `new Pokemon("${name}", { ability: "${properties.ability}", nature: "${properties.nature}", item: "${properties.item}", teraType: "${properties.teraType}", evs: { ${filteredEvs} }, moveSet: new MoveSet(${properties.moves.map(move => `"${move}"`).join(", ")}) })`;
  };

  const result = data
    .map(pokemon => convertPokemon(Object.entries(pokemon)[0]))
    .join("\n");

  return result;
}