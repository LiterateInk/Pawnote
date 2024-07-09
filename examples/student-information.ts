import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const information = await pronote.getPersonalInformation();

  console.log("Logged into", pronote.studentName, "studying at", pronote.schoolName, "in", pronote.studentClass);

  console.log("Lives at", information.address[0]);
  console.log("More precisely at", information.city, information.province || "(no province)", "in", information.country || "(no country)");
  console.log("Can be called at", information.phone, "and emailed at", information.email);

  console.log(); // Break line.

  if (pronote.studentProfilePictureURL) {
    console.log("-> Profile Picture URL:", pronote.studentProfilePictureURL);
  }
  if (information.iCalToken) {
    console.log("-> Timetable .ics URL:", pronote.getTimetableICalURL(information.iCalToken));
  }

  console.log("-> INE:", information.INE);
})();
