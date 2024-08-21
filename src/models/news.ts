import type { NewsCategory } from "./news-category";
import type { NewsInformation } from "./news-information";
import type { NewsSurvey } from "./news-survey";

export type News = Readonly<{
  categories: NewsCategory[];
  items: Array<NewsInformation | NewsSurvey>
}>;
