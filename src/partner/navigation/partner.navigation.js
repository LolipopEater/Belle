import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PartnerSchedulerContextProvider } from "../services/schedulaer/partner.scheduler.context";
import { AnalyticsScreen } from "../screens/analytics.screen";
import { CalanderScreen } from "../screens/partner.calander.screen";
import { ChatScreen } from "../screens/partner.chat.screen";
import { DashBoardScreen } from "../screens/partner.dashboard.screen";
import { PartnerSettingsNavigator } from "./partner.settings.navigator.js";
import { CustomerListNav } from "./customerList.navigation";
import { CustomerContextProvider } from "../services/customers/customers.context";
const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Analytics: "md-analytics",
  Calander: "md-calendar",
  Settings: "md-settings",
  Chat: "ios-chatbubbles",
  DashBoard: "ios-desktop",
  Customers: "book",
};
const screenOptions = ({ route }) => {
  //routing bottoms Icons and settings
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

export const PartnerNavigator = () => (
  <CustomerContextProvider>
    <PartnerSchedulerContextProvider>
      {/* {routing system for Portal} */}
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="DashBoard" component={DashBoardScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Calander" component={CalanderScreen} />
        <Tab.Screen name="Customers" component={CustomerListNav} />
        <Tab.Screen name="Settings" component={PartnerSettingsNavigator} />
      </Tab.Navigator>
    </PartnerSchedulerContextProvider>
  </CustomerContextProvider>
);
