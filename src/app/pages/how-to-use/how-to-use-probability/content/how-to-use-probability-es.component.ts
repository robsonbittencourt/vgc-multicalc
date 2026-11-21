import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { PROBABILITY_IMAGES } from "@pages/how-to-use/how-to-use-probability/how-to-use-probability-images"

@Component({
  selector: "app-how-to-use-probability-es",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-probability-es.component.html"
})
export class HowToUseProbabilityEsComponent {
  protected readonly images = PROBABILITY_IMAGES
}
