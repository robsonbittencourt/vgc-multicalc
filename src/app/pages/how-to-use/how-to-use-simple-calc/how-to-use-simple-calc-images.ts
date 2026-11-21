import { HowToUseImage } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"

export const SIMPLE_CALC_IMAGES = {
  oneVsOne: {
    light: { src: "assets/media/how-to-use/one-vs-one/one-vs-one-bdbb3a6f.webp", width: 1920, height: 1080 },
    dark: { src: "assets/media/how-to-use/one-vs-one/one-vs-one-dark-6962022e.webp", width: 1920, height: 1080 },
    lightMobile: { src: "assets/media/how-to-use/one-vs-one/one-vs-one-mobile-af1ad1ce.webp", width: 1236, height: 2745 },
    darkMobile: { src: "assets/media/how-to-use/one-vs-one/one-vs-one-mobile-dark-b2933fd5.webp", width: 1236, height: 2745 }
  },
  customization: {
    light: { src: "assets/media/how-to-use/one-vs-one/customization-88f36063.webp", width: 940, height: 748 },
    dark: { src: "assets/media/how-to-use/one-vs-one/customization-dark-257d55d0.webp", width: 940, height: 748 },
    lightMobile: { src: "assets/media/how-to-use/one-vs-one/customization-mobile-af1ad1ce.webp", width: 1236, height: 2745 },
    darkMobile: { src: "assets/media/how-to-use/one-vs-one/customization-mobile-dark-b2933fd5.webp", width: 1236, height: 2745 }
  },
  field: {
    light: { src: "assets/media/how-to-use/one-vs-one/field-317470ce.webp", width: 1893, height: 347 },
    dark: { src: "assets/media/how-to-use/one-vs-one/field-dark-68496ad7.webp", width: 1893, height: 347 },
    lightMobile: { src: "assets/media/how-to-use/one-vs-one/field-mobile-b3235e2f.webp", width: 1236, height: 2745 },
    darkMobile: { src: "assets/media/how-to-use/one-vs-one/field-mobile-dark-cbc01543.webp", width: 1236, height: 2745 }
  }
} satisfies Record<string, HowToUseImage>
