import { booleanAttribute, Component, computed, input } from "@angular/core"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  imports: [TranslatePipe],
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
