import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { TeamExportModalComponent } from "@features/modals/export-modal/export-modal.component"
import { CalcStore } from "@store/calc-store"
import { Pokemon } from "@multicalc/model"
import { FeatureFlagsStore } from "@store/feature-flags-store"

@Injectable({
  providedIn: "root"
})
export class ExportPokeService {
  private featureFlags = inject(FeatureFlagsStore)

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

    this.openModal(title, pokemonArray, useSps)
  }

  private openModal(title: string, pokemon: Pokemon[], useSpsMode: boolean) {
    this.dialog.open(TeamExportModalComponent, {
      data: {
        title: title,
        pokemon: pokemon,
        useSpsMode: useSpsMode,
        includeTeraType: this.featureFlags.teraType()
      },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })
  }
}
