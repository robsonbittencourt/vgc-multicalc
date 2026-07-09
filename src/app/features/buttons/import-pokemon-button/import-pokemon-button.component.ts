import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, inject, input, output } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { availableItemNames } from "@configuration/available-items"
import { ImportModalComponent } from "@features/modals/import-modal/import-modal.component"
import { validateImport } from "@multicalc/import-validation"
import { Pokemon } from "@multicalc/model"
import { SnackbarService } from "@app/services/snackbar.service"
import { PokePasteParserService } from "@store/user-data/poke-paste-parser.service"

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
  private pokePasteService = inject(PokePasteParserService)
  private snackBar = inject(SnackbarService)

  importPokemon() {
    const placeholder = this.singlePokemon() ? "Pokémon build in text format" : "PokePaste/VR Pastes link or team in text format"

    const dialogRef = this.dialog.open(ImportModalComponent, {
      data: { placeholder },
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (!result?.content) return

      try {
        await this.handleImport(result.content, result.useSpsMode)
      } catch {
        this.snackBar.open("Could not import the Pokémon")
      }
    })
  }

  private async handleImport(content: string, useSpsMode: boolean) {
    const { name: teamName, pokemon: parsedList } = await this.pokePasteService.parseTeam(content, useSpsMode)

    const { pokemon: finalList, removedCount, hadInvalidMoves, hadInvalidItems } = validateImport(parsedList, availableItemNames())

    if (finalList.length === 0) {
      this.snackBar.open("No valid Pokémon for the current mode")
      return
    }

    const messages: string[] = []
    if (removedCount > 0) {
      messages.push(`${removedCount} Pokémon ${removedCount === 1 ? "was" : "were"} invalid for the current mode and removed`)
    }
    if (hadInvalidMoves) {
      messages.push("Some moves were invalid for the current mode and removed")
    }
    if (hadInvalidItems) {
      messages.push("Some items were invalid for the current mode and removed")
    }

    if (messages.length > 0) {
      this.snackBar.open(messages.join(". "))
    } else {
      this.snackBar.open("Pokémon imported")
    }

    const output = this.singlePokemon() ? finalList[0] : finalList

    if (teamName) {
      this.teamNameImportedEvent.emit(teamName)
    }

    this.pokemonImportedEvent.emit(output)
  }
}
