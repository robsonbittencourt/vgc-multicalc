import { RenderMode, ServerRoute } from "@angular/ssr"

export const serverRoutes: ServerRoute[] = [
  { path: "data/:userDataId", renderMode: RenderMode.Client },
  { path: "**", renderMode: RenderMode.Prerender }
]
