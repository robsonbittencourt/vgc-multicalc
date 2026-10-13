import { Component, computed, inject, input, output, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"
import { InputComponent } from "@shared/input/input.component"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { SubmittedTeam } from "@data/community-teams/community-team-data"
import { normalizeHandle, normalizeReplicaCode, PLACEMENT_SUGGESTIONS, submissionError, submittedTeam } from "@multicalc/community-teams"
import { pasteCalcPokemon, teamSpecies } from "@pages/community-teams/community-team-view"
import { CommunityTeamsService, TeamSubmissionRejectedError } from "@app/services/community-teams.service"
import { TooManyPastesError } from "@app/services/paste.service"
import { CalcStore } from "@store/calc-store"
import { buildSharedTeamFromText, InvalidPasteTextError } from "@store/paste/paste-from-text"

const SP_EXAMPLE = "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot"
const EV_EXAMPLE = SP_EXAMPLE.replace("32 HP / 2 Def / 32 SpD", "252 HP / 12 Def / 252 SpD")

@Component({
  selector: "app-community-team-submit",
  imports: [MatButton, MatIcon, InputComponent, InputAutocompleteComponent, SegmentedControlComponent, WidgetComponent],
  templateUrl: "./community-team-submit.component.html",
  styleUrl: "./community-team-submit.component.scss"
})
export class CommunityTeamSubmitComponent {
  private calcStore = inject(CalcStore)
  private communityTeams = inject(CommunityTeamsService)

  regulation = input.required<string>()

  events = input<string[]>([])

  submitted = output<SubmittedTeam>()

  readonly pointsModeOptions: SegmentedOption<boolean>[] = [
    { value: true, label: "SP", dataCy: "submit-team-points-mode-sp" },
    { value: false, label: "EV", dataCy: "submit-team-points-mode-ev" }
  ]

  readonly placementOptions = PLACEMENT_SUGGESTIONS

  name = signal("")
  player = signal("")
  handle = signal("")
  event = signal("")
  replicaCode = signal("")
  placement = signal("")
  text = signal("")
  useSpsMode = signal(this.calcStore.useSpsMode())
  submitting = signal(false)
  error = signal("")

  placeholder = computed(() => (this.useSpsMode() ? SP_EXAMPLE : EV_EXAMPLE))
  canSubmit = computed(() => !this.submitting() && this.text().trim() !== "")

  updateText(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value)
  }

  async submit() {
    const fieldsError = submissionError({ name: this.name(), player: this.player(), handle: this.handle(), event: this.event(), replicaCode: this.replicaCode(), placement: this.placement() })

    if (fieldsError) {
      this.error.set(fieldsError)
      return
    }

    this.submitting.set(true)
    this.error.set("")

    try {
      const team = await buildSharedTeamFromText(this.name(), this.text(), { useSpsMode: this.useSpsMode(), includePoints: true, defaultItems: false })
      const name = team.name!
      const player = this.player().trim()
      const handle = normalizeHandle(this.handle())
      const event = this.event().trim()
      const replicaCode = normalizeReplicaCode(this.replicaCode())
      const placement = this.placement().trim()
      const pasteId = await this.communityTeams.submit({ ...team, name, player, ...(handle ? { handle } : {}), ...(event ? { event } : {}), ...(placement ? { placement } : {}), ...(replicaCode ? { replicaCode } : {}) })
      const members = teamSpecies(await pasteCalcPokemon(team))

      this.submitted.emit(submittedTeam({ pasteId, regulation: this.regulation(), date: new Date().toISOString(), name, player, handle, event, placement, replicaCode, showdown: team.showdown, members }))
    } catch (error) {
      this.error.set(this.failureMessage(error))
    } finally {
      this.submitting.set(false)
    }
  }

  private failureMessage(error: unknown): string {
    if (error instanceof InvalidPasteTextError) return error.message
    if (error instanceof TeamSubmissionRejectedError) return `The team was not accepted: ${error.reason}.`
    if (error instanceof TooManyPastesError) return "Too many teams are being submitted right now. Try again in a minute."

    console.error(error)

    return "Could not submit the team. Try again."
  }
}
