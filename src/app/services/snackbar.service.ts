import { Injectable, inject } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"
import { uiText } from "@app/i18n/ui-text"
import { LanguageStore } from "@store/language-store"

@Injectable({
  providedIn: "root"
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar)
  private languageStore = inject(LanguageStore)

  open(message: string) {
    this._snackBar.open(this.translate(message), "", { duration: 1500, panelClass: ["center", "not-clickable"], verticalPosition: "bottom" })
  }

  openWithAction(message: string, action: string, callback: () => void) {
    const ref = this._snackBar.open(this.translate(message), this.translate(action), { panelClass: "center", verticalPosition: "bottom" })
    ref.onAction().subscribe(callback)
  }

  private translate(text: string): string {
    return uiText(text, this.languageStore.language())
  }
}
