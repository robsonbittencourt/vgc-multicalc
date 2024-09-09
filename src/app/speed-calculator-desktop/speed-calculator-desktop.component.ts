import { Component, Input } from '@angular/core';
import { Field } from '@smogon/calc';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions } from 'src/lib/speed-calculator/speed-calculator-options';

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

  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]

}
