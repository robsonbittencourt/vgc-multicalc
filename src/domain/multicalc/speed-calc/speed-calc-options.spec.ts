import { POKEMON_DATA } from "@data/pokemon-data"
import { SpeedCalcOptions } from "@multicalc/speed-calc/speed-calc-options"

describe("SpeedCalcOptions", () => {
  it("should return top usage quantity", () => {
    const options = new SpeedCalcOptions({ topUsage: "60" })

    expect(options.topUsage).toEqual(60)
  })

  it("should return total Pokémon as quantity when top usage option equals All", () => {
    const options = new SpeedCalcOptions({ topUsage: "All" })

    expect(options.topUsage).toEqual(Object.values(POKEMON_DATA).filter(p => p.group !== undefined).length + 1)
  })
})
