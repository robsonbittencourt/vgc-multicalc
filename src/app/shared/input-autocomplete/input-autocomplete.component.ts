import { AsyncPipe, NgClass } from "@angular/common"
import { booleanAttribute, Component, effect, ElementRef, input, model, OnInit, output, viewChild } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete"
import { MatOption } from "@angular/material/core"
import { MatIcon } from "@angular/material/icon"
import { Observable } from "rxjs"
import { map, startWith } from "rxjs/operators"

export interface KeyValuePair {
  key: string
  value: string
}

@Component({
  selector: "app-input-autocomplete",
  templateUrl: "./input-autocomplete.component.html",
  styleUrls: ["./input-autocomplete.component.scss"],
  imports: [FormsModule, ReactiveFormsModule, MatAutocompleteTrigger, MatAutocomplete, MatOption, MatIcon, AsyncPipe, NgClass]
})
export class InputAutocompleteComponent implements OnInit {
  value = model.required<string>()

  allValues = input.required({
    transform: this.adjustAllValuesInput
  })

  label = input<string>()

  leftLabel = input(false, { transform: booleanAttribute })

  disabled = input(false)

  enableClear = input(false)

  cleared = output()

  autoCompleteInput = viewChild<ElementRef>("autoCompleteInput")

  formControl: FormControl
  filteredValues: Observable<KeyValuePair[]>
  actualFilteredValues: KeyValuePair[]

  constructor() {
    effect(() => this.formControl.setValue(this.value()))

    effect(() => (this.disabled() ? this.formControl.disable() : this.formControl?.enable()))
  }

  ngOnInit() {
    this.formControl = new FormControl(this.value())

    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(""),
      map(value => this.filter(value || "", this.allValues()))
    )

    this.filteredValues.subscribe(x => {
      this.actualFilteredValues = x
    })
  }

  onClick() {
    this.formControl.setValue("")
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
    queueMicrotask(() => {
      this.autoCompleteInput()!.nativeElement.blur()
    })
  }

  private adjustAllValuesInput(value: string[] | KeyValuePair[]): KeyValuePair[] {
    if (typeof value[0] === "string") {
      return value.map(x => ({ key: x, value: x }) as KeyValuePair)
    } else {
      return value as KeyValuePair[]
    }
  }

  private filter(value: string, values: KeyValuePair[]): KeyValuePair[] {
    if (!values) return []

    const filterValue = this.normalizeValue(value)

    const startsWithMatch = values.filter(v => this.normalizeValue(v.key).startsWith(filterValue))
    const containsMatch = values.filter(v => !this.normalizeValue(v.key).startsWith(filterValue) && this.normalizeValue(v.key).includes(filterValue))

    return [...startsWithMatch, ...containsMatch]
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "")
  }
}
