import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { TEAMS_IMAGES } from "@pages/how-to-use/how-to-use-teams/how-to-use-teams-images"

@Component({
  selector: "app-how-to-use-teams-fr",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-teams-fr.component.html"
})
export class HowToUseTeamsFrComponent {
  protected readonly images = TEAMS_IMAGES
}
