import { getBerryResistType, getFlingPower, getItemBoostType } from "./items"

describe("getItemBoostType", () => {
  it.each([
    ["Draco Plate", "Dragon"],
    ["Dragon Fang", "Dragon"],
    ["Dread Plate", "Dark"],
    ["Black Glasses", "Dark"],
    ["Earth Plate", "Ground"],
    ["Soft Sand", "Ground"],
    ["Fist Plate", "Fighting"],
    ["Black Belt", "Fighting"],
    ["Flame Plate", "Fire"],
    ["Charcoal", "Fire"],
    ["Icicle Plate", "Ice"],
    ["Never-Melt Ice", "Ice"],
    ["Insect Plate", "Bug"],
    ["Silver Powder", "Bug"],
    ["Iron Plate", "Steel"],
    ["Metal Coat", "Steel"],
    ["Meadow Plate", "Grass"],
    ["Rose Incense", "Grass"],
    ["Miracle Seed", "Grass"],
    ["Mind Plate", "Psychic"],
    ["Odd Incense", "Psychic"],
    ["Twisted Spoon", "Psychic"],
    ["Fairy Feather", "Fairy"],
    ["Pixie Plate", "Fairy"],
    ["Sky Plate", "Flying"],
    ["Sharp Beak", "Flying"],
    ["Splash Plate", "Water"],
    ["Sea Incense", "Water"],
    ["Wave Incense", "Water"],
    ["Mystic Water", "Water"],
    ["Spooky Plate", "Ghost"],
    ["Spell Tag", "Ghost"],
    ["Stone Plate", "Rock"],
    ["Rock Incense", "Rock"],
    ["Hard Stone", "Rock"],
    ["Toxic Plate", "Poison"],
    ["Poison Barb", "Poison"],
    ["Zap Plate", "Electric"],
    ["Magnet", "Electric"],
    ["Silk Scarf", "Normal"],
    ["Pink Bow", "Normal"],
    ["Polkadot Bow", "Normal"]
  ])("should return %s for %s", (item, type) => {
    expect(getItemBoostType(item)).toBe(type)
  })

  it("should return undefined for an item with no type boost", () => {
    expect(getItemBoostType("Leftovers")).toBeUndefined()
  })

  it("should return undefined when item is undefined", () => {
    expect(getItemBoostType(undefined)).toBeUndefined()
  })
})

describe("getBerryResistType", () => {
  it.each([
    ["Chilan Berry", "Normal"],
    ["Occa Berry", "Fire"],
    ["Passho Berry", "Water"],
    ["Wacan Berry", "Electric"],
    ["Rindo Berry", "Grass"],
    ["Yache Berry", "Ice"],
    ["Chople Berry", "Fighting"],
    ["Kebia Berry", "Poison"],
    ["Shuca Berry", "Ground"],
    ["Coba Berry", "Flying"],
    ["Payapa Berry", "Psychic"],
    ["Tanga Berry", "Bug"],
    ["Charti Berry", "Rock"],
    ["Kasib Berry", "Ghost"],
    ["Haban Berry", "Dragon"],
    ["Colbur Berry", "Dark"],
    ["Babiri Berry", "Steel"],
    ["Roseli Berry", "Fairy"]
  ])("should return %s for %s", (berry, type) => {
    expect(getBerryResistType(berry)).toBe(type)
  })

  it("should return undefined for a berry with no resist type", () => {
    expect(getBerryResistType("Sitrus Berry")).toBeUndefined()
  })

  it("should return undefined when berry is undefined", () => {
    expect(getBerryResistType(undefined)).toBeUndefined()
  })
})

describe("getFlingPower", () => {
  it("should return 0 when item is undefined", () => {
    expect(getFlingPower(undefined)).toBe(0)
  })

  it.each([
    ["Big Nugget", 130],
    ["Iron Ball", 130],
    ["TR43", 130],
    ["TR71", 130]
  ])("should return 130 for %s", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["TR24", 120],
    ["TR28", 120],
    ["TR34", 120],
    ["TR39", 120],
    ["TR53", 120],
    ["TR55", 120],
    ["TR64", 120],
    ["TR66", 120],
    ["TR72", 120],
    ["TR73", 120]
  ])("should return 120 for %s (FLING_120 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["TR03", 110],
    ["TR06", 110],
    ["TR09", 110],
    ["TR15", 110],
    ["TR89", 110]
  ])("should return 110 for %s", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it("should return 100 for Hard Stone (FLING_100 set)", () => {
    expect(getFlingPower("Hard Stone")).toBe(100)
  })

  it.each([
    ["TR36", 95],
    ["TR78", 95],
    ["TR81", 95],
    ["TR94", 95]
  ])("should return 95 for %s", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it("should return 90 for any item with 'Plate' in its name", () => {
    expect(getFlingPower("Draco Plate")).toBe(90)
  })

  it.each([
    ["Deep Sea Tooth", 90],
    ["Thick Club", 90]
  ])("should return 90 for %s (FLING_90 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["TR01", 85],
    ["TR41", 85],
    ["TR62", 85],
    ["TR93", 85],
    ["TR97", 85],
    ["TR98", 85]
  ])("should return 85 for %s (FLING_85 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["Assault Vest", 80],
    ["Razor Claw", 80],
    ["Sticky Barb", 80],
    ["Weakness Policy", 80]
  ])("should return 80 for %s (FLING_80 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["Dragon Fang", 70],
    ["Poison Barb", 70],
    ["Power Anklet", 70],
    ["Power Band", 70],
    ["Power Belt", 70],
    ["Power Bracer", 70],
    ["Power Lens", 70],
    ["Power Weight", 70]
  ])("should return 70 for %s (FLING_70 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["Adamant Orb", 60],
    ["Griseous Orb", 60],
    ["Lustrous Orb", 60],
    ["Macho Brace", 60],
    ["Rocky Helmet", 60],
    ["Terrain Extender", 60]
  ])("should return 60 for %s (FLING_60 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["Eject Pack", 50],
    ["Sharp Beak", 50],
    ["Dubious Disc", 50]
  ])("should return 50 for %s", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["Icy Rock", 40],
    ["Eviolite", 40],
    ["Lucky Punch", 40]
  ])("should return 40 for %s", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it.each([
    ["Absorb Bulb", 30],
    ["Berry Juice", 30],
    ["Black Belt", 30],
    ["Black Glasses", 30],
    ["Cell Battery", 30],
    ["Charcoal", 30],
    ["Dragon Scale", 30],
    ["Eject Button", 30],
    ["Fire Stone", 30],
    ["Flame Orb", 30],
    ["King's Rock", 30],
    ["Life Orb", 30],
    ["Magnet", 30],
    ["Metal Coat", 30],
    ["Miracle Seed", 30],
    ["Mystic Water", 30],
    ["Never-Melt Ice", 30],
    ["Razor Fang", 30],
    ["Scope Lens", 30],
    ["Shell Bell", 30],
    ["Spell Tag", 30],
    ["Thunder Stone", 30],
    ["Toxic Orb", 30],
    ["Twisted Spoon", 30],
    ["Water Stone", 30]
  ])("should return 30 for %s (FLING_30 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it("should return 20 for TR82", () => {
    expect(getFlingPower("TR82")).toBe(20)
  })

  it("should return 20 for Pretty Feather", () => {
    expect(getFlingPower("Pretty Feather")).toBe(20)
  })

  it.each([
    ["Air Balloon", 10],
    ["Bright Powder", 10],
    ["Choice Band", 10],
    ["Choice Scarf", 10],
    ["Choice Specs", 10],
    ["Destiny Knot", 10],
    ["Expert Belt", 10],
    ["Focus Band", 10],
    ["Focus Sash", 10],
    ["Full Incense", 10],
    ["Lax Incense", 10],
    ["Mental Herb", 10],
    ["Metal Powder", 10],
    ["Muscle Band", 10],
    ["Power Herb", 10],
    ["Red Card", 10],
    ["Ring Target", 10],
    ["Shed Shell", 10],
    ["Silk Scarf", 10],
    ["Silver Powder", 10],
    ["Soft Sand", 10],
    ["White Herb", 10],
    ["Wide Lens", 10],
    ["Wise Glasses", 10],
    ["Zoom Lens", 10]
  ])("should return 10 for %s (FLING_10 set)", (item, power) => {
    expect(getFlingPower(item)).toBe(power)
  })

  it("should return 10 for any item with 'Berry' in its name", () => {
    expect(getFlingPower("Sitrus Berry")).toBe(10)
  })

  it("should return 0 for an item with no fling power mapping", () => {
    expect(getFlingPower("Leftovers")).toBe(0)
  })
})
