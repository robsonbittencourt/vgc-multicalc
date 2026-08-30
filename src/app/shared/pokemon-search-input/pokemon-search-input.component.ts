import { Component, ElementRef, input, output, viewChild } from "@angular/core"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-pokemon-search-input",
  imports: [MatIcon],
  templateUrl: "./pokemon-search-input.component.html",
  styleUrl: "./pokemon-search-input.component.scss"
})
export class PokemonSearchInputComponent {
  value = input.required<string>()
  ariaLabel = input.required<string>()
  dataCy = input.required<string>()
  searching = input(false)

  pressed = output<MouseEvent>()
  cleared = output()
  valueChanged = output<string>()

  private inputElement = viewChild<ElementRef<HTMLInputElement>>("inputRef")

  onInput(event: Event) {
    this.valueChanged.emit((event.target as HTMLInputElement).value)
  }

  setValue(value: string) {
    const element = this.inputElement()?.nativeElement

    if (element) {
      element.value = value
    }
  }

  blur() {
    this.inputElement()?.nativeElement.blur()
  }

  isVisible(): boolean {
    return this.inputElement()?.nativeElement.offsetParent != null
  }
}
