import { authenticatePronoteCredentials, PronoteApiAccountId } from "../../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance don't have any news.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const news = await pronote.getNews();

  for (const item of news.items) {
    console.info(item.title ?? "(no title)", "by", item.author);
    if (item.read) {
      console.info("=> Already marked as read, skipping...\n");
      continue;
    }

    await item.markAsRead();
    console.info("=> Marked as read !\n");
  }
})();
