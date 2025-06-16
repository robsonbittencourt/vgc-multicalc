import { PokemonType } from "@lib/types"

export type MoveName = keyof typeof MOVE_DETAILS

export interface MoveDetail {
  accuracy: number | true
  basePower: number
  category: "Physical" | "Special" | "Status"
  name: string
  pp: number
  type: PokemonType
  description: string
}

export const MOVE_DETAILS: Record<string, MoveDetail> = {
  absorb: {
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Absorb",
    pp: 25,
    type: "Grass",
    description: "User recovers 50% of the damage dealt."
  },
  accelerock: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Accelerock",
    pp: 20,
    type: "Rock",
    description: "Usually goes first."
  },
  acid: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Acid",
    pp: 30,
    type: "Poison",
    description: "10% chance to lower the foe(s) Sp. Def by 1."
  },
  acidarmor: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Acid Armor",
    pp: 20,
    type: "Poison",
    description: "Raises the user's Defense by 2."
  },
  acidspray: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Acid Spray",
    pp: 20,
    type: "Poison",
    description: "100% chance to lower the target's Sp. Def by 2."
  },
  acrobatics: {
    accuracy: 100,
    basePower: 55,
    category: "Physical",
    name: "Acrobatics",
    pp: 15,
    type: "Flying",
    description: "Power doubles if the user has no held item."
  },
  acupressure: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Acupressure",
    pp: 30,
    type: "Normal",
    description: "Raises a random stat of the user or an ally by 2."
  },
  aerialace: {
    accuracy: true,
    basePower: 60,
    category: "Physical",
    name: "Aerial Ace",
    pp: 20,
    type: "Flying",
    description: "This move does not check accuracy."
  },
  aeroblast: {
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Aeroblast",
    pp: 5,
    type: "Flying",
    description: "High critical hit ratio."
  },
  afteryou: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "After You",
    pp: 15,
    type: "Normal",
    description: "The target makes its move right after the user."
  },
  agility: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Agility",
    pp: 30,
    type: "Psychic",
    description: "Raises the user's Speed by 2."
  },
  aircutter: {
    accuracy: 95,
    basePower: 60,
    category: "Special",
    name: "Air Cutter",
    pp: 25,
    type: "Flying",
    description: "High critical hit ratio. Hits adjacent foes."
  },
  airslash: {
    accuracy: 95,
    basePower: 75,
    category: "Special",
    name: "Air Slash",
    pp: 15,
    type: "Flying",
    description: "30% chance to make the target flinch."
  },
  alluringvoice: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Alluring Voice",
    pp: 10,
    type: "Fairy",
    description: "100% confuse target that had a stat rise this turn."
  },
  allyswitch: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Ally Switch",
    pp: 15,
    type: "Psychic",
    description: "User and ally swap positions; using again can fail."
  },
  amnesia: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Amnesia",
    pp: 20,
    type: "Psychic",
    description: "Raises the user's Sp. Def by 2."
  },
  ancientpower: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Ancient Power",
    pp: 5,
    type: "Rock",
    description: "10% chance to raise all stats by 1 (not acc/eva)."
  },
  appleacid: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Apple Acid",
    pp: 10,
    type: "Grass",
    description: "100% chance to lower the target's Sp. Def by 1."
  },
  aquacutter: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Aqua Cutter",
    pp: 20,
    type: "Water",
    description: "High critical hit ratio."
  },
  aquajet: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Aqua Jet",
    pp: 20,
    type: "Water",
    description: "Usually goes first."
  },
  aquaring: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aqua Ring",
    pp: 20,
    type: "Water",
    description: "User recovers 1/16 max HP per turn."
  },
  aquastep: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Aqua Step",
    pp: 10,
    type: "Water",
    description: "100% chance to raise the user's Speed by 1."
  },
  aquatail: {
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Aqua Tail",
    pp: 10,
    type: "Water",
    description: "No additional effect."
  },
  armthrust: {
    accuracy: 100,
    basePower: 15,
    category: "Physical",
    name: "Arm Thrust",
    pp: 20,
    type: "Fighting",
    description: "Hits 2-5 times in one turn."
  },
  armorcannon: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Armor Cannon",
    pp: 5,
    type: "Fire",
    description: "Lowers the user's Defense and Sp. Def by 1."
  },
  aromaticmist: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aromatic Mist",
    pp: 20,
    type: "Fairy",
    description: "Raises an ally's Sp. Def by 1."
  },
  assurance: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Assurance",
    pp: 10,
    type: "Dark",
    description: "Power doubles if target was damaged this turn."
  },
  astonish: {
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Astonish",
    pp: 15,
    type: "Ghost",
    description: "30% chance to make the target flinch."
  },
  astralbarrage: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Astral Barrage",
    pp: 5,
    type: "Ghost",
    description: "No additional effect. Hits adjacent foes."
  },
  attackorder: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Attack Order",
    pp: 15,
    type: "Bug",
    description: "High critical hit ratio."
  },
  attract: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Attract",
    pp: 15,
    type: "Normal",
    description: "A target of the opposite gender gets infatuated."
  },
  aurasphere: {
    accuracy: true,
    basePower: 80,
    category: "Special",
    name: "Aura Sphere",
    pp: 20,
    type: "Fighting",
    description: "This move does not check accuracy."
  },
  aurawheel: {
    accuracy: 100,
    basePower: 110,
    category: "Physical",
    name: "Aura Wheel",
    pp: 10,
    type: "Electric",
    description: "Morpeko: Electric; Hangry: Dark; 100% +1 Spe."
  },
  aurorabeam: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Aurora Beam",
    pp: 20,
    type: "Ice",
    description: "10% chance to lower the target's Attack by 1."
  },
  auroraveil: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aurora Veil",
    pp: 20,
    type: "Ice",
    description: "For 5 turns, damage to allies halved. Snow only."
  },
  avalanche: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Avalanche",
    pp: 10,
    type: "Ice",
    description: "Power doubles if user is damaged by the target."
  },
  axekick: {
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Axe Kick",
    pp: 10,
    type: "Fighting",
    description: "30% confusion. User loses 50% max HP if miss."
  },
  babydolleyes: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Baby-Doll Eyes",
    pp: 30,
    type: "Fairy",
    description: "Lowers the target's Attack by 1."
  },
  banefulbunker: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Baneful Bunker",
    pp: 10,
    type: "Poison",
    description: "Protects from moves. Contact: poison."
  },
  barbbarrage: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Barb Barrage",
    pp: 10,
    type: "Poison",
    description: "50% psn. 2x power if target already poisoned."
  },
  batonpass: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Baton Pass",
    pp: 40,
    type: "Normal",
    description: "User switches, passing stat changes and more."
  },
  beakblast: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Beak Blast",
    pp: 15,
    type: "Flying",
    description: "Burns on contact with the user before it moves."
  },
  beatup: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Beat Up",
    pp: 10,
    type: "Dark",
    description: "All healthy allies aid in damaging the target."
  },
  behemothbash: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Behemoth Bash",
    pp: 5,
    type: "Steel",
    description: "No additional effect."
  },
  behemothblade: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Behemoth Blade",
    pp: 5,
    type: "Steel",
    description: "No additional effect."
  },
  belch: {
    accuracy: 90,
    basePower: 120,
    category: "Special",
    name: "Belch",
    pp: 10,
    type: "Poison",
    description: "Cannot be selected until the user eats a Berry."
  },
  bellydrum: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Belly Drum",
    pp: 10,
    type: "Normal",
    description: "User loses 50% max HP. Maximizes Attack."
  },
  bind: {
    accuracy: 85,
    basePower: 15,
    category: "Physical",
    name: "Bind",
    pp: 20,
    type: "Normal",
    description: "Traps and damages the target for 4-5 turns."
  },
  bite: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Bite",
    pp: 25,
    type: "Dark",
    description: "30% chance to make the target flinch."
  },
  bitterblade: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Bitter Blade",
    pp: 10,
    type: "Fire",
    description: "User recovers 50% of the damage dealt."
  },
  bittermalice: {
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Bitter Malice",
    pp: 10,
    type: "Ghost",
    description: "100% chance to lower the target's Attack by 1."
  },
  blastburn: {
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Blast Burn",
    pp: 5,
    type: "Fire",
    description: "User cannot move next turn."
  },
  blazekick: {
    accuracy: 90,
    basePower: 85,
    category: "Physical",
    name: "Blaze Kick",
    pp: 10,
    type: "Fire",
    description: "High critical hit ratio. 10% chance to burn."
  },
  blazingtorque: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Blazing Torque",
    pp: 10,
    type: "Fire",
    description: "30% chance to burn the target."
  },
  bleakwindstorm: {
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Bleakwind Storm",
    pp: 10,
    type: "Flying",
    description: "30% to lower foe(s) Speed by 1. Rain: can't miss."
  },
  blizzard: {
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Blizzard",
    pp: 5,
    type: "Ice",
    description: "10% chance to freeze foe(s). Can't miss in Snow."
  },
  block: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Block",
    pp: 5,
    type: "Normal",
    description: "Prevents the target from switching out."
  },
  bloodmoon: {
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Blood Moon",
    pp: 5,
    type: "Normal",
    description: "Cannot be selected the turn after it's used."
  },
  blueflare: {
    accuracy: 85,
    basePower: 130,
    category: "Special",
    name: "Blue Flare",
    pp: 5,
    type: "Fire",
    description: "20% chance to burn the target."
  },
  bodypress: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Body Press",
    pp: 10,
    type: "Fighting",
    description: "Uses user's Def stat as Atk in damage calculation."
  },
  bodyslam: {
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Body Slam",
    pp: 15,
    type: "Normal",
    description: "30% chance to paralyze the target."
  },
  boltstrike: {
    accuracy: 85,
    basePower: 130,
    category: "Physical",
    name: "Bolt Strike",
    pp: 5,
    type: "Electric",
    description: "20% chance to paralyze the target."
  },
  bonerush: {
    accuracy: 90,
    basePower: 25,
    category: "Physical",
    name: "Bone Rush",
    pp: 10,
    type: "Ground",
    description: "Hits 2-5 times in one turn."
  },
  boomburst: {
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Boomburst",
    pp: 10,
    type: "Normal",
    description: "No additional effect. Hits adjacent Pokemon."
  },
  bounce: {
    accuracy: 85,
    basePower: 85,
    category: "Physical",
    name: "Bounce",
    pp: 5,
    type: "Flying",
    description: "Bounces turn 1. Hits turn 2. 30% paralyze."
  },
  branchpoke: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Branch Poke",
    pp: 40,
    type: "Grass",
    description: "No additional effect."
  },
  bravebird: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Brave Bird",
    pp: 15,
    type: "Flying",
    description: "Has 33% recoil."
  },
  breakingswipe: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Breaking Swipe",
    pp: 15,
    type: "Dragon",
    description: "100% chance to lower the foe(s) Attack by 1."
  },
  brickbreak: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Brick Break",
    pp: 15,
    type: "Fighting",
    description: "Destroys screens, unless the target is immune."
  },
  brine: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Brine",
    pp: 10,
    type: "Water",
    description: "Power doubles if the target's HP is 50% or less."
  },
  brutalswing: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Brutal Swing",
    pp: 20,
    type: "Dark",
    description: "No additional effect. Hits adjacent Pokemon."
  },
  bubblebeam: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Bubble Beam",
    pp: 20,
    type: "Water",
    description: "10% chance to lower the target's Speed by 1."
  },
  bugbite: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Bug Bite",
    pp: 20,
    type: "Bug",
    description: "User steals and eats the target's Berry."
  },
  bugbuzz: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Bug Buzz",
    pp: 10,
    type: "Bug",
    description: "10% chance to lower the target's Sp. Def by 1."
  },
  bulkup: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Bulk Up",
    pp: 20,
    type: "Fighting",
    description: "Raises the user's Attack and Defense by 1."
  },
  bulldoze: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Bulldoze",
    pp: 20,
    type: "Ground",
    description: "100% chance lower adjacent Pkmn Speed by 1."
  },
  bulletpunch: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Bullet Punch",
    pp: 30,
    type: "Steel",
    description: "Usually goes first."
  },
  bulletseed: {
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Bullet Seed",
    pp: 30,
    type: "Grass",
    description: "Hits 2-5 times in one turn."
  },
  burnup: {
    accuracy: 100,
    basePower: 130,
    category: "Special",
    name: "Burn Up",
    pp: 5,
    type: "Fire",
    description: "User's Fire type becomes typeless; must be Fire."
  },
  burningbulwark: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Burning Bulwark",
    pp: 10,
    type: "Fire",
    description: "Protects from damaging attacks. Contact: burn."
  },
  burningjealousy: {
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Burning Jealousy",
    pp: 5,
    type: "Fire",
    description: "100% burns a target that had a stat rise this turn."
  },
  calmmind: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Calm Mind",
    pp: 20,
    type: "Psychic",
    description: "Raises the user's Sp. Atk and Sp. Def by 1."
  },
  ceaselessedge: {
    accuracy: 90,
    basePower: 65,
    category: "Physical",
    name: "Ceaseless Edge",
    pp: 15,
    type: "Dark",
    description: "Sets a layer of Spikes on the opposing side."
  },
  celebrate: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Celebrate",
    pp: 40,
    type: "Normal",
    description: "No competitive use."
  },
  charge: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Charge",
    pp: 20,
    type: "Electric",
    description: "+1 SpD, user's next Electric move 2x power."
  },
  chargebeam: {
    accuracy: 90,
    basePower: 50,
    category: "Special",
    name: "Charge Beam",
    pp: 10,
    type: "Electric",
    description: "70% chance to raise the user's Sp. Atk by 1."
  },
  charm: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Charm",
    pp: 20,
    type: "Fairy",
    description: "Lowers the target's Attack by 2."
  },
  chillingwater: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Chilling Water",
    pp: 20,
    type: "Water",
    description: "100% chance to lower the target's Attack by 1."
  },
  chillyreception: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Chilly Reception",
    pp: 10,
    type: "Ice",
    description: "Starts Snow. User switches out."
  },
  chloroblast: {
    accuracy: 95,
    basePower: 150,
    category: "Special",
    name: "Chloroblast",
    pp: 5,
    type: "Grass",
    description: "User loses 50% max HP."
  },
  circlethrow: {
    accuracy: 90,
    basePower: 60,
    category: "Physical",
    name: "Circle Throw",
    pp: 10,
    type: "Fighting",
    description: "Forces the target to switch to a random ally."
  },
  clangingscales: {
    accuracy: 100,
    basePower: 110,
    category: "Special",
    name: "Clanging Scales",
    pp: 5,
    type: "Dragon",
    description: "Lowers the user's Defense by 1."
  },
  clangoroussoul: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Clangorous Soul",
    pp: 5,
    type: "Dragon",
    description: "User loses 33% of its max HP. +1 to all stats."
  },
  clearsmog: {
    accuracy: true,
    basePower: 50,
    category: "Special",
    name: "Clear Smog",
    pp: 15,
    type: "Poison",
    description: "Resets all of the target's stat stages to 0."
  },
  closecombat: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Close Combat",
    pp: 5,
    type: "Fighting",
    description: "Lowers the user's Defense and Sp. Def by 1."
  },
  coaching: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Coaching",
    pp: 10,
    type: "Fighting",
    description: "Raises an ally's Attack and Defense by 1."
  },
  coil: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Coil",
    pp: 20,
    type: "Poison",
    description: "Raises user's Attack, Defense, accuracy by 1."
  },
  collisioncourse: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Collision Course",
    pp: 5,
    type: "Fighting",
    description: "Deals 1.3333x damage with supereffective hits."
  },
  combattorque: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Combat Torque",
    pp: 10,
    type: "Fighting",
    description: "30% chance to paralyze the target."
  },
  comeuppance: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Comeuppance",
    pp: 10,
    type: "Dark",
    description: "If hit by an attack, returns 1.5x damage."
  },
  confide: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Confide",
    pp: 20,
    type: "Normal",
    description: "Lowers the target's Sp. Atk by 1."
  },
  confuseray: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Confuse Ray",
    pp: 10,
    type: "Ghost",
    description: "Confuses the target."
  },
  confusion: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Confusion",
    pp: 25,
    type: "Psychic",
    description: "10% chance to confuse the target."
  },
  conversion: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Conversion",
    pp: 30,
    type: "Normal",
    description: "Changes user's type to match its first move."
  },
  conversion2: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Conversion 2",
    pp: 30,
    type: "Normal",
    description: "Changes user's type to resist target's last move."
  },
  copycat: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Copycat",
    pp: 20,
    type: "Normal",
    description: "Uses the last move used in the battle."
  },
  corrosivegas: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Corrosive Gas",
    pp: 40,
    type: "Poison",
    description: "Removes adjacent Pokemon's held items."
  },
  cosmicpower: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cosmic Power",
    pp: 20,
    type: "Psychic",
    description: "Raises the user's Defense and Sp. Def by 1."
  },
  cottonguard: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cotton Guard",
    pp: 10,
    type: "Grass",
    description: "Raises the user's Defense by 3."
  },
  cottonspore: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Cotton Spore",
    pp: 40,
    type: "Grass",
    description: "Lowers the target's Speed by 2."
  },
  counter: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Counter",
    pp: 20,
    type: "Fighting",
    description: "If hit by physical attack, returns double damage."
  },
  courtchange: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Court Change",
    pp: 10,
    type: "Normal",
    description: "Swaps user's field effects with the opposing side."
  },
  covet: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Covet",
    pp: 25,
    type: "Normal",
    description: "If the user has no item, it steals the target's."
  },
  crabhammer: {
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Crabhammer",
    pp: 10,
    type: "Water",
    description: "High critical hit ratio."
  },
  crosschop: {
    accuracy: 80,
    basePower: 100,
    category: "Physical",
    name: "Cross Chop",
    pp: 5,
    type: "Fighting",
    description: "High critical hit ratio."
  },
  crosspoison: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Cross Poison",
    pp: 20,
    type: "Poison",
    description: "High critical hit ratio. 10% chance to poison."
  },
  crunch: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Crunch",
    pp: 15,
    type: "Dark",
    description: "20% chance to lower the target's Defense by 1."
  },
  crushclaw: {
    accuracy: 95,
    basePower: 75,
    category: "Physical",
    name: "Crush Claw",
    pp: 10,
    type: "Normal",
    description: "50% chance to lower the target's Defense by 1."
  },
  crushgrip: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Crush Grip",
    pp: 5,
    type: "Normal",
    description: "More power the more HP the target has left."
  },
  curse: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Curse",
    pp: 10,
    type: "Ghost",
    description: "Curses if Ghost, else -1 Spe, +1 Atk, +1 Def."
  },
  cut: {
    accuracy: 95,
    basePower: 50,
    category: "Physical",
    name: "Cut",
    pp: 30,
    type: "Normal",
    description: "No additional effect."
  },
  darkpulse: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Dark Pulse",
    pp: 15,
    type: "Dark",
    description: "20% chance to make the target flinch."
  },
  darkvoid: {
    accuracy: 50,
    basePower: 0,
    category: "Status",
    name: "Dark Void",
    pp: 10,
    type: "Dark",
    description: "Darkrai: Causes the foe(s) to fall asleep."
  },
  darkestlariat: {
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Darkest Lariat",
    pp: 10,
    type: "Dark",
    description: "Ignores the target's stat stage changes."
  },
  dazzlinggleam: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Dazzling Gleam",
    pp: 10,
    type: "Fairy",
    description: "No additional effect. Hits adjacent foes."
  },
  decorate: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Decorate",
    pp: 15,
    type: "Fairy",
    description: "Raises the target's Attack and Sp. Atk by 2."
  },
  defendorder: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Defend Order",
    pp: 10,
    type: "Bug",
    description: "Raises the user's Defense and Sp. Def by 1."
  },
  defensecurl: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Defense Curl",
    pp: 40,
    type: "Normal",
    description: "Raises the user's Defense by 1."
  },
  defog: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Defog",
    pp: 15,
    type: "Flying",
    description: "-1 evasion; ends user and target hazards/terrain."
  },
  destinybond: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Destiny Bond",
    pp: 5,
    type: "Ghost",
    description: "If an opponent knocks out the user, it also faints."
  },
  detect: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Detect",
    pp: 5,
    type: "Fighting",
    description: "Prevents moves from affecting the user this turn."
  },
  diamondstorm: {
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Diamond Storm",
    pp: 5,
    type: "Rock",
    description: "50% chance to raise user's Defense by 2."
  },
  dig: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dig",
    pp: 10,
    type: "Ground",
    description: "Digs underground turn 1, strikes turn 2."
  },
  direclaw: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dire Claw",
    pp: 15,
    type: "Poison",
    description: "50% chance to sleep, poison, or paralyze target."
  },
  disable: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Disable",
    pp: 20,
    type: "Normal",
    description: "For 4 turns, disables the target's last move used."
  },
  disarmingvoice: {
    accuracy: true,
    basePower: 40,
    category: "Special",
    name: "Disarming Voice",
    pp: 15,
    type: "Fairy",
    description: "This move does not check accuracy. Hits foes."
  },
  discharge: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Discharge",
    pp: 15,
    type: "Electric",
    description: "30% chance to paralyze adjacent Pokemon."
  },
  dive: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dive",
    pp: 10,
    type: "Water",
    description: "Dives underwater turn 1, strikes turn 2."
  },
  doodle: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Doodle",
    pp: 10,
    type: "Normal",
    description: "User and ally's Abilities become target's Ability."
  },
  doomdesire: {
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Doom Desire",
    pp: 5,
    type: "Steel",
    description: "Hits two turns after being used."
  },
  doublehit: {
    accuracy: 90,
    basePower: 35,
    category: "Physical",
    name: "Double Hit",
    pp: 10,
    type: "Normal",
    description: "Hits 2 times in one turn."
  },
  doublekick: {
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Double Kick",
    pp: 30,
    type: "Fighting",
    description: "Hits 2 times in one turn."
  },
  doubleshock: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Double Shock",
    pp: 5,
    type: "Electric",
    description: "User's Electric type: typeless; must be Electric."
  },
  doubleteam: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Double Team",
    pp: 15,
    type: "Normal",
    description: "Raises the user's evasiveness by 1."
  },
  doubleedge: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Double-Edge",
    pp: 15,
    type: "Normal",
    description: "Has 33% recoil."
  },
  dracometeor: {
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Draco Meteor",
    pp: 5,
    type: "Dragon",
    description: "Lowers the user's Sp. Atk by 2."
  },
  dragonascent: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Dragon Ascent",
    pp: 5,
    type: "Flying",
    description: "Lowers the user's Defense and Sp. Def by 1."
  },
  dragonbreath: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Dragon Breath",
    pp: 20,
    type: "Dragon",
    description: "30% chance to paralyze the target."
  },
  dragoncheer: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dragon Cheer",
    pp: 15,
    type: "Dragon",
    description: "Ally: Crit ratio +1, or +2 if ally is Dragon type."
  },
  dragonclaw: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dragon Claw",
    pp: 15,
    type: "Dragon",
    description: "No additional effect."
  },
  dragondance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dragon Dance",
    pp: 20,
    type: "Dragon",
    description: "Raises the user's Attack and Speed by 1."
  },
  dragondarts: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Dragon Darts",
    pp: 10,
    type: "Dragon",
    description: "Hits twice. Doubles: Tries to hit each foe once."
  },
  dragonenergy: {
    accuracy: 100,
    basePower: 150,
    category: "Special",
    name: "Dragon Energy",
    pp: 5,
    type: "Dragon",
    description: "Less power as user's HP decreases. Hits foe(s)."
  },
  dragonhammer: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Dragon Hammer",
    pp: 15,
    type: "Dragon",
    description: "No additional effect."
  },
  dragonpulse: {
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Dragon Pulse",
    pp: 10,
    type: "Dragon",
    description: "No additional effect."
  },
  dragonrush: {
    accuracy: 75,
    basePower: 100,
    category: "Physical",
    name: "Dragon Rush",
    pp: 10,
    type: "Dragon",
    description: "20% chance to make the target flinch."
  },
  dragontail: {
    accuracy: 90,
    basePower: 60,
    category: "Physical",
    name: "Dragon Tail",
    pp: 10,
    type: "Dragon",
    description: "Forces the target to switch to a random ally."
  },
  drainpunch: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Drain Punch",
    pp: 10,
    type: "Fighting",
    description: "User recovers 50% of the damage dealt."
  },
  drainingkiss: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Draining Kiss",
    pp: 10,
    type: "Fairy",
    description: "User recovers 75% of the damage dealt."
  },
  dreameater: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Dream Eater",
    pp: 15,
    type: "Psychic",
    description: "User gains 1/2 HP inflicted. Sleeping target only."
  },
  drillpeck: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Drill Peck",
    pp: 20,
    type: "Flying",
    description: "No additional effect."
  },
  drillrun: {
    accuracy: 95,
    basePower: 80,
    category: "Physical",
    name: "Drill Run",
    pp: 10,
    type: "Ground",
    description: "High critical hit ratio."
  },
  drumbeating: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Drum Beating",
    pp: 10,
    type: "Grass",
    description: "100% chance to lower the target's Speed by 1."
  },
  dualwingbeat: {
    accuracy: 90,
    basePower: 40,
    category: "Physical",
    name: "Dual Wingbeat",
    pp: 10,
    type: "Flying",
    description: "Hits 2 times in one turn."
  },
  dynamaxcannon: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Dynamax Cannon",
    pp: 5,
    type: "Dragon",
    description: "No additional effect."
  },
  dynamicpunch: {
    accuracy: 50,
    basePower: 100,
    category: "Physical",
    name: "Dynamic Punch",
    pp: 5,
    type: "Fighting",
    description: "100% chance to confuse the target."
  },
  earthpower: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Earth Power",
    pp: 10,
    type: "Ground",
    description: "10% chance to lower the target's Sp. Def by 1."
  },
  earthquake: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Earthquake",
    pp: 10,
    type: "Ground",
    description: "Hits adjacent Pokemon. Double damage on Dig."
  },
  echoedvoice: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Echoed Voice",
    pp: 15,
    type: "Normal",
    description: "Power increases when used on consecutive turns."
  },
  eerieimpulse: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Eerie Impulse",
    pp: 15,
    type: "Electric",
    description: "Lowers the target's Sp. Atk by 2."
  },
  eeriespell: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Eerie Spell",
    pp: 5,
    type: "Psychic",
    description: "Removes 3 PP from the target's last move."
  },
  electricterrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Electric Terrain",
    pp: 10,
    type: "Electric",
    description: "5 turns. Grounded: +Electric power, can't sleep."
  },
  electroball: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    name: "Electro Ball",
    pp: 10,
    type: "Electric",
    description: "More power the faster the user is than the target."
  },
  electrodrift: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Electro Drift",
    pp: 5,
    type: "Electric",
    description: "Deals 1.3333x damage with supereffective hits."
  },
  electroshot: {
    accuracy: 100,
    basePower: 130,
    category: "Special",
    name: "Electro Shot",
    pp: 10,
    type: "Electric",
    description: "Raises Sp. Atk by 1, hits turn 2. Rain: no charge."
  },
  electroweb: {
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "Electroweb",
    pp: 15,
    type: "Electric",
    description: "100% chance to lower the foe(s) Speed by 1."
  },
  ember: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Ember",
    pp: 25,
    type: "Fire",
    description: "10% chance to burn the target."
  },
  encore: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Encore",
    pp: 5,
    type: "Normal",
    description: "Target repeats its last move for its next 3 turns."
  },
  endeavor: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Endeavor",
    pp: 5,
    type: "Normal",
    description: "Lowers the target's HP to the user's HP."
  },
  endure: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Endure",
    pp: 10,
    type: "Normal",
    description: "User survives attacks this turn with at least 1 HP."
  },
  energyball: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Energy Ball",
    pp: 10,
    type: "Grass",
    description: "10% chance to lower the target's Sp. Def by 1."
  },
  entrainment: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Entrainment",
    pp: 15,
    type: "Normal",
    description: "The target's Ability changes to match the user's."
  },
  eruption: {
    accuracy: 100,
    basePower: 150,
    category: "Special",
    name: "Eruption",
    pp: 5,
    type: "Fire",
    description: "Less power as user's HP decreases. Hits foe(s)."
  },
  esperwing: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Esper Wing",
    pp: 10,
    type: "Psychic",
    description: "100% chance to raise user Speed by 1. High crit."
  },
  expandingforce: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Expanding Force",
    pp: 10,
    type: "Psychic",
    description: "User on Psychic Terrain: 1.5x power, hits foes."
  },
  explosion: {
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "Explosion",
    pp: 5,
    type: "Normal",
    description: "Hits adjacent Pokemon. The user faints."
  },
  extrasensory: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Extrasensory",
    pp: 20,
    type: "Psychic",
    description: "10% chance to make the target flinch."
  },
  extremespeed: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Extreme Speed",
    pp: 5,
    type: "Normal",
    description: "Nearly always goes first."
  },
  facade: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Facade",
    pp: 20,
    type: "Normal",
    description: "Power doubles if user is burn/poison/paralyzed."
  },
  fairylock: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fairy Lock",
    pp: 10,
    type: "Fairy",
    description: "Prevents all Pokemon from switching next turn."
  },
  fairywind: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Fairy Wind",
    pp: 30,
    type: "Fairy",
    description: "No additional effect."
  },
  fakeout: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Fake Out",
    pp: 10,
    type: "Normal",
    description: "Hits first. First turn out only. 100% flinch chance."
  },
  faketears: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Fake Tears",
    pp: 20,
    type: "Dark",
    description: "Lowers the target's Sp. Def by 2."
  },
  falsesurrender: {
    accuracy: true,
    basePower: 80,
    category: "Physical",
    name: "False Surrender",
    pp: 10,
    type: "Dark",
    description: "This move does not check accuracy."
  },
  falseswipe: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "False Swipe",
    pp: 40,
    type: "Normal",
    description: "Always leaves the target with at least 1 HP."
  },
  featherdance: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Feather Dance",
    pp: 15,
    type: "Flying",
    description: "Lowers the target's Attack by 2."
  },
  feint: {
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Feint",
    pp: 10,
    type: "Normal",
    description: "Nullifies Detect, Protect, and Quick/Wide Guard."
  },
  fellstinger: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Fell Stinger",
    pp: 25,
    type: "Bug",
    description: "Raises user's Attack by 3 if this KOes the target."
  },
  ficklebeam: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Fickle Beam",
    pp: 5,
    type: "Dragon",
    description: "Has a 30% chance this move's power is doubled."
  },
  fierydance: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Fiery Dance",
    pp: 10,
    type: "Fire",
    description: "50% chance to raise the user's Sp. Atk by 1."
  },
  fierywrath: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Fiery Wrath",
    pp: 10,
    type: "Dark",
    description: "20% chance to make the foe(s) flinch."
  },
  filletaway: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fillet Away",
    pp: 10,
    type: "Normal",
    description: "+2 Attack, Sp. Atk, Speed for 1/2 user's max HP."
  },
  finalgambit: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    name: "Final Gambit",
    pp: 5,
    type: "Fighting",
    description: "Does damage equal to the user's HP. User faints."
  },
  fireblast: {
    accuracy: 85,
    basePower: 110,
    category: "Special",
    name: "Fire Blast",
    pp: 5,
    type: "Fire",
    description: "10% chance to burn the target."
  },
  firefang: {
    accuracy: 95,
    basePower: 65,
    category: "Physical",
    name: "Fire Fang",
    pp: 15,
    type: "Fire",
    description: "10% chance to burn. 10% chance to flinch."
  },
  firelash: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Fire Lash",
    pp: 15,
    type: "Fire",
    description: "100% chance to lower the target's Defense by 1."
  },
  firepledge: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Fire Pledge",
    pp: 10,
    type: "Fire",
    description: "Use with Grass or Water Pledge for added effect."
  },
  firepunch: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Fire Punch",
    pp: 15,
    type: "Fire",
    description: "10% chance to burn the target."
  },
  firespin: {
    accuracy: 85,
    basePower: 35,
    category: "Special",
    name: "Fire Spin",
    pp: 15,
    type: "Fire",
    description: "Traps and damages the target for 4-5 turns."
  },
  firstimpression: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "First Impression",
    pp: 10,
    type: "Bug",
    description: "Nearly always goes first. First turn out only."
  },
  fissure: {
    accuracy: 30,
    basePower: 0,
    category: "Physical",
    name: "Fissure",
    pp: 5,
    type: "Ground",
    description: "OHKOs the target. Fails if user is a lower level."
  },
  flail: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Flail",
    pp: 15,
    type: "Normal",
    description: "More power the less HP the user has left."
  },
  flamecharge: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Flame Charge",
    pp: 20,
    type: "Fire",
    description: "100% chance to raise the user's Speed by 1."
  },
  flamewheel: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Flame Wheel",
    pp: 25,
    type: "Fire",
    description: "10% chance to burn the target. Thaws user."
  },
  flamethrower: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Flamethrower",
    pp: 15,
    type: "Fire",
    description: "10% chance to burn the target."
  },
  flareblitz: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Flare Blitz",
    pp: 15,
    type: "Fire",
    description: "Has 33% recoil. 10% chance to burn. Thaws user."
  },
  flashcannon: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Flash Cannon",
    pp: 10,
    type: "Steel",
    description: "10% chance to lower the target's Sp. Def by 1."
  },
  flatter: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Flatter",
    pp: 15,
    type: "Dark",
    description: "Raises the target's Sp. Atk by 1 and confuses it."
  },
  fleurcannon: {
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Fleur Cannon",
    pp: 5,
    type: "Fairy",
    description: "Lowers the user's Sp. Atk by 2."
  },
  fling: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Fling",
    pp: 10,
    type: "Dark",
    description: "Flings the user's item at the target. Power varies."
  },
  flipturn: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Flip Turn",
    pp: 20,
    type: "Water",
    description: "User switches out after damaging the target."
  },
  floralhealing: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Floral Healing",
    pp: 10,
    type: "Fairy",
    description: "Heals the target by 50% of its max HP."
  },
  flowertrick: {
    accuracy: true,
    basePower: 70,
    category: "Physical",
    name: "Flower Trick",
    pp: 10,
    type: "Grass",
    description: "Always results in a critical hit; no accuracy check."
  },
  fly: {
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Fly",
    pp: 15,
    type: "Flying",
    description: "Flies up on first turn, then strikes the next turn."
  },
  flyingpress: {
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Flying Press",
    pp: 10,
    type: "Fighting",
    description: "Combines Flying in its type effectiveness."
  },
  focusblast: {
    accuracy: 70,
    basePower: 120,
    category: "Special",
    name: "Focus Blast",
    pp: 5,
    type: "Fighting",
    description: "10% chance to lower the target's Sp. Def by 1."
  },
  focusenergy: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Focus Energy",
    pp: 30,
    type: "Normal",
    description: "Raises the user's critical hit ratio by 2."
  },
  focuspunch: {
    accuracy: 100,
    basePower: 150,
    category: "Physical",
    name: "Focus Punch",
    pp: 20,
    type: "Fighting",
    description: "Fails if the user takes damage before it hits."
  },
  followme: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Follow Me",
    pp: 20,
    type: "Normal",
    description: "The foes' moves target the user on the turn used."
  },
  forcepalm: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Force Palm",
    pp: 10,
    type: "Fighting",
    description: "30% chance to paralyze the target."
  },
  forestscurse: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Forest's Curse",
    pp: 20,
    type: "Grass",
    description: "Adds Grass to the target's type(s)."
  },
  foulplay: {
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Foul Play",
    pp: 15,
    type: "Dark",
    description: "Uses target's Attack stat in damage calculation."
  },
  freezeshock: {
    accuracy: 90,
    basePower: 140,
    category: "Physical",
    name: "Freeze Shock",
    pp: 5,
    type: "Ice",
    description: "Charges turn 1. Hits turn 2. 30% paralyze."
  },
  freezedry: {
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Freeze-Dry",
    pp: 20,
    type: "Ice",
    description: "10% chance to freeze. Super effective on Water."
  },
  freezingglare: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Freezing Glare",
    pp: 10,
    type: "Psychic",
    description: "10% chance to freeze the target."
  },
  frenzyplant: {
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Frenzy Plant",
    pp: 5,
    type: "Grass",
    description: "User cannot move next turn."
  },
  frostbreath: {
    accuracy: 90,
    basePower: 60,
    category: "Special",
    name: "Frost Breath",
    pp: 10,
    type: "Ice",
    description: "Always results in a critical hit."
  },
  furyattack: {
    accuracy: 85,
    basePower: 15,
    category: "Physical",
    name: "Fury Attack",
    pp: 20,
    type: "Normal",
    description: "Hits 2-5 times in one turn."
  },
  furycutter: {
    accuracy: 95,
    basePower: 40,
    category: "Physical",
    name: "Fury Cutter",
    pp: 20,
    type: "Bug",
    description: "Power doubles with each hit, up to 160."
  },
  furyswipes: {
    accuracy: 80,
    basePower: 18,
    category: "Physical",
    name: "Fury Swipes",
    pp: 15,
    type: "Normal",
    description: "Hits 2-5 times in one turn."
  },
  fusionbolt: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Fusion Bolt",
    pp: 5,
    type: "Electric",
    description: "Power doubles if used after Fusion Flare this turn."
  },
  fusionflare: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Fusion Flare",
    pp: 5,
    type: "Fire",
    description: "Power doubles if used after Fusion Bolt this turn."
  },
  futuresight: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Future Sight",
    pp: 10,
    type: "Psychic",
    description: "Hits two turns after being used."
  },
  gastroacid: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Gastro Acid",
    pp: 10,
    type: "Poison",
    description: "Nullifies the target's Ability."
  },
  gigadrain: {
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Giga Drain",
    pp: 10,
    type: "Grass",
    description: "User recovers 50% of the damage dealt."
  },
  gigaimpact: {
    accuracy: 90,
    basePower: 150,
    category: "Physical",
    name: "Giga Impact",
    pp: 5,
    type: "Normal",
    description: "User cannot move next turn."
  },
  gigatonhammer: {
    accuracy: 100,
    basePower: 160,
    category: "Physical",
    name: "Gigaton Hammer",
    pp: 5,
    type: "Steel",
    description: "Cannot be selected the turn after it's used."
  },
  glaciallance: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Glacial Lance",
    pp: 5,
    type: "Ice",
    description: "No additional effect. Hits adjacent foes."
  },
  glaciate: {
    accuracy: 95,
    basePower: 65,
    category: "Special",
    name: "Glaciate",
    pp: 10,
    type: "Ice",
    description: "100% chance to lower the foe(s) Speed by 1."
  },
  glaiverush: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Glaive Rush",
    pp: 5,
    type: "Dragon",
    description: "User takes sure-hit 2x damage until its next turn."
  },
  glare: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Glare",
    pp: 30,
    type: "Normal",
    description: "Paralyzes the target."
  },
  grassknot: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    name: "Grass Knot",
    pp: 20,
    type: "Grass",
    description: "More power the heavier the target."
  },
  grasspledge: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Grass Pledge",
    pp: 10,
    type: "Grass",
    description: "Use with Fire or Water Pledge for added effect."
  },
  grassyglide: {
    accuracy: 100,
    basePower: 55,
    category: "Physical",
    name: "Grassy Glide",
    pp: 20,
    type: "Grass",
    description: "User on Grassy Terrain: +1 priority."
  },
  grassyterrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Grassy Terrain",
    pp: 10,
    type: "Grass",
    description: "5 turns. Grounded: +Grass power, +1/16 max HP."
  },
  gravapple: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Grav Apple",
    pp: 10,
    type: "Grass",
    description: "Target: 100% -1 Def. During Gravity: 1.5x power."
  },
  gravity: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Gravity",
    pp: 5,
    type: "Psychic",
    description: "5 turns: no Ground immunities, 1.67x accuracy."
  },
  growl: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Growl",
    pp: 40,
    type: "Normal",
    description: "Lowers the foe(s) Attack by 1."
  },
  growth: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Growth",
    pp: 20,
    type: "Normal",
    description: "Raises user's Attack and Sp. Atk by 1; 2 in Sun."
  },
  guardsplit: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Guard Split",
    pp: 10,
    type: "Psychic",
    description: "Averages Defense and Sp. Def stats with target."
  },
  guardswap: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Guard Swap",
    pp: 10,
    type: "Psychic",
    description: "Swaps Defense and Sp. Def changes with target."
  },
  guillotine: {
    accuracy: 30,
    basePower: 0,
    category: "Physical",
    name: "Guillotine",
    pp: 5,
    type: "Normal",
    description: "OHKOs the target. Fails if user is a lower level."
  },
  gunkshot: {
    accuracy: 80,
    basePower: 120,
    category: "Physical",
    name: "Gunk Shot",
    pp: 5,
    type: "Poison",
    description: "30% chance to poison the target."
  },
  gust: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Gust",
    pp: 35,
    type: "Flying",
    description: "Power doubles during Bounce, Fly, and Sky Drop."
  },
  gyroball: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Gyro Ball",
    pp: 5,
    type: "Steel",
    description: "More power the slower the user than the target."
  },
  hammerarm: {
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Hammer Arm",
    pp: 10,
    type: "Fighting",
    description: "Lowers the user's Speed by 1."
  },
  happyhour: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Happy Hour",
    pp: 30,
    type: "Normal",
    description: "No competitive use."
  },
  hardpress: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Hard Press",
    pp: 10,
    type: "Steel",
    description: "More power the more HP the target has left."
  },
  harden: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Harden",
    pp: 30,
    type: "Normal",
    description: "Raises the user's Defense by 1."
  },
  haze: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Haze",
    pp: 30,
    type: "Ice",
    description: "Eliminates all stat changes."
  },
  headsmash: {
    accuracy: 80,
    basePower: 150,
    category: "Physical",
    name: "Head Smash",
    pp: 5,
    type: "Rock",
    description: "Has 1/2 recoil."
  },
  headbutt: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Headbutt",
    pp: 15,
    type: "Normal",
    description: "30% chance to make the target flinch."
  },
  headlongrush: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Headlong Rush",
    pp: 5,
    type: "Ground",
    description: "Lowers the user's Defense and Sp. Def by 1."
  },
  healbell: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Heal Bell",
    pp: 5,
    type: "Normal",
    description: "Cures the user's party of all status conditions."
  },
  healpulse: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Heal Pulse",
    pp: 10,
    type: "Psychic",
    description: "Heals the target by 50% of its max HP."
  },
  healingwish: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Healing Wish",
    pp: 10,
    type: "Psychic",
    description: "User faints. Next hurt Pokemon is fully healed."
  },
  heartswap: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Heart Swap",
    pp: 10,
    type: "Psychic",
    description: "Swaps all stat changes with target."
  },
  heatcrash: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Heat Crash",
    pp: 10,
    type: "Fire",
    description: "More power the heavier the user than the target."
  },
  heatwave: {
    accuracy: 90,
    basePower: 95,
    category: "Special",
    name: "Heat Wave",
    pp: 10,
    type: "Fire",
    description: "10% chance to burn the foe(s)."
  },
  heavyslam: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Heavy Slam",
    pp: 10,
    type: "Steel",
    description: "More power the heavier the user than the target."
  },
  helpinghand: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Helping Hand",
    pp: 20,
    type: "Normal",
    description: "One adjacent ally's move power is 1.5x this turn."
  },
  hex: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Hex",
    pp: 10,
    type: "Ghost",
    description: "Power doubles if the target has a status ailment."
  },
  highhorsepower: {
    accuracy: 95,
    basePower: 95,
    category: "Physical",
    name: "High Horsepower",
    pp: 10,
    type: "Ground",
    description: "No additional effect."
  },
  highjumpkick: {
    accuracy: 90,
    basePower: 130,
    category: "Physical",
    name: "High Jump Kick",
    pp: 10,
    type: "Fighting",
    description: "User is hurt by 50% of its max HP if it misses."
  },
  holdback: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Hold Back",
    pp: 40,
    type: "Normal",
    description: "Always leaves the target with at least 1 HP."
  },
  holdhands: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hold Hands",
    pp: 40,
    type: "Normal",
    description: "No competitive use."
  },
  honeclaws: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hone Claws",
    pp: 15,
    type: "Dark",
    description: "Raises the user's Attack and accuracy by 1."
  },
  hornattack: {
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Horn Attack",
    pp: 25,
    type: "Normal",
    description: "No additional effect."
  },
  horndrill: {
    accuracy: 30,
    basePower: 0,
    category: "Physical",
    name: "Horn Drill",
    pp: 5,
    type: "Normal",
    description: "OHKOs the target. Fails if user is a lower level."
  },
  hornleech: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Horn Leech",
    pp: 10,
    type: "Grass",
    description: "User recovers 50% of the damage dealt."
  },
  howl: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Howl",
    pp: 40,
    type: "Normal",
    description: "Raises the user's and ally's Attack by 1."
  },
  hurricane: {
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Hurricane",
    pp: 10,
    type: "Flying",
    description: "30% chance to confuse target. Can't miss in rain."
  },
  hydrocannon: {
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Hydro Cannon",
    pp: 5,
    type: "Water",
    description: "User cannot move next turn."
  },
  hydropump: {
    accuracy: 80,
    basePower: 110,
    category: "Special",
    name: "Hydro Pump",
    pp: 5,
    type: "Water",
    description: "No additional effect."
  },
  hydrosteam: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Hydro Steam",
    pp: 15,
    type: "Water",
    description: "During Sunny Day: 1.5x damage instead of half."
  },
  hyperbeam: {
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Hyper Beam",
    pp: 5,
    type: "Normal",
    description: "User cannot move next turn."
  },
  hyperdrill: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Hyper Drill",
    pp: 5,
    type: "Normal",
    description: "Bypasses protection without breaking it."
  },
  hypervoice: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Hyper Voice",
    pp: 10,
    type: "Normal",
    description: "No additional effect. Hits adjacent foes."
  },
  hyperspacefury: {
    accuracy: true,
    basePower: 100,
    category: "Physical",
    name: "Hyperspace Fury",
    pp: 5,
    type: "Dark",
    description: "Hoopa-U: Lowers user's Def by 1; breaks protect."
  },
  hyperspacehole: {
    accuracy: true,
    basePower: 80,
    category: "Special",
    name: "Hyperspace Hole",
    pp: 5,
    type: "Psychic",
    description: "Breaks the target's protection for this turn."
  },
  hypnosis: {
    accuracy: 60,
    basePower: 0,
    category: "Status",
    name: "Hypnosis",
    pp: 20,
    type: "Psychic",
    description: "Causes the target to fall asleep."
  },
  icebeam: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Ice Beam",
    pp: 10,
    type: "Ice",
    description: "10% chance to freeze the target."
  },
  iceburn: {
    accuracy: 90,
    basePower: 140,
    category: "Special",
    name: "Ice Burn",
    pp: 5,
    type: "Ice",
    description: "Charges turn 1. Hits turn 2. 30% burn."
  },
  icefang: {
    accuracy: 95,
    basePower: 65,
    category: "Physical",
    name: "Ice Fang",
    pp: 15,
    type: "Ice",
    description: "10% chance to freeze. 10% chance to flinch."
  },
  icehammer: {
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Ice Hammer",
    pp: 10,
    type: "Ice",
    description: "Lowers the user's Speed by 1."
  },
  icepunch: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Ice Punch",
    pp: 15,
    type: "Ice",
    description: "10% chance to freeze the target."
  },
  iceshard: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Ice Shard",
    pp: 30,
    type: "Ice",
    description: "Usually goes first."
  },
  icespinner: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Ice Spinner",
    pp: 15,
    type: "Ice",
    description: "Ends the effects of terrain."
  },
  iciclecrash: {
    accuracy: 90,
    basePower: 85,
    category: "Physical",
    name: "Icicle Crash",
    pp: 10,
    type: "Ice",
    description: "30% chance to make the target flinch."
  },
  iciclespear: {
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Icicle Spear",
    pp: 30,
    type: "Ice",
    description: "Hits 2-5 times in one turn."
  },
  icywind: {
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "Icy Wind",
    pp: 15,
    type: "Ice",
    description: "100% chance to lower the foe(s) Speed by 1."
  },
  imprison: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Imprison",
    pp: 10,
    type: "Psychic",
    description: "No foe can use any move known by the user."
  },
  incinerate: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Incinerate",
    pp: 15,
    type: "Fire",
    description: "Destroys the foe(s) Berry/Gem."
  },
  infernalparade: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Infernal Parade",
    pp: 15,
    type: "Ghost",
    description: "30% burn. 2x power if target is already statused."
  },
  inferno: {
    accuracy: 50,
    basePower: 100,
    category: "Special",
    name: "Inferno",
    pp: 5,
    type: "Fire",
    description: "100% chance to burn the target."
  },
  infestation: {
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Infestation",
    pp: 20,
    type: "Bug",
    description: "Traps and damages the target for 4-5 turns."
  },
  ingrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Ingrain",
    pp: 20,
    type: "Grass",
    description: "Traps/grounds user; heals 1/16 max HP per turn."
  },
  instruct: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Instruct",
    pp: 15,
    type: "Psychic",
    description: "The target immediately uses its last used move."
  },
  irondefense: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Iron Defense",
    pp: 15,
    type: "Steel",
    description: "Raises the user's Defense by 2."
  },
  ironhead: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Iron Head",
    pp: 15,
    type: "Steel",
    description: "30% chance to make the target flinch."
  },
  irontail: {
    accuracy: 75,
    basePower: 100,
    category: "Physical",
    name: "Iron Tail",
    pp: 15,
    type: "Steel",
    description: "30% chance to lower the target's Defense by 1."
  },
  ivycudgel: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Ivy Cudgel",
    pp: 10,
    type: "Grass",
    description: "High critical hit ratio. Type depends on user's form."
  },
  jawlock: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Jaw Lock",
    pp: 10,
    type: "Dark",
    description: "Prevents both user and target from switching out."
  },
  jetpunch: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Jet Punch",
    pp: 15,
    type: "Water",
    description: "Usually goes first."
  },
  judgment: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Judgment",
    pp: 10,
    type: "Normal",
    description: "Type varies based on the held Plate."
  },
  junglehealing: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Jungle Healing",
    pp: 10,
    type: "Grass",
    description: "User and allies: healed 1/4 max HP, status cured."
  },
  knockoff: {
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Knock Off",
    pp: 20,
    type: "Dark",
    description: "1.5x damage if foe holds an item. Removes item."
  },
  kowtowcleave: {
    accuracy: true,
    basePower: 85,
    category: "Physical",
    name: "Kowtow Cleave",
    pp: 10,
    type: "Dark",
    description: "This move does not check accuracy."
  },
  lashout: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Lash Out",
    pp: 5,
    type: "Dark",
    description: "2x power if the user had a stat lowered this turn."
  },
  lastresort: {
    accuracy: 100,
    basePower: 140,
    category: "Physical",
    name: "Last Resort",
    pp: 5,
    type: "Normal",
    description: "Fails unless each known move has been used."
  },
  lastrespects: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Last Respects",
    pp: 10,
    type: "Ghost",
    description: "+50 power for each time a party member fainted."
  },
  lavaplume: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Lava Plume",
    pp: 15,
    type: "Fire",
    description: "30% chance to burn adjacent Pokemon."
  },
  leafblade: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Leaf Blade",
    pp: 15,
    type: "Grass",
    description: "High critical hit ratio."
  },
  leafstorm: {
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Leaf Storm",
    pp: 5,
    type: "Grass",
    description: "Lowers the user's Sp. Atk by 2."
  },
  leafage: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Leafage",
    pp: 40,
    type: "Grass",
    description: "No additional effect."
  },
  leechlife: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Leech Life",
    pp: 10,
    type: "Bug",
    description: "User recovers 50% of the damage dealt."
  },
  leechseed: {
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Leech Seed",
    pp: 10,
    type: "Grass",
    description: "1/8 of target's HP is restored to user every turn."
  },
  leer: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Leer",
    pp: 30,
    type: "Normal",
    description: "Lowers the foe(s) Defense by 1."
  },
  lick: {
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Lick",
    pp: 30,
    type: "Ghost",
    description: "30% chance to paralyze the target."
  },
  lifedew: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Life Dew",
    pp: 10,
    type: "Water",
    description: "Heals the user and its allies by 1/4 their max HP."
  },
  lightscreen: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Light Screen",
    pp: 30,
    type: "Psychic",
    description: "For 5 turns, special damage to allies is halved."
  },
  liquidation: {
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Liquidation",
    pp: 10,
    type: "Water",
    description: "20% chance to lower the target's Defense by 1."
  },
  lockon: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Lock-On",
    pp: 5,
    type: "Normal",
    description: "User's next move will not miss the target."
  },
  lowkick: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Low Kick",
    pp: 20,
    type: "Fighting",
    description: "More power the heavier the target."
  },
  lowsweep: {
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Low Sweep",
    pp: 20,
    type: "Fighting",
    description: "100% chance to lower the target's Speed by 1."
  },
  luminacrash: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Lumina Crash",
    pp: 10,
    type: "Psychic",
    description: "100% chance to lower the target's Sp. Def by 2."
  },
  lunarblessing: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Lunar Blessing",
    pp: 5,
    type: "Psychic",
    description: "User and allies: healed 1/4 max HP, status cured."
  },
  lunardance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Lunar Dance",
    pp: 10,
    type: "Psychic",
    description: "User faints. Next hurt Pkmn is cured, max HP/PP."
  },
  lunge: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Lunge",
    pp: 15,
    type: "Bug",
    description: "100% chance to lower the target's Attack by 1."
  },
  lusterpurge: {
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Luster Purge",
    pp: 5,
    type: "Psychic",
    description: "50% chance to lower the target's Sp. Def by 1."
  },
  machpunch: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Mach Punch",
    pp: 30,
    type: "Fighting",
    description: "Usually goes first."
  },
  magicpowder: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Magic Powder",
    pp: 20,
    type: "Psychic",
    description: "Changes the target's type to Psychic."
  },
  magicroom: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Magic Room",
    pp: 10,
    type: "Psychic",
    description: "For 5 turns, all held items have no effect."
  },
  magicalleaf: {
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "Magical Leaf",
    pp: 20,
    type: "Grass",
    description: "This move does not check accuracy."
  },
  magmastorm: {
    accuracy: 75,
    basePower: 100,
    category: "Special",
    name: "Magma Storm",
    pp: 5,
    type: "Fire",
    description: "Traps and damages the target for 4-5 turns."
  },
  magnetrise: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Magnet Rise",
    pp: 10,
    type: "Electric",
    description: "For 5 turns, the user has immunity to Ground."
  },
  magneticflux: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Magnetic Flux",
    pp: 20,
    type: "Electric",
    description: "Raises Def, Sp. Def of allies with Plus/Minus by 1."
  },
  makeitrain: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Make It Rain",
    pp: 5,
    type: "Steel",
    description: "Lowers the user's Sp. Atk by 1. Hits foe(s)."
  },
  malignantchain: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Malignant Chain",
    pp: 5,
    type: "Poison",
    description: "50% chance to badly poison the target."
  },
  matchagotcha: {
    accuracy: 90,
    basePower: 80,
    category: "Special",
    name: "Matcha Gotcha",
    pp: 15,
    type: "Grass",
    description: "20% burn. Recovers 50% dmg dealt. Thaws foe(s)."
  },
  meanlook: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Mean Look",
    pp: 5,
    type: "Normal",
    description: "Prevents the target from switching out."
  },
  megadrain: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Mega Drain",
    pp: 15,
    type: "Grass",
    description: "User recovers 50% of the damage dealt."
  },
  megakick: {
    accuracy: 75,
    basePower: 120,
    category: "Physical",
    name: "Mega Kick",
    pp: 5,
    type: "Normal",
    description: "No additional effect."
  },
  megapunch: {
    accuracy: 85,
    basePower: 80,
    category: "Physical",
    name: "Mega Punch",
    pp: 20,
    type: "Normal",
    description: "No additional effect."
  },
  megahorn: {
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Megahorn",
    pp: 10,
    type: "Bug",
    description: "No additional effect."
  },
  memento: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Memento",
    pp: 10,
    type: "Dark",
    description: "Lowers target's Attack, Sp. Atk by 2. User faints."
  },
  metalburst: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Metal Burst",
    pp: 10,
    type: "Steel",
    description: "If hit by an attack, returns 1.5x damage."
  },
  metalclaw: {
    accuracy: 95,
    basePower: 50,
    category: "Physical",
    name: "Metal Claw",
    pp: 35,
    type: "Steel",
    description: "10% chance to raise the user's Attack by 1."
  },
  metalsound: {
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Metal Sound",
    pp: 40,
    type: "Steel",
    description: "Lowers the target's Sp. Def by 2."
  },
  meteorbeam: {
    accuracy: 90,
    basePower: 120,
    category: "Special",
    name: "Meteor Beam",
    pp: 10,
    type: "Rock",
    description: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2."
  },
  meteormash: {
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Meteor Mash",
    pp: 10,
    type: "Steel",
    description: "20% chance to raise the user's Attack by 1."
  },
  metronome: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Metronome",
    pp: 10,
    type: "Normal",
    description: "Picks a random move."
  },
  mightycleave: {
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Mighty Cleave",
    pp: 5,
    type: "Rock",
    description: "Bypasses protection without breaking it."
  },
  milkdrink: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Milk Drink",
    pp: 5,
    type: "Normal",
    description: "Heals the user by 50% of its max HP."
  },
  mimic: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Mimic",
    pp: 10,
    type: "Normal",
    description: "The last move the target used replaces this one."
  },
  minimize: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Minimize",
    pp: 10,
    type: "Normal",
    description: "Raises the user's evasiveness by 2."
  },
  mirrorcoat: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    name: "Mirror Coat",
    pp: 20,
    type: "Psychic",
    description: "If hit by special attack, returns double damage."
  },
  mist: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Mist",
    pp: 30,
    type: "Ice",
    description: "For 5 turns, protects user's party from stat drops."
  },
  mistball: {
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Mist Ball",
    pp: 5,
    type: "Psychic",
    description: "50% chance to lower the target's Sp. Atk by 1."
  },
  mistyexplosion: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Misty Explosion",
    pp: 5,
    type: "Fairy",
    description: "User faints. User on Misty Terrain: 1.5x power."
  },
  mistyterrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Misty Terrain",
    pp: 10,
    type: "Fairy",
    description: "5 turns. Can't status,-Dragon power vs grounded."
  },
  moonblast: {
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Moonblast",
    pp: 15,
    type: "Fairy",
    description: "30% chance to lower the target's Sp. Atk by 1."
  },
  moongeistbeam: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Moongeist Beam",
    pp: 5,
    type: "Ghost",
    description: "Ignores the Abilities of other Pokemon."
  },
  moonlight: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Moonlight",
    pp: 5,
    type: "Fairy",
    description: "Heals the user by a weather-dependent amount."
  },
  morningsun: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Morning Sun",
    pp: 5,
    type: "Normal",
    description: "Heals the user by a weather-dependent amount."
  },
  mortalspin: {
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Mortal Spin",
    pp: 15,
    type: "Poison",
    description: "Poisons foes, frees user from hazards/bind/leech."
  },
  mountaingale: {
    accuracy: 85,
    basePower: 100,
    category: "Physical",
    name: "Mountain Gale",
    pp: 10,
    type: "Ice",
    description: "30% chance to make the target flinch."
  },
  mudshot: {
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "Mud Shot",
    pp: 15,
    type: "Ground",
    description: "100% chance to lower the target's Speed by 1."
  },
  mudslap: {
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Mud-Slap",
    pp: 10,
    type: "Ground",
    description: "100% chance to lower the target's accuracy by 1."
  },
  muddywater: {
    accuracy: 85,
    basePower: 90,
    category: "Special",
    name: "Muddy Water",
    pp: 10,
    type: "Water",
    description: "30% chance to lower the foe(s) accuracy by 1."
  },
  mysticalfire: {
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Mystical Fire",
    pp: 10,
    type: "Fire",
    description: "100% chance to lower the target's Sp. Atk by 1."
  },
  mysticalpower: {
    accuracy: 90,
    basePower: 70,
    category: "Special",
    name: "Mystical Power",
    pp: 10,
    type: "Psychic",
    description: "100% chance to raise the user's Sp. Atk by 1."
  },
  nastyplot: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Nasty Plot",
    pp: 20,
    type: "Dark",
    description: "Raises the user's Sp. Atk by 2."
  },
  nightdaze: {
    accuracy: 95,
    basePower: 85,
    category: "Special",
    name: "Night Daze",
    pp: 10,
    type: "Dark",
    description: "40% chance to lower the target's accuracy by 1."
  },
  nightshade: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    name: "Night Shade",
    pp: 15,
    type: "Ghost",
    description: "Does damage equal to the user's level."
  },
  nightslash: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Night Slash",
    pp: 15,
    type: "Dark",
    description: "High critical hit ratio."
  },
  noretreat: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "No Retreat",
    pp: 5,
    type: "Fighting",
    description: "Raises all stats by 1 (not acc/eva). Traps user."
  },
  nobleroar: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Noble Roar",
    pp: 30,
    type: "Normal",
    description: "Lowers the target's Attack and Sp. Atk by 1."
  },
  nuzzle: {
    accuracy: 100,
    basePower: 20,
    category: "Physical",
    name: "Nuzzle",
    pp: 20,
    type: "Electric",
    description: "100% chance to paralyze the target."
  },
  orderup: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Order Up",
    pp: 10,
    type: "Dragon",
    description: "Curly|Droopy|Stretchy eaten: +1 Atk|Def|Spe."
  },
  originpulse: {
    accuracy: 85,
    basePower: 110,
    category: "Special",
    name: "Origin Pulse",
    pp: 10,
    type: "Water",
    description: "No additional effect. Hits adjacent foes."
  },
  outrage: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Outrage",
    pp: 10,
    type: "Dragon",
    description: "Lasts 2-3 turns. Confuses the user afterwards."
  },
  overdrive: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Overdrive",
    pp: 10,
    type: "Electric",
    description: "No additional effect. Hits foe(s)."
  },
  overheat: {
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Overheat",
    pp: 5,
    type: "Fire",
    description: "Lowers the user's Sp. Atk by 2."
  },
  painsplit: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Pain Split",
    pp: 20,
    type: "Normal",
    description: "Shares HP of user and target equally."
  },
  paraboliccharge: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Parabolic Charge",
    pp: 20,
    type: "Electric",
    description: "User recovers 50% of the damage dealt."
  },
  partingshot: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Parting Shot",
    pp: 20,
    type: "Dark",
    description: "Lowers target's Atk, Sp. Atk by 1. User switches."
  },
  payday: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Pay Day",
    pp: 20,
    type: "Normal",
    description: "Scatters coins."
  },
  payback: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Payback",
    pp: 10,
    type: "Dark",
    description: "Power doubles if the user moves after the target."
  },
  peck: {
    accuracy: 100,
    basePower: 35,
    category: "Physical",
    name: "Peck",
    pp: 35,
    type: "Flying",
    description: "No additional effect."
  },
  perishsong: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Perish Song",
    pp: 5,
    type: "Normal",
    description: "All active Pokemon will faint in 3 turns."
  },
  petalblizzard: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Petal Blizzard",
    pp: 15,
    type: "Grass",
    description: "No additional effect. Hits adjacent Pokemon."
  },
  petaldance: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Petal Dance",
    pp: 10,
    type: "Grass",
    description: "Lasts 2-3 turns. Confuses the user afterwards."
  },
  phantomforce: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Phantom Force",
    pp: 10,
    type: "Ghost",
    description: "Disappears turn 1. Hits turn 2. Breaks protection."
  },
  photongeyser: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Photon Geyser",
    pp: 5,
    type: "Psychic",
    description: "Physical if user's Atk > Sp. Atk. Ignores Abilities."
  },
  pinmissile: {
    accuracy: 95,
    basePower: 25,
    category: "Physical",
    name: "Pin Missile",
    pp: 20,
    type: "Bug",
    description: "Hits 2-5 times in one turn."
  },
  playnice: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Play Nice",
    pp: 20,
    type: "Normal",
    description: "Lowers the target's Attack by 1."
  },
  playrough: {
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Play Rough",
    pp: 10,
    type: "Fairy",
    description: "10% chance to lower the target's Attack by 1."
  },
  pluck: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Pluck",
    pp: 20,
    type: "Flying",
    description: "User steals and eats the target's Berry."
  },
  poisonfang: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Poison Fang",
    pp: 15,
    type: "Poison",
    description: "50% chance to badly poison the target."
  },
  poisongas: {
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Poison Gas",
    pp: 40,
    type: "Poison",
    description: "Poisons the foe(s)."
  },
  poisonjab: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Poison Jab",
    pp: 20,
    type: "Poison",
    description: "30% chance to poison the target."
  },
  poisonpowder: {
    accuracy: 75,
    basePower: 0,
    category: "Status",
    name: "Poison Powder",
    pp: 35,
    type: "Poison",
    description: "Poisons the target."
  },
  poisonsting: {
    accuracy: 100,
    basePower: 15,
    category: "Physical",
    name: "Poison Sting",
    pp: 35,
    type: "Poison",
    description: "30% chance to poison the target."
  },
  poisontail: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Poison Tail",
    pp: 25,
    type: "Poison",
    description: "High critical hit ratio. 10% chance to poison."
  },
  pollenpuff: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Pollen Puff",
    pp: 15,
    type: "Bug",
    description: "If the target is an ally, heals 50% of its max HP."
  },
  poltergeist: {
    accuracy: 90,
    basePower: 110,
    category: "Physical",
    name: "Poltergeist",
    pp: 5,
    type: "Ghost",
    description: "Fails if the target has no held item."
  },
  populationbomb: {
    accuracy: 90,
    basePower: 20,
    category: "Physical",
    name: "Population Bomb",
    pp: 10,
    type: "Normal",
    description: "Hits 10 times. Each hit can miss."
  },
  pounce: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Pounce",
    pp: 20,
    type: "Bug",
    description: "100% chance to lower the target's Speed by 1."
  },
  pound: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Pound",
    pp: 35,
    type: "Normal",
    description: "No additional effect."
  },
  powdersnow: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Powder Snow",
    pp: 25,
    type: "Ice",
    description: "10% chance to freeze the foe(s)."
  },
  powergem: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Power Gem",
    pp: 20,
    type: "Rock",
    description: "No additional effect."
  },
  powersplit: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Power Split",
    pp: 10,
    type: "Psychic",
    description: "Averages Attack and Sp. Atk stats with target."
  },
  powerswap: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Power Swap",
    pp: 10,
    type: "Psychic",
    description: "Swaps Attack and Sp. Atk stat stages with target."
  },
  powertrick: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Power Trick",
    pp: 10,
    type: "Psychic",
    description: "Switches user's Attack and Defense stats."
  },
  powertrip: {
    accuracy: 100,
    basePower: 20,
    category: "Physical",
    name: "Power Trip",
    pp: 10,
    type: "Dark",
    description: " + 20 power for each of the user's stat boosts."
  },
  powerwhip: {
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Power Whip",
    pp: 10,
    type: "Grass",
    description: "No additional effect."
  },
  precipiceblades: {
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Precipice Blades",
    pp: 10,
    type: "Ground",
    description: "No additional effect. Hits adjacent foes."
  },
  present: {
    accuracy: 90,
    basePower: 0,
    category: "Physical",
    name: "Present",
    pp: 15,
    type: "Normal",
    description: "40, 80, 120 power, or heals target 1/4 max HP."
  },
  prismaticlaser: {
    accuracy: 100,
    basePower: 160,
    category: "Special",
    name: "Prismatic Laser",
    pp: 10,
    type: "Psychic",
    description: "User cannot move next turn."
  },
  protect: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Protect",
    pp: 10,
    type: "Normal",
    description: "Prevents moves from affecting the user this turn."
  },
  psybeam: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Psybeam",
    pp: 20,
    type: "Psychic",
    description: "10% chance to confuse the target."
  },
  psyblade: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Psyblade",
    pp: 15,
    type: "Psychic",
    description: "During Electric Terrain: 1.5x power."
  },
  psychup: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Psych Up",
    pp: 10,
    type: "Normal",
    description: "Copies the target's current stat stages."
  },
  psychic: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Psychic",
    pp: 10,
    type: "Psychic",
    description: "10% chance to lower the target's Sp. Def by 1."
  },
  psychicfangs: {
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Psychic Fangs",
    pp: 10,
    type: "Psychic",
    description: "Destroys screens, unless the target is immune."
  },
  psychicnoise: {
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Psychic Noise",
    pp: 10,
    type: "Psychic",
    description: "For 2 turns, the target is prevented from healing."
  },
  psychicterrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Psychic Terrain",
    pp: 10,
    type: "Psychic",
    description: "5 turns. Grounded: +Psychic power, priority-safe."
  },
  psychoboost: {
    accuracy: 90,
    basePower: 140,
    category: "Special",
    name: "Psycho Boost",
    pp: 5,
    type: "Psychic",
    description: "Lowers the user's Sp. Atk by 2."
  },
  psychocut: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Psycho Cut",
    pp: 20,
    type: "Psychic",
    description: "High critical hit ratio."
  },
  psyshieldbash: {
    accuracy: 90,
    basePower: 70,
    category: "Physical",
    name: "Psyshield Bash",
    pp: 10,
    type: "Psychic",
    description: "100% chance to raise the user's Defense by 1."
  },
  psyshock: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Psyshock",
    pp: 10,
    type: "Psychic",
    description: "Damages target based on Defense, not Sp. Def."
  },
  psystrike: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Psystrike",
    pp: 10,
    type: "Psychic",
    description: "Damages target based on Defense, not Sp. Def."
  },
  pyroball: {
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Pyro Ball",
    pp: 5,
    type: "Fire",
    description: "10% chance to burn the target. Thaws user."
  },
  quash: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Quash",
    pp: 15,
    type: "Dark",
    description: "Forces the target to move last this turn."
  },
  quickattack: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Quick Attack",
    pp: 30,
    type: "Normal",
    description: "Usually goes first."
  },
  quickguard: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Quick Guard",
    pp: 15,
    type: "Fighting",
    description: "Protects allies from priority attacks this turn."
  },
  quiverdance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Quiver Dance",
    pp: 20,
    type: "Bug",
    description: "Raises the user's Sp. Atk, Sp. Def, Speed by 1."
  },
  ragefist: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Rage Fist",
    pp: 10,
    type: "Ghost",
    description: "+50 power for each time user was hit. Max 6 hits."
  },
  ragepowder: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Rage Powder",
    pp: 20,
    type: "Bug",
    description: "The foes' moves target the user on the turn used."
  },
  ragingbull: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Raging Bull",
    pp: 10,
    type: "Normal",
    description: "Destroys screens. Type depends on user's form."
  },
  ragingfury: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Raging Fury",
    pp: 10,
    type: "Fire",
    description: "Lasts 2-3 turns. Confuses the user afterwards."
  },
  raindance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Rain Dance",
    pp: 5,
    type: "Water",
    description: "For 5 turns, heavy rain powers Water moves."
  },
  rapidspin: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Rapid Spin",
    pp: 40,
    type: "Normal",
    description: "Free user from hazards/bind/Leech Seed; +1 Spe."
  },
  razorleaf: {
    accuracy: 95,
    basePower: 55,
    category: "Physical",
    name: "Razor Leaf",
    pp: 25,
    type: "Grass",
    description: "High critical hit ratio. Hits adjacent foes."
  },
  razorshell: {
    accuracy: 95,
    basePower: 75,
    category: "Physical",
    name: "Razor Shell",
    pp: 10,
    type: "Water",
    description: "50% chance to lower the target's Defense by 1."
  },
  recover: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Recover",
    pp: 5,
    type: "Normal",
    description: "Heals the user by 50% of its max HP."
  },
  recycle: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Recycle",
    pp: 10,
    type: "Normal",
    description: "Restores the item the user last used."
  },
  reflect: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reflect",
    pp: 20,
    type: "Psychic",
    description: "For 5 turns, physical damage to allies is halved."
  },
  reflecttype: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reflect Type",
    pp: 15,
    type: "Normal",
    description: "User becomes the same type as the target."
  },
  relicsong: {
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Relic Song",
    pp: 10,
    type: "Normal",
    description: "10% chance to sleep foe(s). Meloetta transforms."
  },
  rest: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Rest",
    pp: 5,
    type: "Psychic",
    description: "User sleeps 2 turns and restores HP and status."
  },
  retaliate: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Retaliate",
    pp: 5,
    type: "Normal",
    description: "Power doubles if an ally fainted last turn."
  },
  revelationdance: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Revelation Dance",
    pp: 15,
    type: "Normal",
    description: "Type varies based on the user's primary type."
  },
  reversal: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Reversal",
    pp: 15,
    type: "Fighting",
    description: "More power the less HP the user has left."
  },
  revivalblessing: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Revival Blessing",
    pp: 1,
    type: "Normal",
    description: "Revives a fainted Pokemon to 50% HP."
  },
  risingvoltage: {
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Rising Voltage",
    pp: 20,
    type: "Electric",
    description: "2x power if target is grounded in Electric Terrain."
  },
  roar: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Roar",
    pp: 20,
    type: "Normal",
    description: "Forces the target to switch to a random ally."
  },
  roaroftime: {
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Roar of Time",
    pp: 5,
    type: "Dragon",
    description: "User cannot move next turn."
  },
  rockblast: {
    accuracy: 90,
    basePower: 25,
    category: "Physical",
    name: "Rock Blast",
    pp: 10,
    type: "Rock",
    description: "Hits 2-5 times in one turn."
  },
  rockpolish: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Rock Polish",
    pp: 20,
    type: "Rock",
    description: "Raises the user's Speed by 2."
  },
  rockslide: {
    accuracy: 90,
    basePower: 75,
    category: "Physical",
    name: "Rock Slide",
    pp: 10,
    type: "Rock",
    description: "30% chance to make the foe(s) flinch."
  },
  rocksmash: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Rock Smash",
    pp: 15,
    type: "Fighting",
    description: "50% chance to lower the target's Defense by 1."
  },
  rockthrow: {
    accuracy: 90,
    basePower: 50,
    category: "Physical",
    name: "Rock Throw",
    pp: 15,
    type: "Rock",
    description: "No additional effect."
  },
  rocktomb: {
    accuracy: 95,
    basePower: 60,
    category: "Physical",
    name: "Rock Tomb",
    pp: 15,
    type: "Rock",
    description: "100% chance to lower the target's Speed by 1."
  },
  rockwrecker: {
    accuracy: 90,
    basePower: 150,
    category: "Physical",
    name: "Rock Wrecker",
    pp: 5,
    type: "Rock",
    description: "User cannot move next turn."
  },
  roleplay: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Role Play",
    pp: 10,
    type: "Psychic",
    description: "User replaces its Ability with the target's."
  },
  rollout: {
    accuracy: 90,
    basePower: 30,
    category: "Physical",
    name: "Rollout",
    pp: 20,
    type: "Rock",
    description: "Power doubles with each hit. Repeats for 5 turns."
  },
  roost: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Roost",
    pp: 5,
    type: "Flying",
    description: "Heals 50% HP. Flying-type removed 'til turn ends."
  },
  round: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Round",
    pp: 15,
    type: "Normal",
    description: "Power doubles if others used Round this turn."
  },
  ruination: {
    accuracy: 90,
    basePower: 0,
    category: "Special",
    name: "Ruination",
    pp: 10,
    type: "Dark",
    description: "Does damage equal to 1/2 target's current HP."
  },
  sacredfire: {
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Sacred Fire",
    pp: 5,
    type: "Fire",
    description: "50% chance to burn the target. Thaws user."
  },
  sacredsword: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Sacred Sword",
    pp: 15,
    type: "Fighting",
    description: "Ignores the target's stat stage changes."
  },
  safeguard: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Safeguard",
    pp: 25,
    type: "Normal",
    description: "For 5 turns, protects user's party from status."
  },
  saltcure: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Salt Cure",
    pp: 15,
    type: "Rock",
    description: "Deals 1/8 max HP each turn; 1/4 on Steel, Water."
  },
  sandattack: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Sand Attack",
    pp: 15,
    type: "Ground",
    description: "Lowers the target's accuracy by 1."
  },
  sandtomb: {
    accuracy: 85,
    basePower: 35,
    category: "Physical",
    name: "Sand Tomb",
    pp: 15,
    type: "Ground",
    description: "Traps and damages the target for 4-5 turns."
  },
  sandsearstorm: {
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Sandsear Storm",
    pp: 10,
    type: "Ground",
    description: "20% chance to burn foe(s). Can't miss in rain."
  },
  sandstorm: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sandstorm",
    pp: 10,
    type: "Rock",
    description: "For 5 turns, a sandstorm rages. Rock: 1.5x SpD."
  },
  scald: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Scald",
    pp: 15,
    type: "Water",
    description: "30% chance to burn the target. Thaws target."
  },
  scaleshot: {
    accuracy: 90,
    basePower: 25,
    category: "Physical",
    name: "Scale Shot",
    pp: 20,
    type: "Dragon",
    description: "Hits 2-5 times. User: -1 Def, +1 Spe after last hit."
  },
  scaryface: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Scary Face",
    pp: 10,
    type: "Normal",
    description: "Lowers the target's Speed by 2."
  },
  scorchingsands: {
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Scorching Sands",
    pp: 10,
    type: "Ground",
    description: "30% chance to burn the target. Thaws target."
  },
  scratch: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Scratch",
    pp: 35,
    type: "Normal",
    description: "No additional effect."
  },
  screech: {
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Screech",
    pp: 40,
    type: "Normal",
    description: "Lowers the target's Defense by 2."
  },
  secretsword: {
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Secret Sword",
    pp: 10,
    type: "Fighting",
    description: "Damages target based on Defense, not Sp. Def."
  },
  seedbomb: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Seed Bomb",
    pp: 15,
    type: "Grass",
    description: "No additional effect."
  },
  seedflare: {
    accuracy: 85,
    basePower: 120,
    category: "Special",
    name: "Seed Flare",
    pp: 5,
    type: "Grass",
    description: "40% chance to lower the target's Sp. Def by 2."
  },
  seismictoss: {
    accuracy: 100,
    basePower: 0,
    category: "Physical",
    name: "Seismic Toss",
    pp: 20,
    type: "Fighting",
    description: "Does damage equal to the user's level."
  },
  selfdestruct: {
    accuracy: 100,
    basePower: 200,
    category: "Physical",
    name: "Self-Destruct",
    pp: 5,
    type: "Normal",
    description: "Hits adjacent Pokemon. The user faints."
  },
  shadowball: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Shadow Ball",
    pp: 15,
    type: "Ghost",
    description: "20% chance to lower the target's Sp. Def by 1."
  },
  shadowclaw: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Shadow Claw",
    pp: 15,
    type: "Ghost",
    description: "High critical hit ratio."
  },
  shadowforce: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Shadow Force",
    pp: 5,
    type: "Ghost",
    description: "Disappears turn 1. Hits turn 2. Breaks protection."
  },
  shadowpunch: {
    accuracy: true,
    basePower: 60,
    category: "Physical",
    name: "Shadow Punch",
    pp: 20,
    type: "Ghost",
    description: "This move does not check accuracy."
  },
  shadowsneak: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Shadow Sneak",
    pp: 30,
    type: "Ghost",
    description: "Usually goes first."
  },
  shedtail: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shed Tail",
    pp: 10,
    type: "Normal",
    description: "User takes 1/2 its max HP to pass a substitute."
  },
  sheercold: {
    accuracy: 30,
    basePower: 0,
    category: "Special",
    name: "Sheer Cold",
    pp: 5,
    type: "Ice",
    description: "OHKOs non-Ice targets. Fails if user's lower level."
  },
  shellsidearm: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Shell Side Arm",
    pp: 10,
    type: "Poison",
    description: "20% psn. Physical+contact if it would be stronger."
  },
  shellsmash: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shell Smash",
    pp: 15,
    type: "Normal",
    description: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2."
  },
  shelter: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shelter",
    pp: 10,
    type: "Steel",
    description: "Raises the user's Defense by 2."
  },
  shiftgear: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shift Gear",
    pp: 10,
    type: "Steel",
    description: "Raises the user's Speed by 2 and Attack by 1."
  },
  shockwave: {
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "Shock Wave",
    pp: 20,
    type: "Electric",
    description: "This move does not check accuracy."
  },
  shoreup: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shore Up",
    pp: 5,
    type: "Ground",
    description: "User restores 1/2 its max HP; 2/3 in Sandstorm."
  },
  silktrap: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Silk Trap",
    pp: 10,
    type: "Bug",
    description: "Protects from damaging attacks. Contact: -1 Spe."
  },
  simplebeam: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Simple Beam",
    pp: 15,
    type: "Normal",
    description: "The target's Ability becomes Simple."
  },
  sing: {
    accuracy: 55,
    basePower: 0,
    category: "Status",
    name: "Sing",
    pp: 15,
    type: "Normal",
    description: "Causes the target to fall asleep."
  },
  sketch: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sketch",
    pp: 1,
    type: "Normal",
    description: "Permanently copies the last move target used."
  },
  skillswap: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Skill Swap",
    pp: 10,
    type: "Psychic",
    description: "The user and the target trade Abilities."
  },
  skittersmack: {
    accuracy: 90,
    basePower: 70,
    category: "Physical",
    name: "Skitter Smack",
    pp: 10,
    type: "Bug",
    description: "100% chance to lower target's Sp. Atk by 1."
  },
  skyattack: {
    accuracy: 90,
    basePower: 140,
    category: "Physical",
    name: "Sky Attack",
    pp: 5,
    type: "Flying",
    description: "Charges, then hits turn 2. 30% flinch. High crit."
  },
  slackoff: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Slack Off",
    pp: 5,
    type: "Normal",
    description: "Heals the user by 50% of its max HP."
  },
  slam: {
    accuracy: 75,
    basePower: 80,
    category: "Physical",
    name: "Slam",
    pp: 20,
    type: "Normal",
    description: "No additional effect."
  },
  slash: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Slash",
    pp: 20,
    type: "Normal",
    description: "High critical hit ratio."
  },
  sleeppowder: {
    accuracy: 75,
    basePower: 0,
    category: "Status",
    name: "Sleep Powder",
    pp: 15,
    type: "Grass",
    description: "Causes the target to fall asleep."
  },
  sleeptalk: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sleep Talk",
    pp: 10,
    type: "Normal",
    description: "User must be asleep. Uses another known move."
  },
  sludge: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Sludge",
    pp: 20,
    type: "Poison",
    description: "30% chance to poison the target."
  },
  sludgebomb: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Sludge Bomb",
    pp: 10,
    type: "Poison",
    description: "30% chance to poison the target."
  },
  sludgewave: {
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Sludge Wave",
    pp: 10,
    type: "Poison",
    description: "10% chance to poison adjacent Pokemon."
  },
  smackdown: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Smack Down",
    pp: 15,
    type: "Rock",
    description: "Removes the target's Ground immunity."
  },
  smartstrike: {
    accuracy: true,
    basePower: 70,
    category: "Physical",
    name: "Smart Strike",
    pp: 10,
    type: "Steel",
    description: "This move does not check accuracy."
  },
  smog: {
    accuracy: 70,
    basePower: 30,
    category: "Special",
    name: "Smog",
    pp: 20,
    type: "Poison",
    description: "40% chance to poison the target."
  },
  smokescreen: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Smokescreen",
    pp: 20,
    type: "Normal",
    description: "Lowers the target's accuracy by 1."
  },
  snarl: {
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "Snarl",
    pp: 15,
    type: "Dark",
    description: "100% chance to lower the foe(s) Sp. Atk by 1."
  },
  snipeshot: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Snipe Shot",
    pp: 15,
    type: "Water",
    description: "High critical hit ratio. Cannot be redirected."
  },
  snore: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Snore",
    pp: 15,
    type: "Normal",
    description: "User must be asleep. 30% chance to flinch target."
  },
  snowscape: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Snowscape",
    pp: 10,
    type: "Ice",
    description: "For 5 turns, snow falls. Ice: 1.5x Def."
  },
  soak: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Soak",
    pp: 20,
    type: "Water",
    description: "Changes the target's type to Water."
  },
  softboiled: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Soft-Boiled",
    pp: 5,
    type: "Normal",
    description: "Heals the user by 50% of its max HP."
  },
  solarbeam: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Solar Beam",
    pp: 10,
    type: "Grass",
    description: "Charges turn 1. Hits turn 2. No charge in sunlight."
  },
  solarblade: {
    accuracy: 100,
    basePower: 125,
    category: "Physical",
    name: "Solar Blade",
    pp: 10,
    type: "Grass",
    description: "Charges turn 1. Hits turn 2. No charge in sunlight."
  },
  spacialrend: {
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Spacial Rend",
    pp: 5,
    type: "Dragon",
    description: "High critical hit ratio."
  },
  spark: {
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Spark",
    pp: 20,
    type: "Electric",
    description: "30% chance to paralyze the target."
  },
  sparklingaria: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Sparkling Aria",
    pp: 10,
    type: "Water",
    description: "The target is cured of its burn."
  },
  speedswap: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Speed Swap",
    pp: 10,
    type: "Psychic",
    description: "Swaps Speed stat with target."
  },
  spicyextract: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Spicy Extract",
    pp: 15,
    type: "Grass",
    description: "Raises target's Atk by 2 and lowers its Def by 2."
  },
  spikes: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Spikes",
    pp: 20,
    type: "Ground",
    description: "Hurts grounded foes on switch-in. Max 3 layers."
  },
  spikyshield: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Spiky Shield",
    pp: 10,
    type: "Grass",
    description: "Protects from moves. Contact: loses 1/8 max HP."
  },
  spinout: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Spin Out",
    pp: 5,
    type: "Steel",
    description: "Lowers the user's Speed by 2."
  },
  spiritbreak: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Spirit Break",
    pp: 15,
    type: "Fairy",
    description: "100% chance to lower the target's Sp. Atk by 1."
  },
  spiritshackle: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Spirit Shackle",
    pp: 10,
    type: "Ghost",
    description: "Prevents the target from switching out."
  },
  spitup: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    name: "Spit Up",
    pp: 10,
    type: "Normal",
    description: "More power with more uses of Stockpile."
  },
  spite: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Spite",
    pp: 10,
    type: "Ghost",
    description: "Lowers the PP of the target's last move by 4."
  },
  splash: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Splash",
    pp: 40,
    type: "Normal",
    description: "No competitive use."
  },
  spore: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Spore",
    pp: 15,
    type: "Grass",
    description: "Causes the target to fall asleep."
  },
  springtidestorm: {
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Springtide Storm",
    pp: 5,
    type: "Fairy",
    description: "30% chance to lower the foe(s) Attack by 1."
  },
  stealthrock: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stealth Rock",
    pp: 20,
    type: "Rock",
    description: "Hurts foes on switch-in. Factors Rock weakness."
  },
  steameruption: {
    accuracy: 95,
    basePower: 110,
    category: "Special",
    name: "Steam Eruption",
    pp: 5,
    type: "Water",
    description: "30% chance to burn the target. Thaws target."
  },
  steelbeam: {
    accuracy: 95,
    basePower: 140,
    category: "Special",
    name: "Steel Beam",
    pp: 5,
    type: "Steel",
    description: "User loses 50% max HP."
  },
  steelroller: {
    accuracy: 100,
    basePower: 130,
    category: "Physical",
    name: "Steel Roller",
    pp: 5,
    type: "Steel",
    description: "Fails if there is no terrain active. Ends the terrain."
  },
  steelwing: {
    accuracy: 90,
    basePower: 70,
    category: "Physical",
    name: "Steel Wing",
    pp: 25,
    type: "Steel",
    description: "10% chance to raise the user's Defense by 1."
  },
  stickyweb: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sticky Web",
    pp: 20,
    type: "Bug",
    description: "Lowers Speed of grounded foes by 1 on switch-in."
  },
  stockpile: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stockpile",
    pp: 20,
    type: "Normal",
    description: "Raises user's Defense, Sp. Def by 1. Max 3 uses."
  },
  stomp: {
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Stomp",
    pp: 20,
    type: "Normal",
    description: "30% chance to make the target flinch."
  },
  stompingtantrum: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Stomping Tantrum",
    pp: 10,
    type: "Ground",
    description: "Power doubles if the user's last move failed."
  },
  stoneaxe: {
    accuracy: 90,
    basePower: 65,
    category: "Physical",
    name: "Stone Axe",
    pp: 15,
    type: "Rock",
    description: "Sets Stealth Rock on the target's side."
  },
  stoneedge: {
    accuracy: 80,
    basePower: 100,
    category: "Physical",
    name: "Stone Edge",
    pp: 5,
    type: "Rock",
    description: "High critical hit ratio."
  },
  storedpower: {
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Stored Power",
    pp: 10,
    type: "Psychic",
    description: " + 20 power for each of the user's stat boosts."
  },
  strangesteam: {
    accuracy: 95,
    basePower: 90,
    category: "Special",
    name: "Strange Steam",
    pp: 10,
    type: "Fairy",
    description: "20% chance to confuse the target."
  },
  strength: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Strength",
    pp: 15,
    type: "Normal",
    description: "No additional effect."
  },
  strengthsap: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Strength Sap",
    pp: 10,
    type: "Grass",
    description: "User heals HP=target's Atk stat. Lowers Atk by 1."
  },
  stringshot: {
    accuracy: 95,
    basePower: 0,
    category: "Status",
    name: "String Shot",
    pp: 40,
    type: "Bug",
    description: "Lowers the foe(s) Speed by 2."
  },
  struggle: {
    accuracy: true,
    basePower: 50,
    category: "Physical",
    name: "Struggle",
    pp: 1,
    type: "Normal",
    description: "User loses 1/4 of its max HP."
  },
  strugglebug: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Struggle Bug",
    pp: 20,
    type: "Bug",
    description: "100% chance to lower the foe(s) Sp. Atk by 1."
  },
  stuffcheeks: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stuff Cheeks",
    pp: 10,
    type: "Normal",
    description: "Must hold Berry to use. User eats Berry, Def +2."
  },
  stunspore: {
    accuracy: 75,
    basePower: 0,
    category: "Status",
    name: "Stun Spore",
    pp: 30,
    type: "Grass",
    description: "Paralyzes the target."
  },
  substitute: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Substitute",
    pp: 10,
    type: "Normal",
    description: "User takes 1/4 its max HP to put in a substitute."
  },
  suckerpunch: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Sucker Punch",
    pp: 5,
    type: "Dark",
    description: "Usually goes first. Fails if target is not attacking."
  },
  sunnyday: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sunny Day",
    pp: 5,
    type: "Fire",
    description: "For 5 turns, intense sunlight powers Fire moves."
  },
  sunsteelstrike: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Sunsteel Strike",
    pp: 5,
    type: "Steel",
    description: "Ignores the Abilities of other Pokemon."
  },
  superfang: {
    accuracy: 90,
    basePower: 0,
    category: "Physical",
    name: "Super Fang",
    pp: 10,
    type: "Normal",
    description: "Does damage equal to 1/2 target's current HP."
  },
  supercellslam: {
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Supercell Slam",
    pp: 15,
    type: "Electric",
    description: "User is hurt by 50% of its max HP if it misses."
  },
  superpower: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Superpower",
    pp: 5,
    type: "Fighting",
    description: "Lowers the user's Attack and Defense by 1."
  },
  supersonic: {
    accuracy: 55,
    basePower: 0,
    category: "Status",
    name: "Supersonic",
    pp: 20,
    type: "Normal",
    description: "Causes the target to become confused."
  },
  surf: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Surf",
    pp: 15,
    type: "Water",
    description: "Hits adjacent Pokemon. Double damage on Dive."
  },
  surgingstrikes: {
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Surging Strikes",
    pp: 5,
    type: "Water",
    description: "Always results in a critical hit. Hits 3 times."
  },
  swagger: {
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Swagger",
    pp: 15,
    type: "Normal",
    description: "Raises the target's Attack by 2 and confuses it."
  },
  swallow: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Swallow",
    pp: 10,
    type: "Normal",
    description: "Heals the user based on uses of Stockpile."
  },
  sweetkiss: {
    accuracy: 75,
    basePower: 0,
    category: "Status",
    name: "Sweet Kiss",
    pp: 10,
    type: "Fairy",
    description: "Causes the target to become confused."
  },
  sweetscent: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Sweet Scent",
    pp: 20,
    type: "Normal",
    description: "Lowers the foe(s) evasiveness by 2."
  },
  swift: {
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "Swift",
    pp: 20,
    type: "Normal",
    description: "This move does not check accuracy. Hits foes."
  },
  switcheroo: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Switcheroo",
    pp: 10,
    type: "Dark",
    description: "User switches its held item with the target's."
  },
  swordsdance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Swords Dance",
    pp: 20,
    type: "Normal",
    description: "Raises the user's Attack by 2."
  },
  synthesis: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Synthesis",
    pp: 5,
    type: "Grass",
    description: "Heals the user by a weather-dependent amount."
  },
  syrupbomb: {
    accuracy: 85,
    basePower: 60,
    category: "Special",
    name: "Syrup Bomb",
    pp: 10,
    type: "Grass",
    description: "Target's Speed is lowered by 1 stage for 3 turns."
  },
  tackle: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Tackle",
    pp: 35,
    type: "Normal",
    description: "No additional effect."
  },
  tachyoncutter: {
    accuracy: true,
    basePower: 50,
    category: "Special",
    name: "Tachyon Cutter",
    pp: 10,
    type: "Steel",
    description: "Hits twice. This move does not check accuracy."
  },
  tailglow: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Tail Glow",
    pp: 20,
    type: "Bug",
    description: "Raises the user's Sp. Atk by 3."
  },
  tailslap: {
    accuracy: 85,
    basePower: 25,
    category: "Physical",
    name: "Tail Slap",
    pp: 10,
    type: "Normal",
    description: "Hits 2-5 times in one turn."
  },
  tailwhip: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Tail Whip",
    pp: 30,
    type: "Normal",
    description: "Lowers the foe(s) Defense by 1."
  },
  tailwind: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Tailwind",
    pp: 15,
    type: "Flying",
    description: "For 4 turns, allies' Speed is doubled."
  },
  takedown: {
    accuracy: 85,
    basePower: 90,
    category: "Physical",
    name: "Take Down",
    pp: 20,
    type: "Normal",
    description: "Has 1/4 recoil."
  },
  takeheart: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Take Heart",
    pp: 15,
    type: "Psychic",
    description: "Cures user's status, raises Sp. Atk, Sp. Def by 1."
  },
  tarshot: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Tar Shot",
    pp: 15,
    type: "Rock",
    description: "Target gets -1 Spe and becomes weaker to Fire."
  },
  taunt: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Taunt",
    pp: 20,
    type: "Dark",
    description: "Target can't use status moves its next 3 turns."
  },
  tearfullook: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Tearful Look",
    pp: 20,
    type: "Normal",
    description: "Lowers the target's Attack and Sp. Atk by 1."
  },
  teatime: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Teatime",
    pp: 10,
    type: "Normal",
    description: "All active Pokemon consume held Berries."
  },
  teeterdance: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Teeter Dance",
    pp: 20,
    type: "Normal",
    description: "Confuses adjacent Pokemon."
  },
  teleport: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Teleport",
    pp: 20,
    type: "Psychic",
    description: "User switches out."
  },
  temperflare: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Temper Flare",
    pp: 10,
    type: "Fire",
    description: "Power doubles if the user's last move failed."
  },
  terablast: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Tera Blast",
    pp: 10,
    type: "Normal",
    description: "If Terastallized: Phys. if Atk > SpA, type = Tera."
  },
  terastarstorm: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Tera Starstorm",
    pp: 5,
    type: "Normal",
    description: "Terapagos-Stellar: Stellar type, hits both foes."
  },
  terrainpulse: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Terrain Pulse",
    pp: 10,
    type: "Normal",
    description: "User on terrain: power doubles, type varies."
  },
  thief: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Thief",
    pp: 25,
    type: "Dark",
    description: "If the user has no item, it steals the target's."
  },
  thrash: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Thrash",
    pp: 10,
    type: "Normal",
    description: "Lasts 2-3 turns. Confuses the user afterwards."
  },
  throatchop: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Throat Chop",
    pp: 15,
    type: "Dark",
    description: "For 2 turns, the target cannot use sound moves."
  },
  thunder: {
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Thunder",
    pp: 10,
    type: "Electric",
    description: "30% chance to paralyze. Can't miss in rain."
  },
  thundercage: {
    accuracy: 90,
    basePower: 80,
    category: "Special",
    name: "Thunder Cage",
    pp: 15,
    type: "Electric",
    description: "Traps and damages the target for 4-5 turns."
  },
  thunderfang: {
    accuracy: 95,
    basePower: 65,
    category: "Physical",
    name: "Thunder Fang",
    pp: 15,
    type: "Electric",
    description: "10% chance to paralyze. 10% chance to flinch."
  },
  thunderpunch: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Thunder Punch",
    pp: 15,
    type: "Electric",
    description: "10% chance to paralyze the target."
  },
  thundershock: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Thunder Shock",
    pp: 30,
    type: "Electric",
    description: "10% chance to paralyze the target."
  },
  thunderwave: {
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Thunder Wave",
    pp: 20,
    type: "Electric",
    description: "Paralyzes the target."
  },
  thunderbolt: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Thunderbolt",
    pp: 15,
    type: "Electric",
    description: "10% chance to paralyze the target."
  },
  thunderclap: {
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Thunderclap",
    pp: 5,
    type: "Electric",
    description: "Usually goes first. Fails if target is not attacking."
  },
  thunderouskick: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Thunderous Kick",
    pp: 10,
    type: "Fighting",
    description: "100% chance to lower the target's Defense by 1."
  },
  tickle: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Tickle",
    pp: 20,
    type: "Normal",
    description: "Lowers the target's Attack and Defense by 1."
  },
  tidyup: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Tidy Up",
    pp: 10,
    type: "Normal",
    description: "User +1 Atk, Spe. Clears all substitutes/hazards."
  },
  topsyturvy: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Topsy-Turvy",
    pp: 20,
    type: "Dark",
    description: "Inverts the target's stat stages."
  },
  torchsong: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Torch Song",
    pp: 10,
    type: "Fire",
    description: "100% chance to raise the user's Sp. Atk by 1."
  },
  torment: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Torment",
    pp: 15,
    type: "Dark",
    description: "Target can't select the same move twice in a row."
  },
  toxic: {
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Toxic",
    pp: 10,
    type: "Poison",
    description: "Badly poisons the target. Poison types can't miss."
  },
  toxicspikes: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Toxic Spikes",
    pp: 20,
    type: "Poison",
    description: "Poisons grounded foes on switch-in. Max 2 layers."
  },
  toxicthread: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Toxic Thread",
    pp: 20,
    type: "Poison",
    description: "Lowers the target's Speed by 1 and poisons it."
  },
  trailblaze: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Trailblaze",
    pp: 20,
    type: "Grass",
    description: "100% chance to raise the user's Speed by 1."
  },
  transform: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Transform",
    pp: 10,
    type: "Normal",
    description: "Copies target's stats, moves, types, and Ability."
  },
  triattack: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Tri Attack",
    pp: 10,
    type: "Normal",
    description: "20% chance to paralyze or burn or freeze target."
  },
  trick: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Trick",
    pp: 10,
    type: "Psychic",
    description: "User switches its held item with the target's."
  },
  trickroom: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Trick Room",
    pp: 5,
    type: "Psychic",
    description: "Goes last. For 5 turns, turn order is reversed."
  },
  triplearrows: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Triple Arrows",
    pp: 10,
    type: "Fighting",
    description: "High crit. Target: 50% -1 Defense, 30% flinch."
  },
  tripleaxel: {
    accuracy: 90,
    basePower: 20,
    category: "Physical",
    name: "Triple Axel",
    pp: 10,
    type: "Ice",
    description: "Hits 3 times. Each hit can miss, but power rises."
  },
  tripledive: {
    accuracy: 95,
    basePower: 30,
    category: "Physical",
    name: "Triple Dive",
    pp: 10,
    type: "Water",
    description: "Hits 3 times."
  },
  triplekick: {
    accuracy: 90,
    basePower: 10,
    category: "Physical",
    name: "Triple Kick",
    pp: 10,
    type: "Fighting",
    description: "Hits 3 times. Each hit can miss, but power rises."
  },
  tropkick: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Trop Kick",
    pp: 15,
    type: "Grass",
    description: "100% chance to lower the target's Attack by 1."
  },
  twinbeam: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Twin Beam",
    pp: 10,
    type: "Psychic",
    description: "Hits 2 times in one turn."
  },
  twister: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Twister",
    pp: 20,
    type: "Dragon",
    description: "20% chance to make the foe(s) flinch."
  },
  uturn: {
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "U-turn",
    pp: 20,
    type: "Bug",
    description: "User switches out after damaging the target."
  },
  upperhand: {
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Upper Hand",
    pp: 15,
    type: "Fighting",
    description: "100% flinch. Fails unless target using priority."
  },
  uproar: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Uproar",
    pp: 10,
    type: "Normal",
    description: "Lasts 3 turns. Active Pokemon cannot fall asleep."
  },
  vacuumwave: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Vacuum Wave",
    pp: 30,
    type: "Fighting",
    description: "Usually goes first."
  },
  venoshock: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Venoshock",
    pp: 10,
    type: "Poison",
    description: "Power doubles if the target is poisoned."
  },
  victorydance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Victory Dance",
    pp: 10,
    type: "Fighting",
    description: "Raises the user's Attack, Defense, Speed by 1."
  },
  vinewhip: {
    accuracy: 100,
    basePower: 45,
    category: "Physical",
    name: "Vine Whip",
    pp: 25,
    type: "Grass",
    description: "No additional effect."
  },
  visegrip: {
    accuracy: 100,
    basePower: 55,
    category: "Physical",
    name: "Vise Grip",
    pp: 30,
    type: "Normal",
    description: "No additional effect."
  },
  voltswitch: {
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Volt Switch",
    pp: 20,
    type: "Electric",
    description: "User switches out after damaging the target."
  },
  volttackle: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Volt Tackle",
    pp: 15,
    type: "Electric",
    description: "Has 33% recoil. 10% chance to paralyze target."
  },
  watergun: {
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Water Gun",
    pp: 25,
    type: "Water",
    description: "No additional effect."
  },
  waterpledge: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Water Pledge",
    pp: 10,
    type: "Water",
    description: "Use with Grass or Fire Pledge for added effect."
  },
  waterpulse: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Water Pulse",
    pp: 20,
    type: "Water",
    description: "20% chance to confuse the target."
  },
  watershuriken: {
    accuracy: 100,
    basePower: 15,
    category: "Special",
    name: "Water Shuriken",
    pp: 20,
    type: "Water",
    description: "Usually goes first. Hits 2-5 times in one turn."
  },
  waterspout: {
    accuracy: 100,
    basePower: 150,
    category: "Special",
    name: "Water Spout",
    pp: 5,
    type: "Water",
    description: "Less power as user's HP decreases. Hits foe(s)."
  },
  waterfall: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Waterfall",
    pp: 15,
    type: "Water",
    description: "20% chance to make the target flinch."
  },
  wavecrash: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Wave Crash",
    pp: 10,
    type: "Water",
    description: "Has 33% recoil."
  },
  weatherball: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Weather Ball",
    pp: 10,
    type: "Normal",
    description: "Power doubles and type varies in each weather."
  },
  whirlpool: {
    accuracy: 85,
    basePower: 35,
    category: "Special",
    name: "Whirlpool",
    pp: 15,
    type: "Water",
    description: "Traps and damages the target for 4-5 turns."
  },
  whirlwind: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Whirlwind",
    pp: 20,
    type: "Normal",
    description: "Forces the target to switch to a random ally."
  },
  wickedblow: {
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Wicked Blow",
    pp: 5,
    type: "Dark",
    description: "Always results in a critical hit."
  },
  wideguard: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Wide Guard",
    pp: 10,
    type: "Rock",
    description: "Protects allies from multi-target moves this turn."
  },
  wildcharge: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Wild Charge",
    pp: 15,
    type: "Electric",
    description: "Has 1/4 recoil."
  },
  wildboltstorm: {
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Wildbolt Storm",
    pp: 10,
    type: "Electric",
    description: "20% chance to paralyze foe(s). Rain: can't miss."
  },
  willowisp: {
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Will-O-Wisp",
    pp: 15,
    type: "Fire",
    description: "Burns the target."
  },
  wingattack: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Wing Attack",
    pp: 35,
    type: "Flying",
    description: "No additional effect."
  },
  wish: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Wish",
    pp: 10,
    type: "Normal",
    description: "Next turn, 50% of the user's max HP is restored."
  },
  withdraw: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Withdraw",
    pp: 40,
    type: "Water",
    description: "Raises the user's Defense by 1."
  },
  wonderroom: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Wonder Room",
    pp: 10,
    type: "Psychic",
    description: "For 5 turns, all Defense and Sp. Def stats switch."
  },
  woodhammer: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Wood Hammer",
    pp: 15,
    type: "Grass",
    description: "Has 33% recoil."
  },
  workup: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Work Up",
    pp: 30,
    type: "Normal",
    description: "Raises the user's Attack and Sp. Atk by 1."
  },
  worryseed: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Worry Seed",
    pp: 10,
    type: "Grass",
    description: "The target's Ability becomes Insomnia."
  },
  wrap: {
    accuracy: 90,
    basePower: 15,
    category: "Physical",
    name: "Wrap",
    pp: 20,
    type: "Normal",
    description: "Traps and damages the target for 4-5 turns."
  },
  xscissor: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "X-Scissor",
    pp: 15,
    type: "Bug",
    description: "No additional effect."
  },
  yawn: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Yawn",
    pp: 10,
    type: "Normal",
    description: "Puts the target to sleep after 1 turn."
  },
  zapcannon: {
    accuracy: 50,
    basePower: 120,
    category: "Special",
    name: "Zap Cannon",
    pp: 5,
    type: "Electric",
    description: "100% chance to paralyze the target."
  },
  zenheadbutt: {
    accuracy: 90,
    basePower: 80,
    category: "Physical",
    name: "Zen Headbutt",
    pp: 15,
    type: "Psychic",
    description: "20% chance to make the target flinch."
  },
  zingzap: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Zing Zap",
    pp: 10,
    type: "Electric",
    description: "30% chance to make the target flinch."
  }
}
