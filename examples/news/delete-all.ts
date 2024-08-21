import * as pronote from "../../src";
import { credentials } from "../_credentials";

void async function main () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  const news = await pronote.news(session);

  // Warning: this will delete all items in the news.
  // Cool for cleaning up the news, but be careful !
  for (const item of news.items) {
    console.info(item.title ?? "(no title)", "by", item.author);
    await pronote.newsDelete(session, item);
    console.info("=> Deleted !\n");
  }
}();
