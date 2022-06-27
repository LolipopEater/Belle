import React, { useState, useContext, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.commponent";
import {
  LoginBackground,
  LoginCover,
  LoginContainer,
  Submit,
  TextField,
} from "../components/login.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [userName, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isAuthenticated, error } = useContext(AuthenticationContext);

  const onSubmit = () => {
    onLogin(userName, password);
    if (isAuthenticated) {
      navigation.navigate("Main");
    } else {
      console.log(error);
    }
  };

  return (
    <LoginBackground>
      <LoginCover />
      <LoginContainer>
        <TextField
          label="Email"
          value={userName}
          onChangeText={(t) => setUserEmail(t)}
        />
        <Spacer size="large" />
        <TextField
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          secure
        />
        {error && (
          <Spacer size="large">
            <Text variant="error">{error}</Text>
          </Spacer>
        )}
        <Spacer size="large" />
        <Spacer size="large" />
        <Submit title="Login" onPress={onSubmit}>
          Submit
        </Submit>
      </LoginContainer>
    </LoginBackground>
  );
};
