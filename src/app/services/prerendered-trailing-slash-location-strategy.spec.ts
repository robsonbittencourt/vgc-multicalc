import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { APP_BASE_HREF, Location, LocationStrategy, PlatformLocation } from "@angular/common"
import { ROUTES, Routes } from "@angular/router"
import { PrerenderedTrailingSlashLocationStrategy } from "@app/services/prerendered-trailing-slash-location-strategy"

const PRERENDERED_ROUTES = [
  "/one-vs-one",
  "/team-vs-many",
  "/many-vs-team",
  "/speed-calc",
  "/type-calc",
  "/probability-calc",
  "/paste",
  "/teams",
  "/how-to-use",
  "/how-to-use/video",
  "/how-to-use/one-vs-one",
  "/how-to-use/team-vs-many",
  "/how-to-use/many-vs-team",
  "/how-to-use/import-data",
  "/how-to-use/export-data",
  "/how-to-use/sp-optimizer",
  "/how-to-use/speed-calc",
  "/how-to-use/probability-calc",
  "/how-to-use/type-calc",
  "/how-to-use/teams"
]

const HOW_TO_USE_PAGES = ["video", "one-vs-one", "team-vs-many", "many-vs-team", "import-data", "export-data", "sp-optimizer", "speed-calc", "probability-calc", "type-calc", "teams"]

const APP_ROUTES: Routes = [
  { path: "" },
  ...["one-vs-one", "team-vs-many", "many-vs-team", "speed-calc", "type-calc", "probability-calc", "teams"].map(path => ({ path })),
  { path: "how-to-use", children: [{ path: "" }, ...HOW_TO_USE_PAGES.map(path => ({ path }))] },
  { path: "data/:userDataId" },
  { path: "paste" },
  { path: "paste/:id" },
  { path: "404" },
  { path: "**" }
]

describe("PrerenderedTrailingSlashLocationStrategy", () => {
  let platformLocation: { pathname: string; search: string; hash: string; replaceState: ReturnType<typeof vi.fn>; pushState: ReturnType<typeof vi.fn>; onPopState: () => ReturnType<typeof vi.fn>; onHashChange: () => ReturnType<typeof vi.fn> }

  function setup(routes: Routes = APP_ROUTES) {
    platformLocation = {
      pathname: "/",
      search: "",
      hash: "",
      replaceState: vi.fn(),
      pushState: vi.fn(),
      onPopState: () => vi.fn(),
      onHashChange: () => vi.fn()
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: PlatformLocation, useValue: platformLocation },
        { provide: ROUTES, multi: true, useValue: routes },
        { provide: LocationStrategy, useClass: PrerenderedTrailingSlashLocationStrategy }
      ]
    })

    return TestBed.inject(LocationStrategy)
  }

  it("should add the trailing slash to every prerendered route", () => {
    const strategy = setup()

    const urls = PRERENDERED_ROUTES.map(route => strategy.prepareExternalUrl(route))

    expect(urls).toEqual(PRERENDERED_ROUTES.map(route => `${route}/`))
  })

  it("should keep the home, the 404 page and the parameterized routes untouched", () => {
    const strategy = setup()

    const urls = ["/", "/404", "/paste/a1B2c3", "/data/f9e8d7", "/unknown-page"].map(url => strategy.prepareExternalUrl(url))

    expect(urls).toEqual(["/", "/404", "/paste/a1B2c3", "/data/f9e8d7", "/unknown-page"])
  })

  it("should place the trailing slash before the query string and the fragment", () => {
    const strategy = setup()

    const withQuery = strategy.prepareExternalUrl("/teams?filters=rain&paste=k7Lm")
    const withFragment = strategy.prepareExternalUrl("/how-to-use/speed-calc#tailwind")

    expect(withQuery).toBe("/teams/?filters=rain&paste=k7Lm")
    expect(withFragment).toBe("/how-to-use/speed-calc/#tailwind")
  })

  it("should not add a second slash to a url that already has one", () => {
    const strategy = setup()

    const url = strategy.prepareExternalUrl("/speed-calc/")

    expect(url).toBe("/speed-calc/")
  })

  it("should resolve routes declared without a path through their children", () => {
    const strategy = setup([{ children: [{ path: "speed-calc" }] }, { path: "how-to-use", children: [{ path: "" }, { path: "video" }] }])

    const urls = ["/speed-calc", "/how-to-use", "/how-to-use/video"].map(url => strategy.prepareExternalUrl(url))

    expect(urls).toEqual(["/speed-calc/", "/how-to-use/", "/how-to-use/video/"])
  })

  it("should replace the browser url with the trailing slash while the router reads it without one", () => {
    setup()
    platformLocation.pathname = "/one-vs-one/"
    const location = TestBed.inject(Location)

    const path = location.path()
    const isSamePath = location.isCurrentPathEqualTo("/one-vs-one")
    location.replaceState("/one-vs-one")

    expect(path).toBe("/one-vs-one")
    expect(isSamePath).toBe(true)
    expect(platformLocation.replaceState).toHaveBeenCalledWith(null, "", "/one-vs-one/")
    expect(platformLocation.pushState).not.toHaveBeenCalled()
  })
})
