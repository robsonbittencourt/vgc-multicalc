import { Component, Input } from '@angular/core';
import { Field } from '@smogon/calc';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions } from 'src/lib/speed-calculator/speed-calculator-options';
import { speedMeta } from 'src/lib/speed-calculator/speed-meta';


@Component({
  selector: 'app-speed-calculator-desktop',
  templateUrl: './speed-calculator-desktop.component.html',
  styleUrls: ['./speed-calculator-desktop.component.scss']
})
export class SpeedCalculatorDesktopComponent {

  @Input()
  pokemon: Pokemon

  @Input()
  field: Field

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

  ngOnInit() {
    this.allPokemonNames = speedMeta(this.options.regulation).map(s => s.name).sort()
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
