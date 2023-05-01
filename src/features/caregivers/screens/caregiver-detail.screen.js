import React, { useState, useContext, useEffect } from "react";
import { CareGiverInfoCard } from "../components/caregiver-info.card";
import { List } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
import { ScrollView, View } from "react-native";
import styled from "styled-components";
import { Schedule } from "../../account/components/login.styles";
import { LogBox } from "react-native";
import { SchedulerContext } from "../../../services/schedualer/scheduler.context";

const SchedlueWrap = styled.View`
  margin-top: 45px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const CareGiverDetailScreen = ({ route, navigation }) => {
  const { CareGiver } = route.params;
  const useParams = useContext(SchedulerContext);

  useEffect(() => {
    useParams.checkIfInProggram(CareGiver.placeId);

    setTimeout(() => {
      if (useParams.isInProggram) {
        useParams.changeID(CareGiver.placeId);
      }
    }, 2000);
  }, []);

  const item = () => {};
  return (
    <SafeArea>
      <ScrollView>
        <CareGiverInfoCard CareGivers={CareGiver} />
        {useParams.isInProggram && (
          <List.Section title="Information">
            <List.Accordion
              title="About me"
              left={(props) => <List.Icon {...props} icon="eye" />}
            >
              <View>
                <Text variant="body">{CareGiver.name}</Text>
                <Text variant="caption">{useParams.about}</Text>
              </View>
            </List.Accordion>
            <List.Accordion
              title="Services"
              left={(props) => <List.Icon {...props} icon="exclamation" />}
            >
              {useParams.types.map((item) => (
                <List.Item key={item} title={item} />
              ))}
            </List.Accordion>
          </List.Section>
        )}
        <SchedlueWrap>
          <Schedule
            title="Schedule"
            onPress={() =>
              navigation.navigate("Schedule", {
                info: CareGiver,
                navigation: navigation,
              })
            }
          >
            <Text>Schedule</Text>
          </Schedule>
        </SchedlueWrap>
      </ScrollView>
    </SafeArea>
  );
};
