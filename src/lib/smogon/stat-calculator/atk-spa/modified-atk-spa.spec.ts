import { Ability } from "@lib/model/ability"
import { Field, FieldSide } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { getFinalAttack, getFinalSpecialAttack } from "./modified-atk-spa"

describe("Calculate final attack stat with modifiers", () => {
  describe("by stat modifiers", () => {
    it("should return raw attack stat when does not have any modification", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 } })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(183)
    })

    it("should return modified attack when have positive stat modifiers", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: 2 } })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(366)
    })

    it("should not ignore positive stats modifiers when is a critical hit", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: 2 } })
      const field = new Field({ attackerSide: new FieldSide({ isCriticalHit: true }) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(366)
    })

    it("should return modified attack when have negative stat modifiers", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: -4 } })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(61)
    })

    it("should ignore negative stats modifiers when is a critical hit", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: -4 } })
      const field = new Field({ attackerSide: new FieldSide({ isCriticalHit: true }) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field, true)

      expect(atk).toBe(183)
    })
  })

  describe("by abilities", () => {
    it("should return modified attack when have Hustle ability", () => {
      const pokemon = new Pokemon("Deino", { nature: "Adamant", evs: { atk: 44 }, ability: new Ability("Hustle") })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(150)
      expect(spa).toBe(58)
    })

    it("should return modified attack when have Pure Power ability", () => {
      const pokemon = new Pokemon("Medicham", { nature: "Jolly", evs: { atk: 252 }, ability: new Ability("Pure Power") })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(224)
      expect(spa).toBe(72)
    })

    it("should return modified attack when have Huge Power ability", () => {
      const pokemon = new Pokemon("Azumarill", { nature: "Adamant", evs: { atk: 252 }, ability: new Ability("Huge Power") })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(224)
      expect(spa).toBe(72)
    })

    it("should return modified attack when have Slow Start ability active", () => {
      const pokemon = new Pokemon("Regigigas", { nature: "Adamant", evs: { atk: 12 }, ability: new Ability("Slow Start", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(100)
      expect(spa).toBe(90)
    })

    it("should return modified attack when have Slow Start ability but not active", () => {
      const pokemon = new Pokemon("Regigigas", { nature: "Adamant", evs: { atk: 12 }, ability: new Ability("Slow Start", false) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(200)
      expect(spa).toBe(90)
    })

    it("should return modified attack when have Guts ability and have some status condition", () => {
      const pokemon = new Pokemon("Ursaluna", { nature: "Adamant", evs: { atk: 172 }, ability: new Ability("Guts"), status: Status.BURN })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(300)
      expect(spa).toBe(58)
    })

    it("should return modified attack when have Guts ability but don't have any status condition", () => {
      const pokemon = new Pokemon("Ursaluna", { nature: "Adamant", evs: { atk: 172 }, ability: new Ability("Guts"), status: Status.HEALTHY })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(200)
      expect(spa).toBe(58)
    })

    it("should return modified attack when have Overgrow ability and have less then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Torterra", { nature: "Adamant", evs: { atk: 60 }, ability: new Ability("Overgrow"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Bullet Seed"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Bullet Seed"), new Field())

      expect(atk).toBe(225)
      expect(spa).toBe(85)
    })

    it("should return modified attack when have Overgrow ability and have more then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Torterra", { nature: "Adamant", evs: { atk: 60 }, ability: new Ability("Overgrow"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Bullet Seed"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Bullet Seed"), new Field())

      expect(atk).toBe(150)
      expect(spa).toBe(85)
    })

    it("should return modified attack when have Blaze ability and have less then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Blaziken", { nature: "Adamant", evs: { atk: 44 }, ability: new Ability("Blaze"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Fire Punch"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Fire Punch"), new Field())

      expect(atk).toBe(240)
      expect(spa).toBe(117)
    })

    it("should return modified attack when have Blaze ability and have more then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Blaziken", { nature: "Adamant", evs: { atk: 44 }, ability: new Ability("Blaze"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Fire Punch"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Fire Punch"), new Field())

      expect(atk).toBe(160)
      expect(spa).toBe(117)
    })

    it("should return modified attack when have Torrent ability and have less then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Empoleon", { nature: "Adamant", evs: { atk: 244 }, ability: new Ability("Torrent"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Aqua Jet"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Aqua Jet"), new Field())

      expect(atk).toBe(225)
      expect(spa).toBe(117)
    })

    it("should return modified attack when have Torrent ability and have more then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Empoleon", { nature: "Adamant", evs: { atk: 244 }, ability: new Ability("Torrent"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Aqua Jet"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Aqua Jet"), new Field())

      expect(atk).toBe(150)
      expect(spa).toBe(117)
    })

    it("should return modified attack when have Swarm ability and have less then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Scyther", { nature: "Adamant", evs: { atk: 52 }, ability: new Ability("Swarm"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Bug Bite"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Bug Bite"), new Field())

      expect(atk).toBe(225)
      expect(spa).toBe(67)
    })

    it("should return modified attack when have Swarm ability and have more then 33% of HP and use a physical move", () => {
      const pokemon = new Pokemon("Scyther", { nature: "Adamant", evs: { atk: 52 }, ability: new Ability("Swarm"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Bug Bite"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Bug Bite"), new Field())

      expect(atk).toBe(150)
      expect(spa).toBe(67)
    })

    it("should return modified attack when have Flash Fire ability active and use a psysical fire move", () => {
      const pokemon = new Pokemon("Houndoom", { nature: "Timid", evs: { atk: 12, spa: 156 }, ability: new Ability("Flash Fire", true) })

      const atk = getFinalAttack(pokemon, new Move("Fire Fang"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Fire Fang"), new Field())

      expect(atk).toBe(150)
      expect(spa).toBe(150)
    })

    it("should return modified attack when have Flash Fire ability active but not use a fire move", () => {
      const pokemon = new Pokemon("Houndoom", { nature: "Timid", evs: { atk: 12, spa: 156 }, ability: new Ability("Flash Fire", true) })

      const atk = getFinalAttack(pokemon, new Move("Crunch"), new Field())

      expect(atk).toBe(100)
    })

    it("should return modified attack when have Flash Fire ability but not active even if use a fire move", () => {
      const pokemon = new Pokemon("Houndoom", { nature: "Timid", evs: { atk: 12, spa: 156 }, ability: new Ability("Flash Fire", false) })

      const atk = getFinalAttack(pokemon, new Move("Fire Fang"), new Field())

      expect(atk).toBe(100)
    })

    it("should return modified attack when have Dragon's Maw ability and use a physical dragon move", () => {
      const pokemon = new Pokemon("Regidrago", { nature: "Modest", evs: { atk: 108, spa: 132 }, ability: new Ability("Dragon's Maw") })

      const atk = getFinalAttack(pokemon, new Move("Breaking Swipe"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Breaking Swipe"), new Field())

      expect(atk).toBe(180)
      expect(spa).toBe(150)
    })

    it("should return modified attack when have Dragon's Maw ability but not use a physical dragon move", () => {
      const pokemon = new Pokemon("Regidrago", { nature: "Modest", evs: { atk: 108, spa: 132 }, ability: new Ability("Dragon's Maw") })

      const atk = getFinalAttack(pokemon, new Move("Body Slam"), new Field())

      expect(atk).toBe(120)
    })

    it("should return modified attack when have Rocky Payload ability and use a physical rock move", () => {
      const pokemon = new Pokemon("Bombirdier", { nature: "Careful", evs: { atk: 212, spa: 252 }, ability: new Ability("Rocky Payload") })

      const atk = getFinalAttack(pokemon, new Move("Rock Tomb"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Rock Tomb"), new Field())

      expect(atk).toBe(225)
      expect(spa).toBe(100)
    })

    it("should return modified attack when have Rocky Payload ability but not use a physical rock move", () => {
      const pokemon = new Pokemon("Bombirdier", { nature: "Careful", evs: { atk: 212, spa: 252 }, ability: new Ability("Rocky Payload") })

      const atk = getFinalAttack(pokemon, new Move("Hyper Beam"), new Field())

      expect(atk).toBe(150)
    })

    it("should return modified attack when have Transistor ability and use a physical electric move", () => {
      const pokemon = new Pokemon("Regieleki", { nature: "Modest", evs: { atk: 20, spa: 156 }, ability: new Ability("Transistor") })

      const atk = getFinalAttack(pokemon, new Move("Supercell Slam"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Supercell Slam"), new Field())

      expect(atk).toBe(143)
      expect(spa).toBe(154)
    })

    it("should return modified attack when have Transistor ability but not use a physical electric move", () => {
      const pokemon = new Pokemon("Regieleki", { nature: "Modest", evs: { atk: 20, spa: 156 }, ability: new Ability("Transistor") })

      const atk = getFinalAttack(pokemon, new Move("Body Slam"), new Field())

      expect(atk).toBe(110)
    })

    it("should return modified attack when have Stakeout ability active", () => {
      const pokemon = new Pokemon("Mabosstiff", { nature: "Jolly", evs: { atk: 76, spa: 28 }, ability: new Ability("Stakeout", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(300)
    })

    it("should return modified attack when have Stakeout ability but not active", () => {
      const pokemon = new Pokemon("Mabosstiff", { nature: "Jolly", evs: { atk: 76, spa: 28 }, ability: new Ability("Stakeout", false) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(150)
    })

    it("should return modified attack when have Water Bubble ability active and use a physical water move", () => {
      const pokemon = new Pokemon("Araquanid", { nature: "Brave", evs: { atk: 188, spa: 236 }, ability: new Ability("Water Bubble", true) })

      const atk = getFinalAttack(pokemon, new Move("Liquidation"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Liquidation"), new Field())

      expect(atk).toBe(250)
      expect(spa).toBe(100)
    })

    it("should return modified attack when have Water Bubble ability active but not use a water move", () => {
      const pokemon = new Pokemon("Araquanid", { nature: "Brave", evs: { atk: 188, spa: 236 }, ability: new Ability("Water Bubble", true) })

      const atk = getFinalAttack(pokemon, new Move("Blizzard"), new Field())

      expect(atk).toBe(125)
    })

    it("should return modified attack when Tablets of Ruin active", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 } })
      const field = new Field({ isTabletsOfRuin: true })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(137)
      expect(spa).toBe(103)
    })

    it("should return modified special attack when Tablets of Ruin active active but Pokémon have Tablets of Ruin active", () => {
      const pokemon = new Pokemon("Wo-Chien", { nature: "Adamant", evs: { atk: 252 } })
      const field = new Field({ isTabletsOfRuin: true })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(150)
    })

    it("should return modified attack when have Protosynthesis active and the higher status is atk", () => {
      const pokemon = new Pokemon("Roaring Moon", { nature: "Adamant", evs: { atk: 124 }, ability: new Ability("Protosynthesis", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(249)
      expect(spa).toBe(67)
    })

    it("should return modified attack when have Protosynthesis active and the higher status is spe", () => {
      const pokemon = new Pokemon("Roaring Moon", { nature: "Jolly", evs: { spe: 252 }, ability: new Ability("Protosynthesis", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(159)
    })

    it("should return modified attack when have Protosynthesis but not active and the higher status is atk", () => {
      const pokemon = new Pokemon("Roaring Moon", { nature: "Adamant", evs: { atk: 124 }, ability: new Ability("Protosynthesis", false) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(192)
    })

    it("should return modified attack when have Quark Drive active and the higher status is atk", () => {
      const pokemon = new Pokemon("Iron Treads", { nature: "Adamant", evs: { atk: 252 }, ability: new Ability("Quark Drive", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(234)
      expect(spa).toBe(82)
    })

    it("should return modified attack when have Quark Drive active and the higher status is spe", () => {
      const pokemon = new Pokemon("Iron Treads", { nature: "Adamant", evs: { spe: 252 }, ability: new Ability("Quark Drive", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(145)
    })

    it("should return modified attack when have Quark Drive but not active and the higher status is atk", () => {
      const pokemon = new Pokemon("Iron Treads", { nature: "Adamant", evs: { atk: 252 }, ability: new Ability("Quark Drive", false) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(180)
    })

    it("should return modified attack when have Orichalcum Pulse active", () => {
      const pokemon = new Pokemon("Koraidon", { nature: "Adamant", evs: { atk: 212 } })
      const field = new Field({ weather: "Sun" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(266)
    })

    it("should return modified attack when have Orichalcum Pulse but not active", () => {
      const pokemon = new Pokemon("Koraidon", { nature: "Adamant", evs: { atk: 212 } })
      const field = new Field({ weather: "Rain" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(200)
    })
  })

  describe("by items", () => {
    it("should return modified attack when Pikachu holds Light Ball", () => {
      const pokemon = new Pokemon("Pikachu", { nature: "Adamant", evs: { atk: 124 }, item: "Light Ball" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(200)
    })

    it("should return modified attack when another Pokémon holds Light Ball", () => {
      const pokemon = new Pokemon("Raichu", { nature: "Adamant", evs: { atk: 124 }, item: "Light Ball" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(138)
    })

    it("should return modified attack when holds Choice Band", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Adamant", evs: { atk: 252 }, item: "Choice Band" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(300)
      expect(spa).toBe(90)
    })
  })
})

describe("Calculate final special attack stat with modifiers", () => {
  describe("by abilities", () => {
    it("should return modified attack when have Solar Power ability and Sun is active", () => {
      const pokemon = new Pokemon("Charizard", { nature: "Timid", evs: { spa: 244 }, ability: new Ability("Solar Power") })
      const field = new Field({ weather: "Sun" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(93)
      expect(spa).toBe(240)
    })

    it("should return modified special attack when have Overgrow ability and have less then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Torterra", { nature: "Modest", evs: { spa: 188 }, ability: new Ability("Overgrow"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Solar Beam"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Solar Beam"), new Field())

      expect(atk).toBe(116)
      expect(spa).toBe(195)
    })

    it("should return modified special attack when have Overgrow ability and have more then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Torterra", { nature: "Modest", evs: { spa: 188 }, ability: new Ability("Overgrow"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Solar Beam"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Solar Beam"), new Field())

      expect(atk).toBe(116)
      expect(spa).toBe(130)
    })

    it("should return modified special attack when have Blaze ability and have less then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Blaziken", { nature: "Modest", evs: { spa: 52 }, ability: new Ability("Blaze"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Fire Blast"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Fire Blast"), new Field())

      expect(atk).toBe(126)
      expect(spa).toBe(225)
    })

    it("should return modified special attack when have Blaze ability and have more then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Blaziken", { nature: "Modest", evs: { spa: 52 }, ability: new Ability("Blaze"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Fire Blast"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Fire Blast"), new Field())

      expect(atk).toBe(126)
      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Torrent ability and have less then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Empoleon", { nature: "Modest", evs: { spa: 44 }, ability: new Ability("Torrent"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Surf"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Surf"), new Field())

      expect(atk).toBe(95)
      expect(spa).toBe(225)
    })

    it("should return modified special attack when have Torrent ability and have more then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Empoleon", { nature: "Modest", evs: { spa: 44 }, ability: new Ability("Torrent"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Surf"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Surf"), new Field())

      expect(atk).toBe(95)
      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Swarm ability and have less then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Scyther", { nature: "Modest", evs: { spa: 124 }, ability: new Ability("Swarm"), hpPercentage: 32 })

      const atk = getFinalAttack(pokemon, new Move("Bug Buzz"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Bug Buzz"), new Field())

      expect(atk).toBe(117)
      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Swarm ability and have more then 33% of HP and use a special move", () => {
      const pokemon = new Pokemon("Scyther", { nature: "Modest", evs: { spa: 124 }, ability: new Ability("Swarm"), hpPercentage: 35 })

      const atk = getFinalAttack(pokemon, new Move("Bug Buzz"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Bug Buzz"), new Field())

      expect(atk).toBe(117)
      expect(spa).toBe(100)
    })

    it("should return modified special attack when have Plus ability is active", () => {
      const pokemon = new Pokemon("Toxtricity", { nature: "Modest", evs: { spa: 20 }, ability: new Ability("Plus", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(106)
      expect(spa).toBe(225)
    })

    it("should return modified special attack when have Plus ability but not active", () => {
      const pokemon = new Pokemon("Toxtricity", { nature: "Modest", evs: { spa: 20 }, ability: new Ability("Plus", false) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(106)
      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Minus ability is active", () => {
      const pokemon = new Pokemon("Toxtricity-Low-Key", { nature: "Modest", evs: { spa: 20 }, ability: new Ability("Minus", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(106)
      expect(spa).toBe(225)
    })

    it("should return modified special attack when have Minus ability but not active", () => {
      const pokemon = new Pokemon("Toxtricity-Low-Key", { nature: "Modest", evs: { spa: 20 }, ability: new Ability("Minus", false) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(106)
      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Flash Fire ability active and use a special fire move", () => {
      const pokemon = new Pokemon("Houndoom", { nature: "Timid", evs: { atk: 12, spa: 156 }, ability: new Ability("Flash Fire", true) })

      const atk = getFinalAttack(pokemon, new Move("Flamethrower"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Flamethrower"), new Field())

      expect(atk).toBe(100)
      expect(spa).toBe(225)
    })

    it("should return modified special attack when have Flash Fire ability active but not use a fire move", () => {
      const pokemon = new Pokemon("Houndoom", { nature: "Timid", evs: { atk: 12, spa: 156 }, ability: new Ability("Flash Fire", true) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Sludge Bomb"), new Field())

      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Flash Fire ability but not active even if use a fire move", () => {
      const pokemon = new Pokemon("Houndoom", { nature: "Timid", evs: { atk: 12, spa: 156 }, ability: new Ability("Flash Fire", false) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Flamethrower"), new Field())

      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Dragon's Maw ability and use a special dragon move", () => {
      const pokemon = new Pokemon("Regidrago", { nature: "Modest", evs: { atk: 108, spa: 132 }, ability: new Ability("Dragon's Maw") })

      const atk = getFinalAttack(pokemon, new Move("Draco Meteor"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Draco Meteor"), new Field())

      expect(atk).toBe(120)
      expect(spa).toBe(225)
    })

    it("should return modified special attack when have Dragon's Maw ability but not use a special dragon move", () => {
      const pokemon = new Pokemon("Regidrago", { nature: "Modest", evs: { atk: 108, spa: 132 }, ability: new Ability("Dragon's Maw") })

      const spa = getFinalSpecialAttack(pokemon, new Move("Earth Power"), new Field())

      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Rocky Payload ability and use a special rock move", () => {
      const pokemon = new Pokemon("Bombirdier", { nature: "Careful", evs: { atk: 212, spa: 252 }, ability: new Ability("Rocky Payload") })

      const atk = getFinalAttack(pokemon, new Move("Power Gem"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Power Gem"), new Field())

      expect(atk).toBe(150)
      expect(spa).toBe(150)
    })

    it("should return modified special attack when have Rocky Payload ability but not use a special rock move", () => {
      const pokemon = new Pokemon("Bombirdier", { nature: "Careful", evs: { atk: 212, spa: 252 }, ability: new Ability("Rocky Payload") })

      const spa = getFinalSpecialAttack(pokemon, new Move("Hyper Voice"), new Field())

      expect(spa).toBe(100)
    })

    it("should return modified special attack when have Transistor ability and use a special electric move", () => {
      const pokemon = new Pokemon("Regieleki", { nature: "Modest", evs: { atk: 20, spa: 156 }, ability: new Ability("Transistor") })

      const atk = getFinalAttack(pokemon, new Move("Thunderbolt"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Thunderbolt"), new Field())

      expect(atk).toBe(110)
      expect(spa).toBe(200)
    })

    it("should return modified special attack when have Transistor ability but not use a special electric move", () => {
      const pokemon = new Pokemon("Regieleki", { nature: "Modest", evs: { atk: 20, spa: 156 }, ability: new Ability("Transistor") })

      const spa = getFinalSpecialAttack(pokemon, new Move("Hyper Voice"), new Field())

      expect(spa).toBe(154)
    })

    it("should return modified attack when have Stakeout ability active", () => {
      const pokemon = new Pokemon("Mabosstiff", { nature: "Jolly", evs: { atk: 76, spa: 28 }, ability: new Ability("Stakeout", true) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(150)
    })

    it("should return modified attack when have Stakeout ability but not active", () => {
      const pokemon = new Pokemon("Mabosstiff", { nature: "Jolly", evs: { atk: 76, spa: 28 }, ability: new Ability("Stakeout", false) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(75)
    })

    it("should return modified special attack when have Water Bubble ability active and use a special water move", () => {
      const pokemon = new Pokemon("Araquanid", { nature: "Brave", evs: { atk: 188, spa: 236 }, ability: new Ability("Water Bubble", true) })

      const atk = getFinalAttack(pokemon, new Move("Surf"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Surf"), new Field())

      expect(atk).toBe(125)
      expect(spa).toBe(200)
    })

    it("should return modified special attack when have Water Bubble ability active but not use a water move", () => {
      const pokemon = new Pokemon("Araquanid", { nature: "Brave", evs: { atk: 188, spa: 236 }, ability: new Ability("Water Bubble", true) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Blizzard"), new Field())

      expect(spa).toBe(100)
    })

    it("should return modified special attack when Vessel of Ruin active", () => {
      const pokemon = new Pokemon("Farigiraf", { nature: "Quiet", evs: { spa: 52 } })
      const field = new Field({ isVesselOfRuin: true })

      const atk = getFinalAttack(pokemon, new Move("Protect"), field)
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(atk).toBe(110)
      expect(spa).toBe(112)
    })

    it("should return modified special attack when Vessel of Ruin active but Pokémon have Vessel of Ruin", () => {
      const pokemon = new Pokemon("Ting-Lu", { nature: "Sassy ", evs: { spa: 196 } })
      const field = new Field({ isVesselOfRuin: true })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(spa).toBe(100)
    })

    it("should return modified special attack when have Protosynthesis active and the higher status is spa", () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Modest", evs: { spa: 212 }, ability: new Ability("Protosynthesis", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(67)
      expect(spa).toBe(260)
    })

    it("should return modified special attack when have Protosynthesis active and the higher status is spe", () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Modest", evs: { spe: 212 }, ability: new Ability("Protosynthesis", true) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(170)
    })

    it("should return modified special attack when have Protosynthesis but not active and the higher status is spa", () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Modest", evs: { spa: 212 }, ability: new Ability("Protosynthesis", false) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(200)
    })

    it("should return modified special attack when have Quark Drive active and the higher status is spa", () => {
      const pokemon = new Pokemon("Iron Bundle", { nature: "Modest", evs: { spa: 252 }, ability: new Ability("Quark Drive", true) })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(90)
      expect(spa).toBe(250)
    })

    it("should return modified special attack when have Quark Drive active and the higher status is spe", () => {
      const pokemon = new Pokemon("Iron Bundle", { nature: "Modest", evs: { spe: 252 }, ability: new Ability("Quark Drive", true) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(158)
    })

    it("should return modified special attack when have Quark Drive but not active and the higher status is spa", () => {
      const pokemon = new Pokemon("Iron Bundle", { nature: "Modest", evs: { spa: 252 }, ability: new Ability("Quark Drive", false) })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(193)
    })

    it("should return modified attack when have Hadron Engine active", () => {
      const pokemon = new Pokemon("Miraidon", { nature: "Modest", evs: { spa: 212 } })
      const field = new Field({ terrain: "Electric" })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(spa).toBe(266)
    })

    it("should return modified attack when have Hadron Engine but not active", () => {
      const pokemon = new Pokemon("Miraidon", { nature: "Modest", evs: { spa: 212 } })
      const field = new Field({ terrain: "Grassy" })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(spa).toBe(200)
    })
  })

  describe("by items", () => {
    it("should return modified special attack when Pikachu holds Light Ball", () => {
      const pokemon = new Pokemon("Pikachu", { nature: "Modest", evs: { spa: 164 }, item: "Light Ball" })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(200)
    })

    it("should return modified special attack when another Pokémon holds Light Ball", () => {
      const pokemon = new Pokemon("Raichu", { nature: "Modest", evs: { spa: 164 }, item: "Light Ball" })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(spa).toBe(144)
    })

    it("should return modified special attack when holds Choice Specs", () => {
      const pokemon = new Pokemon("Calyrex-Shadow", { nature: "Modest", evs: { spa: 252 }, item: "Choice Specs" })

      const atk = getFinalAttack(pokemon, new Move("Protect"), new Field())
      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

      expect(atk).toBe(94)
      expect(spa).toBe(357)
    })
  })

  describe("Neutralizing Gas", () => {
    it("should deactivate ability because the Neutralizing Gas", () => {
      const pokemon = new Pokemon("Miraidon", { nature: "Modest", evs: { spa: 252 } })
      const field = new Field({ terrain: "Electric", isNeutralizingGas: true })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(spa).toBe(205)
    })

    it("should not deactivate ability because the Neutralizing Gas when the Pokémon has Ability Shield equipped", () => {
      const pokemon = new Pokemon("Miraidon", { nature: "Modest", evs: { spa: 252 }, item: "Ability Shield" })
      const field = new Field({ terrain: "Electric", isNeutralizingGas: true })

      const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

      expect(spa).toBe(273)
    })
  })
})
