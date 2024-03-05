import { Injectable } from '@angular/core';
import axios from 'axios';
import { Koffing } from 'koffing';
import { MoveSet } from './moveset';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokePasteParserService {

  async parseFromPokePaste(pokePasteLink: string): Promise<Pokemon[]> {
    const res = await axios.get(`${pokePasteLink}/raw`)
    const parsedTeam = Koffing.parse(res.data)
    const pokemonList = JSON.parse(parsedTeam.toJson()).teams[0].pokemon

    return pokemonList.map((poke: any) => {
      const evs = { hp: poke.evs.hp ?? 0, atk: poke.evs.atk ?? 0, def: poke.evs.def ?? 0, spa: poke.evs.spa ?? 0, spd: poke.evs.spd ?? 0, spe: poke.evs.spe ?? 0 }
      const moveSet = new MoveSet(poke.moves[0], poke.moves[1], poke.moves[2], poke.moves[3])
      
      return new Pokemon(poke.name, poke.nature, poke.item, poke.ability, poke.teraType, false, evs, moveSet)
    })
  }
        
}
