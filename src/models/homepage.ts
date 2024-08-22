import type { HomepageLink } from "./homepage-link";
import type { Partner } from "./partner";
import type { PartnerARD } from "./partner-ard";

export type Homepage = Readonly<{
  partnerARD?: PartnerARD
  // NOTE: Not sure if we can have more data about Turboself than just SSO.
  partnerTurboself?: Partner

  links: Array<HomepageLink>
}>;
