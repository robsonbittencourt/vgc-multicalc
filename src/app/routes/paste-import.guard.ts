import { inject, Injector } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"

export const PASTE_IMPORT_PARAM = "import"

export const pasteImportGuard: CanActivateFn = async route => {
  const id = route.queryParamMap.get(PASTE_IMPORT_PARAM)

  if (!id) return true

  const injector = inject(Injector)
  const router = inject(Router)
  const { importPasteHandoff } = await import("@app/routes/paste-import")

  await importPasteHandoff(injector, id)

  return router.createUrlTree([route.routeConfig!.path])
}
