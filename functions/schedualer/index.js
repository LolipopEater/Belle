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