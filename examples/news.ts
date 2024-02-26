import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiAttachmentType, PronoteApiNewsQuestionType, StudentNewsInformation, StudentNewsSurvey } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance don't have any news.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const news = await pronote.getNews();

  console.group("--- Available categories :");
  news.categories.forEach((category) => {
    console.log(category.name, category.default ? "(default)" : "");
  });
  console.groupEnd();

  console.log("\n--- Items :");
  news.items.forEach((item) => {
    if (item instanceof StudentNewsSurvey) {
      // console.log("Survey", ":", item.title ?? "(no title)", "by", item.author);
      // console.log("Category:", item.category.name);
      // console.log("Read:", item.read);
      // console.log("Created the", item.creationDate.toLocaleString());
      // console.log("Starts the", item.startDate.toLocaleString(), "and ends the", item.endDate.toLocaleString());

      // if (item.questions.length > 0) {
      //   console.group("Questions:");

      //   for (const question of item.questions) {
      //     console.group((question.title || question.fullTitle) + ":");

      //     let type: string;
      //     switch (question.type) {
      //       case PronoteApiNewsQuestionType.InformationText:
      //       case PronoteApiNewsQuestionType.SurveyText: type = "Text"; break;
      //       case PronoteApiNewsQuestionType.MultipleChoice: type = "Multiple choice"; break;
      //       case PronoteApiNewsQuestionType.UniqueChoice: type = "Unique choice"; break;
      //     }

      //     console.log("Type:", type);
      //     console.log("Content:", question.content);

      //     if (question.attachments.length > 0) {
      //       console.group("Attachments:");

      //       for (const attachment of question.attachments) {
      //         console.log(
      //           attachment.type === PronoteApiAttachmentType.File ? "File:" : "Link:",
      //           attachment.name, "=>", attachment.url
      //         );
      //       }

      //       console.groupEnd();
      //     }

      //     console.groupEnd();
      //   }

      //   console.groupEnd();
      // }
    }
    else if (item instanceof StudentNewsInformation) {
      console.log("Information:", item.title ?? "(no title)", "by", item.author);
      console.log("Category:", item.category.name);
      console.log("Read:", item.read);
      console.log("Acknowledged:", item.acknowledged, "- Need to acknowledge:", item.needToAcknowledge);
      console.log("Created the", item.creationDate.toLocaleString());

      console.log("\n" + item.content);

      if (item.attachments.length > 0) {
        console.group("\nAttachments:");

        for (const attachment of item.attachments) {
          console.log(
            attachment.type === PronoteApiAttachmentType.File ? "File:" : "Link:",
            attachment.name, "=>", attachment.url
          );
        }

        console.groupEnd();
      }
    }

    console.log("---"); // Line break.
  });
})();
