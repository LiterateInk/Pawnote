import type { News, NewsCategory, SessionHandle } from "~/models";
import { decodeNewsInformation } from "./news-information";
import { decodeNewsCategory } from "./news-category";
import { decodeNewsSurvey } from "./news-survey";

export const decodeNews = (news: any, session: SessionHandle): News => {
  const categories: NewsCategory[] = news.listeCategories.V.map(decodeNewsCategory);

  return {
    categories,
    items: news.listeModesAff[0].listeActualites.V.map((item: any) => {
      let decoder: typeof decodeNewsInformation | typeof decodeNewsSurvey;

      if (item.estInformation) decoder = decodeNewsInformation;
      else if (item.estSondage) decoder = decodeNewsSurvey;
      else throw new Error("Unknown news type");

      return decoder(item, session, categories);
    })
  };
};
