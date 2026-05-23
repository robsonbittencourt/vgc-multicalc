import { Component } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-team-vs-many",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-team-vs-many.component.html",
  styleUrl: "./how-to-use-team-vs-many.component.scss"
})
export class HowToUseTeamVsManyComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Team vs Many - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Learn how to evaluate your Pokémon's offensive damage against multiple targets at once for VGC and Pokémon Champions Doubles."
  protected readonly pageSlug = "team-vs-many"
}
