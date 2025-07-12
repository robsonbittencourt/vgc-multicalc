import { Component, computed, inject, input, output } from "@angular/core"
import { FilterableTableComponent } from "@app/filterable-table/filterable-table.component"
import { ColumnConfig } from "@app/filterable-table/filtered-table-types"
import { ABILITY_DETAILS, AbilityDetail } from "@data/abiliity-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"

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

  abilitySelected = output<string>()
  firstAbilityFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  abilitiesData = computed(() => {
    return [{ group: "Abilities", data: this.getPokemonAbilities(this.pokemon()) }]
  })

  actualAbility = computed(() => {
    return [this.pokemon().ability.name]
  })

  moveColumns: ColumnConfig<AbilityDetail>[] = [
    new ColumnConfig<AbilityDetail>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium" }),
    new ColumnConfig<AbilityDetail>({ field: "description", header: "Description", description: "Description", alignLeft: true })
  ]

  private getPokemonAbilities(pokemon: Pokemon) {
    if (pokemon.name == "Ogerpon" && pokemon.teraTypeActive) {
      return [ABILITY_DETAILS[`embodyaspectteal`]]
    }

    if (pokemon.name.startsWith("Ogerpon-") && pokemon.teraTypeActive) {
      const form = pokemon.name.replace("Ogerpon-", "").toLowerCase()
      return [ABILITY_DETAILS[`embodyaspect${form}`]]
    }

    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == pokemon.name)!
    return pokemonDetails.abilities.map(ability => ABILITY_DETAILS[ability])
  }
}
