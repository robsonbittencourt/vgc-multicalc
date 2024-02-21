import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ev-slider',
  templateUrl: './ev-slider.component.html',
  styleUrls: ['./ev-slider.component.scss']
})
export class EvSliderComponent {

  evValue: number | undefined = 0 

  @Input()
  get ev(): number | undefined {
    return this.evValue
  }
  
  @Output()
  evChange = new EventEmitter<number | undefined>()

  set ev(ev: number | undefined) {
    this.evValue = ev
    this.evChange.emit(this.evValue);
  }

  @Input()
  statName: string

  @Input()
  statValue: number

  @Output()
  evChangedEvent = new EventEmitter<number>()

  @Output()
  beforeEvChangedEvent = new EventEmitter<number>()

  EV_ZERO = 0
  FIRST_EV = 4

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

}
