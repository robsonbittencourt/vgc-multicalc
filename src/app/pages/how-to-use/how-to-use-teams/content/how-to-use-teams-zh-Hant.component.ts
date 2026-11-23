import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { TEAMS_IMAGES } from "@pages/how-to-use/how-to-use-teams/how-to-use-teams-images"

@Component({
  selector: "app-how-to-use-teams-zh-hant",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-teams-zh-Hant.component.html"
})
export class HowToUseTeamsZhHantComponent {
  protected readonly images = TEAMS_IMAGES
}
