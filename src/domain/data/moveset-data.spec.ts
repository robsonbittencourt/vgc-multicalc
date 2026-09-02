import { getMoveset, MOVESETS } from "@data/moveset-data"

const MAX_SPS = 66

describe("MOVESETS evs", () => {
  it("has every Pokemon spending exactly the maximum allowed sps", () => {
    const overLimit: string[] = []
    const underLimit: string[] = []

    for (const [name, moveset] of Object.entries(MOVESETS)) {
      const total = moveset.evs.hp + moveset.evs.atk + moveset.evs.def + moveset.evs.spa + moveset.evs.spd + moveset.evs.spe

      if (total > MAX_SPS) overLimit.push(`${name}: ${total}`)
      if (total < MAX_SPS) underLimit.push(`${name}: ${total}`)
    }

    expect(overLimit).toEqual([])
    expect(underLimit).toEqual([])
  })
})

describe("getMoveset", () => {
  it("finds a Pokemon whose name uses a typographic apostrophe when looked up with an ascii one", () => {
    const ascii = getMoveset("Farfetch'd")

    expect(ascii).toBeDefined()
    expect(ascii).toBe(getMoveset("Farfetch\u2019d"))
    expect(ascii!.ability).toBe("Keen Eye")
  })

  it("finds a Pokemon whose name uses an ascii apostrophe when looked up with a typographic one", () => {
    const typographic = getMoveset("Oricorio-Pa\u2019u")

    expect(typographic).toBeDefined()
    expect(typographic).toBe(getMoveset("Oricorio-Pa'u"))
  })

  it("finds an alternative form whose name carries the apostrophe", () => {
    expect(getMoveset("Farfetch'd-Galar")).toBe(getMoveset("Farfetch\u2019d-Galar"))
    expect(getMoveset("Sirfetch'd")).toBe(getMoveset("Sirfetch\u2019d"))
  })

  it("ignores case, spaces and hyphens in the looked up name", () => {
    expect(getMoveset("ho-oh")).toBe(getMoveset("Ho-Oh"))
    expect(getMoveset("mr. mime")).toBe(getMoveset("Mr. Mime"))
    expect(getMoveset("chien pao")).toBe(getMoveset("Chien-Pao"))
  })

  it("keeps every moveset reachable by its own name", () => {
    const unreachable = Object.keys(MOVESETS).filter(name => !getMoveset(name))

    expect(unreachable).toEqual([])
  })

  it("returns undefined for a name that matches no Pokemon", () => {
    expect(getMoveset("Not A Pokemon")).toBeUndefined()
  })
})
