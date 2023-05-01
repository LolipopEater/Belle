const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const mock = require("./mock/mockCaregiver");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mealstogo-362f3-default-rtdb.firebaseio.com",
});

exports.getSchedualer = functions.https.onRequest(async (request, response) => {
  const { caregiverId, month, day, env } = url.parse(request.url, true).query; //extract the get requst by ID
  if (!caregiverId) {
    return response.status(400).send({ error: "caregiverId is required" });
  }
  if (env === "true") {
    //if mock environment send mock data
    return response.send(mock);
  }
  try {
    //invoke firebase query
    const caregiverRef = admin
      .firestore()
      .collection("caregivers")
      .doc(caregiverId); // refrene to the needed document

    const subCollectionData = [];
    const appointments = []; //show all appointments in db that day

    const caregiverSnapshot = await caregiverRef.get();
    if (!caregiverSnapshot.exists) {
      return response.status(404).send({
        error:
          "Caregiver not found Or one of the parameters Chosen is incorrect",
      });
    }

    subCollectionData.push(caregiverSnapshot.data()); //add that to the final array we will send to the customer

    const dayRef = admin
      .firestore()
      .collection("caregivers")
      .doc(caregiverId)
      .collection(caregiverId + "-p")
      .doc(month); //refrence to the specific month

    const daySnapShot = await dayRef.collection(day).get(); // refrence to the specific day collection

    daySnapShot.forEach((doc) => {
      //get all appointments that day and insert them into an array
      appointments.push(doc.data());
    });
    subCollectionData.push(appointments); //get all appointments that day and insert them into an array

    return response.send(subCollectionData); // return
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
});

exports.partnerCalendarRequest = functions.https.onCall(
  async (data, context) => {
    const { CareGiverID, month, day, env } = data.data;
    if (!CareGiverID) {
      return { error: "caregiverId is required" };
    }
    if (env === "true") {
      return { data: mock };
    }
    try {
      const caregiverQuery = admin
        .firestore()
        .collection("caregivers")
        .where("UID", "==", CareGiverID);

      const caregiverSnapshot = await caregiverQuery.get();

      if (caregiverSnapshot.empty) {
        return {
          error:
            "Caregiver not found or one of the parameters chosen is incorrect",
        };
      }

      const caregiverDoc = caregiverSnapshot.docs[0];
      const placeID = caregiverDoc.id;

      const caregiverRef = caregiverDoc.ref;

      const subCollectionData = [];
      const appointments = [];

      subCollectionData.push(caregiverDoc.data());

      const dayRef = caregiverRef
        .collection(`${placeID}-p`)
        .doc(month)
        .collection(day);
      const daySnapshot = await dayRef.get();

      daySnapshot.forEach((doc) => {
        appointments.push(doc.data());
      });

      subCollectionData.push(appointments);

      return { data: subCollectionData, placeID: placeID };
    } catch (error) {
      return { error: error.message };
    }
  }
);

exports.checkIfInProggram = functions.https.onCall(async (data, context) => {
  const place = data.data.CareGiverID;

  try {
    const customerRef = admin.firestore().collection("caregivers").doc(place);
    const customerDoc = await customerRef.get();
    if (customerDoc.exists && customerDoc.data().isActive) {
      return { response: true };
    } else {
      return { response: false };
    }
  } catch (error) {
    return { error: error.message };
  }
});
