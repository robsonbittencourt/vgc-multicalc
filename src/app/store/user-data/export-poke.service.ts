import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { TeamExportModalComponent } from "@features/modals/export-modal/export-modal.component"
import { FEATURES } from "@configuration/feature-flags"
import { CalcStore } from "@store/calc-store"
import { Pokemon } from "@multicalc/model"
import { evToSp } from "@multicalc/utils/ev-sp-converter"
import { normalizePokemonNameForExport } from "@adapters"
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
    const results = await Promise.all(toExport.map(p => this.parse(p, useSps)))
    this.openModal(title, results.map(r => r + "\n").join(""))
  }

  private async parse(pokemon: Pokemon, useSpsMode = false): Promise<string> {
    const { default: dedent } = await import("dedent")
    let text = dedent`
      ${normalizePokemonNameForExport(pokemon.name)} @ ${pokemon.item}
      Ability: ${pokemon.ability.name}
      Level: ${pokemon.level}\n
    `

    if (FEATURES.teraType) {
      text += `Tera Type: ${pokemon.teraType}\n`
    }

    const evsDescription = useSpsMode ? this.spsDescriptionShowdown(pokemon) : this.evsDescriptionShowdown(pokemon)
    if (evsDescription.length > 0) {
      text += `EVs: ${evsDescription}\n`
    }

    text += `${pokemon.nature} Nature\n`

    const moves = [pokemon.move1Name, pokemon.move2Name, pokemon.move3Name, pokemon.move4Name].filter(move => move && move !== "undefined" && move !== "")
    text += moves.map(move => `- ${move}`).join("\n") + "\n"

    return text
  }

  private evsDescriptionShowdown(pokemon: Pokemon): string {
    const evs: string[] = []

    if (pokemon.evs.hp) evs.push(`${pokemon.evs.hp} HP`)
    if (pokemon.evs.atk) evs.push(`${pokemon.evs.atk} Atk`)
    if (pokemon.evs.def) evs.push(`${pokemon.evs.def} Def`)
    if (pokemon.evs.spa) evs.push(`${pokemon.evs.spa} SpA`)
    if (pokemon.evs.spd) evs.push(`${pokemon.evs.spd} SpD`)
    if (pokemon.evs.spe) evs.push(`${pokemon.evs.spe} Spe`)

    return evs.join(" / ")
  }

  private spsDescriptionShowdown(pokemon: Pokemon): string {
    const sps: string[] = []

    const hpSps = evToSp(pokemon.evs.hp)
    if (hpSps) sps.push(`${hpSps} HP`)
    const atkSps = evToSp(pokemon.evs.atk)
    if (atkSps) sps.push(`${atkSps} Atk`)
    const defSps = evToSp(pokemon.evs.def)
    if (defSps) sps.push(`${defSps} Def`)
    const spaSps = evToSp(pokemon.evs.spa)
    if (spaSps) sps.push(`${spaSps} SpA`)
    const spdSps = evToSp(pokemon.evs.spd)
    if (spdSps) sps.push(`${spdSps} SpD`)
    const speSps = evToSp(pokemon.evs.spe)
    if (speSps) sps.push(`${speSps} Spe`)

    return sps.join(" / ")
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
