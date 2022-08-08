import React, { useState } from "react";
import { CareGiverInfoCard } from "../components/caregiver-info.card";
import { List } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ScrollView } from "react-native";

export const CareGiverDetailScreen = ({ route }) => {
  const { breakfest, setBreakFest } = useState(null);
  const { lunch, setLunch } = useState(null);
  const { dinner, setDinner } = useState(null);

  const { CareGiver } = route.params;
  return (
    <SafeArea>
      <ScrollView>
        <CareGiverInfoCard CareGivers={CareGiver} />
        <List.Section title="Accordions">
          <List.Accordion
            title="breakfest"
            left={(props) => <List.Icon {...props} icon="food-variant" />}
          >
            <List.Item title="Eggs Benedict" />
            <List.Item title="Classic Breakfast" />
          </List.Accordion>

          <List.Accordion
            title="lunch"
            left={(props) => <List.Icon {...props} icon="food" />}
          >
            <List.Item title="Burger w/ Fries" />
            <List.Item title="Steak Sandwich" />
            <List.Item title="Mushroom Soup" />
          </List.Accordion>
          <List.Accordion
            title="Dinner"
            left={(props) => <List.Icon {...props} icon="food-apple" />}
          >
            <List.Item title="Spaghetti Bolognese" />
            <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
            <List.Item title="Steak Frites" />
          </List.Accordion>
          <List.Accordion
            title="Drinks"
            left={(props) => <List.Icon {...props} icon="glass-wine" />}
          >
            <List.Item title="Tea" />
            <List.Item title="Modelo" />
            <List.Item title="Coke" />
            <List.Item title="Fanta" />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
