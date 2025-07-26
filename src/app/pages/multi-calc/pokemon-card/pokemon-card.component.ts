import { animate, style, transition, trigger } from "@angular/animations"
import { CdkDrag, CdkDragHandle, CdkDragPlaceholder } from "@angular/cdk/drag-drop"
import { Component, computed, inject, input, output } from "@angular/core"
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
import { PokemonHpBadgeComponent } from "@pages/simple-calc/pokemon-hp-badge/pokemon-hp-badge.component"

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
  animations: [trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("300ms ease-out", style({ opacity: 1 }))])])],
  imports: [CdkDrag, CdkDragPlaceholder, CdkDragHandle, MatIcon, MatTooltip, TatsugiriButtonComponent, TerastalButtonComponent, BoosterEnergyButtonComponent, PokemonHpBadgeComponent, PokemonComboBoxComponent, CopyButtonComponent]
})
export class PokemonCardComponent {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)

  damageResult = input.required<DamageResult>()
  isAttacker = input.required<boolean>()
  rollLevelConfig = input.required<RollLevelConfig>()

  targetActivated = output<string>()
  targetSelected = output<string>()
  targetRemoved = output()
  attackersSeparated = output<string>()

  canDrag = computed(() => !this.isAttacker() || this.damageResult().secondAttacker)
  damageTaken = computed(() => {
    if (this.isDefaultAttacker()) return 0
    return this.damageResult().damageByRollConfig(this.rollLevelConfig())
  })

  isDefaultAttacker = computed(() => this.damageResult().attacker.isDefault)
  isDefaultDefender = computed(() => this.damageResult().defender.isDefault)

  defender = computed(() => this.damageResult().defender)

  moveCardSelector = computed(() => `move-card-${this.damageResult().attacker.displayName}`)
  separateCardSelector = computed(() => `separate-opponent-${this.damageResult().attacker.displayName}`)
  defenderSelector = computed(() => `select-defender-${this.defender().displayName}`)
  attackerSelector = computed(() => `select-attacker-${this.damageResult().attacker.displayName}`)
  secondAttackerSelector = computed(() => `select-second-attacker-${this.damageResult().secondAttacker?.displayName}`)

  target = computed(() => {
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

  evsDescription(): string {
    const pokemon = this.damageResult().defender
    let evsDescription = ""

    if (pokemon.evs.hp != 0) evsDescription += `hp: ${pokemon.evs.hp} `
    if (pokemon.evs.def != 0) evsDescription += `def: ${pokemon.evs.def} `
    if (pokemon.evs.spd != 0) evsDescription += `spd: ${pokemon.evs.spd} `

    return evsDescription != "" ? `Bulk: ${evsDescription}` : "Bulk: --"
  }

  separateAttackers() {
    this.attackersSeparated.emit(this.damageResult().secondAttacker!.id)
  }
}
