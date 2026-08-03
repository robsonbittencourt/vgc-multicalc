import { build } from "esbuild"
import { resolve, join } from "node:path"
import { existsSync, statSync, mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { pathToFileURL } from "node:url"

const projectRoot = resolve(import.meta.dirname, "../..")

const ALIASES = {
  "@calc": resolve(projectRoot, "src/domain/calc/index.ts"),
  "@calc/": resolve(projectRoot, "src/domain/calc/") + "/",
  "@multicalc/": resolve(projectRoot, "src/domain/multicalc/") + "/",
  "@data/": resolve(projectRoot, "src/domain/data/") + "/",
  "@calc-bridge": resolve(projectRoot, "src/domain/multicalc/calc-bridge/index.ts"),
  "@calc-bridge/": resolve(projectRoot, "src/domain/multicalc/calc-bridge/") + "/",
  "@pokemon-repository": resolve(projectRoot, "src/domain/multicalc/pokemon-repository/index.ts"),
  "@pokemon-repository/": resolve(projectRoot, "src/domain/multicalc/pokemon-repository/") + "/"
}

function resolveFile(base) {
  const candidates = [base, base + ".ts", base + ".js", join(base, "index.ts"), join(base, "index.js")]

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }

  return base
}

const aliasPlugin = {
  name: "vgc-aliases",
  setup(builder) {
    builder.onResolve({ filter: /^@(calc|multicalc|data|calc-bridge|pokemon-repository)(\/|$)/ }, args => {
      if (args.path === "@calc") return { path: ALIASES["@calc"] }
      if (args.path === "@calc-bridge") return { path: ALIASES["@calc-bridge"] }
      if (args.path === "@pokemon-repository") return { path: ALIASES["@pokemon-repository"] }

      for (const [prefix, target] of Object.entries(ALIASES)) {
        if (prefix.endsWith("/") && args.path.startsWith(prefix)) {
          return { path: resolveFile(target + args.path.slice(prefix.length)) }
        }
      }

      return null
    })
  }
}

export async function loadDomain(exportsSource) {
  const dir = mkdtempSync(join(tmpdir(), "vgc-perf-"))
  const entry = join(dir, "entry.ts")
  const outfile = join(dir, "bundle.mjs")

  writeFileSync(entry, exportsSource)

  await build({ entryPoints: [entry], bundle: true, format: "esm", platform: "node", outfile, plugins: [aliasPlugin], logLevel: "silent" })

  return import(pathToFileURL(outfile).href)
}
