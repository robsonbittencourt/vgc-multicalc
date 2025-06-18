import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
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
import { Moves } from "@data/moves"
import { AllPokemon } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { ColumnConfig, FilterableTableComponent } from "../../../filterable-table/filterable-table.component"

interface Move {
  name: string
  type: string
  category: string
  power: number
  accuracy: number
  pp: number
  description: string
}

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

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allMoveNames = Moves.instance.moves
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  movesData: Move[] = [
    {
      name: "Draining Kiss",
      type: "FAIRY",
      category: "Special",
      power: 50,
      accuracy: 100,
      pp: 16,
      description: "User recovers 75% of the damage dealt."
    },
    {
      name: "Alluring Voice",
      type: "FAIRY",
      category: "Special",
      power: 80,
      accuracy: 100,
      pp: 16,
      description: "100% confuse target that had a stat rise this turn."
    },
    {
      name: "Dazzling Gleam",
      type: "FAIRY",
      category: "Special",
      power: 80,
      accuracy: 100,
      pp: 16,
      description: "No additional effect. Hits adjacent foes."
    },
    {
      name: "Flamethrower",
      type: "FIRE",
      category: "Special",
      power: 90,
      accuracy: 100,
      pp: 24,
      description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn."
    },
    {
      name: "Leaf Storm",
      type: "GRASS",
      category: "Special",
      power: 130,
      accuracy: 90,
      pp: 8,
      description: "The user attacks the target with a storm of sharp leaves. This lowers the user's Sp. Atk stat by two stages."
    },
    {
      name: "Aqua Jet",
      type: "WATER",
      category: "Physical",
      power: 40,
      accuracy: 100,
      pp: 32,
      description: "The user attacks first. This move has a heightened priority."
    },
    {
      name: "Bug Buzz",
      type: "BUG",
      category: "Special",
      power: 90,
      accuracy: 100,
      pp: 16,
      description: "The user generates a damaging sound wave. This may also lower the target's Special Defense stat."
    },
    {
      name: "Crunch",
      type: "DARK",
      category: "Physical",
      power: 80,
      accuracy: 100,
      pp: 24,
      description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat."
    },
    {
      name: "Draco Meteor",
      type: "DRAGON",
      category: "Special",
      power: 130,
      accuracy: 90,
      pp: 8,
      description: "Comets are summoned down from the sky. This lowers the user's Special Attack stat by two stages."
    },
    {
      name: "Tackle",
      type: "NORMAL",
      category: "Physical",
      power: 40,
      accuracy: 100,
      pp: 56,
      description: "A physical attack in which the user charges and slams into the target with its whole body."
    },
    {
      name: "Growl",
      type: "NORMAL",
      category: "Status",
      power: 0,
      accuracy: 100,
      pp: 64,
      description: "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stat."
    }
  ]

  moveColumns: ColumnConfig<Move>[] = [
    { field: "name", sortable: true },
    {
      field: "type",
      header: "Type",
      filterable: true,
      isImageColumn: true,
      displayFn: (item: Move) => `assets/icons/${item.type.toLowerCase()}.png`,
      filterValues: ["FAIRY", "FIRE", "GRASS", "WATER", "BUG", "DARK", "DRAGON", "ELECTRIC", "NORMAL"]
    },
    {
      field: "category",
      header: "Cat",
      filterable: true,
      isImageColumn: true,
      displayFn: (item: Move) => `assets/icons/${item.category.toLowerCase()}.png`,
      filterValues: ["Physical", "Special", "Status"]
    },
    {
      field: "power",
      header: "Pow",
      sortable: true,
      showHeaderInCell: true
    },
    {
      field: "accuracy",
      header: "Acc",
      sortable: true,
      displayFn: (item: Move) => `${item.accuracy}%`,
      showHeaderInCell: true
    },
    {
      field: "pp",
      header: "PP",
      sortable: true,
      showHeaderInCell: true
    },
    { field: "description" }
  ]
}
