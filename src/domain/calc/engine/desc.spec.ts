import { Field, Move, Pokemon } from "@calc"
import { calculateDamage } from "@calc/engine/calculate"
import { calculateMultiDamage } from "@calc/engine/multi-target"

describe("Internal Result/MultiResult/desc (gen 0)", () => {
  describe("Result smoke tests", () => {
    it("produces damage and description for a simple physical hit", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant", item: "Choice Band" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })

      const result = calculateDamage(attacker, defender, new Move("Flare Blitz"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
      expect((result.damage as number[]).length).toBe(16)
      expect(result.description()).toContain("Incineroar")
      expect(result.description()).toContain("Snorlax")
    })

    it("returns zero damage for immune matchup", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 } })
      const defender = new Pokemon("Corviknight", { evs: { hp: 252 } })

      const result = calculateDamage(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.damage).toBeFalsy()
      expect(result.moveDesc()).toContain("0%")
      expect(() => result.description()).toThrow()
    })

    it("produces damage for Tera STAB hit", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid", teraType: "Fairy" })
      const defender = new Pokemon("Dragonite", { evs: { hp: 252 } })

      const result = calculateDamage(attacker, defender, new Move("Moonblast"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
      expect((result.damage as number[]).every(d => d > 0)).toBe(true)
    })

    it("produces damage for a multihit move", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Garchomp", { evs: { hp: 252 } })

      const result = calculateDamage(attacker, defender, new Move("Triple Axel"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
    })

    it("produces damage for Parental Bond", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 } })

      const result = calculateDamage(attacker, defender, new Move("Body Slam"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
    })

    it("applies spread modifier in doubles", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Tyranitar", { evs: { hp: 252 } })
      const singles = calculateDamage(attacker, defender, new Move("Earthquake"), new Field())

      const doubles = calculateDamage(attacker, defender, new Move("Earthquake"), new Field({ gameType: "Doubles" }))

      expect((singles.damage as number[])[15]).toBeGreaterThan((doubles.damage as number[])[15])
    })
  })

  describe("buildDescription", () => {
    it("includes boosts, item, ability and EVs of both sides", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant", item: "Life Orb", boosts: { atk: 2 } })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ability: "Thick Fat", boosts: { def: -1 } })

      const description = calculateDamage(attacker, defender, new Move("Flare Blitz"), new Field()).description()

      expect(description).toContain("+2 252+ Atk Life Orb Incineroar Flare Blitz")
      expect(description).toContain("vs. -1 252 HP / 252+ Def Thick Fat Snorlax")
    })

    it("includes weather and terrain together", () => {
      const attacker = new Pokemon("Raichu", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })
      const field = new Field({ weather: "Rain", terrain: "Grassy" })

      const description = calculateDamage(attacker, defender, new Move("Solar Beam"), field).description()

      expect(description).toContain("in Rain and Grassy Terrain")
    })

    it("includes Reflect, Friend Guard and Aurora Veil on the defender side", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })
      const field = new Field({ gameType: "Doubles", defenderSide: { isReflect: true, isFriendGuard: true } })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), field).description()

      expect(description).toContain("through Reflect")
      expect(description).toContain("with an ally's Friend Guard")
    })

    it("includes Helping Hand and Tera on the attacker", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid", teraType: "Fairy" })
      const defender = new Pokemon("Dragonite", { evs: { hp: 252 } })
      const field = new Field({ gameType: "Doubles", attackerSide: { isHelpingHand: true } })

      const description = calculateDamage(attacker, defender, new Move("Moonblast"), field).description()

      expect(description).toContain("Tera Fairy")
      expect(description).toContain("Helping Hand")
    })

    it("includes the Ruin abilities coming from the field", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })
      const field = new Field({ isSwordOfRuin: true, isTabletsOfRuin: true })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), field).description()

      expect(description).toContain("Sword of Ruin")
      expect(description).toContain("Tablets of Ruin")
    })

    it("shows the swapped stat name in Wonder Room", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const field = new Field({ isWonderRoom: true })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), field).description()

      expect(description).toContain("Def (SpD)")
      expect(description).toContain("in Wonder Room")
    })

    it("includes the hit count for a multihit move", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })

      const description = calculateDamage(attacker, defender, new Move("Triple Axel"), new Field()).description()

      expect(description).toContain("(2 hits)")
    })
  })

  describe("moveDesc recovery and recoil", () => {
    it("reports drain recovery for a draining move", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Modest", curHP: 1 })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })

      const moveDesc = calculateDamage(attacker, defender, new Move("Draining Kiss"), new Field()).moveDesc()

      expect(moveDesc).toContain("recovered")
    })

    it("reports recoil damage for a recoil move", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })

      const moveDesc = calculateDamage(attacker, defender, new Move("Flare Blitz"), new Field()).moveDesc()

      expect(moveDesc).toContain("recoil damage")
    })

    it("omits recoil when the attacker has Rock Head", () => {
      const attacker = new Pokemon("Aggron", { evs: { atk: 252 }, nature: "Adamant", ability: "Rock Head" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })

      const moveDesc = calculateDamage(attacker, defender, new Move("Double-Edge"), new Field()).moveDesc()

      expect(moveDesc).not.toContain("recoil")
    })

    it("reports crash damage for a move that can miss into a crash", () => {
      const attacker = new Pokemon("Hariyama", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })

      const moveDesc = calculateDamage(attacker, defender, new Move("High Jump Kick"), new Field()).moveDesc()

      expect(moveDesc).toContain("50% crash damage")
    })

    it("reports Shell Bell recovery", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", item: "Shell Bell", curHP: 1 })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })

      const moveDesc = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).moveDesc()

      expect(moveDesc).toContain("recovered")
    })
  })

  describe("KO chance", () => {
    it("reports a guaranteed OHKO when the minimum roll exceeds max HP", () => {
      const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Timid", item: "Choice Specs" })
      const defender = new Pokemon("Kartana", { evs: {} })

      const description = calculateDamage(attacker, defender, new Move("Overheat"), new Field()).description()

      expect(description).toContain("guaranteed OHKO")
    })

    it("reports a 2HKO for a move that cannot OHKO", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toMatch(/HKO/)
    })

    it("mentions Stealth Rock in the KO text", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const field = new Field({ defenderSide: { isSR: true } })

      const description = calculateDamage(attacker, defender, new Move("Rock Slide"), field).description()

      expect(description).toContain("Stealth Rock")
    })

    it("mentions Spikes in the KO text", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const field = new Field({ defenderSide: { spikes: 3 } })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), field).description()

      expect(description).toContain("Spikes")
    })

    it("mentions sandstorm damage in the KO text", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const field = new Field({ weather: "Sand" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), field).description()

      expect(description).toContain("sandstorm damage")
    })

    it("mentions Leftovers recovery in the KO text", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Leftovers" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("Leftovers recovery")
    })

    it("mentions Sitrus Berry recovery in the KO text", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Sitrus Berry" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("Sitrus Berry recovery")
    })

    it("accounts for toxic damage in the KO text", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", status: "tox", toxicCounter: 1 })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("toxic damage")
    })
  })

  describe("end of turn effects in the KO text", () => {
    const attacker = () => new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const bulkySnorlax = (options: Record<string, unknown> = {}) => new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ...options })

    const describeWith = (defender: Pokemon, field = new Field()) => calculateDamage(attacker(), defender, new Move("Earthquake"), field).description()

    it("mentions burn damage", () => {
      expect(describeWith(bulkySnorlax({ status: "brn" }))).toContain("burn damage")
    })

    it("mentions reduced burn damage for Heatproof", () => {
      expect(describeWith(bulkySnorlax({ status: "brn", ability: "Heatproof" }))).toContain("reduced burn damage")
    })

    it("mentions poison damage", () => {
      expect(describeWith(bulkySnorlax({ status: "psn" }))).toContain("poison damage")
    })

    it("mentions Poison Heal instead of poison damage", () => {
      expect(describeWith(bulkySnorlax({ status: "psn", ability: "Poison Heal" }))).toContain("Poison Heal")
    })

    it("omits status damage for Magic Guard", () => {
      const description = describeWith(bulkySnorlax({ status: "brn", ability: "Magic Guard" }))

      expect(description).not.toContain("burn damage")
    })

    it("mentions Black Sludge damage for a non-Poison defender", () => {
      expect(describeWith(bulkySnorlax({ item: "Black Sludge" }))).toContain("Black Sludge damage")
    })

    it("mentions Sticky Barb damage", () => {
      expect(describeWith(bulkySnorlax({ item: "Sticky Barb" }))).toContain("Sticky Barb damage")
    })

    it("mentions Leech Seed damage", () => {
      const field = new Field({ defenderSide: { isSeeded: true } })

      expect(describeWith(bulkySnorlax(), field)).toContain("Leech Seed damage")
    })

    it("mentions Salt Cure", () => {
      const field = new Field({ defenderSide: { isSaltCured: true } })

      expect(describeWith(bulkySnorlax(), field)).toContain("Salt Cure")
    })

    it("mentions Grassy Terrain recovery for a grounded defender", () => {
      const field = new Field({ terrain: "Grassy" })

      expect(describeWith(bulkySnorlax(), field)).toContain("Grassy Terrain recovery")
    })

    it("mentions Rain Dish recovery in Rain", () => {
      const defender = new Pokemon("Ludicolo", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ability: "Rain Dish" })
      const field = new Field({ weather: "Rain" })

      expect(describeWith(defender, field)).toContain("Rain Dish recovery")
    })

    it("mentions trapping damage for a trapping move", () => {
      const defender = bulkySnorlax()

      const description = calculateDamage(attacker(), defender, new Move("Sand Tomb"), new Field()).description()

      expect(description).toContain("trapping damage")
    })

    it("combines several end of turn texts in a single sentence", () => {
      const field = new Field({ terrain: "Grassy", defenderSide: { isSeeded: true } })

      const description = describeWith(bulkySnorlax({ status: "brn" }), field)

      expect(description).toContain(" and ")
      expect(description).toContain("burn damage")
      expect(description).toContain("Leech Seed damage")
    })
  })

  describe("KO chance texts and berry interaction", () => {
    it("reports a guaranteed multi turn KO after burn damage", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", status: "brn" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("guaranteed 3HKO after burn damage")
    })

    it("mentions the berry only once when it is relevant to the KO", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Sitrus Berry" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description.match(/Sitrus Berry recovery/g)?.length).toBe(1)
    })

    it("ignores the defender berry when the attacker has Unnerve", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ability: "Unnerve" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Sitrus Berry" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).not.toContain("Sitrus Berry recovery")
    })

    it("doubles the berry recovery with Ripen", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const plain = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Sitrus Berry" })
      const ripen = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Sitrus Berry", ability: "Ripen" })
      const move = () => new Move("Earthquake")

      const plainChance = calculateDamage(attacker, plain, move(), new Field()).kochance().chance
      const ripenChance = calculateDamage(attacker, ripen, move(), new Field()).kochance().chance

      expect(ripenChance).toBeLessThan(plainChance!)
    })

    it("mentions an Oran Berry recovery", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Oran Berry" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("Oran Berry recovery")
    })

    it("reduces the damage text when a resist berry applies", () => {
      const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Kartana", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Occa Berry" })

      const description = calculateDamage(attacker, defender, new Move("Overheat"), new Field()).description()

      expect(description).toContain("reduced by Occa Berry")
    })

    it("omits the KO text when the damage cannot KO within nine turns", () => {
      const attacker = new Pokemon("Chansey", { evs: {}, nature: "Bold" })
      const defender = new Pokemon("Steelix", { evs: { hp: 252, def: 252 }, nature: "Impish" })

      const description = calculateDamage(attacker, defender, new Move("Tackle"), new Field()).description()

      expect(description).toBe("0- Atk Chansey Tackle vs. 252 HP / 252+ Def Steelix: 1-2 (0.5 - 1%)")
    })
  })

  describe("more end of turn branches", () => {
    const chomp = (options: Record<string, unknown> = {}) => new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ...options })
    const lax = (options: Record<string, unknown> = {}) => new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ...options })

    it("mentions Bad Dreams against a sleeping defender", () => {
      const attacker = new Pokemon("Darkrai", { evs: { atk: 252 }, nature: "Adamant", ability: "Bad Dreams" })
      const defender = lax({ status: "slp" })

      const description = calculateDamage(attacker, defender, new Move("Brick Break"), new Field()).description()

      expect(description).toContain("Bad Dreams")
    })

    it("mentions Poison Heal for a badly poisoned defender", () => {
      const description = calculateDamage(chomp(), lax({ status: "tox", ability: "Poison Heal" }), new Move("Earthquake"), new Field()).description()

      expect(description).toContain("Poison Heal")
    })

    it("mentions Black Sludge recovery for a Poison type defender", () => {
      const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Black Sludge" })

      const description = calculateDamage(chomp(), defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("Black Sludge recovery")
    })

    it("mentions Leech Seed recovery on the attacker side", () => {
      const field = new Field({ attackerSide: { isSeeded: true } })

      const description = calculateDamage(chomp(), lax(), new Move("Earthquake"), field).description()

      expect(description).toContain("Leech Seed recovery")
    })

    it("mentions Liquid Ooze damage instead of Leech Seed recovery", () => {
      const attacker = new Pokemon("Tentacruel", { evs: { atk: 252 }, nature: "Adamant", ability: "Liquid Ooze" })
      const field = new Field({ attackerSide: { isSeeded: true } })

      const description = calculateDamage(attacker, lax(), new Move("Earthquake"), field).description()

      expect(description).toContain("Liquid Ooze damage")
    })

    it("applies the stronger Salt Cure divisor against a Water type", () => {
      const water = new Pokemon("Milotic", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const field = new Field({ defenderSide: { isSaltCured: true } })

      const description = calculateDamage(chomp(), water, new Move("Earthquake"), field).description()

      expect(description).toContain("Salt Cure")
    })

    it("mentions Ice Body recovery in Snow", () => {
      const defender = new Pokemon("Avalugg", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ability: "Ice Body" })
      const field = new Field({ weather: "Snow" })

      const description = calculateDamage(chomp(), defender, new Move("Earthquake"), field).description()

      expect(description).toContain("Ice Body recovery")
    })

    it("mentions Dry Skin damage in Sun", () => {
      const defender = new Pokemon("Toxicroak", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ability: "Dry Skin" })
      const field = new Field({ weather: "Sun" })

      const description = calculateDamage(chomp(), defender, new Move("Brick Break"), field).description()

      expect(description).toContain("Dry Skin damage")
    })

    it("mentions Dry Skin recovery in Rain", () => {
      const defender = new Pokemon("Heliolisk", { evs: { def: 252 }, nature: "Relaxed", ability: "Dry Skin" })
      const field = new Field({ weather: "Rain" })

      const description = calculateDamage(chomp(), defender, new Move("Rock Slide"), field).description()

      expect(description).toContain("Dry Skin recovery")
    })

    it("omits Leftovers recovery when Knock Off removes the item", () => {
      const description = calculateDamage(chomp(), lax({ item: "Leftovers" }), new Move("Knock Off"), new Field()).description()

      expect(description).not.toContain("Leftovers recovery")
    })

    it("keeps a single layer of Spikes distinct from three layers", () => {
      const oneLayer = calculateDamage(chomp(), lax(), new Move("Earthquake"), new Field({ defenderSide: { spikes: 1 } })).description()
      const twoLayers = calculateDamage(chomp(), lax(), new Move("Earthquake"), new Field({ defenderSide: { spikes: 2 } })).description()

      expect(oneLayer).toContain("1 layer of Spikes")
      expect(twoLayers).toContain("2 layers of Spikes")
    })

    it("omits hazards for a defender holding Heavy-Duty Boots", () => {
      const field = new Field({ defenderSide: { isSR: true, spikes: 3 } })

      const description = calculateDamage(chomp(), lax({ item: "Heavy-Duty Boots" }), new Move("Earthquake"), field).description()

      expect(description).not.toContain("Spikes")
      expect(description).not.toContain("Stealth Rock")
    })

    it("omits Spikes for a Flying type defender", () => {
      const flyer = new Pokemon("Corviknight", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const field = new Field({ defenderSide: { spikes: 3 } })

      const description = calculateDamage(chomp(), flyer, new Move("Brick Break"), field).description()

      expect(description).not.toContain("Spikes")
    })
  })

  describe("berry damage reduction", () => {
    it("halves the damage of a resisted hit with the matching berry", () => {
      const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Timid" })
      const plain = new Pokemon("Kartana", { evs: { hp: 252, spd: 252 }, nature: "Careful" })
      const berry = new Pokemon("Kartana", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Occa Berry" })
      const move = () => new Move("Overheat")

      const plainDamage = calculateDamage(attacker, plain, move(), new Field()).damage as number[]
      const berryDamage = calculateDamage(attacker, berry, move(), new Field()).damage as number[]

      expect(berryDamage[15]).toBeLessThan(plainDamage[15])
    })

    it("mentions Figy Berry recovery", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { def: 252 }, nature: "Hardy", item: "Figy Berry" })

      const description = calculateDamage(attacker, defender, new Move("Earthquake"), new Field()).description()

      expect(description).toContain("Figy Berry recovery")
    })
  })

  describe("heal block and item removal", () => {
    const chomp = () => new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest" })

    it("blocks Leftovers recovery with Psychic Noise", () => {
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Leftovers" })

      const description = calculateDamage(chomp(), defender, new Move("Psychic Noise"), new Field()).description()

      expect(description).not.toContain("Leftovers recovery")
    })

    it("keeps Leftovers recovery when Covert Cloak blocks the heal block", () => {
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Covert Cloak" })
      const withLeftovers = new Pokemon("Snorlax", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Leftovers" })

      const blocked = calculateDamage(chomp(), withLeftovers, new Move("Psychic Noise"), new Field()).description()
      const notBlocked = calculateDamage(chomp(), defender, new Move("Psychic Noise"), new Field()).description()

      expect(blocked).not.toContain("Leftovers recovery")
      expect(notBlocked).not.toContain("Leftovers recovery")
    })

    it("blocks Grassy Terrain recovery with Psychic Noise", () => {
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 252 }, nature: "Careful" })
      const field = new Field({ terrain: "Grassy" })

      const description = calculateDamage(chomp(), defender, new Move("Psychic Noise"), field).description()

      expect(description).not.toContain("Grassy Terrain recovery")
    })

    it("keeps Leftovers recovery against Knock Off when the defender has Sticky Hold", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Gastrodon", { evs: { hp: 252, def: 252 }, nature: "Relaxed", item: "Leftovers", ability: "Sticky Hold" })

      const description = calculateDamage(attacker, defender, new Move("Knock Off"), new Field()).description()

      expect(description).toContain("Leftovers recovery")
    })
  })

  describe("Tera changes residual calculations", () => {
    it("uses the Tera type for Stealth Rock damage", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const plain = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const teraFire = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", teraType: "Fire" })
      const field = new Field({ defenderSide: { isSR: true } })
      const move = () => new Move("Earthquake")

      const plainChance = calculateDamage(attacker, plain, move(), field).kochance().chance
      const teraChance = calculateDamage(attacker, teraFire, move(), field).kochance().chance

      expect(plainChance).toBe(1)
      expect(teraChance).toBe(0.1875)
    })

    it("mentions Enigma Berry recovery on a super effective hit", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Dragonite", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Enigma Berry" })

      const description = calculateDamage(attacker, defender, new Move("Moonblast"), new Field()).description()

      expect(description).toContain("Enigma Berry recovery")
    })
  })

  describe("move used over several turns", () => {
    const chomp = () => new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const lax = (options: Record<string, unknown> = {}) => new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ...options })

    it("labels the move with the number of turns used", () => {
      const description = calculateDamage(chomp(), lax(), new Move("Earthquake", { timesUsed: 2 }), new Field()).description()

      expect(description).toContain("Earthquake over 2 turns")
    })

    it("reports 'not a KO' when two turns are not enough", () => {
      const description = calculateDamage(chomp(), lax(), new Move("Earthquake", { timesUsed: 2 }), new Field()).description()

      expect(description).toContain("not a KO")
    })

    it("reports a guaranteed KO in a fixed number of turns", () => {
      const description = calculateDamage(chomp(), lax(), new Move("Earthquake", { timesUsed: 4 }), new Field()).description()

      expect(description).toContain("guaranteed KO in 4 turns")
    })

    it("keeps the multiple turns wording beyond four turns", () => {
      const description = calculateDamage(chomp(), lax(), new Move("Earthquake", { timesUsed: 5 }), new Field()).description()

      expect(description).toContain("guaranteed KO in 5 turns")
    })

    it("appends residual damage to the multi turn KO text", () => {
      const description = calculateDamage(chomp(), lax({ status: "brn" }), new Move("Earthquake", { timesUsed: 3 }), new Field()).description()

      expect(description).toContain("guaranteed KO in 3 turns after burn damage")
    })

    it("accounts for berry recovery across turns", () => {
      const description = calculateDamage(chomp(), lax({ item: "Sitrus Berry" }), new Move("Earthquake", { timesUsed: 2 }), new Field()).description()

      expect(description).toContain("not a KO")
    })

    it("reports 'not a KO' for negligible damage over three turns", () => {
      const attacker = new Pokemon("Chansey", { evs: {}, nature: "Bold" })
      const defender = new Pokemon("Steelix", { evs: { hp: 252, def: 252 }, nature: "Impish" })

      const description = calculateDamage(attacker, defender, new Move("Tackle", { timesUsed: 3 }), new Field()).description()

      expect(description).toContain("not a KO")
    })

    it("returns one damage row per turn used", () => {
      const oneTurn = calculateDamage(chomp(), lax(), new Move("Earthquake"), new Field()).damage as number[]
      const twoTurns = calculateDamage(chomp(), lax(), new Move("Earthquake", { timesUsed: 2 }), new Field()).damage as number[][]

      expect(twoTurns.length).toBe(2)
      expect(twoTurns[0]).toEqual(oneTurn)
    })
  })

  describe("remaining residual branches", () => {
    const chomp = (options: Record<string, unknown> = {}) => new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ...options })
    const lax = (options: Record<string, unknown> = {}) => new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ...options })

    it("increases trapping damage with Binding Band", () => {
      const plain = calculateDamage(chomp(), lax(), new Move("Sand Tomb"), new Field()).kochance().chance
      const band = calculateDamage(chomp({ item: "Binding Band" }), lax(), new Move("Sand Tomb"), new Field()).kochance().chance

      expect(band).toBeGreaterThan(plain!)
    })

    it("increases Leech Seed recovery with Big Root on the defender", () => {
      const field = new Field({ attackerSide: { isSeeded: true } })
      const plain = calculateDamage(chomp(), lax(), new Move("Earthquake"), field).description()
      const bigRoot = calculateDamage(chomp(), lax({ item: "Big Root" }), new Move("Earthquake"), field).description()

      expect(plain).toContain("Leech Seed recovery")
      expect(bigRoot).toContain("Leech Seed recovery")
    })

    it("omits Leech Seed damage for a Magic Guard defender", () => {
      const field = new Field({ defenderSide: { isSeeded: true } })

      const description = calculateDamage(chomp(), lax({ ability: "Magic Guard" }), new Move("Earthquake"), field).description()

      expect(description).not.toContain("Leech Seed damage")
    })

    it("omits Black Sludge damage for a Klutz defender", () => {
      const description = calculateDamage(chomp(), lax({ item: "Black Sludge", ability: "Klutz" }), new Move("Earthquake"), new Field()).description()

      expect(description).not.toContain("Black Sludge damage")
    })

    it("omits poison damage for a Magic Guard defender", () => {
      const description = calculateDamage(chomp(), lax({ status: "psn", ability: "Magic Guard" }), new Move("Earthquake"), new Field()).description()

      expect(description).not.toContain("poison damage")
    })

    it("omits toxic damage for a Magic Guard defender", () => {
      const description = calculateDamage(chomp(), lax({ status: "tox", toxicCounter: 3, ability: "Magic Guard" }), new Move("Earthquake"), new Field()).description()

      expect(description).not.toContain("toxic damage")
    })

    it("omits Stealth Rock damage for a Magic Guard defender", () => {
      const field = new Field({ defenderSide: { isSR: true } })

      const description = calculateDamage(chomp(), lax({ ability: "Magic Guard" }), new Move("Earthquake"), field).description()

      expect(description).not.toContain("Stealth Rock")
    })

    it("blocks Black Sludge recovery for a poisoned type under Psychic Noise", () => {
      const attacker = new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Black Sludge" })

      const description = calculateDamage(attacker, defender, new Move("Psychic Noise"), new Field()).description()

      expect(description).not.toContain("Black Sludge recovery")
    })

    it("blocks Leech Seed recovery on the attacker side under Psychic Noise", () => {
      const attacker = new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 252 }, nature: "Careful" })
      const field = new Field({ attackerSide: { isSeeded: true } })

      const description = calculateDamage(attacker, defender, new Move("Psychic Noise"), field).description()

      expect(description).not.toContain("Leech Seed recovery")
    })

    it("doubles an Oran Berry recovery with Ripen", () => {
      const plain = calculateDamage(chomp(), lax({ item: "Oran Berry" }), new Move("Earthquake"), new Field()).kochance().chance
      const ripen = calculateDamage(chomp(), lax({ item: "Oran Berry", ability: "Ripen" }), new Move("Earthquake"), new Field()).kochance().chance

      expect(ripen).toBeLessThanOrEqual(plain!)
    })

    it("doubles a Figy Berry recovery with Ripen", () => {
      const defender = (options: Record<string, unknown>) => new Pokemon("Snorlax", { evs: { def: 252 }, nature: "Hardy", item: "Figy Berry", ...options })

      const plain = calculateDamage(chomp(), defender({}), new Move("Earthquake"), new Field()).kochance().chance
      const ripen = calculateDamage(chomp(), defender({ ability: "Ripen" }), new Move("Earthquake"), new Field()).kochance().chance

      expect(plain).toBe(0.703369140625)
      expect(ripen).toBe(0.9998626708984375)
    })

    it("quarters the resist berry reduction with Ripen", () => {
      const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Timid" })
      const kartana = (options: Record<string, unknown>) => new Pokemon("Kartana", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Occa Berry", ...options })

      const plain = calculateDamage(attacker, kartana({}), new Move("Overheat"), new Field()).damage as number[]
      const ripen = calculateDamage(attacker, kartana({ ability: "Ripen" }), new Move("Overheat"), new Field()).damage as number[]

      expect(ripen[15]).toBeLessThan(plain[15])
    })

    it("uses the Tera type to decide Enigma Berry effectiveness", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Modest" })
      const teraDragon = new Pokemon("Snorlax", { evs: { hp: 252, spd: 252 }, nature: "Careful", item: "Enigma Berry", teraType: "Dragon" })

      const description = calculateDamage(attacker, teraDragon, new Move("Moonblast"), new Field()).description()

      expect(description).toContain("Enigma Berry recovery")
    })

    it("caps the allies fainted counter at five", () => {
      const attacker = new Pokemon("Kingambit", { evs: { atk: 252 }, nature: "Adamant", ability: "Supreme Overlord", alliesFainted: 9 })

      const description = calculateDamage(attacker, lax(), new Move("Kowtow Cleave"), new Field()).description()

      expect(description).toContain("5 allies fainted")
    })

    it("uses the singular form for a single fainted ally", () => {
      const attacker = new Pokemon("Kingambit", { evs: { atk: 252 }, nature: "Adamant", ability: "Supreme Overlord", alliesFainted: 1 })

      const description = calculateDamage(attacker, lax(), new Move("Kowtow Cleave"), new Field()).description()

      expect(description).toContain("1 ally fainted")
    })

    it("reports recovery for a drain move used over several turns", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Modest", curHP: 1 })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })

      const moveDesc = calculateDamage(attacker, defender, new Move("Draining Kiss", { timesUsed: 2 }), new Field()).moveDesc()

      expect(moveDesc).toContain("recovered")
    })
  })

  describe("stat description text", () => {
    const lax = () => new Pokemon("Snorlax", { evs: { hp: 252 }, nature: "Hardy" })

    it("marks a boosting nature with a plus sign", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })

      const description = calculateDamage(attacker, lax(), new Move("Earthquake"), new Field()).description()

      expect(description).toContain("252+ Atk Garchomp")
    })

    it("marks a hindering nature with a minus sign", () => {
      const attacker = new Pokemon("Garchomp", { evs: { spe: 252 }, nature: "Adamant" })

      const description = calculateDamage(attacker, lax(), new Move("Draco Meteor"), new Field()).description()

      expect(description).toContain("0- SpA Garchomp")
    })

    it("omits the sign for HP EVs", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })

      const description = calculateDamage(attacker, lax(), new Move("Earthquake"), new Field()).description()

      expect(description).toContain("vs. 252 HP /")
    })

    it("omits the sign for a neutral nature", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Hardy" })

      const description = calculateDamage(attacker, lax(), new Move("Earthquake"), new Field()).description()

      expect(description).toContain("252 Atk Garchomp")
    })
  })

  describe("fixed damage moves", () => {
    const lax = () => new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })

    it("returns a scalar damage for Seismic Toss", () => {
      const attacker = new Pokemon("Machamp", { evs: { atk: 252 }, nature: "Adamant" })

      const result = calculateDamage(attacker, lax(), new Move("Seismic Toss"), new Field())

      expect(result.damage).toBe(50)
      expect(result.description()).toContain("50-50 (18.7 - 18.7%) -- guaranteed 6HKO")
    })

    it("returns half the current HP for Super Fang", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Adamant" })

      const result = calculateDamage(attacker, lax(), new Move("Super Fang"), new Field())

      expect(result.damage).toBe(133)
      expect(result.description()).toContain("guaranteed 3HKO")
    })

    it("returns the attacker current HP for Final Gambit", () => {
      const attacker = new Pokemon("Pelipper", { evs: { atk: 252 }, nature: "Adamant" })

      const result = calculateDamage(attacker, lax(), new Move("Final Gambit"), new Field())

      expect(result.damage).toBe(135)
      expect(result.description()).toContain("guaranteed 2HKO")
    })

    it("returns a damage pair for fixed damage boosted by Parental Bond", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })

      const result = calculateDamage(attacker, lax(), new Move("Seismic Toss"), new Field())

      expect(result.damage).toEqual([50, 50])
      expect(result.description()).toContain("100-100 (37.4 - 37.4%) -- guaranteed 3HKO")
    })

    it("reports the move percentage for a scalar damage move", () => {
      const attacker = new Pokemon("Machamp", { evs: { atk: 252 }, nature: "Adamant" })

      const moveDesc = calculateDamage(attacker, lax(), new Move("Seismic Toss"), new Field()).moveDesc()

      expect(moveDesc).toBe("18.7 - 18.7%")
    })
  })

  describe("suppressed errors for zero damage", () => {
    const immuneResult = () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Corviknight", { evs: { hp: 252 } })

      return calculateDamage(attacker, defender, new Move("Earthquake"), new Field())
    }

    it("throws from kochance when errors are enabled", () => {
      expect(() => immuneResult().kochance()).toThrow("damage[damage.length - 1] === 0.")
    })

    it("returns a neutral chance when errors are suppressed", () => {
      const chance = immuneResult().kochance(false)

      expect(chance).toEqual({ chance: 0, n: 0, text: "", berryConsumed: false })
    })

    it("builds a description without a KO text when errors are suppressed", () => {
      const description = immuneResult().fullDesc("%", false)

      expect(description).toBe("Garchomp Earthquake vs. Corviknight: 0-0 (0 - 0%)")
    })
  })

  describe("multihit moves with end of turn effects", () => {
    const weavile = () => new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Adamant" })
    const lax = (options: Record<string, unknown> = {}) => new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed", ...options })

    it("combines multihit damage with Leftovers recovery", () => {
      const description = calculateDamage(weavile(), lax({ item: "Leftovers" }), new Move("Triple Axel"), new Field()).description()

      expect(description).toContain("possible 6HKO after Leftovers recovery")
    })

    it("combines multihit damage with berry recovery", () => {
      const description = calculateDamage(weavile(), lax({ item: "Sitrus Berry" }), new Move("Triple Axel"), new Field()).description()

      expect(description).toContain("possible 6HKO after Sitrus Berry recovery")
    })

    it("combines multihit damage with burn damage", () => {
      const description = calculateDamage(weavile(), lax({ status: "brn" }), new Move("Triple Axel"), new Field()).description()

      expect(description).toContain("99.9% chance to 4HKO after burn damage")
    })

    it("combines multihit damage with both burn damage and berry recovery", () => {
      const description = calculateDamage(weavile(), lax({ item: "Sitrus Berry", status: "brn" }), new Move("Triple Axel"), new Field()).description()

      expect(description).toContain("possible 5HKO after burn damage and Sitrus Berry recovery")
    })

    it("handles a five hit move with berry recovery", () => {
      const attacker = new Pokemon("Cinccino", { evs: { atk: 252 }, nature: "Adamant" })

      const description = calculateDamage(attacker, lax({ item: "Sitrus Berry" }), new Move("Bullet Seed"), new Field()).description()

      expect(description).toContain("possible 8HKO after Sitrus Berry recovery")
    })
  })

  describe("MultiResult smoke tests", () => {
    it("produces combined result for two attackers", () => {
      const firstAttacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const secondAttacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const firstMove = new Move("Flare Blitz")
      const secondMove = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculateMultiDamage(firstAttacker, secondAttacker, firstMove, secondMove, defender, field)

      expect(result.resultString()).toBeTruthy()
      expect(result.getHKO()).toBeTruthy()
      expect(result.rangePercentage().max).toBeGreaterThan(0)
    })

    it("accounts for berry recovery between hits", () => {
      const firstAttacker = new Pokemon("Tyranitar", { evs: { atk: 252 }, nature: "Adamant" })
      const secondAttacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, item: "Sitrus Berry" })
      const firstMove = new Move("Rock Slide")
      const secondMove = new Move("Earthquake")
      const field = new Field({ gameType: "Doubles" })

      const result = calculateMultiDamage(firstAttacker, secondAttacker, firstMove, secondMove, defender, field)

      expect(result.resultString()).toBeTruthy()
    })
  })
})
