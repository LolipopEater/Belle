import styled from "styled-components/native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";

export const AppointmentsContainer = styled.View`
  flex: 0.4;
  width: 100%;
  padding-horizontal: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  elevation: 5;
  margin-top: 20px;
`;

export const AppointmentItem = styled.TouchableOpacity`
  padding-vertical: 10px;
  border-width: 2px;
  border-color: #d9d9d9;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

export const AppointmentText = styled.Text`
  font-size: 16px;
`;

export const List = styled(FlatList)``;
