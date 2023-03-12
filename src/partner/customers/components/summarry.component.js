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
import {
  Container,
  SummaryInput,
  UpdateButton,
} from "./style/summarry.component.style";

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
