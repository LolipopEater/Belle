import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FavouritesContext } from "../../services/favourites/favourites.context";
const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ CareGiver }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find((r) => r.placeId === CareGiver.placeId);

  return (
    <FavouriteButton
      onPress={() =>
        isFavourite
          ? removeFromFavourites(CareGiver)
          : addToFavourites(CareGiver)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={25}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
