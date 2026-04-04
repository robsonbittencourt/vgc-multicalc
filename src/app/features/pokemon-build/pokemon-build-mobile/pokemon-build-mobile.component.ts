import { Component, computed, inject, input, output } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { FormsModule } from "@angular/forms"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { Pokemon } from "@lib/model/pokemon"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { ItemComboBoxComponent } from "@features/pokemon-build/item-combo-box/item-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { FieldStore } from "@data/store/field-store"
import { getFinalAttack, getFinalSpecialAttack } from "@lib/smogon/stat-calculator/atk-spa/modified-atk-spa"
import { getFinalDefense, getFinalSpecialDefense } from "@lib/smogon/stat-calculator/def-spd/modified-def-spd"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { KeyValuePair } from "@basic/input-autocomplete/input-autocomplete.component"
import { PokemonMovesMobileComponent } from "@features/pokemon-build/pokemon-moves-mobile/pokemon-moves-mobile.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { Stats } from "@lib/types"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [NgClass, MatButton, MatCheckbox, FormsModule, AbilityComboBoxComponent, EvSliderComponent, TeraComboBoxComponent, StatusComboBoxComponent, ItemComboBoxComponent, NatureComboBoxComponent, InputSelectComponent, PokemonMovesMobileComponent, TypeComboBoxComponent]
})
export class PokemonBuildMobileComponent {
  pokemonId = input.required<string>()
  optimizationStatus = input<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)
  showOptimization = input<boolean>(true)
  showDelete = input<boolean>(true)
  manageTeamState = input<boolean>(true)
  isRightSide = input<boolean>(false)

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)

  MAX_EVS = 508
  thresholdOptions: KeyValuePair[] = [
    { key: "2HKO", value: "2" },
    { key: "3HKO", value: "3" },
    { key: "4HKO", value: "4" }
  ]

  updateNature = true
  keepOffensiveEvs = true
  survivalThreshold = "2"

  pokemonImportedEvent = output<Pokemon | Pokemon[]>()
  pokemonDeleted = output<string | null>()
  evsChanged = output<void>()
  optimizationRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: number }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()

  teamMembers = computed(() => this.store.team().teamMembers)

  pokemon = computed(() => {
    const id = this.pokemonId()
    return this.store.findPokemonById(id)!
  })

  teamMemberOnEdit = computed(() => {
    const editId = this.pokemonId()

    if (!editId) return false

    return this.teamMembers().some(m => m.pokemon.id === editId)
  })

  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.evs }
  })

  hasModifiedStat = computed(() => {
    return this.modifiedAtk() != this.pokemon().atk || this.modifiedDef() != this.pokemon().def || this.modifiedSpa() != this.pokemon().spa || this.modifiedSpd() != this.pokemon().spd || this.modifiedSpe() != this.pokemon().spe
  })

  modifiedAtk = computed(() => getFinalAttack(this.pokemon(), this.pokemon().move, this.fieldStore.field()))
  modifiedDef = computed(() => getFinalDefense(this.pokemon(), this.fieldStore.field(), this.isRightSide()))
  modifiedSpa = computed(() => getFinalSpecialAttack(this.pokemon(), this.pokemon().move, this.fieldStore.field()))
  modifiedSpd = computed(() => getFinalSpecialDefense(this.pokemon(), this.fieldStore.field(), !this.isRightSide()))
  modifiedSpe = computed(() => getFinalSpeed(this.pokemon(), this.fieldStore.field(), !this.isRightSide()))

  getModifiedStat(stat: keyof Stats): number {
    const pokemon = this.pokemon()
    const optimizedEvs = this.optimizedEvs()
    const optimizedNature = this.optimizedNature()

    if (this.optimizationStatus() === "success" && optimizedEvs) {
      return pokemon.clone({ evs: optimizedEvs, nature: optimizedNature || pokemon.nature }).stats[stat]
    }

    switch (stat) {
      case "hp":
        return pokemon.hp
      case "atk":
        return this.modifiedAtk()
      case "def":
        return this.modifiedDef()
      case "spa":
        return this.modifiedSpa()
      case "spd":
        return this.modifiedSpd()
      case "spe":
        return this.modifiedSpe()
    }
  }

  isHpOptimized = computed(() => this.isStatOptimized("hp"))
  isDefOptimized = computed(() => this.isStatOptimized("def"))
  isSpdOptimized = computed(() => this.isStatOptimized("spd"))

  isStatOptimized(stat: keyof Stats): boolean {
    const optimizedEvs = this.optimizedEvs()
    const pokemon = this.pokemon()

    if (this.optimizationStatus() !== "success" || !optimizedEvs) {
      return false
    }

    return optimizedEvs[stat] !== pokemon.evs[stat]
  }

  isOptimizationValid = computed(() => {
    const optimizedEvs = this.optimizedEvs()
    const initialEvs = this.currentEvs()

    if (!optimizedEvs) return false

    return (Object.keys(optimizedEvs) as (keyof Stats)[]).every(stat => optimizedEvs[stat] >= (initialEvs as any)[stat])
  })

  hasNoSolution = computed(() => this.optimizationStatus() === "no-solution")

  isSolutionNotNeeded = computed(() => this.optimizationStatus() === "not-needed")

  clearEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    this.evsChanged.emit()
  }

  optimizeEvs() {
    this.optimizationRequested.emit({
      updateNature: this.updateNature,
      keepOffensiveEvs: this.keepOffensiveEvs,
      survivalThreshold: parseInt(this.survivalThreshold)
    })
  }

  applyOptimization() {
    this.optimizationApplied.emit()
  }

  discardOptimization() {
    this.optimizationDiscarded.emit()
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    this.pokemonImportedEvent.emit(pokemon)
  }

  removeActivePokemon() {
    this.pokemonDeleted.emit(null)
  }
}
