import { PokemonBuild } from "./pokemon-build"

export class OpponentPokemon {
  private _element: any

  constructor(element: any) {
    this._element = element
  }

  terastalyze(): OpponentPokemon {
    this._element.find(`[data-cy="terastal-button-opponent"]`).click({ force: true })
    return this
  }

  doesNotCauseAnyDamage() {
    this.contains(`Damage: 0 - 0%`)
    this.contains(`Does not cause any damage`)
  }

  damageIs(min: number, max: number): OpponentPokemon {
    this.contains(`Damage: ${min} - ${max}%`)
    return this
  }

  causeOHKO(): OpponentPokemon {
    this.contains("guaranteed OHKO")
    return this
  }

  cause2HKO(): OpponentPokemon {
    this.contains("guaranteed 2HKO")
    return this
  }

  cause3HKO(): OpponentPokemon {
    this.contains("guaranteed 3HKO")
    return this
  }

  cause4HKO(): OpponentPokemon {
    this.contains("guaranteed 4HKO")
    return this
  }

  afterLeftoversRecovery(): OpponentPokemon {
    this.contains("after Leftovers recovery")
    return this
  }

  haveChanceOfToCauseOHKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to OHKO`)
    return this
  }

  haveChanceOfToCause2HKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to 2HKO`)
    return this
  }

  haveChanceOfToCause3HKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to 3HKO`)
    return this
  }

  haveChanceOfToCause4HKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to 4HKO`)
    return this
  }

  possible5HKO(): OpponentPokemon {
    this.contains("possible 5HKO")
    return this
  }

  possible6HKO(): OpponentPokemon {
    this.contains("possible 6HKO")
    return this
  }

  possible7HKO(): OpponentPokemon {
    this.contains("possible 7HKO")
    return this
  }

  possible8HKO(): OpponentPokemon {
    this.contains("possible 8HKO")
    return this
  }

  possible9HKO(): OpponentPokemon {
    this.contains("possible 9HKO")
    return this
  }

  approximately3HKO(): OpponentPokemon {
    this.contains(`approx. 3HKO`)
    return this
  }

  edit(): PokemonBuild {
    this._element.click({ force: true })
    return new PokemonBuild("your-team")
  }

  delete() {
    this._element.find(`[data-cy="delete-opponent-pokemon"]`).click({ force: true })
  }

  private contains(text: string) {
    this._element.parent().contains(text)
  }
}
