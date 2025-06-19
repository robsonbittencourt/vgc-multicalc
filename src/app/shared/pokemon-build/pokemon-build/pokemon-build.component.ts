import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, inject, input, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { RouterOutlet } from "@angular/router"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@app/shared/pokemon-build/item-combo-box/item-combo-box.component"
import { MultiHitComboBoxComponent } from "@app/shared/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@app/shared/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { StatusComboBoxComponent } from "@app/shared/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@app/shared/pokemon-build/tera-combo-box/tera-combo-box.component"
import { TypeComboBoxComponent } from "@app/shared/pokemon-build/type-combo-box/type-combo-box.component"
import { MOVE_DETAILS, MoveDetail, MoveName } from "@data/move-details"
import { Moves } from "@data/moves"
import { AllPokemon, POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { PokemonTypes } from "@lib/types"
import { ColumnConfig, FilterableTableComponent } from "../../../filterable-table/filterable-table.component"

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  imports: [
    NgStyle,
    NgClass,
    MatCheckbox,
    FormsModule,
    RouterOutlet,
    InputAutocompleteComponent,
    PokemonComboBoxComponent,
    AbilityComboBoxComponent,
    EvSliderComponent,
    TeraComboBoxComponent,
    MultiHitComboBoxComponent,
    StatusComboBoxComponent,
    ItemComboBoxComponent,
    TypeComboBoxComponent,
    NatureComboBoxComponent,
    FilterableTableComponent
  ]
})
export class PokemonBuildComponent {
  pokemonId = input.required<string>()
  reverse = input<boolean>(false)

  store = inject(CalculatorStore)

  activeMoveIndex = signal<number | null>(null)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allMoveNames = Moves.instance.moves
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  activateMove(position: number) {
    this.activeMoveIndex.set(null)
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  moveComboOnClick(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
    this.activeMoveIndex.set(position - 1)
  }

  actualMoves = computed(() => {
    return this.pokemon().moveSet.moves.map(m => m.name)
  })

  movesData = computed(() => {
    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == this.pokemon().name)!
    return this.getMoveDetails(pokemonDetails.learnset!)
  })

  showMoveSelectComponent = computed(() => {
    return this.activeMoveIndex() != null ? this.activeMoveIndex()! >= 0 : false
  })

  getMoveDetails(learnset: MoveName[]): MoveDetail[] {
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
    { field: "name", sortable: true, alignLeft: true },
    {
      field: "type",
      header: "Type",
      description: "Type",
      filterable: true,
      isImageColumn: true,
      displayFn: (item: MoveDetail) => `assets/icons/types/${item.type.toLowerCase()}.png`,
      filterValues: [...PokemonTypes]
    },
    {
      field: "category",
      header: "Cat",
      description: "Move category",
      filterable: true,
      isImageColumn: true,
      displayFn: (item: MoveDetail) => `assets/icons/${item.category.toLowerCase()}.png`,
      filterValues: ["Physical", "Special", "Status"]
    },
    {
      field: "basePower",
      header: "BP",
      description: "Base Power",
      sortable: true,
      showHeaderInCell: true
    },
    {
      field: "accuracy",
      header: "Acc",
      description: "Accuracy",
      sortable: true,
      displayFn: (item: MoveDetail) => (typeof item.accuracy === "number" ? `${item.accuracy}%` : "-"),
      showHeaderInCell: true
    },
    {
      field: "pp",
      header: "PP",
      description: "PP",
      sortable: true,
      showHeaderInCell: true
    },
    { field: "description", description: "Description", alignLeft: true }
  ]

  moveSelected(move: string) {
    this.store.updateMove(this.pokemonId(), move, this.activeMoveIndex()!)
  }
}
