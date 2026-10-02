import { Injector } from "@angular/core"
import { TeamsService } from "@features/team/teams.service"
import { sharedTeamPokemon } from "@pages/paste/paste-view"
import { takePasteHandoff } from "@store/paste/paste-handoff"

export async function importPasteHandoff(injector: Injector, id: string) {
  const handoff = takePasteHandoff(localStorage, id, Date.now())

  if (!handoff) return

  const pokemon = await sharedTeamPokemon(handoff.team).catch(() => null)

  if (pokemon) injector.get(TeamsService).importPasteTeam(pokemon, handoff.team, handoff.asOpponents)
}
