import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalRunAllSpecs: true,
    screenshotOnRunFailure: false
  }
})
