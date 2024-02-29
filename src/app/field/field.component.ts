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

  field = new Field({
    gameType: 'Doubles'
  })

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

}
