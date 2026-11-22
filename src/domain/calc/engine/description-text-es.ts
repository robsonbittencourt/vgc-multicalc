import { createLatinDescription, DescriptionWords } from "@calc/engine/description-text-latin"

const SPANISH: Omit<DescriptionWords, "ko"> & { ko: Omit<DescriptionWords["ko"], "afterSeparator"> } = {
  stats: { HP: "PS", Atk: "Atq", Def: "Def", SpA: "AtEsp", SpD: "DefEsp", Spe: "Vel" },
  weather: {
    Sun: "Sol",
    Rain: "Lluvia",
    Sand: "Tormenta de Arena",
    Snow: "Nieve",
    "Harsh Sunshine": "Sol Abrasador",
    "Heavy Rain": "Diluvio",
    "Strong Winds": "Turbulencias"
  },
  endOfTurn: {
    "sandstorm damage": "daño de Tormenta de Arena",
    "poison damage": "daño por veneno",
    "toxic damage": "daño por veneno grave",
    "burn damage": "daño por quemadura",
    "reduced burn damage": "daño por quemadura reducido",
    "trapping damage": "daño por atrapamiento",
    "Sea of Fire damage": "daño del mar de llamas"
  },
  toxicTurn: turn => `daño por veneno grave (turno ${turn})`,
  spikes: (layers, spikes) => `${layers} ${layers === "1" ? "capa" : "capas"} de ${spikes}`,
  recovery: name => `recuperación de ${name}`,
  damage: name => `daño de ${name}`,
  and: " y ",
  recovered: " recuperado",
  lost: " perdido",
  recoil: " de daño de retroceso",
  crash: " de daño por choque",
  struggle: name => ` de daño de ${name}`,
  burned: "quemado",
  rivalry: (buffed, name) => `${buffed ? "potenciado" : "debilitado"} por ${name}`,
  firstUse: "(Primer Uso)",
  alliesFainted: count => `con ${count} ${count === 1 ? "aliado debilitado" : "aliados debilitados"}`,
  with: name => `con ${name}`,
  allyWith: name => `con ${name} del aliado`,
  boostedBy: name => `potenciado por ${name}`,
  switching: "potenciado por el cambio",
  tera: type => `Tera ${type}`,
  power: "Pot",
  hits: count => `${count} golpes`,
  overTurns: turns => `en ${turns} turnos`,
  statChanges: " (considerando cambios de características)",
  protected: "protegido",
  inWeather: weather => `con ${weather}`,
  onTerrain: terrain => `en ${terrain}`,
  through: screens => `a través de ${screens}`,
  critical: "con golpe crítico",
  inRoom: name => `en ${name}`,
  reducedBy: item => ` reducido por ${item}`,
  considering: name => ` (considerando ${name})`,
  attackersAnd: "Y",
  worstMoveEver: "posiblemente el peor movimiento de la historia",
  ko: {
    koTurn: (n, multipleTurns) => (n === 1 ? "OHKO" : multipleTurns ? `KO en ${n} turnos` : `${n}HKO`),
    qualifier: qualifier => (qualifier ? "aprox. " : ""),
    possible: ko => `${ko} posible`,
    guaranteed: ko => `${ko} garantizado`,
    chance: (percentage, ko) => `${percentage}% de probabilidad de ${ko}`,
    notAKo: "no hace KO",
    tenOrMore: "10HKO o más"
  }
}

const SPAIN = createLatinDescription("es", { ...SPANISH, ko: { ...SPANISH.ko, afterSeparator: " tras " } })
const LATIN_AMERICA = createLatinDescription("es-419", { ...SPANISH, ko: { ...SPANISH.ko, afterSeparator: " luego de " } })

export const {
  localizeStats,
  nameOf: nameEs,
  typesOf: typesEs,
  translateEndOfTurnText: translateEndOfTurnTextEs,
  serializeText: serializeTextEs,
  translateResidualText: translateResidualTextEs,
  buildDescription: buildDescriptionEs,
  buildAttackerDescription: buildAttackerDescriptionEs,
  buildDefenderBulk: buildDefenderBulkEs,
  buildDefenderTail: buildDefenderTailEs
} = SPAIN.helpers

export const DESCRIPTION_ES = SPAIN.description
export const KO_PHRASES_ES = SPAIN.description.ko
export const DESCRIPTION_ES_419 = LATIN_AMERICA.description
export const KO_PHRASES_ES_419 = LATIN_AMERICA.description.ko
