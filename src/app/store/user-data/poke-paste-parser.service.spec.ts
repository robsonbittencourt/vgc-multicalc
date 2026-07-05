import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { PokePasteParserService } from "@store/user-data/poke-paste-parser.service"
import { Koffing } from "koffing"

describe("PokePasteParserService", () => {
  let service: PokePasteParserService
  let koffingParseSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokePasteParserService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(PokePasteParserService)
    koffingParseSpy = vi.spyOn(Koffing, "parse")
  })

  it("should parse a poke-paste with all 4 moves", async () => {
    const randomMove1 = "Behemoth Blade"
    const randomMove2 = "Sacred Sword"
    const randomMove3 = "Tera Blast"
    const randomMove4 = "Protect"

    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Zacian-Crowned",
                  ability: "Intrepid Sword",
                  nature: "Adamant",
                  item: "Rusted Sword",
                  teraType: "Ground",
                  moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                  evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Zacian-Crowned")
    expect(result[0].move1Name).toBe(randomMove1)
    expect(result[0].move2Name).toBe(randomMove2)
    expect(result[0].move3Name).toBe(randomMove3)
    expect(result[0].move4Name).toBe(randomMove4)
  })

  it("should replace missing moves with empty string when Pokémon has less than 4 moves", async () => {
    const randomMove = "Transform"

    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Ditto",
                  ability: "Imposter",
                  nature: "Bold",
                  item: "Choice Scarf",
                  teraType: "Normal",
                  moves: [randomMove],
                  evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 0, spe: 4 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Ditto")
    expect(result[0].move1Name).toBe(randomMove)
    expect(result[0].move2Name).toBe("")
    expect(result[0].move3Name).toBe("")
    expect(result[0].move4Name).toBe("")
  })

  it("should replace all moves with empty string when Pokémon has no moves", async () => {
    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Shedinja",
                  ability: "Wonder Guard",
                  nature: "Adamant",
                  item: "Focus Sash",
                  teraType: "Ghost",
                  moves: [],
                  evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Shedinja")
    expect(result[0].move1Name).toBe("")
    expect(result[0].move2Name).toBe("")
    expect(result[0].move3Name).toBe("")
    expect(result[0].move4Name).toBe("")
  })

  it("should replace missing moves with empty string when Pokémon has 2 moves", async () => {
    const randomMove1 = "Thunderbolt"
    const randomMove2 = "Protect"

    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Pikachu",
                  ability: "Lightning Rod",
                  nature: "Timid",
                  item: "Light Ball",
                  teraType: "Electric",
                  moves: [randomMove1, randomMove2],
                  evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Pikachu")
    expect(result[0].move1Name).toBe(randomMove1)
    expect(result[0].move2Name).toBe(randomMove2)
    expect(result[0].move3Name).toBe("")
    expect(result[0].move4Name).toBe("")
  })

  it("should replace missing moves with empty string when Pokémon has 3 moves", async () => {
    const randomMove1 = "Fake Out"
    const randomMove2 = "Knock Off"
    const randomMove3 = "Parting Shot"

    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Incineroar",
                  ability: "Intimidate",
                  nature: "Careful",
                  item: "Sitrus Berry",
                  teraType: "Grass",
                  moves: [randomMove1, randomMove2, randomMove3],
                  evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Incineroar")
    expect(result[0].move1Name).toBe(randomMove1)
    expect(result[0].move2Name).toBe(randomMove2)
    expect(result[0].move3Name).toBe(randomMove3)
    expect(result[0].move4Name).toBe("")
  })

  it("should use default values when Pokémon has no EVs and IVs", async () => {
    const randomMove1 = "Close Combat"
    const randomMove2 = "U-turn"
    const randomMove3 = "Aqua Jet"
    const randomMove4 = "Surging Strikes"

    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Urshifu-Rapid-Strike",
                  ability: "Unseen Fist",
                  nature: "Jolly",
                  item: "Focus Sash",
                  teraType: "Water",
                  moves: [randomMove1, randomMove2, randomMove3, randomMove4]
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Urshifu-Rapid-Strike")
    expect(result[0].evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(result[0].ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
  })

  it("should parse from URL", async () => {
    const randomMove1 = "Close Combat"
    const randomMove2 = "U-turn"
    const randomMove3 = "Aqua Jet"
    const randomMove4 = "Surging Strikes"

    const mockPokePasteText = "poke-paste from url"
    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Urshifu-Rapid-Strike",
                  ability: "Unseen Fist",
                  nature: "Jolly",
                  item: "Focus Sash",
                  teraType: "Water",
                  moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                  evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    vi.spyOn(window, "fetch").mockReturnValue(Promise.resolve(new Response(JSON.stringify({ title: "My Team", paste: mockPokePasteText }))))
    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("https://pokepast.es/12345")

    expect(window.fetch).toHaveBeenCalledWith("https://pokepast.es/12345/json")
    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Urshifu-Rapid-Strike")
    expect(result[0].move1Name).toBe(randomMove1)
    expect(result[0].move2Name).toBe(randomMove2)
    expect(result[0].move3Name).toBe(randomMove3)
    expect(result[0].move4Name).toBe(randomMove4)
  })

  it("should not use Koffing's default Untitled name", async () => {
    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              name: "Untitled",
              pokemon: [
                {
                  name: "Incineroar",
                  ability: "Intimidate",
                  nature: "Adamant",
                  item: "Sitrus Berry",
                  teraType: "Grass",
                  moves: ["Fake Out", "", "", ""],
                  evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parseTeam("poke-paste text")

    expect(result.name).toBe("")
  })

  it("should use the team title from PokePaste json", async () => {
    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Incineroar",
                  ability: "Intimidate",
                  nature: "Adamant",
                  item: "Sitrus Berry",
                  teraType: "Grass",
                  moves: ["Fake Out", "", "", ""],
                  evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    vi.spyOn(window, "fetch").mockReturnValue(Promise.resolve(new Response(JSON.stringify({ title: "World Champion Team", paste: "paste text" }))))
    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parseTeam("https://pokepast.es/12345")

    expect(window.fetch).toHaveBeenCalledWith("https://pokepast.es/12345/json")
    expect(result.name).toBe("World Champion Team")
    expect(result.pokemon[0].name).toBe("Incineroar")
  })

  it("should parse multiple Pokémon with different move counts", async () => {
    const randomMove1 = "Transform"
    const randomMove2 = "Behemoth Blade"
    const randomMove3 = "Sacred Sword"
    const randomMove4 = "Tera Blast"
    const randomMove5 = "Protect"

    const mockKoffingResult = {
      toJson: () =>
        JSON.stringify({
          teams: [
            {
              pokemon: [
                {
                  name: "Ditto",
                  ability: "Imposter",
                  nature: "Bold",
                  item: "Choice Scarf",
                  teraType: "Normal",
                  moves: [randomMove1],
                  evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 0, spe: 4 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                },
                {
                  name: "Zacian-Crowned",
                  ability: "Intrepid Sword",
                  nature: "Adamant",
                  item: "Rusted Sword",
                  teraType: "Ground",
                  moves: [randomMove2, randomMove3, randomMove4, randomMove5],
                  evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 },
                  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                }
              ]
            }
          ]
        })
    }

    koffingParseSpy.mockReturnValue(mockKoffingResult)

    const result = await service.parse("poke-paste text")

    expect(result.length).toBe(2)
    expect(result[0].name).toBe("Ditto")
    expect(result[0].move1Name).toBe(randomMove1)
    expect(result[0].move2Name).toBe("")
    expect(result[0].move3Name).toBe("")
    expect(result[0].move4Name).toBe("")
    expect(result[1].name).toBe("Zacian-Crowned")
    expect(result[1].move1Name).toBe(randomMove2)
    expect(result[1].move2Name).toBe(randomMove3)
    expect(result[1].move3Name).toBe(randomMove4)
    expect(result[1].move4Name).toBe(randomMove5)
  })

  describe("buildBoosts", () => {
    it("should set atk boost to 1 for Zacian", async () => {
      const randomMove1 = "Behemoth Blade"
      const randomMove2 = "Sacred Sword"
      const randomMove3 = "Tera Blast"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Zacian",
                    ability: "Intrepid Sword",
                    nature: "Adamant",
                    item: "Rusted Sword",
                    teraType: "Steel",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Zacian")
      expect(result[0].boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should set atk boost to 1 for Zacian-Crowned", async () => {
      const randomMove1 = "Behemoth Blade"
      const randomMove2 = "Sacred Sword"
      const randomMove3 = "Tera Blast"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Zacian-Crowned",
                    ability: "Intrepid Sword",
                    nature: "Adamant",
                    item: "Rusted Sword",
                    teraType: "Ground",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Zacian-Crowned")
      expect(result[0].boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should set def boost to 1 for Zamazenta", async () => {
      const randomMove1 = "Behemoth Bash"
      const randomMove2 = "Body Press"
      const randomMove3 = "Iron Defense"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Zamazenta",
                    ability: "Dauntless Shield",
                    nature: "Impish",
                    item: "Rusted Shield",
                    teraType: "Steel",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Zamazenta")
      expect(result[0].boosts).toEqual({ atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
    })

    it("should set def boost to 1 for Zamazenta-Crowned", async () => {
      const randomMove1 = "Behemoth Bash"
      const randomMove2 = "Body Press"
      const randomMove3 = "Iron Defense"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Zamazenta-Crowned",
                    ability: "Dauntless Shield",
                    nature: "Impish",
                    item: "Rusted Shield",
                    teraType: "Steel",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Zamazenta-Crowned")
      expect(result[0].boosts).toEqual({ atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
    })

    it("should set all boosts to 0 for other Pokémon", async () => {
      const randomMove1 = "Fake Out"
      const randomMove2 = "Knock Off"
      const randomMove3 = "Flare Blitz"
      const randomMove4 = "Parting Shot"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Incineroar",
                    ability: "Intimidate",
                    nature: "Careful",
                    item: "Sitrus Berry",
                    teraType: "Grass",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Incineroar")
      expect(result[0].boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should set all boosts to 0 for Pikachu", async () => {
      const randomMove1 = "Thunderbolt"
      const randomMove2 = "Volt Tackle"
      const randomMove3 = "Iron Tail"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Pikachu",
                    ability: "Lightning Rod",
                    nature: "Timid",
                    item: "Light Ball",
                    teraType: "Electric",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Pikachu")
      expect(result[0].boosts).toEqual({ atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })
  })

  describe("parseFromVrPaste", () => {
    it("should parse a vrpastes.com URL fetching from the backend API", async () => {
      const mockResponse = {
        title: "My VR Team",
        teams: [
          {
            species: "Incineroar",
            ability: "Intimidate",
            nature: "Careful",
            item: "Sitrus Berry",
            moves: ["Fake Out", "Knock Off", "Flare Blitz", "Parting Shot"],
            evs: { hp: 252, def: 4, spd: 252 }
          }
        ]
      }

      vi.spyOn(window, "fetch").mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))))

      const result = await service.parseTeam("https://www.vrpastes.com/XJuCYyTS")

      expect(window.fetch).toHaveBeenCalledWith("https://vrpaste-backend.vercel.app/api/paste/XJuCYyTS?lang=english")
      expect(result.name).toBe("My VR Team")
      expect(result.pokemon.length).toBe(1)
      expect(result.pokemon[0].name).toBe("Incineroar")
      expect(result.pokemon[0].move1Name).toBe("Fake Out")
      expect(result.pokemon[0].move2Name).toBe("Knock Off")
      expect(result.pokemon[0].move3Name).toBe("Flare Blitz")
      expect(result.pokemon[0].move4Name).toBe("Parting Shot")
      expect(result.pokemon[0].evs).toEqual({ hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 })
      expect(result.pokemon[0].ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    })

    it("should use default zero EVs when Pokémon has no evs field", async () => {
      const mockResponse = {
        title: "Untitled Team",
        teams: [
          {
            species: "Dragalge",
            ability: "Poison Point",
            nature: "Bold",
            item: "Dragalgite",
            moves: ["Sludge Bomb", "Icy Wind", "Dragon Tail", "Toxic"]
          }
        ]
      }

      vi.spyOn(window, "fetch").mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))))

      const result = await service.parseTeam("https://www.vrpastes.com/oZbJ92WN")

      expect(result.pokemon[0].evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should set atk boost to 1 for Zacian-Crowned from vrpastes", async () => {
      const mockResponse = {
        title: "Restricted Team",
        teams: [
          {
            species: "Zacian-Crowned",
            ability: "Intrepid Sword",
            nature: "Adamant",
            item: "Rusted Sword",
            moves: ["Behemoth Blade", "Sacred Sword", "Tera Blast", "Protect"],
            evs: { hp: 252, atk: 252, spe: 4 }
          }
        ]
      }

      vi.spyOn(window, "fetch").mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))))

      const result = await service.parseTeam("https://www.vrpastes.com/abc123")

      expect(result.pokemon[0].boosts).toEqual({ atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should use empty name when title is not present", async () => {
      const mockResponse = {
        teams: [
          {
            species: "Incineroar",
            ability: "Intimidate",
            nature: "Careful",
            item: "Sitrus Berry",
            moves: ["Fake Out", "Knock Off", "Flare Blitz", "Parting Shot"]
          }
        ]
      }

      vi.spyOn(window, "fetch").mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))))

      const result = await service.parseTeam("https://www.vrpastes.com/abc123")

      expect(result.name).toBe("")
    })
  })

  describe("adjustName", () => {
    it("should remove suffix for Rockruff with alternative form", async () => {
      const randomMove1 = "Rock Throw"
      const randomMove2 = "Stone Edge"
      const randomMove3 = "Crunch"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Rockruff-Dusk",
                    ability: "Own Tempo",
                    nature: "Jolly",
                    item: "Focus Sash",
                    teraType: "Rock",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Rockruff")
    })

    it("should remove suffix for Pikachu with alternative form", async () => {
      const randomMove1 = "Thunderbolt"
      const randomMove2 = "Volt Tackle"
      const randomMove3 = "Iron Tail"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Pikachu-Cosplay",
                    ability: "Lightning Rod",
                    nature: "Timid",
                    item: "Light Ball",
                    teraType: "Electric",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Pikachu")
    })

    it("should remove suffix for Polteageist with alternative form", async () => {
      const randomMove1 = "Shadow Ball"
      const randomMove2 = "Giga Drain"
      const randomMove3 = "Stored Power"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Polteageist-Antique",
                    ability: "Weak Armor",
                    nature: "Modest",
                    item: "White Herb",
                    teraType: "Ghost",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Polteageist")
    })

    it("should remove suffix for Vivillon with alternative form", async () => {
      const randomMove1 = "Hurricane"
      const randomMove2 = "Sleep Powder"
      const randomMove3 = "Quiver Dance"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Vivillon-Ocean",
                    ability: "Compound Eyes",
                    nature: "Timid",
                    item: "Focus Sash",
                    teraType: "Flying",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Vivillon")
    })

    it("should remove suffix for Maushold with alternative form", async () => {
      const randomMove1 = "Population Bomb"
      const randomMove2 = "Beat Up"
      const randomMove3 = "Super Fang"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Maushold-Four",
                    ability: "Friend Guard",
                    nature: "Jolly",
                    item: "Aguav Berry",
                    teraType: "Normal",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 4, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Maushold")
    })

    it("should keep full name for Pokémon not in alternative form list", async () => {
      const randomMove1 = "Behemoth Blade"
      const randomMove2 = "Sacred Sword"
      const randomMove3 = "Tera Blast"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Zacian-Crowned",
                    ability: "Intrepid Sword",
                    nature: "Adamant",
                    item: "Rusted Sword",
                    teraType: "Ground",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Zacian-Crowned")
    })

    it("should accept Aegislash-Shield form from pokepaste", async () => {
      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Aegislash-Shield",
                    ability: "Stance Change",
                    nature: "Quiet",
                    item: "Leftovers",
                    teraType: "Steel",
                    moves: ["Shadow Ball", "Flash Cannon", "Wide Guard", "King's Shield"],
                    evs: { hp: 32, atk: 0, def: 1, spa: 32, spd: 1, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Aegislash-Shield")
    })

    it("should keep full name for Pokémon without hyphen", async () => {
      const randomMove1 = "Fake Out"
      const randomMove2 = "Knock Off"
      const randomMove3 = "Flare Blitz"
      const randomMove4 = "Parting Shot"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Incineroar",
                    ability: "Intimidate",
                    nature: "Careful",
                    item: "Sitrus Berry",
                    teraType: "Grass",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Incineroar")
    })

    it("should remove suffix for Gastrodon with alternative form", async () => {
      const randomMove1 = "Earth Power"
      const randomMove2 = "Ice Beam"
      const randomMove3 = "Recover"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Gastrodon-East",
                    ability: "Storm Drain",
                    nature: "Calm",
                    item: "Rindo Berry",
                    teraType: "Water",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 252, atk: 0, def: 4, spa: 252, spd: 0, spe: 0 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Gastrodon")
    })

    it("should remove suffix for Tatsugiri with alternative form", async () => {
      const randomMove1 = "Draco Meteor"
      const randomMove2 = "Hydro Pump"
      const randomMove3 = "Icy Wind"
      const randomMove4 = "Protect"

      const mockKoffingResult = {
        toJson: () =>
          JSON.stringify({
            teams: [
              {
                pokemon: [
                  {
                    name: "Tatsugiri-Droopy",
                    ability: "Commander",
                    nature: "Modest",
                    item: "Focus Sash",
                    teraType: "Dragon",
                    moves: [randomMove1, randomMove2, randomMove3, randomMove4],
                    evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
                    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
                  }
                ]
              }
            ]
          })
      }

      koffingParseSpy.mockReturnValue(mockKoffingResult)

      const result = await service.parse("poke-paste text")

      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Tatsugiri")
    })
  })
})
