import { TestBed } from "@angular/core/testing"
import { TableDataFilterService } from "./table-data-filter.service"
import { ActiveFilter, ColumnConfig, TableData } from "./filtered-table-types"

interface Item {
  name: string
  selected?: boolean
}

interface ItemWithStats {
  name: string
  type: string
  power: number
  selected?: boolean
}

describe("TableDataFilterService", () => {
  let service: TableDataFilterService<Item>

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TableDataFilterService)
  })

  function makeData(names: string[]): TableData<Item>[] {
    return [{ group: "", data: names.map(name => ({ name })) }]
  }

  function makeGroupedData(groups: { group: string; names: string[] }[]): TableData<Item>[] {
    return groups.map(g => ({ group: g.group, data: g.names.map(name => ({ name })) }))
  }

  describe("filterDataByInput", () => {
    describe("filter behavior", () => {
      it("Given items and a matching prefix, When filtering, Then returns items whose name starts with the filter", () => {
        const data = makeData(["Pikachu", "Pidgey", "Charizard"])

        const result = service.filterDataByInput(data, [], "pika")

        expect(result[0].data.map(i => i.name)).toEqual(["Pikachu"])
      })

      it("Given items and a substring filter, When no item starts with filter but one contains it, Then returns the containing item", () => {
        const data = makeData(["Razor Shell", "Thunderbolt", "Gengar"])

        const result = service.filterDataByInput(data, [], "razor")

        expect(result[0].data.map(i => i.name)).toEqual(["Razor Shell"])
      })

      it("Given items where filter matches middle of name, When filtering, Then returns items containing the substring", () => {
        const data = makeData(["Razor Shell", "Thunderbolt", "Shell Smash"])

        const result = service.filterDataByInput(data, [], "azor")

        expect(result[0].data.map(i => i.name)).toEqual(["Razor Shell"])
      })

      it("Given items where some start with filter and some contain it, When filtering, Then startsWith results come before contains results", () => {
        const data = makeData(["Shell Smash", "Razor Shell", "Pikachu"])

        const result = service.filterDataByInput(data, [], "shell")

        const names = result[0].data.map(i => i.name)
        expect(names[0]).toBe("Shell Smash")
        expect(names[1]).toBe("Razor Shell")
      })

      it("Given filter with uppercase letters, When filtering, Then comparison is case-insensitive", () => {
        const data = makeData(["Pikachu", "Pidgey"])

        const result = service.filterDataByInput(data, [], "PIKA")

        expect(result[0].data.map(i => i.name)).toEqual(["Pikachu"])
      })

      it("Given filter with spaces, When filtering, Then spaces are normalized to dashes", () => {
        const data = makeData(["Razor Shell", "Iron Head"])

        const result = service.filterDataByInput(data, [], "razor shell")

        expect(result[0].data.map(i => i.name)).toEqual(["Razor Shell"])
      })

      it("Given filter that matches nothing, When filtering, Then returns empty data", () => {
        const data = makeData(["Pikachu", "Charizard"])

        const result = service.filterDataByInput(data, [], "zzz")

        expect(result[0].data).toEqual([])
      })

      it("Given empty filter, When filtering, Then returns all items", () => {
        const data = makeData(["Pikachu", "Charizard"])

        const result = service.filterDataByInput(data, [], "")

        expect(result[0].data.map(i => i.name)).toEqual(["Pikachu", "Charizard"])
      })
    })

    describe("Mega evolution aliases", () => {
      it("Given a Mega Pokémon without variant, When filtering with 'mega-base', Then returns the Mega", () => {
        const data = makeData(["Gengar-Mega", "Gengar"])

        const result = service.filterDataByInput(data, [], "mega-gengar")

        expect(result[0].data.map(i => i.name)).toContain("Gengar-Mega")
      })

      it("Given a Mega Pokémon without variant, When filtering with 'base-mega', Then returns the Mega", () => {
        const data = makeData(["Gengar-Mega", "Gengar"])

        const result = service.filterDataByInput(data, [], "gengar-mega")

        expect(result[0].data.map(i => i.name)).toContain("Gengar-Mega")
      })

      it("Given a Mega Pokémon with variant (X/Y), When filtering with 'mega-base-variant', Then returns the correct Mega", () => {
        const data = makeData(["Charizard-Mega-X", "Charizard-Mega-Y", "Charizard"])

        const result = service.filterDataByInput(data, [], "mega-charizard-x")

        expect(result[0].data.map(i => i.name)).toContain("Charizard-Mega-X")
        expect(result[0].data.map(i => i.name)).not.toContain("Charizard-Mega-Y")
      })

      it("Given a Mega Pokémon with variant, When filtering with just 'mega-base', Then returns all variants of that Mega", () => {
        const data = makeData(["Charizard-Mega-X", "Charizard-Mega-Y", "Charizard"])

        const result = service.filterDataByInput(data, [], "mega-charizard")

        const names = result[0].data.map(i => i.name)
        expect(names).toContain("Charizard-Mega-X")
        expect(names).toContain("Charizard-Mega-Y")
      })

      it("Given a Mega Pokémon, When filtering by the base name, Then returns both the base and the Mega", () => {
        const data = makeData(["Charizard-Mega-X", "Charizard-Mega-Y", "Charizard"])

        const result = service.filterDataByInput(data, [], "charizard")

        const names = result[0].data.map(i => i.name)
        expect(names).toContain("Charizard")
        expect(names).toContain("Charizard-Mega-X")
        expect(names).toContain("Charizard-Mega-Y")
      })
    })

    describe("selectedValues marking", () => {
      it("Given selected values, When filtering, Then matching items are marked as selected", () => {
        const data = makeData(["Pikachu", "Charizard"])

        const result = service.filterDataByInput(data, ["Pikachu"], "pika")

        expect(result[0].data[0].selected).toBe(true)
      })

      it("Given selected values, When filtering, Then non-matching items are marked as not selected", () => {
        const data = makeData(["Pikachu", "Charizard"])

        const result = service.filterDataByInput(data, ["Charizard"], "pika")

        expect(result[0].data[0].selected).toBe(false)
      })
    })

    describe("grouped data", () => {
      it("Given multiple groups, When filtering by input, Then flattens all groups into a single result group", () => {
        const data = makeGroupedData([
          { group: "Group A", names: ["Pikachu", "Charizard"] },
          { group: "Group B", names: ["Pidgey", "Pidgeot"] }
        ])

        const result = service.filterDataByInput(data, [], "pid")

        expect(result.length).toBe(1)
        expect(result[0].group).toBe("")
        expect(result[0].data.map(i => i.name)).toEqual(["Pidgey", "Pidgeot"])
      })
    })
  })

  describe("processAndOrderData", () => {
    let typedService: TableDataFilterService<ItemWithStats>
    let typedData: TableData<ItemWithStats>[]

    beforeEach(() => {
      typedService = TestBed.inject(TableDataFilterService)
      typedData = [
        {
          group: "",
          data: [
            { name: "Iron Head", type: "Steel", power: 80 },
            { name: "Aqua Jet", type: "Water", power: 40 },
            { name: "Razor Shell", type: "Water", power: 75 }
          ]
        }
      ]
    })

    it("Given no sort column, When processing, Then returns items in original order", () => {
      const result = typedService.processAndOrderData(typedData, [], null, null)

      expect(result[0].data.map(i => i.name)).toEqual(["Iron Head", "Aqua Jet", "Razor Shell"])
    })

    it("Given a string column and asc direction, When processing, Then returns items sorted alphabetically", () => {
      const result = typedService.processAndOrderData(typedData, [], "name", "asc")

      expect(result[0].data.map(i => i.name)).toEqual(["Aqua Jet", "Iron Head", "Razor Shell"])
    })

    it("Given a string column and desc direction, When processing, Then returns items in reverse alphabetical order", () => {
      const result = typedService.processAndOrderData(typedData, [], "name", "desc")

      expect(result[0].data.map(i => i.name)).toEqual(["Razor Shell", "Iron Head", "Aqua Jet"])
    })

    it("Given a numeric column and asc direction, When processing, Then returns items sorted by number ascending", () => {
      const result = typedService.processAndOrderData(typedData, [], "power", "asc")

      expect(result[0].data.map(i => i.power)).toEqual([40, 75, 80])
    })

    it("Given a numeric column and desc direction, When processing, Then returns items sorted by number descending", () => {
      const result = typedService.processAndOrderData(typedData, [], "power", "desc")

      expect(result[0].data.map(i => i.power)).toEqual([80, 75, 40])
    })

    it("Given multiple groups, When processing, Then flattens all groups into one", () => {
      const grouped = makeGroupedData([
        { group: "A", names: ["Pikachu"] },
        { group: "B", names: ["Charizard"] }
      ])

      const result = service.processAndOrderData(grouped, [], null, null)

      expect(result.length).toBe(1)
      expect(result[0].data.map(i => i.name)).toEqual(["Pikachu", "Charizard"])
    })

    it("Given selected values, When processing, Then marks matching items as selected", () => {
      const result = typedService.processAndOrderData(typedData, ["Iron Head"], null, null)

      const ironHead = result[0].data.find(i => i.name === "Iron Head")
      const aquaJet = result[0].data.find(i => i.name === "Aqua Jet")
      expect(ironHead?.selected).toBe(true)
      expect(aquaJet?.selected).toBe(false)
    })
  })

  describe("filterDataAndGrouping", () => {
    let typedService: TableDataFilterService<ItemWithStats>
    let typedData: TableData<ItemWithStats>[]
    let columns: ColumnConfig<ItemWithStats>[]

    beforeEach(() => {
      typedService = TestBed.inject(TableDataFilterService)
      typedData = [
        {
          group: "Physical",
          data: [
            { name: "Iron Head", type: "Steel", power: 80 },
            { name: "Razor Shell", type: "Water", power: 75 }
          ]
        },
        {
          group: "Special",
          data: [
            { name: "Thunderbolt", type: "Electric", power: 90 },
            { name: "Surf", type: "Water", power: 90 }
          ]
        }
      ]
      columns = [new ColumnConfig<ItemWithStats>({ field: "type", filterable: true }), new ColumnConfig<ItemWithStats>({ field: "power", filterable: true })]
    })

    it("Given no active filters, When filtering, Then returns all items preserving groups", () => {
      const result = typedService.filterDataAndGrouping(typedData, [], columns, [])

      expect(result.length).toBe(2)
      expect(result[0].data.length).toBe(2)
      expect(result[1].data.length).toBe(2)
    })

    it("Given an active filter on a string field, When filtering, Then keeps only matching items in each group", () => {
      const filters: ActiveFilter[] = [{ field: "type", value: "Water" }]

      const result = typedService.filterDataAndGrouping(typedData, filters, columns, [])

      expect(result[0].data.map(i => i.name)).toEqual(["Razor Shell"])
      expect(result[1].data.map(i => i.name)).toEqual(["Surf"])
    })

    it("Given an active filter on a numeric field, When filtering, Then keeps only matching items", () => {
      const filters: ActiveFilter[] = [{ field: "power", value: 90 }]

      const result = typedService.filterDataAndGrouping(typedData, filters, columns, [])

      expect(result[0].data.length).toBe(0)
      expect(result[1].data.map(i => i.name)).toEqual(["Thunderbolt", "Surf"])
    })

    it("Given multiple active filters, When filtering, Then applies all filters combined (AND logic)", () => {
      const filters: ActiveFilter[] = [
        { field: "type", value: "Water" },
        { field: "power", value: 90 }
      ]

      const result = typedService.filterDataAndGrouping(typedData, filters, columns, [])

      expect(result[0].data.length).toBe(0)
      expect(result[1].data.map(i => i.name)).toEqual(["Surf"])
    })

    it("Given a filter on an unknown column, When filtering, Then ignores the unknown filter", () => {
      const filters: ActiveFilter[] = [{ field: "unknown", value: "anything" }]

      const result = typedService.filterDataAndGrouping(typedData, filters, columns, [])

      expect(result[0].data.length).toBe(2)
      expect(result[1].data.length).toBe(2)
    })

    it("Given selected values, When filtering, Then marks matching items as selected", () => {
      const result = typedService.filterDataAndGrouping(typedData, [], columns, ["Iron Head"])

      const ironHead = result[0].data.find(i => i.name === "Iron Head")
      const razorShell = result[0].data.find(i => i.name === "Razor Shell")
      expect(ironHead?.selected).toBe(true)
      expect(razorShell?.selected).toBe(false)
    })

    it("Given data with groups, When filtering, Then preserves group names in result", () => {
      const result = typedService.filterDataAndGrouping(typedData, [], columns, [])

      expect(result[0].group).toBe("Physical")
      expect(result[1].group).toBe("Special")
    })
  })
})
