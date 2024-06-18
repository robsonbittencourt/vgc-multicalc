export class TeamMember {

  private _element: any
  
  constructor(pokemonName: string) {
    this._element = cy.get('[data-cy="team-member-tab"]').filter(`:contains(${pokemonName})`)
  }

  select() {
    this._element.click({force: true})
  }

  selectAttackOne(): TeamMember {
    cy.get('[data-cy="attack1"] input').click({force: true})
    return this
  }

  selectAttackTwo(): TeamMember {
    cy.get('[data-cy="attack2"] input').click({force: true})
    return this
  }

  selectAttackThree(): TeamMember {
    cy.get('[data-cy="attack3"] input').click({force: true})
    return this
  }

  selectStatsModifier(stat: string, modifier: string): TeamMember {
    cy.get(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').click({force: true}).get('mat-option').contains(modifier).click({force: true})
    return this
  }

  terastalyze(): TeamMember {
    cy.get('[data-cy="terastal-button"]').click({force: true})
    return this
  }

  delete() {
    cy.get('[data-cy="delete-from-team-button"]').click({force: true})
  }

}