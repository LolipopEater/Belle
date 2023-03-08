import React from "react";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CompactCareGiverInfo } from "../caregiver/compact-caregiver-info";
import { Spacer } from "../spacer/spacer.component";

const FavouritesWrapper = styled.View`
  padding: 10px;
`;
export const FavouriteBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouritesWrapper>
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
              >
                <CompactCareGiverInfo CareGiver={CareGiver} isMap={false} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
