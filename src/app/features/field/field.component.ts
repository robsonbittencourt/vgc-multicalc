import { booleanAttribute, Component, computed, inject, input } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"],
  imports: [WidgetComponent, MatButtonToggleGroup, MatButtonToggle]
})
export class FieldComponent {
  onlySpeed = input(false, { transform: booleanAttribute })
  oneVsOne = input(false, { transform: booleanAttribute })

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)

  isChampions = computed(() => this.store.game() === "champions")
}
