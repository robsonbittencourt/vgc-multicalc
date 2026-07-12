describe("FEATURES", () => {
  const defaults = {
    teraType: false,
    battery: false,
    powerSpot: false,
    tabletsOfRuin: false,
    swordOfRuin: false,
    vesselOfRuin: false,
    beadsOfRuin: false,
    neutralizingGas: false,
    allowAllPokes: false,
    allItems: false
  }

  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it("should use all defaults when localStorage has no stored flags", async () => {
    const { FEATURES } = await import("./feature-flags")

    expect(FEATURES).toEqual(defaults)
  })

  it("should merge stored flags over the defaults", async () => {
    localStorage.setItem("featureFlags", JSON.stringify({ teraType: true, allItems: true }))

    const { FEATURES } = await import("./feature-flags")

    expect(FEATURES).toEqual({ ...defaults, teraType: true, allItems: true })
  })

  it("should fall back to defaults when the stored value is invalid JSON", async () => {
    localStorage.setItem("featureFlags", "{ not valid json")

    const { FEATURES } = await import("./feature-flags")

    expect(FEATURES).toEqual(defaults)
  })

  it("should use defaults when localStorage is not available in the environment", async () => {
    const originalLocalStorage = globalThis.localStorage
    // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
    delete globalThis.localStorage

    try {
      const { FEATURES } = await import("./feature-flags")

      expect(FEATURES).toEqual(defaults)
    } finally {
      globalThis.localStorage = originalLocalStorage
    }
  })
})
