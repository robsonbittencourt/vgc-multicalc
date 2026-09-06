import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalRunAllSpecs: true,
    screenshotOnRunFailure: false,
    defaultBrowser: "chrome",
    retries: { runMode: 1, openMode: 0 },
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
