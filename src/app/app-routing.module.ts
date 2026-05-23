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
  {
    path: "how-to-use",
    loadComponent: () => import("@core/routes/how-to-use-route.component").then(m => m.HowToUseRouteComponent),
    children: [
      { path: "", loadComponent: () => import("@pages/how-to-use/how-to-use.component").then(m => m.HowToUseComponent) },
      { path: "video", loadComponent: () => import("@pages/how-to-use/how-to-use-video/how-to-use-video.component").then(m => m.HowToUseVideoComponent) },
      { path: "one-vs-one", loadComponent: () => import("@pages/how-to-use/how-to-use-simple-calc/how-to-use-simple-calc.component").then(m => m.HowToUseSimpleCalcComponent) },
      { path: "team-vs-many", loadComponent: () => import("@pages/how-to-use/how-to-use-team-vs-many/how-to-use-team-vs-many.component").then(m => m.HowToUseTeamVsManyComponent) },
      { path: "many-vs-team", loadComponent: () => import("@pages/how-to-use/how-to-use-many-vs-team/how-to-use-many-vs-team.component").then(m => m.HowToUseManyVsTeamComponent) },
      { path: "import-data", loadComponent: () => import("@pages/how-to-use/how-to-use-import/how-to-use-import.component").then(m => m.HowToUseImportComponent) },
      { path: "export-data", loadComponent: () => import("@pages/how-to-use/how-to-use-export/how-to-use-export.component").then(m => m.HowToUseExportComponent) },
      { path: "ev-optimization", loadComponent: () => import("@pages/how-to-use/how-to-use-ev-optimization/how-to-use-ev-optimization.component").then(m => m.HowToUseEvOptimizationComponent) },
      { path: "speed-calc", loadComponent: () => import("@pages/how-to-use/how-to-use-speed-calc/how-to-use-speed-calc.component").then(m => m.HowToUseSpeedCalcComponent) },
      { path: "probability-calc", loadComponent: () => import("@pages/how-to-use/how-to-use-probability/how-to-use-probability.component").then(m => m.HowToUseProbabilityComponent) },
      { path: "type-calc", loadComponent: () => import("@pages/how-to-use/how-to-use-type-calc/how-to-use-type-calc.component").then(m => m.HowToUseTypeCalcComponent) }
    ]
  },
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
