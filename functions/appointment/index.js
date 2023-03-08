const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const cors = require("cors")({ origin: true });
var serviceAccount = require("../serviceAccountKey.json");

exports.scheduleOperation = functions.https.onCall(async (data, context) => {
  const customer = data.data.CustomerID;
  const careGiver = data.data.CareGiverID;
  const timestamp = data.data.TimeStamp;
  const type = data.data.type;
  const name = data.data.name;
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
  //---- get only name---/
  const caregiverRef = admin
    .firestore()
    .collection("caregivers")
    .doc(careGiver);

  //----------add customer to caregiver Customer List----------//
  const originalDocRef = admin
    .firestore()
    .collection("customers")
    .doc(customer);

  const originalDocSnapshot = await originalDocRef.get();
  const originalData = originalDocSnapshot.data(); //clean data
  const newDocRef = admin
    .firestore()
    .collection("caregivers")
    .doc(careGiver)
    .collection("customers")
    .doc(customer);
  await newDocRef.set(originalData);
  //------------------------------------------------------------------//
  return caregiverRef.get().then((caregiverDoc) => {
    if (caregiverDoc.exists) {
      const caregiverData = caregiverDoc.data();
      const caregiverName = caregiverData.Name;

      const appointmentData = {
        customer: customer,
        date: firestoreTimestamp,
        type: type,
        Comment: "",
        approved: false,
        cancelled: false,
        care: careGiver,
        name: caregiverName,
        id: dayRef.id,
        customerName: name,
      };

      customerRef.set(appointmentData);

      const appointmentRef = dayRef;
      return new Promise((resolve) => {
        resolve(appointmentRef.set({ ...appointmentData }));
      });
    } else {
      throw new Error("Caregiver document does not exist");
    }
  });
});

exports.cancelOperation = functions.https.onCall((data, context) => {
  const customer = data.data.CustomerID;
  const careGiver = data.data.CareGiverID;
  const timestamp = data.data.TimeStamp;
  const uid = data.data.id;

  //extract path from timstamp
  const date = new Date(timestamp * 1000);
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
    .doc(uid);

  //----------------------------------------------------------------------//
  const customerRef = admin
    .firestore()
    .collection("customers")
    .doc(customer)
    .collection(`${customer}-p`)
    .doc(uid);

  return Promise.all([
    dayRef.update({ cancelled: true }),
    customerRef.update({ cancelled: true }),
  ])
    .then(() => {
      return { data: "success" };
    })
    .catch(() => {
      return { data: "Error cancelling" };
    });
});

exports.approveOperation = functions.https.onCall(async (data, context) => {
  const customer = data.data.CustomerID;
  const careGiver = data.data.CareGiverID;
  const timestamp = data.data.TimeStamp;
  const uid = data.data.id;
  // return {
  //   custome: customer,
  //   careGiver: careGiver,
  //   timestamp: timestamp,
  //   uid: uid,
  // };

  //extract path from timstamp
  const date = new Date(timestamp * 1000);
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
    .doc(uid);

  //----------------------------------------------------------------------//
  const customerRef = admin
    .firestore()
    .collection("customers")
    .doc(customer)
    .collection(`${customer}-p`)
    .doc(uid);

  return Promise.all([
    dayRef.update({ approved: true }),
    customerRef.update({ approved: true }),
  ])
    .then(() => {
      return { data: "success" };
    })
    .catch(() => {
      return { data: "Error Approving" };
    });
});
