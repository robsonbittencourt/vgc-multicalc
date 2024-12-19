import { Injectable, inject } from "@angular/core"
import { ActivatedRouteSnapshot, Router } from "@angular/router"

import { UserData } from "@lib/user-data/user-data"
import axios, { AxiosResponse } from "axios"

@Injectable({ providedIn: "root" })
export class UserDataResolver {
  private router = inject(Router)

  resolve(route: ActivatedRouteSnapshot): Promise<void | AxiosResponse<UserData>> {
    const response = axios.get<UserData>(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${route.params["userDataId"]}`)
      .catch(() => {
        this.router.navigate(["/not-found"])
      })

    return response
  }
}