import { HowToUseImage } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"

export const SP_OPTIMIZER_IMAGES = {
  survive: {
    light: { src: "assets/media/how-to-use/sp-optimizer/survive-ed69e492.webp", width: 940, height: 842 },
    dark: { src: "assets/media/how-to-use/sp-optimizer/survive-dark-adbe987a.webp", width: 940, height: 842 },
    lightMobile: { src: "assets/media/how-to-use/sp-optimizer/survive-mobile-8e6a676f.webp", width: 1173, height: 465 },
    darkMobile: { src: "assets/media/how-to-use/sp-optimizer/survive-mobile-dark-f04a606e.webp", width: 1173, height: 465 }
  },
  ko: {
    light: { src: "assets/media/how-to-use/sp-optimizer/ko-39000238.webp", width: 913, height: 97 },
    dark: { src: "assets/media/how-to-use/sp-optimizer/ko-dark-81c26b32.webp", width: 913, height: 97 },
    lightMobile: { src: "assets/media/how-to-use/sp-optimizer/ko-mobile-0e19bcc0.webp", width: 1173, height: 442 },
    darkMobile: { src: "assets/media/how-to-use/sp-optimizer/ko-mobile-dark-7cbe847a.webp", width: 1173, height: 442 }
  }
} satisfies Record<string, HowToUseImage>
