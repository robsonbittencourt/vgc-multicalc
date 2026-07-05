import { toID } from "@data/id"

export type ItemName = (typeof ITEM_DETAILS)[keyof typeof ITEM_DETAILS]["name"]

export interface ItemData {
  group: "Meta" | "Items" | "Pokémon specific items" | "Useless items"
  name: string
  description: string
  sprite: string
  isMegaStone?: boolean
  megaStone?: Record<string, string>
  isBerry?: boolean
  naturalGift?: { basePower: number; type: string }
}

export function getItemData(name: string): ItemData | undefined {
  return (ITEM_DETAILS as Record<string, ItemData>)[toID(name)]
}

export const ITEM_DETAILS = {
  none: {
    group: "Meta",
    name: "(none)",
    description: "No Item",
    sprite: "question"
  },
  abilityshield: {
    group: "Meta",
    name: "Ability Shield",
    description: "Holder's Ability cannot be changed, suppressed, or ignored by any effect.",
    sprite: "ability-shield"
  },
  absorbbulb: {
    group: "Items",
    name: "Absorb Bulb",
    description: "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack. Single use.",
    sprite: "absorb-bulb"
  },
  adamantcrystal: {
    group: "Pokémon specific items",
    name: "Adamant Crystal",
    description: "If held by a Dialga, its Steel and Dragon-type attacks have 1.2x power.",
    sprite: "adamant-crystal"
  },
  adamantorb: {
    group: "Pokémon specific items",
    name: "Adamant Orb",
    description: "If held by a Dialga, its Steel and Dragon-type attacks have 1.2x power.",
    sprite: "adamant-orb"
  },
  adrenalineorb: {
    group: "Items",
    name: "Adrenaline Orb",
    description: "Raises holder's Speed by 1 stage if it gets affected by Intimidate. Single use.",
    sprite: "adrenaline-orb"
  },
  aguavberry: {
    group: "Items",
    name: "Aguav Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
    sprite: "aguav-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Dragon"
    }
  },
  airballoon: {
    group: "Items",
    name: "Air Balloon",
    description: "Holder is immune to Ground-type attacks. Pops when holder is hit.",
    sprite: "air-balloon"
  },
  apicotberry: {
    group: "Items",
    name: "Apicot Berry",
    description: "Raises holder's Sp. Def by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "apicot-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Ground"
    }
  },
  aspearberry: {
    group: "Useless items",
    name: "Aspear Berry",
    description: "Holder is cured if it is frozen. Single use.",
    sprite: "aspear-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ice"
    }
  },
  assaultvest: {
    group: "Meta",
    name: "Assault Vest",
    description: "Holder's Sp. Def is 1.5x, but it can only select damaging moves.",
    sprite: "assault-vest"
  },
  babiriberry: {
    group: "Items",
    name: "Babiri Berry",
    description: "Halves damage taken from a supereffective Steel-type attack. Single use.",
    sprite: "babiri-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Steel"
    }
  },
  bigroot: {
    group: "Useless items",
    name: "Big Root",
    description: "Holder gains 1.3x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap.",
    sprite: "big-root"
  },
  bindingband: {
    group: "Useless items",
    name: "Binding Band",
    description: "Holder's partial-trapping moves deal 1/6 max HP per turn instead of 1/8.",
    sprite: "binding-band"
  },
  blackbelt: {
    group: "Items",
    name: "Black Belt",
    description: "Holder's Fighting-type attacks have 1.2x power.",
    sprite: "black-belt"
  },
  blacksludge: {
    group: "Items",
    name: "Black Sludge",
    description: "Each turn, if holder is a Poison type, restores 1/16 max HP; loses 1/8 if not.",
    sprite: "black-sludge"
  },
  blackglasses: {
    group: "Items",
    name: "Black Glasses",
    description: "Holder's Dark-type attacks have 1.2x power.",
    sprite: "black-glasses"
  },
  blunderpolicy: {
    group: "Items",
    name: "Blunder Policy",
    description: "If the holder misses due to accuracy, its Speed is raised by 2 stages. Single use.",
    sprite: "blunder-policy"
  },
  boosterenergy: {
    group: "Meta",
    name: "Booster Energy",
    description: "Activates the Protosynthesis or Quark Drive Abilities. Single use.",
    sprite: "booster-energy"
  },
  brightpowder: {
    group: "Items",
    name: "Bright Powder",
    description: "The accuracy of attacks against the holder is 0.9x.",
    sprite: "bright-powder"
  },
  cellbattery: {
    group: "Items",
    name: "Cell Battery",
    description: "Raises holder's Attack by 1 if hit by an Electric-type attack. Single use.",
    sprite: "cell-battery"
  },
  charcoal: {
    group: "Items",
    name: "Charcoal",
    description: "Holder's Fire-type attacks have 1.2x power.",
    sprite: "charcoal"
  },
  chartiberry: {
    group: "Items",
    name: "Charti Berry",
    description: "Halves damage taken from a supereffective Rock-type attack. Single use.",
    sprite: "charti-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Rock"
    }
  },
  cheriberry: {
    group: "Useless items",
    name: "Cheri Berry",
    description: "Holder cures itself if it is paralyzed. Single use.",
    sprite: "cheri-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Fire"
    }
  },
  chestoberry: {
    group: "Items",
    name: "Chesto Berry",
    description: "Holder wakes up if it is asleep. Single use.",
    sprite: "chesto-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Water"
    }
  },
  chilanberry: {
    group: "Items",
    name: "Chilan Berry",
    description: "Halves damage taken from a Normal-type attack. Single use.",
    sprite: "chilan-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Normal"
    }
  },
  choiceband: {
    group: "Meta",
    name: "Choice Band",
    description: "Holder's Attack is 1.5x, but it can only select the first move it executes.",
    sprite: "choice-band"
  },
  choicescarf: {
    group: "Meta",
    name: "Choice Scarf",
    description: "Holder's Speed is 1.5x, but it can only select the first move it executes.",
    sprite: "choice-scarf"
  },
  choicespecs: {
    group: "Meta",
    name: "Choice Specs",
    description: "Holder's Sp. Atk is 1.5x, but it can only select the first move it executes.",
    sprite: "choice-specs"
  },
  chopleberry: {
    group: "Items",
    name: "Chople Berry",
    description: "Halves damage taken from a supereffective Fighting-type attack. Single use.",
    sprite: "chople-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Fighting"
    }
  },
  clearamulet: {
    group: "Meta",
    name: "Clear Amulet",
    description: "Prevents other Pokemon from lowering the holder's stat stages.",
    sprite: "clear-amulet"
  },
  cobaberry: {
    group: "Items",
    name: "Coba Berry",
    description: "Halves damage taken from a supereffective Flying-type attack. Single use.",
    sprite: "coba-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Flying"
    }
  },
  colburberry: {
    group: "Items",
    name: "Colbur Berry",
    description: "Halves damage taken from a supereffective Dark-type attack. Single use.",
    sprite: "colbur-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Dark"
    }
  },
  cornerstonemask: {
    group: "Pokémon specific items",
    name: "Cornerstone Mask",
    description: "Ogerpon-Cornerstone: 1.2x power attacks; Terastallize to gain Embody Aspect.",
    sprite: "cornerstone-mask"
  },
  covertcloak: {
    group: "Meta",
    name: "Covert Cloak",
    description: "Holder is not affected by the secondary effect of another Pokemon's attack.",
    sprite: "covert-cloak"
  },
  custapberry: {
    group: "Items",
    name: "Custap Berry",
    description: "Holder moves first in its priority bracket when at 1/4 max HP or less. Single use.",
    sprite: "custap-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Ghost"
    }
  },
  damprock: {
    group: "Items",
    name: "Damp Rock",
    description: "Holder's use of Rain Dance lasts 8 turns instead of 5.",
    sprite: "damp-rock"
  },
  destinyknot: {
    group: "Useless items",
    name: "Destiny Knot",
    description: "If holder becomes infatuated, the other Pokemon also becomes infatuated.",
    sprite: "destiny-knot"
  },
  dracoplate: {
    group: "Items",
    name: "Draco Plate",
    description: "Holder's Dragon-type attacks have 1.2x power. Judgment is Dragon type.",
    sprite: "draco-plate"
  },
  dragonfang: {
    group: "Items",
    name: "Dragon Fang",
    description: "Holder's Dragon-type attacks have 1.2x power.",
    sprite: "dragon-fang"
  },
  dreadplate: {
    group: "Items",
    name: "Dread Plate",
    description: "Holder's Dark-type attacks have 1.2x power. Judgment is Dark type.",
    sprite: "dread-plate"
  },
  earthplate: {
    group: "Items",
    name: "Earth Plate",
    description: "Holder's Ground-type attacks have 1.2x power. Judgment is Ground type.",
    sprite: "earth-plate"
  },
  ejectbutton: {
    group: "Items",
    name: "Eject Button",
    description: "If holder survives a hit, it immediately switches out to a chosen ally. Single use.",
    sprite: "eject-button"
  },
  ejectpack: {
    group: "Items",
    name: "Eject Pack",
    description: "If the holder's stat stages are lowered, it switches to a chosen ally. Single use.",
    sprite: "eject-pack"
  },
  electricseed: {
    group: "Meta",
    name: "Electric Seed",
    description: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use.",
    sprite: "electric-seed"
  },
  enigmaberry: {
    group: "Useless items",
    name: "Enigma Berry",
    description: "Restores 1/4 max HP after holder is hit by a supereffective move. Single use.",
    sprite: "enigma-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Bug"
    }
  },
  eviolite: {
    group: "Meta",
    name: "Eviolite",
    description: "If holder's species can evolve, its Defense and Sp. Def are 1.5x.",
    sprite: "eviolite"
  },
  expertbelt: {
    group: "Items",
    name: "Expert Belt",
    description: "Holder's attacks that are super effective against the target do 1.2x damage.",
    sprite: "expert-belt"
  },
  fairyfeather: {
    group: "Items",
    name: "Fairy Feather",
    description: "Holder's Fairy-type attacks have 1.2x power.",
    sprite: "fairy-feather"
  },
  figyberry: {
    group: "Items",
    name: "Figy Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
    sprite: "figy-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Bug"
    }
  },
  fistplate: {
    group: "Items",
    name: "Fist Plate",
    description: "Holder's Fighting-type attacks have 1.2x power. Judgment is Fighting type.",
    sprite: "fist-plate"
  },
  flameorb: {
    group: "Meta",
    name: "Flame Orb",
    description: "At the end of every turn, this item attempts to burn the holder.",
    sprite: "flame-orb"
  },
  flameplate: {
    group: "Items",
    name: "Flame Plate",
    description: "Holder's Fire-type attacks have 1.2x power. Judgment is Fire type.",
    sprite: "flame-plate"
  },
  floatstone: {
    group: "Useless items",
    name: "Float Stone",
    description: "Holder's weight is halved.",
    sprite: "float-stone"
  },
  focusband: {
    group: "Useless items",
    name: "Focus Band",
    description: "Holder has a 10% chance to survive an attack that would KO it with 1 HP.",
    sprite: "focus-band"
  },
  focussash: {
    group: "Meta",
    name: "Focus Sash",
    description: "If holder's HP is full, will survive an attack that would KO it with 1 HP. Single use.",
    sprite: "focus-sash"
  },
  ganlonberry: {
    group: "Items",
    name: "Ganlon Berry",
    description: "Raises holder's Defense by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "ganlon-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Ice"
    }
  },
  grassyseed: {
    group: "Meta",
    name: "Grassy Seed",
    description: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use.",
    sprite: "grassy-seed"
  },
  grepaberry: {
    group: "Items",
    name: "Grepa Berry",
    description: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
    sprite: "grepa-berry",
    isBerry: true,
    naturalGift: {
      basePower: 90,
      type: "Flying"
    }
  },
  gripclaw: {
    group: "Items",
    name: "Grip Claw",
    description: "Holder's partial-trapping moves always last 7 turns.",
    sprite: "grip-claw"
  },
  griseouscore: {
    group: "Pokémon specific items",
    name: "Griseous Core",
    description: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power.",
    sprite: "griseous-core"
  },
  griseousorb: {
    group: "Pokémon specific items",
    name: "Griseous Orb",
    description: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power.",
    sprite: "griseous-orb"
  },
  habanberry: {
    group: "Items",
    name: "Haban Berry",
    description: "Halves damage taken from a supereffective Dragon-type attack. Single use.",
    sprite: "haban-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Dragon"
    }
  },
  hardstone: {
    group: "Items",
    name: "Hard Stone",
    description: "Holder's Rock-type attacks have 1.2x power.",
    sprite: "hard-stone"
  },
  hearthflamemask: {
    group: "Pokémon specific items",
    name: "Hearthflame Mask",
    description: "Ogerpon-Hearthflame: 1.2x power attacks; Terastallize to gain Embody Aspect.",
    sprite: "hearthflame-mask"
  },
  heatrock: {
    group: "Items",
    name: "Heat Rock",
    description: "Holder's use of Sunny Day lasts 8 turns instead of 5.",
    sprite: "heat-rock"
  },
  heavydutyboots: {
    group: "Items",
    name: "Heavy-Duty Boots",
    description: "When switching in, the holder is unaffected by hazards on its side of the field.",
    sprite: "heavy-duty-boots"
  },
  iapapaberry: {
    group: "Items",
    name: "Iapapa Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
    sprite: "iapapa-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Dark"
    }
  },
  icicleplate: {
    group: "Items",
    name: "Icicle Plate",
    description: "Holder's Ice-type attacks have 1.2x power. Judgment is Ice type.",
    sprite: "icicle-plate"
  },
  icyrock: {
    group: "Items",
    name: "Icy Rock",
    description: "Holder's use of Snowscape lasts 8 turns instead of 5.",
    sprite: "icy-rock"
  },
  insectplate: {
    group: "Items",
    name: "Insect Plate",
    description: "Holder's Bug-type attacks have 1.2x power. Judgment is Bug type.",
    sprite: "insect-plate"
  },
  ironball: {
    group: "Useless items",
    name: "Iron Ball",
    description: "Holder is grounded, Speed halved. If Flying type, takes neutral Ground damage.",
    sprite: "iron-ball"
  },
  ironplate: {
    group: "Items",
    name: "Iron Plate",
    description: "Holder's Steel-type attacks have 1.2x power. Judgment is Steel type.",
    sprite: "iron-plate"
  },
  jabocaberry: {
    group: "Useless items",
    name: "Jaboca Berry",
    description: "If holder is hit by a physical move, attacker loses 1/8 of its max HP. Single use.",
    sprite: "jaboca-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Dragon"
    }
  },
  kasibberry: {
    group: "Items",
    name: "Kasib Berry",
    description: "Halves damage taken from a supereffective Ghost-type attack. Single use.",
    sprite: "kasib-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ghost"
    }
  },
  kebiaberry: {
    group: "Items",
    name: "Kebia Berry",
    description: "Halves damage taken from a supereffective Poison-type attack. Single use.",
    sprite: "kebia-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Poison"
    }
  },
  keeberry: {
    group: "Items",
    name: "Kee Berry",
    description: "Raises holder's Defense by 1 stage after it is hit by a physical attack. Single use.",
    sprite: "kee-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Fairy"
    }
  },
  kelpsyberry: {
    group: "Items",
    name: "Kelpsy Berry",
    description: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
    sprite: "kelpsy-berry",
    isBerry: true,
    naturalGift: {
      basePower: 90,
      type: "Fighting"
    }
  },
  kingsrock: {
    group: "Items",
    name: "King's Rock",
    description: "Holder's attacks without a chance to flinch gain a 10% chance to flinch.",
    sprite: "king's-rock"
  },
  laggingtail: {
    group: "Items",
    name: "Lagging Tail",
    description: "Holder moves last in its priority bracket.",
    sprite: "lagging-tail"
  },
  lansatberry: {
    group: "Items",
    name: "Lansat Berry",
    description: "Holder gains the Focus Energy effect when at 1/4 max HP or less. Single use.",
    sprite: "lansat-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Flying"
    }
  },
  leftovers: {
    group: "Meta",
    name: "Leftovers",
    description: "At the end of every turn, holder restores 1/16 of its max HP.",
    sprite: "leftovers"
  },
  leppaberry: {
    group: "Items",
    name: "Leppa Berry",
    description: "Restores 10 PP to the first of the holder's moves to reach 0 PP. Single use.",
    sprite: "leppa-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Fighting"
    }
  },
  liechiberry: {
    group: "Items",
    name: "Liechi Berry",
    description: "Raises holder's Attack by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "liechi-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Grass"
    }
  },
  lifeorb: {
    group: "Meta",
    name: "Life Orb",
    description: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
    sprite: "life-orb"
  },
  lightball: {
    group: "Pokémon specific items",
    name: "Light Ball",
    description: "If held by a Pikachu, its Attack and Sp. Atk are doubled.",
    sprite: "light-ball"
  },
  lightclay: {
    group: "Meta",
    name: "Light Clay",
    description: "Holder's use of Aurora Veil, Light Screen, or Reflect lasts 8 turns instead of 5.",
    sprite: "light-clay"
  },
  loadeddice: {
    group: "Items",
    name: "Loaded Dice",
    description: "Holder's moves that hit 2-5 times hit 4-5 times; Population Bomb hits 4-10 times.",
    sprite: "loaded-dice"
  },
  lumberry: {
    group: "Items",
    name: "Lum Berry",
    description: "Holder cures itself if it has a non-volatile status or is confused. Single use.",
    sprite: "lum-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Flying"
    }
  },
  luminousmoss: {
    group: "Items",
    name: "Luminous Moss",
    description: "Raises holder's Sp. Def by 1 stage if hit by a Water-type attack. Single use.",
    sprite: "luminous-moss"
  },
  lustrousglobe: {
    group: "Pokémon specific items",
    name: "Lustrous Globe",
    description: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power.",
    sprite: "lustrous-globe"
  },
  lustrousorb: {
    group: "Pokémon specific items",
    name: "Lustrous Orb",
    description: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power.",
    sprite: "lustrous-orb"
  },
  magnet: {
    group: "Items",
    name: "Magnet",
    description: "Holder's Electric-type attacks have 1.2x power.",
    sprite: "magnet"
  },
  magoberry: {
    group: "Items",
    name: "Mago Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
    sprite: "mago-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ghost"
    }
  },
  marangaberry: {
    group: "Items",
    name: "Maranga Berry",
    description: "Raises holder's Sp. Def by 1 stage after it is hit by a special attack. Single use.",
    sprite: "maranga-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Dark"
    }
  },
  meadowplate: {
    group: "Items",
    name: "Meadow Plate",
    description: "Holder's Grass-type attacks have 1.2x power. Judgment is Grass type.",
    sprite: "meadow-plate"
  },
  mentalherb: {
    group: "Meta",
    name: "Mental Herb",
    description: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment. Single use.",
    sprite: "mental-herb"
  },
  metalcoat: {
    group: "Items",
    name: "Metal Coat",
    description: "Holder's Steel-type attacks have 1.2x power.",
    sprite: "metal-coat"
  },
  metronome: {
    group: "Items",
    name: "Metronome",
    description: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
    sprite: "metronome"
  },
  micleberry: {
    group: "Items",
    name: "Micle Berry",
    description: "Holder's next move has 1.2x accuracy when at 1/4 max HP or less. Single use.",
    sprite: "micle-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Rock"
    }
  },
  mindplate: {
    group: "Items",
    name: "Mind Plate",
    description: "Holder's Psychic-type attacks have 1.2x power. Judgment is Psychic type.",
    sprite: "mind-plate"
  },
  miracleseed: {
    group: "Items",
    name: "Miracle Seed",
    description: "Holder's Grass-type attacks have 1.2x power.",
    sprite: "miracle-seed"
  },
  mirrorherb: {
    group: "Items",
    name: "Mirror Herb",
    description: "When an opposing Pokemon raises a stat stage, the holder copies it. Single use.",
    sprite: "mirror-herb"
  },
  mistyseed: {
    group: "Items",
    name: "Misty Seed",
    description: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use.",
    sprite: "misty-seed"
  },
  muscleband: {
    group: "Items",
    name: "Muscle Band",
    description: "Holder's physical attacks have 1.1x power.",
    sprite: "muscle-band"
  },
  mysticwater: {
    group: "Meta",
    name: "Mystic Water",
    description: "Holder's Water-type attacks have 1.2x power.",
    sprite: "mystic-water"
  },
  nevermeltice: {
    group: "Items",
    name: "Never-Melt Ice",
    description: "Holder's Ice-type attacks have 1.2x power.",
    sprite: "never-melt-ice"
  },
  normalgem: {
    group: "Items",
    name: "Normal Gem",
    description: "Holder's first successful Normal-type attack will have 1.3x power. Single use.",
    sprite: "normal-gem"
  },
  occaberry: {
    group: "Items",
    name: "Occa Berry",
    description: "Halves damage taken from a supereffective Fire-type attack. Single use.",
    sprite: "occa-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Fire"
    }
  },
  oranberry: {
    group: "Useless items",
    name: "Oran Berry",
    description: "Restores 10 HP when at 1/2 max HP or less. Single use.",
    sprite: "oran-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Poison"
    }
  },
  passhoberry: {
    group: "Items",
    name: "Passho Berry",
    description: "Halves damage taken from a supereffective Water-type attack. Single use.",
    sprite: "passho-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Water"
    }
  },
  payapaberry: {
    group: "Items",
    name: "Payapa Berry",
    description: "Halves damage taken from a supereffective Psychic-type attack. Single use.",
    sprite: "payapa-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Psychic"
    }
  },
  pechaberry: {
    group: "Useless items",
    name: "Pecha Berry",
    description: "Holder is cured if it is poisoned. Single use.",
    sprite: "pecha-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Electric"
    }
  },
  persimberry: {
    group: "Useless items",
    name: "Persim Berry",
    description: "Holder is cured if it is confused. Single use.",
    sprite: "persim-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ground"
    }
  },
  petayaberry: {
    group: "Items",
    name: "Petaya Berry",
    description: "Raises holder's Sp. Atk by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "petaya-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Poison"
    }
  },
  pixieplate: {
    group: "Items",
    name: "Pixie Plate",
    description: "Holder's Fairy-type attacks have 1.2x power. Judgment is Fairy type.",
    sprite: "pixie-plate"
  },
  poisonbarb: {
    group: "Items",
    name: "Poison Barb",
    description: "Holder's Poison-type attacks have 1.2x power.",
    sprite: "poison-barb"
  },
  poweranklet: {
    group: "Useless items",
    name: "Power Anklet",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect.",
    sprite: "power-anklet"
  },
  powerband: {
    group: "Useless items",
    name: "Power Band",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect.",
    sprite: "power-band"
  },
  powerbelt: {
    group: "Useless items",
    name: "Power Belt",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect.",
    sprite: "power-belt"
  },
  powerbracer: {
    group: "Useless items",
    name: "Power Bracer",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect.",
    sprite: "power-bracer"
  },
  powerherb: {
    group: "Meta",
    name: "Power Herb",
    description: "Holder's two-turn moves complete in one turn (except Sky Drop). Single use.",
    sprite: "power-herb"
  },
  powerlens: {
    group: "Useless items",
    name: "Power Lens",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect.",
    sprite: "power-lens"
  },
  powerweight: {
    group: "Useless items",
    name: "Power Weight",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect.",
    sprite: "power-weight"
  },
  protectivepads: {
    group: "Items",
    name: "Protective Pads",
    description: "Holder's moves are protected from adverse contact effects, except Pickpocket.",
    sprite: "protective-pads"
  },
  psychicseed: {
    group: "Meta",
    name: "Psychic Seed",
    description: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
    sprite: "psychic-seed"
  },
  punchingglove: {
    group: "Items",
    name: "Punching Glove",
    description: "Holder's punch-based attacks have 1.1x power and do not make contact.",
    sprite: "punching-glove"
  },
  quickclaw: {
    group: "Items",
    name: "Quick Claw",
    description: "Each turn, holder has a 20% chance to move first in its priority bracket.",
    sprite: "quick-claw"
  },
  rawstberry: {
    group: "Useless items",
    name: "Rawst Berry",
    description: "Holder is cured if it is burned. Single use.",
    sprite: "rawst-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Grass"
    }
  },
  razorclaw: {
    group: "Items",
    name: "Razor Claw",
    description: "Holder's critical hit ratio is raised by 1 stage.",
    sprite: "razor-claw"
  },
  razorfang: {
    group: "Items",
    name: "Razor Fang",
    description: "Holder's attacks without a chance to flinch gain a 10% chance to flinch.",
    sprite: "razor-fang"
  },
  redcard: {
    group: "Items",
    name: "Red Card",
    description: "If holder survives a hit, attacker is forced to switch to a random ally. Single use.",
    sprite: "red-card"
  },
  rindoberry: {
    group: "Items",
    name: "Rindo Berry",
    description: "Halves damage taken from a supereffective Grass-type attack. Single use.",
    sprite: "rindo-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Grass"
    }
  },
  ringtarget: {
    group: "Useless items",
    name: "Ring Target",
    description: "The holder's type immunities granted solely by its typing are negated.",
    sprite: "ring-target"
  },
  rockyhelmet: {
    group: "Meta",
    name: "Rocky Helmet",
    description: "If holder is hit by a contact move, the attacker loses 1/6 of its max HP.",
    sprite: "rocky-helmet"
  },
  roomservice: {
    group: "Items",
    name: "Room Service",
    description: "If Trick Room is active, the holder's Speed is lowered by 1 stage. Single use.",
    sprite: "room-service"
  },
  roseliberry: {
    group: "Items",
    name: "Roseli Berry",
    description: "Halves damage taken from a supereffective Fairy-type attack. Single use.",
    sprite: "roseli-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Fairy"
    }
  },
  rowapberry: {
    group: "Useless items",
    name: "Rowap Berry",
    description: "If holder is hit by a special move, attacker loses 1/8 of its max HP. Single use.",
    sprite: "rowap-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Dark"
    }
  },
  rustedshield: {
    group: "Pokémon specific items",
    name: "Rusted Shield",
    description: "If held by a Zamazenta, this item changes its forme to Crowned Shield.",
    sprite: "rusted-shield"
  },
  rustedsword: {
    group: "Pokémon specific items",
    name: "Rusted Sword",
    description: "If held by a Zacian, this item changes its forme to Crowned Sword.",
    sprite: "rusted-sword"
  },
  safetygoggles: {
    group: "Meta",
    name: "Safety Goggles",
    description: "Holder is immune to powder moves and damage from Sandstorm or Hail.",
    sprite: "safety-goggles"
  },
  salacberry: {
    group: "Items",
    name: "Salac Berry",
    description: "Raises holder's Speed by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "salac-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Fighting"
    }
  },
  scopelens: {
    group: "Items",
    name: "Scope Lens",
    description: "Holder's critical hit ratio is raised by 1 stage.",
    sprite: "scope-lens"
  },
  sharpbeak: {
    group: "Items",
    name: "Sharp Beak",
    description: "Holder's Flying-type attacks have 1.2x power.",
    sprite: "sharp-beak"
  },
  shedshell: {
    group: "Items",
    name: "Shed Shell",
    description: "Holder cannot be prevented from choosing to switch out by any effect.",
    sprite: "shed-shell"
  },
  shellbell: {
    group: "Items",
    name: "Shell Bell",
    description: "After an attack, holder gains 1/8 of the damage in HP dealt to other Pokemon.",
    sprite: "shell-bell"
  },
  shucaberry: {
    group: "Items",
    name: "Shuca Berry",
    description: "Halves damage taken from a supereffective Ground-type attack. Single use.",
    sprite: "shuca-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ground"
    }
  },
  silkscarf: {
    group: "Items",
    name: "Silk Scarf",
    description: "Holder's Normal-type attacks have 1.2x power.",
    sprite: "silk-scarf"
  },
  silverpowder: {
    group: "Items",
    name: "Silver Powder",
    description: "Holder's Bug-type attacks have 1.2x power.",
    sprite: "silver-powder"
  },
  sitrusberry: {
    group: "Meta",
    name: "Sitrus Berry",
    description: "Restores 1/4 max HP when at 1/2 max HP or less. Single use.",
    sprite: "sitrus-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Psychic"
    }
  },
  skyplate: {
    group: "Items",
    name: "Sky Plate",
    description: "Holder's Flying-type attacks have 1.2x power. Judgment is Flying type.",
    sprite: "sky-plate"
  },
  smoothrock: {
    group: "Items",
    name: "Smooth Rock",
    description: "Holder's use of Sandstorm lasts 8 turns instead of 5.",
    sprite: "smooth-rock"
  },
  snowball: {
    group: "Items",
    name: "Snowball",
    description: "Raises holder's Attack by 1 if hit by an Ice-type attack. Single use.",
    sprite: "snowball"
  },
  softsand: {
    group: "Items",
    name: "Soft Sand",
    description: "Holder's Ground-type attacks have 1.2x power.",
    sprite: "soft-sand"
  },
  souldew: {
    group: "Pokémon specific items",
    name: "Soul Dew",
    description: "If held by a Latias/Latios, its Dragon- and Psychic-type moves have 1.2x power.",
    sprite: "soul-dew"
  },
  spelltag: {
    group: "Items",
    name: "Spell Tag",
    description: "Holder's Ghost-type attacks have 1.2x power.",
    sprite: "spell-tag"
  },
  splashplate: {
    group: "Items",
    name: "Splash Plate",
    description: "Holder's Water-type attacks have 1.2x power. Judgment is Water type.",
    sprite: "splash-plate"
  },
  spookyplate: {
    group: "Items",
    name: "Spooky Plate",
    description: "Holder's Ghost-type attacks have 1.2x power. Judgment is Ghost type.",
    sprite: "spooky-plate"
  },
  starfberry: {
    group: "Items",
    name: "Starf Berry",
    description: "Raises a random stat by 2 when at 1/4 max HP or less (not acc/eva). Single use.",
    sprite: "starf-berry",
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Psychic"
    }
  },
  stickybarb: {
    group: "Items",
    name: "Sticky Barb",
    description: "Each turn, holder loses 1/8 max HP. An attacker making contact can receive it.",
    sprite: "sticky-barb"
  },
  stoneplate: {
    group: "Items",
    name: "Stone Plate",
    description: "Holder's Rock-type attacks have 1.2x power. Judgment is Rock type.",
    sprite: "stone-plate"
  },
  tangaberry: {
    group: "Items",
    name: "Tanga Berry",
    description: "Halves damage taken from a supereffective Bug-type attack. Single use.",
    sprite: "tanga-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Bug"
    }
  },
  terrainextender: {
    group: "Items",
    name: "Terrain Extender",
    description: "Holder's use of Electric/Grassy/Misty/Psychic Terrain lasts 8 turns instead of 5.",
    sprite: "terrain-extender"
  },
  throatspray: {
    group: "Items",
    name: "Throat Spray",
    description: "Raises holder's Special Attack by 1 stage after it uses a sound move. Single use.",
    sprite: "throat-spray"
  },
  toxicorb: {
    group: "Items",
    name: "Toxic Orb",
    description: "At the end of every turn, this item attempts to badly poison the holder.",
    sprite: "toxic-orb"
  },
  toxicplate: {
    group: "Items",
    name: "Toxic Plate",
    description: "Holder's Poison-type attacks have 1.2x power. Judgment is Poison type.",
    sprite: "toxic-plate"
  },
  aerodactylite: {
    group: "Pokémon specific items",
    name: "Aerodactylite",
    description: "If held by an Aerodactyl, this item allows it to Mega Evolve in battle.",
    sprite: "aerodactylite",
    isMegaStone: true,
    megaStone: {
      Aerodactyl: "Aerodactyl-Mega"
    }
  },
  alakazite: {
    group: "Pokémon specific items",
    name: "Alakazite",
    description: "If held by an Alakazam, this item allows it to Mega Evolve in battle.",
    sprite: "alakazite",
    isMegaStone: true,
    megaStone: {
      Alakazam: "Alakazam-Mega"
    }
  },
  beedrillite: {
    group: "Pokémon specific items",
    name: "Beedrillite",
    description: "If held by a Beedrill, this item allows it to Mega Evolve in battle.",
    sprite: "beedrillite",
    isMegaStone: true,
    megaStone: {
      Beedrill: "Beedrill-Mega"
    }
  },
  blastoisinite: {
    group: "Pokémon specific items",
    name: "Blastoisinite",
    description: "If held by a Blastoise, this item allows it to Mega Evolve in battle.",
    sprite: "blastoisinite",
    isMegaStone: true,
    megaStone: {
      Blastoise: "Blastoise-Mega"
    }
  },
  charizarditex: {
    group: "Pokémon specific items",
    name: "Charizardite X",
    description: "If held by a Charizard, this item allows it to Mega Evolve into Mega Charizard X in battle.",
    sprite: "charizardite-x",
    isMegaStone: true,
    megaStone: {
      Charizard: "Charizard-Mega-X"
    }
  },
  charizarditey: {
    group: "Pokémon specific items",
    name: "Charizardite Y",
    description: "If held by a Charizard, this item allows it to Mega Evolve into Mega Charizard Y in battle.",
    sprite: "charizardite-y",
    isMegaStone: true,
    megaStone: {
      Charizard: "Charizard-Mega-Y"
    }
  },
  chandelurite: {
    group: "Pokémon specific items",
    name: "Chandelurite",
    description: "If held by a Chandelure, this item allows it to Mega Evolve in battle.",
    sprite: "chandelurite",
    isMegaStone: true,
    megaStone: {
      Chandelure: "Chandelure-Mega"
    }
  },
  chimechite: {
    group: "Pokémon specific items",
    name: "Chimechite",
    description: "If held by a Chimecho, this item allows it to Mega Evolve in battle.",
    sprite: "chimechite",
    isMegaStone: true,
    megaStone: {
      Chimecho: "Chimecho-Mega"
    }
  },
  clefablite: {
    group: "Pokémon specific items",
    name: "Clefablite",
    description: "If held by a Clefable, this item allows it to Mega Evolve in battle.",
    sprite: "clefablite",
    isMegaStone: true,
    megaStone: {
      Clefable: "Clefable-Mega"
    }
  },
  chesnaughtite: {
    group: "Pokémon specific items",
    name: "Chesnaughtite",
    description: "If held by a Chesnaught, this item allows it to Mega Evolve in battle.",
    sprite: "chesnaughtite",
    isMegaStone: true,
    megaStone: {
      Chesnaught: "Chesnaught-Mega"
    }
  },
  gengarite: {
    group: "Pokémon specific items",
    name: "Gengarite",
    description: "If held by a Gengar, this item allows it to Mega Evolve in battle.",
    sprite: "gengarite",
    isMegaStone: true,
    megaStone: {
      Gengar: "Gengar-Mega"
    }
  },
  pidgeotite: {
    group: "Pokémon specific items",
    name: "Pidgeotite",
    description: "If held by a Pidgeot, this item allows it to Mega Evolve in battle.",
    sprite: "pidgeotite",
    isMegaStone: true,
    megaStone: {
      Pidgeot: "Pidgeot-Mega"
    }
  },
  slowbronite: {
    group: "Pokémon specific items",
    name: "Slowbronite",
    description: "If held by a Slowbro, this item allows it to Mega Evolve in battle.",
    sprite: "slowbronite",
    isMegaStone: true,
    megaStone: {
      Slowbro: "Slowbro-Mega"
    }
  },
  tyranitarite: {
    group: "Pokémon specific items",
    name: "Tyranitarite",
    description: "If held by a Tyranitar, this item allows it to Mega Evolve in battle.",
    sprite: "toxic-plate",
    isMegaStone: true,
    megaStone: {
      Tyranitar: "Tyranitar-Mega"
    }
  },
  venusaurite: {
    group: "Pokémon specific items",
    name: "Venusaurite",
    description: "If held by a Venusaur, this item allows it to Mega Evolve in battle.",
    sprite: "venusaurite",
    isMegaStone: true,
    megaStone: {
      Venusaur: "Venusaur-Mega"
    }
  },
  twistedspoon: {
    group: "Items",
    name: "Twisted Spoon",
    description: "Holder's Psychic-type attacks have 1.2x power.",
    sprite: "twisted-spoon"
  },
  utilityumbrella: {
    group: "Items",
    name: "Utility Umbrella",
    description: "The holder ignores rain- and sun-based effects.",
    sprite: "utility-umbrella"
  },
  wacanberry: {
    group: "Items",
    name: "Wacan Berry",
    description: "Halves damage taken from a supereffective Electric-type attack. Single use.",
    sprite: "wacan-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Electric"
    }
  },
  weaknesspolicy: {
    group: "Items",
    name: "Weakness Policy",
    description: "If holder is hit super effectively, raises Attack, Sp. Atk by 2 stages. Single use.",
    sprite: "weakness-policy"
  },
  wellspringmask: {
    group: "Pokémon specific items",
    name: "Wellspring Mask",
    description: "Ogerpon-Wellspring: 1.2x power attacks; Terastallize to gain Embody Aspect.",
    sprite: "wellspring-mask"
  },
  whiteherb: {
    group: "Items",
    name: "White Herb",
    description: "Restores all lowered stat stages to 0 when one is less than 0. Single use.",
    sprite: "white-herb"
  },
  widelens: {
    group: "Items",
    name: "Wide Lens",
    description: "The accuracy of attacks by the holder is 1.1x.",
    sprite: "wide-lens"
  },
  wikiberry: {
    group: "Items",
    name: "Wiki Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
    sprite: "wiki-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Rock"
    }
  },
  wiseglasses: {
    group: "Items",
    name: "Wise Glasses",
    description: "Holder's special attacks have 1.1x power.",
    sprite: "wise-glasses"
  },
  yacheberry: {
    group: "Items",
    name: "Yache Berry",
    description: "Halves damage taken from a supereffective Ice-type attack. Single use.",
    sprite: "yache-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ice"
    }
  },
  zapplate: {
    group: "Items",
    name: "Zap Plate",
    description: "Holder's Electric-type attacks have 1.2x power. Judgment is Electric type.",
    sprite: "zap-plate"
  },
  zoomlens: {
    group: "Items",
    name: "Zoom Lens",
    description: "The accuracy of attacks by the holder is 1.2x if it moves after its target.",
    sprite: "zoom-lens"
  },
  abomasite: {
    group: "Pokémon specific items",
    name: "Abomasite",
    description: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
    sprite: "abomasite",
    isMegaStone: true,
    megaStone: {
      Abomasnow: "Abomasnow-Mega"
    }
  },
  absolite: {
    group: "Pokémon specific items",
    name: "Absolite",
    description: "If held by an Absol, this item allows it to Mega Evolve in battle.",
    sprite: "absolite",
    isMegaStone: true,
    megaStone: {
      Absol: "Absol-Mega"
    }
  },
  aggronite: {
    group: "Pokémon specific items",
    name: "Aggronite",
    description: "If held by an Aggron, this item allows it to Mega Evolve in battle.",
    sprite: "aggronite",
    isMegaStone: true,
    megaStone: {
      Aggron: "Aggron-Mega"
    }
  },
  altarianite: {
    group: "Pokémon specific items",
    name: "Altarianite",
    description: "If held by an Altaria, this item allows it to Mega Evolve in battle.",
    sprite: "altarianite",
    isMegaStone: true,
    megaStone: {
      Altaria: "Altaria-Mega"
    }
  },
  ampharosite: {
    group: "Pokémon specific items",
    name: "Ampharosite",
    description: "If held by an Ampharos, this item allows it to Mega Evolve in battle.",
    sprite: "ampharosite",
    isMegaStone: true,
    megaStone: {
      Ampharos: "Ampharos-Mega"
    }
  },
  audinite: {
    group: "Pokémon specific items",
    name: "Audinite",
    description: "If held by an Audino, this item allows it to Mega Evolve in battle.",
    sprite: "audinite",
    isMegaStone: true,
    megaStone: {
      Audino: "Audino-Mega"
    }
  },
  banettite: {
    group: "Pokémon specific items",
    name: "Banettite",
    description: "If held by a Banette, this item allows it to Mega Evolve in battle.",
    sprite: "banettite",
    isMegaStone: true,
    megaStone: {
      Banette: "Banette-Mega"
    }
  },
  blazikenite: {
    group: "Pokémon specific items",
    name: "Blazikenite",
    description: "If held by a Blaziken, this item allows it to Mega Evolve in battle.",
    sprite: "blazikenite",
    isMegaStone: true,
    megaStone: {
      Blaziken: "Blaziken-Mega"
    }
  },
  cameruptite: {
    group: "Pokémon specific items",
    name: "Cameruptite",
    description: "If held by a Camerupt, this item allows it to Mega Evolve in battle.",
    sprite: "cameruptite",
    isMegaStone: true,
    megaStone: {
      Camerupt: "Camerupt-Mega"
    }
  },
  crabominite: {
    group: "Pokémon specific items",
    name: "Crabominite",
    description: "If held by a Crabominable, this item allows it to Mega Evolve in battle.",
    sprite: "crabominite",
    isMegaStone: true,
    megaStone: {
      Crabominable: "Crabominable-Mega"
    }
  },
  delphoxite: {
    group: "Pokémon specific items",
    name: "Delphoxite",
    description: "If held by a Delphox, this item allows it to Mega Evolve in battle.",
    sprite: "delphoxite",
    isMegaStone: true,
    megaStone: {
      Delphox: "Delphox-Mega"
    }
  },
  dragoninite: {
    group: "Pokémon specific items",
    name: "Dragoninite",
    description: "If held by a Dragonite, this item allows it to Mega Evolve in battle.",
    sprite: "dragoninite",
    isMegaStone: true,
    megaStone: {
      Dragonite: "Dragonite-Mega"
    }
  },
  drampanite: {
    group: "Pokémon specific items",
    name: "Drampanite",
    description: "If held by a Drampa, this item allows it to Mega Evolve in battle.",
    sprite: "drampanite",
    isMegaStone: true,
    megaStone: {
      Drampa: "Drampa-Mega"
    }
  },
  emboarite: {
    group: "Pokémon specific items",
    name: "Emboarite",
    description: "If held by an Emboar, this item allows it to Mega Evolve in battle.",
    sprite: "emboarite",
    isMegaStone: true,
    megaStone: {
      Emboar: "Emboar-Mega"
    }
  },
  excadrite: {
    group: "Pokémon specific items",
    name: "Excadrite",
    description: "If held by an Excadrill, this item allows it to Mega Evolve in battle.",
    sprite: "excadrite",
    isMegaStone: true,
    megaStone: {
      Excadrill: "Excadrill-Mega"
    }
  },
  feraligite: {
    group: "Pokémon specific items",
    name: "Feraligite",
    description: "If held by a Feraligatr, this item allows it to Mega Evolve in battle.",
    sprite: "feraligite",
    isMegaStone: true,
    megaStone: {
      Feraligatr: "Feraligatr-Mega"
    }
  },
  floettite: {
    group: "Pokémon specific items",
    name: "Floettite",
    description: "If held by a Floette-Eternal, this item allows it to Mega Evolve in battle.",
    sprite: "floettite",
    isMegaStone: true,
    megaStone: {
      "Floette-Eternal": "Floette-Mega"
    }
  },
  froslassite: {
    group: "Pokémon specific items",
    name: "Froslassite",
    description: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
    sprite: "froslassite",
    isMegaStone: true,
    megaStone: {
      Froslass: "Froslass-Mega"
    }
  },
  galladite: {
    group: "Pokémon specific items",
    name: "Galladite",
    description: "If held by a Gallade, this item allows it to Mega Evolve in battle.",
    sprite: "galladite",
    isMegaStone: true,
    megaStone: {
      Gallade: "Gallade-Mega"
    }
  },
  garchompite: {
    group: "Pokémon specific items",
    name: "Garchompite",
    description: "If held by a Garchomp, this item allows it to Mega Evolve in battle.",
    sprite: "garchompite",
    isMegaStone: true,
    megaStone: {
      Garchomp: "Garchomp-Mega"
    }
  },
  gardevoirite: {
    group: "Pokémon specific items",
    name: "Gardevoirite",
    description: "If held by a Gardevoir, this item allows it to Mega Evolve in battle.",
    sprite: "gardevoirite",
    isMegaStone: true,
    megaStone: {
      Gardevoir: "Gardevoir-Mega"
    }
  },
  glalitite: {
    group: "Pokémon specific items",
    name: "Glalitite",
    description: "If held by a Glalie, this item allows it to Mega Evolve in battle.",
    sprite: "glalitite",
    isMegaStone: true,
    megaStone: {
      Glalie: "Glalie-Mega"
    }
  },
  glimmoranite: {
    group: "Pokémon specific items",
    name: "Glimmoranite",
    description: "If held by a Glimmora, this item allows it to Mega Evolve in battle.",
    sprite: "glimmoranite",
    isMegaStone: true,
    megaStone: {
      Glimmora: "Glimmora-Mega"
    }
  },
  golurkite: {
    group: "Pokémon specific items",
    name: "Golurkite",
    description: "If held by a Golurk, this item allows it to Mega Evolve in battle.",
    sprite: "golurkite",
    isMegaStone: true,
    megaStone: {
      Golurk: "Golurk-Mega"
    }
  },
  greninjite: {
    group: "Pokémon specific items",
    name: "Greninjite",
    description: "If held by a Greninja, this item allows it to Mega Evolve in battle.",
    sprite: "greninjite",
    isMegaStone: true,
    megaStone: {
      Greninja: "Greninja-Mega"
    }
  },
  gyaradosite: {
    group: "Pokémon specific items",
    name: "Gyaradosite",
    description: "If held by a Gyarados, this item allows it to Mega Evolve in battle.",
    sprite: "gyaradosite",
    isMegaStone: true,
    megaStone: {
      Gyarados: "Gyarados-Mega"
    }
  },
  hawluchanite: {
    group: "Pokémon specific items",
    name: "Hawluchanite",
    description: "If held by a Hawlucha, this item allows it to Mega Evolve in battle.",
    sprite: "hawluchanite",
    isMegaStone: true,
    megaStone: {
      Hawlucha: "Hawlucha-Mega"
    }
  },
  heracronite: {
    group: "Pokémon specific items",
    name: "Heracronite",
    description: "If held by a Heracross, this item allows it to Mega Evolve in battle.",
    sprite: "heracronite",
    isMegaStone: true,
    megaStone: {
      Heracross: "Heracross-Mega"
    }
  },
  houndoominite: {
    group: "Pokémon specific items",
    name: "Houndoominite",
    description: "If held by a Houndoom, this item allows it to Mega Evolve in battle.",
    sprite: "houndoominite",
    isMegaStone: true,
    megaStone: {
      Houndoom: "Houndoom-Mega"
    }
  },
  kangaskhanite: {
    group: "Pokémon specific items",
    name: "Kangaskhanite",
    description: "If held by a Kangaskhan, this item allows it to Mega Evolve in battle.",
    sprite: "kangaskhanite",
    isMegaStone: true,
    megaStone: {
      Kangaskhan: "Kangaskhan-Mega"
    }
  },
  lopunnite: {
    group: "Pokémon specific items",
    name: "Lopunnite",
    description: "If held by a Lopunny, this item allows it to Mega Evolve in battle.",
    sprite: "lopunnite",
    isMegaStone: true,
    megaStone: {
      Lopunny: "Lopunny-Mega"
    }
  },
  lucarionite: {
    group: "Pokémon specific items",
    name: "Lucarionite",
    description: "If held by a Lucario, this item allows it to Mega Evolve in battle.",
    sprite: "lucarionite",
    isMegaStone: true,
    megaStone: {
      Lucario: "Lucario-Mega"
    }
  },
  manectite: {
    group: "Pokémon specific items",
    name: "Manectite",
    description: "If held by a Manectric, this item allows it to Mega Evolve in battle.",
    sprite: "manectite",
    isMegaStone: true,
    megaStone: {
      Manectric: "Manectric-Mega"
    }
  },
  mawilite: {
    group: "Pokémon specific items",
    name: "Mawilite",
    description: "If held by a Mawile, this item allows it to Mega Evolve in battle.",
    sprite: "mawilite",
    isMegaStone: true,
    megaStone: {
      Mawile: "Mawile-Mega"
    }
  },
  barbaracite: {
    group: "Pokémon specific items",
    name: "Barbaracite",
    description: "If held by a Barbaracle, this item allows it to Mega Evolve in battle.",
    sprite: "barbaracite",
    isMegaStone: true,
    megaStone: {
      Barbaracle: "Barbaracle-Mega"
    }
  },
  scolipite: {
    group: "Pokémon specific items",
    name: "Scolipite",
    description: "If held by a Scolipede, this item allows it to Mega Evolve in battle.",
    sprite: "scolipite",
    isMegaStone: true,
    megaStone: {
      Scolipede: "Scolipede-Mega"
    }
  },
  medichamite: {
    group: "Pokémon specific items",
    name: "Medichamite",
    description: "If held by a Medicham, this item allows it to Mega Evolve in battle.",
    sprite: "medichamite",
    isMegaStone: true,
    megaStone: {
      Medicham: "Medicham-Mega"
    }
  },
  meganiumite: {
    group: "Pokémon specific items",
    name: "Meganiumite",
    description: "If held by a Meganium, this item allows it to Mega Evolve in battle.",
    sprite: "meganiumite",
    isMegaStone: true,
    megaStone: {
      Meganium: "Meganium-Mega"
    }
  },
  meowsticite: {
    group: "Pokémon specific items",
    name: "Meowsticite",
    description: "If held by a Meowstic, this item allows it to Mega Evolve in battle.",
    sprite: "meowsticite",
    isMegaStone: true,
    megaStone: {
      Meowstic: "Meowstic-M-Mega",
      "Meowstic-F": "Meowstic-F-Mega"
    }
  },
  metagrossite: {
    group: "Pokémon specific items",
    name: "Metagrossite",
    description: "If held by a Metagross, this item allows it to Mega Evolve in battle.",
    sprite: "metagrossite",
    isMegaStone: true,
    megaStone: {
      Metagross: "Metagross-Mega"
    }
  },
  pinsirite: {
    group: "Pokémon specific items",
    name: "Pinsirite",
    description: "If held by a Pinsir, this item allows it to Mega Evolve in battle.",
    sprite: "pinsirite",
    isMegaStone: true,
    megaStone: {
      Pinsir: "Pinsir-Mega"
    }
  },
  sablenite: {
    group: "Pokémon specific items",
    name: "Sablenite",
    description: "If held by a Sableye, this item allows it to Mega Evolve in battle.",
    sprite: "sablenite",
    isMegaStone: true,
    megaStone: {
      Sableye: "Sableye-Mega"
    }
  },
  scizorite: {
    group: "Pokémon specific items",
    name: "Scizorite",
    description: "If held by a Scizor, this item allows it to Mega Evolve in battle.",
    sprite: "scizorite",
    isMegaStone: true,
    megaStone: {
      Scizor: "Scizor-Mega"
    }
  },
  sceptilite: {
    group: "Pokémon specific items",
    name: "Sceptilite",
    description: "If held by a Sceptile, this item allows it to Mega Evolve in battle.",
    sprite: "sceptilite",
    isMegaStone: true,
    megaStone: {
      Sceptile: "Sceptile-Mega"
    }
  },
  scovillainite: {
    group: "Pokémon specific items",
    name: "Scovillainite",
    description: "If held by a Scovillain, this item allows it to Mega Evolve in battle.",
    sprite: "scovillainite",
    isMegaStone: true,
    megaStone: {
      Scovillain: "Scovillain-Mega"
    }
  },
  sharpedonite: {
    group: "Pokémon specific items",
    name: "Sharpedonite",
    description: "If held by a Sharpedo, this item allows it to Mega Evolve in battle.",
    sprite: "sharpedonite",
    isMegaStone: true,
    megaStone: {
      Sharpedo: "Sharpedo-Mega"
    }
  },
  skarmorite: {
    group: "Pokémon specific items",
    name: "Skarmorite",
    description: "If held by a Skarmory, this item allows it to Mega Evolve in battle.",
    sprite: "skarmorite",
    isMegaStone: true,
    megaStone: {
      Skarmory: "Skarmory-Mega"
    }
  },
  starminite: {
    group: "Pokémon specific items",
    name: "Starminite",
    description: "If held by a Starmie, this item allows it to Mega Evolve in battle.",
    sprite: "starminite",
    isMegaStone: true,
    megaStone: {
      Starmie: "Starmie-Mega"
    }
  },
  steelixite: {
    group: "Pokémon specific items",
    name: "Steelixite",
    description: "If held by a Steelix, this item allows it to Mega Evolve in battle.",
    sprite: "steelixite",
    isMegaStone: true,
    megaStone: {
      Steelix: "Steelix-Mega"
    }
  },
  swampertite: {
    group: "Pokémon specific items",
    name: "Swampertite",
    description: "If held by a Swampert, this item allows it to Mega Evolve in battle.",
    sprite: "swampertite",
    isMegaStone: true,
    megaStone: {
      Swampert: "Swampert-Mega"
    }
  },
  victreebelite: {
    group: "Pokémon specific items",
    name: "Victreebelite",
    description: "If held by a Victreebel, this item allows it to Mega Evolve in battle.",
    sprite: "victreebelite",
    isMegaStone: true,
    megaStone: {
      Victreebel: "Victreebel-Mega"
    }
  },
  dragalgite: {
    group: "Pokémon specific items",
    name: "Dragalgite",
    description: "If held by a Dragalge, this item allows it to Mega Evolve in battle.",
    sprite: "dragalgite",
    isMegaStone: true,
    megaStone: {
      Dragalge: "Dragalge-Mega"
    }
  },
  eelektrossite: {
    group: "Pokémon specific items",
    name: "Eelektrossite",
    description: "If held by a Eelektross, this item allows it to Mega Evolve in battle.",
    sprite: "eelektrossite",
    isMegaStone: true,
    megaStone: {
      Eelektross: "Eelektross-Mega"
    }
  },
  falinksite: {
    group: "Pokémon specific items",
    name: "Falinksite",
    description: "If held by a Falinks, this item allows it to Mega Evolve in battle.",
    sprite: "falinksite",
    isMegaStone: true,
    megaStone: {
      Falinks: "Falinks-Mega"
    }
  },
  malamarite: {
    group: "Pokémon specific items",
    name: "Malamarite",
    description: "If held by a Malamar, this item allows it to Mega Evolve in battle.",
    sprite: "malamarite",
    isMegaStone: true,
    megaStone: {
      Malamar: "Malamar-Mega"
    }
  },
  pyroarite: {
    group: "Pokémon specific items",
    name: "Pyroarite",
    description: "If held by a Pyroar, this item allows it to Mega Evolve in battle.",
    sprite: "pyroarite",
    isMegaStone: true,
    megaStone: {
      Pyroar: "Pyroar-Mega"
    }
  },
  scraftinite: {
    group: "Pokémon specific items",
    name: "Scraftinite",
    description: "If held by a Scrafty, this item allows it to Mega Evolve in battle.",
    sprite: "scraftinite",
    isMegaStone: true,
    megaStone: {
      Scrafty: "Scrafty-Mega"
    }
  },
  staraptite: {
    group: "Pokémon specific items",
    name: "Staraptite",
    description: "If held by a Staraptor, this item allows it to Mega Evolve in battle.",
    sprite: "staraptite",
    isMegaStone: true,
    megaStone: {
      Staraptor: "Staraptor-Mega"
    }
  },
  raichunitex: {
    group: "Pokémon specific items",
    name: "Raichunite X",
    description: "If held by a Raichu, this item allows it to Mega Evolve into Raichu-Mega-X in battle.",
    sprite: "raichunite-x",
    isMegaStone: true,
    megaStone: {
      Raichu: "Raichu-Mega-X"
    }
  },
  raichunitey: {
    group: "Pokémon specific items",
    name: "Raichunite Y",
    description: "If held by a Raichu, this item allows it to Mega Evolve into Raichu-Mega-Y in battle.",
    sprite: "raichunite-y",
    isMegaStone: true,
    megaStone: {
      Raichu: "Raichu-Mega-Y"
    }
  }
} as const satisfies Record<string, ItemData>
