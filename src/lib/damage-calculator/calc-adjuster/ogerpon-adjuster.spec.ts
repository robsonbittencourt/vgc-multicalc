import { Pokemon as SmogonPokemon } from "@calc"
import { AbilityName } from "@calc"
import { OgerponAdjuster } from "./ogerpon-adjuster"

describe("Ogerpon Adjuster", () => {
  it("Should change ability to avoid automatic boost when Ogerpon is attacker and has Tera active", () => {
    const attacker = new SmogonPokemon("Ogerpon", { teraType: "Grass" })
    const target = new SmogonPokemon("Rillaboom")

    new OgerponAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon-Hearthflame is attacker and has Tera active", () => {
    const attacker = new SmogonPokemon("Ogerpon-Hearthflame", { teraType: "Fire" })
    const target = new SmogonPokemon("Rillaboom")

    new OgerponAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon-Cornerstone is attacker and has Tera active", () => {
    const attacker = new SmogonPokemon("Ogerpon-Cornerstone", { teraType: "Rock" })
    const target = new SmogonPokemon("Rillaboom")

    new OgerponAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon-Wellspring is attacker and has Tera active", () => {
    const attacker = new SmogonPokemon("Ogerpon-Wellspring", { teraType: "Water" })
    const target = new SmogonPokemon("Rillaboom")

    new OgerponAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should not change ability when Ogerpon is attacker but Tera is inactive", () => {
    const attacker = new SmogonPokemon("Ogerpon")
    const target = new SmogonPokemon("Rillaboom")

    new OgerponAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Defiant" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon is defender and has Tera active", () => {
    const attacker = new SmogonPokemon("Rillaboom")
    const target = new SmogonPokemon("Ogerpon", { teraType: "Grass" })

    new OgerponAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon-Hearthflame is defender and has Tera active", () => {
    const attacker = new SmogonPokemon("Rillaboom")
    const target = new SmogonPokemon("Ogerpon-Hearthflame", { teraType: "Fire" })

    new OgerponAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon-Cornerstone is defender and has Tera active", () => {
    const attacker = new SmogonPokemon("Rillaboom")
    const target = new SmogonPokemon("Ogerpon-Cornerstone", { teraType: "Rock" })

    new OgerponAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Ogerpon-Wellspring is defender and has Tera active", () => {
    const attacker = new SmogonPokemon("Rillaboom")
    const target = new SmogonPokemon("Ogerpon-Wellspring", { teraType: "Water" })

    new OgerponAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should not change ability when Ogerpon is defender but Tera is inactive", () => {
    const attacker = new SmogonPokemon("Rillaboom")
    const target = new SmogonPokemon("Ogerpon")

    new OgerponAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Defiant" as AbilityName)
  })
})
