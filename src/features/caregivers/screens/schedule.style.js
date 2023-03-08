import React, { useState } from "react";
import { Stack, Button, Switch } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import { check } from "prettier";

const StyledButton = styled(Button)`
  background-color: green;
`;

const Back = styled(Button)`
  background-color: red;
`;
export const PickerContainer = styled.View`
  height: 150px;
  margin: 0px 0;
  padding: 0px;
  border-width: 0px;
  border-color: #ccc;
  border-radius: 10px;
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

export const ScheduleButton = ({ loading, onClick, status }) => {
  const icon = status === "check" ? "check" : "send";

  return (
    <Stack fill center spacing={4}>
      <StyledButton
        title="Schedule"
        loading={loading}
        loadingIndicatorPosition="trailing"
        onPress={onClick}
        status={status}
        trailing={(props) => <Icon name={icon} {...props} />}
      ></StyledButton>
    </Stack>
  );
};

export const BackButton = ({ loading, onClick, status }) => {
  return (
    <Stack fill center spacing={4}>
      <Back
        title="Back"
        loading={loading}
        loadingIndicatorPosition="trailing"
        onPress={onClick}
        status={status}
        leading={(props) => <Icon name="backup-restore" {...props} />}
      ></Back>
    </Stack>
  );
};
