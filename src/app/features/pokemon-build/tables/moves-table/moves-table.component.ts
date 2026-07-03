import { Component, computed, inject, input, output } from "@angular/core"
import { MoveName } from "@calc"
import { getMoveData } from "@data/move-data"
import { POKEMON_DATA } from "@data/pokemon-data"
import { CalculatorStore } from "@store/calculator-store"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"
import { MoveTarget, PokemonType, PokemonTypes, SecondaryEffect } from "@lib/types"

interface MoveDetail {
  accuracy: number | true
  basePower: number
  category: "Physical" | "Special" | "Status"
  name: string
  pp: number
  type: PokemonType
  description: string
  secondary: SecondaryEffect | null
  target: MoveTarget
  multihit?: number | [number, number]
}

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
  moveIndex = input<number>(0)
  isMobile = input<boolean>(false)

  moveSelected = output<string>()
  firstMoveFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  movesData = computed(() => {
    const details = POKEMON_DATA
    const pokemonDetails = Object.values(details).find(p => p.name == this.pokemon().name)!
    const metaMoves = this.getMoveDetails(pokemonDetails.metaMoves ?? [])
    const allMoves = this.getMoveDetails(pokemonDetails.learnset ?? [])

    const metaMoveNames = new Set((pokemonDetails.metaMoves ?? []).map(move => move.toLowerCase().replace(/[^a-z0-9]/g, "")))
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

  initialValue = computed(() => {
    const moveIndex = this.moveIndex()
    const moves = this.pokemon().moveSet.moves
    return moves[moveIndex]?.name || ""
  })

  private getMoveDetails(learnset: readonly MoveName[]): MoveDetail[] {
    const details = learnset
      .map(move => {
        const moveDetail = getMoveData(move)
        if (moveDetail && moveDetail.category) {
          return { move, ...moveDetail } as unknown as MoveDetail
        }
        return null
      })
      .filter(detail => detail !== null)

    return details
  }

  moveColumns = computed<ColumnConfig<MoveDetail>[]>(() => {
    const columns: ColumnConfig<MoveDetail>[] = [
      new ColumnConfig<MoveDetail>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium", freezeOnMobile: true }),
      new ColumnConfig<MoveDetail>({
        field: "category",
        header: "Cat",
        description: "Move category",
        filterable: true,
        isImageColumn: true,
        displayFn: (item: MoveDetail) => `assets/icons/${item.category.toLowerCase()}.png`,
        filterValues: ["Physical", "Special", "Status"],
        width: "verysmall"
      }),
      new ColumnConfig<MoveDetail>({
        field: "type",
        header: "Type",
        description: "Move type",
        filterable: true,
        isPokemonType: true,
        filterValues: [...PokemonTypes],
        width: "semimedium"
      }),
      new ColumnConfig<MoveDetail>({
        field: "basePower",
        header: "BP",
        description: "Base Power",
        sortable: true,
        showHeaderInCell: true,
        width: "verysmall"
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
        width: "verysmall"
      })
    ]

    columns.push(
      new ColumnConfig<MoveDetail>({
        field: "target",
        header: "Targets",
        description: "Opponents hit",
        displayFn: (item: MoveDetail) => this.targetsHit(item),
        tooltipFn: (item: MoveDetail) => (item.target === "allAdjacent" ? "Also hits your ally" : ""),
        showHeaderInCell: true,
        width: "tinysmall"
      })
    )

    columns.push(new ColumnConfig<MoveDetail>({ field: "description", header: "Description", description: "Description", alignLeft: true, width: "fill" }))

    return columns
  })

  private targetsHit(move: MoveDetail): string {
    if (move.target === "allAdjacentFoes" || move.target === "allAdjacent") {
      return "2"
    }

    if (move.target === "self" || move.target === "adjacentAlly" || move.target === "adjacentAllyOrSelf" || move.target === "allySide" || move.target === "allyTeam" || move.target === "allies" || move.target === "foeSide" || move.target === "all") {
      return "-"
    }

    return "1"
  }
}
