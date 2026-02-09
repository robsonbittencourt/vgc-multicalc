import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL } from "@lib/constants"
import { Status } from "@lib/model/status"
import { Ability } from "./ability"
import { Move } from "./move"
import { MoveSet } from "./moveset"
import { Pokemon } from "./pokemon"

describe("Pokemon", () => {
  describe("Creation", () => {
    it("should initialize with default values when no options are provided", () => {
      const pokemon = new Pokemon(SELECT_POKEMON_LABEL)

      expect(pokemon.id.length > 0).toBeTrue()
      expect(pokemon.moveSet.moves.length).toBe(4)
      expect(pokemon.moveSet.moves[0].name).toBe("Struggle")
      expect(pokemon.nature).toBe("Hardy")
      expect(pokemon.item).toBe("(none)")
      expect(pokemon.ability.name).toBe("Hustle")
      expect(pokemon.ability.on).toBeFalse()
      expect(pokemon.teraType).toBe(DEFAULT_TERA_TYPE)
      expect(pokemon.hpPercentage).toBe(100)
      expect(pokemon.commanderActive).toBeFalse()
    })

    it("should initialize with provided options", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
      const ability = new Ability("Levitate", true)
      const options = {
        id: "test-id",
        moveSet: moveSet,
        ability: ability,
        teraType: "Electric",
        hpPercentage: 50,
        commanderActive: true
      }
      const pokemon = new Pokemon("Pikachu", options)

      expect(pokemon.id).toBe("test-id")
      expect(pokemon.moveSet).toBe(moveSet)
      expect(pokemon.ability.name).toBe("Levitate")
      expect(pokemon.teraType).toBe("Electric")
      expect(pokemon.hpPercentage).toBe(50)
      expect(pokemon.commanderActive).toBeTrue()
    })
  })

  describe("Name", () => {
    it("should initialize with higher stat configured as atk", () => {
      const pokemon = new Pokemon("Tyranitar")

      expect(pokemon.higherStat).toBe("atk")
    })

    it("should initialize with higher stat configured as def", () => {
      const pokemon = new Pokemon("Regirock")

      expect(pokemon.higherStat).toBe("def")
    })

    it("should initialize with higher stat configured as spa", () => {
      const pokemon = new Pokemon("Mewtwo")

      expect(pokemon.higherStat).toBe("spa")
    })

    it("should initialize with higher stat configured as spd", () => {
      const pokemon = new Pokemon("Blissey")

      expect(pokemon.higherStat).toBe("spd")
    })

    it("should initialize with higher stat configured as spe", () => {
      const pokemon = new Pokemon("Pikachu")

      expect(pokemon.higherStat).toBe("spe")
    })

    it("should return the correct name when Pokémon is default", () => {
      const pokemon = new Pokemon("Togepi")

      expect(pokemon.name).toBe(SELECT_POKEMON_LABEL)
    })

    it("should return the correct name when Pokémon is not default", () => {
      const pokemon = new Pokemon("Pikachu")

      expect(pokemon.name).toBe("Pikachu")
    })

    it("should return the correct displayName when Pokémon is default", () => {
      const pokemon = new Pokemon("Togepi")

      expect(pokemon.displayName).toBe(SELECT_POKEMON_LABEL)
    })

    it("should return the correct displayName when Pokémon is not default", () => {
      const pokemon = new Pokemon("Pikachu")

      expect(pokemon.displayName).toBe("Pikachu")
    })

    it("should return the correct displayName when Pokémon name have hiphen", () => {
      const pokemon = new Pokemon("Porygon-Z")

      expect(pokemon.displayName).toBe("Porygon-Z")
    })

    it("should return the correct displayName when Pokémon name have hiphen in Smogon lib", () => {
      const pokemon = new Pokemon("Ogerpon-Cornerstone")

      expect(pokemon.displayName).toBe("Ogerpon Cornerstone")
    })

    it("should return the correct displayNameWithoutSuffix when Pokémon is default", () => {
      const pokemon = new Pokemon("Togepi")

      expect(pokemon.displayNameWithoutSuffix).toBe(SELECT_POKEMON_LABEL)
    })

    it("should return the correct displayNameWithoutSuffix when Pokémon is not default", () => {
      const pokemon = new Pokemon("Pikachu")

      expect(pokemon.displayNameWithoutSuffix).toBe("Pikachu")
    })

    it("should return the correct displayName when Pokémon name have hiphen", () => {
      const pokemon = new Pokemon("Porygon-Z")

      expect(pokemon.displayNameWithoutSuffix).toBe("Porygon-Z")
    })

    it("should return the correct displayNameWithoutSuffix when Pokémon name have hiphen in Smogon lib", () => {
      const pokemon = new Pokemon("Ogerpon-Cornerstone")

      expect(pokemon.displayNameWithoutSuffix).toBe("Ogerpon")
    })
  })

  describe("Attributes", () => {
    it("should return the first type of a dual-type Pokemon", () => {
      const pokemon = new Pokemon("Charizard")

      expect(pokemon.type1).toBe("Fire")
      expect(pokemon.type2).toBe("Flying")
    })

    it("should return the correct type for a single-type Pokemon", () => {
      const pokemon = new Pokemon("Pikachu")

      expect(pokemon.type1).toBe("Electric")
    })

    it("should return the level of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard")

      expect(pokemon.level).toBe(50)
    })

    it("should return the nature of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard", { nature: "Modest" })

      expect(pokemon.nature).toBe("Modest")
    })

    it("should return the held item of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard", { item: "Leftovers" })

      expect(pokemon.item).toBe("Leftovers")
    })

    it("should return the EVs of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard", { evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 0, spe: 4 } })

      expect(pokemon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 0, spe: 4 })
    })

    it("should return the sum of all EVs", () => {
      const pokemon = new Pokemon("Charizard", { evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 6 } })

      expect(pokemon.totalEvs).toBe(510)
    })

    it("should return the three ev jumps of Pokémon when nature is beneficial in atk", () => {
      const pokemon = new Pokemon("Chien-Pao", { nature: "Adamant" })

      expect(pokemon.jumps).toEqual([76, 156, 236])
    })

    it("should return the three ev jumps of Pokémon when nature is beneficial in def", () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Bold" })

      expect(pokemon.jumps).toEqual([36, 116, 196])
    })

    it("should return the three ev jumps of Pokémon when nature is beneficial in spa", () => {
      const pokemon = new Pokemon("Charizard", { nature: "Modest" })

      expect(pokemon.jumps).toEqual([4, 84, 164, 244])
    })

    it("should return the three ev jumps of Pokémon when nature is beneficial in spd", () => {
      const pokemon = new Pokemon("Goodra-Hisui", { nature: "Calm" })

      expect(pokemon.jumps).toEqual([76, 156, 236])
    })

    it("should return the three ev jumps of Pokémon when nature is beneficial in spe", () => {
      const pokemon = new Pokemon("Sneasler", { nature: "Jolly" })

      expect(pokemon.jumps).toEqual([76, 156, 236])
    })

    it("should return the three ev jumps of Pokémon when nature is beneficial in atk and atk has IV zero", () => {
      const pokemon = new Pokemon("Chien-Pao", { nature: "Adamant", ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31 } })

      expect(pokemon.jumps).toEqual([40, 120, 200])
    })

    it("should return the three ev jumps as zero when nature is neutral", () => {
      const pokemon = new Pokemon("Charizard", { nature: "Docile" })

      expect(pokemon.jumps).toEqual([0, 0, 0, 0])
    })

    it("should return the IVs of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard", { ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 } })

      expect(pokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    })

    it("should return the stat boosts of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard", { boosts: { atk: 1, def: -1, spa: 0, spd: 0, spe: 2 } })

      expect(pokemon.boosts).toEqual({ atk: 1, def: -1, spa: 0, spd: 0, spe: 2 })
    })

    it("should return the correct status of the Pokemon", () => {
      const pokemon = new Pokemon("Charizard", { status: Status.PARALYSIS })

      expect(pokemon.status).toEqual(Status.PARALYSIS)
    })

    it("should return Tera Type Active as true if Tera Type is active", () => {
      const pokemon = new Pokemon("Charizard", { teraType: "Fire", teraTypeActive: true })

      expect(pokemon.teraTypeActive).toBeTrue()
    })

    it("should return Tera Type Active as true if Pokémon is Terapagados Stellar", () => {
      const pokemon = new Pokemon("Terapagos-Stellar")

      expect(pokemon.teraTypeActive).toBeTrue()
    })

    describe("Move", () => {
      it("should return the active move", () => {
        const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
        const pokemon = new Pokemon("Pikachu", { moveSet: moveSet })

        expect(pokemon.move).toEqual(moveSet.activeMove)
      })

      it("should return the name of the active move", () => {
        const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
        const pokemon = new Pokemon("Pikachu", { moveSet: moveSet })

        expect(pokemon.activeMoveName).toBe("Thunderbolt")
      })

      it("should return the name of move1", () => {
        const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
        const pokemon = new Pokemon("Pikachu", { moveSet: moveSet })

        expect(pokemon.move1Name).toBe("Thunderbolt")
      })

      it("should return the name of move2", () => {
        const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
        const pokemon = new Pokemon("Pikachu", { moveSet: moveSet })

        expect(pokemon.move2Name).toBe("Quick Attack")
      })

      it("should return the name of move3", () => {
        const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
        const pokemon = new Pokemon("Pikachu", { moveSet: moveSet })

        expect(pokemon.move3Name).toBe("Iron Tail")
      })

      it("should return the name of move4", () => {
        const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
        const pokemon = new Pokemon("Pikachu", { moveSet: moveSet })

        expect(pokemon.move4Name).toBe("Electro Ball")
      })
    })

    describe("Abilities", () => {
      it("should return available abilities", () => {
        const pokemon = new Pokemon("Dondozo")

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(3)
        expect(abilities[0].name).toEqual("Unaware")
        expect(abilities[1].name).toEqual("Oblivious")
        expect(abilities[2].name).toEqual("Water Veil")
      })

      it("should return Ogerpon Teal ability", () => {
        const pokemon = new Pokemon("Ogerpon")

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Defiant")
      })

      it("should return Ogerpon Teal ability when use Tera", () => {
        const pokemon = new Pokemon("Ogerpon", { teraTypeActive: true })

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Embody Aspect (Teal)")
      })

      it("should return Ogerpon Cornerstone ability", () => {
        const pokemon = new Pokemon("Ogerpon-Cornerstone")

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Sturdy")
      })

      it("should return Ogerpon Cornerstone Teal ability when use Tera", () => {
        const pokemon = new Pokemon("Ogerpon-Cornerstone", { teraTypeActive: true })

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Embody Aspect (Cornerstone)")
      })

      it("should return Ogerpon Hearthflame ability", () => {
        const pokemon = new Pokemon("Ogerpon-Hearthflame")

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Mold Breaker")
      })

      it("should return Ogerpon Hearthflame Teal ability when use Tera", () => {
        const pokemon = new Pokemon("Ogerpon-Hearthflame", { teraTypeActive: true })

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Embody Aspect (Hearthflame)")
      })

      it("should return Ogerpon Wellspring ability", () => {
        const pokemon = new Pokemon("Ogerpon-Wellspring")

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Water Absorb")
      })

      it("should return Ogerpon Wellspring Teal ability when use Tera", () => {
        const pokemon = new Pokemon("Ogerpon-Wellspring", { teraTypeActive: true })

        const abilities = pokemon.availableAbilities

        expect(abilities.length).toEqual(1)
        expect(abilities[0].name).toEqual("Embody Aspect (Wellspring)")
      })

      it("should return true when do not have Ability Shield and is a Ability affected by Neutralizing Gas", () => {
        const pokemon = new Pokemon("Chien-Pao")

        expect(pokemon.isAffectedByNeutralizingGas).toBeTrue()
      })

      it("should return false when have Ability Shield", () => {
        const pokemon = new Pokemon("Chien-Pao", { item: "Ability Shield" })

        expect(pokemon.isAffectedByNeutralizingGas).toBeFalse()
      })

      it("should return false when do not have Ability Shield and is a Ability not affected by Neutralizing Gas", () => {
        const pokemon = new Pokemon("Terapagos")

        expect(pokemon.isAffectedByNeutralizingGas).toBeFalse()
      })
    })

    describe("Stats", () => {
      it("should return the hp", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.hp).toEqual(110)
      })

      it("should return the actualHp", () => {
        const pokemon = new Pokemon("Pikachu", { hpPercentage: 50 })

        expect(pokemon.actualHp).toEqual(55)
      })

      it("should return the baseHp", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.baseHp).toEqual(35)
      })

      it("should return the baseAtk", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.baseAtk).toEqual(55)
      })

      it("should return the atk", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.atk).toEqual(75)
      })

      it("should return the baseDef", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.baseDef).toEqual(40)
      })

      it("should return the def", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.def).toEqual(60)
      })

      it("should return the baseSpa", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.baseSpa).toEqual(50)
      })

      it("should return the spa", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.spa).toEqual(70)
      })

      it("should return the baseSpd", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.baseSpd).toEqual(50)
      })

      it("should return the spd", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.spd).toEqual(70)
      })

      it("should return the baseSpe", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.baseSpe).toEqual(90)
      })

      it("should return the spe", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.spe).toEqual(110)
      })

      it("should return the BST", () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.bst).toEqual(320)
      })
    })

    describe("Another methods", () => {
      it("should return true when Pokémon has Protosynthesis ability", () => {
        const pokemon = new Pokemon("Flutter Mane")

        expect(pokemon.isParadoxAbility).toBeTrue()
      })

      it("should return true when Pokémon has Quark Drive ability", () => {
        const pokemon = new Pokemon("Iron Hands")

        expect(pokemon.isParadoxAbility).toBeTrue()
      })

      it("should return false when Pokémon does not have Paradox ability", () => {
        const pokemon = new Pokemon("Tyranitar")

        expect(pokemon.isParadoxAbility).toBeFalse()
      })

      it('should return true for isDefault when name is "Togepi"', () => {
        const pokemon = new Pokemon("Togepi")

        expect(pokemon.isDefault).toBeTrue()
      })

      it('should return false for isDefault when name is not "Togepi"', () => {
        const pokemon = new Pokemon("Charizard")

        expect(pokemon.isDefault).toBeFalse()
      })

      it('should return true for isOgerpon when name starts with "Ogerpon"', () => {
        const pokemon = new Pokemon("Ogerpon-Wellspring")

        expect(pokemon.isOgerpon).toBeTrue()
      })

      it('should return false for isOgerpon when name does not start with "Ogerpon"', () => {
        const pokemon = new Pokemon("Pikachu")

        expect(pokemon.isOgerpon).toBeFalse()
      })

      it('should return true for isTerapagosForm when name starts with "Terapagos"', () => {
        const pokemon = new Pokemon("Terapagos-Terastal")

        expect(pokemon.isTerapagosForm).toBeTrue()
      })

      it('should return false for isTerapagosForm when name does not start with "Terapagos"', () => {
        const pokemon = new Pokemon("Snorlax")

        expect(pokemon.isTerapagosForm).toBeFalse()
      })
    })
  })

  describe("Clone", () => {
    it("should clone the Pokemon object with default values", () => {
      const pokemon = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", hpPercentage: 100 })

      const clonedPokemon = pokemon.clone()

      expect(clonedPokemon.name).toBe(pokemon.name)
      expect(clonedPokemon.ability.name).toBe(pokemon.ability.name)
      expect(clonedPokemon.nature).toBe(pokemon.nature)
      expect(clonedPokemon.item).toBe(pokemon.item)
      expect(clonedPokemon.teraType).toBe(pokemon.teraType)
      expect(clonedPokemon.hpPercentage).toBe(pokemon.hpPercentage)
    })

    it("should clone the Pokemon object with overridden values", () => {
      const pokemon = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", hpPercentage: 100 })

      const clonedPokemon = pokemon.clone({ ability: new Ability("Volt Absorb"), teraType: "Fairy", hpPercentage: 80 })

      expect(clonedPokemon.ability.name).toBe("Volt Absorb")
      expect(clonedPokemon.teraType).toBe("Fairy")
      expect(clonedPokemon.hpPercentage).toBe(80)
      expect(clonedPokemon.name).toBe(pokemon.name)
      expect(clonedPokemon.nature).toBe(pokemon.nature)
      expect(clonedPokemon.item).toBe(pokemon.item)
    })

    it("should clone the Pokemon object with empty options and retain the original values", () => {
      const pokemon = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", hpPercentage: 100 })

      const clonedPokemon = pokemon.clone({})

      expect(clonedPokemon.name).toBe(pokemon.name)
      expect(clonedPokemon.ability.name).toBe(pokemon.ability.name)
      expect(clonedPokemon.nature).toBe(pokemon.nature)
      expect(clonedPokemon.item).toBe(pokemon.item)
      expect(clonedPokemon.teraType).toBe(pokemon.teraType)
      expect(clonedPokemon.hpPercentage).toBe(pokemon.hpPercentage)
    })

    describe("Equals", () => {
      it("should return true if two Pokemon objects are identical", () => {
        const pokemon1 = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
        const pokemon2 = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

        const result = pokemon1.equals(pokemon2)

        expect(result).toBeTrue()
      })

      it("should return false if two Pokemon objects have different names", () => {
        const pokemon1 = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
        const pokemon2 = new Pokemon("Charmander", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

        const result = pokemon1.equals(pokemon2)

        expect(result).toBeFalse()
      })

      it("should return false if two Pokemon objects have different abilities", () => {
        const pokemon1 = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
        const pokemon2 = new Pokemon("Pikachu", { ability: new Ability("Lightning Rod"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

        const result = pokemon1.equals(pokemon2)

        expect(result).toBeFalse()
      })

      it("should return false if two Pokemon objects have different EVs", () => {
        const pokemon1 = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
        const pokemon2 = new Pokemon("Pikachu", { ability: new Ability("Static"), nature: "Timid", item: "Light Ball", teraType: "Electric", evs: { hp: 1, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

        const result = pokemon1.equals(pokemon2)

        expect(result).toBeFalse()
      })
    })
  })

  describe("Setters", () => {
    it("should update EVs and recalculate stats correctly", () => {
      // Garchomp lvl 50, Neutral Nature, 31 IVs
      // Base Speed: 102
      // EV 0 -> 122
      // EV 252 -> 154
      const pokemon = new Pokemon("Garchomp", { nature: "Hardy", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

      expect(pokemon.stats.spe).toBe(122)

      pokemon.setEvs({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 })

      expect(pokemon.evs.spe).toBe(252)
      expect(pokemon.stats.spe).toBe(154)
    })

    it("should update Nature and recalculate stats correctly", () => {
      // Garchomp lvl 50, 31 IVs, 0 EVs
      // Base Attack: 130
      // Neutral (Hardy) -> 150
      // Beneficial (Adamant) -> 165
      // Hindering (Modest) -> 135
      const pokemon = new Pokemon("Garchomp", { nature: "Hardy", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

      expect(pokemon.stats.atk).toBe(150)

      pokemon.setNature("Adamant")

      expect(pokemon.nature).toBe("Adamant")
      expect(pokemon.stats.atk).toBe(165)

      pokemon.setNature("Modest")

      expect(pokemon.nature).toBe("Modest")
      expect(pokemon.stats.atk).toBe(135)
    })

    it("should update EVs and recalculate HP correctly (Shedinja case)", () => {
      const pokemon = new Pokemon("Shedinja")

      expect(pokemon.stats.hp).toBe(1)

      pokemon.setEvs({ hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })

      expect(pokemon.stats.hp).toBe(1)
    })

    it("should update EVs and recalculate HP correctly (General case)", () => {
      // Garchomp lvl 50, 31 IVs
      // Base HP: 108
      // EV 0 -> 183
      // EV 252 -> 215
      const pokemon = new Pokemon("Garchomp", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

      expect(pokemon.stats.hp).toBe(183)

      pokemon.setEvs({ hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })

      expect(pokemon.stats.hp).toBe(215)
    })
  })
})
