import { Component, inject, input, output } from "@angular/core"
import { AbilitiesTableComponent } from "@features/pokemon-build/tables/abilities-table/abilities-table.component"
import { ItemsTableComponent } from "@features/pokemon-build/tables/items-table/items-table.component"
import { MovesTableComponent } from "@features/pokemon-build/tables/moves-table/moves-table.component"
import { PokemonTableComponent } from "@features/pokemon-build/tables/pokemon-table/pokemon-table.component"
import { MatIcon } from "@angular/material/icon"
import { MobileTableOverlayService, TableSelectEvent } from "./mobile-table-overlay.service"

@Component({
  selector: "app-mobile-table-overlay",
  templateUrl: "./mobile-table-overlay.component.html",
  styleUrl: "./mobile-table-overlay.component.scss",
  imports: [PokemonTableComponent, MovesTableComponent, AbilitiesTableComponent, ItemsTableComponent, MatIcon]
})
export class MobileTableOverlayComponent {
  pokemonId = input.required<string>()
  moveIndex = input<number>(0)

  select = output<TableSelectEvent>()
  closed = output<void>()

  overlay = inject(MobileTableOverlayService)

  onPokemonSelected(name: string) {
    this.select.emit({ kind: "pokemon", value: name })
  }

  onMoveSelected(name: string) {
    this.select.emit({ kind: "moves", value: name })
  }

  onAbilitySelected(name: string) {
    this.select.emit({ kind: "abilities", value: name })
  }

  onItemSelected(name: string) {
    this.select.emit({ kind: "items", value: name })
  }

  close() {
    this.overlay.close()
    this.closed.emit()
  }
}
