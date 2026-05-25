import { Component, computed, inject, input, output } from "@angular/core"
import { ITEM_DETAILS, ItemDetail } from "@data/item-details"
import { AVAILABLE_ITEMS } from "@data/available-items"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { POKEMON_DETAILS_CHAMPIONS } from "@data/pokemon-details-champions"
import { CalculatorStore } from "@data/store/calculator-store"
import { FilterableTableComponent } from "@features/pokemon-build//tables/filterable-table/filterable-table.component"
import { ColumnConfig, TableData } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"

@Component({
  selector: "app-items-table",
  imports: [FilterableTableComponent],
  templateUrl: "./items-table.component.html",
  styleUrl: "./items-table.component.scss"
})
export class ItemsTableComponent {
  pokemonId = input.required<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()
  isMobile = input<boolean>(false)

  itemSelected = output<string>()
  firstItemFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  actualItem = computed(() => {
    return [this.pokemon().item]
  })

  itemsData = computed(() => this.groupItemsByGroup())

  itemColumns: ColumnConfig<ItemDetail>[] = [
    new ColumnConfig<ItemDetail>({
      field: "sprite",
      isImageColumn: true,
      displayFn: (item: ItemDetail) => `assets/sprites/items/${item.name.toLowerCase().replace(" ", "-")}.webp`,
      alignLeft: true,
      width: "small"
    }),
    new ColumnConfig<ItemDetail>({
      field: "name",
      header: "Name",
      sortable: true,
      alignLeft: true,
      width: "medium",
      freezeOnMobile: true
    }),
    new ColumnConfig<ItemDetail>({ field: "description", header: "Description", description: "Description", alignLeft: true, width: "fill" })
  ]

  groupItemsByGroup(): TableData<ItemDetail>[] {
    const game = this.store.game()
    const currentPokemon = this.pokemon()
    const pokemonDetails = this.getPokemonDetails(currentPokemon.name)
    const metaItems = pokemonDetails?.metaItems || []

    const availableItemNames = AVAILABLE_ITEMS[game]
    const allItems = Object.entries(ITEM_DETAILS)
      .filter(([key]) => availableItemNames.includes(key))
      .map(([, value]) => value)

    const metaItemSet = new Set(metaItems.map(item => item.toLowerCase().replace(/[^a-z0-9]/g, "")))

    const groupedData = allItems.reduce(
      (acc, item) => {
        const isMetaItem = metaItems.length > 0 && this.isMetaItem(item, metaItemSet)
        const isFallbackItemNotInMeta = metaItems.length > 0 && !isMetaItem && item.group === "Meta"

        const groupName = isMetaItem ? "Meta" : isFallbackItemNotInMeta ? "Items" : item.group

        if (!acc[groupName]) {
          acc[groupName] = []
        }

        acc[groupName].push(item)
        return acc
      },
      {} as Record<ItemDetail["group"], ItemDetail[]>
    )

    const result = Object.keys(groupedData).map(groupName => ({
      group: groupName as ItemDetail["group"],
      data: groupedData[groupName as ItemDetail["group"]]
    }))

    const orderedResult = [
      result.find(data => data.group == "Meta") as TableData<ItemDetail>,
      result.find(data => data.group == "Items") as TableData<ItemDetail>,
      result.find(data => data.group == "Pokémon specific items") as TableData<ItemDetail>,
      result.find(data => data.group == "Useless items") as TableData<ItemDetail>
    ]

    return orderedResult.filter(g => g !== undefined)
  }

  private getPokemonDetails(pokemonName: string) {
    const details = this.store.game() === "champions" ? POKEMON_DETAILS_CHAMPIONS : POKEMON_DETAILS
    return Object.values(details).find(p => p.name === pokemonName)
  }

  private isMetaItem(item: ItemDetail, metaItemSet: Set<string>): boolean {
    const normalizedItemName = item.name.toLowerCase().replace(/[^a-z0-9]/g, "")
    return metaItemSet.has(normalizedItemName)
  }
}
