import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseSpeedCalcEnComponent } from "@pages/how-to-use/how-to-use-speed-calc/content/how-to-use-speed-calc-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-speed-calc",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-speed-calc.component.html",
  styleUrl: "./how-to-use-speed-calc.component.scss"
})
export class HowToUseSpeedCalcComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Speed Calc — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Master VGC speed control: visualize speed tiers and effective Speed with Tailwind, Trick Room and other modifiers."
  protected readonly pageSlug = "speed-calc"

  protected readonly content: HowToUseContent = {
    en: HowToUseSpeedCalcEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-speed-calc/content/how-to-use-speed-calc-es.component").then(m => m.HowToUseSpeedCalcEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-speed-calc/content/how-to-use-speed-calc-es-419.component").then(m => m.HowToUseSpeedCalcEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-speed-calc/content/how-to-use-speed-calc-ja.component").then(m => m.HowToUseSpeedCalcJaComponent)
    }
  }
}
