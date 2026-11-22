import { createLatinDescription } from "@calc/engine/description-text-latin"

const GERMAN = createLatinDescription("de", {
  stats: { HP: "KP", Atk: "Ang", Def: "Vert", SpA: "SpAng", SpD: "SpVert", Spe: "Init" },
  weather: {
    Sun: "Sonne",
    Rain: "Regen",
    Sand: "Sandsturm",
    Snow: "Schnee",
    "Harsh Sunshine": "Extremer Sonne",
    "Heavy Rain": "Starkregen",
    "Strong Winds": "Starken Winden"
  },
  endOfTurn: {
    "sandstorm damage": "Sandsturmschaden",
    "poison damage": "Giftschaden",
    "toxic damage": "schwerem Giftschaden",
    "burn damage": "Verbrennungsschaden",
    "reduced burn damage": "reduziertem Verbrennungsschaden",
    "trapping damage": "Klammerschaden",
    "Sea of Fire damage": "Feuermeerschaden"
  },
  toxicTurn: turn => `schwerem Giftschaden (Runde ${turn})`,
  spikes: (layers, spikes) => `${layers} ${layers === "1" ? "Schicht" : "Schichten"} ${spikes}`,
  recovery: name => `Heilung durch ${name}`,
  damage: name => `Schaden durch ${name}`,
  and: " und ",
  recovered: " geheilt",
  lost: " verloren",
  recoil: " Rückstoßschaden",
  crash: " Fehlschlagschaden",
  struggle: name => ` Schaden durch ${name}`,
  burned: "verbrannt",
  rivalry: (buffed, name) => `${buffed ? "verstärkt" : "geschwächt"} durch ${name}`,
  firstUse: "(Erster Einsatz)",
  alliesFainted: count => `mit ${count} ${count === 1 ? "besiegtem Verbündeten" : "besiegten Verbündeten"}`,
  with: name => `mit ${name}`,
  allyWith: name => `mit ${name} des Verbündeten`,
  boostedBy: name => `verstärkt durch ${name}`,
  switching: "verstärkt durch den Wechsel",
  tera: type => `Tera-${type}`,
  power: "Stärke",
  hits: count => `${count} Treffer`,
  overTurns: turns => `in ${turns} Runden`,
  statChanges: " (mit Statuswertveränderungen)",
  protected: "geschützt",
  inWeather: weather => `bei ${weather}`,
  onTerrain: terrain => `auf ${terrain}`,
  through: screens => `durch ${screens}`,
  critical: "mit Volltreffer",
  inRoom: name => `im ${name}`,
  reducedBy: item => ` reduziert durch ${item}`,
  considering: name => ` (mit ${name})`,
  attackersAnd: "UND",
  worstMoveEver: "möglicherweise die schlechteste Attacke aller Zeiten",
  ko: {
    koTurn: (n, multipleTurns) => (n === 1 ? "OHKO" : multipleTurns ? `KO in ${n} Runden` : `${n}HKO`),
    qualifier: qualifier => (qualifier ? "ca. " : ""),
    afterSeparator: " nach ",
    possible: ko => `${ko} möglich`,
    guaranteed: ko => `${ko} garantiert`,
    chance: (percentage, ko) => `${percentage}% Chance auf ${ko}`,
    notAKo: "kein KO",
    tenOrMore: "10HKO oder mehr"
  }
})

export const GERMAN_HELPERS = GERMAN.helpers
export const DESCRIPTION_DE = GERMAN.description
