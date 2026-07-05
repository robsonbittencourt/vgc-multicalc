import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { Blaze } from "./blaze"
import { DragonsMaw } from "./dragons-maw"
import { FlashFire } from "./flash-fire"
import { Guts } from "./guts"
import { HadronEngine } from "./hadron-engine"
import { HugePower } from "./huge-power"
import { Minus } from "./minus"
import { OrichalcumPulse } from "./orichalcum-pulse"
import { Overgrow } from "./overgrow"
import { Paradox } from "./paradox"
import { Plus } from "./plus"
import { PurePower } from "./pure-power"
import { RockyPayload } from "./rocky-payload"
import { SlowStart } from "./slow-start"
import { SolarPower } from "./solar-power"
import { Stakeout } from "./stakeout"
import { Swarm } from "./swarm"
import { TabletsOfRuin } from "./tablets-of-ruin"
import { Torrent } from "./torrent"
import { Transistor } from "./transistor"
import { VesselOfRuin } from "./vessel-of-ruin"
import { WaterBubble } from "./water-bubble"

export interface OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, move: Move, field: Field): boolean
  getModifier(): number
}

export const abilityStrategies: OffensiveAbilityStrategy[] = [
  new Blaze(),
  new DragonsMaw(),
  new FlashFire(),
  new Guts(),
  new HadronEngine(),
  new HugePower(),
  new Minus(),
  new OrichalcumPulse(),
  new Overgrow(),
  new Paradox(),
  new Plus(),
  new PurePower(),
  new RockyPayload(),
  new SlowStart(),
  new SolarPower(),
  new Stakeout(),
  new Swarm(),
  new TabletsOfRuin(),
  new Torrent(),
  new Transistor(),
  new VesselOfRuin(),
  new WaterBubble()
]
