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
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-es.component").then(m => m.HowToUseTeamVsManyEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-es-419.component").then(m => m.HowToUseTeamVsManyEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-ja.component").then(m => m.HowToUseTeamVsManyJaComponent),
      it: () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-it.component").then(m => m.HowToUseTeamVsManyItComponent),
      de: () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-de.component").then(m => m.HowToUseTeamVsManyDeComponent),
      fr: () => import("@pages/how-to-use/how-to-use-team-vs-many/content/how-to-use-team-vs-many-fr.component").then(m => m.HowToUseTeamVsManyFrComponent)
    }
  }
}
