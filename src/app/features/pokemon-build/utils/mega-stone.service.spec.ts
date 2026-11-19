import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MegaStoneService } from "@app/features/pokemon-build/utils/mega-stone.service"
import { getMoveset } from "@data/moveset-data"
import { CalcStore } from "@store/calc-store"
import { Pokemon } from "@multicalc/model"

describe("MegaStoneService", () => {
  let service: MegaStoneService
  let store: CalcStore

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [MegaStoneService, CalcStore, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(MegaStoneService)
    store = TestBed.inject(CalcStore)
  })

  describe("isMegaStone", () => {
    it("should return true for a mega stone item", () => {
      expect(service.isMegaStone("Kangaskhanite")).toBe(true)
    })

    it("should return false for a regular item", () => {
      expect(service.isMegaStone("Leftovers")).toBe(false)
    })
  })

  describe("isMegaStoneCompatible", () => {
    it("should return true when the mega stone matches the Pokémon", () => {
      expect(service.isMegaStoneCompatible("Kangaskhan", "Kangaskhanite")).toBe(true)
    })

    it("should return false when the mega stone does not match the Pokémon", () => {
      expect(service.isMegaStoneCompatible("Pikachu", "Kangaskhanite")).toBe(false)
    })
  })

  describe("getBaseFormAbility", () => {
    it("should return null when no base ability was stored for the Pokémon id", () => {
      expect(service.getBaseFormAbility("unknown-id")).toBeNull()
    })

    it("should return the base form ability stored in the state", () => {
      const pokemonId = store.addPokemonToTeam("Salamence-Mega")
      store.baseFormAbility(pokemonId, "Moxie")

      expect(service.getBaseFormAbility(pokemonId)).toBe("Moxie")
    })

    it("should return null for a Pokémon without a stored base form ability", () => {
      const pokemonId = store.addPokemonToTeam("Salamence-Mega")

      expect(service.getBaseFormAbility(pokemonId)).toBeNull()
    })
  })

  describe("getBaseName", () => {
    it("should strip the -Mega suffix from a mega form name", () => {
      expect(service.getBaseName("Kangaskhan-Mega")).toBe("Kangaskhan")
    })
  })

  describe("isMega", () => {
    it("should return true for a mega form name", () => {
      expect(service.isMega("Kangaskhan-Mega")).toBe(true)
    })

    it("should return false for a base form name", () => {
      expect(service.isMega("Kangaskhan")).toBe(false)
    })
  })

  describe("hasMegaForm", () => {
    it("should return true when the item is a mega stone", () => {
      expect(service.hasMegaForm("Kangaskhan", "Kangaskhanite")).toBe(true)
    })

    it("should return true when the Pokémon name already includes -Mega", () => {
      expect(service.hasMegaForm("Kangaskhan-Mega", "Leftovers")).toBe(true)
    })

    it("should return false when the item is not a mega stone and the name is not a mega form", () => {
      expect(service.hasMegaForm("Kangaskhan", "Leftovers")).toBe(false)
    })
  })

  describe("toggleMega", () => {
    it("should do nothing when the Pokémon id is not found", () => {
      expect(() => service.toggleMega("unknown-id", "Kangaskhan", "Kangaskhanite")).not.toThrow()
    })

    it("should mega evolve using the ability found in the moveset data", () => {
      const pokemonId = store.addPokemonToTeam("Kangaskhan")
      store.item(pokemonId, "Kangaskhanite")
      store.ability(pokemonId, "Scrappy")

      service.toggleMega(pokemonId, "Kangaskhan", "Kangaskhanite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Kangaskhan-Mega")
      expect(result.ability.name).toBe("Parental Bond")
      expect(service.getBaseFormAbility(pokemonId)).toBe("Scrappy")
    })

    it("should revert from mega using the previously stored base ability", () => {
      const pokemonId = store.addPokemonToTeam("Kangaskhan")
      store.item(pokemonId, "Kangaskhanite")
      store.ability(pokemonId, "Scrappy")
      service.toggleMega(pokemonId, "Kangaskhan", "Kangaskhanite")

      service.toggleMega(pokemonId, "Kangaskhan-Mega", "Kangaskhanite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Kangaskhan")
      expect(result.ability.name).toBe("Scrappy")
      expect(service.getBaseFormAbility(pokemonId)).toBeNull()
    })

    it("should restore the base form ability when reverting without a stored base ability", () => {
      const pokemonId = store.addPokemonToTeam("Kangaskhan-Mega")

      service.toggleMega(pokemonId, "Kangaskhan-Mega", "Kangaskhanite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Kangaskhan")
      expect(result.ability.name).toBe(getMoveset("Kangaskhan")!.ability)
    })

    it("should restore the base form ability when reverting a mega whose base name is remapped", () => {
      const pokemonId = store.addPokemonToTeam("Meowstic-M-Mega")

      service.toggleMega(pokemonId, "Meowstic-M-Mega", "Meowsticite M")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Meowstic")
      expect(result.ability.name).toBe(getMoveset("Meowstic")!.ability)
    })

    it("should revert from an imported mega using the base form ability stored in the state", () => {
      const pokemonId = store.addPokemonToTeam("Salamence-Mega")
      store.item(pokemonId, "Salamencite")
      store.baseFormAbility(pokemonId, "Moxie")

      service.toggleMega(pokemonId, "Salamence-Mega", "Salamencite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Salamence")
      expect(result.ability.name).toBe("Moxie")
      expect(result.baseFormAbility).toBeUndefined()
      expect(service.getBaseFormAbility(pokemonId)).toBeNull()
    })

    it("should mega evolve without a mega stone item using the ability found in the moveset data", () => {
      const pokemonId = store.addPokemonToTeam("Absol")
      store.ability(pokemonId, "Justified")

      service.toggleMega(pokemonId, "Absol", "Absolite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Absol-Mega")
      expect(result.ability.name).toBe(new Pokemon("Absol-Mega").ability.name)
    })

    it("should carry an active Flash Fire into the Fire Boost when mega evolving", () => {
      const pokemonId = store.addPokemonToTeam("Houndoom")
      store.item(pokemonId, "Houndoominite")
      store.ability(pokemonId, "Flash Fire")
      store.abilityOn(pokemonId, true)

      service.toggleMega(pokemonId, "Houndoom", "Houndoominite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Houndoom-Mega")
      expect(result.fireBoost).toBe(true)
      expect(result.canHaveFireBoost).toBe(true)
    })

    it("should mega evolve without the Fire Boost when Flash Fire was not active", () => {
      const pokemonId = store.addPokemonToTeam("Houndoom")
      store.item(pokemonId, "Houndoominite")
      store.ability(pokemonId, "Flash Fire")
      store.abilityOn(pokemonId, false)

      service.toggleMega(pokemonId, "Houndoom", "Houndoominite")

      expect(store.findPokemonById(pokemonId).fireBoost).toBe(false)
    })

    it("should not set the Fire Boost when the base form ability is not Flash Fire", () => {
      const pokemonId = store.addPokemonToTeam("Houndoom")
      store.item(pokemonId, "Houndoominite")
      store.ability(pokemonId, "Unnerve")
      store.abilityOn(pokemonId, true)

      service.toggleMega(pokemonId, "Houndoom", "Houndoominite")

      expect(store.findPokemonById(pokemonId).fireBoost).toBe(false)
    })

    it("should carry the Fire Boost back into Flash Fire when reverting from mega", () => {
      const pokemonId = store.addPokemonToTeam("Chandelure")
      store.item(pokemonId, "Chandelurite")
      store.ability(pokemonId, "Flash Fire")
      service.toggleMega(pokemonId, "Chandelure", "Chandelurite")
      store.fireBoost(pokemonId, true)

      service.toggleMega(pokemonId, "Chandelure-Mega", "Chandelurite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Chandelure")
      expect(result.ability.name).toBe("Flash Fire")
      expect(result.ability.on).toBe(true)
      expect(result.fireBoost).toBe(false)
    })

    it("should not reuse the base form ability of a previous Pokémon after choosing another mega", () => {
      const pokemonId = store.addPokemonToTeam("Houndoom")
      store.item(pokemonId, "Houndoominite")
      store.ability(pokemonId, "Flash Fire")
      service.toggleMega(pokemonId, "Houndoom", "Houndoominite")
      store.loadPokemonInfo(pokemonId, "Heracross-Mega")

      service.toggleMega(pokemonId, "Heracross-Mega", "Heracronite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Heracross")
      expect(result.ability.name).toBe(getMoveset("Heracross")!.ability)
    })

    it("should turn Flash Fire off when reverting from mega without the Fire Boost", () => {
      const pokemonId = store.addPokemonToTeam("Chandelure")
      store.item(pokemonId, "Chandelurite")
      store.ability(pokemonId, "Flash Fire")
      store.abilityOn(pokemonId, true)
      service.toggleMega(pokemonId, "Chandelure", "Chandelurite")
      store.fireBoost(pokemonId, false)

      service.toggleMega(pokemonId, "Chandelure-Mega", "Chandelurite")

      expect(store.findPokemonById(pokemonId).ability.on).toBe(false)
    })
  })

  describe("getMegaStoneSprite", () => {
    it("should convert the item name to a kebab-case sprite name", () => {
      expect(service.getMegaStoneSprite("Kangaskhanite")).toBe("kangaskhanite")
    })

    it("should replace spaces with dashes for multi-word items", () => {
      expect(service.getMegaStoneSprite("Charizardite X")).toBe("charizardite-x")
    })
  })
})
