import * as pronote from "../../src";
import { credentials } from "../_credentials";
import { select } from "@inquirer/prompts";

const isDiscussionInTrash = (discussion: pronote.Discussion) => {
  return discussion.folders.some((folder) => folder.kind === pronote.DiscussionFolderKind.OCEM_Pre_Poubelle);
};

void async function main () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  const discussions = await pronote.discussions(session);

  while (true) {
    for (const discussion of discussions.items) {
      console.log(discussion.subject);

      if (isDiscussionInTrash(discussion)) {
        console.log("|> This discussion is in the trash.");

        const action = await select({
          message: "What do you want to do?",
          default: "nothing",
          choices: [
            {
              name: "Restore the discussion",
              value: "restore" as const
            },
            {
              name: "Delete the discussion permanently",
              value: "delete" as const
            },
            {
              name: "Nothing",
              value: "nothing" as const
            }
          ]
        });

        switch (action) {
          case "restore": {
            await pronote.discussionRestoreTrash(session, discussion);
            console.info("|> Discussion restored.");
            break;
          }
          case "delete": {
            await pronote.discussionDelete(session, discussion);
            console.info("|> Discussion deleted permanently.");
            break;
          }
          case "nothing":
            break;
        }
      }
      else {
        console.log("|> This discussion is not in any folder.");

        const action = await select({
          message: "What do you want to do?",
          default: "nothing",
          choices: [
            {
              name: "Trash the discussion",
              value: "trash" as const
            },
            {
              name: "Delete the discussion permanently",
              value: "delete" as const
            },
            {
              name: "Nothing",
              value: "nothing" as const
            }
          ]
        });

        switch (action) {
          case "trash": {
            await pronote.discussionTrash(session, discussion);
            console.info("|> Discussion trashed.");
            break;
          }
          case "delete": {
            await pronote.discussionDelete(session, discussion);
            console.info("|> Discussion deleted permanently.");
          }
          case "nothing":
            break;
        }

      }
    }

    const shouldContinue = await select({
      message: "All discussions were managed, do you want to continue?",
      default: "yes",
      choices: [
        {
          name: "Yes, loop again in the discussions",
          value: true
        },
        {
          name: "No, exit",
          value: false
        }
      ]
    });

    if (!shouldContinue) break;
  }
}();
