describe("initialThemeState", () => {
  const defaults = { theme: "system", color: "purple" }

  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it("should return defaults when there is no stored user data", async () => {
    const { initialThemeState } = await import("./initial-theme-state")

    expect(initialThemeState()).toEqual(defaults)
  })

  it("should merge stored themeData over the defaults", async () => {
    localStorage.setItem("userData", JSON.stringify({ themeData: { theme: "dark" } }))

    const { initialThemeState } = await import("./initial-theme-state")

    expect(initialThemeState()).toEqual({ ...defaults, theme: "dark" })
  })

  it("should return defaults when stored user data has no themeData", async () => {
    localStorage.setItem("userData", JSON.stringify({ someOtherKey: true }))

    const { initialThemeState } = await import("./initial-theme-state")

    expect(initialThemeState()).toEqual(defaults)
  })

  it("should return defaults when localStorage is not available in the environment", async () => {
    const originalLocalStorage = globalThis.localStorage
    // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
    delete globalThis.localStorage

    try {
      const { initialThemeState } = await import("./initial-theme-state")

      expect(initialThemeState()).toEqual(defaults)
    } finally {
      globalThis.localStorage = originalLocalStorage
    }
  })
})
