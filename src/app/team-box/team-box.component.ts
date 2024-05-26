import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from 'src/lib/team';

@Component({
  selector: 'app-team-box',
  templateUrl: './team-box.component.html',
  styleUrls: ['./team-box.component.scss']
})
export class TeamBoxComponent {

  @Input()
  team: Team

  @Output() 
  teamActivated = new EventEmitter<Team>()

  boxStyle(): any {
    if (this.team.active) {
      return { 'box-shadow': 'inset 0px 0px 0px 3px #8544ee' }
    }
  }

  activate() {
    this.teamActivated.emit(this.team)
  }

}
