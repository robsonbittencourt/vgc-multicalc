import { Component, input, output } from "@angular/core"

@Component({
  selector: "app-action-sheet",
  templateUrl: "./action-sheet.component.html",
  styleUrl: "./action-sheet.component.scss"
})
export class ActionSheetComponent {
  title = input<string>()

  closed = output()
}
