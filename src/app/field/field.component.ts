import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Field } from '@smogon/calc';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Input()
  field: Field

  @Input()
  criticalHit: boolean

  @Output() 
  fieldChangedEvent = new EventEmitter<Field>();

  @Output() 
  criticalHitChangedEvent = new EventEmitter<boolean>();

  private differField: KeyValueDiffer<string, any>
  private differFieldAttacker: KeyValueDiffer<string, any>
  private differFieldDefender: KeyValueDiffer<string, any>
  
  constructor(private differs: KeyValueDiffers,  private differsFieldAttacker: KeyValueDiffers, private differsFieldDefender: KeyValueDiffers) {}

  ngOnInit() {
    this.differField = this.differs.find(this.field).create()
    this.differFieldAttacker = this.differsFieldAttacker.find(this.field.attackerSide).create()
    this.differFieldDefender = this.differsFieldDefender.find(this.field.defenderSide).create()
  }

  ngDoCheck() {
    const changed = this.differField.diff(this.field) ||
      this.differFieldAttacker.diff(this.field.attackerSide) ||
      this.differFieldDefender.diff(this.field.defenderSide)
    
    if (changed) {
      this.fieldChangedEvent.emit(this.field)
    }
  }

  onCriticalHitChance(criticalHit: boolean) {
    this.criticalHitChangedEvent.emit(criticalHit)
  }

  oSingleTargetChance(singleTarget: boolean) {
    this.field.gameType = singleTarget ? 'Singles' : 'Doubles'
  }

  toggleChangeWeather(change: MatButtonToggleChange) {
    const toggle = change.source
    
    if(change.value.some((item: any) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [change.source.value]
    }
    
    this.field.weather = toggle.buttonToggleGroup.value[0]
  }

  toggleChangeTerrain(change: MatButtonToggleChange) {
    const toggle = change.source
    
    if(change.value.some((item: any) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [change.source.value]
    }
    
    this.field.terrain = toggle.buttonToggleGroup.value[0]
  }

}
