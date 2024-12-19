import { NgStyle } from "@angular/common"
import { Component, inject } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { SnackbarService } from "@lib/snackbar.service"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [NgStyle, MatIcon, MatButton]
})
export class HeaderComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  menuStore = inject(MenuStore)
  private snackBar = inject(SnackbarService)

  userDataLink: string

  uploadData() {
    const id = uuidv4()
    const userData = { ...this.store.buildUserData(), field: { ...this.fieldStore.field() } }
    axios.put(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, userData)
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this.snackBar.open("Your calc link has been created!")
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

}
