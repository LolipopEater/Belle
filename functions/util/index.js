const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");
const cors = require("cors")({ origin: true });
var serviceAccount = require("../serviceAccountKey.json");

const firestore = admin.firestore();

exports.getFeatured = functions.https.onCall((data, context) => {
  const Ref = firestore.collection("util").doc("recomneded");

  return Ref.get()
    .then((querySnapshot) => {
      const data = querySnapshot.data();
      return { data };
    })
    .catch((error) => {
      console.log("Error getting user appointments:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error getting user appointments"
      );
    });
});

exports.requireRole = functions.https.onCall((data, context) => {
  const requiredRole = data.requiredRole;
  // Check if the user is authenticated
  if (!context.auth) {
    return { error: "User is not authenticated" };
  }
  // Check the user's role
  return admin
    .firestore()
    .collection("customers")
    .doc(context.auth.uid)
    .get()
    .then((doc) => {
      const userData = doc.data();
      if (userData.role === requiredRole) {
        // User has the required role
        return { success: "User has the required role" };
      } else {
        // User does not have the required role
        return { error: "User does not have the required role" };
      }
    })
    .catch((error) => {
      // Firestore error
      return { error: error.message };
    });
});

exports.requireRoleByEmail = functions.https.onCall(async (data, context) => {
  const email = data.email.toLowerCase();

  const query = admin
    .firestore()
    .collection("customers")
    .where("Email", "==", email);

  const snapshot = await query.get();
  const doc = snapshot.docs[0];
  return { role: doc.data().role, name: doc.data().customer };
});
