import { Field } from "@page-object/field"
import { Header } from "@page-object/header"

const field = new Field()
const header = new Header()

describe("Toggle groups", () => {
  beforeEach(() => {
    header.openOneVsOne()
  })

  it("Should keep only one weather active", () => {
    field.sun()

    field.isActiveOption("sun")

    field.rain()

    field.isActiveOption("rain")
    field.isNotActiveOption("sun")
  })

  it("Should keep only one terrain active", () => {
    field.eletricTerrain()

    field.isActiveOption("eletric-terrain")

    field.grassyTerrain()

    field.isActiveOption("grassy-terrain")
    field.isNotActiveOption("eletric-terrain")
  })

  it("Should keep only one amount of spikes active on the left side", () => {
    field.threeSpikesAttacker()
    field.onlyActiveOptionIs("three-spikes-attacker")

    field.twoSpikesAttacker()
    field.onlyActiveOptionIs("two-spikes-attacker")

    field.oneSpikesAttacker()
    field.onlyActiveOptionIs("one-spikes-attacker")
  })

  it("Should keep only one amount of spikes active on the right side", () => {
    field.threeSpikesDefender()
    field.onlyActiveOptionIs("three-spikes-defender")

    field.twoSpikesDefender()
    field.onlyActiveOptionIs("two-spikes-defender")

    field.oneSpikesDefender()
    field.onlyActiveOptionIs("one-spikes-defender")
  })
})

describe("Labels of the sides", () => {
  it("Should name the sides Left and Right in One vs One", () => {
    header.openOneVsOne()

    field.sideLabelsAre(["Left", "Both", "Right"])
  })

  it("Should name the sides Attacker and Defender in the multi calc", () => {
    header.openTeamVsMany()

    field.sideLabelsAre(["Attacker", "Both", "Defender"])
  })
})

describe("Options behind a feature flag", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("announcementBypass", "true")
        win.localStorage.setItem("featureFlags", JSON.stringify({ teraType: true, allowAllPokes: true, allItems: true }))
      }
    })

    header.openOneVsOne()
  })

  it("Should not render the options of the disabled flags", () => {
    field.optionIsVisible("sun")
    const togglesBehindAFeatureFlag = ["battery-attacker", "power-spot-attacker", "battery-defender", "power-spot-defender", "tablets-of-ruin", "sword-of-ruin", "vessel-of-ruin", "beads-of-ruin", "neutralizing-gas"]

    togglesBehindAFeatureFlag.forEach(option => field.optionIsHidden(option))
  })
})

describe("Scope by screen", () => {
  it("Should not carry a toggle of One vs One to the multi calc", () => {
    header.openOneVsOne()

    field.trickRoom()

    field.isActiveOption("trick-room")

    header.openTeamVsMany()

    field.isNotActiveOption("trick-room")
  })
})
