import { MoveData } from "@lib/calc/model/types"

export const MOVES: Record<string, MoveData> = {
  nomove: {
    name: "(No Move)",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  absorb: {
    name: "Absorb",
    type: "Grass",
    basePower: 20,
    category: "Special",
    flags: {},
    drain: [1, 2]
  },
  acid: {
    name: "Acid",
    type: "Poison",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  amnesia: {
    name: "Amnesia",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  aurorabeam: {
    name: "Aurora Beam",
    type: "Ice",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true
  },
  barrage: {
    name: "Barrage",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      bullet: 1
    },
    multihit: [2, 5]
  },
  bide: {
    name: "Bide",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1
  },
  bind: {
    name: "Bind",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  bite: {
    name: "Bite",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  blizzard: {
    name: "Blizzard",
    type: "Ice",
    basePower: 110,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  bonemerang: {
    name: "Bonemerang",
    type: "Ground",
    basePower: 50,
    category: "Physical",
    flags: {},
    multihit: 2
  },
  bubble: {
    name: "Bubble",
    type: "Water",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  bubblebeam: {
    name: "Bubble Beam",
    type: "Water",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true
  },
  clamp: {
    name: "Clamp",
    type: "Water",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  cometpunch: {
    name: "Comet Punch",
    type: "Normal",
    basePower: 18,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    multihit: [2, 5]
  },
  constrict: {
    name: "Constrict",
    type: "Normal",
    basePower: 10,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  conversion: {
    name: "Conversion",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  counter: {
    name: "Counter",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  crabhammer: {
    name: "Crabhammer",
    type: "Water",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  defensecurl: {
    name: "Defense Curl",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  dig: {
    name: "Dig",
    type: "Ground",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  disable: {
    name: "Disable",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  dizzypunch: {
    name: "Dizzy Punch",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  doubleedge: {
    name: "Double-Edge",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [33, 100]
  },
  doublekick: {
    name: "Double Kick",
    type: "Fighting",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: 2
  },
  doubleslap: {
    name: "Double Slap",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5]
  },
  dragonrage: {
    name: "Dragon Rage",
    type: "Dragon",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  dreameater: {
    name: "Dream Eater",
    type: "Psychic",
    basePower: 100,
    category: "Special",
    flags: {},
    drain: [1, 2]
  },
  earthquake: {
    name: "Earthquake",
    type: "Ground",
    basePower: 100,
    category: "Physical",
    flags: {},
    target: "allAdjacent"
  },
  explosion: {
    name: "Explosion",
    type: "Normal",
    basePower: 250,
    category: "Physical",
    flags: {},
    target: "allAdjacent"
  },
  fireblast: {
    name: "Fire Blast",
    type: "Fire",
    basePower: 110,
    category: "Special",
    flags: {},
    secondaries: true
  },
  firespin: {
    name: "Fire Spin",
    type: "Fire",
    basePower: 35,
    category: "Special",
    flags: {}
  },
  fissure: {
    name: "Fissure",
    type: "Ground",
    basePower: 0,
    category: "Physical",
    flags: {}
  },
  fly: {
    name: "Fly",
    type: "Flying",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  focusenergy: {
    name: "Focus Energy",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  furyattack: {
    name: "Fury Attack",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5]
  },
  furyswipes: {
    name: "Fury Swipes",
    type: "Normal",
    basePower: 18,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5]
  },
  glare: {
    name: "Glare",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  growth: {
    name: "Growth",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  guillotine: {
    name: "Guillotine",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  gust: {
    name: "Gust",
    type: "Flying",
    basePower: 40,
    category: "Special",
    flags: {
      wind: 1
    }
  },
  haze: {
    name: "Haze",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  highjumpkick: {
    name: "High Jump Kick",
    type: "Fighting",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    },
    hasCrashDamage: true
  },
  horndrill: {
    name: "Horn Drill",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  hyperbeam: {
    name: "Hyper Beam",
    type: "Normal",
    basePower: 150,
    category: "Special",
    flags: {}
  },
  jumpkick: {
    name: "Jump Kick",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    hasCrashDamage: true
  },
  karatechop: {
    name: "Karate Chop",
    type: "Fighting",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  leechseed: {
    name: "Leech Seed",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  lightscreen: {
    name: "Light Screen",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  metronome: {
    name: "Metronome",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mimic: {
    name: "Mimic",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  minimize: {
    name: "Minimize",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mirrormove: {
    name: "Mirror Move",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mist: {
    name: "Mist",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  nightshade: {
    name: "Night Shade",
    type: "Ghost",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  petaldance: {
    name: "Petal Dance",
    type: "Grass",
    basePower: 120,
    category: "Special",
    flags: {
      contact: 1
    }
  },
  pinmissile: {
    name: "Pin Missile",
    type: "Bug",
    basePower: 25,
    category: "Physical",
    flags: {},
    multihit: [2, 5]
  },
  poisonsting: {
    name: "Poison Sting",
    type: "Poison",
    basePower: 15,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  psychic: {
    name: "Psychic",
    type: "Psychic",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  psywave: {
    name: "Psywave",
    type: "Psychic",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  rage: {
    name: "Rage",
    type: "Normal",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  razorleaf: {
    name: "Razor Leaf",
    type: "Grass",
    basePower: 55,
    category: "Physical",
    flags: {
      slicing: 1
    },
    target: "allAdjacentFoes"
  },
  razorwind: {
    name: "Razor Wind",
    type: "Normal",
    basePower: 80,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  recover: {
    name: "Recover",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  reflect: {
    name: "Reflect",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  rest: {
    name: "Rest",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  roar: {
    name: "Roar",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  rockslide: {
    name: "Rock Slide",
    type: "Rock",
    basePower: 75,
    category: "Physical",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  rockthrow: {
    name: "Rock Throw",
    type: "Rock",
    basePower: 50,
    category: "Physical",
    flags: {}
  },
  sandattack: {
    name: "Sand Attack",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  seismictoss: {
    name: "Seismic Toss",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  selfdestruct: {
    name: "Self-Destruct",
    type: "Normal",
    basePower: 200,
    category: "Physical",
    flags: {},
    target: "allAdjacent"
  },
  skullbash: {
    name: "Skull Bash",
    type: "Normal",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  slash: {
    name: "Slash",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  sludge: {
    name: "Sludge",
    type: "Poison",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true
  },
  softboiled: {
    name: "Soft-Boiled",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  solarbeam: {
    name: "Solar Beam",
    type: "Grass",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  sonicboom: {
    name: "Sonic Boom",
    type: "Normal",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  spikecannon: {
    name: "Spike Cannon",
    type: "Normal",
    basePower: 20,
    category: "Physical",
    flags: {},
    multihit: [2, 5]
  },
  stomp: {
    name: "Stomp",
    type: "Normal",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  struggle: {
    name: "Struggle",
    type: "Normal",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    struggleRecoil: true
  },
  stunspore: {
    name: "Stun Spore",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  submission: {
    name: "Submission",
    type: "Fighting",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 4]
  },
  substitute: {
    name: "Substitute",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  superfang: {
    name: "Super Fang",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  swift: {
    name: "Swift",
    type: "Normal",
    basePower: 60,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  takedown: {
    name: "Take Down",
    type: "Normal",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 4]
  },
  thrash: {
    name: "Thrash",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  thunder: {
    name: "Thunder",
    type: "Electric",
    basePower: 110,
    category: "Special",
    flags: {},
    secondaries: true
  },
  thunderwave: {
    name: "Thunder Wave",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  transform: {
    name: "Transform",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  triattack: {
    name: "Tri Attack",
    type: "Normal",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  twineedle: {
    name: "Twineedle",
    type: "Bug",
    basePower: 25,
    category: "Physical",
    flags: {},
    secondaries: true,
    multihit: 2
  },
  whirlwind: {
    name: "Whirlwind",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      wind: 1
    }
  },
  wingattack: {
    name: "Wing Attack",
    type: "Flying",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  wrap: {
    name: "Wrap",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  growl: {
    name: "Growl",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes"
  },
  leer: {
    name: "Leer",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  lowkick: {
    name: "Low Kick",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  poisongas: {
    name: "Poison Gas",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  poisonpowder: {
    name: "Poison Powder",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  skyattack: {
    name: "Sky Attack",
    type: "Flying",
    basePower: 140,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  stringshot: {
    name: "String Shot",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  surf: {
    name: "Surf",
    type: "Water",
    basePower: 90,
    category: "Special",
    flags: {},
    target: "allAdjacent"
  },
  tailwhip: {
    name: "Tail Whip",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  toxic: {
    name: "Toxic",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  flash: {
    name: "Flash",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  hypnosis: {
    name: "Hypnosis",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  leechlife: {
    name: "Leech Life",
    type: "Bug",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    drain: [1, 2]
  },
  megadrain: {
    name: "Mega Drain",
    type: "Grass",
    basePower: 40,
    category: "Special",
    flags: {},
    drain: [1, 2]
  },
  vinewhip: {
    name: "Vine Whip",
    type: "Grass",
    basePower: 45,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  waterfall: {
    name: "Waterfall",
    type: "Water",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  tackle: {
    name: "Tackle",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  acidarmor: {
    name: "Acid Armor",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  barrier: {
    name: "Barrier",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  bodyslam: {
    name: "Body Slam",
    type: "Normal",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  flamethrower: {
    name: "Flamethrower",
    type: "Fire",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  hydropump: {
    name: "Hydro Pump",
    type: "Water",
    basePower: 110,
    category: "Special",
    flags: {}
  },
  icebeam: {
    name: "Ice Beam",
    type: "Ice",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  lick: {
    name: "Lick",
    type: "Ghost",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  screech: {
    name: "Screech",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  sing: {
    name: "Sing",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  sleeppowder: {
    name: "Sleep Powder",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  smog: {
    name: "Smog",
    type: "Poison",
    basePower: 30,
    category: "Special",
    flags: {},
    secondaries: true
  },
  spore: {
    name: "Spore",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  supersonic: {
    name: "Supersonic",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  swordsdance: {
    name: "Swords Dance",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  thunderbolt: {
    name: "Thunderbolt",
    type: "Electric",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  boneclub: {
    name: "Bone Club",
    type: "Ground",
    basePower: 65,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  eggbomb: {
    name: "Egg Bomb",
    type: "Normal",
    basePower: 100,
    category: "Physical",
    flags: {
      bullet: 1
    }
  },
  hyperfang: {
    name: "Hyper Fang",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  kinesis: {
    name: "Kinesis",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  lovelykiss: {
    name: "Lovely Kiss",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  meditate: {
    name: "Meditate",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  rollingkick: {
    name: "Rolling Kick",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  sharpen: {
    name: "Sharpen",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  teleport: {
    name: "Teleport",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  agility: {
    name: "Agility",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  confuseray: {
    name: "Confuse Ray",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  confusion: {
    name: "Confusion",
    type: "Psychic",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true
  },
  cut: {
    name: "Cut",
    type: "Normal",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  doubleteam: {
    name: "Double Team",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  drillpeck: {
    name: "Drill Peck",
    type: "Flying",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  ember: {
    name: "Ember",
    type: "Fire",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true
  },
  firepunch: {
    name: "Fire Punch",
    type: "Fire",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  harden: {
    name: "Harden",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  headbutt: {
    name: "Headbutt",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  hornattack: {
    name: "Horn Attack",
    type: "Normal",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  icepunch: {
    name: "Ice Punch",
    type: "Ice",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  megakick: {
    name: "Mega Kick",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  megapunch: {
    name: "Mega Punch",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  paleowave: {
    name: "Paleo Wave",
    type: "Rock",
    basePower: 85,
    category: "Special",
    flags: {},
    secondaries: true
  },
  payday: {
    name: "Pay Day",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {}
  },
  peck: {
    name: "Peck",
    type: "Flying",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  polarflare: {
    name: "Polar Flare",
    type: "Fire",
    basePower: 75,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  pound: {
    name: "Pound",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  psybeam: {
    name: "Psybeam",
    type: "Psychic",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true
  },
  quickattack: {
    name: "Quick Attack",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1
  },
  scratch: {
    name: "Scratch",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  shadowstrike: {
    name: "Shadow Strike",
    type: "Ghost",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  slam: {
    name: "Slam",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  smokescreen: {
    name: "Smokescreen",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  splash: {
    name: "Splash",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  strength: {
    name: "Strength",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  thunderpunch: {
    name: "Thunder Punch",
    type: "Electric",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  thundershock: {
    name: "Thunder Shock",
    type: "Electric",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true
  },
  visegrip: {
    name: "Vise Grip",
    type: "Normal",
    basePower: 55,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  watergun: {
    name: "Water Gun",
    type: "Water",
    basePower: 40,
    category: "Special",
    flags: {}
  },
  withdraw: {
    name: "Withdraw",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  aeroblast: {
    name: "Aeroblast",
    type: "Flying",
    basePower: 100,
    category: "Special",
    flags: {
      wind: 1
    }
  },
  attract: {
    name: "Attract",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  beatup: {
    name: "Beat Up",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {}
  },
  bellydrum: {
    name: "Belly Drum",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  conversion2: {
    name: "Conversion 2",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  crosschop: {
    name: "Cross Chop",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  curse: {
    name: "Curse",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  destinybond: {
    name: "Destiny Bond",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  detect: {
    name: "Detect",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  encore: {
    name: "Encore",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  endure: {
    name: "Endure",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  flail: {
    name: "Flail",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  foresight: {
    name: "Foresight",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  futuresight: {
    name: "Future Sight",
    type: "Psychic",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  healbell: {
    name: "Heal Bell",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  icywind: {
    name: "Icy Wind",
    type: "Ice",
    basePower: 55,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  lockon: {
    name: "Lock-On",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mindreader: {
    name: "Mind Reader",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mirrorcoat: {
    name: "Mirror Coat",
    type: "Psychic",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  moonlight: {
    name: "Moonlight",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  morningsun: {
    name: "Morning Sun",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  nightmare: {
    name: "Nightmare",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  outrage: {
    name: "Outrage",
    type: "Dragon",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  powdersnow: {
    name: "Powder Snow",
    type: "Ice",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  present: {
    name: "Present",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {}
  },
  protect: {
    name: "Protect",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  psychup: {
    name: "Psych Up",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  pursuit: {
    name: "Pursuit",
    type: "Dark",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  raindance: {
    name: "Rain Dance",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  reversal: {
    name: "Reversal",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  safeguard: {
    name: "Safeguard",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sandstorm: {
    name: "Sandstorm",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {
      wind: 1
    }
  },
  sketch: {
    name: "Sketch",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sleeptalk: {
    name: "Sleep Talk",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  spikes: {
    name: "Spikes",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  spite: {
    name: "Spite",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sunnyday: {
    name: "Sunny Day",
    type: "Fire",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  swagger: {
    name: "Swagger",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sweetscent: {
    name: "Sweet Scent",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  synthesis: {
    name: "Synthesis",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  thief: {
    name: "Thief",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  triplekick: {
    name: "Triple Kick",
    type: "Fighting",
    basePower: 10,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: 3,
    multiaccuracy: true
  },
  twister: {
    name: "Twister",
    type: "Dragon",
    basePower: 40,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  ancientpower: {
    name: "Ancient Power",
    type: "Rock",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true
  },
  bonerush: {
    name: "Bone Rush",
    type: "Ground",
    basePower: 25,
    category: "Physical",
    flags: {},
    multihit: [2, 5]
  },
  crunch: {
    name: "Crunch",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  feintattack: {
    name: "Feint Attack",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  gigadrain: {
    name: "Giga Drain",
    type: "Grass",
    basePower: 75,
    category: "Special",
    flags: {},
    drain: [1, 2]
  },
  hiddenpower: {
    name: "Hidden Power",
    type: "Normal",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  meanlook: {
    name: "Mean Look",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  rapidspin: {
    name: "Rapid Spin",
    type: "Normal",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  rocksmash: {
    name: "Rock Smash",
    type: "Fighting",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  spiderweb: {
    name: "Spider Web",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  whirlpool: {
    name: "Whirlpool",
    type: "Water",
    basePower: 35,
    category: "Special",
    flags: {}
  },
  zapcannon: {
    name: "Zap Cannon",
    type: "Electric",
    basePower: 120,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  cottonspore: {
    name: "Cotton Spore",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  extremespeed: {
    name: "Extreme Speed",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 2
  },
  furycutter: {
    name: "Fury Cutter",
    type: "Bug",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  magnitude: {
    name: "Magnitude",
    type: "Ground",
    basePower: 0,
    category: "Physical",
    flags: {},
    target: "allAdjacent"
  },
  milkdrink: {
    name: "Milk Drink",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  scaryface: {
    name: "Scary Face",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  charm: {
    name: "Charm",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  hiddenpowerbug: {
    name: "Hidden Power Bug",
    type: "Bug",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerdark: {
    name: "Hidden Power Dark",
    type: "Dark",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerdragon: {
    name: "Hidden Power Dragon",
    type: "Dragon",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerelectric: {
    name: "Hidden Power Electric",
    type: "Electric",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerfighting: {
    name: "Hidden Power Fighting",
    type: "Fighting",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerfire: {
    name: "Hidden Power Fire",
    type: "Fire",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerflying: {
    name: "Hidden Power Flying",
    type: "Flying",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerghost: {
    name: "Hidden Power Ghost",
    type: "Ghost",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowergrass: {
    name: "Hidden Power Grass",
    type: "Grass",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerground: {
    name: "Hidden Power Ground",
    type: "Ground",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerice: {
    name: "Hidden Power Ice",
    type: "Ice",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerpoison: {
    name: "Hidden Power Poison",
    type: "Poison",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerpsychic: {
    name: "Hidden Power Psychic",
    type: "Psychic",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerrock: {
    name: "Hidden Power Rock",
    type: "Rock",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowersteel: {
    name: "Hidden Power Steel",
    type: "Steel",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  hiddenpowerwater: {
    name: "Hidden Power Water",
    type: "Water",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  perishsong: {
    name: "Perish Song",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  snore: {
    name: "Snore",
    type: "Normal",
    basePower: 50,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  sweetkiss: {
    name: "Sweet Kiss",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  rollout: {
    name: "Rollout",
    type: "Rock",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  frustration: {
    name: "Frustration",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  return: {
    name: "Return",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  sacredfire: {
    name: "Sacred Fire",
    type: "Fire",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  batonpass: {
    name: "Baton Pass",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  dragonbreath: {
    name: "Dragon Breath",
    type: "Dragon",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true
  },
  dynamicpunch: {
    name: "Dynamic Punch",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  falseswipe: {
    name: "False Swipe",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  flamewheel: {
    name: "Flame Wheel",
    type: "Fire",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  irontail: {
    name: "Iron Tail",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  machpunch: {
    name: "Mach Punch",
    type: "Fighting",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    priority: 1
  },
  megahorn: {
    name: "Megahorn",
    type: "Bug",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  metalclaw: {
    name: "Metal Claw",
    type: "Steel",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  mudslap: {
    name: "Mud-Slap",
    type: "Ground",
    basePower: 20,
    category: "Special",
    flags: {},
    secondaries: true
  },
  octazooka: {
    name: "Octazooka",
    type: "Water",
    basePower: 65,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  painsplit: {
    name: "Pain Split",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  shadowball: {
    name: "Shadow Ball",
    type: "Ghost",
    basePower: 80,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  sludgebomb: {
    name: "Sludge Bomb",
    type: "Poison",
    basePower: 90,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  spark: {
    name: "Spark",
    type: "Electric",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  steelwing: {
    name: "Steel Wing",
    type: "Steel",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  vitalthrow: {
    name: "Vital Throw",
    type: "Fighting",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  armthrust: {
    name: "Arm Thrust",
    type: "Fighting",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5]
  },
  assist: {
    name: "Assist",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  astonish: {
    name: "Astonish",
    type: "Ghost",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  block: {
    name: "Block",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  bounce: {
    name: "Bounce",
    type: "Flying",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  bulletseed: {
    name: "Bullet Seed",
    type: "Grass",
    basePower: 25,
    category: "Physical",
    flags: {
      bullet: 1
    },
    multihit: [2, 5]
  },
  camouflage: {
    name: "Camouflage",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  charge: {
    name: "Charge",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  covet: {
    name: "Covet",
    type: "Normal",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  dive: {
    name: "Dive",
    type: "Water",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  doomdesire: {
    name: "Doom Desire",
    type: "Steel",
    basePower: 140,
    category: "Special",
    flags: {}
  },
  extrasensory: {
    name: "Extrasensory",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  fakeout: {
    name: "Fake Out",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    priority: 3
  },
  followme: {
    name: "Follow Me",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 2
  },
  hail: {
    name: "Hail",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  iciclespear: {
    name: "Icicle Spear",
    type: "Ice",
    basePower: 25,
    category: "Physical",
    flags: {},
    multihit: [2, 5]
  },
  ingrain: {
    name: "Ingrain",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  knockoff: {
    name: "Knock Off",
    type: "Dark",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  leafblade: {
    name: "Leaf Blade",
    type: "Grass",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  magiccoat: {
    name: "Magic Coat",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  memento: {
    name: "Memento",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  naturepower: {
    name: "Nature Power",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  needlearm: {
    name: "Needle Arm",
    type: "Grass",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  odorsleuth: {
    name: "Odor Sleuth",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  overheat: {
    name: "Overheat",
    type: "Fire",
    basePower: 130,
    category: "Special",
    flags: {},
    self: {
      boosts: {
        spa: -2
      }
    }
  },
  revenge: {
    name: "Revenge",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  rockblast: {
    name: "Rock Blast",
    type: "Rock",
    basePower: 25,
    category: "Physical",
    flags: {
      bullet: 1
    },
    multihit: [2, 5]
  },
  roleplay: {
    name: "Role Play",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sandtomb: {
    name: "Sand Tomb",
    type: "Ground",
    basePower: 35,
    category: "Physical",
    flags: {}
  },
  skillswap: {
    name: "Skill Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  smellingsalts: {
    name: "Smelling Salts",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  spitup: {
    name: "Spit Up",
    type: "Normal",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  stockpile: {
    name: "Stockpile",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  swallow: {
    name: "Swallow",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  taunt: {
    name: "Taunt",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  teeterdance: {
    name: "Teeter Dance",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacent"
  },
  tickle: {
    name: "Tickle",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  trick: {
    name: "Trick",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  uproar: {
    name: "Uproar",
    type: "Normal",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    }
  },
  volttackle: {
    name: "Volt Tackle",
    type: "Electric",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    recoil: [33, 100]
  },
  weatherball: {
    name: "Weather Ball",
    type: "Normal",
    basePower: 50,
    category: "Special",
    flags: {
      bullet: 1
    }
  },
  aromatherapy: {
    name: "Aromatherapy",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  brickbreak: {
    name: "Brick Break",
    type: "Fighting",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  endeavor: {
    name: "Endeavor",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  focuspunch: {
    name: "Focus Punch",
    type: "Fighting",
    basePower: 150,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  imprison: {
    name: "Imprison",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mudsport: {
    name: "Mud Sport",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  recycle: {
    name: "Recycle",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  secretpower: {
    name: "Secret Power",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  skyuppercut: {
    name: "Sky Uppercut",
    type: "Fighting",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  slackoff: {
    name: "Slack Off",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  snatch: {
    name: "Snatch",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  tailglow: {
    name: "Tail Glow",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  torment: {
    name: "Torment",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  watersport: {
    name: "Water Sport",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  wish: {
    name: "Wish",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  aircutter: {
    name: "Air Cutter",
    type: "Flying",
    basePower: 60,
    category: "Special",
    flags: {
      slicing: 1,
      wind: 1
    },
    target: "allAdjacentFoes"
  },
  facade: {
    name: "Facade",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  grasswhistle: {
    name: "Grass Whistle",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  heatwave: {
    name: "Heat Wave",
    type: "Fire",
    basePower: 95,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  hypervoice: {
    name: "Hyper Voice",
    type: "Normal",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes"
  },
  metalsound: {
    name: "Metal Sound",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  meteormash: {
    name: "Meteor Mash",
    type: "Steel",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  muddywater: {
    name: "Muddy Water",
    type: "Water",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  poisonfang: {
    name: "Poison Fang",
    type: "Poison",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  rocktomb: {
    name: "Rock Tomb",
    type: "Rock",
    basePower: 60,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  willowisp: {
    name: "Will-O-Wisp",
    type: "Fire",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  iceball: {
    name: "Ice Ball",
    type: "Ice",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1,
      bullet: 1
    }
  },
  sheercold: {
    name: "Sheer Cold",
    type: "Ice",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  howl: {
    name: "Howl",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  lusterpurge: {
    name: "Luster Purge",
    type: "Psychic",
    basePower: 95,
    category: "Special",
    flags: {},
    secondaries: true
  },
  mistball: {
    name: "Mist Ball",
    type: "Psychic",
    basePower: 95,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  psychoboost: {
    name: "Psycho Boost",
    type: "Psychic",
    basePower: 140,
    category: "Special",
    flags: {},
    self: {
      boosts: {
        spa: -2
      }
    }
  },
  refresh: {
    name: "Refresh",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  signalbeam: {
    name: "Signal Beam",
    type: "Bug",
    basePower: 75,
    category: "Special",
    flags: {},
    secondaries: true
  },
  silverwind: {
    name: "Silver Wind",
    type: "Bug",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true
  },
  aerialace: {
    name: "Aerial Ace",
    type: "Flying",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  blastburn: {
    name: "Blast Burn",
    type: "Fire",
    basePower: 150,
    category: "Special",
    flags: {}
  },
  blazekick: {
    name: "Blaze Kick",
    type: "Fire",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  bulkup: {
    name: "Bulk Up",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  calmmind: {
    name: "Calm Mind",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  cosmicpower: {
    name: "Cosmic Power",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  crushclaw: {
    name: "Crush Claw",
    type: "Normal",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  dragonclaw: {
    name: "Dragon Claw",
    type: "Dragon",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  dragondance: {
    name: "Dragon Dance",
    type: "Dragon",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  eruption: {
    name: "Eruption",
    type: "Fire",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  faketears: {
    name: "Fake Tears",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  featherdance: {
    name: "Feather Dance",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  flatter: {
    name: "Flatter",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  frenzyplant: {
    name: "Frenzy Plant",
    type: "Grass",
    basePower: 150,
    category: "Special",
    flags: {}
  },
  grudge: {
    name: "Grudge",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  helpinghand: {
    name: "Helping Hand",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 5
  },
  hydrocannon: {
    name: "Hydro Cannon",
    type: "Water",
    basePower: 150,
    category: "Special",
    flags: {}
  },
  irondefense: {
    name: "Iron Defense",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  magicalleaf: {
    name: "Magical Leaf",
    type: "Grass",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  mudshot: {
    name: "Mud Shot",
    type: "Ground",
    basePower: 55,
    category: "Special",
    flags: {},
    secondaries: true
  },
  poisontail: {
    name: "Poison Tail",
    type: "Poison",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  shadowpunch: {
    name: "Shadow Punch",
    type: "Ghost",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  shockwave: {
    name: "Shock Wave",
    type: "Electric",
    basePower: 60,
    category: "Special",
    flags: {}
  },
  superpower: {
    name: "Superpower",
    type: "Fighting",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    self: {
      boosts: {
        atk: -1,
        def: -1
      }
    }
  },
  waterpulse: {
    name: "Water Pulse",
    type: "Water",
    basePower: 60,
    category: "Special",
    flags: {
      pulse: 1
    },
    secondaries: true
  },
  waterspout: {
    name: "Water Spout",
    type: "Water",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  yawn: {
    name: "Yawn",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  acupressure: {
    name: "Acupressure",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  aquaring: {
    name: "Aqua Ring",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  assurance: {
    name: "Assurance",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  avalanche: {
    name: "Avalanche",
    type: "Ice",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  bravebird: {
    name: "Brave Bird",
    type: "Flying",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [33, 100]
  },
  bugbite: {
    name: "Bug Bite",
    type: "Bug",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  chatter: {
    name: "Chatter",
    type: "Flying",
    basePower: 65,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  copycat: {
    name: "Copycat",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  crushgrip: {
    name: "Crush Grip",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  defog: {
    name: "Defog",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  doublehit: {
    name: "Double Hit",
    type: "Normal",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 2]
  },
  drainpunch: {
    name: "Drain Punch",
    type: "Fighting",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    drain: [1, 2]
  },
  embargo: {
    name: "Embargo",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  feint: {
    name: "Feint",
    type: "Normal",
    basePower: 30,
    category: "Physical",
    flags: {},
    priority: 2,
    breaksProtect: true
  },
  firefang: {
    name: "Fire Fang",
    type: "Fire",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  flareblitz: {
    name: "Flare Blitz",
    type: "Fire",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    recoil: [33, 100]
  },
  fling: {
    name: "Fling",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {}
  },
  gravity: {
    name: "Gravity",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  headsmash: {
    name: "Head Smash",
    type: "Rock",
    basePower: 150,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 2]
  },
  healblock: {
    name: "Heal Block",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  healingwish: {
    name: "Healing Wish",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  healorder: {
    name: "Heal Order",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  lastresort: {
    name: "Last Resort",
    type: "Normal",
    basePower: 140,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  luckychant: {
    name: "Lucky Chant",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  lunardance: {
    name: "Lunar Dance",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  magmastorm: {
    name: "Magma Storm",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  magnetrise: {
    name: "Magnet Rise",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mefirst: {
    name: "Me First",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  metalburst: {
    name: "Metal Burst",
    type: "Steel",
    basePower: 0,
    category: "Physical",
    flags: {}
  },
  miracleeye: {
    name: "Miracle Eye",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  naturalgift: {
    name: "Natural Gift",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {}
  },
  payback: {
    name: "Payback",
    type: "Dark",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  pluck: {
    name: "Pluck",
    type: "Flying",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  powertrick: {
    name: "Power Trick",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  roost: {
    name: "Roost",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  stealthrock: {
    name: "Stealth Rock",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  suckerpunch: {
    name: "Sucker Punch",
    type: "Dark",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1
  },
  switcheroo: {
    name: "Switcheroo",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  tailwind: {
    name: "Tailwind",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {
      wind: 1
    }
  },
  toxicspikes: {
    name: "Toxic Spikes",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  trickroom: {
    name: "Trick Room",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  uturn: {
    name: "U-turn",
    type: "Bug",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  wakeupslap: {
    name: "Wake-Up Slap",
    type: "Fighting",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  woodhammer: {
    name: "Wood Hammer",
    type: "Grass",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [33, 100]
  },
  worryseed: {
    name: "Worry Seed",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  wringout: {
    name: "Wring Out",
    type: "Normal",
    basePower: 0,
    category: "Special",
    flags: {
      contact: 1
    }
  },
  airslash: {
    name: "Air Slash",
    type: "Flying",
    basePower: 75,
    category: "Special",
    flags: {
      slicing: 1
    },
    secondaries: true
  },
  aurasphere: {
    name: "Aura Sphere",
    type: "Fighting",
    basePower: 80,
    category: "Special",
    flags: {
      bullet: 1,
      pulse: 1
    }
  },
  bugbuzz: {
    name: "Bug Buzz",
    type: "Bug",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  dracometeor: {
    name: "Draco Meteor",
    type: "Dragon",
    basePower: 130,
    category: "Special",
    flags: {},
    self: {
      boosts: {
        spa: -2
      }
    }
  },
  dragonpulse: {
    name: "Dragon Pulse",
    type: "Dragon",
    basePower: 85,
    category: "Special",
    flags: {
      pulse: 1
    }
  },
  dragonrush: {
    name: "Dragon Rush",
    type: "Dragon",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  energyball: {
    name: "Energy Ball",
    type: "Grass",
    basePower: 90,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  gunkshot: {
    name: "Gunk Shot",
    type: "Poison",
    basePower: 120,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  gyroball: {
    name: "Gyro Ball",
    type: "Steel",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1,
      bullet: 1
    }
  },
  leafstorm: {
    name: "Leaf Storm",
    type: "Grass",
    basePower: 130,
    category: "Special",
    flags: {},
    self: {
      boosts: {
        spa: -2
      }
    }
  },
  powergem: {
    name: "Power Gem",
    type: "Rock",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  psychoshift: {
    name: "Psycho Shift",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  shadowforce: {
    name: "Shadow Force",
    type: "Ghost",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    breaksProtect: true
  },
  darkvoid: {
    name: "Dark Void",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  gastroacid: {
    name: "Gastro Acid",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  captivate: {
    name: "Captivate",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  grassknot: {
    name: "Grass Knot",
    type: "Grass",
    basePower: 0,
    category: "Special",
    flags: {
      contact: 1
    }
  },
  heartswap: {
    name: "Heart Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  judgment: {
    name: "Judgment",
    type: "Normal",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  magnetbomb: {
    name: "Magnet Bomb",
    type: "Steel",
    basePower: 60,
    category: "Physical",
    flags: {
      bullet: 1
    }
  },
  mirrorshot: {
    name: "Mirror Shot",
    type: "Steel",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true
  },
  mudbomb: {
    name: "Mud Bomb",
    type: "Ground",
    basePower: 65,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  ominouswind: {
    name: "Ominous Wind",
    type: "Ghost",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true
  },
  punishment: {
    name: "Punishment",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  roaroftime: {
    name: "Roar of Time",
    type: "Dragon",
    basePower: 150,
    category: "Special",
    flags: {}
  },
  rockclimb: {
    name: "Rock Climb",
    type: "Normal",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  seedflare: {
    name: "Seed Flare",
    type: "Grass",
    basePower: 120,
    category: "Special",
    flags: {},
    secondaries: true
  },
  spacialrend: {
    name: "Spacial Rend",
    type: "Dragon",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  trumpcard: {
    name: "Trump Card",
    type: "Normal",
    basePower: 0,
    category: "Special",
    flags: {
      contact: 1
    }
  },
  aquajet: {
    name: "Aqua Jet",
    type: "Water",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1
  },
  aquatail: {
    name: "Aqua Tail",
    type: "Water",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  attackorder: {
    name: "Attack Order",
    type: "Bug",
    basePower: 90,
    category: "Physical",
    flags: {}
  },
  brine: {
    name: "Brine",
    type: "Water",
    basePower: 65,
    category: "Special",
    flags: {}
  },
  bulletpunch: {
    name: "Bullet Punch",
    type: "Steel",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    priority: 1
  },
  chargebeam: {
    name: "Charge Beam",
    type: "Electric",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true
  },
  closecombat: {
    name: "Close Combat",
    type: "Fighting",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  crosspoison: {
    name: "Cross Poison",
    type: "Poison",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    secondaries: true
  },
  darkpulse: {
    name: "Dark Pulse",
    type: "Dark",
    basePower: 80,
    category: "Special",
    flags: {
      pulse: 1
    },
    secondaries: true
  },
  defendorder: {
    name: "Defend Order",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  discharge: {
    name: "Discharge",
    type: "Electric",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacent"
  },
  earthpower: {
    name: "Earth Power",
    type: "Ground",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  flashcannon: {
    name: "Flash Cannon",
    type: "Steel",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  focusblast: {
    name: "Focus Blast",
    type: "Fighting",
    basePower: 120,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  forcepalm: {
    name: "Force Palm",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  gigaimpact: {
    name: "Giga Impact",
    type: "Normal",
    basePower: 150,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  guardswap: {
    name: "Guard Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  hammerarm: {
    name: "Hammer Arm",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  icefang: {
    name: "Ice Fang",
    type: "Ice",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  iceshard: {
    name: "Ice Shard",
    type: "Ice",
    basePower: 40,
    category: "Physical",
    flags: {},
    priority: 1
  },
  ironhead: {
    name: "Iron Head",
    type: "Steel",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  lavaplume: {
    name: "Lava Plume",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacent"
  },
  nastyplot: {
    name: "Nasty Plot",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  nightslash: {
    name: "Night Slash",
    type: "Dark",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  poisonjab: {
    name: "Poison Jab",
    type: "Poison",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  powerswap: {
    name: "Power Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  powerwhip: {
    name: "Power Whip",
    type: "Grass",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  psychocut: {
    name: "Psycho Cut",
    type: "Psychic",
    basePower: 70,
    category: "Physical",
    flags: {
      slicing: 1
    }
  },
  rockpolish: {
    name: "Rock Polish",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  rockwrecker: {
    name: "Rock Wrecker",
    type: "Rock",
    basePower: 150,
    category: "Physical",
    flags: {
      bullet: 1
    }
  },
  seedbomb: {
    name: "Seed Bomb",
    type: "Grass",
    basePower: 80,
    category: "Physical",
    flags: {
      bullet: 1
    }
  },
  shadowclaw: {
    name: "Shadow Claw",
    type: "Ghost",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  shadowsneak: {
    name: "Shadow Sneak",
    type: "Ghost",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1
  },
  stoneedge: {
    name: "Stone Edge",
    type: "Rock",
    basePower: 100,
    category: "Physical",
    flags: {}
  },
  thunderfang: {
    name: "Thunder Fang",
    type: "Electric",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    secondaries: true
  },
  vacuumwave: {
    name: "Vacuum Wave",
    type: "Fighting",
    basePower: 40,
    category: "Special",
    flags: {},
    priority: 1
  },
  xscissor: {
    name: "X-Scissor",
    type: "Bug",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  zenheadbutt: {
    name: "Zen Headbutt",
    type: "Psychic",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  autotomize: {
    name: "Autotomize",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  bestow: {
    name: "Bestow",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  echoedvoice: {
    name: "Echoed Voice",
    type: "Normal",
    basePower: 40,
    category: "Special",
    flags: {
      sound: 1
    }
  },
  electroball: {
    name: "Electro Ball",
    type: "Electric",
    basePower: 0,
    category: "Special",
    flags: {
      bullet: 1
    }
  },
  entrainment: {
    name: "Entrainment",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  finalgambit: {
    name: "Final Gambit",
    type: "Fighting",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  firepledge: {
    name: "Fire Pledge",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  frostbreath: {
    name: "Frost Breath",
    type: "Ice",
    basePower: 60,
    category: "Special",
    flags: {},
    willCrit: true
  },
  grasspledge: {
    name: "Grass Pledge",
    type: "Grass",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  healpulse: {
    name: "Heal Pulse",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {
      pulse: 1
    }
  },
  heatcrash: {
    name: "Heat Crash",
    type: "Fire",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  hex: {
    name: "Hex",
    type: "Ghost",
    basePower: 65,
    category: "Special",
    flags: {}
  },
  hornleech: {
    name: "Horn Leech",
    type: "Grass",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    drain: [1, 2]
  },
  hurricane: {
    name: "Hurricane",
    type: "Flying",
    basePower: 110,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true
  },
  incinerate: {
    name: "Incinerate",
    type: "Fire",
    basePower: 60,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  lowsweep: {
    name: "Low Sweep",
    type: "Fighting",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  magicroom: {
    name: "Magic Room",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  quickguard: {
    name: "Quick Guard",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 3
  },
  ragepowder: {
    name: "Rage Powder",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 2
  },
  relicsong: {
    name: "Relic Song",
    type: "Normal",
    basePower: 75,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  round: {
    name: "Round",
    type: "Normal",
    basePower: 60,
    category: "Special",
    flags: {
      sound: 1
    }
  },
  sacredsword: {
    name: "Sacred Sword",
    type: "Fighting",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    ignoreDefensive: true
  },
  scald: {
    name: "Scald",
    type: "Water",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  simplebeam: {
    name: "Simple Beam",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  skydrop: {
    name: "Sky Drop",
    type: "Flying",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  snarl: {
    name: "Snarl",
    type: "Dark",
    basePower: 55,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  soak: {
    name: "Soak",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  steamroller: {
    name: "Steamroller",
    type: "Bug",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  stormthrow: {
    name: "Storm Throw",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    willCrit: true
  },
  strugglebug: {
    name: "Struggle Bug",
    type: "Bug",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  synchronoise: {
    name: "Synchronoise",
    type: "Psychic",
    basePower: 120,
    category: "Special",
    flags: {},
    target: "allAdjacent"
  },
  technoblast: {
    name: "Techno Blast",
    type: "Normal",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  telekinesis: {
    name: "Telekinesis",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  waterpledge: {
    name: "Water Pledge",
    type: "Water",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  wideguard: {
    name: "Wide Guard",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 3
  },
  wonderroom: {
    name: "Wonder Room",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  allyswitch: {
    name: "Ally Switch",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 2
  },
  flameburst: {
    name: "Flame Burst",
    type: "Fire",
    basePower: 70,
    category: "Special",
    flags: {}
  },
  heavyslam: {
    name: "Heavy Slam",
    type: "Steel",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  reflecttype: {
    name: "Reflect Type",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  voltswitch: {
    name: "Volt Switch",
    type: "Electric",
    basePower: 70,
    category: "Special",
    flags: {}
  },
  chipaway: {
    name: "Chip Away",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    ignoreDefensive: true
  },
  fierydance: {
    name: "Fiery Dance",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  headcharge: {
    name: "Head Charge",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 4]
  },
  heartstamp: {
    name: "Heart Stamp",
    type: "Psychic",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  quash: {
    name: "Quash",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  searingshot: {
    name: "Searing Shot",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    target: "allAdjacent"
  },
  acidspray: {
    name: "Acid Spray",
    type: "Poison",
    basePower: 40,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  acrobatics: {
    name: "Acrobatics",
    type: "Flying",
    basePower: 55,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  afteryou: {
    name: "After You",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  blueflare: {
    name: "Blue Flare",
    type: "Fire",
    basePower: 130,
    category: "Special",
    flags: {},
    secondaries: true
  },
  boltstrike: {
    name: "Bolt Strike",
    type: "Electric",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  bulldoze: {
    name: "Bulldoze",
    type: "Ground",
    basePower: 60,
    category: "Physical",
    flags: {},
    secondaries: true,
    target: "allAdjacent"
  },
  circlethrow: {
    name: "Circle Throw",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  clearsmog: {
    name: "Clear Smog",
    type: "Poison",
    basePower: 50,
    category: "Special",
    flags: {}
  },
  coil: {
    name: "Coil",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  cottonguard: {
    name: "Cotton Guard",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  dragontail: {
    name: "Dragon Tail",
    type: "Dragon",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  drillrun: {
    name: "Drill Run",
    type: "Ground",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  dualchop: {
    name: "Dual Chop",
    type: "Dragon",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 2]
  },
  electroweb: {
    name: "Electroweb",
    type: "Electric",
    basePower: 55,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  flamecharge: {
    name: "Flame Charge",
    type: "Fire",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  foulplay: {
    name: "Foul Play",
    type: "Dark",
    basePower: 95,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  freezeshock: {
    name: "Freeze Shock",
    type: "Ice",
    basePower: 140,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  fusionbolt: {
    name: "Fusion Bolt",
    type: "Electric",
    basePower: 100,
    category: "Physical",
    flags: {}
  },
  fusionflare: {
    name: "Fusion Flare",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  geargrind: {
    name: "Gear Grind",
    type: "Steel",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 2]
  },
  glaciate: {
    name: "Glaciate",
    type: "Ice",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  guardsplit: {
    name: "Guard Split",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  honeclaws: {
    name: "Hone Claws",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  iceburn: {
    name: "Ice Burn",
    type: "Ice",
    basePower: 140,
    category: "Special",
    flags: {},
    secondaries: true
  },
  iciclecrash: {
    name: "Icicle Crash",
    type: "Ice",
    basePower: 85,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  inferno: {
    name: "Inferno",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {},
    secondaries: true
  },
  leaftornado: {
    name: "Leaf Tornado",
    type: "Grass",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true
  },
  nightdaze: {
    name: "Night Daze",
    type: "Dark",
    basePower: 85,
    category: "Special",
    flags: {},
    secondaries: true
  },
  powersplit: {
    name: "Power Split",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  psyshock: {
    name: "Psyshock",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    overrideDefensiveStat: "def"
  },
  psystrike: {
    name: "Psystrike",
    type: "Psychic",
    basePower: 100,
    category: "Special",
    flags: {},
    overrideDefensiveStat: "def"
  },
  quiverdance: {
    name: "Quiver Dance",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  razorshell: {
    name: "Razor Shell",
    type: "Water",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    secondaries: true
  },
  retaliate: {
    name: "Retaliate",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  secretsword: {
    name: "Secret Sword",
    type: "Fighting",
    basePower: 85,
    category: "Special",
    flags: {
      slicing: 1
    },
    overrideDefensiveStat: "def"
  },
  shellsmash: {
    name: "Shell Smash",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  shiftgear: {
    name: "Shift Gear",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sludgewave: {
    name: "Sludge Wave",
    type: "Poison",
    basePower: 95,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacent"
  },
  smackdown: {
    name: "Smack Down",
    type: "Rock",
    basePower: 50,
    category: "Physical",
    flags: {}
  },
  storedpower: {
    name: "Stored Power",
    type: "Psychic",
    basePower: 20,
    category: "Special",
    flags: {}
  },
  tailslap: {
    name: "Tail Slap",
    type: "Normal",
    basePower: 25,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5]
  },
  vcreate: {
    name: "V-create",
    type: "Fire",
    basePower: 180,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  venoshock: {
    name: "Venoshock",
    type: "Poison",
    basePower: 65,
    category: "Special",
    flags: {}
  },
  wildcharge: {
    name: "Wild Charge",
    type: "Electric",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 4]
  },
  workup: {
    name: "Work Up",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  diamondstorm: {
    name: "Diamond Storm",
    type: "Rock",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  fellstinger: {
    name: "Fell Stinger",
    type: "Bug",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  flyingpress: {
    name: "Flying Press",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  hyperspacefury: {
    name: "Hyperspace Fury",
    type: "Dark",
    basePower: 100,
    category: "Physical",
    flags: {},
    breaksProtect: true
  },
  hyperspacehole: {
    name: "Hyperspace Hole",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    breaksProtect: true
  },
  kingsshield: {
    name: "King's Shield",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  mistyterrain: {
    name: "Misty Terrain",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  mysticalfire: {
    name: "Mystical Fire",
    type: "Fire",
    basePower: 75,
    category: "Special",
    flags: {},
    secondaries: true
  },
  paraboliccharge: {
    name: "Parabolic Charge",
    type: "Electric",
    basePower: 65,
    category: "Special",
    flags: {},
    target: "allAdjacent",
    drain: [1, 2]
  },
  partingshot: {
    name: "Parting Shot",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  phantomforce: {
    name: "Phantom Force",
    type: "Ghost",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    breaksProtect: true
  },
  powder: {
    name: "Powder",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 1
  },
  spikyshield: {
    name: "Spiky Shield",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  thousandarrows: {
    name: "Thousand Arrows",
    type: "Ground",
    basePower: 90,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes"
  },
  thousandwaves: {
    name: "Thousand Waves",
    type: "Ground",
    basePower: 90,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes"
  },
  watershuriken: {
    name: "Water Shuriken",
    type: "Water",
    basePower: 15,
    category: "Special",
    flags: {},
    priority: 1,
    multihit: [2, 5]
  },
  dragonascent: {
    name: "Dragon Ascent",
    type: "Flying",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  electricterrain: {
    name: "Electric Terrain",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  geomancy: {
    name: "Geomancy",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  grassyterrain: {
    name: "Grassy Terrain",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  iondeluge: {
    name: "Ion Deluge",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 1
  },
  landswrath: {
    name: "Land's Wrath",
    type: "Ground",
    basePower: 90,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes"
  },
  lightofruin: {
    name: "Light of Ruin",
    type: "Fairy",
    basePower: 140,
    category: "Special",
    flags: {},
    recoil: [1, 2]
  },
  oblivionwing: {
    name: "Oblivion Wing",
    type: "Flying",
    basePower: 80,
    category: "Special",
    flags: {},
    drain: [3, 4]
  },
  originpulse: {
    name: "Origin Pulse",
    type: "Water",
    basePower: 110,
    category: "Special",
    flags: {
      pulse: 1
    },
    target: "allAdjacentFoes"
  },
  precipiceblades: {
    name: "Precipice Blades",
    type: "Ground",
    basePower: 120,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes"
  },
  rototiller: {
    name: "Rototiller",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  steameruption: {
    name: "Steam Eruption",
    type: "Water",
    basePower: 110,
    category: "Special",
    flags: {},
    secondaries: true
  },
  aromaticmist: {
    name: "Aromatic Mist",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  babydolleyes: {
    name: "Baby-Doll Eyes",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 1
  },
  belch: {
    name: "Belch",
    type: "Poison",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  boomburst: {
    name: "Boomburst",
    type: "Normal",
    basePower: 140,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacent"
  },
  celebrate: {
    name: "Celebrate",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  confide: {
    name: "Confide",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  craftyshield: {
    name: "Crafty Shield",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 3
  },
  dazzlinggleam: {
    name: "Dazzling Gleam",
    type: "Fairy",
    basePower: 80,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  disarmingvoice: {
    name: "Disarming Voice",
    type: "Fairy",
    basePower: 40,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes"
  },
  drainingkiss: {
    name: "Draining Kiss",
    type: "Fairy",
    basePower: 50,
    category: "Special",
    flags: {
      contact: 1
    },
    drain: [3, 4]
  },
  eerieimpulse: {
    name: "Eerie Impulse",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  electrify: {
    name: "Electrify",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  fairylock: {
    name: "Fairy Lock",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  fairywind: {
    name: "Fairy Wind",
    type: "Fairy",
    basePower: 40,
    category: "Special",
    flags: {
      wind: 1
    }
  },
  flowershield: {
    name: "Flower Shield",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  forestscurse: {
    name: "Forest's Curse",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  freezedry: {
    name: "Freeze-Dry",
    type: "Ice",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true
  },
  happyhour: {
    name: "Happy Hour",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  holdback: {
    name: "Hold Back",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  holdhands: {
    name: "Hold Hands",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  infestation: {
    name: "Infestation",
    type: "Bug",
    basePower: 20,
    category: "Special",
    flags: {
      contact: 1
    }
  },
  magneticflux: {
    name: "Magnetic Flux",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  matblock: {
    name: "Mat Block",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  moonblast: {
    name: "Moonblast",
    type: "Fairy",
    basePower: 95,
    category: "Special",
    flags: {},
    secondaries: true
  },
  nobleroar: {
    name: "Noble Roar",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  nuzzle: {
    name: "Nuzzle",
    type: "Electric",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  petalblizzard: {
    name: "Petal Blizzard",
    type: "Grass",
    basePower: 90,
    category: "Physical",
    flags: {
      wind: 1
    },
    target: "allAdjacent"
  },
  playnice: {
    name: "Play Nice",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  playrough: {
    name: "Play Rough",
    type: "Fairy",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  poweruppunch: {
    name: "Power-Up Punch",
    type: "Fighting",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true
  },
  stickyweb: {
    name: "Sticky Web",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  topsyturvy: {
    name: "Topsy-Turvy",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  trickortreat: {
    name: "Trick-or-Treat",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  venomdrench: {
    name: "Venom Drench",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes"
  },
  "10000000voltthunderbolt": {
    name: "10,000,000 Volt Thunderbolt",
    type: "Electric",
    basePower: 195,
    category: "Special",
    flags: {}
  },
  aciddownpour: {
    name: "Acid Downpour",
    type: "Poison",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  alloutpummeling: {
    name: "All-Out Pummeling",
    type: "Fighting",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  banefulbunker: {
    name: "Baneful Bunker",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  beakblast: {
    name: "Beak Blast",
    type: "Flying",
    basePower: 100,
    category: "Physical",
    flags: {
      bullet: 1
    }
  },
  blackholeeclipse: {
    name: "Black Hole Eclipse",
    type: "Dark",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  bloomdoom: {
    name: "Bloom Doom",
    type: "Grass",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  breakneckblitz: {
    name: "Breakneck Blitz",
    type: "Normal",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  catastropika: {
    name: "Catastropika",
    type: "Electric",
    basePower: 210,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  clangoroussoulblaze: {
    name: "Clangorous Soulblaze",
    type: "Dragon",
    basePower: 185,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  continentalcrush: {
    name: "Continental Crush",
    type: "Rock",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  coreenforcer: {
    name: "Core Enforcer",
    type: "Dragon",
    basePower: 100,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  corkscrewcrash: {
    name: "Corkscrew Crash",
    type: "Steel",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  devastatingdrake: {
    name: "Devastating Drake",
    type: "Dragon",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  doubleironbash: {
    name: "Double Iron Bash",
    type: "Steel",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    secondaries: true,
    multihit: [1, 2]
  },
  dragonhammer: {
    name: "Dragon Hammer",
    type: "Dragon",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  extremeevoboost: {
    name: "Extreme Evoboost",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  fleurcannon: {
    name: "Fleur Cannon",
    type: "Fairy",
    basePower: 130,
    category: "Special",
    flags: {},
    self: {
      boosts: {
        spa: -2
      }
    }
  },
  floralhealing: {
    name: "Floral Healing",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  genesissupernova: {
    name: "Genesis Supernova",
    type: "Psychic",
    basePower: 185,
    category: "Special",
    flags: {},
    secondaries: true
  },
  gigavolthavoc: {
    name: "Gigavolt Havoc",
    type: "Electric",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  guardianofalola: {
    name: "Guardian of Alola",
    type: "Fairy",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  hydrovortex: {
    name: "Hydro Vortex",
    type: "Water",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  icehammer: {
    name: "Ice Hammer",
    type: "Ice",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  infernooverdrive: {
    name: "Inferno Overdrive",
    type: "Fire",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  instruct: {
    name: "Instruct",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  letssnuggleforever: {
    name: "Let's Snuggle Forever",
    type: "Fairy",
    basePower: 190,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  lightthatburnsthesky: {
    name: "Light That Burns the Sky",
    type: "Psychic",
    basePower: 200,
    category: "Special",
    flags: {}
  },
  maliciousmoonsault: {
    name: "Malicious Moonsault",
    type: "Dark",
    basePower: 180,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  menacingmoonrazemaelstrom: {
    name: "Menacing Moonraze Maelstrom",
    type: "Ghost",
    basePower: 200,
    category: "Special",
    flags: {}
  },
  mindblown: {
    name: "Mind Blown",
    type: "Fire",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacent",
    mindBlownRecoil: true
  },
  multiattack: {
    name: "Multi-Attack",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  naturesmadness: {
    name: "Nature's Madness",
    type: "Fairy",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  neverendingnightmare: {
    name: "Never-Ending Nightmare",
    type: "Ghost",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  oceanicoperetta: {
    name: "Oceanic Operetta",
    type: "Water",
    basePower: 195,
    category: "Special",
    flags: {}
  },
  psychicterrain: {
    name: "Psychic Terrain",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  pulverizingpancake: {
    name: "Pulverizing Pancake",
    type: "Normal",
    basePower: 210,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  revelationdance: {
    name: "Revelation Dance",
    type: "Normal",
    basePower: 90,
    category: "Special",
    flags: {}
  },
  savagespinout: {
    name: "Savage Spin-Out",
    type: "Bug",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  searingsunrazesmash: {
    name: "Searing Sunraze Smash",
    type: "Steel",
    basePower: 200,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  shadowbone: {
    name: "Shadow Bone",
    type: "Ghost",
    basePower: 85,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  shatteredpsyche: {
    name: "Shattered Psyche",
    type: "Psychic",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  shoreup: {
    name: "Shore Up",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sinisterarrowraid: {
    name: "Sinister Arrow Raid",
    type: "Ghost",
    basePower: 180,
    category: "Physical",
    flags: {}
  },
  solarblade: {
    name: "Solar Blade",
    type: "Grass",
    basePower: 125,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  soulstealing7starstrike: {
    name: "Soul-Stealing 7-Star Strike",
    type: "Ghost",
    basePower: 195,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  splinteredstormshards: {
    name: "Splintered Stormshards",
    type: "Rock",
    basePower: 190,
    category: "Physical",
    flags: {}
  },
  spotlight: {
    name: "Spotlight",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 3
  },
  stokedsparksurfer: {
    name: "Stoked Sparksurfer",
    type: "Electric",
    basePower: 175,
    category: "Special",
    flags: {},
    secondaries: true
  },
  subzeroslammer: {
    name: "Subzero Slammer",
    type: "Ice",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  supersonicskystrike: {
    name: "Supersonic Skystrike",
    type: "Flying",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  tectonicrage: {
    name: "Tectonic Rage",
    type: "Ground",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  throatchop: {
    name: "Throat Chop",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  toxicthread: {
    name: "Toxic Thread",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  twinkletackle: {
    name: "Twinkle Tackle",
    type: "Fairy",
    basePower: 1,
    category: "Physical",
    flags: {}
  },
  accelerock: {
    name: "Accelerock",
    type: "Rock",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1
  },
  anchorshot: {
    name: "Anchor Shot",
    type: "Steel",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  auroraveil: {
    name: "Aurora Veil",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  brutalswing: {
    name: "Brutal Swing",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    target: "allAdjacent"
  },
  burnup: {
    name: "Burn Up",
    type: "Fire",
    basePower: 130,
    category: "Special",
    flags: {}
  },
  clangingscales: {
    name: "Clanging Scales",
    type: "Dragon",
    basePower: 110,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes"
  },
  darkestlariat: {
    name: "Darkest Lariat",
    type: "Dark",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    ignoreDefensive: true
  },
  firelash: {
    name: "Fire Lash",
    type: "Fire",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  firstimpression: {
    name: "First Impression",
    type: "Bug",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 2
  },
  gearup: {
    name: "Gear Up",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  highhorsepower: {
    name: "High Horsepower",
    type: "Ground",
    basePower: 95,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  laserfocus: {
    name: "Laser Focus",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  leafage: {
    name: "Leafage",
    type: "Grass",
    basePower: 40,
    category: "Physical",
    flags: {}
  },
  liquidation: {
    name: "Liquidation",
    type: "Water",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  lunge: {
    name: "Lunge",
    type: "Bug",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  moongeistbeam: {
    name: "Moongeist Beam",
    type: "Ghost",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  photongeyser: {
    name: "Photon Geyser",
    type: "Psychic",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  plasmafists: {
    name: "Plasma Fists",
    type: "Electric",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  pollenpuff: {
    name: "Pollen Puff",
    type: "Bug",
    basePower: 90,
    category: "Special",
    flags: {
      bullet: 1
    }
  },
  powertrip: {
    name: "Power Trip",
    type: "Dark",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  prismaticlaser: {
    name: "Prismatic Laser",
    type: "Psychic",
    basePower: 160,
    category: "Special",
    flags: {}
  },
  psychicfangs: {
    name: "Psychic Fangs",
    type: "Psychic",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    }
  },
  purify: {
    name: "Purify",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  shelltrap: {
    name: "Shell Trap",
    type: "Fire",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  smartstrike: {
    name: "Smart Strike",
    type: "Steel",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  sparklingaria: {
    name: "Sparkling Aria",
    type: "Water",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    target: "allAdjacent"
  },
  spectralthief: {
    name: "Spectral Thief",
    type: "Ghost",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  speedswap: {
    name: "Speed Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  spiritshackle: {
    name: "Spirit Shackle",
    type: "Ghost",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  stompingtantrum: {
    name: "Stomping Tantrum",
    type: "Ground",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  strengthsap: {
    name: "Strength Sap",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  sunsteelstrike: {
    name: "Sunsteel Strike",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  tearfullook: {
    name: "Tearful Look",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  tropkick: {
    name: "Trop Kick",
    type: "Grass",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  zingzap: {
    name: "Zing Zap",
    type: "Electric",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  appleacid: {
    name: "Apple Acid",
    type: "Grass",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  astralbarrage: {
    name: "Astral Barrage",
    type: "Ghost",
    basePower: 120,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  aurawheel: {
    name: "Aura Wheel",
    type: "Electric",
    basePower: 110,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  behemothbash: {
    name: "Behemoth Bash",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  behemothblade: {
    name: "Behemoth Blade",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  bodypress: {
    name: "Body Press",
    type: "Fighting",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  boltbeak: {
    name: "Bolt Beak",
    type: "Electric",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  branchpoke: {
    name: "Branch Poke",
    type: "Grass",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  breakingswipe: {
    name: "Breaking Swipe",
    type: "Dragon",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  burningjealousy: {
    name: "Burning Jealousy",
    type: "Fire",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  clangoroussoul: {
    name: "Clangorous Soul",
    type: "Dragon",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    }
  },
  coaching: {
    name: "Coaching",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  corrosivegas: {
    name: "Corrosive Gas",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacent"
  },
  courtchange: {
    name: "Court Change",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  decorate: {
    name: "Decorate",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  dragondarts: {
    name: "Dragon Darts",
    type: "Dragon",
    basePower: 50,
    category: "Physical",
    flags: {},
    multihit: [1, 2]
  },
  dragonenergy: {
    name: "Dragon Energy",
    type: "Dragon",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes"
  },
  drumbeating: {
    name: "Drum Beating",
    type: "Grass",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  dualwingbeat: {
    name: "Dual Wingbeat",
    type: "Flying",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 2]
  },
  dynamaxcannon: {
    name: "Dynamax Cannon",
    type: "Dragon",
    basePower: 100,
    category: "Special",
    flags: {}
  },
  eeriespell: {
    name: "Eerie Spell",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  eternabeam: {
    name: "Eternabeam",
    type: "Dragon",
    basePower: 160,
    category: "Special",
    flags: {}
  },
  expandingforce: {
    name: "Expanding Force",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  falsesurrender: {
    name: "False Surrender",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  fierywrath: {
    name: "Fiery Wrath",
    type: "Dark",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes"
  },
  fishiousrend: {
    name: "Fishious Rend",
    type: "Water",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    }
  },
  flipturn: {
    name: "Flip Turn",
    type: "Water",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  freezingglare: {
    name: "Freezing Glare",
    type: "Psychic",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  glaciallance: {
    name: "Glacial Lance",
    type: "Ice",
    basePower: 120,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes"
  },
  gmaxbefuddle: {
    name: "G-Max Befuddle",
    type: "Bug",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxcentiferno: {
    name: "G-Max Centiferno",
    type: "Fire",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxcannonade: {
    name: "G-Max Cannonade",
    type: "Water",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxchistrike: {
    name: "G-Max Chi Strike",
    type: "Fighting",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxcuddle: {
    name: "G-Max Cuddle",
    type: "Normal",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxdepletion: {
    name: "G-Max Depletion",
    type: "Dragon",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxdrumsolo: {
    name: "G-Max Drum Solo",
    type: "Grass",
    basePower: 160,
    category: "Physical",
    flags: {}
  },
  gmaxfireball: {
    name: "G-Max Fireball",
    type: "Fire",
    basePower: 160,
    category: "Physical",
    flags: {}
  },
  gmaxfinale: {
    name: "G-Max Finale",
    type: "Fairy",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxfoamburst: {
    name: "G-Max Foam Burst",
    type: "Water",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxgoldrush: {
    name: "G-Max Gold Rush",
    type: "Normal",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxgravitas: {
    name: "G-Max Gravitas",
    type: "Psychic",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxhydrosnipe: {
    name: "G-Max Hydrosnipe",
    type: "Water",
    basePower: 160,
    category: "Physical",
    flags: {}
  },
  gmaxmalodor: {
    name: "G-Max Malodor",
    type: "Poison",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxmeltdown: {
    name: "G-Max Meltdown",
    type: "Steel",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxoneblow: {
    name: "G-Max One Blow",
    type: "Dark",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxrapidflow: {
    name: "G-Max Rapid Flow",
    type: "Water",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxreplenish: {
    name: "G-Max Replenish",
    type: "Normal",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxresonance: {
    name: "G-Max Resonance",
    type: "Ice",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxsandblast: {
    name: "G-Max Sandblast",
    type: "Ground",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxsmite: {
    name: "G-Max Smite",
    type: "Fairy",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxsnooze: {
    name: "G-Max Snooze",
    type: "Dark",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxsteelsurge: {
    name: "G-Max Steelsurge",
    type: "Steel",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxstonesurge: {
    name: "G-Max Stonesurge",
    type: "Water",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxstunshock: {
    name: "G-Max Stun Shock",
    type: "Electric",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxsweetness: {
    name: "G-Max Sweetness",
    type: "Grass",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxtartness: {
    name: "G-Max Tartness",
    type: "Grass",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxterror: {
    name: "G-Max Terror",
    type: "Ghost",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxvinelash: {
    name: "G-Max Vine Lash",
    type: "Grass",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxvolcalith: {
    name: "G-Max Volcalith",
    type: "Rock",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxvoltcrash: {
    name: "G-Max Volt Crash",
    type: "Electric",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxwildfire: {
    name: "G-Max Wildfire",
    type: "Fire",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  gmaxwindrage: {
    name: "G-Max Wind Rage",
    type: "Flying",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  grassyglide: {
    name: "Grassy Glide",
    type: "Grass",
    basePower: 55,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  gravapple: {
    name: "Grav Apple",
    type: "Grass",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  jawlock: {
    name: "Jaw Lock",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    }
  },
  junglehealing: {
    name: "Jungle Healing",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  lashout: {
    name: "Lash Out",
    type: "Dark",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  lifedew: {
    name: "Life Dew",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  magicpowder: {
    name: "Magic Powder",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  maxairstream: {
    name: "Max Airstream",
    type: "Flying",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxdarkness: {
    name: "Max Darkness",
    type: "Dark",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxflare: {
    name: "Max Flare",
    type: "Fire",
    basePower: 100,
    category: "Physical",
    flags: {}
  },
  maxflutterby: {
    name: "Max Flutterby",
    type: "Bug",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxgeyser: {
    name: "Max Geyser",
    type: "Water",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxguard: {
    name: "Max Guard",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  maxhailstorm: {
    name: "Max Hailstorm",
    type: "Ice",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxknuckle: {
    name: "Max Knuckle",
    type: "Fighting",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxlightning: {
    name: "Max Lightning",
    type: "Electric",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxmindstorm: {
    name: "Max Mindstorm",
    type: "Psychic",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxooze: {
    name: "Max Ooze",
    type: "Poison",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxovergrowth: {
    name: "Max Overgrowth",
    type: "Grass",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxphantasm: {
    name: "Max Phantasm",
    type: "Ghost",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxquake: {
    name: "Max Quake",
    type: "Ground",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxrockfall: {
    name: "Max Rockfall",
    type: "Rock",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxstarfall: {
    name: "Max Starfall",
    type: "Fairy",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxsteelspike: {
    name: "Max Steelspike",
    type: "Steel",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxstrike: {
    name: "Max Strike",
    type: "Normal",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  maxwyrmwind: {
    name: "Max Wyrmwind",
    type: "Dragon",
    basePower: 10,
    category: "Physical",
    flags: {}
  },
  meteorassault: {
    name: "Meteor Assault",
    type: "Fighting",
    basePower: 150,
    category: "Physical",
    flags: {}
  },
  meteorbeam: {
    name: "Meteor Beam",
    type: "Rock",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  mistyexplosion: {
    name: "Misty Explosion",
    type: "Fairy",
    basePower: 100,
    category: "Special",
    flags: {},
    target: "allAdjacent"
  },
  noretreat: {
    name: "No Retreat",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  obstruct: {
    name: "Obstruct",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  octolock: {
    name: "Octolock",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  overdrive: {
    name: "Overdrive",
    type: "Electric",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes"
  },
  poltergeist: {
    name: "Poltergeist",
    type: "Ghost",
    basePower: 110,
    category: "Physical",
    flags: {}
  },
  pyroball: {
    name: "Pyro Ball",
    type: "Fire",
    basePower: 120,
    category: "Physical",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  risingvoltage: {
    name: "Rising Voltage",
    type: "Electric",
    basePower: 70,
    category: "Special",
    flags: {}
  },
  scaleshot: {
    name: "Scale Shot",
    type: "Dragon",
    basePower: 25,
    category: "Physical",
    flags: {},
    multihit: [2, 5]
  },
  shellsidearm: {
    name: "Shell Side Arm",
    type: "Poison",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  snaptrap: {
    name: "Snap Trap",
    type: "Grass",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  snipeshot: {
    name: "Snipe Shot",
    type: "Water",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  scorchingsands: {
    name: "Scorching Sands",
    type: "Ground",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true
  },
  skittersmack: {
    name: "Skitter Smack",
    type: "Bug",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  spiritbreak: {
    name: "Spirit Break",
    type: "Fairy",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  steelbeam: {
    name: "Steel Beam",
    type: "Steel",
    basePower: 140,
    category: "Special",
    flags: {},
    mindBlownRecoil: true
  },
  steelroller: {
    name: "Steel Roller",
    type: "Steel",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  strangesteam: {
    name: "Strange Steam",
    type: "Fairy",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true
  },
  surgingstrikes: {
    name: "Surging Strikes",
    type: "Water",
    basePower: 25,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    willCrit: true,
    multihit: [1, 3]
  },
  terrainpulse: {
    name: "Terrain Pulse",
    type: "Normal",
    basePower: 50,
    category: "Special",
    flags: {
      pulse: 1
    }
  },
  tripleaxel: {
    name: "Triple Axel",
    type: "Ice",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 3],
    multiaccuracy: true
  },
  wickedblow: {
    name: "Wicked Blow",
    type: "Dark",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    willCrit: true
  },
  stuffcheeks: {
    name: "Stuff Cheeks",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  tarshot: {
    name: "Tar Shot",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  teatime: {
    name: "Teatime",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  thundercage: {
    name: "Thunder Cage",
    type: "Electric",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  thunderouskick: {
    name: "Thunderous Kick",
    type: "Fighting",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  aquacutter: {
    name: "Aqua Cutter",
    type: "Water",
    basePower: 70,
    category: "Physical",
    flags: {
      slicing: 1
    }
  },
  alluringvoice: {
    name: "Alluring Voice",
    type: "Fairy",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  aquastep: {
    name: "Aqua Step",
    type: "Water",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  armorcannon: {
    name: "Armor Cannon",
    type: "Fire",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  axekick: {
    name: "Axe Kick",
    type: "Fighting",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    hasCrashDamage: true
  },
  barbbarrage: {
    name: "Barb Barrage",
    type: "Poison",
    basePower: 60,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  bitterblade: {
    name: "Bitter Blade",
    type: "Fire",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    drain: [1, 2]
  },
  bittermalice: {
    name: "Bitter Malice",
    type: "Ghost",
    basePower: 75,
    category: "Special",
    flags: {},
    secondaries: true
  },
  blazingtorque: {
    name: "Blazing Torque",
    type: "Fire",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  bleakwindstorm: {
    name: "Bleakwind Storm",
    type: "Flying",
    basePower: 100,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  bloodmoon: {
    name: "Blood Moon",
    type: "Normal",
    basePower: 140,
    category: "Special",
    flags: {}
  },
  burningbulwark: {
    name: "Burning Bulwark",
    type: "Fire",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  ceaselessedge: {
    name: "Ceaseless Edge",
    type: "Dark",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    secondaries: true
  },
  chillingwater: {
    name: "Chilling Water",
    type: "Water",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true
  },
  chillyreception: {
    name: "Chilly Reception",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  chloroblast: {
    name: "Chloroblast",
    type: "Grass",
    basePower: 150,
    category: "Special",
    flags: {},
    mindBlownRecoil: true
  },
  collisioncourse: {
    name: "Collision Course",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  combattorque: {
    name: "Combat Torque",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  comeuppance: {
    name: "Comeuppance",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  doodle: {
    name: "Doodle",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  doubleshock: {
    name: "Double Shock",
    type: "Electric",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  direclaw: {
    name: "Dire Claw",
    type: "Poison",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  dragoncheer: {
    name: "Dragon Cheer",
    type: "Dragon",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  electrodrift: {
    name: "Electro Drift",
    type: "Electric",
    basePower: 100,
    category: "Special",
    flags: {
      contact: 1
    }
  },
  electroshot: {
    name: "Electro Shot",
    type: "Electric",
    basePower: 130,
    category: "Special",
    flags: {}
  },
  esperwing: {
    name: "Esper Wing",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  ficklebeam: {
    name: "Fickle Beam",
    type: "Dragon",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  filletaway: {
    name: "Fillet Away",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  flowertrick: {
    name: "Flower Trick",
    type: "Grass",
    basePower: 70,
    category: "Physical",
    flags: {},
    willCrit: true
  },
  gigatonhammer: {
    name: "Gigaton Hammer",
    type: "Steel",
    basePower: 160,
    category: "Physical",
    flags: {}
  },
  glaiverush: {
    name: "Glaive Rush",
    type: "Dragon",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  hardpress: {
    name: "Hard Press",
    type: "Steel",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  headlongrush: {
    name: "Headlong Rush",
    type: "Ground",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  hydrosteam: {
    name: "Hydro Steam",
    type: "Water",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  hyperdrill: {
    name: "Hyper Drill",
    type: "Normal",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    breaksProtect: true
  },
  icespinner: {
    name: "Ice Spinner",
    type: "Ice",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  infernalparade: {
    name: "Infernal Parade",
    type: "Ghost",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true
  },
  ivycudgel: {
    name: "Ivy Cudgel",
    type: "Grass",
    basePower: 100,
    category: "Physical",
    flags: {}
  },
  jetpunch: {
    name: "Jet Punch",
    type: "Water",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    priority: 1
  },
  kowtowcleave: {
    name: "Kowtow Cleave",
    type: "Dark",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  lastrespects: {
    name: "Last Respects",
    type: "Ghost",
    basePower: 50,
    category: "Physical",
    flags: {}
  },
  luminacrash: {
    name: "Lumina Crash",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true
  },
  lunarblessing: {
    name: "Lunar Blessing",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  magicaltorque: {
    name: "Magical Torque",
    type: "Fairy",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  makeitrain: {
    name: "Make It Rain",
    type: "Steel",
    basePower: 120,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    self: {
      boosts: {
        spa: -2
      }
    }
  },
  malignantchain: {
    name: "Malignant Chain",
    type: "Poison",
    basePower: 100,
    category: "Special",
    flags: {},
    secondaries: true
  },
  matchagotcha: {
    name: "Matcha Gotcha",
    type: "Grass",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    drain: [1, 2]
  },
  mightycleave: {
    name: "Mighty Cleave",
    type: "Rock",
    basePower: 95,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  mortalspin: {
    name: "Mortal Spin",
    type: "Poison",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  mountaingale: {
    name: "Mountain Gale",
    type: "Ice",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  mysticalpower: {
    name: "Mystical Power",
    type: "Psychic",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true
  },
  noxioustorque: {
    name: "Noxious Torque",
    type: "Poison",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  orderup: {
    name: "Order Up",
    type: "Dragon",
    basePower: 80,
    category: "Physical",
    flags: {
      pulse: 1
    }
  },
  populationbomb: {
    name: "Population Bomb",
    type: "Normal",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    multihit: 10,
    multiaccuracy: true
  },
  pounce: {
    name: "Pounce",
    type: "Bug",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  powershift: {
    name: "Power Shift",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  psychicnoise: {
    name: "Psychic Noise",
    type: "Psychic",
    basePower: 75,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  psyblade: {
    name: "Psyblade",
    type: "Psychic",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    }
  },
  psyshieldbash: {
    name: "Psyshield Bash",
    type: "Psychic",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  ragefist: {
    name: "Rage Fist",
    type: "Ghost",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    }
  },
  ragingbull: {
    name: "Raging Bull",
    type: "Normal",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  ragingfury: {
    name: "Raging Fury",
    type: "Fire",
    basePower: 120,
    category: "Physical",
    flags: {}
  },
  revivalblessing: {
    name: "Revival Blessing",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  ruination: {
    name: "Ruination",
    type: "Dark",
    basePower: 0,
    category: "Special",
    flags: {}
  },
  saltcure: {
    name: "Salt Cure",
    type: "Rock",
    basePower: 40,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  sandsearstorm: {
    name: "Sandsear Storm",
    type: "Ground",
    basePower: 100,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  shedtail: {
    name: "Shed Tail",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  shelter: {
    name: "Shelter",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  silktrap: {
    name: "Silk Trap",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4
  },
  snowscape: {
    name: "Snowscape",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  spicyextract: {
    name: "Spicy Extract",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  spinout: {
    name: "Spin Out",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  springtidestorm: {
    name: "Springtide Storm",
    type: "Fairy",
    basePower: 100,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  stoneaxe: {
    name: "Stone Axe",
    type: "Rock",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    secondaries: true
  },
  supercellslam: {
    name: "Supercell Slam",
    type: "Electric",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    hasCrashDamage: true
  },
  syrupbomb: {
    name: "Syrup Bomb",
    type: "Grass",
    basePower: 60,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true
  },
  tachyoncutter: {
    name: "Tachyon Cutter",
    type: "Steel",
    basePower: 50,
    category: "Special",
    flags: {
      slicing: 1
    },
    multihit: [1, 2]
  },
  takeheart: {
    name: "Take Heart",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  temperflare: {
    name: "Temper Flare",
    type: "Fire",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    }
  },
  terablast: {
    name: "Tera Blast",
    type: "Normal",
    basePower: 80,
    category: "Special",
    flags: {}
  },
  terastarstorm: {
    name: "Tera Starstorm",
    type: "Normal",
    basePower: 120,
    category: "Special",
    flags: {}
  },
  thunderclap: {
    name: "Thunderclap",
    type: "Electric",
    basePower: 70,
    category: "Special",
    flags: {},
    priority: 1
  },
  tidyup: {
    name: "Tidy Up",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  torchsong: {
    name: "Torch Song",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true
  },
  trailblaze: {
    name: "Trailblaze",
    type: "Grass",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true
  },
  triplearrows: {
    name: "Triple Arrows",
    type: "Fighting",
    basePower: 90,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  tripledive: {
    name: "Triple Dive",
    type: "Water",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 3]
  },
  twinbeam: {
    name: "Twin Beam",
    type: "Psychic",
    basePower: 40,
    category: "Special",
    flags: {},
    multihit: [1, 2]
  },
  upperhand: {
    name: "Upper Hand",
    type: "Fighting",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    priority: 3
  },
  victorydance: {
    name: "Victory Dance",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {}
  },
  wavecrash: {
    name: "Wave Crash",
    type: "Water",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [33, 100]
  },
  wickedtorque: {
    name: "Wicked Torque",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true
  },
  wildboltstorm: {
    name: "Wildbolt Storm",
    type: "Electric",
    basePower: 100,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    target: "allAdjacentFoes"
  },
  nihillight: {
    name: "Nihil Light",
    type: "Dragon",
    basePower: 100,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    ignoreDefensive: true
  }
}
