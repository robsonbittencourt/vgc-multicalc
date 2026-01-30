import { Component, computed, effect, inject, signal, viewChild } from "@angular/core"
import { CopyButtonComponent } from "@basic/copy-button/copy-button.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { PokemonTabComponent } from "@features/team/pokemon-tab/pokemon-tab.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DefensiveEvOptimizerService } from "@lib/ev-optimizer/defensive-ev-optimizer.service"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Stats } from "@lib/types"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  imports: [PokemonComboBoxComponent, PokemonTabComponent, PokemonBuildMobileComponent, FieldComponent, CopyButtonComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent]
})
export class SimpleCalcMobileComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)

  pokemonBuildMobile = viewChild.required(PokemonBuildMobileComponent)

  leftIsAttacker = signal(true)
  rightIsAttacker = computed(() => !this.leftIsAttacker())

  attacker = computed(() => (this.leftIsAttacker() ? this.store.leftPokemon() : this.store.rightPokemon()))

  opponent = computed(() => {
    if (this.leftIsAttacker()) {
      return this.store.rightPokemon()
    } else {
      return this.store.leftPokemon()
    }
  })

  optimizedEvs = signal<Stats | null>(null)
  optimizedNature = signal<string | null>(null)
  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")

  damageResult = computed(() => {
    if (this.leftIsAttacker()) {
      return this.damageCalculator.calcDamage(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field())
    } else {
      return this.damageCalculator.calcDamage(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field())
    }
  })

  lastHandledLeftPokemonName = ""
  lastHandledLeftAbilityName = ""
  lastHandledRightPokemonName = ""
  lastHandledRightAbilityName = ""

  constructor() {
    effect(() => {
      const leftPokemonChanged = this.lastHandledLeftPokemonName != this.store.leftPokemon().name || this.lastHandledLeftAbilityName != this.store.leftPokemon().ability.name
      const rightPokemonChanged = this.lastHandledRightPokemonName != this.store.rightPokemon().name || this.lastHandledRightAbilityName != this.store.rightPokemon().ability.name

      if (leftPokemonChanged || rightPokemonChanged) {
        this.lastHandledLeftPokemonName = this.store.leftPokemon().name
        this.lastHandledLeftAbilityName = this.store.leftPokemon().ability.name

        this.lastHandledRightPokemonName = this.store.rightPokemon().name
        this.lastHandledRightAbilityName = this.store.rightPokemon().ability.name

        this.automaticFieldService.checkAutomaticField(this.store.leftPokemon(), leftPokemonChanged, this.store.rightPokemon(), rightPokemonChanged)
      }
    })
  }

  activateLeftPokemon() {
    if (this.optimizedEvs() !== null) {
      this.pokemonBuildMobile().discardOptimization()
      return
    }

    this.leftIsAttacker.set(true)
  }

  activateRightPokemon() {
    if (this.optimizedEvs() !== null) {
      this.pokemonBuildMobile().discardOptimization()
      return
    }

    this.leftIsAttacker.set(false)
  }

  pokemonChanged() {
    // leftIsAttacker already determines which Pokemon is active
    // No need to set anything here since attacker is computed
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = pokemon as Pokemon

    if (this.leftIsAttacker()) {
      this.store.changeLeftPokemon(singlePokemon)
    } else {
      this.store.changeRightPokemon(singlePokemon)
    }
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean }) {
    const defender = this.attacker()
    const attacker = this.opponent()
    const field = this.fieldStore.field()

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature, event.keepOffensiveEvs)

    this.store.evs(defender.id, result.evs)

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }

    this.optimizedEvs.set(result.evs)
    this.optimizedNature.set(result.nature)
  }

  handleOptimizationApplied() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
  }

  handleOptimizationDiscarded() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
  }

  handleEvsCleared() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
  }
}
