import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MegaStoneService } from "@app/features/pokemon-build/utils/mega-stone.service"
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

    it("should keep the mega form's current ability when reverting and the base form has no moveset entry", () => {
      const pokemonId = store.addPokemonToTeam("Kangaskhan-Mega")

      service.toggleMega(pokemonId, "Kangaskhan-Mega", "Kangaskhanite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Kangaskhan")
      expect(result.ability.name).toBe("Scrappy")
    })

    it("should mega evolve without a mega stone item using the ability found in the moveset data", () => {
      const pokemonId = store.addPokemonToTeam("Absol")
      store.ability(pokemonId, "Justified")

      service.toggleMega(pokemonId, "Absol", "Absolite")

      const result = store.findPokemonById(pokemonId)
      expect(result.name).toBe("Absol-Mega")
      expect(result.ability.name).toBe(new Pokemon("Absol-Mega").ability.name)
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
