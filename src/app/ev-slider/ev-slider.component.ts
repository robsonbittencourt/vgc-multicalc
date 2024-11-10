import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
    selector: 'app-ev-slider',
    templateUrl: './ev-slider.component.html',
    styleUrls: ['./ev-slider.component.scss'],
    standalone: true,
    imports: [MatFormField, MatSuffix, ReactiveFormsModule, MatInput, FormsModule, MatSelect, MatOption, MatLabel, MatSlider, MatSliderThumb]
})
export class EvSliderComponent {

  hpPercentageValue: number = 100
  evValue: number | undefined = 0
  ivValue: number | undefined = 0
  statsModifierValue: number
  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]

  @Input()
  get hpPercentage(): number {
    return this.hpPercentageValue
  }

  @Output()
  hpPercentageChange = new EventEmitter<number>()

  set hpPercentage(hpPercentage: number) {
    this.hpPercentageValue = hpPercentage
    this.hpPercentageChange.emit(this.hpPercentageValue)
  }

  @Input()
  get ev(): number | undefined {
    return this.evValue
  }

  @Output()
  evChange = new EventEmitter<number | undefined>()

  @Output()
  evChangedEvent = new EventEmitter<number>()

  @Output()
  ivChangedEvent = new EventEmitter<number>()

  @Output()
  beforeEvChangedEvent = new EventEmitter<number>()

  set ev(ev: number | undefined) {
    this.evValue = ev
    this.evChange.emit(this.evValue)
  }

  @Input()
  get iv(): number | undefined {
    return this.ivValue
  }

  set iv(iv: number | undefined) {
    this.ivValue = iv
    this.ivChange.emit(this.ivValue)
  }

  @Output()
  ivChange = new EventEmitter<number | undefined>()

  @Input()
  get statsModifier(): number {
    return this.statsModifierValue
  }

  @Output()
  statsModifierChange = new EventEmitter<number>()

  set statsModifier(statsModifier: number) {
    this.statsModifierValue = statsModifier
    this.statsModifierChange.emit(this.statsModifier)
  }

  @Input()
  statName: string

  @Input()
  statNameAcronym: string

  @Input()
  statValue: number

  @Input()
  nature: string

  @Input()
  baseStatValue: number

  @Input()
  showIv: boolean = true

  EV_ZERO = 0
  FIRST_EV = 4

  hpPercentageChanged() {
    this.hpPercentageChange.emit(this.hpPercentage)
  }

  evChanged() {
    this.evChangedEvent.emit(this.ev)
  }

  beforeEvChanged() {
    this.beforeEvChangedEvent.emit(this.ev)
  }

  calculateMin(evValue: number | undefined) {
    if (evValue == this.EV_ZERO || evValue == this.FIRST_EV) return 0
    
    return 4
  }

  calculateEvStep(evValue: number | undefined) {
    if (evValue == this.EV_ZERO) return 4
    if (evValue == this.FIRST_EV) return 6
    
    return 8
  }

  showStatsModifier(): boolean {
    return this.statName != "HP" && this.statNameAcronym != "HP"
  }

  natureModifier(): string {
    if (this.statName == "Attack" && ["Lonely", "Adamant", "Naughty", "Brave"].includes(this.nature)) return "+"
    if (this.statName == "Attack" && ["Bold", "Modest", "Calm", "Timid"].includes(this.nature)) return "-"

    if (this.statName == "Defense" && ["Bold", "Impish", "Lax", "Relaxed"].includes(this.nature)) return "+"
    if (this.statName == "Defense" && ["Lonely", "Mild", "Gentle", "Hasty"].includes(this.nature)) return "-"

    if (this.statName == "Sp. Atk." && ["Modest", "Mild", "Rash", "Quiet"].includes(this.nature)) return "+"
    if (this.statName == "Sp. Atk." && ["Adamant", "Impish", "Careful", "Jolly"].includes(this.nature)) return "-"

    if (this.statName == "Sp. Def." && ["Calm", "Gentle", "Careful", "Sassy"].includes(this.nature)) return "+"
    if (this.statName == "Sp. Def." && ["Naughty", "Lax", "Rash", "Naive"].includes(this.nature)) return "-"

    if (this.statName == "Speed" && ["Timid", "Hasty", "Jolly", "Naive"].includes(this.nature)) return "+"
    if (this.statName == "Speed" && ["Brave", "Relaxed", "Quiet", "Sassy"].includes(this.nature)) return "-"
    
    return ""
  }

}
