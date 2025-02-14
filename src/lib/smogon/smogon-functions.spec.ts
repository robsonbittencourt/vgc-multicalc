import { Ability } from "@lib/model/ability"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { Field, Generations, Side, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

describe("SmogonFunctions", () => {
  let service: SmogonFunctions

  beforeEach(() => {
    service = new SmogonFunctions()
  })

  describe("getFinalSpeed", () => {
    it("should return the Pokémon speed", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(108)
    })

    it("should return the Pokémon speed when +1", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 }, boosts: { spe: 1 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(162)
    })

    it("should return the Pokémon speed when +2", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 }, boosts: { spe: 2 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(216)
    })

    it("should return the Pokémon speed when -1", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 }, boosts: { spe: -1 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(72)
    })

    it("should return the Pokémon speed when -2", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 }, boosts: { spe: -2 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed in Tailwind", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const side = new Side()
      side.isTailwind = true

      const finalSpeed = service.getFinalSpeed(pokemon, new Field(), side)

      expect(finalSpeed).toEqual(216)
    })

    it("should return the Pokémon speed when paralyzed", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 }, status: Status.PARALYSIS })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the speed of Iron Bundle with Quark Drive activated", () => {
      const pokemon = new Pokemon("Iron Bundle", { ability: new Ability("Quark Drive", true), nature: "Timid", evs: { spe: 252 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(309)
    })

    it("should return the speed of Iron Bundle with Quark Drive activated by the Electric terrain", () => {
      const pokemon = new Pokemon("Iron Bundle", { nature: "Timid", evs: { spe: 252 } })
      const field = new Field()
      field.terrain = "Electric"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(309)
    })

    it("should return the speed of Iron Bundle with Quark Drive activated in spa because a boost", () => {
      const pokemon = new Pokemon("Iron Bundle", { ability: new Ability("Quark Drive", true), nature: "Timid", evs: { spe: 252 }, boosts: { spa: +2 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(206)
    })

    it("should return the speed of Flutter Mane with Protosynthesis activated", () => {
      const pokemon = new Pokemon("Flutter Mane", { ability: new Ability("Protosynthesis", true), item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(423)
    })

    it("should return the speed of Flutter Mane with Protosynthesis activated by the Sun", () => {
      const pokemon = new Pokemon("Flutter Mane", { item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })
      const field = new Field()
      field.weather = "Sun"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(423)
    })

    it("should return the speed of Flutter Mane with Protosynthesis activated in spa because a boost", () => {
      const pokemon = new Pokemon("Flutter Mane", { ability: new Ability("Protosynthesis", true), nature: "Timid", evs: { spe: 252 }, boosts: { spa: +2 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(205)
    })

    it("should return the speed of Flutter Mane with Protosynthesis activated in Tailwind", () => {
      const pokemon = new Pokemon("Flutter Mane", { item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })
      const field = new Field()
      field.weather = "Sun"

      const side = new Side()
      side.isTailwind = true

      const finalSpeed = service.getFinalSpeed(pokemon, field, side)

      expect(finalSpeed).toEqual(846)
    })

    it("should return the speed of Sneasler with Unburden activated", () => {
      const pokemon = new Pokemon("Sneasler", { ability: new Ability("Unburden", true), nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(378)
    })

    it("should return the speed of Jumpluff with Chlorophyll in the Sun", () => {
      const pokemon = new Pokemon("Jumpluff", { ability: new Ability("Chlorophyll"), nature: "Timid", evs: { spe: 252 } })
      const field = new Field()
      field.weather = "Sun"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(356)
    })

    it("should return the speed of Excadrill with Sand Rush in the Sandstorm", () => {
      const pokemon = new Pokemon("Excadrill", { ability: new Ability("Sand Rush"), nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()
      field.weather = "Sand"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(308)
    })

    it("should return the speed of Basculegion with Swift Swim in the Rain", () => {
      const pokemon = new Pokemon("Basculegion", { ability: new Ability("Swift Swim"), nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()
      field.weather = "Rain"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(286)
    })

    it("should return the speed of Beartic with Slush Rush in the Snow", () => {
      const pokemon = new Pokemon("Beartic", { ability: new Ability("Slush Rush"), nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()
      field.weather = "Snow"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(224)
    })

    it("should return the speed of Raichu-Alola with Surge Surfer in the Eletric Terrain", () => {
      const pokemon = new Pokemon("Raichu-Alola", { ability: new Ability("Surge Surfer"), nature: "Timid", evs: { spe: 252 } })
      const field = new Field()
      field.terrain = "Electric"

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(356)
    })

    it("should return the speed of Jolteon with Quick Feet when it has status condition", () => {
      const pokemon = new Pokemon("Jolteon", { ability: new Ability("Quick Feet"), status: Status.BURN, nature: "Timid", evs: { spe: 252 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(300)
    })

    it("should return the speed of Regigigas with Slow Start when tha ability is on", () => {
      const pokemon = new Pokemon("Regigigas", { ability: new Ability("Slow Start", true), nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(83)
    })

    it("should return the speed of Regigigas with Slow Start when tha ability is off", () => {
      const pokemon = new Pokemon("Regigigas", { ability: new Ability("Slow Start", false), nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()

      const finalSpeed = service.getFinalSpeed(pokemon, field)

      expect(finalSpeed).toEqual(167)
    })

    it("should return the Pokémon speed when hold Iron Ball", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Iron Ball", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Macho Brace", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Macho Brace", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Power Anklet", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Power Anklet", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Power Band", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Power Band", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Power Belt", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Power Belt", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Power Bracer", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Power Bracer", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Power Lens", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Power Lens", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Pokémon speed when hold Power Weight", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Power Weight", evs: { spe: 100 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(54)
    })

    it("should return the Ditto speed when hold Quick Powder", () => {
      const pokemon = new Pokemon("Ditto", { item: "Quick Powder", nature: "Jolly", evs: { spe: 252 } })

      const finalSpeed = service.getFinalSpeed(pokemon)

      expect(finalSpeed).toEqual(220)
    })
  })

  describe("higherStat", () => {
    describe("specific modifications", () => {
      it("should return the atk stat when this is the highest stat considering nature", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { nature: "Adamant" })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("atk")
      })

      it("should return the atk stat when this is the highest stat considering evs", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { evs: { atk: 100 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("atk")
      })

      it("should return the atk stat when this is the highest stat considering boosts", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { boosts: { atk: 1 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("atk")
      })
    })

    describe("another stats", () => {
      it("should return the def stat when this is the highest stat", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { evs: { def: 100 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("def")
      })

      it("should return the spa stat when this is the highest stat", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { evs: { spa: 100 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("spa")
      })

      it("should return the spd stat when this is the highest stat", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { evs: { spd: 100 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("spd")
      })

      it("should return the spe stat when this is the highest stat", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { evs: { spe: 100 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("spe")
      })
    })

    describe("itens", () => {
      it("should not considering item effect and return the spe as the highest stat", () => {
        const pokemon = new SmogonPokemon(Generations.get(9), "Mew", { item: "Iron Ball", evs: { spe: 4 } })

        const higherStat = service.higherStat(pokemon)

        expect(higherStat).toEqual("spe")
      })
    })
  })
})
