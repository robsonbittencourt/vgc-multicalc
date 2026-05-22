import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { UserDataResolver } from "@lib/user-data/user-data-resolver"
import { MainComponent } from "./core/main/main.component"
import { NotFoundPageComponent } from "./core/not-found-page/not-found-page.component"

const appRoutes: Routes = [
  { path: "", component: MainComponent },
  { path: "one-vs-one", component: MainComponent, data: { tool: "oneVsOne" } },
  { path: "team-vs-many", component: MainComponent, data: { tool: "oneVsMany" } },
  { path: "many-vs-team", component: MainComponent, data: { tool: "manyVsOne" } },
  { path: "speed-calc", component: MainComponent, data: { tool: "speed" } },
  { path: "type-calc", component: MainComponent, data: { tool: "type" } },
  { path: "probability-calc", component: MainComponent, data: { tool: "probability" } },
  { path: "how-to-use", component: MainComponent, data: { tool: "howToUse" } },
  { path: "data/:userDataId", component: MainComponent, resolve: { userData: UserDataResolver } },
  { path: "404", component: NotFoundPageComponent },
  { path: "**", component: NotFoundPageComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
