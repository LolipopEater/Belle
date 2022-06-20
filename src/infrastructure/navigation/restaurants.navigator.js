import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantDetailScreen } from "../../features/resteraunts/screens/restaurant-detail.screen";
import { ResterauntsScreen } from "../../features/resteraunts/screens/resteraunts.screen";
const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      })}
    >
      <RestaurantStack.Screen name="Home" component={ResterauntsScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
