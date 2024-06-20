export class Pokemon {


  selectAttackOne(): Pokemon {
    cy.get('[data-cy="attack1"] input').click({force: true})
    return this
  }

  selectAttackTwo(): Pokemon {
    cy.get('[data-cy="attack2"] input').click({force: true})
    return this
  }

  selectAttackThree(): Pokemon {
    cy.get('[data-cy="attack3"] input').click({force: true})
    return this
  }

  changeAttackOne(attackName: string): Pokemon {
    cy.get('[data-cy="pokemon-attack-1"] input').type(attackName, {force: true}).type("{downArrow}").type("{enter}")
    return this
  }

  selectStatsModifier(stat: string, modifier: string): Pokemon {
    cy.get(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').click({force: true}).get('mat-option').contains(modifier).click({force: true})
    return this
  }

  terastalyze(): Pokemon {
    cy.get('[data-cy="terastal-button"]').click({force: true})
    return this
  }

  burned() {
    cy.get('[data-cy="pokemon-status"] input').type("Burn", {force: true}).type("{downArrow}").type("{enter}")
  }

  paralyzed() {
    cy.get('[data-cy="pokemon-status"] input').type("Paralysis", {force: true}).type("{downArrow}").type("{enter}")
  }

  poisoned() {
    cy.get('[data-cy="pokemon-status"] input').type("Poison", {force: true}).type("{downArrow}").type("{enter}")
  }

}