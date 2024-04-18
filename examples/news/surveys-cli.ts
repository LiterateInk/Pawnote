import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiNewsQuestionType, StudentNewsSurvey } from "../../src";
import { select, input, checkbox } from "@inquirer/prompts";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance don't have any news.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const news = await pronote.getNews();
  const surveys = news.items.filter((item) => item instanceof StudentNewsSurvey) as StudentNewsSurvey[] ?? [];

  const survey = await select({
    message: "Which one do you want to answer?",
    choices: surveys.map((survey) => ({
      name: survey.title ?? "(no title)",
      value: survey
    }))
  });

  if (!survey) {
    console.error("No survey selected, aborting...");
    return;
  }

  console.info(
    [
      "You selected the survey",
      survey.title ?? "(no title)",
      "by",
      survey.author
    ].join(" ")
  );

  for (const question of survey.questions) {
    if (question.type === PronoteApiNewsQuestionType.SurveyText) {
      console.info(question.content);
      continue;
    }

    // Display the title before anything.
    console.info("\n" + question.fullTitle);

    if (question.type === PronoteApiNewsQuestionType.TextInput) {
      const answer = await input({
        default: question.answered ? question.textInputAnswer : undefined,
        message: question.content
      });

      question.patch(answer);
    }
    else if (question.type === PronoteApiNewsQuestionType.UniqueChoice) {
      const selected = await select({
        message: question.content,
        default: question.answered ? question.selectedAnswers?.[0] : undefined,
        choices: question.choices.map((choice) => ({
          name: choice.value,
          value: choice.position
        }))
      });

      // Check if the selected choice doesn't have a text input.
      const selectedChoice = question.choices.find((choice) => choice.position === selected);

      // If so, ask for the text input.
      if (selectedChoice?.isTextInput) {
        const textInputAnswer = await input({
          default: question.answered ? question.textInputAnswer : undefined,
          message: selectedChoice.value
        });

        question.patch([selected], textInputAnswer);
      }
      // Otherwise, just push it as is.
      else question.patch([selected]);
    }
    else if (question.type === PronoteApiNewsQuestionType.MultipleChoice) {
      const answers = await checkbox({
        message: question.content,
        validate (items) {
          if (question.shouldRespectMaximumChoices && items.length > question.maximumChoices)
            return "You can't select more than " + question.maximumChoices + " choices.";

          return true;
        },
        choices: question.choices.map((choice) => ({
          name: choice.value,
          value: choice.position
        }))
      });

      let shouldAskForTextInput = false;
      for (const answerPosition of answers) {
        const selectedChoice = question.choices.find((choice) => choice.position === answerPosition);
        if (selectedChoice?.isTextInput) {
          shouldAskForTextInput = true;
          break;
        }
      }

      if (shouldAskForTextInput) {
        const textInputAnswer = await input({
          default: question.answered ? question.textInputAnswer : undefined,
          message: "Please provide a text input for the selected choices."
        });

        question.patch(answers, textInputAnswer);
      }
      else question.patch(answers);
    }
  }

  await survey.answer();
})();
