export class ExportModal {
  contentIs(content: string) {
    cy.contains(content)
  }

  toggleSpsMode(): ExportModal {
    cy.get('[data-cy="export-evs-sps-toggle"] button').click({ force: true })
    return this
  }

  containsLine(line: string): ExportModal {
    cy.get("mat-dialog-content pre").should("contain.text", line)
    return this
  }

  doesNotContainLine(line: string): ExportModal {
    cy.get("mat-dialog-content pre").should("not.contain.text", line)
    return this
  }

  titleIs(title: string): ExportModal {
    cy.get("mat-dialog-content").parent().find("h2").should("have.text", title)
    return this
  }

  pokemonCountIs(count: number): ExportModal {
    cy.get("mat-dialog-content pre").should("not.have.text", "")
    cy.get("mat-dialog-content pre").should($pre => {
      const blocks = $pre
        .text()
        .split("\n\n")
        .filter(block => block.trim().length > 0)

      expect(blocks).to.have.length(count)
    })
    return this
  }

  copy(): ExportModal {
    cy.get('[data-cy="export-modal-copy"]').click({ force: true })
    return this
  }

  copyButtonIs(label: string): ExportModal {
    cy.get('[data-cy="export-modal-copy"]').should("have.text", label)
    return this
  }
}
