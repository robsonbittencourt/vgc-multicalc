import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamMember } from 'src/lib/team-member';

@Component({
  selector: 'app-pokemon-tab',
  templateUrl: './pokemon-tab.component.html',
  styleUrls: ['./pokemon-tab.component.scss']
})
export class PokemonTabComponent {

  @Input() 
  teamMember: TeamMember

  @Output() 
  tabActivated = new EventEmitter<TeamMember>()

  @Input()
  isSecondSelection: boolean

  activateTab() {
    this.tabActivated.emit(this.teamMember)
  }

  active(): boolean {
    return this.teamMember.active || this.isSecondSelection
  }

  tabStyle(): any {
    const activeTab = { 'border-bottom': 'solid 2px', 'border-color': '#673ab7', 'background-color': '#f9f7fc' }

    if (this.teamMember.active || this.isSecondSelection) {
      return activeTab
    }

    return null
  }

}
