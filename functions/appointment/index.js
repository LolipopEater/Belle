const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const cors = require("cors")({ origin: true });
var serviceAccount = require("../serviceAccountKey.json");

exports.scheduleOperation = functions.https.onCall((data, context) => {
  const customer = data.data.CustomerID;
  const careGiver = data.data.CareGiverID;
  const timestamp = data.data.TimeStamp;
  const type = data.data.type;

  const date = new Date(timestamp);
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(-2); // get the last two digits of the year
  const formattedDate = `${day}-${year}`;

  const appointmentData = {
    customer: customer,
    date: timestamp,
    type: type,
    Comment: "",
    day: day,
    year: formattedDate,
  };

  return new Promise((resolve) => {
    resolve(appointmentData);
  });
});
