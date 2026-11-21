import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { TEAM_VS_MANY_IMAGES } from "@pages/how-to-use/how-to-use-team-vs-many/how-to-use-team-vs-many-images"

@Component({
  selector: "app-how-to-use-team-vs-many-es",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-team-vs-many-es.component.html"
})
export class HowToUseTeamVsManyEsComponent {
  protected readonly images = TEAM_VS_MANY_IMAGES
}
