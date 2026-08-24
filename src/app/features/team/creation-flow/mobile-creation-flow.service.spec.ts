import { ApplicationRef, Component, PLATFORM_ID, provideZonelessChangeDetection, signal } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CalcStore } from "@store/calc-store"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { MobileCreationFlowService } from "./mobile-creation-flow.service"

@Component({ template: "" })
class HostComponent {}

describe("MobileCreationFlowService", () => {
  let service: MobileCreationFlowService
  let store: any
  let overlay: { isAnyOpen: () => boolean }
  let activeTeam: any
  let allTeams: any[]

  function makeTeam(id: string, members: any[], activePokemonId: string | null = null) {
    return {
      id,
      teamMembers: members,
      isEmpty: () => members.length === 0,
      activePokemon: () => (activePokemonId ? { id: activePokemonId } : undefined)
    }
  }

  function memberWith(id: string) {
    return { pokemon: { id } }
  }

  beforeEach(() => {
    activeTeam = makeTeam("team-1", [])
    allTeams = [activeTeam]

    store = {
      team: () => activeTeam,
      teams: () => allTeams,
      addPokemonToTeam: vi.fn().mockReturnValue("new-pokemon-id"),
      selectCustomSet: vi.fn(),
      activateTeam: vi.fn()
    }

    overlay = { isAnyOpen: () => false }

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), MobileCreationFlowService, { provide: CalcStore, useValue: store }, { provide: MobileTableOverlayService, useValue: overlay }]
    })

    service = TestBed.inject(MobileCreationFlowService)
  })

  describe("start", () => {
    it("should enter the creation mode", () => {
      service.start("teams")

      expect(service.isCreating()).toBe(true)
    })

    it("should remember that the creation started from another tab", () => {
      service.start("teams")

      expect(service.startedFromAnotherTab()).toBe(true)
    })

    it("should not report another tab when the creation started without an origin", () => {
      service.start(null)

      expect(service.isCreating()).toBe(true)
      expect(service.startedFromAnotherTab()).toBe(false)
    })
  })

  describe("commit", () => {
    it("should add the chosen pokemon to the team and return its id", () => {
      service.start("teams")

      const newId = service.commit("Incineroar")

      expect(store.addPokemonToTeam).toHaveBeenCalledWith("Incineroar")
      expect(newId).toBe("new-pokemon-id")
    })

    it("should leave the creation mode", () => {
      service.start("teams")

      service.commit("Incineroar")

      expect(service.isCreating()).toBe(false)
      expect(service.startedFromAnotherTab()).toBe(false)
    })

    it("should apply the custom set on the created pokemon", () => {
      service.start("teams")

      const newId = service.commitCustomSet({ id: "set-9", basePokemonName: "Rillaboom" } as any)

      expect(store.addPokemonToTeam).toHaveBeenCalledWith("Rillaboom")
      expect(store.selectCustomSet).toHaveBeenCalledWith("new-pokemon-id", "set-9")
      expect(newId).toBe("new-pokemon-id")
    })
  })

  describe("cancel", () => {
    it("should return the tab the creation started from", () => {
      service.start("teams")

      const result = service.cancel()

      expect(result.originTab).toBe("teams")
      expect(service.isCreating()).toBe(false)
    })

    it("should return the active pokemon when there is no origin tab", () => {
      activeTeam = makeTeam("team-1", [memberWith("pikachu-1"), memberWith("ogerpon-2")], "ogerpon-2")
      service.start(null)

      const result = service.cancel()

      expect(result.originTab).toBeNull()
      expect(result.pokemonId).toBe("ogerpon-2")
    })

    it("should fall back to the first member when no pokemon is active", () => {
      activeTeam = makeTeam("team-1", [memberWith("pikachu-1"), memberWith("ogerpon-2")])
      service.start(null)

      const result = service.cancel()

      expect(result.pokemonId).toBe("pikachu-1")
    })

    it("should return no pokemon when the team is empty", () => {
      service.start(null)

      const result = service.cancel()

      expect(result.pokemonId).toBeNull()
    })

    it("should restore the team that was active before the creation", () => {
      const previousTeam = makeTeam("team-1", [memberWith("pikachu-1")])

      activeTeam = makeTeam("team-2", [])
      allTeams = [previousTeam, activeTeam]

      service.rememberTeamBeforeCreation("team-1")
      service.start("teams")

      service.cancel()

      expect(store.activateTeam).toHaveBeenCalledWith("team-1")
    })

    it("should activate any filled team when the remembered one is gone", () => {
      const otherTeam = makeTeam("team-9", [memberWith("pikachu-1")])

      activeTeam = makeTeam("team-2", [])
      allTeams = [otherTeam, activeTeam]

      service.rememberTeamBeforeCreation("team-1")
      service.start("teams")

      service.cancel()

      expect(store.activateTeam).toHaveBeenCalledWith("team-9")
    })

    it("should not restore any team when the current one is not empty", () => {
      activeTeam = makeTeam("team-1", [memberWith("pikachu-1")])
      allTeams = [activeTeam]

      service.rememberTeamBeforeCreation("team-1")
      service.start("teams")

      service.cancel()

      expect(store.activateTeam).not.toHaveBeenCalled()
    })

    it("should forget the origin so a second cancel has none", () => {
      service.start("teams")

      service.cancel()
      const second = service.cancel()

      expect(second.originTab).toBeNull()
    })
  })

  describe("settling after a commit", () => {
    it("should reveal the content again once the next render happens", async () => {
      TestBed.createComponent(HostComponent).detectChanges()
      service.trackEditingId(signal("pikachu-1"))
      service.start("teams")

      service.commit("Ogerpon")

      expect(service.hidingContent()).toBe(true)

      await TestBed.inject(ApplicationRef).whenStable()

      expect(service.hidingContent()).toBe(false)
    })
  })

  describe("currentOrigin", () => {
    it("should have no origin before any creation starts", () => {
      expect(service.currentOrigin()).toBeNull()
    })

    it("should expose the tab the creation started from", () => {
      service.start("teams")

      expect(service.currentOrigin()).toBe("teams")
    })

    it("should forget the origin once the creation is committed", () => {
      service.start("teams")

      service.commit("Ogerpon")

      expect(service.currentOrigin()).toBeNull()
    })
  })

  describe("ensureVisibleTeamIsActive", () => {
    it("should not activate anything when every team is empty", () => {
      activeTeam = makeTeam("team-1", [])
      allTeams = [activeTeam, makeTeam("team-2", [])]

      service.ensureVisibleTeamIsActive()

      expect(store.activateTeam).not.toHaveBeenCalled()
    })

    it("should activate the first filled team when no preference is given", () => {
      activeTeam = makeTeam("team-1", [])
      allTeams = [activeTeam, makeTeam("team-2", [memberWith("pikachu-1")])]

      service.ensureVisibleTeamIsActive()

      expect(store.activateTeam).toHaveBeenCalledWith("team-2")
    })
  })

  describe("derived state", () => {
    it("should blank the overlay pokemon id while creating", () => {
      service.trackEditingId(signal("pikachu-1"))

      service.start("teams")

      expect(service.overlayPokemonId()).toBe("")
    })

    it("should expose the edited pokemon id when not creating", () => {
      service.trackEditingId(signal("pikachu-1"))

      expect(service.overlayPokemonId()).toBe("pikachu-1")
    })

    it("should blank the overlay pokemon id when nothing is being edited", () => {
      service.trackEditingId(signal(null))

      expect(service.overlayPokemonId()).toBe("")
    })

    it("should hide the content while creating without a pokemon to edit", () => {
      service.trackEditingId(signal(null))

      service.start("teams")

      expect(service.hidingContent()).toBe(true)
    })

    it("should show the content when not creating", () => {
      service.trackEditingId(signal("pikachu-1"))

      expect(service.hidingContent()).toBe(false)
    })

    it("should report an empty team", () => {
      expect(service.hasNoTeamPokemon()).toBe(true)
    })

    it("should not report an empty team while creating", () => {
      service.start("teams")

      expect(service.hasNoTeamPokemon()).toBe(false)
    })

    it("should not report an empty team when it has members", () => {
      activeTeam = makeTeam("team-1", [memberWith("pikachu-1")])

      expect(service.hasNoTeamPokemon()).toBe(false)
    })
  })

  describe("scrollToActiveTeam", () => {
    let frames: FrameRequestCallback[]
    let grid: HTMLElement
    let teamElement: HTMLElement

    function runFrames() {
      frames.forEach(frame => frame(0))
      frames = []
    }

    function boundsOf(top: number, height: number) {
      return () => ({ top, height, bottom: top + height, left: 0, right: 0, width: 0, x: 0, y: top, toJSON: () => ({}) }) as DOMRect
    }

    beforeEach(() => {
      frames = []
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(frame => {
        frames.push(frame)

        return 0
      })

      grid = document.createElement("div")
      grid.className = "mobile-teams-grid"
      teamElement = document.createElement("div")
      teamElement.setAttribute("data-team-id", "team-1")
      grid.appendChild(teamElement)
      document.body.appendChild(grid)
    })

    afterEach(() => {
      grid.remove()
      vi.restoreAllMocks()
    })

    it("should center the active team inside the grid", () => {
      grid.getBoundingClientRect = boundsOf(100, 0)
      teamElement.getBoundingClientRect = boundsOf(400, 60)
      Object.defineProperty(grid, "clientHeight", { value: 260, configurable: true })
      grid.scrollTop = 50
      const scrollTo = vi.fn()
      grid.scrollTo = scrollTo

      service.scrollToActiveTeam()
      runFrames()

      expect(scrollTo).toHaveBeenCalledWith({ top: 250, behavior: "smooth" })
    })

    it("should use the requested scroll behavior", () => {
      grid.getBoundingClientRect = boundsOf(0, 0)
      teamElement.getBoundingClientRect = boundsOf(0, 0)
      Object.defineProperty(grid, "clientHeight", { value: 0, configurable: true })
      const scrollTo = vi.fn()
      grid.scrollTo = scrollTo

      service.scrollToActiveTeam("auto")
      runFrames()

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" })
    })

    it("should never scroll above the top of the grid", () => {
      grid.getBoundingClientRect = boundsOf(0, 0)
      teamElement.getBoundingClientRect = boundsOf(10, 20)
      Object.defineProperty(grid, "clientHeight", { value: 500, configurable: true })
      grid.scrollTop = 0
      const scrollTo = vi.fn()
      grid.scrollTo = scrollTo

      service.scrollToActiveTeam("auto")
      runFrames()

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" })
    })

    it("should do nothing when the active team is not on the screen", () => {
      teamElement.setAttribute("data-team-id", "team-other")
      const scrollTo = vi.fn()
      grid.scrollTo = scrollTo

      service.scrollToActiveTeam()
      runFrames()

      expect(scrollTo).not.toHaveBeenCalled()
    })

    it("should do nothing when the team is not inside a grid", () => {
      teamElement.remove()
      document.body.appendChild(teamElement)
      const scrollTo = vi.fn()
      grid.scrollTo = scrollTo

      service.scrollToActiveTeam()
      runFrames()

      expect(scrollTo).not.toHaveBeenCalled()
      teamElement.remove()
    })

    it("should scroll when entering the teams tab", () => {
      grid.getBoundingClientRect = boundsOf(0, 0)
      teamElement.getBoundingClientRect = boundsOf(0, 0)
      Object.defineProperty(grid, "clientHeight", { value: 0, configurable: true })
      const scrollTo = vi.fn()
      grid.scrollTo = scrollTo

      service.enterTeamsTab()
      runFrames()

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" })
    })
  })

  describe("outside the browser", () => {
    it("should not schedule a scroll on the server", () => {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection(), MobileCreationFlowService, { provide: CalcStore, useValue: store }, { provide: MobileTableOverlayService, useValue: overlay }, { provide: PLATFORM_ID, useValue: "server" }]
      })

      const serverService = TestBed.inject(MobileCreationFlowService)
      const requestAnimationFrame = vi.spyOn(window, "requestAnimationFrame")

      serverService.scrollToActiveTeam()

      expect(requestAnimationFrame).not.toHaveBeenCalled()

      requestAnimationFrame.mockRestore()
    })
  })
})
