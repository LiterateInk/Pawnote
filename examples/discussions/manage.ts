import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiDiscussionFolderType, StudentDiscussion } from "../../src";
import { select } from "@inquirer/prompts";

const isDiscussionInTrash = (discussion: StudentDiscussion) => {
  return discussion.folders.some((folder) => folder.type === PronoteApiDiscussionFolderType.OCEM_Pre_Poubelle);
};

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const overview = await pronote.getDiscussionsOverview();

  while (true) {
    for (const discussion of overview.discussions) {
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
            await discussion.restoreFromTrash();
            console.info("|> Discussion restored.");
            break;
          }
          case "delete": {
            await discussion.deletePermanently();
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
            await discussion.moveToTrash();
            console.info("|> Discussion trashed.");
            break;
          }
          case "delete": {
            await discussion.deletePermanently();
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
})();
