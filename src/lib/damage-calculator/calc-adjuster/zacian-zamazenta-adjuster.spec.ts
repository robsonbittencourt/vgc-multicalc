import { ZacianZamazentaAdjuster } from "@lib/damage-calculator/calc-adjuster/zacian-zamazenta-adjuster"
import { Pokemon as SmogonPokemon } from "@calc"
import { AbilityName } from "@calc"

describe("Zacian Zamazenta Adjuster", () => {
  it("Should change ability to avoid automatic boost when Zacian is attacker", () => {
    const attacker = new SmogonPokemon("Zacian")
    const target = new SmogonPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian Crowned is attacker", () => {
    const attacker = new SmogonPokemon("Zacian-Crowned")
    const target = new SmogonPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian is defender", () => {
    const attacker = new SmogonPokemon("Zamazenta")
    const target = new SmogonPokemon("Zacian")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian Crowned is defender", () => {
    const attacker = new SmogonPokemon("Zamazenta")
    const target = new SmogonPokemon("Zacian-Crowned")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta is attacker", () => {
    const attacker = new SmogonPokemon("Zamazenta")
    const target = new SmogonPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta Crowned is attacker", () => {
    const attacker = new SmogonPokemon("Zamazenta-Crowned")
    const target = new SmogonPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta is defender", () => {
    const attacker = new SmogonPokemon("Zacian")
    const target = new SmogonPokemon("Zamazenta")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta Crowned is defender", () => {
    const attacker = new SmogonPokemon("Zacian")
    const target = new SmogonPokemon("Zamazenta-Crowned")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })
})
