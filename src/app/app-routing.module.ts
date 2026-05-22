import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { UserDataResolver } from "@lib/user-data/user-data-resolver"
import { NotFoundPageComponent } from "./core/not-found-page/not-found-page.component"

const appRoutes: Routes = [
  { path: "", loadComponent: () => import("@core/routes/home-route.component").then(m => m.HomeRouteComponent) },
  { path: "one-vs-one", loadComponent: () => import("@core/routes/one-vs-one-route.component").then(m => m.OneVsOneRouteComponent) },
  { path: "team-vs-many", loadComponent: () => import("@core/routes/team-vs-many-route.component").then(m => m.TeamVsManyRouteComponent) },
  { path: "many-vs-team", loadComponent: () => import("@core/routes/many-vs-team-route.component").then(m => m.ManyVsTeamRouteComponent) },
  { path: "speed-calc", loadComponent: () => import("@core/routes/speed-calc-route.component").then(m => m.SpeedCalcRouteComponent) },
  { path: "type-calc", loadComponent: () => import("@core/routes/type-calc-route.component").then(m => m.TypeCalcRouteComponent) },
  { path: "probability-calc", loadComponent: () => import("@core/routes/probability-calc-route.component").then(m => m.ProbabilityCalcRouteComponent) },
  { path: "how-to-use", loadComponent: () => import("@core/routes/how-to-use-route.component").then(m => m.HowToUseRouteComponent) },
  { path: "data/:userDataId", loadComponent: () => import("@core/routes/user-data-route.component").then(m => m.UserDataRouteComponent), resolve: { userData: UserDataResolver } },
  { path: "404", component: NotFoundPageComponent },
  { path: "**", component: NotFoundPageComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
