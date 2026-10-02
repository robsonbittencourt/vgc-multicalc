import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ActivatedRouteSnapshot, convertToParamMap, provideRouter, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { TeamsService } from "@features/team/teams.service"
import { pasteImportGuard } from "@app/routes/paste-import.guard"
import { savePasteHandoff } from "@store/paste/paste-handoff"

describe("pasteImportGuard", () => {
  function snapshot(params: Record<string, string>): ActivatedRouteSnapshot {
    return { queryParamMap: convertToParamMap(params), routeConfig: { path: "team-vs-many" } } as unknown as ActivatedRouteSnapshot
  }

  function runGuard(params: Record<string, string>) {
    return TestBed.runInInjectionContext(() => pasteImportGuard(snapshot(params), {} as RouterStateSnapshot)) as Promise<boolean | UrlTree>
  }

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideRouter([])] })
  })

  it("should let a plain visit through", async () => {
    expect(await runGuard({})).toBe(true)
  })

  it("should import the handed over team and land on the calc without the import parameter", async () => {
    const importPasteTeam = vi.spyOn(TestBed.inject(TeamsService), "importPasteTeam").mockImplementation(vi.fn())
    savePasteHandoff(localStorage, "a1", { team: { kind: "team", version: 1, useSpsMode: true, showdown: "Incineroar" }, asOpponents: false }, Date.now())

    const result = await runGuard({ import: "a1" })

    expect(importPasteTeam).toHaveBeenCalledTimes(1)
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe("/team-vs-many")
  })
})
