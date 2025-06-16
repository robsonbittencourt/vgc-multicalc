export interface ItemDetail {
  name: string
  description: string
}

export type ItemName =
  | "abilityshield"
  | "absorbbulb"
  | "adamantcrystal"
  | "adamantorb"
  | "adrenalineorb"
  | "aguavberry"
  | "airballoon"
  | "apicotberry"
  | "aspearberry"
  | "assaultvest"
  | "babiriberry"
  | "bigroot"
  | "bindingband"
  | "blackbelt"
  | "blacksludge"
  | "blackglasses"
  | "blunderpolicy"
  | "boosterenergy"
  | "brightpowder"
  | "cellbattery"
  | "charcoal"
  | "chartiberry"
  | "cheriberry"
  | "chestoberry"
  | "chilanberry"
  | "choiceband"
  | "choicescarf"
  | "choicespecs"
  | "chopleberry"
  | "clearamulet"
  | "cobaberry"
  | "colburberry"
  | "cornerstonemask"
  | "covertcloak"
  | "custapberry"
  | "damprock"
  | "destinyknot"
  | "dracoplate"
  | "dragonfang"
  | "dreadplate"
  | "earthplate"
  | "ejectbutton"
  | "ejectpack"
  | "electricseed"
  | "enigmaberry"
  | "eviolite"
  | "expertbelt"
  | "fairyfeather"
  | "figyberry"
  | "fistplate"
  | "flameorb"
  | "flameplate"
  | "floatstone"
  | "focusband"
  | "focussash"
  | "ganlonberry"
  | "grassyseed"
  | "grepaberry"
  | "gripclaw"
  | "griseouscore"
  | "griseousorb"
  | "habanberry"
  | "hardstone"
  | "hearthflamemask"
  | "heatrock"
  | "heavydutyboots"
  | "iapapaberry"
  | "icicleplate"
  | "icyrock"
  | "insectplate"
  | "ironball"
  | "ironplate"
  | "jabocaberry"
  | "kasibberry"
  | "kebiaberry"
  | "keeberry"
  | "kelpsyberry"
  | "kingsrock"
  | "laggingtail"
  | "lansatberry"
  | "leftovers"
  | "leppaberry"
  | "liechiberry"
  | "lifeorb"
  | "lightball"
  | "lightclay"
  | "loadeddice"
  | "lumberry"
  | "luminousmoss"
  | "lustrousglobe"
  | "lustrousorb"
  | "magnet"
  | "magoberry"
  | "marangaberry"
  | "meadowplate"
  | "mentalherb"
  | "metalcoat"
  | "metronome"
  | "micleberry"
  | "mindplate"
  | "miracleseed"
  | "mirrorherb"
  | "mistyseed"
  | "muscleband"
  | "mysticwater"
  | "nevermeltice"
  | "normalgem"
  | "occaberry"
  | "oranberry"
  | "passhoberry"
  | "payapaberry"
  | "pechaberry"
  | "persimberry"
  | "petayaberry"
  | "pixieplate"
  | "poisonbarb"
  | "poweranklet"
  | "powerband"
  | "powerbelt"
  | "powerbracer"
  | "powerherb"
  | "powerlens"
  | "powerweight"
  | "protectivepads"
  | "psychicseed"
  | "punchingglove"
  | "quickclaw"
  | "rawstberry"
  | "razorclaw"
  | "razorfang"
  | "redcard"
  | "rindoberry"
  | "ringtarget"
  | "rockyhelmet"
  | "roomservice"
  | "roseliberry"
  | "rowapberry"
  | "rustedshield"
  | "rustedsword"
  | "safetygoggles"
  | "salacberry"
  | "scopelens"
  | "sharpbeak"
  | "shedshell"
  | "shellbell"
  | "shucaberry"
  | "silkscarf"
  | "silverpowder"
  | "sitrusberry"
  | "skyplate"
  | "smoothrock"
  | "snowball"
  | "softsand"
  | "souldew"
  | "spelltag"
  | "splashplate"
  | "spookyplate"
  | "starfberry"
  | "stickybarb"
  | "stoneplate"
  | "tangaberry"
  | "terrainextender"
  | "throatspray"
  | "toxicorb"
  | "toxicplate"
  | "twistedspoon"
  | "utilityumbrella"
  | "wacanberry"
  | "weaknesspolicy"
  | "wellspringmask"
  | "whiteherb"
  | "widelens"
  | "wikiberry"
  | "wiseglasses"
  | "yacheberry"
  | "zapplate"
  | "zoomlens"

export const ITEM_DETAILS: Record<ItemName, ItemDetail> = {
  abilityshield: {
    name: "Ability Shield",
    description: "Holder's Ability cannot be changed, suppressed, or ignored by any effect."
  },
  absorbbulb: {
    name: "Absorb Bulb",
    description: "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack. Single use."
  },
  adamantcrystal: {
    name: "Adamant Crystal",
    description: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power."
  },
  adamantorb: {
    name: "Adamant Orb",
    description: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power."
  },
  adrenalineorb: {
    name: "Adrenaline Orb",
    description: "Raises holder's Speed by 1 stage if it gets affected by Intimidate. Single use."
  },
  aguavberry: {
    name: "Aguav Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use."
  },
  airballoon: {
    name: "Air Balloon",
    description: "Holder is immune to Ground-type attacks. Pops when holder is hit."
  },
  apicotberry: {
    name: "Apicot Berry",
    description: "Raises holder's Sp. Def by 1 stage when at 1/4 max HP or less. Single use."
  },
  aspearberry: {
    name: "Aspear Berry",
    description: "Holder is cured if it is frozen. Single use."
  },
  assaultvest: {
    name: "Assault Vest",
    description: "Holder's Sp. Def is 1.5x, but it can only select damaging moves."
  },
  babiriberry: {
    name: "Babiri Berry",
    description: "Halves damage taken from a supereffective Steel-type attack. Single use."
  },
  bigroot: {
    name: "Big Root",
    description: "Holder gains 1.3x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap."
  },
  bindingband: {
    name: "Binding Band",
    description: "Holder's partial-trapping moves deal 1/6 max HP per turn instead of 1/8."
  },
  blackbelt: {
    name: "Black Belt",
    description: "Holder's Fighting-type attacks have 1.2x power."
  },
  blacksludge: {
    name: "Black Sludge",
    description: "Each turn, if holder is a Poison type, restores 1/16 max HP; loses 1/8 if not."
  },
  blackglasses: {
    name: "Black Glasses",
    description: "Holder's Dark-type attacks have 1.2x power."
  },
  blunderpolicy: {
    name: "Blunder Policy",
    description: "If the holder misses due to accuracy, its Speed is raised by 2 stages. Single use."
  },
  boosterenergy: {
    name: "Booster Energy",
    description: "Activates the Protosynthesis or Quark Drive Abilities. Single use."
  },
  brightpowder: {
    name: "Bright Powder",
    description: "The accuracy of attacks against the holder is 0.9x."
  },
  cellbattery: {
    name: "Cell Battery",
    description: "Raises holder's Attack by 1 if hit by an Electric-type attack. Single use."
  },
  charcoal: {
    name: "Charcoal",
    description: "Holder's Fire-type attacks have 1.2x power."
  },
  chartiberry: {
    name: "Charti Berry",
    description: "Halves damage taken from a supereffective Rock-type attack. Single use."
  },
  cheriberry: {
    name: "Cheri Berry",
    description: "Holder cures itself if it is paralyzed. Single use."
  },
  chestoberry: {
    name: "Chesto Berry",
    description: "Holder wakes up if it is asleep. Single use."
  },
  chilanberry: {
    name: "Chilan Berry",
    description: "Halves damage taken from a Normal-type attack. Single use."
  },
  choiceband: {
    name: "Choice Band",
    description: "Holder's Attack is 1.5x, but it can only select the first move it executes."
  },
  choicescarf: {
    name: "Choice Scarf",
    description: "Holder's Speed is 1.5x, but it can only select the first move it executes."
  },
  choicespecs: {
    name: "Choice Specs",
    description: "Holder's Sp. Atk is 1.5x, but it can only select the first move it executes."
  },
  chopleberry: {
    name: "Chople Berry",
    description: "Halves damage taken from a supereffective Fighting-type attack. Single use."
  },
  clearamulet: {
    name: "Clear Amulet",
    description: "Prevents other Pokemon from lowering the holder's stat stages."
  },
  cobaberry: {
    name: "Coba Berry",
    description: "Halves damage taken from a supereffective Flying-type attack. Single use."
  },
  colburberry: {
    name: "Colbur Berry",
    description: "Halves damage taken from a supereffective Dark-type attack. Single use."
  },
  cornerstonemask: {
    name: "Cornerstone Mask",
    description: "Ogerpon-Cornerstone: 1.2x power attacks; Terastallize to gain Embody Aspect."
  },
  covertcloak: {
    name: "Covert Cloak",
    description: "Holder is not affected by the secondary effect of another Pokemon's attack."
  },
  custapberry: {
    name: "Custap Berry",
    description: "Holder moves first in its priority bracket when at 1/4 max HP or less. Single use."
  },
  damprock: {
    name: "Damp Rock",
    description: "Holder's use of Rain Dance lasts 8 turns instead of 5."
  },
  destinyknot: {
    name: "Destiny Knot",
    description: "If holder becomes infatuated, the other Pokemon also becomes infatuated."
  },
  dracoplate: {
    name: "Draco Plate",
    description: "Holder's Dragon-type attacks have 1.2x power. Judgment is Dragon type."
  },
  dragonfang: {
    name: "Dragon Fang",
    description: "Holder's Dragon-type attacks have 1.2x power."
  },
  dreadplate: {
    name: "Dread Plate",
    description: "Holder's Dark-type attacks have 1.2x power. Judgment is Dark type."
  },
  earthplate: {
    name: "Earth Plate",
    description: "Holder's Ground-type attacks have 1.2x power. Judgment is Ground type."
  },
  ejectbutton: {
    name: "Eject Button",
    description: "If holder survives a hit, it immediately switches out to a chosen ally. Single use."
  },
  ejectpack: {
    name: "Eject Pack",
    description: "If the holder's stat stages are lowered, it switches to a chosen ally. Single use."
  },
  electricseed: {
    name: "Electric Seed",
    description: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use."
  },
  enigmaberry: {
    name: "Enigma Berry",
    description: "Restores 1/4 max HP after holder is hit by a supereffective move. Single use."
  },
  eviolite: {
    name: "Eviolite",
    description: "If holder's species can evolve, its Defense and Sp. Def are 1.5x."
  },
  expertbelt: {
    name: "Expert Belt",
    description: "Holder's attacks that are super effective against the target do 1.2x damage."
  },
  fairyfeather: {
    name: "Fairy Feather",
    description: "Holder's Fairy-type attacks have 1.2x power."
  },
  figyberry: {
    name: "Figy Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use."
  },
  fistplate: {
    name: "Fist Plate",
    description: "Holder's Fighting-type attacks have 1.2x power. Judgment is Fighting type."
  },
  flameorb: {
    name: "Flame Orb",
    description: "At the end of every turn, this item attempts to burn the holder."
  },
  flameplate: {
    name: "Flame Plate",
    description: "Holder's Fire-type attacks have 1.2x power. Judgment is Fire type."
  },
  floatstone: {
    name: "Float Stone",
    description: "Holder's weight is halved."
  },
  focusband: {
    name: "Focus Band",
    description: "Holder has a 10% chance to survive an attack that would KO it with 1 HP."
  },
  focussash: {
    name: "Focus Sash",
    description: "If holder's HP is full, will survive an attack that would KO it with 1 HP. Single use."
  },
  ganlonberry: {
    name: "Ganlon Berry",
    description: "Raises holder's Defense by 1 stage when at 1/4 max HP or less. Single use."
  },
  grassyseed: {
    name: "Grassy Seed",
    description: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use."
  },
  grepaberry: {
    name: "Grepa Berry",
    description: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
  },
  gripclaw: {
    name: "Grip Claw",
    description: "Holder's partial-trapping moves always last 7 turns."
  },
  griseouscore: {
    name: "Griseous Core",
    description: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power."
  },
  griseousorb: {
    name: "Griseous Orb",
    description: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power."
  },
  habanberry: {
    name: "Haban Berry",
    description: "Halves damage taken from a supereffective Dragon-type attack. Single use."
  },
  hardstone: {
    name: "Hard Stone",
    description: "Holder's Rock-type attacks have 1.2x power."
  },
  hearthflamemask: {
    name: "Hearthflame Mask",
    description: "Ogerpon-Hearthflame: 1.2x power attacks; Terastallize to gain Embody Aspect."
  },
  heatrock: {
    name: "Heat Rock",
    description: "Holder's use of Sunny Day lasts 8 turns instead of 5."
  },
  heavydutyboots: {
    name: "Heavy-Duty Boots",
    description: "When switching in, the holder is unaffected by hazards on its side of the field."
  },
  iapapaberry: {
    name: "Iapapa Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use."
  },
  icicleplate: {
    name: "Icicle Plate",
    description: "Holder's Ice-type attacks have 1.2x power. Judgment is Ice type."
  },
  icyrock: {
    name: "Icy Rock",
    description: "Holder's use of Snowscape lasts 8 turns instead of 5."
  },
  insectplate: {
    name: "Insect Plate",
    description: "Holder's Bug-type attacks have 1.2x power. Judgment is Bug type."
  },
  ironball: {
    name: "Iron Ball",
    description: "Holder is grounded, Speed halved. If Flying type, takes neutral Ground damage."
  },
  ironplate: {
    name: "Iron Plate",
    description: "Holder's Steel-type attacks have 1.2x power. Judgment is Steel type."
  },
  jabocaberry: {
    name: "Jaboca Berry",
    description: "If holder is hit by a physical move, attacker loses 1/8 of its max HP. Single use."
  },
  kasibberry: {
    name: "Kasib Berry",
    description: "Halves damage taken from a supereffective Ghost-type attack. Single use."
  },
  kebiaberry: {
    name: "Kebia Berry",
    description: "Halves damage taken from a supereffective Poison-type attack. Single use."
  },
  keeberry: {
    name: "Kee Berry",
    description: "Raises holder's Defense by 1 stage after it is hit by a physical attack. Single use."
  },
  kelpsyberry: {
    name: "Kelpsy Berry",
    description: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
  },
  kingsrock: {
    name: "King's Rock",
    description: "Holder's attacks without a chance to flinch gain a 10% chance to flinch."
  },
  laggingtail: {
    name: "Lagging Tail",
    description: "Holder moves last in its priority bracket."
  },
  lansatberry: {
    name: "Lansat Berry",
    description: "Holder gains the Focus Energy effect when at 1/4 max HP or less. Single use."
  },
  leftovers: {
    name: "Leftovers",
    description: "At the end of every turn, holder restores 1/16 of its max HP."
  },
  leppaberry: {
    name: "Leppa Berry",
    description: "Restores 10 PP to the first of the holder's moves to reach 0 PP. Single use."
  },
  liechiberry: {
    name: "Liechi Berry",
    description: "Raises holder's Attack by 1 stage when at 1/4 max HP or less. Single use."
  },
  lifeorb: {
    name: "Life Orb",
    description: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack."
  },
  lightball: {
    name: "Light Ball",
    description: "If held by a Pikachu, its Attack and Sp. Atk are doubled."
  },
  lightclay: {
    name: "Light Clay",
    description: "Holder's use of Aurora Veil, Light Screen, or Reflect lasts 8 turns instead of 5."
  },
  loadeddice: {
    name: "Loaded Dice",
    description: "Holder's moves that hit 2-5 times hit 4-5 times; Population Bomb hits 4-10 times."
  },
  lumberry: {
    name: "Lum Berry",
    description: "Holder cures itself if it has a non-volatile status or is confused. Single use."
  },
  luminousmoss: {
    name: "Luminous Moss",
    description: "Raises holder's Sp. Def by 1 stage if hit by a Water-type attack. Single use."
  },
  lustrousglobe: {
    name: "Lustrous Globe",
    description: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power."
  },
  lustrousorb: {
    name: "Lustrous Orb",
    description: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power."
  },
  magnet: {
    name: "Magnet",
    description: "Holder's Electric-type attacks have 1.2x power."
  },
  magoberry: {
    name: "Mago Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use."
  },
  marangaberry: {
    name: "Maranga Berry",
    description: "Raises holder's Sp. Def by 1 stage after it is hit by a special attack. Single use."
  },
  meadowplate: {
    name: "Meadow Plate",
    description: "Holder's Grass-type attacks have 1.2x power. Judgment is Grass type."
  },
  mentalherb: {
    name: "Mental Herb",
    description: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment. Single use."
  },
  metalcoat: {
    name: "Metal Coat",
    description: "Holder's Steel-type attacks have 1.2x power."
  },
  metronome: {
    name: "Metronome",
    description: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns."
  },
  micleberry: {
    name: "Micle Berry",
    description: "Holder's next move has 1.2x accuracy when at 1/4 max HP or less. Single use."
  },
  mindplate: {
    name: "Mind Plate",
    description: "Holder's Psychic-type attacks have 1.2x power. Judgment is Psychic type."
  },
  miracleseed: {
    name: "Miracle Seed",
    description: "Holder's Grass-type attacks have 1.2x power."
  },
  mirrorherb: {
    name: "Mirror Herb",
    description: "When an opposing Pokemon raises a stat stage, the holder copies it. Single use."
  },
  mistyseed: {
    name: "Misty Seed",
    description: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use."
  },
  muscleband: {
    name: "Muscle Band",
    description: "Holder's physical attacks have 1.1x power."
  },
  mysticwater: {
    name: "Mystic Water",
    description: "Holder's Water-type attacks have 1.2x power."
  },
  nevermeltice: {
    name: "Never-Melt Ice",
    description: "Holder's Ice-type attacks have 1.2x power."
  },
  normalgem: {
    name: "Normal Gem",
    description: "Holder's first successful Normal-type attack will have 1.3x power. Single use."
  },
  occaberry: {
    name: "Occa Berry",
    description: "Halves damage taken from a supereffective Fire-type attack. Single use."
  },
  oranberry: {
    name: "Oran Berry",
    description: "Restores 10 HP when at 1/2 max HP or less. Single use."
  },
  passhoberry: {
    name: "Passho Berry",
    description: "Halves damage taken from a supereffective Water-type attack. Single use."
  },
  payapaberry: {
    name: "Payapa Berry",
    description: "Halves damage taken from a supereffective Psychic-type attack. Single use."
  },
  pechaberry: {
    name: "Pecha Berry",
    description: "Holder is cured if it is poisoned. Single use."
  },
  persimberry: {
    name: "Persim Berry",
    description: "Holder is cured if it is confused. Single use."
  },
  petayaberry: {
    name: "Petaya Berry",
    description: "Raises holder's Sp. Atk by 1 stage when at 1/4 max HP or less. Single use."
  },
  pixieplate: {
    name: "Pixie Plate",
    description: "Holder's Fairy-type attacks have 1.2x power. Judgment is Fairy type."
  },
  poisonbarb: {
    name: "Poison Barb",
    description: "Holder's Poison-type attacks have 1.2x power."
  },
  poweranklet: {
    name: "Power Anklet",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect."
  },
  powerband: {
    name: "Power Band",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect."
  },
  powerbelt: {
    name: "Power Belt",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect."
  },
  powerbracer: {
    name: "Power Bracer",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect."
  },
  powerherb: {
    name: "Power Herb",
    description: "Holder's two-turn moves complete in one turn (except Sky Drop). Single use."
  },
  powerlens: {
    name: "Power Lens",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect."
  },
  powerweight: {
    name: "Power Weight",
    description: "Holder's Speed is halved. The Klutz Ability does not ignore this effect."
  },
  protectivepads: {
    name: "Protective Pads",
    description: "Holder's moves are protected from adverse contact effects, except Pickpocket."
  },
  psychicseed: {
    name: "Psychic Seed",
    description: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use."
  },
  punchingglove: {
    name: "Punching Glove",
    description: "Holder's punch-based attacks have 1.1x power and do not make contact."
  },
  quickclaw: {
    name: "Quick Claw",
    description: "Each turn, holder has a 20% chance to move first in its priority bracket."
  },
  rawstberry: {
    name: "Rawst Berry",
    description: "Holder is cured if it is burned. Single use."
  },
  razorclaw: {
    name: "Razor Claw",
    description: "Holder's critical hit ratio is raised by 1 stage."
  },
  razorfang: {
    name: "Razor Fang",
    description: "Holder's attacks without a chance to flinch gain a 10% chance to flinch."
  },
  redcard: {
    name: "Red Card",
    description: "If holder survives a hit, attacker is forced to switch to a random ally. Single use."
  },
  rindoberry: {
    name: "Rindo Berry",
    description: "Halves damage taken from a supereffective Grass-type attack. Single use."
  },
  ringtarget: {
    name: "Ring Target",
    description: "The holder's type immunities granted solely by its typing are negated."
  },
  rockyhelmet: {
    name: "Rocky Helmet",
    description: "If holder is hit by a contact move, the attacker loses 1/6 of its max HP."
  },
  roomservice: {
    name: "Room Service",
    description: "If Trick Room is active, the holder's Speed is lowered by 1 stage. Single use."
  },
  roseliberry: {
    name: "Roseli Berry",
    description: "Halves damage taken from a supereffective Fairy-type attack. Single use."
  },
  rowapberry: {
    name: "Rowap Berry",
    description: "If holder is hit by a special move, attacker loses 1/8 of its max HP. Single use."
  },
  rustedshield: {
    name: "Rusted Shield",
    description: "If held by a Zamazenta, this item changes its forme to Crowned Shield."
  },
  rustedsword: {
    name: "Rusted Sword",
    description: "If held by a Zacian, this item changes its forme to Crowned Sword."
  },
  safetygoggles: {
    name: "Safety Goggles",
    description: "Holder is immune to powder moves and damage from Sandstorm or Hail."
  },
  salacberry: {
    name: "Salac Berry",
    description: "Raises holder's Speed by 1 stage when at 1/4 max HP or less. Single use."
  },
  scopelens: {
    name: "Scope Lens",
    description: "Holder's critical hit ratio is raised by 1 stage."
  },
  sharpbeak: {
    name: "Sharp Beak",
    description: "Holder's Flying-type attacks have 1.2x power."
  },
  shedshell: {
    name: "Shed Shell",
    description: "Holder cannot be prevented from choosing to switch out by any effect."
  },
  shellbell: {
    name: "Shell Bell",
    description: "After an attack, holder gains 1/8 of the damage in HP dealt to other Pokemon."
  },
  shucaberry: {
    name: "Shuca Berry",
    description: "Halves damage taken from a supereffective Ground-type attack. Single use."
  },
  silkscarf: {
    name: "Silk Scarf",
    description: "Holder's Normal-type attacks have 1.2x power."
  },
  silverpowder: {
    name: "Silver Powder",
    description: "Holder's Bug-type attacks have 1.2x power."
  },
  sitrusberry: {
    name: "Sitrus Berry",
    description: "Restores 1/4 max HP when at 1/2 max HP or less. Single use."
  },
  skyplate: {
    name: "Sky Plate",
    description: "Holder's Flying-type attacks have 1.2x power. Judgment is Flying type."
  },
  smoothrock: {
    name: "Smooth Rock",
    description: "Holder's use of Sandstorm lasts 8 turns instead of 5."
  },
  snowball: {
    name: "Snowball",
    description: "Raises holder's Attack by 1 if hit by an Ice-type attack. Single use."
  },
  softsand: {
    name: "Soft Sand",
    description: "Holder's Ground-type attacks have 1.2x power."
  },
  souldew: {
    name: "Soul Dew",
    description: "If held by a Latias/Latios, its Dragon- and Psychic-type moves have 1.2x power."
  },
  spelltag: {
    name: "Spell Tag",
    description: "Holder's Ghost-type attacks have 1.2x power."
  },
  splashplate: {
    name: "Splash Plate",
    description: "Holder's Water-type attacks have 1.2x power. Judgment is Water type."
  },
  spookyplate: {
    name: "Spooky Plate",
    description: "Holder's Ghost-type attacks have 1.2x power. Judgment is Ghost type."
  },
  starfberry: {
    name: "Starf Berry",
    description: "Raises a random stat by 2 when at 1/4 max HP or less (not acc/eva). Single use."
  },
  stickybarb: {
    name: "Sticky Barb",
    description: "Each turn, holder loses 1/8 max HP. An attacker making contact can receive it."
  },
  stoneplate: {
    name: "Stone Plate",
    description: "Holder's Rock-type attacks have 1.2x power. Judgment is Rock type."
  },
  tangaberry: {
    name: "Tanga Berry",
    description: "Halves damage taken from a supereffective Bug-type attack. Single use."
  },
  terrainextender: {
    name: "Terrain Extender",
    description: "Holder's use of Electric/Grassy/Misty/Psychic Terrain lasts 8 turns instead of 5."
  },
  throatspray: {
    name: "Throat Spray",
    description: "Raises holder's Special Attack by 1 stage after it uses a sound move. Single use."
  },
  toxicorb: {
    name: "Toxic Orb",
    description: "At the end of every turn, this item attempts to badly poison the holder."
  },
  toxicplate: {
    name: "Toxic Plate",
    description: "Holder's Poison-type attacks have 1.2x power. Judgment is Poison type."
  },
  twistedspoon: {
    name: "Twisted Spoon",
    description: "Holder's Psychic-type attacks have 1.2x power."
  },
  utilityumbrella: {
    name: "Utility Umbrella",
    description: "The holder ignores rain- and sun-based effects."
  },
  wacanberry: {
    name: "Wacan Berry",
    description: "Halves damage taken from a supereffective Electric-type attack. Single use."
  },
  weaknesspolicy: {
    name: "Weakness Policy",
    description: "If holder is hit super effectively, raises Attack, Sp. Atk by 2 stages. Single use."
  },
  wellspringmask: {
    name: "Wellspring Mask",
    description: "Ogerpon-Wellspring: 1.2x power attacks; Terastallize to gain Embody Aspect."
  },
  whiteherb: {
    name: "White Herb",
    description: "Restores all lowered stat stages to 0 when one is less than 0. Single use."
  },
  widelens: {
    name: "Wide Lens",
    description: "The accuracy of attacks by the holder is 1.1x."
  },
  wikiberry: {
    name: "Wiki Berry",
    description: "Restores 1/3 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use."
  },
  wiseglasses: {
    name: "Wise Glasses",
    description: "Holder's special attacks have 1.1x power."
  },
  yacheberry: {
    name: "Yache Berry",
    description: "Halves damage taken from a supereffective Ice-type attack. Single use."
  },
  zapplate: {
    name: "Zap Plate",
    description: "Holder's Electric-type attacks have 1.2x power. Judgment is Electric type."
  },
  zoomlens: {
    name: "Zoom Lens",
    description: "The accuracy of attacks by the holder is 1.2x if it moves after its target."
  }
}
