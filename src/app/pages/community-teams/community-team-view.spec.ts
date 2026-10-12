import { CommunityTeamSet, CommunityTeamSpecies, SubmittedTeam, VgcPastesTeam } from "@data/community-teams/community-team-data"
import { calcTeamPokemon, pasteCalcPokemon, teamSpecies, toCommunityTeamView, toSubmittedTeamView } from "@pages/community-teams/community-team-view"
import { Pokemon } from "@multicalc/model"
import { SharedTeam } from "@store/paste/shared-team"

function team(members: CommunityTeamSpecies[]): VgcPastesTeam {
  return {
    id: "MB861",
    description: "Takuma Yamazaki's Worlds 2026 Champion Team",
    player: "Takuma Yamazaki",
    handle: "natsumewato",
    regulation: "M-B",
    event: "Worlds 2026 San Francisco",
    placement: "Champion",
    date: "2026-08-31",
    replicaCode: "A4RBRNN9YE",
    pasteId: "Y0wdctlMvy",
    hasSps: true,
    setsBlock: 0,
    members
  }
}

const INCINEROAR_SET: CommunityTeamSet = {
  ability: "Blaze",
  nature: "Careful",
  sps: { hp: 32, atk: 2, def: 16, spa: 0, spd: 16, spe: 0 },
  moves: ["Fake Out", "Knock Off", "Parting Shot", "Protect"]
}

describe("toCommunityTeamView", () => {
  it("should keep the team summary without its members", () => {
    const view = toCommunityTeamView(team([{ name: "Incineroar", item: "Sitrus Berry" }]), [INCINEROAR_SET])

    expect(view.id).toBe("MB861")
    expect(view.player).toBe("Takuma Yamazaki")
    expect(view.placement).toBe("Champion")
    expect(view.pasteId).toBe("Y0wdctlMvy")
    expect("members" in view).toBe(false)
  })

  it("should build each card from the species of the summary and the set of the paste", () => {
    const [card] = toCommunityTeamView(team([{ name: "Incineroar", item: "Sitrus Berry" }]), [INCINEROAR_SET]).cards

    expect(card.name).toBe("Incineroar")
    expect(card.item).toBe("Sitrus Berry")
    expect(card.ability).toBe("Blaze")
    expect(card.nature).toBe("Careful")
    expect(card.moves.map(move => move.name)).toEqual(["Fake Out", "Knock Off", "Parting Shot", "Protect"])
    expect(card.spread).toBe("32 HP / 2 Atk / 16 Def / 16 SpD")
  })

  it("should show the ability of the paste on the base form of a Mega Evolution", () => {
    const set: CommunityTeamSet = { ability: "Multiscale", nature: "Modest", moves: ["Dragon Pulse", "Heat Wave", "Extreme Speed", "Protect"] }

    const [card] = toCommunityTeamView(team([{ name: "Dragonite-Mega", item: "Dragoninite" }]), [set]).cards

    expect(card.name).toBe("Dragonite")
    expect(card.ability).toBe("Multiscale")
    expect(card.mega!.name).toBe("Dragonite-Mega")
  })

  it("should show no nature and no spread for a set that does not declare them", () => {
    const [card] = toCommunityTeamView(team([{ name: "Garchomp", item: "Choice Scarf" }]), [{ ability: "Rough Skin", moves: ["Earthquake", "Rock Slide"] }]).cards

    expect(card.ability).toBe("Rough Skin")
    expect(card.nature).toBeUndefined()
    expect(card.natureBoost).toBeUndefined()
    expect(card.natureDrop).toBeUndefined()
    expect(card.spread).toBe("")
    expect(card.moves.map(move => move.name)).toEqual(["Earthquake", "Rock Slide"])
  })

  it("should show no ability and no moves for a set that does not declare them", () => {
    const [card] = toCommunityTeamView(team([{ name: "Incineroar" }]), [{ moves: [] }]).cards

    expect(card.ability).toBeUndefined()
    expect(card.moves).toEqual([])
  })

  it("should show only the species and the item for a member without a set", () => {
    const [card] = toCommunityTeamView(team([{ name: "Garchomp", item: "Choice Scarf" }]), []).cards

    expect(card.name).toBe("Garchomp")
    expect(card.item).toBe("Choice Scarf")
    expect(card.ability).toBeUndefined()
    expect(card.nature).toBeUndefined()
    expect(card.spread).toBe("")
    expect(card.moves).toEqual([])
  })

  it("should show no item for a member that holds nothing", () => {
    const [card] = toCommunityTeamView(team([{ name: "Incineroar" }]), [INCINEROAR_SET]).cards

    expect(card.item).toBe("(none)")
    expect(card.itemSprite).toBe("question")
  })
})

describe("calcTeamPokemon", () => {
  it("should build the Pokémon of the team with the sets of the paste", () => {
    const [pokemon] = calcTeamPokemon(team([{ name: "Incineroar", item: "Sitrus Berry" }]), [INCINEROAR_SET])

    expect(pokemon.name).toBe("Incineroar")
    expect(pokemon.item).toBe("Sitrus Berry")
    expect(pokemon.ability.name).toBe("Blaze")
    expect(pokemon.nature).toBe("Careful")
    expect(pokemon.sps).toEqual({ hp: 32, atk: 2, def: 16, spa: 0, spd: 16, spe: 0 })
    expect(pokemon.moveSet.moves.map(move => move.name)).toEqual(["Fake Out", "Knock Off", "Parting Shot", "Protect"])
  })

  it("should import a Mega Evolution as its base form holding the Mega Stone", () => {
    const set: CommunityTeamSet = { ability: "Multiscale", nature: "Modest", moves: ["Dragon Pulse"] }

    const [pokemon] = calcTeamPokemon(team([{ name: "Dragonite-Mega", item: "Dragoninite" }]), [set])

    expect(pokemon.name).toBe("Dragonite")
    expect(pokemon.item).toBe("Dragoninite")
    expect(pokemon.ability.name).toBe("Multiscale")
  })
})

const SUBMITTED: SubmittedTeam = {
  id: "uZ5ATN1fRy",
  pasteId: "uZ5ATN1fRy",
  description: "Rain",
  player: "Eric Rios",
  regulation: "M-C",
  date: "2026-10-12T15:22:34.523Z",
  hasSps: true,
  members: [{ name: "Pelipper", item: "Damp Rock" }, { name: "Archaludon" }],
  source: "community"
}

const PASTE: SharedTeam = {
  kind: "team",
  version: 1,
  useSpsMode: true,
  showdown: "Pelipper @ Damp Rock\nAbility: Drizzle\nEVs: 2 HP / 32 SpA\nModest Nature\n- Hurricane\n\nDragonite @ Dragoninite\nAbility: Multiscale\n- Extreme Speed\n\nArchaludon\nAbility: Stamina\n- Electro Shot"
}

describe("toSubmittedTeamView", () => {
  it("should build the cards of a submitted team from its paste", async () => {
    const view = await toSubmittedTeamView(SUBMITTED, PASTE)

    expect(view.id).toBe("uZ5ATN1fRy")
    expect(view.source).toBe("community")
    expect("members" in view).toBe(false)
    expect(view.cards.map(card => card.name)).toEqual(["Pelipper", "Dragonite", "Archaludon"])
    expect(view.cards[0].ability).toBe("Drizzle")
    expect(view.cards[0].nature).toBe("Modest")
    expect(view.cards[0].spread).toBe("2\u00a0HP\u00a0/ 32\u00a0SpA")
    expect(view.cards[1].mega!.name).toBe("Dragonite-Mega")
  })

  it("should show a submitted team without cards when its paste is gone", async () => {
    const view = await toSubmittedTeamView(SUBMITTED, null)

    expect(view.cards).toEqual([])
    expect(view.description).toBe("Rain")
  })
})

describe("pasteCalcPokemon", () => {
  it("should build the Pokémon of a paste with Mega Evolutions in their base form", async () => {
    const pokemon = await pasteCalcPokemon(PASTE)

    expect(pokemon.map(member => member.name)).toEqual(["Pelipper", "Dragonite", "Archaludon"])
    expect(pokemon[0].ability.name).toBe("Drizzle")
    expect(pokemon[1].item).toBe("Dragoninite")
  })
})

describe("teamSpecies", () => {
  it("should keep the species and the item of each Pokémon, leaving out a missing item", () => {
    const pokemon = [new Pokemon("Pelipper", { item: "Damp Rock" }), new Pokemon("Archaludon", { item: "" })]

    expect(teamSpecies(pokemon)).toEqual([{ name: "Pelipper", item: "Damp Rock" }, { name: "Archaludon" }])
  })
})
