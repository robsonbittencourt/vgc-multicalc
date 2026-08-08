import { Pipe, PipeTransform } from "@angular/core"
import { ProbabilityPercentFormatter } from "./probability-percent-formatter"

@Pipe({
  name: "probabilityPercent"
})
export class ProbabilityPercentPipe implements PipeTransform {
  private formatter = new ProbabilityPercentFormatter()

  transform(value: number): string {
    return this.formatter.format(value)
  }
}
