import React, { useEffect } from "react";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsScreen } from "../../features/settings/screens/setting.screen";

const SettingStack = createStackNavigator();
export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingStack.Screen name="Favourites" component={FavouritesScreen} />
    </SettingStack.Navigator>
  );
};
