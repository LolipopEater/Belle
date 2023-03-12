import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.commponent";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
export const ScheduleButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  align-self: center;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #2196f3;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ScheduleButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;
export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding-vertical: 20px;
`;

export const AvatarContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 10px;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  width: 100%;
  background-color: #eeeee4;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  elevation: 5;
  height: 70px;
  flex-wrap: wrap;
`;

export const DetailsText = styled.Text`
  font-size: 16px;
  margin-vertical: 5px;
`;
export const ContainerAppointmentsSummary = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding-vertical: 25px;
  width: 100%;
`;
