import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseProbabilityEnComponent } from "@pages/how-to-use/how-to-use-probability/content/how-to-use-probability-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-probability",
  standalone: true,
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-probability.component.html",
  styleUrl: "./how-to-use-probability.component.scss"
})
export class HowToUseProbabilityComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Probability Calc — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Use the Probability Calc and Consistency Score to analyze move accuracy and reliability in Pokémon Champions and VGC."
  protected readonly pageSlug = "probability-calc"

  protected readonly content: HowToUseContent = {
    en: HowToUseProbabilityEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-probability/content/how-to-use-probability-es.component").then(m => m.HowToUseProbabilityEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-probability/content/how-to-use-probability-es-419.component").then(m => m.HowToUseProbabilityEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-probability/content/how-to-use-probability-ja.component").then(m => m.HowToUseProbabilityJaComponent)
    }
  }
}
