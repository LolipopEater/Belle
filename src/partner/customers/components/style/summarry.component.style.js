import styled from "styled-components/native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";

export const Container = styled.View`
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

export const LastSummaryText = styled.Text`
  font-size: 16px;
  margin-bottom: 100px;
`;

export const SummaryInput = styled.TextInput`
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

export const UpdateButton = styled.TouchableOpacity`
  right: 10px;
  top: 10px;
`;
