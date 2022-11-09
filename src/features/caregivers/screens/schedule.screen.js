import React, { useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
import { ScheduleCalendar } from "../../Calendar/calendar.component";
import { ScrollView, View } from "react-native";
import styled from "styled-components";
import { Back, Submit } from "../../account/components/login.styles";

export const CareGiverScheduleScreen = ({ route, navigation }) => {
  const onBack = () => {
    navigation.goBack();
  };
  console.log(route.params);
  const { info } = route.params;
  return (
    <SafeArea>
      <ScheduleCalendar />
      <Text>{info.placeId}</Text>
      <Back title="Register" onPress={onBack} icon="keyboard-backspace">
        Back
      </Back>
    </SafeArea>
  );
};
