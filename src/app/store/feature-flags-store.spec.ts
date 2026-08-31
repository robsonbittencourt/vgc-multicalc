import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { patchState } from "@ngrx/signals"
import { FeatureFlagsStore } from "./feature-flags-store"

describe("Feature Flags Store", () => {
  let store: FeatureFlagsStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })

    store = TestBed.inject(FeatureFlagsStore)
  })

  describe("Champions mode", () => {
    it("should turn off every flag", () => {
      store.enableNationalDex()

      store.enableChampions()

      expect(store.teraType()).toBe(false)
      expect(store.battery()).toBe(false)
      expect(store.powerSpot()).toBe(false)
      expect(store.tabletsOfRuin()).toBe(false)
      expect(store.swordOfRuin()).toBe(false)
      expect(store.vesselOfRuin()).toBe(false)
      expect(store.beadsOfRuin()).toBe(false)
      expect(store.neutralizingGas()).toBe(false)
      expect(store.allowAllPokes()).toBe(false)
      expect(store.allItems()).toBe(false)
    })

    it("should not be recognized as National Dex", () => {
      store.enableChampions()

      expect(store.nationalDex()).toBe(false)
    })
  })

  describe("National Dex mode", () => {
    it("should turn on every flag", () => {
      store.enableChampions()

      store.enableNationalDex()

      expect(store.teraType()).toBe(true)
      expect(store.battery()).toBe(true)
      expect(store.powerSpot()).toBe(true)
      expect(store.tabletsOfRuin()).toBe(true)
      expect(store.swordOfRuin()).toBe(true)
      expect(store.vesselOfRuin()).toBe(true)
      expect(store.beadsOfRuin()).toBe(true)
      expect(store.neutralizingGas()).toBe(true)
      expect(store.allowAllPokes()).toBe(true)
      expect(store.allItems()).toBe(true)
    })

    it("should be recognized as National Dex", () => {
      store.enableNationalDex()

      expect(store.nationalDex()).toBe(true)
    })
  })

  describe("Mode detection", () => {
    it("should not be National Dex when a single flag is turned off manually", () => {
      store.enableNationalDex()

      patchState(store, { teraType: false })

      expect(store.nationalDex()).toBe(false)
    })

    it("should not be National Dex when only some flags are enabled", () => {
      store.enableChampions()

      patchState(store, { allowAllPokes: true, allItems: true })

      expect(store.nationalDex()).toBe(false)
    })
  })

  describe("Environment without local storage", () => {
    it("should keep the selected mode in memory when localStorage is not available", () => {
      const originalLocalStorage = globalThis.localStorage

      try {
        // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
        delete globalThis.localStorage

        TestBed.resetTestingModule()
        TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] })

        const isolatedStore = TestBed.inject(FeatureFlagsStore)
        isolatedStore.enableNationalDex()

        TestBed.tick()

        expect(isolatedStore.nationalDex()).toBe(true)
        expect(globalThis.localStorage).toBeUndefined()
      } finally {
        globalThis.localStorage = originalLocalStorage
      }
    })
  })

  describe("User Data", () => {
    beforeEach(() => {
      const storage: Record<string, string | null> = {}

      vi.spyOn(localStorage, "getItem").mockImplementation((key: string): string | null => {
        return storage[key] || null
      })

      vi.spyOn(localStorage, "setItem").mockImplementation((key: string, value: string): void => {
        storage[key] = value
      })
    })

    it("should persist every flag enabled when National Dex is selected", () => {
      store.enableNationalDex()

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("featureFlags")!)
      expect(actualStorage).toEqual({
        teraType: true,
        battery: true,
        powerSpot: true,
        tabletsOfRuin: true,
        swordOfRuin: true,
        vesselOfRuin: true,
        beadsOfRuin: true,
        neutralizingGas: true,
        allowAllPokes: true,
        allItems: true
      })
    })

    it("should persist every flag disabled when Champions is selected", () => {
      store.enableNationalDex()
      TestBed.tick()

      store.enableChampions()

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("featureFlags")!)
      expect(actualStorage).toEqual({
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
      })
    })
  })
})
