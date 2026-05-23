import { Component } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-speed-calc",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-speed-calc.component.html",
  styleUrl: "./how-to-use-speed-calc.component.scss"
})
export class HowToUseSpeedCalcComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Speed Calc - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Master VGC speed control: visualize speed tiers and effective Speed with Tailwind, Trick Room and other modifiers."
  protected readonly pageSlug = "speed-calc"
}
