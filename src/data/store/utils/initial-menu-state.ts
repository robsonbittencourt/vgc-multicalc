export type PersistedMenuState = {
  orderByDamage: boolean
  oneVsManyBestMoveActivated: boolean
}

export function initialMenuState(): PersistedMenuState {
  if (typeof localStorage === "undefined") return defaultMenuState()
  const menuUserData = JSON.parse(localStorage.getItem("userData")!)?.menuData
  return menuUserData ? { ...defaultMenuState(), ...menuUserData } : defaultMenuState()
}

function defaultMenuState(): PersistedMenuState {
  return {
    orderByDamage: false,
    oneVsManyBestMoveActivated: false
  }
}
