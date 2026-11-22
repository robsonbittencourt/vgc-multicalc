import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { MANY_VS_TEAM_IMAGES } from "@pages/how-to-use/how-to-use-many-vs-team/how-to-use-many-vs-team-images"

@Component({
  selector: "app-how-to-use-many-vs-team-it",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-many-vs-team-it.component.html"
})
export class HowToUseManyVsTeamItComponent {
  protected readonly images = MANY_VS_TEAM_IMAGES
}
