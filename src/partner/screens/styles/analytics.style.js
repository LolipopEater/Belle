import styled from "styled-components/native";
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const ScrollViewContent = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const ChartContainer = styled.View`
  justify-content: center;
  margin-vertical: 25px;
  border-radius: 80px;
  overflow: hidden;
  width: 100%;
`;
export const ChartBarContainer = styled.View`
  justify-content: center;
  margin-vertical: 25px;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  background-color: white;
`;

export const ChartTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  background-color: purple;
`;
export const SubText = styled.Text`
  text-align: center;
`;
