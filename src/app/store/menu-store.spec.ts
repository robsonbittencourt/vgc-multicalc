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
    expect(store.speedCalculatorActivated()).toBe(false)
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
    expect(store.speedCalculatorActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only one vs many", () => {
    store.enableOneVsMany()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(true)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalculatorActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only many vs one", () => {
    store.enableManyVsOne()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(true)
    expect(store.speedCalculatorActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only speed calculator", () => {
    store.enableSpeedCalculator()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalculatorActivated()).toBe(true)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only probability calculator", () => {
    store.enableProbabilityCalculator()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalculatorActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(true)
    expect(store.typeCalcActivated()).toBe(false)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only type calculator", () => {
    store.enableTypeCalculator()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalculatorActivated()).toBe(false)
    expect(store.probabilityCalcActivated()).toBe(false)
    expect(store.typeCalcActivated()).toBe(true)
    expect(store.howToUseActivated()).toBe(false)
  })

  it("should enable only how to use", () => {
    store.enableHowToUse()

    expect(store.oneVsOneActivated()).toBe(false)
    expect(store.oneVsManyActivated()).toBe(false)
    expect(store.manyVsOneActivated()).toBe(false)
    expect(store.speedCalculatorActivated()).toBe(false)
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
})
