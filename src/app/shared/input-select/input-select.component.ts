import { NgClass } from "@angular/common"
import { booleanAttribute, Component, computed, input, model, output } from "@angular/core"
import { MatOption, MatSelect, MatSelectChange, MatSelectTrigger } from "@angular/material/select"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"

@Component({
  selector: "app-input-select",
  imports: [NgClass, MatSelect, MatOption, MatSelectTrigger],
  templateUrl: "./input-select.component.html",
  styleUrl: "./input-select.component.scss"
})
export class InputSelectComponent {
  value = model.required<string>()

  allValues = input.required({ transform: this.adjustAllValuesInput })

  label = input<string>()
  leftLabel = input(false, { transform: booleanAttribute })
  disabled = input(false)
  haveFocus = input(false)
  displayMap = input<Record<string, string>>()

  selected = output()

  displayLabel = computed(() => {
    const currentValue = this.value()
    const map = this.displayMap()

    if (map && map[currentValue]) {
      return map[currentValue]
    }

    const selectedItem = this.allValues().find(item => item.value === currentValue)
    return selectedItem?.key ?? currentValue
  })

  selectionChange(event: MatSelectChange) {
    this.value.set(event.value)
  }

  private adjustAllValuesInput(value: string[] | KeyValuePair[]): KeyValuePair[] {
    if (typeof value[0] === "string") {
      return value.map(x => ({ key: x, value: x }) as KeyValuePair)
    } else {
      return value as KeyValuePair[]
    }
  }
}
