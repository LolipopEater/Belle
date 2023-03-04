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
  const firestoreTimestamp = admin.firestore.Timestamp.fromMillis(timestamp);
  //extract path from timstamp
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // get the month value (zero-based index, so add 1)
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(-2); // get the last two digits of the year
  const formattedDate = `${month}-${year}`;
  //----------------------------------------------------------------------//
  const dayRef = admin
    .firestore()
    .collection("caregivers")
    .doc(careGiver)
    .collection(`${careGiver}-p`)
    .doc(`${formattedDate}`)
    .collection(`${day}`)
    .doc();
  //----------------------------------------------------------------------//
  const customerRef = admin
    .firestore()
    .collection("customers")
    .doc(customer)
    .collection(`${customer}-p`)
    .doc(dayRef.id);

  const appointmentData = {
    customer: customer,
    date: firestoreTimestamp,
    type: type,
    Comment: "",
    approved: false,
    cancelled: false,
    care: careGiver,
  };
  customerRef.set(appointmentData);
  const appointmentRef = dayRef; // use the dayRef as the appointment reference
  return new Promise((resolve) => {
    resolve(appointmentRef.set({ ...appointmentData, id: dayRef.id }));
  });
});
