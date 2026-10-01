import { NgClass, NgTemplateOutlet } from "@angular/common"
import { booleanAttribute, Component, computed, ElementRef, input, model, output, signal, viewChild } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-input",
  imports: [NgClass, NgTemplateOutlet, FormsModule, ReactiveFormsModule, MatIcon],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss"
})
export class InputComponent {
  value = model.required<string>()
  inputElement = viewChild<ElementRef>("inputRef")

  label = input<string>()

  type = input("text")

  maxLength = input<number>()

  autocomplete = input<string>()

  revealed = signal(false)

  inputType = computed(() => (this.type() === "password" && this.revealed() ? "text" : this.type()))

  ariaLabel = input<string>()

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

  toggleReveal() {
    this.revealed.update(revealed => !revealed)
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
