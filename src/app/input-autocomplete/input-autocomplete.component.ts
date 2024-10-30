import { AsyncPipe } from '@angular/common';
import { Component, effect, input, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface KeyValuePair {
  key: string
  value: string
}

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe
  ]
})
export class InputAutocompleteComponent {

  value = model.required<string>()

  allValues = input.required({
    transform: this.adjustAllValuesInput
  })

  disabled = input(false)

  formControl: FormControl
  filteredValues: Observable<KeyValuePair[]>
  actualFilteredValues: KeyValuePair[]  
  
  constructor() {
    effect(() => this.formControl.setValue(this.value()))
    
    effect(() => this.disabled() ? this.formControl.disable() : this.formControl?.enable())
  }

  ngOnInit() {
    this.formControl = new FormControl(this.value())

    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '', this.allValues()))
    )

    this.filteredValues.subscribe(x => {
      this.actualFilteredValues = x
    })
  }
  
  onClick() {
    this.formControl.setValue('')
  }

  onBlur() {
    if (!this.formControl.value) {
      this.formControl.setValue(this.value())
    } else {
      this.onValueSelected(this.actualFilteredValues[0].value)
    }
  }

  onValueSelected(selectedValue: string) {
    this.value.set(selectedValue)
    this.formControl.setValue(selectedValue)
  }

  private adjustAllValuesInput(value: string[] | KeyValuePair[]): KeyValuePair[] {
    if (typeof value[0] === "string") {
      return value.map(x => ({ key: x, value: x } as KeyValuePair))
    } else {
      return value as KeyValuePair[]
    }
  }

  private filter(value: string, values: KeyValuePair[]): KeyValuePair[] {
    if (!values) return []
    
    const filterValue = this.normalizeValue(value)
    return values.filter(v => this.normalizeValue(v.key).startsWith(filterValue))
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '')        
  }

}
