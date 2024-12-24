import { Ability } from "@lib/model/ability"
import { Pokemon } from "@lib/model/pokemon"

export function speedMeta(regulation: string): Pokemon[] {
  if (regulation == "Reg G") {
    return regG()
  } else {
    return regH()
  }
}

export function regG(): Pokemon[] {
  return [
    new Pokemon("Urshifu-Rapid-Strike", { ability: new Ability("Unseen Fist"), nature: "Adamant", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Rillaboom", { ability: new Ability("Grassy Surge"), nature: "Adamant", item: "Assault Vest", evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 } }),
    new Pokemon("Raging Bolt", { ability: new Ability("Protosynthesis"), nature: "Modest", item: "Booster Energy", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Incineroar", { ability: new Ability("Intimidate"), nature: "Impish", item: "Safety Goggles", evs: { hp: 252, atk: 4, def: 188, spa: 0, spd: 60, spe: 4 } }),
    new Pokemon("Iron Hands", { ability: new Ability("Quark Drive"), nature: "Adamant", item: "Assault Vest", evs: { hp: 52, atk: 76, def: 12, spa: 0, spd: 252, spe: 116 } }),
    new Pokemon("Calyrex-Shadow", { ability: new Ability("As One (Spectrier)"), nature: "Timid", item: "Life Orb", evs: { hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Chi-Yu", { ability: new Ability("Beads of Ruin"), nature: "Modest", item: "Choice Scarf", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Farigiraf", { ability: new Ability("Armor Tail"), nature: "Bold", item: "Electric Seed", evs: { hp: 252, atk: 0, def: 164, spa: 0, spd: 92, spe: 0 } }),
    new Pokemon("Calyrex-Ice", { ability: new Ability("As One (Glastrier)"), nature: "Brave", item: "Clear Amulet", evs: { hp: 244, atk: 164, def: 0, spa: 0, spd: 100, spe: 0 } }),
    new Pokemon("Flutter Mane", { ability: new Ability("Protosynthesis"), nature: "Timid", item: "Booster Energy", evs: { hp: 228, atk: 0, def: 108, spa: 20, spd: 12, spe: 140 } }),
    new Pokemon("Ogerpon-Hearthflame", { ability: new Ability("Mold Breaker"), nature: "Adamant", item: "Hearthflame Mask", evs: { hp: 236, atk: 84, def: 4, spa: 0, spd: 4, spe: 180 } }),
    new Pokemon("Whimsicott", { ability: new Ability("Prankster"), nature: "Timid", item: "Covert Cloak", evs: { hp: 156, atk: 0, def: 0, spa: 0, spd: 204, spe: 148 } }),
    new Pokemon("Miraidon", { ability: new Ability("Hadron Engine"), nature: "Timid", item: "Choice Specs", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Amoonguss", { ability: new Ability("Regenerator"), nature: "Calm", item: "Rocky Helmet", evs: { hp: 236, atk: 0, def: 196, spa: 0, spd: 76, spe: 0 } }),
    new Pokemon("Ogerpon-Cornerstone", { ability: new Ability("Sturdy"), nature: "Jolly", item: "Cornerstone Mask", evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Clefairy", { ability: new Ability("Friend Guard"), nature: "Sassy", item: "Eviolite", evs: { hp: 252, atk: 0, def: 188, spa: 0, spd: 68, spe: 0 } }),
    new Pokemon("Tornadus", { ability: new Ability("Prankster"), nature: "Timid", item: "Covert Cloak", evs: { hp: 220, atk: 0, def: 20, spa: 4, spd: 12, spe: 252 } }),
    new Pokemon("Terapagos", { ability: new Ability("Tera Shift"), nature: "Bold", item: "Leftovers", evs: { hp: 172, atk: 0, def: 76, spa: 60, spd: 4, spe: 196 } }),
    new Pokemon("Chien-Pao", { ability: new Ability("Sword of Ruin"), nature: "Jolly", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Urshifu", { ability: new Ability("Unseen Fist"), nature: "Adamant", item: "Focus Sash", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Indeedee-F", { ability: new Ability("Psychic Surge"), nature: "Bold", item: "Rocky Helmet", evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 } }),
    new Pokemon("Pelipper", { ability: new Ability("Drizzle"), nature: "Modest", item: "Safety Goggles", evs: { hp: 252, atk: 0, def: 20, spa: 36, spd: 148, spe: 52 } }),
    new Pokemon("Zamazenta-Crowned", { ability: new Ability("Dauntless Shield"), nature: "Impish", item: "Rusted Shield", evs: { hp: 156, atk: 0, def: 156, spa: 0, spd: 0, spe: 196 } }),
    new Pokemon("Dondozo", { ability: new Ability("Unaware"), nature: "Impish", item: "Leftovers", evs: { hp: 4, atk: 4, def: 116, spa: 0, spd: 212, spe: 172 } }),
    new Pokemon("Tatsugiri", { ability: new Ability("Commander"), nature: "Modest", item: "Focus Sash", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Weezing-Galar", { ability: new Ability("Neutralizing Gas"), nature: "Bold", item: "Covert Cloak", evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 236, spe: 20 } }),
    new Pokemon("Grimmsnarl", { ability: new Ability("Prankster"), nature: "Careful", item: "Light Clay", evs: { hp: 228, atk: 4, def: 204, spa: 0, spd: 68, spe: 4 } }),
    new Pokemon("Koraidon", { ability: new Ability("Orichalcum Pulse"), nature: "Adamant", item: "Clear Amulet", evs: { hp: 252, atk: 196, def: 4, spa: 0, spd: 28, spe: 28 } }),
    new Pokemon("Ditto", { ability: new Ability("Imposter"), nature: "Jolly", item: "Choice Scarf", evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Landorus", { ability: new Ability("Sheer Force"), nature: "Modest", item: "Choice Scarf", evs: { hp: 4, atk: 0, def: 4, spa: 244, spd: 4, spe: 252 } }),
    new Pokemon("Ursaluna-Bloodmoon", { ability: new Ability("Mind's Eye"), nature: "Modest", item: "Life Orb", evs: { hp: 252, atk: 0, def: 4, spa: 252, spd: 0, spe: 0 } }),
    new Pokemon("Ursaluna", { ability: new Ability("Guts"), nature: "Brave", item: "Flame Orb", evs: { hp: 140, atk: 236, def: 0, spa: 0, spd: 132, spe: 0 } }),
    new Pokemon("Groudon", { ability: new Ability("Drought"), nature: "Adamant", item: "Clear Amulet", evs: { hp: 164, atk: 156, def: 4, spa: 0, spd: 4, spe: 180 } }),
    new Pokemon("Volcarona", { ability: new Ability("Flame Body"), nature: "Timid", item: "Leftovers", evs: { hp: 252, atk: 0, def: 132, spa: 0, spd: 0, spe: 124 } }),
    new Pokemon("Kyogre", { ability: new Ability("Drizzle"), nature: "Modest", item: "Choice Scarf", evs: { hp: 132, atk: 0, def: 140, spa: 68, spd: 12, spe: 156 } }),
    new Pokemon("Smeargle", { ability: new Ability("Moody"), nature: "Jolly", item: "Focus Sash", evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Ogerpon", { ability: new Ability("Defiant"), nature: "Adamant", item: "Loaded Dice", evs: { hp: 132, atk: 156, def: 4, spa: 0, spd: 4, spe: 212 } }),
    new Pokemon("Entei", { ability: new Ability("Inner Focus"), nature: "Adamant", item: "Choice Band", evs: { hp: 12, atk: 244, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Iron Crown", { ability: new Ability("Quark Drive"), nature: "Timid", item: "Life Orb", evs: { hp: 52, atk: 0, def: 20, spa: 252, spd: 4, spe: 180 } }),
    new Pokemon("Ogerpon-Wellspring", { ability: new Ability("Water Absorb"), nature: "Impish", item: "Wellspring Mask", evs: { hp: 252, atk: 4, def: 220, spa: 0, spd: 12, spe: 20 } }),
    new Pokemon("Mienshao", { ability: new Ability("Inner Focus"), nature: "Jolly", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Iron Jugulis", { ability: new Ability("Quark Drive"), nature: "Timid", item: "Booster Energy", evs: { hp: 92, atk: 0, def: 132, spa: 52, spd: 4, spe: 228 } }),
    new Pokemon("Latios", { ability: new Ability("Levitate"), nature: "Timid", item: "Life Orb", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Tyranitar", { ability: new Ability("Sand Stream"), nature: "Adamant", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Maushold", { ability: new Ability("Friend Guard"), nature: "Impish", item: "Rocky Helmet", evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 } }),
    new Pokemon("Iron Treads", { ability: new Ability("Quark Drive"), nature: "Jolly", item: "Choice Band", evs: { hp: 12, atk: 252, def: 4, spa: 0, spd: 20, spe: 220 } }),
    new Pokemon("Porygon2", { ability: new Ability("Download"), nature: "Sassy", item: "Eviolite", evs: { hp: 252, atk: 0, def: 140, spa: 0, spd: 116, spe: 0 } }),
    new Pokemon("Annihilape", { ability: new Ability("Defiant"), nature: "Jolly", item: "Choice Scarf", evs: { hp: 252, atk: 4, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Venusaur", { ability: new Ability("Chlorophyll"), nature: "Modest", item: "Covert Cloak", evs: { hp: 188, atk: 0, def: 4, spa: 76, spd: 4, spe: 236 } }),
    new Pokemon("Gholdengo", { ability: new Ability("Good as Gold"), nature: "Modest", item: "Grassy Seed", evs: { hp: 244, atk: 0, def: 12, spa: 12, spd: 20, spe: 220 } }),
    new Pokemon("Scream Tail", { ability: new Ability("Protosynthesis"), nature: "Timid", item: "Booster Energy", evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Kingambit", { ability: new Ability("Defiant"), nature: "Adamant", item: "Lum Berry", evs: { hp: 252, atk: 100, def: 4, spa: 0, spd: 148, spe: 4 } }),
    new Pokemon("Lunala", { ability: new Ability("Shadow Shield"), nature: "Modest", item: "Power Herb", evs: { hp: 220, atk: 0, def: 12, spa: 180, spd: 4, spe: 92 } }),
    new Pokemon("Roaring Moon", { ability: new Ability("Protosynthesis"), nature: "Jolly", item: "Booster Energy", evs: { hp: 28, atk: 220, def: 4, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Regidrago", { ability: new Ability("Dragon's Maw"), nature: "Modest", item: "Life Orb", evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 68, spe: 188 } }),
    new Pokemon("Hitmontop", { ability: new Ability("Intimidate"), nature: "Impish", item: "Rocky Helmet", evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 } }),
    new Pokemon("Zacian-Crowned", { ability: new Ability("Intrepid Sword"), nature: "Jolly", item: "Rusted Sword", evs: { hp: 76, atk: 252, def: 0, spa: 0, spd: 0, spe: 180 } }),
    new Pokemon("Okidogi", { ability: new Ability("Guard Dog"), nature: "Adamant", item: "Assault Vest", evs: { hp: 124, atk: 252, def: 4, spa: 0, spd: 12, spe: 116 } }),
    new Pokemon("Tsareena", { ability: new Ability("Queenly Majesty"), nature: "Adamant", item: "Wide Lens", evs: { hp: 36, atk: 236, def: 4, spa: 0, spd: 4, spe: 228 } }),
    new Pokemon("Talonflame", { ability: new Ability("Gale Wings"), nature: "Adamant", item: "Life Orb", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Jumpluff", { ability: new Ability("Chlorophyll"), nature: "Timid", item: "Covert Cloak", evs: { hp: 252, atk: 0, def: 4, spa: 36, spd: 84, spe: 108 } }),
    new Pokemon("Torkoal", { ability: new Ability("Drought"), nature: "Quiet", item: "Choice Specs", evs: { hp: 252, atk: 0, def: 4, spa: 252, spd: 0, spe: 0 } }),
    new Pokemon("Dragonite", { ability: new Ability("Inner Focus"), nature: "Adamant", item: "Choice Band", evs: { hp: 156, atk: 252, def: 4, spa: 0, spd: 4, spe: 92 } }),
    new Pokemon("Moltres-Galar", { ability: new Ability("Berserk"), nature: "Calm", item: "Safety Goggles", evs: { hp: 244, atk: 0, def: 76, spa: 4, spd: 36, spe: 148 } })
  ]
}

export function regH(): Pokemon[] {
  return [
    new Pokemon("Sneasler", { ability: new Ability("Unburden"), nature: "Jolly", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Gholdengo", { ability: new Ability("Good as Gold"), nature: "Timid", item: "Choice Scarf", evs: { hp: 132, atk: 0, def: 4, spa: 116, spd: 4, spe: 252 } }),
    new Pokemon("Incineroar", { ability: new Ability("Intimidate"), nature: "Jolly", item: "Safety Goggles", evs: { hp: 244, atk: 4, def: 4, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Dragonite", { ability: new Ability("Multiscale"), nature: "Adamant", item: "Loaded Dice", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Rillaboom", { ability: new Ability("Grassy Surge"), nature: "Adamant", item: "Assault Vest", evs: { hp: 196, atk: 196, def: 4, spa: 0, spd: 12, spe: 100 } }),
    new Pokemon("Ursaluna-Bloodmoon", { ability: new Ability("Mind's Eye"), nature: "Modest", item: "Life Orb", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Archaludon", { ability: new Ability("Stamina"), nature: "Timid", item: "Assault Vest", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Electabuzz", { ability: new Ability("Vital Spirit"), nature: "Bold", item: "Eviolite", evs: { hp: 228, atk: 0, def: 212, spa: 4, spd: 4, spe: 60 } }),
    new Pokemon("Ursaluna", { ability: new Ability("Guts"), nature: "Brave", item: "Flame Orb", evs: { hp: 228, atk: 204, def: 0, spa: 0, spd: 76, spe: 0 } }),
    new Pokemon("Amoonguss", { ability: new Ability("Regenerator"), nature: "Bold", item: "Sitrus Berry", evs: { hp: 252, atk: 0, def: 156, spa: 0, spd: 100, spe: 0 } }),
    new Pokemon("Pelipper", { ability: new Ability("Drizzle"), nature: "Modest", item: "Choice Scarf", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Kingambit", { ability: new Ability("Defiant"), nature: "Adamant", item: "Black Glasses", evs: { hp: 156, atk: 196, def: 4, spa: 0, spd: 4, spe: 148 } }),
    new Pokemon("Annihilape", { ability: new Ability("Defiant"), nature: "Jolly", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Volcarona", { ability: new Ability("Flame Body"), nature: "Modest", item: "Covert Cloak", evs: { hp: 252, atk: 0, def: 116, spa: 36, spd: 4, spe: 100 } }),
    new Pokemon("Basculegion", { ability: new Ability("Swift Swim"), nature: "Adamant", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Talonflame", { ability: new Ability("Gale Wings"), nature: "Jolly", item: "Covert Cloak", evs: { hp: 20, atk: 220, def: 4, spa: 0, spd: 12, spe: 252 } }),
    new Pokemon("Indeedee", { ability: new Ability("Psychic Surge"), nature: "Timid", item: "Choice Scarf", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Porygon2", { ability: new Ability("Download"), nature: "Quiet", item: "Eviolite", evs: { hp: 252, atk: 4, def: 124, spa: 92, spd: 36, spe: 0 } }),
    new Pokemon("Dondozo", { ability: new Ability("Unaware"), nature: "Jolly", item: "Leftovers", evs: { hp: 4, atk: 76, def: 4, spa: 0, spd: 172, spe: 252 } }),
    new Pokemon("Primarina", { ability: new Ability("Liquid Voice"), nature: "Modest", item: "Throat Spray", evs: { hp: 252, atk: 0, def: 60, spa: 108, spd: 4, spe: 84 } }),
    new Pokemon("Ninetales-Alola", { ability: new Ability("Snow Warning"), nature: "Timid", item: "Covert Cloak", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Torkoal", { ability: new Ability("Drought"), nature: "Quiet", item: "Charcoal", evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 } }),
    new Pokemon("Garchomp", { ability: new Ability("Rough Skin"), nature: "Jolly", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Indeedee-F", { ability: new Ability("Psychic Surge"), nature: "Relaxed", item: "Rocky Helmet", evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 } }),
    new Pokemon("Sinistcha", { ability: new Ability("Hospitality"), nature: "Calm", item: "Sitrus Berry", evs: { hp: 252, atk: 0, def: 68, spa: 4, spd: 180, spe: 0 } }),
    new Pokemon("Tatsugiri", { ability: new Ability("Commander"), nature: "Modest", item: "Choice Scarf", evs: { hp: 124, atk: 0, def: 228, spa: 28, spd: 4, spe: 124 } }),
    new Pokemon("Dragapult", { ability: new Ability("Clear Body"), nature: "Adamant", item: "Choice Band", evs: { hp: 4, atk: 244, def: 4, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Maushold", { ability: new Ability("Friend Guard"), nature: "Jolly", item: "Wide Lens", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Kommo-o", { ability: new Ability("Overcoat"), nature: "Modest", item: "Throat Spray", evs: { hp: 12, atk: 0, def: 4, spa: 236, spd: 4, spe: 252 } }),
    new Pokemon("Hatterene", { ability: new Ability("Magic Bounce"), nature: "Quiet", item: "Life Orb", evs: { hp: 212, atk: 0, def: 0, spa: 252, spd: 44, spe: 0 } }),
    new Pokemon("Tyranitar", { ability: new Ability("Sand Stream"), nature: "Adamant", item: "Assault Vest", evs: { hp: 148, atk: 204, def: 4, spa: 0, spd: 12, spe: 140 } }),
    new Pokemon("Lilligant-Hisui", { ability: new Ability("Chlorophyll"), nature: "Jolly", item: "Focus Sash", evs: { hp: 4, atk: 244, def: 4, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Magmar", { ability: new Ability("Vital Spirit"), nature: "Bold", item: "Eviolite", evs: { hp: 252, atk: 0, def: 244, spa: 0, spd: 0, spe: 12 } }),
    new Pokemon("Glimmora", { ability: new Ability("Toxic Debris"), nature: "Modest", item: "Power Herb", evs: { hp: 20, atk: 0, def: 36, spa: 236, spd: 4, spe: 212 } }),
    new Pokemon("Farigiraf", { ability: new Ability("Armor Tail"), nature: "Quiet", item: "Throat Spray", evs: { hp: 132, atk: 0, def: 28, spa: 156, spd: 188, spe: 0 } }),
    new Pokemon("Corviknight", { ability: new Ability("Mirror Armor"), nature: "Careful", item: "Covert Cloak", evs: { hp: 244, atk: 76, def: 4, spa: 0, spd: 44, spe: 140 } }),
    new Pokemon("Gallade", { ability: new Ability("Sharpness"), nature: "Brave", item: "Clear Amulet", evs: { hp: 252, atk: 252, def: 4, spa: 0, spd: 0, spe: 0 } }),
    new Pokemon("Vivillon", { ability: new Ability("Compound Eyes"), nature: "Timid", item: "Focus Sash", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Dusclops", { ability: new Ability("Pressure"), nature: "Sassy", item: "Eviolite", evs: { hp: 252, atk: 0, def: 156, spa: 0, spd: 100, spe: 0 } }),
    new Pokemon("Kilowattrel", { ability: new Ability("Competitive"), nature: "Timid", item: "Focus Sash", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Grimmsnarl", { ability: new Ability("Prankster"), nature: "Careful", item: "Light Clay", evs: { hp: 244, atk: 4, def: 100, spa: 0, spd: 124, spe: 36 } }),
    new Pokemon("Baxcalibur", { ability: new Ability("Thermal Exchange"), nature: "Adamant", item: "Loaded Dice", evs: { hp: 12, atk: 252, def: 12, spa: 0, spd: 28, spe: 204 } }),
    new Pokemon("Meowscarada", { ability: new Ability("Protean"), nature: "Jolly", item: "Choice Band", evs: { hp: 0, atk: 236, def: 0, spa: 0, spd: 36, spe: 236 } }),
    new Pokemon("Whimsicott", { ability: new Ability("Prankster"), nature: "Timid", item: "Focus Sash", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Charizard", { ability: new Ability("Solar Power"), nature: "Timid", item: "Choice Scarf", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Jumpluff", { ability: new Ability("Chlorophyll"), nature: "Timid", item: "Covert Cloak", evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Clefable", { ability: new Ability("Unaware"), nature: "Bold", item: "Sitrus Berry", evs: { hp: 252, atk: 0, def: 236, spa: 4, spd: 4, spe: 12 } }),
    new Pokemon("Murkrow", { ability: new Ability("Prankster"), nature: "Bold", item: "Eviolite", evs: { hp: 252, atk: 0, def: 228, spa: 0, spd: 28, spe: 0 } }),
    new Pokemon("Excadrill", { ability: new Ability("Sand Rush"), nature: "Adamant", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Gastrodon", { ability: new Ability("Storm Drain"), nature: "Modest", item: "Sitrus Berry", evs: { hp: 252, atk: 0, def: 92, spa: 140, spd: 20, spe: 4 } }),
    new Pokemon("Arcanine", { ability: new Ability("Intimidate"), nature: "Jolly", item: "Mirror Herb", evs: { hp: 4, atk: 236, def: 4, spa: 0, spd: 44, spe: 220 } }),
    new Pokemon("Hydreigon", { ability: new Ability("Levitate"), nature: "Timid", item: "Choice Specs", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Delphox", { ability: new Ability("Blaze"), nature: "Timid", item: "Life Orb", evs: { hp: 36, atk: 0, def: 4, spa: 204, spd: 12, spe: 252 } }),
    new Pokemon("Flamigo", { ability: new Ability("Scrappy"), nature: "Jolly", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Arcanine-Hisui", { ability: new Ability("Intimidate"), nature: "Jolly", item: "Assault Vest", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Tauros-Paldea-Aqua", { ability: new Ability("Intimidate"), nature: "Jolly", item: "Mirror Herb", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } }),
    new Pokemon("Armarouge", { ability: new Ability("Flash Fire"), nature: "Modest", item: "Power Herb", evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 } }),
    new Pokemon("Milotic", { ability: new Ability("Competitive"), nature: "Modest", item: "Leftovers", evs: { hp: 252, atk: 0, def: 60, spa: 28, spd: 60, spe: 108 } }),
    new Pokemon("Palafin", { ability: new Ability("Zero to Hero"), nature: "Adamant", item: "Mystic Water", evs: { hp: 4, atk: 252, def: 4, spa: 0, spd: 4, spe: 244 } }),
    new Pokemon("Samurott-Hisui", { ability: new Ability("Sharpness"), nature: "Jolly", item: "Assault Vest", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 } }),
    new Pokemon("Weavile", { ability: new Ability("Pickpocket"), nature: "Hasty", item: "Focus Sash", evs: { hp: 0, atk: 252, def: 0, spa: 4, spd: 0, spe: 252 } }),
    new Pokemon("Ceruledge", { ability: new Ability("Flash Fire"), nature: "Adamant", item: "Clear Amulet", evs: { hp: 252, atk: 204, def: 28, spa: 0, spd: 4, spe: 20 } }),
    new Pokemon("Typhlosion-Hisui", { ability: new Ability("Blaze"), nature: "Modest", item: "Choice Scarf", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } }),
    new Pokemon("Garganacl", { ability: new Ability("Purifying Salt"), nature: "Careful", item: "Maranga Berry", evs: { hp: 252, atk: 4, def: 12, spa: 0, spd: 236, spe: 4 } })
  ]
}
