import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseVideoEnComponent } from "@pages/how-to-use/how-to-use-video/content/how-to-use-video-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-video",
  standalone: true,
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-video.component.html",
  styleUrl: "./how-to-use-video.component.scss"
})
export class HowToUseVideoComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Video Tutorial — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Watch a complete video tutorial covering every feature of VGC Multi Calc, from basic damage calculation to advanced tools."
  protected readonly pageSlug = "video"

  protected readonly content: HowToUseContent = {
    en: HowToUseVideoEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-video/content/how-to-use-video-es.component").then(m => m.HowToUseVideoEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-video/content/how-to-use-video-es-419.component").then(m => m.HowToUseVideoEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-video/content/how-to-use-video-ja.component").then(m => m.HowToUseVideoJaComponent),
      fr: () => import("@pages/how-to-use/how-to-use-video/content/how-to-use-video-fr.component").then(m => m.HowToUseVideoFrComponent)
    }
  }
}
