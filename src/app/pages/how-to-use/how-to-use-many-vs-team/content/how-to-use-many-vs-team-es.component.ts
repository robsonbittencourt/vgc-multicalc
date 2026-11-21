import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { MANY_VS_TEAM_IMAGES } from "@pages/how-to-use/how-to-use-many-vs-team/how-to-use-many-vs-team-images"

@Component({
  selector: "app-how-to-use-many-vs-team-es",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-many-vs-team-es.component.html"
})
export class HowToUseManyVsTeamEsComponent {
  protected readonly images = MANY_VS_TEAM_IMAGES
}
