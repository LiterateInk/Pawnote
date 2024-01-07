type ApiType = { input: any, output: any };
type ApiHandler<T extends ApiType> = (input: T["input"]) => Promise<T["output"]>;
export const makeApiHandler = <T extends ApiType>(api: ApiHandler<T>): ApiHandler<T> => {
  return (input) => api(input);
};
