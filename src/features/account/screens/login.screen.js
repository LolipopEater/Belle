import React, { useState, useContext, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.commponent";
import LottieView from "lottie-react-native";
import {
  LoginBackground,
  LoginCover,
  LoginContainer,
  Submit,
  TextField,
  Title,
  Back,
  SubmitPartner,
} from "../components/login.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ActivityIndicator } from "react-native";
export const LoginScreen = ({ navigation }) => {
  const [userName, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    onLogin,
    isAuthenticated,
    error,
    isLoading,
    onLogOut,
    status,
    user,
    setPartnerRole,
  } = useContext(AuthenticationContext);

  const onSubmit = () => {
    onLogin(userName, password);

    if (isAuthenticated) {
      navigation.navigate("Main");
    } else {
      console.log(error);
    }
  };

  const onSubmitPartner = () => {
    setPartnerRole(true);
    onLogin(userName, password, true);
  };

  const onBack = () => {
    navigation.navigate("Main");
  };

  return (
    <LoginBackground>
      <LoginCover />
      <Title>Belle♥</Title>
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
          secureTextEntry={true}
          onChangeText={(t) => setPassword(t)}
          secure={true}
        />
        {error && (
          <Spacer size="large">
            <Text variant="error">{error}</Text>
          </Spacer>
        )}
        <Spacer size="large" />
        <Spacer size="large" />
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Submit title="Login" onPress={onSubmit}>
            Login
          </Submit>
        )}
        <Spacer size="large"></Spacer>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <SubmitPartner title=" Login As Partner" onPress={onSubmitPartner}>
            Login As Partner
          </SubmitPartner>
        )}
      </LoginContainer>
      <Spacer size="large" />
      <Back title="Register" onPress={onBack} icon="keyboard-backspace">
        Back
      </Back>
    </LoginBackground>
  );
};
