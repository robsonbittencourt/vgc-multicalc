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
  chesnaughtite: "Chesnaught",
  chandelurite: "Chandelure",
  chimechite: "Chimecho",
  clefablite: "Clefable",
  crabominite: "Crabominable",
  delphoxite: "Delphox",
  dragalgite: "Dragalge",
  dragoninite: "Dragonite",
  drampanite: "Drampa",
  eelektrossite: "Eelektross",
  emboarite: "Emboar",
  excadrite: "Excadrill",
  falinksite: "Falinks",
  feraligite: "Feraligatr",
  floettite: "Floette-Eternal",
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
  barbaracite: "Barbaracle",
  malamarite: "Malamar",
  mawilite: "Mawile",
  manectite: "Manectric",
  medichamite: "Medicham",
  meganiumite: "Meganium",
  metagrossite: "Metagross",
  meowsticite: "Meowstic",
  pidgeotite: "Pidgeot",
  pinsirite: "Pinsir",
  pyroarite: "Pyroar",
  raichunitex: "Raichu",
  raichunitey: "Raichu",
  sablenite: "Sableye",
  sceptilite: "Sceptile",
  scizorite: "Scizor",
  scraftinite: "Scrafty",
  scolipite: "Scolipede",
  scovillainite: "Scovillain",
  sharpedonite: "Sharpedo",
  skarmorite: "Skarmory",
  slowbronite: "Slowbro",
  starminite: "Starmie",
  staraptite: "Staraptor",
  steelixite: "Steelix",
  swampertite: "Swampert",
  tyranitarite: "Tyranitar",
  venusaurite: "Venusaur",
  victreebelite: "Victreebel"
}

export const MEGA_FORM_MAPPING: Record<string, string> = {
  "Floette-Eternal": "Floette-Mega",
  Meowstic: "Meowstic-M-Mega",
  "Meowstic-F": "Meowstic-F-Mega"
}

export const MEGA_FORM_REVERSE_MAPPING: Record<string, string> = {
  "Floette-Mega": "Floette-Eternal",
  "Meowstic-M-Mega": "Meowstic",
  "Meowstic-F-Mega": "Meowstic-F"
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
