import { provideZonelessChangeDetection } from "@angular/core"
import { Mock, vi } from "vitest"
import { TestBed } from "@angular/core/testing"
import { CalcStore } from "@store/calc-store"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { MobileBuildEditingService } from "@features/pokemon-build/mobile-build-editing/mobile-build-editing.service"

describe("MobileBuildEditingService", () => {
  let service: MobileBuildEditingService
  let overlay: MobileTableOverlayService
  let store: { updateMove: Mock; ability: Mock; item: Mock }
  let pokemonInput: { setValue: Mock<(value: string) => void>; blur: Mock<() => void> }
  let itemInput: { setValue: Mock<(value: string) => void>; blur: Mock<() => void> }
  let editingId: string | null
  let pokemonSelected: Mock<(name: string) => void>

  function mouseDown() {
    return { preventDefault: vi.fn() } as unknown as MouseEvent
  }

  beforeEach(() => {
    store = { updateMove: vi.fn(), ability: vi.fn(), item: vi.fn() }
    pokemonInput = { setValue: vi.fn<(value: string) => void>(), blur: vi.fn<() => void>() }
    itemInput = { setValue: vi.fn<(value: string) => void>(), blur: vi.fn<() => void>() }
    editingId = "dragonite-id"
    pokemonSelected = vi.fn<(name: string) => void>()

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), MobileBuildEditingService, MobileTableOverlayService, { provide: CalcStore, useValue: store }, { provide: BackNavigationService, useValue: { push: vi.fn(), pop: vi.fn() } }]
    })

    service = TestBed.inject(MobileBuildEditingService)
    overlay = TestBed.inject(MobileTableOverlayService)

    service.track({
      editingId: () => editingId,
      moveIndex: () => 2,
      pokemonInput: () => pokemonInput,
      itemInput: () => itemInput,
      pokemonSelected
    })
  })

  describe("opening a table from a field", () => {
    it("should open the pokemon table when the pokemon field is pressed", () => {
      const event = mouseDown()

      service.onPokemonMouseDown(event)

      expect(overlay.kind()).toEqual("pokemon")
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it("should open the items table when the item field is pressed", () => {
      const event = mouseDown()

      service.onItemMouseDown(event)

      expect(overlay.kind()).toEqual("items")
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it("should not reopen when a table is already open", () => {
      overlay.open("abilities")
      const event = mouseDown()

      service.onItemMouseDown(event)

      expect(overlay.kind()).toEqual("abilities")
      expect(event.preventDefault).not.toHaveBeenCalled()
    })
  })

  describe("clicking a field", () => {
    it("should keep the search of the pokemon field on the click that opened the table", () => {
      service.onPokemonMouseDown(mouseDown())
      service.filter("Drag")

      service.onPokemonClick()

      expect(pokemonInput.setValue).not.toHaveBeenCalled()
      expect(overlay.currentFilter()).toEqual("Drag")
    })

    it("should clear the pokemon search on a later click", () => {
      service.onPokemonMouseDown(mouseDown())
      service.onPokemonClick()
      service.filter("Garch")

      service.onPokemonClick()

      expect(pokemonInput.setValue).toHaveBeenCalledWith("")
      expect(overlay.currentFilter()).toEqual("")
    })

    it("should clear the item search on a later click", () => {
      service.onItemMouseDown(mouseDown())
      service.onItemClick()
      service.filter("Life")

      service.onItemClick()

      expect(itemInput.setValue).toHaveBeenCalledWith("")
      expect(overlay.currentFilter()).toEqual("")
    })

    it("should clear the filter even when the field is not rendered", () => {
      service.track({ editingId: () => editingId, moveIndex: () => 2, pokemonInput: () => undefined, itemInput: () => undefined, pokemonSelected })
      overlay.open("items")
      service.filter("Leftovers")

      service.onItemClick()

      expect(overlay.currentFilter()).toEqual("")
    })
  })

  describe("opening and closing the tables", () => {
    it("should open each table", () => {
      service.openMovesTable()
      const moves = overlay.kind()
      service.openAbilitiesTable()
      const abilities = overlay.kind()
      service.openItemsTable()

      expect(moves).toEqual("moves")
      expect(abilities).toEqual("abilities")
      expect(overlay.kind()).toEqual("items")
    })

    it("should close the moves table", () => {
      service.openMovesTable()

      service.closeMovesTable()

      expect(overlay.isAnyOpen()).toBe(false)
    })

    it("should close the items table and leave the item field", () => {
      service.openItemsTable()

      service.closeItemsTable()

      expect(overlay.isAnyOpen()).toBe(false)
      expect(itemInput.blur).toHaveBeenCalled()
    })

    it("should close the items table when the item field is not rendered", () => {
      service.track({ editingId: () => editingId, moveIndex: () => 2, pokemonInput: () => pokemonInput, itemInput: () => undefined, pokemonSelected })
      service.openItemsTable()

      service.closeItemsTable()

      expect(overlay.isAnyOpen()).toBe(false)
    })
  })

  describe("selecting from a table", () => {
    it("should hand the pokemon selection to the screen", () => {
      service.selectFromTable({ kind: "pokemon", value: "Garchomp" })

      expect(pokemonSelected).toHaveBeenCalledWith("Garchomp")
    })

    it("should replace the move at the edited position and keep the table open", () => {
      service.openMovesTable()

      service.selectFromTable({ kind: "moves", value: "Earthquake" })

      expect(store.updateMove).toHaveBeenCalledWith("dragonite-id", "Earthquake", 2)
      expect(overlay.kind()).toEqual("moves")
    })

    it("should set the ability and close the table", () => {
      service.openAbilitiesTable()

      service.selectFromTable({ kind: "abilities", value: "Multiscale" })

      expect(store.ability).toHaveBeenCalledWith("dragonite-id", "Multiscale")
      expect(overlay.isAnyOpen()).toBe(false)
    })

    it("should set the item, close the table and leave the item field", () => {
      service.openItemsTable()

      service.selectFromTable({ kind: "items", value: "Choice Band" })

      expect(store.item).toHaveBeenCalledWith("dragonite-id", "Choice Band")
      expect(overlay.isAnyOpen()).toBe(false)
      expect(itemInput.blur).toHaveBeenCalled()
    })

    it("should set the item when the item field is not rendered", () => {
      service.track({ editingId: () => editingId, moveIndex: () => 2, pokemonInput: () => pokemonInput, itemInput: () => undefined, pokemonSelected })

      service.selectFromTable({ kind: "items", value: "Leftovers" })

      expect(store.item).toHaveBeenCalledWith("dragonite-id", "Leftovers")
    })

    it("should ignore every selection when no pokemon is being edited", () => {
      editingId = null
      service.openItemsTable()

      service.selectFromTable({ kind: "moves", value: "Earthquake" })
      service.selectFromTable({ kind: "abilities", value: "Multiscale" })
      service.selectFromTable({ kind: "items", value: "Choice Band" })

      expect(store.updateMove).not.toHaveBeenCalled()
      expect(store.ability).not.toHaveBeenCalled()
      expect(store.item).not.toHaveBeenCalled()
      expect(overlay.kind()).toEqual("items")
    })
  })
})
