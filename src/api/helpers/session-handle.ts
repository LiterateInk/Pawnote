import type { SessionHandle } from "~/models";
import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { Queue } from "~/api/private/queue";

export const createSessionHandle = (fetcher: Fetcher = defaultFetcher): SessionHandle => {
  return {
    // @ts-expect-error : we want null as initializer
    information: null,
    // @ts-expect-error : we want null as initializer
    instance: null,
    // @ts-expect-error : we want null as initializer
    user: null,

    queue: new Queue(),
    fetcher,

    presence: null
  };
};
