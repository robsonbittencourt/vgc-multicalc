import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { addMember, combineAttackers, excludeMetaData, separateAttackers } from "@multicalc/target-list"

describe("addMember", () => {
  it("should append the new Pokémon as an extra target", () => {
    const targets = [new Target(new Pokemon("Incineroar"))]

    const result = addMember(targets, new Pokemon("Rillaboom"))

    expect(result.length).toBe(2)
    expect(result[1].pokemon.name).toBe("Rillaboom")
  })

  it("should not mutate the original list", () => {
    const targets = [new Target(new Pokemon("Incineroar"))]

    addMember(targets, new Pokemon("Rillaboom"))

    expect(targets.length).toBe(1)
  })
})

describe("combineAttackers", () => {
  it("should merge the active Pokémon into the target as its partner", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const targets = [new Target(incineroar), new Target(rillaboom)]

    const result = combineAttackers(targets, incineroar.id, rillaboom.id)!

    expect(result.length).toBe(1)
    expect(result[0].pokemon.name).toBe("Incineroar")
    expect(result[0].secondPokemon!.name).toBe("Rillaboom")
  })

  it("should keep the targets that were not combined", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const chiYu = new Pokemon("Chi-Yu")
    const targets = [new Target(incineroar), new Target(rillaboom), new Target(chiYu)]

    const result = combineAttackers(targets, incineroar.id, rillaboom.id)!

    expect(result.length).toBe(2)
    expect(result.map(t => t.pokemon.name)).toEqual(["Incineroar", "Chi-Yu"])
  })

  it("should keep the combined target in the position of the Pokémon that received the drop", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const chiYu = new Pokemon("Chi-Yu")
    const urshifu = new Pokemon("Urshifu")
    const targets = [new Target(chiYu), new Target(incineroar), new Target(urshifu), new Target(rillaboom)]

    const result = combineAttackers(targets, incineroar.id, rillaboom.id)!

    expect(result.map(t => t.pokemon.name)).toEqual(["Chi-Yu", "Incineroar", "Urshifu"])
    expect(result[1].secondPokemon!.name).toBe("Rillaboom")
  })

  it("should keep the combined target first when it received the drop in the first position", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const chiYu = new Pokemon("Chi-Yu")
    const targets = [new Target(incineroar), new Target(chiYu), new Target(rillaboom)]

    const result = combineAttackers(targets, incineroar.id, rillaboom.id)!

    expect(result.map(t => t.pokemon.name)).toEqual(["Incineroar", "Chi-Yu"])
  })

  it("should keep the position of the target when the attacker comes before it", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const chiYu = new Pokemon("Chi-Yu")
    const urshifu = new Pokemon("Urshifu")
    const targets = [new Target(rillaboom), new Target(chiYu), new Target(incineroar), new Target(urshifu)]

    const result = combineAttackers(targets, incineroar.id, rillaboom.id)!

    expect(result.map(t => t.pokemon.name)).toEqual(["Chi-Yu", "Incineroar", "Urshifu"])
    expect(result[1].secondPokemon!.name).toBe("Rillaboom")
  })

  it("should refuse to combine when the target does not exist", () => {
    const targets = [new Target(new Pokemon("Incineroar"))]

    expect(combineAttackers(targets, "missing-id", targets[0].pokemon.id)).toBeNull()
  })

  it("should refuse to combine when the target already has a partner", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const chiYu = new Pokemon("Chi-Yu")
    const targets = [new Target(incineroar, rillaboom), new Target(chiYu)]

    expect(combineAttackers(targets, incineroar.id, chiYu.id)).toBeNull()
  })

  it("should refuse to combine when the active Pokémon does not exist", () => {
    const incineroar = new Pokemon("Incineroar")
    const targets = [new Target(incineroar)]

    expect(combineAttackers(targets, incineroar.id, "missing-id")).toBeNull()
  })
})

describe("separateAttackers", () => {
  it("should split a combined target back into two targets", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const targets = [new Target(incineroar, rillaboom)]

    const result = separateAttackers(targets, incineroar.id)

    expect(result.length).toBe(2)
    expect(result[0].pokemon.name).toBe("Incineroar")
    expect(result[0].secondPokemon).toBeUndefined()
    expect(result[1].pokemon.name).toBe("Rillaboom")
  })

  it("should split the combined target when addressed by its partner id", () => {
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const targets = [new Target(incineroar, rillaboom)]

    const result = separateAttackers(targets, rillaboom.id)

    expect(result.length).toBe(2)
    expect(result[0].pokemon.name).toBe("Incineroar")
    expect(result[1].pokemon.name).toBe("Rillaboom")
  })

  it("should keep the surrounding targets in place", () => {
    const chiYu = new Pokemon("Chi-Yu")
    const incineroar = new Pokemon("Incineroar")
    const rillaboom = new Pokemon("Rillaboom")
    const flutterMane = new Pokemon("Flutter Mane")
    const targets = [new Target(chiYu), new Target(incineroar, rillaboom), new Target(flutterMane)]

    const result = separateAttackers(targets, incineroar.id)

    expect(result.map(t => t.pokemon.name)).toEqual(["Chi-Yu", "Incineroar", "Rillaboom", "Flutter Mane"])
  })
})

describe("excludeMetaData", () => {
  it("should remove the targets that came from the meta list", () => {
    const targets = [new Target(new Pokemon("Incineroar")), new Target(new Pokemon("Rillaboom"))]
    const meta = [new Pokemon("Rillaboom")]

    const result = excludeMetaData(targets, meta)

    expect(result.map(t => t.pokemon.name)).toEqual(["Incineroar"])
  })

  it("should keep every target when none of them is in the meta list", () => {
    const targets = [new Target(new Pokemon("Incineroar")), new Target(new Pokemon("Rillaboom"))]

    const result = excludeMetaData(targets, [new Pokemon("Chi-Yu")])

    expect(result.map(t => t.pokemon.name)).toEqual(["Incineroar", "Rillaboom"])
  })

  it("should remove only as many duplicates as the meta list contains", () => {
    const targets = [new Target(new Pokemon("Incineroar")), new Target(new Pokemon("Incineroar")), new Target(new Pokemon("Incineroar"))]
    const meta = [new Pokemon("Incineroar")]

    const result = excludeMetaData(targets, meta)

    expect(result.length).toBe(2)
  })

  it("should remove the last duplicated target first keeping the original order", () => {
    const chiYu = new Pokemon("Chi-Yu")
    const targets = [new Target(new Pokemon("Incineroar")), new Target(chiYu), new Target(new Pokemon("Incineroar"))]

    const result = excludeMetaData(targets, [new Pokemon("Incineroar")])

    expect(result.map(t => t.pokemon.name)).toEqual(["Incineroar", "Chi-Yu"])
  })
})
