import React, { useState, useEffect, useContext } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomersContext } from "../../services/customers/customers.context";
import { PartnerSchedulerContext } from "../../services/schedulaer/partner.scheduler.context";
import { Success } from "../../../components/alert/alert";
import {
  Container,
  SummaryInput,
  UpdateButton,
} from "./style/important.notes.styles";

export const Notes = ({ customer }) => {
  const [summary, setSummary] = useState("");
  const { storeID } = useContext(PartnerSchedulerContext);
  const { notes, updateNote } = useContext(CustomersContext);
  useEffect(() => {
    setSummary(notes);
  }, [notes]);

  const handleUpdate = async () => {
    updateNote(summary, storeID, customer);
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
