import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseTeamVsManyEnComponent } from "@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-team-vs-many",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-team-vs-many.component.html",
  styleUrl: "./how-to-use-team-vs-many.component.scss"
})
export class HowToUseTeamVsManyComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Team vs Many — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Learn how to evaluate your Pokémon's offensive damage against multiple targets at once for Pokémon Champions and VGC Doubles."
  protected readonly pageSlug = "team-vs-many"

  protected readonly content: HowToUseContent = {
    en: HowToUseTeamVsManyEnComponent,
    translations: { es: () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-es.component").then(m => m.HowToUseTeamVsManyEsComponent) }
  }
}
