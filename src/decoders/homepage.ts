import type { Partner, PartnerARD, Homepage } from "~/models";
import { decodeHomepageLink } from "./homepage-link";
import { decodePartnerARD } from "./partner-ard";
import { decodePartner } from "./partner";

export const decodeHomepage = (page: any): Homepage => {
  const links = [];

  let partnerTurboself: Partner | undefined;
  let partnerARD: PartnerARD | undefined;

  if ("partenaireARD" in page) {
    partnerARD = decodePartnerARD(page.partenaireARD);
  }

  for (const link of page.lienUtile.listeLiens.V) {
    if ("SSO" in link) {
      if (link.SSO.codePartenaire === "TURBOSELF") {
        partnerTurboself = decodePartner(link);
      }
    }
    else {
      links.push(decodeHomepageLink(link));
    }
  }

  return {
    partnerARD,
    partnerTurboself,

    links
  };
};
