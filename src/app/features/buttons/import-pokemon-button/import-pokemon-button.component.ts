import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, inject, input, output } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { ImportModalComponent } from "@features/import-modal/import-modal.component"
import { Pokemon } from "@lib/model/pokemon"
import { PokePasteParserService } from "@lib/user-data/poke-paste-parser.service"

@Component({
  selector: "app-import-pokemon-button",
  templateUrl: "./import-pokemon-button.component.html",
  styleUrls: ["./import-pokemon-button.component.scss"],
  imports: [MatButton, MatIcon]
})
export class ImportPokemonButtonComponent {
  singlePokemon = input(true)
  show = input(true)
  hidden = input(false)

  pokemonImportedEvent = output<Pokemon | Pokemon[]>()

  private dialog = inject(MatDialog)
  private pokePasteService = inject(PokePasteParserService)

  importPokemon() {
    const placeholder = this.singlePokemon() ? "Pokémon build in text format" : "PokePaste link or team in text format"

    const dialogRef = this.dialog.open(ImportModalComponent, {
      data: { placeholder },
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      const output = this.singlePokemon() ? pokemonList[0] : pokemonList

      this.pokemonImportedEvent.emit(output)
    })
  }
}
