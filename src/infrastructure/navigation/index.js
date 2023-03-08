import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator";
import { PartnerNavigator } from "../../partner/navigation/partner.navigation";

export const Navigation = () => {
  const { isAuthenticated, status, partnerRole, user } = useContext(
    AuthenticationContext
  );
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    if (status === "partner" && partnerRole) {
      return (
        <NavigationContainer>
          <PartnerNavigator />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      );
    }
  } else {
    return (
      <NavigationContainer>
        <AccountNavigator />
      </NavigationContainer>
    );
  }
};
