import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { TeamExportModalComponent } from "@features/export-modal/export-modal.component"
import { Pokemon } from "@lib/model/pokemon"
import { evToSp } from "@lib/utils/ev-sp-converter"
import dedent from "dedent"

@Injectable({
  providedIn: "root"
})
export class ExportPokeService {
  private dialog = inject(MatDialog)

  export(title: string, pokemon: Pokemon[], useSpsMode?: boolean): void
  export(title: string, pokemon: Pokemon, useSpsMode?: boolean): void
  export(title: string, ...args: any[]): void {
    let result = ""
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

    pokemonArray.forEach(p => {
      if (!p.isDefault) {
        result += this.parse(p, useSps) + "\n"
      }
    })

    this.openModal(title, result)
  }

  private parse(pokemon: Pokemon, useSpsMode = false): string {
    let text = dedent`
      ${pokemon.name} @ ${pokemon.item}
      Ability: ${pokemon.ability.name}
      Level: ${pokemon.level}
      Tera Type: ${pokemon.teraType}\n
    `

    const evsDescription = useSpsMode ? this.spsDescriptionShowdown(pokemon) : this.evsDescriptionShowdown(pokemon)
    if (evsDescription.length > 0) {
      text += `EVs: ${evsDescription}\n`
    }

    text += `${pokemon.nature} Nature\n`

    const ivsDescription = this.ivsDescriptionShowdown(pokemon)
    if (ivsDescription.length > 0) {
      text += `IVs: ${ivsDescription}\n`
    }

    text += dedent`
      - ${pokemon.move1Name}
      - ${pokemon.move2Name}
      - ${pokemon.move3Name}
      - ${pokemon.move4Name}\n
    `

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

  private ivsDescriptionShowdown(pokemon: Pokemon): string {
    const ivs: string[] = []

    if (pokemon.ivs.hp !== 31) ivs.push(`${pokemon.ivs.hp} HP`)
    if (pokemon.ivs.atk !== 31) ivs.push(`${pokemon.ivs.atk} Atk`)
    if (pokemon.ivs.def !== 31) ivs.push(`${pokemon.ivs.def} Def`)
    if (pokemon.ivs.spa !== 31) ivs.push(`${pokemon.ivs.spa} SpA`)
    if (pokemon.ivs.spd !== 31) ivs.push(`${pokemon.ivs.spd} SpD`)
    if (pokemon.ivs.spe !== 31) ivs.push(`${pokemon.ivs.spe} Spe`)

    return ivs.join(" / ")
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
