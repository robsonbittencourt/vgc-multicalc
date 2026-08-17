import { Injectable, signal } from "@angular/core"

@Injectable({ providedIn: "root" })
export class ActiveFieldService {
  readonly activeStore = signal<any>(null)
  readonly initialFieldData = signal<Record<string, any> | null>(null)

  fieldDataFor(context: string): any {
    return this.initialFieldData()?.[context] ?? null
  }
}
