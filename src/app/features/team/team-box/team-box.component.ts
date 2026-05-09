import { SpriteService } from "@data/sprite.service"
import { NgClass } from "@angular/common"
import { Component, inject, input, output } from "@angular/core"
import { CdkDrag, CdkDragEnd, CdkDragHandle } from "@angular/cdk/drag-drop"
import { MatIcon } from "@angular/material/icon"
import { Team } from "@lib/model/team"

@Component({
  selector: "app-team-box",
  templateUrl: "./team-box.component.html",
  styleUrls: ["./team-box.component.scss"],
  imports: [NgClass, CdkDrag, CdkDragHandle, MatIcon]
})
export class TeamBoxComponent {
  spriteService = inject(SpriteService)
  team = input.required<Team>()
  secondTeam = input<Team | null>(null)
  allowSecondTeamSelection = input<boolean>(false)
  useDragSelection = input<boolean>(false)

  teamActivated = output<Team>()
  secondTeamActivated = output<Team>()
  secondTeamSeparated = output()
  dragEnded = output<CdkDragEnd>()

  activate(event: MouseEvent) {
    if ((event.ctrlKey || event.metaKey) && this.allowSecondTeamSelection()) {
      if (!this.team().onlyHasDefaultPokemon()) {
        this.secondTeamActivated.emit(this.team())
      }
    } else {
      this.teamActivated.emit(this.team())
    }
  }

  separateTeams(event: MouseEvent) {
    event.stopPropagation()
    this.secondTeamSeparated.emit()
  }

  onDragEnded(event: CdkDragEnd) {
    event.source.reset()
    this.dragEnded.emit(event)
  }
}
