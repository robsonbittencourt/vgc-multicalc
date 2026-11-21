import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseExportEnComponent } from "@pages/how-to-use/how-to-use-export/content/how-to-use-export-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-export",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-export.component.html",
  styleUrl: "./how-to-use-export.component.scss"
})
export class HowToUseExportComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Exporting & Sharing — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Export your sets in Pokémon Showdown format, share your team as a Paste or fill in the tournament Team List."
  protected readonly pageSlug = "export-data"

  protected readonly content: HowToUseContent = {
    en: HowToUseExportEnComponent,
    translations: { es: () => import("@pages/how-to-use/how-to-use-export/content/how-to-use-export-es.component").then(m => m.HowToUseExportEsComponent) }
  }
}
