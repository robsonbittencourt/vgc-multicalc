import { HowToUseImage } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"

export const MANY_VS_TEAM_IMAGES = {
  manyVsTeam: {
    light: { src: "assets/media/how-to-use/many-vs-team/many-vs-team-cf2ca6e4.webp", width: 1893, height: 1575 },
    dark: { src: "assets/media/how-to-use/many-vs-team/many-vs-team-dark-af80082b.webp", width: 1893, height: 1575 },
    lightMobile: { src: "assets/media/how-to-use/many-vs-team/many-vs-team-mobile-3e07d267.webp", width: 1236, height: 2745 },
    darkMobile: { src: "assets/media/how-to-use/many-vs-team/many-vs-team-mobile-dark-300d20dd.webp", width: 1236, height: 2745 }
  },
  combinedAttackers: {
    light: { src: "assets/media/how-to-use/many-vs-team/combined-attackers-886034d1.webp", width: 1893, height: 400 },
    dark: { src: "assets/media/how-to-use/many-vs-team/combined-attackers-dark-cdd0302d.webp", width: 1893, height: 400 },
    lightMobile: { src: "assets/media/how-to-use/many-vs-team/combined-attackers-mobile-0b2e7479.webp", width: 1236, height: 2745 },
    darkMobile: { src: "assets/media/how-to-use/many-vs-team/combined-attackers-mobile-dark-d100ac7e.webp", width: 1236, height: 2745 }
  }
} satisfies Record<string, HowToUseImage>
