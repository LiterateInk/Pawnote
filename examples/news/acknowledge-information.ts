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

  console.log("\n--- Items :");
  for (const item of news.items) {
    // Skip surveys since they can't just be marked as acknowledged.
    if (item.is === "survey") continue;

    // Skip informations we already acknowledged or the ones that don't need to be acknowledged.
    if (item.acknowledged || !item.needToAcknowledge) continue;

    console.log("Acknowledging", item.title ?? "(no title)", "by", item.author);
    await pronote.newsInformationAcknowledge(session, item);
  }
}();
