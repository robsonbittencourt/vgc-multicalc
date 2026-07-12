import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MatSnackBar } from "@angular/material/snack-bar"
import { SnackbarService } from "@app/services/snackbar.service"
import { MockOf } from "@app/test-utils"

describe("SnackbarService", () => {
  let service: SnackbarService
  let snackBarSpy: MockOf<MatSnackBar>

  beforeEach(() => {
    snackBarSpy = { open: vi.fn() } as unknown as MockOf<MatSnackBar>

    TestBed.configureTestingModule({
      providers: [SnackbarService, { provide: MatSnackBar, useValue: snackBarSpy }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(SnackbarService)
  })

  describe("open", () => {
    it("should open a snackbar with the message and no action", () => {
      service.open("Saved successfully")

      expect(snackBarSpy.open).toHaveBeenCalledWith("Saved successfully", "", { duration: 4000, panelClass: "center", verticalPosition: "bottom" })
    })
  })

  describe("openWithAction", () => {
    it("should open a snackbar with an action label and invoke the callback when the action is clicked", () => {
      const onAction = vi.fn().mockReturnValue({ subscribe: (cb: () => void) => cb() })
      snackBarSpy.open.mockReturnValue({ onAction } as never)
      const callback = vi.fn()

      service.openWithAction("Team deleted", "Undo", callback)

      expect(snackBarSpy.open).toHaveBeenCalledWith("Team deleted", "Undo", { panelClass: "center", verticalPosition: "bottom" })
      expect(callback).toHaveBeenCalled()
    })
  })
})
