import React from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/resteraunt-info.card";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;
const RestaurantList = styled(FlatList)``;
export const ResterauntsScreen = () => (
  <>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <RestaurantList
      data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
      renderItem={() => (
        <Spacer position="bottom" size="large">
          <RestaurantInfoCard />
        </Spacer>
      )}
      keyExtractor={(item) => item.name}
    />
  </>
);
