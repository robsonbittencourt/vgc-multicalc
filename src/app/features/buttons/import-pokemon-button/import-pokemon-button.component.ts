import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, inject, input, output } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { AVAILABLE_ITEMS } from "@data/available-items"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { POKEMON_DETAILS_CHAMPIONS } from "@data/pokemon-details-champions"
import { CalculatorStore } from "@data/store/calculator-store"
import { toPokemon } from "@data/regulation-pokemon"
import { ImportModalComponent } from "@features/import-modal/import-modal.component"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { SnackbarService } from "@lib/snackbar.service"
import { PokePasteParserService } from "@lib/user-data/poke-paste-parser.service"

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

  private dialog = inject(MatDialog)
  private pokePasteService = inject(PokePasteParserService)
  private store = inject(CalculatorStore)
  private snackBar = inject(SnackbarService)

  importPokemon() {
    const placeholder = this.singlePokemon() ? "Pokémon build in text format" : "PokePaste link or team in text format"

    const dialogRef = this.dialog.open(ImportModalComponent, {
      data: { placeholder },
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (!result) return

      try {
        await this.handleImport(result)
      } catch {
        this.snackBar.open("Could not import the Pokémon")
      }
    })
  }

  private async handleImport(result: string) {
    const parsedList = await this.pokePasteService.parse(result)
    const processedList = parsedList.map(p => {
      const allZero = Object.values(p.evs).every(ev => ev === 0)

      if (allZero) {
        const pokeMetaData = toPokemon(p.name, this.store.activeSetdex(), this.store.isChampions())
        return p.clone({ nature: pokeMetaData.nature, evs: pokeMetaData.evs })
      }

      return p
    })

    const validSetdex = this.store.activeSetdex()
    const validList = processedList.filter(p => p.name in validSetdex)
    const removedCount = processedList.length - validList.length

    if (validList.length === 0) {
      this.snackBar.open("No valid Pokémon for the current mode")
      return
    }

    const activeDetails = this.store.isChampions() ? POKEMON_DETAILS_CHAMPIONS : POKEMON_DETAILS
    const validItemsForMode = this.store.isChampions() ? AVAILABLE_ITEMS["champions"] : AVAILABLE_ITEMS["sv"]
    const validatedList: { pokemon: Pokemon; hadInvalidMoves: boolean; hadInvalidItem: boolean }[] = validList.map(p => this.validateAndClean(p, activeDetails, validItemsForMode))

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

    this.pokemonImportedEvent.emit(output)
  }

  private validateAndClean(pokemon: Pokemon, activeDetails: Record<string, any>, validItemsForMode: string[]): { pokemon: Pokemon; hadInvalidMoves: boolean; hadInvalidItem: boolean } {
    const pokemonKey = pokemon.name.toLowerCase()
    const detailsEntry = activeDetails[pokemonKey]

    if (!detailsEntry) {
      return { pokemon, hadInvalidMoves: false, hadInvalidItem: false }
    }

    let hadInvalidMoves = false
    let hadInvalidItem = false
    let cleanedPokemon = pokemon

    if (detailsEntry.learnset) {
      const validLearnset: string[] = detailsEntry.learnset.map((move: string) => move.toLowerCase().replace(/ /g, ""))
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
