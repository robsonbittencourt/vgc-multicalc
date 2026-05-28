import { Component, inject, model, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog"
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio"
import { InputComponent } from "@basic/input/input.component"
import { readUserData, writeTopLevel } from "@data/store/utils/user-data-storage"

export type DatePartOrder = "mdy" | "dmy" | "ymd"

export type PageSelection = "Staff" | "OTS" | "Both"

export interface TeamListPlayerInfo {
  playerName: string
  ageDivision: "Juniors" | "Seniors" | "Masters"
  pageSelection: PageSelection
  trainerName: string
  playerId: string
  battleTeamName: string
  dateOfBirth: string
  datePartOrder: DatePartOrder
  switchProfileName: string
  supportId: string
}

export function detectDatePartOrder(): DatePartOrder {
  const parts = new Intl.DateTimeFormat(navigator.language, { day: "numeric", month: "numeric", year: "numeric" }).formatToParts(new Date(2000, 0, 15))
  const order = parts.filter(p => p.type === "day" || p.type === "month" || p.type === "year").map(p => p.type[0])
  if (order[0] === "y") return "ymd"
  if (order[0] === "d") return "dmy"
  return "mdy"
}

export function dateFormatPlaceholder(order: DatePartOrder): string {
  if (order === "dmy") return "DD/MM/YYYY"
  if (order === "ymd") return "YYYY/MM/DD"
  return "MM/DD/YYYY"
}

@Component({
  selector: "app-team-list-modal",
  templateUrl: "./team-list-modal.component.html",
  styleUrls: ["./team-list-modal.component.scss"],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, FormsModule, MatRadioGroup, MatRadioButton, InputComponent]
})
export class TeamListModalComponent {
  data = inject(MAT_DIALOG_DATA)
  private dialogRef = inject(MatDialogRef<TeamListModalComponent>)

  readonly dateOrder = detectDatePartOrder()
  readonly datePlaceholder = dateFormatPlaceholder(this.dateOrder)

  private saved = readUserData()?.teamListPlayerInfo ?? {}

  playerName = model(this.saved.playerName ?? "")
  trainerName = model(this.saved.trainerName ?? "")
  playerId = model(this.saved.playerId ?? "")
  battleTeamName = model(this.data.teamName ?? this.saved.battleTeamName ?? "")
  dateOfBirth = signal(this.saved.dateOfBirth ?? "")
  switchProfileName = model(this.saved.switchProfileName ?? "")
  supportId = model(this.saved.supportId ?? "")

  playerInfo = signal<TeamListPlayerInfo>({
    playerName: this.playerName(),
    ageDivision: this.saved.ageDivision ?? "Masters",
    pageSelection: this.saved.pageSelection ?? "Both",
    trainerName: this.trainerName(),
    playerId: this.playerId(),
    battleTeamName: this.battleTeamName(),
    dateOfBirth: this.dateOfBirth(),
    datePartOrder: this.dateOrder,
    switchProfileName: this.switchProfileName(),
    supportId: this.supportId()
  })

  update(field: keyof TeamListPlayerInfo, value: string) {
    this.playerInfo.update(info => ({ ...info, [field]: value }))
  }

  maskDate(event: Event) {
    const input = event.target as HTMLInputElement
    const digits = input.value.replace(/\D/g, "").slice(0, 8)
    let masked = digits
    if (digits.length > 2) masked = digits.slice(0, 2) + "/" + digits.slice(2)
    if (digits.length > 4) masked = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4)
    input.value = masked
    this.dateOfBirth.set(masked)
  }

  export() {
    const info: TeamListPlayerInfo = {
      playerName: this.playerName(),
      ageDivision: this.playerInfo().ageDivision,
      pageSelection: this.playerInfo().pageSelection,
      trainerName: this.trainerName(),
      playerId: this.playerId(),
      battleTeamName: this.battleTeamName(),
      dateOfBirth: this.dateOfBirth(),
      datePartOrder: this.dateOrder,
      switchProfileName: this.switchProfileName(),
      supportId: this.supportId()
    }
    writeTopLevel({ teamListPlayerInfo: info })
    this.dialogRef.close(info)
  }
}
