import { Component, EventEmitter, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { Field } from '@smogon/calc';

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

  field = new Field({
    gameType: 'Doubles'
  })

  criticalHit = false

  attackerStatusCondition = ""
  defenderStatusCondition = ""
  statusConditions = [
    "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]  

  panelOpenState = false
  mobile = false

  private differField: KeyValueDiffer<string, any>
  private differFieldAttacker: KeyValueDiffer<string, any>
  private differFieldDefender: KeyValueDiffer<string, any>
  
  constructor(private differs: KeyValueDiffers,  private differsFieldAttacker: KeyValueDiffers, private differsFieldDefender: KeyValueDiffers) {
    this.differField = this.differs.find(this.field).create()
    this.differFieldAttacker = this.differsFieldAttacker.find(this.field.attackerSide).create()
    this.differFieldDefender = this.differsFieldDefender.find(this.field.defenderSide).create()
  }

  ngOnInit() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      this.mobile = true;
    }
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

}
