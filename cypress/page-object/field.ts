export class Field {
  tabletsOfRuin() {
    this.clickOnButton("tablets-of-ruin")
  }

  swordOfRuin() {
    this.clickOnButton("sword-of-ruin")
  }

  vesselOfRuin() {
    this.clickOnButton("vessel-of-ruin")
  }

  beadsOfRuin() {
    this.clickOnButton("beads-of-ruin")
  }

  sun() {
    this.clickOnButton("sun")
  }

  rain() {
    this.clickOnButton("rain")
  }

  sand() {
    this.clickOnButton("sand")
  }

  snow() {
    this.clickOnButton("snow")
  }

  eletricTerrain() {
    this.clickOnButton("eletric-terrain")
  }

  grassyTerrain() {
    this.clickOnButton("grassy-terrain")
  }

  psychicTerrain() {
    this.clickOnButton("psychic-terrain")
  }

  mistyTerrain() {
    this.clickOnButton("misty-terrain")
  }

  magicRoom() {
    this.clickOnButton("magic-room")
  }

  wonderRoom() {
    this.clickOnButton("wonder-room")
  }

  trickRoom() {
    this.clickOnButton("trick-room")
  }

  gravity() {
    this.clickOnButton("gravity")
  }

  helpingHandAttacker() {
    this.clickOnButton("helping-hand-attacker")
  }

  helpingHandDefender() {
    this.clickOnButton("helping-hand-defender")
  }

  criticalHitAttacker() {
    this.clickOnButton("critical-hit-attacker")
  }

  criticalHitDefender() {
    this.clickOnButton("critical-hit-defender")
  }

  batteryAttacker() {
    this.clickOnButton("battery-attacker")
  }

  batteryDefender() {
    this.clickOnButton("battery-defender")
  }

  powerSpotAttacker() {
    this.clickOnButton("power-spot-attacker")
  }

  powerSpotDefender() {
    this.clickOnButton("power-spot-defender")
  }

  tailwindAttacker() {
    this.clickOnButton("tailwind-attacker")
  }

  tailwindDefender() {
    this.clickOnButton("tailwind-defender")
  }

  reflectAttacker() {
    this.clickOnButton("reflect-attacker")
  }

  reflectDefender() {
    this.clickOnButton("reflect-defender")
  }

  lightScreenAttacker() {
    this.clickOnButton("light-screen-attacker")
  }

  lightScreenDefender() {
    this.clickOnButton("light-screen-defender")
  }

  auroraVeilAttacker() {
    this.clickOnButton("aurora-veil-attacker")
  }

  auroraVeilDefender() {
    this.clickOnButton("aurora-veil-defender")
  }

  singleTargetAttacker() {
    this.clickOnButton("single-target-attacker")
  }

  singleTargetDefender() {
    this.clickOnButton("single-target-defender")
  }

  friendGuardAttacker() {
    this.clickOnButton("friend-guard-attacker")
  }

  friendGuardDefender() {
    this.clickOnButton("friend-guard-defender")
  }

  threeSpikesAttacker() {
    this.clickOnButton("three-spikes-attacker")
  }

  threeSpikesDefender() {
    this.clickOnButton("three-spikes-defender")
  }

  twoSpikesAttacker() {
    this.clickOnButton("two-spikes-attacker")
  }

  twoSpikesDefender() {
    this.clickOnButton("two-spikes-defender")
  }

  oneSpikesAttacker() {
    this.clickOnButton("one-spikes-attacker")
  }

  oneSpikesDefender() {
    this.clickOnButton("one-spikes-defender")
  }

  stealthRockAttacker() {
    this.clickOnButton("stealth-rock-attacker")
  }

  stealthRockDefender() {
    this.clickOnButton("stealth-rock-defender")
  }

  leechSeedAttacker() {
    this.clickOnButton("leech-seed-attacker")
  }

  leechSeedDefender() {
    this.clickOnButton("leech-seed-defender")
  }

  neutralizingGas() {
    this.clickOnButton("neutralizing-gas")
  }

  isActiveOption(selector: string) {
    cy.get(`[data-cy=${selector}]`).should("have.class", "mat-button-toggle-checked")
  }

  isNotActiveOption(selector: string) {
    cy.get(`[data-cy=${selector}]`).should("not.have.class", "mat-button-toggle-checked")
  }

  private clickOnButton(selector: string) {
    cy.get(`[data-cy=${selector}] button`).click({ force: true })
  }
}
