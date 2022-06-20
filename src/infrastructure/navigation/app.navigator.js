import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantsNavigator } from "./restaurants.navigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Restaurants: "ios-fast-food",
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
export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
