import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/resteraunt-info.card";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { ActivityIndicator, Colors } from "react-native-paper";
const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const Activity = styled(ActivityIndicator)`
  flex: 1;
  align-items: center;
`;
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const ResterauntsScreen = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);

  return !isLoading ? (
    <SafeArea>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      {
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      }
    </SafeArea>
  ) : (
    <Activity animating={isLoading} color={Colors.blue300} size={"large"} />
  );
};
