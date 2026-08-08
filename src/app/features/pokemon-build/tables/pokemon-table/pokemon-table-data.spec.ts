import { pokemonTableData } from "@app/features/pokemon-build/tables/pokemon-table/pokemon-table-data"
import { topUsageByRegulation } from "@data/top-usage-regulation"

describe("pokemonTableData", () => {
  it("should return the groups in the expected order", () => {
    const result = pokemonTableData(false)

    expect(result.map(group => group.group)).toEqual(["Meta", "Low usage", "Regular"])
  })

  it("should only include the available Pokémon when all Pokémon are not allowed", () => {
    const result = pokemonTableData(false)

    expect(result.map(group => group.data.length)).toEqual([50, 74, 189])
  })

  it("should include every Pokémon in the regular group when all Pokémon are allowed", () => {
    const result = pokemonTableData(true)

    expect(result.find(group => group.group === "Regular")!.data.length).toBe(1189)
  })

  it("should not change the curated groups when all Pokémon are allowed", () => {
    const result = pokemonTableData(true)

    expect(result.find(group => group.group === "Meta")!.data.length).toBe(50)
    expect(result.find(group => group.group === "Low usage")!.data.length).toBe(74)
  })

  it("should order the Meta group by the top usage of the regulation", () => {
    const result = pokemonTableData(false)

    const metaNames = result.find(group => group.group === "Meta")!.data.map(pokemon => pokemon.name)

    expect(metaNames.slice(0, 4)).toEqual(topUsageByRegulation["MB"].slice(0, 4))
  })

  it("should order alphabetically the Pokémon that are outside the top usage", () => {
    const topUsage = topUsageByRegulation["MB"]
    const result = pokemonTableData(false)

    const outsideTopUsage = result
      .find(group => group.group === "Regular")!
      .data.map(pokemon => pokemon.name)
      .filter(name => !topUsage.includes(name))

    expect(outsideTopUsage).toEqual([...outsideTopUsage].sort((a, b) => a.localeCompare(b)))
  })

  it("should place a Pokémon listed in the top usage before the alphabetical ones", () => {
    const topUsage = topUsageByRegulation["MB"]
    const result = pokemonTableData(false)

    const regularNames = result.find(group => group.group === "Regular")!.data.map(pokemon => pokemon.name)
    const rankedPositions = regularNames.map((name, index) => (topUsage.includes(name) ? index : -1)).filter(index => index !== -1)
    const firstUnranked = regularNames.findIndex(name => !topUsage.includes(name))

    expect(rankedPositions.length).toBeGreaterThan(0)
    expect(Math.max(...rankedPositions)).toBeLessThan(firstUnranked)
  })

  it("should describe a Pokémon with its types, abilities and base stats", () => {
    const result = pokemonTableData(false)

    const incineroar = result.flatMap(group => group.data).find(pokemon => pokemon.name === "Incineroar")

    expect(incineroar).toEqual({
      name: "Incineroar",
      types: ["Fire", "Dark"],
      abilities: ["Blaze", "Intimidate"],
      hp: 95,
      atk: 115,
      def: 90,
      spa: 80,
      spd: 90,
      spe: 60,
      bst: 530,
      group: "Meta"
    })
  })

  it("should sum the base stats into the bst of every Pokémon", () => {
    const result = pokemonTableData(false)

    const wrongBst = result.flatMap(group => group.data).filter(pokemon => pokemon.hp + pokemon.atk + pokemon.def + pokemon.spa + pokemon.spd + pokemon.spe !== pokemon.bst)

    expect(wrongBst).toEqual([])
  })

  it("should never leave a Pokémon without a group", () => {
    const result = pokemonTableData(true)

    const ungrouped = result.flatMap(group => group.data).filter(pokemon => !pokemon.group)

    expect(ungrouped).toEqual([])
  })
})
