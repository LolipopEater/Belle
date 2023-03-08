import React, { useContext, useEffect, useState } from "react";
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
import { LocationContext } from "../../../services/location/location.context";
import { RecommendedBar } from "../../recommended/recomended.component";
import { rgba } from "polished";
import { Text } from "../../../components/typography/text.commponent";
import { Dimensions } from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Activity = styled(ActivityIndicator)`
  flex: 1;
  align-items: center;
`;

export const CareGiverList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 25,
  },
})``;
const TransAndroid = styled.View`
  background: ${rgba("#F1F1F1", 0.8)};
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;
`;

const ErrorV = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 125%;
  z-index: 3;
`;
const TransIOS = styled.View`
  background: ${rgba("#F1F1F1", 0.7)};
  position: absolute;
  margin-top: 40px;
  z-index: 4;
  width: ${windowWidth * 1}px; // set width to 50% of screen width
`;
export const CareGiversScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext);
  const { CareGivers, isLoading, Featured, error } =
    useContext(CareGiversContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);

  const hasError = locationError || error;
  const Wrap = Platform.OS === "android" ? TransAndroid : TransIOS;
  const onPress = () => {
    setIsToggled(!isToggled);
  };

  return (
    <SafeArea>
      <Wrap>
        <Search isFavouritesToggled={isToggled} onFavouritesToggle={onPress} />
        {isToggled && (
          <FavouriteBar
            favourites={favourites}
            onNavigate={navigation.navigate}
          />
        )}
        <RecommendedBar
          recommended={Featured}
          onNavigate={navigation.navigate}
        />
      </Wrap>
      {hasError && (
        <ErrorV>
          <Spacer position="left" size="large">
            <Text variant="error">
              Something went wrong retrieving the data
            </Text>
          </Spacer>
        </ErrorV>
      )}

      {!hasError && !isLoading ? (
        <CareGiverList
          data={CareGivers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CareGiverDetail", {
                    CareGiver: item,
                    navigation: navigation,
                  })
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
