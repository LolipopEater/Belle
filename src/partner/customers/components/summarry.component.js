import React, { useState, useEffect, useContext } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Success } from "../../../components/alert/alert";
import { CustomersContext } from "../../services/customers/customers.context";
const Container = styled.View`
  flex: 0.2;
  width: 100%;
  padding-horizontal: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  elevation: 5;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LastSummaryText = styled.Text`
  font-size: 16px;
  margin-bottom: 100px;
`;

const SummaryInput = styled.TextInput`
  border-radius: 5px;
  height: 100px;
  margin-bottom: 10px;
  flex: 1;
  ${Platform.select({
    ios: `
      padding: 45px;
    `,
    android: `
      padding: 25px;
    `,
    default: `
      padding: 40px;
    `,
  })}
`;

const UpdateButton = styled.TouchableOpacity`
  right: 10px;
  top: 10px;
`;

export const Summary = () => {
  const [summary, setSummary] = useState("");
  const { description, updateSummarry } = useContext(CustomersContext);

  useEffect(() => {
    setSummary(description);
  }, [description]);

  const handleUpdate = async () => {
    updateSummarry(summary);
  };

  return (
    <Container>
      <SummaryInput
        multiline={true}
        value={summary}
        onChangeText={setSummary}
        blurOnSubmit={true}
      />
      <UpdateButton onPress={handleUpdate}>
        <Ionicons name={"pencil"} size={25} color={"black"} />
      </UpdateButton>
    </Container>
  );
};
