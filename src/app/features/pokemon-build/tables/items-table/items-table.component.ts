import { Component, computed, inject, input, output } from "@angular/core"
import { ITEM_DETAILS } from "@data/item-data"
import { availableItemNames } from "@configuration/available-items"
import { getPokemonMoveset } from "@data/pokemon-moveset"
import { CalcStore } from "@store/calc-store"
import { FilterableTableComponent } from "@features/pokemon-build//tables/filterable-table/filterable-table.component"
import { ColumnConfig, TableData } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"

interface ItemRow {
  group: "Meta" | "Items" | "Pokémon specific items" | "Useless items"
  name: string
  description: string
  sprite: string
}

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

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  actualItem = computed(() => {
    return [this.pokemon().item]
  })

  itemsData = computed(() => this.groupItemsByGroup())

  itemColumns: ColumnConfig<ItemRow>[] = [
    new ColumnConfig<ItemRow>({
      field: "sprite",
      isImageColumn: true,
      displayFn: (item: ItemRow) => `assets/sprites/items/${item.name.toLowerCase().replace(" ", "-")}.webp`,
      alignLeft: true,
      width: "small"
    }),
    new ColumnConfig<ItemRow>({
      field: "name",
      header: "Name",
      sortable: true,
      alignLeft: true,
      width: "medium",
      freezeOnMobile: true
    }),
    new ColumnConfig<ItemRow>({ field: "description", header: "Description", description: "Description", alignLeft: true, width: "fill" })
  ]

  groupItemsByGroup(): TableData<ItemRow>[] {
    const currentPokemon = this.pokemon()
    const pokemonMoveset = getPokemonMoveset(currentPokemon.name)
    const metaItems = pokemonMoveset?.metaItems || []

    const availableNames = availableItemNames()
    const allItems = Object.entries(ITEM_DETAILS)
      .filter(([key]) => availableNames.includes(key))
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
      {} as Record<ItemRow["group"], ItemRow[]>
    )

    const result = Object.keys(groupedData).map(groupName => ({
      group: groupName as ItemRow["group"],
      data: groupedData[groupName as ItemRow["group"]]
    }))

    const orderedResult = [
      result.find(data => data.group == "Meta") as TableData<ItemRow>,
      result.find(data => data.group == "Items") as TableData<ItemRow>,
      result.find(data => data.group == "Pokémon specific items") as TableData<ItemRow>,
      result.find(data => data.group == "Useless items") as TableData<ItemRow>
    ]

    return orderedResult.filter(g => g !== undefined)
  }

  private isMetaItem(item: ItemRow, metaItemSet: Set<string>): boolean {
    const normalizedItemName = item.name.toLowerCase().replace(/[^a-z0-9]/g, "")
    return metaItemSet.has(normalizedItemName)
  }
}
