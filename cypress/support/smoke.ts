export const SMOKE_TAG = "[smoke]"

export function smoke(title: string, fn: () => void) {
  return it(`${title} ${SMOKE_TAG}`, fn)
}

export function isSmokeRun(): boolean {
  return Cypress.expose("smoke") === true || Cypress.expose("smoke") === "true"
}

export function registerSmokeFilter() {
  const originalIt = globalThis.it
  const originalDescribe = globalThis.describe

  let registeredTests = 0

  const filteredIt = ((title: string, ...rest: unknown[]) => {
    if (isSmokeRun() && !title.includes(SMOKE_TAG)) return

    registeredTests++

    return (originalIt as any)(title, ...rest)
  }) as unknown as Mocha.TestFunction

  filteredIt.only = originalIt.only
  filteredIt.skip = originalIt.skip
  filteredIt.retries = originalIt.retries

  const filteredDescribe = ((title: string, fn: () => void) => {
    if (!isSmokeRun()) return (originalDescribe as any)(title, fn)

    const before = registeredTests
    const probe = originalDescribe(title, fn)

    if (registeredTests === before) {
      const siblings = probe.parent?.suites

      if (siblings) {
        const index = siblings.indexOf(probe)

        if (index !== -1) siblings.splice(index, 1)
      }
    }

    return probe
  }) as unknown as Mocha.SuiteFunction

  filteredDescribe.only = originalDescribe.only
  filteredDescribe.skip = originalDescribe.skip

  globalThis.it = filteredIt
  globalThis.specify = filteredIt
  globalThis.describe = filteredDescribe
  globalThis.context = filteredDescribe
}
