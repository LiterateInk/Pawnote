import type { HomepageLink } from "~/models";

export const decodeHomepageLink = (link: any): HomepageLink => {
  return {
    description: link.commentaire,
    name: link.L,
    url: link.url
  };
};
