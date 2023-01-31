const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mealstogo-362f3-default-rtdb.firebaseio.com",
});

exports.getSchedualer = functions.https.onRequest(async (request, response) => {
  const { caregiverId, month, day } = url.parse(request.url, true).query; //extract the get requst by ID
  if (!caregiverId) {
    return response.status(400).send({ error: "caregiverId is required" });
  }

  try {
    const caregiverRef = admin
      .firestore()
      .collection("caregivers")
      .doc(caregiverId);

    const subCollectionData = [];
    const appointments = []; //show all appointments in db that day

    const caregiverSnapshot = await caregiverRef.get();

    subCollectionData.push(caregiverSnapshot.data());

    const dayRef = admin
      .firestore()
      .collection("caregivers")
      .doc(caregiverId)
      .collection(caregiverId + "-p")
      .doc(month);

    const daySnapShot = await dayRef.collection(day).get();

    daySnapShot.forEach((doc) => {
      appointments.push(doc.data());
    });

    subCollectionData.push(appointments);

    if (!caregiverSnapshot.exists) {
      return response.status(404).send({ error: "Caregiver not found" });
    }

    return response.send(subCollectionData);
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
});
