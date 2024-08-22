import * as pronote from "../../src";
import { credentials } from "../_credentials";
import { select, input, checkbox } from "@inquirer/prompts";

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
  const surveys = news.items.filter((item) => item.is === "survey") as pronote.NewsSurvey[] ?? [];

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
    if (question.kind === pronote.NewsQuestionKind.SurveyText) {
      console.info(question.content);
      continue;
    }

    // Display the title before anything.
    console.info("\n" + question.fullTitle);

    if (question.kind === pronote.NewsQuestionKind.TextInput) {
      const answer = await input({
        default: question.answered ? question.textInputAnswer : undefined,
        message: question.content
      });

      pronote.newsQuestionLocalMutate(question, answer);
    }
    else if (question.kind === pronote.NewsQuestionKind.UniqueChoice) {
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

        pronote.newsQuestionLocalMutate(question, [selected], textInputAnswer);
      }
      // Otherwise, just push it as is.
      else pronote.newsQuestionLocalMutate(question, [selected]);
    }
    else if (question.kind === pronote.NewsQuestionKind.MultipleChoice) {
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

        pronote.newsQuestionLocalMutate(question, answers, textInputAnswer);
      }
      else pronote.newsQuestionLocalMutate(question, answers);
    }
  }

  await pronote.newsSurveySend(session, survey);
}();
