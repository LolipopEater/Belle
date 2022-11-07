import React, { useState } from "react";
import { CareGiverInfoCard } from "../components/caregiver-info.card";
import { List } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
import { ScrollView, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import styled from "styled-components";
import { Back, Submit } from "../../account/components/login.styles";
// const CalenderView = styled.View`
//   width: 100%;
//   height: 100%;
//   align-items: center;
// `;

export const CareGiverDetailScreen = ({ route }) => {
  const { breakfest, setBreakFest } = useState(null);
  console.log(route.params);
  const { CareGiver } = route.params;
  return (
    <SafeArea>
      <Text>{route.params}</Text>
    </SafeArea>
  );
};
