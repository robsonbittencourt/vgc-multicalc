import { inject, Injectable } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { MobileTableOverlayService, TableKind, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"

export interface SearchInput {
  setValue(value: string): void
  blur(): void
}

export interface BuildEditingTarget {
  editingId: () => string | null | undefined
  moveIndex: () => number
  pokemonInput: () => SearchInput | undefined
  itemInput: () => SearchInput | undefined
  pokemonSelected: (name: string) => void
}

@Injectable()
export class MobileBuildEditingService {
  private store = inject(CalcStore)
  private overlay = inject(MobileTableOverlayService)

  private target!: BuildEditingTarget
  private justOpenedTable = false

  track(target: BuildEditingTarget) {
    this.target = target
  }

  onPokemonMouseDown(event: MouseEvent) {
    this.openFromField(event, "pokemon")
  }

  private openFromField(event: MouseEvent, kind: TableKind) {
    if (this.overlay.isAnyOpen()) return

    event.preventDefault()
    this.justOpenedTable = true
    this.overlay.open(kind)
  }

  onItemMouseDown(event: MouseEvent) {
    this.openFromField(event, "items")
  }

  onPokemonClick() {
    this.clearSearch(this.target.pokemonInput())
  }

  private clearSearch(input: SearchInput | undefined) {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    input?.setValue("")
    this.overlay.setFilter("")
  }

  onItemClick() {
    this.clearSearch(this.target.itemInput())
  }

  filter(value: string) {
    this.overlay.setFilter(value)
  }

  openMovesTable() {
    this.overlay.open("moves")
  }

  openAbilitiesTable() {
    this.overlay.open("abilities")
  }

  openItemsTable() {
    this.overlay.open("items")
  }

  closeMovesTable() {
    this.overlay.close()
  }

  closeItemsTable() {
    this.overlay.close()
    this.target.itemInput()?.blur()
  }

  selectFromTable(event: TableSelectEvent) {
    switch (event.kind) {
      case "pokemon":
        this.target.pokemonSelected(event.value)
        break
      case "moves":
        this.selectMove(event.value)
        break
      case "abilities":
        this.selectAbility(event.value)
        break
      case "items":
        this.selectItem(event.value)
        break
    }
  }

  private selectMove(move: string) {
    const id = this.target.editingId()

    if (!id) return

    this.store.updateMove(id, move, this.target.moveIndex())
  }

  private selectAbility(ability: string) {
    const id = this.target.editingId()

    if (!id) return

    this.store.ability(id, ability)
    this.overlay.close()
  }

  private selectItem(name: string) {
    const id = this.target.editingId()

    if (!id) return

    this.store.item(id, name)
    this.overlay.close()
    this.target.itemInput()?.blur()
  }
}
