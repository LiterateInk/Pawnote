import { Homepage } from "~/models/homepage";
import { decodeHomepageLink } from "./homepage-link";

export const decodeHomepage = (page: any): Homepage => {
  const links = [];

  let partnerTurboself: any;
  let partnerARD: any;

  if ("partenaireARD" in page) {
    partnerARD = page.partenaireARD.SSO;
  }

  for (const link of page.lienUtile.listeLiens.V) {
    if ("SSO" in link) {
      if (link.SSO.codePartenaire === "TURBOSELF") {
        partnerTurboself = link.SSO;
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
