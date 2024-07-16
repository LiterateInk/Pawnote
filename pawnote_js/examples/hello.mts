import pawnote from "../pkg/pawnote_wasm.js";

interface Request {
  url: string
  method: string
  content: string | undefined
  headers: Array<[string, string]>
}

const fetcher = async (req: Request): Promise<any> => {
  const request_headers: Record<string, string> = {};
  req.headers.forEach(([key, value]) => {
    request_headers[key] = value;
  });

  const response = await fetch(req.url, {
    headers: request_headers,
    method: req.method,
    body: req.content
  });

  const response_headers: Array<[string, string]> = [];
  response.headers.forEach((value, key) => {
    response_headers.push([key, value]);
  });

  return {
    status: response.status,
    content: await response.text(),
    headers: response_headers
  };
}

const response = await pawnote.authenticate_with_credentials(
  "https://google.com",
  pawnote.WebSpace.Students,
  "username",
  "password",
  "deviceuuid",
  fetcher
);

console.log(response);

// console.log(pawnote.retrieve_pronote_root_url("https://demo.index-education.net/pronote////eleve.html?fd=1"));
// console.log(pawnote.retrieve_pronote_root_url("https://demo.index-education.net////eleve.html?fd=1"));
// console.log(pawnote.retrieve_pronote_root_url("https://demo.index-education.net////eleve/hehe/l.html?fd=1"));

