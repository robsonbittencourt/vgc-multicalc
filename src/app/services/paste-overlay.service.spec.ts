import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog"
import { Subject } from "rxjs"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { PasteOverlayService } from "@app/services/paste-overlay.service"
import { PasteDraft } from "@store/paste/paste-draft"

describe("PasteOverlayService", () => {
  const pasteDraft: PasteDraft = { source: "Sun Balance", name: "Sun Balance", showdown: "Incineroar @ Sitrus Berry", useSpsMode: true }

  let service: PasteOverlayService
  let backNavigation: BackNavigationService
  let afterClosed: Subject<void>
  let close: ReturnType<typeof vi.fn>
  let openSpy: ReturnType<typeof vi.fn>
  const popstateListeners: EventListener[] = []

  beforeEach(() => {
    afterClosed = new Subject<void>()
    close = vi.fn(() => afterClosed.next())
    openSpy = vi.fn().mockReturnValue({ close, afterClosed: () => afterClosed })

    TestBed.configureTestingModule({
      providers: [PasteOverlayService, provideZonelessChangeDetection(), { provide: MatDialog, useValue: { open: openSpy } }]
    })

    popstateListeners.length = 0
    const addEventListener = vi.spyOn(window, "addEventListener").mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
      if (type === "popstate") popstateListeners.push(listener as EventListener)
    })
    backNavigation = TestBed.inject(BackNavigationService)
    addEventListener.mockRestore()
    service = TestBed.inject(PasteOverlayService)
    history.replaceState(null, "")
    vi.spyOn(history, "back").mockImplementation(() => undefined)
    backNavigation.register({ tab: vi.fn(), overlay: vi.fn(), exhausted: vi.fn() })
  })

  it("should open the full screen dialog with the draft and add a back step", async () => {
    await service.open(pasteDraft)

    expect(openSpy).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({ data: { pasteDraft }, width: "100vw", maxWidth: "100vw", height: "100dvh", closeOnNavigation: false, panelClass: "create-paste-overlay" }))
    expect(backNavigation.depth).toBe(1)
  })

  it("should remove the back step when the dialog is closed by its own button", async () => {
    await service.open(pasteDraft)

    afterClosed.next()

    expect(backNavigation.depth).toBe(0)
  })

  it("should close the dialog when the user goes back, keeping the screen where it was", async () => {
    await service.open(pasteDraft)

    popstateListeners.forEach(listener => listener(new PopStateEvent("popstate")))

    expect(close).toHaveBeenCalledTimes(1)
    expect(backNavigation.depth).toBe(0)
  })
})
