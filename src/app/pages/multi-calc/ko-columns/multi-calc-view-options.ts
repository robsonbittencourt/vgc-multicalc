import { SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { MultiCalcView } from "@store/utils/initial-menu-state"

export const MULTI_CALC_VIEW_OPTIONS: SegmentedOption<MultiCalcView>[] = [
  { value: "cards", label: "Cards", dataCy: "multi-calc-view-cards" },
  { value: "dense", label: "Dense", dataCy: "multi-calc-view-dense" }
]
