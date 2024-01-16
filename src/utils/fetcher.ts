/**
 * A fetcher that looks like the Fetch API
 * so every fetcher applied to Pawnote will have the
 * same API and should output the same thing.
 *
 * @example
 * import type { PawnoteFetcher } from "pawnote";
 *
 * // With the `fetch()` builtin, in TypeScript.
 * // This is actually the code for the default fetcher.
 * const fetcher: PawnoteFetcher = async (url, options) => {
 *   const response = await fetch(url, {
 *     method: options.method,
 *     headers: options.headers,
 *     redirect: options.redirect,
 *     // Setting a body is not allowed on GET requests.
 *     body: (options.method === "GET") ? void 0 : options.body
 *   });
 *
 *   return {
 *     headers: response.headers,
 *     text: () => response.text(),
 *     json: <T>() => response.json() as T
 *   };
 * };
 */
export type PawnoteFetcher = (url: string, options: {
  method: "GET" | "POST"
  /** Headers that should be appended to the request. */
  headers?: Record<string, string> | Headers
  /** Body of the request of type given in the "Content-Type" header. */
  body?: string
  /** Whether we should automatically handle the redirections or do it by hand. */
  redirect?: "follow" | "manual"
}) => Promise<{
  headers: Record<string, string> | Headers
  text: () => Promise<string>
  json: <T>() => Promise<T>
}>;

/**
 * Simple and default fetcher using `fetch` if none was given
 * in the authentication function.
 */
export const defaultPawnoteFetcher: PawnoteFetcher = async (url, options) => {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    redirect: options.redirect,
    // Setting a body is not allowed on GET requests.
    body: (options.method === "GET") ? void 0 : options.body
  });

  return {
    headers: response.headers,
    text: () => response.text(),
    json: <T>() => response.json() as T
  };
};
