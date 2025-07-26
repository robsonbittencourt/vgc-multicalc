import { Component, computed, input } from "@angular/core"

@Component({
  selector: "app-widget",
  templateUrl: "./widget.component.html",
  styleUrl: "./widget.component.scss"
})
export class WidgetComponent {
  title = input<string>()

  hasTitle = computed(() => this.title() !== undefined)
}
