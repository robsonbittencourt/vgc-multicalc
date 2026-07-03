import { Component, inject, input, output } from "@angular/core"
import { AbilitiesTableComponent } from "@features/pokemon-build/tables/abilities-table/abilities-table.component"
import { ItemsTableComponent } from "@features/pokemon-build/tables/items-table/items-table.component"
import { MovesTableComponent } from "@features/pokemon-build/tables/moves-table/moves-table.component"
import { PokemonTableComponent } from "@features/pokemon-build/tables/pokemon-table/pokemon-table.component"
import { MatIcon } from "@angular/material/icon"
import { MobileTableOverlayService, TableSelectEvent } from "./mobile-table-overlay.service"
import { CustomSet } from "@store/custom-set"

@Component({
  selector: "app-mobile-table-overlay",
  templateUrl: "./mobile-table-overlay.component.html",
  styleUrl: "./mobile-table-overlay.component.scss",
  imports: [PokemonTableComponent, MovesTableComponent, AbilitiesTableComponent, ItemsTableComponent, MatIcon]
})
export class MobileTableOverlayComponent {
  pokemonId = input.required<string>()
  moveIndex = input<number>(0)

  tableSelect = output<TableSelectEvent>()
  overlayClose = output<void>()
  customSetEditRequested = output<CustomSet>()

  overlay = inject(MobileTableOverlayService)

  onPokemonSelected(name: string) {
    this.tableSelect.emit({ kind: "pokemon", value: name })
  }

  onMoveSelected(name: string) {
    this.tableSelect.emit({ kind: "moves", value: name })
  }

  onAbilitySelected(name: string) {
    this.tableSelect.emit({ kind: "abilities", value: name })
  }

  onItemSelected(name: string) {
    this.tableSelect.emit({ kind: "items", value: name })
  }

  onCustomSetSelected() {
    this.close()
  }

  onCustomSetEditRequested(set: CustomSet) {
    this.customSetEditRequested.emit(set)
    this.close()
  }

  close() {
    this.overlay.close()
    this.overlayClose.emit()
  }
}
