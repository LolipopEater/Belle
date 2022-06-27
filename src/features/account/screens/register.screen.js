import React, { useState, useContext, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  RegisterBackground,
  RegisterCover,
  RegisterContainer,
  Submit,
  TextField,
} from "../components/register.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
export const RegisterScreen = ({ navigation }) => {
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
    <RegisterBackground>
      <RegisterCover />
      <RegisterContainer>
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
        <Spacer size="large" />
        <Submit title="Register" onPress={onSubmit}>
          Submit
        </Submit>
      </RegisterContainer>
    </RegisterBackground>
  );
};
