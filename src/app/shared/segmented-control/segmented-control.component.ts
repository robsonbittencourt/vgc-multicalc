import { booleanAttribute, Component, input, model } from "@angular/core"

export interface SegmentedOption<T> {
  value: T
  label: string
  dataCy?: string
}

@Component({
  selector: "app-segmented-control",
  templateUrl: "./segmented-control.component.html",
  styleUrl: "./segmented-control.component.scss",
  host: {
    role: "group",
    "[attr.aria-label]": "ariaLabel()",
    "[class.on-widget]": "surface() === 'widget'",
    "[class.dense]": "dense()"
  }
})
export class SegmentedControlComponent<T> {
  options = input.required<SegmentedOption<T>[]>()
  value = model.required<T>()
  ariaLabel = input<string>()
  surface = input<"background" | "widget">("background")
  dense = input(false, { transform: booleanAttribute })

  select(value: T) {
    if (value === this.value()) return

    this.value.set(value)
  }
}
