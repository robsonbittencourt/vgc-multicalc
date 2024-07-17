export class ActivePokemon {

  selectAttackOne(): ActivePokemon {
    cy.get('[data-cy="attack1"] input').click({force: true})
    return this
  }

  selectAttackTwo(): ActivePokemon {
    cy.get('[data-cy="attack2"] input').click({force: true})
    return this
  }

  selectAttackThree(): ActivePokemon {
    cy.get('[data-cy="attack3"] input').click({force: true})
    return this
  }

  selectAttackFour(): ActivePokemon {
    cy.get('[data-cy="attack4"] input').click({force: true})
    return this
  }

  changeAttackOne(attackName: string): ActivePokemon {
    cy.get('[data-cy="pokemon-attack-1"] input').type(attackName, {force: true}).type("{downArrow}").type("{enter}")
    return this
  }

  selectStatsModifier(stat: string, modifier: string): ActivePokemon {
    cy.get(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').click({force: true}).get('mat-option').contains(modifier).click({force: true})
    return this
  }

  terastalyze(): ActivePokemon {
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