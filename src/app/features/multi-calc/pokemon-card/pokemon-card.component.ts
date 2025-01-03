import { NgStyle } from "@angular/common"
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
  imports: [MatCard, NgStyle, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatTooltip, MatIcon, MatCardMdImage]
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

  cardStyle(): any {
    const cardStyleSelectPokemon = { "background-color": "#e7def6" }
    const cardStyle = { "background-color": this.cardColor(this.damageResult().koChance) }
    const cardWithBorder = { border: "4px", "border-style": "solid", "border-color": "#8544ee" }

    if (this.target().active && this.target().pokemon.isDefault) {
      return { ...cardStyleSelectPokemon, ...cardWithBorder }
    }

    if (this.target().pokemon.isDefault) {
      return cardStyleSelectPokemon
    }

    if (this.target().active) {
      return { ...cardStyle, ...cardWithBorder }
    }

    return cardStyle
  }

  private cardColor(koChance: string) {
    if (koChance == "guaranteed OHKO") {
      return "#dbd8e3" //gray
    }

    if (koChance.includes("chance to OHKO")) {
      return "#f33d42" //red
    }

    if (koChance.includes("2HKO")) {
      return "#fe9901" //yellow
    }

    return "#30ca2e" //green
  }
}
