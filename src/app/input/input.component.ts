import { NgClass } from "@angular/common"
import { booleanAttribute, Component, input, model, output } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-input",
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss"
})
export class InputComponent {
  value = model.required<string>()

  label = input<string>()

  leftLabel = input(false, { transform: booleanAttribute })

  disabled = input(false)

  selected = output()

  onClick() {
    this.selected.emit()
  }

  onBlur() {
    // if (!this.formControl.value) {
    //   this.formControl.setValue(this.value())
    // } else {
    //   this.onValueSelected(this.actualFilteredValues[0].value)
    // }
  }

  onValueSelected(selectedValue: string) {
    this.value.set(selectedValue)
  }
}
