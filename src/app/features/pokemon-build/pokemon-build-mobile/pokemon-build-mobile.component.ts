import { NgClass } from "@angular/common"
import { Component, computed, effect, inject, input, output, signal, ViewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@features/pokemon-build/item-combo-box/item-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { PokemonMovesMobileComponent } from "@features/pokemon-build/pokemon-moves-mobile/pokemon-moves-mobile.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { TeamMember } from "@lib/model/team-member"
import { Team } from "@lib/model/team"
import { defaultPokemon } from "@lib/default-pokemon"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { Pokemon } from "@lib/model/pokemon"
import { getFinalAttack, getFinalSpecialAttack } from "@lib/smogon/stat-calculator/atk-spa/modified-atk-spa"
import { getFinalDefense, getFinalSpecialDefense } from "@lib/smogon/stat-calculator/def-spd/modified-def-spd"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { Stats, SurvivalThreshold } from "@lib/types"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [
    NgClass,
    MatButton,
    MatCheckbox,
    MatIcon,
    FormsModule,
    AbilityComboBoxComponent,
    EvSliderComponent,
    TeraComboBoxComponent,
    StatusComboBoxComponent,
    ItemComboBoxComponent,
    NatureComboBoxComponent,
    InputSelectComponent,
    PokemonMovesMobileComponent,
    PokemonComboBoxComponent,
    ImportPokemonButtonComponent,
    ExportPokemonButtonComponent
  ]
})
export class PokemonBuildMobileComponent {
  @ViewChild(PokemonComboBoxComponent) pokemonComboBox?: PokemonComboBoxComponent
  pokemonId = input.required<string>()
  optimizationStatus = input<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)
  showOptimization = input<boolean>(true)
  showHeader = input<boolean>(true)
  showDelete = input<boolean>(true)
  manageTeamState = input<boolean>(true)

  pokemonImportedEvent = output<Pokemon | Pokemon[]>()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()
  evsCleared = output<void>()
  pokemonDeleted = output<string | null>()
  MAX_EVS = 508

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  menuStore = inject(MenuStore)
  private exportPokeService = inject(ExportPokeService)

  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")
  updateNature = signal<boolean>(false)
  keepOffensiveEvs = signal<boolean>(false)
  survivalThreshold = signal<string>("2")

  thresholdOptions = [
    { key: "2HKO", value: "2" },
    { key: "3HKO", value: "3" },
    { key: "4HKO", value: "4" }
  ]

  modifiedAtk = signal<number>(0)
  modifiedDef = signal<number>(0)
  modifiedSpa = signal<number>(0)
  modifiedSpd = signal<number>(0)
  modifiedSpe = signal<number>(0)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  teamMembers = computed(() => this.store.team().teamMembers)

  teamMemberOnEdit = computed(() => {
    const editId = this.pokemonId()

    if (!editId) return false

    return this.teamMembers().some(m => m.pokemon.id === editId)
  })

  canImportPokemon = computed(() => this.teamMembers().length < 6)
  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.evs }
  })

  hasNoSolution = computed(() => {
    return this.optimizationStatus() === "no-solution"
  })

  isSolutionNotNeeded = computed(() => {
    return this.optimizationStatus() === "not-needed"
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

  clearEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    this.evsCleared.emit()
  }

  optimizeEvs() {
    const defender = this.store.findPokemonById(this.pokemonId())
    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    this.optimizeRequested.emit({
      updateNature: this.updateNature(),
      keepOffensiveEvs: this.keepOffensiveEvs(),
      survivalThreshold: Number(this.survivalThreshold()) as SurvivalThreshold
    })
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

  focus() {
    this.pokemonComboBox?.focus()
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    if (this.manageTeamState()) {
      if (Array.isArray(pokemon)) {
        if (pokemon.length > 0) {
          const teamMembers = pokemon.map((p, index) => new TeamMember(p, index === 0))
          const newTeam = new Team(crypto.randomUUID(), true, "Imported Team", teamMembers)
          this.store.replaceActiveTeam(newTeam)
        }

        return
      }

      if (this.canImportPokemon()) {
        this.store.addTeamMember(pokemon)
      }
    }

    this.pokemonImportedEvent.emit(pokemon)
  }

  removeActivePokemon() {
    const idToRemove = this.pokemonId()
    let nextId: string | null = null

    if (!idToRemove) return

    if (this.manageTeamState()) {
      if (this.teamMembers().length > 1) {
        nextId = this.teamMembers().find(m => m.pokemon.id !== idToRemove)?.pokemon.id || null

        if (nextId) {
          const nextIndex = this.teamMembers().findIndex(m => m.pokemon.id === nextId)
          this.store.activateTeamMember(nextIndex)
        }

        this.store.removeTeamMember(idToRemove)
      } else {
        this.store.changePokemon(idToRemove, defaultPokemon())
        nextId = idToRemove
      }
    }

    this.pokemonDeleted.emit(nextId)
  }
}
