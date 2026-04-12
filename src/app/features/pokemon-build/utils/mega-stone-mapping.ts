export const MEGA_STONE_TO_POKEMON_NAME: Record<string, string> = {
  abomasite: "Abomasnow",
  absolite: "Absol",
  aerodactylite: "Aerodactyl",
  aggronite: "Aggron",
  alakazite: "Alakazam",
  altarianite: "Altaria",
  ampharosite: "Ampharos",
  audinite: "Audino",
  banettite: "Banette",
  beedrillite: "Beedrill",
  blastoisinite: "Blastoise",
  blazikenite: "Blaziken",
  cameruptite: "Camerupt",
  charizarditex: "Charizard",
  charizarditey: "Charizard",
  chandelurite: "Chandelure",
  chimechite: "Chimecho",
  clefablite: "Clefable",
  crabominite: "Crabominable",
  delphoxite: "Delphox",
  dragoninite: "Dragonite",
  drampanite: "Drampa",
  emboarite: "Emboar",
  excadrite: "Excadrill",
  feraligite: "Feraligatr",
  floettite: "Floette",
  froslassite: "Froslass",
  galladite: "Gallade",
  garchompite: "Garchomp",
  gardevoirite: "Gardevoir",
  gengarite: "Gengar",
  glalitite: "Glalie",
  glimmoranite: "Glimmora",
  golurkite: "Golurk",
  greninjite: "Greninja",
  gyaradosite: "Gyarados",
  hawluchanite: "Hawlucha",
  heracronite: "Heracross",
  houndoominite: "Houndoom",
  kangaskhanite: "Kangaskhan",
  lopunnite: "Lopunny",
  lucarionite: "Lucario",
  manectite: "Manectric",
  medichamite: "Medicham",
  meganiumite: "Meganium",
  meowsticite: "Meowstic",
  pidgeotite: "Pidgeot",
  pinsirite: "Pinsir",
  sablenite: "Sableye",
  scizorite: "Scizor",
  scovillainite: "Scovillain",
  sharpedonite: "Sharpedo",
  skarmorite: "Skarmory",
  slowbronite: "Slowbro",
  starminite: "Starmie",
  steelixite: "Steelix",
  swampertite: "Swampert",
  tyranitarite: "Tyranitar",
  venusaurite: "Venusaur",
  victreebelite: "Victreebel"
}

export function getMegaEvolutionName(pokemonName: string, megaStoneLetter: string | null): string {
  if (megaStoneLetter) {
    return `${pokemonName}-Mega-${megaStoneLetter}`
  }
  return `${pokemonName}-Mega`
}

export function getBasePokemonNameFromItem(itemName: string): string | null {
  const itemKey = itemName.toLowerCase().replace(/\s+/g, "")
  return MEGA_STONE_TO_POKEMON_NAME[itemKey] || null
}
