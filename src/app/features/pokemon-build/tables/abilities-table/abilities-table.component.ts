import { Component, computed, inject, input, output } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"

interface AbilityRow {
  name: string
  description: string
}

@Component({
  selector: "app-abilities-table",
  imports: [FilterableTableComponent],
  templateUrl: "./abilities-table.component.html",
  styleUrl: "./abilities-table.component.scss"
})
export class AbilitiesTableComponent {
  pokemonId = input.required<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()
  isMobile = input<boolean>(false)

  abilitySelected = output<string>()
  firstAbilityFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  abilitiesData = computed(() => {
    const abilities = this.pokemon().availableAbilities
    return [{ group: "Abilities", data: abilities }]
  })

  actualAbility = computed(() => {
    const abilityName = this.pokemon().ability.name
    return [abilityName]
  })

  moveColumns: ColumnConfig<AbilityRow>[] = [
    new ColumnConfig<AbilityRow>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium", freezeOnMobile: true }),
    new ColumnConfig<AbilityRow>({ field: "description", header: "Description", description: "Description", alignLeft: true, width: "fill" })
  ]
}
