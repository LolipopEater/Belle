import React, { useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsMainScreen } from "../screens/partner.setting.screen";
import { HoursScreen } from "../settings/hours.component";
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
        navigation={navigation}
      />

      <SettingStack.Screen
        name="Hours settings"
        component={HoursScreen}
        navigation={navigation}
      />
    </SettingStack.Navigator>
  );
};
