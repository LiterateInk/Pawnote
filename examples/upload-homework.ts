import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiHomeworkReturnType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance don't have any news.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const homeworks = await pronote.getHomeworkForInterval(new Date());
  const homework = homeworks[0];

  console.log(homeworks);
})();
