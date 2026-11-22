import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseSpOptimizerEnComponent } from "@pages/how-to-use/how-to-use-sp-optimizer/content/how-to-use-sp-optimizer-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-sp-optimizer",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-sp-optimizer.component.html",
  styleUrl: "./how-to-use-sp-optimizer.component.scss"
})
export class HowToUseSpOptimizerComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "SP Optimizer — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Learn how the SP Optimizer finds the fewest Stat Points needed to survive key attacks or to reach the KO you want."
  protected readonly pageSlug = "sp-optimizer"

  protected readonly content: HowToUseContent = {
    en: HowToUseSpOptimizerEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-sp-optimizer/content/how-to-use-sp-optimizer-es.component").then(m => m.HowToUseSpOptimizerEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-sp-optimizer/content/how-to-use-sp-optimizer-es-419.component").then(m => m.HowToUseSpOptimizerEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-sp-optimizer/content/how-to-use-sp-optimizer-ja.component").then(m => m.HowToUseSpOptimizerJaComponent),
      fr: () => import("@pages/how-to-use/how-to-use-sp-optimizer/content/how-to-use-sp-optimizer-fr.component").then(m => m.HowToUseSpOptimizerFrComponent)
    }
  }
}
