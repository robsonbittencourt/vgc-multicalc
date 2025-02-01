import { TitleCasePipe } from "@angular/common"
import { Component, inject } from "@angular/core"
import { MatIconButton } from "@angular/material/button"
import { MatDivider } from "@angular/material/divider"
import { MatIcon } from "@angular/material/icon"
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu"
import { MenuStore } from "@data/store/menu-store"
import { ThemeService } from "@lib/theme.service"

@Component({
  selector: "app-header-mobile",
  templateUrl: "./header-mobile.component.html",
  styleUrls: ["./header-mobile.component.scss"],
  imports: [MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, MatDivider, TitleCasePipe]
})
export class HeaderMobileComponent {
  menuStore = inject(MenuStore)
  themeService = inject(ThemeService)
}
