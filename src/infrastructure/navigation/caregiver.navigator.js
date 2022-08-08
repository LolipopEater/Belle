import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { CareGiverDetailScreen } from "../../features/caregivers/screens/caregiver-detail.screen";
import { CareGiversScreen } from "../../features/caregivers/screens/caregiver.screen";
const CareGiverStack = createStackNavigator();

export const CareGiversNavigator = () => {
  return (
    <CareGiverStack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      })}
    >
      <CareGiverStack.Screen name="Home" component={CareGiversScreen} />
      <CareGiverStack.Screen
        name="CareGiverDetail"
        component={CareGiverDetailScreen}
      />
    </CareGiverStack.Navigator>
  );
};
