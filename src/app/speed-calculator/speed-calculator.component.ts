import { Component, inject, output } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Pokemon } from 'src/lib/pokemon';
import { Team } from 'src/lib/team';
import { DataStore } from '../../lib/data-store.service';
import { FieldComponent } from '../field/field.component';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';
import { TeamComponent } from '../team/team.component';
import { TeamsComponent } from '../teams/teams.component';

import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { SpeedCalcOptionsStore } from 'src/data/speed-calc-options-store';
import { SpeedScaleComponent } from '../speed-scale/speed-scale.component';

@Component({
  selector: 'app-speed-calculator',
  templateUrl: './speed-calculator.component.html',
  styleUrls: ['./speed-calculator.component.scss'],
  standalone: true,
  imports: [TeamComponent, TeamsComponent, FieldComponent, InputAutocompleteComponent, MatFormField, MatSelect, MatOption, MatButtonToggleGroup, MatButtonToggle, MatIcon, SpeedScaleComponent]
})
export class SpeedCalculatorComponent {
  
  dataChangedEvent = output()

  data = inject(DataStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemon: Pokemon
  
  regulationsList: string[] = ["Reg G", "Reg H"]
  
  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]

  ngOnInit() {
    this.pokemon = this.data.activePokemon()
  }

  dataChanged() {
    this.dataChangedEvent.emit()
  }

  pokemonChanged(pokemon: Pokemon) {
    this.pokemon = pokemon
  }

  teamChanged(team: Team) {
    this.pokemon = team.activePokemon()
  }

}
