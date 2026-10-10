import { CommunityTeamMember, CommunityTeamSet, CommunityTeamSummary } from "@data/community-teams/community-team-data"
import { buildPasteCards } from "@pages/paste/paste-view"
import { PasteCard } from "@shared/paste-card/paste-card"
import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { baseForm } from "@store/paste/shared-team"

export type CommunityTeamView = Omit<CommunityTeamSummary, "members"> & {
  cards: PasteCard[]
}

const NO_SPS = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

export function toCommunityTeamView(team: CommunityTeamSummary, sets: CommunityTeamSet[]): CommunityTeamView {
  const members: CommunityTeamMember[] = team.members.map((species, index) => ({ ...species, ...sets[index] }))
  const pokemon = members.map(memberPokemon)
  const { members: _members, ...summary } = team

  return {
    ...summary,
    cards: buildPasteCards(
      pokemon,
      true,
      pokemon.map(() => false)
    ).map((card, index) => declaredOnly(card, members[index]))
  }
}

export function calcTeamPokemon(team: CommunityTeamSummary, sets: CommunityTeamSet[]): Pokemon[] {
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
