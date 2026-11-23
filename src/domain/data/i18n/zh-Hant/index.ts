import { LocalizedDescriptions, LocalizedNames } from "@data/i18n/localized-names"
import { ABILITY_DESCRIPTIONS } from "@data/i18n/zh-Hant/ability-descriptions"
import { ABILITY_NAMES } from "@data/i18n/zh-Hant/abilities"
import { ITEM_DESCRIPTIONS } from "@data/i18n/zh-Hant/item-descriptions"
import { ITEM_NAMES } from "@data/i18n/zh-Hant/items"
import { MOVE_DESCRIPTIONS } from "@data/i18n/zh-Hant/move-descriptions"
import { MOVE_NAMES } from "@data/i18n/zh-Hant/moves"
import { NATURE_NAMES } from "@data/i18n/zh-Hant/natures"
import { POKEMON_NAMES } from "@data/i18n/zh-Hant/pokemon"
import { TYPE_NAMES } from "@data/i18n/zh-Hant/types"

export const NAMES: LocalizedNames = {
  pokemon: POKEMON_NAMES,
  moves: MOVE_NAMES,
  abilities: ABILITY_NAMES,
  items: ITEM_NAMES,
  natures: NATURE_NAMES,
  types: TYPE_NAMES
}

export const DESCRIPTIONS: LocalizedDescriptions = { moves: MOVE_DESCRIPTIONS, abilities: ABILITY_DESCRIPTIONS, items: ITEM_DESCRIPTIONS }
