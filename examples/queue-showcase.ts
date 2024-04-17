import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

/**
 * This demo is about the queue in Pawnote.
 *
 * When running this demo without the queue, all the requests will be done at the same time.
 * The issue with this is that Pronote have an `order` key.
 *
 * If the requests are not done in the given order, the session will be completely destroyed
 * and unusable, all you have to do is then recreate a new `Pronote` instance.
 *
 * To prevent this behavior, Pawnote implements a queue of requests, so even if you do
 * a lot of requests at the same time, they'll stay in order.
 */
(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  // Get the timetable for the 4 first weeks.
  const timetables = await Promise.all(
    [1, 2, 3, 4].map((weekNumber) => pronote.getHomeworkForWeek(weekNumber))
  );

  const amountOfLessons = timetables.map((timetable) => timetable.length);
  amountOfLessons.forEach((amount, index) => {
    console.log(`For week ${index + 1}, there is ${amount} lessons.`);
  });
})();
