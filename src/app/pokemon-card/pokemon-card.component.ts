import { NgStyle } from '@angular/common'
import { Component, inject, input, output } from '@angular/core'
import { MatCard, MatCardMdImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { DataStore } from 'src/data/data-store'
import { Target } from 'src/lib/target'

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [MatCard, NgStyle, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatTooltip, MatIcon, MatCardMdImage]
})
export class PokemonCardComponent {

  target = input.required<Target>()
  isAttacker = input.required<boolean>()
  showDamageDescription = input.required<boolean>()
  canSelectSecondPokemon = input.required<boolean>()

  targetActivated = output<string>()
  secondTargetActivated = output<string>()
  targetRemoved = output()

  data = inject(DataStore)

  activate() {
    const updatedTargets = this.data.targets().map(target => new Target(target.pokemon, target.pokemon.id === this.target().pokemon.id))
    const activeTarget = updatedTargets.find(target => target.active)!

    this.data.updateTargets(updatedTargets)
    this.targetActivated.emit(activeTarget.pokemon.id)
  }

  removePokemon() {
    const updatedTargets = this.data.targets().filter(target => target.pokemon.id != this.target().pokemon.id)

    this.data.updateTargets(updatedTargets)
    this.targetRemoved.emit()
  }

  cardStyle(): any {
    if(this.target().damageResult) {
      return this.styleWithDamage()
    } else {
      return this.styleWithoutDamage()
    }
  }

  private styleWithDamage(): any {
    const cardStyleSelectPokemon = { 'background-color': '#e7def6' }
    const cardStyle = { 'background-color': this.cardColor(this.target().damageResult.koChance) }
    const cardWithBorder = { 'border': '4px', 'border-style': 'solid', 'border-color': '#8544ee' }

    if (this.target().active && this.target().pokemon.isDefault()) {
      return {...cardStyleSelectPokemon, ...cardWithBorder} 
    }

    if (this.target().pokemon.isDefault()) {
      return cardStyleSelectPokemon 
    }
    
    if (this.target().active) {
      return {...cardStyle, ...cardWithBorder}
    }

    return cardStyle
  }

  private styleWithoutDamage() {
    const cardStyle = { 'border': '3px', 'border-style': 'solid', 'border-color': '#8544ee' }
    
    if (this.target().active) {
      return cardStyle
    }

    return null
  }

  private cardColor(koChance: String) {
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

  addSecondAttacker(event: Event) {
    event.stopPropagation()
    this.secondTargetActivated.emit(this.target().pokemon.id)
  }

  toogleCommanderAbility(event: Event) {
    event.stopPropagation()
    this.data.toogleTargetCommander(this.target())
  }

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    if (!this.target().pokemon.isTerapagos()) {
      this.data.toogleTargetTerastal(this.target())

      if (this.target().pokemon.isOgerpon()) {
        this.target().pokemon.changeTeraStatus(!this.target().pokemon.teraTypeActive)
        this.data.updateTargetAbility(this.target())
      }
    }    
  }
}
