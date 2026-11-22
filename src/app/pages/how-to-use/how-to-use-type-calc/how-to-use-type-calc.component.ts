import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseTypeCalcEnComponent } from "@pages/how-to-use/how-to-use-type-calc/content/how-to-use-type-calc-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-type-calc",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-type-calc.component.html",
  styleUrl: "./how-to-use-type-calc.component.scss"
})
export class HowToUseTypeCalcComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Type Calc — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Analyze offensive coverage and defensive type matchups against specific teams to find weaknesses and strengths."
  protected readonly pageSlug = "type-calc"

  protected readonly content: HowToUseContent = {
    en: HowToUseTypeCalcEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-type-calc/content/how-to-use-type-calc-es.component").then(m => m.HowToUseTypeCalcEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-type-calc/content/how-to-use-type-calc-es-419.component").then(m => m.HowToUseTypeCalcEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-type-calc/content/how-to-use-type-calc-ja.component").then(m => m.HowToUseTypeCalcJaComponent),
      de: () => import("@pages/how-to-use/how-to-use-type-calc/content/how-to-use-type-calc-de.component").then(m => m.HowToUseTypeCalcDeComponent),
      fr: () => import("@pages/how-to-use/how-to-use-type-calc/content/how-to-use-type-calc-fr.component").then(m => m.HowToUseTypeCalcFrComponent)
    }
  }
}
