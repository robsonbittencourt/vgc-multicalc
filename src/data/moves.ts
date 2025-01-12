export class Moves {
  private static _instance: Moves

  moves: string[]

  private constructor() {
    this.moves = this.allMoves()
  }

  static get instance(): Moves {
    if (!Moves._instance) {
      Moves._instance = new Moves()
    }

    return Moves._instance
  }

  allMoves(): string[] {
    return [
      "Absorb",
      "Accelerock",
      "Acid",
      "Acid Armor",
      "Acid Spray",
      "Acrobatics",
      "Acupressure",
      "Aerial Ace",
      "Aeroblast",
      "After You",
      "Agility",
      "Air Cutter",
      "Air Slash",
      "Alluring Voice",
      "Ally Switch",
      "Amnesia",
      "Ancient Power",
      "Apple Acid",
      "Aqua Cutter",
      "Aqua Jet",
      "Aqua Ring",
      "Aqua Step",
      "Aqua Tail",
      "Arm Thrust",
      "Armor Cannon",
      "Aromatic Mist",
      "Assurance",
      "Astonish",
      "Astral Barrage",
      "Attack Order",
      "Attract",
      "Aura Sphere",
      "Aura Wheel",
      "Aurora Beam",
      "Aurora Veil",
      "Avalanche",
      "Axe Kick",
      "Baby-Doll Eyes",
      "Baneful Bunker",
      "Barb Barrage",
      "Baton Pass",
      "Beak Blast",
      "Beat Up",
      "Behemoth Bash",
      "Behemoth Blade",
      "Belch",
      "Belly Drum",
      "Bind",
      "Bite",
      "Bitter Blade",
      "Bitter Malice",
      "Blast Burn",
      "Blaze Kick",
      "Blazing Torque",
      "Bleakwind Storm",
      "Blizzard",
      "Block",
      "Blood Moon",
      "Blue Flare",
      "Body Press",
      "Body Slam",
      "Bolt Strike",
      "Bone Rush",
      "Boomburst",
      "Bounce",
      "Branch Poke",
      "Brave Bird",
      "Breaking Swipe",
      "Brick Break",
      "Brine",
      "Brutal Swing",
      "Bubble Beam",
      "Bug Bite",
      "Bug Buzz",
      "Bulk Up",
      "Bulldoze",
      "Bullet Punch",
      "Bullet Seed",
      "Burn Up",
      "Burning Bulwark",
      "Burning Jealousy",
      "Calm Mind",
      "Ceaseless Edge",
      "Celebrate",
      "Charge",
      "Charge Beam",
      "Charm",
      "Chilling Water",
      "Chilly Reception",
      "Chloroblast",
      "Circle Throw",
      "Clanging Scales",
      "Clangorous Soul",
      "Clear Smog",
      "Close Combat",
      "Coaching",
      "Coil",
      "Collision Course",
      "Combat Torque",
      "Comeuppance",
      "Confide",
      "Confuse Ray",
      "Confusion",
      "Conversion",
      "Conversion 2",
      "Copycat",
      "Corrosive Gas",
      "Cosmic Power",
      "Cotton Guard",
      "Cotton Spore",
      "Counter",
      "Court Change",
      "Covet",
      "Crabhammer",
      "Cross Chop",
      "Cross Poison",
      "Crunch",
      "Crush Claw",
      "Crush Grip",
      "Curse",
      "Cut",
      "Dark Pulse",
      "Dark Void",
      "Darkest Lariat",
      "Dazzling Gleam",
      "Decorate",
      "Defend Order",
      "Defense Curl",
      "Defog",
      "Destiny Bond",
      "Detect",
      "Diamond Storm",
      "Dig",
      "Dire Claw",
      "Disable",
      "Disarming Voice",
      "Discharge",
      "Dive",
      "Doodle",
      "Doom Desire",
      "Double Hit",
      "Double Kick",
      "Double Shock",
      "Double Team",
      "Double-Edge",
      "Draco Meteor",
      "Dragon Ascent",
      "Dragon Breath",
      "Dragon Cheer",
      "Dragon Claw",
      "Dragon Dance",
      "Dragon Darts",
      "Dragon Energy",
      "Dragon Hammer",
      "Dragon Pulse",
      "Dragon Rush",
      "Dragon Tail",
      "Drain Punch",
      "Draining Kiss",
      "Drill Peck",
      "Drill Run",
      "Drum Beating",
      "Dual Wingbeat",
      "Dynamax Cannon",
      "Dynamic Punch",
      "Earth Power",
      "Earthquake",
      "Echoed Voice",
      "Eerie Impulse",
      "Eerie Spell",
      "Electric Terrain",
      "Electro Ball",
      "Electro Drift",
      "Electro Shot",
      "Electroweb",
      "Ember",
      "Encore",
      "Endeavor",
      "Endure",
      "Energy Ball",
      "Entrainment",
      "Eruption",
      "Esper Wing",
      "Expanding Force",
      "Explosion",
      "Extrasensory",
      "Extreme Speed",
      "Facade",
      "Fairy Lock",
      "Fairy Wind",
      "Fake Out",
      "Fake Tears",
      "False Surrender",
      "False Swipe",
      "Feather Dance",
      "Feint",
      "Fell Stinger",
      "Fickle Beam",
      "Fiery Dance",
      "Fiery Wrath",
      "Fillet Away",
      "Final Gambit",
      "Fire Blast",
      "Fire Fang",
      "Fire Lash",
      "Fire Pledge",
      "Fire Punch",
      "Fire Spin",
      "First Impression",
      "Fissure",
      "Flail",
      "Flame Charge",
      "Flame Wheel",
      "Flamethrower",
      "Flare Blitz",
      "Flash Cannon",
      "Flatter",
      "Fleur Cannon",
      "Fling",
      "Flip Turn",
      "Floral Healing",
      "Flower Trick",
      "Flying Press",
      "Focus Blast",
      "Focus Energy",
      "Focus Punch",
      "Follow Me",
      "Force Palm",
      "Forest's Curse",
      "Foul Play",
      "Freeze Shock",
      "Freeze-Dry",
      "Freezing Glare",
      "Frenzy Plant",
      "Frost Breath",
      "Fury Cutter",
      "Fusion Bolt",
      "Fusion Flare",
      "Future Sight",
      "Gastro Acid",
      "Giga Drain",
      "Giga Impact",
      "Gigaton Hammer",
      "Glacial Lance",
      "Glaciate",
      "Glaive Rush",
      "Glare",
      "Grass Knot",
      "Grass Pledge",
      "Grassy Glide",
      "Grassy Terrain",
      "Grav Apple",
      "Gravity",
      "Growl",
      "Growth",
      "Guard Split",
      "Guard Swap",
      "Guillotine",
      "Gunk Shot",
      "Gust",
      "Gyro Ball",
      "Hammer Arm",
      "Happy Hour",
      "Hard Press",
      "Harden",
      "Haze",
      "Head Smash",
      "Headbutt",
      "Headlong Rush",
      "Heal Bell",
      "Heal Pulse",
      "Healing Wish",
      "Heart Swap",
      "Heat Crash",
      "Heat Wave",
      "Heavy Slam",
      "Helping Hand",
      "Hex",
      "High Horsepower",
      "High Jump Kick",
      "Hold Back",
      "Hold Hands",
      "Hone Claws",
      "Horn Attack",
      "Horn Drill",
      "Horn Leech",
      "Howl",
      "Hurricane",
      "Hydro Cannon",
      "Hydro Pump",
      "Hydro Steam",
      "Hyper Beam",
      "Hyper Drill",
      "Hyper Voice",
      "Hyperspace Fury",
      "Hyperspace Hole",
      "Ice Beam",
      "Ice Burn",
      "Ice Fang",
      "Ice Hammer",
      "Ice Punch",
      "Ice Shard",
      "Ice Spinner",
      "Icicle Crash",
      "Icicle Spear",
      "Icy Wind",
      "Imprison",
      "Incinerate",
      "Infernal Parade",
      "Inferno",
      "Infestation",
      "Ingrain",
      "Instruct",
      "Iron Defense",
      "Iron Head",
      "Iron Tail",
      "Ivy Cudgel",
      "Jaw Lock",
      "Jet Punch",
      "Judgment",
      "Jungle Healing",
      "Knock Off",
      "Kowtow Cleave",
      "Lash Out",
      "Last Resort",
      "Last Respects",
      "Lava Plume",
      "Leaf Blade",
      "Leaf Storm",
      "Leafage",
      "Leech Life",
      "Leech Seed",
      "Leer",
      "Lick",
      "Life Dew",
      "Light Screen",
      "Liquidation",
      "Lock-On",
      "Low Kick",
      "Low Sweep",
      "Lumina Crash",
      "Lunar Blessing",
      "Lunar Dance",
      "Lunge",
      "Luster Purge",
      "Mach Punch",
      "Magic Powder",
      "Magic Room",
      "Magical Leaf",
      "Magma Storm",
      "Magnet Rise",
      "Magnetic Flux",
      "Make It Rain",
      "Malignant Chain",
      "Matcha Gotcha",
      "Mean Look",
      "Mega Drain",
      "Mega Kick",
      "Mega Punch",
      "Megahorn",
      "Memento",
      "Metal Burst",
      "Metal Claw",
      "Metal Sound",
      "Metronome",
      "Mighty Cleave",
      "Milk Drink",
      "Mimic",
      "Minimize",
      "Mirror Coat",
      "Mist",
      "Mist Ball",
      "Misty Explosion",
      "Misty Terrain",
      "Moonblast",
      "Moongeist Beam",
      "Moonlight",
      "Morning Sun",
      "Mortal Spin",
      "Mountain Gale",
      "Mud Shot",
      "Mud-Slap",
      "Muddy Water",
      "Mystical Fire",
      "Mystical Power",
      "Nasty Plot",
      "Night Daze",
      "Night Shade",
      "Night Slash",
      "No Retreat",
      "Noble Roar",
      "Nuzzle",
      "Order Up",
      "Origin Pulse",
      "Outrage",
      "Overdrive",
      "Overheat",
      "Pain Split",
      "Parabolic Charge",
      "Parting Shot",
      "Pay Day",
      "Payback",
      "Peck",
      "Perish Song",
      "Petal Blizzard",
      "Petal Dance",
      "Phantom Force",
      "Photon Geyser",
      "Pin Missile",
      "Play Nice",
      "Play Rough",
      "Pluck",
      "Poison Fang",
      "Poison Gas",
      "Poison Jab",
      "Poison Powder",
      "Poison Sting",
      "Poison Tail",
      "Pollen Puff",
      "Poltergeist",
      "Population Bomb",
      "Pounce",
      "Pound",
      "Powder Snow",
      "Power Gem",
      "Power Split",
      "Power Swap",
      "Power Trick",
      "Power Trip",
      "Power Whip",
      "Precipice Blades",
      "Present",
      "Prismatic Laser",
      "Protect",
      "Psybeam",
      "Psyblade",
      "Psych Up",
      "Psychic",
      "Psychic Fangs",
      "Psychic Noise",
      "Psychic Terrain",
      "Psycho Boost",
      "Psycho Cut",
      "Psyshield Bash",
      "Psyshock",
      "Psystrike",
      "Pyro Ball",
      "Quash",
      "Quick Attack",
      "Quick Guard",
      "Quiver Dance",
      "Rage Fist",
      "Rage Powder",
      "Raging Bull",
      "Raging Fury",
      "Rain Dance",
      "Rapid Spin",
      "Razor Shell",
      "Recover",
      "Recycle",
      "Reflect",
      "Reflect Type",
      "Relic Song",
      "Rest",
      "Retaliate",
      "Revelation Dance",
      "Reversal",
      "Revival Blessing",
      "Rising Voltage",
      "Roar",
      "Roar of Time",
      "Rock Blast",
      "Rock Polish",
      "Rock Slide",
      "Rock Smash",
      "Rock Tomb",
      "Rock Wrecker",
      "Role Play",
      "Rollout",
      "Roost",
      "Round",
      "Ruination",
      "Sacred Fire",
      "Sacred Sword",
      "Safeguard",
      "Salt Cure",
      "Sand Attack",
      "Sand Tomb",
      "Sandsear Storm",
      "Sandstorm",
      "Scald",
      "Scale Shot",
      "Scary Face",
      "Scorching Sands",
      "Scratch",
      "Screech",
      "Secret Sword",
      "Seed Bomb",
      "Seed Flare",
      "Seismic Toss",
      "Self-Destruct",
      "Shadow Ball",
      "Shadow Claw",
      "Shadow Force",
      "Shadow Punch",
      "Shadow Sneak",
      "Shed Tail",
      "Sheer Cold",
      "Shell Side Arm",
      "Shell Smash",
      "Shelter",
      "Shift Gear",
      "Shock Wave",
      "Shore Up",
      "Silk Trap",
      "Simple Beam",
      "Sing",
      "Sketch",
      "Skill Swap",
      "Skitter Smack",
      "Sky Attack",
      "Slack Off",
      "Slam",
      "Slash",
      "Sleep Powder",
      "Sleep Talk",
      "Sludge",
      "Sludge Bomb",
      "Sludge Wave",
      "Smack Down",
      "Smart Strike",
      "Smog",
      "Smokescreen",
      "Snarl",
      "Snipe Shot",
      "Snore",
      "Snowscape",
      "Soak",
      "Soft-Boiled",
      "Solar Beam",
      "Solar Blade",
      "Spacial Rend",
      "Spark",
      "Sparkling Aria",
      "Speed Swap",
      "Spicy Extract",
      "Spikes",
      "Spiky Shield",
      "Spin Out",
      "Spirit Break",
      "Spirit Shackle",
      "Spit Up",
      "Spite",
      "Splash",
      "Spore",
      "Springtide Storm",
      "Stealth Rock",
      "Steam Eruption",
      "Steel Beam",
      "Steel Roller",
      "Steel Wing",
      "Sticky Web",
      "Stockpile",
      "Stomp",
      "Stomping Tantrum",
      "Stone Axe",
      "Stone Edge",
      "Stored Power",
      "Strange Steam",
      "Strength",
      "Strength Sap",
      "String Shot",
      "Struggle",
      "Struggle Bug",
      "Stuff Cheeks",
      "Stun Spore",
      "Sucker Punch",
      "Sunny Day",
      "Sunsteel Strike",
      "Super Fang",
      "Supercell Slam",
      "Superpower",
      "Supersonic",
      "Surf",
      "Surging Strikes",
      "Swagger",
      "Swallow",
      "Sweet Kiss",
      "Swift",
      "Switcheroo",
      "Swords Dance",
      "Synthesis",
      "Syrup Bomb",
      "Tackle",
      "Tail Glow",
      "Tail Slap",
      "Tail Whip",
      "Tailwind",
      "Take Down",
      "Take Heart",
      "Tar Shot",
      "Taunt",
      "Tearful Look",
      "Teatime",
      "Teeter Dance",
      "Teleport",
      "Temper Flare",
      "Tera Blast",
      "Tera Starstorm",
      "Terrain Pulse",
      "Thief",
      "Thrash",
      "Throat Chop",
      "Thunder",
      "Thunder Cage",
      "Thunder Fang",
      "Thunder Punch",
      "Thunder Shock",
      "Thunder Wave",
      "Thunderbolt",
      "Thunderclap",
      "Thunderous Kick",
      "Tickle",
      "Tidy Up",
      "Topsy-Turvy",
      "Torch Song",
      "Torment",
      "Toxic",
      "Toxic Spikes",
      "Toxic Thread",
      "Trailblaze",
      "Transform",
      "Tri Attack",
      "Trick",
      "Trick Room",
      "Triple Arrows",
      "Triple Axel",
      "Triple Dive",
      "Triple Kick",
      "Trop Kick",
      "Twin Beam",
      "Twister",
      "U-turn",
      "Upper Hand",
      "Uproar",
      "Vacuum Wave",
      "Venoshock",
      "Victory Dance",
      "Vine Whip",
      "Vise Grip",
      "Volt Switch",
      "Volt Tackle",
      "Water Gun",
      "Water Pledge",
      "Water Pulse",
      "Water Shuriken",
      "Water Spout",
      "Waterfall",
      "Wave Crash",
      "Weather Ball",
      "Whirlpool",
      "Whirlwind",
      "Wicked Blow",
      "Wide Guard",
      "Wild Charge",
      "Wildbolt Storm",
      "Will-O-Wisp",
      "Wing Attack",
      "Wish",
      "Withdraw",
      "Wonder Room",
      "Wood Hammer",
      "Work Up",
      "Worry Seed",
      "Wrap",
      "X-Scissor",
      "Yawn",
      "Zap Cannon",
      "Zen Headbutt",
      "Zing Zap"
    ]
  }
}
