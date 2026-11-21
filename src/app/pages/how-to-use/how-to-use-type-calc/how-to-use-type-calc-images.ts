import { HowToUseImage } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"

export const TYPE_CALC_IMAGES = {
  matchup: {
    light: { src: "assets/media/how-to-use/type-calc/matchup-4ce3e506.webp", width: 940, height: 549 },
    dark: { src: "assets/media/how-to-use/type-calc/matchup-dark-e1aea683.webp", width: 940, height: 549 },
    lightMobile: { src: "assets/media/how-to-use/type-calc/matchup-mobile-3fb95705.webp", width: 1236, height: 1710 },
    darkMobile: { src: "assets/media/how-to-use/type-calc/matchup-mobile-dark-c468bb8c.webp", width: 1236, height: 1710 }
  },
  offensiveCoverage: {
    light: { src: "assets/media/how-to-use/type-calc/offensive-coverage-1d581e67.webp", width: 940, height: 766 },
    dark: { src: "assets/media/how-to-use/type-calc/offensive-coverage-dark-ff56725c.webp", width: 940, height: 766 },
    lightMobile: { src: "assets/media/how-to-use/type-calc/offensive-coverage-mobile-9ff118ca.webp", width: 1236, height: 2598 },
    darkMobile: { src: "assets/media/how-to-use/type-calc/offensive-coverage-mobile-dark-b8d6eb30.webp", width: 1236, height: 2598 }
  },
  defensiveCoverage: {
    light: { src: "assets/media/how-to-use/type-calc/defensive-coverage-cae7cb86.webp", width: 940, height: 773 },
    dark: { src: "assets/media/how-to-use/type-calc/defensive-coverage-dark-bf242aa4.webp", width: 940, height: 773 },
    lightMobile: { src: "assets/media/how-to-use/type-calc/defensive-coverage-mobile-0a70a5fb.webp", width: 1236, height: 2619 },
    darkMobile: { src: "assets/media/how-to-use/type-calc/defensive-coverage-mobile-dark-664ae536.webp", width: 1236, height: 2619 }
  },
  coverageInsights: {
    light: { src: "assets/media/how-to-use/type-calc/coverage-insights-e4887263.webp", width: 940, height: 405 },
    dark: { src: "assets/media/how-to-use/type-calc/coverage-insights-dark-e7ed5b7e.webp", width: 940, height: 405 },
    lightMobile: { src: "assets/media/how-to-use/type-calc/coverage-insights-mobile-14004bd6.webp", width: 1236, height: 2341 },
    darkMobile: { src: "assets/media/how-to-use/type-calc/coverage-insights-mobile-dark-c359adaf.webp", width: 1236, height: 2341 }
  }
} satisfies Record<string, HowToUseImage>
