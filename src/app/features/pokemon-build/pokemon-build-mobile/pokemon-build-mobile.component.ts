import { Component, computed, effect, inject, input, output, signal } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { MOVE_DETAILS } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@features/pokemon-build/item-combo-box/item-combo-box.component"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { Pokemon } from "@lib/model/pokemon"
import { getFinalAttack, getFinalSpecialAttack } from "@lib/smogon/stat-calculator/atk-spa/modified-atk-spa"
import { getFinalDefense, getFinalSpecialDefense } from "@lib/smogon/stat-calculator/def-spd/modified-def-spd"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [MatChipListbox, MatChipOption, MatIcon, InputAutocompleteComponent, AbilityComboBoxComponent, EvSliderComponent, TeraComboBoxComponent, MultiHitComboBoxComponent, StatusComboBoxComponent, ItemComboBoxComponent, NatureComboBoxComponent]
})
export class PokemonBuildMobileComponent {
  pokemonId = input.required<string>()

  pokemonChangedEvent = output<Pokemon>()

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)

  modifiedAtk = signal<number>(0)
  modifiedDef = signal<number>(0)
  modifiedSpa = signal<number>(0)
  modifiedSpd = signal<number>(0)
  modifiedSpe = signal<number>(0)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  hasModifiedStat = computed(() => {
    return this.modifiedAtk() != this.pokemon().atk || this.modifiedDef() != this.pokemon().def || this.modifiedSpa() != this.pokemon().spa || this.modifiedSpd() != this.pokemon().spd || this.modifiedSpe() != this.pokemon().spe
  })

  allMoveNames = computed(() => {
    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == this.pokemon().name)!
    return pokemonDetails.learnset.map(move => MOVE_DETAILS[move].name)
  })

  editAttacks = false

  constructor() {
    effect(() => {
      if (this.fieldStore.field()) {
        const id = this.pokemonId()
        const activatedPokemon = this.store.findPokemonById(id)

        this.modifiedAtk.set(getFinalAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedDef.set(getFinalDefense(activatedPokemon, this.fieldStore.field(), false))
        this.modifiedSpa.set(getFinalSpecialAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedSpd.set(getFinalSpecialDefense(activatedPokemon, this.fieldStore.field(), !false))
        this.modifiedSpe.set(getFinalSpeed(activatedPokemon, this.fieldStore.field(), !false))
      }
    })
  }

  activateMove1() {
    this.activateMove(1)
  }

  activateMove2() {
    this.activateMove(2)
  }

  activateMove3() {
    this.activateMove(3)
  }

  activateMove4() {
    this.activateMove(4)
  }

  private activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
  }
}
