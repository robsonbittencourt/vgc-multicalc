import { Clipboard } from "@angular/cdk/clipboard"
import { Location } from "@angular/common"
import { Component, computed, inject, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { CopyButtonComponent } from "@shared/copy-button/copy-button.component"
import { InputComponent } from "@shared/input/input.component"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { PasteService, TooManyPastesError } from "@app/services/paste.service"
import { CalcStore } from "@store/calc-store"
import { encryptTeam, MIN_PASSWORD_LENGTH } from "@store/paste/paste-crypto"
import { isPasteDraft, PasteDraft } from "@store/paste/paste-draft"
import { buildSharedTeamFromText, InvalidPasteTextError } from "@store/paste/paste-from-text"
import { MAX_NAME_LENGTH } from "@store/paste/shared-team"

const SP_EXAMPLE = "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot"
const EV_EXAMPLE = SP_EXAMPLE.replace("32 HP / 2 Def / 32 SpD", "252 HP / 12 Def / 252 SpD")

@Component({
  selector: "app-create-paste-page",
  templateUrl: "./create-paste-page.component.html",
  styleUrl: "./create-paste-page.component.scss",
  imports: [MatButton, MatIcon, MatSlideToggle, CopyButtonComponent, InputComponent, SegmentedControlComponent]
})
export class CreatePastePageComponent {
  private calcStore = inject(CalcStore)
  private pasteService = inject(PasteService)
  private clipboard = inject(Clipboard)
  private location = inject(Location)
  private dialogRef = inject(MatDialogRef, { optional: true })
  private dialogData = inject<{ pasteDraft?: unknown } | null>(MAT_DIALOG_DATA, { optional: true })

  readonly draft = this.readDraft()

  readonly pointsModeOptions: SegmentedOption<boolean>[] = [
    { value: true, label: "SP", dataCy: "create-paste-points-mode-sp" },
    { value: false, label: "EV", dataCy: "create-paste-points-mode-ev" }
  ]
  readonly minPasswordLength = MIN_PASSWORD_LENGTH
  readonly maxNameLength = MAX_NAME_LENGTH

  name = signal(this.draft?.name ?? "")
  text = signal(this.draft?.showdown ?? "")
  useSpsMode = signal(this.draft?.useSpsMode ?? this.calcStore.useSpsMode())
  showPoints = signal(true)
  usePassword = signal(false)
  password = signal("")
  creating = signal(false)
  pasteLink = signal("")
  linkCopied = signal(false)
  error = signal("")
  copyText = signal("Copy")

  pointsLabel = computed(() => (this.useSpsMode() ? "SPs" : "EVs"))
  placeholder = computed(() => (this.useSpsMode() ? SP_EXAMPLE : EV_EXAMPLE))
  passwordTooShort = computed(() => this.usePassword() && this.password().length < MIN_PASSWORD_LENGTH)
  canCreate = computed(() => !this.creating() && this.text().trim() !== "" && !this.passwordTooShort())

  private readDraft(): PasteDraft | null {
    const draft = this.dialogData?.pasteDraft ?? (this.location.getState() as { pasteDraft?: unknown } | null)?.pasteDraft

    return isPasteDraft(draft) ? draft : null
  }

  back() {
    if (this.dialogRef) {
      this.dialogRef.close()
    } else {
      this.location.back()
    }
  }

  copy() {
    this.clipboard.copy(this.text())
    this.copyText.set("Copied")

    setTimeout(() => {
      this.copyText.set("Copy")
    }, 2000)
  }

  updateText(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value)
  }

  async create() {
    this.creating.set(true)
    this.error.set("")

    try {
      const team = await buildSharedTeamFromText(this.name(), this.text(), {
        useSpsMode: this.useSpsMode(),
        includePoints: this.showPoints()
      })
      const id = await this.pasteService.create(this.usePassword() ? await encryptTeam(team, this.password()) : team)
      const link = this.pasteService.link(id)

      if (this.draft) this.calcStore.linkPasteToTeam(this.draft.teamId, link)

      this.pasteLink.set(link)
      this.linkCopied.set(this.clipboard.copy(link))
    } catch (error) {
      this.error.set(this.failureMessage(error))
    } finally {
      this.creating.set(false)
    }
  }

  private failureMessage(error: unknown): string {
    if (error instanceof InvalidPasteTextError) return error.message
    if (error instanceof TooManyPastesError) return "Too many pastes are being created right now. Try again in a few seconds."

    console.error(error)

    return "Could not create the paste. Try again."
  }

  createAnother() {
    this.pasteLink.set("")
    this.linkCopied.set(false)
  }
}
