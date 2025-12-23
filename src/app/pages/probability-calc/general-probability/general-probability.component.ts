import { Component } from "@angular/core"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { ProbabilityCardComponent } from "./probability-card/probability-card.component"

@Component({
  selector: "app-general-probability",
  imports: [WidgetComponent, ProbabilityCardComponent],
  templateUrl: "./general-probability.component.html",
  styleUrl: "./general-probability.component.scss"
})
export class GeneralProbabilityComponent {
  criticalHitCard = {
    title: "Critical hit",
    headers: ["Turns", "One of your", "One of opponent", "One of four"],
    rows: [
      ["1", "8.16%", "8.16%", "15.65%"],
      ["2", "15.65%", "15.65%", "28.78%"],
      ["3", "22.75%", "22.75%", "40.00%"],
      ["4", "29.20%", "29.20%", "49.50%"],
      ["5", "35.00%", "35.00%", "57.50%"]
    ],
    cellWidths: [1, 1, 1.3, 1]
  }

  protectCard = {
    title: "Protect",
    headers: ["Times", "Success", "Failure"],
    rows: [
      ["1x", "100%", "0%"],
      ["2x", "33%", "67%"],
      ["3x", "11%", "89%"],
      ["4x", "3%", "97%"],
      ["5x", "1%", "99%"]
    ]
  }

  turnsToSleepCard = {
    title: "Turns to sleep",
    headers: ["Turns", "Chance"],
    rows: [
      ["1 turn", "33%"],
      ["2 turns", "33%"],
      ["3 turns", "33%"]
    ]
  }

  wakeUpFromSleepCard = {
    title: "Wake up from sleep",
    headers: ["Condition", "Chance to wake up"],
    rows: [
      ["If is turn 1 after sleep", "0%"],
      ["If is turn 2 after sleep", "33%"],
      ["If is turn 3 after sleep", "50%"],
      ["If is turn 4 after sleep", "100%"]
    ]
  }

  fullyParalyzedCard = {
    title: "Fully paralyzed",
    headers: ["Turns", "1x", "2x", "3x", "4x", "5x"],
    rows: [
      ["1", "25%", "-", "-", "-", "-"],
      ["2", "44%", "6%", "-", "-", "-"],
      ["3", "58%", "14%", "2%", "-", "-"],
      ["4", "68%", "21%", "5%", "0.39%", "-"],
      ["5", "76%", "26%", "9%", "1.5%", "0.10%"]
    ]
  }

  freezeCard = {
    title: "Freeze",
    headers: ["Duration", "Chance to thaw", "Chance to freeze"],
    rows: [
      ["1 turn", "20%", "80%"],
      ["2 turns", "36%", "64%"],
      ["3 turns", "49%", "51%"],
      ["4 turns", "59%", "41%"],
      ["5 turns", "67%", "33%"]
    ]
  }

  snapOutOfConfusionCard = {
    title: "Snap out of confusion",
    headers: ["Duration", "Snap out confusion", "One hit himself"],
    rows: [
      ["1 turn", "0%", "33%"],
      ["2 turns", "25%", "55%"],
      ["3 turns", "50%", "70%"],
      ["4 turns", "75%", "80%"],
      ["5 turns", "100%", "0%"]
    ]
  }

  multiHitMovesCard = {
    title: "Multi hit moves",
    headers: ["Times", "Probability", "One critical hit"],
    rows: [
      ["2 hits", "35%", "8.17%"],
      ["3 hits", "35%", "12.08%"],
      ["4 hits", "15%", "15.84%"],
      ["5 hits", "15%", "19.46%"]
    ]
  }
}
