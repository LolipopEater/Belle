import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CareGiversNavigator } from "./caregiver.navigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { CareGiversContextProvider } from "../../services/caregivers/caregiver.context";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsNavigator } from "./settings.navigator";
const Tab = createBottomTabNavigator();
const TAB_ICON = {
  CareGivers: "ios-fast-food",
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
    headerShown: false,
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <CareGiversContextProvider>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="CareGivers" component={CareGiversNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
      </CareGiversContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
