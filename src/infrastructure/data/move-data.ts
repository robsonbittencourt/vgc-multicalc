import { MoveData } from "@data/types"
import { toID } from "@data/id"

export type MoveName = (typeof MOVES)[keyof typeof MOVES]["name"]

export function getMoveData(name: string): MoveData | undefined {
  return (MOVES as Record<string, MoveData>)[toID(name)]
}

export const MOVES = {
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
    drain: [1, 2],
    accuracy: 100,
    pp: 20,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
  },
  acid: {
    name: "Acid",
    type: "Poison",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "10% chance to lower the foe(s) Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    }
  },
  amnesia: {
    name: "Amnesia",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Sp. Def by 2.",
    secondary: null,
    target: "self"
  },
  aurorabeam: {
    name: "Aurora Beam",
    type: "Ice",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to lower the target's Attack by 1.",
    secondary: {
      chance: 10,
      boosts: {
        atk: -1
      }
    },
    target: "normal"
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
    },
    accuracy: 85,
    pp: 20,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 70,
    pp: 8,
    description: "10% chance to freeze foe(s). Can't miss in Snow.",
    secondary: {
      chance: 10,
      status: "frz"
    }
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
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to lower the target's Speed by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Changes user's type to match its first move.",
    secondary: null,
    target: "self"
  },
  counter: {
    name: "Counter",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "If hit by physical attack, returns double damage.",
    secondary: null,
    target: "scripted"
  },
  crabhammer: {
    name: "Crabhammer",
    type: "Water",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 95,
    pp: 12,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  defensecurl: {
    name: "Defense Curl",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Defense by 1.",
    secondary: null,
    target: "self"
  },
  dig: {
    name: "Dig",
    type: "Ground",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Digs underground turn 1, strikes turn 2.",
    secondary: null,
    target: "normal"
  },
  disable: {
    name: "Disable",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "For 4 turns, disables the target's last move used.",
    secondary: null,
    target: "normal"
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
    recoil: [33, 100],
    accuracy: 100,
    pp: 15,
    description: "Has 33% recoil.",
    secondary: null,
    target: "normal"
  },
  doublekick: {
    name: "Double Kick",
    type: "Fighting",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: 2,
    accuracy: 100,
    pp: 20,
    description: "Hits 2 times in one turn.",
    secondary: null,
    target: "normal"
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
    drain: [1, 2],
    accuracy: 100,
    pp: 15,
    description: "User gains 1/2 HP inflicted. Sleeping target only.",
    secondary: null,
    target: "normal"
  },
  earthquake: {
    name: "Earthquake",
    type: "Ground",
    basePower: 100,
    category: "Physical",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 12,
    description: "Hits adjacent Pokemon. Double damage on Dig.",
    secondary: null
  },
  explosion: {
    name: "Explosion",
    type: "Normal",
    basePower: 250,
    category: "Physical",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 8,
    description: "Hits adjacent Pokemon. The user faints.",
    secondary: null
  },
  fireblast: {
    name: "Fire Blast",
    type: "Fire",
    basePower: 110,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 85,
    pp: 8,
    description: "10% chance to burn the target.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  firespin: {
    name: "Fire Spin",
    type: "Fire",
    basePower: 35,
    category: "Special",
    flags: {},
    accuracy: 85,
    pp: 15,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  fissure: {
    name: "Fissure",
    type: "Ground",
    basePower: 0,
    category: "Physical",
    flags: {},
    accuracy: 30,
    pp: 8,
    description: "OHKOs the target. Fails if user is a lower level.",
    secondary: null,
    target: "normal"
  },
  fly: {
    name: "Fly",
    type: "Flying",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 95,
    pp: 15,
    description: "Flies up on first turn, then strikes the next turn.",
    secondary: null,
    target: "any"
  },
  focusenergy: {
    name: "Focus Energy",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's critical hit ratio by 2.",
    secondary: null,
    target: "self"
  },
  furyattack: {
    name: "Fury Attack",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5],
    accuracy: 85,
    pp: 20,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
  },
  furyswipes: {
    name: "Fury Swipes",
    type: "Normal",
    basePower: 18,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5],
    accuracy: 80,
    pp: 15,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
  },
  glare: {
    name: "Glare",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Paralyzes the target.",
    secondary: null,
    target: "normal"
  },
  growth: {
    name: "Growth",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises user's Attack and Sp. Atk by 1; 2 in Sun.",
    secondary: null,
    target: "self"
  },
  guillotine: {
    name: "Guillotine",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 30,
    pp: 8,
    description: "OHKOs the target. Fails if user is a lower level.",
    secondary: null,
    target: "normal"
  },
  gust: {
    name: "Gust",
    type: "Flying",
    basePower: 40,
    category: "Special",
    flags: {
      wind: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Power doubles during Bounce, Fly, and Sky Drop.",
    secondary: null,
    target: "any"
  },
  haze: {
    name: "Haze",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Eliminates all stat changes.",
    secondary: null,
    target: "all"
  },
  highjumpkick: {
    name: "High Jump Kick",
    type: "Fighting",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    },
    hasCrashDamage: true,
    accuracy: 90,
    pp: 12,
    description: "User is hurt by 50% of its max HP if it misses.",
    secondary: null,
    target: "normal"
  },
  horndrill: {
    name: "Horn Drill",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 30,
    pp: 8,
    description: "OHKOs the target. Fails if user is a lower level.",
    secondary: null,
    target: "normal"
  },
  hyperbeam: {
    name: "Hyper Beam",
    type: "Normal",
    basePower: 150,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 90,
    pp: 12,
    description: "1/8 of target's HP is restored to user every turn.",
    secondary: null,
    target: "normal"
  },
  lightscreen: {
    name: "Light Screen",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "For 5 turns, special damage to allies is halved.",
    secondary: null,
    target: "allySide"
  },
  metronome: {
    name: "Metronome",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Picks a random move.",
    secondary: null,
    target: "self"
  },
  mimic: {
    name: "Mimic",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "The last move the target used replaces this one.",
    secondary: null,
    target: "normal"
  },
  minimize: {
    name: "Minimize",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises the user's evasiveness by 2.",
    secondary: null,
    target: "self"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "For 5 turns, protects user's party from stat drops.",
    secondary: null,
    target: "allySide"
  },
  nightshade: {
    name: "Night Shade",
    type: "Ghost",
    basePower: 0,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Does damage equal to the user's level.",
    secondary: null,
    target: "normal"
  },
  petaldance: {
    name: "Petal Dance",
    type: "Grass",
    basePower: 120,
    category: "Special",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Lasts 2-3 turns. Confuses the user afterwards.",
    secondary: null,
    target: "randomNormal"
  },
  pinmissile: {
    name: "Pin Missile",
    type: "Bug",
    basePower: 25,
    category: "Physical",
    flags: {},
    multihit: [2, 5],
    accuracy: 95,
    pp: 20,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
  },
  poisonsting: {
    name: "Poison Sting",
    type: "Poison",
    basePower: 15,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to poison the target.",
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal"
  },
  psychic: {
    name: "Psychic",
    type: "Psychic",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 20,
    description: "High critical hit ratio. Hits adjacent foes.",
    secondary: null
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
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by 50% of its max HP.",
    secondary: null,
    target: "self"
  },
  reflect: {
    name: "Reflect",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "For 5 turns, physical damage to allies is halved.",
    secondary: null,
    target: "allySide"
  },
  rest: {
    name: "Rest",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "User sleeps 2 turns and restores HP and status.",
    secondary: null,
    target: "self"
  },
  roar: {
    name: "Roar",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: true,
    pp: 20,
    description: "Forces the target to switch to a random ally.",
    secondary: null,
    target: "normal"
  },
  rockslide: {
    name: "Rock Slide",
    type: "Rock",
    basePower: 75,
    category: "Physical",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 90,
    pp: 12,
    description: "30% chance to make the foe(s) flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    }
  },
  rockthrow: {
    name: "Rock Throw",
    type: "Rock",
    basePower: 50,
    category: "Physical",
    flags: {},
    accuracy: 90,
    pp: 15,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  sandattack: {
    name: "Sand Attack",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Lowers the target's accuracy by 1.",
    secondary: null,
    target: "normal"
  },
  seismictoss: {
    name: "Seismic Toss",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Does damage equal to the user's level.",
    secondary: null,
    target: "normal"
  },
  selfdestruct: {
    name: "Self-Destruct",
    type: "Normal",
    basePower: 200,
    category: "Physical",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 8,
    description: "Hits adjacent Pokemon. The user faints.",
    secondary: null
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
    },
    accuracy: 100,
    pp: 20,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  sludge: {
    name: "Sludge",
    type: "Poison",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to poison the target.",
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal"
  },
  softboiled: {
    name: "Soft-Boiled",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by 50% of its max HP.",
    secondary: null,
    target: "self"
  },
  solarbeam: {
    name: "Solar Beam",
    type: "Grass",
    basePower: 120,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Charges turn 1. Hits turn 2. No charge in sunlight.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  struggle: {
    name: "Struggle",
    type: "Normal",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    struggleRecoil: true,
    accuracy: true,
    pp: 1,
    description: "User loses 1/4 of its max HP.",
    secondary: null,
    target: "randomNormal"
  },
  stunspore: {
    name: "Stun Spore",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 75,
    pp: 20,
    description: "Paralyzes the target.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User takes 1/4 its max HP to put in a substitute.",
    secondary: null,
    target: "self"
  },
  superfang: {
    name: "Super Fang",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 12,
    description: "Does damage equal to 1/2 target's current HP.",
    secondary: null,
    target: "normal"
  },
  swift: {
    name: "Swift",
    type: "Normal",
    basePower: 60,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: true,
    pp: 20,
    description: "This move does not check accuracy. Hits foes.",
    secondary: null
  },
  takedown: {
    name: "Take Down",
    type: "Normal",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 4],
    accuracy: 85,
    pp: 20,
    description: "Has 1/4 recoil.",
    secondary: null,
    target: "normal"
  },
  thrash: {
    name: "Thrash",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Lasts 2-3 turns. Confuses the user afterwards.",
    secondary: null,
    target: "randomNormal"
  },
  thunder: {
    name: "Thunder",
    type: "Electric",
    basePower: 110,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 70,
    pp: 12,
    description: "30% chance to paralyze. Can't miss in rain.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  thunderwave: {
    name: "Thunder Wave",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 90,
    pp: 20,
    description: "Paralyzes the target.",
    secondary: null,
    target: "normal"
  },
  transform: {
    name: "Transform",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Copies target's stats, moves, types, and Ability.",
    secondary: null,
    target: "normal"
  },
  triattack: {
    name: "Tri Attack",
    type: "Normal",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "20% chance to paralyze or burn or freeze target.",
    secondary: {
      chance: 20
    },
    target: "normal"
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
    },
    accuracy: true,
    pp: 20,
    description: "Forces the target to switch to a random ally.",
    secondary: null,
    target: "normal"
  },
  wingattack: {
    name: "Wing Attack",
    type: "Flying",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "any"
  },
  wrap: {
    name: "Wrap",
    type: "Normal",
    basePower: 15,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 20,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  growl: {
    name: "Growl",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "Lowers the foe(s) Attack by 1.",
    secondary: null
  },
  leer: {
    name: "Leer",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "Lowers the foe(s) Defense by 1.",
    secondary: null
  },
  lowkick: {
    name: "Low Kick",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "More power the heavier the target.",
    secondary: null,
    target: "normal"
  },
  poisongas: {
    name: "Poison Gas",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 90,
    pp: 20,
    description: "Poisons the foe(s).",
    secondary: null
  },
  poisonpowder: {
    name: "Poison Powder",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 75,
    pp: 20,
    description: "Poisons the target.",
    secondary: null,
    target: "normal"
  },
  skyattack: {
    name: "Sky Attack",
    type: "Flying",
    basePower: 140,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 90,
    pp: 8,
    description: "Charges, then hits turn 2. 30% flinch. High crit.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "any"
  },
  stringshot: {
    name: "String Shot",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 20,
    description: "Lowers the foe(s) Speed by 2.",
    secondary: null
  },
  surf: {
    name: "Surf",
    type: "Water",
    basePower: 90,
    category: "Special",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 15,
    description: "Hits adjacent Pokemon. Double damage on Dive.",
    secondary: null
  },
  tailwhip: {
    name: "Tail Whip",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "Lowers the foe(s) Defense by 1.",
    secondary: null
  },
  toxic: {
    name: "Toxic",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 90,
    pp: 12,
    description: "Badly poisons the target. Poison types can't miss.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 60,
    pp: 20,
    description: "Causes the target to fall asleep.",
    secondary: null,
    target: "normal"
  },
  leechlife: {
    name: "Leech Life",
    type: "Bug",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    drain: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
  },
  megadrain: {
    name: "Mega Drain",
    type: "Grass",
    basePower: 40,
    category: "Special",
    flags: {},
    drain: [1, 2],
    accuracy: 100,
    pp: 15,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
  },
  vinewhip: {
    name: "Vine Whip",
    type: "Grass",
    basePower: 45,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  waterfall: {
    name: "Waterfall",
    type: "Water",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "20% chance to make the target flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  tackle: {
    name: "Tackle",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  acidarmor: {
    name: "Acid Armor",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Defense by 2.",
    secondary: null,
    target: "self"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "30% chance to paralyze the target.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  flamethrower: {
    name: "Flamethrower",
    type: "Fire",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "10% chance to burn the target.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  hydropump: {
    name: "Hydro Pump",
    type: "Water",
    basePower: 110,
    category: "Special",
    flags: {},
    accuracy: 80,
    pp: 8,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  icebeam: {
    name: "Ice Beam",
    type: "Ice",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to freeze the target.",
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal"
  },
  lick: {
    name: "Lick",
    type: "Ghost",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to paralyze the target.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  screech: {
    name: "Screech",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: 85,
    pp: 20,
    description: "Lowers the target's Defense by 2.",
    secondary: null,
    target: "normal"
  },
  sing: {
    name: "Sing",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: 55,
    pp: 15,
    description: "Causes the target to fall asleep.",
    secondary: null,
    target: "normal"
  },
  sleeppowder: {
    name: "Sleep Powder",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 75,
    pp: 15,
    description: "Causes the target to fall asleep.",
    secondary: null,
    target: "normal"
  },
  smog: {
    name: "Smog",
    type: "Poison",
    basePower: 30,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 70,
    pp: 20,
    description: "40% chance to poison the target.",
    secondary: {
      chance: 40,
      status: "psn"
    },
    target: "normal"
  },
  spore: {
    name: "Spore",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Causes the target to fall asleep.",
    secondary: null,
    target: "normal"
  },
  supersonic: {
    name: "Supersonic",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: 55,
    pp: 20,
    description: "Causes the target to become confused.",
    secondary: null,
    target: "normal"
  },
  swordsdance: {
    name: "Swords Dance",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Attack by 2.",
    secondary: null,
    target: "self"
  },
  thunderbolt: {
    name: "Thunderbolt",
    type: "Electric",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "10% chance to paralyze the target.",
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "User switches out.",
    secondary: null,
    target: "self"
  },
  agility: {
    name: "Agility",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Speed by 2.",
    secondary: null,
    target: "self"
  },
  confuseray: {
    name: "Confuse Ray",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Confuses the target.",
    secondary: null,
    target: "normal"
  },
  confusion: {
    name: "Confusion",
    type: "Psychic",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to confuse the target.",
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal"
  },
  cut: {
    name: "Cut",
    type: "Normal",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 95,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  doubleteam: {
    name: "Double Team",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Raises the user's evasiveness by 1.",
    secondary: null,
    target: "self"
  },
  drillpeck: {
    name: "Drill Peck",
    type: "Flying",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "any"
  },
  ember: {
    name: "Ember",
    type: "Fire",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to burn the target.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "10% chance to burn the target.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  harden: {
    name: "Harden",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Defense by 1.",
    secondary: null,
    target: "self"
  },
  headbutt: {
    name: "Headbutt",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  hornattack: {
    name: "Horn Attack",
    type: "Normal",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "10% chance to freeze the target.",
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal"
  },
  megakick: {
    name: "Mega Kick",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 75,
    pp: 8,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  megapunch: {
    name: "Mega Punch",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    accuracy: 85,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Scatters coins.",
    secondary: null,
    target: "normal"
  },
  peck: {
    name: "Peck",
    type: "Flying",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "any"
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
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  psybeam: {
    name: "Psybeam",
    type: "Psychic",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to confuse the target.",
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal"
  },
  quickattack: {
    name: "Quick Attack",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  scratch: {
    name: "Scratch",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 75,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  smokescreen: {
    name: "Smokescreen",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's accuracy by 1.",
    secondary: null,
    target: "normal"
  },
  splash: {
    name: "Splash",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "No competitive use.",
    secondary: null,
    target: "self"
  },
  strength: {
    name: "Strength",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "10% chance to paralyze the target.",
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal"
  },
  thundershock: {
    name: "Thunder Shock",
    type: "Electric",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to paralyze the target.",
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal"
  },
  visegrip: {
    name: "Vise Grip",
    type: "Normal",
    basePower: 55,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  watergun: {
    name: "Water Gun",
    type: "Water",
    basePower: 40,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  withdraw: {
    name: "Withdraw",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Defense by 1.",
    secondary: null,
    target: "self"
  },
  aeroblast: {
    name: "Aeroblast",
    type: "Flying",
    basePower: 100,
    category: "Special",
    flags: {
      wind: 1
    },
    accuracy: 95,
    pp: 8,
    description: "High critical hit ratio.",
    secondary: null,
    target: "any"
  },
  attract: {
    name: "Attract",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "A target of the opposite gender gets infatuated.",
    secondary: null,
    target: "normal"
  },
  beatup: {
    name: "Beat Up",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "All healthy allies aid in damaging the target.",
    secondary: null,
    target: "normal"
  },
  bellydrum: {
    name: "Belly Drum",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User loses 50% max HP. Maximizes Attack.",
    secondary: null,
    target: "self"
  },
  conversion2: {
    name: "Conversion 2",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Changes user's type to resist target's last move.",
    secondary: null,
    target: "normal"
  },
  crosschop: {
    name: "Cross Chop",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 80,
    pp: 8,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  curse: {
    name: "Curse",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Curses if Ghost, else -1 Spe, +1 Atk, +1 Def.",
    secondary: null,
    target: "normal"
  },
  destinybond: {
    name: "Destiny Bond",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "If an opponent knocks out the user, it also faints.",
    secondary: null,
    target: "self"
  },
  detect: {
    name: "Detect",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4,
    accuracy: true,
    pp: 8,
    description: "Prevents moves from affecting the user this turn.",
    secondary: null,
    target: "self"
  },
  encore: {
    name: "Encore",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Target repeats its last move for its next 3 turns.",
    secondary: null,
    target: "normal"
  },
  endure: {
    name: "Endure",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4,
    accuracy: true,
    pp: 12,
    description: "User survives attacks this turn with at least 1 HP.",
    secondary: null,
    target: "self"
  },
  flail: {
    name: "Flail",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "More power the less HP the user has left.",
    secondary: null,
    target: "normal"
  },
  futuresight: {
    name: "Future Sight",
    type: "Psychic",
    basePower: 120,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Hits two turns after being used.",
    secondary: null,
    target: "normal"
  },
  healbell: {
    name: "Heal Bell",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: true,
    pp: 8,
    description: "Cures the user's party of all status conditions.",
    secondary: null,
    target: "allyTeam"
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
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 15,
    description: "100% chance to lower the foe(s) Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    }
  },
  lockon: {
    name: "Lock-On",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "User's next move will not miss the target.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "If hit by special attack, returns double damage.",
    secondary: null,
    target: "scripted"
  },
  moonlight: {
    name: "Moonlight",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by a weather-dependent amount.",
    secondary: null,
    target: "self"
  },
  morningsun: {
    name: "Morning Sun",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by a weather-dependent amount.",
    secondary: null,
    target: "self"
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
    },
    accuracy: 100,
    pp: 12,
    description: "Lasts 2-3 turns. Confuses the user afterwards.",
    secondary: null,
    target: "randomNormal"
  },
  powdersnow: {
    name: "Powder Snow",
    type: "Ice",
    basePower: 40,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "10% chance to freeze the foe(s).",
    secondary: {
      chance: 10,
      status: "frz"
    }
  },
  present: {
    name: "Present",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {},
    accuracy: 90,
    pp: 15,
    description: "40, 80, 120 power, or heals target 1/4 max HP.",
    secondary: null,
    target: "normal"
  },
  protect: {
    name: "Protect",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4,
    accuracy: true,
    pp: 8,
    description: "Prevents moves from affecting the user this turn.",
    secondary: null,
    target: "self"
  },
  psychup: {
    name: "Psych Up",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Copies the target's current stat stages.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 8,
    description: "For 5 turns, heavy rain powers Water moves.",
    secondary: null,
    target: "all"
  },
  reversal: {
    name: "Reversal",
    type: "Fighting",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "More power the less HP the user has left.",
    secondary: null,
    target: "normal"
  },
  safeguard: {
    name: "Safeguard",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "For 5 turns, protects user's party from status.",
    secondary: null,
    target: "allySide"
  },
  sandstorm: {
    name: "Sandstorm",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {
      wind: 1
    },
    accuracy: true,
    pp: 12,
    description: "For 5 turns, a sandstorm rages. Rock: 1.5x SpD.",
    secondary: null,
    target: "all"
  },
  sketch: {
    name: "Sketch",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 1,
    description: "Permanently copies the last move target used.",
    secondary: null,
    target: "normal"
  },
  sleeptalk: {
    name: "Sleep Talk",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User must be asleep. Uses another known move.",
    secondary: null,
    target: "self"
  },
  spikes: {
    name: "Spikes",
    type: "Ground",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Hurts grounded foes on switch-in. Max 3 layers.",
    secondary: null,
    target: "foeSide"
  },
  spite: {
    name: "Spite",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Lowers the PP of the target's last move by 4.",
    secondary: null,
    target: "normal"
  },
  sunnyday: {
    name: "Sunny Day",
    type: "Fire",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "For 5 turns, intense sunlight powers Fire moves.",
    secondary: null,
    target: "all"
  },
  swagger: {
    name: "Swagger",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 85,
    pp: 15,
    description: "Raises the target's Attack by 2 and confuses it.",
    secondary: null,
    target: "normal"
  },
  sweetscent: {
    name: "Sweet Scent",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "Lowers the foe(s) evasiveness by 2.",
    secondary: null
  },
  synthesis: {
    name: "Synthesis",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by a weather-dependent amount.",
    secondary: null,
    target: "self"
  },
  thief: {
    name: "Thief",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "If the user has no item, it steals the target's.",
    secondary: null,
    target: "normal"
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
    multiaccuracy: true,
    accuracy: 90,
    pp: 12,
    description: "Hits 3 times. Each hit can miss, but power rises.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "20% chance to make the foe(s) flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    }
  },
  ancientpower: {
    name: "Ancient Power",
    type: "Rock",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 8,
    description: "10% chance to raise all stats by 1 (not acc/eva).",
    secondary: {
      chance: 10,
      boosts: {
        atk: 1,
        def: 1,
        spa: 1,
        spd: 1,
        spe: 1
      }
    },
    target: "normal"
  },
  bonerush: {
    name: "Bone Rush",
    type: "Ground",
    basePower: 30,
    category: "Physical",
    flags: {},
    multihit: [2, 5],
    accuracy: 90,
    pp: 12,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "20% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal"
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
    drain: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Prevents the target from switching out.",
    secondary: null,
    target: "normal"
  },
  rapidspin: {
    name: "Rapid Spin",
    type: "Normal",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "Free user from hazards/bind/Leech Seed; +1 Spe.",
    secondary: {
      chance: 100
    },
    target: "normal"
  },
  rocksmash: {
    name: "Rock Smash",
    type: "Fighting",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "50% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal"
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
    flags: {},
    accuracy: 85,
    pp: 15,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  zapcannon: {
    name: "Zap Cannon",
    type: "Electric",
    basePower: 120,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 50,
    pp: 8,
    description: "100% chance to paralyze the target.",
    secondary: {
      chance: 100,
      status: "par"
    },
    target: "normal"
  },
  cottonspore: {
    name: "Cotton Spore",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Speed by 2.",
    secondary: null
  },
  extremespeed: {
    name: "Extreme Speed",
    type: "Normal",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 2,
    accuracy: 100,
    pp: 8,
    description: "Nearly always goes first.",
    secondary: null,
    target: "normal"
  },
  furycutter: {
    name: "Fury Cutter",
    type: "Bug",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 95,
    pp: 20,
    description: "Power doubles with each hit, up to 160.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by 50% of its max HP.",
    secondary: null,
    target: "self"
  },
  scaryface: {
    name: "Scary Face",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Lowers the target's Speed by 2.",
    secondary: null,
    target: "normal"
  },
  charm: {
    name: "Charm",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Attack by 2.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: true,
    pp: 8,
    description: "All active Pokemon will faint in 3 turns.",
    secondary: null,
    target: "all"
  },
  snore: {
    name: "Snore",
    type: "Normal",
    basePower: 50,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "User must be asleep. 30% chance to flinch target.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  sweetkiss: {
    name: "Sweet Kiss",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 75,
    pp: 12,
    description: "Causes the target to become confused.",
    secondary: null,
    target: "normal"
  },
  rollout: {
    name: "Rollout",
    type: "Rock",
    basePower: 30,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 20,
    description: "Power doubles with each hit. Repeats for 5 turns.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 95,
    pp: 8,
    description: "50% chance to burn the target. Thaws user.",
    secondary: {
      chance: 50,
      status: "brn"
    },
    target: "normal"
  },
  batonpass: {
    name: "Baton Pass",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "User switches, passing stat changes and more.",
    secondary: null,
    target: "self"
  },
  dragonbreath: {
    name: "Dragon Breath",
    type: "Dragon",
    basePower: 60,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to paralyze the target.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
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
    secondaries: true,
    accuracy: 50,
    pp: 8,
    description: "100% chance to confuse the target.",
    secondary: {
      chance: 100,
      volatileStatus: "confusion"
    },
    target: "normal"
  },
  falseswipe: {
    name: "False Swipe",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Always leaves the target with at least 1 HP.",
    secondary: null,
    target: "normal"
  },
  flamewheel: {
    name: "Flame Wheel",
    type: "Fire",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to burn the target. Thaws user.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  irontail: {
    name: "Iron Tail",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 75,
    pp: 15,
    description: "30% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 30,
      boosts: {
        def: -1
      }
    },
    target: "normal"
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
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  megahorn: {
    name: "Megahorn",
    type: "Bug",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 85,
    pp: 12,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  metalclaw: {
    name: "Metal Claw",
    type: "Steel",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 95,
    pp: 20,
    description: "10% chance to raise the user's Attack by 1.",
    secondary: {
      chance: 10,
      boosts: {
        atk: 1
      }
    },
    target: "normal"
  },
  mudslap: {
    name: "Mud-Slap",
    type: "Ground",
    basePower: 20,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's accuracy by 1.",
    secondary: {
      chance: 100,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Shares HP of user and target equally.",
    secondary: null,
    target: "normal"
  },
  shadowball: {
    name: "Shadow Ball",
    type: "Ghost",
    basePower: 80,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "20% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 20,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  sludgebomb: {
    name: "Sludge Bomb",
    type: "Poison",
    basePower: 90,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "30% chance to poison the target.",
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal"
  },
  spark: {
    name: "Spark",
    type: "Electric",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to paralyze the target.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  steelwing: {
    name: "Steel Wing",
    type: "Steel",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 20,
    description: "10% chance to raise the user's Defense by 1.",
    secondary: {
      chance: 10,
      boosts: {
        def: 1
      }
    },
    target: "normal"
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
    multihit: [2, 5],
    accuracy: 100,
    pp: 20,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  block: {
    name: "Block",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Prevents the target from switching out.",
    secondary: null,
    target: "normal"
  },
  bounce: {
    name: "Bounce",
    type: "Flying",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 85,
    pp: 8,
    description: "Bounces turn 1. Hits turn 2. 30% paralyze.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "any"
  },
  bulletseed: {
    name: "Bullet Seed",
    type: "Grass",
    basePower: 25,
    category: "Physical",
    flags: {
      bullet: 1
    },
    multihit: [2, 5],
    accuracy: 100,
    pp: 20,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "+1 SpD, user's next Electric move 2x power.",
    secondary: null,
    target: "self"
  },
  covet: {
    name: "Covet",
    type: "Normal",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "If the user has no item, it steals the target's.",
    secondary: null,
    target: "normal"
  },
  dive: {
    name: "Dive",
    type: "Water",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Dives underwater turn 1, strikes turn 2.",
    secondary: null,
    target: "normal"
  },
  doomdesire: {
    name: "Doom Desire",
    type: "Steel",
    basePower: 140,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Hits two turns after being used.",
    secondary: null,
    target: "normal"
  },
  extrasensory: {
    name: "Extrasensory",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to make the target flinch.",
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "normal"
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
    priority: 3,
    accuracy: 100,
    pp: 12,
    description: "Hits first. First turn out only. 100% flinch chance.",
    secondary: {
      chance: 100,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  followme: {
    name: "Follow Me",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 2,
    accuracy: true,
    pp: 20,
    description: "The foes' moves target the user on the turn used.",
    secondary: null,
    target: "self"
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
    multihit: [2, 5],
    accuracy: 100,
    pp: 20,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
  },
  ingrain: {
    name: "Ingrain",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Traps/grounds user; heals 1/16 max HP per turn.",
    secondary: null,
    target: "self"
  },
  knockoff: {
    name: "Knock Off",
    type: "Dark",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "1.5x damage if foe holds an item. Removes item.",
    secondary: null,
    target: "normal"
  },
  leafblade: {
    name: "Leaf Blade",
    type: "Grass",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 100,
    pp: 15,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Lowers target's Attack, Sp. Atk by 2. User faints.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 90,
    pp: 8,
    description: "Lowers the user's Sp. Atk by 2.",
    secondary: null,
    target: "normal"
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
    multihit: [2, 5],
    accuracy: 90,
    pp: 12,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
  },
  roleplay: {
    name: "Role Play",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User replaces its Ability with the target's.",
    secondary: null,
    target: "normal"
  },
  sandtomb: {
    name: "Sand Tomb",
    type: "Ground",
    basePower: 35,
    category: "Physical",
    flags: {},
    accuracy: 85,
    pp: 15,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  skillswap: {
    name: "Skill Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "The user and the target trade Abilities.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "More power with more uses of Stockpile.",
    secondary: null,
    target: "normal"
  },
  stockpile: {
    name: "Stockpile",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises user's Defense, Sp. Def by 1. Max 3 uses.",
    secondary: null,
    target: "self"
  },
  swallow: {
    name: "Swallow",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Heals the user based on uses of Stockpile.",
    secondary: null,
    target: "self"
  },
  taunt: {
    name: "Taunt",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Target can't use status moves its next 3 turns.",
    secondary: null,
    target: "normal"
  },
  teeterdance: {
    name: "Teeter Dance",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 20,
    description: "Confuses adjacent Pokemon.",
    secondary: null
  },
  tickle: {
    name: "Tickle",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Attack and Defense by 1.",
    secondary: null,
    target: "normal"
  },
  trick: {
    name: "Trick",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "User switches its held item with the target's.",
    secondary: null,
    target: "normal"
  },
  uproar: {
    name: "Uproar",
    type: "Normal",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Lasts 3 turns. Active Pokemon cannot fall asleep.",
    secondary: null,
    target: "randomNormal"
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
    recoil: [33, 100],
    accuracy: 100,
    pp: 15,
    description: "Has 33% recoil. 10% chance to paralyze target.",
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal"
  },
  weatherball: {
    name: "Weather Ball",
    type: "Normal",
    basePower: 50,
    category: "Special",
    flags: {
      bullet: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Power doubles and type varies in each weather.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 100,
    pp: 15,
    description: "Destroys screens, unless the target is immune.",
    secondary: null,
    target: "normal"
  },
  endeavor: {
    name: "Endeavor",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Lowers the target's HP to the user's HP.",
    secondary: null,
    target: "normal"
  },
  focuspunch: {
    name: "Focus Punch",
    type: "Fighting",
    basePower: 150,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Fails if the user takes damage before it hits.",
    secondary: null,
    target: "normal"
  },
  imprison: {
    name: "Imprison",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "No foe can use any move known by the user.",
    secondary: null,
    target: "self"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Restores the item the user last used.",
    secondary: null,
    target: "self"
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
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals the user by 50% of its max HP.",
    secondary: null,
    target: "self"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Sp. Atk by 3.",
    secondary: null,
    target: "self"
  },
  torment: {
    name: "Torment",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Target can't select the same move twice in a row.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Next turn, 50% of the user's max HP is restored.",
    secondary: null,
    target: "self"
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
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 20,
    description: "High critical hit ratio. Hits adjacent foes.",
    secondary: null
  },
  facade: {
    name: "Facade",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Power doubles if user is burn/poison/paralyzed.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 90,
    pp: 12,
    description: "10% chance to burn the foe(s).",
    secondary: {
      chance: 10,
      status: "brn"
    }
  },
  hypervoice: {
    name: "Hyper Voice",
    type: "Normal",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 12,
    description: "No additional effect. Hits adjacent foes.",
    secondary: null
  },
  metalsound: {
    name: "Metal Sound",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: 85,
    pp: 20,
    description: "Lowers the target's Sp. Def by 2.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "20% chance to raise the user's Attack by 1.",
    secondary: {
      chance: 20,
      boosts: {
        atk: 1
      }
    },
    target: "normal"
  },
  muddywater: {
    name: "Muddy Water",
    type: "Water",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 85,
    pp: 12,
    description: "30% chance to lower the foe(s) accuracy by 1.",
    secondary: {
      chance: 30,
      boosts: {
        accuracy: -1
      }
    }
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "50% chance to badly poison the target.",
    secondary: {
      chance: 50,
      status: "tox"
    },
    target: "normal"
  },
  rocktomb: {
    name: "Rock Tomb",
    type: "Rock",
    basePower: 60,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 95,
    pp: 15,
    description: "100% chance to lower the target's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
  },
  willowisp: {
    name: "Will-O-Wisp",
    type: "Fire",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 85,
    pp: 15,
    description: "Burns the target.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 30,
    pp: 8,
    description: "OHKOs non-Ice targets. Fails if user's lower level.",
    secondary: null,
    target: "normal"
  },
  howl: {
    name: "Howl",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: true,
    pp: 20,
    description: "Raises the user's and ally's Attack by 1.",
    secondary: null,
    target: "allies"
  },
  lusterpurge: {
    name: "Luster Purge",
    type: "Psychic",
    basePower: 95,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 8,
    description: "50% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 50,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  mistball: {
    name: "Mist Ball",
    type: "Psychic",
    basePower: 95,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 8,
    description: "50% chance to lower the target's Sp. Atk by 1.",
    secondary: {
      chance: 50,
      boosts: {
        spa: -1
      }
    },
    target: "normal"
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
    },
    accuracy: 90,
    pp: 8,
    description: "Lowers the user's Sp. Atk by 2.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: true,
    pp: 20,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "any"
  },
  blastburn: {
    name: "Blast Burn",
    type: "Fire",
    basePower: 150,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
  },
  blazekick: {
    name: "Blaze Kick",
    type: "Fire",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "High critical hit ratio. 10% chance to burn.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  bulkup: {
    name: "Bulk Up",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Attack and Defense by 1.",
    secondary: null,
    target: "self"
  },
  calmmind: {
    name: "Calm Mind",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Sp. Atk and Sp. Def by 1.",
    secondary: null,
    target: "self"
  },
  cosmicpower: {
    name: "Cosmic Power",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Defense and Sp. Def by 1.",
    secondary: null,
    target: "self"
  },
  crushclaw: {
    name: "Crush Claw",
    type: "Normal",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 95,
    pp: 12,
    description: "50% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  dragonclaw: {
    name: "Dragon Claw",
    type: "Dragon",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  dragondance: {
    name: "Dragon Dance",
    type: "Dragon",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Attack and Speed by 1.",
    secondary: null,
    target: "self"
  },
  eruption: {
    name: "Eruption",
    type: "Fire",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "Less power as user's HP decreases. Hits foe(s).",
    secondary: null
  },
  faketears: {
    name: "Fake Tears",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Sp. Def by 2.",
    secondary: null,
    target: "normal"
  },
  featherdance: {
    name: "Feather Dance",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Lowers the target's Attack by 2.",
    secondary: null,
    target: "normal"
  },
  flatter: {
    name: "Flatter",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Raises the target's Sp. Atk by 1 and confuses it.",
    secondary: null,
    target: "normal"
  },
  frenzyplant: {
    name: "Frenzy Plant",
    type: "Grass",
    basePower: 150,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
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
    priority: 5,
    accuracy: true,
    pp: 20,
    description: "One adjacent ally's move power is 1.5x this turn.",
    secondary: null,
    target: "adjacentAlly"
  },
  hydrocannon: {
    name: "Hydro Cannon",
    type: "Water",
    basePower: 150,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
  },
  irondefense: {
    name: "Iron Defense",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Raises the user's Defense by 2.",
    secondary: null,
    target: "self"
  },
  magicalleaf: {
    name: "Magical Leaf",
    type: "Grass",
    basePower: 60,
    category: "Special",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "normal"
  },
  mudshot: {
    name: "Mud Shot",
    type: "Ground",
    basePower: 55,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 95,
    pp: 15,
    description: "100% chance to lower the target's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
  },
  poisontail: {
    name: "Poison Tail",
    type: "Poison",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "High critical hit ratio. 10% chance to poison.",
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal"
  },
  shadowpunch: {
    name: "Shadow Punch",
    type: "Ghost",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    accuracy: true,
    pp: 20,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "normal"
  },
  shockwave: {
    name: "Shock Wave",
    type: "Electric",
    basePower: 60,
    category: "Special",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Attack and Defense by 1.",
    secondary: null,
    target: "normal"
  },
  waterpulse: {
    name: "Water Pulse",
    type: "Water",
    basePower: 60,
    category: "Special",
    flags: {
      pulse: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "20% chance to confuse the target.",
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "any"
  },
  waterspout: {
    name: "Water Spout",
    type: "Water",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "Less power as user's HP decreases. Hits foe(s).",
    secondary: null
  },
  yawn: {
    name: "Yawn",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Puts the target to sleep after 1 turn.",
    secondary: null,
    target: "normal"
  },
  acupressure: {
    name: "Acupressure",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises a random stat of the user or an ally by 2.",
    secondary: null,
    target: "adjacentAllyOrSelf"
  },
  aquaring: {
    name: "Aqua Ring",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "User recovers 1/16 max HP per turn.",
    secondary: null,
    target: "self"
  },
  assurance: {
    name: "Assurance",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Power doubles if target was damaged this turn.",
    secondary: null,
    target: "normal"
  },
  avalanche: {
    name: "Avalanche",
    type: "Ice",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Power doubles if user is damaged by the target.",
    secondary: null,
    target: "normal"
  },
  bravebird: {
    name: "Brave Bird",
    type: "Flying",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [33, 100],
    accuracy: 100,
    pp: 15,
    description: "Has 33% recoil.",
    secondary: null,
    target: "any"
  },
  bugbite: {
    name: "Bug Bite",
    type: "Bug",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "User steals and eats the target's Berry.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Uses the last move used in the battle.",
    secondary: null,
    target: "self"
  },
  crushgrip: {
    name: "Crush Grip",
    type: "Normal",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "More power the more HP the target has left.",
    secondary: null,
    target: "normal"
  },
  defog: {
    name: "Defog",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "-1 evasion; ends user and target hazards/terrain.",
    secondary: null,
    target: "normal"
  },
  doublehit: {
    name: "Double Hit",
    type: "Normal",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 2],
    accuracy: 90,
    pp: 12,
    description: "Hits 2 times in one turn.",
    secondary: null,
    target: "normal"
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
    drain: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
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
    breaksProtect: true,
    accuracy: 100,
    pp: 12,
    description: "Nullifies Detect, Protect, and Quick/Wide Guard.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 95,
    pp: 15,
    description: "10% chance to burn. 10% chance to flinch.",
    secondary: {
      chance: 10
    },
    target: "normal"
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
    recoil: [33, 100],
    accuracy: 100,
    pp: 15,
    description: "Has 33% recoil. 10% chance to burn. Thaws user.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  fling: {
    name: "Fling",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Flings the user's item at the target. Power varies.",
    secondary: null,
    target: "normal"
  },
  gravity: {
    name: "Gravity",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "5 turns: no Ground immunities, 1.67x accuracy.",
    secondary: null,
    target: "all"
  },
  headsmash: {
    name: "Head Smash",
    type: "Rock",
    basePower: 150,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 2],
    accuracy: 80,
    pp: 8,
    description: "Has 1/2 recoil.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User faints. Next hurt Pokemon is fully healed.",
    secondary: null,
    target: "self"
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
    },
    accuracy: 100,
    pp: 8,
    description: "Fails unless each known move has been used.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User faints. Next hurt Pkmn is cured, max HP/PP.",
    secondary: null,
    target: "self"
  },
  magmastorm: {
    name: "Magma Storm",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 75,
    pp: 8,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  magnetrise: {
    name: "Magnet Rise",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "For 5 turns, the user has immunity to Ground.",
    secondary: null,
    target: "self"
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
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "If hit by an attack, returns 1.5x damage.",
    secondary: null,
    target: "scripted"
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
    },
    accuracy: 100,
    pp: 12,
    description: "Power doubles if the user moves after the target.",
    secondary: null,
    target: "normal"
  },
  pluck: {
    name: "Pluck",
    type: "Flying",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "User steals and eats the target's Berry.",
    secondary: null,
    target: "any"
  },
  powertrick: {
    name: "Power Trick",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Switches user's Attack and Defense stats.",
    secondary: null,
    target: "self"
  },
  roost: {
    name: "Roost",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Heals 50% HP. Flying-type removed 'til turn ends.",
    secondary: null,
    target: "self"
  },
  stealthrock: {
    name: "Stealth Rock",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Hurts foes on switch-in. Factors Rock weakness.",
    secondary: null,
    target: "foeSide"
  },
  suckerpunch: {
    name: "Sucker Punch",
    type: "Dark",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1,
    accuracy: 100,
    pp: 8,
    description: "Usually goes first. Fails if target is not attacking.",
    secondary: null,
    target: "normal"
  },
  switcheroo: {
    name: "Switcheroo",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "User switches its held item with the target's.",
    secondary: null,
    target: "normal"
  },
  tailwind: {
    name: "Tailwind",
    type: "Flying",
    basePower: 0,
    category: "Status",
    flags: {
      wind: 1
    },
    accuracy: true,
    pp: 15,
    description: "For 4 turns, allies' Speed is doubled.",
    secondary: null,
    target: "allySide"
  },
  toxicspikes: {
    name: "Toxic Spikes",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Poisons grounded foes on switch-in. Max 2 layers.",
    secondary: null,
    target: "foeSide"
  },
  trickroom: {
    name: "Trick Room",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Goes last. For 5 turns, turn order is reversed.",
    secondary: null,
    target: "all"
  },
  uturn: {
    name: "U-turn",
    type: "Bug",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "User switches out after damaging the target.",
    secondary: null,
    target: "normal"
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
    recoil: [33, 100],
    accuracy: 100,
    pp: 15,
    description: "Has 33% recoil.",
    secondary: null,
    target: "normal"
  },
  worryseed: {
    name: "Worry Seed",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "The target's Ability becomes Insomnia.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 95,
    pp: 15,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "any"
  },
  aurasphere: {
    name: "Aura Sphere",
    type: "Fighting",
    basePower: 80,
    category: "Special",
    flags: {
      bullet: 1,
      pulse: 1
    },
    accuracy: true,
    pp: 20,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "any"
  },
  bugbuzz: {
    name: "Bug Buzz",
    type: "Bug",
    basePower: 90,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
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
    },
    accuracy: 90,
    pp: 8,
    description: "Lowers the user's Sp. Atk by 2.",
    secondary: null,
    target: "normal"
  },
  dragonpulse: {
    name: "Dragon Pulse",
    type: "Dragon",
    basePower: 85,
    category: "Special",
    flags: {
      pulse: 1
    },
    accuracy: 100,
    pp: 12,
    description: "No additional effect.",
    secondary: null,
    target: "any"
  },
  dragonrush: {
    name: "Dragon Rush",
    type: "Dragon",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 75,
    pp: 12,
    description: "20% chance to make the target flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  energyball: {
    name: "Energy Ball",
    type: "Grass",
    basePower: 90,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  gunkshot: {
    name: "Gunk Shot",
    type: "Poison",
    basePower: 120,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 80,
    pp: 8,
    description: "30% chance to poison the target.",
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal"
  },
  gyroball: {
    name: "Gyro Ball",
    type: "Steel",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1,
      bullet: 1
    },
    accuracy: 100,
    pp: 8,
    description: "More power the slower the user than the target.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 90,
    pp: 8,
    description: "Lowers the user's Sp. Atk by 2.",
    secondary: null,
    target: "normal"
  },
  powergem: {
    name: "Power Gem",
    type: "Rock",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    breaksProtect: true,
    accuracy: 100,
    pp: 8,
    description: "Disappears turn 1. Hits turn 2. Breaks protection.",
    secondary: null,
    target: "normal"
  },
  darkvoid: {
    name: "Dark Void",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 50,
    pp: 12,
    description: "Darkrai: Causes the foe(s) to fall asleep.",
    secondary: null
  },
  gastroacid: {
    name: "Gastro Acid",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Nullifies the target's Ability.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 100,
    pp: 20,
    description: "More power the heavier the target.",
    secondary: null,
    target: "normal"
  },
  heartswap: {
    name: "Heart Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Swaps all stat changes with target.",
    secondary: null,
    target: "normal"
  },
  judgment: {
    name: "Judgment",
    type: "Normal",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Type varies based on the held Plate.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 85,
    pp: 8,
    description: "40% chance to lower the target's Sp. Def by 2.",
    secondary: {
      chance: 40,
      boosts: {
        spd: -2
      }
    },
    target: "normal"
  },
  spacialrend: {
    name: "Spacial Rend",
    type: "Dragon",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 95,
    pp: 8,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
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
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  aquatail: {
    name: "Aqua Tail",
    type: "Water",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 12,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  attackorder: {
    name: "Attack Order",
    type: "Bug",
    basePower: 90,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  brine: {
    name: "Brine",
    type: "Water",
    basePower: 65,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Power doubles if the target's HP is 50% or less.",
    secondary: null,
    target: "normal"
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
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  chargebeam: {
    name: "Charge Beam",
    type: "Electric",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "70% chance to raise the user's Sp. Atk by 1.",
    secondary: {
      chance: 70,
      boosts: {
        spa: 1
      }
    },
    target: "normal"
  },
  closecombat: {
    name: "Close Combat",
    type: "Fighting",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Defense and Sp. Def by 1.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "High critical hit ratio. 10% chance to poison.",
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal"
  },
  darkpulse: {
    name: "Dark Pulse",
    type: "Dark",
    basePower: 80,
    category: "Special",
    flags: {
      pulse: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "20% chance to make the target flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "any"
  },
  defendorder: {
    name: "Defend Order",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises the user's Defense and Sp. Def by 1.",
    secondary: null,
    target: "self"
  },
  discharge: {
    name: "Discharge",
    type: "Electric",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacent",
    accuracy: 100,
    pp: 15,
    description: "30% chance to paralyze adjacent Pokemon.",
    secondary: {
      chance: 30,
      status: "par"
    }
  },
  earthpower: {
    name: "Earth Power",
    type: "Ground",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  flashcannon: {
    name: "Flash Cannon",
    type: "Steel",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  focusblast: {
    name: "Focus Blast",
    type: "Fighting",
    basePower: 120,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 70,
    pp: 8,
    description: "10% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  forcepalm: {
    name: "Force Palm",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "30% chance to paralyze the target.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  gigaimpact: {
    name: "Giga Impact",
    type: "Normal",
    basePower: 150,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
  },
  guardswap: {
    name: "Guard Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Swaps Defense and Sp. Def changes with target.",
    secondary: null,
    target: "normal"
  },
  hammerarm: {
    name: "Hammer Arm",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    accuracy: 90,
    pp: 12,
    description: "Lowers the user's Speed by 1.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 95,
    pp: 15,
    description: "10% chance to freeze. 10% chance to flinch.",
    secondary: {
      chance: 10
    },
    target: "normal"
  },
  iceshard: {
    name: "Ice Shard",
    type: "Ice",
    basePower: 40,
    category: "Physical",
    flags: {},
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  ironhead: {
    name: "Iron Head",
    type: "Steel",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "20% chance to make the target flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  lavaplume: {
    name: "Lava Plume",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacent",
    accuracy: 100,
    pp: 15,
    description: "30% chance to burn adjacent Pokemon.",
    secondary: {
      chance: 30,
      status: "brn"
    }
  },
  nastyplot: {
    name: "Nasty Plot",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Sp. Atk by 2.",
    secondary: null,
    target: "self"
  },
  nightslash: {
    name: "Night Slash",
    type: "Dark",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 100,
    pp: 15,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  poisonjab: {
    name: "Poison Jab",
    type: "Poison",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "30% chance to poison the target.",
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal"
  },
  powerswap: {
    name: "Power Swap",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Swaps Attack and Sp. Atk stat stages with target.",
    secondary: null,
    target: "normal"
  },
  powerwhip: {
    name: "Power Whip",
    type: "Grass",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 85,
    pp: 12,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  psychocut: {
    name: "Psycho Cut",
    type: "Psychic",
    basePower: 70,
    category: "Physical",
    flags: {
      slicing: 1
    },
    accuracy: 100,
    pp: 20,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  rockpolish: {
    name: "Rock Polish",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Speed by 2.",
    secondary: null,
    target: "self"
  },
  rockwrecker: {
    name: "Rock Wrecker",
    type: "Rock",
    basePower: 150,
    category: "Physical",
    flags: {
      bullet: 1
    },
    accuracy: 90,
    pp: 8,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
  },
  seedbomb: {
    name: "Seed Bomb",
    type: "Grass",
    basePower: 80,
    category: "Physical",
    flags: {
      bullet: 1
    },
    accuracy: 100,
    pp: 15,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  shadowclaw: {
    name: "Shadow Claw",
    type: "Ghost",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  shadowsneak: {
    name: "Shadow Sneak",
    type: "Ghost",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  stoneedge: {
    name: "Stone Edge",
    type: "Rock",
    basePower: 100,
    category: "Physical",
    flags: {},
    accuracy: 80,
    pp: 8,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 95,
    pp: 15,
    description: "10% chance to paralyze. 10% chance to flinch.",
    secondary: {
      chance: 10
    },
    target: "normal"
  },
  vacuumwave: {
    name: "Vacuum Wave",
    type: "Fighting",
    basePower: 40,
    category: "Special",
    flags: {},
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  xscissor: {
    name: "X-Scissor",
    type: "Bug",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 100,
    pp: 15,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  zenheadbutt: {
    name: "Zen Headbutt",
    type: "Psychic",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 15,
    description: "20% chance to make the target flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "normal"
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
    },
    accuracy: 100,
    pp: 15,
    description: "Power increases when used on consecutive turns.",
    secondary: null,
    target: "normal"
  },
  electroball: {
    name: "Electro Ball",
    type: "Electric",
    basePower: 0,
    category: "Special",
    flags: {
      bullet: 1
    },
    accuracy: 100,
    pp: 12,
    description: "More power the faster the user is than the target.",
    secondary: null,
    target: "normal"
  },
  entrainment: {
    name: "Entrainment",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "The target's Ability changes to match the user's.",
    secondary: null,
    target: "normal"
  },
  finalgambit: {
    name: "Final Gambit",
    type: "Fighting",
    basePower: 0,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Does damage equal to the user's HP. User faints.",
    secondary: null,
    target: "normal"
  },
  firepledge: {
    name: "Fire Pledge",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Use with Grass or Water Pledge for added effect.",
    secondary: null,
    target: "normal"
  },
  frostbreath: {
    name: "Frost Breath",
    type: "Ice",
    basePower: 60,
    category: "Special",
    flags: {},
    willCrit: true,
    accuracy: 90,
    pp: 12,
    description: "Always results in a critical hit.",
    secondary: null,
    target: "normal"
  },
  grasspledge: {
    name: "Grass Pledge",
    type: "Grass",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Use with Fire or Water Pledge for added effect.",
    secondary: null,
    target: "normal"
  },
  healpulse: {
    name: "Heal Pulse",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {
      pulse: 1
    },
    accuracy: true,
    pp: 12,
    description: "Heals the target by 50% of its max HP.",
    secondary: null,
    target: "any"
  },
  heatcrash: {
    name: "Heat Crash",
    type: "Fire",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "More power the heavier the user than the target.",
    secondary: null,
    target: "normal"
  },
  hex: {
    name: "Hex",
    type: "Ghost",
    basePower: 65,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Power doubles if the target has a status ailment.",
    secondary: null,
    target: "normal"
  },
  hornleech: {
    name: "Horn Leech",
    type: "Grass",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    drain: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
  },
  hurricane: {
    name: "Hurricane",
    type: "Flying",
    basePower: 110,
    category: "Special",
    flags: {
      wind: 1
    },
    secondaries: true,
    accuracy: 70,
    pp: 12,
    description: "30% chance to confuse target. Can't miss in rain.",
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "any"
  },
  incinerate: {
    name: "Incinerate",
    type: "Fire",
    basePower: 60,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 15,
    description: "Destroys the foe(s) Berry/Gem.",
    secondary: null
  },
  lowsweep: {
    name: "Low Sweep",
    type: "Fighting",
    basePower: 65,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to lower the target's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
  },
  magicroom: {
    name: "Magic Room",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "For 5 turns, all held items have no effect.",
    secondary: null,
    target: "all"
  },
  quickguard: {
    name: "Quick Guard",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 3,
    accuracy: true,
    pp: 15,
    description: "Protects allies from priority attacks this turn.",
    secondary: null,
    target: "allySide"
  },
  ragepowder: {
    name: "Rage Powder",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 2,
    accuracy: true,
    pp: 20,
    description: "The foes' moves target the user on the turn used.",
    secondary: null,
    target: "self"
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
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 12,
    description: "10% chance to sleep foe(s). Meloetta transforms.",
    secondary: {
      chance: 10,
      status: "slp"
    }
  },
  round: {
    name: "Round",
    type: "Normal",
    basePower: 60,
    category: "Special",
    flags: {
      sound: 1
    },
    accuracy: 100,
    pp: 15,
    description: "Power doubles if others used Round this turn.",
    secondary: null,
    target: "normal"
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
    ignoreDefensive: true,
    accuracy: 100,
    pp: 15,
    description: "Ignores the target's stat stage changes.",
    secondary: null,
    target: "normal"
  },
  scald: {
    name: "Scald",
    type: "Water",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "30% chance to burn the target. Thaws target.",
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal"
  },
  simplebeam: {
    name: "Simple Beam",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "The target's Ability becomes Simple.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 15,
    description: "100% chance to lower the foe(s) Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    }
  },
  soak: {
    name: "Soak",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Changes the target's type to Water.",
    secondary: null,
    target: "normal"
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
    willCrit: true,
    accuracy: 100,
    pp: 12,
    description: "This move always lands a critical hit.",
    secondary: null,
    target: "normal"
  },
  strugglebug: {
    name: "Struggle Bug",
    type: "Bug",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 20,
    description: "100% chance to lower the foe(s) Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    }
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
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Use with Grass or Fire Pledge for added effect.",
    secondary: null,
    target: "normal"
  },
  wideguard: {
    name: "Wide Guard",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 3,
    accuracy: true,
    pp: 12,
    description: "Protects allies from multi-target moves this turn.",
    secondary: null,
    target: "allySide"
  },
  wonderroom: {
    name: "Wonder Room",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "For 5 turns, all Defense and Sp. Def stats switch.",
    secondary: null,
    target: "all"
  },
  allyswitch: {
    name: "Ally Switch",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 2,
    accuracy: true,
    pp: 15,
    description: "User and ally swap positions; using again can fail.",
    secondary: null,
    target: "self"
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
    },
    accuracy: 100,
    pp: 12,
    description: "More power the heavier the user than the target.",
    secondary: null,
    target: "normal"
  },
  reflecttype: {
    name: "Reflect Type",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "User becomes the same type as the target.",
    secondary: null,
    target: "normal"
  },
  voltswitch: {
    name: "Volt Switch",
    type: "Electric",
    basePower: 70,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "User switches out after damaging the target.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "50% chance to raise the user's Sp. Atk by 1.",
    secondary: {
      chance: 50,
      boosts: {
        spa: 1
      }
    },
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Forces the target to move last this turn.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to lower the target's Sp. Def by 2.",
    secondary: {
      chance: 100,
      boosts: {
        spd: -2
      }
    },
    target: "normal"
  },
  acrobatics: {
    name: "Acrobatics",
    type: "Flying",
    basePower: 55,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "Power doubles if the user has no held item.",
    secondary: null,
    target: "any"
  },
  afteryou: {
    name: "After You",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "The target makes its move right after the user.",
    secondary: null,
    target: "normal"
  },
  blueflare: {
    name: "Blue Flare",
    type: "Fire",
    basePower: 130,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 85,
    pp: 8,
    description: "20% chance to burn the target.",
    secondary: {
      chance: 20,
      status: "brn"
    },
    target: "normal"
  },
  boltstrike: {
    name: "Bolt Strike",
    type: "Electric",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 85,
    pp: 8,
    description: "20% chance to paralyze the target.",
    secondary: {
      chance: 20,
      status: "par"
    },
    target: "normal"
  },
  bulldoze: {
    name: "Bulldoze",
    type: "Ground",
    basePower: 60,
    category: "Physical",
    flags: {},
    secondaries: true,
    target: "allAdjacent",
    accuracy: 100,
    pp: 20,
    description: "100% chance lower adjacent Pkmn Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    }
  },
  circlethrow: {
    name: "Circle Throw",
    type: "Fighting",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 12,
    description: "Forces the target to switch to a random ally.",
    secondary: null,
    target: "normal"
  },
  clearsmog: {
    name: "Clear Smog",
    type: "Poison",
    basePower: 50,
    category: "Special",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Resets all of the target's stat stages to 0.",
    secondary: null,
    target: "normal"
  },
  coil: {
    name: "Coil",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises user's Attack, Defense, accuracy by 1.",
    secondary: null,
    target: "self"
  },
  cottonguard: {
    name: "Cotton Guard",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises the user's Defense by 3.",
    secondary: null,
    target: "self"
  },
  dragontail: {
    name: "Dragon Tail",
    type: "Dragon",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    pp: 12,
    description: "Forces the target to switch to a random ally.",
    secondary: null,
    target: "normal"
  },
  drillrun: {
    name: "Drill Run",
    type: "Ground",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 95,
    pp: 12,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 15,
    description: "100% chance to lower the foe(s) Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    }
  },
  flamecharge: {
    name: "Flame Charge",
    type: "Fire",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to raise the user's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: 1
      }
    },
    target: "normal"
  },
  foulplay: {
    name: "Foul Play",
    type: "Dark",
    basePower: 95,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "Uses target's Attack stat in damage calculation.",
    secondary: null,
    target: "normal"
  },
  freezeshock: {
    name: "Freeze Shock",
    type: "Ice",
    basePower: 140,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 90,
    pp: 8,
    description: "Charges turn 1. Hits turn 2. 30% paralyze.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  fusionbolt: {
    name: "Fusion Bolt",
    type: "Electric",
    basePower: 100,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Power doubles if used after Fusion Flare this turn.",
    secondary: null,
    target: "normal"
  },
  fusionflare: {
    name: "Fusion Flare",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Power doubles if used after Fusion Bolt this turn.",
    secondary: null,
    target: "normal"
  },
  geargrind: {
    name: "Gear Grind",
    type: "Steel",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 90,
    multihit: [1, 2]
  },
  glaciate: {
    name: "Glaciate",
    type: "Ice",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 12,
    description: "100% chance to lower the foe(s) Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    }
  },
  guardsplit: {
    name: "Guard Split",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Averages Defense and Sp. Def stats with target.",
    secondary: null,
    target: "normal"
  },
  honeclaws: {
    name: "Hone Claws",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Raises the user's Attack and accuracy by 1.",
    secondary: null,
    target: "self"
  },
  iceburn: {
    name: "Ice Burn",
    type: "Ice",
    basePower: 140,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 90,
    pp: 8,
    description: "Charges turn 1. Hits turn 2. 30% burn.",
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal"
  },
  iciclecrash: {
    name: "Icicle Crash",
    type: "Ice",
    basePower: 85,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  inferno: {
    name: "Inferno",
    type: "Fire",
    basePower: 100,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 50,
    pp: 8,
    description: "100% chance to burn the target.",
    secondary: {
      chance: 100,
      status: "brn"
    },
    target: "normal"
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
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 95,
    pp: 12,
    description: "40% chance to lower the target's accuracy by 1.",
    secondary: {
      chance: 40,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal"
  },
  powersplit: {
    name: "Power Split",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Averages Attack and Sp. Atk stats with target.",
    secondary: null,
    target: "normal"
  },
  psyshock: {
    name: "Psyshock",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    overrideDefensiveStat: "def",
    accuracy: 100,
    pp: 12,
    description: "Damages target based on Defense, not Sp. Def.",
    secondary: null,
    target: "normal"
  },
  psystrike: {
    name: "Psystrike",
    type: "Psychic",
    basePower: 100,
    category: "Special",
    flags: {},
    overrideDefensiveStat: "def",
    accuracy: 100,
    pp: 12,
    description: "Damages target based on Defense, not Sp. Def.",
    secondary: null,
    target: "normal"
  },
  quiverdance: {
    name: "Quiver Dance",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Sp. Atk, Sp. Def, Speed by 1.",
    secondary: null,
    target: "self"
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
    secondaries: true,
    accuracy: 95,
    pp: 12,
    description: "50% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  retaliate: {
    name: "Retaliate",
    type: "Normal",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Power doubles if an ally fainted last turn.",
    secondary: null,
    target: "normal"
  },
  secretsword: {
    name: "Secret Sword",
    type: "Fighting",
    basePower: 85,
    category: "Special",
    flags: {
      slicing: 1
    },
    overrideDefensiveStat: "def",
    accuracy: 100,
    pp: 12,
    description: "Damages target based on Defense, not Sp. Def.",
    secondary: null,
    target: "normal"
  },
  shellsmash: {
    name: "Shell Smash",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2.",
    secondary: null,
    target: "self"
  },
  shiftgear: {
    name: "Shift Gear",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises the user's Speed by 2 and Attack by 1.",
    secondary: null,
    target: "self"
  },
  sludgewave: {
    name: "Sludge Wave",
    type: "Poison",
    basePower: 95,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacent",
    accuracy: 100,
    pp: 12,
    description: "10% chance to poison adjacent Pokemon.",
    secondary: {
      chance: 10,
      status: "psn"
    }
  },
  smackdown: {
    name: "Smack Down",
    type: "Rock",
    basePower: 50,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Removes the target's Ground immunity.",
    secondary: null,
    target: "normal"
  },
  storedpower: {
    name: "Stored Power",
    type: "Psychic",
    basePower: 20,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: " + 20 power for each of the user's stat boosts.",
    secondary: null,
    target: "normal"
  },
  tailslap: {
    name: "Tail Slap",
    type: "Normal",
    basePower: 25,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [2, 5],
    accuracy: 85,
    pp: 12,
    description: "Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Power doubles if the target is poisoned.",
    secondary: null,
    target: "normal"
  },
  wildcharge: {
    name: "Wild Charge",
    type: "Electric",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [1, 4],
    accuracy: 100,
    pp: 15,
    description: "Has 1/4 recoil.",
    secondary: null,
    target: "normal"
  },
  workup: {
    name: "Work Up",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises the user's Attack and Sp. Atk by 1.",
    secondary: null,
    target: "self"
  },
  diamondstorm: {
    name: "Diamond Storm",
    type: "Rock",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 95,
    pp: 8,
    description: "50% chance to raise user's Defense by 2.",
    secondary: null
  },
  fellstinger: {
    name: "Fell Stinger",
    type: "Bug",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Raises user's Attack by 3 if this KOes the target.",
    secondary: null,
    target: "normal"
  },
  flyingpress: {
    name: "Flying Press",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 95,
    pp: 12,
    description: "Combines Flying in its type effectiveness.",
    secondary: null,
    target: "any"
  },
  hyperspacefury: {
    name: "Hyperspace Fury",
    type: "Dark",
    basePower: 100,
    category: "Physical",
    flags: {},
    breaksProtect: true,
    accuracy: true,
    pp: 8,
    description: "Hoopa-U: Lowers user's Def by 1; breaks protect.",
    secondary: null,
    target: "normal"
  },
  hyperspacehole: {
    name: "Hyperspace Hole",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    breaksProtect: true,
    accuracy: true,
    pp: 8,
    description: "Breaks the target's protection for this turn.",
    secondary: null,
    target: "normal"
  },
  kingsshield: {
    name: "King's Shield",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4,
    accuracy: true,
    pp: 8,
    description: "User is protected from most attacks. Lowers the attacker's Attack by 1 if it contacts.",
    secondary: null,
    target: "self"
  },
  mistyterrain: {
    name: "Misty Terrain",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "5 turns. Can't status,-Dragon power vs grounded.",
    secondary: null,
    target: "all"
  },
  mysticalfire: {
    name: "Mystical Fire",
    type: "Fire",
    basePower: 75,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal"
  },
  paraboliccharge: {
    name: "Parabolic Charge",
    type: "Electric",
    basePower: 65,
    category: "Special",
    flags: {},
    target: "allAdjacent",
    drain: [1, 2],
    accuracy: 100,
    pp: 20,
    description: "User recovers 50% of the damage dealt.",
    secondary: null
  },
  partingshot: {
    name: "Parting Shot",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Lowers target's Atk, Sp. Atk by 1. User switches.",
    secondary: null,
    target: "normal"
  },
  phantomforce: {
    name: "Phantom Force",
    type: "Ghost",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    breaksProtect: true,
    accuracy: 100,
    pp: 12,
    description: "Disappears turn 1. Hits turn 2. Breaks protection.",
    secondary: null,
    target: "normal"
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
    priority: 4,
    accuracy: true,
    pp: 12,
    description: "Protects from moves. Contact: loses 1/8 max HP.",
    secondary: null,
    target: "self"
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
    multihit: [2, 5],
    accuracy: 100,
    pp: 20,
    description: "Usually goes first. Hits 2-5 times in one turn.",
    secondary: null,
    target: "normal"
  },
  dragonascent: {
    name: "Dragon Ascent",
    type: "Flying",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Defense and Sp. Def by 1.",
    secondary: null,
    target: "any"
  },
  electricterrain: {
    name: "Electric Terrain",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "5 turns. Grounded: +Electric power, can't sleep.",
    secondary: null,
    target: "all"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "5 turns. Grounded: +Grass power, +1/16 max HP.",
    secondary: null,
    target: "all"
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
    recoil: [1, 2],
    accuracy: 90,
    pp: 8,
    description: "User takes 50% recoil damage.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 85,
    pp: 12,
    description: "No additional effect. Hits adjacent foes.",
    secondary: null
  },
  precipiceblades: {
    name: "Precipice Blades",
    type: "Ground",
    basePower: 120,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 85,
    pp: 12,
    description: "No additional effect. Hits adjacent foes.",
    secondary: null
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
    secondaries: true,
    accuracy: 95,
    pp: 8,
    description: "30% chance to burn the target. Thaws target.",
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal"
  },
  aromaticmist: {
    name: "Aromatic Mist",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises an ally's Sp. Def by 1.",
    secondary: null,
    target: "adjacentAlly"
  },
  babydolleyes: {
    name: "Baby-Doll Eyes",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Attack by 1.",
    secondary: null,
    target: "normal"
  },
  belch: {
    name: "Belch",
    type: "Poison",
    basePower: 120,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 12,
    description: "Cannot be selected until the user eats a Berry.",
    secondary: null,
    target: "normal"
  },
  boomburst: {
    name: "Boomburst",
    type: "Normal",
    basePower: 140,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacent",
    accuracy: 100,
    pp: 12,
    description: "No additional effect. Hits adjacent Pokemon.",
    secondary: null
  },
  celebrate: {
    name: "Celebrate",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "No competitive use.",
    secondary: null,
    target: "self"
  },
  confide: {
    name: "Confide",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: true,
    pp: 20,
    description: "Lowers the target's Sp. Atk by 1.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 12,
    description: "No additional effect. Hits adjacent foes.",
    secondary: null
  },
  disarmingvoice: {
    name: "Disarming Voice",
    type: "Fairy",
    basePower: 40,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes",
    accuracy: true,
    pp: 15,
    description: "This move does not check accuracy. Hits foes.",
    secondary: null
  },
  drainingkiss: {
    name: "Draining Kiss",
    type: "Fairy",
    basePower: 50,
    category: "Special",
    flags: {
      contact: 1
    },
    drain: [3, 4],
    accuracy: 100,
    pp: 12,
    description: "User recovers 75% of the damage dealt.",
    secondary: null,
    target: "normal"
  },
  eerieimpulse: {
    name: "Eerie Impulse",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Lowers the target's Sp. Atk by 2.",
    secondary: null,
    target: "normal"
  },
  electrify: {
    name: "Electrify",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "The target's next move becomes Electric-type.",
    secondary: null,
    target: "normal"
  },
  fairylock: {
    name: "Fairy Lock",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Prevents all Pokemon from switching next turn.",
    secondary: null,
    target: "all"
  },
  fairywind: {
    name: "Fairy Wind",
    type: "Fairy",
    basePower: 40,
    category: "Special",
    flags: {
      wind: 1
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Adds Grass to the target's type(s).",
    secondary: null,
    target: "normal"
  },
  freezedry: {
    name: "Freeze-Dry",
    type: "Ice",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "10% chance to freeze. Super effective on Water.",
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal"
  },
  happyhour: {
    name: "Happy Hour",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "No competitive use.",
    secondary: null,
    target: "allySide"
  },
  holdback: {
    name: "Hold Back",
    type: "Normal",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Always leaves the target with at least 1 HP.",
    secondary: null,
    target: "normal"
  },
  holdhands: {
    name: "Hold Hands",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "No competitive use.",
    secondary: null,
    target: "adjacentAlly"
  },
  infestation: {
    name: "Infestation",
    type: "Bug",
    basePower: 20,
    category: "Special",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  magneticflux: {
    name: "Magnetic Flux",
    type: "Electric",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Raises Def, Sp. Def of allies with Plus/Minus by 1.",
    secondary: null,
    target: "allySide"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "10% chance to lower the target's Sp. Atk by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spa: -1
      }
    },
    target: "normal"
  },
  nobleroar: {
    name: "Noble Roar",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Attack and Sp. Atk by 1.",
    secondary: null,
    target: "normal"
  },
  nuzzle: {
    name: "Nuzzle",
    type: "Electric",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to paralyze the target.",
    secondary: {
      chance: 100,
      status: "par"
    },
    target: "normal"
  },
  petalblizzard: {
    name: "Petal Blizzard",
    type: "Grass",
    basePower: 90,
    category: "Physical",
    flags: {
      wind: 1
    },
    target: "allAdjacent",
    accuracy: 100,
    pp: 15,
    description: "No additional effect. Hits adjacent Pokemon.",
    secondary: null
  },
  playnice: {
    name: "Play Nice",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Lowers the target's Attack by 1.",
    secondary: null,
    target: "normal"
  },
  playrough: {
    name: "Play Rough",
    type: "Fairy",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "10% chance to lower the target's Attack by 1.",
    secondary: {
      chance: 10,
      boosts: {
        atk: -1
      }
    },
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Lowers Speed of grounded foes by 1 on switch-in.",
    secondary: null,
    target: "foeSide"
  },
  topsyturvy: {
    name: "Topsy-Turvy",
    type: "Dark",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Inverts the target's stat stages.",
    secondary: null,
    target: "normal"
  },
  trickortreat: {
    name: "Trick-or-Treat",
    type: "Ghost",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Adds Ghost to the target's type(s).",
    secondary: null,
    target: "normal"
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
    priority: 4,
    accuracy: true,
    pp: 12,
    description: "Protects from moves. Contact: poison.",
    secondary: null,
    target: "self"
  },
  beakblast: {
    name: "Beak Blast",
    type: "Flying",
    basePower: 120,
    category: "Physical",
    flags: {
      bullet: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Burns on contact with the user before it moves.",
    secondary: null,
    target: "normal"
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
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 90,
    pp: 8,
    description: "Lowers the user's Sp. Atk by 2.",
    secondary: null,
    target: "normal"
  },
  floralhealing: {
    name: "Floral Healing",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Heals the target by 50% of its max HP.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 90,
    pp: 12,
    description: "Lowers the user's Speed by 1.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 15,
    description: "The target immediately uses its last used move.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "5 turns. Grounded: +Psychic power, priority-safe.",
    secondary: null,
    target: "all"
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
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Type varies based on the user's primary type.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: true,
    pp: 8,
    description: "User restores 1/2 its max HP; 2/3 in Sandstorm.",
    secondary: null,
    target: "self"
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
    },
    accuracy: 100,
    pp: 12,
    description: "Charges turn 1. Hits turn 2. No charge in sunlight.",
    secondary: null,
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "For 2 turns, the target cannot use sound moves.",
    secondary: {
      chance: 100
    },
    target: "normal"
  },
  toxicthread: {
    name: "Toxic Thread",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Lowers the target's Speed by 1 and poisons it.",
    secondary: null,
    target: "normal"
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
    priority: 1,
    accuracy: 100,
    pp: 20,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  anchorshot: {
    name: "Anchor Shot",
    type: "Steel",
    basePower: 90,
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
    flags: {},
    accuracy: true,
    pp: 20,
    description: "For 5 turns, damage to allies halved. Snow only.",
    secondary: null,
    target: "allySide"
  },
  brutalswing: {
    name: "Brutal Swing",
    type: "Dark",
    basePower: 60,
    category: "Physical",
    flags: {
      contact: 1
    },
    target: "allAdjacent",
    accuracy: 100,
    pp: 20,
    description: "No additional effect. Hits adjacent Pokemon.",
    secondary: null
  },
  burnup: {
    name: "Burn Up",
    type: "Fire",
    basePower: 130,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "User's Fire type becomes typeless; must be Fire.",
    secondary: null,
    target: "normal"
  },
  clangingscales: {
    name: "Clanging Scales",
    type: "Dragon",
    basePower: 110,
    category: "Special",
    flags: {
      sound: 1
    },
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Defense by 1.",
    secondary: null
  },
  darkestlariat: {
    name: "Darkest Lariat",
    type: "Dark",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    ignoreDefensive: true,
    accuracy: 100,
    pp: 12,
    description: "Ignores the target's stat stage changes.",
    secondary: null,
    target: "normal"
  },
  firelash: {
    name: "Fire Lash",
    type: "Fire",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "100% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  firstimpression: {
    name: "First Impression",
    type: "Bug",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    priority: 2,
    accuracy: 100,
    pp: 12,
    description: "Nearly always goes first. First turn out only.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 95,
    pp: 12,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  liquidation: {
    name: "Liquidation",
    type: "Water",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "20% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  lunge: {
    name: "Lunge",
    type: "Bug",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "100% chance to lower the target's Attack by 1.",
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal"
  },
  moongeistbeam: {
    name: "Moongeist Beam",
    type: "Ghost",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Ignores the Abilities of other Pokemon.",
    secondary: null,
    target: "normal"
  },
  photongeyser: {
    name: "Photon Geyser",
    type: "Psychic",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: 100,
    pp: 15,
    description: "If the target is an ally, heals 50% of its max HP.",
    secondary: null,
    target: "normal"
  },
  powertrip: {
    name: "Power Trip",
    type: "Dark",
    basePower: 20,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: " + 20 power for each of the user's stat boosts.",
    secondary: null,
    target: "normal"
  },
  prismaticlaser: {
    name: "Prismatic Laser",
    type: "Psychic",
    basePower: 160,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "User cannot move next turn.",
    secondary: null,
    target: "normal"
  },
  psychicfangs: {
    name: "Psychic Fangs",
    type: "Psychic",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Destroys screens, unless the target is immune.",
    secondary: null,
    target: "normal"
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
    },
    accuracy: true,
    pp: 12,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacent",
    accuracy: 100,
    pp: 12,
    description: "The target is cured of its burn.",
    secondary: {
      chance: 100,
      volatileStatus: "sparklingaria"
    }
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
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Swaps Speed stat with target.",
    secondary: null,
    target: "normal"
  },
  spiritshackle: {
    name: "Spirit Shackle",
    type: "Ghost",
    basePower: 90,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "Prevents the target from switching out.",
    secondary: {
      chance: 100,
      volatileStatus: "trapped"
    },
    target: "normal"
  },
  stompingtantrum: {
    name: "Stomping Tantrum",
    type: "Ground",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Power doubles if the user's last move failed.",
    secondary: null,
    target: "normal"
  },
  strengthsap: {
    name: "Strength Sap",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "User heals HP=target's Atk stat. Lowers Atk by 1.",
    secondary: null,
    target: "normal"
  },
  sunsteelstrike: {
    name: "Sunsteel Strike",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Ignores the Abilities of other Pokemon.",
    secondary: null,
    target: "normal"
  },
  tearfullook: {
    name: "Tearful Look",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 20,
    description: "Lowers the target's Attack and Sp. Atk by 1.",
    secondary: null,
    target: "normal"
  },
  tropkick: {
    name: "Trop Kick",
    type: "Grass",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "100% chance to lower the target's Attack by 1.",
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal"
  },
  zingzap: {
    name: "Zing Zap",
    type: "Electric",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  appleacid: {
    name: "Apple Acid",
    type: "Grass",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's Sp. Def by 1.",
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal"
  },
  astralbarrage: {
    name: "Astral Barrage",
    type: "Ghost",
    basePower: 110,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "No additional effect. Hits adjacent foes.",
    secondary: null
  },
  aurawheel: {
    name: "Aura Wheel",
    type: "Electric",
    basePower: 110,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "Morpeko: Electric; Hangry: Dark; 100% +1 Spe.",
    secondary: {
      chance: 100,
      boosts: {
        spe: 1
      }
    },
    target: "normal"
  },
  behemothbash: {
    name: "Behemoth Bash",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  behemothblade: {
    name: "Behemoth Blade",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 100,
    pp: 8,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  bodypress: {
    name: "Body Press",
    type: "Fighting",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Uses user's Def stat as Atk in damage calculation.",
    secondary: null,
    target: "normal"
  },
  boltbeak: {
    name: "Bolt Beak",
    type: "Electric",
    basePower: 80,
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
    },
    accuracy: 100,
    pp: 20,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 15,
    description: "100% chance to lower the foe(s) Attack by 1.",
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    }
  },
  burningjealousy: {
    name: "Burning Jealousy",
    type: "Fire",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "100% burns a target that had a stat rise this turn.",
    secondary: {
      chance: 100
    }
  },
  clangoroussoul: {
    name: "Clangorous Soul",
    type: "Dragon",
    basePower: 0,
    category: "Status",
    flags: {
      sound: 1
    },
    accuracy: true,
    pp: 8,
    description: "User loses 33% of its max HP. +1 to all stats.",
    secondary: null,
    target: "self"
  },
  coaching: {
    name: "Coaching",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises an ally's Attack and Defense by 1.",
    secondary: null,
    target: "adjacentAlly"
  },
  corrosivegas: {
    name: "Corrosive Gas",
    type: "Poison",
    basePower: 0,
    category: "Status",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 20,
    description: "Removes adjacent Pokemon's held items.",
    secondary: null
  },
  courtchange: {
    name: "Court Change",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Swaps user's field effects with the opposing side.",
    secondary: null,
    target: "all"
  },
  decorate: {
    name: "Decorate",
    type: "Fairy",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Raises the target's Attack and Sp. Atk by 2.",
    secondary: null,
    target: "normal"
  },
  dragondarts: {
    name: "Dragon Darts",
    type: "Dragon",
    basePower: 50,
    category: "Physical",
    flags: {},
    multihit: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "Hits twice. Doubles: Tries to hit each foe once.",
    secondary: null,
    target: "normal"
  },
  dragonenergy: {
    name: "Dragon Energy",
    type: "Dragon",
    basePower: 150,
    category: "Special",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "Less power as user's HP decreases. Hits foe(s).",
    secondary: null
  },
  drumbeating: {
    name: "Drum Beating",
    type: "Grass",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
  },
  dualwingbeat: {
    name: "Dual Wingbeat",
    type: "Flying",
    basePower: 40,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 2],
    accuracy: 90,
    pp: 12,
    description: "Hits 2 times in one turn.",
    secondary: null,
    target: "normal"
  },
  dynamaxcannon: {
    name: "Dynamax Cannon",
    type: "Dragon",
    basePower: 100,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "No additional effect.",
    secondary: null,
    target: "normal"
  },
  eeriespell: {
    name: "Eerie Spell",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 8,
    description: "Removes 3 PP from the target's last move.",
    secondary: {
      chance: 100
    },
    target: "normal"
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
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "User on Psychic Terrain: 1.5x power, hits foes.",
    secondary: null,
    target: "normal"
  },
  falsesurrender: {
    name: "False Surrender",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: true,
    pp: 12,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "normal"
  },
  fierywrath: {
    name: "Fiery Wrath",
    type: "Dark",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 12,
    description: "20% chance to make the foe(s) flinch.",
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    }
  },
  fishiousrend: {
    name: "Fishious Rend",
    type: "Water",
    basePower: 80,
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
    },
    accuracy: 100,
    pp: 20,
    description: "User switches out after damaging the target.",
    secondary: null,
    target: "normal"
  },
  freezingglare: {
    name: "Freezing Glare",
    type: "Psychic",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "10% chance to freeze the target.",
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal"
  },
  glaciallance: {
    name: "Glacial Lance",
    type: "Ice",
    basePower: 120,
    category: "Physical",
    flags: {},
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 8,
    description: "No additional effect. Hits adjacent foes.",
    secondary: null
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
    },
    accuracy: 100,
    pp: 20,
    description: "User on Grassy Terrain: +1 priority.",
    secondary: null,
    target: "normal"
  },
  gravapple: {
    name: "Grav Apple",
    type: "Grass",
    basePower: 90,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "Target: 100% -1 Def. During Gravity: 1.5x power.",
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  jawlock: {
    name: "Jaw Lock",
    type: "Dark",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      bite: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Prevents both user and target from switching out.",
    secondary: null,
    target: "normal"
  },
  junglehealing: {
    name: "Jungle Healing",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User and allies: healed 1/4 max HP, status cured.",
    secondary: null,
    target: "allies"
  },
  lashout: {
    name: "Lash Out",
    type: "Dark",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "2x power if the user had a stat lowered this turn.",
    secondary: null,
    target: "normal"
  },
  lifedew: {
    name: "Life Dew",
    type: "Water",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Heals the user and its allies by 1/4 their max HP.",
    secondary: null,
    target: "allies"
  },
  magicpowder: {
    name: "Magic Powder",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "Changes the target's type to Psychic.",
    secondary: null,
    target: "normal"
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
    flags: {},
    accuracy: 90,
    pp: 12,
    description: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2.",
    secondary: null,
    target: "normal"
  },
  mistyexplosion: {
    name: "Misty Explosion",
    type: "Fairy",
    basePower: 100,
    category: "Special",
    flags: {},
    target: "allAdjacent",
    accuracy: 100,
    pp: 8,
    description: "User faints. User on Misty Terrain: 1.5x power.",
    secondary: null
  },
  noretreat: {
    name: "No Retreat",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "Raises all stats by 1 (not acc/eva). Traps user.",
    secondary: null,
    target: "self"
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
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 12,
    description: "No additional effect. Hits foe(s).",
    secondary: null
  },
  poltergeist: {
    name: "Poltergeist",
    type: "Ghost",
    basePower: 110,
    category: "Physical",
    flags: {},
    accuracy: 90,
    pp: 8,
    description: "Fails if the target has no held item.",
    secondary: null,
    target: "normal"
  },
  pyroball: {
    name: "Pyro Ball",
    type: "Fire",
    basePower: 120,
    category: "Physical",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 8,
    description: "10% chance to burn the target. Thaws user.",
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  risingvoltage: {
    name: "Rising Voltage",
    type: "Electric",
    basePower: 70,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 20,
    description: "2x power if target is grounded in Electric Terrain.",
    secondary: null,
    target: "normal"
  },
  scaleshot: {
    name: "Scale Shot",
    type: "Dragon",
    basePower: 25,
    category: "Physical",
    flags: {},
    multihit: [2, 5],
    accuracy: 90,
    pp: 20,
    description: "Hits 2-5 times. User: -1 Def, +1 Spe after last hit.",
    secondary: null,
    target: "normal"
  },
  shellsidearm: {
    name: "Shell Side Arm",
    type: "Poison",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "20% psn. Physical+contact if it would be stronger.",
    secondary: {
      chance: 20,
      status: "psn"
    },
    target: "normal"
  },
  snaptrap: {
    name: "Snap Trap",
    type: "Steel",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  snipeshot: {
    name: "Snipe Shot",
    type: "Water",
    basePower: 85,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "High critical hit ratio. Cannot be redirected.",
    secondary: null,
    target: "normal"
  },
  scorchingsands: {
    name: "Scorching Sands",
    type: "Ground",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "30% chance to burn the target. Thaws target.",
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal"
  },
  skittersmack: {
    name: "Skitter Smack",
    type: "Bug",
    basePower: 70,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "100% chance to lower target's Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal"
  },
  spiritbreak: {
    name: "Spirit Break",
    type: "Fairy",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "100% chance to lower the target's Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal"
  },
  steelbeam: {
    name: "Steel Beam",
    type: "Steel",
    basePower: 140,
    category: "Special",
    flags: {},
    mindBlownRecoil: true,
    accuracy: 95,
    pp: 8,
    description: "User loses 50% max HP.",
    secondary: null,
    target: "normal"
  },
  steelroller: {
    name: "Steel Roller",
    type: "Steel",
    basePower: 130,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Fails if there is no terrain active. Ends the terrain.",
    secondary: null,
    target: "normal"
  },
  strangesteam: {
    name: "Strange Steam",
    type: "Fairy",
    basePower: 90,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 95,
    pp: 12,
    description: "20% chance to confuse the target.",
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "normal"
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
    multihit: [1, 3],
    accuracy: 100,
    pp: 8,
    description: "Always results in a critical hit. Hits 3 times.",
    secondary: null,
    target: "normal"
  },
  terrainpulse: {
    name: "Terrain Pulse",
    type: "Normal",
    basePower: 50,
    category: "Special",
    flags: {
      pulse: 1
    },
    accuracy: 100,
    pp: 12,
    description: "User on terrain: power doubles, type varies.",
    secondary: null,
    target: "normal"
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
    multiaccuracy: true,
    accuracy: 90,
    pp: 12,
    description: "Hits 3 times. Each hit can miss, but power rises.",
    secondary: null,
    target: "normal"
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
    willCrit: true,
    accuracy: 100,
    pp: 8,
    description: "Always results in a critical hit.",
    secondary: null,
    target: "normal"
  },
  stuffcheeks: {
    name: "Stuff Cheeks",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Must hold Berry to use. User eats Berry, Def +2.",
    secondary: null,
    target: "self"
  },
  tarshot: {
    name: "Tar Shot",
    type: "Rock",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "Target gets -1 Spe and becomes weaker to Fire.",
    secondary: null,
    target: "normal"
  },
  teatime: {
    name: "Teatime",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "All active Pokemon consume held Berries.",
    secondary: null,
    target: "all"
  },
  thundercage: {
    name: "Thunder Cage",
    type: "Electric",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 15,
    description: "Traps and damages the target for 4-5 turns.",
    secondary: null,
    target: "normal"
  },
  thunderouskick: {
    name: "Thunderous Kick",
    type: "Fighting",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's Defense by 1.",
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  aquacutter: {
    name: "Aqua Cutter",
    type: "Water",
    basePower: 70,
    category: "Physical",
    flags: {
      slicing: 1
    },
    accuracy: 100,
    pp: 20,
    description: "High critical hit ratio.",
    secondary: null,
    target: "normal"
  },
  alluringvoice: {
    name: "Alluring Voice",
    type: "Fairy",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% confuse target that had a stat rise this turn.",
    secondary: {
      chance: 100
    },
    target: "normal"
  },
  aquastep: {
    name: "Aqua Step",
    type: "Water",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to raise the user's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: 1
      }
    },
    target: "normal"
  },
  armorcannon: {
    name: "Armor Cannon",
    type: "Fire",
    basePower: 120,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Defense and Sp. Def by 1.",
    secondary: null,
    target: "normal"
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
    hasCrashDamage: true,
    accuracy: 90,
    pp: 12,
    description: "30% confusion. User loses 50% max HP if miss.",
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "normal"
  },
  barbbarrage: {
    name: "Barb Barrage",
    type: "Poison",
    basePower: 60,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "50% psn. 2x power if target already poisoned.",
    secondary: {
      chance: 50,
      status: "psn"
    },
    target: "normal"
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
    drain: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "User recovers 50% of the damage dealt.",
    secondary: null,
    target: "normal"
  },
  bittermalice: {
    name: "Bitter Malice",
    type: "Ghost",
    basePower: 75,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's Attack by 1.",
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal"
  },
  blazingtorque: {
    name: "Blazing Torque",
    type: "Fire",
    basePower: 80,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "30% chance to burn the target.",
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 80,
    pp: 12,
    description: "30% to lower foe(s) Speed by 1. Rain: can't miss.",
    secondary: {
      chance: 30,
      boosts: {
        spe: -1
      }
    }
  },
  bloodmoon: {
    name: "Blood Moon",
    type: "Normal",
    basePower: 130,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Cannot be selected the turn after it's used.",
    secondary: null,
    target: "normal"
  },
  burningbulwark: {
    name: "Burning Bulwark",
    type: "Fire",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4,
    accuracy: true,
    pp: 12,
    description: "Protects from damaging attacks. Contact: burn.",
    secondary: null,
    target: "self"
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
    secondaries: true,
    accuracy: 90,
    pp: 15,
    description: "Sets a layer of Spikes on the opposing side.",
    secondary: {
      chance: 100
    },
    target: "normal"
  },
  chillingwater: {
    name: "Chilling Water",
    type: "Water",
    basePower: 50,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to lower the target's Attack by 1.",
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal"
  },
  chillyreception: {
    name: "Chilly Reception",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Starts Snow. User switches out.",
    secondary: null,
    target: "all"
  },
  chloroblast: {
    name: "Chloroblast",
    type: "Grass",
    basePower: 150,
    category: "Special",
    flags: {},
    mindBlownRecoil: true,
    accuracy: 95,
    pp: 8,
    description: "User loses 50% max HP.",
    secondary: null,
    target: "normal"
  },
  collisioncourse: {
    name: "Collision Course",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Deals 1.3333x damage with supereffective hits.",
    secondary: null,
    target: "normal"
  },
  combattorque: {
    name: "Combat Torque",
    type: "Fighting",
    basePower: 100,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "30% chance to paralyze the target.",
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal"
  },
  comeuppance: {
    name: "Comeuppance",
    type: "Dark",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "If hit by an attack, returns 1.5x damage.",
    secondary: null,
    target: "scripted"
  },
  doodle: {
    name: "Doodle",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "User and ally's Abilities become target's Ability.",
    secondary: null,
    target: "adjacentFoe"
  },
  doubleshock: {
    name: "Double Shock",
    type: "Electric",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "User's Electric type: typeless; must be Electric.",
    secondary: null,
    target: "normal"
  },
  direclaw: {
    name: "Dire Claw",
    type: "Poison",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "30% chance to sleep, poison, or paralyze target.",
    secondary: {
      chance: 30
    },
    target: "normal"
  },
  dragoncheer: {
    name: "Dragon Cheer",
    type: "Dragon",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Ally: Crit ratio +1, or +2 if ally is Dragon type.",
    secondary: null,
    target: "adjacentAlly"
  },
  electrodrift: {
    name: "Electro Drift",
    type: "Electric",
    basePower: 100,
    category: "Special",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Deals 1.3333x damage with supereffective hits.",
    secondary: null,
    target: "normal"
  },
  electroshot: {
    name: "Electro Shot",
    type: "Electric",
    basePower: 130,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Raises Sp. Atk by 1, hits turn 2. Rain: no charge.",
    secondary: null,
    target: "normal"
  },
  esperwing: {
    name: "Esper Wing",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to raise user Speed by 1. High crit.",
    secondary: {
      chance: 100,
      boosts: {
        spe: 1
      }
    },
    target: "normal"
  },
  ficklebeam: {
    name: "Fickle Beam",
    type: "Dragon",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Has a 30% chance this move's power is doubled.",
    secondary: null,
    target: "normal"
  },
  filletaway: {
    name: "Fillet Away",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "+2 Attack, Sp. Atk, Speed for 1/2 user's max HP.",
    secondary: null,
    target: "self"
  },
  flowertrick: {
    name: "Flower Trick",
    type: "Grass",
    basePower: 70,
    category: "Physical",
    flags: {},
    willCrit: true,
    accuracy: true,
    pp: 12,
    description: "Always results in a critical hit; no accuracy check.",
    secondary: null,
    target: "normal"
  },
  gigatonhammer: {
    name: "Gigaton Hammer",
    type: "Steel",
    basePower: 160,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Cannot be selected the turn after it's used.",
    secondary: null,
    target: "normal"
  },
  glaiverush: {
    name: "Glaive Rush",
    type: "Dragon",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "User takes sure-hit 2x damage until its next turn.",
    secondary: null,
    target: "normal"
  },
  hardpress: {
    name: "Hard Press",
    type: "Steel",
    basePower: 0,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "More power the more HP the target has left.",
    secondary: null,
    target: "normal"
  },
  headlongrush: {
    name: "Headlong Rush",
    type: "Ground",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Defense and Sp. Def by 1.",
    secondary: null,
    target: "normal"
  },
  hydrosteam: {
    name: "Hydro Steam",
    type: "Water",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 15,
    description: "During Sunny Day: 1.5x damage instead of half.",
    secondary: null,
    target: "normal"
  },
  hyperdrill: {
    name: "Hyper Drill",
    type: "Normal",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    breaksProtect: true,
    accuracy: 100,
    pp: 8,
    description: "Bypasses protection without breaking it.",
    secondary: null,
    target: "normal"
  },
  icespinner: {
    name: "Ice Spinner",
    type: "Ice",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 15,
    description: "Ends the effects of terrain.",
    secondary: null,
    target: "normal"
  },
  infernalparade: {
    name: "Infernal Parade",
    type: "Ghost",
    basePower: 65,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "30% burn. 2x power if target is already statused.",
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal"
  },
  ivycudgel: {
    name: "Ivy Cudgel",
    type: "Grass",
    basePower: 100,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "High critical hit ratio. Type depends on user's form.",
    secondary: null,
    target: "normal"
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
    priority: 1,
    accuracy: 100,
    pp: 15,
    description: "Usually goes first.",
    secondary: null,
    target: "normal"
  },
  kowtowcleave: {
    name: "Kowtow Cleave",
    type: "Dark",
    basePower: 85,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: true,
    pp: 12,
    description: "This move does not check accuracy.",
    secondary: null,
    target: "normal"
  },
  lastrespects: {
    name: "Last Respects",
    type: "Ghost",
    basePower: 50,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "+50 power for each time a party member fainted.",
    secondary: null,
    target: "normal"
  },
  luminacrash: {
    name: "Lumina Crash",
    type: "Psychic",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to lower the target's Sp. Def by 2.",
    secondary: {
      chance: 100,
      boosts: {
        spd: -2
      }
    },
    target: "normal"
  },
  lunarblessing: {
    name: "Lunar Blessing",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 8,
    description: "User and allies: healed 1/4 max HP, status cured.",
    secondary: null,
    target: "allies"
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
    },
    accuracy: 95,
    pp: 8,
    description: "Lowers the user's Sp. Atk by 2. Hits foe(s).",
    secondary: null
  },
  malignantchain: {
    name: "Malignant Chain",
    type: "Poison",
    basePower: 100,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 8,
    description: "50% chance to badly poison the target.",
    secondary: {
      chance: 50,
      status: "tox"
    },
    target: "normal"
  },
  matchagotcha: {
    name: "Matcha Gotcha",
    type: "Grass",
    basePower: 80,
    category: "Special",
    flags: {},
    secondaries: true,
    target: "allAdjacentFoes",
    drain: [1, 2],
    accuracy: 90,
    pp: 15,
    description: "20% burn. Recovers 50% dmg dealt. Thaws foe(s).",
    secondary: {
      chance: 20,
      status: "brn"
    }
  },
  mightycleave: {
    name: "Mighty Cleave",
    type: "Rock",
    basePower: 95,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Bypasses protection without breaking it.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 100,
    pp: 15,
    description: "Poisons foes, frees user from hazards/bind/leech.",
    secondary: {
      chance: 100,
      status: "psn"
    }
  },
  mountaingale: {
    name: "Mountain Gale",
    type: "Ice",
    basePower: 120,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 85,
    pp: 12,
    description: "30% chance to make the target flinch.",
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  mysticalpower: {
    name: "Mystical Power",
    type: "Psychic",
    basePower: 70,
    category: "Special",
    flags: {},
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "100% chance to raise the user's Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: 1
      }
    },
    target: "normal"
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
    },
    accuracy: 100,
    pp: 12,
    description: "Curly|Droopy|Stretchy eaten: +1 Atk|Def|Spe.",
    secondary: null,
    target: "normal"
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
    multiaccuracy: true,
    accuracy: 90,
    pp: 12,
    description: "Hits 10 times. Each hit can miss.",
    secondary: null,
    target: "normal"
  },
  pounce: {
    name: "Pounce",
    type: "Bug",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to lower the target's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
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
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "For 2 turns, the target is prevented from healing.",
    secondary: {
      chance: 100,
      volatileStatus: "healblock"
    },
    target: "normal"
  },
  psyblade: {
    name: "Psyblade",
    type: "Psychic",
    basePower: 80,
    category: "Physical",
    flags: {
      contact: 1,
      slicing: 1
    },
    accuracy: 100,
    pp: 15,
    description: "During Electric Terrain: 1.5x power.",
    secondary: null,
    target: "normal"
  },
  psyshieldbash: {
    name: "Psyshield Bash",
    type: "Psychic",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "100% chance to raise the user's Defense by 1.",
    secondary: {
      chance: 100,
      boosts: {
        def: 1
      }
    },
    target: "normal"
  },
  ragefist: {
    name: "Rage Fist",
    type: "Ghost",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1,
      punch: 1
    },
    accuracy: 100,
    pp: 12,
    description: "+50 power for each time user was hit. Max 6 hits.",
    secondary: null,
    target: "normal"
  },
  ragingbull: {
    name: "Raging Bull",
    type: "Normal",
    basePower: 90,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Destroys screens. Type depends on user's form.",
    secondary: null,
    target: "normal"
  },
  ragingfury: {
    name: "Raging Fury",
    type: "Fire",
    basePower: 120,
    category: "Physical",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "Lasts 2-3 turns. Confuses the user afterwards.",
    secondary: null,
    target: "randomNormal"
  },
  revivalblessing: {
    name: "Revival Blessing",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 1,
    description: "Revives a fainted Pokemon to 50% HP.",
    secondary: null,
    target: "self"
  },
  ruination: {
    name: "Ruination",
    type: "Dark",
    basePower: 0,
    category: "Special",
    flags: {},
    accuracy: 90,
    pp: 12,
    description: "Does damage equal to 1/2 target's current HP.",
    secondary: null,
    target: "normal"
  },
  saltcure: {
    name: "Salt Cure",
    type: "Rock",
    basePower: 40,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 15,
    description: "Deals 1/8 max HP each turn; 1/4 on Steel, Water.",
    secondary: {
      chance: 100,
      volatileStatus: "saltcure"
    },
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 80,
    pp: 12,
    description: "20% chance to burn foe(s). Can't miss in rain.",
    secondary: {
      chance: 20,
      status: "brn"
    }
  },
  shedtail: {
    name: "Shed Tail",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User takes 1/2 its max HP to pass a substitute.",
    secondary: null,
    target: "self"
  },
  shelter: {
    name: "Shelter",
    type: "Steel",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises the user's Defense by 2.",
    secondary: null,
    target: "self"
  },
  silktrap: {
    name: "Silk Trap",
    type: "Bug",
    basePower: 0,
    category: "Status",
    flags: {},
    priority: 4,
    accuracy: true,
    pp: 12,
    description: "Protects from damaging attacks. Contact: -1 Spe.",
    secondary: null,
    target: "self"
  },
  snowscape: {
    name: "Snowscape",
    type: "Ice",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "For 5 turns, snow falls. Ice: 1.5x Def.",
    secondary: null,
    target: "all"
  },
  spicyextract: {
    name: "Spicy Extract",
    type: "Grass",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Raises target's Atk by 2 and lowers its Def by 2.",
    secondary: null,
    target: "normal"
  },
  spinout: {
    name: "Spin Out",
    type: "Steel",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 8,
    description: "Lowers the user's Speed by 2.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 80,
    pp: 8,
    description: "30% chance to lower the foe(s) Attack by 1.",
    secondary: {
      chance: 30,
      boosts: {
        atk: -1
      }
    }
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
    secondaries: true,
    accuracy: 90,
    pp: 15,
    description: "Sets Stealth Rock on the target's side.",
    secondary: {
      chance: 100
    },
    target: "normal"
  },
  supercellslam: {
    name: "Supercell Slam",
    type: "Electric",
    basePower: 100,
    category: "Physical",
    flags: {
      contact: 1
    },
    hasCrashDamage: true,
    accuracy: 95,
    pp: 15,
    description: "User is hurt by 50% of its max HP if it misses.",
    secondary: null,
    target: "normal"
  },
  syrupbomb: {
    name: "Syrup Bomb",
    type: "Grass",
    basePower: 60,
    category: "Special",
    flags: {
      bullet: 1
    },
    secondaries: true,
    accuracy: 90,
    pp: 12,
    description: "Target's Speed is lowered by 1 stage for 3 turns.",
    secondary: {
      chance: 100,
      volatileStatus: "syrupbomb"
    },
    target: "normal"
  },
  tachyoncutter: {
    name: "Tachyon Cutter",
    type: "Steel",
    basePower: 50,
    category: "Special",
    flags: {
      slicing: 1
    },
    multihit: [1, 2],
    accuracy: true,
    pp: 12,
    description: "Hits twice. This move does not check accuracy.",
    secondary: null,
    target: "normal"
  },
  takeheart: {
    name: "Take Heart",
    type: "Psychic",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 15,
    description: "Cures user's status, raises Sp. Atk, Sp. Def by 1.",
    secondary: null,
    target: "self"
  },
  temperflare: {
    name: "Temper Flare",
    type: "Fire",
    basePower: 75,
    category: "Physical",
    flags: {
      contact: 1
    },
    accuracy: 100,
    pp: 12,
    description: "Power doubles if the user's last move failed.",
    secondary: null,
    target: "normal"
  },
  terablast: {
    name: "Tera Blast",
    type: "Normal",
    basePower: 80,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 12,
    description: "If Terastallized: Phys. if Atk > SpA, type = Tera.",
    secondary: null,
    target: "normal"
  },
  terastarstorm: {
    name: "Tera Starstorm",
    type: "Normal",
    basePower: 120,
    category: "Special",
    flags: {},
    accuracy: 100,
    pp: 8,
    description: "Terapagos-Stellar: Stellar type, hits both foes.",
    secondary: null,
    target: "normal"
  },
  thunderclap: {
    name: "Thunderclap",
    type: "Electric",
    basePower: 70,
    category: "Special",
    flags: {},
    priority: 1,
    accuracy: 100,
    pp: 8,
    description: "Usually goes first. Fails if target is not attacking.",
    secondary: null,
    target: "normal"
  },
  tidyup: {
    name: "Tidy Up",
    type: "Normal",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "User +1 Atk, Spe. Clears all substitutes/hazards.",
    secondary: null,
    target: "self"
  },
  torchsong: {
    name: "Torch Song",
    type: "Fire",
    basePower: 80,
    category: "Special",
    flags: {
      sound: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "100% chance to raise the user's Sp. Atk by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spa: 1
      }
    },
    target: "normal"
  },
  trailblaze: {
    name: "Trailblaze",
    type: "Grass",
    basePower: 50,
    category: "Physical",
    flags: {
      contact: 1
    },
    secondaries: true,
    accuracy: 100,
    pp: 20,
    description: "100% chance to raise the user's Speed by 1.",
    secondary: {
      chance: 100,
      boosts: {
        spe: 1
      }
    },
    target: "normal"
  },
  triplearrows: {
    name: "Triple Arrows",
    type: "Fighting",
    basePower: 90,
    category: "Physical",
    flags: {},
    secondaries: true,
    accuracy: 100,
    pp: 12,
    description: "High crit. Target: 50% -1 Defense, 30% flinch.",
    secondary: {
      chance: 50
    },
    target: "normal"
  },
  tripledive: {
    name: "Triple Dive",
    type: "Water",
    basePower: 35,
    category: "Physical",
    flags: {
      contact: 1
    },
    multihit: [1, 3],
    accuracy: 95,
    pp: 12,
    description: "Hits 3 times.",
    secondary: null,
    target: "normal"
  },
  twinbeam: {
    name: "Twin Beam",
    type: "Psychic",
    basePower: 40,
    category: "Special",
    flags: {},
    multihit: [1, 2],
    accuracy: 100,
    pp: 12,
    description: "Hits 2 times in one turn.",
    secondary: null,
    target: "normal"
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
    priority: 3,
    accuracy: 100,
    pp: 15,
    description: "100% flinch. Fails unless target using priority.",
    secondary: {
      chance: 100,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  victorydance: {
    name: "Victory Dance",
    type: "Fighting",
    basePower: 0,
    category: "Status",
    flags: {},
    accuracy: true,
    pp: 12,
    description: "Raises the user's Attack, Defense, Speed by 1.",
    secondary: null,
    target: "self"
  },
  wavecrash: {
    name: "Wave Crash",
    type: "Water",
    basePower: 120,
    category: "Physical",
    flags: {
      contact: 1
    },
    recoil: [33, 100],
    accuracy: 100,
    pp: 12,
    description: "Has 33% recoil.",
    secondary: null,
    target: "normal"
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
    target: "allAdjacentFoes",
    accuracy: 80,
    pp: 12,
    description: "20% chance to paralyze foe(s). Rain: can't miss.",
    secondary: {
      chance: 20,
      status: "par"
    }
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
} as const satisfies Record<string, MoveData>
