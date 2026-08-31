import { Component, inject } from "@angular/core"
import { FeatureFlagsStore } from "@store/feature-flags-store"

@Component({
  selector: "app-mode-selector",
  templateUrl: "./mode-selector.component.html",
  styleUrl: "./mode-selector.component.scss"
})
export class ModeSelectorComponent {
  featureFlags = inject(FeatureFlagsStore)
}
