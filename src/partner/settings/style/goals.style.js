import React, { useState } from "react";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  textalignvertical: "center";
`;

export const TreatmentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const TreatmentName = styled.Text`
  flex: 1;
  font-size: 16px;
`;

export const GoalInput = styled.TextInput`
  width: 60px;
  height: 40px;
  border-width: 1px;
  border-color: gray;
  border-radius: 5px;
  padding: 5px;
  margin-left: 10px;
  font-size: 16px;
  text-align: center;
`;

export const UpdateButton = styled.Button`
  margin-top: 20px;
`;
export const SubTitles = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
export const LeftItem = styled.View`
  flex: 1;
`;
export const RightItem = styled.View`
  flex: 1;
  align-items: flex-end;
`;
