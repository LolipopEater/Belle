import { getAuth } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  logOut,
  onAuthChange,
} from "./authentication.service";

var admin = require("firebase-admin");

var serviceAccount = require("initilize.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mealstogo-362f3-default-rtdb.firebaseio.com",
});
