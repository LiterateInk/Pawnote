import type { PawnoteFetcher } from "./fetcher";

type ApiType = { input: any, output: any };
type ApiHandler<T extends ApiType> = (fetcher: PawnoteFetcher, input: T["input"]) => Promise<T["output"]>;
export const makeApiHandler = <T extends ApiType>(api: ApiHandler<T>): ApiHandler<T> => {
  return (fetcher, input) => api(fetcher, input);
};
