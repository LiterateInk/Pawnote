import { authenticatePronoteCredentials, PronoteApiAccountId, StudentNewsSurvey } from "../../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance don't have any news.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const news = await pronote.getNews();

  console.log("\n--- Items :");
  for (const item of news.items) {
    // Skip surveys since they can't just be marked as acknowledged.
    if (item instanceof StudentNewsSurvey) continue;
    // Skip informations we already acknowledged or the ones that don't need to be acknowledged.
    if (item.acknowledged || !item.needToAcknowledge) continue;

    console.log("Acknowledging", item.title ?? "(no title)", "by", item.author);
    await item.acknowledge();
  }
})();
