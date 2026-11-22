import { createLatinDescription } from "@calc/engine/description-text-latin"

const FRENCH = createLatinDescription("fr", {
  stats: { HP: "PV", Atk: "Atq", Def: "Déf", SpA: "Atq Spé", SpD: "Déf Spé", Spe: "Vit" },
  weather: {
    Sun: "Soleil",
    Rain: "Pluie",
    Sand: "Tempête de Sable",
    Snow: "Neige",
    "Harsh Sunshine": "Soleil Intense",
    "Heavy Rain": "Pluie Battante",
    "Strong Winds": "Turbulences"
  },
  endOfTurn: {
    "sandstorm damage": "dégâts de la Tempête de Sable",
    "poison damage": "dégâts du poison",
    "toxic damage": "dégâts du poison grave",
    "burn damage": "dégâts de la brûlure",
    "reduced burn damage": "dégâts de brûlure réduits",
    "trapping damage": "dégâts du piège",
    "Sea of Fire damage": "dégâts de la mer de feu"
  },
  toxicTurn: turn => `dégâts du poison grave (tour ${turn})`,
  spikes: (layers, spikes) => `${layers} ${layers === "1" ? "couche" : "couches"} de ${spikes}`,
  recovery: name => `récupération de ${name}`,
  damage: name => `dégâts de ${name}`,
  and: " et ",
  recovered: " récupérés",
  lost: " perdus",
  recoil: " de dégâts de contrecoup",
  crash: " de dégâts d’échec",
  struggle: name => ` de dégâts de ${name}`,
  burned: "brûlé",
  rivalry: (buffed, name) => `${buffed ? "renforcé" : "affaibli"} par ${name}`,
  firstUse: "(Première Utilisation)",
  alliesFainted: count => `avec ${count} ${count === 1 ? "allié K.O." : "alliés K.O."}`,
  with: name => `avec ${name}`,
  allyWith: name => `avec ${name} de l’allié`,
  boostedBy: name => `renforcé par ${name}`,
  switching: "renforcé par le changement",
  tera: type => `Téra ${type}`,
  power: "Puiss.",
  hits: count => `${count} coups`,
  overTurns: turns => `en ${turns} tours`,
  statChanges: " (avec changements de stats)",
  protected: "protégé",
  inWeather: weather => `sous ${weather}`,
  onTerrain: terrain => `sur ${terrain}`,
  through: screens => `à travers ${screens}`,
  critical: "avec coup critique",
  inRoom: name => `sous ${name}`,
  reducedBy: item => ` réduit par ${item}`,
  considering: name => ` (avec ${name})`,
  attackersAnd: "ET",
  worstMoveEver: "peut-être la pire capacité de l’histoire",
  ko: {
    koTurn: (n, multipleTurns) => (n === 1 ? "OHKO" : multipleTurns ? `KO en ${n} tours` : `${n}HKO`),
    qualifier: qualifier => (qualifier ? "env. " : ""),
    afterSeparator: " après ",
    possible: ko => `${ko} possible`,
    guaranteed: ko => `${ko} garanti`,
    chance: (percentage, ko) => `${percentage}% de chances de ${ko}`,
    notAKo: "pas de KO",
    tenOrMore: "10HKO ou plus"
  }
})

export const FRENCH_HELPERS = FRENCH.helpers
export const DESCRIPTION_FR = FRENCH.description
