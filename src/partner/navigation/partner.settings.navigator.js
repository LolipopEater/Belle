import React, { useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsMainScreen } from "../screens/partner.setting.screen";

const SettingStack = createStackNavigator();
export const PartnerSettingsNavigator = ({ route, navigation }) => {
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
        component={SettingsMainScreen}
      />
    </SettingStack.Navigator>
  );
};
