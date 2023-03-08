import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CompactCareGiverInfo } from "../../components/caregiver/compact-caregiver-info";
import { Spacer } from "../../components/spacer/spacer.component";
import { rgba } from "polished";
import { CareGiversContext } from "../../services/caregivers/caregiver.context";
import { LocationContext } from "../../services/location/location.context";
const RecommendedWrapper = styled.View`
  padding: 10px;
  background: ${rgba("#880808", 0)};
`;

export const RecommendedBar = ({ recommended, onNavigate }) => {
  const { Featured } = useContext(CareGiversContext);
  const { location } = useContext(LocationContext);
  if (!Featured.length) {
    return null;
  }
  // useEffect(() => {
  //   console.log(recommended);
  // }, [recommended]);
  return (
    <RecommendedWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Recommended</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended.map((CareGiver) => {
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
                <CompactCareGiverInfo
                  CareGiver={CareGiver}
                  isMap={false}
                  isRecommended={true}
                />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </RecommendedWrapper>
  );
};
