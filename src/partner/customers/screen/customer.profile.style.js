import styled from "styled-components/native";

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
