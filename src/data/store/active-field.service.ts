import { Injectable, signal } from "@angular/core"

@Injectable({ providedIn: "root" })
export class ActiveFieldService {
  readonly activeStore = signal<any>(null)
  readonly initialFieldData = signal<any>(null)
}
