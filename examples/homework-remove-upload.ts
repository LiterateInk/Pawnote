import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiHomeworkReturnType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger",
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const homework = await pronote.getHomeworkForInterval(new Date());

  console.log("---");

  for (const item of homework) {
    // Output something...
    console.log(item.subject.name, "to finish before the", item.deadline.toLocaleString());
    console.log("(description) =>", item.description);

    if (item.return) {
      if (item.return.type === PronoteApiHomeworkReturnType.PAPER) {
        console.log("(return) => on paper ; should be returned to teacher manually");
      }
      else if (item.return.type === PronoteApiHomeworkReturnType.FILE_UPLOAD) {
        console.log("(return) => file upload", item.return.uploaded ? `(uploaded: ${item.return.uploaded.url})` : "(not uploaded)");

        if (item.return.uploaded) {
          await item.removeUploadedFile();
          console.info("(upload) => successfully removed");
        }
      }
    }

    console.log("---");
  }
})();
