import { CommunityTeamMember, CommunityTeamSet, CommunityTeamSpecies, CommunityTeamSummary, SubmittedTeam, VgcPastesTeam } from "@data/community-teams/community-team-data"
import { buildPasteCards, sharedTeamPokemon } from "@pages/paste/paste-view"
import { PasteCard } from "@shared/paste-card/paste-card"
import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { baseForm, declaredTera, SharedTeam } from "@store/paste/shared-team"

export type CommunityTeamView = Omit<CommunityTeamSummary, "members"> & {
  cards: PasteCard[]
}

const NO_SPS = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
const NO_ITEM = "(none)"

export function toCommunityTeamView(team: VgcPastesTeam, sets: CommunityTeamSet[]): CommunityTeamView {
  const members: CommunityTeamMember[] = team.members.map((species, index) => ({ ...species, ...sets[index] }))
  const pokemon = members.map(memberPokemon)
  const summary = withoutMembers(team)

  return {
    ...summary,
    cards: buildPasteCards(
      pokemon,
      true,
      pokemon.map(() => false)
    ).map((card, index) => declaredOnly(card, members[index]))
  }
}

function withoutMembers<T extends CommunityTeamSummary>(team: T): Omit<T, "members"> {
  return Object.fromEntries(Object.entries(team).filter(([key]) => key !== "members")) as Omit<T, "members">
}

export async function toSubmittedTeamView(team: SubmittedTeam, paste: SharedTeam | null): Promise<CommunityTeamView> {
  const summary = withoutMembers(team)

  if (!paste) return { ...summary, cards: [] }

  return { ...summary, cards: buildPasteCards(await sharedTeamPokemon(paste), paste.useSpsMode, declaredTera(paste.showdown)) }
}

export async function pasteCalcPokemon(paste: SharedTeam): Promise<Pokemon[]> {
  return (await sharedTeamPokemon(paste)).map(baseForm)
}

export function teamSpecies(pokemon: Pokemon[]): CommunityTeamSpecies[] {
  return pokemon.map(member => (member.item === NO_ITEM ? { name: member.name } : { name: member.name, item: member.item }))
}

export function calcTeamPokemon(team: VgcPastesTeam, sets: CommunityTeamSet[]): Pokemon[] {
  return team.members.map((species, index) => baseForm(memberPokemon({ ...species, ...sets[index] })))
}

function memberPokemon(member: CommunityTeamMember): Pokemon {
  const moves = member.moves ?? []

  return new Pokemon(member.name, {
    item: member.item ?? "",
    ...(member.ability ? { ability: new Ability(member.ability), baseFormAbility: member.ability } : {}),
    nature: member.nature,
    sps: member.sps ?? NO_SPS,
    moveSet: new MoveSet(new Move(moves[0] ?? ""), new Move(moves[1] ?? ""), new Move(moves[2] ?? ""), new Move(moves[3] ?? ""))
  })
}

function declaredOnly(card: PasteCard, member: CommunityTeamMember): PasteCard {
  return {
    ...card,
    ...(member.ability ? {} : { ability: undefined }),
    ...(member.nature ? {} : { nature: undefined, natureBoost: undefined, natureDrop: undefined })
  }
}
