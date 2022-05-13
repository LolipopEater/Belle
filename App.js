import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { ResterauntsScreen } from "./src/features/resteraunts/screens/resteraunts.screen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { SafeArea } from "./src/components/utility/safe-area.component";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
const Tab = createBottomTabNavigator();

const MapScreen = () => {
  return (
    <SafeArea>
      <Text>Home!</Text>
    </SafeArea>
  );
};

const SettingsScreen = () => {
  return (
    <SafeArea>
      <Text>Settings!</Text>
    </SafeArea>
  );
};
const HomeScreen = () => {
  return (
    <SafeArea>
      <ResterauntsScreen />
    </SafeArea>
  );
};

const TAB_ICON = {
  Resteraunts: "ios-fast-food",
  Settings: "ios-list-circle",
  Map: "map-sharp",
};

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "purple",
    tabBarInactiveTintColor: "gray",
  };
};

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
        <RestaurantsContextProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="Resteraunts" component={HomeScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantsContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
