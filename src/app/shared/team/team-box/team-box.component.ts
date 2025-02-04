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

  teamActivated = output<Team>()

  activate() {
    this.teamActivated.emit(this.team())
  }
}
