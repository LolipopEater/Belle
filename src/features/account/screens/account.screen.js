import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  RegisterButton,
  Title,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          title="Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </AuthButton>
        <Spacer size="large" />
        <RegisterButton
          title="Register"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </RegisterButton>
      </AccountContainer>
    </AccountBackground>
  );
};
