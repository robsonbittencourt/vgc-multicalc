import { Injectable } from '@angular/core';
import axios from 'axios';
import { Koffing } from 'koffing';
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
      const evs = { hp: poke.evs.hp, atk: poke.evs.atk, def: poke.evs.def, spa: poke.evs.spa, spd: poke.evs.spd, spe: poke.evs.spe }
      return new Pokemon(poke.name, poke.nature, poke.item, poke.ability, poke.teraType, false, evs)
    })
  }
        
}
