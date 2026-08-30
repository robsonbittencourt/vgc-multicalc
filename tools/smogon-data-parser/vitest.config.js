import path from "node:path"
import { defineConfig } from "vitest/config"

const repoRoot = path.resolve(import.meta.dirname, "../..")

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@calc\/(.*)$/, replacement: path.resolve(repoRoot, "src/domain/calc/$1") },
      { find: /^@calc$/, replacement: path.resolve(repoRoot, "src/domain/calc/index.ts") },
      { find: /^@data\/(.*)$/, replacement: path.resolve(repoRoot, "src/domain/data/$1") }
    ]
  },
  test: {
    root: import.meta.dirname,
    include: ["test/**/*.spec.js"]
  }
})
