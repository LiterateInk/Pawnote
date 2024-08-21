import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const handle = pronote.createSessionHandle();
  await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  // Grab all the homework for week 1 through week 4.
  const homework = await pronote.homeworkFromWeek(handle, 1, 4);

  console.log("---");

  for (const item of homework) {
    // Output something...
    console.log(item.subject.name, "to finish before the", item.deadline.toLocaleString());
    console.log("(description) =>", item.description);

    if (item.return.canUpload) {
      const fileName = "hello-world.txt";

      const encoder = new TextEncoder();
      const buffer = encoder.encode(`Hello, world! This file was sent by Pawnote, the ${Date.now()} !`);
      const file = new Blob([buffer], { type: "text/plain" });

      await pronote.homeworkUploadFile(handle, item.id, file, fileName);
      console.info("(upload) => successfully uploaded", fileName);
    }

    console.log("---");
  }
}();
