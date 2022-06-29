import React, { useState, useContext, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  RegisterBackground,
  RegisterCover,
  RegisterContainer,
  Submit,
  TextField,
  Title,
  Back,
  ErrorContainer,
} from "../components/register.styles";
import { Text } from "../../../components/typography/text.commponent";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reapeatedPassword, setRepeatedPassword] = useState("");
  const { isAuthenticated, error, onRegister } = useContext(
    AuthenticationContext
  );

  const onSubmit = () => {
    onRegister(userEmail, password, reapeatedPassword);
    if (isAuthenticated) {
      navigation.navigate("Main");
    } else {
      console.log(error);
    }
  };

  const onBack = () => {
    navigation.navigate("Main");
  };

  return (
    <RegisterBackground>
      <RegisterCover />
      <Title>Meals To Go</Title>
      <RegisterContainer>
        <TextField
          label="Email"
          value={userEmail}
          onChangeText={(t) => setUserEmail(t)}
        />
        <Spacer size="large" />
        <TextField
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          secureTextEntry={true}
        />
        <Spacer size="large" />
        <TextField
          label="Reapeat Password"
          value={reapeatedPassword}
          onChangeText={(t) => setRepeatedPassword(t)}
          secureTextEntry={true}
        />
        <Spacer size="large" />
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large" />
        <Submit title="Register" onPress={onSubmit}>
          Submit
        </Submit>
      </RegisterContainer>
      <Spacer size="large" />
      <Back title="Register" onPress={onBack} icon="keyboard-backspace">
        Back
      </Back>
    </RegisterBackground>
  );
};
