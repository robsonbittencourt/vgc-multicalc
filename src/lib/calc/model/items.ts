import { TypeName } from "@vgc-types/calc-types"

export const EV_ITEMS = ["Macho Brace", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight"]

export function getItemBoostType(item: string | undefined): TypeName | undefined {
  switch (item) {
    case "Draco Plate":
    case "Dragon Fang":
      return "Dragon"
    case "Dread Plate":
    case "Black Glasses":
      return "Dark"
    case "Earth Plate":
    case "Soft Sand":
      return "Ground"
    case "Fist Plate":
    case "Black Belt":
      return "Fighting"
    case "Flame Plate":
    case "Charcoal":
      return "Fire"
    case "Icicle Plate":
    case "Never-Melt Ice":
      return "Ice"
    case "Insect Plate":
    case "Silver Powder":
      return "Bug"
    case "Iron Plate":
    case "Metal Coat":
      return "Steel"
    case "Meadow Plate":
    case "Rose Incense":
    case "Miracle Seed":
      return "Grass"
    case "Mind Plate":
    case "Odd Incense":
    case "Twisted Spoon":
      return "Psychic"
    case "Fairy Feather":
    case "Pixie Plate":
      return "Fairy"
    case "Sky Plate":
    case "Sharp Beak":
      return "Flying"
    case "Splash Plate":
    case "Sea Incense":
    case "Wave Incense":
    case "Mystic Water":
      return "Water"
    case "Spooky Plate":
    case "Spell Tag":
      return "Ghost"
    case "Stone Plate":
    case "Rock Incense":
    case "Hard Stone":
      return "Rock"
    case "Toxic Plate":
    case "Poison Barb":
      return "Poison"
    case "Zap Plate":
    case "Magnet":
      return "Electric"
    case "Silk Scarf":
    case "Pink Bow":
    case "Polkadot Bow":
      return "Normal"
    default:
      return undefined
  }
}

export function getBerryResistType(berry: string | undefined): TypeName | undefined {
  switch (berry) {
    case "Chilan Berry":
      return "Normal"
    case "Occa Berry":
      return "Fire"
    case "Passho Berry":
      return "Water"
    case "Wacan Berry":
      return "Electric"
    case "Rindo Berry":
      return "Grass"
    case "Yache Berry":
      return "Ice"
    case "Chople Berry":
      return "Fighting"
    case "Kebia Berry":
      return "Poison"
    case "Shuca Berry":
      return "Ground"
    case "Coba Berry":
      return "Flying"
    case "Payapa Berry":
      return "Psychic"
    case "Tanga Berry":
      return "Bug"
    case "Charti Berry":
      return "Rock"
    case "Kasib Berry":
      return "Ghost"
    case "Haban Berry":
      return "Dragon"
    case "Colbur Berry":
      return "Dark"
    case "Babiri Berry":
      return "Steel"
    case "Roseli Berry":
      return "Fairy"
    default:
      return undefined
  }
}

const FLING_120 = new Set(["TR24", "TR28", "TR34", "TR39", "TR53", "TR55", "TR64", "TR66", "TR72", "TR73"])
const FLING_100 = new Set(["Assault Vest", "Flame Orb", "King's Rock", "Life Orb", "Razor Fang", "Sticky Barb", "Toxic Orb"])
const FLING_90 = new Set(["Deep Sea Tooth", "Thick Club"])
const FLING_85 = new Set(["TR01", "TR41", "TR62", "TR93", "TR97", "TR98"])
const FLING_80 = new Set([
  "Adamant Crystal",
  "Adamant Orb",
  "Arceus Cookie",
  "Bright Powder",
  "Choice Band",
  "Choice Scarf",
  "Choice Specs",
  "Destiny Knot",
  "Dragon Fang",
  "Expert Belt",
  "Focus Band",
  "Focus Sash",
  "Full Incense",
  "Griseous Core",
  "Griseous Orb",
  "Hard Stone",
  "Lax Incense",
  "Lustrous Globe",
  "Lustrous Orb",
  "Macho Brace",
  "Mental Herb",
  "Metal Powder",
  "Muscle Band",
  "Power Anklet",
  "Power Band",
  "Power Belt",
  "Power Bracer",
  "Power Herb",
  "Power Lens",
  "Power Weight",
  "Razor Claw",
  "Ring Target",
  "Rocky Helmet",
  "Scope Lens",
  "Shell Bell",
  "Terrain Extender",
  "Weakness Policy",
  "White Herb",
  "Wide Lens",
  "Wise Glasses",
  "Zoom Lens"
])
const FLING_70 = new Set([
  "Black Belt",
  "Black Glasses",
  "Charcoal",
  "Dragon Scale",
  "Hard Stone",
  "Magnet",
  "Metal Coat",
  "Miracle Seed",
  "Mystic Water",
  "Never-Melt Ice",
  "Poison Barb",
  "Silk Scarf",
  "Silver Powder",
  "Soft Sand",
  "Spell Tag",
  "Twisted Spoon"
])
const FLING_60 = new Set(["Absorb Bulb", "Cell Battery", "Eject Button", "Red Card"])
const FLING_30 = new Set([
  "Amulet Coin",
  "Antidote",
  "Awakening",
  "Berry Juice",
  "Big Mushroom",
  "Big Pearl",
  "Blue Flute",
  "Blue Scarf",
  "Burn Heal",
  "Calcium",
  "Carbos",
  "Cleanse Tag",
  "Damp Mulch",
  "DeepSeaScale",
  "Dire Hit",
  "Dragon Scale",
  "Elixir",
  "Energy Root",
  "EnergyPowder",
  "Escape Rope",
  "Ether",
  "Everstone",
  "Exp. Share",
  "Fire Stone",
  "Fresh Water",
  "Full Heal",
  "Full Restore",
  "Gooey Mulch",
  "Green Scarf",
  "Growth Mulch",
  "Guard Spec.",
  "HP Up",
  "Hyper Potion",
  "Ice Heal",
  "Iron",
  "Itemfinder",
  "Lava Cookie",
  "Lemonade",
  "Max Ether",
  "Max Elixir",
  "Max Potion",
  "Max Repel",
  "Max Revive",
  "Moomoo Milk",
  "MooMoo Milk",
  "Nugget",
  "Paralyze Heal",
  "Pearl",
  "Poke Doll",
  "Potion",
  "PP Max",
  "PP Up",
  "Protein",
  "Rare Candy",
  "Repel",
  "Revival Herb",
  "Revive",
  "Sacred Ash",
  "Shoal Salt",
  "Shoal Shell",
  "Smoke Ball",
  "Soda Pop",
  "Stardust",
  "Star Piece",
  "Super Potion",
  "Super Repel",
  "Swift Feather",
  "Thunder Stone",
  "TinyMushroom",
  "Water Stone",
  "X Accuracy",
  "X Attack",
  "X Defend",
  "X Special",
  "X Sp. Def",
  "X Speed",
  "Yellow Flute",
  "Yellow Scarf"
])
const FLING_10 = new Set(["Air Balloon", "Health Wing", "Muscle Wing", "Resist Wing", "Genius Wing", "Clever Wing", "Swift Wing", "Pretty Feather", "Shed Shell"])

export function getFlingPower(item: string | undefined): number {
  if (!item) return 0
  if (["Big Nugget", "Iron Ball", "TR43", "TR71"].includes(item)) return 130
  if (FLING_120.has(item)) return 85
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
