import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 30000,
    fsModuleCache: false,
    coverage: {
      provider: "istanbul"
    }
  }
})
