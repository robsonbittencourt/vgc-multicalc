import { Component, inject, input } from "@angular/core"
import { MatButtonToggle } from "@angular/material/button-toggle"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { FieldStore } from "@store/field-store"

@Component({
  selector: "app-probability-field",
  imports: [WidgetComponent, MatButtonToggle],
  templateUrl: "./probability-field.component.html",
  styleUrl: "./probability-field.component.scss",
  host: {
    "[class.horizontal]": "horizontal()"
  }
})
export class ProbabilityFieldComponent {
  fieldStore = inject(FieldStore)
  horizontal = input<boolean>(false)
}
