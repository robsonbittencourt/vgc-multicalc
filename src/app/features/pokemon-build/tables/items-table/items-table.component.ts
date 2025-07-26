import { Component, computed, inject, input, output } from "@angular/core"
import { ITEM_DETAILS, ItemDetail } from "@data/item-details"
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

  itemSelected = output<string>()
  firstItemFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  actualItem = computed(() => {
    return [this.pokemon().item]
  })

  itemsData = this.groupItemsByGroup()

  itemColumns: ColumnConfig<ItemDetail>[] = [
    new ColumnConfig<ItemDetail>({
      field: "sprite",
      isImageColumn: true,
      displayFn: (item: ItemDetail) => `assets/sprites/items/${item.name.toLowerCase().replace(" ", "-")}.png`,
      alignLeft: true,
      width: "small"
    }),
    new ColumnConfig<ItemDetail>({
      field: "name",
      header: "Name",
      sortable: true,
      alignLeft: true,
      width: "medium"
    }),
    new ColumnConfig<ItemDetail>({ field: "description", header: "Description", description: "Description", alignLeft: true })
  ]

  groupItemsByGroup(): TableData<ItemDetail>[] {
    const allItems = Object.values(ITEM_DETAILS)

    const groupedData = allItems.reduce(
      (acc, item) => {
        const groupName = item.group

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

    return orderedResult
  }
}
