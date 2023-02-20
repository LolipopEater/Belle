import React, { useState } from "react";
import { CareGiverInfoCard } from "../components/caregiver-info.card";
import { List } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
import { ScrollView, View } from "react-native";
import styled from "styled-components";
import { Schedule } from "../../account/components/login.styles";

const SchedlueWrap = styled.View`
  margin-top: 45px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const CareGiverDetailScreen = ({ route, navigation }) => {
  const { breakfest, setBreakFest } = useState(null);
  const { lunch, setLunch } = useState(null);
  const { dinner, setDinner } = useState(null);
  const { CareGiver } = route.params;
  const item = () => {};
  return (
    <SafeArea>
      <ScrollView>
        <CareGiverInfoCard CareGivers={CareGiver} />
        <List.Section title="Information">
          <List.Accordion
            title="About me"
            left={(props) => <List.Icon {...props} icon="eye" />}
          >
            <View>
              <Text variant="body">TEST</Text>
              <Text variant="caption">
                akjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
                dasdaakjshdkajhsdkajhsdkjhaksdhkasd{"\n"}gdiashgdjgh{"\n"}
              </Text>
            </View>
          </List.Accordion>
          <List.Accordion
            title="Services"
            left={(props) => <List.Icon {...props} icon="exclamation" />}
          >
            <List.Item title="Burger w/ Fries" />
            <List.Item title="Steak Sandwich" />
            <List.Item title="Mushroom Soup" />
          </List.Accordion>
        </List.Section>
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
        {/* <CalenderView>
          <Calendar />
        </CalenderView> */}
      </ScrollView>
    </SafeArea>
  );
};
