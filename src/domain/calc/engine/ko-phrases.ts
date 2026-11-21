export type KoPhrases = {
  koTurn: (n: number, multipleTurns: boolean) => string
  qualifier: (qualifier: string) => string
  afterSeparator: string
  after: (texts: string[]) => string
  afterEndOfTurn: (texts: string[]) => string
  possible: (ko: string) => string
  guaranteed: (ko: string) => string
  chance: (percentage: number, ko: string) => string
  notAKo: string
  tenOrMore: string
}

export const KO_PHRASES_EN: KoPhrases = {
  koTurn: (n, multipleTurns) => (n === 1 ? "OHKO" : multipleTurns ? `KO in ${n} turns` : `${n}HKO`),
  qualifier: qualifier => qualifier,
  afterSeparator: " after ",
  after: texts => KO_PHRASES_EN.afterSeparator + serializeText(texts),
  afterEndOfTurn: texts => KO_PHRASES_EN.afterSeparator + serializeEndOfTurnTexts(texts),
  possible: ko => `possible ${ko}`,
  guaranteed: ko => `guaranteed ${ko}`,
  chance: (percentage, ko) => `${percentage}% chance to ${ko}`,
  notAKo: "not a KO",
  tenOrMore: "10HKO or more"
}

export function serializeEndOfTurnTexts(originalTexts: string[]) {
  const texts = [...originalTexts]
  const recoveryIndices: number[] = []

  for (let i = 0; i < texts.length; i++) {
    if (texts[i].endsWith(" recovery")) {
      recoveryIndices.push(i)
    }
  }

  if (recoveryIndices.length > 1) {
    for (let i = 0; i < recoveryIndices.length - 1; i++) {
      const idx = recoveryIndices[i]
      texts[idx] = texts[idx].replace(" recovery", "")
    }
  }

  return serializeText(texts)
}

export function serializeText(arr: string[]) {
  if (arr.length === 0) {
    return ""
  } else if (arr.length === 1) {
    return arr[0]
  } else if (arr.length === 2) {
    return arr[0] + " and " + arr[1]
  } else {
    let text = ""

    for (let i = 0; i < arr.length - 1; i++) {
      text += arr[i] + ", "
    }

    return text + "and " + arr[arr.length - 1]
  }
}
