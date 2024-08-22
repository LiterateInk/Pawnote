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

  for (const item of news.items) {
    console.info(item.title ?? "(no title)", "by", item.author);
    if (item.read) {
      console.info("=> Already marked as read, skipping...\n");
      continue;
    }

    await pronote.newsRead(session, item, true);
    console.info("=> Marked as read !\n");
  }
}();
