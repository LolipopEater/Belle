import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBZ8SKBzA5XNEBtxLoKHQFHh-f_zdxdMjk",
  authDomain: "mealstogo-362f3.firebaseapp.com",
  databaseURL: "https://mealstogo-362f3-default-rtdb.firebaseio.com",
  projectId: "mealstogo-362f3",
  storageBucket: "mealstogo-362f3.appspot.com",
  messagingSenderId: "791921958060",
  appId: "1:791921958060:web:b82d89d7a62cbcf6489309",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebaseApp, {
  persistence: browserLocalPersistence,
});

export const registerRequest = (email, password, reapeatedPassword) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logOut = () => auth.signOut();
