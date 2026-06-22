import { Nature } from "@lib/calc/model/types"

export const NATURES: Record<string, Nature> = {
  hardy: {
    name: "Hardy",
    plus: "atk",
    minus: "atk"
  },
  lonely: {
    name: "Lonely",
    plus: "atk",
    minus: "def"
  },
  brave: {
    name: "Brave",
    plus: "atk",
    minus: "spe"
  },
  adamant: {
    name: "Adamant",
    plus: "atk",
    minus: "spa"
  },
  naughty: {
    name: "Naughty",
    plus: "atk",
    minus: "spd"
  },
  bold: {
    name: "Bold",
    plus: "def",
    minus: "atk"
  },
  docile: {
    name: "Docile",
    plus: "def",
    minus: "def"
  },
  relaxed: {
    name: "Relaxed",
    plus: "def",
    minus: "spe"
  },
  impish: {
    name: "Impish",
    plus: "def",
    minus: "spa"
  },
  lax: {
    name: "Lax",
    plus: "def",
    minus: "spd"
  },
  timid: {
    name: "Timid",
    plus: "spe",
    minus: "atk"
  },
  hasty: {
    name: "Hasty",
    plus: "spe",
    minus: "def"
  },
  serious: {
    name: "Serious",
    plus: "spe",
    minus: "spe"
  },
  jolly: {
    name: "Jolly",
    plus: "spe",
    minus: "spa"
  },
  naive: {
    name: "Naive",
    plus: "spe",
    minus: "spd"
  },
  modest: {
    name: "Modest",
    plus: "spa",
    minus: "atk"
  },
  mild: {
    name: "Mild",
    plus: "spa",
    minus: "def"
  },
  quiet: {
    name: "Quiet",
    plus: "spa",
    minus: "spe"
  },
  bashful: {
    name: "Bashful",
    plus: "spa",
    minus: "spa"
  },
  rash: {
    name: "Rash",
    plus: "spa",
    minus: "spd"
  },
  calm: {
    name: "Calm",
    plus: "spd",
    minus: "atk"
  },
  gentle: {
    name: "Gentle",
    plus: "spd",
    minus: "def"
  },
  sassy: {
    name: "Sassy",
    plus: "spd",
    minus: "spe"
  },
  careful: {
    name: "Careful",
    plus: "spd",
    minus: "spa"
  },
  quirky: {
    name: "Quirky",
    plus: "spd",
    minus: "spd"
  }
}
