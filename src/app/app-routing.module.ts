import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { UserDataResolver } from "@lib/user-data/user-data-resolver"
import { MainComponent } from "./main/main.component"
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component"

const appRoutes: Routes = [
  { path: "", component: MainComponent },
  { path: "data/:userDataId", component: MainComponent, resolve: { userData: UserDataResolver } },
  { path: "**", component: NotFoundPageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
