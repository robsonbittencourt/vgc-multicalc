describe("initialMenuState", () => {
  const defaults = { orderByDamage: false, oneVsManyBestMoveActivated: false }

  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it("should return defaults when there is no stored user data", async () => {
    const { initialMenuState } = await import("./initial-menu-state")

    expect(initialMenuState()).toEqual(defaults)
  })

  it("should merge stored menuData over the defaults", async () => {
    localStorage.setItem("userData", JSON.stringify({ menuData: { orderByDamage: true } }))

    const { initialMenuState } = await import("./initial-menu-state")

    expect(initialMenuState()).toEqual({ ...defaults, orderByDamage: true })
  })

  it("should return defaults when stored user data has no menuData", async () => {
    localStorage.setItem("userData", JSON.stringify({ someOtherKey: true }))

    const { initialMenuState } = await import("./initial-menu-state")

    expect(initialMenuState()).toEqual(defaults)
  })

  it("should return defaults when localStorage is not available in the environment", async () => {
    const originalLocalStorage = globalThis.localStorage
    // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
    delete globalThis.localStorage

    try {
      const { initialMenuState } = await import("./initial-menu-state")

      expect(initialMenuState()).toEqual(defaults)
    } finally {
      globalThis.localStorage = originalLocalStorage
    }
  })
})
