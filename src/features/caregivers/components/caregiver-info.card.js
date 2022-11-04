import React from "react";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../components/typography/text.commponent";
import { Favourite } from "../../../components/favourites/favourite.component";
import {
  Icon,
  CareGiverCard,
  CareGiverCardCover,
  Address,
  Info,
  Rating,
  Section,
  SectionEnd,
} from "../components/caregiver-info-card.styles";

import styled from "styled-components";
const FavouriteButton = styled.View`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;
export const CareGiverInfoCard = ({ CareGivers = {} }) => {
  const {
    name,
    icon,
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = CareGivers.vicinity,
    isOpenNow = CareGivers.open_now,
    rating = CareGivers.rating,
    isClosedTemporarily = CareGivers.business_status === "OPERATIONAL"
      ? true
      : false,
  } = CareGivers;
  const RatingArray = Array.from(new Array(rating ? Math.floor(rating) : 0));

  return (
    <CareGiverCard>
      <FavouriteButton></FavouriteButton>

      <Favourite CareGiver={CareGivers} />

      <CareGiverCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {RatingArray.map((_, i) => (
              <SvgXml key={i} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={50} height={20} />}
            </Spacer>

            <Icon source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </CareGiverCard>
  );
};
