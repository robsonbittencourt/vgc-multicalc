import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"

describe("moves that read the current HP when it is zero", () => {
  const damageCalc = new DamageCalc()
  const field = new Field()

  const moveSet = (name: string) => new MoveSet(new Move(name), new Move(""), new Move(""), new Move(""))
  const attacker = (name: string, move: string, nature: string, sps: Partial<Stats>, hpPercentage = 100) => new Pokemon(name, { nature, moveSet: moveSet(move), sps, hpPercentage })
  const blastoise = (hpPercentage = 100) => new Pokemon("Blastoise", { hpPercentage })
  const describeDamage = (offender: Pokemon, defender: Pokemon) => damageCalc.calcDamage(offender, defender, field, true, false).description

  describe("reading the HP of the defender", () => {
    it("should deal the minimum damage with Super Fang against a defender with no HP left", () => {
      const maushold = attacker("Maushold", "Super Fang", "Impish", { atk: 32 })

      const description = describeDamage(maushold, blastoise(0))

      expect(description).toContain("Super Fang vs. 0 HP Blastoise: 1-1")
    })

    it("should deal the minimum damage with Ruination against a defender with no HP left", () => {
      const chiYu = attacker("Chi-Yu", "Ruination", "Modest", { spa: 32 })

      const description = describeDamage(chiYu, blastoise(0))

      expect(description).toContain("Ruination vs. 0 HP Blastoise: 1-1")
    })

    it("should drop Hard Press to its minimum base power against a defender with no HP left", () => {
      const chienPao = attacker("Chien-Pao", "Hard Press", "Adamant", { atk: 32 })

      const description = describeDamage(chienPao, blastoise(0))

      expect(description).toContain("Hard Press (1 BP)")
      expect(description).toContain("Blastoise: 1-1")
    })

    it("should drop Crush Grip to its minimum base power against a defender with no HP left", () => {
      const chienPao = attacker("Chien-Pao", "Crush Grip", "Adamant", { atk: 32 })

      const description = describeDamage(chienPao, blastoise(0))

      expect(description).toContain("Crush Grip (1 BP)")
      expect(description).toContain("Blastoise: 1-2")
    })

    it("should drop Wring Out to its minimum base power against a defender with no HP left", () => {
      const chiYu = attacker("Chi-Yu", "Wring Out", "Modest", { spa: 32 })

      const description = describeDamage(chiYu, blastoise(0))

      expect(description).toContain("Wring Out (1 BP)")
      expect(description).toContain("Blastoise: 1-2")
    })

    it("should double the base power of Brine against a defender with no HP left", () => {
      const chiYu = attacker("Chi-Yu", "Brine", "Modest", { spa: 32 })

      const description = describeDamage(chiYu, blastoise(0))

      expect(description).toContain("Brine (130 BP)")
      expect(description).toContain("Blastoise: 53-63")
    })

    it("should bring the defender down to the HP of an attacker that is almost down", () => {
      const chienPao = attacker("Chien-Pao", "Endeavor", "Adamant", { atk: 32 }, 25)

      const description = describeDamage(chienPao, blastoise(100))

      expect(description).toContain("Endeavor vs. 0 HP Blastoise: 115-115")
    })
  })

  describe("reading the HP of the attacker", () => {
    it("should drop Eruption to its minimum base power when the attacker has no HP left", () => {
      const torkoal = attacker("Torkoal", "Eruption", "Modest", { spa: 32 }, 0)

      const description = describeDamage(torkoal, blastoise())

      expect(description).toContain("Eruption (1 BP)")
      expect(description).toContain("Blastoise: 1-1")
    })

    it("should drop Water Spout to its minimum base power when the attacker has no HP left", () => {
      const kyogre = attacker("Kyogre", "Water Spout", "Modest", { spa: 32 }, 0)

      const description = describeDamage(kyogre, blastoise())

      expect(description).toContain("Water Spout (1 BP)")
      expect(description).toContain("Blastoise: 1-1")
    })

    it("should drop Dragon Energy to its minimum base power when the attacker has no HP left", () => {
      const regidrago = attacker("Regidrago", "Dragon Energy", "Modest", { spa: 32 }, 0)

      const description = describeDamage(regidrago, blastoise())

      expect(description).toContain("Dragon Energy (1 BP)")
      expect(description).toContain("Blastoise: 1-1")
    })

    it("should raise Flail to its maximum base power when the attacker has no HP left", () => {
      const basculin = attacker("Basculin", "Flail", "Adamant", { atk: 32 }, 0)

      const description = describeDamage(basculin, blastoise())

      expect(description).toContain("Flail (200 BP)")
      expect(description).toContain("Blastoise: 99-117")
    })

    it("should raise Reversal to its maximum base power when the attacker has no HP left", () => {
      const infernape = attacker("Infernape", "Reversal", "Adamant", { atk: 32 }, 0)

      const description = describeDamage(infernape, blastoise())

      expect(description).toContain("Reversal (200 BP)")
      expect(description).toContain("Blastoise: 160-190")
    })

    it("should deal no damage with Final Gambit when the attacker has no HP left", () => {
      const staraptor = attacker("Staraptor", "Final Gambit", "Adamant", { atk: 32 }, 0)

      const description = describeDamage(staraptor, blastoise())

      expect(description).toContain("Final Gambit vs. Blastoise: 0-0")
    })
  })
})
