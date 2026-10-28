import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonParameters } from "@multicalc/model/pokemon-parameters"

describe("DamageCalc with strong weather abilities", () => {
  const damageCalc = new DamageCalc()

  const pokemon = (name: string, move: string, options: PokemonParameters = {}) => new Pokemon(name, { moveSet: new MoveSet(new Move(move), new Move("Protect"), new Move("Protect"), new Move("Protect")), ...options })
  const kyogrePrimal = () => pokemon("Kyogre-Primal", "Hydro Pump", { nature: "Modest", sps: { spa: 32 } })
  const incineroar = () => pokemon("Incineroar", "Flare Blitz", { nature: "Adamant", sps: { atk: 32 } })
  const bulkyIncineroar = () => pokemon("Incineroar", "Fake Out", { sps: { hp: 32, spd: 1 } })

  it("should apply Heavy Rain when the attacker has Primordial Sea", () => {
    const result = damageCalc.calcDamage(kyogrePrimal(), bulkyIncineroar(), new Field())

    expect(result.description).toEqual("252+ SpA Kyogre-Primal Hydro Pump vs. 252 HP / 4 SpD Incineroar in Heavy Rain: 428-506 (211.8 - 250.4%) -- guaranteed OHKO")
  })

  it("should apply Heavy Rain over the Sun of the field", () => {
    const result = damageCalc.calcDamage(kyogrePrimal(), bulkyIncineroar(), new Field({ weather: "Sun" }))

    expect(result.description).toEqual("252+ SpA Kyogre-Primal Hydro Pump vs. 252 HP / 4 SpD Incineroar in Heavy Rain: 428-506 (211.8 - 250.4%) -- guaranteed OHKO")
  })

  it("should not apply Heavy Rain when the field controls it and has it turned off", () => {
    const result = damageCalc.calcDamage(kyogrePrimal(), bulkyIncineroar(), new Field({ strongWeathersInField: ["Heavy Rain"] }))

    expect(result.description).toEqual("252+ SpA Kyogre-Primal Hydro Pump vs. 252 HP / 4 SpD Incineroar: 288-338 (142.5 - 167.3%) -- guaranteed OHKO")
  })

  it("should use the weather chosen in the field when it controls Heavy Rain", () => {
    const result = damageCalc.calcDamage(kyogrePrimal(), bulkyIncineroar(), new Field({ weather: "Sun", strongWeathersInField: ["Heavy Rain"] }))

    expect(result.description).toEqual("252+ SpA Kyogre-Primal Hydro Pump vs. 252 HP / 4 SpD Incineroar in Sun: 140-168 (69.3 - 83.1%) -- guaranteed 2HKO")
  })

  it("should apply no strong weather between two Primals when the field controls both and has none turned on", () => {
    const groudon = pokemon("Groudon-Primal", "Heat Crash", { nature: "Adamant", sps: { atk: 32 } })
    const kyogre = pokemon("Kyogre-Primal", "Hydro Pump", { sps: { hp: 2, def: 1 } })

    const result = damageCalc.calcDamage(groudon, kyogre, new Field({ strongWeathersInField: ["Heavy Rain", "Harsh Sunshine"] }))

    expect(result.description).toEqual("252+ Atk Groudon-Primal Heat Crash (60 BP) vs. 12 HP / 4 Def Kyogre-Primal: 39-46 (22 - 25.9%) -- 4.8% chance to 4HKO")
  })

  it("should make the Fire move fail against a Primordial Sea target", () => {
    const result = damageCalc.calcDamage(incineroar(), pokemon("Kyogre-Primal", "Hydro Pump", { sps: { hp: 32, def: 1 } }), new Field())

    expect(result.damage).toEqual(0)
  })

  it("should not apply the strong weather to a calc without the Primal", () => {
    const result = damageCalc.calcDamage(incineroar(), pokemon("Amoonguss", "Spore", { sps: { hp: 32, def: 1 } }), new Field())

    expect(result.description).toEqual("252+ Atk Incineroar Flare Blitz vs. 252 HP / 4 Def Amoonguss: 272-324 (123 - 146.6%) -- guaranteed OHKO - (42.9 - 42.9% recoil damage)")
  })

  it("should let Air Lock suppress the strong weather", () => {
    const rayquaza = pokemon("Rayquaza", "Flare Blitz", { nature: "Adamant", sps: { atk: 32 } })

    const result = damageCalc.calcDamage(rayquaza, pokemon("Kyogre-Primal", "Hydro Pump", { sps: { hp: 32, def: 1 } }), new Field())

    expect(result.description).toEqual("252+ Atk Rayquaza Flare Blitz vs. 252 HP / 4 Def Kyogre-Primal: 45-53 (21.7 - 25.6%) -- 1% chance to 4HKO - (8.2 - 9.7% recoil damage)")
  })

  it("should keep the Harsh Sunshine chosen in the field between two Primals", () => {
    const result = damageCalc.calcDamage(kyogrePrimal(), pokemon("Groudon-Primal", "Fire Punch", { sps: { hp: 32, spd: 1 } }), new Field({ weather: "Harsh Sunshine" }))

    expect(result.damage).toEqual(0)
  })

  it("should apply Strong Winds when the target has Delta Stream", () => {
    const raichu = pokemon("Raichu", "Thunderbolt", { nature: "Modest", sps: { spa: 32 } })

    const result = damageCalc.calcDamage(raichu, pokemon("Rayquaza-Mega", "Dragon Ascent", { sps: { hp: 32, spd: 1 } }), new Field())

    expect(result.description).toEqual("252+ SpA Raichu Thunderbolt vs. 252 HP / 4 SpD Rayquaza-Mega in Strong Winds: 33-39 (15.5 - 18.3%) -- possible 6HKO")
  })
})
