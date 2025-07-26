import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, inject, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog"

@Component({
  selector: "app-export-modal",
  templateUrl: "./export-modal.component.html",
  styleUrls: ["./export-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class TeamExportModalComponent {
  data = inject(MAT_DIALOG_DATA)

  copyText = signal("Copy")

  copy() {
    navigator.clipboard.writeText(this.data.content)
    this.copyText.set("Copied")

    setTimeout(() => {
      this.copyText.set("Copy")
    }, 2000)
  }
}
