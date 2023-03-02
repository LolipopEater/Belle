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

  //extract path from timstamp
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // get the month value (zero-based index, so add 1)
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(-2); // get the last two digits of the year
  const formattedDate = `${month}-${year}`;
  //----------------------------------------------------------------------//

  //getFirebase Path//
  //code here

  //----------------------------------------------------------------------//

  const appointmentData = {
    customer: customer,
    date: timestamp,
    type: type,
    Comment: "",
    approved: false,
    cancelled: false,
  };

  return new Promise((resolve) => {
    resolve(appointmentData);
  });
});
