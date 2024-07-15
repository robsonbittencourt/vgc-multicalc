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

  gravity() {
    this.clickOnButton("gravity")
  }

  helpingHand() {
    this.clickOnButton("helping-hand")
  }

  criticalHit() {
    this.clickOnButton("critical-hit")
  }

  battery() {
    this.clickOnButton("battery")
  }

  powerSpot() {
    this.clickOnButton("power-spot")
  }

  tailwindAttacker() {
    this.clickOnButton("tailwind-attacker")
  }

  reflect() {
    this.clickOnButton("reflect")
  }

  lightScreen() {
    this.clickOnButton("light-screen")
  }

  auroraVeil() {
    this.clickOnButton("aurora-veil")
  }

  singleTarget() {
    this.clickOnButton("single-target")
  }

  friendGuard() {
    this.clickOnButton("friend-guard")
  }

  tailwindDefender() {
    this.clickOnButton("tailwind-defender")
  }

  threeSpikes() {
    this.clickOnButton("three-spikes")
  }

  twoSpikes() {
    this.clickOnButton("two-spikes")
  }

  oneSpikes() {
    this.clickOnButton("one-spikes")
  }

  stealthRock() {
    this.clickOnButton("stealth-rock")
  }

  leechSeed() {
    this.clickOnButton("leech-seed")
  }

  private clickOnButton(selector: String) {
    cy.get(`[data-cy=${selector}] button`).click({force: true})
  }

}