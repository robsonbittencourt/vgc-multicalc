import { toID } from "@data/id"

export type ItemName = (typeof ITEM_DETAILS)[keyof typeof ITEM_DETAILS]["name"]

export interface ItemData {
  group: "Meta" | "Items" | "Pokémon specific items" | "Useless items"
  name: string
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
    sprite: "question"
  },
  abilityshield: {
    group: "Meta",
    name: "Ability Shield",
    sprite: "ability-shield"
  },
  absorbbulb: {
    group: "Items",
    name: "Absorb Bulb",
    sprite: "absorb-bulb"
  },
  adamantcrystal: {
    group: "Pokémon specific items",
    name: "Adamant Crystal",
    sprite: "adamant-crystal"
  },
  adamantorb: {
    group: "Pokémon specific items",
    name: "Adamant Orb",
    sprite: "adamant-orb"
  },
  adrenalineorb: {
    group: "Items",
    name: "Adrenaline Orb",
    sprite: "adrenaline-orb"
  },
  aguavberry: {
    group: "Items",
    name: "Aguav Berry",
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
    sprite: "air-balloon"
  },
  apicotberry: {
    group: "Items",
    name: "Apicot Berry",
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
    sprite: "assault-vest"
  },
  babiriberry: {
    group: "Items",
    name: "Babiri Berry",
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
    sprite: "big-root"
  },
  bindingband: {
    group: "Useless items",
    name: "Binding Band",
    sprite: "binding-band"
  },
  blackbelt: {
    group: "Items",
    name: "Black Belt",
    sprite: "black-belt"
  },
  blacksludge: {
    group: "Items",
    name: "Black Sludge",
    sprite: "black-sludge"
  },
  blackglasses: {
    group: "Items",
    name: "Black Glasses",
    sprite: "black-glasses"
  },
  blueorb: {
    group: "Pokémon specific items",
    name: "Blue Orb",
    sprite: "blue-orb"
  },
  blunderpolicy: {
    group: "Items",
    name: "Blunder Policy",
    sprite: "blunder-policy"
  },
  boosterenergy: {
    group: "Meta",
    name: "Booster Energy",
    sprite: "booster-energy"
  },
  brightpowder: {
    group: "Items",
    name: "Bright Powder",
    sprite: "bright-powder"
  },
  burndrive: {
    group: "Pokémon specific items",
    name: "Burn Drive",
    sprite: "burn-drive"
  },
  cellbattery: {
    group: "Items",
    name: "Cell Battery",
    sprite: "cell-battery"
  },
  charcoal: {
    group: "Items",
    name: "Charcoal",
    sprite: "charcoal"
  },
  chartiberry: {
    group: "Items",
    name: "Charti Berry",
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
    sprite: "chilan-berry",
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Normal"
    }
  },
  chilldrive: {
    group: "Pokémon specific items",
    name: "Chill Drive",
    sprite: "chill-drive"
  },
  choiceband: {
    group: "Meta",
    name: "Choice Band",
    sprite: "choice-band"
  },
  choicescarf: {
    group: "Meta",
    name: "Choice Scarf",
    sprite: "choice-scarf"
  },
  choicespecs: {
    group: "Meta",
    name: "Choice Specs",
    sprite: "choice-specs"
  },
  chopleberry: {
    group: "Items",
    name: "Chople Berry",
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
    sprite: "clear-amulet"
  },
  cobaberry: {
    group: "Items",
    name: "Coba Berry",
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
    sprite: "cornerstone-mask"
  },
  covertcloak: {
    group: "Meta",
    name: "Covert Cloak",
    sprite: "covert-cloak"
  },
  custapberry: {
    group: "Items",
    name: "Custap Berry",
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
    sprite: "damp-rock"
  },
  deepseascale: {
    group: "Pokémon specific items",
    name: "Deep Sea Scale",
    sprite: "deep-sea-scale"
  },
  deepseatooth: {
    group: "Pokémon specific items",
    name: "Deep Sea Tooth",
    sprite: "deep-sea-tooth"
  },
  destinyknot: {
    group: "Useless items",
    name: "Destiny Knot",
    sprite: "destiny-knot"
  },
  dousedrive: {
    group: "Pokémon specific items",
    name: "Douse Drive",
    sprite: "douse-drive"
  },
  dracoplate: {
    group: "Items",
    name: "Draco Plate",
    sprite: "draco-plate"
  },
  dragonfang: {
    group: "Items",
    name: "Dragon Fang",
    sprite: "dragon-fang"
  },
  dreadplate: {
    group: "Items",
    name: "Dread Plate",
    sprite: "dread-plate"
  },
  earthplate: {
    group: "Items",
    name: "Earth Plate",
    sprite: "earth-plate"
  },
  ejectbutton: {
    group: "Items",
    name: "Eject Button",
    sprite: "eject-button"
  },
  ejectpack: {
    group: "Items",
    name: "Eject Pack",
    sprite: "eject-pack"
  },
  electricseed: {
    group: "Meta",
    name: "Electric Seed",
    sprite: "electric-seed"
  },
  enigmaberry: {
    group: "Useless items",
    name: "Enigma Berry",
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
    sprite: "eviolite"
  },
  expertbelt: {
    group: "Items",
    name: "Expert Belt",
    sprite: "expert-belt"
  },
  fairyfeather: {
    group: "Items",
    name: "Fairy Feather",
    sprite: "fairy-feather"
  },
  figyberry: {
    group: "Items",
    name: "Figy Berry",
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
    sprite: "fist-plate"
  },
  flameorb: {
    group: "Meta",
    name: "Flame Orb",
    sprite: "flame-orb"
  },
  flameplate: {
    group: "Items",
    name: "Flame Plate",
    sprite: "flame-plate"
  },
  floatstone: {
    group: "Useless items",
    name: "Float Stone",
    sprite: "float-stone"
  },
  focusband: {
    group: "Useless items",
    name: "Focus Band",
    sprite: "focus-band"
  },
  focussash: {
    group: "Meta",
    name: "Focus Sash",
    sprite: "focus-sash"
  },
  ganlonberry: {
    group: "Items",
    name: "Ganlon Berry",
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
    sprite: "grassy-seed"
  },
  grepaberry: {
    group: "Items",
    name: "Grepa Berry",
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
    sprite: "grip-claw"
  },
  griseouscore: {
    group: "Pokémon specific items",
    name: "Griseous Core",
    sprite: "griseous-core"
  },
  griseousorb: {
    group: "Pokémon specific items",
    name: "Griseous Orb",
    sprite: "griseous-orb"
  },
  habanberry: {
    group: "Items",
    name: "Haban Berry",
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
    sprite: "hard-stone"
  },
  hearthflamemask: {
    group: "Pokémon specific items",
    name: "Hearthflame Mask",
    sprite: "hearthflame-mask"
  },
  heatrock: {
    group: "Items",
    name: "Heat Rock",
    sprite: "heat-rock"
  },
  heavydutyboots: {
    group: "Items",
    name: "Heavy-Duty Boots",
    sprite: "heavy-duty-boots"
  },
  iapapaberry: {
    group: "Items",
    name: "Iapapa Berry",
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
    sprite: "icicle-plate"
  },
  icyrock: {
    group: "Items",
    name: "Icy Rock",
    sprite: "icy-rock"
  },
  insectplate: {
    group: "Items",
    name: "Insect Plate",
    sprite: "insect-plate"
  },
  ironball: {
    group: "Useless items",
    name: "Iron Ball",
    sprite: "iron-ball"
  },
  ironplate: {
    group: "Items",
    name: "Iron Plate",
    sprite: "iron-plate"
  },
  jabocaberry: {
    group: "Useless items",
    name: "Jaboca Berry",
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
    sprite: "king's-rock"
  },
  laggingtail: {
    group: "Items",
    name: "Lagging Tail",
    sprite: "lagging-tail"
  },
  lansatberry: {
    group: "Items",
    name: "Lansat Berry",
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
    sprite: "leftovers"
  },
  leek: {
    group: "Pokémon specific items",
    name: "Leek",
    sprite: "leek"
  },
  leppaberry: {
    group: "Items",
    name: "Leppa Berry",
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
    sprite: "life-orb"
  },
  lightball: {
    group: "Pokémon specific items",
    name: "Light Ball",
    sprite: "light-ball"
  },
  lightclay: {
    group: "Meta",
    name: "Light Clay",
    sprite: "light-clay"
  },
  loadeddice: {
    group: "Items",
    name: "Loaded Dice",
    sprite: "loaded-dice"
  },
  lumberry: {
    group: "Items",
    name: "Lum Berry",
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
    sprite: "luminous-moss"
  },
  lustrousglobe: {
    group: "Pokémon specific items",
    name: "Lustrous Globe",
    sprite: "lustrous-globe"
  },
  lustrousorb: {
    group: "Pokémon specific items",
    name: "Lustrous Orb",
    sprite: "lustrous-orb"
  },
  magnet: {
    group: "Items",
    name: "Magnet",
    sprite: "magnet"
  },
  magoberry: {
    group: "Items",
    name: "Mago Berry",
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
    sprite: "meadow-plate"
  },
  mentalherb: {
    group: "Meta",
    name: "Mental Herb",
    sprite: "mental-herb"
  },
  metalcoat: {
    group: "Items",
    name: "Metal Coat",
    sprite: "metal-coat"
  },
  metalpowder: {
    group: "Pokémon specific items",
    name: "Metal Powder",
    sprite: "metal-powder"
  },
  metronome: {
    group: "Items",
    name: "Metronome",
    sprite: "metronome"
  },
  micleberry: {
    group: "Items",
    name: "Micle Berry",
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
    sprite: "mind-plate"
  },
  miracleseed: {
    group: "Items",
    name: "Miracle Seed",
    sprite: "miracle-seed"
  },
  mirrorherb: {
    group: "Items",
    name: "Mirror Herb",
    sprite: "mirror-herb"
  },
  mistyseed: {
    group: "Items",
    name: "Misty Seed",
    sprite: "misty-seed"
  },
  muscleband: {
    group: "Items",
    name: "Muscle Band",
    sprite: "muscle-band"
  },
  mysticwater: {
    group: "Meta",
    name: "Mystic Water",
    sprite: "mystic-water"
  },
  nevermeltice: {
    group: "Items",
    name: "Never-Melt Ice",
    sprite: "never-melt-ice"
  },
  normalgem: {
    group: "Items",
    name: "Normal Gem",
    sprite: "normal-gem"
  },
  buggem: {
    group: "Items",
    name: "Bug Gem",
    sprite: "bug-gem"
  },
  darkgem: {
    group: "Items",
    name: "Dark Gem",
    sprite: "dark-gem"
  },
  dragongem: {
    group: "Items",
    name: "Dragon Gem",
    sprite: "dragon-gem"
  },
  electricgem: {
    group: "Items",
    name: "Electric Gem",
    sprite: "electric-gem"
  },
  fairygem: {
    group: "Items",
    name: "Fairy Gem",
    sprite: "fairy-gem"
  },
  fightinggem: {
    group: "Items",
    name: "Fighting Gem",
    sprite: "fighting-gem"
  },
  firegem: {
    group: "Items",
    name: "Fire Gem",
    sprite: "fire-gem"
  },
  flyinggem: {
    group: "Items",
    name: "Flying Gem",
    sprite: "flying-gem"
  },
  ghostgem: {
    group: "Items",
    name: "Ghost Gem",
    sprite: "ghost-gem"
  },
  grassgem: {
    group: "Items",
    name: "Grass Gem",
    sprite: "grass-gem"
  },
  groundgem: {
    group: "Items",
    name: "Ground Gem",
    sprite: "ground-gem"
  },
  icegem: {
    group: "Items",
    name: "Ice Gem",
    sprite: "ice-gem"
  },
  poisongem: {
    group: "Items",
    name: "Poison Gem",
    sprite: "poison-gem"
  },
  psychicgem: {
    group: "Items",
    name: "Psychic Gem",
    sprite: "psychic-gem"
  },
  rockgem: {
    group: "Items",
    name: "Rock Gem",
    sprite: "rock-gem"
  },
  steelgem: {
    group: "Items",
    name: "Steel Gem",
    sprite: "steel-gem"
  },
  watergem: {
    group: "Items",
    name: "Water Gem",
    sprite: "water-gem"
  },
  occaberry: {
    group: "Items",
    name: "Occa Berry",
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
    sprite: "pixie-plate"
  },
  poisonbarb: {
    group: "Items",
    name: "Poison Barb",
    sprite: "poison-barb"
  },
  poweranklet: {
    group: "Useless items",
    name: "Power Anklet",
    sprite: "power-anklet"
  },
  powerband: {
    group: "Useless items",
    name: "Power Band",
    sprite: "power-band"
  },
  powerbelt: {
    group: "Useless items",
    name: "Power Belt",
    sprite: "power-belt"
  },
  powerbracer: {
    group: "Useless items",
    name: "Power Bracer",
    sprite: "power-bracer"
  },
  powerherb: {
    group: "Meta",
    name: "Power Herb",
    sprite: "power-herb"
  },
  powerlens: {
    group: "Useless items",
    name: "Power Lens",
    sprite: "power-lens"
  },
  powerweight: {
    group: "Useless items",
    name: "Power Weight",
    sprite: "power-weight"
  },
  protectivepads: {
    group: "Items",
    name: "Protective Pads",
    sprite: "protective-pads"
  },
  psychicseed: {
    group: "Meta",
    name: "Psychic Seed",
    sprite: "psychic-seed"
  },
  punchingglove: {
    group: "Items",
    name: "Punching Glove",
    sprite: "punching-glove"
  },
  quickclaw: {
    group: "Items",
    name: "Quick Claw",
    sprite: "quick-claw"
  },
  rawstberry: {
    group: "Useless items",
    name: "Rawst Berry",
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
    sprite: "razor-claw"
  },
  razorfang: {
    group: "Items",
    name: "Razor Fang",
    sprite: "razor-fang"
  },
  redcard: {
    group: "Items",
    name: "Red Card",
    sprite: "red-card"
  },
  redorb: {
    group: "Pokémon specific items",
    name: "Red Orb",
    sprite: "red-orb"
  },
  rindoberry: {
    group: "Items",
    name: "Rindo Berry",
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
    sprite: "ring-target"
  },
  rockyhelmet: {
    group: "Meta",
    name: "Rocky Helmet",
    sprite: "rocky-helmet"
  },
  roomservice: {
    group: "Items",
    name: "Room Service",
    sprite: "room-service"
  },
  roseliberry: {
    group: "Items",
    name: "Roseli Berry",
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
    sprite: "rusted-shield"
  },
  rustedsword: {
    group: "Pokémon specific items",
    name: "Rusted Sword",
    sprite: "rusted-sword"
  },
  safetygoggles: {
    group: "Meta",
    name: "Safety Goggles",
    sprite: "safety-goggles"
  },
  salacberry: {
    group: "Items",
    name: "Salac Berry",
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
    sprite: "scope-lens"
  },
  sharpbeak: {
    group: "Items",
    name: "Sharp Beak",
    sprite: "sharp-beak"
  },
  shedshell: {
    group: "Items",
    name: "Shed Shell",
    sprite: "shed-shell"
  },
  shellbell: {
    group: "Items",
    name: "Shell Bell",
    sprite: "shell-bell"
  },
  shockdrive: {
    group: "Pokémon specific items",
    name: "Shock Drive",
    sprite: "shock-drive"
  },
  shucaberry: {
    group: "Items",
    name: "Shuca Berry",
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
    sprite: "silk-scarf"
  },
  silverpowder: {
    group: "Items",
    name: "Silver Powder",
    sprite: "silver-powder"
  },
  sitrusberry: {
    group: "Meta",
    name: "Sitrus Berry",
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
    sprite: "sky-plate"
  },
  smoothrock: {
    group: "Items",
    name: "Smooth Rock",
    sprite: "smooth-rock"
  },
  snowball: {
    group: "Items",
    name: "Snowball",
    sprite: "snowball"
  },
  softsand: {
    group: "Items",
    name: "Soft Sand",
    sprite: "soft-sand"
  },
  souldew: {
    group: "Pokémon specific items",
    name: "Soul Dew",
    sprite: "soul-dew"
  },
  spelltag: {
    group: "Items",
    name: "Spell Tag",
    sprite: "spell-tag"
  },
  splashplate: {
    group: "Items",
    name: "Splash Plate",
    sprite: "splash-plate"
  },
  spookyplate: {
    group: "Items",
    name: "Spooky Plate",
    sprite: "spooky-plate"
  },
  starfberry: {
    group: "Items",
    name: "Starf Berry",
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
    sprite: "sticky-barb"
  },
  stoneplate: {
    group: "Items",
    name: "Stone Plate",
    sprite: "stone-plate"
  },
  tangaberry: {
    group: "Items",
    name: "Tanga Berry",
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
    sprite: "terrain-extender"
  },
  thickclub: {
    group: "Pokémon specific items",
    name: "Thick Club",
    sprite: "thick-club"
  },
  throatspray: {
    group: "Items",
    name: "Throat Spray",
    sprite: "throat-spray"
  },
  toxicorb: {
    group: "Items",
    name: "Toxic Orb",
    sprite: "toxic-orb"
  },
  toxicplate: {
    group: "Items",
    name: "Toxic Plate",
    sprite: "toxic-plate"
  },
  aerodactylite: {
    group: "Pokémon specific items",
    name: "Aerodactylite",
    sprite: "aerodactylite",
    isMegaStone: true,
    megaStone: {
      Aerodactyl: "Aerodactyl-Mega"
    }
  },
  alakazite: {
    group: "Pokémon specific items",
    name: "Alakazite",
    sprite: "alakazite",
    isMegaStone: true,
    megaStone: {
      Alakazam: "Alakazam-Mega"
    }
  },
  beedrillite: {
    group: "Pokémon specific items",
    name: "Beedrillite",
    sprite: "beedrillite",
    isMegaStone: true,
    megaStone: {
      Beedrill: "Beedrill-Mega"
    }
  },
  blastoisinite: {
    group: "Pokémon specific items",
    name: "Blastoisinite",
    sprite: "blastoisinite",
    isMegaStone: true,
    megaStone: {
      Blastoise: "Blastoise-Mega"
    }
  },
  charizarditex: {
    group: "Pokémon specific items",
    name: "Charizardite X",
    sprite: "charizardite-x",
    isMegaStone: true,
    megaStone: {
      Charizard: "Charizard-Mega-X"
    }
  },
  charizarditey: {
    group: "Pokémon specific items",
    name: "Charizardite Y",
    sprite: "charizardite-y",
    isMegaStone: true,
    megaStone: {
      Charizard: "Charizard-Mega-Y"
    }
  },
  chandelurite: {
    group: "Pokémon specific items",
    name: "Chandelurite",
    sprite: "chandelurite",
    isMegaStone: true,
    megaStone: {
      Chandelure: "Chandelure-Mega"
    }
  },
  chimechite: {
    group: "Pokémon specific items",
    name: "Chimechite",
    sprite: "chimechite",
    isMegaStone: true,
    megaStone: {
      Chimecho: "Chimecho-Mega"
    }
  },
  clefablite: {
    group: "Pokémon specific items",
    name: "Clefablite",
    sprite: "clefablite",
    isMegaStone: true,
    megaStone: {
      Clefable: "Clefable-Mega"
    }
  },
  chesnaughtite: {
    group: "Pokémon specific items",
    name: "Chesnaughtite",
    sprite: "chesnaughtite",
    isMegaStone: true,
    megaStone: {
      Chesnaught: "Chesnaught-Mega"
    }
  },
  gengarite: {
    group: "Pokémon specific items",
    name: "Gengarite",
    sprite: "gengarite",
    isMegaStone: true,
    megaStone: {
      Gengar: "Gengar-Mega"
    }
  },
  pidgeotite: {
    group: "Pokémon specific items",
    name: "Pidgeotite",
    sprite: "pidgeotite",
    isMegaStone: true,
    megaStone: {
      Pidgeot: "Pidgeot-Mega"
    }
  },
  slowbronite: {
    group: "Pokémon specific items",
    name: "Slowbronite",
    sprite: "slowbronite",
    isMegaStone: true,
    megaStone: {
      Slowbro: "Slowbro-Mega"
    }
  },
  tyranitarite: {
    group: "Pokémon specific items",
    name: "Tyranitarite",
    sprite: "tyranitarite",
    isMegaStone: true,
    megaStone: {
      Tyranitar: "Tyranitar-Mega"
    }
  },
  venusaurite: {
    group: "Pokémon specific items",
    name: "Venusaurite",
    sprite: "venusaurite",
    isMegaStone: true,
    megaStone: {
      Venusaur: "Venusaur-Mega"
    }
  },
  twistedspoon: {
    group: "Items",
    name: "Twisted Spoon",
    sprite: "twisted-spoon"
  },
  utilityumbrella: {
    group: "Items",
    name: "Utility Umbrella",
    sprite: "utility-umbrella"
  },
  wacanberry: {
    group: "Items",
    name: "Wacan Berry",
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
    sprite: "weakness-policy"
  },
  wellspringmask: {
    group: "Pokémon specific items",
    name: "Wellspring Mask",
    sprite: "wellspring-mask"
  },
  whiteherb: {
    group: "Items",
    name: "White Herb",
    sprite: "white-herb"
  },
  widelens: {
    group: "Items",
    name: "Wide Lens",
    sprite: "wide-lens"
  },
  wikiberry: {
    group: "Items",
    name: "Wiki Berry",
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
    sprite: "wise-glasses"
  },
  yacheberry: {
    group: "Items",
    name: "Yache Berry",
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
    sprite: "zap-plate"
  },
  zoomlens: {
    group: "Items",
    name: "Zoom Lens",
    sprite: "zoom-lens"
  },
  abomasite: {
    group: "Pokémon specific items",
    name: "Abomasite",
    sprite: "abomasite",
    isMegaStone: true,
    megaStone: {
      Abomasnow: "Abomasnow-Mega"
    }
  },
  absolite: {
    group: "Pokémon specific items",
    name: "Absolite",
    sprite: "absolite",
    isMegaStone: true,
    megaStone: {
      Absol: "Absol-Mega"
    }
  },
  absolitez: {
    group: "Pokémon specific items",
    name: "Absolite Z",
    sprite: "absolite-z",
    isMegaStone: true,
    megaStone: {
      Absol: "Absol-Mega-Z"
    }
  },
  aggronite: {
    group: "Pokémon specific items",
    name: "Aggronite",
    sprite: "aggronite",
    isMegaStone: true,
    megaStone: {
      Aggron: "Aggron-Mega"
    }
  },
  altarianite: {
    group: "Pokémon specific items",
    name: "Altarianite",
    sprite: "altarianite",
    isMegaStone: true,
    megaStone: {
      Altaria: "Altaria-Mega"
    }
  },
  ampharosite: {
    group: "Pokémon specific items",
    name: "Ampharosite",
    sprite: "ampharosite",
    isMegaStone: true,
    megaStone: {
      Ampharos: "Ampharos-Mega"
    }
  },
  audinite: {
    group: "Pokémon specific items",
    name: "Audinite",
    sprite: "audinite",
    isMegaStone: true,
    megaStone: {
      Audino: "Audino-Mega"
    }
  },
  banettite: {
    group: "Pokémon specific items",
    name: "Banettite",
    sprite: "banettite",
    isMegaStone: true,
    megaStone: {
      Banette: "Banette-Mega"
    }
  },
  baxcalibrite: {
    group: "Pokémon specific items",
    name: "Baxcalibrite",
    sprite: "baxcalibrite",
    isMegaStone: true,
    megaStone: {
      Baxcalibur: "Baxcalibur-Mega"
    }
  },
  blazikenite: {
    group: "Pokémon specific items",
    name: "Blazikenite",
    sprite: "blazikenite",
    isMegaStone: true,
    megaStone: {
      Blaziken: "Blaziken-Mega"
    }
  },
  cameruptite: {
    group: "Pokémon specific items",
    name: "Cameruptite",
    sprite: "cameruptite",
    isMegaStone: true,
    megaStone: {
      Camerupt: "Camerupt-Mega"
    }
  },
  crabominite: {
    group: "Pokémon specific items",
    name: "Crabominite",
    sprite: "crabominite",
    isMegaStone: true,
    megaStone: {
      Crabominable: "Crabominable-Mega"
    }
  },
  darkranite: {
    group: "Pokémon specific items",
    name: "Darkranite",
    sprite: "darkranite",
    isMegaStone: true,
    megaStone: {
      Darkrai: "Darkrai-Mega"
    }
  },
  delphoxite: {
    group: "Pokémon specific items",
    name: "Delphoxite",
    sprite: "delphoxite",
    isMegaStone: true,
    megaStone: {
      Delphox: "Delphox-Mega"
    }
  },
  dragoninite: {
    group: "Pokémon specific items",
    name: "Dragoninite",
    sprite: "dragoninite",
    isMegaStone: true,
    megaStone: {
      Dragonite: "Dragonite-Mega"
    }
  },
  diancite: {
    group: "Pokémon specific items",
    name: "Diancite",
    sprite: "diancite",
    isMegaStone: true,
    megaStone: {
      Diancie: "Diancie-Mega"
    }
  },
  drampanite: {
    group: "Pokémon specific items",
    name: "Drampanite",
    sprite: "drampanite",
    isMegaStone: true,
    megaStone: {
      Drampa: "Drampa-Mega"
    }
  },
  emboarite: {
    group: "Pokémon specific items",
    name: "Emboarite",
    sprite: "emboarite",
    isMegaStone: true,
    megaStone: {
      Emboar: "Emboar-Mega"
    }
  },
  excadrite: {
    group: "Pokémon specific items",
    name: "Excadrite",
    sprite: "excadrite",
    isMegaStone: true,
    megaStone: {
      Excadrill: "Excadrill-Mega"
    }
  },
  feraligite: {
    group: "Pokémon specific items",
    name: "Feraligite",
    sprite: "feraligite",
    isMegaStone: true,
    megaStone: {
      Feraligatr: "Feraligatr-Mega"
    }
  },
  floettite: {
    group: "Pokémon specific items",
    name: "Floettite",
    sprite: "floettite",
    isMegaStone: true,
    megaStone: {
      "Floette-Eternal": "Floette-Mega"
    }
  },
  froslassite: {
    group: "Pokémon specific items",
    name: "Froslassite",
    sprite: "froslassite",
    isMegaStone: true,
    megaStone: {
      Froslass: "Froslass-Mega"
    }
  },
  galladite: {
    group: "Pokémon specific items",
    name: "Galladite",
    sprite: "galladite",
    isMegaStone: true,
    megaStone: {
      Gallade: "Gallade-Mega"
    }
  },
  garchompite: {
    group: "Pokémon specific items",
    name: "Garchompite",
    sprite: "garchompite",
    isMegaStone: true,
    megaStone: {
      Garchomp: "Garchomp-Mega"
    }
  },
  garchompitez: {
    group: "Pokémon specific items",
    name: "Garchompite Z",
    sprite: "garchompite-z",
    isMegaStone: true,
    megaStone: {
      Garchomp: "Garchomp-Mega-Z"
    }
  },
  gardevoirite: {
    group: "Pokémon specific items",
    name: "Gardevoirite",
    sprite: "gardevoirite",
    isMegaStone: true,
    megaStone: {
      Gardevoir: "Gardevoir-Mega"
    }
  },
  glalitite: {
    group: "Pokémon specific items",
    name: "Glalitite",
    sprite: "glalitite",
    isMegaStone: true,
    megaStone: {
      Glalie: "Glalie-Mega"
    }
  },
  glimmoranite: {
    group: "Pokémon specific items",
    name: "Glimmoranite",
    sprite: "glimmoranite",
    isMegaStone: true,
    megaStone: {
      Glimmora: "Glimmora-Mega"
    }
  },
  golisopite: {
    group: "Pokémon specific items",
    name: "Golisopite",
    sprite: "golisopite",
    isMegaStone: true,
    megaStone: {
      Golisopod: "Golisopod-Mega"
    }
  },
  golurkite: {
    group: "Pokémon specific items",
    name: "Golurkite",
    sprite: "golurkite",
    isMegaStone: true,
    megaStone: {
      Golurk: "Golurk-Mega"
    }
  },
  greninjite: {
    group: "Pokémon specific items",
    name: "Greninjite",
    sprite: "greninjite",
    isMegaStone: true,
    megaStone: {
      Greninja: "Greninja-Mega"
    }
  },
  gyaradosite: {
    group: "Pokémon specific items",
    name: "Gyaradosite",
    sprite: "gyaradosite",
    isMegaStone: true,
    megaStone: {
      Gyarados: "Gyarados-Mega"
    }
  },
  hawluchanite: {
    group: "Pokémon specific items",
    name: "Hawluchanite",
    sprite: "hawluchanite",
    isMegaStone: true,
    megaStone: {
      Hawlucha: "Hawlucha-Mega"
    }
  },
  heatranite: {
    group: "Pokémon specific items",
    name: "Heatranite",
    sprite: "heatranite",
    isMegaStone: true,
    megaStone: {
      Heatran: "Heatran-Mega"
    }
  },
  heracronite: {
    group: "Pokémon specific items",
    name: "Heracronite",
    sprite: "heracronite",
    isMegaStone: true,
    megaStone: {
      Heracross: "Heracross-Mega"
    }
  },
  houndoominite: {
    group: "Pokémon specific items",
    name: "Houndoominite",
    sprite: "houndoominite",
    isMegaStone: true,
    megaStone: {
      Houndoom: "Houndoom-Mega"
    }
  },
  kangaskhanite: {
    group: "Pokémon specific items",
    name: "Kangaskhanite",
    sprite: "kangaskhanite",
    isMegaStone: true,
    megaStone: {
      Kangaskhan: "Kangaskhan-Mega"
    }
  },
  latiasite: {
    group: "Pokémon specific items",
    name: "Latiasite",
    sprite: "latiasite",
    isMegaStone: true,
    megaStone: {
      Latias: "Latias-Mega"
    }
  },
  latiosite: {
    group: "Pokémon specific items",
    name: "Latiosite",
    sprite: "latiosite",
    isMegaStone: true,
    megaStone: {
      Latios: "Latios-Mega"
    }
  },
  lopunnite: {
    group: "Pokémon specific items",
    name: "Lopunnite",
    sprite: "lopunnite",
    isMegaStone: true,
    megaStone: {
      Lopunny: "Lopunny-Mega"
    }
  },
  lucarionite: {
    group: "Pokémon specific items",
    name: "Lucarionite",
    sprite: "lucarionite",
    isMegaStone: true,
    megaStone: {
      Lucario: "Lucario-Mega"
    }
  },
  lucarionitez: {
    group: "Pokémon specific items",
    name: "Lucarionite Z",
    sprite: "lucarionite-z",
    isMegaStone: true,
    megaStone: {
      Lucario: "Lucario-Mega-Z"
    }
  },
  magearnite: {
    group: "Pokémon specific items",
    name: "Magearnite",
    sprite: "magearnite",
    isMegaStone: true,
    megaStone: {
      Magearna: "Magearna-Mega",
      "Magearna-Original": "Magearna-Original-Mega"
    }
  },
  manectite: {
    group: "Pokémon specific items",
    name: "Manectite",
    sprite: "manectite",
    isMegaStone: true,
    megaStone: {
      Manectric: "Manectric-Mega"
    }
  },
  mawilite: {
    group: "Pokémon specific items",
    name: "Mawilite",
    sprite: "mawilite",
    isMegaStone: true,
    megaStone: {
      Mawile: "Mawile-Mega"
    }
  },
  barbaracite: {
    group: "Pokémon specific items",
    name: "Barbaracite",
    sprite: "barbaracite",
    isMegaStone: true,
    megaStone: {
      Barbaracle: "Barbaracle-Mega"
    }
  },
  scolipite: {
    group: "Pokémon specific items",
    name: "Scolipite",
    sprite: "scolipite",
    isMegaStone: true,
    megaStone: {
      Scolipede: "Scolipede-Mega"
    }
  },
  medichamite: {
    group: "Pokémon specific items",
    name: "Medichamite",
    sprite: "medichamite",
    isMegaStone: true,
    megaStone: {
      Medicham: "Medicham-Mega"
    }
  },
  meganiumite: {
    group: "Pokémon specific items",
    name: "Meganiumite",
    sprite: "meganiumite",
    isMegaStone: true,
    megaStone: {
      Meganium: "Meganium-Mega"
    }
  },
  meowsticite: {
    group: "Pokémon specific items",
    name: "Meowsticite",
    sprite: "meowsticite",
    isMegaStone: true,
    megaStone: {
      Meowstic: "Meowstic-M-Mega",
      "Meowstic-F": "Meowstic-F-Mega"
    }
  },
  mewtwonitex: {
    group: "Pokémon specific items",
    name: "Mewtwonite X",
    sprite: "mewtwonite-x",
    isMegaStone: true,
    megaStone: {
      Mewtwo: "Mewtwo-Mega-X"
    }
  },
  mewtwonitey: {
    group: "Pokémon specific items",
    name: "Mewtwonite Y",
    sprite: "mewtwonite-y",
    isMegaStone: true,
    megaStone: {
      Mewtwo: "Mewtwo-Mega-Y"
    }
  },
  metagrossite: {
    group: "Pokémon specific items",
    name: "Metagrossite",
    sprite: "metagrossite",
    isMegaStone: true,
    megaStone: {
      Metagross: "Metagross-Mega"
    }
  },
  pinsirite: {
    group: "Pokémon specific items",
    name: "Pinsirite",
    sprite: "pinsirite",
    isMegaStone: true,
    megaStone: {
      Pinsir: "Pinsir-Mega"
    }
  },
  sablenite: {
    group: "Pokémon specific items",
    name: "Sablenite",
    sprite: "sablenite",
    isMegaStone: true,
    megaStone: {
      Sableye: "Sableye-Mega"
    }
  },
  scizorite: {
    group: "Pokémon specific items",
    name: "Scizorite",
    sprite: "scizorite",
    isMegaStone: true,
    megaStone: {
      Scizor: "Scizor-Mega"
    }
  },
  sceptilite: {
    group: "Pokémon specific items",
    name: "Sceptilite",
    sprite: "sceptilite",
    isMegaStone: true,
    megaStone: {
      Sceptile: "Sceptile-Mega"
    }
  },
  scovillainite: {
    group: "Pokémon specific items",
    name: "Scovillainite",
    sprite: "scovillainite",
    isMegaStone: true,
    megaStone: {
      Scovillain: "Scovillain-Mega"
    }
  },
  sharpedonite: {
    group: "Pokémon specific items",
    name: "Sharpedonite",
    sprite: "sharpedonite",
    isMegaStone: true,
    megaStone: {
      Sharpedo: "Sharpedo-Mega"
    }
  },
  skarmorite: {
    group: "Pokémon specific items",
    name: "Skarmorite",
    sprite: "skarmorite",
    isMegaStone: true,
    megaStone: {
      Skarmory: "Skarmory-Mega"
    }
  },
  starminite: {
    group: "Pokémon specific items",
    name: "Starminite",
    sprite: "starminite",
    isMegaStone: true,
    megaStone: {
      Starmie: "Starmie-Mega"
    }
  },
  steelixite: {
    group: "Pokémon specific items",
    name: "Steelixite",
    sprite: "steelixite",
    isMegaStone: true,
    megaStone: {
      Steelix: "Steelix-Mega"
    }
  },
  salamencite: {
    group: "Pokémon specific items",
    name: "Salamencite",
    sprite: "salamencite",
    isMegaStone: true,
    megaStone: {
      Salamence: "Salamence-Mega"
    }
  },
  swampertite: {
    group: "Pokémon specific items",
    name: "Swampertite",
    sprite: "swampertite",
    isMegaStone: true,
    megaStone: {
      Swampert: "Swampert-Mega"
    }
  },
  tatsugirinite: {
    group: "Pokémon specific items",
    name: "Tatsugirinite",
    sprite: "tatsugirinite",
    isMegaStone: true,
    megaStone: {
      Tatsugiri: "Tatsugiri-Mega",
      "Tatsugiri-Droopy": "Tatsugiri-Droopy-Mega",
      "Tatsugiri-Stretchy": "Tatsugiri-Stretchy-Mega"
    }
  },
  victreebelite: {
    group: "Pokémon specific items",
    name: "Victreebelite",
    sprite: "victreebelite",
    isMegaStone: true,
    megaStone: {
      Victreebel: "Victreebel-Mega"
    }
  },
  dragalgite: {
    group: "Pokémon specific items",
    name: "Dragalgite",
    sprite: "dragalgite",
    isMegaStone: true,
    megaStone: {
      Dragalge: "Dragalge-Mega"
    }
  },
  eelektrossite: {
    group: "Pokémon specific items",
    name: "Eelektrossite",
    sprite: "eelektrossite",
    isMegaStone: true,
    megaStone: {
      Eelektross: "Eelektross-Mega"
    }
  },
  falinksite: {
    group: "Pokémon specific items",
    name: "Falinksite",
    sprite: "falinksite",
    isMegaStone: true,
    megaStone: {
      Falinks: "Falinks-Mega"
    }
  },
  malamarite: {
    group: "Pokémon specific items",
    name: "Malamarite",
    sprite: "malamarite",
    isMegaStone: true,
    megaStone: {
      Malamar: "Malamar-Mega"
    }
  },
  pyroarite: {
    group: "Pokémon specific items",
    name: "Pyroarite",
    sprite: "pyroarite",
    isMegaStone: true,
    megaStone: {
      Pyroar: "Pyroar-Mega"
    }
  },
  scraftinite: {
    group: "Pokémon specific items",
    name: "Scraftinite",
    sprite: "scraftinite",
    isMegaStone: true,
    megaStone: {
      Scrafty: "Scrafty-Mega"
    }
  },
  staraptite: {
    group: "Pokémon specific items",
    name: "Staraptite",
    sprite: "staraptite",
    isMegaStone: true,
    megaStone: {
      Staraptor: "Staraptor-Mega"
    }
  },
  raichunitex: {
    group: "Pokémon specific items",
    name: "Raichunite X",
    sprite: "raichunite-x",
    isMegaStone: true,
    megaStone: {
      Raichu: "Raichu-Mega-X"
    }
  },
  raichunitey: {
    group: "Pokémon specific items",
    name: "Raichunite Y",
    sprite: "raichunite-y",
    isMegaStone: true,
    megaStone: {
      Raichu: "Raichu-Mega-Y"
    }
  },
  zygardite: {
    group: "Pokémon specific items",
    name: "Zygardite",
    sprite: "zygardite",
    isMegaStone: true,
    megaStone: {
      "Zygarde-Complete": "Zygarde-Mega"
    }
  },
  zeraorite: {
    group: "Pokémon specific items",
    name: "Zeraorite",
    sprite: "zeraorite",
    isMegaStone: true,
    megaStone: {
      Zeraora: "Zeraora-Mega"
    }
  }
} as const satisfies Record<string, ItemData>
