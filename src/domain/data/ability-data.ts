import { toID } from "@data/id"

export type AbilityName = (typeof ABILITY_DETAILS)[keyof typeof ABILITY_DETAILS]["name"]

export interface AbilityData {
  name: string
}

export function getAbilityData(name: string): AbilityData | undefined {
  return (ABILITY_DETAILS as Record<string, AbilityData>)[toID(name)]
}

export function getAllAbilities(): AbilityData[] {
  return Object.values(ABILITY_DETAILS)
}

export const ABILITY_DETAILS = {
  adaptability: {
    name: "Adaptability"
  },
  aerilate: {
    name: "Aerilate"
  },
  aftermath: {
    name: "Aftermath"
  },
  airlock: {
    name: "Air Lock"
  },
  analytic: {
    name: "Analytic"
  },
  angerpoint: {
    name: "Anger Point"
  },
  angershell: {
    name: "Anger Shell"
  },
  anticipation: {
    name: "Anticipation"
  },
  arenatrap: {
    name: "Arena Trap"
  },
  armortail: {
    name: "Armor Tail"
  },
  aromaveil: {
    name: "Aroma Veil"
  },
  asoneglastrier: {
    name: "As One (Glastrier)"
  },
  asonespectrier: {
    name: "As One (Spectrier)"
  },
  aurabreak: {
    name: "Aura Break"
  },
  auraguard: {
    name: "Aura Guard"
  },
  baddreams: {
    name: "Bad Dreams"
  },
  ballfetch: {
    name: "Ball Fetch"
  },
  battery: {
    name: "Battery"
  },
  battlearmor: {
    name: "Battle Armor"
  },
  battlebond: {
    name: "Battle Bond"
  },
  beadsofruin: {
    name: "Beads of Ruin"
  },
  beastboost: {
    name: "Beast Boost"
  },
  berserk: {
    name: "Berserk"
  },
  bigpecks: {
    name: "Big Pecks"
  },
  blaze: {
    name: "Blaze"
  },
  bulletproof: {
    name: "Bulletproof"
  },
  cheekpouch: {
    name: "Cheek Pouch"
  },
  chillingneigh: {
    name: "Chilling Neigh"
  },
  chlorophyll: {
    name: "Chlorophyll"
  },
  clearbody: {
    name: "Clear Body"
  },
  cloudnine: {
    name: "Cloud Nine"
  },
  colorchange: {
    name: "Color Change"
  },
  comatose: {
    name: "Comatose"
  },
  commander: {
    name: "Commander"
  },
  competitive: {
    name: "Competitive"
  },
  compoundeyes: {
    name: "Compound Eyes"
  },
  contrary: {
    name: "Contrary"
  },
  corrosion: {
    name: "Corrosion"
  },
  costar: {
    name: "Costar"
  },
  cottondown: {
    name: "Cotton Down"
  },
  cudchew: {
    name: "Cud Chew"
  },
  curiousmedicine: {
    name: "Curious Medicine"
  },
  cursedbody: {
    name: "Cursed Body"
  },
  cutecharm: {
    name: "Cute Charm"
  },
  damp: {
    name: "Damp"
  },
  dancer: {
    name: "Dancer"
  },
  darkaura: {
    name: "Dark Aura"
  },
  dauntlessshield: {
    name: "Dauntless Shield"
  },
  dazzling: {
    name: "Dazzling"
  },
  defeatist: {
    name: "Defeatist"
  },
  defiant: {
    name: "Defiant"
  },
  deltastream: {
    name: "Delta Stream"
  },
  desolateland: {
    name: "Desolate Land"
  },
  disguise: {
    name: "Disguise"
  },
  download: {
    name: "Download"
  },
  dragonize: {
    name: "Dragonize"
  },
  dragonsmaw: {
    name: "Dragon's Maw"
  },
  drizzle: {
    name: "Drizzle"
  },
  drought: {
    name: "Drought"
  },
  dryskin: {
    name: "Dry Skin"
  },
  earlybird: {
    name: "Early Bird"
  },
  eartheater: {
    name: "Earth Eater"
  },
  eelevate: {
    name: "Eelevate"
  },
  effectspore: {
    name: "Effect Spore"
  },
  electricsurge: {
    name: "Electric Surge"
  },
  electromorphosis: {
    name: "Electromorphosis"
  },
  embodyaspectcornerstone: {
    name: "Embody Aspect (Cornerstone)"
  },
  embodyaspecthearthflame: {
    name: "Embody Aspect (Hearthflame)"
  },
  embodyaspectteal: {
    name: "Embody Aspect (Teal)"
  },
  embodyaspectwellspring: {
    name: "Embody Aspect (Wellspring)"
  },
  emergencyexit: {
    name: "Emergency Exit"
  },
  fairyaura: {
    name: "Fairy Aura"
  },
  filter: {
    name: "Filter"
  },
  firemane: {
    name: "Fire Mane"
  },
  flamebody: {
    name: "Flame Body"
  },
  flareboost: {
    name: "Flare Boost"
  },
  flashfire: {
    name: "Flash Fire"
  },
  flowergift: {
    name: "Flower Gift"
  },
  flowerveil: {
    name: "Flower Veil"
  },
  fluffy: {
    name: "Fluffy"
  },
  forecast: {
    name: "Forecast"
  },
  forewarn: {
    name: "Forewarn"
  },
  friendguard: {
    name: "Friend Guard"
  },
  frisk: {
    name: "Frisk"
  },
  fullmetalbody: {
    name: "Full Metal Body"
  },
  furcoat: {
    name: "Fur Coat"
  },
  galewings: {
    name: "Gale Wings"
  },
  galvanize: {
    name: "Galvanize"
  },
  gluttony: {
    name: "Gluttony"
  },
  goodasgold: {
    name: "Good as Gold"
  },
  gooey: {
    name: "Gooey"
  },
  gorillatactics: {
    name: "Gorilla Tactics"
  },
  grasspelt: {
    name: "Grass Pelt"
  },
  grassysurge: {
    name: "Grassy Surge"
  },
  grimneigh: {
    name: "Grim Neigh"
  },
  guarddog: {
    name: "Guard Dog"
  },
  gulpmissile: {
    name: "Gulp Missile"
  },
  guts: {
    name: "Guts"
  },
  hadronengine: {
    name: "Hadron Engine"
  },
  harvest: {
    name: "Harvest"
  },
  healer: {
    name: "Healer"
  },
  heatproof: {
    name: "Heatproof"
  },
  heavymetal: {
    name: "Heavy Metal"
  },
  honeygather: {
    name: "Honey Gather"
  },
  hospitality: {
    name: "Hospitality"
  },
  hugepower: {
    name: "Huge Power"
  },
  hungerswitch: {
    name: "Hunger Switch"
  },
  hustle: {
    name: "Hustle"
  },
  hydration: {
    name: "Hydration"
  },
  hypercutter: {
    name: "Hyper Cutter"
  },
  icebody: {
    name: "Ice Body"
  },
  iceface: {
    name: "Ice Face"
  },
  icescales: {
    name: "Ice Scales"
  },
  illuminate: {
    name: "Illuminate"
  },
  illusion: {
    name: "Illusion"
  },
  immunity: {
    name: "Immunity"
  },
  imposter: {
    name: "Imposter"
  },
  infiltrator: {
    name: "Infiltrator"
  },
  innardsout: {
    name: "Innards Out"
  },
  innerfocus: {
    name: "Inner Focus"
  },
  insomnia: {
    name: "Insomnia"
  },
  intimidate: {
    name: "Intimidate"
  },
  intrepidsword: {
    name: "Intrepid Sword"
  },
  ironbarbs: {
    name: "Iron Barbs"
  },
  ironfist: {
    name: "Iron Fist"
  },
  justified: {
    name: "Justified"
  },
  keeneye: {
    name: "Keen Eye"
  },
  klutz: {
    name: "Klutz"
  },
  leafguard: {
    name: "Leaf Guard"
  },
  levitate: {
    name: "Levitate"
  },
  libero: {
    name: "Libero"
  },
  lightmetal: {
    name: "Light Metal"
  },
  lightningrod: {
    name: "Lightning Rod"
  },
  limber: {
    name: "Limber"
  },
  lingeringaroma: {
    name: "Lingering Aroma"
  },
  liquidooze: {
    name: "Liquid Ooze"
  },
  liquidvoice: {
    name: "Liquid Voice"
  },
  longreach: {
    name: "Long Reach"
  },
  magicbounce: {
    name: "Magic Bounce"
  },
  magicguard: {
    name: "Magic Guard"
  },
  magician: {
    name: "Magician"
  },
  magmaarmor: {
    name: "Magma Armor"
  },
  magnetpull: {
    name: "Magnet Pull"
  },
  marvelscale: {
    name: "Marvel Scale"
  },
  megalauncher: {
    name: "Mega Launcher"
  },
  megasol: {
    name: "Mega Sol"
  },
  merciless: {
    name: "Merciless"
  },
  mimicry: {
    name: "Mimicry"
  },
  mindseye: {
    name: "Mind's Eye"
  },
  minus: {
    name: "Minus"
  },
  mirrorarmor: {
    name: "Mirror Armor"
  },
  mistysurge: {
    name: "Misty Surge"
  },
  moldbreaker: {
    name: "Mold Breaker"
  },
  moody: {
    name: "Moody"
  },
  motordrive: {
    name: "Motor Drive"
  },
  moxie: {
    name: "Moxie"
  },
  multiscale: {
    name: "Multiscale"
  },
  multitype: {
    name: "Multitype"
  },
  mummy: {
    name: "Mummy"
  },
  myceliummight: {
    name: "Mycelium Might"
  },
  naturalcure: {
    name: "Natural Cure"
  },
  neuroforce: {
    name: "Neuroforce"
  },
  neutralizinggas: {
    name: "Neutralizing Gas"
  },
  noguard: {
    name: "No Guard"
  },
  normalize: {
    name: "Normalize"
  },
  oblivious: {
    name: "Oblivious"
  },
  opportunist: {
    name: "Opportunist"
  },
  orichalcumpulse: {
    name: "Orichalcum Pulse"
  },
  overcoat: {
    name: "Overcoat"
  },
  overgrow: {
    name: "Overgrow"
  },
  owntempo: {
    name: "Own Tempo"
  },
  parentalbond: {
    name: "Parental Bond"
  },
  pastelveil: {
    name: "Pastel Veil"
  },
  perishbody: {
    name: "Perish Body"
  },
  pickpocket: {
    name: "Pickpocket"
  },
  pickup: {
    name: "Pickup"
  },
  piercingdrill: {
    name: "Piercing Drill"
  },
  pixilate: {
    name: "Pixilate"
  },
  plus: {
    name: "Plus"
  },
  poisonheal: {
    name: "Poison Heal"
  },
  poisonpoint: {
    name: "Poison Point"
  },
  poisonpuppeteer: {
    name: "Poison Puppeteer"
  },
  poisontouch: {
    name: "Poison Touch"
  },
  powerconstruct: {
    name: "Power Construct"
  },
  powerofalchemy: {
    name: "Power of Alchemy"
  },
  powerspot: {
    name: "Power Spot"
  },
  prankster: {
    name: "Prankster"
  },
  pressure: {
    name: "Pressure"
  },
  primordialsea: {
    name: "Primordial Sea"
  },
  prismarmor: {
    name: "Prism Armor"
  },
  propellertail: {
    name: "Propeller Tail"
  },
  protean: {
    name: "Protean"
  },
  protosynthesis: {
    name: "Protosynthesis"
  },
  psychicsurge: {
    name: "Psychic Surge"
  },
  punkrock: {
    name: "Punk Rock"
  },
  purepower: {
    name: "Pure Power"
  },
  purifyingsalt: {
    name: "Purifying Salt"
  },
  quarkdrive: {
    name: "Quark Drive"
  },
  queenlymajesty: {
    name: "Queenly Majesty"
  },
  quickdraw: {
    name: "Quick Draw"
  },
  quickfeet: {
    name: "Quick Feet"
  },
  raindish: {
    name: "Rain Dish"
  },
  rattled: {
    name: "Rattled"
  },
  receiver: {
    name: "Receiver"
  },
  reckless: {
    name: "Reckless"
  },
  refrigerate: {
    name: "Refrigerate"
  },
  regenerator: {
    name: "Regenerator"
  },
  ripen: {
    name: "Ripen"
  },
  rivalry: {
    name: "Rivalry"
  },
  rkssystem: {
    name: "RKS System"
  },
  rockhead: {
    name: "Rock Head"
  },
  rockypayload: {
    name: "Rocky Payload"
  },
  roughskin: {
    name: "Rough Skin"
  },
  runaway: {
    name: "Run Away"
  },
  sandforce: {
    name: "Sand Force"
  },
  sandrush: {
    name: "Sand Rush"
  },
  sandspit: {
    name: "Sand Spit"
  },
  sandstream: {
    name: "Sand Stream"
  },
  sandveil: {
    name: "Sand Veil"
  },
  sapsipper: {
    name: "Sap Sipper"
  },
  schooling: {
    name: "Schooling"
  },
  scrappy: {
    name: "Scrappy"
  },
  screencleaner: {
    name: "Screen Cleaner"
  },
  seedsower: {
    name: "Seed Sower"
  },
  serenegrace: {
    name: "Serene Grace"
  },
  shadowshield: {
    name: "Shadow Shield"
  },
  shadowtag: {
    name: "Shadow Tag"
  },
  sharpness: {
    name: "Sharpness"
  },
  shedskin: {
    name: "Shed Skin"
  },
  sheerforce: {
    name: "Sheer Force"
  },
  shellarmor: {
    name: "Shell Armor"
  },
  shielddust: {
    name: "Shield Dust"
  },
  shieldsdown: {
    name: "Shields Down"
  },
  simple: {
    name: "Simple"
  },
  skilllink: {
    name: "Skill Link"
  },
  slowstart: {
    name: "Slow Start"
  },
  slushrush: {
    name: "Slush Rush"
  },
  sniper: {
    name: "Sniper"
  },
  snowcloak: {
    name: "Snow Cloak"
  },
  snowwarning: {
    name: "Snow Warning"
  },
  solarpower: {
    name: "Solar Power"
  },
  solidrock: {
    name: "Solid Rock"
  },
  soulheart: {
    name: "Soul-Heart"
  },
  soundproof: {
    name: "Soundproof"
  },
  speedboost: {
    name: "Speed Boost"
  },
  spicyspray: {
    name: "Spicy Spray"
  },
  stakeout: {
    name: "Stakeout"
  },
  stall: {
    name: "Stall"
  },
  stalwart: {
    name: "Stalwart"
  },
  stamina: {
    name: "Stamina"
  },
  stancechange: {
    name: "Stance Change"
  },
  static: {
    name: "Static"
  },
  steadfast: {
    name: "Steadfast"
  },
  steamengine: {
    name: "Steam Engine"
  },
  steelworker: {
    name: "Steelworker"
  },
  steelyspirit: {
    name: "Steely Spirit"
  },
  stench: {
    name: "Stench"
  },
  stickyhold: {
    name: "Sticky Hold"
  },
  stormdrain: {
    name: "Storm Drain"
  },
  strongjaw: {
    name: "Strong Jaw"
  },
  sturdy: {
    name: "Sturdy"
  },
  suctioncups: {
    name: "Suction Cups"
  },
  superluck: {
    name: "Super Luck"
  },
  supersweetsyrup: {
    name: "Supersweet Syrup"
  },
  supremeoverlord: {
    name: "Supreme Overlord"
  },
  surgesurfer: {
    name: "Surge Surfer"
  },
  swarm: {
    name: "Swarm"
  },
  sweetveil: {
    name: "Sweet Veil"
  },
  swiftswim: {
    name: "Swift Swim"
  },
  swordofruin: {
    name: "Sword of Ruin"
  },
  symbiosis: {
    name: "Symbiosis"
  },
  synchronize: {
    name: "Synchronize"
  },
  tabletsofruin: {
    name: "Tablets of Ruin"
  },
  tangledfeet: {
    name: "Tangled Feet"
  },
  tanglinghair: {
    name: "Tangling Hair"
  },
  technician: {
    name: "Technician"
  },
  telepathy: {
    name: "Telepathy"
  },
  teraformzero: {
    name: "Teraform Zero"
  },
  terashell: {
    name: "Tera Shell"
  },
  terashift: {
    name: "Tera Shift"
  },
  teravolt: {
    name: "Teravolt"
  },
  thermalexchange: {
    name: "Thermal Exchange"
  },
  thickfat: {
    name: "Thick Fat"
  },
  tintedlens: {
    name: "Tinted Lens"
  },
  torrent: {
    name: "Torrent"
  },
  toughclaws: {
    name: "Tough Claws"
  },
  toxicboost: {
    name: "Toxic Boost"
  },
  toxicchain: {
    name: "Toxic Chain"
  },
  toxicdebris: {
    name: "Toxic Debris"
  },
  trace: {
    name: "Trace"
  },
  transistor: {
    name: "Transistor"
  },
  triage: {
    name: "Triage"
  },
  truant: {
    name: "Truant"
  },
  turboblaze: {
    name: "Turboblaze"
  },
  unaware: {
    name: "Unaware"
  },
  unburden: {
    name: "Unburden"
  },
  unnerve: {
    name: "Unnerve"
  },
  unseenfist: {
    name: "Unseen Fist"
  },
  vesselofruin: {
    name: "Vessel of Ruin"
  },
  victorystar: {
    name: "Victory Star"
  },
  vitalspirit: {
    name: "Vital Spirit"
  },
  voltabsorb: {
    name: "Volt Absorb"
  },
  wanderingspirit: {
    name: "Wandering Spirit"
  },
  waterabsorb: {
    name: "Water Absorb"
  },
  waterbubble: {
    name: "Water Bubble"
  },
  watercompaction: {
    name: "Water Compaction"
  },
  waterveil: {
    name: "Water Veil"
  },
  weakarmor: {
    name: "Weak Armor"
  },
  wellbakedbody: {
    name: "Well-Baked Body"
  },
  whitesmoke: {
    name: "White Smoke"
  },
  wimpout: {
    name: "Wimp Out"
  },
  windpower: {
    name: "Wind Power"
  },
  windrider: {
    name: "Wind Rider"
  },
  wonderguard: {
    name: "Wonder Guard"
  },
  wonderskin: {
    name: "Wonder Skin"
  },
  zenmode: {
    name: "Zen Mode"
  },
  zerotohero: {
    name: "Zero to Hero"
  }
} as const
