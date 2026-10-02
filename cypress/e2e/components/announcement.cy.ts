import { AnnouncementPopup } from "@page-object/announcement-popup"
import { CreatePaste } from "@page-object/create-paste"
import { Header } from "@page-object/header"
import { PastePage } from "@page-object/paste-page"

const announcement = new AnnouncementPopup()
const createPaste = new CreatePaste()
const header = new Header()
const pastePage = new PastePage()

function visitWithoutBypass(dismissedVersion?: string, path = "/") {
  cy.visit(path, {
    failOnStatusCode: false,
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
    announcement.rememberDismissedVersion("dismissedVersion")

    cy.get<string>("@dismissedVersion").then(dismissedVersion => {
      visitWithoutBypass(dismissedVersion)

      announcement.isHidden()
    })
  })

  it("Should show again when the announcement version changes", () => {
    visitWithoutBypass("2020-01-01")

    announcement.isVisible()
  })
})

describe("Paste pages", () => {
  it("Should stay hidden on the page of a paste", () => {
    visitWithoutBypass(undefined, "/paste/0000000000")

    pastePage.isNotFound()
    announcement.isHidden()
  })

  it("Should stay hidden on Create Paste and show once the visitor goes to the calc", () => {
    visitWithoutBypass(undefined, "/paste")

    createPaste.isOpen()
    announcement.isHidden()

    header.openTeamVsMany()

    announcement.isVisible()
  })
})
