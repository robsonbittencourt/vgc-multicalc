import { TypeEffectivenessService } from "./type-effectiveness.service"

describe("TypeEffectivenessService", () => {
  let service: TypeEffectivenessService

  beforeEach(() => {
    service = new TypeEffectivenessService()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return 2x effectiveness for Fire against Grass", () => {
    const effectiveness = service.getEffectiveness("Fire", "Grass")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Fire against Water", () => {
    const effectiveness = service.getEffectiveness("Fire", "Water")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0 (immune) for Normal against Ghost", () => {
    const effectiveness = service.getEffectiveness("Normal", "Ghost")

    expect(effectiveness).toBe(0)
  })

  it("should return 4x effectiveness for Ice against Ground/Flying", () => {
    const effectiveness = service.getEffectiveness("Ice", "Ground", "Flying")

    expect(effectiveness).toBe(4)
  })

  it("should return 0.5x effectiveness for Fire against Water/Ground", () => {
    const effectiveness = service.getEffectiveness("Fire", "Water", "Ground")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 1x effectiveness for Fire against Ground", () => {
    const effectiveness = service.getEffectiveness("Fire", "Ground")

    expect(effectiveness).toBe(1)
  })

  it("should return 0.25x effectiveness for Fire against Water/Rock", () => {
    const effectiveness = service.getEffectiveness("Fire", "Water", "Rock")

    expect(effectiveness).toBe(0.25)
  })

  it("should format effectiveness correctly", () => {
    expect(service.formatEffectiveness(0)).toBe("immune")
    expect(service.formatEffectiveness(0.25)).toBe("1/4")
    expect(service.formatEffectiveness(0.5)).toBe("1/2")
    expect(service.formatEffectiveness(1)).toBe("")
    expect(service.formatEffectiveness(2)).toBe("2x")
    expect(service.formatEffectiveness(4)).toBe("4x")
  })

  it("should identify weaknesses correctly", () => {
    expect(service.isWeakness(2)).toBeTrue()
    expect(service.isWeakness(4)).toBeTrue()
    expect(service.isWeakness(1)).toBeFalse()
    expect(service.isWeakness(0.5)).toBeFalse()
  })

  it("should identify resistances correctly", () => {
    expect(service.isResistance(0.25)).toBeTrue()
    expect(service.isResistance(0.5)).toBeTrue()
    expect(service.isResistance(1)).toBeFalse()
    expect(service.isResistance(2)).toBeFalse()
  })

  it("should identify immunities correctly", () => {
    expect(service.isImmune(0)).toBeTrue()
    expect(service.isImmune(1)).toBeFalse()
    expect(service.isImmune(2)).toBeFalse()
  })

  it("should return 2x effectiveness for Water against Fire", () => {
    const effectiveness = service.getEffectiveness("Water", "Fire")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Water against Water", () => {
    const effectiveness = service.getEffectiveness("Water", "Water")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Water against Ground", () => {
    const effectiveness = service.getEffectiveness("Water", "Ground")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Water against Rock", () => {
    const effectiveness = service.getEffectiveness("Water", "Rock")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Water against Grass", () => {
    const effectiveness = service.getEffectiveness("Water", "Grass")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Water against Dragon", () => {
    const effectiveness = service.getEffectiveness("Water", "Dragon")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 1x effectiveness for Water against Normal", () => {
    const effectiveness = service.getEffectiveness("Water", "Normal")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Electric", () => {
    const effectiveness = service.getEffectiveness("Water", "Electric")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Ice", () => {
    const effectiveness = service.getEffectiveness("Water", "Ice")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Fighting", () => {
    const effectiveness = service.getEffectiveness("Water", "Fighting")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Poison", () => {
    const effectiveness = service.getEffectiveness("Water", "Poison")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Flying", () => {
    const effectiveness = service.getEffectiveness("Water", "Flying")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Psychic", () => {
    const effectiveness = service.getEffectiveness("Water", "Psychic")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Bug", () => {
    const effectiveness = service.getEffectiveness("Water", "Bug")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Ghost", () => {
    const effectiveness = service.getEffectiveness("Water", "Ghost")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Steel", () => {
    const effectiveness = service.getEffectiveness("Water", "Steel")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Dark", () => {
    const effectiveness = service.getEffectiveness("Water", "Dark")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Water against Fairy", () => {
    const effectiveness = service.getEffectiveness("Water", "Fairy")

    expect(effectiveness).toBe(1)
  })

  it("should return 2x effectiveness for Grass against Water", () => {
    const effectiveness = service.getEffectiveness("Grass", "Water")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Grass against Ground", () => {
    const effectiveness = service.getEffectiveness("Grass", "Ground")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Grass against Rock", () => {
    const effectiveness = service.getEffectiveness("Grass", "Rock")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Grass against Fire", () => {
    const effectiveness = service.getEffectiveness("Grass", "Fire")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Grass against Grass", () => {
    const effectiveness = service.getEffectiveness("Grass", "Grass")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Grass against Poison", () => {
    const effectiveness = service.getEffectiveness("Grass", "Poison")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Grass against Flying", () => {
    const effectiveness = service.getEffectiveness("Grass", "Flying")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Grass against Bug", () => {
    const effectiveness = service.getEffectiveness("Grass", "Bug")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Grass against Dragon", () => {
    const effectiveness = service.getEffectiveness("Grass", "Dragon")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Grass against Steel", () => {
    const effectiveness = service.getEffectiveness("Grass", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Electric against Water", () => {
    const effectiveness = service.getEffectiveness("Electric", "Water")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Electric against Flying", () => {
    const effectiveness = service.getEffectiveness("Electric", "Flying")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Electric against Ground", () => {
    const effectiveness = service.getEffectiveness("Electric", "Ground")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.5x effectiveness for Electric against Grass", () => {
    const effectiveness = service.getEffectiveness("Electric", "Grass")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Electric against Electric", () => {
    const effectiveness = service.getEffectiveness("Electric", "Electric")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Electric against Dragon", () => {
    const effectiveness = service.getEffectiveness("Electric", "Dragon")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Ice against Grass", () => {
    const effectiveness = service.getEffectiveness("Ice", "Grass")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ice against Ground", () => {
    const effectiveness = service.getEffectiveness("Ice", "Ground")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ice against Flying", () => {
    const effectiveness = service.getEffectiveness("Ice", "Flying")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ice against Dragon", () => {
    const effectiveness = service.getEffectiveness("Ice", "Dragon")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Ice against Fire", () => {
    const effectiveness = service.getEffectiveness("Ice", "Fire")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Ice against Water", () => {
    const effectiveness = service.getEffectiveness("Ice", "Water")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Ice against Ice", () => {
    const effectiveness = service.getEffectiveness("Ice", "Ice")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Ice against Steel", () => {
    const effectiveness = service.getEffectiveness("Ice", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Fighting against Normal", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Normal")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Fighting against Ice", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Ice")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Fighting against Rock", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Rock")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Fighting against Steel", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Steel")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Fighting against Dark", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Dark")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Fighting against Ghost", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Ghost")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.5x effectiveness for Fighting against Poison", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Poison")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Fighting against Flying", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Flying")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Fighting against Psychic", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Psychic")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Fighting against Bug", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Bug")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Fighting against Fairy", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Fairy")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Poison against Grass", () => {
    const effectiveness = service.getEffectiveness("Poison", "Grass")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Poison against Fairy", () => {
    const effectiveness = service.getEffectiveness("Poison", "Fairy")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Poison against Steel", () => {
    const effectiveness = service.getEffectiveness("Poison", "Steel")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.5x effectiveness for Poison against Poison", () => {
    const effectiveness = service.getEffectiveness("Poison", "Poison")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Poison against Ground", () => {
    const effectiveness = service.getEffectiveness("Poison", "Ground")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Poison against Rock", () => {
    const effectiveness = service.getEffectiveness("Poison", "Rock")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Poison against Ghost", () => {
    const effectiveness = service.getEffectiveness("Poison", "Ghost")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Ground against Fire", () => {
    const effectiveness = service.getEffectiveness("Ground", "Fire")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ground against Electric", () => {
    const effectiveness = service.getEffectiveness("Ground", "Electric")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ground against Poison", () => {
    const effectiveness = service.getEffectiveness("Ground", "Poison")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ground against Rock", () => {
    const effectiveness = service.getEffectiveness("Ground", "Rock")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ground against Steel", () => {
    const effectiveness = service.getEffectiveness("Ground", "Steel")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Ground against Flying", () => {
    const effectiveness = service.getEffectiveness("Ground", "Flying")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.5x effectiveness for Ground against Grass", () => {
    const effectiveness = service.getEffectiveness("Ground", "Grass")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Ground against Bug", () => {
    const effectiveness = service.getEffectiveness("Ground", "Bug")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Flying against Grass", () => {
    const effectiveness = service.getEffectiveness("Flying", "Grass")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Flying against Fighting", () => {
    const effectiveness = service.getEffectiveness("Flying", "Fighting")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Flying against Bug", () => {
    const effectiveness = service.getEffectiveness("Flying", "Bug")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Flying against Electric", () => {
    const effectiveness = service.getEffectiveness("Flying", "Electric")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Flying against Rock", () => {
    const effectiveness = service.getEffectiveness("Flying", "Rock")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Flying against Steel", () => {
    const effectiveness = service.getEffectiveness("Flying", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Psychic against Fighting", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Fighting")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Psychic against Poison", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Poison")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Psychic against Dark", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Dark")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.5x effectiveness for Psychic against Psychic", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Psychic")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Psychic against Steel", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Bug against Grass", () => {
    const effectiveness = service.getEffectiveness("Bug", "Grass")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Bug against Psychic", () => {
    const effectiveness = service.getEffectiveness("Bug", "Psychic")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Bug against Dark", () => {
    const effectiveness = service.getEffectiveness("Bug", "Dark")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Bug against Fire", () => {
    const effectiveness = service.getEffectiveness("Bug", "Fire")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Bug against Fighting", () => {
    const effectiveness = service.getEffectiveness("Bug", "Fighting")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Bug against Poison", () => {
    const effectiveness = service.getEffectiveness("Bug", "Poison")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Bug against Flying", () => {
    const effectiveness = service.getEffectiveness("Bug", "Flying")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Bug against Ghost", () => {
    const effectiveness = service.getEffectiveness("Bug", "Ghost")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Bug against Steel", () => {
    const effectiveness = service.getEffectiveness("Bug", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Bug against Fairy", () => {
    const effectiveness = service.getEffectiveness("Bug", "Fairy")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Rock against Fire", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fire")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Rock against Ice", () => {
    const effectiveness = service.getEffectiveness("Rock", "Ice")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Rock against Flying", () => {
    const effectiveness = service.getEffectiveness("Rock", "Flying")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Rock against Bug", () => {
    const effectiveness = service.getEffectiveness("Rock", "Bug")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Rock against Fighting", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fighting")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Rock against Ground", () => {
    const effectiveness = service.getEffectiveness("Rock", "Ground")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Rock against Steel", () => {
    const effectiveness = service.getEffectiveness("Rock", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0 (immune) for Ghost against Normal", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Normal")

    expect(effectiveness).toBe(0)
  })

  it("should return 2x effectiveness for Ghost against Psychic", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Psychic")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Ghost against Ghost", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Ghost")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Ghost against Dark", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Dark")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Dragon against Dragon", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Dragon")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Dragon against Fairy", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Fairy")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.5x effectiveness for Dragon against Steel", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Steel against Ice", () => {
    const effectiveness = service.getEffectiveness("Steel", "Ice")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Steel against Rock", () => {
    const effectiveness = service.getEffectiveness("Steel", "Rock")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Steel against Fairy", () => {
    const effectiveness = service.getEffectiveness("Steel", "Fairy")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Steel against Fire", () => {
    const effectiveness = service.getEffectiveness("Steel", "Fire")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Steel against Water", () => {
    const effectiveness = service.getEffectiveness("Steel", "Water")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Steel against Electric", () => {
    const effectiveness = service.getEffectiveness("Steel", "Electric")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Steel against Steel", () => {
    const effectiveness = service.getEffectiveness("Steel", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Dark against Psychic", () => {
    const effectiveness = service.getEffectiveness("Dark", "Psychic")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Dark against Ghost", () => {
    const effectiveness = service.getEffectiveness("Dark", "Ghost")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Dark against Fighting", () => {
    const effectiveness = service.getEffectiveness("Dark", "Fighting")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Dark against Dark", () => {
    const effectiveness = service.getEffectiveness("Dark", "Dark")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Dark against Fairy", () => {
    const effectiveness = service.getEffectiveness("Dark", "Fairy")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 2x effectiveness for Fairy against Fighting", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Fighting")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Fairy against Dragon", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Dragon")

    expect(effectiveness).toBe(2)
  })

  it("should return 2x effectiveness for Fairy against Dark", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Dark")

    expect(effectiveness).toBe(2)
  })

  it("should return 0.5x effectiveness for Fairy against Fire", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Fire")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Fairy against Poison", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Poison")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.5x effectiveness for Fairy against Steel", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Steel")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 4x effectiveness for Fire against Bug/Grass", () => {
    const effectiveness = service.getEffectiveness("Fire", "Bug", "Grass")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Ice against Ground/Flying", () => {
    const effectiveness = service.getEffectiveness("Ice", "Ground", "Flying")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Rock against Fire/Bug", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fire", "Bug")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Rock against Ice/Flying", () => {
    const effectiveness = service.getEffectiveness("Rock", "Ice", "Flying")

    expect(effectiveness).toBe(4)
  })

  it("should return 0.25x effectiveness for Fire against Water/Rock", () => {
    const effectiveness = service.getEffectiveness("Fire", "Water", "Rock")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.5x effectiveness for Fire against Water/Ground", () => {
    const effectiveness = service.getEffectiveness("Fire", "Water", "Ground")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.25x effectiveness for Grass against Fire/Flying", () => {
    const effectiveness = service.getEffectiveness("Grass", "Fire", "Flying")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Grass against Fire/Bug", () => {
    const effectiveness = service.getEffectiveness("Grass", "Fire", "Bug")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0 (immune) for Electric against Grass/Ground", () => {
    const effectiveness = service.getEffectiveness("Electric", "Grass", "Ground")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.25x effectiveness for Ice against Fire/Water", () => {
    const effectiveness = service.getEffectiveness("Ice", "Fire", "Water")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Ice against Fire/Steel", () => {
    const effectiveness = service.getEffectiveness("Ice", "Fire", "Steel")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Fighting against Poison/Flying", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Poison", "Flying")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Fighting against Psychic/Flying", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Psychic", "Flying")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Poison against Poison/Ground", () => {
    const effectiveness = service.getEffectiveness("Poison", "Poison", "Ground")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0 (immune) for Poison against Steel/Ground", () => {
    const effectiveness = service.getEffectiveness("Poison", "Steel", "Ground")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Ground against Grass/Flying", () => {
    const effectiveness = service.getEffectiveness("Ground", "Grass", "Flying")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.25x effectiveness for Flying against Electric/Rock", () => {
    const effectiveness = service.getEffectiveness("Flying", "Electric", "Rock")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Psychic against Psychic/Steel", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Psychic", "Steel")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Bug against Fire/Flying", () => {
    const effectiveness = service.getEffectiveness("Bug", "Fire", "Flying")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.5x effectiveness for Bug against Fire/Rock", () => {
    const effectiveness = service.getEffectiveness("Bug", "Fire", "Rock")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0.25x effectiveness for Rock against Fighting/Ground", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fighting", "Ground")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Rock against Fighting/Steel", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fighting", "Steel")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 1x effectiveness for Ghost against Dark/Ghost", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Dark", "Ghost")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Dragon against Dragon/Steel", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Dragon", "Steel")

    expect(effectiveness).toBe(1)
  })

  it("should return 0 (immune) for Dragon against Fairy/Steel", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Fairy", "Steel")

    expect(effectiveness).toBe(0)
  })

  it("should return 0.25x effectiveness for Steel against Fire/Water", () => {
    const effectiveness = service.getEffectiveness("Steel", "Fire", "Water")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Steel against Fire/Electric", () => {
    const effectiveness = service.getEffectiveness("Steel", "Fire", "Electric")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Dark against Fighting/Dark", () => {
    const effectiveness = service.getEffectiveness("Dark", "Fighting", "Dark")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Dark against Fighting/Fairy", () => {
    const effectiveness = service.getEffectiveness("Dark", "Fighting", "Fairy")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Fairy against Fire/Poison", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Fire", "Poison")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 0.25x effectiveness for Fairy against Poison/Steel", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Poison", "Steel")

    expect(effectiveness).toBe(0.25)
  })

  it("should return 1x effectiveness for Normal against Normal/Fire", () => {
    const effectiveness = service.getEffectiveness("Normal", "Normal", "Fire")

    expect(effectiveness).toBe(1)
  })

  it("should return 1x effectiveness for Fire against Normal/Water", () => {
    const effectiveness = service.getEffectiveness("Fire", "Normal", "Water")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 1x effectiveness for Water against Fire/Grass", () => {
    const effectiveness = service.getEffectiveness("Water", "Fire", "Grass")

    expect(effectiveness).toBe(1)
  })

  it("should return 2x effectiveness for Grass against Water/Electric", () => {
    const effectiveness = service.getEffectiveness("Grass", "Water", "Electric")

    expect(effectiveness).toBe(2)
  })

  it("should return 1x effectiveness for Electric against Water/Grass", () => {
    const effectiveness = service.getEffectiveness("Electric", "Water", "Grass")

    expect(effectiveness).toBe(1)
  })

  it("should return 0.5x effectiveness for Ice against Water/Normal", () => {
    const effectiveness = service.getEffectiveness("Ice", "Water", "Normal")

    expect(effectiveness).toBe(0.5)
  })

  it("should return 0 (immune) for Fighting against Normal/Ghost", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Normal", "Ghost")

    expect(effectiveness).toBe(0)
  })

  it("should return 2x effectiveness for Poison against Grass/Normal", () => {
    const effectiveness = service.getEffectiveness("Poison", "Grass", "Normal")

    expect(effectiveness).toBe(2)
  })

  it("should return 0 (immune) for Ground against Electric/Flying", () => {
    const effectiveness = service.getEffectiveness("Ground", "Electric", "Flying")

    expect(effectiveness).toBe(0)
  })

  it("should return 1x effectiveness for Flying against Grass/Electric", () => {
    const effectiveness = service.getEffectiveness("Flying", "Grass", "Electric")

    expect(effectiveness).toBe(1)
  })

  it("should return 0 (immune) for Psychic against Fighting/Dark", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Fighting", "Dark")

    expect(effectiveness).toBe(0)
  })

  it("should return 4x effectiveness for Bug against Grass/Psychic", () => {
    const effectiveness = service.getEffectiveness("Bug", "Grass", "Psychic")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Rock against Fire/Ice", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fire", "Ice")

    expect(effectiveness).toBe(4)
  })

  it("should return 0 (immune) for Ghost against Normal/Psychic", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Normal", "Psychic")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Dragon against Dragon/Fairy", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Dragon", "Fairy")

    expect(effectiveness).toBe(0)
  })

  it("should return 4x effectiveness for Steel against Ice/Rock", () => {
    const effectiveness = service.getEffectiveness("Steel", "Ice", "Rock")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Dark against Psychic/Ghost", () => {
    const effectiveness = service.getEffectiveness("Dark", "Psychic", "Ghost")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Fairy against Fighting/Dragon", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Fighting", "Dragon")

    expect(effectiveness).toBe(4)
  })

  it("should return 0 (immune) for Normal against Ghost/Steel", () => {
    const effectiveness = service.getEffectiveness("Normal", "Ghost", "Steel")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Electric against Ground/Rock", () => {
    const effectiveness = service.getEffectiveness("Electric", "Ground", "Rock")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Fighting against Ghost/Normal", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Ghost", "Normal")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Ground against Flying/Electric", () => {
    const effectiveness = service.getEffectiveness("Ground", "Flying", "Electric")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Poison against Steel/Ground", () => {
    const effectiveness = service.getEffectiveness("Poison", "Steel", "Ground")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Psychic against Dark/Psychic", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Dark", "Psychic")

    expect(effectiveness).toBe(0)
  })

  it("should return 0 (immune) for Dragon against Fairy/Dragon", () => {
    const effectiveness = service.getEffectiveness("Dragon", "Fairy", "Dragon")

    expect(effectiveness).toBe(0)
  })

  it("should return 4x effectiveness for Fire against Steel/Grass", () => {
    const effectiveness = service.getEffectiveness("Fire", "Steel", "Grass")

    expect(effectiveness).toBe(4)
  })

  it("should return 2x effectiveness for Water against Fire/Rock", () => {
    const effectiveness = service.getEffectiveness("Water", "Fire", "Rock")

    expect(effectiveness).toBe(4)
  })

  it("should return 2x effectiveness for Grass against Water/Ground", () => {
    const effectiveness = service.getEffectiveness("Grass", "Water", "Ground")

    expect(effectiveness).toBe(4)
  })

  it("should return 2x effectiveness for Electric against Water/Flying", () => {
    const effectiveness = service.getEffectiveness("Electric", "Water", "Flying")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Ice against Grass/Dragon", () => {
    const effectiveness = service.getEffectiveness("Ice", "Grass", "Dragon")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Fighting against Normal/Dark", () => {
    const effectiveness = service.getEffectiveness("Fighting", "Normal", "Dark")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Poison against Grass/Fairy", () => {
    const effectiveness = service.getEffectiveness("Poison", "Grass", "Fairy")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Ground against Fire/Electric", () => {
    const effectiveness = service.getEffectiveness("Ground", "Fire", "Electric")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Flying against Grass/Fighting", () => {
    const effectiveness = service.getEffectiveness("Flying", "Grass", "Fighting")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Psychic against Fighting/Poison", () => {
    const effectiveness = service.getEffectiveness("Psychic", "Fighting", "Poison")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Bug against Grass/Psychic", () => {
    const effectiveness = service.getEffectiveness("Bug", "Grass", "Psychic")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Rock against Fire/Flying", () => {
    const effectiveness = service.getEffectiveness("Rock", "Fire", "Flying")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Ghost against Psychic/Ghost", () => {
    const effectiveness = service.getEffectiveness("Ghost", "Psychic", "Ghost")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Dark against Psychic/Ghost", () => {
    const effectiveness = service.getEffectiveness("Dark", "Psychic", "Ghost")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Fairy against Fighting/Dragon", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Fighting", "Dragon")

    expect(effectiveness).toBe(4)
  })

  it("should return 4x effectiveness for Fairy against Dark/Dragon", () => {
    const effectiveness = service.getEffectiveness("Fairy", "Dark", "Dragon")

    expect(effectiveness).toBe(4)
  })
})
