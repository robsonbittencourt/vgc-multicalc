import { booleanAttribute, Component, input, output } from "@angular/core"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-action-sheet-item",
  imports: [MatIcon],
  templateUrl: "./action-sheet-item.component.html",
  styleUrl: "./action-sheet-item.component.scss"
})
export class ActionSheetItemComponent {
  icon = input.required<string>()
  hint = input<string>()
  dataCy = input<string>()
  danger = input(false, { transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })

  pressed = output()
}
