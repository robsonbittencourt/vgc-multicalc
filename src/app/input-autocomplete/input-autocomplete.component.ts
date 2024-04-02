import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent {

  valueStorage: string
  formControl: FormControl
  filteredValues: Observable<string[]>

  @Input()
  get value(): string {
    return this.valueStorage
  }

  @Output()
  valueChange = new EventEmitter<string>()

  set value(value: string) {
    this.valueStorage = value
    this.formControl?.setValue(value)
    this.valueChange.emit(this.valueStorage);
  }

  @Input()
  allValues: string[]

  ngOnInit() {
    this.formControl = new FormControl(this.valueStorage)
    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '', this.allValues))
    )    
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
