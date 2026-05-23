import { Component } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-import",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-import.component.html",
  styleUrl: "./how-to-use-import.component.scss"
})
export class HowToUseImportComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Importing Data - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Import Pokémon and teams from Pokémon Showdown and PokePaste into VGC Multi Calc with exact stats and spreads."
  protected readonly pageSlug = "import-data"
}
