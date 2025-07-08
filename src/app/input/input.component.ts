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

  haveFocus = input(false)

  tabIndex = input(0)

  selected = output()

  lostFocus = output()

  onClick() {
    this.selected.emit()
  }

  onBlur() {
    setTimeout(() => {
      this.lostFocus.emit()
    }, 150)
  }

  onValueSelected(selectedValue: string) {
    this.value.set(selectedValue)
  }
}
