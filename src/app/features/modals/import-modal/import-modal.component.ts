import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, inject, signal } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { InvalidSpsError } from "@multicalc/serialization"
import { PokePasteParserService } from "@store/user-data/poke-paste-parser.service"

@Component({
  selector: "app-import-modal",
  templateUrl: "./import-modal.component.html",
  styleUrls: ["./import-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, ReactiveFormsModule, FormsModule, MatDialogActions, MatButton, MatDialogClose, MatSlideToggle]
})
export class ImportModalComponent {
  data = inject(MAT_DIALOG_DATA)
  private dialogRef = inject(MatDialogRef<ImportModalComponent>)
  private pokePasteService = inject(PokePasteParserService)

  content: string
  placeholder: string
  useSpsMode = true
  errorMessage = signal("")

  constructor() {
    this.placeholder = this.data.placeholder
  }

  async import() {
    this.errorMessage.set("")

    try {
      const { name, pokemon } = await this.pokePasteService.parseTeam(this.content, this.useSpsMode)
      this.dialogRef.close({ name, pokemon, useSpsMode: this.useSpsMode })
    } catch (error) {
      if (error instanceof InvalidSpsError) {
        this.errorMessage.set("Invalid SPs")
      } else {
        this.errorMessage.set("Could not import the Pokémon")
      }
    }
  }
}
