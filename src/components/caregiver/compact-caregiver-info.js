import React from "react";
import styled from "styled-components/native";
import { Text } from "../typography/text.commponent";
import WebView from "react-native-webview";
import { Platform } from "react-native";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const RecomendedImage = styled.Image`
  border-radius: 360px;
  width: 70px;
  height: 70px;
`;
const isAndroid = Platform.OS === "android";

export const CompactCareGiverInfo = ({ CareGiver, isMap, isRecommended }) => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;

  return !isRecommended ? (
    <Item>
      {<Image source={{ uri: CareGiver.photos[0] }} />}
      <Text center variant="caption" numberOfLines={3}>
        {CareGiver.name}
      </Text>
    </Item>
  ) : (
    <Item>
      {<RecomendedImage source={{ uri: CareGiver.photos[0] }} />}
      <Text center variant="caption" numberOfLines={3}>
        {CareGiver.name}
      </Text>
    </Item>
  );
};
