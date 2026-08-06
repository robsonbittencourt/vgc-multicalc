import { Component, input, signal } from "@angular/core"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-copy-button",
  imports: [MatIcon],
  templateUrl: "./copy-button.component.html",
  styleUrl: "./copy-button.component.scss"
})
export class CopyButtonComponent {
  value = input.required<string>()

  copyMessageEnabled = signal(false)

  copyDamageResult() {
    this.copyMessageEnabled.set(true)
    navigator.clipboard.writeText(this.value())

    setTimeout(() => {
      this.copyMessageEnabled.set(false)
    }, 2000)
  }
}
