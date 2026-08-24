export interface CalcTab<Id extends string = string> {
  id: Id
  label: string
  icon: string
  svgIcon?: boolean
}
