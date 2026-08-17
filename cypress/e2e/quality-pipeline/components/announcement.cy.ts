import { AnnouncementPopup } from "@page-object/announcement-popup"

const ANNOUNCEMENT_VERSION = "2026-07-01"

const announcement = new AnnouncementPopup()

function visitWithoutBypass(dismissedVersion?: string) {
  cy.visit("http://localhost:4200/", {
    onBeforeLoad(win) {
      win.localStorage.removeItem("announcementBypass")

      if (dismissedVersion) {
        win.localStorage.setItem("announcementDismissed", dismissedVersion)
      } else {
        win.localStorage.removeItem("announcementDismissed")
      }
    }
  })
}

describe("Visibility on the first visit", () => {
  it("Should be suppressed by the bypass used across the suite", () => {
    announcement.isHidden()
  })

  it("Should greet the first visit", () => {
    visitWithoutBypass()

    announcement.isVisible()
    announcement.titleIs("What's New!")
  })
})

describe("Dismissing", () => {
  it("Should hide on Close but come back on the next visit", () => {
    visitWithoutBypass()

    announcement.close()

    announcement.isHidden()

    visitWithoutBypass()

    announcement.isVisible()
  })

  it("Should stay hidden after Don't show again", () => {
    visitWithoutBypass()

    announcement.dismissForever()

    announcement.isHidden()
    announcement.dismissedVersionIs(ANNOUNCEMENT_VERSION)

    visitWithoutBypass(ANNOUNCEMENT_VERSION)

    announcement.isHidden()
  })

  it("Should show again when the announcement version changes", () => {
    visitWithoutBypass("2020-01-01")

    announcement.isVisible()
  })
})
