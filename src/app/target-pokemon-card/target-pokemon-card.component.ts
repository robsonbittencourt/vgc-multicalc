import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { Target } from 'src/lib/target';

@Component({
  selector: 'app-target-pokemon-card',
  templateUrl: './target-pokemon-card.component.html',
  styleUrls: ['./target-pokemon-card.component.scss']
})
export class TargetPokemonCardComponent {

  private differ: KeyValueDiffer<string, any>

  commanderActivated = false

  @Input() 
  target: Target

  @Input()
  canShowAsActivated: boolean

  @Output() 
  targetChangedEvent = new EventEmitter<Target>()

  @Output() 
  targetRemovedEvent = new EventEmitter<Target>()

  @Output() 
  targetActivatedEvent = new EventEmitter<Target>()

  constructor(private differs: KeyValueDiffers) {}

  ngOnInit() {
    this.differ = this.differs.find(this.target.pokemon).create()
  }

  ngDoCheck() {
    const changed = this.differ.diff(this.target.pokemon)
    
    if (changed) {
      this.targetChangedEvent.emit(this.target)
    }
  }

  activate() {
    this.target.active = true
    this.targetActivatedEvent.emit(this.target)
  }

  toogleCommanderAbility() {
    this.target.pokemon.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
    this.targetChangedEvent.emit(this.target)
  }

  terastalyzePokemon() {
    const teraActived = !this.target.pokemon.teraTypeActive
    this.target.pokemon.changeTeraStatus(teraActived)

    this.targetChangedEvent.emit(this.target)
  }

  removePokemon() {
    this.targetRemovedEvent.emit(this.target)
  }

  cardStyle(): any {
    const cardStyleSelectPokemon = { 'background-color': '#e7def6' }
    const cardStyle = { 'background-color': this.cardColor(this.target.damageResult.koChance) }
    const cardWithBorder = { 'border': '4px', 'border-style': 'solid', 'border-color': '#8544ee' }

    if (this.target.active && this.target.pokemon.isDefault()) {
      return {...cardStyleSelectPokemon, ...cardWithBorder} 
    }

    if (this.target.pokemon.isDefault()) {
      return cardStyleSelectPokemon 
    }
    
    if (this.target.active && this.canShowAsActivated) {
      return {...cardStyle, ...cardWithBorder}
    }

    return cardStyle
  }

  cardColor(koChance: String) {
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
