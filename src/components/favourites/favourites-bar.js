import React from "react";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CompactRestaurantInfo } from "../restaurant/compact-restaurant-info";
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
        {favourites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate("RestaurantDetail", {
                    restaurant: restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} isMap={false} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
