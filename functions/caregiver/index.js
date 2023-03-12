const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const cors = require("cors")({ origin: true });
var serviceAccount = require("../serviceAccountKey.json");

const firestore = admin.firestore();

exports.getPartnerCustomer = functions.https.onCall(async (data, context) => {
  const CareGiverID = data.data.id;

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
    const caregiverDoc = caregiverSnapshot.docs[0]; //first accurance whereUID == id
    const placeID = caregiverDoc.id; //get PlaceID

    const customersRef = admin
      .firestore()
      .collection("caregivers")
      .doc(placeID)
      .collection("customers");
    const customersQuery = await customersRef.get();
    const customers = [];

    for (const doc of customersQuery.docs) {
      customers.push(doc.data());
    }

    return { data: customers };
  } catch (error) {
    return { error: error.message };
  }
});

exports.getProfile = functions.https.onCall(async (data, context) => {
  const customerID = data.data.id; //get id
  const place = data.data.place; //get id
  let notes;
  try {
    const CaregiverQuery = admin
      .firestore()
      .collection("customers")
      .doc(customerID)
      .collection(customerID + "-p");

    const appointments = [];
    const appointmentsQuery = await CaregiverQuery.where(
      "care",
      "==",
      place
    ).get();

    for (const doc of appointmentsQuery.docs) {
      appointments.push(doc.data());
    }
    const noteRef = admin
      .firestore()
      .collection("caregivers")
      .doc(place)
      .collection("customers")
      .doc(customerID);
    //Get the Notes from customer
    const doc = await noteRef.get();
    //if not exists create a placeholder if exists return it
    if (doc.exists && doc.data().hasOwnProperty("notes")) {
      notes = doc.data().notes;
    } else {
      const data = { notes: "Please add personal Note about the customer" };
      notes = data.notes;
      noteRef.set(data, { merge: true });
    }

    return { appointments: appointments, notes: notes };
  } catch (error) {
    return { error: error.message };
  }
});

exports.setSummary = functions.https.onCall(async (data, context) => {
  const customerID = data.data.id; //get id
  const appointmentId = data.data.appointmentId; //get id
  const sum = data.data.summary;
  try {
    const appointmentDocRef = admin
      .firestore()
      .collection("customers")
      .doc(customerID)
      .collection(customerID + "-p")
      .doc(appointmentId);

    await appointmentDocRef.update({ Comment: sum });
    return { success: "success!!!!" };
  } catch (error) {
    return { error: error.message };
  }
});

exports.setNotes = functions.https.onCall(async (data, context) => {
  const customerID = data.data.id; //get id
  const place = data.data.PlaceID; //get id
  const sum = data.data.summary;
  try {
    const appointmentDocRef = admin
      .firestore()
      .collection("caregivers")
      .doc(place)
      .collection("customers")
      .doc(customerID);

    await appointmentDocRef.update({ notes: sum });
    return { success: "success!!!!" };
  } catch (error) {
    return { error: error.message };
  }
});
