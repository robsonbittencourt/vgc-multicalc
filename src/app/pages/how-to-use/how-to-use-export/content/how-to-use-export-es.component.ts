import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { EXPORT_IMAGES } from "@pages/how-to-use/how-to-use-export/how-to-use-export-images"

@Component({
  selector: "app-how-to-use-export-es",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-export-es.component.html"
})
export class HowToUseExportEsComponent {
  protected readonly images = EXPORT_IMAGES
}
