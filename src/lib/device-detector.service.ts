import { Injectable } from '@angular/core'

@Injectable({
  providedIn: "root"
})
export class DeviceDetectorService {

  userAgent: string = navigator.userAgent || navigator.vendor

  isMobileDevice = (): boolean => {
    const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
    return regexs.some((b) => this.userAgent.match(b))
  }

  isTabletDevice = (): boolean => {
    const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
    return regex.test(this.userAgent.toLowerCase())
  }

  isDesktop = (): boolean => !this.isMobileDevice() && !this.isTabletDevice()
}
