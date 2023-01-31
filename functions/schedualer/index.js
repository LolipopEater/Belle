const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require("url");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mealstogo-362f3-default-rtdb.firebaseio.com",
});

exports.getSchedualer = functions.firestore
  .document("Feed/{FeedDoc}/comments/{commentDoc}")
  .onCreate(async (snap, context) => {
    const commentData = snap.data();

    const feedDocId = context.params.FeedDoc;
    const feedSnap = await admin.firestore().doc(`Feed/${FeedDocId}`).get();
    // ...
  });
