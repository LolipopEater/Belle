import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
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

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
export default function App() {
  const [oswaldLoaded, error] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded, errorLato] = useLato({
    Lato_400Regular,
  });
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
