export class AnnouncementPopup {
  isVisible() {
    cy.get('[data-cy="announcement-popup"]').should("be.visible")
  }

  isHidden() {
    cy.get('[data-cy="announcement-popup"]').should("not.exist")
  }

  titleIs(title: string) {
    cy.get('[data-cy="announcement-title"]').should("have.text", title)
  }

  close(): AnnouncementPopup {
    cy.get('[data-cy="announcement-close"]').click({ force: true })
    return this
  }

  dismissForever(): AnnouncementPopup {
    cy.get('[data-cy="announcement-dismiss-forever"]').click({ force: true })
    return this
  }

  dismissedVersionIs(version: string) {
    cy.window().then(win => {
      expect(win.localStorage.getItem("announcementDismissed")).to.eq(version)
    })
  }
}
