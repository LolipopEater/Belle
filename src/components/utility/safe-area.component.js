import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { rgba } from "polished";
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background: ${rgba("#880808", 0)};
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
