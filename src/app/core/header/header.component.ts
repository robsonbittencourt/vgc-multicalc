import { NgClass, TitleCasePipe } from "@angular/common"
import { Component, inject } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDivider } from "@angular/material/divider"
import { MatIcon } from "@angular/material/icon"
import { MatMenu, MatMenuTrigger } from "@angular/material/menu"
import { CopyButtonComponent } from "@app/basic/copy-button/copy-button.component"
import { ActiveFieldService } from "@data/store/active-field.service"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { SnackbarService } from "@lib/snackbar.service"
import { ThemeService } from "@lib/theme.service"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [NgClass, MatIcon, MatButton, MatMenu, MatMenuTrigger, MatDivider, TitleCasePipe, CopyButtonComponent]
})
export class HeaderComponent {
  store = inject(CalculatorStore)
  activeFieldService = inject(ActiveFieldService)
  menuStore = inject(MenuStore)
  themeService = inject(ThemeService)
  private snackBar = inject(SnackbarService)

  userDataLink: string

  uploadData() {
    const id = uuidv4()
    const activeField = this.activeFieldService.activeStore()?.field()
    const userData = { ...this.store.buildUserData(), field: activeField ? { ...activeField } : null }
    axios.put(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, userData)
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this.snackBar.open("Your calc link has been created!")
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }
}
