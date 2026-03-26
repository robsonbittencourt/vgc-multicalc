import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { TeamExportModalComponent } from "@features/export-modal/export-modal.component"
import { Pokemon } from "@lib/model/pokemon"
import dedent from "dedent"

@Injectable({
  providedIn: "root"
})
export class ExportPokeService {
  private dialog = inject(MatDialog)

  export(title: string, ...pokemon: Pokemon[]) {
    let result = ""

    pokemon.forEach(p => {
      if (!p.isDefault) {
        result += this.parse(p) + "\n"
      }
    })

    this.openModal(title, result)
  }

  private parse(pokemon: Pokemon): string {
    let text = dedent`
      ${pokemon.name} @ ${pokemon.item}
      Ability: ${pokemon.ability.name}
      Level: ${pokemon.level}
      Tera Type: ${pokemon.teraType}\n      
    `

    const evsDescription = this.evsDescriptionShowdown(pokemon)
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
