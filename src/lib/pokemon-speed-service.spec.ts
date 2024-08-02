import { MoveSet } from './moveset';
import { Pokemon } from './pokemon';
import { PokemonSpeedService } from './pokemon-speed-service';

describe('PokemonSpeedService', () => {
  let service: PokemonSpeedService

  beforeEach(() => {
    service = new PokemonSpeedService()
  })

  it('should return a ordered list with garanteed slower Pokémon', () => {
    const pokemon = new Pokemon('Raging Bolt', "Modest", "Clear Amulet", "Protosynthesis", "Fairy", false, { hp: 36, atk: 220, spe: 100 }, new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect"))
    
    const slowerPokemon = service.findGarantedSlowestPokemon(pokemon)

    expect(slowerPokemon.length).toEqual(1)
    expect(slowerPokemon[0].getName()).toEqual("Amoonguss")
  })

  it('should return a ordered list with garanteed faster Pokémon', () => {
    const pokemon = new Pokemon('Raging Bolt', "Modest", "Clear Amulet", "Protosynthesis", "Fairy", false, { hp: 36, atk: 220, spe: 100 }, new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect"))
    
    const fasterPokemon = service.findFasterPokemon(pokemon)

    expect(fasterPokemon.length).toEqual(2)
    expect(fasterPokemon[0].getName()).toEqual("Flutter Mane")
    expect(fasterPokemon[1].getName()).toEqual("Calyrex-Shadow")
  })

  it('should return only Pokémon in speed range ordered', () => {
    const pokemon = new Pokemon('Raging Bolt', "Modest", "Clear Amulet", "Protosynthesis", "Fairy", false, { hp: 36, atk: 220, spe: 100 }, new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect"))

    const inRange = service.orderedPokemon(pokemon)

    //melhor esse tipo de retorno. Como evidenciar o "tipo" da velocidade? Min, max, meta, atual

    expect(inRange.length).toEqual(13)
    expect(inRange[0].pokemonSpeed.getName()).toEqual("Ursaluna-Bloodmoon")
    expect(inRange[1].pokemonSpeed.getName()).toEqual("Ursaluna-Bloodmoon")
    expect(inRange[2].pokemonSpeed.getName()).toEqual("Incineroar")
    expect(inRange[3].pokemonSpeed.getName()).toEqual("Rillaboom")
    expect(inRange[4].pokemonSpeed.getName()).toEqual("Raging Bolt")
    expect(inRange[5].pokemonSpeed.getName()).toEqual("Rillaboom")
    expect(inRange[6].pokemonSpeed.getName()).toEqual("Ursaluna-Bloodmoon")
    expect(inRange[7].pokemonSpeed.getName()).toEqual("Urshifu-Rapid-Strike")
    expect(inRange[8].pokemonSpeed.getName()).toEqual("Incineroar")
    expect(inRange[9].pokemonSpeed.getName()).toEqual("Incineroar")
    expect(inRange[10].pokemonSpeed.getName()).toEqual("Rillaboom")
    expect(inRange[11].pokemonSpeed.getName()).toEqual("Urshifu-Rapid-Strike")
    expect(inRange[12].pokemonSpeed.getName()).toEqual("Urshifu-Rapid-Strike")
  })
});
