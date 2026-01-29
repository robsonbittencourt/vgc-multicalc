import { Component, computed, inject, input, output } from "@angular/core"
import { MOVE_DETAILS, MoveDetail, MoveName } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"
import { PokemonTypes } from "@lib/types"

@Component({
  selector: "app-moves-table",
  imports: [FilterableTableComponent],
  templateUrl: "./moves-table.component.html",
  styleUrl: "./moves-table.component.scss"
})
export class MovesTableComponent {
  pokemonId = input.required<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()

  moveSelected = output<string>()
  firstMoveFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  movesData = computed(() => {
    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == this.pokemon().name)!
    const metaMoves = this.getMoveDetails(pokemonDetails.metaMoves)
    const allMoves = this.getMoveDetails(pokemonDetails.learnset)

    const metaMoveNames = new Set(pokemonDetails.metaMoves)
    const regularMoves = allMoves.filter(move => !metaMoveNames.has(move.name.toLowerCase().replace(/[^a-z0-9]/g, "")))

    const groups = []

    if (metaMoves.length > 0) {
      groups.push({ group: "Meta", data: metaMoves })
    }

    groups.push({ group: "Moves", data: regularMoves })

    return groups
  })

  actualMoves = computed(() => {
    return this.pokemon().moveSet.moves.map(m => m.name)
  })

  private getMoveDetails(learnset: MoveName[]): MoveDetail[] {
    const details = learnset
      .map(move => {
        const moveDetail = MOVE_DETAILS[move]
        if (moveDetail) {
          return { move, ...moveDetail }
        }
        return null
      })
      .filter(detail => detail !== null)

    return details
  }

  moveColumns: ColumnConfig<MoveDetail>[] = [
    new ColumnConfig<MoveDetail>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium" }),
    new ColumnConfig<MoveDetail>({
      field: "type",
      header: "Type",
      description: "Type",
      filterable: true,
      isPokemonType: true,
      filterValues: [...PokemonTypes],
      width: "medium"
    }),
    new ColumnConfig<MoveDetail>({
      field: "category",
      header: "Cat",
      description: "Move category",
      filterable: true,
      isImageColumn: true,
      displayFn: (item: MoveDetail) => `assets/icons/${item.category.toLowerCase()}.png`,
      filterValues: ["Physical", "Special", "Status"],
      width: "small"
    }),
    new ColumnConfig<MoveDetail>({
      field: "basePower",
      header: "BP",
      description: "Base Power",
      sortable: true,
      showHeaderInCell: true,
      width: "small"
    }),
    new ColumnConfig<MoveDetail>({
      field: "accuracy",
      header: "Acc",
      description: "Accuracy",
      sortable: true,
      displayFn: (item: MoveDetail) => (typeof item.accuracy === "number" ? `${item.accuracy}%` : "-"),
      showHeaderInCell: true,
      width: "verysmall"
    }),
    new ColumnConfig<MoveDetail>({
      field: "pp",
      header: "PP",
      description: "PP",
      sortable: true,
      showHeaderInCell: true,
      width: "small"
    }),
    new ColumnConfig<MoveDetail>({ field: "description", header: "Description", description: "Description", alignLeft: true })
  ]
}
