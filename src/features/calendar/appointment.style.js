import styled from "styled-components/native";

import { Button, TextInput } from "react-native-paper";

import { View, TouchableOpacity } from "react-native";

export const TimeSlotButton = styled.TouchableOpacity`
  background-color: #c0c0c0;
  border-radius: 50px;
  padding: 20px;
  margin: 10px;
  width: 80px;
  align-items: center;
`;

export const TimeSlotButtonChosen = styled.TouchableOpacity`
  background-color: #92b0e0;
  border-radius: 50;
  padding: 20px;
  margin: 10px;
  width: 80px;
  align-items: center;
`;

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
