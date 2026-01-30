import { Component, computed, effect, inject, input, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { MOVE_DETAILS } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@features/pokemon-build/item-combo-box/item-combo-box.component"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { Pokemon } from "@lib/model/pokemon"
import { Stats } from "@lib/types"
import { getFinalAttack, getFinalSpecialAttack } from "@lib/smogon/stat-calculator/atk-spa/modified-atk-spa"
import { getFinalDefense, getFinalSpecialDefense } from "@lib/smogon/stat-calculator/def-spd/modified-def-spd"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [
    MatChipListbox,
    MatChipOption,
    MatIcon,
    MatButton,
    MatCheckbox,
    FormsModule,
    InputAutocompleteComponent,
    AbilityComboBoxComponent,
    EvSliderComponent,
    TeraComboBoxComponent,
    MultiHitComboBoxComponent,
    StatusComboBoxComponent,
    ItemComboBoxComponent,
    NatureComboBoxComponent
  ]
})
export class PokemonBuildMobileComponent {
  pokemonId = input.required<string>()
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)

  pokemonChangedEvent = output<Pokemon>()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()
  evsCleared = output<void>()

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  menuStore = inject(MenuStore)

  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")
  updateNature = signal<boolean>(false)
  keepOffensiveEvs = signal<boolean>(false)

  modifiedAtk = signal<number>(0)
  modifiedDef = signal<number>(0)
  modifiedSpa = signal<number>(0)
  modifiedSpd = signal<number>(0)
  modifiedSpe = signal<number>(0)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.evs }
  })

  hasNoSolution = computed(() => {
    const optimized = this.optimizedEvs()

    if (optimized === null) return false

    return optimized.hp === 0 && optimized.def === 0 && optimized.spd === 0
  })

  hasModifiedStat = computed(() => {
    return this.modifiedAtk() != this.pokemon().atk || this.modifiedDef() != this.pokemon().def || this.modifiedSpa() != this.pokemon().spa || this.modifiedSpd() != this.pokemon().spd || this.modifiedSpe() != this.pokemon().spe
  })

  isOptimizationValid = computed(() => {
    const optimized = this.optimizedEvs()
    const current = this.pokemon().evs

    if (optimized === null) return false

    const hpValid = optimized.hp === 0 || optimized.hp === current.hp
    const defValid = optimized.def === 0 || optimized.def === current.def
    const spdValid = optimized.spd === 0 || optimized.spd === current.spd

    return hpValid && defValid && spdValid
  })

  isHpOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    const noSolution = this.hasNoSolution()
    const isValid = this.isOptimizationValid()

    return optimized !== null && optimized.hp !== 0 && isValid && !noSolution
  })

  isDefOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    const noSolution = this.hasNoSolution()
    const isValid = this.isOptimizationValid()

    return optimized !== null && optimized.def !== 0 && isValid && !noSolution
  })

  isSpdOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    const noSolution = this.hasNoSolution()
    const isValid = this.isOptimizationValid()

    return optimized !== null && optimized.spd !== 0 && isValid && !noSolution
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

  clearEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    this.evsCleared.emit()
  }

  optimizeEvs() {
    const defender = this.store.findPokemonById(this.pokemonId())
    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    this.optimizeRequested.emit({ updateNature: this.updateNature(), keepOffensiveEvs: this.keepOffensiveEvs() })
  }

  applyOptimization() {
    const optimized = this.optimizedEvs()

    if (optimized) {
      this.store.evs(this.pokemonId(), { ...optimized })
    }

    this.optimizationApplied.emit()
  }

  discardOptimization() {
    const original = this.originalEvs()
    this.store.evs(this.pokemonId(), original)

    const originalNature = this.originalNature()
    this.store.nature(this.pokemonId(), originalNature)

    this.optimizationDiscarded.emit()
  }
}
