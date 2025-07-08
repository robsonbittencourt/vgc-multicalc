export type ItemName = keyof typeof ITEM_DETAILS

export interface ItemDetail {
  group: "Meta" | "Items" | "Pokémon specific items" | "Useless items"
  name: string
  description: string
  sprite: string
}

export const ITEM_DETAILS: Record<string, ItemDetail> = {
  none: {
    group: "Items",
    name: "(none)",
    description: "Without item",
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
    sprite: "aguav-berry"
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
    sprite: "apicot-berry"
  },
  aspearberry: {
    group: "Useless items",
    name: "Aspear Berry",
    description: "Holder is cured if it is frozen. Single use.",
    sprite: "aspear-berry"
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
    sprite: "babiri-berry"
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
    sprite: "charti-berry"
  },
  cheriberry: {
    group: "Useless items",
    name: "Cheri Berry",
    description: "Holder cures itself if it is paralyzed. Single use.",
    sprite: "cheri-berry"
  },
  chestoberry: {
    group: "Items",
    name: "Chesto Berry",
    description: "Holder wakes up if it is asleep. Single use.",
    sprite: "chesto-berry"
  },
  chilanberry: {
    group: "Items",
    name: "Chilan Berry",
    description: "Halves damage taken from a Normal-type attack. Single use.",
    sprite: "chilan-berry"
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
    sprite: "chople-berry"
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
    sprite: "coba-berry"
  },
  colburberry: {
    group: "Items",
    name: "Colbur Berry",
    description: "Halves damage taken from a supereffective Dark-type attack. Single use.",
    sprite: "colbur-berry"
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
    sprite: "custap-berry"
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
    sprite: "enigma-berry"
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
    sprite: "figy-berry"
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
    sprite: "ganlon-berry"
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
    sprite: "grepa-berry"
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
    sprite: "haban-berry"
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
    sprite: "iapapa-berry"
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
    sprite: "jaboca-berry"
  },
  kasibberry: {
    group: "Items",
    name: "Kasib Berry",
    description: "Halves damage taken from a supereffective Ghost-type attack. Single use.",
    sprite: "kasib-berry"
  },
  kebiaberry: {
    group: "Items",
    name: "Kebia Berry",
    description: "Halves damage taken from a supereffective Poison-type attack. Single use.",
    sprite: "kebia-berry"
  },
  keeberry: {
    group: "Items",
    name: "Kee Berry",
    description: "Raises holder's Defense by 1 stage after it is hit by a physical attack. Single use.",
    sprite: "kee-berry"
  },
  kelpsyberry: {
    group: "Items",
    name: "Kelpsy Berry",
    description: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
    sprite: "kelpsy-berry"
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
    sprite: "lansat-berry"
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
    sprite: "leppa-berry"
  },
  liechiberry: {
    group: "Items",
    name: "Liechi Berry",
    description: "Raises holder's Attack by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "liechi-berry"
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
    sprite: "lum-berry"
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
    sprite: "mago-berry"
  },
  marangaberry: {
    group: "Items",
    name: "Maranga Berry",
    description: "Raises holder's Sp. Def by 1 stage after it is hit by a special attack. Single use.",
    sprite: "maranga-berry"
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
    sprite: "micle-berry"
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
    sprite: "occa-berry"
  },
  oranberry: {
    group: "Useless items",
    name: "Oran Berry",
    description: "Restores 10 HP when at 1/2 max HP or less. Single use.",
    sprite: "oran-berry"
  },
  passhoberry: {
    group: "Items",
    name: "Passho Berry",
    description: "Halves damage taken from a supereffective Water-type attack. Single use.",
    sprite: "passho-berry"
  },
  payapaberry: {
    group: "Items",
    name: "Payapa Berry",
    description: "Halves damage taken from a supereffective Psychic-type attack. Single use.",
    sprite: "payapa-berry"
  },
  pechaberry: {
    group: "Useless items",
    name: "Pecha Berry",
    description: "Holder is cured if it is poisoned. Single use.",
    sprite: "pecha-berry"
  },
  persimberry: {
    group: "Useless items",
    name: "Persim Berry",
    description: "Holder is cured if it is confused. Single use.",
    sprite: "persim-berry"
  },
  petayaberry: {
    group: "Items",
    name: "Petaya Berry",
    description: "Raises holder's Sp. Atk by 1 stage when at 1/4 max HP or less. Single use.",
    sprite: "petaya-berry"
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
    sprite: "rawst-berry"
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
    sprite: "rindo-berry"
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
    sprite: "roseli-berry"
  },
  rowapberry: {
    group: "Useless items",
    name: "Rowap Berry",
    description: "If holder is hit by a special move, attacker loses 1/8 of its max HP. Single use.",
    sprite: "rowap-berry"
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
    sprite: "salac-berry"
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
    sprite: "shuca-berry"
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
    sprite: "sitrus-berry"
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
    sprite: "starf-berry"
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
    sprite: "tanga-berry"
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
    sprite: "wacan-berry"
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
    sprite: "wiki-berry"
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
    sprite: "yache-berry"
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
  }
}
