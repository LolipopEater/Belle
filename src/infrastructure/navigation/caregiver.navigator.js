import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { CareGiverDetailScreen } from "../../features/caregivers/screens/caregiver-detail.screen";
import { CareGiversScreen } from "../../features/caregivers/screens/caregiver.screen";
import { CareGiverScheduleScreen } from "../../features/caregivers/screens/schedule.screen";
const CareGiverStack = createStackNavigator();

//Care giver Screen Navigation system

export const CareGiversNavigator = () => {
  return (
    //options for the Navigator of caregivers deafult set to home
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
      <CareGiverStack.Screen
        name="Schedule"
        component={CareGiverScheduleScreen}
      />
    </CareGiverStack.Navigator>
  );
};
