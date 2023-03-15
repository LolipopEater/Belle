import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Title,
  TreatmentContainer,
  TreatmentName,
  GoalInput,
  UpdateButton,
  SubTitles,
  RightItem,
  LeftItem,
} from "./style/goals.style";
import { Success } from "../../components/alert/alert";
import { PartnerSchedulerContext } from "../services/schedulaer/partner.scheduler.context";

const initialGoals = [25, 15, 20, 50];
export const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [treatments, setTreatments] = useState([
    "hair",
    "nails",
    "laser",
    "zona",
  ]); // Replace with your initial goals array

  const { types, treatmentGoals, setTreatmentGoals, updateUserGoals } =
    useContext(PartnerSchedulerContext);

  const updateGoals = () => {
    updateUserGoals(goals);
  };
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  useEffect(() => {
    // initialize array to make sure flow wont break in case theres no Goals.
    if (treatmentGoals.length === 0) {
      const newArray = Array.from(types, () => 0);
      setGoals(newArray);
    } else if (treatmentGoals.length < types.length) {
      const zerosArray = Array(types.length - treatmentGoals.length).fill(0);
      const newGoals = treatmentGoals.concat(zerosArray);
      setGoals(newGoals);
    } else {
      setGoals(treatmentGoals);
    }
    setTreatments(types);
  }, []);

  const onChangeGoal = (text, index) => {
    if (text === "") {
      const newGoals = [...goals]; //placeholder
      newGoals[index] = 0; //setDefaultValue
      setGoals(newGoals);
    } else if (!isNumeric(text)) {
      Success("Please insert Number!!!");
      return;
    } else {
      const newGoals = [...goals];
      newGoals[index] = parseInt(text);
      setGoals(newGoals);
    }
  };

  return (
    <Container>
      <Title>Aim High! Set up your goals for each Treatment</Title>
      <SubTitles>
        <LeftItem>
          <Text>Treatment Name:</Text>
        </LeftItem>
        <RightItem>
          <Text>Number of meetings:</Text>
        </RightItem>
      </SubTitles>
      {treatments.map((treatment, index) => (
        <TreatmentContainer key={index}>
          <TreatmentName>{treatment}</TreatmentName>
          <GoalInput
            keyboardType="numeric"
            value={goals[index].toString()}
            onChangeText={(text) => onChangeGoal(text, index)}
          />
        </TreatmentContainer>
      ))}
      <UpdateButton title="Update Goals" onPress={updateGoals} />
    </Container>
  );
};
