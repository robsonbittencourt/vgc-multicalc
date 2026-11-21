import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { IMPORT_IMAGES } from "@pages/how-to-use/how-to-use-import/how-to-use-import-images"

@Component({
  selector: "app-how-to-use-import-es",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-import-es.component.html"
})
export class HowToUseImportEsComponent {
  protected readonly images = IMPORT_IMAGES
}
