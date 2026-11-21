import { HowToUseImage } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"

export const PROBABILITY_IMAGES = {
  consistencyScore: {
    light: { src: "assets/media/how-to-use/probability-calc/consistency-score-94162945.webp", width: 940, height: 231 },
    dark: { src: "assets/media/how-to-use/probability-calc/consistency-score-dark-e7d80f9f.webp", width: 940, height: 231 },
    lightMobile: { src: "assets/media/how-to-use/probability-calc/consistency-score-mobile-2a6d9abb.webp", width: 1173, height: 886 },
    darkMobile: { src: "assets/media/how-to-use/probability-calc/consistency-score-mobile-dark-b12ae754.webp", width: 1173, height: 886 }
  },
  moveProbabilities: {
    light: { src: "assets/media/how-to-use/probability-calc/move-probabilities-d714d373.webp", width: 940, height: 316 },
    dark: { src: "assets/media/how-to-use/probability-calc/move-probabilities-dark-8843b7ef.webp", width: 940, height: 316 },
    lightMobile: { src: "assets/media/how-to-use/probability-calc/move-probabilities-mobile-23a962f7.webp", width: 1173, height: 1484 },
    darkMobile: { src: "assets/media/how-to-use/probability-calc/move-probabilities-mobile-dark-a19a77d4.webp", width: 1173, height: 1484 }
  },
  combinedProbability: {
    light: { src: "assets/media/how-to-use/probability-calc/combined-probability-c66dbac4.webp", width: 940, height: 121 },
    dark: { src: "assets/media/how-to-use/probability-calc/combined-probability-dark-c2cbedd4.webp", width: 940, height: 121 },
    lightMobile: { src: "assets/media/how-to-use/probability-calc/combined-probability-mobile-1816e36c.webp", width: 1173, height: 800 },
    darkMobile: { src: "assets/media/how-to-use/probability-calc/combined-probability-mobile-dark-12ea8f05.webp", width: 1173, height: 800 }
  },
  field: {
    light: { src: "assets/media/how-to-use/probability-calc/field-122d58fa.webp", width: 940, height: 94 },
    dark: { src: "assets/media/how-to-use/probability-calc/field-dark-4c1aa626.webp", width: 940, height: 94 },
    lightMobile: { src: "assets/media/how-to-use/probability-calc/field-mobile-3e8cc2bd.webp", width: 1173, height: 290 },
    darkMobile: { src: "assets/media/how-to-use/probability-calc/field-mobile-dark-8e857a78.webp", width: 1173, height: 290 }
  },
  referenceTables: {
    light: { src: "assets/media/how-to-use/probability-calc/reference-tables-0f595a70.webp", width: 1893, height: 611 },
    dark: { src: "assets/media/how-to-use/probability-calc/reference-tables-dark-c0f70416.webp", width: 1893, height: 611 },
    lightMobile: { src: "assets/media/how-to-use/probability-calc/reference-tables-mobile-9706532c.webp", width: 1173, height: 6523 },
    darkMobile: { src: "assets/media/how-to-use/probability-calc/reference-tables-mobile-dark-0d3f2c9b.webp", width: 1173, height: 6523 }
  }
} satisfies Record<string, HowToUseImage>
