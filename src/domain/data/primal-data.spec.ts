import { getPokemonData } from "@data/pokemon-data"
import { getMoveset } from "@data/moveset-data"
import { getPrimalOrb, holdsOwnPrimalOrb } from "@data/primal-data"
import { getStrongWeather } from "@data/strong-weather-data"

describe("Primal forms", () => {
  it("has the Kyogre-Primal data from Showdown", () => {
    const kyogre = getPokemonData("Kyogre-Primal")!

    expect(kyogre.types).toEqual(["Water"])
    expect(kyogre.baseStats).toEqual({ hp: 100, atk: 150, def: 90, spa: 180, spd: 160, spe: 90 })
    expect(kyogre.weightKg).toEqual(430)
    expect(kyogre.abilities).toEqual(["Primordial Sea"])
  })

  it("has the Groudon-Primal data from Showdown", () => {
    const groudon = getPokemonData("Groudon-Primal")!

    expect(groudon.types).toEqual(["Ground", "Fire"])
    expect(groudon.baseStats).toEqual({ hp: 100, atk: 180, def: 160, spa: 150, spd: 90, spe: 90 })
    expect(groudon.weightKg).toEqual(999.7)
    expect(groudon.abilities).toEqual(["Desolate Land"])
  })

  it("starts every Primal holding its own Orb", () => {
    expect(getMoveset("Kyogre-Primal")!.items).toEqual(["Blue Orb"])
    expect(getMoveset("Groudon-Primal")!.items).toEqual(["Red Orb"])
  })

  it("returns the Orb of each Primal form", () => {
    expect(getPrimalOrb("Kyogre-Primal")).toEqual("Blue Orb")
    expect(getPrimalOrb("Groudon-Primal")).toEqual("Red Orb")
  })

  it("returns no Orb for the base forms", () => {
    expect(getPrimalOrb("Kyogre")).toBeUndefined()
    expect(getPrimalOrb("Groudon")).toBeUndefined()
  })

  it("recognizes a Primal or its base form holding its own Orb", () => {
    expect(holdsOwnPrimalOrb("Kyogre-Primal", "Blue Orb")).toBe(true)
    expect(holdsOwnPrimalOrb("Groudon", "Red Orb")).toBe(true)
  })

  it("does not recognize a Pokemon holding another Orb", () => {
    expect(holdsOwnPrimalOrb("Kyogre-Primal", "Red Orb")).toBe(false)
    expect(holdsOwnPrimalOrb("Incineroar", "Blue Orb")).toBe(false)
    expect(holdsOwnPrimalOrb("Kyogre", "Leftovers")).toBe(false)
  })
})

describe("Strong weather abilities", () => {
  it("maps each ability to its strong weather", () => {
    expect(getStrongWeather("Primordial Sea")).toEqual("Heavy Rain")
    expect(getStrongWeather("Desolate Land")).toEqual("Harsh Sunshine")
    expect(getStrongWeather("Delta Stream")).toEqual("Strong Winds")
  })

  it("returns no weather for other abilities", () => {
    expect(getStrongWeather("Drizzle")).toBeUndefined()
    expect(getStrongWeather(undefined)).toBeUndefined()
  })
})
