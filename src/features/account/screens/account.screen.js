import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  RegisterButton,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
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
