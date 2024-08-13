import type { SessionHandle } from "~/models";
import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { Queue } from "~/core/queue";
import { cleanURL } from "./helpers/clean-url";

export const createSessionHandle = (url: string, fetcher: Fetcher = defaultFetcher): SessionHandle => {
  return {
    serverURL: cleanURL(url),

    // @ts-expect-error : we want null as initializer
    information: null,
    instance: null,
    user: null,

    queue: new Queue(),
    fetcher
  };
};
