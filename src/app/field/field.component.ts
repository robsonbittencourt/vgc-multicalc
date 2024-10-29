import { Component, EventEmitter, KeyValueDiffer, KeyValueDiffers, Output, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { DataStore } from '../../lib/data-store.service';

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
    standalone: true,
    imports: [MatButtonToggleGroup, MatButtonToggle]
})
export class FieldComponent {
  
  @Output() 
  fieldChangedEvent = new EventEmitter<any>()

  data = inject(DataStore)
  private differs = inject(KeyValueDiffers)
  private differsFieldAttacker = inject(KeyValueDiffers)
  private differsFieldDefender = inject(KeyValueDiffers)
  private differsFieldCritical = inject(KeyValueDiffers)

  private differField: KeyValueDiffer<string, any>
  private differFieldAttacker: KeyValueDiffer<string, any>
  private differFieldDefender: KeyValueDiffer<string, any>
  private differExtraFieldOptions: KeyValueDiffer<string, any>

  ngOnInit() {
    this.differField = this.differs.find(this.data.field).create()
    this.differFieldAttacker = this.differsFieldAttacker.find(this.data.field.attackerSide).create()
    this.differFieldDefender = this.differsFieldDefender.find(this.data.field.defenderSide).create()
    this.differExtraFieldOptions = this.differsFieldCritical.find(this.data.extraFieldOptions).create()
  }

  ngDoCheck() {
    const changed = this.differField.diff(this.data.field) ||
      this.differFieldAttacker.diff(this.data.field.attackerSide) ||
      this.differFieldDefender.diff(this.data.field.defenderSide) ||
      this.differExtraFieldOptions.diff(this.data.extraFieldOptions)
    
    if (changed) {
      this.fieldChangedEvent.emit()
    }
  }

  oSingleTargetChance(singleTarget: boolean) {
    this.data.field.gameType = singleTarget ? 'Singles' : 'Doubles'
  }

  toggleChangeWeather(change: MatButtonToggleChange) {
    const toggle = change.source
    
    if(change.value.some((item: any) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [change.source.value]
    }
    
    this.data.field.weather = toggle.buttonToggleGroup.value[0]
  }

  toggleChangeTerrain(change: MatButtonToggleChange) {
    const toggle = change.source
    
    if(change.value.some((item: any) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [change.source.value]
    }
    
    this.data.field.terrain = toggle.buttonToggleGroup.value[0]
  }

}
