import React from "react";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";

const FeaturedWrapper = styled.View`
  padding: 10px;
`;
export const FeaturedBar = ({ CareGivers, onNavigate }) => {
  if (!CareGivers.length) {
    return null;
  }
  return (
    <FeaturedWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((CareGiver) => {
          const key = CareGiver.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate("CareGiverDetail", {
                    CareGiver: CareGiver,
                  })
                }
              ></TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FeaturedWrapper>
  );
};
