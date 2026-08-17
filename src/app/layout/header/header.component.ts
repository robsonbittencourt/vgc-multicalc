import { NgClass, TitleCasePipe } from "@angular/common"
import { Component, inject } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDivider } from "@angular/material/divider"
import { MatIcon } from "@angular/material/icon"
import { MatMenu, MatMenuTrigger } from "@angular/material/menu"
import { RouterLink } from "@angular/router"
import { CopyButtonComponent } from "@shared/copy-button/copy-button.component"
import { CalcStore } from "@store/calc-store"
import { MenuStore } from "@store/menu-store"
import { buildSharedUserData } from "@store/utils/user-data-mapper"
import { SnackbarService } from "@app/services/snackbar.service"
import { ThemeService } from "@app/services/theme.service"
import { Router } from "@angular/router"
import { uuid } from "@multicalc/utils"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [NgClass, MatIcon, MatButton, MatMenu, MatMenuTrigger, MatDivider, TitleCasePipe, CopyButtonComponent, RouterLink]
})
export class HeaderComponent {
  store = inject(CalcStore)
  menuStore = inject(MenuStore)
  themeService = inject(ThemeService)
  private snackBar = inject(SnackbarService)
  private router = inject(Router)

  userDataLink: string

  uploadData() {
    const id = uuid()
    const userData = buildSharedUserData(this.store.buildUserData(), this.store.useSpsMode(), this.store.customSetsState())
    fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData)
    })
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this.snackBar.open("Your calc link has been created!")
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

  onOneVsOneClick() {
    this.store.updateSecondAttacker("")
  }

  onManyVsTeamClick() {
    this.store.updateSecondAttacker("")
  }

  enableHowToUse() {
    this.router.navigate(["how-to-use"])
  }
}
