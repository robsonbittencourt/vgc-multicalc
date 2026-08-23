import { readUserData } from "@store/utils/user-data-storage"

export type PersistedMenuState = {
  orderByDamage: boolean
  oneVsManyBestMoveActivated: boolean
  manyVsOneBestMoveActivated: boolean
}

export function initialMenuState(): PersistedMenuState {
  const menuUserData = readUserData()?.menuData
  return menuUserData ? { ...defaultMenuState(), ...menuUserData } : defaultMenuState()
}

function defaultMenuState(): PersistedMenuState {
  return {
    orderByDamage: false,
    oneVsManyBestMoveActivated: false,
    manyVsOneBestMoveActivated: true
  }
}
