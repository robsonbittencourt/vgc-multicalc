import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { TeamsService } from "@app/features/team/teams.service"
import { CalcStore } from "@store/calc-store"
import { SnackbarService } from "@app/services/snackbar.service"
import { ExportPokeService } from "@store/user-data/export-poke.service"
import { PdfExportService } from "@store/user-data/pdf-export.service"
import { Team, TeamMember, Pokemon } from "@multicalc/model"

describe("TeamsService", () => {
  let service: TeamsService
  let store: CalcStore
  let snackBar: SnackbarService
  let exportPokeService: ExportPokeService
  let pdfExportService: PdfExportService

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [TeamsService, CalcStore, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(TeamsService)
    store = TestBed.inject(CalcStore)
    snackBar = TestBed.inject(SnackbarService)
    exportPokeService = TestBed.inject(ExportPokeService)
    pdfExportService = TestBed.inject(PdfExportService)

    vi.spyOn(snackBar, "open").mockImplementation(vi.fn())
    vi.spyOn(exportPokeService, "export").mockResolvedValue(undefined)
    vi.spyOn(pdfExportService, "export").mockImplementation(vi.fn())
  })

  describe("activateTeam", () => {
    it("should activate the given team and return the id of its active Pokémon", () => {
      const teamX = new Team("123", false, "Team X", [new TeamMember(new Pokemon("Pikachu", { id: "1" }), true), new TeamMember(new Pokemon("Raichu", { id: "2" }), false)])
      store.updateTeams([teamX])

      const result = service.activateTeam(teamX)

      expect(store.team().id).toBe("123")
      expect(result).toBe("1")
    })
  })

  describe("activateSecondTeam", () => {
    it("should activate the second team and return it when selection is allowed and the active team is not empty", () => {
      const teamX = new Team("123", false, "Team X", [new TeamMember(new Pokemon("Pikachu"))])
      let secondTeamId: string | null = null

      const result = service.activateSecondTeam(teamX, true, id => (secondTeamId = id))

      expect(result).toBe(teamX)
      expect(secondTeamId).toBe("123")
    })

    it("should return null when second team selection is not allowed", () => {
      const teamX = new Team("123", false, "Team X", [new TeamMember(new Pokemon("Pikachu"))])

      const result = service.activateSecondTeam(teamX, false, vi.fn())

      expect(result).toBeNull()
    })

    it("should return null when the active team is empty", () => {
      store.updateTeams([new Team("1", true, "Team 1", [])])
      const teamX = new Team("123", false, "Team X", [new TeamMember(new Pokemon("Pikachu"))])

      const result = service.activateSecondTeam(teamX, true, vi.fn())

      expect(result).toBeNull()
    })
  })

  describe("updateTeamName", () => {
    it("should update the active team name", () => {
      service.updateTeamName("Renamed Team")

      expect(store.team().name).toBe("Renamed Team")
    })
  })

  describe("export", () => {
    it("should export the team pokemon using the current SPS mode", () => {
      const team = store.team()

      service.export(team)

      expect(exportPokeService.export).toHaveBeenCalledWith(
        team.name,
        team.teamMembers.map(tm => tm.pokemon),
        store.useSpsMode()
      )
    })
  })

  describe("exportPdf", () => {
    it("should delegate to the pdf export service", () => {
      const team = store.team()

      service.exportPdf(team)

      expect(pdfExportService.export).toHaveBeenCalledWith(team)
    })
  })

  describe("addNewTeam", () => {
    it("should activate the last team instead of creating a new one when it is already empty", () => {
      const initialCount = store.teams().length

      const id = service.addNewTeam()

      expect(store.teams().length).toBe(initialCount)
      expect(store.team().id).toBe(store.teams()[initialCount - 1].id)
      expect(id).toBeUndefined()
    })

    it("should create a new team when the last team is not empty", () => {
      store.updateTeams([new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))])])

      const id = service.addNewTeam()

      expect(store.teams().length).toBe(2)
      expect(store.teams()[1].name).toBe("Team 2")
      expect(store.team().id).toBe(store.teams()[1].id)
      expect(id).toBeUndefined()
    })

    it("should create the first team when there are no teams at all", () => {
      store.updateTeams([])

      const id = service.addNewTeam()

      expect(store.teams().length).toBe(1)
      expect(store.teams()[0].name).toBe("Team 1")
      expect(id).toBeUndefined()
    })
  })

  describe("deleteTeam", () => {
    it("should replace the active team with an empty one keeping the same slot on desktop", () => {
      store.updateTeams([new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))]), new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Raichu"))])])

      service.deleteTeam(false)

      expect(store.teams().length).toBe(2)
      expect(store.teams()[0].isEmpty()).toBe(true)
      expect(store.teams()[0].active).toBe(true)
      expect(snackBar.open).toHaveBeenCalledWith("Team deleted")
    })

    it("should remove the active team on mobile and activate the first remaining team", () => {
      store.updateTeams([new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))]), new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Raichu"))])])

      service.deleteTeam(true)

      expect(store.teams().length).toBe(1)
      expect(store.teams()[0].id).toBe("2")
      expect(store.teams()[0].active).toBe(true)
      expect(snackBar.open).not.toHaveBeenCalled()
    })

    it("should create a new empty team on mobile when deleting the only remaining team", () => {
      store.updateTeams([new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))])])

      service.deleteTeam(true)

      expect(store.teams().length).toBe(1)
      expect(store.teams()[0].isEmpty()).toBe(true)
      expect(store.teams()[0].active).toBe(true)
    })
  })

  describe("pokemonImported", () => {
    it("should replace the first empty team slot with the imported Pokémon on desktop", () => {
      store.updateTeams([new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))]), new Team("2", false, "Team 2", [])])

      const result = service.pokemonImported(new Pokemon("Raichu"), false)

      expect(store.teams()[1].teamMembers[0].pokemon.name).toBe("Raichu")
      expect(store.teams()[1].name).toBe("Team 2")
      expect(result.activePokemonId).toBe(store.teams()[1].teamMembers[0].pokemon.id)
      expect(result.teamIndex).toBe(1)
      expect(snackBar.open).toHaveBeenCalledWith("Team imported from PokePaste")
    })

    it("should use the provided team name when importing on desktop", () => {
      store.updateTeams([new Team("1", false, "Team 1", [])])

      service.pokemonImported(new Pokemon("Raichu"), false, "Custom Name")

      expect(store.teams()[0].name).toBe("Custom Name")
    })

    it("should import a list of Pokémon into a new team on mobile without a snackbar", () => {
      const initialCount = store.teams().length

      const result = service.pokemonImported([new Pokemon("Pikachu"), new Pokemon("Raichu")], true)

      expect(store.teams().length).toBe(initialCount + 1)
      const newTeam = store.teams()[store.teams().length - 1]
      expect(newTeam.teamMembers.map(tm => tm.pokemon.name)).toEqual(["Pikachu", "Raichu"])
      expect(newTeam.name).toBe(`Team ${initialCount + 1}`)
      expect(result.teamIndex).toBe(initialCount)
      expect(snackBar.open).not.toHaveBeenCalled()
    })

    it("should use the provided team name when importing on mobile", () => {
      service.pokemonImported(new Pokemon("Pikachu"), true, "Mobile Import")

      const newTeam = store.teams()[store.teams().length - 1]
      expect(newTeam.name).toBe("Mobile Import")
    })
  })

  describe("ensureCorrectTeamCount", () => {
    it("should add teams to reach a multiple of 4 when the count is not already a multiple of 4", () => {
      store.updateTeams([new Team("1", true, "Team 1", [])])

      service.ensureCorrectTeamCount()

      expect(store.teams().length).toBe(4)
    })

    it("should add 4 more teams when the count is a multiple of 4 but fewer than 2 are empty", () => {
      store.updateTeams([
        new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))]),
        new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Raichu"))]),
        new Team("3", false, "Team 3", [new TeamMember(new Pokemon("Clefairy"))]),
        new Team("4", false, "Team 4", [])
      ])

      service.ensureCorrectTeamCount()

      expect(store.teams().length).toBe(8)
    })

    it("should not add any team when the count is a multiple of 4 and at least 2 are empty", () => {
      store.updateTeams([new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))]), new Team("2", false, "Team 2", []), new Team("3", false, "Team 3", []), new Team("4", false, "Team 4", [new TeamMember(new Pokemon("Raichu"))])])

      service.ensureCorrectTeamCount()

      expect(store.teams().length).toBe(4)
    })
  })

  describe("moveEmptyListsToEnd", () => {
    it("should return 0 when both teams have the same emptiness", () => {
      const a = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))])
      const b = new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Raichu"))])

      expect(service.moveEmptyListsToEnd(a, b)).toBe(0)
    })

    it("should return 1 when the first team is empty and the second is not", () => {
      const a = new Team("1", true, "Team 1", [])
      const b = new Team("2", false, "Team 2", [new TeamMember(new Pokemon("Raichu"))])

      expect(service.moveEmptyListsToEnd(a, b)).toBe(1)
    })

    it("should return -1 when the first team is not empty and the second is", () => {
      const a = new Team("1", true, "Team 1", [new TeamMember(new Pokemon("Pikachu"))])
      const b = new Team("2", false, "Team 2", [])

      expect(service.moveEmptyListsToEnd(a, b)).toBe(-1)
    })
  })

  describe("cleanTeamsInChunks", () => {
    const buildTeams = (pattern: boolean[]): Team[] => pattern.map((hasMember, i) => new Team(`${i}`, i === 0, `Team ${i + 1}`, hasMember ? [new TeamMember(new Pokemon("Pikachu"))] : []))

    it("should remove an all-empty chunk that has a following chunk", () => {
      const teams = buildTeams([false, false, false, false, true, false, false, false])

      const result = service.cleanTeamsInChunks(teams)

      expect(result.length).toBe(4)
      expect(result[0].id).toBe("4")
    })

    it("should remove an all-empty chunk when the previous chunk has an empty team", () => {
      const teams = buildTeams([true, false, false, false, false, false, false, false])

      const result = service.cleanTeamsInChunks(teams)

      expect(result.length).toBe(4)
    })

    it("should keep an all-empty last chunk when there is no following chunk and the previous chunk has no empty team", () => {
      const teams = buildTeams([true, true, true, true, false, false, false, false])

      const result = service.cleanTeamsInChunks(teams)

      expect(result.length).toBe(8)
    })

    it("should keep a chunk that is not all empty", () => {
      const teams = buildTeams([true, false, false, false])

      const result = service.cleanTeamsInChunks(teams)

      expect(result.length).toBe(4)
    })
  })
})
