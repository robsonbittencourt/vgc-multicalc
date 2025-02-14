import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { inject, Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { TeamExportModalComponent } from "@app/shared/export-modal/export-modal.component"
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
    let evsDescription = ""

    if (pokemon.evs.hp && pokemon.evs.hp != 0) evsDescription += `${pokemon.evs.hp} HP / `
    if (pokemon.evs.atk && pokemon.evs.atk != 0) evsDescription += `${pokemon.evs.atk} Atk / `
    if (pokemon.evs.def && pokemon.evs.def != 0) evsDescription += `${pokemon.evs.def} Def / `
    if (pokemon.evs.spa && pokemon.evs.spa != 0) evsDescription += `${pokemon.evs.spa} SpA / `
    if (pokemon.evs.spd && pokemon.evs.spd != 0) evsDescription += `${pokemon.evs.spd} SpD / `
    if (pokemon.evs.spe && pokemon.evs.spe != 0) evsDescription += `${pokemon.evs.spe} Spe / `

    evsDescription = evsDescription.slice(0, -3)

    return evsDescription
  }

  private ivsDescriptionShowdown(pokemon: Pokemon): string {
    let ivsDescription = ""

    if (pokemon.ivs.hp != 31) ivsDescription += `${pokemon.ivs.hp} HP / `
    if (pokemon.ivs.atk != 31) ivsDescription += `${pokemon.ivs.atk} Atk / `
    if (pokemon.ivs.def != 31) ivsDescription += `${pokemon.ivs.def} Def / `
    if (pokemon.ivs.spa != 31) ivsDescription += `${pokemon.ivs.spa} SpA / `
    if (pokemon.ivs.spd != 31) ivsDescription += `${pokemon.ivs.spd} SpD / `
    if (pokemon.ivs.spe != 31) ivsDescription += `${pokemon.ivs.spe} Spe / `

    ivsDescription = ivsDescription.slice(0, -3)

    return ivsDescription
  }

  private openModal(title: string, content: string) {
    this.dialog.open(TeamExportModalComponent, {
      data: {
        title: title,
        content: content
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }
}
