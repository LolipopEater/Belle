import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { List, Avatar } from "react-native-paper";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Spacer } from "../../components/spacer/spacer.component";
import styled from "styled-components/native";

export const SettingsMainScreen = ({ navigation, route }) => {
  const { onLogOut, user, name } = useContext(AuthenticationContext);
  const press = () => {
    onLogOut();
  };
  const Hours = () => {
    navigation.navigate("Hours settings");
  };
  const SettingItem = styled(List.Item)`
    padding: ${(props) => props.theme.space[3]};
  `;
  const AvatarContainer = styled.View`
    align-items: center;
  `;
  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
        <Spacer position="top" size="large">
          <Text variant="label">{name}' Settings!</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingItem
          style={{ padding: 16 }}
          title="LogOut"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={() => press()}
        />
        <SettingItem
          style={{ padding: 16 }}
          title="Hours Settings"
          left={(props) => <List.Icon {...props} color="black" icon="clock" />}
          onPress={() => Hours()}
        />
      </List.Section>
    </SafeArea>
  );
};
