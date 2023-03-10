const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const cors = require("cors")({ origin: true });
var serviceAccount = require("../serviceAccountKey.json");

const firestore = admin.firestore();

exports.register = functions.https.onCall((data, context) => {
  const age = data.age;
  const uid = data.uid;
  const sex = data.sex;
  const name = data.name;
  const email = data.email;
  const phone = data.phone;

  const appointmentData = {
    customer: name,
    uid: uid,
    age: age,
    sex: sex,
    Email: email,
    role: "Customer",
    phone: phone,
  };

  const customerId = uid; // Use the uid as the customer ID
  const customerRef = firestore.collection("customers").doc(customerId);
  return customerRef
    .set(appointmentData)
    .then(() => {
      console.log("Data saved to Firestore:", appointmentData);
      return { status: "success" };
    })
    .catch((error) => {
      console.error("Error saving data to Firestore:", error);
      return { status: "error", message: error.message };
    });
});
