import type { MockInstance } from "vitest"

export type MockOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? MockInstance<T[K]> : T[K]
}

type ArgsOf<M> = M extends MockInstance<infer F> ? (F extends (...args: any[]) => any ? Parameters<F> : never) : never
type ReturnOf<M> = M extends MockInstance<infer F> ? (F extends (...args: any[]) => any ? ReturnType<F> : never) : never

interface ArgRegistry {
  args: unknown[]
  value: unknown
}

export function withArgs<M extends MockInstance>(mock: M) {
  const mockWithRegistry = mock as M & { __argRegistry?: ArgRegistry[] }

  if (!mockWithRegistry.__argRegistry) {
    const registry: ArgRegistry[] = []
    mockWithRegistry.__argRegistry = registry

    mock.mockImplementation(((...args: unknown[]) => {
      const entry = registry.find(e => e.args.length === args.length && e.args.every((a, i) => JSON.stringify(a) === JSON.stringify(args[i])))

      return entry?.value
    }) as never)
  }

  const registry = mockWithRegistry.__argRegistry

  return {
    calledWith: (...args: ArgsOf<M>) => ({
      returns: (value: ReturnOf<M>) => registry.push({ args, value })
    })
  }
}
