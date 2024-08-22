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

  console.group("--- Available categories :");
  news.categories.forEach((category) => {
    console.log(category.name, category.default ? "(default)" : "");
  });
  console.groupEnd();

  console.log("\n--- Items :");
  news.items.forEach((item) => {
    if (item.is === "survey") {
      console.log("Survey", ":", item.title ?? "(no title)", "by", item.author);
      console.log("Category:", item.category.name);
      console.log("Read:", item.read);
      console.log("Created the", item.creationDate.toLocaleString());
      console.log("Starts the", item.startDate.toLocaleString(), "and ends the", item.endDate.toLocaleString());

      if (item.questions.length > 0) {
        console.group("Questions:");

        for (const question of item.questions) {
          console.group((question.title || question.fullTitle) + ":");

          let type: string;
          switch (question.kind) {
            case pronote.NewsQuestionKind.InformationText:
            case pronote.NewsQuestionKind.SurveyText: type = "Text"; break;
            case pronote.NewsQuestionKind.TextInput: type = "Text input"; break;
            case pronote.NewsQuestionKind.MultipleChoice: type = "Multiple choice"; break;
            case pronote.NewsQuestionKind.UniqueChoice: type = "Unique choice"; break;
          }

          console.log("Type:", type);
          console.log("Content:", question.content);

          if (question.attachments.length > 0) {
            console.group("Attachments:");

            for (const attachment of question.attachments) {
              console.log(
                attachment.kind === pronote.AttachmentKind.File ? "File:" : "Link:",
                attachment.name, "=>", attachment.url
              );
            }

            console.groupEnd();
          }

          if (question.kind === pronote.NewsQuestionKind.TextInput) {
            console.log("Answer:", question.textInputAnswer ?? "(no answer)");
          }
          else {
            if (question.choices.length > 0) {
              console.group("Choices:");

              const answer = question.selectedAnswers;
              const makePrefix = (index: number) => {
                let out = "-";

                if (typeof answer !== "undefined") {
                  return out + " " + (answer.includes(index) ? "[x]" : "[ ]");
                }

                return out;
              };

              for (const choice of question.choices) {
                console.log(makePrefix(choice.position), choice.value, choice.isTextInput ? `: ${question.textInputAnswer ?? "(no answer)"}` : "");
              }

              console.groupEnd();
            }
          }

          console.groupEnd();
        }

        console.groupEnd();
      }
    }
    else if (item.is === "information") {
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
            attachment.kind === pronote.AttachmentKind.File ? "File:" : "Link:",
            attachment.name, "=>", attachment.url
          );
        }

        console.groupEnd();
      }
    }

    console.log("---"); // Line break.
  });
}();
