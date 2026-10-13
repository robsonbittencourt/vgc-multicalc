import { booleanAttribute, Component, computed, input } from "@angular/core"

@Component({
  selector: "app-widget",
  templateUrl: "./widget.component.html",
  styleUrl: "./widget.component.scss"
})
export class WidgetComponent {
  title = input<string>()

  centeredHeader = input(false, { transform: booleanAttribute })

  stretchContent = input(false, { transform: booleanAttribute })

  hasTitle = computed(() => this.title() !== undefined)
}
