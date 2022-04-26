import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import {ResterauntsScreen} from './src/features/resteraunts/screens/resteraunts.screen'
export default function App() {
  return (
    <>
      <ResterauntsScreen/>
      <ExpoStatusBar style="auto" />
    </>
  );
}


