import { NgStyle } from '@angular/common'
import { Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatSnackBar } from '@angular/material/snack-bar'
import axios from 'axios'
import { MenuStore } from 'src/data/store/menu-store'
import { v4 as uuidv4 } from 'uuid'
import { DataStore as OldDataStore } from '../../lib/data-store.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgStyle, MatIcon, MatButton]
})
export class HeaderComponent {
  oldData = inject(OldDataStore)
  menuStore = inject(MenuStore)
  private snackBar = inject(MatSnackBar)

  userDataLink: string
  
  uploadData() {
    const id = uuidv4()
    const userData = this.oldData.buildUserData()
    axios.put(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, userData)
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this.snackBar.open("Your calc link has been created!", "", { duration: 4000 });
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

}
