import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { PasteDraft } from "@store/paste/paste-draft"

@Injectable({ providedIn: "root" })
export class PasteOverlayService {
  private dialog = inject(MatDialog)
  private backNavigation = inject(BackNavigationService)

  async open(pasteDraft: PasteDraft) {
    const { CreatePastePageComponent } = await import("@pages/create-paste/create-paste-page.component")

    const ref = this.dialog.open(CreatePastePageComponent, {
      data: { pasteDraft },
      width: "100vw",
      maxWidth: "100vw",
      height: "100dvh",
      autoFocus: false,
      closeOnNavigation: false,
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: "create-paste-overlay"
    })

    let closedByHistory = false

    this.backNavigation.push({
      kind: "overlay",
      close: () => {
        closedByHistory = true
        ref.close()
      }
    })

    ref.afterClosed().subscribe(() => {
      if (!closedByHistory) this.backNavigation.pop()
    })
  }
}
