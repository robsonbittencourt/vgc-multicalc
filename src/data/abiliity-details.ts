export type AbilityName = keyof typeof ABILITY_DETAILS

export interface AbilityDetail {
  name: string
  description: string
}

export const ABILITY_DETAILS: Record<string, AbilityDetail> = {
  adaptability: {
    name: "Adaptability",
    description: "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5."
  },
  aftermath: {
    name: "Aftermath",
    description: "If this Pokemon is KOed with a contact move, that move's user loses 1/4 its max HP."
  },
  airlock: {
    name: "Air Lock",
    description: "While this Pokemon is active, the effects of weather conditions are disabled."
  },
  analytic: {
    name: "Analytic",
    description: "This Pokemon's attacks have 1.3x power if it is the last to move in a turn."
  },
  angerpoint: {
    name: "Anger Point",
    description: "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages."
  },
  angershell: {
    name: "Anger Shell",
    description: "At 1/2 or less of this Pokemon's max HP: +1 Atk, Sp. Atk, Spe, and -1 Def, Sp. Def."
  },
  anticipation: {
    name: "Anticipation",
    description: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move."
  },
  arenatrap: {
    name: "Arena Trap",
    description: "Prevents opposing Pokemon from choosing to switch out unless they are airborne."
  },
  armortail: {
    name: "Armor Tail",
    description: "This Pokemon and its allies are protected from opposing priority moves."
  },
  aromaveil: {
    name: "Aroma Veil",
    description: "Protects user/allies from Attract, Disable, Encore, Heal Block, Taunt, and Torment."
  },
  asoneglastrier: {
    name: "As One (Glastrier)",
    description: "Combination of the Unnerve and Chilling Neigh Abilities."
  },
  asonespectrier: {
    name: "As One (Spectrier)",
    description: "Combination of the Unnerve and Grim Neigh Abilities."
  },
  baddreams: {
    name: "Bad Dreams",
    description: "Causes sleeping foes to lose 1/8 of their max HP at the end of each turn."
  },
  battery: {
    name: "Battery",
    description: "This Pokemon's allies have the power of their special attacks multiplied by 1.3."
  },
  battlearmor: {
    name: "Battle Armor",
    description: "This Pokemon cannot be struck by a critical hit."
  },
  battlebond: {
    name: "Battle Bond",
    description: "After KOing a Pokemon: raises Attack, Sp. Atk, Speed by 1 stage. Once per battle."
  },
  beadsofruin: {
    name: "Beads of Ruin",
    description: "Active Pokemon without this Ability have their Special Defense multiplied by 0.75."
  },
  berserk: {
    name: "Berserk",
    description: "This Pokemon's Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP."
  },
  bigpecks: {
    name: "Big Pecks",
    description: "Prevents other Pokemon from lowering this Pokemon's Defense stat stage."
  },
  blaze: {
    name: "Blaze",
    description: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Fire attacks."
  },
  bulletproof: {
    name: "Bulletproof",
    description: "This Pokemon is immune to bullet moves."
  },
  cheekpouch: {
    name: "Cheek Pouch",
    description: "If this Pokemon eats a Berry, it restores 1/3 of its max HP after the Berry's effect."
  },
  chillingneigh: {
    name: "Chilling Neigh",
    description: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon."
  },
  chlorophyll: {
    name: "Chlorophyll",
    description: "If Sunny Day is active, this Pokemon's Speed is doubled."
  },
  clearbody: {
    name: "Clear Body",
    description: "Prevents other Pokemon from lowering this Pokemon's stat stages."
  },
  cloudnine: {
    name: "Cloud Nine",
    description: "While this Pokemon is active, the effects of weather conditions are disabled."
  },
  comatose: {
    name: "Comatose",
    description: "This Pokemon cannot be statused, and is considered to be asleep."
  },
  commander: {
    name: "Commander",
    description: "If ally is Dondozo: this Pokemon cannot act or be hit, +2 to all Dondozo's stats."
  },
  competitive: {
    name: "Competitive",
    description: "This Pokemon's Sp. Atk is raised by 2 for each of its stats that is lowered by a foe."
  },
  compoundeyes: {
    name: "Compound Eyes",
    description: "This Pokemon's moves have their accuracy multiplied by 1.3."
  },
  contrary: {
    name: "Contrary",
    description: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa."
  },
  corrosion: {
    name: "Corrosion",
    description: "This Pokemon can poison or badly poison a Pokemon regardless of its typing."
  },
  costar: {
    name: "Costar",
    description: "On switch-in, this Pokemon copies all of its ally's stat stage changes."
  },
  cudchew: {
    name: "Cud Chew",
    description: "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn."
  },
  curiousmedicine: {
    name: "Curious Medicine",
    description: "On switch-in, this Pokemon's allies have their stat stages reset to 0."
  },
  cursedbody: {
    name: "Cursed Body",
    description: "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled."
  },
  cutecharm: {
    name: "Cute Charm",
    description: "30% chance of infatuating Pokemon of the opposite gender if they make contact."
  },
  damp: {
    name: "Damp",
    description: "Prevents Explosion/Mind Blown/Misty Explosion/Self-Destruct/Aftermath while active."
  },
  dancer: {
    name: "Dancer",
    description: "After another Pokemon uses a dance move, this Pokemon uses the same move."
  },
  dauntlessshield: {
    name: "Dauntless Shield",
    description: "On switch-in, this Pokemon's Defense is raised by 1 stage. Once per battle."
  },
  dazzling: {
    name: "Dazzling",
    description: "This Pokemon and its allies are protected from opposing priority moves."
  },
  defiant: {
    name: "Defiant",
    description: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe."
  },
  disguise: {
    name: "Disguise",
    description: "(Mimikyu only) The first hit it takes is blocked, and it takes 1/8 HP damage instead."
  },
  download: {
    name: "Download",
    description: "On switch-in, Attack or Sp. Atk is raised 1 stage based on the foes' weaker Defense."
  },
  dragonsmaw: {
    name: "Dragon's Maw",
    description: "This Pokemon's offensive stat is multiplied by 1.5 while using a Dragon-type attack."
  },
  drizzle: {
    name: "Drizzle",
    description: "On switch-in, this Pokemon summons Rain Dance."
  },
  drought: {
    name: "Drought",
    description: "On switch-in, this Pokemon summons Sunny Day."
  },
  dryskin: {
    name: "Dry Skin",
    description: "This Pokemon is healed 1/4 by Water, 1/8 by Rain; is hurt 1.25x by Fire, 1/8 by Sun."
  },
  earlybird: {
    name: "Early Bird",
    description: "This Pokemon's sleep counter drops by 2 instead of 1."
  },
  eartheater: {
    name: "Earth Eater",
    description: "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity."
  },
  effectspore: {
    name: "Effect Spore",
    description: "30% chance of poison/paralysis/sleep on others making contact with this Pokemon."
  },
  electricsurge: {
    name: "Electric Surge",
    description: "On switch-in, this Pokemon summons Electric Terrain."
  },
  electromorphosis: {
    name: "Electromorphosis",
    description: "This Pokemon gains the Charge effect when it takes a hit from an attack."
  },
  filter: {
    name: "Filter",
    description: "This Pokemon receives 3/4 damage from supereffective attacks."
  },
  flamebody: {
    name: "Flame Body",
    description: "30% chance a Pokemon making contact with this Pokemon will be burned."
  },
  flareboost: {
    name: "Flare Boost",
    description: "While this Pokemon is burned, its special attacks have 1.5x power."
  },
  flashfire: {
    name: "Flash Fire",
    description: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity."
  },
  flowerveil: {
    name: "Flower Veil",
    description: "This side's Grass types can't have stats lowered or status inflicted by other Pokemon."
  },
  fluffy: {
    name: "Fluffy",
    description: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Fire moves."
  },
  forewarn: {
    name: "Forewarn",
    description: "On switch-in, this Pokemon is alerted to the foes' move with the highest power."
  },
  friendguard: {
    name: "Friend Guard",
    description: "This Pokemon's allies receive 3/4 damage from other Pokemon's attacks."
  },
  frisk: {
    name: "Frisk",
    description: "On switch-in, this Pokemon identifies the held items of all opposing Pokemon."
  },
  fullmetalbody: {
    name: "Full Metal Body",
    description: "Prevents other Pokemon from lowering this Pokemon's stat stages."
  },
  furcoat: {
    name: "Fur Coat",
    description: "This Pokemon's Defense is doubled."
  },
  galewings: {
    name: "Gale Wings",
    description: "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 1."
  },
  galvanize: {
    name: "Galvanize",
    description: "This Pokemon's Normal-type moves become Electric type and have 1.2x power."
  },
  gluttony: {
    name: "Gluttony",
    description: "This Pokemon eats Berries at 1/2 max HP or less instead of their usual 1/4 max HP."
  },
  goodasgold: {
    name: "Good as Gold",
    description: "This Pokemon is immune to Status moves."
  },
  gooey: {
    name: "Gooey",
    description: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage."
  },
  grasspelt: {
    name: "Grass Pelt",
    description: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5."
  },
  grassysurge: {
    name: "Grassy Surge",
    description: "On switch-in, this Pokemon summons Grassy Terrain."
  },
  grimneigh: {
    name: "Grim Neigh",
    description: "This Pokemon's Sp. Atk is raised by 1 stage if it attacks and KOes another Pokemon."
  },
  guarddog: {
    name: "Guard Dog",
    description: "Immune to Intimidate. Intimidated: +1 Attack. Cannot be forced to switch out."
  },
  gulpmissile: {
    name: "Gulp Missile",
    description: "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Defense or paralysis."
  },
  guts: {
    name: "Guts",
    description: "If this Pokemon is statused, its Attack is 1.5x; ignores burn halving physical damage."
  },
  hadronengine: {
    name: "Hadron Engine",
    description: "On switch-in, summons Electric Terrain. During Electric Terrain, Sp. Atk is 1.3333x."
  },
  harvest: {
    name: "Harvest",
    description: "If last item used is a Berry, 50% chance to restore it each end of turn. 100% in Sun."
  },
  healer: {
    name: "Healer",
    description: "30% chance this Pokemon's ally has its status cured at the end of each turn."
  },
  heatproof: {
    name: "Heatproof",
    description: "Fire damage against this Pokemon is dealt with 1/2 offensive stat; 1/2 burn damage."
  },
  heavymetal: {
    name: "Heavy Metal",
    description: "This Pokemon's weight is doubled."
  },
  honeygather: {
    name: "Honey Gather",
    description: "No competitive use."
  },
  hospitality: {
    name: "Hospitality",
    description: "On switch-in, this Pokemon restores 1/4 of its ally's maximum HP, rounded down."
  },
  hugepower: {
    name: "Huge Power",
    description: "This Pokemon's Attack is doubled."
  },
  hungerswitch: {
    name: "Hunger Switch",
    description: "If Morpeko, it changes between Full Belly and Hangry Mode at the end of each turn."
  },
  hustle: {
    name: "Hustle",
    description: "This Pokemon's Attack is 1.5x and accuracy of its physical attacks is 0.8x."
  },
  hydration: {
    name: "Hydration",
    description: "This Pokemon has its status cured at the end of each turn if Rain Dance is active."
  },
  hypercutter: {
    name: "Hyper Cutter",
    description: "Prevents other Pokemon from lowering this Pokemon's Attack stat stage."
  },
  icebody: {
    name: "Ice Body",
    description: "If Snow is active, this Pokemon heals 1/16 of its max HP each turn."
  },
  iceface: {
    name: "Ice Face",
    description: "If Eiscue, the first physical hit it takes deals 0 damage. Effect is restored in Snow."
  },
  icescales: {
    name: "Ice Scales",
    description: "This Pokemon receives 1/2 damage from special attacks."
  },
  illuminate: {
    name: "Illuminate",
    description: "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat."
  },
  illusion: {
    name: "Illusion",
    description: "This Pokemon appears as the last Pokemon in the party until it takes direct damage."
  },
  immunity: {
    name: "Immunity",
    description: "This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it."
  },
  imposter: {
    name: "Imposter",
    description: "On switch-in, this Pokemon Transforms into the opposing Pokemon that is facing it."
  },
  infiltrator: {
    name: "Infiltrator",
    description: "Moves ignore substitutes and foe's Reflect/Light Screen/Safeguard/Mist/Aurora Veil."
  },
  innerfocus: {
    name: "Inner Focus",
    description: "This Pokemon cannot be made to flinch. Immune to Intimidate."
  },
  insomnia: {
    name: "Insomnia",
    description: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it."
  },
  intimidate: {
    name: "Intimidate",
    description: "On switch-in, this Pokemon lowers the Attack of opponents by 1 stage."
  },
  intrepidsword: {
    name: "Intrepid Sword",
    description: "On switch-in, this Pokemon's Attack is raised by 1 stage. Once per battle."
  },
  ironfist: {
    name: "Iron Fist",
    description: "This Pokemon's punch-based attacks have 1.2x power. Sucker Punch is not boosted."
  },
  justified: {
    name: "Justified",
    description: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move."
  },
  keeneye: {
    name: "Keen Eye",
    description: "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat."
  },
  klutz: {
    name: "Klutz",
    description: "This Pokemon's held item has no effect, except Macho Brace. Fling cannot be used."
  },
  leafguard: {
    name: "Leaf Guard",
    description: "If Sunny Day is active, this Pokemon cannot be statused and Rest will fail for it."
  },
  levitate: {
    name: "Levitate",
    description: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it."
  },
  libero: {
    name: "Libero",
    description: "This Pokemon's type changes to the type of the move it is using. Once per switch-in."
  },
  lightmetal: {
    name: "Light Metal",
    description: "This Pokemon's weight is halved."
  },
  lightningrod: {
    name: "Lightning Rod",
    description: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity."
  },
  limber: {
    name: "Limber",
    description: "This Pokemon cannot be paralyzed. Gaining this Ability while paralyzed cures it."
  },
  lingeringaroma: {
    name: "Lingering Aroma",
    description: "Making contact with this Pokemon has the attacker's Ability become Lingering Aroma."
  },
  liquidooze: {
    name: "Liquid Ooze",
    description: "This Pokemon damages those draining HP from it for as much as they would heal."
  },
  liquidvoice: {
    name: "Liquid Voice",
    description: "This Pokemon's sound-based moves become Water type."
  },
  longreach: {
    name: "Long Reach",
    description: "This Pokemon's attacks do not make contact with the target."
  },
  magicbounce: {
    name: "Magic Bounce",
    description: "This Pokemon blocks certain Status moves and bounces them back to the user."
  },
  magicguard: {
    name: "Magic Guard",
    description: "This Pokemon can only be damaged by direct attacks."
  },
  magician: {
    name: "Magician",
    description: "If this Pokemon has no item, it steals the item off a Pokemon it hits with an attack."
  },
  magmaarmor: {
    name: "Magma Armor",
    description: "This Pokemon cannot be frozen. Gaining this Ability while frozen cures it."
  },
  magnetpull: {
    name: "Magnet Pull",
    description: "Prevents opposing Steel-type Pokemon from choosing to switch out."
  },
  marvelscale: {
    name: "Marvel Scale",
    description: "If this Pokemon has a non-volatile status condition, its Defense is multiplied by 1.5."
  },
  megalauncher: {
    name: "Mega Launcher",
    description: "This Pokemon's pulse moves have 1.5x power. Heal Pulse heals 3/4 target's max HP."
  },
  merciless: {
    name: "Merciless",
    description: "This Pokemon's attacks are critical hits if the target is poisoned."
  },
  mindseye: {
    name: "Mind's Eye",
    description: "Fighting, Normal moves hit Ghost. Accuracy can't be lowered, ignores evasiveness."
  },
  minus: {
    name: "Minus",
    description: "If an active ally has this Ability or the Plus Ability, this Pokemon's Sp. Atk is 1.5x."
  },
  mirrorarmor: {
    name: "Mirror Armor",
    description: "If this Pokemon's stat stages would be lowered, the attacker's are lowered instead."
  },
  mistysurge: {
    name: "Misty Surge",
    description: "On switch-in, this Pokemon summons Misty Terrain."
  },
  moldbreaker: {
    name: "Mold Breaker",
    description: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon."
  },
  moody: {
    name: "Moody",
    description: "Boosts a random stat (except accuracy/evasion) +2 and another stat -1 every turn."
  },
  motordrive: {
    name: "Motor Drive",
    description: "This Pokemon's Speed is raised 1 stage if hit by an Electric move; Electric immunity."
  },
  moxie: {
    name: "Moxie",
    description: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon."
  },
  multiscale: {
    name: "Multiscale",
    description: "If this Pokemon is at full HP, damage taken from attacks is halved."
  },
  multitype: {
    name: "Multitype",
    description: "If this Pokemon is an Arceus, its type changes to match its held Plate."
  },
  myceliummight: {
    name: "Mycelium Might",
    description: "This Pokemon's Status moves go last in their priority bracket and ignore Abilities."
  },
  naturalcure: {
    name: "Natural Cure",
    description: "This Pokemon has its non-volatile status condition cured when it switches out."
  },
  neutralizinggas: {
    name: "Neutralizing Gas",
    description: "While this Pokemon is active, Abilities have no effect."
  },
  noguard: {
    name: "No Guard",
    description: "Every move used by or against this Pokemon will always hit."
  },
  oblivious: {
    name: "Oblivious",
    description: "This Pokemon cannot be infatuated or taunted. Immune to Intimidate."
  },
  opportunist: {
    name: "Opportunist",
    description: "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect."
  },
  orichalcumpulse: {
    name: "Orichalcum Pulse",
    description: "On switch-in, summons Sunny Day. During Sunny Day, Attack is 1.3333x."
  },
  overcoat: {
    name: "Overcoat",
    description: "This Pokemon is immune to powder moves, Sandstorm damage, and Effect Spore."
  },
  overgrow: {
    name: "Overgrow",
    description: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Grass attacks."
  },
  owntempo: {
    name: "Own Tempo",
    description: "This Pokemon cannot be confused. Immune to Intimidate."
  },
  pickpocket: {
    name: "Pickpocket",
    description: "If this Pokemon has no item and is hit by a contact move, it steals the attacker's item."
  },
  pickup: {
    name: "Pickup",
    description: "If this Pokemon has no item, it finds one used by an adjacent Pokemon this turn."
  },
  pixilate: {
    name: "Pixilate",
    description: "This Pokemon's Normal-type moves become Fairy type and have 1.2x power."
  },
  plus: {
    name: "Plus",
    description: "If an active ally has this Ability or the Minus Ability, this Pokemon's Sp. Atk is 1.5x."
  },
  poisonheal: {
    name: "Poison Heal",
    description: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss."
  },
  poisonpoint: {
    name: "Poison Point",
    description: "30% chance a Pokemon making contact with this Pokemon will be poisoned."
  },
  poisonpuppeteer: {
    name: "Poison Puppeteer",
    description: "Pecharunt: If this Pokemon poisons a target, the target also becomes confused."
  },
  poisontouch: {
    name: "Poison Touch",
    description: "This Pokemon's contact moves have a 30% chance of poisoning."
  },
  powerofalchemy: {
    name: "Power of Alchemy",
    description: "This Pokemon copies the Ability of an ally that faints."
  },
  powerspot: {
    name: "Power Spot",
    description: "This Pokemon's allies have the power of their moves multiplied by 1.3."
  },
  prankster: {
    name: "Prankster",
    description: "This Pokemon's Status moves have priority raised by 1, but Dark types are immune."
  },
  pressure: {
    name: "Pressure",
    description: "If this Pokemon is the target of a foe's move, that move loses one additional PP."
  },
  prismarmor: {
    name: "Prism Armor",
    description: "This Pokemon receives 3/4 damage from supereffective attacks."
  },
  propellertail: {
    name: "Propeller Tail",
    description: "This Pokemon's moves cannot be redirected to a different target by any effect."
  },
  protean: {
    name: "Protean",
    description: "This Pokemon's type changes to the type of the move it is using. Once per switch-in."
  },
  protosynthesis: {
    name: "Protosynthesis",
    description: "Sunny Day active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed."
  },
  psychicsurge: {
    name: "Psychic Surge",
    description: "On switch-in, this Pokemon summons Psychic Terrain."
  },
  punkrock: {
    name: "Punk Rock",
    description: "This Pokemon receives 1/2 damage from sound moves. Its own have 1.3x power."
  },
  purepower: {
    name: "Pure Power",
    description: "This Pokemon's Attack is doubled."
  },
  purifyingsalt: {
    name: "Purifying Salt",
    description: "Ghost damage to this Pokemon dealt with a halved offensive stat; can't be statused."
  },
  quarkdrive: {
    name: "Quark Drive",
    description: "Electric Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed."
  },
  queenlymajesty: {
    name: "Queenly Majesty",
    description: "This Pokemon and its allies are protected from opposing priority moves."
  },
  quickdraw: {
    name: "Quick Draw",
    description: "This Pokemon has a 30% chance to move first in its priority bracket with attacking moves."
  },
  quickfeet: {
    name: "Quick Feet",
    description: "If this Pokemon is statused, its Speed is 1.5x; ignores Speed drop from paralysis."
  },
  raindish: {
    name: "Rain Dish",
    description: "If Rain Dance is active, this Pokemon heals 1/16 of its max HP each turn."
  },
  rattled: {
    name: "Rattled",
    description: "Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or Intimidated."
  },
  receiver: {
    name: "Receiver",
    description: "This Pokemon copies the Ability of an ally that faints."
  },
  reckless: {
    name: "Reckless",
    description: "This Pokemon's attacks with recoil or crash damage have 1.2x power; not Struggle."
  },
  regenerator: {
    name: "Regenerator",
    description: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out."
  },
  ripen: {
    name: "Ripen",
    description: "When this Pokemon eats certain Berries, the effects are doubled."
  },
  rivalry: {
    name: "Rivalry",
    description: "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender."
  },
  rockhead: {
    name: "Rock Head",
    description: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage."
  },
  rockypayload: {
    name: "Rocky Payload",
    description: "This Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack."
  },
  roughskin: {
    name: "Rough Skin",
    description: "Pokemon making contact with this Pokemon lose 1/8 of their max HP."
  },
  runaway: {
    name: "Run Away",
    description: "No competitive use."
  },
  sandforce: {
    name: "Sand Force",
    description: "This Pokemon's Ground/Rock/Steel attacks do 1.3x in Sandstorm; immunity to it."
  },
  sandrush: {
    name: "Sand Rush",
    description: "If Sandstorm is active, this Pokemon's Speed is doubled; immunity to Sandstorm."
  },
  sandspit: {
    name: "Sand Spit",
    description: "When this Pokemon is hit by an attack, the effect of Sandstorm begins."
  },
  sandstream: {
    name: "Sand Stream",
    description: "On switch-in, this Pokemon summons Sandstorm."
  },
  sandveil: {
    name: "Sand Veil",
    description: "If Sandstorm is active, this Pokemon's evasiveness is 1.25x; immunity to Sandstorm."
  },
  sapsipper: {
    name: "Sap Sipper",
    description: "This Pokemon's Attack is raised 1 stage if hit by a Grass move; Grass immunity."
  },
  scrappy: {
    name: "Scrappy",
    description: "Fighting, Normal moves hit Ghost. Immune to Intimidate."
  },
  seedsower: {
    name: "Seed Sower",
    description: "When this Pokemon is hit by an attack, the effect of Grassy Terrain begins."
  },
  serenegrace: {
    name: "Serene Grace",
    description: "This Pokemon's moves have their secondary effect chance doubled."
  },
  shadowshield: {
    name: "Shadow Shield",
    description: "If this Pokemon is at full HP, damage taken from attacks is halved."
  },
  shadowtag: {
    name: "Shadow Tag",
    description: "Prevents foes from choosing to switch unless they also have this Ability."
  },
  sharpness: {
    name: "Sharpness",
    description: "This Pokemon's slicing moves have their power multiplied by 1.5."
  },
  shedskin: {
    name: "Shed Skin",
    description: "This Pokemon has a 33% chance to have its status cured at the end of each turn."
  },
  sheerforce: {
    name: "Sheer Force",
    description: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects."
  },
  shellarmor: {
    name: "Shell Armor",
    description: "This Pokemon cannot be struck by a critical hit."
  },
  shielddust: {
    name: "Shield Dust",
    description: "This Pokemon is not affected by the secondary effect of another Pokemon's attack."
  },
  shieldsdown: {
    name: "Shields Down",
    description: "If Minior, switch-in/end of turn it changes to Core at 1/2 max HP or less, else Meteor."
  },
  simple: {
    name: "Simple",
    description: "When one of this Pokemon's stat stages is raised or lowered, the amount is doubled."
  },
  skilllink: {
    name: "Skill Link",
    description: "This Pokemon's multi-hit attacks always hit the maximum number of times."
  },
  slowstart: {
    name: "Slow Start",
    description: "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns."
  },
  slushrush: {
    name: "Slush Rush",
    description: "If Snow is active, this Pokemon's Speed is doubled."
  },
  sniper: {
    name: "Sniper",
    description: "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.5."
  },
  snowcloak: {
    name: "Snow Cloak",
    description: "If Snow is active, this Pokemon's evasiveness is 1.25x."
  },
  snowwarning: {
    name: "Snow Warning",
    description: "On switch-in, this Pokemon summons Snow."
  },
  solarpower: {
    name: "Solar Power",
    description: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn."
  },
  solidrock: {
    name: "Solid Rock",
    description: "This Pokemon receives 3/4 damage from supereffective attacks."
  },
  soulheart: {
    name: "Soul-Heart",
    description: "This Pokemon's Special Attack is raised by 1 stage when another Pokemon faints."
  },
  soundproof: {
    name: "Soundproof",
    description: "This Pokemon is immune to sound-based moves, unless it used the move."
  },
  speedboost: {
    name: "Speed Boost",
    description: "This Pokemon's Speed is raised 1 stage at the end of each full turn on the field."
  },
  stakeout: {
    name: "Stakeout",
    description: "This Pokemon's offensive stat is doubled against a target that switched in this turn."
  },
  stall: {
    name: "Stall",
    description: "This Pokemon moves last among Pokemon using the same or greater priority moves."
  },
  stalwart: {
    name: "Stalwart",
    description: "This Pokemon's moves cannot be redirected to a different target by any effect."
  },
  stamina: {
    name: "Stamina",
    description: "This Pokemon's Defense is raised by 1 stage after it is damaged by a move."
  },
  static: {
    name: "Static",
    description: "30% chance a Pokemon making contact with this Pokemon will be paralyzed."
  },
  steadfast: {
    name: "Steadfast",
    description: "If this Pokemon flinches, its Speed is raised by 1 stage."
  },
  steamengine: {
    name: "Steam Engine",
    description: "This Pokemon's Speed is raised by 6 stages after it is damaged by Fire/Water moves."
  },
  steelyspirit: {
    name: "Steely Spirit",
    description: "This Pokemon and its allies' Steel-type moves have their power multiplied by 1.5."
  },
  stench: {
    name: "Stench",
    description: "This Pokemon's attacks without a chance to flinch gain a 10% chance to flinch."
  },
  stickyhold: {
    name: "Sticky Hold",
    description: "This Pokemon cannot lose its held item due to another Pokemon's Ability or attack."
  },
  stormdrain: {
    name: "Storm Drain",
    description: "This Pokemon draws Water moves to itself to raise Sp. Atk by 1; Water immunity."
  },
  strongjaw: {
    name: "Strong Jaw",
    description: "This Pokemon's bite-based attacks have 1.5x power. Bug Bite is not boosted."
  },
  sturdy: {
    name: "Sturdy",
    description: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO."
  },
  suctioncups: {
    name: "Suction Cups",
    description: "This Pokemon cannot be forced to switch out by another Pokemon's attack or item."
  },
  superluck: {
    name: "Super Luck",
    description: "This Pokemon's critical hit ratio is raised by 1 stage."
  },
  supersweetsyrup: {
    name: "Supersweet Syrup",
    description: "On switch-in, this Pokemon lowers the evasiveness of opponents 1 stage. Once per battle."
  },
  supremeoverlord: {
    name: "Supreme Overlord",
    description: "This Pokemon's moves have 10% more power for each fainted ally, up to 5 allies."
  },
  surgesurfer: {
    name: "Surge Surfer",
    description: "If Electric Terrain is active, this Pokemon's Speed is doubled."
  },
  swarm: {
    name: "Swarm",
    description: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Bug attacks."
  },
  sweetveil: {
    name: "Sweet Veil",
    description: "This Pokemon and its allies cannot fall asleep; those already asleep do not wake up."
  },
  swiftswim: {
    name: "Swift Swim",
    description: "If Rain Dance is active, this Pokemon's Speed is doubled."
  },
  swordofruin: {
    name: "Sword of Ruin",
    description: "Active Pokemon without this Ability have their Defense multiplied by 0.75."
  },
  symbiosis: {
    name: "Symbiosis",
    description: "If an ally uses its item, this Pokemon gives its item to that ally immediately."
  },
  synchronize: {
    name: "Synchronize",
    description: "If another Pokemon burns/poisons/paralyzes this Pokemon, it also gets that status."
  },
  tabletsofruin: {
    name: "Tablets of Ruin",
    description: "Active Pokemon without this Ability have their Attack multiplied by 0.75."
  },
  tangledfeet: {
    name: "Tangled Feet",
    description: "This Pokemon's evasiveness is doubled as long as it is confused."
  },
  tanglinghair: {
    name: "Tangling Hair",
    description: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage."
  },
  technician: {
    name: "Technician",
    description: "This Pokemon's moves of 60 power or less have 1.5x power, including Struggle."
  },
  telepathy: {
    name: "Telepathy",
    description: "This Pokemon does not take damage from attacks made by its allies."
  },
  teraformzero: {
    name: "Teraform Zero",
    description: "Terapagos: Terastallizing ends the effects of weather and terrain. Once per battle."
  },
  terashell: {
    name: "Tera Shell",
    description: "Terapagos: If full HP, attacks taken have 0.5x effectiveness unless naturally immune."
  },
  terashift: {
    name: "Tera Shift",
    description: "If this Pokemon is a Terapagos, it transforms into its Terastal Form on entry."
  },
  teravolt: {
    name: "Teravolt",
    description: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon."
  },
  thermalexchange: {
    name: "Thermal Exchange",
    description: "This Pokemon's Attack is raised by 1 when damaged by Fire moves; can't be burned."
  },
  thickfat: {
    name: "Thick Fat",
    description: "Fire-/Ice-type moves against this Pokemon deal damage with a halved offensive stat."
  },
  tintedlens: {
    name: "Tinted Lens",
    description: "This Pokemon's attacks that are not very effective on a target deal double damage."
  },
  torrent: {
    name: "Torrent",
    description: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Water attacks."
  },
  toughclaws: {
    name: "Tough Claws",
    description: "This Pokemon's contact moves have their power multiplied by 1.3."
  },
  toxicboost: {
    name: "Toxic Boost",
    description: "While this Pokemon is poisoned, its physical attacks have 1.5x power."
  },
  toxicchain: {
    name: "Toxic Chain",
    description: "This Pokemon's attacks have a 30% chance of badly poisoning."
  },
  toxicdebris: {
    name: "Toxic Debris",
    description: "If this Pokemon is hit by a physical attack, Toxic Spikes are set on the opposing side."
  },
  trace: {
    name: "Trace",
    description: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability."
  },
  transistor: {
    name: "Transistor",
    description: "This Pokemon's offensive stat is multiplied by 1.3 while using an Electric-type attack."
  },
  triage: {
    name: "Triage",
    description: "This Pokemon's healing moves have their priority increased by 3."
  },
  truant: {
    name: "Truant",
    description: "This Pokemon skips every other turn instead of using a move."
  },
  turboblaze: {
    name: "Turboblaze",
    description: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon."
  },
  unaware: {
    name: "Unaware",
    description: "This Pokemon ignores other Pokemon's stat stages when taking or doing damage."
  },
  unburden: {
    name: "Unburden",
    description: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability."
  },
  unnerve: {
    name: "Unnerve",
    description: "While this Pokemon is active, it prevents opposing Pokemon from using their Berries."
  },
  unseenfist: {
    name: "Unseen Fist",
    description: "This Pokemon's contact moves ignore the target's protection, except Max Guard."
  },
  vesselofruin: {
    name: "Vessel of Ruin",
    description: "Active Pokemon without this Ability have their Special Attack multiplied by 0.75."
  },
  vitalspirit: {
    name: "Vital Spirit",
    description: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it."
  },
  voltabsorb: {
    name: "Volt Absorb",
    description: "This Pokemon heals 1/4 of its max HP when hit by Electric moves; Electric immunity."
  },
  waterabsorb: {
    name: "Water Absorb",
    description: "This Pokemon heals 1/4 of its max HP when hit by Water moves; Water immunity."
  },
  waterbubble: {
    name: "Water Bubble",
    description: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved."
  },
  watercompaction: {
    name: "Water Compaction",
    description: "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move."
  },
  waterveil: {
    name: "Water Veil",
    description: "This Pokemon cannot be burned. Gaining this Ability while burned cures it."
  },
  weakarmor: {
    name: "Weak Armor",
    description: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 2."
  },
  wellbakedbody: {
    name: "Well-Baked Body",
    description: "This Pokemon's Defense is raised 2 stages if hit by a Fire move; Fire immunity."
  },
  whitesmoke: {
    name: "White Smoke",
    description: "Prevents other Pokemon from lowering this Pokemon's stat stages."
  },
  windpower: {
    name: "Wind Power",
    description: "This Pokemon gains the Charge effect when hit by a wind move or Tailwind begins."
  },
  windrider: {
    name: "Wind Rider",
    description: "Attack raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity."
  },
  wonderskin: {
    name: "Wonder Skin",
    description: "Status moves with accuracy checks are 50% accurate when used on this Pokemon."
  },
  zerotohero: {
    name: "Zero to Hero",
    description: "If this Pokemon is a Palafin in Zero Form, switching out has it change to Hero Form."
  }
}
