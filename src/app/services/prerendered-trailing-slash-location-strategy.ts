import { Injectable, inject } from "@angular/core"
import { PathLocationStrategy } from "@angular/common"
import { ROUTES, Routes } from "@angular/router"

const NOT_PRERENDERED_PATHS = ["**", "404"]

@Injectable()
export class PrerenderedTrailingSlashLocationStrategy extends PathLocationStrategy {
  private readonly prerenderedPaths = new Set(staticPaths(inject(ROUTES).flat()))

  override prepareExternalUrl(internal: string): string {
    const pathEnd = internal.search(/[?#]/)
    const path = pathEnd === -1 ? internal : internal.slice(0, pathEnd)

    if (this.prerenderedPaths.has(path)) {
      return super.prepareExternalUrl(`${path}/${internal.slice(path.length)}`)
    }

    return super.prepareExternalUrl(internal)
  }
}

function staticPaths(routes: Routes, parentPath = ""): string[] {
  return routes.flatMap(route => {
    const segment = route.path ?? ""

    if (segment.includes(":") || NOT_PRERENDERED_PATHS.includes(segment)) return []

    const path = segment ? `${parentPath}/${segment}` : parentPath
    const childPaths = staticPaths(route.children ?? [], path)

    return path ? [path, ...childPaths] : childPaths
  })
}
