import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiNewsQuestionType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance don't have any news.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const news = await pronote.getNews();

  console.log("--- Available categories :");
  news.categories.forEach((category) => {
    console.log(category.name, category.isDefault ? "(default)" : "");
  });

  news.views.forEach((view) => {
    console.log(`\n--- News for view/group ${view.type} :`);
    view.items.forEach((item) => {
      console.log(item.isInformation ? "Information" : "Survey", ":", item.title ?? "(no title)", "by", item.author);
      console.log("Category:", item.category.name);
      console.log("Read:", item.read);
      console.log("Created the", item.creationDate.toLocaleString());
      console.log("Starts the", item.startDate.toLocaleString(), "and ends the", item.endDate.toLocaleString());

      if (item.questions.length > 0) {
        console.log("Questions:");
        item.questions.forEach((question) => {
          console.log("\t-", question.title || question.fullTitle);

          let type: string;
          switch (question.type) {
            case PronoteApiNewsQuestionType.InformationText:
            case PronoteApiNewsQuestionType.SurveyText: type = "Text"; break;
            case PronoteApiNewsQuestionType.MultipleChoice: type = "Multiple choice"; break;
            case PronoteApiNewsQuestionType.UniqueChoice: type = "Unique choice"; break;
          }

          console.log("\t\t- Type:", type);
          console.log("\t\t- Content:", question.content);

        });
      }

      console.log("---"); // Line break.
    });
  });
})();
