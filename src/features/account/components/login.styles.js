import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";
import { Button, TextInput } from "react-native-paper";
import { Text } from "../../../components/typography/text.commponent";
import { TouchableOpacity } from "react-native";
export const LoginBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
`;
export const LoginCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const LoginContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const Submit = styled(Button).attrs({
  color: colors.brand.primary,
  icon: "lead-pencil",
  mode: "contained",
})`
  padding: ${(props) => props.theme.space[2]};
`;
export const SubmitPartner = styled(Button).attrs({
  color: colors.brand.primary,
  icon: "human-male-board",
  mode: "contained",
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const TextField = styled(TextInput)`
  width: 300px;s
`;
export const Title = styled(Text)`
  font-size: 30px;
`;

export const Back = styled(Button).attrs({
  color: colors.brand.primary,
  icon: "keyboard-backspace",
  mode: "contained",
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const Schedule = styled(TouchableOpacity).attrs({})`
  align-items: center;
  background-color: ${colors.text.success};
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  justify-content: center;
`;
