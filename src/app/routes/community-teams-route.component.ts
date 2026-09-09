import { Component, inject, OnInit } from "@angular/core"
import { CommunityTeamsComponent } from "@pages/community-teams/community-teams.component"
import { HeaderComponent } from "@layout/header/header.component"
import { MenuStore } from "@store/menu-store"

@Component({
  selector: "app-community-teams-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      <app-header />
      <app-community-teams />
    </div>
  `,
  imports: [HeaderComponent, CommunityTeamsComponent]
})
export class CommunityTeamsRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)

  ngOnInit() {
    this.menuStore.enableCommunityTeams()
  }
}
