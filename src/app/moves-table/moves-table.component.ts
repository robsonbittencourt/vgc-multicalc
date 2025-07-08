import { Component, computed, inject, input, output } from "@angular/core"
import { FilterableTableComponent } from "@app/filterable-table/filterable-table.component"
import { ColumnConfig } from "@app/filterable-table/filtered-table-types"
import { MOVE_DETAILS, MoveDetail, MoveName } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
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
    return [{ group: "Moves", data: this.getMoveDetails(pokemonDetails.learnset) }]
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
