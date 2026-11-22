import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { IMPORT_IMAGES } from "@pages/how-to-use/how-to-use-import/how-to-use-import-images"

@Component({
  selector: "app-how-to-use-import-fr",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-import-fr.component.html"
})
export class HowToUseImportFrComponent {
  protected readonly images = IMPORT_IMAGES
}
