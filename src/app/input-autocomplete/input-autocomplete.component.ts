import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements AfterViewInit {

  valueStorage: string
  formControl: FormControl
  filteredValues: Observable<string[]>
  actualFilteredValues: string[]
  
  @ViewChild('typehead', { read: MatAutocompleteTrigger })
  autoTrigger: MatAutocompleteTrigger

  @Input()
  get value(): string {
    return this.valueStorage
  }

  @Output()
  valueChange = new EventEmitter<string>()

  @Output()
  valueManuallySelected = new EventEmitter<string>()

  @Input()
  disabled: boolean

  set value(value: string) {
    this.valueStorage = value
    this.formControl?.setValue(value)
    this.valueChange.emit(this.valueStorage)
  }

  @Input()
  allValues: string[]

  ngOnInit() {
    this.formControl = new FormControl(this.valueStorage)
    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '', this.allValues))
    )

    this.filteredValues.subscribe(x => {
      this.actualFilteredValues = x
    })
  }

  ngAfterViewInit() {
    this.autoTrigger.panelClosingActions.subscribe(() =>{
      if (this.autoTrigger.activeOption) {
        this.onValueSelected(this.autoTrigger.activeOption.value)
      } else {
        this.onValueSelected(this.actualFilteredValues[0])
      }
    })
  }

  ngOnChanges() {
    if(this.disabled) {
      this.formControl.disable()
    } else {
      this.formControl?.enable()
    }
  }
  
  onClick() {
    this.valueStorage = this.formControl.value ? this.formControl.value : ''
    this.formControl.setValue('')
  }

  onBlur(event: Event) {
    const eventValue = ((event as FocusEvent).relatedTarget as any)?.textContent
    
    if (!eventValue) {
      this.formControl.setValue(this.valueStorage)
    }    
  }

  onValueSelected(selectedValue: string) {
    this.value = selectedValue
    this.formControl.setValue(selectedValue)
    this.valueManuallySelected.emit(this.valueStorage)
  }

  private filter(value: string, values: string[]): string[] {
    if (!values) return []
    const filterValue = this.normalizeValue(value)
    return values.filter(name => this.normalizeValue(name).startsWith(filterValue))
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '')
  } 

}
