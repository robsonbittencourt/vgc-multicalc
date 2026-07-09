import { NgClass } from "@angular/common"
import { Component, inject, input, output } from "@angular/core"
import { CdkDrag, CdkDragEnd, CdkDragHandle } from "@angular/cdk/drag-drop"
import { MatIcon } from "@angular/material/icon"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { CalcStore } from "@store/calc-store"
import { Team } from "@multicalc/model"

@Component({
  selector: "app-team-box",
  templateUrl: "./team-box.component.html",
  styleUrls: ["./team-box.component.scss"],
  imports: [NgClass, CdkDrag, CdkDragHandle, MatIcon, PokemonSpriteComponent]
})
export class TeamBoxComponent {
  store = inject(CalcStore)

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
      if (!this.team().isEmpty()) {
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
