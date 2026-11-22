import { LocalizedDescriptions, LocalizedNames } from "@data/i18n/localized-names"
import { ABILITY_DESCRIPTIONS } from "@data/i18n/it/ability-descriptions"
import { ABILITY_NAMES } from "@data/i18n/it/abilities"
import { ITEM_DESCRIPTIONS } from "@data/i18n/it/item-descriptions"
import { ITEM_NAMES } from "@data/i18n/it/items"
import { MOVE_DESCRIPTIONS } from "@data/i18n/it/move-descriptions"
import { MOVE_NAMES } from "@data/i18n/it/moves"
import { NATURE_NAMES } from "@data/i18n/it/natures"
import { POKEMON_NAMES } from "@data/i18n/it/pokemon"
import { TYPE_NAMES } from "@data/i18n/it/types"

export const NAMES: LocalizedNames = {
  pokemon: POKEMON_NAMES,
  moves: MOVE_NAMES,
  abilities: ABILITY_NAMES,
  items: ITEM_NAMES,
  natures: NATURE_NAMES,
  types: TYPE_NAMES
}

export const DESCRIPTIONS: LocalizedDescriptions = { moves: MOVE_DESCRIPTIONS, abilities: ABILITY_DESCRIPTIONS, items: ITEM_DESCRIPTIONS }
