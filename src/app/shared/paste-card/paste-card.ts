import { TypeName } from "@data/types"

export type PasteMove = {
  name: string
  type?: string
}

export type PasteForm = {
  name: string
  ability?: string
  type1: TypeName
  type2?: TypeName
}

export type PasteCard = PasteForm & {
  mega?: PasteForm
  item: string
  itemSprite?: string
  nature?: string
  natureBoost?: string
  natureDrop?: string
  teraType?: string
  moves: PasteMove[]
  spread: string
}
