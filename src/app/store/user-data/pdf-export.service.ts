import { inject, Injectable } from "@angular/core"
import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { MatDialog } from "@angular/material/dialog"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { TeamListModalComponent, TeamListPlayerInfo } from "@features/team-list-modal/team-list-modal.component"
import { CalcStore } from "@store/calc-store"
import { Ability, Team, Pokemon } from "@multicalc/model"

interface PokemonPrintData {
  name: string
  nature: string
  ability: { name: string }
  item: string
  moveSet: Pokemon["moveSet"]
  stats: Pokemon["stats"]
}

interface FieldPosition {
  x: number
  y: number
}

interface PokemonFields {
  name: FieldPosition
  statAlignment: FieldPosition
  ability: FieldPosition
  heldItem: FieldPosition
  move1: FieldPosition
  move2: FieldPosition
  move3: FieldPosition
  move4: FieldPosition
  hp: FieldPosition
  atk: FieldPosition
  def: FieldPosition
  spAtk: FieldPosition
  spDef: FieldPosition
  speed: FieldPosition
}

type PokemonFieldsPage2 = Pick<PokemonFields, "name" | "statAlignment" | "ability" | "heldItem" | "move1" | "move2" | "move3" | "move4">

const FONT_SIZE = 10

const PAGE1_POKEMON: PokemonFields[] = [
  {
    name: { x: 100, y: 610.7 },
    statAlignment: { x: 100, y: 583.6 },
    ability: { x: 100, y: 559.8 },
    heldItem: { x: 100, y: 536.6 },
    move1: { x: 100, y: 513.4 },
    move2: { x: 100, y: 490.3 },
    move3: { x: 100, y: 467.1 },
    move4: { x: 100, y: 443.9 },
    hp: { x: 266, y: 559.2 },
    atk: { x: 266, y: 536.1 },
    def: { x: 266, y: 512.9 },
    spAtk: { x: 266, y: 489.7 },
    spDef: { x: 266, y: 466.6 },
    speed: { x: 266, y: 443.4 }
  },
  {
    name: { x: 390, y: 610.7 },
    statAlignment: { x: 390, y: 583.6 },
    ability: { x: 390, y: 559.8 },
    heldItem: { x: 390, y: 536.6 },
    move1: { x: 390, y: 513.4 },
    move2: { x: 390, y: 490.3 },
    move3: { x: 390, y: 467.1 },
    move4: { x: 390, y: 443.9 },
    hp: { x: 558, y: 559.2 },
    atk: { x: 558, y: 536.1 },
    def: { x: 558, y: 512.9 },
    spAtk: { x: 558, y: 489.7 },
    spDef: { x: 558, y: 466.6 },
    speed: { x: 558, y: 443.4 }
  },
  {
    name: { x: 100, y: 409.3 },
    statAlignment: { x: 100, y: 382.2 },
    ability: { x: 100, y: 358.4 },
    heldItem: { x: 100, y: 335.2 },
    move1: { x: 100, y: 312.1 },
    move2: { x: 100, y: 288.9 },
    move3: { x: 100, y: 266.7 },
    move4: { x: 100, y: 243.6 },
    hp: { x: 266, y: 357.8 },
    atk: { x: 266, y: 334.6 },
    def: { x: 266, y: 311.5 },
    spAtk: { x: 266, y: 288.3 },
    spDef: { x: 266, y: 265.2 },
    speed: { x: 266, y: 242.0 }
  },
  {
    name: { x: 390, y: 409.3 },
    statAlignment: { x: 390, y: 382.2 },
    ability: { x: 390, y: 358.4 },
    heldItem: { x: 390, y: 335.2 },
    move1: { x: 390, y: 312.1 },
    move2: { x: 390, y: 288.9 },
    move3: { x: 390, y: 266.7 },
    move4: { x: 390, y: 243.6 },
    hp: { x: 558, y: 357.8 },
    atk: { x: 558, y: 334.6 },
    def: { x: 558, y: 311.5 },
    spAtk: { x: 558, y: 288.3 },
    spDef: { x: 558, y: 265.2 },
    speed: { x: 558, y: 242.0 }
  },
  {
    name: { x: 100, y: 207.9 },
    statAlignment: { x: 100, y: 180.8 },
    ability: { x: 100, y: 157.0 },
    heldItem: { x: 100, y: 133.8 },
    move1: { x: 100, y: 110.7 },
    move2: { x: 100, y: 87.5 },
    move3: { x: 100, y: 66.3 },
    move4: { x: 100, y: 43.2 },
    hp: { x: 266, y: 156.4 },
    atk: { x: 266, y: 133.3 },
    def: { x: 266, y: 110.1 },
    spAtk: { x: 266, y: 86.9 },
    spDef: { x: 266, y: 63.8 },
    speed: { x: 266, y: 43.6 }
  },
  {
    name: { x: 390, y: 207.9 },
    statAlignment: { x: 390, y: 180.8 },
    ability: { x: 390, y: 157.0 },
    heldItem: { x: 390, y: 133.8 },
    move1: { x: 390, y: 110.7 },
    move2: { x: 390, y: 87.5 },
    move3: { x: 390, y: 66.3 },
    move4: { x: 390, y: 43.2 },
    hp: { x: 558, y: 156.4 },
    atk: { x: 558, y: 133.3 },
    def: { x: 558, y: 110.1 },
    spAtk: { x: 558, y: 86.9 },
    spDef: { x: 558, y: 63.8 },
    speed: { x: 558, y: 43.6 }
  }
]

const PAGE2_POKEMON: PokemonFieldsPage2[] = [
  {
    name: { x: 100, y: 612.9 },
    statAlignment: { x: 100, y: 585.9 },
    ability: { x: 100, y: 562.1 },
    heldItem: { x: 100, y: 538.9 },
    move1: { x: 100, y: 515.7 },
    move2: { x: 100, y: 492.6 },
    move3: { x: 100, y: 469.4 },
    move4: { x: 100, y: 446.2 }
  },
  {
    name: { x: 390, y: 612.9 },
    statAlignment: { x: 390, y: 585.9 },
    ability: { x: 390, y: 562.1 },
    heldItem: { x: 390, y: 538.9 },
    move1: { x: 390, y: 515.7 },
    move2: { x: 390, y: 492.6 },
    move3: { x: 390, y: 469.4 },
    move4: { x: 390, y: 446.2 }
  },
  {
    name: { x: 100, y: 411.6 },
    statAlignment: { x: 100, y: 384.5 },
    ability: { x: 100, y: 360.6 },
    heldItem: { x: 100, y: 337.5 },
    move1: { x: 100, y: 314.3 },
    move2: { x: 100, y: 291.2 },
    move3: { x: 100, y: 268.0 },
    move4: { x: 100, y: 244.8 }
  },
  {
    name: { x: 390, y: 411.6 },
    statAlignment: { x: 390, y: 384.5 },
    ability: { x: 390, y: 360.6 },
    heldItem: { x: 390, y: 337.5 },
    move1: { x: 390, y: 314.3 },
    move2: { x: 390, y: 291.2 },
    move3: { x: 390, y: 268.0 },
    move4: { x: 390, y: 244.8 }
  },
  {
    name: { x: 100, y: 210.1 },
    statAlignment: { x: 100, y: 183.1 },
    ability: { x: 100, y: 159.3 },
    heldItem: { x: 100, y: 136.1 },
    move1: { x: 100, y: 112.9 },
    move2: { x: 100, y: 89.8 },
    move3: { x: 100, y: 66.6 },
    move4: { x: 100, y: 43.4 }
  },
  {
    name: { x: 390, y: 210.1 },
    statAlignment: { x: 390, y: 183.1 },
    ability: { x: 390, y: 159.3 },
    heldItem: { x: 390, y: 136.1 },
    move1: { x: 390, y: 112.9 },
    move2: { x: 390, y: 89.8 },
    move3: { x: 390, y: 66.6 },
    move4: { x: 390, y: 43.4 }
  }
]

@Injectable({
  providedIn: "root"
})
export class PdfExportService {
  private megaStoneService = inject(MegaStoneService)
  private dialog = inject(MatDialog)
  private store = inject(CalcStore)

  export(team: Team) {
    const ref = this.dialog.open(TeamListModalComponent, {
      data: { teamName: team.name },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })

    ref.afterClosed().subscribe((playerInfo: TeamListPlayerInfo | undefined) => {
      if (!playerInfo) return
      this.generatePdf(team, playerInfo)
    })
  }

  private async generatePdf(team: Team, playerInfo: TeamListPlayerInfo) {
    const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib")

    const templateBytes = await fetch("assets/play-pokemon-vg-team-list.pdf").then(r => r.arrayBuffer())
    const pdfDoc = await PDFDocument.load(templateBytes)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const page1 = pages[0]
    const page2 = pages[1]

    const includeStaff = playerInfo.pageSelection === "Staff" || playerInfo.pageSelection === "Both"
    const includeOts = playerInfo.pageSelection === "OTS" || playerInfo.pageSelection === "Both"

    if (includeStaff) this.fillHeaderPage1(page1, font, rgb, playerInfo)
    if (includeOts) this.fillHeaderPage2(page2, font, rgb, playerInfo)

    const pokemons = team.teamMembers.map(tm => tm.pokemon)

    for (let i = 0; i < Math.min(pokemons.length, 6); i++) {
      const pokemon = pokemons[i]

      const printPokemon = this.resolveBaseForm(pokemon)

      if (includeStaff) this.fillPage1Pokemon(page1, font, rgb, printPokemon, PAGE1_POKEMON[i])
      if (includeOts) this.fillPage2Pokemon(page2, font, rgb, printPokemon, PAGE2_POKEMON[i])
    }

    if (playerInfo.pageSelection === "Staff") pdfDoc.removePage(1)
    if (playerInfo.pageSelection === "OTS") pdfDoc.removePage(0)

    const pdfBytes = await pdfDoc.save()
    const baseName = playerInfo.playerId || team.name
    const suffix = playerInfo.pageSelection === "Staff" ? "-staff" : playerInfo.pageSelection === "OTS" ? "-ots" : ""
    this.download(pdfBytes, `${baseName}${suffix}.pdf`)
  }

  private fillHeaderPage1(page: any, font: any, rgb: any, info: TeamListPlayerInfo) {
    const draw = (text: string, x: number, y: number) => {
      if (!text) return
      page.drawText(text, { x, y, size: FONT_SIZE, font, color: rgb(0, 0, 0) })
    }

    draw(info.playerName, 155, 706.4)
    draw(info.trainerName, 155, 684.3)
    draw(info.switchProfileName, 155, 639.9)
    draw(info.battleTeamName, 155, 664.4)
    draw(info.playerId, 445, 684.3)
    draw(info.supportId, 445, 639.9)

    const parts = info.dateOfBirth.split("/")
    const order = info.datePartOrder ?? "mdy"
    const month = order === "mdy" ? parts[0] : parts[1]
    const day = order === "mdy" ? parts[1] : order === "dmy" ? parts[0] : parts[2]
    const year = order === "ymd" ? parts[0] : parts[2]
    draw(month ?? "", 449, 664.4)
    draw(day ?? "", 502, 664.4)
    draw(year ?? "", 548, 664.4)

    if (info.ageDivision === "Juniors") draw("X", 474, 705)
    else if (info.ageDivision === "Seniors") draw("X", 529, 705)
    else if (info.ageDivision === "Masters") draw("X", 580, 706)
  }

  private fillHeaderPage2(page: any, font: any, rgb: any, info: TeamListPlayerInfo) {
    const draw = (text: string, x: number, y: number) => {
      if (!text) return
      page.drawText(text, { x, y, size: FONT_SIZE, font, color: rgb(0, 0, 0) })
    }

    draw(info.playerName, 155, 708.2)
    draw(info.trainerName, 155, 686.1)
    draw(info.switchProfileName, 155, 641.7)
    draw(info.battleTeamName, 155, 664.8)

    if (info.ageDivision === "Juniors") draw("X", 474, 706.8)
    else if (info.ageDivision === "Seniors") draw("X", 529, 706.8)
    else if (info.ageDivision === "Masters") draw("X", 580, 707.8)
  }

  private resolveBaseForm(pokemon: Pokemon): PokemonPrintData {
    if (!this.megaStoneService.isMega(pokemon.name)) return pokemon

    const baseName = this.megaStoneService.getBaseName(pokemon.name)
    const baseAbility = this.megaStoneService.getBaseFormAbility(pokemon.id) ?? new Pokemon(baseName).ability.name
    const basePokemon = new Pokemon(baseName, { ability: new Ability(baseAbility, false), nature: pokemon.nature, item: pokemon.item, evs: pokemon.evs, ivs: pokemon.ivs, moveSet: pokemon.moveSet })

    return basePokemon
  }

  private fillPage1Pokemon(page: any, font: any, rgb: any, pokemon: PokemonPrintData, fields: PokemonFields) {
    this.fillPokemonBase(page, font, rgb, pokemon, fields)
    const draw = (text: string, pos: FieldPosition) => {
      if (!text) return
      page.drawText(text, { x: pos.x, y: pos.y, size: FONT_SIZE, font, color: rgb(0, 0, 0) })
    }
    draw(String(pokemon.stats.hp), fields.hp)
    draw(String(pokemon.stats.atk), fields.atk)
    draw(String(pokemon.stats.def), fields.def)
    draw(String(pokemon.stats.spa), fields.spAtk)
    draw(String(pokemon.stats.spd), fields.spDef)
    draw(String(pokemon.stats.spe), fields.speed)
  }

  private fillPage2Pokemon(page: any, font: any, rgb: any, pokemon: PokemonPrintData, fields: PokemonFieldsPage2) {
    this.fillPokemonBase(page, font, rgb, pokemon, fields)
  }

  private fillPokemonBase(page: any, font: any, rgb: any, pokemon: PokemonPrintData, fields: PokemonFieldsPage2) {
    const draw = (text: string, pos: FieldPosition) => {
      if (!text) return
      page.drawText(text, { x: pos.x, y: pos.y, size: FONT_SIZE, font, color: rgb(0, 0, 0) })
    }

    draw(pokemon.name, fields.name)
    draw(pokemon.nature, fields.statAlignment)
    draw(pokemon.ability.name, fields.ability)
    draw(pokemon.item !== "No Item" ? pokemon.item : "", fields.heldItem)
    draw(pokemon.moveSet.move1.name, fields.move1)
    draw(pokemon.moveSet.move2.name, fields.move2)
    draw(pokemon.moveSet.move3.name, fields.move3)
    draw(pokemon.moveSet.move4.name, fields.move4)
  }

  private download(bytes: Uint8Array, filename: string) {
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
}
