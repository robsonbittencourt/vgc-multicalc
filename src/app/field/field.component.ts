import { Component, EventEmitter, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { Field } from '@smogon/calc';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Output() 
  fieldChangedEvent = new EventEmitter<any>();

  field = new Field({
    gameType: 'Doubles'
  })

  private differField: KeyValueDiffer<string, any>;
  
  constructor(private differs: KeyValueDiffers) {
    this.differField = this.differs.find(this.field).create();
  }

  ngDoCheck() {
    const change = this.differField.diff(this.field);
    if (change) {
      this.fieldChangedEvent.emit(this.field)
    }
  }

}
