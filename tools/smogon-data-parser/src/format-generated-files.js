import { execFileSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function formatGeneratedFiles(regulation) {
  console.log("⏳ [formatGeneratedFiles] Running prettier on generated files...")

  const generatedFiles = ["src/domain/data/top-usage-regulation.ts", "src/domain/data/pokemon-data.ts", "src/domain/data/pokemon-moveset.ts", "src/domain/data/moveset-data.ts", `src/domain/data/speed-statistics-reg-${regulation}.ts`]

  const projectRoot = path.resolve(__dirname, "../../..")
  const prettierBin = path.resolve(projectRoot, "node_modules/.bin/prettier")

  execFileSync(prettierBin, ["--write", ...generatedFiles], { cwd: projectRoot, stdio: "inherit" })

  console.log("✅ [formatGeneratedFiles] Files formatted successfully")
}
