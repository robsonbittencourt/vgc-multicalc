import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, inject, input, output } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { ImportModalComponent } from "@features/modals/import-modal/import-modal.component"
import { importWarningMessage, validateImport } from "@store/user-data/import-validation"
import { Pokemon } from "@multicalc/model"
import { SnackbarService } from "@app/services/snackbar.service"

@Component({
  selector: "app-import-pokemon-button",
  templateUrl: "./import-pokemon-button.component.html",
  styleUrls: ["./import-pokemon-button.component.scss"],
  imports: [MatButton, MatIcon]
})
export class ImportPokemonButtonComponent {
  singlePokemon = input(true)
  useIconStyle = input(false)
  show = input(true)
  hidden = input(false)

  pokemonImportedEvent = output<Pokemon | Pokemon[]>()
  teamNameImportedEvent = output<string>()

  private dialog = inject(MatDialog)
  private snackBar = inject(SnackbarService)

  importPokemon() {
    const placeholder = this.singlePokemon() ? "Pokémon build in text format" : "PokePaste/VR Pastes link or team in text format"

    const dialogRef = this.dialog.open(ImportModalComponent, {
      data: { placeholder },
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result?.pokemon) return

      this.handleImport(result.name, result.pokemon)
    })
  }

  private handleImport(teamName: string, parsedList: Pokemon[]) {
    const result = validateImport(parsedList)
    const finalList = result.pokemon

    if (finalList.length === 0) {
      this.snackBar.open("No Pokémon to import")
      return
    }

    this.snackBar.open(importWarningMessage(result) ?? "Pokémon imported")

    const output = this.singlePokemon() ? finalList[0] : finalList

    if (teamName) {
      this.teamNameImportedEvent.emit(teamName)
    }

    this.pokemonImportedEvent.emit(output)
  }
}
