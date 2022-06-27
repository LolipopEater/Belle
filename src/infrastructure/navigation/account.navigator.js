import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
const Stack = createStackNavigator();
import { Text, View } from "react-native";
const screenOptions = ({ route }) => {
  return {
    tabBarActiveTintColor: "purple",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};
export const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Main" component={AccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
