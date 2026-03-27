import { CdkDrag, CdkDragHandle, CdkDragPlaceholder } from "@angular/cdk/drag-drop"
import { Component, computed, inject, input, model, output } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { CopyButtonComponent } from "@basic/copy-button/copy-button.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { BoosterEnergyButtonComponent } from "@features/buttons/booster-energy-button/booster-energy-button.component"
import { TatsugiriButtonComponent } from "@features/buttons/tatsugiri-button/tatsugiri-button.component"
import { TerastalButtonComponent } from "@features/buttons/terastal-button/terastal-button.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Target } from "@lib/model/target"
import { PokemonHpBadgeComponent } from "@pages/simple-calc/pokemon-hp-badge/pokemon-hp-badge.component"

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
  imports: [CdkDrag, CdkDragPlaceholder, CdkDragHandle, MatIcon, MatTooltip, TatsugiriButtonComponent, TerastalButtonComponent, BoosterEnergyButtonComponent, PokemonHpBadgeComponent, PokemonComboBoxComponent, CopyButtonComponent]
})
export class PokemonCardComponent {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)

  damageResult = input.required<DamageResult>()
  targetInput = input<Target | undefined>(undefined, { alias: "target" })
  isAttacker = input.required<boolean>()
  rollLevelConfig = input.required<RollLevelConfig>()
  collapsible = input<boolean>(false)

  targetActivated = output<string>()
  targetRemoved = output()
  attackersSeparated = output<string>()

  showDeleteButton = input<boolean>(true)
  expanded = model<boolean>(false)

  canDrag = computed(() => !this.isAttacker() || !!this.damageResult().secondAttacker)
  damageTaken = computed(() => {
    if (this.isDefaultAttacker()) return 0
    return this.damageResult().damageByRollConfig(this.rollLevelConfig())
  })

  isDefaultAttacker = computed(() => this.damageResult().attacker.isDefault)
  isDefaultDefender = computed(() => this.damageResult().defender.isDefault)

  collapsedDescription = computed(() => {
    const firstMove = this.damageResult().move
    const secondMove = this.damageResult().secondAttacker?.move.name
    const moveName = secondMove ? `${firstMove} + ${secondMove}` : firstMove

    const desc = this.damageResult().description
    const colonIndex = desc.indexOf(": ")

    if (colonIndex === -1) return `${moveName} - ${desc}`

    const simplified = desc.substring(colonIndex + 2)
    const koIndex = simplified.indexOf("--")

    let result = simplified

    if (koIndex !== -1) {
      const extraInfoIndex = simplified.indexOf(" - ", koIndex + 2)
      const afterIndex = simplified.indexOf(" after ", koIndex + 2)

      const truncateAt = extraInfoIndex !== -1 && afterIndex !== -1 ? Math.min(extraInfoIndex, afterIndex) : extraInfoIndex !== -1 ? extraInfoIndex : afterIndex

      if (truncateAt !== -1) {
        result = simplified.substring(0, truncateAt)
      }
    }

    return `${moveName} - ${result}`
  })

  defender = computed(() => this.damageResult().defender)
  pokemonOnCard = computed(() => this.defender())

  moveCardSelector = computed(() => `move-card-${this.damageResult().attacker.displayName}`)
  separateCardSelector = computed(() => `separate-opponent-${this.damageResult().attacker.displayName}`)
  defenderSelector = computed(() => `select-defender-${this.defender().displayName}`)
  attackerSelector = computed(() => `select-attacker-${this.damageResult().attacker.displayName}`)
  secondAttackerSelector = computed(() => `select-second-attacker-${this.damageResult().secondAttacker?.displayName}`)

  target = computed(() => {
    if (this.targetInput()) return this.targetInput()!

    if (this.menuStore.oneVsManyActivated()) {
      const pokemonId = this.damageResult().defender.id
      return this.store.targets().find(target => target.pokemon.id === pokemonId)!
    } else {
      const pokemonId = this.damageResult().attacker.id
      return this.store.targets().find(target => target.pokemon.id === pokemonId || target.secondPokemon?.id === pokemonId)!
    }
  })

  activate(pokemonId: string) {
    this.targetActivated.emit(pokemonId)
  }

  removePokemon(event: Event) {
    event.stopPropagation()
    const updatedTargets = this.store.targets().filter(target => target.pokemon.id != this.target().pokemon.id)

    this.store.updateTargets(updatedTargets)
    this.targetRemoved.emit()
  }

  toggleExpanded() {
    this.expanded.set(!this.expanded())
  }

  separateAttackers() {
    this.attackersSeparated.emit(this.damageResult().secondAttacker!.id)
  }
}
