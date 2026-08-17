export class BottomNav {
  private tab(label: string) {
    return cy.get(".bottom-tab").contains(label).parent()
  }

  goTo(label: string): BottomNav {
    this.tab(label).click({ force: true })
    cy.wait(200)

    return this
  }

  tabsAre(labels: string[]) {
    cy.get(".bottom-nav .bottom-tab").should($tabs => {
      const found = [...$tabs].map(tab => tab.querySelector("span")!.textContent!.trim())

      expect(found).to.deep.eq(labels)
    })
  }

  activeTabIs(label: string) {
    this.tab(label).should("have.class", "active-bottom-tab")
  }

  onlyActiveTabIs(label: string) {
    cy.get(".bottom-nav .bottom-tab").should($tabs => {
      const active = [...$tabs].filter(tab => tab.classList.contains("active-bottom-tab")).map(tab => tab.querySelector("span")!.textContent!.trim())

      expect(active).to.deep.eq([label])
    })
  }

  isVisible() {
    cy.get(".bottom-nav").should("be.visible").and("not.have.class", "hidden")
  }

  isHidden() {
    cy.get(".bottom-nav").should("have.class", "hidden")
  }
}
