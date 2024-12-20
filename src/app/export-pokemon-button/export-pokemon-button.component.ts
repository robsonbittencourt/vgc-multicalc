import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, inject, input } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { TeamExportModalComponent } from "@app/team-export-modal/team-export-modal.component"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-export-pokemon-button",
  templateUrl: "./export-pokemon-button.component.html",
  styleUrls: ["./export-pokemon-button.component.scss"],
  imports: [MatIcon]
})
export class ExportPokemonButtonComponent {
  pokemon = input.required<Pokemon>()
  show = input(true)
  hidden = input(false)

  private dialog = inject(MatDialog)

  exportPokemon() {
    this.dialog.open(TeamExportModalComponent, {
      data: {
        title: this.pokemon().name,
        content: this.pokemon().showdownTextFormat()
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }
}
