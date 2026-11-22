import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseSimpleCalcEnComponent } from "@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-simple-calc",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-simple-calc.component.html",
  styleUrl: "./how-to-use-simple-calc.component.scss"
})
export class HowToUseSimpleCalcComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "One vs One Damage Calculator — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Learn how to use the One vs One damage calculator to analyze Pokémon matchups side by side, with full builds, moves, items and field state."
  protected readonly pageSlug = "one-vs-one"

  protected readonly content: HowToUseContent = {
    en: HowToUseSimpleCalcEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-es.component").then(m => m.HowToUseSimpleCalcEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-es-419.component").then(m => m.HowToUseSimpleCalcEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-ja.component").then(m => m.HowToUseSimpleCalcJaComponent),
      it: () => import("@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-it.component").then(m => m.HowToUseSimpleCalcItComponent),
      de: () => import("@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-de.component").then(m => m.HowToUseSimpleCalcDeComponent),
      fr: () => import("@pages/how-to-use/how-to-use-simple-calc/content/how-to-use-simple-calc-fr.component").then(m => m.HowToUseSimpleCalcFrComponent)
    }
  }
}
