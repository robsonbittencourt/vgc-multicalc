import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseImportEnComponent } from "@pages/how-to-use/how-to-use-import/content/how-to-use-import-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-import",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-import.component.html",
  styleUrl: "./how-to-use-import.component.scss"
})
export class HowToUseImportComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Importing Data — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Import Pokémon and teams from Pokémon Showdown and PokePaste into VGC Multi Calc with exact stats and spreads."
  protected readonly pageSlug = "import-data"

  protected readonly content: HowToUseContent = {
    en: HowToUseImportEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-import/content/how-to-use-import-es.component").then(m => m.HowToUseImportEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-import/content/how-to-use-import-es-419.component").then(m => m.HowToUseImportEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-import/content/how-to-use-import-ja.component").then(m => m.HowToUseImportJaComponent),
      fr: () => import("@pages/how-to-use/how-to-use-import/content/how-to-use-import-fr.component").then(m => m.HowToUseImportFrComponent)
    }
  }
}
