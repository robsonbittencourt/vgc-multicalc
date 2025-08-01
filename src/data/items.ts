export class Items {
  private static _instance: Items

  items: string[]

  private constructor() {
    this.items = this.allItems()
  }

  static get instance(): Items {
    if (!Items._instance) {
      Items._instance = new Items()
    }

    return Items._instance
  }

  withoutItem(): string {
    return "(none)"
  }

  private allItems(): string[] {
    return [
      this.withoutItem(),
      "Assault Vest",
      "Choice Band",
      "Choice Scarf",
      "Choice Specs",
      "Clear Amulet",
      "Covert Cloak",
      "Eviolite",
      "Focus Sash",
      "Leftovers",
      "Life Orb",
      "Rocky Helmet",
      "Sitrus Berry",
      "Ability Shield",
      "Absorb Bulb",
      "Adamant Crystal",
      "Adamant Orb",
      "Adrenaline Orb",
      "Aguav Berry",
      "Air Balloon",
      "Apicot Berry",
      "Aspear Berry",
      "Babiri Berry",
      "Big Root",
      "Binding Band",
      "Black Belt",
      "Black Glasses",
      "Black Sludge",
      "Blunder Policy",
      "Booster Energy",
      "Bright Powder",
      "Cell Battery",
      "Charcoal",
      "Charti Berry",
      "Cheri Berry",
      "Chesto Berry",
      "Chilan Berry",
      "Chople Berry",
      "Coba Berry",
      "Colbur Berry",
      "Cornerstone Mask",
      "Custap Berry",
      "Damp Rock",
      "Destiny Knot",
      "Draco Plate",
      "Dragon Fang",
      "Dread Plate",
      "Earth Plate",
      "Eject Button",
      "Eject Pack",
      "Electric Seed",
      "Enigma Berry",
      "Expert Belt",
      "Fairy Feather",
      "Figy Berry",
      "Fist Plate",
      "Flame Orb",
      "Flame Plate",
      "Float Stone",
      "Focus Band",
      "Ganlon Berry",
      "Grassy Seed",
      "Grepa Berry",
      "Grip Claw",
      "Griseous Core",
      "Griseous Orb",
      "Haban Berry",
      "Hard Stone",
      "Hearthflame Mask",
      "Heat Rock",
      "Heavy-Duty Boots",
      "Iapapa Berry",
      "Icicle Plate",
      "Icy Rock",
      "Insect Plate",
      "Iron Ball",
      "Iron Plate",
      "Jaboca Berry",
      "Kasib Berry",
      "Kebia Berry",
      "Kee Berry",
      "Kelpsy Berry",
      "King's Rock",
      "Lagging Tail",
      "Lansat Berry",
      "Leppa Berry",
      "Liechi Berry",
      "Light Ball",
      "Light Clay",
      "Loaded Dice",
      "Lum Berry",
      "Luminous Moss",
      "Lustrous Globe",
      "Lustrous Orb",
      "Magnet",
      "Mago Berry",
      "Maranga Berry",
      "Meadow Plate",
      "Mental Herb",
      "Metal Coat",
      "Metronome",
      "Micle Berry",
      "Mind Plate",
      "Miracle Seed",
      "Mirror Herb",
      "Misty Seed",
      "Muscle Band",
      "Mystic Water",
      "Never-Melt Ice",
      "Normal Gem",
      "Occa Berry",
      "Oran Berry",
      "Passho Berry",
      "Payapa Berry",
      "Pecha Berry",
      "Persim Berry",
      "Petaya Berry",
      "Pixie Plate",
      "Poison Barb",
      "Power Anklet",
      "Power Band",
      "Power Belt",
      "Power Bracer",
      "Power Herb",
      "Power Lens",
      "Power Weight",
      "Protective Pads",
      "Psychic Seed",
      "Punching Glove",
      "Quick Claw",
      "Rawst Berry",
      "Razor Claw",
      "Razor Fang",
      "Red Card",
      "Rindo Berry",
      "Ring Target",
      "Room Service",
      "Roseli Berry",
      "Rowap Berry",
      "Rusted Shield",
      "Rusted Sword",
      "Safety Goggles",
      "Salac Berry",
      "Scope Lens",
      "Sharp Beak",
      "Shed Shell",
      "Shell Bell",
      "Shuca Berry",
      "Silk Scarf",
      "Silver Powder",
      "Sky Plate",
      "Smooth Rock",
      "Snowball",
      "Soft Sand",
      "Soul Dew",
      "Spell Tag",
      "Splash Plate",
      "Spooky Plate",
      "Starf Berry",
      "Sticky Barb",
      "Stone Plate",
      "Tanga Berry",
      "Terrain Extender",
      "Throat Spray",
      "Toxic Orb",
      "Toxic Plate",
      "Twisted Spoon",
      "Utility Umbrella",
      "Wacan Berry",
      "Weakness Policy",
      "Wellspring Mask",
      "White Herb",
      "Wide Lens",
      "Wiki Berry",
      "Wise Glasses",
      "Yache Berry",
      "Zap Plate",
      "Zoom Lens"
    ]
  }
}
