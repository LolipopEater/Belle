import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const InputField = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
`;

export const ServiceContainer = styled.View`
  margin-bottom: 10px;
`;

export const ServiceText = styled.Text`
  font-size: 16px;
`;

export const PriceInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceInputLabel = styled.Text`
  font-size: 16px;
`;

export const PriceInputField = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  width: 60px;
`;

export const ButtonContainer = styled.View`
  margin-top: 20px;
`;

export const Button = styled.Button`
  color: red;
  background-color: #9b59b6;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
`;
