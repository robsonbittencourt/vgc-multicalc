import { Component, input, signal } from "@angular/core"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-copy-button",
  imports: [MatIcon],
  templateUrl: "./copy-button.component.html",
  styleUrl: "./copy-button.component.scss"
})
export class CopyButtonComponent {
  value = input.required<string | (() => Promise<string>)>()

  copyMessageEnabled = signal(false)

  copyDamageResult() {
    this.copyMessageEnabled.set(true)
    const value = this.value()

    if (typeof value === "string") {
      navigator.clipboard.writeText(value)
    } else {
      navigator.clipboard.write([new ClipboardItem({ "text/plain": value().then(text => new Blob([text], { type: "text/plain" })) })])
    }

    setTimeout(() => {
      this.copyMessageEnabled.set(false)
    }, 2000)
  }
}
