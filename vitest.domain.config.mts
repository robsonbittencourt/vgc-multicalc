import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 30000,
    fsModuleCache: false,
    environment: "node",
    coverage: {
      provider: "istanbul"
    }
  }
})
