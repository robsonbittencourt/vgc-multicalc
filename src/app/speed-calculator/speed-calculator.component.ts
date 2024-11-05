import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions } from 'src/lib/speed-calculator/speed-calculator-options';
import { speedMeta } from 'src/lib/speed-calculator/speed-meta';
import { Team } from 'src/lib/team';
import { DataStore } from '../../lib/data-store.service';

@Component({
  selector: 'app-speed-calculator',
  templateUrl: './speed-calculator.component.html',
  styleUrls: ['./speed-calculator.component.scss']
})
export class SpeedCalculatorComponent {

  pokemon: Pokemon

  @Output() 
  dataChangedEvent = new EventEmitter<any>()

  options: SpeedCalculatorOptions = new SpeedCalculatorOptions()

  regulationsList: string[] = ["Reg G", "Reg H"]
  allPokemonNames: string[]
  targetName: string

  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]

  constructor(public data: DataStore) {}

  ngOnInit() {
    this.pokemon = this.data.activePokemon()
    this.allPokemonNames = speedMeta(this.options.regulation).map(s => s.name).sort()
  }

  dataChanged() {
    this.options.trickRoomActive = this.data.extraFieldOptions.trickRoom
    this.dataChangedEvent.emit()
  }

  pokemonChanged(pokemon: Pokemon) {
    this.pokemon = pokemon
  }

  teamChanged(team: Team) {
    this.pokemon = team.activePokemon()
  }

  regulationChanged(regulation: string) {
    this.options.regulation = regulation
    this.clearPokemon()
    this.allPokemonNames = speedMeta(this.options.regulation).map(s => s.name).sort()
  }

  clearPokemon() {
    this.options.targetName = ""
  }

}
