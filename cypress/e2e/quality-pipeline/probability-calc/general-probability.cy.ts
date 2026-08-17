import { GeneralProbability } from "@page-object/general-probability"
import { Header } from "@page-object/header"

const header = new Header()
const generalProbability = new GeneralProbability()

const CARD_TITLES = ["Critical hit", "Protect", "Turns to sleep", "Wake up from sleep", "Fully paralyzed", "Freeze", "Snap out of confusion", "Multi hit moves"]

describe("Reference tables", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should render the eight reference tables", () => {
    generalProbability.cardCountIs(8)
    generalProbability.cardTitlesAre(CARD_TITLES)
  })

  it("Should give every table its own headers", () => {
    generalProbability.cardHeadersAre("Critical hit", ["Turns", "One of your", "One of opponent", "One of four"])
    generalProbability.cardHeadersAre("Protect", ["Times", "Success", "Failure"])
    generalProbability.cardHeadersAre("Turns to sleep", ["Turns", "Chance"])
    generalProbability.cardHeadersAre("Wake up from sleep", ["Condition", "Chance to wake up"])
  })

  it("Should give the remaining tables their own headers", () => {
    generalProbability.cardHeadersAre("Fully paralyzed", ["Turns", "1x", "2x", "3x", "4x", "5x"])
    generalProbability.cardHeadersAre("Freeze", ["Duration", "Chance to thaw", "Chance to freeze"])
    generalProbability.cardHeadersAre("Snap out of confusion", ["Duration", "Snap out confusion", "One hit himself"])
    generalProbability.cardHeadersAre("Multi hit moves", ["Times", "Probability", "One critical hit"])
  })

  it("Should fill every table with rows", () => {
    CARD_TITLES.forEach(title => generalProbability.cardHasRows(title))
  })

  it("Should show the critical hit chances of the first turns", () => {
    generalProbability.cardRowIs("Critical hit", 0, ["1", "8.16%", "8.16%", "15.65%"])
    generalProbability.cardRowIs("Critical hit", 4, ["5", "35.00%", "35.00%", "57.50%"])
  })

  it("Should show how Protect fails when it is used again", () => {
    generalProbability.cardRowIs("Protect", 0, ["1x", "100%", "0%"])
    generalProbability.cardRowIs("Protect", 1, ["2x", "33%", "67%"])
  })
})
