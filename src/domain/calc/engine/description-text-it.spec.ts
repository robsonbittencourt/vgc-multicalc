import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_IT } from "@data/i18n/it"
import { RawDesc } from "@data/types"
import { DESCRIPTION_IT, ITALIAN_HELPERS } from "@calc/engine/description-text-it"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

describe("Italian damage description", () => {
  beforeAll(() => registerNames("it", NAMES_IT))

  it("should write the attacker, the defender bulk and the defender in Italian", () => {
    const description = ITALIAN_HELPERS.buildDescription({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 SpD", defenderItem: "Sitrus Berry" })

    expect(description).toBe("252+ Att Bendascelta Dragonite Extrarapido vs. 252 PS / 4 DifSp Baccacedro Incineroar")
  })

  it("should place the states after the Pokémon and the boosts before the move", () => {
    const description = ITALIAN_HELPERS.buildAttackerDescription({
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
      "Tera Normale Dragonite scottato potenziato da Antagonismo (Primo Uso) con 1 alleato esausto con Altruismo con Regalfiore dell’alleato potenziato da Batteria potenziato dal cambio Extrarapido (80 Pot Normale) (2 colpi) in 3 turni (con modifiche alle statistiche) "
    )
  })

  it("should write a weakened rivalry and several fainted allies", () => {
    const description = ITALIAN_HELPERS.buildAttackerDescription({ ...base, rivalry: "nerfed", alliesFainted: 3 })

    expect(description).toBe("Dragonite indebolito da Antagonismo con 3 alleati esausti Extrarapido ")
  })

  it("should place the field and the screens after the defender", () => {
    const description = ITALIAN_HELPERS.buildDefenderTail({ ...base, isProtected: true, weather: "Rain", terrain: "Electric", isReflect: true, isLightScreen: true, isCritical: true, isWonderRoom: true })

    expect(description).toBe("Incineroar protetto con Pioggia e su Campo Elettrico attraverso Riflesso e Schermoluce con brutto colpo in Mirabilzona")
  })

  it("should translate the end of turn effects and the residual damage", () => {
    const texts = [
      ...["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "2 layers of Spikes", "Leftovers recovery", "Black Sludge damage"].map(ITALIAN_HELPERS.translateEndOfTurnText),
      ...["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(ITALIAN_HELPERS.translateResidualText)
    ]

    expect(texts).toEqual([
      "danni della tempesta di sabbia",
      "danni da veleno grave (turno 3)",
      "1 strato di Punte",
      "2 strati di Punte",
      "recupero di Avanzi",
      "danni di Fangopece",
      "5 - 10% recuperati",
      "5 - 10% persi",
      "9.5 - 11.2% di danni da contraccolpo",
      "50% di danni da mancato colpo",
      "25% di danni di Scontro"
    ])
  })

  it("should write the KO phrases and the other texts in Italian", () => {
    const ko = DESCRIPTION_IT.ko
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
      DESCRIPTION_IT.reducedBy("Occa Berry"),
      DESCRIPTION_IT.staminaConsidered(),
      DESCRIPTION_IT.overTurns(2),
      DESCRIPTION_IT.and,
      DESCRIPTION_IT.worstMoveEver
    ]

    expect(texts).toEqual([
      "OHKO",
      "2HKO",
      "KO in 3 turni",
      "circa ",
      "",
      "8HKO possibile",
      "2HKO garantito",
      "75% di probabilità di 2HKO",
      "nessun KO",
      "10HKO o più",
      " dopo Levitoroccia e recupero di Avanzi",
      " ridotto da Baccacao",
      " (con Sopportazione)",
      " in 2 turni",
      "E",
      "forse la peggior mossa di sempre"
    ])
  })
})
