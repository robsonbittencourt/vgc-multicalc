import { ZacianZamazentaAdjuster } from "@lib/damage-calculator/calc-adjuster/zacian-zamazenta-adjuster"
import { Generations, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { AbilityName } from "@robsonbittencourt/calc/dist/data/interface"

describe("Zacian Zamazenta Adjuster", () => {
  const gen = Generations.get(9)

  it("Should change ability to avoid automatic boost when Zacian is attacker", () => {
    const attacker = new SmogonPokemon(gen, "Zacian")
    const target = new SmogonPokemon(gen, "Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian Crowned is attacker", () => {
    const attacker = new SmogonPokemon(gen, "Zacian-Crowned")
    const target = new SmogonPokemon(gen, "Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian is defender", () => {
    const attacker = new SmogonPokemon(gen, "Zamazenta")
    const target = new SmogonPokemon(gen, "Zacian")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian Crowned is defender", () => {
    const attacker = new SmogonPokemon(gen, "Zamazenta")
    const target = new SmogonPokemon(gen, "Zacian-Crowned")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta is attacker", () => {
    const attacker = new SmogonPokemon(gen, "Zamazenta")
    const target = new SmogonPokemon(gen, "Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta Crowned is attacker", () => {
    const attacker = new SmogonPokemon(gen, "Zamazenta-Crowned")
    const target = new SmogonPokemon(gen, "Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta is defender", () => {
    const attacker = new SmogonPokemon(gen, "Zacian")
    const target = new SmogonPokemon(gen, "Zamazenta")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta Crowned is defender", () => {
    const attacker = new SmogonPokemon(gen, "Zacian")
    const target = new SmogonPokemon(gen, "Zamazenta-Crowned")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })
})
