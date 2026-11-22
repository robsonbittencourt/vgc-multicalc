import { AsyncPipe, NgClass } from "@angular/common"
import { booleanAttribute, Component, effect, ElementRef, inject, input, model, OnInit, output, untracked, viewChild } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete"
import { MatOption } from "@angular/material/core"
import { MatIcon } from "@angular/material/icon"
import { Observable } from "rxjs"
import { debounceTime, map, startWith } from "rxjs/operators"
import { uiText } from "@app/i18n/ui-text"
import { LanguageStore } from "@store/language-store"
import { TranslatePipe } from "@shared/localize/translate.pipe"
import { searchText } from "@shared/localize/search-text"

export interface KeyValuePair {
  key: string
  value: string
}

@Component({
  selector: "app-input-autocomplete",
  templateUrl: "./input-autocomplete.component.html",
  styleUrls: ["./input-autocomplete.component.scss"],
  host: {
    "[class.left-label]": "leftLabel()"
  },
  imports: [FormsModule, ReactiveFormsModule, MatAutocompleteTrigger, MatAutocomplete, MatOption, MatIcon, AsyncPipe, NgClass, TranslatePipe]
})
export class InputAutocompleteComponent implements OnInit {
  value = model.required<string>()

  allValues = input.required({
    transform: this.adjustAllValuesInput
  })

  label = input<string>()

  leftLabel = input(false, { transform: booleanAttribute })

  inputWidth = input<string>()

  labelWidth = input<string>()

  disabled = input(false)

  enableClear = input(false)

  haveFocus = input(false)

  emitOnType = input(false)

  translateValues = input(true)

  showAllOptions = input(false)

  noResultsText = input<string>()

  autocomplete = input("off")

  name = input<string>()

  cleared = output()

  selected = output()

  autoCompleteInput = viewChild<ElementRef>("autoCompleteInput")

  private languageStore = inject(LanguageStore)

  formControl: FormControl
  filteredValues: Observable<KeyValuePair[]>
  actualFilteredValues: KeyValuePair[]

  constructor() {
    effect(() => {
      const value = this.value()
      this.allValues()
      this.languageStore.language()
      untracked(() => this.formControl.setValue(this.keyOf(value)))
    })

    effect(() => (this.disabled() ? this.formControl.disable() : this.formControl?.enable()))
  }

  ngOnInit() {
    this.formControl = new FormControl(this.keyOf(this.value()))

    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(""),
      map(value => (this.showAllOptions() ? this.allValues() : this.filter(value || "", this.allValues())))
    )

    this.filteredValues.subscribe(x => {
      this.actualFilteredValues = x
    })

    if (this.emitOnType()) {
      this.formControl.valueChanges.pipe(debounceTime(150)).subscribe(value => this.value.set(value ?? ""))
    }
  }

  onClick() {
    if (this.emitOnType()) return

    this.formControl.setValue("")
  }

  onBlur() {
    if (this.emitOnType()) {
      this.value.set(this.formControl.value ?? "")

      return
    }

    if (this.formControl.value && this.formControl.value === this.keyOf(this.value())) return

    if (!this.formControl.value) {
      this.onValueSelected("")
    } else if (this.actualFilteredValues[0]) {
      this.onValueSelected(this.actualFilteredValues[0].value)
    } else {
      this.onValueSelected("")
    }
  }

  onValueSelected(selectedValue: string) {
    this.value.set(selectedValue)
    this.formControl.setValue(this.keyOf(selectedValue))
    queueMicrotask(() => {
      this.autoCompleteInput()!.nativeElement.blur()
    })
  }

  focus() {
    const element = this.autoCompleteInput()!.nativeElement
    setTimeout(() => {
      element.focus()
      element.click()
    }, 0)
  }

  private keyOf(value: string): string {
    const item = this.allValues().find(option => option.value === value)

    return item ? this.labelOf(item) : value
  }

  labelOf(item: KeyValuePair): string {
    return this.translateValues() ? uiText(item.key, this.languageStore.language()) : item.key
  }

  private adjustAllValuesInput(value: string[] | KeyValuePair[]): KeyValuePair[] {
    if (typeof value[0] === "string") {
      return value.map(x => ({ key: x, value: x }) as KeyValuePair)
    } else {
      return value as KeyValuePair[]
    }
  }

  private filter(value: string, values: KeyValuePair[]): KeyValuePair[] {
    if (!value) return values

    const filterValue = this.normalizeValue(value)

    const startsWithMatch = values.filter(v => this.normalizeValue(this.labelOf(v)).startsWith(filterValue)).sort((a, b) => this.normalizeValue(this.labelOf(a)).length - this.normalizeValue(this.labelOf(b)).length)

    const containsMatch = values
      .filter(v => !this.normalizeValue(this.labelOf(v)).startsWith(filterValue) && this.normalizeValue(this.labelOf(v)).includes(filterValue))
      .sort((a, b) => this.normalizeValue(this.labelOf(a)).length - this.normalizeValue(this.labelOf(b)).length)

    return [...startsWithMatch, ...containsMatch]
  }

  private normalizeValue(value: string): string {
    return searchText(value).replace(/\s/g, "")
  }
}
