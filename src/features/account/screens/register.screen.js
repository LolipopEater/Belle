import React, { useState, useContext } from "react";
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
import { ActivityIndicator, ScrollView, Image, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import SelectDropdown from "react-native-select-dropdown";
export const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;
export const RegisterScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reapeatedPassword, setRepeatedPassword] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("Male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const Sexlist = ["Male", "Female", "Other"];
  const ageItems = [];

  for (let i = 16; i <= 120; i++) {
    ageItems.push(i);
  }

  const { isAuthenticated, error, onRegister, isLoading } = useContext(
    AuthenticationContext
  );
  const sty = { width: "30%", height: 50, alignSelf: "flex-start" };
  const onSubmit = () => {
    onRegister(userEmail, password, reapeatedPassword, name, age, sex, phone);
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
    <SafeArea>
      <RegisterBackground>
        <RegisterCover />
        <Image
          style={styles.logo}
          source={require("../../../../assets/MIni_logo.png")}
        />
        <RegisterContainer>
          <StyledScrollView>
            <TextField
              label="Full Name"
              value={name}
              onChangeText={(t) => setName(t)}
            />
            <Spacer size="large" />
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
            <TextField
              label="Phone Number"
              value={phone}
              onChangeText={(t) => setPhone(t)}
              keyboardType="numeric"
            />
            <Spacer size="large" />
            <Text>Please Choose Sex</Text>
            <SelectDropdown
              data={Sexlist}
              defaultValue={sex}
              onSelect={(selectedItem, index) => setSex(selectedItem)}
              buttonStyle={sty}
              dropdownStyle={{ backgroundColor: "#fafafa" }}
              rowStyle={{ justifyContent: "flex-start" }}
            />
            <Spacer size="large" />
            <Text>Please Choose Age</Text>
            <SelectDropdown
              data={ageItems}
              defaultValue={age}
              onSelect={(selectedItem, index) => setAge(parseInt(selectedItem))}
              buttonStyle={sty}
              dropdownStyle={{ backgroundColor: "#fafafa" }}
              rowStyle={{ justifyContent: "flex-start" }}
            />
            <Spacer size="large" />
          </StyledScrollView>
        </RegisterContainer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Spacer size="large">
            <Submit title="Register" onPress={onSubmit}>
              Submit
            </Submit>
          </Spacer>
        )}
        <Spacer size="large" />
        <Back title="Register" onPress={onBack} icon="keyboard-backspace">
          Back
        </Back>
      </RegisterBackground>
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
