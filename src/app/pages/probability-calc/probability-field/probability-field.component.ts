import { Component, inject, input } from "@angular/core"
import { MatButtonToggle } from "@angular/material/button-toggle"
import { WidgetComponent } from "@shared/widget/widget.component"
import { FieldStore } from "@store/field-store"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  selector: "app-probability-field",
  imports: [WidgetComponent, MatButtonToggle, TranslatePipe],
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
