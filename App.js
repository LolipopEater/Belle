import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { ResterauntsScreen } from "./src/features/resteraunts/screens/resteraunts.screen";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
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
    <ThemeProvider theme={theme}>
      <ResterauntsScreen />
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  );
}
