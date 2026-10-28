import { StrongWeatherAdjuster } from "./strong-weather-adjuster"
import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

describe("Strong Weather Adjuster", () => {
  const move = new Move("Protect")
  const moveCalc = new MoveCalc(move.name)

  it("should keep the field weather when no Pokemon has a strong weather ability", () => {
    const fieldCalc = new FieldCalc({ weather: "Rain" })

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Pelipper", { ability: "Drizzle" }), new CalcPokemon("Incineroar"), move, moveCalc, fieldCalc)

    expect(fieldCalc.weather).toEqual("Rain")
  })

  it("should set Heavy Rain when the attacker has Primordial Sea", () => {
    const fieldCalc = new FieldCalc()

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Kyogre-Primal"), new CalcPokemon("Incineroar"), move, moveCalc, fieldCalc)

    expect(fieldCalc.weather).toEqual("Heavy Rain")
  })

  it("should set Harsh Sunshine over the field weather when the target has Desolate Land", () => {
    const fieldCalc = new FieldCalc({ weather: "Rain" })

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Pelipper", { ability: "Drizzle" }), new CalcPokemon("Groudon-Primal"), move, moveCalc, fieldCalc)

    expect(fieldCalc.weather).toEqual("Harsh Sunshine")
  })

  it("should set Strong Winds when the second attacker has Delta Stream", () => {
    const fieldCalc = new FieldCalc()
    const secondAttacker = new Pokemon("Rayquaza-Mega", { ability: new Ability("Delta Stream") })

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Incineroar"), new CalcPokemon("Amoonguss"), move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.weather).toEqual("Strong Winds")
  })

  it("should leave a strong weather controlled by the field to the field", () => {
    const fieldCalc = new FieldCalc({ weather: "Sun" })
    const field = new Field({ weather: "Sun", strongWeathersInField: ["Heavy Rain"] })

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Kyogre-Primal"), new CalcPokemon("Groudon-Primal"), move, moveCalc, fieldCalc, undefined, field)

    expect(fieldCalc.weather).toEqual("Harsh Sunshine")
  })

  it("should keep the field weather when it is the strong weather of one of the Pokemon", () => {
    const fieldCalc = new FieldCalc({ weather: "Harsh Sunshine" })

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Kyogre-Primal"), new CalcPokemon("Groudon-Primal"), move, moveCalc, fieldCalc)

    expect(fieldCalc.weather).toEqual("Harsh Sunshine")
  })

  it("should prefer the strong weather of the attacker when the field has none of them", () => {
    const fieldCalc = new FieldCalc()

    new StrongWeatherAdjuster().adjust(new CalcPokemon("Kyogre-Primal"), new CalcPokemon("Groudon-Primal"), move, moveCalc, fieldCalc)

    expect(fieldCalc.weather).toEqual("Heavy Rain")
  })
})
