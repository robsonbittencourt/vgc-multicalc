import { booleanAttribute, Component, inject, input } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { WidgetComponent } from "@shared/widget/widget.component"
import { FieldStore } from "@store/field-store"
import { FeatureFlagsStore } from "@store/feature-flags-store"

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"],
  imports: [WidgetComponent, MatButtonToggleGroup, MatButtonToggle]
})
export class FieldComponent {
  onlySpeed = input(false, { transform: booleanAttribute })
  oneVsOne = input(false, { transform: booleanAttribute })

  fieldStore = inject(FieldStore)
  features = inject(FeatureFlagsStore)
}
