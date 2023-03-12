import React, { useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { CustomersList } from "../customers/screen/customer.list.screen";
import { CustomerProfileScreen } from "../customers/screen/customer.profile";
import { CareGiverScheduleScreen } from "../customers/screen/customer.schedule.screen";
const CustomerList = createStackNavigator();

export const CustomerListNav = ({ route, navigation }) => {
  return (
    <CustomerList.Navigator
      screenOptions={{
        headerShown: true, // Hide header by default
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <CustomerList.Screen
        options={{
          header: () => null,
        }}
        name="Back"
        component={CustomersList}
      />
      <CustomerList.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
      />
      <CustomerList.Screen
        name="Scheduler"
        component={CareGiverScheduleScreen}
      />
    </CustomerList.Navigator>
  );
};
