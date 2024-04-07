import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Field, StatsTable } from '@smogon/calc';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Output() 
  fieldChangedEvent = new EventEmitter<Field>();

  @Output() 
  criticalHitChangedEvent = new EventEmitter<boolean>();

  @Output() 
  attackerStatusChangedEvent = new EventEmitter<string>();

  @Output() 
  defenderStatusChangedEvent = new EventEmitter<string>();

  @Output() 
  statsModifiersChangedEvent = new EventEmitter<StatsTable>();

  field = new Field({
    gameType: 'Doubles'
  })

  criticalHit = false

  attackerStatusCondition = ""
  defenderStatusCondition = ""
  statusConditions = [
    "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  boosts: StatsTable = {
    hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0
  }

  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]
  
  private differField: KeyValueDiffer<string, any>
  private differFieldAttacker: KeyValueDiffer<string, any>
  private differFieldDefender: KeyValueDiffer<string, any>
  
  constructor(private differs: KeyValueDiffers,  private differsFieldAttacker: KeyValueDiffers, private differsFieldDefender: KeyValueDiffers) {
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
    this.criticalHit = criticalHit
    this.criticalHitChangedEvent.emit(criticalHit)
  }

  oSingleTargetChance(singleTarget: boolean) {
    this.field.gameType = singleTarget ? 'Singles' : 'Doubles'
  }

  onAttackerStatusChange(status: string) {
    const statusCode = this.statusConditionCode(status)
    this.attackerStatusChangedEvent.emit(statusCode)
  }

  onDefenderStatusChange(status: string) {
    const statusCode = this.statusConditionCode(status)
    this.defenderStatusChangedEvent.emit(statusCode)
  }

  private statusConditionCode(status: string): string | undefined {
    const statusConditions = [
      { code: "slp", status: "Sleep"},
      { code: "psn", status: "Poison"},
      { code: "brn", status: "Burn"},
      { code: "frz", status: "Freeze"},
      { code: "par", status: "Paralysis"}
    ]

    return statusConditions.find(s => s.status === status)?.code
  }

  statsModifiersChanges() {
    this.statsModifiersChangedEvent.emit(this.boosts)
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
