import { Component, inject } from "@angular/core"
import { FeatureFlagsStore } from "@store/feature-flags-store"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"

@Component({
  selector: "app-mode-selector",
  imports: [SegmentedControlComponent],
  templateUrl: "./mode-selector.component.html",
  styleUrl: "./mode-selector.component.scss"
})
export class ModeSelectorComponent {
  featureFlags = inject(FeatureFlagsStore)

  readonly modeOptions: SegmentedOption<boolean>[] = [
    { value: false, label: "Champions", dataCy: "mode-champions" },
    { value: true, label: "National Dex", dataCy: "mode-national-dex" }
  ]

  selectMode(nationalDex: boolean) {
    if (nationalDex) {
      this.featureFlags.enableNationalDex()
    } else {
      this.featureFlags.enableChampions()
    }
  }
}
