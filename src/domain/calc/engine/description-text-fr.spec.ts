import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_FR } from "@data/i18n/fr"
import { RawDesc } from "@data/types"
import { DESCRIPTION_FR, FRENCH_HELPERS } from "@calc/engine/description-text-fr"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

describe("French damage description", () => {
  beforeAll(() => registerNames("fr", NAMES_FR))

  it("should write the attacker, the defender bulk and the defender in French", () => {
    const description = FRENCH_HELPERS.buildDescription({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 SpD", defenderItem: "Sitrus Berry" })

    expect(description).toBe("252+ Atq Bandeau Choix Dracolosse Vitesse Extrême vs. 252 PV / 4 Déf Spé Baie Sitrus Félinferno")
  })

  it("should place the states after the Pokémon and the boosts before the move", () => {
    const description = FRENCH_HELPERS.buildAttackerDescription({
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
      "Téra Normal Dracolosse brûlé renforcé par Rivalité (Première Utilisation) avec 1 allié K.O. avec Coup d’Main avec Don Floral de l’allié renforcé par Batterie renforcé par le changement Vitesse Extrême (80 Puiss. Normal) (2 coups) en 3 tours (avec changements de stats) "
    )
  })

  it("should write a weakened rivalry and several fainted allies", () => {
    const description = FRENCH_HELPERS.buildAttackerDescription({ ...base, rivalry: "nerfed", alliesFainted: 3 })

    expect(description).toBe("Dracolosse affaibli par Rivalité avec 3 alliés K.O. Vitesse Extrême ")
  })

  it("should place the field and the screens after the defender", () => {
    const description = FRENCH_HELPERS.buildDefenderTail({ ...base, isProtected: true, weather: "Rain", terrain: "Electric", isReflect: true, isLightScreen: true, isCritical: true, isWonderRoom: true })

    expect(description).toBe("Félinferno protégé sous Pluie et sur Champ Électrifié à travers Protection et Mur Lumière avec coup critique sous Zone Étrange")
  })

  it("should translate the end of turn effects and the residual damage", () => {
    const texts = [
      ...["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "2 layers of Spikes", "Leftovers recovery", "Black Sludge damage"].map(FRENCH_HELPERS.translateEndOfTurnText),
      ...["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(FRENCH_HELPERS.translateResidualText)
    ]

    expect(texts).toEqual([
      "dégâts de la Tempête de Sable",
      "dégâts du poison grave (tour 3)",
      "1 couche de Picots",
      "2 couches de Picots",
      "récupération de Restes",
      "dégâts de Boue Noire",
      "5 - 10% récupérés",
      "5 - 10% perdus",
      "9.5 - 11.2% de dégâts de contrecoup",
      "50% de dégâts d’échec",
      "25% de dégâts de Lutte"
    ])
  })

  it("should write the KO phrases and the other texts in French", () => {
    const ko = DESCRIPTION_FR.ko
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
      DESCRIPTION_FR.reducedBy("Occa Berry"),
      DESCRIPTION_FR.staminaConsidered(),
      DESCRIPTION_FR.overTurns(2),
      DESCRIPTION_FR.and,
      DESCRIPTION_FR.worstMoveEver
    ]

    expect(texts).toEqual([
      "OHKO",
      "2HKO",
      "KO en 3 tours",
      "env. ",
      "",
      "8HKO possible",
      "2HKO garanti",
      "75% de chances de 2HKO",
      "pas de KO",
      "10HKO ou plus",
      " après Piège de Roc et récupération de Restes",
      " réduit par Baie Chocco",
      " (avec Endurance)",
      " en 2 tours",
      "ET",
      "peut-être la pire capacité de l’histoire"
    ])
  })
})
