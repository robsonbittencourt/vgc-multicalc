import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_DE } from "@data/i18n/de"
import { RawDesc } from "@data/types"
import { DESCRIPTION_DE, GERMAN_HELPERS } from "@calc/engine/description-text-de"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

describe("German damage description", () => {
  beforeAll(() => registerNames("de", NAMES_DE))

  it("should write the attacker, the defender bulk and the defender in German", () => {
    const description = GERMAN_HELPERS.buildDescription({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 SpD", defenderItem: "Sitrus Berry" })

    expect(description).toBe("252+ Ang Wahlband Dragoran Turbotempo vs. 252 KP / 4 SpVert Tsitrubeere Fuegro")
  })

  it("should place the states after the Pokémon and the boosts before the move", () => {
    const description = GERMAN_HELPERS.buildAttackerDescription({
      ...base,
      attackerTera: "Normal",
      isBurned: true,
      rivalry: "buffed",
      isStellarFirstUse: true,
      alliesFainted: 1,
      isHelpingHand: true,
      isFlowerGiftAttacker: true,
      isBattery: true,
      isSwitching: "out",
      moveBP: 80,
      moveType: "Normal",
      hits: 2,
      moveTurns: "over 3 turns (stat changes considered)"
    })

    expect(description).toBe(
      "Tera-Normal Dragoran verbrannt verstärkt durch Rivalität (Erster Einsatz) mit 1 besiegtem Verbündeten mit Rechte Hand mit Pflanzengabe des Verbündeten verstärkt durch Batterie verstärkt durch den Wechsel Turbotempo (80 Stärke Normal) (2 Treffer) in 3 Runden (mit Statuswertveränderungen) "
    )
  })

  it("should write a weakened rivalry and several fainted allies", () => {
    const description = GERMAN_HELPERS.buildAttackerDescription({ ...base, rivalry: "nerfed", alliesFainted: 3 })

    expect(description).toBe("Dragoran geschwächt durch Rivalität mit 3 besiegten Verbündeten Turbotempo ")
  })

  it("should place the field and the screens after the defender", () => {
    const description = GERMAN_HELPERS.buildDefenderTail({ ...base, isProtected: true, weather: "Rain", terrain: "Electric", isReflect: true, isLightScreen: true, isCritical: true, isWonderRoom: true })

    expect(description).toBe("Fuegro geschützt bei Regen und auf Elektrofeld durch Reflektor und Lichtschild mit Volltreffer im Wunderraum")
  })

  it("should translate the end of turn effects and the residual damage", () => {
    const texts = [
      ...["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "2 layers of Spikes", "Leftovers recovery", "Black Sludge damage"].map(GERMAN_HELPERS.translateEndOfTurnText),
      ...["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(GERMAN_HELPERS.translateResidualText)
    ]

    expect(texts).toEqual([
      "Sandsturmschaden",
      "schwerem Giftschaden (Runde 3)",
      "1 Schicht Stachler",
      "2 Schichten Stachler",
      "Heilung durch Überreste",
      "Schaden durch Giftschleim",
      "5 - 10% geheilt",
      "5 - 10% verloren",
      "9.5 - 11.2% Rückstoßschaden",
      "50% Fehlschlagschaden",
      "25% Schaden durch Verzweifler"
    ])
  })

  it("should write the KO phrases and the other texts in German", () => {
    const ko = DESCRIPTION_DE.ko
    const texts = [
      ko.koTurn(1, false),
      ko.koTurn(2, false),
      ko.koTurn(3, true),
      ko.qualifier("approx. "),
      ko.qualifier(""),
      ko.possible("8HKO"),
      ko.guaranteed("2HKO"),
      ko.chance(75, "2HKO"),
      ko.notAKo,
      ko.tenOrMore,
      ko.after(["Stealth Rock", "Leftovers recovery"]),
      DESCRIPTION_DE.reducedBy("Occa Berry"),
      DESCRIPTION_DE.staminaConsidered(),
      DESCRIPTION_DE.overTurns(2),
      DESCRIPTION_DE.and,
      DESCRIPTION_DE.worstMoveEver
    ]

    expect(texts).toEqual([
      "OHKO",
      "2HKO",
      "KO in 3 Runden",
      "ca. ",
      "",
      "8HKO möglich",
      "2HKO garantiert",
      "75% Chance auf 2HKO",
      "kein KO",
      "10HKO oder mehr",
      " nach Tarnsteine und Heilung durch Überreste",
      " reduziert durch Koakobeere",
      " (mit Zähigkeit)",
      " in 2 Runden",
      "UND",
      "möglicherweise die schlechteste Attacke aller Zeiten"
    ])
  })
})
