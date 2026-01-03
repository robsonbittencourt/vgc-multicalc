import { NgClass } from "@angular/common"
import { Component, input, output } from "@angular/core"
import { Team } from "@lib/model/team"

@Component({
  selector: "app-team-box",
  templateUrl: "./team-box.component.html",
  styleUrls: ["./team-box.component.scss"],
  imports: [NgClass]
})
export class TeamBoxComponent {
  team = input.required<Team>()
  isSecondTeam = input<boolean>(false)
  allowSecondTeamSelection = input<boolean>(false)

  teamActivated = output<Team>()
  secondTeamActivated = output<Team>()

  activate(event: MouseEvent) {
    if ((event.ctrlKey || event.metaKey) && this.allowSecondTeamSelection()) {
      if (!this.team().onlyHasDefaultPokemon()) {
        this.secondTeamActivated.emit(this.team())
      }
    } else {
      this.teamActivated.emit(this.team())
    }
  }
}
