import cookieParser from "set-cookie-parser";

interface HeadersLike {
  get (key: string): string | null
};

export const retrieveResponseCookies = (headers: Record<string, string> | Headers | HeadersLike): string[] => {
  const setCookieHeader = getHeaderFromFetcherResponse(headers, "set-cookie");
  if (setCookieHeader === null) return [];

  const splittedCookies = cookieParser.splitCookiesString(setCookieHeader);
  const cookies = splittedCookies.map((cookie) => cookie.split(";")[0]);

  return cookies;
};

export const getHeaderFromFetcherResponse = (headers: Record<string, string> | Headers | HeadersLike, item: string): string | null => {
  return typeof headers.get === "function"
    ? headers.get(item)
    : (headers as Record<string, string>)[item];
};
