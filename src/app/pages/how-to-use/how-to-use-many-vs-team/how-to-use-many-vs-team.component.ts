import { Component } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-many-vs-team",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-many-vs-team.component.html",
  styleUrl: "./how-to-use-many-vs-team.component.scss"
})
export class HowToUseManyVsTeamComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Many vs Team - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Learn how to test your Pokémon's defensive durability against multiple threats in the VGC and Pokémon Champions metagame."
  protected readonly pageSlug = "many-vs-team"
}
