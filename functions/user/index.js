const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const cors = require("cors")({ origin: true });
var serviceAccount = require("../serviceAccountKey.json");

const firestore = admin.firestore();

exports.getUserAppointments = functions.https.onCall((data, context) => {
  const uid = data.data.uid;
  const AppoinRef = firestore
    .collection("customers")
    .doc(uid)
    .collection(uid + "-p");

  return AppoinRef.get()
    .then((querySnapshot) => {
      const appointments = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      return { appointments };
    })
    .catch((error) => {
      console.log("Error getting user appointments:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error getting user appointments"
      );
    });
});
