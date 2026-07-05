import { ZacianZamazentaAdjuster } from "@multicalc/calc-adjuster/zacian-zamazenta-adjuster"
import { Pokemon as CalcPokemon } from "@calc"
import { AbilityName } from "@data/types"

describe("Zacian Zamazenta Adjuster", () => {
  it("Should change ability to avoid automatic boost when Zacian is attacker", () => {
    const attacker = new CalcPokemon("Zacian")
    const target = new CalcPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian Crowned is attacker", () => {
    const attacker = new CalcPokemon("Zacian-Crowned")
    const target = new CalcPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian is defender", () => {
    const attacker = new CalcPokemon("Zamazenta")
    const target = new CalcPokemon("Zacian")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zacian Crowned is defender", () => {
    const attacker = new CalcPokemon("Zamazenta")
    const target = new CalcPokemon("Zacian-Crowned")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta is attacker", () => {
    const attacker = new CalcPokemon("Zamazenta")
    const target = new CalcPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta Crowned is attacker", () => {
    const attacker = new CalcPokemon("Zamazenta-Crowned")
    const target = new CalcPokemon("Rillaboom")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(attacker.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta is defender", () => {
    const attacker = new CalcPokemon("Zacian")
    const target = new CalcPokemon("Zamazenta")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })

  it("Should change ability to avoid automatic boost when Zamazenta Crowned is defender", () => {
    const attacker = new CalcPokemon("Zacian")
    const target = new CalcPokemon("Zamazenta-Crowned")

    new ZacianZamazentaAdjuster().adjust(attacker, target)

    expect(target.ability).toBe("Intimidate" as AbilityName)
  })
})
