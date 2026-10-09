import { Location } from "@angular/common"
import { Component, computed, inject, signal } from "@angular/core"
import { toSignal } from "@angular/core/rxjs-interop"
import { MatButton } from "@angular/material/button"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatIcon } from "@angular/material/icon"
import { ActivatedRoute, Router } from "@angular/router"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { PastePageComponent } from "@pages/paste/paste-page.component"
import { buildPasteCards } from "@pages/paste/paste-view"
import { CopyButtonComponent } from "@shared/copy-button/copy-button.component"
import { InputComponent } from "@shared/input/input.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { PasteCard } from "@shared/paste-card/paste-card"
import { PasteCardComponent } from "@shared/paste-card/paste-card.component"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { MOVESETS } from "@data/moveset-data"
import { toPokemon } from "@pokemon-repository"

type TeamsView = "compact" | "detailed"

const COMPACT_PAGE_SIZE = 20
const DETAILED_PAGE_SIZE = 3
const MOCK_PASTE_ID = "BOC3ZwOotx"
const PASTE_PARAM = "paste"

type CommunityTeam = {
  id: string
  description: string
  author: string
  handle: string
  event: string
  rank: string
  date: string
  pasteId: string
  pasteLink: string
  replicaCode: string
  cards: PasteCard[]
}

function buildTeam(id: string, description: string, author: string, handle: string, rank: string, event: string, date: string, replicaCode: string, members: [string, string][]): CommunityTeam {
  const pokemon = members.map(([name, item]) => toPokemon(name, MOVESETS).clone({ item }))

  return {
    id,
    description,
    author,
    handle,
    event,
    rank,
    date,
    pasteId: MOCK_PASTE_ID,
    pasteLink: `https://daxlgsrbxnzt9.cloudfront.net/paste/${MOCK_PASTE_ID}`,
    replicaCode,
    cards: buildPasteCards(
      pokemon,
      true,
      pokemon.map(() => false)
    )
  }
}

@Component({
  selector: "app-community-teams",
  imports: [WidgetComponent, InputComponent, InputSelectComponent, MatButtonToggleGroup, MatButtonToggle, MatButton, PokemonSpriteComponent, PasteCardComponent, CopyButtonComponent, SegmentedControlComponent, PastePageComponent, MatIcon],
  templateUrl: "./community-teams.component.html",
  styleUrl: "./community-teams.component.scss"
})
export class CommunityTeamsComponent {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private location = inject(Location)

  private queryParams = toSignal(this.route.queryParamMap)
  private openedFromList = false

  openPasteId = computed(() => this.queryParams()?.get(PASTE_PARAM) ?? null)

  readonly regulations = ["Regulation M-B", "Regulation M-A", "All Regulations"]
  readonly events = ["All Events", "Worlds 2026 San Francisco", "Ranked Season M-3"]

  readonly viewOptions: SegmentedOption<TeamsView>[] = [
    { value: "compact", label: "Compact", dataCy: "teams-view-compact" },
    { value: "detailed", label: "Detailed", dataCy: "teams-view-detailed" }
  ]

  view = signal<TeamsView>("compact")
  regulation = signal(this.regulations[0])
  search = signal("")
  event = signal(this.events[0])

  readonly popularPokemon = [
    { name: "Basculegion", uses: 292 },
    { name: "Incineroar", uses: 251 },
    { name: "Whimsicott", uses: 156 },
    { name: "Sneasler", uses: 147 },
    { name: "Floette-Mega", uses: 145 },
    { name: "Charizard", uses: 128 },
    { name: "Staraptor-Mega", uses: 125 },
    { name: "Pelipper", uses: 113 },
    { name: "Kingambit", uses: 56 },
    { name: "Garchomp", uses: 52 }
  ]

  readonly teams: CommunityTeam[] = [
    buildTeam("MB861", "Takuma Yamazaki's Worlds 2026 Champion Team", "Takuma Yamazaki", "natsumewato", "Champion", "Worlds 2026 San Francisco", "31 Aug 2026", "A4RBRNN9YE", [
      ["Dragonite-Mega", "Dragoninite"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Life Orb"],
      ["Sneasler", "Focus Sash"],
      ["Kingambit", "Chople Berry"],
      ["Garchomp", "Choice Scarf"]
    ]),
    buildTeam("MB860", "cona's Worlds 2026 Runner Up Team", "Hiroshi Onishi", "cona_5757", "Runner Up", "Worlds 2026 San Francisco", "31 Aug 2026", "MFAK51W5U1", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Life Orb"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Occa Berry"],
      ["Garchomp", "Sitrus Berry"]
    ]),
    buildTeam("MB859", "WhimVGC's Worlds 2026 Top 4 Team", "Zachary Weed", "WhimsicottVG", "3rd", "Worlds 2026 San Francisco", "31 Aug 2026", "", [
      ["Froslass-Mega", "Froslassite"],
      ["Scovillain-Mega", "Scovillainite"],
      ["Basculegion", "Life Orb"],
      ["Lycanroc-Dusk", "Focus Sash"],
      ["Sneasler", "White Herb"],
      ["Kingambit", "Black Glasses"]
    ]),
    buildTeam("MB858", "Thacrow's Worlds 2026 Top 4 Team", "João Felipe Leite", "Thacrow", "4th", "Worlds 2026 San Francisco", "30 Aug 2026", "", [
      ["Froslass-Mega", "Froslassite"],
      ["Scovillain-Mega", "Scovillainite"],
      ["Basculegion", "Life Orb"],
      ["Lycanroc-Dusk", "Focus Sash"],
      ["Sneasler", "White Herb"],
      ["Kingambit", "Black Glasses"]
    ]),
    buildTeam("MB857", "Rahxen's Worlds 2026 Top 8 Team", "Antonio Sánchez", "ImRahxen", "5th", "Worlds 2026 San Francisco", "31 Aug 2026", "", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Incineroar", "Sitrus Berry"],
      ["Toxapex", "Leftovers"],
      ["Venusaur", "Focus Sash"],
      ["Sylveon", "Fairy Feather"],
      ["Garchomp", "Choice Scarf"]
    ]),
    buildTeam("MB856", "Yuu's Worlds 2026 Top 8 Team", "Yuya Wakasugi", "yu_yan_poke", "6th", "Worlds 2026 San Francisco", "30 Aug 2026", "PDH3DRQ3FW", [
      ["Dragonite-Mega", "Dragoninite"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Life Orb"],
      ["Sneasler", "White Herb"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Chople Berry"]
    ]),
    buildTeam("MB855", "Stefano Greppi's Worlds 2026 Top 8 Team", "Stefano Greppi", "ssteccaa", "7th", "Worlds 2026 San Francisco", "31 Aug 2026", "F2MFXB90GY", [
      ["Aerodactyl-Mega", "Aerodactylite"],
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Farigiraf", "Sitrus Berry"],
      ["Kingambit", "Focus Sash"],
      ["Sylveon", "Fairy Feather"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB854", "Genius' Worlds 2026 Top 8 Team", "Giovanni Piscitelli", "GeniusVGC", "8th", "Worlds 2026 San Francisco", "31 Aug 2026", "", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Mystic Water"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Chople Berry"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB853", "zeen's Worlds 2026 Top 16 Team", "Shohei Kimura", "zeen172m", "9th", "Worlds 2026 San Francisco", "30 Aug 2026", "TMTM7YB013", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Colbur Berry"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Black Glasses"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB852", "Carson St. Denis' Worlds 2026 Top 16 Team", "Carson St. Denis", "Carson St. Denis", "10th", "Worlds 2026 San Francisco", "31 Aug 2026", "FG47SL47SU", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Basculegion", "Mystic Water"],
      ["Sneasler", "White Herb"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Chople Berry"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB851", "mimikyufool's Worlds 2026 Top 16 Team", "Cary D’Ortona", "mimikyufool", "11th", "Worlds 2026 San Francisco", "30 Aug 2026", "58N380SYT2", [
      ["Raichu-Mega-Y", "Raichunite Y"],
      ["Staraptor-Mega", "Staraptite"],
      ["Arcanine-Hisui", "Focus Sash"],
      ["Farigiraf", "Sitrus Berry"],
      ["Kingambit", "Life Orb"],
      ["Sylveon", "Fairy Feather"]
    ]),
    buildTeam("MB850", "emforbes' Worlds 2026 Top 16 Team", "Emilio Forbes", "gazemilyy", "12th", "Worlds 2026 San Francisco", "31 Aug 2026", "EE6F94UC7P", [
      ["Aerodactyl-Mega", "Aerodactylite"],
      ["Raichu-Mega-Y", "Raichunite Y"],
      ["Tsareena", "Focus Sash"],
      ["Sneasler", "White Herb"],
      ["Kingambit", "Life Orb"],
      ["Sylveon", "Fairy Feather"]
    ]),
    buildTeam("MB849", "NJ11's Worlds 2026 Top 16 Team", "Navjit Joshi", "isastarter", "13th", "Worlds 2026 San Francisco", "30 Aug 2026", "HVN07JUTAQ", [
      ["Raichu-Mega-Y", "Raichunite Y"],
      ["Staraptor-Mega", "Staraptite"],
      ["Arcanine-Hisui", "Focus Sash"],
      ["Whimsicott", "Occa Berry"],
      ["Kingambit", "Life Orb"],
      ["Sylveon", "Fairy Feather"]
    ]),
    buildTeam("MB848", "Panda's Worlds 2026 Top 16 Team", "Justin Tang", "unironicpanda", "14th", "Worlds 2026 San Francisco", "31 Aug 2026", "BFCQ81G5S3", [
      ["Blastoise-Mega", "Blastoisinite"],
      ["Delphox-Mega", "Delphoxite"],
      ["Incineroar", "Sitrus Berry"],
      ["Sneasler", "Focus Sash"],
      ["Sinistcha-Masterpiece", "Colbur Berry"],
      ["Kingambit", "Life Orb"]
    ]),
    buildTeam("MB847", "Chloe's Worlds 2026 Top 16 Team", "Chloe Bourke", "chlotad", "16th", "Worlds 2026 San Francisco", "30 Aug 2026", "", [
      ["Metagross-Mega", "Metagrossite"],
      ["Raichu-Mega-Y", "Raichunite Y"],
      ["Basculegion", "Life Orb"],
      ["Kleavor", "Focus Sash"],
      ["Whimsicott", "Fairy Feather"],
      ["Kingambit", "Chople Berry"]
    ]),
    buildTeam("MB846", "MyStars' Worlds 2026 Top 32 Team", "Narawitch Naenna", "mystarseiei", "17th", "Worlds 2026 San Francisco", "1 Sep 2026", "0V59GGVAVK", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Swampert-Mega", "Swampertite"],
      ["Pelipper", "Sitrus Berry"],
      ["Venusaur", "Focus Sash"],
      ["Grimmsnarl", "Light Clay"],
      ["Archaludon", "Leftovers"]
    ]),
    buildTeam("MB845", "NikolajHoej's Worlds 2026 Top 32 Team", "Nikolaj Høj Nielsen", "nikolajhoej", "18th", "Worlds 2026 San Francisco", "30 Aug 2026", "F6DNE8NT0P", [
      ["Aerodactyl-Mega", "Aerodactylite"],
      ["Camerupt-Mega", "Cameruptite"],
      ["Kangaskhan", "Life Orb"],
      ["Farigiraf", "Sitrus Berry"],
      ["Kingambit", "Expert Belt"],
      ["Sylveon", "Fairy Feather"]
    ]),
    buildTeam("MB844", "sunoru's Worlds 2026 Top 32 Team", "Si Dawei", "sunoru_sidw", "24th", "Worlds 2026 San Francisco", "3 Sep 2026", "RTNVG9WHTL", [
      ["Delphox-Mega", "Delphoxite"],
      ["Floette-Mega", "Floettite"],
      ["Incineroar", "Sitrus Berry"],
      ["Milotic", "Leftovers"],
      ["Vanilluxe", "Choice Scarf"],
      ["Sinistcha", "Kasib Berry"]
    ]),
    buildTeam("MB843", "Owe's Worlds 2026 Top 32 Team", "Oliver Eskolin", "owevgc", "25th", "Worlds 2026 San Francisco", "1 Sep 2026", "QTDFDF4D2B", [
      ["Staraptor-Mega", "Staraptite"],
      ["Tyranitar-Mega", "Tyranitarite"],
      ["Milotic", "Sitrus Berry"],
      ["Excadrill", "Focus Sash"],
      ["Sinistcha", "Colbur Berry"],
      ["Gholdengo", "Life Orb"]
    ]),
    buildTeam("MB842", "Justin's Worlds 2026 Top 32 Team", "Justin Cerioni", "Byte_v24", "26th", "Worlds 2026 San Francisco", "3 Sep 2026", "1DVWD9AVTM", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Incineroar", "Sitrus Berry"],
      ["Venusaur", "Life Orb"],
      ["Aegislash", "Focus Sash"],
      ["Sylveon", "Fairy Feather"],
      ["Garchomp", "Choice Scarf"]
    ]),
    buildTeam("MB841", "Paul's Worlds 2026 Top 32 Team", "Paul Chua", "Paul_Chua_", "27th", "Worlds 2026 San Francisco", "30 Aug 2026", "YMS21RYBD6", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Incineroar", "Sitrus Berry"],
      ["Toxapex", "Leftovers"],
      ["Venusaur", "Life Orb"],
      ["Sylveon", "Fairy Feather"],
      ["Garchomp", "Choice Scarf"]
    ]),
    buildTeam("MB840", "Jonotv's Worlds 2026 Top 32 Team", "Jonathan Marston", "JonoTv2000", "31st", "Worlds 2026 San Francisco", "31 Aug 2026", "ERKNUQ31CF", [
      ["Staraptor-Mega", "Staraptite"],
      ["Basculegion", "Choice Scarf"],
      ["Kleavor", "Focus Sash"],
      ["Maushold", "Chople Berry"],
      ["Whimsicott", "Occa Berry"],
      ["Kingambit", "Life Orb"]
    ]),
    buildTeam("MB839", "Lexicon's Worlds 2026 Top 64 Team", "Alex Underhill", "lexiconvgc", "33rd", "Worlds 2026 San Francisco", "31 Aug 2026", "34T1N61VVA", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Swampert-Mega", "Swampertite"],
      ["Pelipper", "Sitrus Berry"],
      ["Venusaur", "Focus Sash"],
      ["Grimmsnarl", "Light Clay"],
      ["Archaludon", "Leftovers"]
    ]),
    buildTeam("MB838", "Ryoma's Worlds 2026 Top 64 Team", "Ryoma Okamoto", "ryoma9901_poke", "34th", "Worlds 2026 San Francisco", "30 Aug 2026", "MGM9CLXSK5", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Incineroar", "Sitrus Berry"],
      ["Venusaur", "Wide Lens"],
      ["Aerodactyl", "Focus Sash"],
      ["Sylveon", "Fairy Feather"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB837", "fevermajin's Worlds 2026 Top 64 Team", "Sota Shimatani", "fevermajin", "37th", "Worlds 2026 San Francisco", "30 Aug 2026", "0KR782A4BV", [
      ["Raichu-Mega-Y", "Raichunite Y"],
      ["Staraptor-Mega", "Staraptite"],
      ["Arcanine-Hisui", "Focus Sash"],
      ["Farigiraf", "Sitrus Berry"],
      ["Kingambit", "Occa Berry"],
      ["Sylveon", "Fairy Feather"]
    ]),
    buildTeam("MB836", "ryankchua's Worlds 2026 Top 64 Team", "Ryan Chua", "ryankchua", "38th", "Worlds 2026 San Francisco", "30 Aug 2026", "", [
      ["Raichu-Mega-Y", "Raichunite Y"],
      ["Staraptor-Mega", "Staraptite"],
      ["Arcanine-Hisui", "Focus Sash"],
      ["Farigiraf", "Sitrus Berry"],
      ["Kingambit", "Life Orb"],
      ["Sylveon", "Fairy Feather"]
    ]),
    buildTeam("MB835", "koota's Worlds 2026 Top 64 Team", "Kota Kawabe", "koota488", "39th", "Worlds 2026 San Francisco", "30 Aug 2026", "NK704Y2TR4", [
      ["Delphox-Mega", "Delphoxite"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Choice Scarf"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Chople Berry"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB834", "Penguin's Worlds 2026 Top 64 Team", "Naoto Mizobuchi", "penguin2142", "41st", "Worlds 2026 San Francisco", "30 Aug 2026", "CGFCYQP9MY", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Incineroar", "Sitrus Berry"],
      ["Venusaur", "Wide Lens"],
      ["Aerodactyl", "Focus Sash"],
      ["Sylveon", "Fairy Feather"],
      ["Garchomp", "Life Orb"]
    ]),
    buildTeam("MB833", "Caleb Wijesinha's Worlds 2026 Top 64 Team", "Caleb Wijesinha", "wijivgc", "43rd", "Worlds 2026 San Francisco", "31 Aug 2026", "7LCRJVT2M6", [
      ["Delphox-Mega", "Delphoxite"],
      ["Floette-Mega", "Floettite"],
      ["Incineroar", "Sitrus Berry"],
      ["Sneasler", "Focus Sash"],
      ["Sinistcha", "Colbur Berry"],
      ["Kingambit", "Life Orb"]
    ]),
    buildTeam("MB832", "YT's Worlds 2026 Top 64 Team", "Yuya Tada", "ytpublic", "45th", "Worlds 2026 San Francisco", "30 Aug 2026", "XG6T3UULGB", [
      ["Charizard-Mega-Y", "Charizardite Y"],
      ["Floette-Mega", "Floettite"],
      ["Basculegion", "Mystic Water"],
      ["Whimsicott", "Focus Sash"],
      ["Kingambit", "Occa Berry"],
      ["Garchomp", "Life Orb"]
    ])
  ]

  page = signal(1)

  pageSize = computed(() => (this.view() === "compact" ? COMPACT_PAGE_SIZE : DETAILED_PAGE_SIZE))
  pageCount = computed(() => Math.max(1, Math.ceil(this.teams.length / this.pageSize())))
  pageTeams = computed(() => {
    const start = (this.page() - 1) * this.pageSize()

    return this.teams.slice(start, start + this.pageSize())
  })

  changeView(view: TeamsView) {
    const firstIndex = (this.page() - 1) * this.pageSize()

    this.view.set(view)
    this.page.set(Math.floor(firstIndex / this.pageSize()) + 1)
  }

  openPaste(team: CommunityTeam) {
    this.openedFromList = true
    this.router.navigate([], { relativeTo: this.route, queryParams: { [PASTE_PARAM]: team.pasteId }, queryParamsHandling: "merge" })
  }

  closePaste() {
    if (this.openedFromList) {
      this.openedFromList = false
      this.location.back()
      return
    }

    this.router.navigate([], { relativeTo: this.route, queryParams: { [PASTE_PARAM]: null }, queryParamsHandling: "merge", replaceUrl: true })
  }

  previousPage() {
    this.page.set(Math.max(1, this.page() - 1))
  }

  nextPage() {
    this.page.set(Math.min(this.pageCount(), this.page() + 1))
  }
}
