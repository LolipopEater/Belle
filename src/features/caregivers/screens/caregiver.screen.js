import React, { useContext, useState } from "react";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { CareGiverInfoCard } from "../components/caregiver-info.card";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CareGiversContext } from "../../../services/caregivers/caregiver.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Search } from "../components/search.component";
import { FavouriteBar } from "../../../components/favourites/favourites-bar";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FaceInView } from "../../../components/animations/fade.animation";
import { FeaturedBar } from "../../../components/featured/featured-bar.component";
const Activity = styled(ActivityIndicator)`
  flex: 1;
  align-items: center;
`;
export const CareGiverList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 25,
  },
})``;

export const CareGiversScreen = ({ navigation }) => {
  const { CareGivers, isLoading, Featured, error } =
    useContext(CareGiversContext);
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
      <FeaturedBar CareGivers={Featured} onNavigate={navigation} />
      {!isLoading ? (
        <CareGiverList
          data={CareGivers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CareGiverDetail", { CareGiver: item })
                }
              >
                <FaceInView>
                  <Spacer position="bottom" size="large">
                    <CareGiverInfoCard CareGivers={item} />
                  </Spacer>
                </FaceInView>
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
