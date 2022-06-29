import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ8SKBzA5XNEBtxLoKHQFHh-f_zdxdMjk",
  authDomain: "mealstogo-362f3.firebaseapp.com",
  databaseURL: "https://mealstogo-362f3-default-rtdb.firebaseio.com",
  projectId: "mealstogo-362f3",
  storageBucket: "mealstogo-362f3.appspot.com",
  messagingSenderId: "791921958060",
  appId: "1:791921958060:web:b82d89d7a62cbcf6489309",
};
// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();

export const registerRequest = (email, password, reapeatedPassword) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
