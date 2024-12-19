export class ExportModal {
  contentIs(content: string) {
    cy.contains(content)
  }
}
