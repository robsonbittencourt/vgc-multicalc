import { TypeName } from "@data/types"

export const EV_ITEMS = ["Macho Brace", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight"]

const ITEM_BOOST_TYPES: Record<string, TypeName> = {
  "Draco Plate": "Dragon",
  "Dragon Fang": "Dragon",
  "Dread Plate": "Dark",
  "Black Glasses": "Dark",
  "Earth Plate": "Ground",
  "Soft Sand": "Ground",
  "Fist Plate": "Fighting",
  "Black Belt": "Fighting",
  "Flame Plate": "Fire",
  Charcoal: "Fire",
  "Icicle Plate": "Ice",
  "Never-Melt Ice": "Ice",
  "Insect Plate": "Bug",
  "Silver Powder": "Bug",
  "Iron Plate": "Steel",
  "Metal Coat": "Steel",
  "Meadow Plate": "Grass",
  "Rose Incense": "Grass",
  "Miracle Seed": "Grass",
  "Mind Plate": "Psychic",
  "Odd Incense": "Psychic",
  "Twisted Spoon": "Psychic",
  "Fairy Feather": "Fairy",
  "Pixie Plate": "Fairy",
  "Sky Plate": "Flying",
  "Sharp Beak": "Flying",
  "Splash Plate": "Water",
  "Sea Incense": "Water",
  "Wave Incense": "Water",
  "Mystic Water": "Water",
  "Spooky Plate": "Ghost",
  "Spell Tag": "Ghost",
  "Stone Plate": "Rock",
  "Rock Incense": "Rock",
  "Hard Stone": "Rock",
  "Toxic Plate": "Poison",
  "Poison Barb": "Poison",
  "Zap Plate": "Electric",
  Magnet: "Electric",
  "Silk Scarf": "Normal",
  "Pink Bow": "Normal",
  "Polkadot Bow": "Normal"
}

export function getItemBoostType(item: string | undefined): TypeName | undefined {
  return item ? ITEM_BOOST_TYPES[item] : undefined
}

const BERRY_RESIST_TYPES: Record<string, TypeName> = {
  "Chilan Berry": "Normal",
  "Occa Berry": "Fire",
  "Passho Berry": "Water",
  "Wacan Berry": "Electric",
  "Rindo Berry": "Grass",
  "Yache Berry": "Ice",
  "Chople Berry": "Fighting",
  "Kebia Berry": "Poison",
  "Shuca Berry": "Ground",
  "Coba Berry": "Flying",
  "Payapa Berry": "Psychic",
  "Tanga Berry": "Bug",
  "Charti Berry": "Rock",
  "Kasib Berry": "Ghost",
  "Haban Berry": "Dragon",
  "Colbur Berry": "Dark",
  "Babiri Berry": "Steel",
  "Roseli Berry": "Fairy"
}

export function getBerryResistType(berry: string | undefined): TypeName | undefined {
  return berry ? BERRY_RESIST_TYPES[berry] : undefined
}

const FLING_120 = new Set(["TR24", "TR28", "TR34", "TR39", "TR53", "TR55", "TR64", "TR66", "TR72", "TR73"])
const FLING_100 = new Set(["Hard Stone"])
const FLING_90 = new Set(["Deep Sea Tooth", "Thick Club"])
const FLING_85 = new Set(["TR01", "TR41", "TR62", "TR93", "TR97", "TR98"])
const FLING_80 = new Set(["Assault Vest", "Quick Claw", "Razor Claw", "Sticky Barb", "Weakness Policy"])
const FLING_70 = new Set(["Dragon Fang", "Poison Barb", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight"])
const FLING_60 = new Set(["Adamant Orb", "Damp Rock", "Griseous Orb", "Heat Rock", "Lustrous Orb", "Macho Brace", "Rocky Helmet", "Terrain Extender"])
const FLING_30 = new Set([
  "Absorb Bulb",
  "Berry Juice",
  "Black Belt",
  "Black Glasses",
  "Cell Battery",
  "Charcoal",
  "Dragon Scale",
  "Eject Button",
  "Fire Stone",
  "Flame Orb",
  "King's Rock",
  "Life Orb",
  "Light Ball",
  "Light Clay",
  "Magnet",
  "Metronome",
  "Metal Coat",
  "Miracle Seed",
  "Mystic Water",
  "Never-Melt Ice",
  "Razor Fang",
  "Scope Lens",
  "Shell Bell",
  "Spell Tag",
  "Thunder Stone",
  "Toxic Orb",
  "Twisted Spoon",
  "Water Stone"
])
const FLING_10 = new Set([
  "Air Balloon",
  "Big Root",
  "Bright Powder",
  "Choice Band",
  "Choice Scarf",
  "Choice Specs",
  "Destiny Knot",
  "Expert Belt",
  "Fairy Feather",
  "Focus Band",
  "Focus Sash",
  "Full Incense",
  "Lax Incense",
  "Leftovers",
  "Mental Herb",
  "Metal Powder",
  "Muscle Band",
  "Power Herb",
  "Red Card",
  "Ring Target",
  "Shed Shell",
  "Silk Scarf",
  "Silver Powder",
  "Smooth Rock",
  "Soft Sand",
  "White Herb",
  "Wide Lens",
  "Wise Glasses",
  "Zoom Lens"
])

export function getFlingPower(item: string | undefined): number {
  if (!item) return 0
  if (["Big Nugget", "Iron Ball", "TR43", "TR71"].includes(item)) return 130
  if (FLING_120.has(item)) return 120
  if (["TR03", "TR06", "TR09", "TR15", "TR89"].includes(item)) return 110
  if (FLING_100.has(item)) return 100
  if (["TR36", "TR78", "TR81", "TR94"].includes(item)) return 95
  if (item.includes("Plate") || FLING_90.has(item)) return 90
  if (FLING_85.has(item)) return 85
  if (FLING_80.has(item)) return 80
  if (FLING_70.has(item)) return 70
  if (FLING_60.has(item)) return 60
  if (["Eject Pack", "Sharp Beak", "Dubious Disc"].includes(item)) return 50
  if (["Icy Rock", "Eviolite", "Lucky Punch"].includes(item)) return 40
  if (FLING_30.has(item)) return 30
  if (["TR82", "Pretty Feather"].includes(item)) return 20
  if (item.includes("Berry") || FLING_10.has(item)) return 10
  return 0
}
