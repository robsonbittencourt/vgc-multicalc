import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-video",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-video.component.html",
  styleUrl: "./how-to-use-video.component.scss"
})
export class HowToUseVideoComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Video Tutorial - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Watch a complete video tutorial covering every feature of VGC Multi Calc, from basic damage calculation to advanced tools."
  protected readonly pageSlug = "video"
}
