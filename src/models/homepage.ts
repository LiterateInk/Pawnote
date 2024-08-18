import type { HomepageLink } from "./homepage-link";

export type Homepage = Readonly<{
  partnerARD?: any
  partnerTurboself?: any

  links: Array<HomepageLink>
}>;
