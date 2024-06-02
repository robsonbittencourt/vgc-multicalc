import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Target } from 'src/lib/target';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() 
  target: Target

  @Input()
  canSelectSecondPokemon: boolean

  @Output() 
  targetActivated = new EventEmitter<number>()

  @Output() 
  secondTargetActivated = new EventEmitter<number>()

  @Output() 
  pokemonRemoved = new EventEmitter<number>()

  @Output() 
  targetChanged = new EventEmitter<Target>()

  commanderActivated = false

  activate() {
    this.targetActivated.emit(this.target.position)
  }

  toogleCommanderAbility(event: Event) {
    event.stopPropagation()
    this.target.pokemon.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
    this.targetChanged.emit()
  }

  removePokemon() {
    this.pokemonRemoved.emit(this.target.position)
  }

  cardStyle(): any {
    if(this.target.damageResult) {
      return this.styleWithDamage()
    } else {
      return this.styleWithoutDamage()
    }
  }

  private styleWithDamage(): any {
    const cardStyleSelectPokemon = { 'background-color': '#e7def6' }
    const cardStyle = { 'background-color': this.cardColor(this.target.damageResult.koChance) }
    const cardWithBorder = { 'border': '4px', 'border-style': 'solid', 'border-color': '#8544ee' }

    if (this.target.active && this.target.pokemon.isDefault()) {
      return {...cardStyleSelectPokemon, ...cardWithBorder} 
    }

    if (this.target.pokemon.isDefault()) {
      return cardStyleSelectPokemon 
    }
    
    if (this.target.active) {
      return {...cardStyle, ...cardWithBorder}
    }

    return cardStyle
  }

  private styleWithoutDamage() {
    const cardStyle = { 'border': '3px', 'border-style': 'solid', 'border-color': '#8544ee' }
    
    if (this.target.active) {
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
    this.secondTargetActivated.emit(this.target.position)
  }

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    if (this.target.pokemon.isTerapagos()) return 

    const teraActived = !this.target.pokemon.teraTypeActive
    this.target.pokemon.changeTeraStatus(teraActived)

    this.targetChanged.emit(this.target)
  }
}
