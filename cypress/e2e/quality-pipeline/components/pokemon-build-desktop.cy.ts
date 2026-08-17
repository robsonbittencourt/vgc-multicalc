import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Field } from "@page-object/field"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { Header } from "@page-object/header"

const header = new Header()
const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Select the Pokémon", () => {
  beforeEach(() => {
    header.openOneVsOne()
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should update the build when a Pokémon is selected from the table", () => {
    leftPokemonBuild.selectPokemonByFilter("Incineroar", "Incineroar")

    leftPokemonBuild.nameIs("Incineroar")
    leftPokemonBuild.abilityIs("Intimidate")
  })

  it("Should select the first Pokémon of the list when the field loses the focus", () => {
    leftPokemonBuild.inputPokemonName("Rillaboom").clickOutside()

    leftPokemonBuild.nameIs("Rillaboom")
  })

  it("Should confirm the first Pokémon of the list when Tab is pressed", () => {
    leftPokemonBuild.inputPokemonName("Vaporeon").tab()

    leftPokemonBuild.nameIs("Vaporeon")
  })

  it("Should keep the current Pokémon when the table is closed with Esc without typing", () => {
    leftPokemonBuild.openPokemonTable().closeTable()

    leftPokemonBuild.nameIs("Charizard")
  })

  it("Should confirm the typed Pokémon when the table is closed with Esc", () => {
    leftPokemonBuild.inputPokemonName("Vaporeon").closeTable()

    leftPokemonBuild.nameIs("Vaporeon")
  })

  it("Should select the Pokémon highlighted by the arrow keys when Enter is pressed", () => {
    leftPokemonBuild.inputPokemonName("Chi-Yu")

    leftPokemonBuild.pressArrowDown()
    leftPokemonBuild.tableEntryIsSelected("Chi-Yu")

    leftPokemonBuild.pressEnter()

    leftPokemonBuild.nameIs("Chi-Yu")
  })

  it("Should move the highlight back to the first entry when the arrow up is pressed", () => {
    leftPokemonBuild.inputPokemonName("Chien-Pao")

    leftPokemonBuild.pressArrowDown(2)
    leftPokemonBuild.pressArrowUp()

    leftPokemonBuild.tableEntryIsSelected("Chien-Pao")
    leftPokemonBuild.pressEnter()

    leftPokemonBuild.nameIs("Chien-Pao")
  })

  it("Should scroll the table to the current Pokémon when it is reopened", () => {
    leftPokemonBuild.selectPokemonByFilter("Zapdos", "Zapdos")

    leftPokemonBuild.openPokemonTable()

    leftPokemonBuild.tableEntryIsSelected("Zapdos")
    leftPokemonBuild.tableEntryIsVisible("Zapdos")
    leftPokemonBuild.tableIsScrolled()
  })

  it("Should bring the default set of the meta when a Pokémon is added", () => {
    leftPokemonBuild.selectPokemonByFilter("Rillaboom", "Rillaboom")

    leftPokemonBuild.abilityIs("Grassy Surge")
    leftPokemonBuild.attackIs(1, "Wood Hammer")
  })

  it("Should disable the item field for a Pokémon that cannot hold an item", () => {
    leftPokemonBuild.selectPokemonByFilter("Ogerpon-Corner", "Ogerpon-Cornerstone")

    leftPokemonBuild.itemIsDisabled()
  })

  it("Should allow changing the item of Ogerpon-Teal", () => {
    leftPokemonBuild.selectPokemonByFilter("Ogerpon", "Ogerpon")
    leftPokemonBuild.selectItemByFilter("Leftovers", "Leftovers")

    leftPokemonBuild.itemIs("Leftovers")
  })
})

describe("Item, ability and moves", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should show the selected item in the build and in the hp badge", () => {
    leftPokemonBuild.selectItemByFilter("Leftovers", "Leftovers")

    leftPokemonBuild.itemIs("Leftovers")
    leftDamageResult.withPokemonIcon("leftovers")
  })

  it("Should fall back to none when the item is cleared", () => {
    leftPokemonBuild.cleanItem()

    leftPokemonBuild.itemIs("(none)")
  })

  it("Should list only the abilities of the current Pokémon", () => {
    leftPokemonBuild.selectAbilityByFilter("Bulletproof", "Bulletproof")

    leftPokemonBuild.abilityIs("Bulletproof")
  })

  it("Should fill the move slot and show its base power", () => {
    leftPokemonBuild.changeAttackOneByFilter("Body Press", "Body Press")

    leftPokemonBuild.attackIs(1, "Body Press")
    leftPokemonBuild.moveBpIs(1, "80")
  })

  it("Should clear the move when its text is erased and the field loses the focus", () => {
    leftPokemonBuild.clearAttack(3).clickOutside()

    leftPokemonBuild.attackIs(3, "")
  })

  it("Should clear the field when an unknown move is typed", () => {
    leftPokemonBuild.typeAttack(2, "Not A Real Move").clickOutside()

    leftPokemonBuild.attackIs(2, "")
  })

  it("Should clear the field when an unknown move is typed and Tab is pressed", () => {
    leftPokemonBuild.typeAttack(2, "Not A Real Move").tab()

    leftPokemonBuild.attackIs(2, "")
  })

  it("Should close the table and release the focus when the move of the fourth slot is selected", () => {
    leftPokemonBuild.changeAttackFourByFilter("Body Press", "Body Press")

    leftPokemonBuild.attackIs(4, "Body Press")
    leftPokemonBuild.tableIsClosed()
    leftPokemonBuild.noMoveHasFocus()
  })

  it("Should move the focus to the next slot when a move is selected", () => {
    leftPokemonBuild.changeAttackTwoByFilter("Body Press", "Body Press")

    leftPokemonBuild.attackIs(2, "Body Press")
    leftPokemonBuild.moveHasFocus(3)
  })

  it("Should group Meta above Moves in the moves table", () => {
    leftPokemonBuild.openMoveTable(1)

    leftPokemonBuild.firstGroupsAre(["Meta", "Moves"])
  })

  it("Should group the items table by Meta, Items, Pokémon specific items and Useless items", () => {
    leftPokemonBuild.openItemTable()

    leftPokemonBuild.firstGroupsAre(["Meta", "Items"])
  })
})

describe("Actionable ability", () => {
  beforeEach(() => {
    header.openOneVsOne()
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should show the checkbox and the stat selector for an actionable ability", () => {
    leftPokemonBuild.selectPokemonByFilter("Roaring Moon", "Roaring Moon")

    leftPokemonBuild.abilityIs("Protosynthesis")
    leftPokemonBuild.abilityCheckIsVisible()
    leftPokemonBuild.abilityCheckIsEnabled()

    leftPokemonBuild.activateAbility()

    leftPokemonBuild.paradoxStatSelectIsVisible()
  })

  it("Should hide the checkbox for an ability that is not actionable", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    leftPokemonBuild.selectAbilityByFilter("Bulletproof", "Bulletproof")

    leftPokemonBuild.abilityCheckIsHidden()
  })

  it("Should disable the checkbox when the field already activates the ability", () => {
    leftPokemonBuild.selectPokemonByFilter("Roaring Moon", "Roaring Moon")

    new Field().sun()

    leftPokemonBuild.abilityCheckIsDisabled()
  })
})

describe("Active move", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should change the active move when the checkbox is marked", () => {
    leftPokemonBuild.moveIsActive(1)

    leftPokemonBuild.selectAttackTwo()

    leftPokemonBuild.moveIsActive(2)
    leftPokemonBuild.moveIsNotActive(1)
  })

  it("Should activate the move when its field is clicked", () => {
    leftPokemonBuild.moveIsActive(1)

    leftPokemonBuild.openMoveTable(3)

    leftPokemonBuild.moveIsActive(3)
    leftPokemonBuild.moveIsNotActive(1)
  })

  it("Should change the damage result when the active move changes", () => {
    leftDamageResult.damageIs(0, 117.2, 139.7, 218, 260)

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 12.3, 14.5, 23, 27)
  })
})

describe("EVs and SPs", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
    leftPokemonBuild.ensureEvMode()
  })

  it("Should update the final stat and the remaining when an EV is typed", () => {
    leftPokemonBuild.clearEvs()
    leftPokemonBuild.hpEvs(100)

    leftPokemonBuild.evValueIs("hp", 100)
    leftPokemonBuild.remainingIs(420)
  })

  it("Should clamp the EV value at the maximum", () => {
    leftPokemonBuild.clearEvs()
    leftPokemonBuild.hpEvs(300)

    leftPokemonBuild.evValueIs("hp", 252)
    leftPokemonBuild.statValueIs("hp", "237")
  })

  it("Should clear the six stats and restore the remaining", () => {
    leftPokemonBuild.clearEvs()

    leftPokemonBuild.evsIs(0, 0, 0, 0, 0, 0)
    leftPokemonBuild.remainingIs(524)
  })

  it("Should switch the label and the values between EVs and SPs", () => {
    leftPokemonBuild.clearEvs()
    leftPokemonBuild.hpEvs(8)

    leftPokemonBuild.evLabelIs("EVs")
    leftPokemonBuild.evValueIs("hp", 8)

    leftPokemonBuild.toggleSpsMode()

    leftPokemonBuild.evLabelIs("SPs")
    leftPokemonBuild.evValueIs("hp", 1)
  })

  it("Should update the final stat and the remaining when the slider is dragged", () => {
    leftPokemonBuild.clearEvs()

    leftPokemonBuild.setEvSliderValue("hp", "HP", 100)

    leftPokemonBuild.evValueIs("hp", 100)
    leftPokemonBuild.statValueIs("hp", "218")
    leftPokemonBuild.remainingIs(420)
  })

  it("Should let the slider spend the last point of the budget", () => {
    leftPokemonBuild.clearEvs()
    leftPokemonBuild.setEvSliderValue("hp", "HP", 252)
    leftPokemonBuild.atkEvs(252)

    leftPokemonBuild.setEvSliderValue("def", "Defense", 12)

    leftPokemonBuild.evValueIs("def", 12)
    leftPokemonBuild.remainingIs(0)
  })

  it("Should keep the slider clamped when the budget is exceeded by the arrow key", () => {
    leftPokemonBuild.clearEvs()
    leftPokemonBuild.setEvSliderValue("hp", "HP", 252)
    leftPokemonBuild.atkEvs(252)

    leftPokemonBuild.pressEvSliderArrowRight("hp", "HP")

    leftPokemonBuild.evValueIs("hp", 252)
    leftPokemonBuild.remainingIs(12)
  })

  it("Should keep the slider clamped when the budget is exceeded by mouse and touch", () => {
    leftPokemonBuild.clearEvs()
    leftPokemonBuild.setEvSliderValue("hp", "HP", 252)
    leftPokemonBuild.atkEvs(252)

    leftPokemonBuild.dragEvSlider("hp", "HP", 900)
    leftPokemonBuild.evValueIs("hp", 252)

    leftPokemonBuild.touchEvSliderToRight("hp", "HP")

    leftPokemonBuild.evValueIs("hp", 252)
    leftPokemonBuild.remainingIs(12)
  })

  it("Should change the stat value when the nature changes", () => {
    leftPokemonBuild.selectNature("Adamant")
    leftPokemonBuild.statValueIs("spa", "-58")

    leftPokemonBuild.selectNature("Modest")
    leftPokemonBuild.statValueIs("spa", "+71")
  })

  it("Should show the jumps only on a stat with a beneficial nature", () => {
    leftPokemonBuild.selectNature("Adamant")

    leftPokemonBuild.hasJumps("atk")
    leftPokemonBuild.hasNoJumps("spa")
  })
})

describe("Boosts, hp and status", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should change the damage result when a boost is applied", () => {
    leftDamageResult.damageIs(0, 117.2, 139.7, 218, 260)

    leftPokemonBuild.selectStatsModifier("atk", "+2")

    leftDamageResult.damageIs(0, 236.5, 278.4, 440, 518)
  })

  it("Should show the Mod column only when a stat is modified", () => {
    leftPokemonBuild.statModifiedIsHidden("atk")

    leftPokemonBuild.selectStatsModifier("atk", "+2")

    leftPokemonBuild.statModifiedIs("atk", "422")
  })

  it("Should change the remaining hp of the badge when the hp percentage changes", () => {
    leftPokemonBuild.hpPercentage(50)

    leftPokemonBuild.hpPercentageIs(50)
    leftDamageResult.withMaxHpValue(220)
    leftDamageResult.surviveWithThisHpAmmount(29)
  })

  it("Should show the status icon in the hp badge", () => {
    leftPokemonBuild.burned()

    leftDamageResult.hasStatusIcon()
  })

  it("Should change the damage result when the Pokémon is burned", () => {
    leftDamageResult.damageIs(0, 117.2, 139.7, 218, 260)

    leftPokemonBuild.burned()

    leftDamageResult.damageIs(0, 177.4, 209.6, 330, 390)
  })

  it("Should show the percentage of the modifier in the Mod column tooltip", () => {
    leftPokemonBuild.selectStatsModifier("atk", "+2")

    leftPokemonBuild.statModifiedTooltipIs("atk", "+100%")

    leftPokemonBuild.selectStatsModifier("atk", "-2")

    leftPokemonBuild.statModifiedTooltipIs("atk", "-50%")
  })
})

describe("Hits, allies fainted and last move failed", () => {
  beforeEach(() => {
    header.openOneVsOne()
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should show the hits select only for a multi hit move", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])

    leftPokemonBuild.hitsSelectIsHidden()

    leftPokemonBuild.importPokemon(poke["dragapult"])

    leftPokemonBuild.hitsSelectIsVisible()
  })

  it("Should change the damage result when the number of hits changes", () => {
    leftPokemonBuild.importPokemon(poke["dragapult"])
    leftDamageResult.damageIs(0, 32.7, 39.2, 61, 73)

    leftPokemonBuild.hitsTaken(2)

    leftDamageResult.descriptionContains("122-146 (65.5 - 78.4%)")
    leftDamageResult.rollsHaveHits(2)
  })

  it("Should show the allies fainted control with Last Respects", () => {
    leftPokemonBuild.importPokemon(poke["basculegion"])

    leftPokemonBuild.alliesFaintedIsVisible()
  })

  it("Should change the damage result when an ally faints", () => {
    leftPokemonBuild.importPokemon(poke["basculegion"])
    leftDamageResult.damageIs(0, 15.5, 18.8, 29, 35)

    leftPokemonBuild.allieFainted(2)

    leftDamageResult.damageIs(0, 47.3, 55.9, 88, 104)
  })

  it("Should show the last move failed control with Stomping Tantrum", () => {
    leftPokemonBuild.importPokemon(poke["great-tusk-high-atk"])
    leftPokemonBuild.changeAttackOneByFilter("Stomping Tantrum", "Stomping Tantrum")
    leftPokemonBuild.selectAttackOne()

    leftPokemonBuild.lastMoveFailedIsVisible()
  })

  it("Should change the damage result when the last move failed", () => {
    leftPokemonBuild.importPokemon(poke["ting-lu"]).selectAttackTwo()
    rightPokemonBuild.importPokemon(poke["rillaboom"])
    leftDamageResult.damageIs(1, 14.4, 17.3, 30, 36)

    leftPokemonBuild.lastMoveFailed()

    leftDamageResult.damageIs(1, 29.4, 34.7, 61, 72)
  })

  it("Should rename the hits label to Hits Taken with Rage Fist", () => {
    leftPokemonBuild.importPokemon(poke["annihilape"])
    leftPokemonBuild.selectAttackOne()

    leftPokemonBuild.hitsLabelIs("Hits Taken")

    leftPokemonBuild.selectAttackThree()

    leftPokemonBuild.hitsSelectIsHidden()
  })
})

describe("Tera type", () => {
  beforeEach(() => {
    header.openOneVsOne()
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should change the damage result when the defender terastalizes", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.isNotTerastalyzed()
    leftDamageResult.damageIs(0, 117.2, 139.7, 218, 260)

    rightPokemonBuild.selectTeraType("Flying")
    rightPokemonBuild.terastalyze()

    rightPokemonBuild.isTerastalyzed()
    leftDamageResult.descriptionContains("Ursaluna Headlong Rush vs. Tyranitar: 0-0 (0 - 0%)")
  })

  it("Should disable the tera selector for Ogerpon", () => {
    leftPokemonBuild.selectPokemonByFilter("Ogerpon", "Ogerpon")

    leftPokemonBuild.teraIsDisabled()
  })
})

describe("Terastal button with special forms", () => {
  beforeEach(() => {
    header.openOneVsOne()
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should not terastalize Terapagos", () => {
    leftPokemonBuild.importPokemon(poke["terapagos"])

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos")
    leftPokemonBuild.abilityIs("Tera Shift")
    leftPokemonBuild.isNotTerastalyzed()
  })

  it("Should cycle Terapagos-Terastal and Terapagos-Stellar on each click", () => {
    leftPokemonBuild.importPokemon(poke["terapagos-terastal"])
    leftPokemonBuild.isNotTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Stellar")
    leftPokemonBuild.abilityIs("Teraform Zero")
    leftPokemonBuild.isTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Terastal")
    leftPokemonBuild.abilityIs("Tera Shell")
    leftPokemonBuild.isNotTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Stellar")
    leftPokemonBuild.abilityIs("Teraform Zero")
    leftPokemonBuild.isTerastalyzed()
  })

  it("Should apply and revert the Embody Aspect and the boost of Ogerpon", () => {
    leftPokemonBuild.importPokemon(poke["ogerpon-hearthflame"])
    leftPokemonBuild.abilityIs("Mold Breaker")
    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.abilityIs("Embody Aspect (Hearthflame)")
    leftPokemonBuild.isTerastalyzed()
    leftPokemonBuild.boostsIs(1, 0, 0, 0, 0)

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.abilityIs("Mold Breaker")
    leftPokemonBuild.isNotTerastalyzed()
    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })
})

describe("Tera type disabled by the feature flag", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("announcementBypass", "true")
        win.localStorage.setItem("featureFlags", JSON.stringify({ teraType: false, allowAllPokes: true, allItems: true }))
      }
    })

    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should not render any tera control", () => {
    leftPokemonBuild.teraControlsAreHidden()
  })
})

describe("Alternative forms", () => {
  beforeEach(() => {
    header.openOneVsOne()
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should toggle Aegislash between Shield and Blade", () => {
    leftPokemonBuild.selectPokemonByFilter("Aegislash-Shield", "Aegislash-Shield")

    leftPokemonBuild.toggleAegislashForm()

    leftPokemonBuild.nameIs("Aegislash-Blade")
  })

  it("Should toggle Palafin between Zero and Hero", () => {
    leftPokemonBuild.selectPokemonByFilter("Palafin", "Palafin")

    leftPokemonBuild.togglePalafinForm()

    leftPokemonBuild.nameIs("Palafin-Hero")

    leftPokemonBuild.togglePalafinForm()

    leftPokemonBuild.nameIs("Palafin")
  })

  it("Should keep the build of Palafin when the form is toggled", () => {
    leftPokemonBuild.selectPokemonByFilter("Palafin", "Palafin")

    leftPokemonBuild.abilityIs("Zero to Hero")
    leftPokemonBuild.itemIs("Leftovers")
    leftPokemonBuild.natureIs("Adamant")

    leftPokemonBuild.togglePalafinForm()

    leftPokemonBuild.nameIs("Palafin-Hero")
    leftPokemonBuild.abilityIs("Zero to Hero")
    leftPokemonBuild.itemIs("Leftovers")
    leftPokemonBuild.natureIs("Adamant")
  })

  it("Should bring the default set of Palafin-Hero when it is selected directly", () => {
    leftPokemonBuild.selectPokemonByFilter("Palafin-Hero", "Palafin-Hero")

    leftPokemonBuild.abilityIs("Zero to Hero")
    leftPokemonBuild.itemIs("Mystic Water")
    leftPokemonBuild.natureIs("Adamant")
    leftPokemonBuild.attackIs(1, "Jet Punch")
  })

  it("Should activate Commander for Dondozo", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])
    leftPokemonBuild.commanderNotActivated()

    leftPokemonBuild.activateCommander()

    leftPokemonBuild.commanderIsActivated()
  })

  it("Should activate the Paradox ability and choose the boosted stat", () => {
    leftPokemonBuild.importPokemon(poke["flutter-mane"])
    leftDamageResult.damageIs(0, 17.7, 20.9, 33, 39)

    leftPokemonBuild.activateAbility()
    leftPokemonBuild.selectParadoxStat("Spa")

    leftDamageResult.descriptionContains("Protosynthesis Flutter Mane Shadow Ball")
    leftDamageResult.damageIs(0, 22.5, 26.8, 42, 50)
  })

  it("Should show the mega icon only with a compatible mega stone", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    leftPokemonBuild.megaIconIsHidden()

    leftPokemonBuild.importPokemon(poke["excadrill-mega"])

    leftPokemonBuild.megaIconIsVisible()
  })

  it("Should not show the form button of another Pokémon", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])

    leftPokemonBuild.aegislashToggleIsHidden()
  })
})

describe("Duplicate item warning", () => {
  const team = new Team()
  const teamPokemonBuild = new PokemonBuild("your-team")

  beforeEach(() => {
    header.openTeamVsMany()
    team.importPokepaste(poke["default-team"])
  })

  it("Should warn when two team members hold the same item", () => {
    team.selectPokemon("Koraidon")
    teamPokemonBuild.hasNoDuplicateItemWarning()

    teamPokemonBuild.selectItemByFilter("Choice Specs", "Choice Specs")

    teamPokemonBuild.hasDuplicateItemWarning()
  })

  it("Should show the warning on both tabs and clear it when the item changes", () => {
    team.selectPokemon("Koraidon")
    team.tabHasNoDuplicateItemWarning("Koraidon")
    team.tabHasNoDuplicateItemWarning("Miraidon")

    teamPokemonBuild.selectItemByFilter("Choice Specs", "Choice Specs")

    team.tabHasDuplicateItemWarning("Koraidon")
    team.tabHasDuplicateItemWarning("Miraidon")

    teamPokemonBuild.selectItemByFilter("Clear Amulet", "Clear Amulet")

    team.tabHasNoDuplicateItemWarning("Koraidon")
    team.tabHasNoDuplicateItemWarning("Miraidon")
  })
})

describe("Optimize bulk", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["bronzong"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
    rightPokemonBuild.ensureEvMode()
  })

  it("Should propose a spread and highlight the optimized stats", () => {
    rightPokemonBuild.optimizeBulk()

    rightPokemonBuild.optimizedStats(["hp", "def"])
    rightPokemonBuild.evValueIs("hp", 12)
    rightPokemonBuild.evValueIs("def", 44)
  })

  it("Should restore the original EVs when the proposal is discarded", () => {
    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.evValueIs("hp", 12)

    rightPokemonBuild.discardOptimization()

    rightPokemonBuild.evValueIs("hp", 88)
    rightPokemonBuild.evValueIs("def", 0)
    rightPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should keep the spread when the proposal is applied", () => {
    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.applyOptimization()

    rightPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should cancel the proposal when an EV is edited", () => {
    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.defEvs(100)

    rightPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should show no solution needed when the Pokémon already survives", () => {
    leftPokemonBuild.importPokemon(poke["talonflame"])

    rightPokemonBuild.optimizeBulk()

    rightPokemonBuild.noSolutionNeededIsVisible()
    rightPokemonBuild.okNoSolution()
    rightPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should offer the optimize button on both sides in One vs One", () => {
    leftPokemonBuild.optimizeBulkIsVisible()
    rightPokemonBuild.optimizeBulkIsVisible()
  })

  it("Should show no solution found when no spread survives", () => {
    leftPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])

    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    rightPokemonBuild.clearEvs()
    rightPokemonBuild.selectSurvivalThreshold("4HKO")

    rightPokemonBuild.optimizeBulk()

    rightPokemonBuild.noSolutionFoundIsVisible()

    rightPokemonBuild.okNoSolution()

    rightPokemonBuild.optimizationButtonsAreHidden()
    rightPokemonBuild.evsIs(0, 0, 0, 0, 0, 0)
  })

  it("Should restore the original nature when the proposal is discarded", () => {
    leftPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])

    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    rightPokemonBuild.clearEvs()
    rightPokemonBuild.toggleUpdateNature()

    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.natureIs("Bold")

    rightPokemonBuild.discardOptimization()

    rightPokemonBuild.natureIs("Timid")
  })

  it("Should propose the default spread with no optimizer option selected", () => {
    leftPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])

    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    rightPokemonBuild.clearEvs()

    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.applyOptimization()

    rightPokemonBuild.evsIs(140, 0, 236, 0, 0, 0)
  })

  it("Should keep the offensive EVs in the proposed spread when the option is selected", () => {
    leftPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])

    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    rightPokemonBuild.clearEvs()
    rightPokemonBuild.spaEvs(12)
    rightPokemonBuild.toggleKeepOffensiveEvs()

    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.applyOptimization()

    rightPokemonBuild.evsIs(140, 0, 236, 12, 0, 0)
  })

  it("Should propose a cheaper spread when the nature can be updated", () => {
    leftPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])

    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    rightPokemonBuild.clearEvs()
    rightPokemonBuild.toggleUpdateNature()

    rightPokemonBuild.optimizeBulk()
    rightPokemonBuild.applyOptimization()

    rightPokemonBuild.evsIs(68, 0, 204, 0, 0, 0)
    rightPokemonBuild.natureIs("Bold")
  })

  it("Should find no solution for a threshold that cannot be reached", () => {
    leftPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])

    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    rightPokemonBuild.clearEvs()
    rightPokemonBuild.selectSurvivalThreshold("3HKO")

    rightPokemonBuild.optimizeBulk()

    rightPokemonBuild.noSolutionFoundIsVisible()
  })
})

describe("Optimize bulk in Many vs Team", () => {
  const team = new Team()
  const opponents = new Opponent()

  beforeEach(() => {
    header.openManyVsTeam()
    opponents.deleteAll()
    team.importPokepaste(poke["flutter-mane"])
  })

  it("Should offer the optimize button only for team members", () => {
    const flutterMane = team.selectPokemon("Flutter Mane")

    flutterMane.optimizeBulkIsVisible()

    opponents.importPokemon(poke["urshifu-rapid-strike"])
    opponents.selectAttacker("Urshifu Rapid Strike")

    flutterMane.optimizeBulkIsHidden()

    team.closeTab()

    flutterMane.optimizeBulkIsVisible()
  })
})
