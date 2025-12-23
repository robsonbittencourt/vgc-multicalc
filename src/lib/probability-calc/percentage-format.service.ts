import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class PercentageFormatService {
  formatPercentage(value: number): string {
    const percent = value * 100

    if (percent === 0) {
      return "0"
    }

    if (Math.abs(value - 0.01) < 0.0001) {
      return "1.0"
    }
    if (Math.abs(value - 0.001) < 0.0001) {
      return "0.10"
    }
    if (Math.abs(value - 0.0001) < 0.0001) {
      return "0.010"
    }

    if (Math.abs(percent) >= 1) {
      let formatted = percent.toFixed(1)
      formatted = formatted.replace(/\.0$/, "")
      return formatted
    }

    let precision = 2

    if (percent < 0.1) {
      precision = 3
    }

    if (percent < 0.01) {
      precision = 4
    }

    let formatted = percent.toFixed(precision)

    formatted = formatted.replace(/(\.\d*?[1-9])0+$/, "$1")

    return formatted
  }
}
