import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MenuStore } from "./menu-store"

describe("Menu Store", () => {
  let store: MenuStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })

    store = TestBed.inject(MenuStore)
  })

  it("one vs one should be the only option activated by default", () => {
    expect(store.oneVsOneActivated()).toBe(true)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only one vs one", () => {
    store.enableOneVsMany()

    store.enableOneVsOne()

    expect(store.oneVsOneActivated()).toBe(true)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only one vs many", () => {
    store.enableOneVsMany()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(true)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only many vs one", () => {
    store.enableManyVsOne()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(true)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only speed calculator", () => {
    store.enableSpeedCalc()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(true)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only probability calculator", () => {
    store.enableProbabilityCalc()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(true)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only type calculator", () => {
    store.enableTypeCalc()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(true)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only how to use", () => {
    store.enableHowToUse()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalcActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(true)
  })

  it("should toggle order by damage without changing navigation", () => {
    store.enableOneVsMany()

    store.toggleOrderByDamage()

    expect(store.orderByDamage()).toBe(true)
    expect(store.oneVsManyActivated()).toBe(true)
  })

  it("should keep order by damage and best move when navigation changes", () => {
    store.toggleOrderByDamage()
    store.toggleOneVsManyBestMove()

    store.enableManyVsOne()

    expect(store.orderByDamage()).toBe(true)
    expect(store.oneVsManyBestMoveActivated()).toBe(true)
  })

  it("should start with many vs one best move activated", () => {
    expect(store.manyVsOneBestMoveActivated()).toBe(true)
  })

  it("should toggle many vs one best move without changing navigation", () => {
    store.enableManyVsOne()

    store.toggleManyVsOneBestMove()

    expect(store.manyVsOneBestMoveActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(true)
  })

  it("should toggle many vs one best move back to activated", () => {
    store.toggleManyVsOneBestMove()
    store.toggleManyVsOneBestMove()

    expect(store.manyVsOneBestMoveActivated()).toBe(true)
  })

  it("should keep many vs one best move when navigation changes", () => {
    store.toggleManyVsOneBestMove()

    store.enableOneVsMany()

    expect(store.manyVsOneBestMoveActivated()).toBe(false)
  })

  it("should persist many vs one best move", () => {
    store.toggleManyVsOneBestMove()

    TestBed.tick()

    const actualStorage = JSON.parse(localStorage.getItem("userData")!)
    expect(actualStorage.menuData.manyVsOneBestMoveActivated).toBe(false)
  })

  describe("Corrupted user data", () => {
    it("should replace a corrupted user data with a valid one when the state changes", () => {
      localStorage.setItem("userData", "this is not json")

      store.toggleOrderByDamage()

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("userData")!)
      expect(actualStorage.menuData.orderByDamage).toBe(true)
    })
  })

  describe("Environment without local storage", () => {
    it("should not persist the menu options when localStorage is not available", () => {
      const originalLocalStorage = globalThis.localStorage

      try {
        // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
        delete globalThis.localStorage

        TestBed.resetTestingModule()
        TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] })

        const isolatedStore = TestBed.inject(MenuStore)
        isolatedStore.toggleOrderByDamage()

        TestBed.tick()

        expect(isolatedStore.orderByDamage()).toBe(true)
        expect(globalThis.localStorage).toBeUndefined()
      } finally {
        globalThis.localStorage = originalLocalStorage
      }
    })
  })
})
