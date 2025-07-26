import { Component, computed, inject, input, output } from "@angular/core"
import { ABILITY_DETAILS } from "@data/abiliity-details"
import { POKEMON_DETAILS, PokemonDetail } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig, TableData } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-pokemon-table",
  imports: [FilterableTableComponent],
  templateUrl: "./pokemon-table.component.html",
  styleUrl: "./pokemon-table.component.scss"
})
export class PokemonTableComponent {
  pokemonId = input.required<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()

  pokemonSelected = output<string>()
  firstPokemonFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  actualPokemon = computed(() => {
    return [this.pokemon().name]
  })

  pokemonData = this.buildGroupedPokemonData()

  pokemonColumns: ColumnConfig<PokemonDetail>[] = [
    new ColumnConfig<PokemonDetail>({
      field: "name",
      isImageColumn: true,
      displayFn: (item: PokemonDetail) => `assets/sprites/pokemon-home/${item.name}.png`,
      alignLeft: true,
      width: "small"
    }),
    new ColumnConfig<PokemonDetail>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium" }),
    new ColumnConfig<PokemonDetail>({ field: "types", header: "Types", isPokemonType: true, width: "medium" }),
    new ColumnConfig<PokemonDetail>({ field: "abilities", header: "Abilities", width: "auto" }),
    new ColumnConfig<PokemonDetail>({ field: "hp", header: "HP", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "atk", header: "Atk", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "def", header: "Def", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "spa", header: "SpA", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "spd", header: "SpD", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "spe", header: "Spe", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "bst", header: "BST", showHeaderInCell: true, sortable: true, width: "verysmall" })
  ]

  buildGroupedPokemonData(): TableData<PokemonDetail>[] {
    const allPokemon = Object.values(POKEMON_DETAILS).map(p => {
      const pokemon = new Pokemon(p.name)
      const abilities = p.abilities.map(ability => ABILITY_DETAILS[ability].name)

      return {
        name: pokemon.name,
        types: [pokemon.type1, pokemon.type2],
        abilities: abilities,
        hp: pokemon.baseHp,
        atk: pokemon.baseAtk,
        def: pokemon.baseDef,
        spa: pokemon.baseSpa,
        spd: pokemon.baseSpd,
        spe: pokemon.baseSpe,
        bst: pokemon.bst,
        group: p.group
      } as PokemonDetail
    })

    const groupedData = allPokemon.reduce(
      (acc, pokemon) => {
        const groupName = pokemon.group

        if (!acc[groupName]) {
          acc[groupName] = []
        }

        acc[groupName].push(pokemon)
        return acc
      },
      {} as Record<PokemonDetail["group"], PokemonDetail[]>
    )

    const result = Object.keys(groupedData).map(groupName => ({
      group: groupName as PokemonDetail["group"],
      data: groupedData[groupName as PokemonDetail["group"]]
    }))

    const orderedResult = [result.find(data => data.group == "Meta") as TableData<PokemonDetail>, result.find(data => data.group == "Low usage") as TableData<PokemonDetail>, result.find(data => data.group == "Regular") as TableData<PokemonDetail>]

    return orderedResult
  }
}
