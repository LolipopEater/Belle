import React, { useContext, useState } from "react";
import { Button } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
export const SettingsScreen = ({ navigation }) => {
  const { onLogOut } = useContext(AuthenticationContext);

  const press = () => {
    onLogOut();
  };

  return (
    <SafeArea>
      <Text>Settings!</Text>
      <Button title="LogOut" onPress={press} />
    </SafeArea>
  );
};
