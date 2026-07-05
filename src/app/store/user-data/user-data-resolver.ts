import { Injectable, inject } from "@angular/core"
import { ActivatedRouteSnapshot, Router } from "@angular/router"

import { UserData } from "@store/user-data/user-data"

@Injectable({ providedIn: "root" })
export class UserDataResolver {
  private router = inject(Router)

  async resolve(route: ActivatedRouteSnapshot): Promise<UserData | void> {
    try {
      const res = await fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${route.params["userDataId"]}`)
      if (!res.ok) {
        this.router.navigate(["/not-found"])
        return
      }
      return await res.json()
    } catch {
      this.router.navigate(["/not-found"])
    }
  }
}
