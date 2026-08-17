import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, inject, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { Clipboard, ClipboardModule } from "@angular/cdk/clipboard"
import { Pokemon } from "@multicalc/model"
import { toPokepasteText } from "@multicalc/serialization"

@Component({
  selector: "app-export-modal",
  templateUrl: "./export-modal.component.html",
  styleUrls: ["./export-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, ClipboardModule, FormsModule, MatSlideToggle]
})
export class TeamExportModalComponent {
  data = inject(MAT_DIALOG_DATA)
  private clipboard = inject(Clipboard)

  useSpsMode = this.data.useSpsMode ?? true
  hasPokemon = !!this.data.pokemon
  content = signal("")
  copyText = signal("Copy")

  constructor() {
    this.buildContent()
  }

  async buildContent() {
    if (!this.hasPokemon) {
      this.content.set(this.data.content ?? "")

      return
    }

    const pokemon = this.data.pokemon as Pokemon[]
    const results = await Promise.all(pokemon.map(p => toPokepasteText(p, this.useSpsMode, this.data.includeTeraType)))
    this.content.set(results.map(r => r + "\n").join(""))
  }

  copy() {
    this.clipboard.copy(this.content())
    this.copyText.set("Copied")

    setTimeout(() => {
      this.copyText.set("Copy")
    }, 2000)
  }
}
