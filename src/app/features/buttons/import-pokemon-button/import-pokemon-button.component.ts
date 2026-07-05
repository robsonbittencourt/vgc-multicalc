import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, inject, input, output } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { availableItemNames } from "@configuration/available-items"
import { MOVESETS } from "@data/moveset-data"
import { getPokemonData } from "@data/pokemon-data"
import { getPokemonMoveset } from "@data/pokemon-moveset"
import { toPokemon } from "@adapters"
import { ImportModalComponent } from "@features/import-modal/import-modal.component"
import { Move, MoveSet, Pokemon } from "@multicalc/model"
import { SnackbarService } from "@core/services/snackbar.service"
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
    const processedList = parsedList.map(p => {
      const allZero = Object.values(p.evs).every(ev => ev === 0)

      if (allZero) {
        const pokeMetaData = toPokemon(p.name, MOVESETS)
        return p.clone({ nature: pokeMetaData.nature, evs: pokeMetaData.evs })
      }

      return p
    })

    const validSetdex = MOVESETS
    const validList = processedList.filter(p => p.name in validSetdex)
    const removedCount = processedList.length - validList.length

    if (validList.length === 0) {
      this.snackBar.open("No valid Pokémon for the current mode")
      return
    }

    const validItemsForMode = availableItemNames()
    const validatedList: { pokemon: Pokemon; hadInvalidMoves: boolean; hadInvalidItem: boolean }[] = validList.map(p => this.validateAndClean(p, validItemsForMode))

    const hadInvalidMoves = validatedList.some(v => v.hadInvalidMoves)
    const hadInvalidItems = validatedList.some(v => v.hadInvalidItem)
    const finalList = validatedList.map(v => v.pokemon)

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

  private validateAndClean(pokemon: Pokemon, validItemsForMode: string[]): { pokemon: Pokemon; hadInvalidMoves: boolean; hadInvalidItem: boolean } {
    const detailsEntry = getPokemonData(pokemon.name)

    if (!detailsEntry) {
      return { pokemon, hadInvalidMoves: false, hadInvalidItem: false }
    }

    let hadInvalidMoves = false
    let hadInvalidItem = false
    let cleanedPokemon = pokemon

    const learnset = getPokemonMoveset(pokemon.name)?.learnset

    if (learnset) {
      const validLearnset: string[] = learnset.map((move: string) => move.toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/'/g, ""))
      const moves = pokemon.moveSet.moves
      const cleanedMoves: Move[] = []

      for (const move of moves) {
        const moveName = move.name.toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "")

        if (!moveName || validLearnset.includes(moveName)) {
          cleanedMoves.push(move)
        } else {
          cleanedMoves.push(new Move(""))
          hadInvalidMoves = true
        }
      }

      const newMoveSet = new MoveSet(cleanedMoves[0], cleanedMoves[1], cleanedMoves[2], cleanedMoves[3], pokemon.moveSet.activeMovePosition)
      cleanedPokemon = cleanedPokemon.clone({ moveSet: newMoveSet })
    }

    if (pokemon.item && pokemon.item !== "") {
      const itemNameNormalized = pokemon.item.toLowerCase().replace(/ /g, "").replace(/'/g, "")
      if (!validItemsForMode.includes(itemNameNormalized)) {
        cleanedPokemon = cleanedPokemon.clone({ item: "" })
        hadInvalidItem = true
      }
    }

    return { pokemon: cleanedPokemon, hadInvalidMoves, hadInvalidItem }
  }
}
