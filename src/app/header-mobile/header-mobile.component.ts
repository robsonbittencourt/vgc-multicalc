import { Component, inject } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MenuStore } from 'src/data/store/menu-store'

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
  standalone: true,
  imports: [MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem]
})
export class HeaderMobileComponent {
  menuStore = inject(MenuStore)
}
