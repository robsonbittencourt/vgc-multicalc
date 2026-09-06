const STABLE_MS = 250
const SELECTOR = '[data-cy="scrollable-content"]'

export class ScrollableContent {
  settles(): this {
    let previous = -1
    let stableSince = 0

    cy.get(SELECTOR).should($content => {
      const scrollable = maxScrollOf($content[0])

      if (scrollable !== previous) {
        previous = scrollable
        stableSince = Date.now()
      }

      expect(Date.now() - stableSince >= STABLE_MS, "scrollable content settled").to.eq(true)
    })

    return this
  }

  scrollTo(offset: number): this {
    this.settles()

    cy.get(SELECTOR).should($content => {
      const element = $content[0]
      const target = reachable(element, offset)

      element.scrollTo({ top: target, behavior: "instant" })

      expect(element.scrollTop, "scroll position of the content").to.eq(target)
    })

    return this
  }

  scrollIs(offset: number) {
    this.settles()

    cy.get(SELECTOR).should($content => {
      const element = $content[0]

      expect(element.scrollTop, "scroll position of the content").to.eq(reachable(element, offset))
    })
  }

  scrollIsDown() {
    this.settles()

    cy.get(SELECTOR).invoke("scrollTop").should("be.greaterThan", 0)
  }

  currentScroll(): Cypress.Chainable<number> {
    this.settles()

    return cy.get(SELECTOR).invoke("scrollTop") as unknown as Cypress.Chainable<number>
  }
}

function reachable(element: HTMLElement, offset: number): number {
  return Math.min(offset, maxScrollOf(element))
}

function maxScrollOf(element: HTMLElement): number {
  return element.scrollHeight - element.clientHeight
}
