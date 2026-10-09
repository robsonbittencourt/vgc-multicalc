import { Clipboard } from "@angular/cdk/clipboard"
import { DOCUMENT, NgTemplateOutlet } from "@angular/common"
import { Component, computed, inject, input, OnInit, signal, TemplateRef } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"
import { Title } from "@angular/platform-browser"
import { ActivatedRoute, Router, RouterLink } from "@angular/router"
import { TeamsService } from "@features/team/teams.service"
import { buildPasteCards, sharedTeamPokemon, unlockErrorMessage, unreadablePasteMessage } from "@pages/paste/paste-view"
import { InputComponent } from "@shared/input/input.component"
import { PasteCardComponent } from "@shared/paste-card/paste-card.component"
import { Pokemon } from "@multicalc/model"
import { DeviceDetectorService } from "@app/services/device-detector.service"
import { PasteLockedError, PasteService, WrongPasswordError } from "@app/services/paste.service"
import { SnackbarService } from "@app/services/snackbar.service"
import { FeatureFlagsStore } from "@store/feature-flags-store"
import { decryptTeam, derivePasteKeys, isProtectedPasteStub, ProtectedPasteStub } from "@store/paste/paste-crypto"
import { discardPasteHandoff, savePasteHandoff } from "@store/paste/paste-handoff"
import { PASTE_IMPORT_PARAM } from "@app/routes/paste-import.guard"
import { declaredTera, pasteTeamName, SharedTeam } from "@store/paste/shared-team"
import { uuid } from "@multicalc/utils"

type PasteState = "loading" | "locked" | "ready" | "not-found" | "unavailable" | "unreadable"

@Component({
  selector: "app-paste-page",
  templateUrl: "./paste-page.component.html",
  styleUrl: "./paste-page.component.scss",
  imports: [MatButton, MatIcon, RouterLink, InputComponent, PasteCardComponent, NgTemplateOutlet]
})
export class PastePageComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private pasteService = inject(PasteService)
  private teamsService = inject(TeamsService)
  private featureFlags = inject(FeatureFlagsStore)
  private deviceDetector = inject(DeviceDetectorService)
  private snackBar = inject(SnackbarService)
  private clipboard = inject(Clipboard)
  private title = inject(Title)
  private document = inject(DOCUMENT)

  pasteId = input<string>()
  titleAction = input<TemplateRef<unknown>>()

  state = signal<PasteState>("loading")
  team = signal<SharedTeam | null>(null)
  pokemon = signal<Pokemon[]>([])
  password = signal("")
  unlocking = signal(false)
  unlockError = signal("")
  unreadableMessage = signal("")

  cards = computed(() => buildPasteCards(this.pokemon(), this.team()?.useSpsMode ?? true, declaredTera(this.team()?.showdown ?? "")))
  teamName = computed(() => (this.team() ? pasteTeamName(this.team()!) : ""))
  showTera = computed(() => this.featureFlags.teraType())

  private id = ""
  private stub: ProtectedPasteStub | null = null

  ngOnInit() {
    this.id = this.pasteId() ?? this.route.snapshot.paramMap.get("id") ?? ""
    this.load()
  }

  async load() {
    this.state.set("loading")

    let paste: SharedTeam | ProtectedPasteStub | null

    try {
      paste = await this.pasteService.get(this.id)
    } catch (error) {
      console.error(error)
      this.state.set("unavailable")
      return
    }

    if (!paste) {
      this.state.set("not-found")
      return
    }

    if (isProtectedPasteStub(paste)) {
      this.stub = paste
      this.setTitle("Protected Paste — VGC Multi Calc")
      this.state.set("locked")
      return
    }

    await this.show(paste)
  }

  private async show(team: SharedTeam) {
    try {
      this.pokemon.set(await sharedTeamPokemon(team))
    } catch (error) {
      this.unreadableMessage.set(unreadablePasteMessage(error))
      this.state.set("unreadable")
      return
    }

    this.team.set(team)
    this.setTitle(`${this.teamName()} · Paste — VGC Multi Calc`)
    this.state.set("ready")
  }

  private setTitle(title: string) {
    if (!this.pasteId()) this.title.setTitle(title)
  }

  async unlock() {
    this.unlocking.set(true)
    this.unlockError.set("")

    try {
      const keys = await derivePasteKeys(this.password(), this.stub!.kdf)
      const team = await decryptTeam(keys.encryptionKey, await this.pasteService.unlock(this.id, keys.verifier))

      if (team) {
        await this.show(team)
      } else {
        this.unlockError.set("Could not open the paste. Try again.")
      }
    } catch (error) {
      this.unlockError.set(this.unlockFailure(error))
    } finally {
      this.unlocking.set(false)
    }
  }

  private unlockFailure(error: unknown): string {
    if (error instanceof WrongPasswordError) return unlockErrorMessage(true, error.retryAfter)
    if (error instanceof PasteLockedError) return unlockErrorMessage(false, error.retryAfter)

    console.error(error)

    return "Could not open the paste. Try again."
  }

  copyLink() {
    this.clipboard.copy(this.pasteService.link(this.id))
    this.snackBar.open("Link copied")
  }

  copyShowdown() {
    this.clipboard.copy(this.team()!.showdown)
    this.snackBar.open("Showdown text copied")
  }

  openInCalc() {
    this.importTeam(false)
  }

  openAsOpponents() {
    this.importTeam(true)
  }

  private importTeam(asOpponents: boolean) {
    const team = this.team()!

    if (this.deviceDetector.isDesktop() && this.openInNewTab(team, asOpponents)) return

    this.teamsService.importPasteTeam(this.pokemon(), team, asOpponents)
    this.router.navigate(["/team-vs-many"])
  }

  private openInNewTab(team: SharedTeam, asOpponents: boolean): boolean {
    const id = uuid()

    savePasteHandoff(localStorage, id, { team, asOpponents }, Date.now())

    const url = this.router.serializeUrl(this.router.createUrlTree(["/team-vs-many"], { queryParams: { [PASTE_IMPORT_PARAM]: id } }))
    const calcTab = this.document.defaultView!.open(url, "_blank")

    if (calcTab) {
      calcTab.opener = null
      return true
    }

    discardPasteHandoff(localStorage, id)

    return false
  }
}
