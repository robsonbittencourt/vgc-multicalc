import { NgClass } from "@angular/common"
import { booleanAttribute, Component, ElementRef, input, model, output, viewChild } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-input",
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss"
})
export class InputComponent {
  value = model.required<string>()
  inputElement = viewChild<ElementRef>("inputRef")

  label = input<string>()

  leftLabel = input(false, { transform: booleanAttribute })

  disabled = input(false)

  haveFocus = input(false)

  tabIndex = input(0)

  selected = output()

  lostFocus = output()

  emptyFallbackValue = input<string>()

  onClick(event: FocusEvent) {
    ;(event.target as HTMLInputElement).select()
    this.selected.emit()
  }

  onBlur() {
    if (this.value() === "" && this.emptyFallbackValue() !== undefined) {
      this.value.set(this.emptyFallbackValue()!)
    }
    this.lostFocus.emit()
  }

  onValueSelected(selectedValue: string) {
    this.value.set(selectedValue)
  }

  onInputChange(event: Event) {
    this.value.set((event.target as HTMLInputElement).value)
  }

  blur() {
    this.inputElement()?.nativeElement.blur()
  }

  focus() {
    this.inputElement()?.nativeElement.select()
  }

  scrollTo() {
    this.inputElement()?.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}
