import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.commponent";
export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
`;
export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
  icon: "lock-open-outline",
  mode: "contained",
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const RegisterButton = styled(Button).attrs({
  color: colors.brand.primary,
  icon: "lead-pencil",
  mode: "contained",
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;
