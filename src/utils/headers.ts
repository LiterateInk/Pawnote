import cookieParser from "set-cookie-parser";

export const retrieveResponseCookies = (headers: Record<string, string> | Headers): string[] => {
  const setCookieHeader = headers instanceof Headers ? headers.get("set-cookie") : headers["set-cookie"];
  if (setCookieHeader === null) return [];

  const splittedCookies = cookieParser.splitCookiesString(setCookieHeader);
  const cookies = splittedCookies.map(cookie => cookie.split(";")[0]);

  return cookies;
};

export const getHeaderFromFetcherResponse = (headers: Record<string, string> | Headers, item: string): string | null => {
  return headers instanceof Headers ? headers.get(item) : headers[item];
};
