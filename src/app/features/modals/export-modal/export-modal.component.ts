import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, inject, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { Clipboard, ClipboardModule } from "@angular/cdk/clipboard"
import { Pokemon } from "@multicalc/model"
import { toPokepasteText } from "@store/user-data/pokepaste-export"

@Component({
  selector: "app-export-modal",
  templateUrl: "./export-modal.component.html",
  styleUrls: ["./export-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, ClipboardModule, SegmentedControlComponent]
})
export class TeamExportModalComponent {
  data = inject(MAT_DIALOG_DATA)
  private clipboard = inject(Clipboard)

  useSpsMode = this.data.useSpsMode ?? true

  readonly pointsModeOptions: SegmentedOption<boolean>[] = [
    { value: true, label: "SP", dataCy: "export-points-mode-sp" },
    { value: false, label: "EV", dataCy: "export-points-mode-ev" }
  ]
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
