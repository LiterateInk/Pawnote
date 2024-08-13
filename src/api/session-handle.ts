import type { SessionHandle } from "~/models";
import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { Queue } from "~/core/queue";

export const createSessionHandle = (fetcher: Fetcher = defaultFetcher): SessionHandle => {
  return {
    // @ts-expect-error : we want null as initializer
    information: null,
    instance: null,
    user: null,

    queue: new Queue(),
    fetcher
  };
};
