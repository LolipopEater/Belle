import React, { useContext, useState } from "react";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../components/resteraunt-info.card";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Search } from "../components/search.component";
import { FavouriteBar } from "../../../components/favourites/favourites-bar";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
const Activity = styled(ActivityIndicator)`
  flex: 1;
  align-items: center;
`;
export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 25,
  },
})``;

export const ResterauntsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  const onPress = () => {
    setIsToggled(!isToggled);
  };

  return (
    <SafeArea>
      <Search isFavouritesToggled={isToggled} onFavouritesToggle={onPress} />
      {isToggled && (
        <FavouriteBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}

      {!isLoading ? (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { restaurant: item })
                }
              >
                <Spacer position="bottom" size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Activity animating={isLoading} color={Colors.blue300} size={"large"} />
      )}
    </SafeArea>
  );
};
