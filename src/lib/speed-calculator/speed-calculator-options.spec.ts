import { AllPokemon } from "@data/pokemon-details"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"

describe("SpeedCalculatorOptions", () => {
  it("should return top usage quantity", () => {
    const options = new SpeedCalculatorOptions({ topUsage: "60" })

    expect(options.topUsage).toEqual(60)
  })

  it("should return total Pokémon as quantity when top usage option equals All", () => {
    const options = new SpeedCalculatorOptions({ topUsage: "All" })

    expect(options.topUsage).toEqual(AllPokemon.instance.allPokemonNames.length + 1)
  })
})
