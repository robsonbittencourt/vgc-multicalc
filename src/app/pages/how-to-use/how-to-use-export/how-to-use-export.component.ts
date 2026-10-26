import { Component } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-export",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-export.component.html",
  styleUrl: "./how-to-use-export.component.scss"
})
export class HowToUseExportComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Exporting & Sharing — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Export your sets in Pokémon Showdown format, share your team as a Paste or fill in the tournament Team List."
  protected readonly pageSlug = "export-data"
}
