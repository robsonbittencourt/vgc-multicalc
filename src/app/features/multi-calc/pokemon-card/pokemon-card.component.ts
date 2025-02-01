import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { MatCard, MatCardMdImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from "@angular/material/card"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { Target } from "@lib/model/target"

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
  imports: [MatCard, NgClass, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatTooltip, MatIcon, MatCardMdImage]
})
export class PokemonCardComponent {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)

  damageResult = input.required<DamageResult>()
  isAttacker = input.required<boolean>()
  showDamageDescription = input.required<boolean>()
  canSelectSecondPokemon = input.required<boolean>()

  targetActivated = output<string>()
  secondTargetActivated = output<string>()
  targetRemoved = output()

  target = computed(() => {
    if (this.menuStore.oneVsManyActivated()) {
      const pokemonId = this.damageResult().defender.id
      return this.store.targets().find(target => target.pokemon.id === pokemonId)!
    } else {
      const pokemonId = this.damageResult().attacker.id
      return this.store.targets().find(target => target.pokemon.id === pokemonId)!
    }
  })

  koChance = computed(() => this.damageResult().koChance)

  activate() {
    if (!this.target().active) {
      const updatedTargets = this.store.targets().map(target => new Target(target.pokemon, target.pokemon.id === this.target().pokemon.id))
      const activeTarget = updatedTargets.find(target => target.active)!

      this.store.updateTargets(updatedTargets)
      this.targetActivated.emit(activeTarget.pokemon.id)
    }
  }

  removePokemon(event: Event) {
    event.stopPropagation()
    const updatedTargets = this.store.targets().filter(target => target.pokemon.id != this.target().pokemon.id)

    this.store.updateTargets(updatedTargets)
    this.targetRemoved.emit()
  }

  addSecondAttacker(event: Event) {
    event.stopPropagation()
    this.secondTargetActivated.emit(this.target().pokemon.id)
  }

  toogleCommanderAbility(event: Event) {
    event.stopPropagation()
    this.store.toogleCommanderActive(this.target().pokemon.id)
  }

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    this.store.toogleTeraTypeActive(this.target().pokemon.id)
  }

  evsDescription(): string {
    const pokemon = this.target().pokemon
    let evsDescription = ""

    if (this.isAttacker()) {
      evsDescription = "Offensive: "
      if (pokemon.evs.atk && pokemon.evs.atk != 0) evsDescription += `atk: ${pokemon.evs.atk} `
      if (pokemon.evs.spa && pokemon.evs.spa != 0) evsDescription += `spa: ${pokemon.evs.spa} `
    } else {
      evsDescription = "Bulky: "
      if (pokemon.evs.hp && pokemon.evs.hp != 0) evsDescription += `hp: ${pokemon.evs.hp} `
      if (pokemon.evs.def && pokemon.evs.def != 0) evsDescription += `def: ${pokemon.evs.def} `
      if (pokemon.evs.spd && pokemon.evs.spd != 0) evsDescription += `spd: ${pokemon.evs.spd} `
    }

    return evsDescription
  }

  cardColorClass() {
    let baseClass = "green-card"

    if (this.target().pokemon.isDefault) {
      baseClass = "select-pokemon-card"
    } else if (this.koChance() === "guaranteed OHKO") {
      baseClass = "grey-card"
    } else if (this.koChance().includes("chance to OHKO")) {
      baseClass = "red-card"
    } else if (this.koChance().includes("2HKO")) {
      baseClass = "yellow-card"
    }

    return this.target().active ? `${baseClass} border` : baseClass
  }
}
