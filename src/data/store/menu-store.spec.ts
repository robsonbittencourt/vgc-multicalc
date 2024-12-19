import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MenuStore } from "@data/store/menu-store"

describe("Menu Store", () => {
  let store: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()]
    })

    store = TestBed.inject(MenuStore)
  })

  it("one vs one should be the only option activated by default", () => {
    expect(store.oneVsOneActivated()).toBeTrue()
    expect(store.oneVsManyActivated()).toBeFalse()
    expect(store.manyVsOneActivated()).toBeFalse()
    expect(store.speedCalculatorActivated()).toBeFalse()
  })

  it("should enable only one vs one", () => {
    store.enableOneVsMany()

    store.enableOneVsOne()

    expect(store.oneVsOneActivated()).toBeTrue()
    expect(store.oneVsManyActivated()).toBeFalse()
    expect(store.manyVsOneActivated()).toBeFalse()
    expect(store.speedCalculatorActivated()).toBeFalse()
  })

  it("should enable only one vs many", () => {
    store.enableOneVsMany()

    expect(store.oneVsOneActivated()).toBeFalse()
    expect(store.oneVsManyActivated()).toBeTrue()
    expect(store.manyVsOneActivated()).toBeFalse()
    expect(store.speedCalculatorActivated()).toBeFalse()
  })

  it("should enable only many vs one", () => {
    store.enableManyVsOne()

    expect(store.oneVsOneActivated()).toBeFalse()
    expect(store.oneVsManyActivated()).toBeFalse()
    expect(store.manyVsOneActivated()).toBeTrue()
    expect(store.speedCalculatorActivated()).toBeFalse()
  })

  it("should enable only speed calculator", () => {
    store.enableSpeedCalculator()

    expect(store.oneVsOneActivated()).toBeFalse()
    expect(store.oneVsManyActivated()).toBeFalse()
    expect(store.manyVsOneActivated()).toBeFalse()
    expect(store.speedCalculatorActivated()).toBeTrue()
  })
})
