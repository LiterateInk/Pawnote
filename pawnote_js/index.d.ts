import type { Fetcher, Response } from "@literate.ink/utilities";

export function retrieve_pronote_root_url(
  pronote_url: string
): string;

export function authenticate_with_credentials(
  pronote_url: string,
  web_space: WebSpace,
  username: string,
  password: string,
  device_uuid: string,
  fetcher?: Fetcher
): Promise<Response>;

export enum WebSpace {
  Students = 6,
  Parents = 7,
  Teachers = 8,
  Administration = 14,
  Management = 17,
  Assistants = 26,
}
