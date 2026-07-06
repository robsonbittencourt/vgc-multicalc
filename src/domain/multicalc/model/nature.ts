import { StatIDExceptHP } from "@data/types"

const NATURE_INCREASED_STAT: Record<string, StatIDExceptHP> = {
  Lonely: "atk",
  Adamant: "atk",
  Naughty: "atk",
  Brave: "atk",
  Bold: "def",
  Impish: "def",
  Lax: "def",
  Relaxed: "def",
  Modest: "spa",
  Mild: "spa",
  Rash: "spa",
  Quiet: "spa",
  Calm: "spd",
  Gentle: "spd",
  Careful: "spd",
  Sassy: "spd",
  Timid: "spe",
  Hasty: "spe",
  Jolly: "spe",
  Naive: "spe"
}

const NATURE_DECREASED_STAT: Record<string, StatIDExceptHP> = {
  Bold: "atk",
  Modest: "atk",
  Calm: "atk",
  Timid: "atk",
  Lonely: "def",
  Mild: "def",
  Gentle: "def",
  Hasty: "def",
  Adamant: "spa",
  Impish: "spa",
  Careful: "spa",
  Jolly: "spa",
  Naughty: "spd",
  Lax: "spd",
  Rash: "spd",
  Naive: "spd",
  Brave: "spe",
  Relaxed: "spe",
  Quiet: "spe",
  Sassy: "spe"
}

export function increasedStatByNature(nature: string): StatIDExceptHP | undefined {
  return NATURE_INCREASED_STAT[nature]
}

export function natureEffect(nature: string, stat: StatIDExceptHP): "+" | "-" | "" {
  if (NATURE_INCREASED_STAT[nature] === stat) return "+"
  if (NATURE_DECREASED_STAT[nature] === stat) return "-"

  return ""
}
