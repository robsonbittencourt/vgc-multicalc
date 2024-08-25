import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import axios, { AxiosResponse } from 'axios';
import { UserData } from "./user-data";

@Injectable({ providedIn: 'root' })
export class UserDataResolver  {

  constructor(private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void | AxiosResponse<UserData>> {
    const response = axios.get<UserData>(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${route.params['userDataId']}`)
      .catch(() => {
        this.router.navigate(['/not-found'])
      })

    return response
  }
}