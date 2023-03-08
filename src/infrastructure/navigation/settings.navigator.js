import React, { useEffect } from "react";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsScreen } from "../../features/settings/screens/setting.screen";
import { AppointmentList } from "../../features/settings/screens/my.appointments.screen";

const SettingStack = createStackNavigator();
export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: true, // Hide header by default
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingStack.Screen
        options={{
          header: () => null,
        }}
        name="Back"
        component={SettingsScreen}
      />
      <SettingStack.Screen name="Favourites" component={FavouritesScreen} />
      <SettingStack.Screen name="My Appointments" component={AppointmentList} />
    </SettingStack.Navigator>
  );
};
