import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ActivatedRouteSnapshot, Router } from "@angular/router"
import { UserDataResolver } from "@store/user-data/user-data-resolver"

describe("UserDataResolver", () => {
  let resolver: UserDataResolver
  let navigateSpy: ReturnType<typeof vi.fn>

  const routeWith = (userDataId: string) => ({ params: { userDataId } }) as unknown as ActivatedRouteSnapshot

  beforeEach(() => {
    navigateSpy = vi.fn()

    TestBed.configureTestingModule({
      providers: [UserDataResolver, provideZonelessChangeDetection(), { provide: Router, useValue: { navigate: navigateSpy } }]
    })

    resolver = TestBed.inject(UserDataResolver)
  })

  it("should resolve the shared data as the response body, without any envelope", async () => {
    const sharedData = { leftPokemon: { name: "Ursaluna" }, rightPokemon: { name: "Tyranitar" }, teams: [], targets: [] }
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => sharedData } as Response)

    const result = await resolver.resolve(routeWith("shared-calc-id"))

    expect(result).toEqual(sharedData)
    expect(navigateSpy).not.toHaveBeenCalled()
  })

  it("should request the shared data by the id of the route", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => ({}) } as Response)

    await resolver.resolve(routeWith("543d848b-d685-46d9-8cf3-197cb83fca41"))

    expect(fetchSpy).toHaveBeenCalledWith("https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/543d848b-d685-46d9-8cf3-197cb83fca41")
  })

  it("should go to the not found page when the shared data does not exist", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 404 } as Response)

    const result = await resolver.resolve(routeWith("unknown-id"))

    expect(result).toBeUndefined()
    expect(navigateSpy).toHaveBeenCalledWith(["/not-found"])
  })

  it("should go to the not found page when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"))

    const result = await resolver.resolve(routeWith("shared-calc-id"))

    expect(result).toBeUndefined()
    expect(navigateSpy).toHaveBeenCalledWith(["/not-found"])
  })
})
