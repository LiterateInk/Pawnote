/**
 * A simple `fetcher` function with built-in
 * typings used to fetch external resources.
 */
export type HttpCallFunction = (url: string, options: {
  method: "GET" | "POST"
  /** Headers that should be appended to the request. */
  headers?: Record<string, string> | Headers
  /** Body of the request of type given in the "Content-Type" header. */
  body?: unknown
  /** Whether we should automatically handle the redirections or do it by hand. */
  redirect?: "follow" | "manual"
}) => Promise<{
  headers: Record<string, string> | Headers
  text: () => Promise<string>
  json: <T>() => Promise<T>
}>;
