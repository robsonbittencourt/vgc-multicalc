import { HowToUseImage } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"

export const TEAMS_IMAGES = {
  teams: {
    light: { src: "assets/media/how-to-use/teams/teams-e87c84d8.webp", width: 1920, height: 1080 },
    dark: { src: "assets/media/how-to-use/teams/teams-dark-c1e2d8fd.webp", width: 1920, height: 1080 },
    lightMobile: { src: "assets/media/how-to-use/teams/teams-mobile-63d45d34.webp", width: 1236, height: 2745 },
    darkMobile: { src: "assets/media/how-to-use/teams/teams-mobile-dark-cd0b9c69.webp", width: 1236, height: 2745 }
  },
  copiedOpponents: {
    light: { src: "assets/media/how-to-use/teams/copied-opponents-e2527c09.webp", width: 1893, height: 719 },
    dark: { src: "assets/media/how-to-use/teams/copied-opponents-dark-c9aaf0c4.webp", width: 1893, height: 719 }
  },
  paste: {
    light: { src: "assets/media/how-to-use/teams/paste-7d08e4de.webp", width: 1056, height: 754 },
    dark: { src: "assets/media/how-to-use/teams/paste-dark-dc8236bc.webp", width: 1056, height: 754 }
  },
  pasteMobile: {
    light: { src: "assets/media/how-to-use/teams/paste-mobile-5adfa8af.webp", width: 1236, height: 2769 },
    dark: { src: "assets/media/how-to-use/teams/paste-mobile-dark-873ccdc4.webp", width: 1236, height: 2769 }
  },
  copiedOpponentsMobile: {
    light: { src: "assets/media/how-to-use/teams/copied-opponents-mobile-7549cc3c.webp", width: 1236, height: 2745 },
    dark: { src: "assets/media/how-to-use/teams/copied-opponents-mobile-dark-9a3cf4a0.webp", width: 1236, height: 2745 }
  }
} satisfies Record<string, HowToUseImage>
