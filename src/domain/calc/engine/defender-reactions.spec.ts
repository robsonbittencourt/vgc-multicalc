import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

const field = () => new Field({ gameType: "Doubles" })
const dragapult = (item?: string) => new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 32 }, ability: "Infiltrator", item } as never)
const sylveon = (item?: string) => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 }, ability: "Cute Charm", item } as never)
const salazzle = () => new Pokemon("Salazzle", { nature: "Adamant", sps: { atk: 32 }, ability: "Corrosion" } as never)
const snorlaxAttacker = () => new Pokemon("Snorlax", { nature: "Brave", sps: { atk: 32 }, ability: "Thick Fat" } as never)
const incineroar = () => new Pokemon("Incineroar", { nature: "Adamant", sps: { atk: 32 }, ability: "Blaze" } as never)
const snorlax = (item?: string) => new Pokemon("Snorlax", { sps: { hp: 32 }, ability: "Immunity", item } as never)
const dondozo = (item?: string) => new Pokemon("Dondozo", { nature: "Careful", sps: { hp: 32, spd: 32 }, ability: "Oblivious", item } as never)
const skarmory = () => new Pokemon("Skarmory", { sps: { hp: 32 }, ability: "Weak Armor" } as never)

describe("Combined attackers over several turns — Multiscale", () => {
  it("halves only the first hit the target takes", () => {
    const result = calculateMulti(dragapult(), sylveon(), new Move("Draco Meteor", { timesUsed: 2 }), new Move("Moonblast", { timesUsed: 2 }), new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale" }), field())

    expect(result.rollsFor(0)).toEqual([
      [102, 103, 105, 106, 108, 108, 109, 111, 112, 114, 114, 115, 117, 118, 120, 121],
      [102, 104, 104, 108, 108, 108, 110, 110, 114, 114, 114, 116, 116, 120, 120, 122]
    ])
    expect(result.rollsFor(1)).toEqual([
      [162, 164, 164, 168, 168, 170, 174, 174, 176, 180, 180, 182, 186, 186, 188, 192],
      [162, 164, 164, 168, 168, 170, 174, 174, 176, 180, 180, 182, 186, 186, 188, 192]
    ])
  })
})

describe("Combined attackers over several turns — Knock Off", () => {
  it("boosts Knock Off only while the target still holds its item", () => {
    const result = calculateMulti(dragapult(), incineroar(), new Move("Draco Meteor", { timesUsed: 2 }), new Move("Knock Off", { timesUsed: 2 }), snorlax("Leftovers"), field())

    expect(result.rollsFor(1)).toEqual([
      [118, 118, 120, 121, 123, 124, 126, 127, 129, 130, 132, 133, 135, 136, 138, 139],
      [79, 81, 81, 82, 84, 84, 85, 85, 87, 88, 88, 90, 91, 91, 93, 94]
    ])
  })

  it("drops the item's effect for every hit after Knock Off removes it", () => {
    const result = calculateMulti(sylveon(), incineroar(), new Move("Acid Spray", { timesUsed: 3 }), new Move("Knock Off", { timesUsed: 3 }), dondozo("Assault Vest"), field())

    expect(result.rollsFor(0)).toEqual([
      [15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18],
      [42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50],
      [64, 65, 66, 66, 67, 68, 69, 69, 70, 71, 72, 72, 73, 74, 75, 76]
    ])
    expect(result.rollsFor(1)).toEqual([
      [75, 75, 76, 76, 78, 79, 79, 81, 81, 82, 84, 84, 85, 85, 87, 88],
      [51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60],
      [51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60]
    ])
  })

  it("drops the item's effect for the partner when Knock Off moves first and the moves are used once", () => {
    const result = calculateMulti(incineroar(), sylveon(), new Move("Knock Off"), new Move("Acid Spray"), dondozo("Assault Vest"), field())

    expect(result.rollsFor(1)).toEqual([[22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 26]])
  })
})

describe("Combined attackers over several turns — Weak Armor", () => {
  it("lowers the Defense after every physical hit", () => {
    const result = calculateMulti(salazzle(), snorlaxAttacker(), new Move("Fire Lash", { timesUsed: 3 }), new Move("Body Slam", { timesUsed: 3 }), skarmory(), field())

    expect(result.rollsFor(0)).toEqual([
      [84, 84, 84, 86, 86, 86, 90, 90, 90, 92, 92, 92, 96, 96, 96, 98],
      [204, 204, 206, 210, 212, 216, 216, 218, 222, 224, 228, 228, 230, 234, 236, 240],
      [320, 326, 330, 332, 338, 342, 344, 348, 354, 356, 360, 362, 368, 372, 374, 380]
    ])
    expect(result.rollsFor(1)).toEqual([
      [54, 54, 54, 55, 56, 57, 57, 58, 59, 59, 60, 60, 61, 62, 63, 63],
      [94, 96, 96, 98, 99, 100, 101, 102, 103, 105, 105, 107, 108, 109, 110, 111],
      [106, 108, 109, 110, 111, 113, 114, 115, 117, 117, 119, 120, 121, 123, 124, 126]
    ])
  })

  it("keeps the Defense after a special hit", () => {
    const result = calculateMulti(dragapult(), snorlaxAttacker(), new Move("Draco Meteor", { timesUsed: 2 }), new Move("Body Slam", { timesUsed: 2 }), skarmory(), field())

    expect(result.rollsFor(1)).toEqual([
      [27, 27, 27, 27, 28, 28, 29, 29, 29, 30, 30, 30, 30, 31, 31, 32],
      [40, 41, 41, 42, 42, 42, 43, 43, 44, 45, 45, 45, 46, 46, 47, 48]
    ])
  })

  it("lowers the Defense for the partner on top of Fire Lash when the moves are used once", () => {
    const result = calculateMulti(salazzle(), snorlaxAttacker(), new Move("Fire Lash"), new Move("Body Slam"), skarmory(), field())

    expect(result.rollsFor(1)).toEqual([[54, 54, 54, 55, 56, 57, 57, 58, 59, 59, 60, 60, 61, 62, 63, 63]])
  })

  it("lowers the Defense for the partner after a physical hit that changes no stat when the moves are used once", () => {
    const machamp = new Pokemon("Machamp", { nature: "Adamant", sps: { atk: 32 }, ability: "Guts" } as never)

    const result = calculateMulti(machamp, snorlaxAttacker(), new Move("Rock Slide"), new Move("Body Slam"), skarmory(), field())

    expect(result.rollsFor(1)).toEqual([[40, 41, 41, 42, 42, 42, 43, 43, 44, 45, 45, 45, 46, 46, 47, 48]])
  })
})

describe("Combined attackers over several turns — Weak Armor against a move the target is immune to", () => {
  it("keeps the Defense when the physical move does not hit", () => {
    const garchomp = new Pokemon("Garchomp", { nature: "Adamant", sps: { atk: 32 }, ability: "Rough Skin" } as never)

    const result = calculateMulti(garchomp, snorlaxAttacker(), new Move("Stomping Tantrum", { timesUsed: 2 }), new Move("Body Slam", { timesUsed: 2 }), skarmory(), field())

    expect(result.rollsFor(1)).toEqual([
      [27, 27, 27, 27, 28, 28, 29, 29, 29, 30, 30, 30, 30, 31, 31, 32],
      [40, 41, 41, 42, 42, 42, 43, 43, 44, 45, 45, 45, 46, 46, 47, 48]
    ])
  })
})

describe("Combined attackers over several turns — Kee and Maranga Berry", () => {
  it("raises the Defense once with Kee Berry", () => {
    const result = calculateMulti(salazzle(), snorlaxAttacker(), new Move("Fire Lash", { timesUsed: 3 }), new Move("Body Slam", { timesUsed: 3 }), snorlax("Kee Berry"), field())

    expect(result.rollsFor(0)).toEqual([
      [76, 78, 79, 79, 81, 81, 82, 84, 84, 85, 85, 87, 88, 88, 90, 91],
      [76, 78, 79, 79, 81, 81, 82, 84, 84, 85, 85, 87, 88, 88, 90, 91],
      [115, 117, 118, 120, 120, 121, 123, 124, 126, 127, 129, 130, 132, 133, 135, 136]
    ])
    expect(result.rollsFor(1)).toEqual([
      [102, 102, 103, 105, 106, 108, 108, 109, 111, 112, 114, 114, 115, 117, 118, 120],
      [153, 154, 156, 157, 159, 162, 163, 165, 166, 168, 171, 172, 174, 175, 177, 180],
      [204, 205, 208, 210, 213, 216, 217, 220, 222, 225, 228, 229, 232, 234, 237, 240]
    ])
  })

  it("raises the Defense with Kee Berry for the partner when the moves are used once", () => {
    const result = calculateMulti(salazzle(), snorlaxAttacker(), new Move("Fire Lash"), new Move("Body Slam"), snorlax("Kee Berry"), field())

    expect(result.rollsFor(1)).toEqual([[102, 102, 103, 105, 106, 108, 108, 109, 111, 112, 114, 114, 115, 117, 118, 120]])
  })

  it("raises the Sp. Def once with Maranga Berry", () => {
    const result = calculateMulti(dragapult(), sylveon(), new Move("Draco Meteor", { timesUsed: 2 }), new Move("Moonblast", { timesUsed: 2 }), snorlax("Maranga Berry"), field())

    expect(result.rollsFor(0)).toEqual([
      [94, 96, 97, 99, 99, 100, 102, 103, 103, 105, 106, 108, 108, 109, 111, 112],
      [33, 33, 33, 33, 34, 34, 34, 34, 36, 36, 36, 36, 37, 37, 37, 39]
    ])
    expect(result.rollsFor(1)).toEqual([
      [51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60],
      [51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60]
    ])
  })

  it("raises the Sp. Def with Maranga Berry for the partner when the moves are used once", () => {
    const result = calculateMulti(dragapult(), sylveon(), new Move("Draco Meteor"), new Move("Moonblast"), snorlax("Maranga Berry"), field())

    expect(result.rollsFor(1)).toEqual([[51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60]])
  })
})

describe("Times used in a row — Metronome", () => {
  it("boosts every use after the first of a lone attacker", () => {
    const result = calculate(dragapult("Metronome"), snorlax(), new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(result.damage).toEqual([
      [94, 96, 97, 99, 99, 100, 102, 103, 103, 105, 106, 108, 108, 109, 111, 112],
      [58, 58, 59, 59, 59, 61, 61, 61, 62, 62, 65, 65, 65, 66, 66, 68],
      [46, 46, 46, 46, 48, 48, 48, 48, 50, 50, 50, 50, 52, 52, 52, 55]
    ])
  })

  it("boosts every use after the first of both combined attackers", () => {
    const result = calculateMulti(dragapult("Metronome"), sylveon("Metronome"), new Move("Draco Meteor", { timesUsed: 3 }), new Move("Moonblast", { timesUsed: 3 }), snorlax(), field())

    expect(result.rollsFor(0)).toEqual([
      [94, 96, 97, 99, 99, 100, 102, 103, 103, 105, 106, 108, 108, 109, 111, 112],
      [58, 58, 59, 59, 59, 61, 61, 61, 62, 62, 65, 65, 65, 66, 66, 68],
      [46, 46, 46, 46, 48, 48, 48, 48, 50, 50, 50, 50, 52, 52, 52, 55]
    ])
    expect(result.rollsFor(1)).toEqual([
      [75, 75, 76, 76, 78, 79, 79, 81, 81, 82, 84, 84, 85, 85, 87, 88],
      [90, 90, 91, 91, 94, 95, 95, 97, 97, 98, 101, 101, 102, 102, 104, 106],
      [105, 105, 106, 106, 109, 111, 111, 113, 113, 115, 118, 118, 119, 119, 122, 123]
    ])
  })
})

describe("Defender reactions between hits — Multiscale when the moves are used once", () => {
  it("halves only the first hit when the turns are repeated", () => {
    const result = calculateMulti(
      new Pokemon("Ralts", { ability: "Trace" } as never),
      new Pokemon("Kirlia", { ability: "Trace" } as never),
      new Move("Moonblast"),
      new Move("Psychic"),
      new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale" }),
      field()
    )

    expect(result.damageWithRemainingUntilTurn(2, 0)).toEqual(164)
  })

  it("halves only the first hit of a lone attacker when the turns are repeated", () => {
    const result = calculate(new Pokemon("Ralts", { ability: "Synchronize" } as never), new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale" }), new Move("Moonblast"), field())

    expect(result.damageWithRemainingUntilTurn(2, 0)).toEqual(90)
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(108)
  })
})

describe("Defender reactions between hits — Water Compaction and Luminous Moss", () => {
  const gyarados = () => new Pokemon("Gyarados", { nature: "Adamant", sps: { atk: 32 }, ability: "Moxie" } as never)
  const milotic = () => new Pokemon("Milotic", { nature: "Modest", sps: { spa: 32 }, ability: "Marvel Scale" } as never)
  const palossand = () => new Pokemon("Palossand", { sps: { hp: 32 }, ability: "Water Compaction" } as never)

  it("raises the Defense by 2 after every Water hit", () => {
    const result = calculateMulti(gyarados(), salazzle(), new Move("Waterfall", { timesUsed: 2 }), new Move("Fire Lash", { timesUsed: 2 }), palossand(), field())

    expect(result.rollsFor(0)).toEqual([
      [134, 138, 138, 140, 144, 144, 146, 146, 150, 150, 152, 152, 156, 156, 158, 162],
      [92, 92, 96, 96, 96, 98, 98, 102, 102, 102, 104, 104, 104, 108, 108, 110]
    ])
    expect(result.rollsFor(1)).toEqual([
      [25, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 30, 30, 30, 30, 31],
      [21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 24, 24, 24, 24, 24, 25]
    ])
  })

  it("raises the Defense by 2 for the partner when the moves are used once", () => {
    const result = calculateMulti(gyarados(), salazzle(), new Move("Waterfall"), new Move("Fire Lash"), palossand(), field())

    expect(result.rollsFor(1)).toEqual([[25, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 30, 30, 30, 30, 31]])
  })

  it("raises the Sp. Def once with Luminous Moss after a Water hit", () => {
    const result = calculateMulti(milotic(), dragapult(), new Move("Hydro Pump", { timesUsed: 2 }), new Move("Draco Meteor", { timesUsed: 2 }), snorlax("Luminous Moss"), field())

    expect(result.rollsFor(0)).toEqual([
      [81, 82, 82, 84, 84, 85, 87, 87, 88, 90, 90, 91, 93, 93, 94, 96],
      [54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63, 63, 64]
    ])
    expect(result.rollsFor(1)).toEqual([
      [63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72, 72, 73, 73, 75],
      [33, 33, 33, 33, 34, 34, 34, 34, 36, 36, 36, 36, 37, 37, 37, 39]
    ])
  })

  it("raises the Sp. Def with Luminous Moss for the partner when the moves are used once", () => {
    const result = calculateMulti(milotic(), dragapult(), new Move("Hydro Pump"), new Move("Draco Meteor"), snorlax("Luminous Moss"), field())

    expect(result.rollsFor(1)).toEqual([[63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72, 72, 73, 73, 75]])
  })
})

describe("Defender reactions between hits — Seed Sower and Sand Spit", () => {
  const venusaur = () => new Pokemon("Venusaur", { nature: "Modest", sps: { spa: 32 }, ability: "Overgrow" } as never)
  const arboliva = () => new Pokemon("Arboliva", { sps: { hp: 32 }, ability: "Seed Sower" } as never)
  const excadrill = () => new Pokemon("Excadrill", { nature: "Adamant", sps: { atk: 32 }, ability: "Sand Force" } as never)
  const sandaconda = () => new Pokemon("Sandaconda", { sps: { hp: 32 }, ability: "Sand Spit" } as never)

  it("boosts the Grass move of the partner in the Grassy Terrain set by the first hit", () => {
    const result = calculateMulti(salazzle(), venusaur(), new Move("Fire Lash", { timesUsed: 2 }), new Move("Energy Ball", { timesUsed: 2 }), arboliva(), field())

    expect(result.rollsFor(1)).toEqual([
      [42, 43, 44, 44, 45, 45, 45, 46, 47, 47, 48, 48, 48, 49, 50, 51],
      [42, 43, 44, 44, 45, 45, 45, 46, 47, 47, 48, 48, 48, 49, 50, 51]
    ])
  })

  it("boosts the Grass move of the partner when the moves are used once", () => {
    const result = calculateMulti(salazzle(), venusaur(), new Move("Fire Lash"), new Move("Energy Ball"), arboliva(), field())

    expect(result.rollsFor(1)).toEqual([[42, 43, 44, 44, 45, 45, 45, 46, 47, 47, 48, 48, 48, 49, 50, 51]])
  })

  it("halves the Earthquake of the partner in the Grassy Terrain set by the first hit", () => {
    const garchomp = new Pokemon("Garchomp", { nature: "Adamant", sps: { atk: 32 }, ability: "Rough Skin" } as never)

    const result = calculateMulti(salazzle(), garchomp, new Move("Fire Lash"), new Move("Earthquake"), arboliva(), field())

    expect(result.rollsFor(1)).toEqual([[29, 29, 30, 30, 30, 30, 30, 31, 31, 32, 32, 33, 33, 33, 33, 34]])
  })

  it("heals the target with the Grassy Terrain set by the first hit", () => {
    const salazzleSpecial = new Pokemon("Salazzle", { nature: "Modest", sps: { spa: 8 }, ability: "Corrosion" } as never)

    const result = calculate(salazzleSpecial, new Pokemon("Arboliva", { sps: { hp: 32, spd: 32 }, nature: "Calm", ability: "Seed Sower" } as never), new Move("Flamethrower"), field())

    expect(result.koChance().text).toEqual("52% chance to 2HKO after Grassy Terrain recovery")
  })

  it("heals the target with the Grassy Terrain set by the first hit of combined attackers", () => {
    const result = calculateMulti(
      new Pokemon("Ralts", { ability: "Synchronize" } as never),
      new Pokemon("Snorlax", { ability: "Thick Fat" } as never),
      new Move("Psychic"),
      new Move("Body Slam"),
      new Pokemon("Arboliva", { sps: { hp: 32, spd: 32, def: 32 }, nature: "Calm", ability: "Seed Sower" } as never),
      field()
    )

    expect(result.getHKO()).toEqual("78.7% chance to 3HKO after Grassy Terrain recovery")
  })

  it("boosts Sand Force for the partner in the sandstorm set by the first hit", () => {
    const result = calculateMulti(salazzle(), excadrill(), new Move("Fire Lash", { timesUsed: 2 }), new Move("Iron Head", { timesUsed: 2 }), sandaconda(), field())

    expect(result.rollsFor(1)).toEqual([
      [126, 127, 129, 130, 132, 133, 135, 136, 138, 139, 141, 142, 144, 145, 147, 148],
      [168, 169, 171, 174, 175, 177, 180, 181, 183, 186, 187, 189, 192, 193, 195, 198]
    ])
  })

  it("boosts Sand Force for the partner when the moves are used once", () => {
    const result = calculateMulti(salazzle(), excadrill(), new Move("Fire Lash"), new Move("Iron Head"), sandaconda(), field())

    expect(result.rollsFor(1)).toEqual([[126, 127, 129, 130, 132, 133, 135, 136, 138, 139, 141, 142, 144, 145, 147, 148]])
  })
})

describe("Defender reactions between hits — abilities passed on contact", () => {
  const tyrantrum = () => new Pokemon("Tyrantrum", { nature: "Adamant", sps: { atk: 32 }, ability: "Strong Jaw" } as never)

  it("replaces the attacker's ability with Mummy after its first contact", () => {
    const result = calculateMulti(tyrantrum(), sylveon(), new Move("Crunch", { timesUsed: 2 }), new Move("Moonblast", { timesUsed: 2 }), new Pokemon("Cofagrigus", { sps: { hp: 32 }, ability: "Mummy" } as never), field())

    expect(result.rollsFor(0)).toEqual([
      [104, 106, 106, 108, 110, 110, 112, 114, 114, 116, 116, 118, 120, 120, 122, 124],
      [70, 72, 72, 72, 74, 74, 76, 76, 78, 78, 78, 80, 80, 82, 82, 84]
    ])
  })

  it("swaps the attacker's ability with Wandering Spirit after its first contact", () => {
    const kingambit = new Pokemon("Kingambit", { nature: "Adamant", sps: { atk: 32 }, ability: "Supreme Overlord" } as never)

    const result = calculateMulti(tyrantrum(), kingambit, new Move("Crunch", { timesUsed: 2 }), new Move("Kowtow Cleave", { timesUsed: 2 }), new Pokemon("Runerigus", { sps: { hp: 32 }, ability: "Wandering Spirit" } as never), field())

    expect(result.rollsFor(0)).toEqual([
      [104, 106, 106, 108, 110, 110, 112, 114, 114, 116, 116, 118, 120, 120, 122, 124],
      [70, 72, 72, 72, 74, 74, 76, 76, 78, 78, 78, 80, 80, 82, 82, 84]
    ])
  })
})

describe("Defender reactions between hits — Gooey and Gyro Ball", () => {
  const goodra = () => new Pokemon("Goodra", { sps: { hp: 32 }, ability: "Gooey" } as never)

  it("raises Gyro Ball's power after the user's Speed drops on contact", () => {
    const bronzong = new Pokemon("Bronzong", { nature: "Adamant", sps: { atk: 32 }, ability: "Levitate" } as never)

    const result = calculateMulti(dragapult(), bronzong, new Move("Draco Meteor", { timesUsed: 2 }), new Move("Gyro Ball", { timesUsed: 2 }), goodra(), field())

    expect(result.rollsFor(1)).toEqual([
      [48, 48, 49, 49, 49, 51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57],
      [70, 72, 72, 73, 73, 75, 75, 76, 78, 78, 79, 79, 81, 81, 82, 84]
    ])
  })

  it("keeps the Speed of an Electro Ball user that makes no contact", () => {
    const jolteon = new Pokemon("Jolteon", { nature: "Timid", sps: { spa: 32, spe: 32 }, ability: "Volt Absorb" } as never)

    const result = calculate(jolteon, goodra(), new Move("Electro Ball", { timesUsed: 3 }), field())

    expect(result.damage).toEqual([
      [21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 26],
      [21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 26],
      [21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 26]
    ])
  })
})

describe("Defender reactions between hits — White Herb and Knock Off", () => {
  const whiteHerbDondozo = () => new Pokemon("Dondozo", { nature: "Careful", sps: { hp: 32, spd: 32 }, ability: "Oblivious", item: "White Herb" } as never)

  it("removes nothing with Knock Off after the White Herb was used", () => {
    const result = calculateMulti(sylveon(), incineroar(), new Move("Acid Spray", { timesUsed: 2 }), new Move("Knock Off", { timesUsed: 2 }), whiteHerbDondozo(), field())

    expect(result.rollsFor(1)).toEqual([
      [51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60],
      [51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57, 57, 57, 58, 58, 60]
    ])
  })

  it("keeps the drop once Knock Off removed the White Herb", () => {
    const result = calculateMulti(incineroar(), sylveon(), new Move("Knock Off", { timesUsed: 2 }), new Move("Acid Spray", { timesUsed: 2 }), whiteHerbDondozo(), field())

    expect(result.rollsFor(1)).toEqual([
      [22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 26],
      [42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50]
    ])
  })
})

describe("Defender reactions between hits — items that act after the whole move", () => {
  it("restores the Defense with White Herb only after every hit of the move", () => {
    const cloyster = new Pokemon("Cloyster", { nature: "Bold", ability: "Shell Armor" } as never)

    const result = calculate(cloyster, new Pokemon("Skarmory", { ability: "Weak Armor", item: "White Herb", sps: { hp: 32, def: 32 }, nature: "Bold" } as never), new Move("Icicle Spear", { hits: 3 }), field())

    expect(result.damage).toEqual([
      [7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 15],
      [15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18]
    ])
  })

  it("restores the user's Sp. Atk with White Herb only after both Parental Bond hits", () => {
    const kangaskhan = new Pokemon("Kangaskhan-Mega", { nature: "Modest", sps: { spa: 32 }, ability: "Parental Bond", item: "White Herb" } as never)

    const result = calculate(kangaskhan, snorlax(), new Move("Draco Meteor"), field())

    expect(result.damage).toEqual([
      [47, 48, 48, 49, 49, 50, 50, 51, 52, 52, 53, 53, 54, 54, 55, 56],
      [5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7]
    ])
  })

  it("raises the Defense with Kee Berry only after every hit of the move", () => {
    const cloyster = new Pokemon("Cloyster", { nature: "Bold", ability: "Shell Armor" } as never)

    const result = calculate(cloyster, new Pokemon("Ferrothorn", { item: "Kee Berry", ability: "Contrary", sps: { hp: 32, def: 1 } } as never), new Move("Icicle Spear", { hits: 5 }), new Field())

    expect(result.damage).toEqual([
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13]
    ])
  })

  it("raises the Sp. Def with Maranga Berry only after every hit of the move", () => {
    const greninja = new Pokemon("Greninja", { nature: "Modest", sps: { spa: 32 }, ability: "Torrent" } as never)

    const result = calculate(greninja, new Pokemon("Tyranitar", { sps: { hp: 32, spd: 1 }, item: "Maranga Berry" } as never), new Move("Water Shuriken"), field())

    expect(result.damage).toEqual([
      [26, 26, 26, 26, 26, 26, 30, 30, 30, 30, 30, 30, 30, 30, 30, 32],
      [26, 26, 26, 26, 26, 26, 30, 30, 30, 30, 30, 30, 30, 30, 30, 32],
      [26, 26, 26, 26, 26, 26, 30, 30, 30, 30, 30, 30, 30, 30, 30, 32]
    ])
  })
})

describe("Defender reactions between hits — Knock Off and the items it removes", () => {
  const bandedIncineroar = (atk: number) => new Pokemon("Incineroar", { nature: "Adamant", sps: { atk }, item: "Choice Band", ability: "Blaze" } as never)
  const dondozo = (item: string) => new Pokemon("Dondozo", { nature: "Impish", sps: { hp: 32, def: 32 }, ability: "Oblivious", item } as never)

  it("stops the Leftovers recovery once Knock Off removes them", () => {
    const result = calculate(bandedIncineroar(24), dondozo("Leftovers"), new Move("Knock Off"), field())

    expect(result.koChance().text).toEqual("52.9% chance to 4HKO")
  })

  it("removes the Sitrus Berry before it can heal", () => {
    const result = calculate(bandedIncineroar(32), dondozo("Sitrus Berry"), new Move("Knock Off"), field())

    expect(result.koChance().text).toEqual("96.7% chance to 4HKO")
  })

  it("lets the partner's hit trigger the Sitrus Berry before Knock Off removes it", () => {
    const result = calculateMulti(sylveon(), incineroar(), new Move("Moonblast"), new Move("Knock Off"), dondozo("Sitrus Berry"), field())

    expect(result.getHKO()).toEqual("99.7% chance to 2HKO after Sitrus Berry recovery")
  })
})

describe("Combined attackers — recomputing the damage across the turns", () => {
  it("lowers the Attack once with the target's Intimidate", () => {
    const incineroarDefender = new Pokemon("Incineroar", { sps: { hp: 32 }, ability: "Intimidate", abilityOn: true } as never)

    const result = calculateMulti(salazzle(), snorlaxAttacker(), new Move("Fire Lash"), new Move("Body Slam"), incineroarDefender, field())

    expect(result.rollsFor(1)).toEqual([[78, 79, 79, 81, 82, 82, 84, 85, 85, 87, 87, 88, 90, 90, 91, 93]])
  })

  it("counts the chance to KO at the requested roll level", () => {
    const tauros = new Pokemon("Tauros", { nature: "Adamant", sps: { atk: 32 }, ability: "Anger Point" } as never)
    const mudsdale = new Pokemon("Mudsdale", { nature: "Impish", ability: "Stamina", abilityOn: true, sps: { hp: 32, def: 32 } } as never)

    const result = calculateMulti(snorlaxAttacker(), tauros, new Move("Body Slam"), new Move("Body Slam"), mudsdale, field())

    expect(result.koChanceWithin(4, 11)).toBeCloseTo(0.02854335455246912, 12)
  })
})

describe("Defender reactions between hits — items used between the uses of a lone attacker", () => {
  it("raises the Sp. Def with Maranga Berry after the first use", () => {
    const result = calculate(dragapult(), snorlax("Maranga Berry"), new Move("Draco Meteor", { timesUsed: 2 }), field())

    expect(result.damage).toEqual([
      [94, 96, 97, 99, 99, 100, 102, 103, 103, 105, 106, 108, 108, 109, 111, 112],
      [33, 33, 33, 33, 34, 34, 34, 34, 36, 36, 36, 36, 37, 37, 37, 39]
    ])
  })

  it("restores the Speed lowered by Gooey with White Herb after the first use", () => {
    const bronzong = new Pokemon("Bronzong", { nature: "Adamant", sps: { atk: 32 }, ability: "Levitate", item: "White Herb" } as never)

    const result = calculate(bronzong, new Pokemon("Goodra", { sps: { hp: 32 }, ability: "Gooey" } as never), new Move("Gyro Ball", { timesUsed: 2 }), field())

    expect(result.damage).toEqual([
      [48, 48, 49, 49, 49, 51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57],
      [48, 48, 49, 49, 49, 51, 51, 51, 52, 52, 54, 54, 54, 55, 55, 57]
    ])
  })
})

describe("Defender reactions between hits — remaining HP when Knock Off removes a Sitrus Berry", () => {
  const sitrusDondozo = (curHP?: number) => new Pokemon("Dondozo", { nature: "Impish", sps: { hp: 32, def: 32 }, ability: "Oblivious", item: "Sitrus Berry", curHP } as never)

  it("removes the Sitrus Berry before it heals when the partner leaves the target above half", () => {
    const result = calculateMulti(sylveon(), incineroar(), new Move("Moonblast"), new Move("Knock Off"), sitrusDondozo(), field())

    expect(result.damageWithRemainingUntilTurn(1, 11)).toEqual(190)
  })

  it("weakens Knock Off once the partner made the target eat the Sitrus Berry", () => {
    const result = calculateMulti(sylveon(), incineroar(), new Move("Moonblast"), new Move("Knock Off"), sitrusDondozo(), field())

    expect(result.damageWithRemainingUntilTurn(1, 12)).toEqual(108)
  })

  it("weakens Knock Off when the target already eats the Sitrus Berry at every roll", () => {
    const result = calculateMulti(sylveon(), incineroar(), new Move("Moonblast"), new Move("Knock Off"), sitrusDondozo(200), field())

    expect(result.damageWithRemainingUntilTurn(1, 0)).toEqual(85)
  })
})
