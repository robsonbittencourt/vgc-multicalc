import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { MatTooltip } from "@angular/material/tooltip"
import { KeyValuePair } from "@basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { spToEv, totalSpsFromEvs } from "@lib/utils/ev-sp-converter"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonMovesMobileComponent } from "@features/pokemon-build/pokemon-moves-mobile/pokemon-moves-mobile.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { Pokemon } from "@lib/model/pokemon"
import { getFinalAttack, getFinalSpecialAttack } from "@lib/smogon/stat-calculator/atk-spa/modified-atk-spa"
import { getFinalDefense, getFinalSpecialDefense } from "@lib/smogon/stat-calculator/def-spd/modified-def-spd"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { Stats } from "@lib/types"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [
    NgClass,
    MatButton,
    MatCheckbox,
    MatIcon,
    MatSlideToggle,
    MatTooltip,
    FormsModule,
    AbilityComboBoxComponent,
    EvSliderComponent,
    TeraComboBoxComponent,
    StatusComboBoxComponent,
    NatureComboBoxComponent,
    InputSelectComponent,
    PokemonMovesMobileComponent,
    TypeComboBoxComponent
  ]
})
export class PokemonBuildMobileComponent {
  pokemonId = input.required<string>()
  realPokemonId = input<string | null>(null)
  optimizationStatus = input<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)
  showOptimization = input<boolean>(true)
  showDelete = input<boolean>(true)
  manageTeamState = input<boolean>(true)
  isRightSide = input<boolean>(false)
  onlySpeed = input<boolean>(false)
  hideEvs = input<boolean>(false)
  hideMoves = input<boolean>(false)
  editingMoves = input<boolean>(false)
  editingAbility = input<boolean>(false)
  editingItem = input<boolean>(false)

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)
  megaStoneService = inject(MegaStoneService)

  showEvsSpsToggle = signal(true)
  MAX_EVS = 66
  evLabel = computed(() => {
    if (this.store.useSpsMode()) {
      return "SPs"
    }
    return "EVs"
  })
  remainingLabel = computed(() => "Remaining")
  remainingPoints = computed(() => {
    const pokemon = this.pokemon()
    const currentSps = totalSpsFromEvs(pokemon.evs)
    const remainingSps = 66 - currentSps

    if (this.store.useSpsMode()) {
      return remainingSps
    } else {
      return spToEv(remainingSps)
    }
  })

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
  editMovesRequested = output()
  closeMovesRequested = output()
  editAbilityRequested = output()
  editItemRequested = output()
  optimizationRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: number }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()

  teamMembers = computed(() => this.store.team().teamMembers)

  effectiveRealId = computed(() => this.realPokemonId() ?? this.pokemonId())

  pokemon = computed(() => {
    const id = this.pokemonId()
    return this.store.findPokemonById(id)!
  })

  teamMemberOnEdit = computed(() => {
    const editId = this.pokemonId()

    if (!editId) return false

    return this.teamMembers().some(m => m.pokemon.id === editId)
  })

  hasDuplicateItem = computed(() => this.teamMemberOnEdit() && this.store.duplicateItemPokemonIds().has(this.effectiveRealId()))

  isOptimizationSupported = computed(() => {
    const isOneVsOne = this.menuStore.oneVsOneActivated()
    const isManyVsOne = this.menuStore.manyVsOneActivated()

    return isOneVsOne || (isManyVsOne && this.teamMemberOnEdit())
  })

  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.evs }
  })

  modifiedHp = computed(() => Math.floor((this.pokemon().hp * this.pokemon().hpPercentage) / 100))

  hasModifiedStat = computed(() => {
    return (
      this.modifiedHp() != this.pokemon().hp ||
      this.modifiedAtk() != this.pokemon().atk ||
      this.modifiedDef() != this.pokemon().def ||
      this.modifiedSpa() != this.pokemon().spa ||
      this.modifiedSpd() != this.pokemon().spd ||
      this.modifiedSpe() != this.pokemon().spe
    )
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

  isHpOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && optimized.hp !== 0 && !this.hasNoSolution()
  })

  isDefOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && optimized.def !== 0 && !this.hasNoSolution()
  })

  isSpdOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && optimized.spd !== 0 && !this.hasNoSolution()
  })

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

    if (this.optimizationStatus() === "success") {
      this.optimizationDiscarded.emit()
    }
  }

  toggleSpsMode() {
    this.store.toggleSpsMode()
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

  isMegaStone() {
    return this.megaStoneService.isMegaStone(this.pokemon().item)
  }

  isMegaStoneCompatible() {
    return this.megaStoneService.isMegaStoneCompatible(this.pokemon().name, this.pokemon().item)
  }

  getMegaStoneSprite() {
    return this.megaStoneService.getMegaStoneSprite(this.pokemon().item)
  }

  toggleMega() {
    this.megaStoneService.toggleMega(this.effectiveRealId(), this.pokemon().name, this.pokemon().item)
  }

  blurActiveInput() {
    const active = document.activeElement as HTMLElement | null
    active?.blur()
  }
}
