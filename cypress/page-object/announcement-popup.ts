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

  rememberDismissedVersion(alias: string) {
    cy.window().then(win => {
      const version = win.localStorage.getItem("announcementDismissed")

      expect(version).to.match(/\d{4}-\d{2}-\d{2}/)

      cy.wrap(version).as(alias)
    })
  }
}
