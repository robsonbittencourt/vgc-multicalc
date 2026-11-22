import { createLatinDescription } from "@calc/engine/description-text-latin"

const ITALIAN = createLatinDescription("it", {
  stats: { HP: "PS", Atk: "Att", Def: "Dif", SpA: "AttSp", SpD: "DifSp", Spe: "Vel" },
  weather: {
    Sun: "Sole",
    Rain: "Pioggia",
    Sand: "Tempesta di Sabbia",
    Snow: "Neve",
    "Harsh Sunshine": "Sole Cocente",
    "Heavy Rain": "Diluvio",
    "Strong Winds": "Venti Forti"
  },
  endOfTurn: {
    "sandstorm damage": "danni della tempesta di sabbia",
    "poison damage": "danni da veleno",
    "toxic damage": "danni da veleno grave",
    "burn damage": "danni da scottatura",
    "reduced burn damage": "danni da scottatura ridotti",
    "trapping damage": "danni da intrappolamento",
    "Sea of Fire damage": "danni del mare di fuoco"
  },
  toxicTurn: turn => `danni da veleno grave (turno ${turn})`,
  spikes: (layers, spikes) => `${layers} ${layers === "1" ? "strato" : "strati"} di ${spikes}`,
  recovery: name => `recupero di ${name}`,
  damage: name => `danni di ${name}`,
  and: " e ",
  recovered: " recuperati",
  lost: " persi",
  recoil: " di danni da contraccolpo",
  crash: " di danni da mancato colpo",
  struggle: name => ` di danni di ${name}`,
  burned: "scottato",
  rivalry: (buffed, name) => `${buffed ? "potenziato" : "indebolito"} da ${name}`,
  firstUse: "(Primo Uso)",
  alliesFainted: count => `con ${count} ${count === 1 ? "alleato esausto" : "alleati esausti"}`,
  with: name => `con ${name}`,
  allyWith: name => `con ${name} dell’alleato`,
  boostedBy: name => `potenziato da ${name}`,
  switching: "potenziato dal cambio",
  tera: type => `Tera ${type}`,
  power: "Pot",
  hits: count => `${count} colpi`,
  overTurns: turns => `in ${turns} turni`,
  statChanges: " (con modifiche alle statistiche)",
  protected: "protetto",
  inWeather: weather => `con ${weather}`,
  onTerrain: terrain => `su ${terrain}`,
  through: screens => `attraverso ${screens}`,
  critical: "con brutto colpo",
  inRoom: name => `in ${name}`,
  reducedBy: item => ` ridotto da ${item}`,
  considering: name => ` (con ${name})`,
  attackersAnd: "E",
  worstMoveEver: "forse la peggior mossa di sempre",
  ko: {
    koTurn: (n, multipleTurns) => (n === 1 ? "OHKO" : multipleTurns ? `KO in ${n} turni` : `${n}HKO`),
    qualifier: qualifier => (qualifier ? "circa " : ""),
    afterSeparator: " dopo ",
    possible: ko => `${ko} possibile`,
    guaranteed: ko => `${ko} garantito`,
    chance: (percentage, ko) => `${percentage}% di probabilità di ${ko}`,
    notAKo: "nessun KO",
    tenOrMore: "10HKO o più"
  }
})

export const ITALIAN_HELPERS = ITALIAN.helpers
export const DESCRIPTION_IT = ITALIAN.description
