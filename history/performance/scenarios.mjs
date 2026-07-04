export const ITERATIONS = 40000
export const MULTI_ITERATIONS = 15000

export const SINGLE_SCENARIOS = [
  { attacker: "Raging Bolt", move: "Thunderbolt", defender: "Flutter Mane", attackerOpts: { item: "Booster Energy", nature: "Modest", evs: { spa: 252 } } },
  { attacker: "Flutter Mane", move: "Moonblast", defender: "Raging Bolt", attackerOpts: { nature: "Timid", evs: { spa: 252, spe: 252 } } },
  { attacker: "Rillaboom", move: "Grassy Glide", defender: "Urshifu-Rapid-Strike", attackerOpts: { item: "Assault Vest", nature: "Adamant", evs: { atk: 252 } } },
  { attacker: "Incineroar", move: "Flare Blitz", defender: "Amoonguss", attackerOpts: { nature: "Adamant", evs: { atk: 252 } } },
  { attacker: "Calyrex-Shadow", move: "Astral Barrage", defender: "Zamazenta-Crowned", attackerOpts: { item: "Choice Specs", nature: "Timid", evs: { spa: 252 } } },
  { attacker: "Miraidon", move: "Electro Drift", defender: "Terapagos-Terastal", attackerOpts: { nature: "Modest", evs: { spa: 252 } } }
]

export const MULTI_SCENARIOS = [
  {
    attackers: [
      { name: "Raging Bolt", move: "Thunderclap", opts: { item: "Booster Energy" } },
      { name: "Rillaboom", move: "Wood Hammer", opts: { item: "Assault Vest" } }
    ],
    defender: "Flutter Mane"
  },
  {
    attackers: [
      { name: "Calyrex-Shadow", move: "Astral Barrage", opts: { item: "Choice Specs" } },
      { name: "Incineroar", move: "Knock Off", opts: {} }
    ],
    defender: "Zamazenta-Crowned"
  }
]
