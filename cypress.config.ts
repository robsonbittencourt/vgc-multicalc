import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalRunAllSpecs: true,
    screenshotOnRunFailure: false,
    allowCypressEnv: false,
    setupNodeEvents(on) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--disable-features=BlockInsecureClipboardRead")
        }

        return launchOptions
      })
    }
  }
})
