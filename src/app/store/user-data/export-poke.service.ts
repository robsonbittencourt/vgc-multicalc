import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { TeamExportModalComponent } from "@features/modals/export-modal/export-modal.component"
import { FEATURES } from "@configuration/feature-flags"
import { CalcStore } from "@store/calc-store"
import { Pokemon } from "@multicalc/model"
import { toShowdownText } from "@multicalc/serialization"

@Injectable({
  providedIn: "root"
})
export class ExportPokeService {
  private dialog = inject(MatDialog)
  private store = inject(CalcStore)

  export(title: string, pokemon: Pokemon[], useSpsMode?: boolean): Promise<void>
  export(title: string, pokemon: Pokemon, useSpsMode?: boolean): Promise<void>
  async export(title: string, ...args: any[]): Promise<void> {
    let pokemonArray: Pokemon[] = []
    let useSps = false

    if (args.length > 0) {
      if (Array.isArray(args[0])) {
        pokemonArray = args[0]
        useSps = args[1] ?? false
      } else if (args[0] instanceof Pokemon || (args[0] && typeof args[0] === "object" && "name" in args[0])) {
        pokemonArray = [args[0]]
        useSps = args[1] ?? false
      } else {
        pokemonArray = args.filter(arg => arg instanceof Pokemon || (arg && typeof arg === "object" && "name" in arg))
        useSps = args[args.length - 1] === true
      }
    }

    const toExport = pokemonArray
    const results = await Promise.all(toExport.map(p => toShowdownText(p, useSps, FEATURES.teraType)))
    this.openModal(title, results.map(r => r + "\n").join(""))
  }

  private openModal(title: string, content: string) {
    this.dialog.open(TeamExportModalComponent, {
      data: {
        title: title,
        content: content
      },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })
  }
}
